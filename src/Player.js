function Player(col, row) {
	this.id;
	this.col = col;
	this.row = row;
	this.color = "red";



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

		console.clear();
		console.table(nav);

		socket.emit("move", data);

		socket.on("playermove", function(data) {
			console.log("playermove");
			console.log("recieve data");
			console.log(data);
			self.col = data.x;
			self.row = data.y;
		});
	});
}