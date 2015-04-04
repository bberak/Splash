var _ = require("lodash");

var SearchItem = function(name, url) {
	this.name = name;
	this.url = url;
};

var SearchResults = function(category) {
    this.category = category;
    this.page = 0;
    this.pageSize = 0;
    this.items = [];
    this.status = "";
    this.query = "";
    this.searching = function(query) {
    	this.items.length = 0;
    	this.page = 0;
    	this.pageSize = 1;
    	this.status = "Searching";
    	this.query = query;
    };
    this.searchCompleted = function(query, results) {
    	if (this.query === query) {
	    	this.items = _.map(results, function(r) {
	    		return new SearchItem(r, "http://" + r + ".com");
	    	});
	    	this.page = 0;
	    	this.pageSize = 0;
	    	this.status = "";
	    }
    };
    this.searchFailed = function(query, error) {
    	if (this.query === query) {
	    	this.items.length = 0;
	    	this.page = 0;
	    	this.pageSize = 0;
	    	this.status = error.toString();
	    }
    };
    this.clear = function() {
    	this.items.length = 0;
    	this.page = 0;
    	this.pageSize = 0;
    	this.status = "";
    };
};

module.exports = SearchResults;