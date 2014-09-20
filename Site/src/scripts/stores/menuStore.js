var Fluxxor = require('fluxxor');
var Constants = require('constants.js');
var Config = require('config.js');
var _ = require('lodash');

var MenuStore = Fluxxor.createStore({

    initialize: function() {
        this._all = _.map(Config.menus, function(m) {
            return { name: m, notifications: 0 };
        });
        this._active = this._all[0];
        this.bindActions(
            Constants.Actions.MENU_SELECTED, this._onMenuSelected,
            Constants.Actions.START_DOWNLOAD, this._onDownloadStarted);
    },

    _onMenuSelected: function(payload) {
        this._active = _.find(this._all, function(m) {
            return m.name === payload.name;
        });
        this._active.notifications = 0;
        this.emit("change");
    },

    _onDownloadStarted: function(payload) {
        var downloadsMenu = _.find(this._all, function(m) {
            return m.name === 'Downloads';
        });

        if (downloadsMenu) {
            downloadsMenu.notifications++;
            this.emit('change');
        }
    },

    getState: function() {
        return {
            all: this._all,
            active: this._active
        };
    }
});

module.exports = MenuStore;
