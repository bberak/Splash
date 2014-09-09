var StartupStore = require('./stores/startupStore.js');
var MenuStore = require('./stores/menuStore.js');
var SearchStore = require('./stores/searchStore.js');
var Constants = require('./constants.js');
var Fluxxor = require('fluxxor');

var actions = {
    appStart: function() {
        this.dispatch(Constants.Actions.APP_START);
    },
    downloadFolderSelected: function(path) {
    	this.dispatch(Constants.Actions.DOWNLOAD_FOLDER_SELECTED, { path: path});
    },
    menuSelected: function(menuName) {
    	this.dispatch(Constants.Actions.MENU_SELECTED, { name: menuName});
    },
    searchTermEntered: function(searchTerm){
    	this.dispatch(Constants.Actions.SEARCH_TERM_ENTERED, { term: searchTerm });
    },
    startDownload: function(url) {
       this.dispatch(Constants.Actions.START_DOWNLOAD, { url: url }); 
    }
};

var stores = {
    StartupStore: new StartupStore(),
    MenuStore: new MenuStore(),
    SearchStore: new SearchStore()
};

var Flux = new Fluxxor.Flux(stores, actions);

module.exports = Flux;
