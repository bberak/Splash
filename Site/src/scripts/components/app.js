/** @jsx React.DOM */

var React = require("react");
var ReactRouter = require("react-router");
var Reflux = require("reflux");
var SettingsStore = require("stores/settings/settingsStore.js");
var Menu = require("./menu/menu.js");

var App = React.createClass({
    
	mixins: [Reflux.connect(SettingsStore, "settings")],

    render: function() {
        return (
            <div>
                <h1>Splash</h1>
                <Menu />
                <ReactRouter.RouteHandler />
            </div>
        );
    }
});

module.exports = App;