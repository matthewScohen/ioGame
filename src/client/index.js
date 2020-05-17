var hidePlayMenu = function()
{
  document.getElementById("play-menu-container").hidden = true;
}

var showPlayMenu = function()
{
  document.getElementById("play-menu-container").hidden = false;
}

var playMenuHidden = function()
{
  return document.getElementById("play-menu-container").hidden;
}

hidePlayMenu();
document.getElementById("playButton").onclick = function()
{
  var playerName = document.getElementById("nameInput").value;
  socket.emit("respawn", playerName);
  hidePlayMenu();
}
