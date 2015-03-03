/** @jsx React.DOM */

var React = require('react');
var Fluxxor = require('fluxxor');

var FluxChildMixin = Fluxxor.FluxChildMixin(React),
	StoreWatchMixin = Fluxxor.StoreWatchMixin;

var WelcomeView = React.createClass({

	mixins: [FluxChildMixin, StoreWatchMixin("MenuStore")],

	_onSelectFolder: function() {
		var folderInput = this.refs.folderInput.getDOMNode();
		this.getFlux().actions.downloadFolderSelected(folderInput.value);
	},

	_onKeyDown: function(e) {
		if (e.keyCode === 13)
			this._onSelectFolder();
	},

	getStateFromFlux: function() {
	    var flux = this.getFlux();
	    return {
	    	startup: flux.store("StartupStore").getState()
	    };
  	},

	render: function() {
		return (
			<div>
				<h2>Disclosure statement goes here..</h2>
				<input type="text" placeholder="Select download folder.." ref="folderInput" onKeyDown={this._onKeyDown} autoFocus={true} />
				<input type="submit" value="I understand" onClick={this._onSelectFolder} />
			</div>
		);
	}

});

module.exports = WelcomeView;