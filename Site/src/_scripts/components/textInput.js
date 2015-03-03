/** @jsx React.DOM */

var React  = require('react');

var ENTER = 13;
var ESCAPE = 27;

var TextInput = React.createClass({
    displayName: 'TextInput',

    propTypes: {
        autoFocus: React.PropTypes.bool,
        placeholder: React.PropTypes.string,
        value: React.PropTypes.string,
        className: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            autoFocus: false,
            placeholder: 'Component name, keyword or similar',
            value: '',
            className : '',
        };
    },

    componentDidMount: function() {
        // Focus the END of the input (if it has a value and autofocus is set to true)
        if (this.props.value && this.props.autoFocus) {
            this.moveCaretToEnd();
        }
    },

    focus: function() {
        var el = this.getDOMNode();
        var tempVal = el.value;
        el.value = null;
        el.value = tempVal;
        el.focus();
    },

    moveCaretToEnd: function() {
        var el = this.getDOMNode();
        if (typeof el.selectionStart === 'number') {
            el.selectionStart = el.selectionEnd = el.value.length;
        } else if (typeof el.createTextRange !== 'undefined') {
            el.focus();
            var range = el.createTextRange();
            range.collapse(false);
            range.select();
        }
    },

    onChange: function(e) {
        var newValue = e.target.value;

        if (this.props.onChange)
            this.props.onChange(e.target.value);
    },

    onKeyDown: function(e){
        if (this.props.onKeyDown)
            this.props.onKeyDown(e, e.target.value);

        if (this.props.onEnter && e.keyCode === ENTER)
            this.props.onEnter(e, e.target.value);

        if (this.props.onEscape && e.keyCode === ESCAPE)
            this.props.onEscape(e, e.target.value);
    },

    onKeyUp: function(e){
        if (this.props.onKeyUp)
            this.props.onKeyUp(e, e.target.value);
    },

    onBlur: function (e) {
        if (this.props.onBlur)
            this.props.onBlur(e, e.target.value);
    },

    getValue: function() {
        return this.refs.textBox.getDOMNode().value;
    },

    render: function() {
        return (
            <input
                type="text"
                className={this.props.className}
                onChange={this.onChange}
                onKeyDown={this.onKeyDown}
                onKeyUp={this.onKeyUp}
                onBlur={this.onBlur}
                defaultValue={this.props.value}
                placeholder={this.props.placeholder}
                autoFocus={this.props.autoFocus}
                ref="textBox" />
        );
    }
});

module.exports = TextInput;