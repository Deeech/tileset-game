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

var io,
		gamesocket;

function userLogin(nickname) {
	gamesocket.clientname = "Player" + Math.round(Math.random()*100);
	gamesocket.position = setSpawnPosition();
	gamesocket.nickname = nickname;
	var allCoords = {};
	for (player in players) {
		allCoords[players[player].clientname] = players[player].position;
	};
	players[gamesocket.clientname] = gamesocket;
	navigationMap[gamesocket.position.x][gamesocket.position.y] = 1;

	// console.log('socket', gamesocket);
	gamesocket.emit('spawnNewPlayer', {
		navigationMap: navigationMap,
		spawnPosition: gamesocket.position,
		newPlayerName: gamesocket.clientname,
		allCoords: allCoords
	});
	gamesocket.broadcast.emit('updatePlayers', { spawnPosition: gamesocket.position, newPlayerName: gamesocket.clientname });
};

function disconnectUser() {
	if (gamesocket && gamesocket.clientname && gamesocket.nickname && gamesocket.position) {
		console.log(gamesocket.clientname + " : " + gamesocket.nickname + " has disconected");
		navigationMap[gamesocket.position.x][gamesocket.position.y] = 0;
		gamesocket.broadcast.emit('updateMap', navigationMap);
	};
};
function playerMove(data) {
	console.log(data);
	gamesocket.position = data;
	gamesocket.broadcast.emit('updatePlayerCoord', { playerName: gamesocket.clientname, coords: data});
};
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

function chatMessage(msg){
	console.log(gamesocket.id);
	gamesocket.broadcast.emit('chat message', { msg: msg, nickname: gamesocket.nickname });
};

exports.init = function(io, socket) {
  io = io;
  gamesocket = socket;

  // Host Events
  gamesocket.on('userLogin', userLogin);
  gamesocket.on('disconnect', disconnectUser);

  // Chat Events
  gamesocket.on('chat message', chatMessage)

  // Player Events
  gamesocket.on('playerMove', playerMove);
}
