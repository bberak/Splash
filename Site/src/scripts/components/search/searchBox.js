/** @jsx React.DOM */

var React = require("react");
var TextInput = require("components/textInput.js");

var SearchBox = React.createClass({

	getDefaultProps: function() {
		return {
			query: "",
			throttle: 500
		}
	},

	onChange: function (value) {

		this.potentialQuery = value;
		
		setTimeout(function() {
			if (this.potentialQuery === value && 
				value !== this.props.query &&
				this.props.onQueryChange) {
				this.props.onQueryChange(value);
			}
				
		}.bind(this), this.props.throttle);
	},

	onEscape: function (e) {
        e.target.value = "";
    },

    render: function() {
        return (
        	<TextInput 
        		autoFocus={true} 
        		placeholder="Start typing to search" 
        		value={this.props.query} 
        		onChange={this.onChange} 
        		onEscape={this.onEscape} />
        );
    }
});

module.exports = SearchBox;