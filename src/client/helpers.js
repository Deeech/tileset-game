'use strict';

function drawBackground (ctx, image, tileSize, rowTileCount, colTileCount, imageNumTiles, map) {

	for (let layer_i in map.layers) {
		let layer = map.layers[layer_i]
		for (let tile_i in layer.data) {
			let tile = layer.data[tile_i]
			let row = Math.floor(tile_i / layer.width)
			let col = tile_i % layer.width
			tile--;
			let tileRow = (tile / imageNumTiles) | 0;
			let tileCol = (tile % imageNumTiles) | 0;
			ctx.drawImage(image, (tileCol * tileSize), (tileRow * tileSize), 64, 64, (col * 64), (row * 64), 64, 64);
		}
	}
	// for (var r = 0; r < rowTileCount; r++) {
	// 	for (var c = 0; c < colTileCount; c++) {
	// 		var tile = ground[ r ][ c ];
	// 		tile--; // TODO fit it
	// 		var tileRow = (tile / imageNumTiles) | 0; // Bitwise OR operation // the same as row = Math.floor(10 / 16) = Math.floor(0.625) = 0
	// 		var tileCol = (tile % imageNumTiles) | 0; // the same as col = Math.floor(10 % 16) = Math.floor(10) = 10
	// 		ctx.drawImage(image, (tileCol * tileSize), (tileRow * tileSize), tileSize, tileSize, (c * tileSize), (r * tileSize), tileSize, tileSize);
	// 	}
	// }


	// for (_player in players) {
	// 	if (players[_player].update) {
	// 		players[_player].update();
	// 	};
	// 	ctx.fillStyle = '#AF5200';
	// 	ctx.fillRect(players[_player].x, players[_player].y, 64, 64);
	// };
}

function drawPlayer(ctx, player) {
	player.update()
	ctx.fillStyle = player.color
	ctx.fillRect(player.x, player.y, 64, 64)
}

export { drawBackground, drawPlayer }
