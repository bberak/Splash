var Reflux = require("reflux");
var Api = require("api.js");

var Actions = Reflux.createActions([
	"beginDownload",
	"cancelDownload",
	"removeDownload",
	"updateSettings",
	"openFolder",
	"runFile",
	"clearSearch"
]);

var search = Actions.search = Reflux.createAction({ children: ["completed", "failed"] });

search.listen(function(query) {
    Api.searchMusic(query)
		.then(function(results){
			search.completed(query, "Music", results);
		})
	    .catch(function(error){
	    	search.failed(query, "Music", error);
	    });

    Api.searchVideos(query)
		.then(function(results){
			search.completed(query, "Videos", results);
		})
	    .catch(function(error){
	    	search.failed(query, "Videos", error);
	    });

    Api.searchGames(query)
		.then(function(results){
			search.completed(query, "Games", results);
		})
	    .catch(function(error){
	    	search.failed(query, "Games", error);
	    });
});

module.exports = Actions;


/*
// ProductActions.js

var ProductAPI = require('./ProductAPI');  
// contains `load` method that returns a promise

// Define action with child actions
var ProductActions = Reflux.createActions({  
    'load': {children: ['completed','failed']}
});

// And here is how you would hook it up to a promise
ProductActions.load.listen( function() {
    // Bind listener context to action by default
    ProductAPI.load()
        .then(this.completed)
        .catch(this.failed);
});
*/