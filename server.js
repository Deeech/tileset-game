var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var game = require('./src/server/game');
var colors = require('colors');

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html')
});

app.use('/static', express.static('static'));
app.use('/src', express.static('src'));
app.use('/dist', express.static('dist'));



io.on('connection', function(socket) {
	console.log(socket);
	socket.binaryType = "arraybuffer";
	console.log(socket);
	game.init(io, socket);
});

http.listen(3000, function(req, res) {
	console.log('listening on *:3000'.yellow);
});