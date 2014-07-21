/** @jsx React.DOM */

var React = require('react');
var Fluxxor = require('fluxxor');
var Loader = require('components/loader.js');
var SearchItem = require('./searchItem.js');
var _ = require('lodash');

var FluxChildMixin = Fluxxor.FluxChildMixin(React),
	StoreWatchMixin = Fluxxor.StoreWatchMixin;

var SearchResults = React.createClass({

	mixins: [FluxChildMixin, StoreWatchMixin("SearchStore")],

	getStateFromFlux: function() {
	    var flux = this.getFlux();
	    return {
	    	search: flux.store("SearchStore").getState()
	    };
  	},

	render: function() {

		if (this.state.search.searching) {
			var phrase = "Searching for: " + this.state.search.term;
			return <div><Loader phrase={phrase} /></div>
		}
		else {
			var results = _.map(this.state.search.results, function(s){
				return <SearchItem key={s.url} name={s.name} status={s.status} size={s.size} seeds={s.seeds} />;
			});

			return (
				<div>
					<ul>{results}</ul>
				</div>);
		}
	}

});

module.exports = SearchResults;