var _ = require("lodash");
var Reflux = require("reflux");
var Actions = require("actions.js");
var SearchResults = require("./searchResults.js");

var SearchStore = Reflux.createStore({

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