var StartupStore = require('./stores/startupStore.js');
var MenuStore = require('./stores/menuStore.js');
var SearchStore = require('./stores/searchStore.js');
var Constants = require('./constants.js');
var Fluxxor = require('fluxxor');

var actions = {
    appStart: function() {
        this.dispatch(Constants.actions.APP_START);
    },
    downloadFolderSelected: function(path) {
    	this.dispatch(Constants.actions.DOWNLOAD_FOLDER_SELECTED, { path: path});
    },
    menuSelected: function(menuName) {
    	this.dispatch(Constants.actions.MENU_SELECTED, { name: menuName});
    },
    searchTermEntered: function(searchTerm){
    	this.dispatch(Constants.actions.SEARCH_TERM_ENTERED, { term: searchTerm });
    }
};

var stores = {
    StartupStore: new StartupStore(),
    MenuStore: new MenuStore(),
    SearchStore: new SearchStore()
};

var Flux = new Fluxxor.Flux(stores, actions);

module.exports = Flux;
