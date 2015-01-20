/** @jsx React.DOM */

var React = require('react');
var Fluxxor = require('fluxxor');
var Menu = require('./menu/menu.js');
var SearchView = require('./search/searchView.js');
var DownloadsView = require('./downloads/downloadsView.js');
var SettingsView = require('./settings/settingsView.js');
var AboutView = require('./about/aboutView.js');

var FluxChildMixin = Fluxxor.FluxChildMixin(React),
	StoreWatchMixin = Fluxxor.StoreWatchMixin;

var SEARCH_MENU_NAME = "Search";

var Container = React.createClass({

	mixins: [FluxChildMixin, StoreWatchMixin("MenuStore")],

	getStateFromFlux: function() {
	    return {
	    	menus: this.getFlux().store("MenuStore").getState()
	    };
  	},

  	_onKeyDown: function(e) {
		this.getFlux().actions.menuSelected(SEARCH_MENU_NAME);
	},

	render: function() {
		var view = null;

		switch(this.state.menus.active.name){
			case "Search": 
				view = <SearchView />;
				break;

			case "Downloads":
				view = <DownloadsView />;
				break;

			case "Settings":
				view = <SettingsView />;
				break;

			case "About":
				view = <AboutView />;
				break;
				
			default:
				view = <h2>Could not find view for {this.state.menus.active.name}</h2>;
				break;
		}

		return (
			<div className="container" tabIndex="1" onKeyDown={this._onKeyDown} >
				<Menu />
				<hr />
				{view}
			</div>
		);
	}

});

module.exports = Container;