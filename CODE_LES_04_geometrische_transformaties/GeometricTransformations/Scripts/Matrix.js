/**
 * Matrix.js
 *
 * @description Module for matrix calculations
 *
 * @author Frans Vander Meiren
 * @date   27/10/2015
 */
var Matrix = (function () {
  /**
   * constructor
   */
  var mat = function (rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.a = new Array(rows);

    for (var j = 0; j < rows; j++) {
      this.a[j] = new Array(cols);
      for (var i = 0; i < cols; i++)
        this.a[j][i] = 0.0;
    }
  }

  /**
   * public methods (shared across instances)
   */
  mat.prototype = {
    assign: function () {
      if (arguments.length === 0)
        throw "Invalid assignment";

      var k = 0;
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
          if (typeof arguments[k] === "number")
            this.a[i][j] = arguments[k++];
          else
            this.a[i][j] = 0;
        }
      }
    },

    multiply: function (m2) {
      if (!(m2 instanceof Matrix))
        throw "This is not a Matrix object";

      var rows1 = this.rows,
          cols1 = this.cols,
          rows2 = m2.rows,
          cols2 = m2.cols;

      if (cols1 !== rows2)
        throw "Invalid matrix multiplification (nCols m1 is different from nRows m2)";

      var result = new Matrix(rows1, cols2);

      for (var i = 0; i < rows1; i++) {
        for (var j = 0; j < cols2; j++) {
          var sum = 0;
          for (var k = 0; k < cols1; k++) {
            sum += this.a[i][k] * m2.a[k][j];
          }
          result.a[i][j] = sum;
        }
      }

      return result;
    },

    add: function (m2) {
      if (!(m2 instanceof Matrix))
        throw "This is not a Matrix object";

      var rows1 = this.rows,
          cols1 = this.cols,
          rows2 = m2.rows,
          cols2 = m2.cols;

      if (cols1 !== cols2 || rows1 !== rows2)
        throw "Can't add matrices (matrices have different dimensions)";

      for (var j = 0; j < rows1; j++) {
        for (var i = 0; i < cols1; i++) {
          result.a[i][j] = this.a[i][j] * m2.a[i][j];
        }
      }

      return result;
    },

    toString: function () {
      var s = "";
      for (var j = 0; j < this.rows; j++) {
        s += "[ ";
        for (var i = 0; i < this.cols; i++)
          s += (this.a[j][i]).toFixed(3) + " ";
        s += "]\n";
      }
      return s;
    },

    toHTML: function () {
      var s = "";
      for (var j = 0; j < this.rows; j++) {
        s += "[";
        for (var i = 0; i < this.cols; i++)
          s += (this.a[j][i]).toFixed(3) + "&nbsp;&nbsp;";
        s += "]<br />";
      }
      return s;
    }
  }

  return mat;
})();