createApp = function () {
    var self = {	
        initialize: function () {
            $.get("/initialize", function (data) {
                if (data.Ready)
					window.location = "/search";
            });
        },
		
		newSearch: function () {
			function prepareSearch () {
				$("#search-button").click( function () {
					var term = $("#search-box").val();
					self.search(term);
				});
				$("#search-box").bind('keypress', function (e) {
					if (e.keyCode == 13) {
						$("#search-button").click();
					}
				});
			}
			prepareSearch();
			$("#search-box").focus();
		},
		
		search: function (term) {
			var h2 = $("h2.search-results");
			$(h2).text("Searching for: " + term + "..");
			$.get("/search-for?term=" + encodeURIComponent(term), function (data) {			
				var ul = $("ul.search-results");		
				$(ul).find("li").remove();
				$(h2).text("Search results for: " + term);
				for (var i = 0; i < data.Items.length; i++) {
					var item = data.Items[i];
					$(ul).append("<li>" + item.Url + " - " + item.Title + " - " + item.Size + "MB</li>");
				}
            });
		}
    };
	
    return self;
};

var app = createApp();

