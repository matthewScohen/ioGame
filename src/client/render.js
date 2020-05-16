var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext("2d");
ctx.font = '20px Arial';
ctx.textAlign="center";
ctx.textBaseline="middle";

var renderPlayers = function (players, xOffset, yOffset)
{
    for(var i in players)
    {
      if(players[i].isAlive && players[i].health > 0)
      {
        if(players[i].id != self.id) //Dont render self
        {
          ctx.fillStyle = players[i].color;
          ctx.font = (players[i].radius/1.5).toString() + "px Arial";
          ctx.beginPath();
          ctx.arc(players[i].xPos - xOffset, players[i].yPos - yOffset, players[i].radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "black";
          ctx.fillText(players[i].health, players[i].xPos - xOffset, players[i].yPos - yOffset);
        }
        //If the self.camera is not in a corner then the player should be rendered in the center of the screen because otherwise due to rounding errors
        //the player will jitter around.
        else
        {

          var selfX = players[i].xPos - xOffset;
          var selfY = players[i].yPos - yOffset;
          if(xOffset > 0 && xOffset < MAP_WIDTH - window.innerWidth)
            selfX = window.innerWidth / 2;
          if(yOffset > 0 && yOffset < MAP_HEIGHT - window.innerHeight)
            selfY = window.innerHeight / 2;
          ctx.fillStyle = players[i].color;
          ctx.beginPath();
          ctx.arc(selfX, selfY, players[i].radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "black";
          ctx.fillText(players[i].health, selfX, selfY);
        }
      }
    }

}

var renderBeads = function (beadX, beadY, xOffset, yOffset)
{
  ctx.fillStyle = "blue";
  ctx.beginPath();
  ctx.arc(beadX - xOffset, beadY - yOffset, 10, 0, Math.PI * 2);
  ctx.fill();
}

var renderBullets = function(bullets, xOffset, yOffset)
{
  for(var i in bullets)
  {
    ctx.fillStyle = bullets[i].color;
    ctx.beginPath();
    ctx.arc(bullets[i].xPos - xOffset, bullets[i].yPos - yOffset, bullets[i].radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

var renderWalls = function(walls, xOffset, yOffset)
{
  ctx.fillStyle = "black";
  for(var i in walls)
    ctx.fillRect(walls[i].xPos - xOffset, walls[i].yPos - yOffset, walls[i].width, walls[i].height);
}

var renderRespawnScreen = function()
{
  ctx.globalAlpha = 0.8;
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalAlpha = 1;
}

var renderGameBoard = function()
{
  if(self != null) //Do not render until information has been sent from the server at least once
  {
    //Draw background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#BAB7B6";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //Make sure self.camera is within boundaries
    if(self.cameraX < MAP_WIDTH / 2)
      xOffset = Math.max(self.cameraX - window.innerWidth / 2, 0);
    if(self.cameraX > MAP_WIDTH / 2)
      xOffset = Math.min(self.cameraX - window.innerWidth / 2, MAP_WIDTH - window.innerWidth);
    if(self.cameraY < MAP_HEIGHT / 2)
      yOffset = Math.max(self.cameraY - window.innerHeight / 2, 0);
    if(self.cameraY > MAP_HEIGHT / 2)
      yOffset = Math.min(self.cameraY - window.innerHeight / 2, MAP_HEIGHT - window.innerHeight);
    //Render game
    renderPlayers(players, xOffset, yOffset);
    renderBeads(beadX, beadY, xOffset, yOffset);
    renderWalls(walls, xOffset, yOffset);
    for(var i in players)
      renderBullets(players[i].bullets, xOffset, yOffset);
    //Play menu
    if(self.isAlive == false)
    {
      renderRespawnScreen();
      //Show the play button if it is hidden
      if(document.getElementById("playButton").disabled == true)
      {
        document.getElementById("playButton").style.display = "inline-block";
        document.getElementById("playButton").disabled = false;
      }
    }
    if(self.isAlive == true)
    {
      //Hide the play button if it is shown
      if(document.getElementById("playButton").disabled == false)
      {
        document.getElementById("playButton").style.display = "none";
        document.getElementById("playButton").disabled = true;
      }
    }
  }
}

var startRendering = function()
{
  renderLoop = setInterval(renderGameBoard, 1000/FPS);
}

var stopRendering = function()
{
  clearInterval(renderLoop);
}
