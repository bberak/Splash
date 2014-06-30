/** @jsx React.DOM */

var React = require('react');
var Fluxxor = require('fluxxor');
var Menu = require('./menu/menu.js');

var FluxChildMixin = Fluxxor.FluxChildMixin(React);

var Container = React.createClass({

	mixins: [FluxChildMixin],

	render: function() {
		return (
			<div>
				<Menu />
			</div>
		);
	}

});

module.exports = Container;