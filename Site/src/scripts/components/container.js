/** @jsx React.DOM */

var React = require('react');
var Fluxxor = require('fluxxor');

var FluxChildMixin = Fluxxor.FluxChildMixin(React);

var Container = React.createClass({

	mixins: [FluxChildMixin],

	render: function() {
		return (
			<div>
				<h2>Container goes here..</h2>
			</div>
		);
	}

});

module.exports = Container;