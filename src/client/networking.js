var socket = io();

socket.on('playerInfo', function(newPlayers){
  players = newPlayers;
  console.log(newPlayers);
});

socket.on('beadPosition', function(newBeadData) {
  beadX = newBeadData[0];
  beadY = newBeadData[1];
});

socket.on("cameraInfo", function(cameraData)
{
  cameraX = cameraData[0];
  cameraY = cameraData[1];
});

socket.on("wallInfo", function(wallsData)
{
  walls = wallsData;
});
