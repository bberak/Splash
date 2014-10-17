/** @jsx React.DOM */

var React = require('react');
var Fluxxor = require('fluxxor');

var FluxChildMixin = Fluxxor.FluxChildMixin(React),
	StoreWatchMixin = Fluxxor.StoreWatchMixin;

var SearchBox = React.createClass({

	mixins: [FluxChildMixin, StoreWatchMixin("SearchStore")],

	_onSearchTermEntered: function() {
		var searchInput = this.refs.searchInput.getDOMNode();
		this.getFlux().actions.searchTermEntered(searchInput.value);
	},

	_onKeyDown: function(e) {
		if (e.keyCode === 13)
			this._onSearchTermEntered();
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
				<input type="text" placeholder="Search for music, movies or games.." ref="searchInput" onKeyDown={this._onKeyDown} autoFocus={true} defaultValue={this.state.search.term} />
				<input type="submit" value="Find" onClick={this._onSearchTermEntered} />
			</div>
		);
	}

});

module.exports = SearchBox;