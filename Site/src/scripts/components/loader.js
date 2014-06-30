/** @jsx React.DOM */

var React = require('react');

var Loader = React.createClass({

	render: function() {
		return (
			<div>
				<h2>Loading, please wait..</h2>
			</div>
		);
	}

});

module.exports = Loader;