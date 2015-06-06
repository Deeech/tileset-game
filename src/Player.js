function Player(col, row) {
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
		this.x -= 5;
		data = {
			x: this.x,
			y: this.y,
		};
		socket.emit("playerMove", data);
	}
	if (this.isDown(this.KEYS.RIGHT)) {
		this.x += 5;
		data = {
			x: this.x,
			y: this.y,
		};
		socket.emit("playerMove", data);
	}
	if (this.isDown(this.KEYS.DOWN)) {
		this.y -= 5;
		data = {
			x: this.x,
			y: this.y,
		};
		socket.emit("playerMove", data);
	}
	if (this.isDown(this.KEYS.UP)) {
		this.y += 5;
		data = {
			x: this.x,
			y: this.y,
		};
		socket.emit("playerMove", data);
	}
};