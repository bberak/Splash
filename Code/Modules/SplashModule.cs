using BB.Common.WinForms;
using Nancy;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Appy.Core;
using Appy.Core.Nancy;
using Appy.Core.Themes;
using Splash.Services;
using Splash.Models;

namespace Splash.Modules
{
    public class SplashModule : NancyModule
    {
        public SplashModule()
        {
            Get["/"] = parameters =>
            {   
                return View["index"];
            };
        }
    }
}
