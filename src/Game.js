var ground = [
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


function Game(spawnPosition) {
	this.player = new Player(spawnPosition.x, spawnPosition.y);
	var self = this;

	var tick = function () {
		ctx.clearRect(0,0, canvas.width, canvas.height);
		drawImage(tilesetImage);		
		ctx.fillRect(self.player.col * 32, self.player.row * 32, 32, 32);
		window.requestAnimationFrame(tick);
	};

	tick();
}
