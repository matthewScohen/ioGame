var Wall = require("./../client/wall.js");
var Constants = require("./../client/constants.js");

class Map
{
  constructor()
  {
    this.MAP_WIDTH = Constants.MAP_WIDTH;
    this.MAP_HEIGHT = Constants.MAP_HEIGHT;
    this.walls = [];
    this.walls.push(new Wall(900, 900, 100, 200));
    //Boundary walls
    var boundaryThickness = 30;
    this.walls.push(new Wall(0, 0, boundaryThickness, this.MAP_HEIGHT));
    this.walls.push(new Wall(0, 0, this.MAP_WIDTH, boundaryThickness));
    this.walls.push(new Wall(this.MAP_WIDTH - boundaryThickness, 0, this.MAP_WIDTH, this.MAP_HEIGHT));
    this.walls.push(new Wall(0, this.MAP_HEIGHT - boundaryThickness, this.MAP_WIDTH, this.MAP_HEIGHT));
  }
}
module.exports = Map;
