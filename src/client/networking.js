var socket = io();

socket.on('playerInfo', function(newPlayers){
  players = newPlayers;
});

socket.on('beadPosition', function(newBeadData) {
  beadX = newBeadData[0];
  beadY = newBeadData[1];
});

socket.on("cameraInfo", function(cameraData)
{
  cameraX = cameraData.cameraX;
  cameraY = cameraData.cameraY;
});

socket.on("wallInfo", function(wallsData)
{
  walls = wallsData;
});

socket.on("selfId", function(selfIdData)
{
  selfId = selfIdData;
})
