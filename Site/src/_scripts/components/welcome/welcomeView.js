/** @jsx React.DOM */

var React = require('react');
var Fluxxor = require('fluxxor');
var FluxChildMixin = Fluxxor.FluxChildMixin(React);
var TextInput = require('components/textInput.js');
var Block = require('components/block.js');

var WelcomeView = React.createClass({

	mixins: [FluxChildMixin],

	_onSelectFolder: function(value) {
		this.getFlux().actions.downloadFolderSelected(value);
	},

	_onClick: function() {
		this._onSelectFolder(this.refs.folderInput.getValue());
	},

	_onEnter: function() {
		this._onSelectFolder(this.refs.folderInput.getValue());
	},

	render: function() {
		return (
			<Block className="welcomeView" onEnter={this._onEnter}>
				<h2>Disclosure statement goes here..</h2>
				<label>All downloads will be saved to </label>
				<TextInput ref="folderInput" value={this.props.defaultFolder} placeholder="Type the path to your folder" autoFocus={true} onEnter={this._onSelectFolder} />
				<input type="submit" value="Cool, let's start" onClick={this._onClick} />
			</Block>
		);
	}

});

module.exports = WelcomeView;