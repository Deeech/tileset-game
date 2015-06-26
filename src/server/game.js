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
var _io,
	gamesocket;

exports.init = function(io, socket) {
    _io = io;
    gamesocket = socket;
    gamesocket.binaryType = "Blob";

    // Host Events
    gamesocket.on('userLogin', userLogin);
    gamesocket.on('disconnect', disconnectUser);
    // Chat Events
    //gamesocket.on('chat message', chatMessage)
    // Player Events
    //gamesocket.on('playerMove', playerMove);
    gamesocket.on('message', onMessage);

}

function userLogin(nickname) {
	gamesocket.clientid = Math.round(Math.random()*100);
	gamesocket.clientname = "p" + gamesocket.clientid;
	gamesocket.position = setSpawnPosition();
	gamesocket.nickname = nickname;

	var allCoords = {};
	players[gamesocket.clientname] = gamesocket;

	for (player in players) {
		allCoords[players[player].clientname] = players[player].position;
	};
	
	navigationMap[gamesocket.position.x][gamesocket.position.y] = 1;

	console.log(players);
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
	gamesocket.clientid;
	gamesocket.position.x = data.readIntBE(3, 4);
	gamesocket.position.y = data.readIntBE(7, 4);
	console.log("buffer".green);
	console.log(data);
	console.log(gamesocket.clientid);
	console.log(data.readIntBE(3,4));
	console.log(data.readIntBE(7,4));

	var a = new Buffer(10);
	a.writeIntBE(gamesocket.clientid, 0, 2);
	a.writeIntBE(gamesocket.position.x, 2, 4);
	a.writeIntBE(gamesocket.position.y, 6, 4);
	var b = new ArrayBuffer(2);
	var c = new DataView(b);
	c.setInt8(0, 12);

	_io.emit('updatePlayerCoord', b);
};
function onMessage(data) {
	gamesocket.clientid;
	gamesocket.position.x = data.readIntBE(1, 4);
	gamesocket.position.y = data.readIntBE(5, 4);
	console.log("buffer".green);
	console.log(data);
	console.log(gamesocket.clientid);
	console.log(data.readIntBE(0,2));
	console.log(data.readIntBE(1,4));
	console.log(data.readIntBE(5,4));

	var a = new Buffer(10);
	a.writeIntBE(gamesocket.clientid, 0, 2);
	a.writeIntBE(gamesocket.position.x, 2, 4);
	a.writeIntBE(gamesocket.position.y, 6, 4);

	//_io.emit('updatePlayerCoord', a);
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
	gamesocket.broadcast.emit('chat message', { msg: msg, nickname: gamesocket.nickname });
};