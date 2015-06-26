var express = require('express');
var app = express();
var http = require('http').Server(app);
var WebSocketServer = new require('ws');
var game = require('./src/server/game');
var colors = require('colors');

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html')
});

app.use('/static', express.static('static'));
app.use('/src', express.static('src'));
app.use('/dist', express.static('dist'));


var webSocketServer = new WebSocketServer.Server({
	port: 8081
});

/*io.on('connection', function(socket) {
	socket.binaryType = "Blob";
	game.init(io, socket);
});*/

webSocketServer.on('connection', function(ws) {

	var id = Math.random();
	console.log("новое соединение " + id);

	ws.on('message', function(message) {
		console.log("msg".green)
		console.log(message);
	});

	ws.on('close', function() {
	  console.log('соединение закрыто ' + id);
	});

});

http.listen(3000, function(req, res) {
	console.log('listening on *:3000'.yellow);
});