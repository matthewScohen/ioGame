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

  handleInput(socket, inputData)
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

  tick()
  {
    //For all players...
    for(var i in this.players)
    {
      //Update the players position
      this.players[i].tick(this.map.MAP_WIDTH, this.map.MAP_HEIGHT);
      //Check if the player is colliding with the bead
      if(this.bead.checkPlayerBeadCollision(this.players[i].xPos, this.players[i].yPos, this.players[i].radius))
      {
        this.players[i].score++;
        this.bead.xPos = Math.floor(Math.random() * 690 + 10);
        this.bead.yPos = Math.floor(Math.random() * 690 + 10);
      }
      //Check if the player is colliding with a wall
      for(var j in this.map.walls)
      {
        if(this.map.walls[j].collidingWithPlayer(this.players[i])) //If the player is colliding with a wall
        {
          var pointX = this.players[i].xPos;
          var pointY = this.players[i].yPos;

          if(this.players[i].xPos < this.map.walls[j].xPos) //If the player is on the left side of the wall
            pointX = this.map.walls[j].xPos - this.players[i].radius;
          if(this.players[i].xPos > this.map.walls[j].xPos + this.map.walls[j].width) //If the player is on the right side of the wall
            pointX = this.map.walls[j].xPos + this.map.walls[j].width + this.players[i].radius;
          if(this.players[i].yPos < this.map.walls[j].yPos) //If the player is on the top side of the wall
            pointY = this.map.walls[j].yPos - this.players[i].radius;
          if(this.players[i].yPos > this.map.walls[j].yPos + this.map.walls[j].height) //If the player is on the bottom side of the wall
            pointY = this.map.walls[j].yPos + this.map.walls[j].height + this.players[i].radius;

          //Place the player outside the wall
          this.players[i].setPosition(pointX, pointY);
        }
      }
    }
  }
}

module.exports = Game;
