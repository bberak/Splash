/** @jsx React.DOM */

var React = require('react');

var MenuItem = React.createClass({

	_onClick: function() {
		this.props.onSelected(this.props.key);
	},

	render: function() {
		if (this.props.active)
			return <li><input type="button" style={{"color": "red"}} value={this.props.key} onClick={this._onClick} /></li>;
		else
			return <li><input type="button" value={this.props.key} onClick={this._onClick} /></li>;
	}

});

module.exports = MenuItem;