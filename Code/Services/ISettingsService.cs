using System;
using Splash.Models;

namespace Splash.Services
{
	public interface ISettingsService
	{
		Settings Get();

		Settings Save(Settings settings); 
	}
}