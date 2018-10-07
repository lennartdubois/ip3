/**
 * Grid.js
 *
 * @description Module for drawing a grid
 *
 * @author Frans Vander Meiren
 * @date   11/11/2015
 */
var Grid = (function () {
  /**
   * Grid globals
   */
  var _cellSize,       // grid cell size
      _microcellSize,  // size of a subdivided cell 
      _subdivisions,   // number of subdivisions of a cell
      _x0, _y0,        // coordinate shift
      _canvas,         // canvas control for the grid
      _ctx,            // canvas context
      _left, _right, _top, _bottom, // shifted canvas dimensions 
      _leftRounded, _rightRounded, _topRounded, _bottomRounded; // shifted grid dimensions

  /**
   * initialize()
   * 
   * @description Setup grid environment, calculates the dimensions and additional stuff
   * @param {control} canvas - canvas control for image
   * @param {int} x0 - x-origin
   * @param {int} y0 - y-origin
   * @param {int} cellSize - size of the grid cell in pixels (e.g. 100)
   * @param {int} subdivisons - number of subdivisions (e.g. 10)
   */
  function initialize(canvas, x0, y0, cellSize, subdivisions) {
    _x0 = x0;
    _y0 = y0;
    _canvas = canvas;
    _ctx = canvas.getContext('2d');
    _cellSize = cellSize;
    _microcellSize = cellSize / subdivisions;

    // canvas dimensions related to the (x0, y0) origin
    _left = -x0;
    _right = canvas.width - x0;
    _top = -y0;
    _bottom = canvas.height - y0;

    // canvas grid dimensions related to the (x0, y0) origin
    _leftRounded = -(Math.floor(-_left / _microcellSize)) * _microcellSize;
    _rightRounded = (Math.floor(_right / _microcellSize)) * _microcellSize;
    _topRounded = -(Math.floor(-_top / _microcellSize)) * _microcellSize;
    _bottomRounded = (Math.round(_bottom / _microcellSize)) * _microcellSize;
  }

  /**
   * draw()
   * 
   * @description Draw the grid
   */
  function draw() {
    // reset coordinate system
    _ctx.setTransform(1, 0, 0, 1, _x0, _y0);

    // horizontal grid lines
    for (var y = _topRounded; y <= _bottom; y += _microcellSize) {
      // main divisions have another width
      if ((y % (_cellSize)) === 0)
        _ctx.lineWidth = 0.2;
      else
        _ctx.lineWidth = 0.1;

      // X-axis has another colour 
      if (y === 0)
        _ctx.strokeStyle = "blue";
      else
        _ctx.strokeStyle = "gray";

      // do drawing
      _ctx.beginPath();
      _ctx.moveTo(_left, y);
      _ctx.lineTo(_right, y);
      _ctx.closePath();
      _ctx.stroke();
    }

    // vertical grid lines
    for (var x = _leftRounded; x <= _right; x += _microcellSize) {
      // main divisions have another width
      if ((x % (_cellSize)) === 0)
        _ctx.lineWidth = 0.2;
      else
        _ctx.lineWidth = 0.1;

      // Y-axis has another colour 
      if (x === 0)
        _ctx.strokeStyle = "blue";
      else
        _ctx.strokeStyle = "gray";

      // do drawing
      _ctx.beginPath();
      _ctx.moveTo(x, _top);
      _ctx.lineTo(x, _bottom);
      _ctx.closePath();
      _ctx.stroke();
    }
  }

  return {
    initialize: initialize,
    draw: draw
  }
})();