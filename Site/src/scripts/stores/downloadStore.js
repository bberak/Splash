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
        this._startPolling();
    },

    _onStartDownload: function(payload) {
        this._downloads.push({
            url: payload.url, 
            name: payload.name,
            progress: 0.05,
            status: Constants.TorrentStatuses.DOWNLOADING 
        });

        this.emit("change");
    },

    _startPolling: function() {

        setInterval(function(){
            _.forEach(this._downloads, function(d)
            {
                if (d.progress < 1.0)
                    d.progress += 0.01;

                if (d.progress >= 1.0) {
                    d.progress = 1.0;
                    d.status = _onStartDownload.TorrentStatuses.COMPLETE;
                }
            })
            this.emit("change");
        }.bind(this), 2000);
    },

    getState: function() {
        return {
            downloads: this._downloads
        };
    }
});

module.exports = DownloadStore;
