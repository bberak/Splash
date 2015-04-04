var _ = require("lodash");
var Reflux = require("reflux");
var Actions = require("actions.js");
var SearchResults = require("./searchResults.js");
var Actions = require("actions.js");

function sanitize(newQuery) {
	if (newQuery)
		return newQuery.trim();
}

var SearchStore = Reflux.createStore({

	listenables: [Actions],

	onSearch: function(newQuery) {
		newQuery = sanitize(newQuery);
		this.searchData.query = newQuery;
		_.forEach(this.searchData.results, function(r) {
			r.searching(newQuery);
		});
		this.update();
	},

	onSearchCompleted: function(query, category, results) {
		var categoryResults = _.find(this.searchData.results, function(r) {
			return r.category.toLowerCase() === category.toLowerCase();
		});
		if (categoryResults) {
			categoryResults.searchCompleted(query, results);
			this.update();
		}
	},

	onSearchFailed: function(query, category, error) {
		var categoryResults = _.find(this.searchData.results, function(r) {
			return r.category.toLowerCase() === category.toLowerCase();
		});
		if (categoryResults) {
			categoryResults.searchFailed(query, error);
			this.update();
		}
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

    getInitialState: function() {
    	if (this.searchData)
    		return this.searchData;

        this.searchData = {
            query: "",
            results: [
            	new SearchResults("Music"), 
            	new SearchResults("Videos"), 
            	new SearchResults("Games")
        	]
        };

        return this.searchData;
    }
});

module.exports = SearchStore;