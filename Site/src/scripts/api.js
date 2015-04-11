
var Api = {
	searchMusic: function(query, page, pageSize) {
		page = page || 1;
		pageSize = pageSize || 10;
		return new Promise(function(resolve, reject){
			if (query && query.trim().length > 0) {
				setTimeout(function() {
					resolve(getResults("Song", query, page, pageSize));
				}, 2000);
			}
			else
				reject(Error("Invalid query"));
		});
	},

	searchVideos: function(query, page, pageSize) {
		page = page || 1;
		pageSize = pageSize || 10;
		return new Promise(function(resolve, reject){
			if (query && query.trim().length > 0) {
				setTimeout(function() {
					resolve(getResults("Video", query, page, pageSize));
				}, 2300);
			}
			else
				reject(Error("Invalid query"));
		});
	},

	searchGames: function(query, page, pageSize) {
		page = page || 1;
		pageSize = pageSize || 10;
		return new Promise(function(resolve, reject){
			if (query && query.trim().length > 0) {
				setTimeout(function() {
					resolve(getResults("Game", query, page, pageSize));
				}, 1500);
			}
			else
				reject(Error("Invalid query"));
		});
	}
};

function getResults(type, query, page, pageSize) {
	var results = [];
	for (var i = 0; i < pageSize; i++)
		results.push({ 
			name: type + "-" + query,
			url: "http://" + type + "-" + query + "/" + page + "/" + i
		});

	return results;
}

module.exports = Api;