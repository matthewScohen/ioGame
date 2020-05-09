function Player(id, xPos, yPos)
{
  this.speed = 8;
  this.radius = 20;
  this.xPos = xPos;
  this.yPos = yPos;
  this.cameraX = xPos;
  this.cameraY = yPos;
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
    this.xPos -= this.speed;
  if(this.pressingRight)
    this.xPos += this.speed;
  if(this.pressingUp)
    this.yPos -= this.speed;
  if(this.pressingDown)
    this.yPos += this.speed;

  //Update camera
}

Player.prototype.serialize = function()
{

}
module.exports = Player;
