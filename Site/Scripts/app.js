String.prototype.format = String.prototype.f = function() {
    var s = this,
        i = arguments.length;

    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};

String.prototype.replaceAll = function (find, replace) {
    var str = this;
    return str.replace(new RegExp(find, 'g'), replace);
};

createApp = function () {
    var self = {	
        initialize: function () {
            $.get("/initialize", function (data) {
                if (data.Ready)
					window.location = "/search";
            });
        },
		
		newSearch: function () {
			function wireEvents () {
				$("#search-button").click( function () {
					var term = $("#search-box").val();
					self.search(term);
				});
				$("#search-box").bind('keypress', function (e) {
					if (e.keyCode == 13) {
						$("#search-button").click();
					}
				});
				$(".download-trigger").live("click", function(e) {
					var button = $(this);
					if (!$(button).hasClass("disabled") && !$(button).hasClass("btn-danger")) {
						var url = $(this).attr("torrent-url");		
						$(button).removeClass("btn-primary");
						$(button).addClass("disabled");
						$(button).text("Downloading..");		
						$.get("/start-torrent?url={0}".f(encodeURIComponent(url)), function (response) {
							if (!response.Success) {
								$(button).removeClass("disabled");
								$(button).addClass("btn-danger");
								$(button).text("Error! Error!");
							}	
						});								
					}
					return false;
				});
				$("#load-more a").live("click", function (e) {
					if (!$(this).hasClass("disabled")) {
						var term = $(this).attr("term");
						var page = $(this).attr("page");
						var size = $(this).attr("size");
						self.search(term, page, size);
						$(this).removeClass("btn-info");
						$(this).addClass("disabled");
						$(this).text("Loading..");
					}
					return false;
				});
			}
			wireEvents();
			$("#search-box").focus();
		},
		
		search: function (term, page, size) {
			if (term === null || term === "") return;
			term = term.replaceAll('"', '');
			var h2 = $("h2.search-results");
			var ul = $("ul.search-results");
			var isPaging = arguments.length  == 3;
			if (!isPaging) { 
				page = 1; 
				size = 20; 
				$(ul).find("li").remove();
			}		
			$(h2).text("Searching for: " + term + "..");
			$.get("/search-for?term={0}&page={1}&size={2}".f(encodeURIComponent(term), page, size), function (data) {						
				$(h2).text("Search results for: " + term);
				$("#load-more").remove();
				for (var i = 0; i < data.Items.length; i++) {
					var item = data.Items[i];
					$(ul).append("<li class='clearfix'><div class='left'>{0} - {1}MB</div><div class='right'><a torrent-url='{2}' class='download-trigger btn btn-primary btn-small' href='#'>Download</a></div></li>".f(item.Title, item.Size, item.Url));
				}
				$(ul).append("<li id='load-more'><a class='btn btn-info btn-small' term=\"{0}\" page=\"{1}\" size=\"{2}\" href='#'>Load more</li>".f(term, ++page, size));
				if (isPaging) {
					var offset = $("#load-more").offset();
					offset.left -= 20;
					offset.top -= 20;
					$('html, body').animate({
						scrollTop: offset.top,
						scrollLeft: offset.left
					},
					1000);
				}
            });
		},

		startProgressPolling: function() {
			function updateDownloadItems () {
				$.get("/downloads-progress", function (data) {						
					for (var i = 0; i < data.length; i++) {
						var item = data[i];
						var li = $(".downloads-list li[torrent-id='{0}']".f(item.TorrentId));
						$(li).find(".progress").Text(item.PercentDownloaded);
						$(li).find(".state").Text(item.TorrentState);
					}
	            });
				tid = setTimeout(updateDownloadItems, 3000)
			}

			var tid = setTimeout(updateDownloadItems, 3000);
		}
    };
	
    return self;
};

var app = createApp();

