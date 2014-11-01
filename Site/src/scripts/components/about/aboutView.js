/** @jsx React.DOM */

var React = require('react');
var Fluxxor = require('fluxxor');

var FluxChildMixin = Fluxxor.FluxChildMixin(React),
	StoreWatchMixin = Fluxxor.StoreWatchMixin;

var AboutView = React.createClass({

	//mixins: [FluxChildMixin, StoreWatchMixin("MenuStore")],

	render: function() {
		return (
			<div>
				<h2>About</h2>
				<ul>
					<li>ReactJS</li>
					<li>Nancy</li>
					<li>Aria2</li>
					<li>Appy</li>
				</ul>
			</div>
		);
	}
	
});

module.exports = AboutView;