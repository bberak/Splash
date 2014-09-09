/** @jsx React.DOM */

var React = require('react');
var Fluxxor = require('fluxxor');
var Menu = require('./menu/menu.js');
var SearchView = require('./search/searchView.js');
var DownloadsView = require('./downloads/downloadsView.js');

var FluxChildMixin = Fluxxor.FluxChildMixin(React),
	StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Container = React.createClass({

	mixins: [FluxChildMixin, StoreWatchMixin("MenuStore")],

	getStateFromFlux: function() {
	    return {
	    	menus: this.getFlux().store("MenuStore").getState()
	    };
  	},

	render: function() {
		var view = null;

		switch(this.state.menus.active){
			case "Search": 
				view = <SearchView />;
				break;

			case "Downloads":
				view = <DownloadsView />;
				break;
				
			default:
				view = <h2>Could not find view for {this.state.menus.active}</h2>;
				break;
		}

		return (
			<div>
				<Menu />
				<hr />
				{view}
			</div>
		);
	}

});

module.exports = Container;