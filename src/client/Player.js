'use strict';

class Player {
	constructor(ctx, col, row, game) {
		this.id;
		this.ctx = ctx;
		this.game = game;

		this.col = col;
		this.row = row;

		this.x = this.col * 64;
		this.y = this.row * 64;

		this.step = 5;


		this.color = '#'+Math.floor(Math.random()*16777215).toString(16);

		this.hitPoints = 0;
		this.maxHitPoints = 0;
		this.isDead = false;
		this.attackingMode = false;
		this.followingMode = false;


		var self = this;


		this.KEYS = { LEFT: 37, RIGHT: 39, UP: 40, DOWN: 38/*, S: 83*/ };
		let keyState = {};

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

	update() {
		if (this.isDown(this.KEYS.LEFT)) {
			this.x -= this.step;
			let data = {
				clientname: this.game.clientname,
				x: this.x,
				y: this.y,
			};
			this.game.socket.emit("playerMove", data);
		}

		if (this.isDown(this.KEYS.RIGHT)) {
			this.x += this.step;
			let data = {
				clientname: this.game.clientname,
				x: this.x,
				y: this.y,
			};
			this.game.socket.emit("playerMove", data);
		}

		if (this.isDown(this.KEYS.DOWN)) {
			this.y -= this.step;
			let data = {
				clientname: this.game.clientname,
				x: this.x,
				y: this.y,
			};
			this.game.socket.emit("playerMove", data);
		}

		if (this.isDown(this.KEYS.UP)) {
			this.y += this.step;
			let data = {
				clientname: this.game.clientname,
				x: this.x,
				y: this.y,
			};
			this.game.socket.emit("playerMove", data);
		}
	}

	render(xView = 0, yView = 0) {
		this.ctx.fillStyle = this.color;
		this.ctx.fillRect((this.x - 64/2) - xView, (this.y - 64/2) - yView, 64, 64);
	}

}

export { Player }
