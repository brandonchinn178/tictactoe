var express = require('express');
var path = require('path');
var logger = require('morgan');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', routes);
app.get('/', function(req, res) {
  res.render('index');
});

// catch 404
app.use(function(req, res) {
  res.status(404);
  res.send('Not Found');
});

var port = parseInt(process.env.PORT, 10) || 3000;
app.listen(port);
