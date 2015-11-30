var fs = require('fs');
var readline = require('line-reader');
var Promise = require('es6-promise').Promise;
var fileUtils = require('./fileutils');
var path = require('path');

module.exports = function scan(dir, extension, search) {
	walk(dir, extension, search)
};

var filename = 'seeker.txt';

function walk(dir, extension, search) {
	fileUtils.exists(filename).then(function(exists) {
		if (!exists) {
			return fileUtils.writeFile('seeker.txt', '# Seeker results\n');
		}
		return;
	}).then(function() {
		return fileUtils.readDir(dir);	
	}).then(function(files) {
		return files.filter(function(file) {
			if (path.extname(file) === '.js') {
				return file;
			}
		});
	}).then(function(files) {
		fs.appendFileSync(filename, '# \'' + search + '\'\n');
		files.forEach(function(file) {
			var lineNum = 1;
			var filePrinted = false;
			readline.eachLine(file, function(line, last) {
				if (line.indexOf(search) > -1) {
					if (!filePrinted) {
						fs.appendFileSync(filename, '    # ' + file + '\n');
						filePrinted = true;	
					}
					fs.appendFileSync(filename, '        ' + line.trim() + ' (Line ' + lineNum + ')\n');
				}
				lineNum++;
			});
		});
	});
}
