/** @jsx React.DOM */

var React = require('react');
var Fluxxor = require('fluxxor');
var Constants = require('constants.js');

var FluxChildMixin = Fluxxor.FluxChildMixin(React),
	StoreWatchMixin = Fluxxor.StoreWatchMixin;

var SearchItem = React.createClass({

	mixins: [FluxChildMixin],

	_startDownload: function() {
		this.getFlux().actions.startDownload(this.props.url);
	},

	render: function() {

		return ( 
			<li>
				<span>{this.props.name}</span>
				<span>Size: {this.props.size}MB</span>
				<span>Seeds: {this.props.seeds}</span>
				<span><input type="button" value="Download" onClick={this._startDownload} disabled={this.props.clicked} /></span>
			</li>
		);
	}

});

module.exports = SearchItem;