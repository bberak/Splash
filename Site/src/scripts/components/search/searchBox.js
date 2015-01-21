/** @jsx React.DOM */

var React = require('react');
var Fluxxor = require('fluxxor');
var FluxChildMixin = Fluxxor.FluxChildMixin(React), StoreWatchMixin = Fluxxor.StoreWatchMixin;
var TextInput = require('components/textInput.js');

var SearchBox = React.createClass({

	mixins: [FluxChildMixin, StoreWatchMixin("SearchStore")],

	_onKeyUp: function(e, value) {
		this.getFlux().actions.searchTermEntered(value);
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
				<TextInput 
					placeholder="Search for music, movies or games.." 
					ref="searchInput" 
					autoFocus={true} v
					value={this.state.search.term} 
					onKeyUp={this._onKeyUp} />
			</div>
		);
	}

});

module.exports = SearchBox;