class Wall
{
  constructor(xPos, yPos, width, height)
  {
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = width;
    this.height = height;
  }

  collidingWithCircle(circle) // https://yal.cc/rectangle-circle-intersection-test/
  {
    if(circle != null) //Make sure the circle hasn't been deleted, eg. a bullet has been removed already
    {
      var pointX = circle.xPos;
      var pointY = circle.yPos;

      if(circle.xPos < this.xPos) //Check left edge
        pointX = this.xPos;
      else if(circle.xPos > this.xPos + this.width) //Check right edge
        pointX = this.xPos + this.width;
      if(circle.yPos < this.yPos) //Check top edge
        pointY = this.yPos;
      else if(circle.yPos > this.yPos + this.height) //Check bottom edge
        pointY = this.yPos + this.height;

      var xDiff = circle.xPos - pointX;
      var yDiff = circle.yPos - pointY;

      var distance = Math.sqrt(xDiff*xDiff + yDiff*yDiff);

      if(distance < circle.radius)
        return true;
      else
        return false;
    }
  }
}

module.exports = Wall;
