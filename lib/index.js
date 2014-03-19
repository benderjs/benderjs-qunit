module.exports.init = function (manager) {
	manager.add({
		name: 'QUnit',
		type: 'assertion',
		files: [
			require.resolve('qunitjs'),
			__dirname + '/adapter.js'
		]
	});
};