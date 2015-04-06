/** @jsx React.DOM */

var React = require("react");
var Reflux = require("reflux");
var ReactRouter = require("react-router");
var SearchStore = require("stores/search/searchStore.js");

var Menu = React.createClass({

    mixins: [Reflux.connect(SearchStore, "searchData")],

    render: function() {
        return (
            <ul>
            	<li><ReactRouter.Link activeClassName="selected" to="Search" params={{ query: this.state.searchData.query }}>Search</ReactRouter.Link></li>
            	<li><ReactRouter.Link activeClassName="selected" to="Downloads">Downloads</ReactRouter.Link></li>
            	<li><ReactRouter.Link activeClassName="selected" to="Settings">Settings</ReactRouter.Link></li>
            	<li><ReactRouter.Link activeClassName="selected" to="About">About</ReactRouter.Link></li>
            </ul>
        );
    }
});

module.exports = Menu;