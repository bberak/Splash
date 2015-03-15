/** @jsx React.DOM */

var React = require("react");
var ReactRouter = require("react-router");
var Reflux = require("reflux");
var SearchStore = require("stores/search/searchStore.js");
var SearchBox = require("./searchBox.js");
var SearchResultList = require("./searchResultList.js");

var SearchView = React.createClass({
    
	mixins: [Reflux.connect(SearchStore, "searchData")],

    render: function() {
        return (
        	<div>
	            <h2>Search</h2>
	            <SearchBox />
	            <SearchResultList />
            </div>
        );
    }
});

module.exports = SearchView;