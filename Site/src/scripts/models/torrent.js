var Constants = require('constants.js');


var Torrent = function(name, url, status, progress, path) {
    this.name = name;
    this.url = url;
    this.status = status || Constants.TorrentStatuses.NONE;
    this.progress = progress || 0.0;
    this.path = path || null;

    this.startDownloading = function(path) {
    	if (!path)
    		throw 'Path cannot be empty'

    	this.path = path;
        this.status = Constants.TorrentStatuses.DOWNLOADING;
    };

    this.die = function() {
    	this.status = Constants.TorrentStatuses.ERROR;
    };

    this.updateProgress = function(newProgress) {
    	if (newProgress > 1.0)
    		newProgress = 1.0;

    	this.progress = newProgress;

    	if (this.progress === 1.0)
    		this.status = Constants.TorrentStatuses.COMPLETE;
    };
};

module.exports = Torrent;