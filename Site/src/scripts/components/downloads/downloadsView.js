/** @jsx React.DOM */

var React = require('react');
var Fluxxor = require('fluxxor');
var DownloadList = require('./downloadList.js');
var FluxChildMixin = Fluxxor.FluxChildMixin(React), StoreWatchMixin = Fluxxor.StoreWatchMixin;

var DownloadsView = React.createClass({

	mixins: [FluxChildMixin, StoreWatchMixin("DownloadStore")],

	getStateFromFlux: function() {
	    var flux = this.getFlux();
	    return flux.store("DownloadStore").getState();
  	},

	render: function() {
		return (
			<div>
				<h2>Downloads..</h2>
				<div><DownloadList /></div>
			</div>
		);
	}
});

module.exports = DownloadsView;