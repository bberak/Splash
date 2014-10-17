var Fluxxor = require('fluxxor');
var Constants = require('constants.js');

var SettingsStore = Fluxxor.createStore({

    initialize: function() {
        this._ready = false;
        this._firstStartup = false;
        this._downloadFolder = null;
        this._defaultDownloadFolder = null;
        this.bindActions(Constants.Actions.APP_START, this._onAppStart);
        this.bindActions(Constants.Actions.DOWNLOAD_FOLDER_SELECTED, this._onDownloadFolderSelected);
    },

    _onAppStart: function() {
        setTimeout(function() {
          this._ready = true;
          this._firstStartup = true;
          this._downloadFolder = null;
          this._defaultDownloadFolder = 'C:\\Users\\Boris\\AppData'
          this.emit("change");
        }.bind(this), 2000);
    },

    _onDownloadFolderSelected: function(payload) {
      this._firstStartup = false;
      this._downloadFolder = payload.path;
      this.emit("change");
    },

    getState: function() {
        return {
            ready: this._ready,
            firstStartup: this._firstStartup,
            downloadFolder: this._downloadFoler,
            defaultDownloadFolder: this._defaultDownloadFolder
        };
    }
});

module.exports = SettingsStore;
