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

var players = {};

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

	players[socket.clientname] = {
		position: spawnPosition
	}

	console.log(players);

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
		if (nav[data.x][data.y] != 1) {

			var newPosition = {
				x: data.x,
				y: data.y
			}

			var oldPosition = {
				x: data.oldx,
				y: data.oldy
			}

			console.log("move");


			players[socket.clientname].position = newPosition;

			nav[oldPosition.x][oldPosition.y] = 0;
			nav[newPosition.x][newPosition.y] = 1;

			console.log(players);

			socket.emit("playermove", newPosition);

			io.sockets.emit('mapUpdate', {
				nav: nav
			});
		}
	});
});

http.listen(3000, function(req, res){
	console.log('listening on *:3000');
});