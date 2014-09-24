/** @jsx React.DOM */

var React = require('react');
var Fluxxor = require('fluxxor');
var Loader = require('components/loader.js');
var Constants = require('constants.js');
var _ = require('lodash');
var DownloadItem = require('./downloadItem.js');

var FluxChildMixin = Fluxxor.FluxChildMixin(React),
	StoreWatchMixin = Fluxxor.StoreWatchMixin;

var DownloadList = React.createClass({

	mixins: [FluxChildMixin, StoreWatchMixin("DownloadStore")],

	getStateFromFlux: function() {
	    var flux = this.getFlux();
	    return flux.store("DownloadStore").getState();
  	},

	render: function() {

		var list = _.map(this.state.downloads, function(d) {
			return <DownloadItem key={d.url} name={d.name} status={d.status} progress={d.progress} />;
		});

		return (
			<ul>
				{list}
			</ul>);
	}

});

module.exports = DownloadList;