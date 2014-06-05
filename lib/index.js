var path = require( 'path' );

module.exports = {
	name: 'bender-assertion-qunit',
	files: [
		require.resolve( 'qunitjs' ),
		path.join( __dirname, '/adapter.js' )
	]
};
