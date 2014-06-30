/** @jsx React.DOM */

var React = require('react');
var Fluxxor = require('fluxxor');
var WelcomeView = require('./welcome/welcomeView.js')
var Container = require('./container.js');
var Loader = require('./loader.js');

var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Canvas = React.createClass({

	mixins: [FluxMixin, StoreWatchMixin("StartupStore")],

	getStateFromFlux: function() {
	    return {
	    	startup: this.getFlux().store("StartupStore").getState()
	    };
  	},

	render: function() {

		var component = null;

		if (!this.state.startup.ready) {
			component = <Loader />;
		}
		else
		{
			if (this.state.startup.firstStartup)
				component = <WelcomeView />;
			else
				component = <Container />;
		}
	

		return <div>{component}</div>;
	}

});

module.exports = Canvas;