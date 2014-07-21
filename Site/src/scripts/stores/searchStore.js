var Fluxxor = require('fluxxor');
var Constants = require('constants.js');
var Config = require('config.js');

var SearchStore = Fluxxor.createStore({

    initialize: function() {
        this._term = null;
        this._results = [];
        this._searching = false;
        this.bindActions(Constants.Actions.SEARCH_TERM_ENTERED, this._onSearchTermEntered);
    },

    _onSearchTermEntered: function(payload) {
        this._term = payload.term;
        this._searching = true;

        setTimeout(function() {
            this._results = [
                { name: "Ini", status: Constants.TorrentStatuses.NONE, size: 100, seeds: 75, url: "1" },
                { name: "Mini", status: Constants.TorrentStatuses.DOWNLOADING, size: 100, seeds: 75, url: "2" },
                { name: "Myni", status: Constants.TorrentStatuses.ERROR, size: 100, seeds: 75, url: "3" },
                { name: "Mo", status: Constants.TorrentStatuses.DOWLOADED, size: 100, seeds: 75, url: "4" }
            ];
            this._searching = false;
            this.emit("change");
        }.bind(this), 2000);

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
