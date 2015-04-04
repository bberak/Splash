/** @jsx React.DOM */

var React = require("react");
var _ = require("lodash");
var SearchResultItem = require("./searchResultItem.js")

var SearchResultList = React.createClass({

	getDefaultProps: function() {
		return {
			category: "Unknown",
            status: "Unknown",
			items: []
		};
	},

    render: function() {
        if (this.props.status !== "Searching")  {
            if (this.props.items.length === 0) {
                return <div />;
            }
        }

		var searchResultItems = _.map(this.props.items, function(i) {
			return <SearchResultItem name={i.name} key={i.url} />;
		});
       
        return (
        	<div>
        		<h3>{this.props.category}</h3>
                <span>{this.props.status}</span>
            	<ul>
            		{searchResultItems}
            	</ul>
            </div>
        );
    }
});

module.exports = SearchResultList;