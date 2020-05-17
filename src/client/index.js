//Play button
  //Hide by default
document.getElementById("playButton").hidden = true;
document.getElementById("playButton").onclick = function()
{
  socket.emit("respawn");
  document.getElementById("playButton").hidden = true;
}
