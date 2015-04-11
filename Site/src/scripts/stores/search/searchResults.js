var _ = require("lodash");
var SearchStatus = require("constants.js").searchStatus;

var SearchItem = function(name, url) {
	this.name = name;
	this.url = url;
};

var SearchResults = function(category, pageSize) {
    this.category = category;
    this.page = 0;
    this.pageSize = pageSize;
    this.items = [];
    this.status = SearchStatus.NONE;
    this.query = "";
    this.endOfList = false;
    this.error = "";

    this.searching = function(query) {
    	this.items.length = 0;
    	this.page = 0;
    	this.status = SearchStatus.SEARCHING;
    	this.query = query;
        this.endOfList = false;
    };

    this.searchCompleted = function(query, results) {
    	if (this.query === query) {
	    	this.items = _.map(results, function(r) {
	    		return new SearchItem(r.name, r.url);
	    	});
	    	this.page = 1;
	    	this.status = SearchStatus.NONE;
            this.endOfList = results.length < this.pageSize;
	    }
    };

    this.searchFailed = function(query, error) {
    	if (this.query === query) {
	    	this.items.length = 0;
	    	this.page = 0;
	    	this.status = SearchStatus.ERROR;
            this.error = error.toString();
	    }
    };

    this.clear = function() {
    	this.items.length = 0;
    	this.page = 0;
    	this.status = SearchStatus.NONE;
        this.error = "";
    };

    this.fetchingNextPage = function(query) {
        if (this.query === query) {
            this.status = SearchStatus.PAGING;
        }
    };

    this.nextPageLoaded = function (query, results, page) {
        var expectedPage = this.page + 1;
        if (this.query === query && expectedPage === page) {
            var newItems = _.map(results, function(r) {
                return new SearchItem(r.name, r.url);
            });
            this.items = this.items.concat(newItems);
            this.page = expectedPage;
            this.status = SearchStatus.NONE;
            this.endOfList =  results.length < this.pageSize;
        }
    };

    this.nextPageFailed = function(query, error) {
        if (this.query === query) {
            this.status = SearchStatus.ERROR;
            this.error = error.toString();
        }
    };
};

module.exports = SearchResults;