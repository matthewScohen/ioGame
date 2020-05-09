var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext("2d");
ctx.font = '20px Arial';
ctx.textAlign="center";
ctx.textBaseline="middle";

var renderPlayers = function (players)
{
  for(var i = 0 ; i < players.length; i++)
  {
    ctx.fillStyle = players[i].color;
    ctx.beginPath();
    ctx.arc(players[i].xPos ,players[i].yPos , players[i].radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "black";
    ctx.fillText(players[i].score, players[i].xPos, players[i].yPos);
  }
}

var renderBeads = function (beadX, beadY)
{
  ctx.fillStyle = "blue";
  ctx.beginPath();
  ctx.arc(beadX, beadY, 10, 0, Math.PI * 2);
  ctx.fill();
}

var renderWalls = function(walls)
{
  ctx.fillStyle = "black";
  for(var i in walls)
    ctx.fillRect(walls[i].xPos, walls[i].yPos, walls[i].width, walls[i].height);

}

var renderGameBoard = function()
{
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  renderPlayers(players);
  renderBeads(beadX, beadY);
  renderWalls(walls);
}

var startRendering = function()
{
  renderLoop = setInterval(renderGameBoard, 1000/FPS);
}

var stopRendering = function()
{
  clearInterval(renderLoop);
}
