var express = require('express');
var app = express();
var serv = require('http').Server(app);
var Game = require("./server/game.js");

const PORT = 9000;
const serverUpdateRate = 60;

//Setup files to be served to client
app.get('/',function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});
app.use('/client',express.static(__dirname + '/client'));

//Setup server
serv.listen(PORT);
setInterval(tickServer, 1000/serverUpdateRate);
var io = require('socket.io')(serv,{});
console.log("Server started");

//Setup game
var game = new Game();

io.sockets.on('connection', function(socket){
    socket.id = Math.random();
    game.addPlayer(socket);

    socket.on('disconnect',function(){
        game.removePlayer(socket);
    });
    socket.on('keyPress',function(inputData){
      game.handleInput(socket, inputData);
    });
});

function tickServer() {
  var playerInfoPack = [];
  var beadPosition = [];
  //Update game
  game.tick();
  //Add all the player data to the player info pack
  for(var i in game.players)
  {
      playerInfoPack.push(
        {
          playerX:game.players[i].xPos,
          playerY:game.players[i].yPos,
          playerColor:game.players[i].color,
          playerScore:game.players[i].score
        });
  }
  //Add the bead data to the bead info pack
  beadPosition.push(game.bead.xPos, game.bead.yPos);
  //Send the player and bead info to all connected userss
  for(var i in game.sockets)
  {
      game.sockets[i].emit('playerInfo', playerInfoPack);
      game.sockets[i].emit('beadPosition', beadPosition);
  }
}
