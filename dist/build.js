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
	    navigationMap;

	var game = new _Game.Game();

	var tick = function tick() {
	  game.tick();
	  window.requestAnimationFrame(tick);
	};
	tick();

	$("#log-in-modal").modal('show');

	$('#send-message').submit(function () {
	  socket.emit('chat message', $('#m').val());
	  $('#m').val('');
	  return false;
	});

	$("#log-in-modal").submit(function (e) {
	  e.preventDefault();
	  var nickname = $("#nameInput").val();
	  if (nickname) {
	    socket.emit("userLogin", nickname);
	    $("#log-in-modal").modal("hide");
	    return false;
	  }
	});

	socket.on("connect", function () {
	  console.log("connected");
	});

	socket.on("spawnNewPlayer", function (data) {
	  navigationMap = data.navigationMap;
	  for (var _player in data.allCoords) {
	    players[_player] = data.allCoords[_player];
	  };
	  console.log(data);
	  var game = new _Game.Game(data.spawnPosition, data.newPlayerName);
	});

	socket.on("updatePlayerCoord", function (data) {
	  players[data.playerName].x = data.coords.x;
	  players[data.playerName].y = data.coords.y;
	});

	socket.on("updatePlayers", function (data) {
	  if (!players[data.newPlayerName]) {
	    players[data.newPlayerName] = {
	      x: data.spawnPosition.x * 64,
	      y: data.spawnPosition.y * 64
	    };
	  }
	});

	socket.on("updateMap", function (_navigationMap) {
	  navigationMap = _navigationMap;
	});

	socket.on('chat message', function (data) {
	  var nickname = $("<span>").addClass("label label-success").text(data.nickname);
	  var message = $('#messages').append($("<li>").append(nickname).append($("<span>").text(data.msg)));
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Game = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _helpers = __webpack_require__(2);

	var _Player = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// function Game(spawnPosition, newPlayername) {
	// 	player = new Player(spawnPosition.x, spawnPosition.y);
	// 	var self = this;
	//
	// 	players[newPlayername] = player;
	//
	// 	var tick = function () {
	// 		ctx.clearRect(0,0, canvas.width, canvas.height);
	// 		drawImage(tilesetImage);
	// 		window.requestAnimationFrame(tick);
	// 	};
	//
	// 	tick();
	// }

	var TILESET_IMG = 'static/tileset2.png';

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

			this.player = new _Player.Player(1, 1);
			this.players = [];

			$.getJSON('/static/map.json', function (data) {
				_this.map = data;_this.checkLoaded();
			});

			this.tilesetImage = new Image();
			this.tilesetImage.src = TILESET_IMG;
			this.tilesetImage.onload = function () {
				_this.checkLoaded();
			};

			this.tileSize = 64; // The size of a tile (64×64)
			this.rowTileCount = 10; // The number of tiles in a row of our background
			this.colTileCount = 10; // The number of tiles in a column of our background
			this.imageNumTiles = 10; // The number of tiles per row in the tileset image

			// var players = {};

			console.log(this);
		}

		_createClass(Game, [{
			key: 'handleEvents',
			value: function handleEvents() {
				var _this2 = this;

				$(window).on('resize', function (e) {
					_this2.canvas.width = $(window).width();
					_this2.canvas.height = $(window).height();
					(0, _helpers.drawBackground)(_this2.ctx, _this2.tilesetImage, _this2.tileSize, _this2.rowTileCount, _this2.colTileCount, _this2.imageNumTiles, _this2.map);
				});
			}
		}, {
			key: 'checkLoaded',
			value: function checkLoaded() {
				this.loadedResources += 1;

				if (this.loadedResources == this.numResources) {
					this.isLoad = true;
					(0, _helpers.drawBackground)(this.ctx, this.tilesetImage, this.tileSize, this.rowTileCount, this.colTileCount, this.imageNumTiles, this.map);
					this.handleEvents();
				}
			}
		}, {
			key: 'tick',
			value: function tick() {
				if (this.isLoad) {
					// ctx.clearRect(0,0, canvas.width, canvas.height);
					(0, _helpers.drawBackground)(this.ctx, this.tilesetImage, this.tileSize, this.rowTileCount, this.colTileCount, this.imageNumTiles, this.map);
					(0, _helpers.drawPlayer)(this.ctx, this.player);
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
	function drawBackground(ctx, image, tileSize, rowTileCount, colTileCount, imageNumTiles, map) {

		for (var layer_i in map.layers) {
			var layer = map.layers[layer_i];
			for (var tile_i in layer.data) {
				var tile = layer.data[tile_i];
				var row = Math.floor(tile_i / layer.width);
				var col = tile_i % layer.width;
				tile--;
				var tileRow = tile / imageNumTiles | 0;
				var tileCol = tile % imageNumTiles | 0;
				ctx.drawImage(image, tileCol * tileSize, tileRow * tileSize, 64, 64, col * 64, row * 64, 64, 64);
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
		player.update();
		ctx.fillStyle = player.color;
		ctx.fillRect(player.x, player.y, 64, 64);
	}

	exports.drawBackground = drawBackground;
	exports.drawPlayer = drawPlayer;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Player = function () {
		function Player(col, row) {
			_classCallCheck(this, Player);

			this.id;

			this.col = col;
			this.row = row;

			this.x = this.col * 64;
			this.y = this.row * 64;

			this.color = '#' + Math.floor(Math.random() * 16777215).toString(16);;

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
					this.x -= 10;
					// data = {
					// 	x: this.x,
					// 	y: this.y,
					// };
					// socket.emit("playerMove", data);
				}

				if (this.isDown(this.KEYS.RIGHT)) {
					this.x += 10;
					// data = {
					// 	x: this.x,
					// 	y: this.y,
					// };
					// socket.emit("playerMove", data);
				}

				if (this.isDown(this.KEYS.DOWN)) {
					this.y -= 10;
					// data = {
					// 	x: this.x,
					// 	y: this.y,
					// };
					// socket.emit("playerMove", data);
				}

				if (this.isDown(this.KEYS.UP)) {
					this.y += 10;
					// data = {
					// 	x: this.x,
					// 	y: this.y,
					// };
					// socket.emit("playerMove", data);
				}
			}
		}]);

		return Player;
	}();

	exports.Player = Player;

/***/ }
/******/ ]);