/** @jsx React.DOM */

var React = require("react");
var ReactRouter = require("react-router");
var Reflux = require("reflux");
var SearchStore = require("stores/search/searchStore.js");

var SearchView = React.createClass({
    
	mixins: [Reflux.connect(SearchStore, "searchData")],

    render: function() {
        return (
            <h2>Search</h2>
        );
    }
});

module.exports = SearchView;