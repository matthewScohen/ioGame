var Wall = require("./../client/wall.js");

const MAP_WIDTH = 2000;
const MAP_HEIGHT = 2000;

class Map
{
  constructor()
  {
    this.walls = [];
    this.walls.push(new Wall(0, 0, 100, 200));
  }
}
module.exports = Map;
