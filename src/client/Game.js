'use strict';
import { drawBackground, drawPlayer } from './helpers'
import { Player } from './Player'


// function Game(spawnPosition, newPlayername) {
// 	player = new Player(spawnPosition.x, spawnPosition.y);
// 	var self = this;
//
// 	players[newPlayername] = player;
//
// 	var tick = function () {
// 		ctx.clearRect(0,0, canvas.width, canvas.height);
// 		drawImage(tilesetImage);
// 		window.requestAnimationFrame(tick);
// 	};
//
// 	tick();
// }

const TILESET_IMG = 'static/tileset2.png'

class Game {
	constructor() {
		this.canvas = document.getElementById('cvs')
		this.ctx = this.canvas.getContext('2d')

		this.canvas.width = $(window).width();
		this.canvas.height = $(window).height();

		this.loadedResources = 0;
		this.numResources = 2;

		this.player = new Player(1, 1)
		this.players = []

		$.getJSON('/static/map.json', (data) => { this.map = data; this.checkLoaded(); })

		this.tilesetImage = new Image()
		this.tilesetImage.src = TILESET_IMG
		this.tilesetImage.onload = () => {
			this.checkLoaded()
		}

		this.tileSize = 64;       // The size of a tile (64×64)
		this.rowTileCount = 10;   // The number of tiles in a row of our background
		this.colTileCount = 10;   // The number of tiles in a column of our background
		this.imageNumTiles = 10;  // The number of tiles per row in the tileset image

		// var players = {};

		console.log(this)
	}

	handleEvents() {
		$(window).on('resize', (e) => {
			this.canvas.width = $(window).width();
			this.canvas.height = $(window).height();
			drawBackground(this.ctx, this.tilesetImage, this.tileSize, this.rowTileCount, this.colTileCount, this.imageNumTiles, this.map)
		})
	}

	checkLoaded() {
		this.loadedResources += 1

		if (this.loadedResources == this.numResources) {
			this.isLoad = true
			drawBackground(this.ctx, this.tilesetImage, this.tileSize, this.rowTileCount, this.colTileCount, this.imageNumTiles, this.map)
			this.handleEvents()
		}
	}

	tick() {
		if (this.isLoad) {
			// ctx.clearRect(0,0, canvas.width, canvas.height);
			drawBackground(this.ctx, this.tilesetImage, this.tileSize, this.rowTileCount, this.colTileCount, this.imageNumTiles, this.map)
			drawPlayer(this.ctx, this.player)
		}
	}
}

export { Game }
