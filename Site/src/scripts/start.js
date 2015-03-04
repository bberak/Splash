/** @jsx React.DOM */

var React = require("react");
var ReactRouter = require("react-router");
var App = require("components/app.js");

var routes = (
    <ReactRouter.Route handler={App}>
    </ReactRouter.Route>
);

ReactRouter.run(routes, function(Handler) {
    React.render(<Handler/>, document.getElementById("content"));
});