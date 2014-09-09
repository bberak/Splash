var Fluxxor = require('fluxxor');
var Constants = require('constants.js');
var Config = require('config.js');
var _ = require('lodash');

var DownloadStore = Fluxxor.createStore({

    initialize: function() {
        this._downloads = [];
        this.bindActions(
            Constants.Actions.START_DOWNLOAD, this._onStartDownload
        );
    },

    _onStartDownload: function(payload) {
        this._downloads.push({
            url: payload.url, 
            name: payload.name,
            progress: 0.05 
        });

        this.emit("change");
    },

    getState: function() {
        return {
            downloads: this._downloads
        };
    }
});

module.exports = DownloadStore;
