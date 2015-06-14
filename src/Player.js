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
}

Player.prototype.update = function() {
	if (this.isDown(this.KEYS.LEFT)) {
		this.x -= 10;
		data = {
			x: this.x,
			y: this.y,
		};
		socket.binaryType = "arraybuffer";
		var a = new ArrayBuffer(11);
		var b = new DataView(a);
		b.setInt32(3, data.x);
		b.setInt32(7, data.y);

		socket.emit("playerMove", a);
	}
	if (this.isDown(this.KEYS.RIGHT)) {
		this.x += 10;
		data = {
			x: this.x,
			y: this.y,
		};
		socket.binaryType = "arraybuffer";
		var a = new ArrayBuffer(11);
		var b = new DataView(a);
		b.setInt32(3, data.x);
		b.setInt32(7, data.y);

		socket.emit("playerMove", a);
	}
	if (this.isDown(this.KEYS.DOWN)) {
		this.y -= 10;
		data = {
			x: this.x,
			y: this.y,
		};
		socket.binaryType = "arraybuffer";
		var a = new ArrayBuffer(11);
		var b = new DataView(a);
		b.setInt32(3, data.x);
		b.setInt32(7, data.y);

		socket.emit("playerMove", a);
	}
	if (this.isDown(this.KEYS.UP)) {
		this.y += 10;
		data = {
			x: this.x,
			y: this.y,
		};
		socket.binaryType = "arraybuffer";
		var a = new ArrayBuffer(11);
		var b = new DataView(a);
		b.setInt32(3, data.x);
		b.setInt32(7, data.y);

		socket.emit("playerMove", a);
	}
};