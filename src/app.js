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
    socket.emit("wallInfo", game.map.walls);
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
  //Add the bead data to the bead info pack
  beadPosition.push(game.bead.xPos, game.bead.yPos);
  //Add all the player data to the player info pack
  for(var i in game.players)
  {
      playerInfoPack.push(
        {
          xPos:game.players[i].xPos,
          yPos:game.players[i].yPos,
          color:game.players[i].color,
          score:game.players[i].score,
          radius:game.players[i].radius
        });
  }
  //Send the player and bead info to all connected users
  for(var i in game.sockets)
  {
      game.sockets[i].emit('playerInfo', playerInfoPack);
      game.sockets[i].emit('beadPosition', beadPosition);
  }
}
