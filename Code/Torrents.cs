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
	public class Config
	{
		public string BaseFolder { get; protected set; }
		public string TorrentsFolder { get; protected set; }
		public string DhtNodesFile { get; protected set; }
		public string FastResumeFile { get; protected set; }
		public string BanListFile { get; protected set; }
		public string DownloadsFolder { get; protected set; }
		public int Port { get; protected set; }
		public int GlobalMaxUploadSpeed { get; protected set; }
		
		static object sync = new object();
		static Config _Instance;
		
		private Config(string baseFolder)
		{
			BaseFolder = baseFolder;
			TorrentsFolder = Path.Combine(BaseFolder, "Torrents");
			DhtNodesFile = Path.Combine(TorrentsFolder, "DhtNodes.dht");
			FastResumeFile = Path.Combine(TorrentsFolder, "FastResume.frs");
			BanListFile = Path.Combine(TorrentsFolder, "BanList.ban");
			DownloadsFolder = Path.Combine(BaseFolder, "Downloads");
			Port = 6969;
			GlobalMaxUploadSpeed = 200 * 1024;
		}

		public Config EnsureFoldersExist()
		{
			if (!Directory.Exists(TorrentsFolder))
				Directory.CreateDirectory(TorrentsFolder);

			if (!Directory.Exists(DownloadsFolder))
				Directory.CreateDirectory(DownloadsFolder);

			return this;
		}
		
		public static Config Instance
		{
			get
			{
				if (_Instance == null)
				{
					lock(sync)
					{
						if (_Instance == null)
							_Instance = new Config(Environment.CurrentDirectory);
					}
				}
				
				return _Instance;
			}
		}
	}
	
	public abstract class Provider : DisposableObject
	{
		protected Config Config = Config.Instance.EnsureFoldersExist();
	}
	
	public class TorrentClient : Provider
	{
		ClientEngine Engine;
		DhtProvider DhtProvider;
		FastResumeProvider FastResumeProvider;
		SecurityProvider SecurityProvider;	
		TorrentProvider TorrentProvider;
		
		public TorrentClient()
		{
			EngineSettings settings = new EngineSettings(Config.DownloadsFolder, Config.Port);
            settings.PreferEncryption = false;
			settings.AllowedEncryption = EncryptionTypes.All;
            settings.GlobalMaxUploadSpeed = Config.GlobalMaxUploadSpeed;

            Engine = new ClientEngine(settings);
            Engine.ChangeListenEndpoint(new IPEndPoint(IPAddress.Any, Config.Port));
			
			DhtProvider = new DhtProvider(Engine);
			FastResumeProvider = new FastResumeProvider();
			SecurityProvider = new SecurityProvider(Engine);
			TorrentProvider = new TorrentProvider(Engine, FastResumeProvider);
			
			LoadAllTorrents();
		}
		
		public void StartTorrent(string url)
		{
			byte[] data = Web.GetBytes(url);
			string guid = Guid.NewGuid().ToString();
			string file = Path.Combine(Config.TorrentsFolder, guid + ".torrent");
			
			File.WriteAllBytes(file, data);
			
			TorrentProvider.LoadTorrent(file, guid);
		}
		
		void LoadAllTorrents()
		{
			foreach (var file in Directory.GetFiles(Config.TorrentsFolder, "*.torrent"))
			{
				TorrentProvider.LoadTorrent(file, Guid.NewGuid().ToString());
			}
		}

		public List<DownloadItem> GetCurrentDownloads()
		{
			var list = new List<DownloadItem>();
			var dic = TorrentProvider.GetTorrentManagers();

			foreach (var key in dic.Keys)
			{
				var manager = dic[key];

				var item = new DownloadItem
				{
					TorrentId = key,
					TorrentName = manager.Torrent != null ? manager.Torrent.Name : "Loading..",
					TorrentState = manager.State.ToString(),
					PercentDownloaded = (int)manager.Progress
				};

				list.Add(item);
			}

			return list;
		}
		
		protected override void CleanUpManagedResources()
		{
			TorrentProvider.Dispose();
			DhtProvider.Dispose();
			FastResumeProvider.Dispose();
			Engine.Dispose();
		}
	}
		
	public class DhtProvider : Provider
	{
		ClientEngine Engine;
		
		public DhtProvider(ClientEngine engine)
		{
			Engine = engine;
			
			byte[] nodes = File.Exists(Config.DhtNodesFile) ? File.ReadAllBytes(Config.DhtNodesFile) : null;
			
			DhtListener dhtListner = new DhtListener (new IPEndPoint (IPAddress.Any, Config.Port));
			DhtEngine dhtEngine = new DhtEngine (dhtListner);
			Engine.RegisterDht(dhtEngine);
            dhtListner.Start();
			
			Engine.DhtEngine.Start(nodes);
		}
		
		protected override void CleanUpManagedResources()
		{
			File.WriteAllBytes(Config.DhtNodesFile, Engine.DhtEngine.SaveNodes());
		}
	}
	
	public class FastResumeProvider : Provider
	{
		BEncodedDictionary FastResumeDic;
		
		public FastResumeProvider()
		{
			FastResumeDic = File.Exists(Config.FastResumeFile) ? 
				BEncodedValue.Decode<BEncodedDictionary>(File.ReadAllBytes(Config.FastResumeFile)) :
				new BEncodedDictionary();
		}
		
		public bool ContainsHash(string hash)
		{
			return FastResumeDic.ContainsKey(hash);
		}
		
		public FastResume Get(string hash)
		{
			return new FastResume((BEncodedDictionary)FastResumeDic[hash]);
		}
		
		public void Add(BEncodedString key, BEncodedValue value)
		{
			FastResumeDic.Add(key, value);
		}
		
		protected override void CleanUpManagedResources()
		{	
			File.WriteAllBytes(Config.FastResumeFile, FastResumeDic.Encode());
		}
	}
	
	public class SecurityProvider : Provider
	{
		BanList BanList;
		
		public SecurityProvider(ClientEngine engine)
		{
			if (!File.Exists(Config.BanListFile))
                return;
				
			BanList = new BanList();

            // The banlist parser can parse a standard block list from peerguardian or similar services
            BanListParser parser = new BanListParser();
            IEnumerable<AddressRange> ranges = parser.Parse(File.OpenRead(Config.BanListFile));
            BanList.AddRange(ranges);

            engine.ConnectionManager.BanPeer += delegate (object o, AttemptConnectionEventArgs e){
                IPAddress address;

                // The engine can raise this event simultaenously on multiple threads
                if (IPAddress.TryParse(e.Peer.ConnectionUri.Host, out address)) {
                    lock (BanList) {
                        // If the value of e.BanPeer is true when the event completes,
                        // the connection will be closed. Otherwise it will be allowed
                        e.BanPeer = BanList.IsBanned(address);
                    }
                }
            };
		}
	}
	
	public class TorrentProvider : Provider
	{
		Dictionary<string, TorrentManager> TorrentManagers;
		ClientEngine Engine;
		FastResumeProvider FastResumeProvider;
		TorrentSettings TorrentDefaults;
		
		public TorrentProvider(ClientEngine engine, FastResumeProvider fastResumeProvider)
		{	
			Engine = engine;
			FastResumeProvider = fastResumeProvider;
			TorrentManagers = new Dictionary<string, TorrentManager>();
			
			// Create the default settings which a torrent will have.
            // 4 Upload slots - a good ratio is one slot per 5kB of upload speed
            // 50 open connections - should never really need to be changed
            // Unlimited download speed - valid range from 0 -> int.MaxValue
            // Unlimited upload speed - valid range from 0 -> int.MaxValue
            TorrentDefaults = new TorrentSettings(4, 150, 0, 0);
		}
		
		public void LoadTorrent(string file, string key)
		{
			Debugging.WriteLine("Loading torrent: {0} with key {1}", file, key);
			
			var torrent = Torrent.Load(file);		
			var torrentManager = new TorrentManager(torrent, Config.DownloadsFolder, TorrentDefaults);
			
			string hash = torrent.InfoHash.ToHex();
			if (FastResumeProvider.ContainsHash(hash))
				torrentManager.LoadFastResume(FastResumeProvider.Get(hash));
            
			Engine.Register(torrentManager);
			TorrentManagers.Add(key, torrentManager);
			
			torrentManager.Start();
		}

		public Dictionary<string, TorrentManager> GetTorrentManagers()
		{
			return TorrentManagers;
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
					
				FastResumeProvider.Add(torrentManager.Torrent.InfoHash.ToHex(), torrentManager.SaveFastResume().Encode());
			}
		}
	}
}