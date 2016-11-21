'use strict';
import { Game } from './Game'

let socket = io(),
    navigationMap,
    stats = new Stats(),
    game;

document.body.appendChild(stats.dom);

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

$('#send-message').submit(function() {
  socket.emit('chatMessage', $('#m').val());
  $('#m').val('');
  return false;
});

socket.on("successLogin", function(data) {
  console.log("logined successufuly");

  game = new Game(socket, data.id, data.position);
  window.game = game;

  let tick = function () {
    stats.begin();
    game.tick();
    stats.end();
    window.requestAnimationFrame(tick);
  };

  console.log("otherPlayers");
  console.log(data.otherPlayers);
  for (let player in data.otherPlayers) {
    let p = data.otherPlayers[player];
    game.addPlayer(p);
  }

  tick();
});


socket.on("connect", function() {
  console.log("connected");
});

socket.on("updatePlayerCoord", function(data) {
  if (!!game) {
    game.players[data.id].x = data.coords.x;
    game.players[data.id].y = data.coords.y;
  }
});

socket.on("addPlayer", function(data) {
  if (!!game) {
    console.log('addPlayer');
    console.log(data);
    game.addPlayer(data);
  }
});

socket.on('chatMessage', function(data) {
  console.log('chat message');
  let nickname = $("<span>").addClass("label label-success").text(data.nickname);
  let message = $('#messages').append($("<li>").append(nickname).append($("<span>").text(data.msg)));
});
