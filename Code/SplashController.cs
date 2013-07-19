using System;
using System.Collections.Generic;
using System.Diagnostics;
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
		[Url("/index")]
        public Response Index(Request incoming)
        {
            return View("index.html");
        }
		
		[Url("/initialize")]
        public Response Initialize(Request incoming)
        {
			Thread.Sleep(2000);
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
			
			var model = new SearchResults { SearchTerm = term };
			model.Items = IsoHuntApi.Search(term);
			
            return Json(model);
        }
				
		[Catches]
        public Response HandleException(Exception ex)
        {
            return Basic(ex).With(r => r.StatusCode = 500);
        }
    }
}
