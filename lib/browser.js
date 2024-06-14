'use strict';

var jsonp = require('jsonp');

module.exports = function getJSON(url, callback) {
	return new Promise(function (resolve, reject) {
		jsonp(url, function (error, body) {
			if (error) {
				reject(error);
				if (callback) {
					callback(error);
				}
			} else {
				resolve(body);
				if (callback) {
					callback(null, body);
				}
			}
		});
	});
};
