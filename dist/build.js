/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Game = __webpack_require__(1);

	var socket = io(),
	    navigationMap = void 0;

	var game = new _Game.Game();

	var tick = function tick() {
	    game.tick();
	    window.requestAnimationFrame(tick);
	};
	tick();

	// $("#log-in-modal").modal('show');

	// $('#send-message').submit(function() {
	//   socket.emit('chat message', $('#m').val());
	//   $('#m').val('');
	//   return false;
	// });

	// $("#log-in-modal").submit(function(e) {
	//   e.preventDefault();
	//   var nickname = $("#nameInput").val();
	//   if (nickname) {
	//     socket.emit("userLogin", nickname);
	//     $("#log-in-modal").modal("hide");
	//     return false;
	//   }
	// });

	// socket.on("connect", function() {
	//   console.log("connected");
	// });

	// socket.on("spawnNewPlayer", function(data) {
	//   console.log('spawnNewPlayer');
	//   navigationMap = data.navigationMap;
	//   for (let _player in data.allCoords) {
	//     players[_player] = data.allCoords[_player];
	//   };
	//   console.log(data);
	//   var game = new Game(data.spawnPosition, data.newPlayerName);
	// });

	// socket.on("updatePlayerCoord", function(data) {
	//   players[data.playerName].x = data.coords.x;
	//   players[data.playerName].y = data.coords.y;
	// });

	// socket.on("updatePlayers", function(data) {
	//   console.log('updatePlayers');
	//   if (!players[data.newPlayerName]) {
	//     players[data.newPlayerName] = {
	//       x: data.spawnPosition.x * 64,
	//       y: data.spawnPosition.y * 64
	//     };
	//   }
	// });

	// socket.on("updateMap", function(_navigationMap) {
	//   console.log('updateMap');
	//   navigationMap = _navigationMap;
	// });

	// socket.on('chat message', function(data) {
	//   console.log('chat message');
	//   var nickname = $("<span>").addClass("label label-success").text(data.nickname);
	//   var message = $('#messages').append($("<li>").append(nickname).append($("<span>").text(data.msg)));
	// });

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Game = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Player = __webpack_require__(2);

	var _Map = __webpack_require__(3);

	var _Camera = __webpack_require__(4);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// const TILESET_IMG = 'static/tileset2.png'
	var TILESET_IMG = 'static/tileset.png';

	var Game = function () {
		function Game() {
			var _this = this;

			_classCallCheck(this, Game);

			this.canvas = document.getElementById('cvs');
			this.ctx = this.canvas.getContext('2d');

			this.canvas.width = $(window).width();
			this.canvas.height = $(window).height();

			this.loadedResources = 0;
			this.numResources = 2;

			this.player = new _Player.Player(this.ctx, 1, 1);
			this.players = [];

			$.getJSON('/static/map32.json', function (data) {
				console.log('load mapjson');_this.mapData = data;_this.checkLoaded();
			});

			this.tilesetImage = new Image();
			this.tilesetImage.src = TILESET_IMG;
			this.tilesetImage.onload = function () {
				_this.checkLoaded();
			};

			console.log(this);
		}

		_createClass(Game, [{
			key: 'init',
			value: function init() {
				console.log('init');
				this.isLoad = true;
				this.map = new _Map.Map(this);
				this.map.generate();

				this.camera = new _Camera.Camera(0, 0, this.canvas.width, this.canvas.height, this.mapData.width * 32, this.mapData.height * 32); // TODO: Fix these magic numbers;
				this.camera.follow(this.player, this.canvas.width / 2, this.canvas.height / 2);

				console.log(this);
				this.handleEvents();
			}
		}, {
			key: 'handleEvents',
			value: function handleEvents() {
				var _this2 = this;

				$(window).on('resize', function (e) {
					_this2.canvas.width = $(window).width();
					_this2.canvas.height = $(window).height();
					_this2.map.update();
				});
			}
		}, {
			key: 'checkLoaded',
			value: function checkLoaded() {
				this.loadedResources += 1;
				console.log('checkLoaded');
				if (this.loadedResources == this.numResources) {
					this.init();
				}
			}
		}, {
			key: 'tick',
			value: function tick() {
				if (this.isLoad) {
					this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
					this.camera.update();
					this.map.update(this.camera.xView, this.camera.yView);
					this.player.update();
					this.player.render(this.camera.xView, this.camera.yView);
				}
			}
		}]);

		return Game;
	}();

	exports.Game = Game;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Player = function () {
		function Player(ctx, col, row) {
			_classCallCheck(this, Player);

			this.id;
			this.ctx = ctx;

			this.col = col;
			this.row = row;

			this.x = this.col * 64;
			this.y = this.row * 64;

			this.step = 5;

			this.color = '#' + Math.floor(Math.random() * 16777215).toString(16);

			this.hitPoints = 0;
			this.maxHitPoints = 0;
			this.isDead = false;
			this.attackingMode = false;
			this.followingMode = false;

			var self = this;

			this.KEYS = { LEFT: 37, RIGHT: 39, UP: 40, DOWN: 38 /*, S: 83*/ };
			var keyState = {};

			window.addEventListener('keydown', function (e) {
				keyState[e.keyCode] = true;
			});
			window.addEventListener('keyup', function (e) {
				keyState[e.keyCode] = false;
			});

			this.isDown = function (keyCode) {
				return keyState[keyCode] === true;
			};

			/*window.addEventListener('keydown', function(e) {
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
	  });*/

			/*socket.on("playerMove", function(data) {
	  	self.col = data.x;
	  	self.row = data.y;
	  });*/
		}

		_createClass(Player, [{
			key: 'update',
			value: function update() {
				if (this.isDown(this.KEYS.LEFT)) {
					this.x -= this.step;
					// data = {
					// 	x: this.x,
					// 	y: this.y,
					// };
					// socket.emit("playerMove", data);
				}

				if (this.isDown(this.KEYS.RIGHT)) {
					this.x += this.step;
					// data = {
					// 	x: this.x,
					// 	y: this.y,
					// };
					// socket.emit("playerMove", data);
				}

				if (this.isDown(this.KEYS.DOWN)) {
					this.y -= this.step;
					// data = {
					// 	x: this.x,
					// 	y: this.y,
					// };
					// socket.emit("playerMove", data);
				}

				if (this.isDown(this.KEYS.UP)) {
					this.y += this.step;
					// data = {
					// 	x: this.x,
					// 	y: this.y,
					// };
					// socket.emit("playerMove", data);
				}
			}
		}, {
			key: 'render',
			value: function render() {
				var xView = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
				var yView = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

				this.ctx.fillStyle = this.color;
				this.ctx.fillRect(this.x - 64 / 2 - xView, this.y - 64 / 2 - yView, 64, 64);
			}
		}]);

		return Player;
	}();

	exports.Player = Player;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Map = function () {
	  function Map(game) {
	    _classCallCheck(this, Map);

	    this.game = game;

	    this.tileSize = 32; // The size of a tile (64×64)
	    this.rowTileCount = 100; // The number of tiles in a row of our background
	    this.colTileCount = 100; // The number of tiles in a column of our background
	    this.imageNumTiles = 16; // The number of tiles per row in the tileset image
	    this.ctx = this.game.ctx;
	    this.tilesetImage = this.game.tilesetImage;
	    this.mapData = this.game.mapData;
	  }

	  _createClass(Map, [{
	    key: "generate",
	    value: function generate() {
	      var ctx = document.createElement("canvas").getContext("2d");
	      ctx.canvas.width = this.mapData.width * this.tileSize; // TODO: Fix these magic numbers;
	      ctx.canvas.height = this.mapData.height * this.tileSize;
	      for (var layer_i in this.mapData.layers) {
	        var layer = this.mapData.layers[layer_i];
	        for (var tile_i in layer.data) {
	          var tile = layer.data[tile_i];
	          var row = Math.floor(tile_i / layer.width);
	          var col = tile_i % layer.width;
	          tile--;
	          var tileRow = tile / this.imageNumTiles | 0;
	          var tileCol = tile % this.imageNumTiles | 0;
	          ctx.drawImage(this.tilesetImage, tileCol * this.tileSize, tileRow * this.tileSize, this.tileSize, this.tileSize, col * this.tileSize, row * this.tileSize, this.tileSize, this.tileSize);
	        }
	      }

	      this.image = new Image();
	      this.image.src = ctx.canvas.toDataURL("image/png");
	      this.update();
	      console.log(this.image.width);
	      console.log(this.image.height);
	    }
	  }, {
	    key: "update",
	    value: function update() {
	      var xView = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var yView = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

	      var sx, sy, dx, dy;
	      var sWidth, sHeight, dWidth, dHeight;

	      // offset point to crop the image
	      sx = xView;
	      sy = yView;

	      // dimensions of cropped image
	      sWidth = this.ctx.canvas.width;
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
	  }]);

	  return Map;
	}();

	exports.Map = Map;

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

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Camera = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Rectangle = __webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var AXIS = {
	  NONE: 'none',
	  HORIZONTAL: 'horizontal',
	  VERTICAL: 'vertical',
	  BOTH: 'both'
	};

	var Camera = function () {
	  function Camera() {
	    var xView = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	    var yView = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	    var canvasWidth = arguments[2];
	    var canvasHeight = arguments[3];
	    var worldWidth = arguments[4];
	    var worldHeight = arguments[5];

	    _classCallCheck(this, Camera);

	    this.xView = xView;
	    this.yView = yView;

	    this.xDeadZone = 0;
	    this.yDeadZone = 0;

	    this.wView = canvasWidth;
	    this.hView = canvasHeight;

	    this.axis = AXIS.BOTH;

	    this.followed = null;

	    this.viewportRect = new _Rectangle.Rectangle(this.xView, this.yView, this.wView, this.hView);

	    this.worldRect = new _Rectangle.Rectangle(0, 0, worldWidth, worldHeight);
	  }

	  _createClass(Camera, [{
	    key: 'follow',
	    value: function follow(gameObject, xDeadZone, yDeadZone) {
	      this.followed = gameObject;
	      this.xDeadZone = xDeadZone;
	      this.yDeadZone = yDeadZone;
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      if (this.followed != null) {
	        if (this.axis == AXIS.HORIZONTAL || this.axis == AXIS.BOTH) {
	          if (this.followed.x - this.xView + this.xDeadZone > this.wView) this.xView = this.followed.x - (this.wView - this.xDeadZone);else if (this.followed.x - this.xDeadZone < this.xView) this.xView = this.followed.x - this.xDeadZone;
	        }

	        if (this.axis == AXIS.VERTICAL || this.axis == AXIS.BOTH) {
	          if (this.followed.y - this.yView + this.yDeadZone > this.hView) this.yView = this.followed.y - (this.hView - this.yDeadZone);else if (this.followed.y - this.yDeadZone < this.yView) this.yView = this.followed.y - this.yDeadZone;
	        }
	      }

	      this.viewportRect.set(this.xView, this.yView);

	      if (!this.viewportRect.within(this.worldRect)) {
	        if (this.viewportRect.left < this.worldRect.left) this.xView = this.worldRect.left;

	        if (this.viewportRect.top < this.worldRect.top) this.yView = this.worldRect.top;

	        if (this.viewportRect.right > this.worldRect.right) this.xView = this.worldRect.right - this.wView;

	        if (this.viewportRect.bottom > this.worldRect.bottom) this.yView = this.worldRect.bottom - this.hView;
	      }
	    }
	  }]);

	  return Camera;
	}();

	exports.Camera = Camera;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Rectangle = function () {
	  function Rectangle() {
	    var left = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	    var top = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	    var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	    var height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

	    _classCallCheck(this, Rectangle);

	    this.width = width;
	    this.height = height;
	    this.left = left;
	    this.top = top;
	    this.right = this.left + this.width;
	    this.bottom = this.top + this.height;
	  }

	  _createClass(Rectangle, [{
	    key: "set",
	    value: function set(left, top, width, height) {
	      this.width = width || this.width;
	      this.height = height || this.height;
	      this.left = left;
	      this.top = top;
	      this.right = this.left + this.width;
	      this.bottom = this.top + this.height;
	    }
	  }, {
	    key: "within",
	    value: function within(r) {
	      return r.left <= this.left && r.right >= this.right && r.top <= this.top && r.bottom >= this.bottom;
	    }
	  }, {
	    key: "overlaps",
	    value: function overlaps() {
	      return this.left < r.right && r.left < this.right && this.top < r.bottom && r.top < this.bottom;
	    }
	  }]);

	  return Rectangle;
	}();

	exports.Rectangle = Rectangle;

/***/ }
/******/ ]);