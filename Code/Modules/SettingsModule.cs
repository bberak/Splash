using BB.Common.WinForms;
using Nancy;
using Nancy.ModelBinding;
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
    public class SettingsModule : NancyModule
    {
        public SettingsModule(ISettingsService settingsService)
            : base("/Settings")
        {
            Get["/"] = _ =>
            {   
                return this.Response.AsJson(settingsService.Get());
            };

            Post["/Save"] = _ => 
            {
                var settings = this.Bind<Settings>();

                settingsService.Save(settings);

                return HttpStatusCode.OK;
            };
        }
    }
}
