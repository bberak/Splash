/** @jsx React.DOM */

var React = require('react');
var Canvas = require('./components/canvas.js');
var Flux = require('./flux.js');

React.renderComponent(<Canvas flux={Flux} />, document.getElementById('content'));

Flux.actions.appStart();