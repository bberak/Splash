define([
  	'jsx!Components/canvas',
  	'rsvp',
  	'flux'
], function(Canvas, RSVP, Flux){

	var init = function () {
		Canvas.render();
		Flux.actions.appStart();
	};

	return {
		init: init
	};
});




