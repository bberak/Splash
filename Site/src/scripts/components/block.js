/** @jsx React.DOM */

var React  = require('react');
var ENTER = 13;

var Block = React.createClass({
    displayName: 'Block',

    propTypes: {
        className: React.PropTypes.string,
        tag: React.PropTypes.string,
        tabIndex: React.PropTypes.number
    },

    getDefaultProps: function() {
        return {
            className : '',
            tag: '',
            tabIndex: 1
        };
    },

    onKeyDown: function(e){
        console.log(e.keyCode);
        if (this.props.onKeyDown)
            this.props.onKeyDown(e, this.props.tag);

        if (this.props.onEnter && e.keyCode === ENTER)
            this.props.onEnter(this.props.tag);
    },

    onKeyUp: function(e){
        if (this.props.onKeyUp)
            this.props.onKeyUp(e, e.target.value);
    },

    render: function() {
        return (
            <div className={this.props.className} tabIndex={this.props.tabIndex} onKeyDown={this.onKeyDown}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = Block;