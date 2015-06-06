function Player(col, row) {
	this.id;
	
	this.col = col;
	this.row = row;
	
	this.color = "red";

	this.hitPoints = 0;
	this.maxHitPoints = 0;
	this.isDead = false;
	this.attackingMode = false;
	this.followingMode = false;


	var self = this;
	
	




	window.addEventListener('keydown', function(e) {
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

		socket.on("playerMove", function(data) {
			self.col = data.x;
			self.row = data.y;
		});
	});
}