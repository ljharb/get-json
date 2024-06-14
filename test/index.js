'use strict';

require('es5-shim');
require('es6-shim');

var test = require('tape');
var json = require('../');

test('Get IP from JSONTest API', function (t) {
	t.plan(2);

	json('http://ip.jsontest.com/', function (error, body) {
		t.error(error);
		t.ok(body.ip);
	});
});

test('Get IP from JSONTest API (with Promise)', function (t) {
	return json('http://ip.jsontest.com/').then(function (body) {
		t.ok(body.ip);
	})['catch'](function (error) {
		t.ok(error);
	});
});
