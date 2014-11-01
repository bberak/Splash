/** @jsx React.DOM */

var React = require('react');
var Fluxxor = require('fluxxor');

var FluxChildMixin = Fluxxor.FluxChildMixin(React),
	StoreWatchMixin = Fluxxor.StoreWatchMixin;

var SettingsView = React.createClass({

	mixins: [FluxChildMixin, StoreWatchMixin("SettingsStore")],

	_onSave: function() {
		var folderInput = this.refs.folderInput.getDOMNode();
		this.getFlux().actions.downloadFolderSelected(folderInput.value);
		alert("Settings saved");
	},

	_onKeyDown: function(e) {
		if (e.keyCode === 13)
			this._onSave();
	},

	getStateFromFlux: function() {
	    var flux = this.getFlux();
	    return {
	    	settings: flux.store("SettingsStore").getState()
	    };
  	},

	render: function() {
		return (
			<div>
				<h2>Settings</h2>
				<label>All downloads will be saved to </label>
				<input type="text" defaultValue={this.state.settings.downloadFolder} placeholder="Type the path to your download folder" ref="folderInput" onKeyDown={this._onKeyDown} autoFocus={true} />
				<br />
				<input type="submit" value="Save" onClick={this._onSave} />
			</div>
		);
	}
	
});

module.exports = SettingsView;