var Fluxxor = require('fluxxor');
var Constants = require('constants.js');

var StartupStore = Fluxxor.createStore({

    initialize: function() {
        this._ready = false;
        this._firstStartup = false;
        this.bindActions(Constants.Actions.APP_START, this._onAppStart);
        this.bindActions(Constants.Actions.DOWNLOAD_FOLDER_SELECTED, this._onDownloadFolderSelected);
    },

    _onAppStart: function() {
        setTimeout(function() {
          this._ready = true;
          this._firstStartup = true;
          this.emit("change");
        }.bind(this), 2000);
    },

    _onDownloadFolderSelected: function(payload) {
      this._firstStartup = false;
      this.emit("change");
    },

    getState: function() {
        return {
            ready: this._ready,
            firstStartup: this._firstStartup
        };
    }
});

module.exports = StartupStore;
