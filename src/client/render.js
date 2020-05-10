var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext("2d");
ctx.font = '20px Arial';
ctx.textAlign="center";
ctx.textBaseline="middle";

var renderPlayers = function (players, xOffset, yOffset)
{
  for(var i = 0 ; i < players.length; i++)
  {
    ctx.fillStyle = players[i].color;
    ctx.beginPath();
    ctx.arc(players[i].xPos - xOffset, players[i].yPos - yOffset, players[i].radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "black";
    ctx.fillText(players[i].score, players[i].xPos - xOffset, players[i].yPos - yOffset);
  }
}

var renderBeads = function (beadX, beadY, xOffset, yOffset)
{
  ctx.fillStyle = "blue";
  ctx.beginPath();
  ctx.arc(beadX - xOffset, beadY - yOffset, 10, 0, Math.PI * 2);
  ctx.fill();
}

var renderWalls = function(walls, xOffset, yOffset)
{
  ctx.fillStyle = "black";
  for(var i in walls)
    ctx.fillRect(walls[i].xPos - xOffset, walls[i].yPos - yOffset, walls[i].width, walls[i].height);
}

var renderGameBoard = function()
{
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //Make sure camera is within boundaries
  xOffset = Math.max(cameraX - window.innerWidth / 2, 0);
  yOffset = Math.max(cameraY - window.innerHeight / 2, 0);
  renderPlayers(players, xOffset, yOffset);
  renderBeads(beadX, beadY, xOffset, yOffset);
  renderWalls(walls, xOffset, yOffset);
  console.log(cameraX + " " + cameraY);
}

var startRendering = function()
{
  renderLoop = setInterval(renderGameBoard, 1000/FPS);
}

var stopRendering = function()
{
  clearInterval(renderLoop);
}
