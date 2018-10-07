/********************************************************************
 * Dom.js
 * ------
 *
 * IIFE for fetching DOM-objects
 *
 * Frans Vander Meiren 
 * 01/10/2015
 *
 ********************************************************************/
var $ = (function () {
  return {
    get: function (id) {
      return document.getElementById(id);
    }
  };
})();