var Wall = require("./../client/wall.js");
var Constants = require("./../client/constants.js");

class Map
{
  constructor()
  {
    this.MAP_WIDTH = Constants.MAP_WIDTH;
    this.MAP_HEIGHT = Constants.MAP_HEIGHT;
    this.walls = [];
    this.walls.push(new Wall(0, 0, 100, 200));
  }
}
module.exports = Map;
