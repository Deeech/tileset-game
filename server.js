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

function setSpawnPosition() {
	var spawnPosition = {
		x: Math.abs(Math.round(Math.random() * 10 - 1)),
		y: Math.abs(Math.round(Math.random() * 10 - 1))
	};

	if (nav[spawnPosition.x][spawnPosition.y] == 1) {
		setSpawnPosition();
	} else {
		return spawnPosition;
	}
}


io.on('connection', function(socket){
	console.log('a user connected');

	socket.clientname = "Player" + Math.round(Math.random()*100);
	console.log("Player name: " + socket.clientname);

	var spawnPosition = setSpawnPosition();
	console.log("Player start position: " + "x" + spawnPosition.x + " y" + spawnPosition.y);

	nav[spawnPosition.x][spawnPosition.y] = 1;

	nav.push(socket.clientname);

	socket.emit('map', {
		nav: nav,
		spawnPosition: spawnPosition
	});

	socket.on('disconnect', function(){
		console.log(socket.clientname);
		console.log('user disconnected');
	});

	socket.on('move', function (data) {
		console.log(data);
		if (nav[data.c][data.r] != 1) {
			console.log("move");
		}
	});
});

http.listen(3000, function(req, res){
	console.log('listening on *:3000');
});