/** @jsx React.DOM */

var React = require('react');
var Fluxxor = require('fluxxor');
var TextInput = require('components/textInput.js');
var Block = require('components/block.js');
var Constants = require('constants.js');
var FluxChildMixin = Fluxxor.FluxChildMixin(React), StoreWatchMixin = Fluxxor.StoreWatchMixin;

var SettingsView = React.createClass({

	mixins: [FluxChildMixin, StoreWatchMixin("SettingsStore")],

	_onSave: function() {
		var folderInput = this.refs.folderInput;
		this.getFlux().actions.downloadFolderSelected(folderInput.getValue());
		alert("Settings saved");
	},

	getStateFromFlux: function() {
	    var flux = this.getFlux();
	    return {
	    	settings: flux.store("SettingsStore").getState()
	    };
  	},

	render: function() {
		return (
			<Block className="settingsView" onEnter={this._onSave}>
				<h2>Settings</h2>
				<label>All downloads will be saved to </label>
				<TextInput value={this.state.settings.downloadFolder} placeholder="Type the path to your download folder" ref="folderInput" autoFocus={true} />
				<br />
				<label>Something something will happen </label>
				<TextInput value="Never" placeholder="Type when something will happen" ref="somethingInput" />
				<br />
				<input type="submit" value="Save" onClick={this._onSave} />
			</Block>
		);
	}
	
});

module.exports = SettingsView;