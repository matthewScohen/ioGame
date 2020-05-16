//Play button
  //Hide by default
document.getElementById("playButton").style.display = "none";
document.getElementById("playButton").disabled = true;
document.getElementById("playButton").onclick = function()
{
  socket.emit("respawn");
  //Hide and disable the button
  document.getElementById("playButton").style.display = "none";
  document.getElementById("playButton").disabled = true;
}
