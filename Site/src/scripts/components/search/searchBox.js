/** @jsx React.DOM */

var React = require('react');
var Fluxxor = require('fluxxor');

var FluxChildMixin = Fluxxor.FluxChildMixin(React),
	StoreWatchMixin = Fluxxor.StoreWatchMixin;

var SearchBox = React.createClass({

	mixins: [FluxChildMixin, StoreWatchMixin("SearchStore")],

	_onKeyUp: function(e) {
		var searchInput = this.refs.searchInput.getDOMNode();
		this.getFlux().actions.searchTermEntered(searchInput.value);
	},

	getStateFromFlux: function() {
	    var flux = this.getFlux();
	    return {
	    	search: flux.store("SearchStore").getState()
	    };
  	},

	render: function() {
		return (
			<div>
				<input type="text" placeholder="Search for music, movies or games.." ref="searchInput" onKeyUp={this._onKeyUp} autoFocus={true} defaultValue={this.state.search.term} />
			</div>
		);
	}

});

module.exports = SearchBox;