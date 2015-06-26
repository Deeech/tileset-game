function drawImage (image) {
	for (var r = 0; r < rowTileCount; r++) {
		for (var c = 0; c < colTileCount; c++) {
			var tile = ground[ r ][ c ];
			tile--; // TODO fit it
			var tileRow = (tile / imageNumTiles) | 0; // Bitwise OR operation // the same as row = Math.floor(10 / 16) = Math.floor(0.625) = 0
			var tileCol = (tile % imageNumTiles) | 0; // the same as col = Math.floor(10 % 16) = Math.floor(10) = 10 
			ctx.drawImage(image, (tileCol * tileSize), (tileRow * tileSize), tileSize, tileSize, (c * tileSize), (r * tileSize), tileSize, tileSize);
		}
	}
	for (_player in players) {
		if (players[_player].update) {
			players[_player].update();
		};
		ctx.fillStyle = '#AF5200';
		ctx.fillRect(players[_player].x, players[_player].y, 64, 64);
	};
};var ground = [
	[1,2,2,3,4,4,4,4,4,4],
	[11,12,12,13,4,1,2,2,3,4],
	[11,12,12,13,4,21,22,22,23,4],
	[11,12,12,15,2,2,2,3,4,4],
	[11,12,12,12,12,12,12,15,3,4],
	[11,12,12,12,12,12,12,12,13,4],
	[11,12,12,12,12,12,25,22,23,4],
	[21,22,22,22,22,22,23,1,2,3],
	[1,2,2,2,2,2,3,11,12,13],
	[21,22,22,22,22,22,23,21,22,23]
];

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

var tilesetImage = new Image();
tilesetImage.src = 'static/tileset2.png';
//tilesetImage.onload = drawImage;

var canvas = document.getElementById('main');
var ctx = canvas.getContext('2d');
var tileSize = 64;       // The size of a tile (32×32)
var rowTileCount = 10;   // The number of tiles in a row of our background
var colTileCount = 10;   // The number of tiles in a column of our background
var imageNumTiles = 10;  // The number of tiles per row in the tileset image


var players = {};


function Game(spawnPosition, newPlayername) {
	player = new Player(spawnPosition.x, spawnPosition.y);
	var self = this;

	players[newPlayername] = player;

	var tick = function () {
		ctx.clearRect(0,0, canvas.width, canvas.height);
		drawImage(tilesetImage);		
		window.requestAnimationFrame(tick);
	};

	tick();
}
;function Player(col, row) {
	
	this.id;
	this.col = col;
	this.row = row;
	this.x = this.col * 64;
	this.y = this.row * 64;
	this.color = "red";
	this.hitPoints = 0;
	this.maxHitPoints = 0;
	this.isDead = false;
	this.attackingMode = false;
	this.followingMode = false;
	this.KEYS = { LEFT: 37, RIGHT: 39, UP: 40, DOWN: 38/*, S: 83*/ };
	
	var self = this;
	


	var keyState = {};
	window.addEventListener('keydown', function(e) {
		keyState[e.keyCode] = true;
	});
	window.addEventListener('keyup', function(e) {
		keyState[e.keyCode] = false;
	});

	this.isDown = function(keyCode) {
		return keyState[keyCode] === true;
	};
}

Player.prototype.update = function() {
	if (this.isDown(this.KEYS.LEFT)) {
		this.x -= 10;
		data = {
			x: this.x,
			y: this.y,
		};
		var a = new ArrayBuffer(9);
		var b = new DataView(a);
		b.setInt16(0, 1);
		b.setInt32(1, data.x);
		b.setInt32(5, data.y);

		socket.send(a);
	}
	if (this.isDown(this.KEYS.RIGHT)) {
		this.x += 10;
		data = {
			x: this.x,
			y: this.y,
		};
		var a = new ArrayBuffer(9);
		var b = new DataView(a);
		b.setInt16(0, 1);
		b.setInt32(1, data.x);
		b.setInt32(5, data.y);

		socket.send(a);
	}
	if (this.isDown(this.KEYS.DOWN)) {
		this.y -= 10;
		data = {
			x: this.x,
			y: this.y,
		};
		var a = new ArrayBuffer(9);
		var b = new DataView(a);
		b.setInt16(0, 1);
		b.setInt32(1, data.x);
		b.setInt32(5, data.y);

		socket.send(a);
	}
	if (this.isDown(this.KEYS.UP)) {
		this.y += 10;
		data = {
			x: this.x,
			y: this.y,
		};
		var a = new ArrayBuffer(9);
		var b = new DataView(a);
		b.setInt16(0, 1);
		b.setInt32(1, data.x);
		b.setInt32(5, data.y);

		socket.send(a);
	}
};;var socket = new WebSocket('ws://localhost:8081'),

	navigationMap;


/*$("#log-in-modal").modal('show');
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
});*/


/*socket.on("connect", function() {
	console.log("connected");
});*/
/*socket.on("spawnNewPlayer", function(data) {
	navigationMap = data.navigationMap;
	for (_player in data.allCoords) {
		players[_player] = data.allCoords[_player];
	};
	console.log(data);
	var game = new Game(data.spawnPosition, data.newPlayerName);
});*/
/*socket.on("updatePlayerCoord", function(data) {
	console.log("buffer");
	console.log(data);
	buf = new DataView(data);*/
	/*players["p" + data.getInt8(1)].x = data.getInt16(4);
	players["p" + data.getInt8(1)].y = data.getInt16(8);*/
/*});*/
/*socket.on("updatePlayers", function(data) {
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
});*/
var game = new Game({x: 2, y: 2}, "qwe");
socket.onmessage = function(e) {
	console.log(e.data);
}