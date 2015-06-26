var ground = [
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
