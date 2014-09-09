/** @jsx React.DOM */

var React = require('react');
var Fluxxor = require('fluxxor');
var Constants = require('constants.js');

var FluxChildMixin = Fluxxor.FluxChildMixin(React),
	StoreWatchMixin = Fluxxor.StoreWatchMixin;

var SearchItem = React.createClass({

	mixins: [FluxChildMixin],

	_startDownload: function() {
		this.getFlux().actions.startDownload(this.props.key);
	},

	render: function() {
		return ( 
			<li>
				<span>{this.props.name}</span>
				<span>Size: {this.props.size}MB</span>
				<span>Seeds: {this.props.seeds}</span>
				{ this.props.downloading ? <span>Downloading..</span> : <input type="button" onClick={this._startDownload} value="Download" /> }
			</li>
		);
	}

});

module.exports = SearchItem;