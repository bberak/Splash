using System;
using Appy.Core.Framework;
using Splash.Models;

namespace Splash.Services
{
	public class SettingsService : ISettingsService
	{
		public Settings GetSettings()
		{
			var appDataFolder = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData);

			var splashSettingsFile = Dirs.Combine(appDataFolder, "Splash", "Settings.json");

			return null;
		}
	}
}