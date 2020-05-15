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

  disconnectPlayer(socket)
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

  respawnPlayer(socket)
  {
    this.players[socket.id].respawn();
  }

  tick()
  {
    /*** If the bullet is removed return out of the loop to avoid checking for collisions with a null bullet ***/
    //Update all the bullets
    for(var i in this.players)
      for(var j in this.players[i].bullets)
      {
        //Tick the bullet
        this.players[i].bullets[j].tick();
        //If bullet is out of bounds remove it
        if(this.players[i].bullets[j].xPos < 0 || this.players[i].bullets[j].xPos > this.map.MAP_WIDTH ||
            this.players[i].bullets[j].yPos < 0 || this.players[i].bullets[j].yPos > this.map.MAP_HEIGHT)
        {
            this.players[i].killBullet(j);
            return;
        }
        //If the bullet is in a wall remove it
        for(var k in this.map.walls)
          if(this.map.walls[k].collidingWithCircle(this.players[i].bullets[j]))
          {
            this.players[i].killBullet(j);
            return;
          }
        for(var k in this.players)
        {
          if(this.players[k].isAlive) //Only check for collisions with alive players
            //If the bullet is colliding with a player damage the player and remove it
            if(this.players[i].bullets[j].collidingWithCircle(this.players[k]))
            {
              this.players[k].takeDamage(10);//Damage the player (k) who was hit
              this.players[i].killBullet(j);//Remove the bullet from the player (i) who the bullet belongs to
              return;
            }
        }

      }
    //For all players...
    for(var i in this.players)
    {
      if(this.players[i].isAlive) //Only update players that are alive
      {
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
    //Remove dead players
    for(var i in this.players)
      if(this.players[i].health <= 0)
        this.players[i].kill();
  }
}

module.exports = Game;
