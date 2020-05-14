class Bullet
{
  constructor(xPos, yPos, speed, direction)
  {
    this.radius = 5;
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

module.exports = Bullet;
