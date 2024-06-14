'use strict';

var phin = require('phin');

var internalGetJSON = function _getJSON(url, callback) {
	phin({ url: url, timeout: 2000 }, function (error, response) {
		if (error) {
			callback(error);
			return;
		}

		var body;
		try {
			body = JSON.parse(response.body);
		} catch (parseError) {
			callback('Parse error: ' + parseError);
			return;
		}

		if (response.statusCode != 200) {
			callback('Unexpected response code.');
			return;
		}

		callback(null, body);
	});
};

module.exports = function getJSON(url, callback) {
	return new Promise(function (resolve, reject) {
		internalGetJSON(url, function (error, body) {
			if (error) {
				reject(error);
				if (callback) {
					callback(error);
				}
				return;
			}
			resolve(body);
			if (callback) {
				callback(null, body);
			}
		});
	});
};
