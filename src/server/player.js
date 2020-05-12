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

Player.prototype.tick = function(mapWidth, mapHeight)
{
  //Handle left input
  if(this.pressingLeft && this.xPos - this.radius >= 0)
  {
        if(this.xPos - this.radius - this.speed > 0)
          this.xPos -= this.speed;
        else
          this.xPos = this.radius;
  }
  //Handle right input
  if(this.pressingRight && this.xPos + this.radius <= mapWidth)
  {
    if(this.xPos + this.radius + this.speed <= mapWidth)
      this.xPos += this.speed;
    else
      this.xPos = mapWidth - this.radius;
  }
  //Handle up input
  if(this.pressingUp && this.yPos - this.radius >= 0)
  {
    if(this.yPos - this.radius - this.speed > 0)
      this.yPos -= this.speed;
    else
      this.yPos = this.radius;
  }
  //Handle down input
  if(this.pressingDown && this.yPos + this.radius <= mapHeight)
  {
    if(this.yPos + this.radius + this.speed < mapHeight)
      this.yPos += this.speed;
    else
      this.yPos = mapHeight - this.radius;
  }
  //Update camera
  this.centerCamera();
}

Player.prototype.setPosition = function(x, y)
{
  this.xPos = x;
  this.yPos = y;
  this.centerCamera();
}

Player.prototype.centerCamera = function()
{
  this.cameraX = this.xPos;
  this.cameraY = this.yPos;
}



module.exports = Player;
