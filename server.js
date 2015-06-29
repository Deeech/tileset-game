var express = require('express');
var app = express();
var http = require('http').Server(app);
var WebSocketServer = new require('ws');
var game = require('./src/server/game');
var colors = require('colors');

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html')
});

app.get('/dev', function(req, res){
	res.sendFile(__dirname + '/dev.html')
});

app.get('/event_create', function(req, res){
	res.sendFile(__dirname + '/event_create.html')
});

app.get('/event_define', function(req, res){
	res.sendFile(__dirname + '/event_define.html')
});

app.get('/exec_commands', function(req, res){
	res.sendFile(__dirname + '/exec_commands.html')
});

app.get('/json', function(req, res){
	res.sendFile(__dirname + '/json_load.html')
});


app.use('/static', express.static('static'));
app.use('/src', express.static('src'));
app.use('/dist', express.static('dist'));
app.use('/Graphics', express.static('Graphics'));
app.use('/Data', express.static('Data'));
app.use('/Audio', express.static('Audio'));
app.use('/tiled', express.static('tiled'));
app.use('/core', express.static('core'));


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