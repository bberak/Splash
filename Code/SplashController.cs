using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Windows.Forms;
using BB.Common.WinForms;
using Appy.Core;

namespace Splash
{
    public class SplashController : Controller
    {
		TorrentClient TorrentClient;
		
		[Url("/index")]
        public Response Index(Request incoming)
        {
            return View("index.html");
        }
		
		[Url("/initialize")]
        public Response Initialize(Request incoming)
        {
			Thread.Sleep(2000); //-- Show the splash screen bit :)
			TorrentClient = new TorrentClient();
            return Json(new { Ready = true });			
        }
		
		[Url("/search")]
        public Response Search(Request incoming)
        {
            return View("search.html");
        }
		
		[Url("/search-for")]
        public Response SearchForTerm(Request incoming)
        {
			var term = incoming.QueryString.Find("term");	
			var page = int.Parse(incoming.QueryString.Find("page"));
			var size = int.Parse(incoming.QueryString.Find("size"));
				
			var model = new SearchResults { SearchTerm = term };
			model.Items = IsoHuntApi.Search(term, page, size);
			
            return Json(model);
        }
		
		[Url("/start-torrent")]
        public Response StartTorrent(Request incoming)
        {
			var url = incoming.QueryString.Find("url");	
			TorrentClient.StartTorrent(url);
			
            return Json(new { Success = true });	
        }
		
		[Url("/downloads")]
		public Response Downloads(Request incoming)
		{
			return Basic("Downloads...");
		}
				
		[Catches]
        public Response HandleException(Exception ex)
        {
            return Basic(ex).With(r => r.StatusCode = 500);
        }
		
		protected override void CleanUpManagedResources()
		{
			TorrentClient.Dispose();
		}
    }
}
