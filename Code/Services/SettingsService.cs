using System;
using System.IO;
using Appy.Core.Framework;
using Splash.Models;

namespace Splash.Services
{
	public class SettingsService : ISettingsService
	{
		private readonly string SettingsFile;

		public SettingsService()
		{
			var appDataFolder = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData);

			SettingsFile = Dirs.Combine(appDataFolder, "Splash", "Settings.json");
		}

		public Settings Get()
		{
			if (File.Exists(SettingsFile))
			{
				var jsonString = File.ReadAllText(SettingsFile);

				return Json.ToObject<Settings>(jsonString);
			}

			return null;
		}

		public void Save(Settings userSettings)
		{
			var jsonString = Json.ToString(userSettings);

			File.WriteAllText(SettingsFile, jsonString);
		}
	}
}