let fs = require('fs');

let file = JSON.parse(fs.readFileSync('../static/map32.json', 'utf8'));
console.log(file);

class Area {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.col = Math.round(1920/32);
    this.row = Math.round(1080/32);
    console.log(this);
  }
}

class GameMap {
  constructor(file) {
    this.width = file.width * file.tilewidth;
    this.height = file.height * file.tileheight;
    this.areaSize = 100;
    this.areas = [];
    this.col = Math.round(1920/32);
    this.row = Math.round(1080/32);

    console.log(this);
    let coli = 0;
    //file.layers[0].data.forEach((el, i) => {
    //  if (i % (this.col * this.row) === 0) this.areas.push(new Area());
    //});
    //console.log(coli);
  }
}

new GameMap(file);
new Area();
