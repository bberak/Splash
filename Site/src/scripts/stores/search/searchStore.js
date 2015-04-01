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
			r.status = "Searching"
		});
		this.update();
	},

	onSearchCompleted: function(category, results) {

	},

	onSearchFailed: function(category, error) {
		var categoryResults = _.find(this.searchData.results, function(r) {
			return r.category.toLowerCase() === category.toLowerCase();
		})
		if (categoryResults) {
			categoryResults.status = error.toString();
			this.update();
		}
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
            	new SearchResults("Video"), 
            	new SearchResults("Games")
        	]
        };

        return this.searchData;
    }
});

module.exports = SearchStore;