var socket = io(),
	navigationMap;
console.log(socket);
socket.binaryType = "arraybuffer";
console.log(socket);


$("#log-in-modal").modal('show');

$('#send-message').submit(function() {
	socket.emit('chat message', $('#m').val());
	$('#m').val('');
	return false;
});

$("#log-in-modal").submit(function(e) {
	e.preventDefault();
	var nickname = $("#nameInput").val();
	if (nickname) {
		socket.emit("userLogin", nickname);
		$("#log-in-modal").modal("hide");
		return false;
	}
});

socket.on("connect", function() {
	console.log("connected");
});

socket.on("spawnNewPlayer", function(data) {
	navigationMap = data.navigationMap;
	for (_player in data.allCoords) {
		players[_player] = data.allCoords[_player];
	};
	console.log(data);
	var game = new Game(data.spawnPosition, data.newPlayerName);
});

socket.on("updatePlayerCoord", function(data) {
	console.log("buffer");
	console.log(data);
	buf = new DataView(data);
	/*players["p" + data.getInt8(1)].x = data.getInt16(4);
	players["p" + data.getInt8(1)].y = data.getInt16(8);*/
});

socket.on("updatePlayers", function(data) {
	if (!players[data.newPlayerName]) {
		players[data.newPlayerName] = {
			x: data.spawnPosition.x * 64,
			y: data.spawnPosition.y * 64
		};
	}
});

socket.on("updateMap", function(_navigationMap) {
	navigationMap = _navigationMap;
});

socket.on('chat message', function(data) {
	var nickname = $("<span>").addClass("label label-success").text(data.nickname);
	var message = $('#messages').append($("<li>").append(nickname).append($("<span>").text(data.msg)));
});