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

    it('populates direction in result', function() {
      var expected = 'vertical';
      var result = parse_gradient_value.parse(css_declaration);

      expect(result.direction).toBe(expected);
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

  describe('with vertical gradient', function() {
    var css_declaration = 'background: linear-gradient(to top, #000, #fff);';

    it ('sets direction to vertical', function() {
      var expected = 'vertical';
      var result = parse_gradient_value.parse(css_declaration);
      expect(result.direction).toBe(expected);
    });
  });

  describe('with horizontal gradient', function() {
    var css_declaration = 'background: linear-gradient(to right, #000, #fff);';

    it ('sets direction to horizontal', function() {
      var expected = 'horizontal';
      var result = parse_gradient_value.parse(css_declaration);
      expect(result.direction).toBe(expected);
    });
  });
  describe('with diagonal gradient', function() {
    var css_declaration = 'background: linear-gradient(to right top, #000, #fff);';

    it ('sets direction to horizontal', function() {
      var expected = 'horizontal';
      var result = parse_gradient_value.parse(css_declaration);
      expect(result.direction).toBe(expected);
    });
  });
  //describe('with radial gradient', function() {
    //var css_declaration = 'background: radial-gradient(ellipse farthest-corner at 45px 45px , #00FFFF 0%, rgba(0, 0, 255, 0) 50%, #0000FF 95%);';

    //it ('sets direction to horizontal', function() {
      //var expected = 'horizontal';
      //var result = parse_gradient_value.parse(css_declaration);
      //expect(result.direction).toBe(expected);
    //});
  //});

});
