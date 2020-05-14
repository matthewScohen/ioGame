var Player = require("./player.js");
var Bead = require("./bead.js");
var Map = require("./map.js");

class Game
{
  constructor()
  {
    this.sockets = [];
    this.players = [];
    this.bead = new Bead(Math.floor(Math.random() * 690 + 10), Math.floor(Math.random() * 690 + 10));
    this.map = new Map();
  }

  addPlayer(socket)
  {
    this.sockets[socket.id] = socket;
    this.players[socket.id] = new Player(socket.id, 500, 500);
    console.log("User connected:" + socket.id);
  }

  removePlayer(socket)
  {
    delete this.sockets[socket.id];
    delete this.players[socket.id];
    console.log("User disconnected:" + socket.id);
  }

  handleKeyInput(socket, inputData)
  {
    if(inputData.inputId == 'left')
        this.players[socket.id].pressingLeft = inputData.state;
    else if(inputData.inputId == 'right')
        this.players[socket.id].pressingRight = inputData.state;
    else if(inputData.inputId == 'up')
        this.players[socket.id].pressingUp = inputData.state;
    else if(inputData.inputId == 'down')
        this.players[socket.id].pressingDown = inputData.state;
  }

  handleMouseInput(socket, inputData)
  {
    this.players[socket.id].shoot(inputData.direction);
  }

  tick()
  {
    //Update all the bullets
    for(var i in this.players)
      for(var j in this.players[i].bullets)
      {
        this.players[i].bullets[j].tick();
        //If bullet is out of bounds remove it
        if(this.players[i].bullets[j].xPos < 0 || this.players[i].bullets[j].xPos > this.map.MAP_WIDTH ||
            this.players[i].bullets[j].yPos < 0 || this.players[i].bullets[j].yPos > this.map.MAP_HEIGHT)
        {
          delete this.players[i].bullets[j];
          this.players[i].bullets.splice(j, 1);
        }
      }

    //For all players...
    for(var i in this.players)
    {
      console.log(this.players[i].bullets);
      //Update the players position
      this.players[i].tick(this.map.MAP_WIDTH, this.map.MAP_HEIGHT, this.map.walls);
      //Check if the player is colliding with the bead
      if(this.bead.checkPlayerBeadCollision(this.players[i].xPos, this.players[i].yPos, this.players[i].radius))
      {
        this.players[i].score++;
        this.bead.xPos = Math.floor(Math.random() * 690 + 10);
        this.bead.yPos = Math.floor(Math.random() * 690 + 10);
      }
    }
  }
}

module.exports = Game;
