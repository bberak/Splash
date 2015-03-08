/** @jsx React.DOM */

var React = require("react");
var ReactRouter = require("react-router");
var Reflux = require("reflux");
var SettingsStore = require("stores/settings/settingsStore.js");

var DownloadsView = React.createClass({
    
	mixins: [Reflux.connect(SettingsStore, "settings")],

    render: function() {
        return (
            <h2>Downloads</h2>
        );
    }
});

module.exports = DownloadsView;