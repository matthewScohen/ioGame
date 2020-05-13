class Bulllet
{
  constructor(xPos, yPos, xVel, yVel)
  {
    this.radius = 5;
    this.xPos = xPos;
    this.yPos = yPos;
    this.xVel = xVel;
    this.yVel = yVel;
  }

  tick()
  {
    this.xPos += this.xVel;
    this.yPos += this.yVel;
  }

  collidingWithPlayer(player)
  {
    var xDiff = this.xPos - player.xPos;
    var yDiff = this.yPos - player.yPos;
    var dist = Math.sqrt(xDiff*xDiff + yDiff*yDiff);
    if(dist < this.radius + player.radius)
      return true;
    else
      return false;
  }
}
