
var Api = {
	searchMusic: function(query, currentPage, pageSize) {
		currentPage = currentPage || 1;
		pageSize = pageSize || 20;
		return new Promise(function(resolve, reject){
			/*if (query && query.trim().length > 0) {

				setTimeout(function() {
					resolve(["First song", "Second song", "Third song", "Fourth song"]);
				}, 2000);
			}
			else*/
				reject(Error("Invalid query"));
		});
	}
};

module.exports = Api;