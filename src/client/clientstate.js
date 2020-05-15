var beadX = 0;
var beadY = 0;
var players = [];
var walls = [];
var selfId = 0;
var self = null;
var mouseX = 0;
var mouseY = 0;
var buttons = [];
window.addEventListener("mousemove", function(event)
{
  mouseX = event.x;
  mouseY = event.y;
});
