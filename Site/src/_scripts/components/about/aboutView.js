/** @jsx React.DOM */

var React = require('react');
var Fluxxor = require('fluxxor');
var FluxChildMixin = Fluxxor.FluxChildMixin(React), StoreWatchMixin = Fluxxor.StoreWatchMixin;
var Block = require('components/block.js');

var AboutView = React.createClass({

	mixins: [FluxChildMixin],

	render: function() {
		return (
			<Block className="aboutView" onKeyDown={this.props.onKeyDown}>
				<h2>About</h2>
				<ul>
					<li>ReactJS</li>
					<li>Nancy</li>
					<li>Aria2</li>
					<li>Appy</li>
				</ul>
			</Block>
		);
	}
	
});

module.exports = AboutView;