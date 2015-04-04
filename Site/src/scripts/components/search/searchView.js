/** @jsx React.DOM */

var React = require("react");
var ReactRouter = require("react-router");
var Reflux = require("reflux");
var SearchStore = require("stores/search/searchStore.js");
var SearchBox = require("./searchBox.js");
var SearchResultList = require("./searchResultList.js");
var _ = require("lodash");
var Actions = require("actions.js");

var SearchView = React.createClass({
    
	mixins: [Reflux.connect(SearchStore, "searchData")],

    onQueryChanged: function(newQuery) {
        Actions.search(newQuery)
    },

    onQueryCleared: function() {
        Actions.clearSearch();
    },

    render: function() {

        var resultLists = _.map(this.state.searchData.results, function(r) {
            return <SearchResultList category={r.category} key={r.category} status={r.status} items={r.items} />;
        });

        return (
        	<div>
	            <h2>Search</h2>
	            <SearchBox query={this.state.searchData.query} onQueryChanged={this.onQueryChanged} onQueryCleared={this.onQueryCleared} />
	            {resultLists}
            </div>
        );
    }
});

module.exports = SearchView;