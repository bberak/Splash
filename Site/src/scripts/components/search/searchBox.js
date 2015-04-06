/** @jsx React.DOM */

var React = require("react");
var TextInput = require("components/textInput.js");
var _ = require("lodash");
var SPACE = 32;

var SearchBox = React.createClass({

	getDefaultProps: function() {
		return {
			query: "",
			debounce: 500
		}
	},

	onChange: function (e, value) {
		if (!value && this.props.onQueryCleared) {
			this.props.onQueryCleared();
			return;
		}

		var trimmedValue = value.trim();

		if (trimmedValue.length === 0 && this.props.onQueryCleared) {
			this.props.onQueryCleared();
			return;
		}

		if (trimmedValue === this.props.query)
			return;
	
		if (this.props.onQueryChanged)
			this.props.onQueryChanged(trimmedValue);
	},

	onEscape: function (e) {
        e.target.value = "";
        e.preventDefault();
        if (this.props.onQueryCleared)
				this.props.onQueryCleared();
    },

    onKeyDown: function(e) {
    	if (e.target.value === null || e.target.value.trim().length === 0) {
			if(e.keyCode === SPACE)
    			e.preventDefault();
    	}
    },

    render: function() {
        return (
        	<TextInput 
        		autoFocus={true} 
        		placeholder="Start typing to search" 
        		value={this.props.query} 
        		onChange={_.debounce(this.onChange, this.props.debounce)} 
        		onEscape={this.onEscape} 
        		onKeyDown={this.onKeyDown} />
        );
    }
});

module.exports = SearchBox;