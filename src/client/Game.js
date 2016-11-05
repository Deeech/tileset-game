'use strict';
import { Player } from './Player'
import { Map } from './Map'
import { Camera } from './Camera'

// const TILESET_IMG = 'static/tileset2.png'
const TILESET_IMG = 'static/tileset.png'

class Game {
	constructor() {
		this.canvas = document.getElementById('cvs')
		this.ctx = this.canvas.getContext('2d')

		this.canvas.width = $(window).width();
		this.canvas.height = $(window).height();

		this.loadedResources = 0;
		this.numResources = 2;

		this.player = new Player(this.ctx, 1, 1);
		this.players = [];

		$.getJSON('/static/map32.json', (data) => { console.log('load mapjson'); this.mapData = data; this.checkLoaded(); });

		this.tilesetImage = new Image();
		this.tilesetImage.src = TILESET_IMG;
		this.tilesetImage.onload = () => {
			this.checkLoaded();
		}

		console.log(this);
	}

	init() {
		console.log('init');
		this.isLoad = true;
		this.map = new Map(this);
		this.map.generate();

		this.camera = new Camera(0, 0, this.canvas.width, this.canvas.height, this.mapData.width * 32, this.mapData.height * 32); // TODO: Fix these magic numbers;
		this.camera.follow(this.player, this.canvas.width / 2, this.canvas.height / 2);

		console.log(this);
		this.handleEvents();
	}

	handleEvents() {
		$(window).on('resize', (e) => {
			this.canvas.width = $(window).width();
			this.canvas.height = $(window).height();
			this.map.update();
		})
	}

	checkLoaded() {
		this.loadedResources += 1
		console.log('checkLoaded');
		if (this.loadedResources == this.numResources) {
			this.init();
		}
	}

	tick() {
		if (this.isLoad) {
			this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
			this.camera.update();
			this.map.update(this.camera.xView, this.camera.yView);
			this.player.update();
			this.player.render(this.camera.xView, this.camera.yView);
		}
	}
}

export { Game }
