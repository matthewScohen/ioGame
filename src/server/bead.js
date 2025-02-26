function Bead(xPos, yPos) {
  this.xPos = xPos;
  this.yPos = yPos;
  this.size = 5;
  this.color = "blue";
}

Bead.prototype.checkPlayerBeadCollision = function(playerX, playerY, playerSize)
{
  var distance = Math.sqrt(Math.pow((this.xPos - playerX), 2) + Math.pow((this.yPos - playerY), 2));
  if(distance < this.size + playerSize)
    return true;
  else
    return false;
}

Bead.prototype.serialize = function()
{
  var serial =
  {
    xPos:this.xPos,
    yPos:this.yPos,
    size:this.size,
    color:this.color
  };
  return serial;
}

module.exports = Bead;
