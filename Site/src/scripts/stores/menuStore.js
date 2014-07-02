var Fluxxor = require('fluxxor');
var Constants = require('constants.js');
var Config = require('config.js');

var MenuStore = Fluxxor.createStore({

    initialize: function() {
        this._all = Config.menus;
        this._active = Config.menus[0];
        this.bindActions(Constants.Actions.MENU_SELECTED, this._onDownloadFolderSelected);
        this.bindActions(Constants.Actions.MENU_SELECTED, this._onMenuSelected)
    },

    _onMenuSelected: function(payload) {
      this._active = payload.name;
      this.emit("change");
    },

    getState: function() {
        return {
            all: this._all,
            active: this._active
        };
    }
});

module.exports = MenuStore;
