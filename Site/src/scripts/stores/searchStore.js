var Fluxxor = require('fluxxor');
var Constants = require('constants.js');
var Config = require('config.js');
var _ = require('lodash');
var SearchResultModel = require('models/searchResultModel.js');

var SearchStore = Fluxxor.createStore({

    initialize: function() {
        this._term = null;
        this._page = null;
        this._results = [];
        this._status = Constants.SearchStatuses.NONE;
        this.bindActions(
            Constants.Actions.SEARCH_TERM_ENTERED, this._onSearchTermEntered,
            Constants.Actions.LOAD_NEXT_SEARCH_RESULTS, this._onLoadNextSearchResults,
            Constants.Actions.START_DOWNLOAD, this._onDownloadStarted
        );
    },

    _isValidSearchTerm: function(currentSearchTerm, newSearchTerm){

        if (!newSearchTerm)
            return false;

        if (newSearchTerm.length < 1)
            return false;

        if (currentSearchTerm === newSearchTerm)
            return false;

        if (currentSearchTerm && currentSearchTerm.valueOf() === newSearchTerm.valueOf())
            return false;

        return true;
    },

    _onSearchTermEntered: function(payload) {

        if (this._isValidSearchTerm(this._term, payload.term) == false)
            return;

        this._results.length = 0;
        this._term = payload.term;
        this._page = 1;
        this._status = Constants.SearchStatuses.SEARCHING;
        this.emit("change");
            
        setTimeout(function() {
            for (var i = 0; i < Config.searchPageSize; i++) {
                this._results.push(new SearchResultModel('Name' + i.toString(), 100, 75, 'http://' + i.toString()));
            }
            this._status = Constants.SearchStatuses.NONE;
            this.emit("change");
        }.bind(this), 2000); 
    },

    _onLoadNextSearchResults: function() {
        this._status = Constants.SearchStatuses.PAGING;
        this.emit("change");

        setTimeout(function() {
            this._page = this._page + 1;
            var start = (this._page - 1) * Config.searchPageSize;
            var end = start + Config.searchPageSize;
            for (var i = start; i < end; i++) {
                this._results.push(new SearchResultModel('Name' + i.toString(), 100, 75, 'http://' + i.toString()));
            }
            this._status = Constants.SearchStatuses.NONE;
            this.emit("change");           
        }.bind(this), 2000);  
    },

    _onDownloadStarted: function(payload) {
        var item = _.find(this._results, function(r) {
            return r.url === payload.url;
        });

        if (item) {
            item.click();
            this.emit('change');
        }
    },

    getState: function() {
        return {
            term: this._term,
            status: this._status,
            results: this._results
        };
    }
});

module.exports = SearchStore;
