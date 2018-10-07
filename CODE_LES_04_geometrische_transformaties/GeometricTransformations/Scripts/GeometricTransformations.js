/**
 * GeometricTransformations.js
 *
 * @description Converts geometric transformation parameters into a matrix
 *
 * @author Frans Vander Meiren
 * @date   31/10/2015
 */
var GeometricTransformations = (function () {
  /**
   * constructor
   */
  var gt = function (tx, ty, angle, scale, order) {
    var x = tx;
    var y = ty;
    var a = angle / 180.0 * Math.PI;
    var s = scale;

    var m_t = new Matrix(3, 3);
    m_t.assign(
      1, 0, x,
      0, 1, y,
      0, 0, 1);

    var m_r = new Matrix(3, 3);
    m_r.assign(
      Math.cos(a), -Math.sin(a), 0,
      Math.sin(a), Math.cos(a), 0,
      0, 0, 1);

    var m_s = new Matrix(3, 3);
    m_s.assign(
      s, 0, 0,
      0, s, 0,
      0, 0, 1);

    switch (order) {
      case 'RST':
        this.matrix = (m_t.multiply(m_s)).multiply(m_r);
        break;
      case 'RTS':
        this.matrix = (m_s.multiply(m_t)).multiply(m_r);
        break;
      case 'SRT':
        this.matrix = (m_t.multiply(m_r)).multiply(m_s);
        break;
      case 'STR':
        this.matrix = (m_r.multiply(m_t)).multiply(m_s);
        break;
      case 'TRS':
        this.matrix = (m_s.multiply(m_r)).multiply(m_t);
        break;
      case 'TSR':
        this.matrix = (m_r.multiply(m_s)).multiply(m_t);
        break;
    }
  }

  return gt;
})();
