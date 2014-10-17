/** @jsx React.DOM */

var React = require('react');
var Fluxxor = require('fluxxor');

var FluxChildMixin = Fluxxor.FluxChildMixin(React);

var WelcomeView = React.createClass({

	mixins: [FluxChildMixin],

	_onSelectFolder: function() {
		var folderInput = this.refs.folderInput.getDOMNode();
		this.getFlux().actions.downloadFolderSelected(folderInput.value);
	},

	_onKeyDown: function(e) {
		if (e.keyCode === 13)
			this._onSelectFolder();
	},

	render: function() {
		return (
			<div>
				<h2>Disclosure statement goes here..</h2>
				<label>All downloads will be saved to </label>
				<input type="text" defaultValue={this.props.defaultFolder} placeholder="Type the path to your folder" ref="folderInput" onKeyDown={this._onKeyDown} autoFocus={true} />
				<input type="submit" value="Cool, let's start" onClick={this._onSelectFolder} />
			</div>
		);
	}

});

module.exports = WelcomeView;