
class Map {
  constructor(game) {
    this.game = game;

    this.tileSize = 32;        // The size of a tile (64×64)
    this.rowTileCount = 100;   // The number of tiles in a row of our background
    this.colTileCount = 100;   // The number of tiles in a column of our background
    this.imageNumTiles = 16;   // The number of tiles per row in the tileset image
    this.ctx = this.game.ctx;
    this.tilesetImage = this.game.tilesetImage;
    this.mapData = this.game.mapData;
  }

  generate() {
    let ctx = document.createElement("canvas").getContext("2d");

    ctx.canvas.width = this.mapData.width * this.tileSize; // TODO: Fix these magic numbers;
    ctx.canvas.height = this.mapData.height * this.tileSize;

    for (let layer_i in this.mapData.layers) {
      let layer = this.mapData.layers[layer_i]

      for (let tile_i in layer.data) {
        let tile = layer.data[tile_i],
            row = Math.floor(tile_i / layer.width),
            col = tile_i % layer.width;

        tile--;

        let tileRow = (tile / this.imageNumTiles) | 0,
            tileCol = (tile % this.imageNumTiles) | 0;

        ctx.drawImage(
          this.tilesetImage,
          (tileCol * this.tileSize),
          (tileRow * this.tileSize),
          this.tileSize,
          this.tileSize,
          (col * this.tileSize),
          (row * this.tileSize),
          this.tileSize,
          this.tileSize
        );
      }
    }

    this.image = new Image();
    this.image.src = ctx.canvas.toDataURL("image/png");
    this.update();
  }

  update(xView = 0, yView = 0) {
    var sx, sy, dx, dy;
    var sWidth, sHeight, dWidth, dHeight;

    // offset point to crop the image
    sx = xView;
    sy = yView;

    // dimensions of cropped image
    sWidth =  this.ctx.canvas.width;
    sHeight = this.ctx.canvas.height;

    // if cropped image is smaller than canvas we need to change the source dimensions
    if (this.image.width - sx < sWidth) {
      sWidth = this.image.width - sx;
    }

    if (this.image.height - sy < sHeight) {
      sHeight = this.image.height - sy;
    }

    // location on canvas to draw the croped image
    dx = 0;
    dy = 0;

    // match destination with source to not scale the image
    dWidth = sWidth;
    dHeight = sHeight;

    this.ctx.drawImage(this.image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
  }

}

export { Map };
