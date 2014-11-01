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
			var appDataFolder = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);

			SettingsFile = Dirs.Combine(appDataFolder, "Splash", "Settings.json");
		}

		public Settings Get()
		{
			if (File.Exists(SettingsFile))
			{
				var jsonString = File.ReadAllText(SettingsFile);

				return Json.ToObject<Settings>(jsonString);
			}

			var myDocs = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);

			return Settings.Default(defaultDownloadsFolder: Dirs.Combine(myDocs, "Splash"));
		}

		public Settings Save(Settings settings)
		{
			settings.LastModified = DateTime.Now;

			var jsonString = Json.ToString(settings);

			File.WriteAllText(SettingsFile, jsonString);

			return settings;
		}
	}
}