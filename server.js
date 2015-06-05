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

var navigationMap = [
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

	if (navigationMap[spawnPosition.x][spawnPosition.y] == 1) {
		setSpawnPosition();
	} else {
		return spawnPosition;
	}
}


io.on('connection', function(socket){
	console.log('a user connected');

	socket.on("userLogin", function(nickname) {
		console.log("login");
		socket.clientname = "Player" + Math.round(Math.random()*100);
		socket.position = setSpawnPosition();
		socket.nickname = nickname;

		players[socket.clientname] = socket;

		navigationMap[socket.position.x][socket.position.y] = 1;

		

		console.log(players);

		socket.emit('spawnNewPlayer', {
			navigationMap: navigationMap,
			spawnPosition: socket.position
		});

		io.sockets.emit('updateMap', navigationMap);
	});

	socket.on('disconnect', function() {
		if (socket.clientname && socket.nickname && socket.position) {
			console.log(socket.clientname + " : " + socket.nickname + " has disconected");
			navigationMap[socket.position.x][socket.position.y] = 0;
			io.sockets.emit('updateMap', navigationMap);
		};
	});

	socket.on('playerMove', function (data) {
		console.log(data);
		if (navigationMap[data.x][data.y] != 1) {

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

			socket.emit("playerMove", newPosition);
			io.sockets.emit('updateMap', navigationMap);
		}
	});

	socket.on('chat message', function(msg){
		io.sockets.emit('chat message', { msg: msg, nickname: socket.nickname });
	});

});

http.listen(3000, function(req, res){
	console.log('listening on *:3000');
});