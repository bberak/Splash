/** @jsx React.DOM */

var React = require("react");

var SearchResultItem = React.createClass({

	getDefaultProps: function() {
		return {
			name: "Unknown"
		};
	},

    render: function() {
        return (
            <div>{this.props.name}</div>    
        );
    }
});

module.exports = SearchResultItem;