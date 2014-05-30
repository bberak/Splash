using System;

namespace Splash.Models
{
	public class Settings
	{
		public Settings(string downloadsFolder)
		{
			DownloadsFolder = downloadsFolder;
		}

		public string DownloadsFolder { get; private set; }
	}
}