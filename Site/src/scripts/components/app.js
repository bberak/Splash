/** @jsx React.DOM */

var React = require("react");
var ReactRouter = require("react-router");
var Reflux = require("reflux");
var SettingsStore = require("stores/settingsStore.js");

var App = React.createClass({
    
	mixins: [Reflux.connect(SettingsStore, "settings")],

    render: function() {
        var heading = "Splash: " + this.state.settings.dateModified;
        return (
            <h1>{heading}}</h1>
        );
    }
});

module.exports = App;