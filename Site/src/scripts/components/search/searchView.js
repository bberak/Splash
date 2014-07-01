/** @jsx React.DOM */

var React = require('react');
var Fluxxor = require('fluxxor');
var SearchBox = require('./searchBox.js');
var SearchResults = require('./searchResults.js');

var FluxChildMixin = Fluxxor.FluxChildMixin(React),
	StoreWatchMixin = Fluxxor.StoreWatchMixin;

var SearchView = React.createClass({

	mixins: [FluxChildMixin, StoreWatchMixin("SearchStore")],

	getStateFromFlux: function() {
	    var flux = this.getFlux();
	    return {
	    	search: flux.store("SearchStore").getState()
	    };
  	},

	render: function() {
		return (
			<div>
				<h2>Search..</h2>
				<SearchBox />
				<SearchResults />
			</div>
		);
	}

});

module.exports = SearchView;