/** @jsx React.DOM */

var React = require("react");
var ReactRouter = require("react-router");
var App = require("components/app.js");
var SearchView = require("components/search/searchView.js");
var DownloadsView = require("components/downloads/downloadsView.js");
var SettingsView = require("components/settings/settingsView.js");
var AboutView = require("components/about/aboutView.js");
var _ = require("lodash");

var routes = (
    <ReactRouter.Route handler={App}>
    	<ReactRouter.Route name="Search" path="/search" handler={SearchView} />
    	<ReactRouter.Route name="Downloads" path="/downloads" handler={DownloadsView} />
    	<ReactRouter.Route name="Settings" path="/settings" handler={SettingsView} />
    	<ReactRouter.Route name="About" path="/about" handler={AboutView} />
    	<ReactRouter.DefaultRoute handler={SearchView}/>
    </ReactRouter.Route>
);

ReactRouter.run(routes, function(Handler) {
    React.render(<Handler/>, document.getElementById("content"));
});

//-- /search
//-- /downloads
//-- /settings
//-- /about
//-- /welcome