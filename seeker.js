#! /usr/bin/env node

var path = require('path');
var program = require('commander');
var pkg = require(path.join(__dirname, 'package.json'));
var scan = require('./lib/scan');

program
	.version(pkg.version)
	.option('-p --port <port>',  'Port on which to listen to (defaults to 3000)', parseInt)
	.option('-t, --filetype [type]', 'Specify file type [type]', 'type')
	.option('-s, --search [search]', 'Add a search string [search]', 'search')
	.parse(process.argv);
	
console.log('Seeking for strings that match ' + program.search + ' in all ' + program.filetype + ' files.');
scan('.', program.filetype, program.search);

var port = program.port || 3000;
