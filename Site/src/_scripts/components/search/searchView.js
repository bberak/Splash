/** @jsx React.DOM */

var React = require('react');
var Fluxxor = require('fluxxor');
var SearchBox = require('./searchBox.js');
var SearchResults = require('./searchResults.js');
var Block = require('components/block.js');

var FluxChildMixin = Fluxxor.FluxChildMixin(React);

var SearchView = React.createClass({

	mixins: [FluxChildMixin],

	focus: function() {
		this.refs.searchBox.focus();
	},

	render: function() {
		return (
			<Block className="searchView" onKeyDown={this.props.onKeyDown}>
				<h2>Search..</h2>
				<SearchBox ref="searchBox" />
				<SearchResults />
			</Block>
		);
	}

});

module.exports = SearchView;