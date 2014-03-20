(function (window, bender) {

    // prevent QUnit from starting
    window.QUnit.config.autostart = false;

    if (window.removeEventListener) {
        window.removeEventListener('load', window.QUnit.load, false);
    } else {
        window.detachEvent('onload', window.QUnit.load);
    }


    function start() {
        var runner = window.QUnit;

        runner.testStart(function (details) {
            bender.log('Starting: ' + details.name);
        });

        runner.testDone(function (details) {
            bender.result(details);
        });

        runner.done(function () {
            bender.complete();
        });

        runner.log(function (details) {
            bender.log(details.result + ' ' + details.message);
        });

        // manually start the runner
        runner.load();
        runner.start();
    }

    bender.assert = window.QUnit.assert;
    bender.start = start;

})(window, bender);
