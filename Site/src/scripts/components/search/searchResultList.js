/** @jsx React.DOM */

var React = require("react");
var _ = require("lodash");
var SearchResultItem = require("./searchResultItem.js")

var SearchResultList = React.createClass({

	getDefaultProps: function() {
		return {
			category: "Unknown",
			items: []
		};
	},

    render: function() {

		var items = _.map(this.props.items, function(i) {
			return <SearchResultItem name={i.name} key={i.url} />;
		});

        return (
        	<div>
        		<h3>{this.props.category}</h3>
            	<ul>
            		{items}
            	</ul>
            </div>
        );
    }
});

module.exports = SearchResultList;