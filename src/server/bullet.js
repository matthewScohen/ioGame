class Bullet
{
  constructor(xPos, yPos, speed, radius, direction)
  {
    this.color = "#5893F4"
    this.radius = radius;
    this.xPos = xPos;
    this.yPos = yPos;
    this.speed = speed;
    this.direction = direction;
    this.xVel = this.speed * Math.sin(direction);
    this.yVel = this.speed * Math.cos(direction);
  }

  tick()
  {
    this.xPos += this.xVel;
    this.yPos += this.yVel;
  }

  collidingWithCircle(circle)
  {
    if(circle != null)
    {
      var xDiff = this.xPos - circle.xPos;
      var yDiff = this.yPos - circle.yPos;
      var dist = Math.sqrt(xDiff*xDiff + yDiff*yDiff);
      if(dist < this.radius + circle.radius)
        return true;
      else
        return false;
    }
  }
}

module.exports = Bullet;
