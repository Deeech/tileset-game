
class Map {
  constructor(game) {
    this.game = game;

    this.tileSize = 64;       // The size of a tile (64×64)
    this.rowTileCount = 40;   // The number of tiles in a row of our background
    this.colTileCount = 20;   // The number of tiles in a column of our background
    this.imageNumTiles = 10;  // The number of tiles per row in the tileset image
    this.ctx = this.game.ctx;
    this.tilesetImage = this.game.tilesetImage;
    this.mapData = this.game.mapData;
  }

  generate() {
    let ctx = document.createElement("canvas").getContext("2d");
    ctx.canvas.width = this.mapData.width * 64; // TODO: Fix these magic numbers;
    ctx.canvas.height = this.mapData.height * 64;
    for (let layer_i in this.mapData.layers) {
      let layer = this.mapData.layers[layer_i]
      for (let tile_i in layer.data) {
        let tile = layer.data[tile_i];
        let row = Math.floor(tile_i / layer.width);
        let col = tile_i % layer.width;
        tile--;
        let tileRow = (tile / this.imageNumTiles) | 0;
        let tileCol = (tile % this.imageNumTiles) | 0;
        ctx.drawImage(this.tilesetImage, (tileCol * this.tileSize), (tileRow * this.tileSize), 64, 64, (col * 64), (row * 64), 64, 64);
      }
    }

    this.image = new Image();
    this.image.src = ctx.canvas.toDataURL("image/png");
    this.update();
    console.log(this.image.width);
    console.log(this.image.height);
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

// (function(){
//   function Map(width, height){
//     // map dimensions
//     this.width = width;
//     this.height = height;

//     // map texture
//     this.image = null;
//   }

//   // generate an example of a large map
//   Map.prototype.generate = function(){
//     var ctx = document.createElement("canvas").getContext("2d");
//     ctx.canvas.width = this.width;
//     ctx.canvas.height = this.height;

//     var rows = ~~(this.width/44) + 1;
//     var columns = ~~(this.height/44) + 1;

//     var color = "red";
//     ctx.save();
//     ctx.fillStyle = "red";
//     for (var x = 0, i = 0; i < rows; x+=44, i++) {
//       ctx.beginPath();
//       for (var y = 0, j=0; j < columns; y+=44, j++) {
//         ctx.rect (x, y, 40, 40);
//       }
//       color = (color == "red" ? "blue" : "red");
//       ctx.fillStyle = color;
//       ctx.fill();
//       ctx.closePath();
//     }
//     ctx.restore();

//     // store the generate map as this image texture
//     this.image = new Image();
//     this.image.src = ctx.canvas.toDataURL("image/png");

//     // clear context
//     ctx = null;
//   }

//   // draw the map adjusted to camera
//   Map.prototype.draw = function(context, xView, yView){
//     // easiest way: draw the entire map changing only the destination coordinate in canvas
//     // canvas will cull the image by itself (no performance gaps -> in hardware accelerated environments, at least)
//     //context.drawImage(this.image, 0, 0, this.image.width, this.image.height, -xView, -yView, this.image.width, this.image.height);

//     // didactic way:

//     var sx, sy, dx, dy;
//           var sWidth, sHeight, dWidth, dHeight;

//     // offset point to crop the image
//     sx = xView;
//     sy = yView;

//     // dimensions of cropped image
//     sWidth =  context.canvas.width;
//     sHeight = context.canvas.height;

//     // if cropped image is smaller than canvas we need to change the source dimensions
//     if(this.image.width - sx < sWidth){
//       sWidth = this.image.width - sx;
//     }
//     if(this.image.height - sy < sHeight){
//       sHeight = this.image.height - sy;
//     }

//     // location on canvas to draw the croped image
//     dx = 0;
//     dy = 0;
//     // match destination with source to not scale the image
//     dWidth = sWidth;
//     dHeight = sHeight;

//     context.drawImage(this.image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
//   }

//   // add "class" Map to our Game object
//   Game.Map = Map;

// })();
