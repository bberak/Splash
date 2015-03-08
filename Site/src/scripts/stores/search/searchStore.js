var _ = require("lodash");
var Reflux = require("reflux");
var Actions = require("actions.js");
var SearchResults = require("./searchResults.js");

var SearchStore = Reflux.createStore({

    getInitialState: function() {
        this.searchData = {
            query: "",
            musicResults: new SearchResults("music"),
            videoResults: new SearchResults("video"),
            gameResults: new SearchResults("game")
        };

        return this.searchData;
    }
});

module.exports = SearchStore;