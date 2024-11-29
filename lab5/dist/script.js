/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!*******************!*\
  !*** ./script.ts ***!
  \*******************/


var msg = "Hello";
alert(msg);
var styles = {
  'Styl 1': 'page1.css',
  'Styl 2': 'page2.css',
  'Styl 3': 'page3.css'
};
var currentStyle = 'Styl 1';
function changeStyle(newStyle) {
  if (styles[newStyle]) {
    var oldLink = document.querySelector('link[rel="stylesheet"]');
    if (oldLink) {
      oldLink.remove();
    }
    var newLink = document.createElement('link');
    newLink.rel = 'stylesheet';
    newLink.href = styles[newStyle];
    document.head.appendChild(newLink);
    currentStyle = newStyle;
  } else {
    console.error("Style ".concat(newStyle, " not found in styles dictionary."));
  }
}
function setupStyleLinks() {
  var menu = document.querySelector('#menu ul');
  if (menu) {
    var _loop = function _loop(style) {
      var li = document.createElement('li');
      var link = document.createElement('a');
      link.href = '#';
      link.className = 'style-link';
      link.setAttribute('data-style', style);
      link.textContent = "".concat(style);
      link.addEventListener('click', function (event) {
        event.preventDefault();
        changeStyle(style);
      });
      li.appendChild(link);
      menu.appendChild(li);
    };
    for (var style in styles) {
      _loop(style);
    }
  }
}
document.addEventListener('DOMContentLoaded', function () {
  setupStyleLinks();
  changeStyle(currentStyle);
});
/******/ })()
;