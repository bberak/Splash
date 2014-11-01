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

	mixins: [FluxChildMixin, StoreWatchMixin("DownloadStore", "MenuStore")],

	_onFindSomething: function() {
		this.getFlux().actions.menuSelected("Search");
	},

	getStateFromFlux: function() {
	    var flux = this.getFlux();
	    return flux.store("DownloadStore").getState();
  	},

	render: function() {

		if (this.state.downloads && this.state.downloads.length > 0) {
			var list = _.map(this.state.downloads, function(d) {
				return <DownloadItem key={d.url} name={d.name} status={d.status} progress={d.progress} />;
			});

			return (
				<ul>
					{list}
				</ul>);
		}

		return (<a href="javascript:void(0);" onClick={this._onFindSomething}>No downloads, click here to find something</a>); 
	}

});

module.exports = DownloadList;