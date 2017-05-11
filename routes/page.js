const path = require( 'path' );
const constants = require( '../constants' );
const mdParser = require( '../services/markdown-parser' );
const uiLibraryPath = require( '../services/ui-library-path' );

module.exports = function( req, res ) {
	let pathToContent = req.params[ 0 ];
	let menu = buildNavigation();
	let contents = buildContents( pathToContent );
	let vm = { menu, contents };

	res.render( 'index', vm );

	function buildNavigation() {
		let menuJson = path.join( uiLibraryPath(), constants.NAVIGATION );
		let menu = require( menuJson );
		delete require.cache[ menuJson ];

		menu.sections.forEach( ( section ) => {
			section.items.forEach( ( item ) => {
				item.url = path.join( '/', 'styleguide', item.path );
				item.active = pathToContent === item.path;
			} );
		} );

		return menu;
	}

	function buildContents( pathToContent = '' ) {
		let guideDoc = pathToContent ?
			`${pathToContent.split( '/' ).pop()}${constants.GUIDE_EXTENSION}` :
			constants.GUIDE_DEFAULT_INDEX;
		let filePath = path.join( uiLibraryPath(), pathToContent, guideDoc );
		let contents = mdParser.render( filePath );
		return contents;
	}
};
