var express = require('express');
var path = require('path');
var logger = require('morgan');

var app = express();
var port = parseInt(process.env.PORT, 10) || 3000;
var server = app.listen(port);

var game = require('./lib/tictactoe');
var io = require('socket.io')(server);

app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

io.on('connection', function(socket) {
  game.addPlayer(socket);
  socket.on('selectSquare', function(data) {
    game.selectSquare(socket, data);
  });
  socket.on('disconnect', function() {
    game.removePlayer(socket);
  });
});

// catch 404
app.use(function(req, res) {
  res.status(404);
  res.send('Not Found');
});
