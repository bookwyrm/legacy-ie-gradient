/* globals module, require */
(function(module) {
  'use strict';

  var postcss, _options, rGradientEnclosedInBrackets, parse_gradient_value;




  function LegacyIEGradient(options) {
    postcss = require('postcss');
    _options = typeof options !== 'undefined' ? options : { };
    rGradientEnclosedInBrackets = /.*gradient\s*\(((?:\([^\)]*\)|[^\)\(]*)*)\)/;
    parse_gradient_value = require('./parse-gradient-value');
  }

  LegacyIEGradient.prototype.process = function(css, options) {
    return postcss(this.postcss).process(css, options).css;
  };

  LegacyIEGradient.prototype.postcss = function(css) {
    css.eachDecl(function(decl, i) {
      var rule = decl.parent;
      var value = decl.value;
      var prop = decl.prop;
      var result;

      if ( background(prop) && linearGradient(value) ) {
        result = parse_gradient_value.parse(decl.toString());

        if (result) {
          var ieDecl = postcss.decl({
            prop: 'filter',
            value: 'progid:DXImageTransform.Microsoft.gradient(startColorstr=' + result.colorStopList[0]['color'] + ', endColorstr=' + result.colorStopList[1]['color'] + ')'
          });
          rule.insertAfter(i, ieDecl);
        }
      }
    });
  };

  function background(prop) {
    return prop === "background" || prop === "background-image";
  }

  function linearGradient(value) {
    var gradient_type = '';
    var paran_position = value.indexOf('(');

    if (paran_position === -1) {
      return false;
    }

    gradient_type = value.substr(0, paran_position);
    var valid_gradient_types = [ 'linear-gradient', 'radial-gradient', 'repeating-linear-gradient', 'repeating-radial-gradient' ];
    if (valid_gradient_types.indexOf(gradient_type) !== -1) {
      return true;
    }

    return false;
  }

  var legacyIEGradient = function(options) {
    return new LegacyIEGradient(options);
  };
  legacyIEGradient.process = function(css, options, postcssoptions) {
    return new LegacyIEGradient(options).process(css, postcssoptions);
  };

  module.exports = legacyIEGradient;
})(module);
