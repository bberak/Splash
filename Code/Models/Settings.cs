using System;

namespace Splash.Models
{
	public class Settings
	{
		public string DownloadsFolder { get; private set; }

		public string DefaultDownloadsFolder { get; private set; }

		public DateTime? LastModified { get; set; }

		public bool IsFirstStartup
		{
			get 
			{
				return LastModified == null;
			}
		}

		public Settings(string downloadsFolder, string defaultDownloadsFolder, DateTime? lastModified)
		{
			DownloadsFolder = downloadsFolder;

			DefaultDownloadsFolder = defaultDownloadsFolder;

			LastModified = lastModified;
		}

		public static Settings Default(string defaultDownloadsFolder)
		{
			return new Settings(downloadsFolder: null, lastModified: null)
		}
	}
}