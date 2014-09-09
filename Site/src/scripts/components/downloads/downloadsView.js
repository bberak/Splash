/** @jsx React.DOM */

var React = require('react');
var Fluxxor = require('fluxxor');

var FluxChildMixin = Fluxxor.FluxChildMixin(React),
	StoreWatchMixin = Fluxxor.StoreWatchMixin;

var DownloadsView = React.createClass({

	//mixins: [FluxChildMixin, StoreWatchMixin("DownloadsStore")],

	//getStateFromFlux: function() {
	//    var flux = this.getFlux();
	//    return {
	//    	startup: flux.store("DownloadsStore").getState()
	//    };
  	//},

	render: function() {
		return (
			<div>
				<h2>Downloads..</h2>
			</div>
		);
	}

});

module.exports = DownloadsView;