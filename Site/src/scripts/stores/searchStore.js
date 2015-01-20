var Fluxxor = require('fluxxor');
var Constants = require('constants.js');
var Config = require('config.js');
var _ = require('lodash');
var SearchResultModel = require('models/searchResultModel.js');


var SearchStore = Fluxxor.createStore({

    initialize: function() {
        
        this._searchTerm = null;
        this._page = null;
        this._results = [];
        this._status = Constants.SearchStatuses.NONE;

        this.bindActions(
            Constants.Actions.SEARCH_TERM_ENTERED, this._onSearchTermEntered,
            Constants.Actions.LOAD_NEXT_SEARCH_RESULTS, this._onLoadNextSearchResults,
            Constants.Actions.START_DOWNLOAD, this._onDownloadStarted
        );
    },

    _sanitizeSearchTerm: function(searchTerm) {

        if (searchTerm) {
            searchTerm = searchTerm.trim();
        }

        return searchTerm;
    },

    _isSearchTermNullOrWhitespace: function(searchTerm) {

        if (!searchTerm)
            return true;

        if (searchTerm.trim().length < 1)
            return true;

        return false;
    },

    _onSearchTermEntered: function(payload) {

        var searchTerm = this._sanitizeSearchTerm(payload.term);

        if (this._isSearchTermNullOrWhitespace(searchTerm)){

            this._searchTerm = null;
            this._page = null;
            this._results = [];
            this._status = Constants.SearchStatuses.NONE;
            this.emit("change");

            return;
        }

        if (searchTerm === this._searchTerm)
            return;

        console.log(searchTerm + "-" + this._searchTerm)

        this._searchTerm = searchTerm;

        setTimeout(function() {

            if (this._searchTerm === searchTerm) {

                this._page = 1;
                this._results = [];
                this._status = Constants.SearchStatuses.SEARCHING;
                this.emit("change");

                this._performSearch(this._searchTerm, this._page, Config.searchPageSize, function(results){

                    if (this._searchTerm === results.searchTerm &&
                        this._page === results.page) {
                     
                        console.log(this._searchTerm + "-" + searchTerm)

                        this._results = results.items;
                        this._status = Constants.SearchStatuses.NONE;
                        this.emit("change");
                    }

                }.bind(this));
            }
        }.bind(this), 800);
    },

    _performSearch: function(searchTerm, page, pageSize, onSuccess) {

        setTimeout(function() {

            var results = { 
                searchTerm: searchTerm, 
                page: page,
                pageSize: pageSize,
                items: [] 
            };

            for (var i = 0; i < pageSize; i++) {
                var name = searchTerm + "-" + page + "-" + i;
                var url = "http://"  + searchTerm + "-" + page + "-" + i;
                results.items.push(new SearchResultModel(name, 100, 75, url));
            }

            onSuccess(results);

        }.bind(this), 2000); 
    },

    _onLoadNextSearchResults: function() {

        if (this._isSearchTermNullOrWhitespace(this._searchTerm))
            return;
        
        this._status = Constants.SearchStatuses.PAGING;
        this.emit("change");

        this._performSearch(this._searchTerm, this._page + 1, Config.searchPageSize, function(results){

            if (this._searchTerm === results.searchTerm &&
                (this._page +1) === results.page) {
             
                console.log(this._searchTerm + "-" + results.searchTerm)

                this._page = results.page;
                this._results = this._results.concat(results.items);
                this._status = Constants.SearchStatuses.NONE;
                this.emit("change");
            }

        }.bind(this));
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
            term: this._searchTerm,
            status: this._status,
            results: this._results
        };
    }
});

module.exports = SearchStore;
