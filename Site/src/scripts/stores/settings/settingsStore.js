var _ = require("lodash");
var Reflux = require("reflux");
var Actions = require("actions.js");

var SettingsStore = Reflux.createStore({

  	// this will be called by all listening components as they register their listeners
    getInitialState: function() {
        this.settings = {
            dateModified: new Date(),
            downloadsFolder: "C:/Users/Boris/Local/AppData/Splash/Downloads"
        };

        return this.settings;
    }
});

module.exports = SettingsStore;