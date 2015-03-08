/** @jsx React.DOM */

var React = require("react");
var ReactRouter = require("react-router");
var Reflux = require("reflux");
var SettingsStore = require("stores/settings/settingsStore.js");

var SettingsView = React.createClass({
    
	mixins: [Reflux.connect(SettingsStore, "settings")],

    render: function() {
        return (
            <h2>Settings</h2>
        );
    }
});

module.exports = SettingsView;