/** @jsx React.DOM */

var React = require('react');
var Fluxxor = require('fluxxor');

var FluxChildMixin = Fluxxor.FluxChildMixin(React),
	StoreWatchMixin = Fluxxor.StoreWatchMixin;

var SearchItem = React.createClass({

	render: function() {
		return <li>{this.props.name} Status: {this.props.status}</li>;
	}

});

module.exports = SearchItem;