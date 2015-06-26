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
};