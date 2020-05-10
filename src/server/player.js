function Player(id, xPos, yPos)
{
  this.speed = 8;
  this.radius = 20;
  this.xPos = xPos;
  this.yPos = yPos;
  this.cameraX = 0;
  this.cameraY = 0;
  this.id = id;
  this.pressingLeft = false;
  this.pressingRight = false;
  this.pressingUp = false;
  this.pressingDown = false;

  this.color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
  this.score = 0;
}

Player.prototype.tick = function()
{
  //Update position
  if(this.pressingLeft && this.xPos - this.radius >= 0)
  {
        if(this.xPos - this.radius - this.speed > 0)
          this.xPos -= this.speed;
        else
          this.xPos = this.radius;
  }
  if(this.pressingRight)
    this.xPos += this.speed;
  if(this.pressingUp && this.yPos - this.radius >= 0)
  {
    if(this.yPos - this.radius - this.speed > 0)
      this.yPos -= this.speed;
    else
      this.yPos = this.radius;
  }
  if(this.pressingDown)
    this.yPos += this.speed;

  //Update camera
  this.cameraX = this.xPos;
  this.cameraY = this.yPos;
}

module.exports = Player;
