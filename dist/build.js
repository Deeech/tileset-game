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
};var ground = [
	[12,13,13,13,14,80,79,80,79,80],
	[28,29,29,29,30,96,95,96,95,96],
	[28,29,29,29,30,80,79,80,79,80],
	[44,127,29,128,46,96,95,96,95,96],
	[79,28,29,30,79,80,79,80,79,80],
	[95,28,29,30,95,96,95,96,95,96],
	[79,28,29,30,79,80,156,157,157,158],
	[95,28,29,144,157,157,143,173,173,174],
	[79,28,173,173,173,173,173,173,173,174],
	[95,188,189,189,189,189,189,189,189,190]
];

var tilesetImage = new Image();
tilesetImage.src = 'static/tileset.png';
//tilesetImage.onload = drawImage;

var canvas = document.getElementById('main');
var ctx = canvas.getContext('2d');
var tileSize = 32;       // The size of a tile (32×32)
var rowTileCount = 10;   // The number of tiles in a row of our background
var colTileCount = 10;   // The number of tiles in a column of our background
var imageNumTiles = 16;  // The number of tiles per row in the tileset image


var players = [];


function Game(id) {
	var player = new Player(id, id);
	console.log(id);
	var tick = function () {
		ctx.clearRect(0,0, canvas.width, canvas.height);
		drawImage(tilesetImage);
		ctx.fillRect(player.col * 32, player.row * 32, 32, 32);
		window.requestAnimationFrame(tick);
	};
	tick();
}
;function Player(col, row) {
	this.col = col;
	this.row = row;
	this.color = "red";
	var self = this;
	nav[col][row] = 1;
	window.addEventListener('keydown', function(e) {
		//keyState[e.keyCode] = true;
		var data;
		if (e.keyCode == 37) { //left
			if (nav[self.col - 1][self.row] == 0) {
				nav[self.col - 1][self.row] = 1;
				nav[self.col][self.row] = 0;
				self.col--;
				data = {
					c: self.col - 1,
					r: self.row
				};
			};
		}
		if (e.keyCode == 39) { //right
			if (nav[self.col + 1][self.row] == 0) {
				nav[self.col + 1][self.row] = 1;
				nav[self.col][self.row] = 0;
				self.col++;
				data = {
					c: self.col + 1,
					r: self.row
				};
			};
		}
		if (e.keyCode == 38) { //down
			if (nav[self.col][self.row - 1] == 0) {
				nav[self.col][self.row - 1] = 1;
				nav[self.col][self.row] = 0;
				self.row--;
				data = {
					c: self.col,
					r: self.row - 1
				};
			};
		}
		if (e.keyCode == 40) { //up
			if (nav[self.col][self.row + 1] == 0) {
				nav[self.col][self.row + 1] = 1;
				nav[self.col][self.row] = 0;
				self.row++;
				data = {
					c: self.col,
					r: self.row + 1
				};
			};
		}
		socket.emit('move', { data: data });
	});
}