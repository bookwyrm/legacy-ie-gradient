/* globals require, describe, it, expect */

var parse_gradient_value = require('../lib/parse-gradient-value');

describe('ParseGradientValue', function() {

  describe('with simple declaration', function() {
    var css_declaration = 'background: linear-gradient(to top, #000, #fff);';

    it('generates result object', function() {
      var expected_type = 'object';
      var result = parse_gradient_value.parse(css_declaration);
      expect(typeof result).toBe(expected_type);
    });

    it('populates colorStopList in result', function() {
      var expected_length = 2;
      var result = parse_gradient_value.parse(css_declaration);
      expect(result.colorStopList.length).toBe(expected_length);
    });

  });

  describe('with complex declaration', function() {
    var css_declaration = 'background-image:linear-gradient(to right bottom, #FF0000 0%, #00FF00 20px, rgb(0, 0, 255) 100%);';

    it('generates result object', function() {
      var expected_type = 'object';
      var result = parse_gradient_value.parse(css_declaration);
      expect(typeof result).toBe(expected_type);
    });

    it('populates colorStopList in result', function() {
      var expected_length = 3;
      var result = parse_gradient_value.parse(css_declaration);
      expect(result.colorStopList.length).toBe(expected_length);
    });
  });


});
