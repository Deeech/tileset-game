var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html')
});

app.use('/static', express.static('static'));
app.use('/src', express.static('src'));
app.use('/dist', express.static('dist'));

var players = [];
var id = 1;
var nav = [
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0]
];


io.on('connection', function(socket){
	console.log('a user connected');

	nav[id, id] = 1;
	id++;

	io.sockets.emit('map', {
		nav: nav,
		id: id
	});

	socket.on('disconnect', function(){
		console.log('user disconnected');
	});

	socket.on('move', function (data) {
		console.log(data);
	});
});

http.listen(3000, function(req, res){
	console.log('listening on *:3000');
});