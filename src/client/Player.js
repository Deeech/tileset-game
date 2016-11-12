'use strict';

class Player {
  constructor(ctx, position, game) {
    this.id;
    this.ctx = ctx;
    this.game = game;

    this.x = position.x;
    this.y = position.y;

    this.step = 5;


    this.color = '#'+Math.floor(Math.random()*16777215).toString(16);

    this.hitPoints = 0;
    this.maxHitPoints = 0;
    this.isDead = false;
    this.attackingMode = false;
    this.followingMode = false;


    var self = this;


    this.KEYS = { LEFT: 37, RIGHT: 39, UP: 40, DOWN: 38/*, S: 83*/ };
    let keyState = {};

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

  update() {
    if (this.isDown(this.KEYS.LEFT)) {
      this.x -= this.step;
      let data = {
        id: this.game.id,
        x: this.x,
        y: this.y,
      };
      this.game.socket.emit("playerMove", data);
    }

    if (this.isDown(this.KEYS.RIGHT)) {
      this.x += this.step;
      let data = {
        id: this.game.id,
        x: this.x,
        y: this.y,
      };
      this.game.socket.emit("playerMove", data);
    }

    if (this.isDown(this.KEYS.DOWN)) {
      this.y -= this.step;
      let data = {
        id: this.game.id,
        x: this.x,
        y: this.y,
      };
      this.game.socket.emit("playerMove", data);
    }

    if (this.isDown(this.KEYS.UP)) {
      this.y += this.step;
      let data = {
        id: this.game.id,
        x: this.x,
        y: this.y,
      };
      this.game.socket.emit("playerMove", data);
    }
  }

  render(xView = 0, yView = 0) {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect((this.x - 64/2) - xView, (this.y - 64/2) - yView, 64, 64);
  }

}

export { Player }
