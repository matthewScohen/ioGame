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
  var cameraInfoPack = [];
  //Update game
  game.tick();


  /**** SEND DATA TO SOCKETS ****/
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
  //Add all the camera data to a list
  for(var i in game.players)
  {
    cameraInfoPack[i] =
    {
      cameraX:game.players[i].cameraX,
      cameraY:game.players[i].cameraY
    }
  }
  //Send game information to all sockets...
  for(var i in game.players)
  {
      game.sockets[i].emit('playerInfo', playerInfoPack); //Send the location of all players
      game.sockets[i].emit('beadPosition', beadPosition); //Send the location of the bead
      game.sockets[i].emit("cameraInfo", cameraInfoPack[i]); //Send each player just their camera location
  }
}
