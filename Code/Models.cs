using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Windows.Forms;
using BB.Common.WinForms;
using Appy.Core;

namespace Splash
{
	public class SearchItem
	{
		public string Url { get; set; }
		public string Title { get; set; }
		public decimal Size { get; set; }
	}
	
	public class SearchResults
	{
		public List<SearchItem> Items { get; set; }
		public string SearchTerm { get; set; }
		
		public SearchResults()
		{
			Items = new List<SearchItem>();
		}
	}
	
	public class DownloadProgress
	{
		public string TorrentId { get; set; }
		public string TorrentState { get; set; }
		public decimal PercentDownloaded { get; set; }
	}
	
	public class DownloadItem : DownloadProgress
	{
		public string TorrentName { get; set; }	
		public decimal Size { get; set; }
	}
}