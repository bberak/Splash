/** @jsx React.DOM */

var React = require('react');
var Fluxxor = require('fluxxor');
var WelcomeView = require('./welcome/welcomeView.js')
var Container = require('./container.js');

var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Canvas = React.createClass({

	mixins: [FluxMixin, StoreWatchMixin("StartupStore")],

	getStateFromFlux: function() {
	    var flux = this.getFlux();
	    return {
	    	startup: flux.store("StartupStore").getState()
	    };
  	},

	render: function() {
		if (!this.state.startup.ready) {
			return <div><h1>Loading...</h1></div>;
		}
		else
		{
			if (this.state.startup.firstStartup)
				return <div><WelcomeView /></div>;
			else
				return <div><Container /></div>;
		}
	}

});

module.exports = Canvas;