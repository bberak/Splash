/** @jsx React.DOM */

var MENUS = [
	{ name: 'Search' 	},
 	{ name: 'Library' 	},
 	{ name: 'About' 	},
 	{ name: 'Popular' 	}
];
 
React.renderComponent(<App menus={MENUS} />, document.body);