benderjs-qunit
==============

Adapter for [QUnit](http://qunitjs.com) testing framework for [Bender.js](https://github.com/benderjs/benderjs).

Installation
------------

```
npm install benderjs-qunit
```

Usage
-----

Add `benderjs-qunit` to the plugins array in the `bender.js` configuration file:

```javascript
var config = {
    applications: {...}

    browsers: [...],

    plugins: ['benderjs-qunit'], // load the plugin

    tests: {...}
};

module.exports = config;
```

Set `qunit` as a `framework` for entire project or a specific tests group:

```javascript
var config = {
    applications: {...}

    browsers: [...],

    framework: 'qunit', // use for entire project

    plugins: ['benderjs-qunit'],

    tests: {
        Foo: {
            basePath: '',
            framework: 'qunit' // use for a specific tests group
            paths: [...]
        }
    }
};

module.exports = config;
```

Features
--------
- single test execution

Todo
----

- API to ignore a specific test/define a list of test names to ignore from the test file
- ???

License
-------

MIT, for license details see: [LICENSE.md](https://github.com/benderjs/benderjs-qunit/blob/master/LICENSE.md).
