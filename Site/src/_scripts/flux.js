var SettingsStore = require('./stores/settingsStore.js');
var MenuStore = require('./stores/menuStore.js');
var SearchStore = require('./stores/searchStore.js');
var DownloadStore = require('./stores/downloadStore.js');
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
    loadNextSearchResults: function(){
        this.dispatch(Constants.Actions.LOAD_NEXT_SEARCH_RESULTS);
    },
    startDownload: function(name, url) {
       this.dispatch(Constants.Actions.START_DOWNLOAD, { name: name, url: url }); 
    },
};

var stores = {
    SettingsStore: new SettingsStore(),
    MenuStore: new MenuStore(),
    SearchStore: new SearchStore(),
    DownloadStore: new DownloadStore()
};

var Flux = new Fluxxor.Flux(stores, actions);

module.exports = Flux;
