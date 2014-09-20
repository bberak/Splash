/** @jsx React.DOM */

var React = require('react');

var MenuItem = React.createClass({

	_onClick: function() {
		this.props.onSelected(this.props.key);
	},

	render: function() {
		return <li><input type="button" value={this.props.key + ': ' + this.props.notifications} onClick={this._onClick} /></li>;
	}

});

module.exports = MenuItem;