using System;
using System.Dynamic;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Windows.Forms;
using BB.Common.WinForms;
using Appy.Core;

namespace Splash
{
	public interface ISearchAdapter
	{
		List<SearchItem> Parse();
	}
	
	public class IsoHuntSearchAdapter : ISearchAdapter
	{
		string JsonSource;
		
		public IsoHuntSearchAdapter(string jsonSource)
		{
			JsonSource = jsonSource;
		}
		
		public List<SearchItem> Parse()
		{
			var list = new List<SearchItem>();
			dynamic obj = Json.ToObject(JsonSource);
			
			foreach (var item in obj.items.list)
			{
				list.Add(new SearchItem
				{
					Url = item.enclosure_url,
					Size = item.length / (1024*1024),
					Title = item.title
				});
			}
			
			return list;
		}
	}
	
	public static class IsoHuntApi
	{
		public static List<SearchItem> Search(string term, int page = 1, int rows = 20)
		{
			var url = string.Format("http://ca.isohunt.com/js/json.php?ihq={0}&start={1}&rows={2}", term, (page-1) * 20 + 1, rows);
			var json = Web.Get(url);
			var adapter = new IsoHuntSearchAdapter(json);
			
			return adapter.Parse();
		}
	}
}