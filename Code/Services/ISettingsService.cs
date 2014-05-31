using System;
using Splash.Models;

namespace Splash.Services
{
	public interface ISettingsService
	{
		Settings Get();

		void Save(Settings userSettings); 
	}
}