var startCaptureInput = function()
{
  //Create buttons
  respawnButton = new Button(canvas.width/2 - canvas.width/8, canvas.height/2 - canvas.height/16, canvas.width/4, canvas.height/8, "#8e9091", "#4a4c4d", "Respawn", function()
  {
    socket.emit("respawn");
    this.hide();
  });
  buttons.push(respawnButton);

  document.onkeydown = function(event)
  {
      if(event.keyCode === 68)    //d
          socket.emit('keyPress',{inputId:'right',state:true});
      else if(event.keyCode === 83)   //s
          socket.emit('keyPress',{inputId:'down',state:true});
      else if(event.keyCode === 65) //a
          socket.emit('keyPress',{inputId:'left',state:true});
      else if(event.keyCode === 87) // w
          socket.emit('keyPress',{inputId:'up',state:true});
  }
  document.onkeyup = function(event)
  {
      if(event.keyCode === 68)    //d
          socket.emit('keyPress',{inputId:'right',state:false});
      else if(event.keyCode === 83)   //s
          socket.emit('keyPress',{inputId:'down',state:false});
      else if(event.keyCode === 65) //a
          socket.emit('keyPress',{inputId:'left',state:false});
      else if(event.keyCode === 87) // w
          socket.emit('keyPress',{inputId:'up',state:false});
  }

  document.onmousedown = function(event)
  {
    var selfX = self.xPos - xOffset;
    var selfY = self.yPos - yOffset;
    if(xOffset > 0 && xOffset < MAP_WIDTH - window.innerWidth)
      selfX = window.innerWidth / 2;
    if(yOffset > 0 && yOffset < MAP_HEIGHT - window.innerHeight)
      selfY = window.innerHeight / 2;
    var relativeX = event.x - selfX;
    var relativeY = event.y - selfY;
    var direction = Math.atan2(relativeX, relativeY);
    socket.emit("mouseDown", {direction: direction});
    for(var i in buttons)
      if(buttons[i].contains(mouseX, mouseY))
        buttons[i].click();
  }
}
