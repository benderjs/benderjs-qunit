module.exports = {
    name : 'qunit',
    type: 'assertion',
    files: [
        require.resolve('qunitjs'),
        __dirname + '/adapter.js'
    ]
};
