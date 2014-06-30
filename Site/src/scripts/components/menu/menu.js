/** @jsx React.DOM */

var React = require('react');
var Fluxxor = require('fluxxor');
var MenuItem = require('./menuItem.js');
var _ = require('lodash');

var FluxChildMixin = Fluxxor.FluxChildMixin(React),
	StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Menu = React.createClass({

	mixins: [FluxChildMixin, StoreWatchMixin("MenuStore")],

	_onSelected: function(menuName) {
		this.getFlux().actions.menuSelected(menuName);
	},

	getStateFromFlux: function() {
	    return {
	    	menus: this.getFlux().store("MenuStore").getState()
	    };
  	},

	render: function() {
		var items = _.map(this.state.menus.all, function(m) {
			return <MenuItem key={m} onSelected={this._onSelected} active={m === this.state.menus.active} />;
		}.bind(this));

		return (
			<div>
				<ul>{items}</ul>
			</div>
		);
	}

});

module.exports = Menu;