'use strict';
import { Game } from './Game'

let socket = io(),
    navigationMap,
    game;


$("#log-in-modal").modal('show');

$("#log-in-modal").submit(function(e) {
  e.preventDefault();
  var nickname = $("#nameInput").val();
  if (nickname) {
    socket.emit("userLogin", nickname);
    $("#log-in-modal").modal("hide");


    return false;
  }
});

// $('#send-message').submit(function() {
//   socket.emit('chat message', $('#m').val());
//   $('#m').val('');
//   return false;
// });

socket.on("successLogin", function(data) {
  console.log("logined successufuly");

	game = new Game(data.clientname, socket);
	let tick = function () {
	  game.tick();
		window.requestAnimationFrame(tick);
	};
	tick();
});


socket.on("connect", function() {
  console.log("connected");
});

// socket.on("spawnNewPlayer", function(data) {
//   console.log('spawnNewPlayer');
//   navigationMap = data.navigationMap;
//   for (let _player in data.allCoords) {
//     players[_player] = data.allCoords[_player];
//   };
//   console.log(data);
//   var game = new Game(data.spawnPosition, data.newPlayerName);
// });

socket.on("updatePlayerCoord", function(data) {
	if (!!game) {
	  game.objects[data.clientname].x = data.coords.x;
	  game.objects[data.clientname].y = data.coords.y;
	}
});

socket.on("updatePlayers", function(data) {
	if (!!game) {
	  console.log('updatePlayers');
	  console.log(data);
	  game.addGameObject(data);
	}
  // if (!players[data.newPlayerName]) {
  //   players[data.newPlayerName] = {
  //     x: data.spawnPosition.x * 64,
  //     y: data.spawnPosition.y * 64
  //   };
  // }
});

// socket.on("updateMap", function(_navigationMap) {
//   console.log('updateMap');
//   navigationMap = _navigationMap;
// });

// socket.on('chat message', function(data) {
//   console.log('chat message');
//   var nickname = $("<span>").addClass("label label-success").text(data.nickname);
//   var message = $('#messages').append($("<li>").append(nickname).append($("<span>").text(data.msg)));
// });
