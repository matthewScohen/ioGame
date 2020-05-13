function Player(id, xPos, yPos)
{
  this.id = id;
  this.color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
  this.score = 0;
  this.cameraX = 0;
  this.cameraY = 0;
  //Movement properties
  this.xVel = 0;
  this.yVel = 0;
  this.maxSpeed = 5;
  this.acceleration = this.maxSpeed / 5;
  this.radius = 20;
  this.xPos = xPos;
  this.yPos = yPos;
  this.pressingLeft = false;
  this.pressingRight = false;
  this.pressingUp = false;
  this.pressingDown = false;
  //Combat properties
  this.bullets = [];
  this.health = 100;
  this.bulletCount = 10;
}

Player.prototype.tick = function(mapWidth, mapHeight, walls)
{
  /**** HORIZONTAL MOVEMENT ****/
  if(!this.pressingLeft && !this.pressingRight) //Allows the player to stop instantly instead of sliding
    this.xVel = 0;
  //Handle left input
  if(this.pressingLeft && this.xPos - this.radius >= 0 && !this.pressingRight) ///If on the map, pressing left, and not pressing right
  {
      if(!(this.xVel <= -this.maxSpeed))//If not at the max speed
        this.xVel -= this.acceleration;//Update velocity
      this.xVel = Math.max(this.xVel, -this.maxSpeed);
  }
  //Handle right input
  if(this.pressingRight && this.xPos + this.radius < mapWidth && !this.pressingLeft) //If on the map, pressing right, and not pressing left
  {
    if(!(this.xVel >= this.maxSpeed)) //If not at the max speed
      this.xVel += this.acceleration;//Update velocity
    this.xVel = Math.min(this.xVel, this.maxSpeed);
  }
  //Update x position
  if(this.xPos - this.radius + this.xVel > 0 && this.xPos + this.radius + this.xVel <= mapWidth) //If in the middle of the map
    this.xPos += this.xVel;//Update position
  else if(!(this.xPos - this.radius + this.xVel > 0)) //If adding the velocity would move the player off the left side of the map
  {
      this.xPos = this.radius;
      this.xVel = 0; //Make velocity 0 because player hit the wall
  }
  else if(!(this.xPos + this.radius + this.xVel < mapWidth)) //If adding the velocity would move the player off the right side of the map
  {
    this.xPos = mapWidth - this.radius;
    this.xVel = 0; //Make velocity 0 because player hit the wall
  }
  /**** VERTICLE MOVEMENT ****/
  if(!this.pressingUp && !this.pressingDown) //If the player is not pressing up or down stop their verticle movement
    this.yVel = 0;
  //Handle up input
  if(this.pressingUp && this.yPos - this.radius >= 0 && !this.pressingDown) //If on the map, pressing up, and not pressing down
  {
    if(!(this.yVel <= -this.maxSpeed)) //If not at the max speed
      this.yVel -= this.acceleration;//Update velocity
    this.yVel = Math.max(this.yVel, -this.maxSpeed);
  }
  //Handle down input
  if(this.pressingDown && this.yPos + this.radius <= mapHeight && !this.pressingUp) //If pressing down, on the map, and not pressing up
  {
    if(!(this.yVel >= this.maxSpeed)) //If not at the max speed
      this.yVel += this.acceleration; //Update velocity
    this.yVel = Math.min(this.yVel, this.maxSpeed);
  }
  //Update y position
  if(this.yPos - this.radius + this.yVel >= 0 && this.yPos + this.radius + this.yVel <= mapHeight) //If in the middle of the map
    this.yPos += this.yVel; //Update position
  else if(!(this.yPos - this.radius + this.yVel >= 0)) //If adding the yVel would move the player off the top of the map
  {
    this.yPos = this.radius;
    this.yVel = 0; //Make the velocity 0 because the player hit the wall
  }
  else if(!(this.yPos + this.radius + this.yVel <= mapHeight)) //If addding the yVel would move the player off the bottom of the map
  {
    this.yPos = mapHeight - this.radius;
    this.yVel = 0;
  }
  //Check if the player is colliding with a wall
  for(var j in walls)
  {
    if(walls[j].collidingWithPlayer(this)) //If the player is colliding with a wall
    {
      var pointX = this.xPos;
      var pointY = this.yPos;

      if(this.xPos < walls[j].xPos) //If the player is on the left side of the wall
        pointX = walls[j].xPos - this.radius;
      if(this.xPos > walls[j].xPos +walls[j].width) //If the player is on the right side of the wall
        pointX = walls[j].xPos + walls[j].width + this.radius;
      if(this.yPos < walls[j].yPos) //If the player is on the top side of the wall
        pointY = walls[j].yPos - this.radius;
      if(this.yPos > walls[j].yPos + walls[j].height) //If the player is on the bottom side of the wall
        pointY = walls[j].yPos + walls[j].height + this.radius;

      //Place the player outside the wall
      this.setPosition(pointX, pointY);
    }
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

Player.prototype.shoot = function(direction)
{
  
}


module.exports = Player;
