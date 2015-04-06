
var Api = {
	searchMusic: function(query, page, pageSize) {
		page = page || 1;
		pageSize = pageSize || 10;
		return new Promise(function(resolve, reject){
			if (query && query.trim().length > 0) {
				setTimeout(function() {
					resolve(getResults("Song", query, pageSize));
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
					resolve(getResults("Video", query, pageSize));
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
					resolve(getResults("Game", query, pageSize));
				}, 1500);
			}
			else
				reject(Error("Invalid query"));
		});
	}
};

function getResults(type, query, pageSize) {
	var results = [];
	for (var i = 0; i < pageSize; i++)
		results.push(type + " " + query + " " + "#" + i);

	return results;
}

module.exports = Api;