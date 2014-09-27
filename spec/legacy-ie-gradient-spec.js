/* globals require, describe, it, expect */

var legacyIEGradient = require('../lib/legacy-ie-gradient');
var css = '.rule { background: linear-gradient(to top, #000, #fff); }';

//console.log(legacyIEGradient);

describe('legacyIEGradient', function() {

  describe('with default settings', function() {

    it('generates IE Gradient', function() {

    //-ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr=#fad59f, endColorstr=#fa9907)";
      var expected = '.rule { background: linear-gradient(to top, #000, #fff); filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#000, endColorstr=#fff); }';
      var processed = legacyIEGradient.process(css);

      expect(processed).toBe(expected);
    });

  });

  describe('with non-background rule', function() {
    var css = '.rule { border-color: #000; }';

    it ('does not change rule', function() {
      var expected = css;
      var processed = legacyIEGradient.process(css);

      expect(processed).toBe(expected);
    });
  });

  describe('with non-gradient rule', function() {
    var css = '.rule { background: #fff; }';

    it ('does not change rule', function() {
      var expected = css;
      var processed = legacyIEGradient.process(css);

      expect(processed).toBe(expected);
    });
  });

});

