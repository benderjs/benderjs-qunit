/**
 * Copyright (c) 2014, CKSource - Frederico Knabben. All rights reserved.
 * Licensed under the terms of the MIT License (see LICENSE.md).
 */

( function( QUnit, bender ) {
	var total = 0,
		failed = 0,
		passed = 0,
		ignored = 0,
		errors = 0,
		result = {
			success: true,
			errors: []
		};

	// prevent QUnit from starting
	QUnit.config.autostart = false;
	bender.removeListener( window, 'load', QUnit.load );

	function start() {
		QUnit.testStart( function() {
			total++;
		} );

		QUnit.testDone( function( details ) {
			details.success = result.success;
			details.error = result.errors.length ? result.errors.join( '\n' ) : undefined;
			details.duration = details.runtime;
			bender.result( details );

			if ( details.success ) {
				if ( details.ignored ) {
					ignored++;
				} else {
					passed++;
				}
			} else {
				failed++;
				errors++;
			}

			result.success = true;
			result.errors = [];
		} );

		QUnit.done( function( details ) {
			details.duration = details.runtime;
			bender.next( {
				duration: details.runtime,
				passed: passed,
				failed: failed,
				errors: errors,
				ignored: ignored,
				total: total
			} );
		} );

		QUnit.log( function( details ) {
			// add detailed error message to test result
			if ( !details.result ) {
				result.success = false;
				result.errors.push( [
					details.message,
					'Expected: ' + details.expected,
					'Actual:   ' + details.actual,
					details.source
				].join( '\n' ) );
			}
		} );

		// manually start the runner
		QUnit.load();
		QUnit.start();
	}

	function stopRunner() {
		QUnit.stop();
	}


	function isRegression( name ) {
		var condition = bender.regressions[ bender.testData.id + '#' + name ];

		// yes, that's eval and it's not a mistake...
		if ( condition && eval( condition ) ) {
			// push the result to the QUnit's queue
			QUnit.config.queue.push( function() {
				// make sure it runs in correct order
				QUnit.config.queue.push( function() {
					bender.result( {
						module: QUnit.config.currentModule,
						name: name,
						ignored: true,
						success: true,
						error: null
					} );
				} );
			} );

			return true;
		}
	}

	function isSingle( name ) {
		return name === decodeURIComponent( window.location.hash.substr( 1 ) );
	}

	var oldTest = QUnit.test;

	QUnit.test = function( name ) {
		if ( bender.regressions && isRegression( name ) ) {
			ignored++;
			total++;
			return;
		}

		if ( window.location.hash && window.location.hash !== '#child' && !isSingle( name ) ) {
			return;
		}

		oldTest.apply( this, arguments );
	};

	window.assert = bender.assert = QUnit.assert;
	bender.runner = QUnit;

	bender.start = start;
	bender.stopRunner = stopRunner;

} )( window.QUnit || {}, bender );
