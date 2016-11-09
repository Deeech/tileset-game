let express = require('express'),
		app = express(),
		http = require('http').Server(app),
		io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html')
});

app.use('/static', express.static('static'));
app.use('/src', express.static('src'));
app.use('/dist', express.static('dist'));



io.on('connection', function(socket) {
	console.log('connected');

	socket.on('userLogin', (nickname) => {
		let players = [],
				sockets = io.sockets.sockets;

		socket.nickname = nickname;
		socket.positions = {
			x: 100,
			y: 100
		};
		socket.inGame = true;
		console.log(Object.keys(io.sockets.sockets));

		for (s in sockets) {
			if (sockets[s].inGame && socket.id !== sockets[s].id) {
				players.push({
					id: sockets[s].id,
					x: sockets[s].positions.x,
					y: sockets[s].positions.y,
					nickname: sockets[s].nickname
				});
			}
		}

		socket.emit('successLogin', { id: socket.id, otherPlayers: players, position: socket.positions });
		socket.broadcast.emit('addPlayer', { x: socket.positions.x, y: socket.positions.y, nickname: socket.nickname, id: socket.id });
	});
	// socket.on('disconnect', disconnectUser);

	// Chat Events
	socket.on('chatMessage', (msg) => {
		io.emit('chatMessage', { msg: msg, nickname: socket.nickname });
	})

	// Player Events
	socket.on('playerMove', (data) => {
		socket.position = {
			x: data.x,
			y: data.y,
		};
		socket.broadcast.emit('updatePlayerCoord', { id: socket.id, coords: socket.position});
	});
});

http.listen(3000, function(req, res) {
	console.log('listening on *:3000');
});
