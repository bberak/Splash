/** @jsx React.DOM */

var React = require('react');
var Fluxxor = require('fluxxor');
var WelcomeView = require('./welcome/welcomeView.js')
var Container = require('./container.js');
var Loader = require('./loader.js');

var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Canvas = React.createClass({

	mixins: [FluxMixin, StoreWatchMixin("SettingsStore")],

	getStateFromFlux: function() {
    	return this.getFlux().store("SettingsStore").getState();
  	},

	render: function() {

		var component = null;

		if (!this.state.ready) {
			component = <Loader />;
		}
		else
		{
			if (this.state.firstStartup)
				component = <WelcomeView defaultFolder={this.state.defaultDownloadFolder} />;
			else
				component = <Container />;
		}
	

		return <div>{component}</div>;
	}

});

module.exports = Canvas;