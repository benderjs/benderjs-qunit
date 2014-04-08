(function (window, bender) {

    // prevent QUnit from starting
    window.QUnit.config.autostart = false;
    bender.removeListener(window, window.QUnit.load);

    function start() {
        var result = {
                success: true,
                errors: []
            },
            runner = window.QUnit;

        runner.testDone(function (details) {
            details.success = result.success;
            details.errors = result.errors;
            bender.result(details);

            result.success = true;
            result.errors = [];
        });

        runner.done(function (details) {
            bender.next(details);
        });

        runner.log(function (details) {
            // add detailed error message to test result
            if (!details.result) {
                result.success = false;
                result.errors.push([
                    details.message,
                    'Expected: ' + details.expected,
                    'Actual: ' + details.actual,
                    details.source
                ].join('\n'));
            }
        });

        // manually start the runner
        runner.load();
        runner.start();
    }

    bender.assert = window.QUnit.assert;
    bender.start = start;

})(window, bender);
