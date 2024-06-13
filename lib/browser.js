'use strict';

var jsonp = require('jsonp');

module.exports = function getJSON(url, callback) {
	jsonp(url, callback);
};
