/** @jsx React.DOM */

var React = require('react');
var Fluxxor = require('fluxxor');
var MenuItem = require('./menuItem.js');
var _ = require('lodash');
var FluxChildMixin = Fluxxor.FluxChildMixin(React), StoreWatchMixin = Fluxxor.StoreWatchMixin;
var Block = require('components/block.js');

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
		var enabledMenus = _.filter(this.state.menus.all, function(m){
			return m.enabled;
		});

		var items = _.map(enabledMenus, function(m) {
			return <MenuItem key={m.name} onSelected={this._onSelected} active={m.name === this.state.menus.active.name} notifications={m.notifications} />;
		}.bind(this));

		return (
			<Block className="menu" onKeyDown={this.props.onKeyDown}>
				<ul>{items}</ul>
			</Block>
		);
	}

});

module.exports = Menu;