/** @jsx React.DOM */

var React = require('react');
var Fluxxor = require('fluxxor');
var Menu = require('./menu/menu.js');
var SearchView = require('./search/searchView.js');
var DownloadsView = require('./downloads/downloadsView.js');
var SettingsView = require('./settings/settingsView.js');
var AboutView = require('./about/aboutView.js');
var Block = require('components/block.js');
var _ = require('lodash');
var FluxChildMixin = Fluxxor.FluxChildMixin(React), StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Container = React.createClass({

	mixins: [FluxChildMixin, StoreWatchMixin("MenuStore")],

	getStateFromFlux: function() {
	    return {
	    	menus: this.getFlux().store("MenuStore").getState()
	    };
  	},

  	_onKeyDown: function(e) {
		if (this.refs.searchView)
			this.refs.searchView.focus();
		else
			this.getFlux().actions.menuSelected("Search");
	},

	render: function() {
		var view = null;

		switch(this.state.menus.active.name){
			case "Search": 
				view = <SearchView ref="searchView" date={new Date()} onKeyDown={this._onKeyDown} />;
				break;

			case "Downloads":
				view = <DownloadsView onKeyDown={this._onKeyDown} />;
				break;

			case "Settings":
				view = <SettingsView />;
				break;

			case "About":
				view = <AboutView onKeyDown={this._onKeyDown} />;
				break;
				
			default:
				view = 
					(<Block onKeyDown={this._onKeyDown}>
						<h2>Could not find view for {this.state.menus.active.name}</h2>
					</Block>)
				break;
		}
		
		return (
			<Block className="container">
				<Menu onKeyDown={this._onKeyDown} />
				<hr />
				{view}
			</Block>
		);
	}

});

module.exports = Container;