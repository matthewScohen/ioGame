var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.font = '20px Arial';
ctx.textAlign="center";
ctx.textBaseline="middle";

var renderPlayers = function (players)
{
  for(var i = 0 ; i < players.length; i++)
  {
    ctx.fillStyle = players[i].playerColor;
    ctx.beginPath();
    ctx.arc(players[i].playerX,players[i].playerY, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "black";
    ctx.fillText(players[i].playerScore, players[i].playerX, players[i].playerY);
  }
}

var renderBeads = function (beadX, beadY)
{
  ctx.fillStyle = "blue";
  ctx.beginPath();
  ctx.arc(beadX , beadY, 10, 0, Math.PI * 2);
  ctx.fill();
}

var renderGameBoard = function(players, beadX, beadY)
{
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  renderPlayers(players);
  renderBeads(beadX, beadY);
}
