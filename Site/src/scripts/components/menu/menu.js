/** @jsx React.DOM */

var React = require("react");
var ReactRouter = require("react-router");

var Menu = React.createClass({

    render: function() {
        return (
            <ul>
            	<li><ReactRouter.Link activeClassName="selected" to="Search">Search</ReactRouter.Link></li>
            	<li><ReactRouter.Link activeClassName="selected" to="Downloads">Downloads</ReactRouter.Link></li>
            	<li><ReactRouter.Link activeClassName="selected" to="Settings">Settings</ReactRouter.Link></li>
            	<li><ReactRouter.Link activeClassName="selected" to="About">About</ReactRouter.Link></li>
            </ul>
        );
    }
});

module.exports = Menu;