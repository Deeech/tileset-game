function Player(col, row) {
	this.id;
	this.col = col;
	this.row = row;
	this.color = "red";



	var self = this;
	
	window.addEventListener('keydown', function(e) {
		//keyState[e.keyCode] = true;
		var data;
		if (e.keyCode == 37) { //left
			if (nav[self.col - 1][self.row] == 0) {
				nav[self.col - 1][self.row] = 1;
				nav[self.col][self.row] = 0;
				data = {
					c: self.col - 1,
					r: self.row
				};
				self.col--;
			};
		}
		if (e.keyCode == 39) { //right
			if (nav[self.col + 1][self.row] == 0) {
				nav[self.col + 1][self.row] = 1;
				nav[self.col][self.row] = 0;
				data = {
					c: self.col + 1,
					r: self.row
				};
				self.col++;
			};
		}
		if (e.keyCode == 38) { //down
			if (nav[self.col][self.row - 1] == 0) {
				nav[self.col][self.row - 1] = 1;
				nav[self.col][self.row] = 0;
				data = {
					c: self.col,
					r: self.row - 1
				};
				self.row--;
			};
		}
		if (e.keyCode == 40) { //up
			if (nav[self.col][self.row + 1] == 0) {
				nav[self.col][self.row + 1] = 1;
				nav[self.col][self.row] = 0;
				data = {
					c: self.col,
					r: self.row + 1
				};
				self.row++;
			};
		}

		console.clear(); // debug
		console.table(nav);

		socket.emit('move', data);
	});
}