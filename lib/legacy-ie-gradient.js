/* globals module, require */
(function(module) {
  'use strict';

  var postcss, _options;

  function LegacyIEGradient(options) {
    postcss = require('postcss');
    _options = typeof options !== 'undefined' ? options : { };
  }

  LegacyIEGradient.prototype.process = function(css, options) {
    return postcss(this.postcss).process(css, options).css;
  };

  LegacyIEGradient.prototype.postcss = function(css) {
    css.eachDecl(function(decl, i) {
      var rule = decl.parent;
      var value = decl.value;
      console.log(decl);

    });
  };

  var legacyIEGradient = function(options) {
    return new LegacyIEGradient(options);
  };
  legacyIEGradient.process = function(css, options, postcssoptions) {
    return new LegacyIEGradient(options).process(css, postcssoptions);
  };

  module.exports = legacyIEGradient;
})(module);
