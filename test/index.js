'use strict';

require('es5-shim');
require('es6-shim');

var test = require('tape');
var v = require('es-value-fixtures');
var inspect = require('object-inspect');

var getJSON = require('../');

var rejects = function assertRejects(fn, expected, msg, extra) {
	var t = this;
	/* eslint no-invalid-this: 0 */
	return new Promise(function (resolve) { resolve(fn()); }).then(
		function () {
			throw new SyntaxError('expected promise to reject; it fulfilled');
		},
		function (err) {
			t['throws'](function () { throw err; }, expected, msg, extra);
		}
	);
};

test('rejects on a non-string', function (t) {
	return Promise.all(v.nonStrings.map(function (nonString) {
		return t.assertion(
			rejects,
			function () { return getJSON(nonString); },
			TypeError,
			inspect(nonString) + ' is not a string'
		);
	}));
});

test('Get IP from JSONTest API', function (t) {
	t.plan(2);

	getJSON('http://ip.jsontest.com/', function (error, body) {
		t.error(error, 'is not an error');
		t.ok(body.ip);
	});
});

test('Get IP from JSONTest API (with Promise)', function (t) {
	return getJSON('http://ip.jsontest.com/').then(function (body) {
		t.ok(body.ip);
	})['catch'](function (error) {
		t.ok(error);
	});
});
