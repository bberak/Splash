var Fluxxor = require('fluxxor');
var Constants = require('constants.js');
var Config = require('config.js');
var _ = require('lodash');
var Torrent = require('models/torrent.js');

var DownloadStore = Fluxxor.createStore({

    initialize: function() {
        this._downloads = [];
        this.bindActions(
            Constants.Actions.START_DOWNLOAD, this._onStartDownload
        );
        this._startPolling();
    },

    _onStartDownload: function(payload) {

        var existing = _.find(this._downloads, function(d) {
            return d.url === payload.url;
        });

        if (existing)
            return;

        var torrent = new Torrent(payload.name, payload.url);
        this._downloads.push(torrent);
        this.emit("change");

        setTimeout(function() {
            torrent.startDownloading('C:\\Downloads');
            this.emit('change');
        }.bind(this), 2000);        
    },

    _startPolling: function() {

        setInterval(function(){
            _.forEach(this._downloads, function(d)
            {
                d.updateProgress(d.progress + 0.01);
            })
            this.emit("change");
        }.bind(this), 500);
    },

    getState: function() {
        return {
            downloads: this._downloads
        };
    }
});

module.exports = DownloadStore;
