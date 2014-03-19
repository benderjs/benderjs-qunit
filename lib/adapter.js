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

        runner.done(function () {
            bender.complete();
        });

        runner.testStart(function (details) {
            bender.log('Starting: ' + details.name);
        });

        runner.testEnd(function (details) {
            bender.result(details);
        });

        runner.start();
    }

    bender.start = start;

})(window, bender);