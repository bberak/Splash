var StartupStore = require('./stores/startupStore.js');
var Constants = require('./constants.js');
var Fluxxor = require('fluxxor');

var actions = {
    appStart: function() {
        this.dispatch(Constants.actions.APP_START);
    },
    downloadFolderSelected: function(path) {
    	this.dispatch(Constants.actions.DOWNLOAD_FOLDER_SELECTED, { path: path});
    }
};

var stores = {
    StartupStore: new StartupStore()
};

var flux = new Fluxxor.Flux(stores, actions);

module.exports = flux;
