var Fluxxor = require('fluxxor');
var Constants = require('constants.js');
var Config = require('config.js');
var _ = require('lodash');

var SearchStore = Fluxxor.createStore({

    initialize: function() {
        this._term = null;
        this._results = [];
        this._searching = false;
        this.bindActions(
            Constants.Actions.SEARCH_TERM_ENTERED, this._onSearchTermEntered,
            Constants.Actions.START_DOWNLOAD, this._onStartDownload
        );
    },

    _onSearchTermEntered: function(payload) {
        this._term = payload.term;
        this._searching = true;

        setTimeout(function() {
            this._results = [
                { name: "Ini",  downloading: false, size: 100, seeds: 75, url: "1" },
                { name: "Mini", downloading: false, size: 100, seeds: 75, url: "2" },
                { name: "Myni", downloading: false, size: 100, seeds: 75, url: "3" },
                { name: "Mo",   downloading: false, size: 100, seeds: 75, url: "4" }
            ];
            this._searching = false;
            this.emit("change");
        }.bind(this), 2000);

        this.emit("change");
    },

    _onStartDownload: function(payload) {
        var downloadingItems = _.where(this._results, { url: payload.url });
        _.forEach(downloadingItems, function(item) {
            item.downloading = true;
        });

        if (downloadingItems.length > 0)
            this.emit("change");
    },

    getState: function() {
        return {
            term: this._term,
            searching: this._searching,
            results: this._results
        };
    }
});

module.exports = SearchStore;