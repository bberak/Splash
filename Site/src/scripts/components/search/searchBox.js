/** @jsx React.DOM */

var React = require("react");
var TextInput = require("components/textInput.js");

var SearchBox = React.createClass({

	getDefaultProps: function() {
		return {
			query: "",
			changeDelay: 2000
		}
	},

	onChange: function (value) {

		this.potentialQuery = value;
		
		setTimeout(function() {
			if (this.potentialQuery === value && value !== this.props.query)
				alert(value);
		}.bind(this), this.props.changeDelay);
	},

    render: function() {
        return (
        	<TextInput autoFocus={true} placeholder="Start typing to search" value={this.props.query} onChange={this.onChange} />
        );
    }
});

module.exports = SearchBox;