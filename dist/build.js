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


	var self = this;
	

	this.KEYS = { LEFT: 37, RIGHT: 39, UP: 40, DOWN: 38/*, S: 83*/ };
	keyState = {};

	window.addEventListener('keydown', function(e) {
		keyState[e.keyCode] = true;
	});
	window.addEventListener('keyup', function(e) {
		keyState[e.keyCode] = false;
	});

	this.isDown = function(keyCode) {
		return keyState[keyCode] === true;
	};


	/*window.addEventListener('keydown', function(e) {
		console.log("keydown");
		//keyState[e.keyCode] = true;
		var data;
		if (e.keyCode == 37) { //left
			data = {
				x: self.col - 1,
				y: self.row,
				oldx: self.col,
				oldy: self.row
			};
		}
		if (e.keyCode == 39) { //right
			data = {
				x: self.col + 1,
				y: self.row,
				oldx: self.col,
				oldy: self.row
			};
		}
		if (e.keyCode == 38) { //down
			data = {
				x: self.col,
				y: self.row - 1,
				oldx: self.col,
				oldy: self.row
			};
		}
		if (e.keyCode == 40) { //up
			data = {
				x: self.col,
				y: self.row + 1,
				oldx: self.col,
				oldy: self.row
			};
		}

		if (data) {
			socket.emit("playerMove", data);
		};
	});*/

	/*socket.on("playerMove", function(data) {
		self.col = data.x;
		self.row = data.y;
	});*/
}

Player.prototype.update = function() {
	if (this.isDown(this.KEYS.LEFT)) {
		this.x -= 10;
		data = {
			x: this.x,
			y: this.y,
		};
		socket.emit("playerMove", data);
	}
	if (this.isDown(this.KEYS.RIGHT)) {
		this.x += 10;
		data = {
			x: this.x,
			y: this.y,
		};
		socket.emit("playerMove", data);
	}
	if (this.isDown(this.KEYS.DOWN)) {
		this.y -= 10;
		data = {
			x: this.x,
			y: this.y,
		};
		socket.emit("playerMove", data);
	}
	if (this.isDown(this.KEYS.UP)) {
		this.y += 10;
		data = {
			x: this.x,
			y: this.y,
		};
		socket.emit("playerMove", data);
	}
};