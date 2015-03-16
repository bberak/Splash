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
            <li>this.props.name</li>    
        );
    }
});

module.exports = SearchResultItem;