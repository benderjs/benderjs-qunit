module.exports = {
    type: 'assertion',
    files: [
        require.resolve('qunitjs'),
        __dirname + '/adapter.js'
    ]
};
