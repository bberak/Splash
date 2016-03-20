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
            <div>
            	<h5>{this.props.name}</h5>
            	<div>{this.props.description}</div>
            	<div>{this.props.bytes} bytes</div>
            	<div>{this.props.seeds} seeds</div>
            	<div>{this.props.url}</div>
            </div>    
        );
    }
});

module.exports = SearchResultItem;