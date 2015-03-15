/** @jsx React.DOM */

var React = require("react");
var TextInput = require("components/textInput.js");

var SearchBox = React.createClass({

    render: function() {
        return (
        	<TextInput autoFocus={true} placeholder="Start typing to search" />
        );
    }
});

module.exports = SearchBox;