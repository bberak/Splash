var Reflux = require("reflux");

var Actions = Reflux.createActions([
	"search",
	"beginDownload",
	"cancelDownload",
	"removeDownload",
	"updateSettings",
	"openFolder",
	"runFile"
]);

module.exports = Actions;