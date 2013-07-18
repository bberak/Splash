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
			Thread.Sleep(1000);
            return Json(new { success = true });
        }
		
		[Url("/search")]
        public Response Search(Request incoming)
        {
            return View("search.html");
        }
				
		[Catches]
        public Response HandleException(Exception ex)
        {
            return Basic(ex.ToString()).With(r => r.StatusCode = 500);
        }
    }
}
