var socket = io();

socket.on('playerInfo', function(newPlayers){
  players = newPlayers;
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
