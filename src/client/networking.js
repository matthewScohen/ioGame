var socket = io();

socket.on('playerInfo', function(newPlayers){
  players = newPlayers;
  renderGameBoard(players, beadX, beadY);
});

socket.on('beadPosition', function(newBeadData) {
  beadX = newBeadData[0];
  beadY = newBeadData[1];
  renderGameBoard(players, beadX, beadY);
});
