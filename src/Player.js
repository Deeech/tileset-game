function Player(col, row) {
	this.col = col;
	this.row = row;
	this.color = "red";
	var self = this;
	nav[col][row] = 1;
	window.addEventListener('keydown', function(e) {
		//keyState[e.keyCode] = true;
		var data;
		if (e.keyCode == 37) { //left
			if (nav[self.col - 1][self.row] == 0) {
				nav[self.col - 1][self.row] = 1;
				nav[self.col][self.row] = 0;
				self.col--;
				data = {
					c: self.col - 1,
					r: self.row
				};
			};
		}
		if (e.keyCode == 39) { //right
			if (nav[self.col + 1][self.row] == 0) {
				nav[self.col + 1][self.row] = 1;
				nav[self.col][self.row] = 0;
				self.col++;
				data = {
					c: self.col + 1,
					r: self.row
				};
			};
		}
		if (e.keyCode == 38) { //down
			if (nav[self.col][self.row - 1] == 0) {
				nav[self.col][self.row - 1] = 1;
				nav[self.col][self.row] = 0;
				self.row--;
				data = {
					c: self.col,
					r: self.row - 1
				};
			};
		}
		if (e.keyCode == 40) { //up
			if (nav[self.col][self.row + 1] == 0) {
				nav[self.col][self.row + 1] = 1;
				nav[self.col][self.row] = 0;
				self.row++;
				data = {
					c: self.col,
					r: self.row + 1
				};
			};
		}
		socket.emit('move', { data: data });
	});
}