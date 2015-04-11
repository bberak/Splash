var _ = require("lodash");
var Reflux = require("reflux");
var Actions = require("actions.js");
var SearchResults = require("./searchResults.js");
var Actions = require("actions.js");
var Api = require("api.js");
var Config = require("config.js");

function sanitize(newQuery) {
	if (newQuery)
		return newQuery.trim();
}

var searches = {
	"Music": Api.searchMusic,
	"Videos": Api.searchVideos,
	"Games": Api.searchGames
};

function search(query) {
	var page = 1;
	var pageSize = Config.pageSize;

	for (var category in searches) {
		callSearchApi(category);
	}

	function callSearchApi(category) {
		searches[category](query, page, pageSize)
		.then(function(results){
			Actions.search.completed(query, category, results);
		})
	    .catch(function(error){
	    	Actions.search.failed(query, category, error);
	    });
	}
}

function fetchNextPage(query, category, nextPage) {
	var pageSize = Config.pageSize;

	searches[category](query, nextPage, pageSize)
	.then(function(results){
		Actions.pageSearchResults.completed(query, category, results, nextPage);
	})
    .catch(function(error){
    	Actions.pageSearchResults.failed(query, category, error, nextPage);
    });
}

var SearchStore = Reflux.createStore({

	listenables: [Actions],

	onSearch: function(newQuery) {
		newQuery = sanitize(newQuery);
		if (this.searchData.query !== newQuery) {
			this.searchData.query = newQuery;
			_.forEach(this.searchData.results, function(r) {
				r.searching(newQuery);
			});
			this.update();
			search(newQuery);
		}
	},

	onSearchCompleted: function(query, category, results) {
		var categoryResults = this.findResults(category);
		categoryResults.searchCompleted(query, results);
		this.update();
	},

	onSearchFailed: function(query, category, error) {
		var categoryResults = this.findResults(category);
		categoryResults.searchFailed(query, error);
		this.update();
	},

	onPageSearchResults: function(query, category, nextPage) {
		var categoryResults = this.findResults(category);
		categoryResults.fetchingNextPage(query);
		this.update();
		fetchNextPage(query, category, nextPage);
	},

	onPageSearchResultsCompleted: function(query, category, results, page) {
		var categoryResults = this.findResults(category);
		categoryResults.nextPageLoaded(query, results, page);
		this.update();
	},

	onPageSearchResultsFailed: function(query, category, error, page) {
		var categoryResults = this.findResults(category);
		categoryResults.nextPageFailed(query, error);
		this.update();
	},

	onClearSearch: function() {
		_.forEach(this.searchData.results, function(r) {
			r.clear();
		});
		this.searchData.query = "";
		this.update();
	},

	update: function (newSearchData) {
		if (newSearchData)
			this.searchData = newSearchData;
		this.trigger(this.searchData);
	},

	findResults: function(category) {
		var categoryResults = _.find(this.searchData.results, function(r) {
			return r.category.toLowerCase() === category.toLowerCase();
		});
		return categoryResults;
	},

    getInitialState: function() {
    	if (this.searchData)
    		return this.searchData;

        this.searchData = {
            query: "",
            results: [
            	new SearchResults("Music", Config.pageSize), 
            	new SearchResults("Videos", Config.pageSize), 
            	new SearchResults("Games", Config.pageSize)
        	]
        };

        return this.searchData;
    }
});

module.exports = SearchStore;