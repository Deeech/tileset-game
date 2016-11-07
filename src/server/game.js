let io,
		socket;

function userLogin(nickname) {
	let players = [],
			sockets = io.sockets.sockets;

	socket.nickname = nickname;
	socket.positions = {
		x: 20,
		y: 20
	};
	console.log(Object.keys(io.sockets.sockets));

	for (s in sockets) {
		if (socket.id !== sockets[s].id) {
			players.push({
				id: sockets[s].id,
				x: sockets[s].positions.x,
				y: sockets[s].positions.y,
				nickname: sockets[s].nickname
			});
		}
	}

	socket.emit('successLogin', { id: socket.id, otherPlayers: players });
	socket.broadcast.emit('addPlayer', { x: 20, y:20, nickname: socket.nickname, id: socket.id });
};

// function disconnectUser() {
// 	if (socket && socket.clientname && socket.nickname) {
// 		console.log(socket.clientname + " : " + socket.nickname + " has disconected");
// 		socket.broadcast.emit('updateMap', navigationMap);
// 	};
// };

////////////////////////////////////////////
function playerMove(data) {
	console.log(socket.id);
	socket.position = {
		x: data.x,
		y: data.y,
	};
	socket.broadcast.emit('updatePlayerCoord', { id: socket.id, coords: socket.position});
};
////////////////////////////////////////////

// function chatMessage(msg){
// 	console.log(socket.id);
// 	socket.broadcast.emit('chat message', { msg: msg, nickname: socket.nickname });
// };

exports.init = function(_io, _socket) {
  io = _io;
  socket = _socket;

  // Host Events
  socket.on('userLogin', userLogin);
  // socket.on('disconnect', disconnectUser);

  // Chat Events
  // socket.on('chat message', chatMessage)

  // Player Events
  socket.on('playerMove', playerMove);
}
