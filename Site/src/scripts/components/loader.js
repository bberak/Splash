/** @jsx React.DOM */

var React = require('react');

var Loader = React.createClass({

	getDefaultProps: function() {
		return {
			phrase: "Loading, please wait.."
		};
	},

	render: function() {
		return (
			<div>
				<h2>{this.props.phrase}</h2>
			</div>
		);
	}

});

module.exports = Loader;