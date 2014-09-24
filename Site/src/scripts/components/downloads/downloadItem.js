/** @jsx React.DOM */

var React = require('react');
var Fluxxor = require('fluxxor');
var Loader = require('components/loader.js');
var Constants = require('constants.js');
var _ = require('lodash');

var FluxChildMixin = Fluxxor.FluxChildMixin(React),
	StoreWatchMixin = Fluxxor.StoreWatchMixin;

var DownloadItem = React.createClass({

	mixins: [FluxChildMixin, StoreWatchMixin("DownloadStore")],

	getStateFromFlux: function() {
	    var flux = this.getFlux();
	    return flux.store("DownloadStore").getState();
  	},

	render: function() {

		var getButton = function(status) {
			switch(status) {
				case Constants.TorrentStatuses.DOWNLOADING:
					return null;
				case Constants.TorrentStatuses.COMPLETE:
					return <input type="button" value="Open" />;
				case Constants.TorrentStatuses.ERROR:
					return <input type="button" value="Try Again" />;
				default:
					return null;
			}
		}.bind(this);

		var getProgress = function(progress) {
			progress = parseInt(progress * 100);
			var dashes = '';
			for (var i = 0; i < progress; i++)
				dashes += '-';
			return dashes + progress + '%';
		};

		return (
				<li>
					<span>{this.props.name}</span>
					<span>{this.props.status}</span>
					<span>{getProgress(this.props.progress)}</span>
					<span>{getButton(this.props.status)}</span>
				</li>
			);
	}

});

module.exports = DownloadItem;