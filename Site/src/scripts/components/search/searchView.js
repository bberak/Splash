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

    onQueryChange: function(newQuery) {
        Actions.search(newQuery)
    },

    render: function() {

        var resultLists = _.map(this.state.searchData.results, function(r) {
            return <SearchResultList category={r.category} key={r.category} />;
        });

        return (
        	<div>
	            <h2>Search</h2>
	            <SearchBox query={this.state.searchData.query} onQueryChange={this.onQueryChange} />
	            {resultLists}
            </div>
        );
    }
});

module.exports = SearchView;