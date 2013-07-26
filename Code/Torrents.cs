using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Threading;
using MonoTorrent.BEncoding;
using MonoTorrent.Client;
using MonoTorrent.Client.Encryption;
using MonoTorrent.Client.Tracker;
using MonoTorrent.Common;
using MonoTorrent.Dht;
using MonoTorrent.Dht.Listeners;
using Appy.Core;

namespace Splash
{
    public class TorrentClient : DisposableObject
    {
        BanList Banlist;
        ClientEngine Engine;
		BEncodedDictionary FastResumeDic;
		Dictionary<string, TorrentManager> TorrentManagers;
		TorrentSettings TorrentDefaults;
		
		string BasePath;
		string TorrentsPath;
		string DhtNodesFile;
		string FastResumeFile;
		string BanListFile;
		string DownloadsPath;
		int Port;
		int GlobalMaxUploadSpeed;

        public TorrentClient()
        {
			Config();
            SetupEngine();
			SetupDHT();
			SetupFastResume();
            SetupBanlist();
            LoadTorrentsFromFolder();
        }
		
		void Config()
		{
			BasePath = Environment.CurrentDirectory;
			TorrentsPath = Path.Combine(BasePath, "Torrents");
			DhtNodesFile = Path.Combine(TorrentsPath, "DhtNodes.dht");
			FastResumeFile = Path.Combine(TorrentsPath, "FastResume.frs");
			BanListFile = Path.Combine(TorrentsPath, "BanList.ban");
			DownloadsPath = Path.Combine(BasePath, "Downloads");
			Port = 6969;
			GlobalMaxUploadSpeed = 200 * 1024;
			TorrentManagers = new Dictionary<string, TorrentManager>(20);
			
			// Create the default settings which a torrent will have.
            // 4 Upload slots - a good ratio is one slot per 5kB of upload speed
            // 50 open connections - should never really need to be changed
            // Unlimited download speed - valid range from 0 -> int.MaxValue
            // Unlimited upload speed - valid range from 0 -> int.MaxValue
            TorrentDefaults = new TorrentSettings(4, 150, 0, 0);
			
			
			if (!Directory.Exists(TorrentsPath)) Directory.CreateDirectory(TorrentsPath);
			if (!Directory.Exists(DownloadsPath)) Directory.CreateDirectory(DownloadsPath);
		}

        void SetupEngine()
        {
            EngineSettings settings = new EngineSettings(DownloadsPath, Port);
            settings.PreferEncryption = false;
			settings.AllowedEncryption = EncryptionTypes.All;
            // The maximum upload speed is 200 kilobytes per second, or 204,800 bytes per second
            settings.GlobalMaxUploadSpeed = GlobalMaxUploadSpeed;

            Engine = new ClientEngine(settings);
            Engine.ChangeListenEndpoint(new IPEndPoint(IPAddress.Any, Port));
        }

		void SetupDHT()
		{
			byte[] nodes = File.Exists(DhtNodesFile) ? File.ReadAllBytes(DhtNodesFile) : null;
			
			DhtListener dhtListner = new DhtListener (new IPEndPoint (IPAddress.Any, Port));
			DhtEngine dhtEngine = new DhtEngine (dhtListner);
			Engine.RegisterDht(dhtEngine);
            dhtListner.Start();
			
			Engine.DhtEngine.Start(nodes);
		}
		
		void SetupFastResume()
		{
			FastResumeDic = File.Exists(FastResumeFile) ? 
				BEncodedValue.Decode<BEncodedDictionary>(File.ReadAllBytes(FastResumeFile)) :
				new BEncodedDictionary();
		}

        void SetupBanlist()
        {		
            if (!File.Exists(BanListFile))
                return;
				
			Banlist = new BanList();

            // The banlist parser can parse a standard block list from peerguardian or similar services
            BanListParser parser = new BanListParser();
            IEnumerable<AddressRange> ranges = parser.Parse(File.OpenRead(BanListFile));
            Banlist.AddRange(ranges);

            // Add a few IPAddress by hand
            //Banlist.Add(IPAddress.Parse("12.21.12.21"));
            //Banlist.Add(IPAddress.Parse("11.22.33.44"));
            //Banlist.Add(IPAddress.Parse("44.55.66.77"));

            Engine.ConnectionManager.BanPeer += delegate (object o, AttemptConnectionEventArgs e){
                IPAddress address;

                // The engine can raise this event simultaenously on multiple threads
                if (IPAddress.TryParse(e.Peer.ConnectionUri.Host, out address)) {
                    lock (Banlist) {
                        // If the value of e.BanPeer is true when the event completes,
                        // the connection will be closed. Otherwise it will be allowed
                        e.BanPeer = Banlist.IsBanned(address);
                    }
                }
            };
        }

        void LoadTorrentsFromFolder()
        {
			foreach (var file in Directory.GetFiles(TorrentsPath, "*.torrent"))
			{
				LoadTorrentFromFile(file);
			}
        }
		
		public void LoadTorrentFromFile(string file, string key = "")
		{
			Debugging.WriteLine("Loading torrent: {0}", file);
			
			if (string.IsNullOrEmpty(key)) key = Guid.NewGuid().ToString();
				
			var torrent = Torrent.Load(file);		
			var torrentManager = new TorrentManager(torrent, DownloadsPath, TorrentDefaults);
			
			string hash = torrent.InfoHash.ToHex();
			if (FastResumeDic.ContainsKey(hash))
				torrentManager.LoadFastResume(new FastResume((BEncodedDictionary)FastResumeDic[hash]));
            
			Engine.Register(torrentManager);
			TorrentManagers.Add(key, torrentManager);
			
			torrentManager.Start();
		}
		
		public void LoadTorrentFromUrl(string url, string key = "")
		{
			//-- Save to Torrents Path
		}
		
		protected override void CleanUpManagedResources()
		{
			foreach (var torrentManager in TorrentManagers.Values)
			{	
				torrentManager.Stop();	
				while (torrentManager.State != TorrentState.Stopped)
				{
					Debugging.WriteLine("Stopping torrent..");
                    Thread.Sleep(250);
				}
					
				FastResumeDic.Add(torrentManager.Torrent.InfoHash.ToHex (), torrentManager.SaveFastResume().Encode());
			}
			
			File.WriteAllBytes(DhtNodesFile, Engine.DhtEngine.SaveNodes());
			File.WriteAllBytes(FastResumeFile, FastResumeDic.Encode());
			
			Engine.Dispose();
		}
    }
}