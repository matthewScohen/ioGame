var Player = require("./player.js");
var Bead = require("./bead.js");
var Map = require("./map.js");

class Game
{
  constructor()
  {
    this.sockets = [];
    this.players = [];
    this.beads = [];
    this.map = new Map();
    this.spawnBead(1000, 1000);
  }

  spawnBead(x, y)
  {
    var bead = new Bead(x, y)
    this.beads.push(bead);
    for(var i in this.sockets)
      this.sockets[i].emit("beadAdded", bead.serialize());
  }

  removeBead(bead)
  {
    for(var i in this.sockets)
      this.sockets[i].emit("beadRemoved", bead.serialize());
    for(var i in this.beads)
      if(this.beads[i] == bead)
      {
        this.beads.splice(i, 1);
        return;
      }
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
    if(this.players[socket.id].isAlive)
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
        //Check if the player is colliding with a bead
        for(var j in this.beads)
          if(this.beads[j].checkPlayerBeadCollision(this.players[i].xPos, this.players[i].yPos, this.players[i].radius))
          {
            this.players[i].score++;
            this.removeBead(this.beads[j]);
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
