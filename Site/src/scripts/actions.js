var Reflux = require("reflux");
var Api = require("api.js");
var Config = require("config.js");

var Actions = Reflux.createActions([
	"beginDownload",
	"cancelDownload",
	"removeDownload",
	"updateSettings",
	"openFolder",
	"runFile",
	"clearSearch"
]);

Actions.search = Reflux.createAction({ children: ["completed", "failed"] });

Actions.pageSearchResults = Reflux.createAction({ children: ["completed", "failed"] });

module.exports = Actions;