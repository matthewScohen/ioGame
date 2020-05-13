const FPS = 60;
const MAP_WIDTH = 2000;
const MAP_HEIGHT = 2000;
const WALL_LEFT = 0;
const WALL_TOP = 1;
const WALL_RIGHT = 2;
const WALL_BOTTOM = 3;

try
{
  module.exports.MAP_WIDTH = MAP_WIDTH;
  module.exports.MAP_HEIGHT = MAP_HEIGHT;
} catch (e)
{
  //No error here because the server uses the modules. This prevents the browser console from showing an error since it does not use this code
}
