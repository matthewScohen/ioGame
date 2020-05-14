var socket = io();

socket.on('playerInfo', function(newPlayers){
  players = newPlayers;
  for(var i in players)
    console.log(players[i].bullets);
});

socket.on('beadPosition', function(newBeadData) {
  beadX = newBeadData[0];
  beadY = newBeadData[1];
});

socket.on("selfInfo", function(selfData)
{
  self = selfData;
});

socket.on("wallInfo", function(wallsData)
{
  walls = wallsData;
});
