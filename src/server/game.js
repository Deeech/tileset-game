var players = {};

var io,
		gamesocket;

function userLogin(nickname) {
	gamesocket.clientname = "Player" + Math.round(Math.random()*100);
	gamesocket.nickname = nickname;

	players[gamesocket.clientname] = gamesocket;

	gamesocket.emit('successLogin', { clientname: gamesocket.clientname });
	gamesocket.broadcast.emit('updatePlayers', { x: 20, y:20, nickname: gamesocket.nickname, clientname: gamesocket.clientname });
};

// function disconnectUser() {
// 	if (gamesocket && gamesocket.clientname && gamesocket.nickname) {
// 		console.log(gamesocket.clientname + " : " + gamesocket.nickname + " has disconected");
// 		gamesocket.broadcast.emit('updateMap', navigationMap);
// 	};
// };

////////////////////////////////////////////
function playerMove(data) {
	console.log('Player moved');
	gamesocket.position = {
		x: data.x,
		y: data.y,
	};
	gamesocket.broadcast.emit('updatePlayerCoord', { clientname: gamesocket.clientname, coords: gamesocket.position});
};
////////////////////////////////////////////

// function chatMessage(msg){
// 	console.log(gamesocket.id);
// 	gamesocket.broadcast.emit('chat message', { msg: msg, nickname: gamesocket.nickname });
// };

exports.init = function(io, socket) {
  io = io;
  gamesocket = socket;

  // Host Events
  gamesocket.on('userLogin', userLogin);
  // gamesocket.on('disconnect', disconnectUser);

  // Chat Events
  // gamesocket.on('chat message', chatMessage)

  // Player Events
  gamesocket.on('playerMove', playerMove);
}
