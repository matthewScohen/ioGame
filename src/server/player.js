var Bullet = require("./bullet.js");
function Player(id, xPos, yPos)
{
  //General Properties
  this.id = id;
  this.name = "";
  this.isAlive = true;
  //this.color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
  this.color = "#5893F4";
  this.score = 0;
  //Input properties
  this.pressingLeft = false;
  this.pressingRight = false;
  this.pressingUp = false;
  this.pressingDown = false;
  this.mouseDown = false;
  //Movement properties
  this.xVel = 0;
  this.yVel = 0;
  this.maxSpeed = 5;
  this.acceleration = 0.5;
  this.radius = 40;
  this.xPos = xPos;
  this.yPos = yPos;
  //View properties
  this.cameraX = 0;
  this.cameraY = 0;
  //Combat properties
  this.bullets = [];
  this.health = 10;
  this.bulletCount = 10;
  this.fireDelay = 40;
  this.fireRate = 2;
  this.fireCooldown = 0;
}

Player.prototype.tick = function(mapWidth, mapHeight, walls)
{
  /**** HORIZONTAL MOVEMENT ****/
  if(!this.pressingLeft && !this.pressingRight) //Slow the player if they aren't pressing buttons
    if(this.xVel < 1 && this.xVel > -1)
      this.xVel = 0;
    else if(this.xVel > 0)
      this.xVel -= this.acceleration;
    else if(this.xVel < 0)
      this.xVel += this.acceleration;
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
  //Slow to stop
    if(this.yVel < 1 && this.yVel > -1)
      this.yVel = 0;
    else if(this.yVel > 0)
      this.yVel -= this.acceleration;
    else if(this.yVel < 0)
      this.yVel += this.acceleration;
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
    if(walls[j].collidingWithCircle(this)) //If the player is colliding with a wall
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
  //Update shooting delay
  if(this.fireCooldown > 0)
    this.fireCooldown -= this.fireRate;
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
  if(this.fireCooldown <= 0)
  {
    var bulletRadius = 15;
    var bulletX = this.xPos + 1.1 * (this.radius + bulletRadius) * Math.sin(direction);
    var bulletY = this.yPos + 1.1 * (this.radius + bulletRadius) * Math.cos(direction);
    var bulletSpeed = 15;
    this.fireCooldown = this.fireDelay;
    this.bullets.push(new Bullet(bulletX, bulletY, bulletSpeed, bulletRadius, direction));
  }
}

Player.prototype.takeDamage = function(damageAmount)
{
  this.health -= damageAmount;
}

Player.prototype.killBullet = function(bulletIndex)
{
  delete this.bullets[bulletIndex];
  this.bullets.splice(bulletIndex, 1);
}

Player.prototype.kill = function()
{
  this.isAlive = false;
  this.xPos = -100;
  this.yPos = -100;
}

Player.prototype.respawn = function()
{
  this.isAlive = true;
  this.setPosition(500, 500);
}
module.exports = Player;
