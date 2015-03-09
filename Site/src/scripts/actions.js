var Reflux = require("reflux");

var Actions = Reflux.createActions([
	"beginDownload",
	"cancelDownload",
	"removeDownload",
	"updateSettings",
	"openFolder",
	"runFile"
]);

Actions.search = Reflux.createAction({ children: ["completed", "failed"] });

module.exports = Actions;