/** @jsx React.DOM */

var MENUS = [
	{ name: 'Search' 	},
 	{ name: 'Library' 	},
 	{ name: 'About' 	},
 	{ name: 'Popular' 	},
 	{ name: 'Settings' 	}
];
 
React.renderComponent(<App menus={MENUS} />, document.body);