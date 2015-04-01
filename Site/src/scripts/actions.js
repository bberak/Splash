var Reflux = require("reflux");
var Api = require("api.js");

var Actions = Reflux.createActions([
	"beginDownload",
	"cancelDownload",
	"removeDownload",
	"updateSettings",
	"openFolder",
	"runFile"
]);

var search = Actions.search = Reflux.createAction({ children: ["completed", "failed"] });

search.listen(function(query) {
    Api.searchMusic(query)
		.then(function(results){
			search.completed("Music", results);
		})
	    .catch(function(error){
	    	search.failed("Music", error);
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