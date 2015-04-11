/** @jsx React.DOM */

var React = require("react");
var ReactRouter = require("react-router");
var Reflux = require("reflux");
var SearchStore = require("stores/search/searchStore.js");
var SearchBox = require("./searchBox.js");
var SearchResultList = require("./searchResultList.js");
var _ = require("lodash");
var Actions = require("actions.js");
var Config = require("config.js");

var SearchView = React.createClass({
    
	mixins: [Reflux.connect(SearchStore, "searchData")],

    statics: {
        willTransitionTo: function (transition, params) {
            if (params.query) 
                Actions.search(params.query);
        }
    },

    onQueryChanged: function(newQuery) {
        ReactRouter.HashLocation.replace("/search/" + newQuery);
    },

    onQueryCleared: function() {
        ReactRouter.HashLocation.replace("/search/");
        Actions.clearSearch();
    },

    onPageResults: function(query, category, nextPage) {
        Actions.pageSearchResults(query, category, nextPage);
    },

    render: function() {
        var resultLists = _.map(this.state.searchData.results, function(r) {
            return <SearchResultList category={r.category} 
                    key={r.category} 
                    status={r.status} 
                    items={r.items} 
                    page={r.page}
                    endOfList={r.endOfList}
                    onPageList={this.onPageResults}
                    query={this.state.searchData.query} />;
        }.bind(this));

        return (
        	<div>
	            <h2>Search</h2>
	            <SearchBox query={this.state.searchData.query} 
                    onQueryChanged={this.onQueryChanged} 
                    onQueryCleared={this.onQueryCleared} 
                    debounce={Config.searchDebounce} />
                <div className="searchResults">
	               {resultLists}
                </div>
            </div>
        );
    }
});

module.exports = SearchView;