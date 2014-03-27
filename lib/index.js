module.exports = {
    name : 'QUnit',
    type: 'assertion',
    files: [
        require.resolve('qunitjs'),
        __dirname + '/adapter.js'
    ]
};
