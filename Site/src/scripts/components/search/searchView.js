/** @jsx React.DOM */

var React = require('react');
var Fluxxor = require('fluxxor');
var SearchBox = require('./searchBox.js');
var SearchResults = require('./searchResults.js');

var FluxChildMixin = Fluxxor.FluxChildMixin(React);

var SearchView = React.createClass({

	mixins: [FluxChildMixin],

	render: function() {
		return (
			<div className="searchView">
				<h2>Search..</h2>
				<SearchBox />
				<SearchResults />
			</div>
		);
	}

});

module.exports = SearchView;