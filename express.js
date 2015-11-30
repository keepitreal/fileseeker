var express = require('express');
var app = express();

app.set('view engine', 'jade');
app.set('views', './views');
app.get('/', function(req, res) {
	res.render('index', { title: 'Seeker', message: 'Let us begin' });
});

app.listen(3000);
console.log('Node server started on port 3000');