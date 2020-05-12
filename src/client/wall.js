class Wall
{
  constructor(xPos, yPos, width, height)
  {
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = width;
    this.height = height;
  }

  collidingWithPlayer(player) // https://yal.cc/rectangle-circle-intersection-test/
  {
    var pointX = player.xPos;
    var pointY = player.yPos;

    if(player.xPos < this.xPos) //Check left edge
      pointX = this.xPos;
    else if(player.xPos > this.xPos + this.width) //Check right edge
      pointX = this.xPos + this.width;
    if(player.yPos < this.yPos) //Check top edge
      pointY = this.yPos;
    else if(player.yPos > this.yPos + this.height) //Check bottom edge
      pointY = this.yPos + this.height;

    var xDiff = player.xPos - pointX;
    var yDiff = player.yPos - pointY;

    var distance = Math.sqrt(xDiff*xDiff + yDiff*yDiff);

    if(distance < player.radius)
      return true;
    else
      return false;
  }
}

module.exports = Wall;
