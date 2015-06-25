/**
 * Copyright (c) 2014-2015, CKSource - Frederico Knabben. All rights reserved.
 * Licensed under the terms of the MIT License (see LICENSE.md).
 */

var path = require( 'path' );

module.exports = {
	name: 'bender-framework-qunit',
	files: [
		require.resolve( 'qunitjs' ),
		path.join( __dirname, '/adapter.js' )
	]
};
