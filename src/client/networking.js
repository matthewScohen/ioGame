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

socket.on("beadAdded", function(newBead)
{
  beads.push(newBead);
  console.log("added")
});

socket.on("beadRemoved", function(removedBead)
{
  for(var i in beads)
    if(beads[i].xPos == removedBead.xPos && beads[i].yPos == removedBead.yPos)
    {
      beads.splice(i, 1);
      return;
    }
});

socket.on("currentBeadState", function(newBeads)
{
  beads = newBeads;
  console.log(newBeads[0]);
});
