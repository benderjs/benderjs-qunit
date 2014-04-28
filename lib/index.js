module.exports = {
    name : 'bender-assertion-qunit',
    files: [
        require.resolve('qunitjs'),
        __dirname + '/adapter.js'
    ]
};
