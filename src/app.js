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
    socket.emit("currentBeadState", game.beads);
    game.addPlayer(socket);

    socket.on('disconnect',function(){
        game.disconnectPlayer(socket);
    });
    socket.on('keyPress',function(inputData){
      game.handleKeyInput(socket, inputData);
    });
    socket.on("mouseDown", function(inputData)
    {
      game.handleMouseInput(socket, inputData);
    });
    socket.on("respawn", function(nameValue)
    {
      game.respawnPlayer(socket);
      game.players[socket.id].name = nameValue;
    });
});

function tickServer() {
  var playerInfoPack = [];
  var bulletInfoPack = [];
  //Update game
  game.tick();
  /**** SEND DATA TO SOCKETS ****/
  //Add all the player data to the player info pack
  for(var i in game.players)
  {
      playerInfoPack.push(
        {
          xPos:game.players[i].xPos,
          yPos:game.players[i].yPos,
          color:game.players[i].color,
          score:game.players[i].score,
          radius:game.players[i].radius,
          id:game.players[i].id,
          bullets:game.players[i].bullets,
          health:game.players[i].health,
          isAlive:game.players[i].isAlive,
          name:game.players[i].name
        });
  }
  //Send game information to all sockets...
  for(var i in game.players)
  {
    try
    {
      game.sockets[i].emit('playerInfo', playerInfoPack); //Send the location of all players
      game.sockets[i].emit("selfInfo", game.players[i]); //Send each player the information about themselves
    }
    catch(e)
    {
      console.log(e);
    }
  }
}
