
var Api = {
	searchMusic: function(query, page, pageSize) {
		page = page || 1;
		pageSize = pageSize || 20;
		return new Promise(function(resolve, reject){
			if (query && query.trim().length > 0) {

				setTimeout(function() {
					resolve(["First song " + query, "Second song " + query, "Third song " + query, "Fourth song " + query]);
				}, 2000);
			}
			else
				reject(Error("Invalid query"));
		});
	},

	searchVideos: function(query, page, pageSize) {
		page = page || 1;
		pageSize = pageSize || 20;
		return new Promise(function(resolve, reject){
			if (query && query.trim().length > 0) {

				setTimeout(function() {
					resolve(["First video " + query, "Second video " + query, "Third video " + query, "Fourth video " + query]);
				}, 2300);
			}
			else
				reject(Error("Invalid query"));
		});
	},

	searchGames: function(query, page, pageSize) {
		page = page || 1;
		pageSize = pageSize || 20;
		return new Promise(function(resolve, reject){
			if (query && query.trim().length > 0) {

				setTimeout(function() {
					resolve(["First game " + query, "Second game " + query, "Third game " + query, "Fourth game " + query]);
				}, 1500);
			}
			else
				reject(Error("Invalid query"));
		});
	}
};

module.exports = Api;