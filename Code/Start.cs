using System;
using System.Reflection;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;
using System.Collections.Generic;
using System.Linq;
using System.Windows.Forms;
using BB.Common.WinForms;
using System.Drawing;
using Appy.Core;
using Appy.Core.Themes;

// General Information about an assembly is controlled through the following 
// set of attributes. Change these attribute values to modify the information
// associated with an assembly.
[assembly: AssemblyTitle("Splash")]
[assembly: AssemblyDescription("")]
[assembly: AssemblyConfiguration("")]
[assembly: AssemblyCompany("")]
[assembly: AssemblyProduct("Splash")]
[assembly: AssemblyCopyright("Copyright ©  2014")]
[assembly: AssemblyTrademark("")]
[assembly: AssemblyCulture("")]

// Setting ComVisible to false makes the types in this assembly not visible 
// to COM components.  If you need to access a type in this assembly from 
// COM, set the ComVisible attribute to true on that type.
[assembly: ComVisible(false)]

// The following GUID is for the ID of the typelib if this project is exposed to COM
[assembly: Guid("4a974516-3ceb-4097-8850-0ec40cb31024")]

// Version information for an assembly consists of the following four values:
//
//      Major Version
//      Minor Version 
//      Build Number
//      Revision
//
// You can specify all the values or you can default the Build and Revision Numbers 
// by using the '*' as shown below:
// [assembly: AssemblyVersion("1.0.*")]
[assembly: AssemblyVersion("1.0.0.0")]
[assembly: AssemblyFileVersion("1.0.0.0")]

namespace Splash
{
    static class Start
    {
        /// <summary>
        /// The main entry point for the application.
        /// </summary>
        [STAThread]
        static void Main()
        {
            //-- TODO:
            //Application.EnableVisualStyles();
            //Application.SetCompatibleTextRenderingDefault(false);
            Control.CheckForIllegalCrossThreadCalls = false;

			App app = new App("http://localhost:9393/");
			app.Text = "Splash";
            ThemeManager.ApplyTheme(GetMyTheme());
            Application.Run(app);
        }

		static BaseTheme GetMyTheme()
        {
            var myTheme = new AppyTheme();

            //-- Uncomment lines below to see the effects!
            //myTheme.Units["PanelBorderWidth"] = 0;
            //myTheme.Colors["PanelBorder"] = Color.DarkGray;
            //myTheme.Colors["FormBorder"] = Color.DarkGray;
            //myTheme.Colors["FormBackground"] = Color.Pink;
            //myTheme.Colors["ButtonMouseOverForeground"] = Color.White;
            //myTheme.Colors["ButtonMouseOverBorder"] = Color.DeepPink;
            //myTheme.Colors["ButtonMouseOverBackground"] = Color.DeepPink;
            //myTheme.Colors["ButtonMouseDownBackground"] = Color.DeepPink;
            //myTheme.Colors["ButtonForeground"] = Color.DarkGray;
            //myTheme.Units["ButtonBorderSize"] = 2;
            //myTheme.Colors["ButtonBorder"] = Color.White;
            //myTheme.Colors["ButtonBackground"] = Color.White;
            //myTheme.Colors["ResizeButtonMouseOverForeground"] = Color.DeepPink;
            //myTheme.Colors["ResizeButtonMouseOverBorder"] = Color.DeepPink;
            //myTheme.Colors["ResizeButtonMouseOverBackground"] = Color.DeepPink;
            //myTheme.Colors["ResizeButtonMouseDownBackground"] = Color.DeepPink;
            //myTheme.Colors["ResizeButtonForeground"] = Color.DarkGray;
            //myTheme.Units["ResizeButtonBorderSize"] = 2;
            //myTheme.Colors["ResizeButtonBorder"] = Color.Lavender;
            //myTheme.Colors["ResizeButtonBackground"] = Color.Lavender;
            //myTheme.Colors["ToolTipBackground"] = Color.White;
            //myTheme.Colors["ToolTipForeground"] = Color.Black;
            //myTheme.Units["FormBorderWidth"] = 2;

            return myTheme;
        }
    }
}
