var Promise = require('es6-promise').Promise;
var path = require('path');
var fs = require('fs');

module.exports = {
	readDir: function(dir) {
		return new Promise(function(resolve, reject) {
			fs.readdir(dir, function(err, files) {
				if (err) {
					reject(err);
					return;
				}
				resolve(files);
			});
		});
	},
	exists: function(file) {
		return new Promise(function(resolve, reject) {
			fs.exists(file, function(exists) {
				resolve(exists);
			});
		});
	},
	readFile: function(file) {
		return new Promise(function(resolve, reject) {
			fs.readFile(file, 'utf8', function(err, contents) {
				if (err) {
					reject(err);
					return;
				}
				resolve(contents);
			});
		});
	},
	writeFile: function(filename, data) {
		return new Promise(function(resolve, reject) {
			fs.writeFile(filename, data, function(err) {
				if (err) {
					reject(err);
					return;
				}
				
				resolve();
			});
		});
	}
} 