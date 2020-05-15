class Button
{
  constructor(xPos, yPos, width, height, color, hoverColor, text, click)
  {
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = width;
    this.height = height;
    this.color = color;
    this.hoverColor = hoverColor;
    this.text = text;
    this.onClick = click;
    this.isVisible = true;
  }

  contains(x, y)
  {
    if(x > this.xPos && x < this.xPos + this.width && y > this.yPos && y < this.yPos + this.height)
      return true;
    else
      return false;
  }

  render(ctx)
  {
    if(this.isVisible)
    {
      if(this.contains(mouseX, mouseY))
        ctx.fillStyle = this.hoverColor;
      else
        ctx.fillStyle = this.color;
      ctx.fillRect(this.xPos, this.yPos, this.width, this.height);

      //Render text
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.font = (this.height/2).toString() + "px Arial";
      ctx.fillText(this.text, this.xPos + this.width/2, this.yPos + this.height/2);
    }
  }

  hide()
  {
    this.isVisible = false;
  }

  show()
  {
    this.isVisible = true;
  }

  click()
  {
    if(this.isVisible)
      this.onClick();
  }
}
