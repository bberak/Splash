/** @jsx React.DOM */

var React = require('react');
var Fluxxor = require('fluxxor');
var Loader = require('components/loader.js');
var SearchItem = require('./searchItem.js');
var Constants = require('constants.js');
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

  	_loadNextPage: function() {
  		this.getFlux().actions.loadNextSearchResults();
  	},

	render: function() {

		var results = _.map(this.state.search.results, function(s){
			return <SearchItem key={s.url} name={s.name} downloading={s.downloading} size={s.size} seeds={s.seeds} />;
		});

		var getSearchingLabel = function(status){
			if (status === Constants.SearchStatuses.SEARCHING)
				return <Loader phrase={"Searching for: " + this.state.search.term} />;
			return null;
		}.bind(this);

		var getPagingLabel = function(status){
			if (status === Constants.SearchStatuses.PAGING)
				return <span>Loading more results..</span>;
			return null;
		};

		var getPagingButton = function(status) {
			if (status !== Constants.SearchStatuses.PAGING && results.length > 0)
				return <input type="button" value="Show more.." onClick={this._loadNextPage} />;
			return null;
		}.bind(this);

		return (
			<div>
				<div>{getSearchingLabel(this.state.search.status)}</div>
				<ul>{results}</ul>
				<div>
					{getPagingLabel(this.state.search.status)}
					{getPagingButton(this.state.search.status)}
				</div>
			</div>);
	}

});

module.exports = SearchResults;