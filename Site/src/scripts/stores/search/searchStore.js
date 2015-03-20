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

		if (newQuery && newQuery.length > 0){
			this.searchData.query = newQuery;
			this.trigger(this.searchData);
			alert(newQuery);
		}
	},

    getInitialState: function() {
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