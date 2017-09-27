'use strict';

if (typeof Promise === 'undefined') {
  // Rejection tracking prevents a common issue where React gets into an
  // inconsistent state due to an error, but it gets swallowed by a Promise,
  // and the user has no idea what causes React's erratic future behavior.
  require('promise/lib/rejection-tracking').enable();
  window.Promise = require('promise/lib/es6-extensions.js');
}
// Polyfill for requestAnimationFrame
// More info: http://fb.me/react-polyfills
global.requestAnimationFrame = function(callback) {
  setTimeout(callback, 0);
};

// Polyfill for matchMedia when using jest with react-slick
window.matchMedia = window.matchMedia || function() {
  return {
  matches : false,
  addListener : function() {},
  removeListener: function() {}
  };
};

// fetch() polyfill for making API calls.
require('whatwg-fetch');

// Object.assign() is commonly used with React.
// It will use the native implementation if it's present and isn't buggy.
Object.assign = require('object-assign');
