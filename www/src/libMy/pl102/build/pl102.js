(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("PL102", [], factory);
	else if(typeof exports === 'object')
		exports["PL102"] = factory();
	else
		root["PL102"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "pl102/build/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./pl102/src/pl102/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g; // This works in non-strict mode

g = function () {
  return this;
}();

try {
  // This works if eval is allowed (see CSP)
  g = g || new Function("return this")();
} catch (e) {
  // This works if the window reference is available
  if (typeof window === "object") g = window;
} // g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}


module.exports = g;

/***/ }),

/***/ "./pl102/src/pl102/PL102Dom.js":
/*!*************************************!*\
  !*** ./pl102/src/pl102/PL102Dom.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PLDOMElement = PLDOMElement;
exports.pLDom = void 0;

function PLDom() {
  this.arrDom = [];
  var self = this;

  this.addDOM = function (dom) {
    dom.arrId = this.arrDom.length;
    this.arrDom.push(dom);
    invisbilityCheck(dom);
  };

  this.grablaFun = function (displayObject) {
    if (displayObject.type == 'PLDOMElement') {
      displayObject.visibleDOM = worldVisible(displayObject); // .worldVisible;

      al = 1;
      displayObject.alphaDOM = worldAlpha(displayObject); // displayObject.worldAlpha;
    } else {
      if (displayObject.children) {
        for (var i = 0; i < displayObject.children.length; i++) {
          this.grablaFun(displayObject.children[i]);
        }
      }
    }
  };

  var al = 1;

  var worldAlpha = function worldAlpha(displayObject) {
    al = Math.min(al, displayObject.alpha);

    if (displayObject.parent) {
      al = worldAlpha(displayObject.parent);
    }

    return al;
  };

  var worldVisible = function worldVisible(displayObject) {
    if (!displayObject.visible) return false;

    if (displayObject.parent) {
      return worldVisible(displayObject.parent);
    }

    return true;
  };

  var invisbilityCheck = function invisbilityCheck(displayObject) {
    if (displayObject.grablaFun == undefined) displayObject.grablaFun = self.grablaFun;

    if (displayObject.parent) {
      invisbilityCheck(displayObject.parent);
    }
  };

  this.addContentInGrab = function (displayObject) {
    invisbilityCheck(displayObject);
  };
}

;
var pLDom = new PLDom();
exports.pLDom = pLDom;

var DomUtill = function DomUtill() {
  var _dummyElement = document.createElement('span');

  var _hasComputedStyle = !!window.getComputedStyle;

  var _hasCurrentStyle = !!document.documentElement.currentStyle; // var _hasBoundingClientRect = !!_dummyElement.getBoundingClientRect;
  // css prefixer


  var getPrefixedCSS = function () {
    var prefixCache = {};
    var prefixCacheCapitalized = {};
    var cssPrefixes = ['Webkit', 'O', 'Moz', 'ms'];

    var style = _hasComputedStyle && _dummyElement.ownerDocument.defaultView.getComputedStyle(_dummyElement, null) || _dummyElement.currentStyle;

    return function (name, capitalize) {
      if (!_hasComputedStyle && !_hasCurrentStyle) {
        return name;
      }

      if (prefixCache[name] === undefined) {
        var bits = name.split('-');
        var capName = bits[0];

        for (var i = 1; i < bits.length; i++) {
          capName += bits[i].charAt(0).toUpperCase() + bits[i].slice(1);
        }

        prefixCache[name] = name + '';
        prefixCacheCapitalized[name] = capName + '';

        if (!(name in style)) {
          capName = capName.charAt(0).toUpperCase() + capName.slice(1);

          for (var i = 0; i < cssPrefixes.length; i++) {
            if (cssPrefixes[i] + capName in style) {
              prefixCache[name] = '-' + cssPrefixes[i].toLowerCase() + '-' + name;
              prefixCacheCapitalized[name] = cssPrefixes[i] + capName;
              break;
            }
          }
        }
      }

      return capitalize ? prefixCacheCapitalized[name] : prefixCache[name];
    };
  }(); // exports


  return {
    getPrefixedCSS: getPrefixedCSS
  };
}();
/*
   new PLDOMElement(document.createElement('input'), pixiContent);
*/


function PLDOMElement(htmlElement, pixiContent) {
  PIXI.Container.call(this);
  pixiContent.addChild(this);
  this.type = 'PLDOMElement';
  this.typeCom = 'pixi';
  this.arrId = 0;
  var self = this;
  this.htmlElement = htmlElement;
  this.htmlElement.style.position = 'fixed';
  this.htmlElement.style.top = '0px';
  this.htmlElement.style.left = '0px';
  this.htmlElement.style.zIndex = '1'; // transforms

  var cssTransform = DomUtill.getPrefixedCSS('transform', true);
  var cssTransformOrigin = DomUtill.getPrefixedCSS('transform-origin', true);
  var cssBoxSizing = DomUtill.getPrefixedCSS('box-sizing', true);
  this.htmlElement.style[cssBoxSizing] = 'border-box';
  this.htmlElement.style[cssTransformOrigin] = '0 0';

  var _mat;

  this.updateDomElement = function () {
    // update matrix
    _mat = 'matrix(' + this.worldTransform.a + ',' + this.worldTransform.b + ',' + this.worldTransform.c + ',' + this.worldTransform.d + ',' + 0 + ',' + 0 + ')';
    this.htmlElement.style[cssTransform] = _mat;
    this.htmlElement.style.top = this.worldTransform.ty + 'px';
    this.htmlElement.style.left = +this.worldTransform.tx + 'px';
  };

  pLDom.addDOM(this);
  this.transform.grabla = this.updateDomElement.bind(this);
  if (!htmlElement.parentNode) pl102.doc.appendChild(htmlElement);

  this.kill = function () {
    this.htmlElement.parentNode.removeChild(this.htmlElement);
    this.parent = null;
  };

  this.interactive = true;
  this.hitArea = new PIXI.Rectangle(0, 0, 100, 20);
  this.width = 100;
  this.height = 20;
  this.alphaDOM = this.worldAlpha;
  this.visibleDOM = this.worldVisible; // this._visibleDOM = true;
  // FIXE TODO всплывалка в визебле моргает при старте

  /* setTimeout(function(){self.updateDomElement()}, 1);
     this.updateDomElement(); */
}

PLDOMElement.prototype = Object.create(PIXI.Container.prototype);
PLDOMElement.prototype.constructor = PLDOMElement;
Object.defineProperties(PLDOMElement.prototype, {
  width: {
    set: function set(value) {
      this._width = value;
      this.htmlElement.style.width = this._width + 'px';
      this.hitArea.width = value;
    },
    get: function get() {
      return this._width;
    }
  },
  height: {
    set: function set(value) {
      this._height = value;
      this.hitArea.height = value;
      this.htmlElement.style.height = this._height + 'px';
    },
    get: function get() {
      return this._height;
    }
  },
  visibleDOM: {
    set: function set(value) {
      this._visibleDOM = value;
      this.htmlElement.style.visibility = this._visibleDOM ? 'visible ' : 'hidden';
    },
    get: function get() {
      return this._visibleDOM;
    }
  },
  alphaDOM: {
    set: function set(value) {
      this._alphaDOM = value;
      this.htmlElement.style.opacity = this._alphaDOM;
    },
    get: function get() {
      return this._alphaDOM;
    }
  }
});

/***/ }),

/***/ "./pl102/src/pl102/StylePL102.js":
/*!***************************************!*\
  !*** ./pl102/src/pl102/StylePL102.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StylePL102 = StylePL102;
exports.Pl102Wheel = Pl102Wheel;

function StylePL102(_stage, _renderer, doc) {
  var self = this;
  this.type = 'pl102';
  window.pl102 = this;
  this.stage = _stage;
  this.stage.interactive = true;
  this.renderer = _renderer;
  this.interaction = _renderer.plugins.interaction;
  this.doc = doc;
  this.pl102Wheel = new Pl102Wheel();
  this.ctrlCV = new CtrlCV();
  this.loaderTexture = new LoaderTexture();
  this.isMobile = {
    Android: function Android() {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function BlackBerry() {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function iOS() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function Opera() {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function Windows() {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function any() {
      return self.isMobile.Android() || self.isMobile.BlackBerry() || self.isMobile.iOS() || self.isMobile.Opera() || self.isMobile.Windows();
    }
  };
  this.devas = this.isMobile.any(); // false//this.isMobile//main.utilityHTML ? !!main.utilityHTML.isMobile.any() : !!isMobile.any(); // true || false    // девайс ?

  if (this.devas == null) this.devas = false;else this.devas = true;
  this.isTouchEvents = this.devas;
  this.isMouseEvents = !this.devas;
  this.base = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAACxUlEQVR4Xu2RYWcWAAAG38mYSExEIpHISEQiI5GIiRmJjMRITCQSIzGRmEhEIjGRiIlEIiMRGYnEjEgkMhLpQ+5fHNfzC+65Gxr8n8rA0GAw2KAiisMQZDjuQHWfICMqojgMQTbGHajuE2STiigOQ5DNcQeq+wQZVRHFYQiyJe5AdZ8gW1VEcRiCbIs7UN0nyHYVURyGIDviDlT3CbJTRRSHIciuuAPVfYLsVhHFYQiyJ+5AdZ8gYyqiOAxB9sYdqO4TZJ+KKA5DkP1xB6r7BDmgIorDEORg3IHqPkEOqYjiMAQZjztQ3SfIYRVRHIYgR+IOVPcJclRFFIchyLG4A9V9ghxXEcVhCDIRd6C6T5ATKqI4DEEm4w5U9wkypSKKwxDkZNyB6j5BTqmI4jAEOR13oLpPkGkVURyGIGfiDlT3CXJWRRSHIchM3IHqPkHOqYjiMAQ5H3eguk+QWRVRHIYgF+IOVPcJclFFFIchyKW4A9V9glxWEcVhCHIl7kB1nyBzKqI4DEGuxh2o7hPkmoooDkOQ+bgD1X2CXFcRxWEIciPuQHWfIDdVRHEYgizEHajuE+SWiigOQ5DbcQeq+wS5oyKKwxDkbtyB6j5B7qmI4jAEuR93oLpPkAcqojgMQR7GHajuE2RRRRSHIcijuAPVfYI8VhHFYQjyJO5AdZ8gT1VEcRiCLMUdqO4T5JmKKA5DkOdxB6r7BHmhIorDEORl3IHqPkFeqYjiMAR5HXeguk+QZRVRHIYgb+IOVPcJ8lZFFIchyLu4A9V9grxXEcVhCLISd6C6T5APKqI4DEE+xh2o7hPkk4ooDkOQz3EHqvsEWVURxWEIshZ3oLpPkC8qojgMQb7GHajuE+SbiigOQ5DvcQeq+wT5oSKKwxDkZ9yB6j5B1lVEcRiC/Io7UN0nyG8VURyGIH/iDlT3CfJXRRSH+QeWZzG2SGitMgAAAABJRU5ErkJggg==';
  this.base1 = 'data:image/png;base64,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';
  this.base2 = 'data:image/png;base64,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';
  this.base3 = 'data:image/png;base64,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';
  this.base4 = 'data:image/png;base64,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/GMzLdsAADvraVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzExMSA3OS4xNTgzMjUsIDIwMTUvMDkvMTAtMDE6MTA6MjAgICAgICAgICI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgICAgICAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgICAgICAgICB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgICAgICAgICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iPgogICAgICAgICA8eG1wOkNyZWF0b3JUb29sPkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChXaW5kb3dzKTwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8eG1wOkNyZWF0ZURhdGU+MjAxNy0wOC0wN1QxNToxMjozMyswMzowMDwveG1wOkNyZWF0ZURhdGU+CiAgICAgICAgIDx4bXA6TW9kaWZ5RGF0ZT4yMDE3LTEwLTAyVDE0OjQ1OjQ2KzAzOjAwPC94bXA6TW9kaWZ5RGF0ZT4KICAgICAgICAgPHhtcDpNZXRhZGF0YURhdGU+MjAxNy0xMC0wMlQxNDo0NTo0NiswMzowMDwveG1wOk1ldGFkYXRhRGF0ZT4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgICAgICAgPHBob3Rvc2hvcDpDb2xvck1vZGU+MzwvcGhvdG9zaG9wOkNvbG9yTW9kZT4KICAgICAgICAgPHBob3Rvc2hvcDpJQ0NQcm9maWxlPnNSR0IgSUVDNjE5NjYtMi4xPC9waG90b3Nob3A6SUNDUHJvZmlsZT4KICAgICAgICAgPHhtcE1NOkluc3RhbmNlSUQ+eG1wLmlpZDo2M2YxY2EyMi03ZDQxLThmNDYtOTIyNi00ZGFjZjBlYmE0OWQ8L3htcE1NOkluc3RhbmNlSUQ+CiAgICAgICAgIDx4bXBNTTpEb2N1bWVudElEPmFkb2JlOmRvY2lkOnBob3Rvc2hvcDozNTFkNDkzOC1hNzY3LTExZTctYjk2Zi1iNmFmMjM5ODE0ODY8L3htcE1NOkRvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+eG1wLmRpZDo3MDMzZDEyNy1iNDBlLTIxNDYtYjExOS04ZjAyMjJhZmFiOGQ8L3htcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOkhpc3Rvcnk+CiAgICAgICAgICAgIDxyZGY6U2VxPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5jcmVhdGVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6NzAzM2QxMjctYjQwZS0yMTQ2LWIxMTktOGYwMjIyYWZhYjhkPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE3LTA4LTA3VDE1OjEyOjMzKzAzOjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5zYXZlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOjcyMjg2OGY4LTE1NzEtYTI0Ni1hODk2LWMzMmYwMjU1YjM4Nzwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxNy0xMC0wMlQxNDo0NTo0NiswMzowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICAgICA8c3RFdnQ6Y2hhbmdlZD4vPC9zdEV2dDpjaGFuZ2VkPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDo2M2YxY2EyMi03ZDQxLThmNDYtOTIyNi00ZGFjZjBlYmE0OWQ8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTctMTAtMDJUMTQ6NDU6NDYrMDM6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj45NjAwMDAvMTAwMDA8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOllSZXNvbHV0aW9uPjk2MDAwMC8xMDAwMDwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT4xPC9leGlmOkNvbG9yU3BhY2U+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj42NDwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj4xMjg8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg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';
  this.base5 = 'data:image/png;base64,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/GMzLdsAADoxaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzExMSA3OS4xNTgzMjUsIDIwMTUvMDkvMTAtMDE6MTA6MjAgICAgICAgICI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgICAgICAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgICAgICAgICB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgICAgICAgICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iPgogICAgICAgICA8eG1wOkNyZWF0b3JUb29sPkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChXaW5kb3dzKTwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8eG1wOkNyZWF0ZURhdGU+MjAxNy0wOC0wN1QxNToxMjozMyswMzowMDwveG1wOkNyZWF0ZURhdGU+CiAgICAgICAgIDx4bXA6TW9kaWZ5RGF0ZT4yMDE3LTEwLTAyVDE0OjQ1OjE0KzAzOjAwPC94bXA6TW9kaWZ5RGF0ZT4KICAgICAgICAgPHhtcDpNZXRhZGF0YURhdGU+MjAxNy0xMC0wMlQxNDo0NToxNCswMzowMDwveG1wOk1ldGFkYXRhRGF0ZT4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgICAgICAgPHBob3Rvc2hvcDpDb2xvck1vZGU+MzwvcGhvdG9zaG9wOkNvbG9yTW9kZT4KICAgICAgICAgPHBob3Rvc2hvcDpJQ0NQcm9maWxlPnNSR0IgSUVDNjE5NjYtMi4xPC9waG90b3Nob3A6SUNDUHJvZmlsZT4KICAgICAgICAgPHhtcE1NOkluc3RhbmNlSUQ+eG1wLmlpZDpjN2M1YTdjMy00YzU4LTAxNDItYjRkMy1iOTQ4NzQxM2RlMTI8L3htcE1NOkluc3RhbmNlSUQ+CiAgICAgICAgIDx4bXBNTTpEb2N1bWVudElEPmFkb2JlOmRvY2lkOnBob3Rvc2hvcDoxZjE4MGZjZC1hNzY3LTExZTctYjk2Zi1iNmFmMjM5ODE0ODY8L3htcE1NOkRvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+eG1wLmRpZDpkNWU3M2RkZS1lM2NjLTdmNDMtYjcwNy02MjI2NDM1ZjRjMjc8L3htcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOkhpc3Rvcnk+CiAgICAgICAgICAgIDxyZGY6U2VxPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5jcmVhdGVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6ZDVlNzNkZGUtZTNjYy03ZjQzLWI3MDctNjIyNjQzNWY0YzI3PC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE3LTA4LTA3VDE1OjEyOjMzKzAzOjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5zYXZlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOmM3YzVhN2MzLTRjNTgtMDE0Mi1iNGQzLWI5NDg3NDEzZGUxMjwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxNy0xMC0wMlQxNDo0NToxNCswMzowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICAgICA8c3RFdnQ6Y2hhbmdlZD4vPC9zdEV2dDpjaGFuZ2VkPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgPC9yZGY6U2VxPgogICAgICAgICA8L3htcE1NOkhpc3Rvcnk+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgICAgIDx0aWZmOlhSZXNvbHV0aW9uPjk2MDAwMC8xMDAwMDwvdGlmZjpYUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6WVJlc29sdXRpb24+OTYwMDAwLzEwMDAwPC90aWZmOllSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpSZXNvbHV0aW9uVW5pdD4yPC90aWZmOlJlc29sdXRpb25Vbml0PgogICAgICAgICA8ZXhpZjpDb2xvclNwYWNlPjE8L2V4aWY6Q29sb3JTcGFjZT4KICAgICAgICAgPGV4aWY6UGl4ZWxYRGltZW5zaW9uPjY0PC9leGlmOlBpeGVsWERpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxZRGltZW5zaW9uPjEyODwvZXhpZjpQaXhlbFlEaW1lbnNpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSJ3Ij8+gmhcSAAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAIDklEQVR42uyd+1OUVRjHPwvLRVZQVEQrxcwslbwlRaVpNl5SvJFmXpqafvZ/qpzUsjRTKrxFUZqXymtqXjPLTESFUBFktx/O9x12aN9dxhZ2z3LODDPLcJA9n/Pcn+ddA5FIhL68sujjywFwABwAB8ABcAAcAAfAAXAAHAAHwAFwABwAB8ABcAAcAAfAAehLK5isf2jdunXR304C3gaGAPuA74HzwP2MBRAlUYMFoBwoAdqAf/T1BxDOZABFwDxgJTAFKAQeAYbp53uA65kKYDIwHlgOTBcMgKH6vg3IBb4Ffgc6Mg3AMt36c7r56FUIzAZC+ps7gT/TQR2SCWCgRL3UxzYMAF4EApKEr4FzqZaEZAI4BuQBZbL+sVxsSBD6AfnADuCSIERsB3AQaNQNvwo8HgNCQBCe1YE9dTgtG2E1gDNycw3y98ulEoEYe/sB04D+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';
  this.base6 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAC4jAAAuIwF4pT92AAABNmlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjarY6xSsNQFEDPi6LiUCsEcXB4kygotupgxqQtRRCs1SHJ1qShSmkSXl7VfoSjWwcXd7/AyVFwUPwC/0Bx6uAQIYODCJ7p3MPlcsGo2HWnYZRhEGvVbjrS9Xw5+8QMUwDQCbPUbrUOAOIkjvjB5ysC4HnTrjsN/sZ8mCoNTIDtbpSFICpA/0KnGsQYMIN+qkHcAaY6addAPAClXu4vQCnI/Q0oKdfzQXwAZs/1fDDmADPIfQUwdXSpAWpJOlJnvVMtq5ZlSbubBJE8HmU6GmRyPw4TlSaqo6MukP8HwGK+2G46cq1qWXvr/DOu58vc3o8QgFh6LFpBOFTn3yqMnd/n4sZ4GQ5vYXpStN0ruNmAheuirVahvAX34y/Axk/96FpPYgAAACBjSFJNAAB6JQAAgIMAAPn/AACA6AAAUggAARVYAAA6lwAAF2/XWh+QAAAAiUlEQVR42uzbQRHAQAgDwMCcNvw7aoVkkbCTUB7XubsvxbMpnzczAFRAApoB2hMQSxAAAEvQElQBAAAAAAAAAACAPoCVAADlALsSAAAAAHeABABwB0iAJSgBAAAA8BmUAADuAAkAAAAAAAAAAAAoAPBQMlEBAAB6x19jKqACKuAQap4fAAD//wMAxgMDdwLkjagAAAAASUVORK5CYII=';
  this.otstup = 2;
  this.color = 0xffffff; // 0xe3e8ee;  //основной фон

  this.color1 = 0x9b9fa8; // контур

  this.color2 = 0xc9daec; // кнопка

  this.color3 = 0xe6edf3; // нажатие на кнопку (не PXPushButton)

  this.color4 = 0xbcc2ce; // темный фон

  this.color5 = 0xe3e8ee; // неактивная вкладка

  this.color6 = 0x000000;
  this.color7 = 0xdddddd;
  this.color8 = 0xd9dadd;
  this.color9 = 0x555555;
  this.color10 = 0x696969; // серый

  this.color11 = 0xA9A9A9; // светло-серый

  this.color12 = 0xFF0000; // красный

  this.colorButton = 0x777777;
  this.colorButton1 = 0xffb200;
  this.colorButton2 = 0xdddddd;
  this.colorLabel = 0x808080;
  this.colorSlid = 0x3b3d3f;
  this.colorSlid1 = 0x787b7e; // 787b7e;

  this.kontur = 0.5;
  this.wh = 27;
  this.whMin = 10;
  this.whText = 16;
  this.fontLabel = 'Arial'; // Устанавливает activMous для PL-элементов в приложении

  this.activMouse = true;
  this.arrTypeFilter = ['Stats', 'PLInput', 'PLTextArea', 'PLSliderBig', 'PLSlidDubBtn', 'PLColor', 'PLVideo', 'SliderImg', 'PLColorUn'];
  this.style = {
    fontFamily: this.fontLabel,
    fontSize: this.whText,
    fontStyle: 'bold',
    fill: '#757575',
    align: 'left',
    paddingRight: 6,
    paddingTop: 2
  };
  this.style2 = {
    fontFamily: this.fontLabel,
    fontSize: this.whText,
    fontStyle: 'bold',
    fill: '#555555',
    align: 'left'
  };
  this.filter = [new PIXI.filters.OutlineFilter(2, this.color1)];
  this.filter[0].padding = 50;
  this.blur = new PIXI.filters.BlurFilter(3);
  this.blur.padding = 50;

  this.setNameFont = function (str) {
    this.fontLabel = str;
    this.style.fontFamily = str;
    this.style2.fontFamily = str;
  };

  this.array = [];

  this.addElement = function (_obj) {
    if (this.array.indexOf(_obj) !== -1) {
      return;
    }

    for (var i = 0; i < this.array.length; i++) {
      if (this.array[i] == null) {
        _obj.idArrElement = i;
        this.array[i] = _obj;
        return;
      }
    }

    _obj.idArrElement = this.array.length;
    this.array.push(_obj);
  };

  this.removeElement = function (_obj, bool) {
    if (_obj.idArrElement === -1) return;
    if (!this.array[_obj.idArrElement]) return;
    if (bool) this.array.splice(_obj.idArrElement, 1);
    _obj.idArrElement = -1;
    _obj.activMouse = true;
    if (!bool) this.array[_obj.idArrElement] = null;
  };

  this.activMouseGlob = function (val, bFilt) {
    if (val === undefined) val = !this.activMouse;
    if (this.activMouse === val) return;
    this.activMouse = val;

    for (var i = 0; i < this.array.length; i++) {
      if (this.array[i].activMouse === undefined) continue;
      if (!bFilt && !checkType(this.array[i])) continue;

      if (val === false) {
        this.array[i].oldAMouse = this.array[i].activMouse;
        this.array[i].activMouse = val;
      } else if (val === true) {
        if (this.array[i].oldAMouse !== undefined) {
          this.array[i].activMouse = this.array[i].oldAMouse;
        } else {
          this.array[i].activMouse = val;
        }
      }
    }
  }; // Проверка соответствия типа объекта по фильтру


  var checkType = function checkType(obj) {
    for (var i = 0; i < self.arrTypeFilter.length; i++) {
      if (obj.type === self.arrTypeFilter[i]) return true;
    }

    return false;
  };

  this.setLocal = function (local) {};
}

StylePL102.prototype = {
  get x() {
    return this.global.x;
  },

  get y() {
    return this.global.y;
  },

  get global() {
    return pl102.interaction.eventData.data.global;
  }

};
/**
 * Вешаем на контейнер событие колесика мышы
 * Структура эвентов
 */

function Pl102Wheel() {
  var self = this;
  this.type = 'Pl102Wheel';
  window.pl102Wheel = this;
  this.arrayEvent = [];
  this.arrayCash = [];
  this.overEvent = null;
  var contHTML = pl102.doc;
  var ii;
  var eventDocument;
  var num;
  var event;
  var point = new PIXI.Point();
  var point1 = new PIXI.Point();
  var pointNull = new PIXI.Point();
  var distance, distance2;
  var angle, scale;

  this.on = function (_cont, _type, _fun, _p, _p1) {
    if (_fun === undefined) return;
    if (typeof _fun !== 'function') return;
    num = -1;

    for (var i = 0; i < this.arrayCash.length; i++) {
      if (this.arrayCash[i].life === false) {
        num = i;
        break;
      }
    }

    if (num !== -1) {
      event = this.arrayCash[num];
    } else {
      event = new EventPlusPixi();
      event.idArrEventCash = this.arrayCash.length;
      this.arrayCash.push(event);
    }

    event.target = _cont;
    event.type = _type;
    event.fun = _fun;
    event.life = true;
    event.p = _p;
    event.p1 = _p1;
    event.pointToCont = false;
    this.addEvent(event);
  };

  this.off = function (_cont, _type, _fun, _p, _p1) {
    num = -1;
    num = this.inCashEvent(_cont, _type, _fun);
    if (num === -1) return;
    event = this.arrayEvent[num];
    this.arrayEvent.splice(num, 1);
    event.life = false;
    event.target.off('mouseout', this.funOut);
    event.target.off('mouseover', this.funOver);
  };

  this.addEvent = function (e) {
    e.idArrEvent = this.arrayEvent.length;
    e.target.idArrEvent = e.idArrEvent; // Fixe

    e.target.idArrEventCash = e.idArrEventCash;
    this.arrayEvent.push(e);
    e.target.on('mouseout', this.funOut);
    e.target.on('mouseover', this.funOver);
  };

  this.funOver = function (e) {
    self.overEvent = e;
    self.arrayCash[this.idArrEventCash].pointToCont = true;
  };

  this.funOut = function (e) {
    self.overEvent = e;
    self.arrayCash[this.idArrEventCash].pointToCont = false;
  };

  this.inCashEvent = function (_cont, _type, _fun) {
    for (var i = 0; i < self.arrayEvent.length; i++) {
      if (self.arrayEvent[i].type === _type) {
        if (_fun === self.arrayEvent[i].fun) {
          if (_cont === self.arrayEvent[i].target) {
            return i;
          }
        }
      }
    }

    return -1;
  }; // Функция, обрабатывающая событие


  this.wheel = function (event) {
    eventDocument = event;
    if (self.arrayEvent.length == 0) return;
    var delta = 0; // Направление колёсика мыши

    event = event || window.event;

    if (event.wheelDelta) {
      // В Opera и IE
      delta = event.wheelDelta / 120; // В Опере значение wheelDelta такое же, но с противоположным знаком

      if (window.opera) delta = -delta; // Дополнительно для Opera
    } else {
      if (event.detail) {
        // Для Gecko
        delta = -event.detail / 3;
      }
    }

    self.wheel1(delta);
  };

  this.getScaleAllX = function (obj, scala) {
    this.res = scala;

    if (obj.parent !== undefined) {
      return this.res *= this.getScaleAllX(obj.parent, obj.parent.scale.x);
    }

    return this.res;
  };

  this.wheel1 = function (_delta) {
    for (ii = 0; ii < self.arrayEvent.length; ii++) {
      if (self.arrayEvent[ii].pointToCont === true) {
        self.arrayEvent[ii].delta = _delta;
        self.arrayEvent[ii].eventDocument = eventDocument;

        if (self.arrayEvent[ii].p) {
          point = self.arrayEvent[ii].target.toGlobal(pointNull);
          distance = self.getDistance(point, pl102.global);
          scale = this.getScaleAllX(self.arrayEvent[ii].target, self.arrayEvent[ii].target.scale.x); // self.arrayEvent[ii].target.transform.worldTransform.b;

          distance2 = distance / scale;
          angle = self.getAngle(point, pl102.global);
          point1 = self.getVector(distance2, -angle + self.arrayEvent[ii].target.rotation, point1);
          self.arrayEvent[ii].point.x = point1.x;
          self.arrayEvent[ii].point.y = point1.y;
        }

        self.arrayEvent[ii].fun(self.arrayEvent[ii]);
      }
    }
  }; // Получение угла между двумя точками  радианы  -PI - 0 - PI


  this.getAngle = function (a, b) {
    b = b || rezNull;
    a = a || rezNull;
    return Math.atan2(b.y - a.y, b.x - a.x);
  }; // получить дистанцию между точками


  this.getDistance = function (p1, p2) {
    // if (!p1 || !p2) return 0;
    if (p1 === undefined) {
      return 0;
    }

    if (p2 === undefined) {
      p2 = rezNull;
    }

    p2 = p2 || rezNull;
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
  }; // от угла и длины получаем вектор точки


  this.getVector = function (length, angle, point) {
    if (point === undefined) var point = new THREE.Vector2(0, 0);
    if (length < 0) angle += Math.PI;
    point.x = Math.abs(length) * Math.cos(angle);
    point.y = Math.abs(length) * Math.sin(angle);
    return point;
  };

  this.addHandler = function (object, event, handler) {
    if (object.addEventListener) {
      object.addEventListener(event, handler, false);
    } else if (object.attachEvent) {
      object.attachEvent('on' + event, handler);
    } else alert('Обработчик не поддерживается');
  };

  this.addHandler(contHTML, 'DOMMouseScroll', this.wheel);
  this.addHandler(contHTML, 'mousewheel', this.wheel);
}
/**
 * Событие ответа delta-напровелния прокрутки
 */


function EventPlusPixi() {
  var self = this;
  this.type = 'Pl102Wheel';
  this.target = null;
  this.type = null;
  this.fun = null;
  this.life = null;
  this.p = null;
  this.p1 = null;
  this.delta = 0;
  this.idArrEventCash = 0;
  this.idArrEvent = 0;
  this.pointToCont = false;
  this.eventDocument = null;
  this.point = new PIXI.Point();
}

function CtrlCV(cont) {
  var self = this;
  this.textArea = document.createElement('textarea');
  this.textArea.value = 'текст';
  document.body.appendChild(this.textArea);
  this.textArea.fokk = true;
  this.textArea.style.zIndex = -100;
  this.textArea.style.position = 'absolute';
  this.textArea.style.top = '-100px';
  this.textArea.style.visibility = 'hidden'; // 0.19617322166133677dzsgf0.4485911284290629dzsgf

  this.boolCntr = false;
  this.boolC = false;
  this.boolV = false;
  this.array = [];

  this.addFun = function (_fun) {
    this.array.push(_fun);
  };

  this.str = null;

  this.zapros = function (_s) {
    var i = 0;

    if (_s === undefined) {
      this.str = null;

      for (i = 0; i < this.array.length; i++) {
        this.str = this.array[i]();

        if (this.str != null) {
          this.textArea.value = this.str;
          break;
        }
      }
    } else {
      for (i = 0; i < this.array.length; i++) {
        this.array[i](_s);
      }
    }
  };

  this.save = function () {
    if (this.str != null) {
      if (this.getFokus() === true) {
        this.textArea.style.visibility = 'visible';
        this.textArea.focus();
        this.textArea.select();
        setTimeout(function () {
          // self.zapros(self.textArea.value)
          self.textArea.style.visibility = 'hidden';
        }, 1);
      }
    }
  };

  this.getFokus = function () {
    var ii = $('*:focus');

    if (ii) {
      if (ii.length !== undefined) {
        if (ii.length !== 0) {
          if (ii[0].fokk === undefined) {
            return false;
          }
        }
      }
    }

    return true;
  };

  this.saveNa = function () {
    if (this.getFokus() === true) {
      this.textArea.style.visibility = 'visible';
      this.textArea.focus();
      this.textArea.select(); // trace(this.textArea.value)

      setTimeout(function () {
        self.zapros(self.textArea.value);
        self.textArea.style.visibility = 'hidden';
      }, 1);
    }
  }; // 17 контрл
  // 67 С
  // 86 V


  document.addEventListener('keydown', function (e) {
    // this.document.keydown(function (e) {
    if (e.keyCode === 17) {
      if (self.boolCntr === false) {
        self.boolCntr = true;
        self.zapros();

        if (self.boolC === true) {
          self.save();
        }

        if (self.boolV === true) {
          self.saveNa();
        }
      }
    }

    if (e.keyCode === 67) {
      if (self.boolC === false) {
        self.boolC = true;
        self.zapros();

        if (self.boolCntr === true) {
          self.save();
        }
      }
    }

    if (e.keyCode === 86) {
      if (self.boolV === false) {
        self.boolV = true;

        if (self.boolCntr === true) {
          self.saveNa();
        }
      }
    }
  });
  document.addEventListener('keyup', function (e) {
    // this.document.keyup(function (e) {
    if (e.keyCode === 17) {
      if (self.boolCntr === true) {
        self.boolCntr = false;
        trace('up' + e.keyCode);
      }
    }

    if (e.keyCode === 67) {
      if (self.boolC === true) {
        self.boolC = false;
      }
    }

    if (e.keyCode === 86) {
      if (self.boolV === true) {
        self.boolV = false;
      }
    }
  });
}
/**
 * Загрузка картинок, принимает линк, отдает текстуру
 */


function LoaderTexture() {
  var self = this;
  this.type = 'LoaderTexture';
  this.array = [];

  this.getTexture = function (link, fun, funError) {
    if (!link || link === 'null') {
      fun(PIXI.Texture.EMPTY);
      if (funError) funError();
      return;
    } // уже загружен в текстурном кеше


    var textureFromCache = PIXI.utils.TextureCache[link];

    if (textureFromCache) {
      fun(textureFromCache);
      return;
    } // уже загружен


    for (var i = 0; i < this.array.length; i++) {
      if (this.array[i].okLoad == true) {
        if (this.array[i].link == link) {
          fun(this.array[i].texture);
          return;
        }
      }
    } // загружаеться


    for (var i = 0; i < this.array.length; i++) {
      if (this.array[i].okLoad == false) {
        if (this.array[i].link == link) {
          this.array[i].arrFun.push(fun);
          return;
        }
      }
    } // несуществует


    var p = new PPixi();
    this.array.push(p);
    p.link = link;
    p.arrFun.push(fun);
    if (funError) p.arrFunError.push(funError);
    p.idArr = this.array.length - 1;
    p.start();
  };

  this.clearFun = function (link, fun) {
    for (var i = 0; i < this.array.length; i++) {
      if (this.array[i].link == link) {
        if (fun) {
          var index = this.array[i].arrFun.indexOf(fun);

          if (index != -1) {
            this.array[i].arrFun.splice(index, 1);
          }
        } else {
          this.array[i].arrFun.length = 0;
        }
      }
    }
  };
}
/**
 * Создание картинки и загрузка.
 */


function PPixi() {
  var self = this;
  this.okLoad = false;
  this.name = 'xzNull';
  this.link = 'xzNull';
  this.idArr = -1;
  this.texture = null;
  this.arrFun = [];
  this.arrFunError = [];
  this.image = new Image();

  this.loadError = function (e) {
    self.texture = PIXI.Texture.EMPTY;
    console.log('Херня в PPixi нет линка текстур', e);
    self.finish(true);
  };

  this.loadComplit = function (e) {
    self.texture = new PIXI.Texture(new PIXI.BaseTexture(self.image));
    self.finish();
  };

  this.start = function () {
    self.image.onerror = self.loadError;
    self.image.crossOrigin = '';
    self.image.onload = self.loadComplit;
    self.image.src = self.link;
    self.image.interactive = false;
  };

  this.finish = function (isError) {
    self.okLoad = true;

    if (isError) {
      while (this.arrFunError.length > 0) {
        var fun = this.arrFunError.pop();
        fun();
      }
    } else {
      while (this.arrFun.length > 0) {
        var fun = this.arrFun.pop();
        fun(this.texture);
      }
    }
  };
}

/***/ }),

/***/ "./pl102/src/pl102/index.js":
/*!**********************************!*\
  !*** ./pl102/src/pl102/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var pl102Components = _interopRequireWildcard(__webpack_require__(/*! ./pl102Components.js */ "./pl102/src/pl102/pl102Components.js"));

Object.keys(pl102Components).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return pl102Components[key];
    }
  });
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

for (var key in pl102Components) {
  global[key] = pl102Components[key];
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./pl102/src/pl102/pl102Components.js":
/*!********************************************!*\
  !*** ./pl102/src/pl102/pl102Components.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PLPanel = PLPanel;
exports.PLImage = PLImage;
exports.PLLabel = PLLabel;
exports.PLButton = PLButton;
exports.PLPreloader = PLPreloader;
exports.PLSlider = PLSlider;
exports.PLSliderBig = PLSliderBig;
exports.PLSlidDubBtn = PLSlidDubBtn;
exports.PLInput = PLInput;
exports.PLWindow = PLWindow;
exports.PLBitmapData = PLBitmapData;
exports.PLGalleryPanelBtn = PLGalleryPanelBtn;
exports.PLScrollBarH = PLScrollBarH;
exports.PLScrollBarV = PLScrollBarV;
exports.PLContur = PLContur;
exports.PLColor = PLColor;
exports.PLColorPicker = PLColorPicker;
exports.PLColorPick = PLColorPick;
exports.PLColorPickerPanel = PLColorPickerPanel;
exports.PLGradient = PLGradient;
exports.PLInputRGB = PLInputRGB;
exports.PLCheckBox = PLCheckBox;
exports.PLCheckBoxImage = PLCheckBoxImage;
exports.PLTextArea = PLTextArea;
exports.PLComboBoxImage = PLComboBoxImage;
exports.PLImgFaceElement = PLImgFaceElement;
exports.PLImgBoxElement = PLImgBoxElement;
exports.PLComboBox = PLComboBox;
exports.PLComboBoxElement = PLComboBoxElement;
exports.PLFaceElement = PLFaceElement;
exports.PLScrollBarND = PLScrollBarND;
exports.PLDebagContent = PLDebagContent;
Object.defineProperty(exports, "PLDOMElement", {
  enumerable: true,
  get: function get() {
    return _PL102Dom.PLDOMElement;
  }
});
Object.defineProperty(exports, "pLDom", {
  enumerable: true,
  get: function get() {
    return _PL102Dom.pLDom;
  }
});
Object.defineProperty(exports, "StylePL102", {
  enumerable: true,
  get: function get() {
    return _StylePL.StylePL102;
  }
});
Object.defineProperty(exports, "Pl102Wheel", {
  enumerable: true,
  get: function get() {
    return _StylePL.Pl102Wheel;
  }
});

var _PL102Dom = __webpack_require__(/*! ./PL102Dom.js */ "./pl102/src/pl102/PL102Dom.js");

var _StylePL = __webpack_require__(/*! ./StylePL102.js */ "./pl102/src/pl102/StylePL102.js");

/*
    34+/-    PLPanel            - панель
    179+/-   PLImage            - картинка
    328+/-   PLLabel            - надпись
    517+/-   PLButton           - кнопка
    974+/-   PLPreloader        - отображается пока, во время загрузки
    1167+/-  PLSlider           - таскалка
    1407+/-  PLSliderBig        - таскалка с инпутом
    1753+/-  PLSlidDubBtn       - таскалка с инпутом и стрелками больше\меньше
    1855+/-  PLInput            - инпут
    2119+/-  PLWindow           - окно
    2402+/-  PLBitmapData       - битмапа
    2699+/-  PLGalleryPanelBtn  - галерея с кнопками и скролом
    2883+/-  PLScrollBarHP      - скрол горизонтальный с кнопками
    3159+/-  PLScrollBarH       - скрол горизонтальный
    3440+/-  PLScrollBarVP      - скрол вертикальный с кнопками
    3716+/-  PLScrollBarV       - скрол вертикальный
    3989+/-  PLContur           - контур
    4071+/-  PLColor            - интерфейс для выбора цвета
    4521+/-  PLColorPicker      - панель с базовыми цветами
    4723+/-  PLColorPick        - панель с палитрой для выбора уникального цвета
    5334+/-  PLColorPickerPanel - панель с градиентами и инпутами RGB
    5587+/-  PLGradient         - панель с градиентом цвета
    5919+/-  PLInputRGB         - хранит инпуты для ввода RGB значений
    6073+/-  PLCheckBox         - чекбокс
    6240+/-  PLCheckBoxImage    - чекбокс с картинками
    6369+/-  PLTextArea         - текст-ареа
    6643+/-  PLComboBoxImage    - меню картинок (панель с выезжающими кнопками)
    6932+/-  PLImgFaceElement   - часть компонента PLComboBoxImage
    7095+/-  PLImgBoxElement    - часть компонента PLComboBoxImage
    7205+/-  PLComboBox         - меню блоков (панель с выезжающими кнопками)
    7673+/-  PLComboBoxElement  - эл-т в меню комбобокс
    7836+/-  PLFaceElement      - лицевой эл-т в меню комбобокс
*/
function PLPanel(cont, _x, _y) {
  PIXI.Container.call(this);
  this.type = 'PLPanel';
  var self = this;
  cont.addChild(this);
  pl102.addElement(this);
  this.x = _x || 0;
  this.y = _y || 0;
  this.xz = 0;
  this._width = 100;
  this._height = 100;
  this._color = pl102.color;
  this._color1 = pl102.color1;
  this._kontur = true;
  this._nizNum = 30;
  this._nizAlpha = 0.2;
  this._notBac = false;
  this._visiLine = false;
  this.konturThick = pl102.kontur;
  this.lineThick = pl102.kontur;
  this.graphics = new PIXI.Graphics();
  this.addChild(this.graphics);
  this.image = new PLImage(this, 0, this._height - this._nizNum, pl102.base);
  pl102.removeElement(this.image, true);
  this.image.height = 30;
  this._link = this.image._link;
  this.image.alpha = this._nizAlpha;
  this.gPlus = new PIXI.Graphics(); // Для дебаг отрисовки

  this.addChild(this.gPlus);
  this.content = new PIXI.Container();
  this.addChild(this.content);
  this.graphLine = new PIXI.Graphics();
  this.addChild(this.graphLine);
  this.graphLine.visible = this._visiLine;
  var ot = 0; // перерисовка

  this.draw102 = function () {
    this.graphics.clear();
    if (this._width < 2) return;

    if (this._notBac == true) {
      this.graphics.beginFill(this._color1);
      this.graphics.drawRect(-this.konturThick / 2, -this.konturThick / 2, this._width + this.konturThick, this.konturThick);
      this.graphics.drawRect(-this.konturThick / 2, this._height - this.konturThick / 2, this._width + this.konturThick, this.konturThick);
      this.graphics.drawRect(-this.konturThick / 2, 0, this.konturThick, this._height);
      this.graphics.drawRect(this._width - this.konturThick / 2, 0, this.konturThick, this._height);
      return;
    }

    if (this._kontur == true) {
      ot = this.lineThick;
      this.graphics.beginFill(this._color1);
      this.graphics.drawRect(0, 0, this._width, this._height);
      this.graphics.beginFill(this._color);
      this.graphics.drawRect(this.konturThick, this.konturThick, this._width - this.konturThick * 2, this._height - this.konturThick * 2);
    } else {
      ot = 0;
      this.graphics.beginFill(this._color);
      this.graphics.drawRect(0, 0, this._width, this._height);
    }

    this.graphLine.clear();
    this.graphLine.beginFill(0xffffff);
    this.graphLine.drawRect(ot, this._height - 1, this._width - ot * 2, 1);
    this.graphLine.beginFill(this._color1);
    this.graphLine.drawRect(ot, this._height, this._width - ot * 2, this.konturThick);
  };

  this.kill = function () {};

  this.draw102();
}

PLPanel.prototype = Object.create(PIXI.Container.prototype);
PLPanel.prototype.constructor = PLPanel;
Object.defineProperties(PLPanel.prototype, {
  link: {
    // замена градиентов
    set: function set(value) {
      if (this._link != value) {
        this._link = value;
        this.image.link = this._link;
      }
    },
    get: function get() {
      return this._link;
    }
  },
  nizAlpha: {
    // нижний отступ меньше 0 растягиваеться на все
    set: function set(value) {
      if (this._nizAlpha != value) {
        this._nizAlpha = value;
        this.image.alpha = this._nizAlpha;
      }
    },
    get: function get() {
      return this._nizAlpha;
    }
  },
  nizNum: {
    // нижний отступ меньше 0 растягиваеться на все
    set: function set(value) {
      if (this._nizNum != value) {
        this._nizNum = value;
        var h = this._height;
        this._height = -1;
        this.height = h;
      }
    },
    get: function get() {
      return this._nizNum;
    }
  },
  notBac: {
    // нижний отступ меньше 0 растягиваеться на все
    set: function set(value) {
      if (this._notBac != value) {
        this._notBac = value;
        this.image.visible = !this._notBac;
      }
    },
    get: function get() {
      return this._notBac;
    }
  },
  kontur: {
    // контур вокруг контента
    set: function set(value) {
      if (this._kontur != value) {
        this._kontur = value;
        this.draw102();
      }
    },
    get: function get() {
      return this._kontur;
    }
  },
  width: {
    // ширина
    set: function set(value) {
      if (this._width != value) {
        this._width = value;
        this.image.width = value;
        this.draw102();
      }
    },
    get: function get() {
      return this._width;
    }
  },
  height: {
    // высота
    set: function set(value) {
      if (this._height != value) {
        this._height = value;

        if (this._nizNum <= 0) {
          this.image.height = value;
          this.image.y = 0;
        } else {
          if (this._height > this._nizNum) {
            this.image.height = this._nizNum;
            this.image.y = this._height - this._nizNum;
          } else {
            this.image.height = value;
            this.image.y = 0;
          }
        }

        this.draw102();
      }
    },
    get: function get() {
      return this._height;
    }
  },
  color: {
    // цвет подложки снизу
    set: function set(value) {
      if (this._color != value) {
        this._color = value;
        this.draw102();
      }
    },
    get: function get() {
      return this._color;
    }
  },
  color1: {
    // цвет контура
    set: function set(value) {
      if (this._color1 != value) {
        this._color1 = value;
        this.draw102();
      }
    },
    get: function get() {
      return this._color1;
    }
  },
  visiLine: {
    // цвет контура
    set: function set(value) {
      if (this._visiLine != value) {
        this._visiLine = value;
        this.graphLine.visible = this._visiLine;
      }
    },
    get: function get() {
      return this._visiLine;
    }
  }
});

function PLImage(cont, _x, _y, _linkStart, fun) {
  PIXI.Container.call(this);
  var self = this;
  this.type = 'PLImage';
  cont.addChild(this);
  pl102.addElement(this);
  this.fun = fun;
  this.x = _x || 0;
  this.y = _y || 0;
  this._width = 100;
  this._height = 100;
  this._otstup = 0; // отступ картинки от краев рамки

  this._preloaderBool = false;
  this.picWidth = 0; // реальные размеры картинки

  this.picHeight = 0; // реальные размеры картинки
  // TODO при отсутствие выдает ошибку, текстура не устпевает загрузиться

  this.image = new Image();
  this.interactive = false;
  this.sprite = null;
  this.funError = null;
  this.label = null;
  this.linkOld = null;

  this.loadError = function () {
    if (self.funError) self.funError();
  };

  this.loadComplit = function (texture) {
    self.image = texture.baseTexture.source;
    self.isLoaded = true;
    self.picWidth = texture.width;
    self.picHeight = texture.height;
    if (self.sprite) self.sprite.destroy();
    self.sprite = new PIXI.Sprite(texture);
    self.sprite.interactive = self.interactive;
    self.sprite.visible = true;
    self.addChild(self.sprite);
    self.otstup = self._otstup;
    self.width = self._width;
    self.height = self._height;

    if (self.label) {
      self.removeChild(self.label);
      delete self.label;
      self.label = undefined;
    }

    if (self._preloaderBool) {
      self.preloader.visible = false;
      self.preloader.activ = false;
    }

    if (self.funComplit) self.funComplit();
    if (self.fun) self.fun();
  };

  this.preloader = null;

  this.load = function () {
    if (this._preloaderBool && this.sprite) {
      // если есть прелоадер нужно убрать старую картинку
      this.sprite.visible = false;
    }

    this.isLoaded = false;
    if (!this._link || this._link === 'null') return;

    if (this._preloaderBool && !this.preloader) {
      this.preloader = new PLPreloader(this, 0, 0);
      pl102.removeElement(this.preloader, true);
    }

    if (this._preloaderBool) {
      this.preloader.width = this._width;
      this.preloader.height = this._height;
      this.preloader.activ = true;
      this.preloader.visible = true;
    }

    pl102.loaderTexture.clearFun(this.linkOld, this.loadComplit);
    pl102.loaderTexture.getTexture(this._link, this.loadComplit, this.loadError);
    this.linkOld = this._link;
  };

  this.clear = function () {
    if (self.sprite) {
      self.sprite.destroy();
      delete self.sprite;
    }

    this.destroy();
  };

  if (_linkStart) this.link = _linkStart;
}

PLImage.prototype = Object.create(PIXI.Container.prototype);
PLImage.prototype.constructor = PLImage;
Object.defineProperties(PLImage.prototype, {
  link: {
    set: function set(value) {
      if (this._link === value) return;
      this._link = value;
      this.load();
    },
    get: function get() {
      return this._link;
    }
  },
  width: {
    set: function set(value) {
      this._width = value;

      if (this.sprite) {
        this.sprite.scale.x = (this._width - this._otstup * 2) / this.picWidth;
        this.sprite.position.x = this._otstup;
      }

      if (this._preloaderBool == true) if (this.preloader) this.preloader.width = this._width;
    },
    get: function get() {
      return this._width;
    }
  },
  height: {
    set: function set(value) {
      this._height = value;

      if (this.sprite) {
        this.sprite.scale.y = (this._height - this._otstup * 2) / this.picHeight;
        this.sprite.position.y = this._otstup;
      }

      if (this._preloaderBool == true) if (this.preloader) this.preloader.height = this._height;
    },
    get: function get() {
      return this._height;
    }
  },
  otstup: {
    set: function set(value) {
      this._otstup = value;
      this.width = this._width;
      this.height = this._height;
    },
    get: function get() {
      return this._otstup;
    }
  }
});

function PLLabel(cont, _x, _y, _text) {
  PIXI.Container.call(this);
  this.type = 'PLLabel';
  if (cont != undefined) cont.addChild(this);
  this.content = new PIXI.Container();
  this.addChild(this.content);
  var self = this;
  pl102.addElement(this);
  this.funSetText;
  this.x = _x;
  this.y = _y;
  this._bold = true;
  this._text = _text;
  this._height = pl102.wh;
  this._width = 100;
  this._boolTin = false;
  this._fontSize;
  if (this._text == undefined) this._text = 'text';
  if (this._text == null) this._text = 'text';
  if (this._text.length == 0) this._text = ' ';
  this.curW; // длина текста

  this.curH;
  this.style = {};

  for (var s in pl102.style) {
    this.style[s] = pl102.style[s];
  }

  this._align = this.style.align = 'center';
  this._fontFamily = this.style.fontFamily;
  this._fontSize = this.style.fontSize;
  this._color = this.style.fill;
  this._fontStyle = this.style.fontStyle;
  this.label = new PIXI.Text(this._text, this.style);
  this.label.resolution = 1.11; // FIXME размытие шрифтов везде, нашел решение в интрнете наполовину норм, наполовину каличное

  this.label.shader = null; // FIXME эта половина каличная

  this._font = this._fontSize = this.label.style.fontSize;
  this.curW = this.label.width;
  this.curH = this.label.height;
  this.content.addChild(this.label);
  this._color = this.label.style.fill;

  this.setParam = function (_font, _color, _boolTin) {
    this._color = _color;
    this.style.fill = _color;
    this.font = _font;
    this.boolTin = _boolTin;
  };

  this.getRect = function () {
    return this.label.getBounds();
  };

  this.kill = function () {
    this.removeChild(this.label);
    this.label = null;
  };

  this.updateHeight = function () {
    var r = this.label.getBounds();
    this._height = r.height;
  };

  this.updateHeight();
  this.strColor;
  this.strColor2;
}

PLLabel.prototype = Object.create(PIXI.Container.prototype);
PLLabel.prototype.constructor = PLLabel;
Object.defineProperties(PLLabel.prototype, {
  boolTin: {
    set: function set(value) {
      if (value != this._boolTin) {
        if (value == true) {
          this.style.dropShadow = true;
          this.style.dropShadowColor = '#000000';
          this.style.dropShadowBlur = 4;
          this.style.dropShadowAngle = Math.PI / 6;
          this.style.dropShadowDistance = 2;
        } else {
          delete this.style.dropShadow;
          delete this.style.dropShadowColor;
          delete this.style.dropShadowBlur;
          delete this.style.dropShadowAngle;
          delete this.style.dropShadowDistance;
        }

        this.label.style = this.style;
        this._boolTin = value;
      }
    },
    get: function get() {
      return this._boolTin;
    }
  },
  fontSize: {
    set: function set(value) {
      this._fontSize = value;
      this.font = value;
    },
    get: function get() {
      return this._fontSize;
    }
  },
  text: {
    set: function set(value) {
      this._text = value; // TODO разобратса почему не воспринимает цифру 0

      if (value === 0) this._text = value + '';
      this.label.text = this._text;
      this.curW = this.label.width;
      this.curH = this.label.height;
      this.updateHeight();
      if (this.funSetText) this.funSetText();
    },
    get: function get() {
      return this._text;
    }
  },
  fontFamily: {
    set: function set(value) {
      this._fontFamily = value;
      this.style.fontFamily = value;
      this.label.style = this.style;
    },
    get: function get() {
      return this._fontFamily;
    }
  },
  font: {
    set: function set(value) {
      this._font = value;
      this.style.fontSize = value;
      this.label.style = this.style;
      this.updateHeight();
    },
    get: function get() {
      return this._font;
    }
  },
  bold: {
    set: function set(value) {
      this._bold = value;
      if (this._bold == true) this.style.fontStyle = 'bold';else this.style.fontStyle = 'normal';
      this.label.style = this.style;
    },
    get: function get() {
      return this._bold;
    }
  },
  color: {
    set: function set(value) {
      if (this._color != value) {
        this.strColor = value + '';
        this._color = value;

        if (this.strColor.length > 2) {
          if (this.strColor[1] == 'x') {
            this.strColor2 = '#';

            for (var i = 2; i < this.strColor.length; i++) {
              this.strColor2 += this.strColor[i];
            }

            this._color = this.strColor2;
          }
        }

        this.label.style.fill = this._color;
        this.style.fill = this._color;
      }
    },
    get: function get() {
      return this._color;
    }
  },
  width: {
    set: function set(value) {
      this._width = value;
    },
    get: function get() {
      return this._width;
    }
  },
  height: {
    set: function set(value) {
      this._height = value;
    },
    get: function get() {
      return this._height;
    }
  },
  align: {
    set: function set(value) {
      this._align = value;
      this.style.align = value;
      this.label.style = this.style;
    },
    get: function get() {
      return this._align;
    }
  }
});

function PLButton(cont, _x, _y, text, fun, _link) {
  PIXI.Container.call(this);
  this.type = 'PLButton';
  if (cont) cont.addChild(this);
  var self = this;
  pl102.addElement(this);
  this.x = _x || 0;
  this.y = _y || 0;
  this.fun = fun;
  this.funOver;
  this.funOut;
  this.funActiv;
  this.funDown;
  this.funDownFile;
  this.funSetText;
  self.funError = undefined;
  this._width = 100;
  this._height = pl102.wh;
  this._color = pl102.colorButton;
  this._color1 = pl102.colorButton1;
  this._activ = false;
  this._visiblePanel = true;
  this._boolKontur = false; // показывать ли контур

  this._otstup = 0; // отступ картинки от краев

  this._boolProp = true; // масштабировать ли картинку

  this.boolCenter = false; // центрировать ли картинку

  this._okDown = true;
  this._boolAnimKontut = true; // Мигание контура при наведении

  this._activMouse = true;
  this._labelOtstup = null;
  this.boolScalePic = false;
  this.contentPanel = new PIXI.Container();
  this.addChild(this.contentPanel);
  this.panel = new PLPanel(this.contentPanel, 0, 0);
  pl102.removeElement(this.panel, true);
  this.panel.height = this._height;
  this.panel.kontur = false;
  this.panel.color = this._color;
  this.panel.nizNum = 0;
  this.panel.nizAlpha = 0.7;
  this.panel1 = new PLPanel(this.contentPanel, 0, 0);
  pl102.removeElement(this.panel1, true);
  this.panel1.height = this._height;
  this.panel1.kontur = false;
  this.panel1.visible = false;
  this.panel1.link = pl102.base2;
  this.panel1.color = this._color1;
  this.panel1.nizNum = 0;
  this.panel1.nizAlpha = 1;
  this.gPlus = new PIXI.Graphics(); // Для дебаг отрисовки

  this.addChild(this.gPlus);
  this.contentFilt = new PIXI.Container();
  this.addChild(this.contentFilt);
  this.tween = new TWEEN.Tween(this.contentFilt);
  this._text = text;
  if (this._text == undefined) this._text = 'text';
  if (this._text == null) this._text = 'text';
  this.label = new PLLabel(this.contentFilt, 5, 5, this._text);
  pl102.removeElement(this.label, true);
  if (this._text.length == 0) this.label.visible = false;
  this.graphF = new PIXI.Graphics();
  this.contentFilt.addChild(this.graphF);
  this.contShap = new PIXI.Container();
  this.contentFilt.addChild(this.contShap); // контейнер поверх всех

  this.contDop = new PIXI.Container();
  this.addChild(this.contDop);
  this.image;
  this.filt = pl102.filter;
  this.label.setParam(this.label.font, 0xffffff, true);
  this.rect = this.label.getBounds();
  this.graphInter = new PIXI.Graphics();
  this.addChild(this.graphInter);
  self.tipBut = 0; /// Графика, накрывающая кнопку

  this.graphRect = new PIXI.Graphics();
  this.addChild(this.graphRect);
  this.graphRect.alpha = 0.5;
  this.graphRect.visible = false;
  this.graphRect.interactive = true; // побстаиваем ширину под текст

  this.textWidth = function (_otstup) {
    var otstup = _otstup || 0;
    this.width = this.rect.width / this.worldTransform.a + 10 + otstup;
  };

  var ratio;
  this.konturSize = pl102.kontur;
  this.konturColor = pl102.colorSlid;

  this.draw102 = function () {
    this.graphInter.clear();
    this.graphInter.beginFill(0xff0000, 0);
    this.graphInter.drawRect(0, 0, this._width, this._height);

    if (this._boolKontur) {
      this.graphInter.lineStyle(this.konturSize, this.konturColor, 1); // pl102.color1

      this.graphInter.drawRect(0.5, 0.5, this._width, this._height);
    }

    this.graphF.clear();
    this.graphF.beginFill(0xffffff, 0.01);
    this.graphF.drawRect(0, 0, this._width, this._height);

    if (this._labelOtstup == null) {
      this.label.x = (this._width - this.rect.width) / 2;
      if (this.label.x < 5) this.label.x = 5;
    } else {
      this.label.x = this._labelOtstup;
    }

    this.label.y = (this._height - this.rect.height) / 2;

    if (this.image != undefined) {
      this.label.x = this._height + 5;

      if (this.boolScalePic) {
        ratio = this.image.picWidth / this._width;
        if (ratio < this.image.picHeight / this._height) ratio = this.image.picHeight / this._height;
        this.image.width = this.image.picWidth / ratio;
        this.image.height = this.image.picHeight / ratio;
        this.image.x = (this._width - this.image.width) / 2;
        this.image.y = (this._height - this.image.height) / 2;
      }
    }

    if (this._width > this._height) {
      this.contShap.scale.x = this.contShap.scale.y = this._height / 100;
      this.contShap.x = (this._width - this._height) / 2;
      this.contShap.y = 0;
    } else {
      this.contShap.scale.x = this.contShap.scale.y = this._width / 100;
      this.contShap.x = 0;
      this.contShap.y = (this._height - this._width) / 2;
    }

    this.graphRect.clear();
    this.graphRect.beginFill(pl102.color);
    this.graphRect.drawRect(0, 0, this._width, this._height);
    this.graphRect.endFill();
  };

  this.mouseOut = function (e) {
    if (self._boolAnimKontut == true) {
      self.panel.kontur = false;
      self.panel1.kontur = false;
    }

    if (self.funOut) self.funOut(e);
  };

  this.mouseOver = function (e) {
    if (self._boolAnimKontut == true) {
      self.panel.kontur = true;
      self.panel1.kontur = true;
    }

    self.contentFilt.alpha = 0.5;
    self.tween.to({
      alpha: 1
    }, 500);
    self.tween.start();
    if (self.funOver) self.funOver(e);
  };

  this.onDown = function (e) {
    if (self.file != undefined) {
      self.file.click();
      if (self.funDownFile) self.funDownFile();
      return;
    }

    if (self.funDown) self.funDown();
    if (self.fun) self.fun();
    self.tipBut = 1;
    self.draw102();

    if (pl102.isMouseEvents) {
      pl102.stage.on('mouseup', self.mouseUp);
    }

    if (pl102.isTouchEvents) {
      pl102.stage.on('touchend', self.mouseUp);
    }
  };

  this.funUp;

  this.mouseUp = function (e) {
    self.tipBut = 0;
    self.draw102();

    if (self.funUp != undefined) {
      self.funUp();
    }

    if (pl102.isMouseEvents) {
      pl102.stage.off('mouseup', self.mouseUp);
    }

    if (pl102.isTouchEvents) {
      pl102.stage.off('touchend', self.mouseUp);
    }
  };

  this.setStile = function (num, _w, _h) {
    if (num == 0) {
      this.label.setParam(14, pl102.style.fill);
      this.panel.nizAlpha = 0.7;
      this.panel.nizNum = 0;
      this.color = pl102.colorButton;
    }

    if (num == 1) {
      this.label.setParam(14, pl102.style.fill);
      this.panel.nizAlpha = 0.25;
      this.panel.nizNum = 30;
      this.color = 0xf0f0f0;
    }

    if (_w) this.width = _w;
    if (_h) this.height = _h;
  };

  this.file;

  this.startFile = function (accept) {
    if (this.file == undefined) {
      this.file = document.createElement('input');
      this.file.type = 'file';
      if (accept) this.file.accept = accept; // "image/*";

      this.file.style.display = 'none';
      this.file.onchange = this.onchange;
    }
  };

  this.result;
  this.files; // files

  this.onchange = function (e) {
    if (e.target.files.length == 0) return; // нечего не выбрали

    self.files = e.target.files;
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.onload = function (_e) {
      self.result = _e.target.result;
      if (self.fun) self.fun(self.result);
      self.file.value = null;
    };
  };

  this.addCont100 = function (cont) {
    this.contShap.addChild(cont);
  };

  this.complitLoadImage = function () {
    if (self.funComplit) self.funComplit();
    self.otstup = self._otstup; //
  };

  this.funErrorImage = function () {
    if (self.funError) self.funError();
  };

  var propI;
  var propE;
  var w, h;
  this.link;

  this.loadImeg = function (link) {
    if (this.link == link) return;
    this.link = link;

    if (this.image == undefined) {
      this.image = new PLImage(this.contentFilt, 0, 0, undefined, function () {
        if (self._boolProp) {
          w = this.image.width;
          h = this.image.height;
          propE = self._height / self._width;
          propI = this.image.height / this.image.width;

          if (propE > propI) {
            this.height = h * (self._width / w);
            this.width = self._width;
          } else {
            this.width = w * (self._height / h);
            this.height = self._height;
          }

          if (self.boolCenter) {
            this.x = (self._width - this._width) / 2;
            this.y = (self._height - this._height) / 2;
          }
        } else {
          this.width = self._height;
          this.height = self._height;
        }

        self.draw102();
      });
      pl102.removeElement(this.image, true);
      this.image._preloaderBool = true;
      this.image.funComplit = this.complitLoadImage;
      this.image.funError = self.funErrorImage;
    }

    if (self._height < self._width) this.image.width = this.image.height = self._height;else this.image.width = this.image.height = self._width;
    this.image.link = link;
    this.draw102();
  };

  this.kill = function () {};

  if (_link != undefined) {
    this.loadImeg(_link);
  } else {
    this.draw102();
  }

  this._okDown = false;
  this.okDown = true;
}

PLButton.prototype = Object.create(PIXI.Container.prototype);
PLButton.prototype.constructor = PLButton;
Object.defineProperties(PLButton.prototype, {
  visiblePanel: {
    set: function set(value) {
      this._visiblePanel = value;
      this.contentPanel.visible = value;
    },
    get: function get() {
      return this._visiblePanel;
    }
  },
  width: {
    set: function set(value) {
      if (this._width == value) return;
      this._width = value;
      this.panel.width = value;
      this.panel1.width = value;
      this.draw102();
    },
    get: function get() {
      return this._width;
    }
  },
  height: {
    set: function set(value) {
      if (this._height == value) return;
      this._height = value;
      this.panel.height = value;
      this.panel1.height = value;
      this.draw102();
    },
    get: function get() {
      return this._height;
    }
  },
  boolAnimKontut: {
    set: function set(value) {
      this._boolAnimKontut = value;

      if (this._boolAnimKontut == true) {
        this.panel.kontur = false;
        this.panel1.kontur = false;
      } else {
        this.panel.kontur = true;
        this.panel1.kontur = true;
      }
    },
    get: function get() {
      return this._boolAnimKontut;
    }
  },
  activ: {
    set: function set(value) {
      if (this._activ != value) {
        this._activ = value;
        this.panel.visible = !value;
        this.panel1.visible = value;
        if (this.funActiv) this.funActiv();
      }
    },
    get: function get() {
      return this._activ;
    }
  },
  color: {
    set: function set(value) {
      this._color = value;
      this.panel.color = value;
    },
    get: function get() {
      return this._color;
    }
  },
  color1: {
    set: function set(value) {
      this._color1 = value;
      this.panel1.color1 = value;
    },
    get: function get() {
      return this._color1;
    }
  },
  activMouse: {
    set: function set(value) {
      if (this._activMouse == value) return;
      this._activMouse = value;
      this.graphRect.visible = !this._activMouse;
    },
    get: function get() {
      return this._activMouse;
    }
  },
  text: {
    set: function set(value) {
      this._text = value;
      if (this._text.length == 0) this.label.visible = false;else this.label.visible = true;
      this.label.text = this._text;
      if (this._text == undefined) this._text = 'text';
      if (this._text == null) this._text = 'text';
      if (this._text.length == 0) this._text = ' ';
      this.rect = this.label.getBounds();
      this.rect.width /= this.worldTransform.a;
      this.rect.height /= this.worldTransform.a;
      this.draw102();
      if (this.funSetText) this.funSetText();
    },
    get: function get() {
      return this._text;
    }
  },
  boolKontur: {
    set: function set(value) {
      this._boolKontur = value;
      this.draw102();
    },
    get: function get() {
      return this._boolKontur;
    }
  },
  otstup: {
    set: function set(value) {
      this._otstup = value;
      if (this.image) this.image.otstup = this._otstup;
    },
    get: function get() {
      return this._otstup;
    }
  },
  boolProp: {
    set: function set(value) {
      this._boolProp = value;
    },
    get: function get() {
      return this._boolProp;
    }
  },
  okDown: {
    set: function set(value) {
      if (this._okDown != value) {
        this._okDown = value;

        if (this._okDown == true) {
          this.graphInter.interactive = true;
          this.graphInter.buttonMode = true;

          if (pl102.isMouseEvents) {
            this.graphInter.on('mousedown', this.onDown);
            this.graphInter.on('mouseout', this.mouseOut);
            this.graphInter.on('mouseover', this.mouseOver);
          }

          if (pl102.isTouchEvents) {
            this.graphInter.on('touchstart', this.onDown);
          }
        } else {
          this.graphInter.interactive = false;
          this.graphInter.buttonMode = false;

          if (pl102.isMouseEvents) {
            this.graphInter.off('mousedown', this.onDown);
            this.graphInter.off('mouseout', this.mouseOut);
            this.graphInter.off('mouseover', this.mouseOver);
          }

          if (pl102.isTouchEvents) {
            this.graphInter.off('touchstart', this.onDown);
          }
        }
      }
    },
    get: function get() {
      return this._okDown;
    }
  },
  labelOtstup: {
    set: function set(value) {
      if (this._labelOtstup === value) return;
      this._labelOtstup = value;
      this.label.x = this._labelOtstup;
    },
    get: function get() {
      return this._labelOtstup;
    }
  }
});

function PLPreloader(cont, _x, _y) {
  PIXI.Container.call(this);
  this.type = 'PLPreloader';
  cont.addChild(this);
  var self = this;
  pl102.addElement(this);
  this.x = _x || 0;
  this.y = _y || 0;
  this._width = 100;
  this._height = 100;
  this._wh = 64;
  this._podlog = false;
  this._centor = false;
  this._time = 16; // тайм сеттаймера

  this._color = pl102.color;
  this._colorLine = pl102.color1;
  this.angelPlus = 6 * (Math.PI / 180); // шаг поворота

  this.image;
  this.contD = new PIXI.Container();
  this.graphics = new PIXI.Graphics();
  this.contD.addChild(this.graphics);
  this.graphics.visible = false;
  this.addChild(this.contD);
  this.contDrag = new PIXI.Container();
  this.contD.addChild(this.contDrag);
  this.sprite;

  this.drawPod = function () {
    if (this._podlog == true) {
      this.graphics.clear();
      this.graphics.beginFill(this._color, 0.2);
      this.graphics.lineStyle(1, this._color1, 0.2);
      this.graphics.drawRect(0, 0, this._width, this._height);
    }
  };

  this.draw = function () {
    self.drawPod();
    self.contDrag.position.x = self._width / 2;
    self.contDrag.position.y = self._height / 2;

    if (this._centor == true) {
      this.contD.x = -self._width / 2;
      this.contD.y = -self._height / 2;
    } else {
      this.contD.x = 0;
      this.contD.y = 0;
    }
  };

  var p, p1;

  this.korect = function () {
    if (this._width > this._height) {
      p = this._height;
    } else {
      p = this._width;
    }

    p *= 0.8;
    if (p > this._wh) p = this._wh;
    if (p < 1) p = 1;
    this.contDrag.scale.x = this.contDrag.scale.y = p / 100;
  };

  this.loadComplit = function (texture) {
    self.picWidth = texture.width;
    self.picHeight = texture.height;
    self.sprite = new PIXI.Sprite(texture);
    self.sprite.interactive = false;
    self.contDrag.addChild(self.sprite);
    self.sprite.width = 100;
    self.sprite.height = 100;
    self.sprite.x = -50;
    self.sprite.y = -50;
    self.korect();
    self.draw();
  };

  pl102.loaderTexture.getTexture(pl102.base3, this.loadComplit);

  this.dragerRotation = function () {
    self.contDrag.rotation += self.angelPlus;
  };

  this.timer;

  this.setInt = function () {
    clearInterval(this.timer);

    if (this._activ == true) {
      this.timer = setInterval(this.dragerRotation, this._time);
    }
  };

  this.clear = function () {
    this.activ = false;
    this.contD.removeChild(this.graphics);
    this.graphics.destroy();
    delete this.graphics;
    self.contDrag.removeChild(self.sprite);
    self.image.onload = undefined;
    delete this.image;
    this.contD.removeChild(this.contDrag);
    this.contDrag.destroy();
    this.removeChild(this.contD);
    this.contD.destroy();
    this.destroy();
  };

  this.activ = true;
}

PLPreloader.prototype = Object.create(PIXI.Container.prototype);
PLPreloader.prototype.constructor = PLPreloader;
Object.defineProperties(PLPreloader.prototype, {
  wh: {
    set: function set(value) {
      if (this._wh != value) {
        this._wh = value;
        this.korect();
      }
    },
    get: function get() {
      return this._wh;
    }
  },
  podlog: {
    set: function set(value) {
      if (this._podlog != value) {
        this._podlog = value;
        this.graphics.visible = value;
        this.drawPod();
      }
    },
    get: function get() {
      return this._podlog;
    }
  },
  centor: {
    set: function set(value) {
      if (this._centor != value) {
        this._centor = value;
        this.draw();
      }
    },
    get: function get() {
      return this._centor;
    }
  },
  activ: {
    set: function set(value) {
      if (value != this._activ) {
        this._activ = value;
        this.visible = value;
        this.setInt(value);
      }
    },
    get: function get() {
      return this._activ;
    }
  },
  width: {
    set: function set(value) {
      if (this._width != value) {
        this._width = value;
        this.korect();
        this.draw();
      }
    },
    get: function get() {
      return this._width;
    }
  },
  height: {
    set: function set(value) {
      if (this._height != value) {
        this._height = value;
        this.korect();
        this.draw();
      }
    },
    get: function get() {
      return this._height;
    }
  }
});

function PLSlider(cont, _x, _y, fun) {
  PIXI.Container.call(this);
  cont.addChild(this);
  this.type = 'PLSlider';
  var self = this;
  pl102.addElement(this);
  this.fun = fun;
  this.x = _x;
  this.y = _y;
  this.whMin = pl102.whMin;
  this.lineTrick = 1;
  this.otstup = 2;
  this.otstupMin = 3;
  this.debugRect = false;
  this.whPan = 12;
  this.wh = 18;
  this._height = 22;
  this._width = 100;
  this._value = 0;
  this._angle = 0;
  this._activMouse = true;
  this._color1 = pl102.color;
  this.color2 = 0xa2a1a1; // pl102.colorSlid  // правая панель при движении кнопки

  this.color3 = 0x717171; // pl102.colorSlid1 // левая панель при движении кнопки

  this.color4 = 0x444444; // линиия сверху

  this.color5 = 0x858585; // слева справа линии

  var imgBtn = 'data:image/png;base64,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';
  this.content = new PIXI.Container();
  this.addChild(this.content); // графика в местах прилипания

  this.contPrilip = new PIXI.Container();
  this.addChild(this.contPrilip);
  this.panel = new PLPanel(this.content, 0, 0);
  pl102.removeElement(this.panel, true);
  this.panel.width = this._width - this.wh;
  this.panel.height = this.whPan;
  this.panel.color = this.color2;
  this.panel.kontur = false;
  this.panel.nizAlpha = 0.01;
  this.panel2 = new PLPanel(this.content, 0, 0);
  pl102.removeElement(this.panel2, true);
  this.panel2.width = 0;
  this.panel2.height = this.whPan;
  this.panel2.color = this.color3;
  this.panel2.kontur = false;
  this.panel2.nizAlpha = 0;
  this.panel2.addChild(this.contPrilip);
  var graphLines = new PIXI.Graphics();
  this.content.addChild(graphLines);

  this.draw = function () {
    this.wh = this.but.width;
    var x = 0;
    var y = this.wh / 2 - this.whPan / 2;
    var w = this._width;
    var h = this.whPan;
    this.panel.width = w;
    this.button.width = w;
    this.button.x = x;
    this.panel.x = x;
    this.panel.y = y;
    this.panel2.x = x;
    this.panel2.y = y;
    this.contPrilip.x = this.wh / 2;
    graphLines.clear();
    graphLines.beginFill(this.color4);
    graphLines.drawRect(x, y, w, this.lineTrick);
    graphLines.beginFill(this.color3);
    graphLines.drawRect(x, y + 1, w, this.lineTrick);
    graphLines.beginFill(this.color5);
    graphLines.drawRect(x, y, this.lineTrick, h);
    graphLines.drawRect(this._width - 1, y, this.lineTrick, h);
    graphLines.beginFill(this.color2);
    graphLines.drawRect(x, y + h - 1, w, this.lineTrick);
    if (this.debugRect) this.drawDebugRect();
  };

  var debugGraph = new PIXI.Graphics();
  this.content.addChild(debugGraph);

  this.drawDebugRect = function () {
    debugGraph.clear();
    debugGraph.lineStyle(1, 0xff0000);
    debugGraph.drawRect(0, 0, this._width, this._height);
  };

  this.button = new PLButton(this.content, 0, (this.wh - this.whMin) / 2, '', function () {
    self.mouseD();
  });
  pl102.removeElement(this.button, true);
  this.button.height = this.whMin;
  this.button.width = this._width;
  this.button.alpha = 0;

  this.button.funUp = function () {
    if (self.funUp) self.funUp();
  };

  this.but = new PLButton(this.content, 0, 0, '', function () {
    self.onDragStart();
  });
  pl102.removeElement(this.but, true);
  this.but.height = this.wh;
  this.but.width = this.wh;
  this.but.x = -this.otstupMin; // this.but.color = pl102.color2;

  this.but.otstup = 0;
  this.but.loadImeg(imgBtn);
  this.but.visiblePanel = false;

  this.but.funComplit = function () {
    this.width = this.image.picWidth;
    this.height = this.image.picHeight;
    self.draw();
  };

  this.onDragStart = function () {
    if (pl102.isMouseEvents) {
      pl102.stage.off('mouseup', self.onDragEnd);
      pl102.stage.off('mousemove', self.onDragMove);
      pl102.stage.on('mouseup', self.onDragEnd);
      pl102.stage.on('mousemove', self.onDragMove);
    }

    if (pl102.isTouchEvents) {
      pl102.stage.off('touchend', self.onDragEnd);
      pl102.stage.off('touchmove', self.onDragMove);
      pl102.stage.on('touchend', self.onDragEnd);
      pl102.stage.on('touchmove', self.onDragMove);
    }

    if (self.funDown) self.funDown();
  };

  var v, v1;
  var ppp = new PIXI.Point(0, 0);
  var pEnd = new PIXI.Point(0, 0);
  var pp;

  this.onDragMove = function (e) {
    v = (self.toLocal(pl102.global).x - self.wh / 2) / ((self._width - self.wh) / 100);

    if (v != self._value) {
      self.value = v;
      if (self.fun) self.fun();
    }
  };

  this.onDragEnd = function (e) {
    if (pl102.isMouseEvents) {
      pl102.stage.off('mouseup', self.onDragEnd);
      pl102.stage.off('mousemove', self.onDragMove);
    }

    if (pl102.isTouchEvents) {
      pl102.stage.off('touchend', self.onDragEnd);
      pl102.stage.off('touchmove', self.onDragMove);
    }

    if (self.funUp) self.funUp();
  }; // получить дистанцию между точками


  this.getDistance = function (p1, p2) {
    p2 = p2 || rezNull;
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
  };

  this.mouseD = function () {
    v = (self.toLocal(pl102.global).x - self.but.width / 2) / ((self._width - self.but.width) / 100);

    if (v != self._value) {
      self.value = v;
      if (self.fun) self.fun();
    }

    if (self.funDown) self.funDown();
  }; /// Графика, накрывающая весь чек-бокс


  this.graphActivM = new PIXI.Graphics();
  this.addChild(this.graphActivM);
  this.graphActivM.alpha = 0;
  this.graphActivM.interactive = true;
  this.graphBut = new PIXI.Graphics();
  this.addChild(this.graphBut);
  this.graphBut.alpha = 0.3;
  this.graphBut.interactive = true;

  this.changeActiv = function () {
    if (!this._activMouse) {
      this.graphActivM.clear();
      this.graphActivM.beginFill(this._color);
      this.graphActivM.drawRect(0, 0, this._width, this._height);
      this.graphActivM.endFill();
      this.graphBut.clear();
      this.graphBut.lineStyle(1, this._color1);
      this.graphBut.beginFill(this._color1);
      this.graphBut.drawCircle(this.but.x + this.but.width * 0.51, this.but.y + this.but.height * 0.52, this.but.width * 0.46);
      this.graphBut.endFill();
      this.panel.alpha = this.panel2.alpha = 0.5;
    } else {
      this.graphActivM.clear();
      this.graphBut.clear();
      this.panel.alpha = this.panel2.alpha = 1;
    }
  };

  this.draw();
}

PLSlider.prototype = Object.create(PIXI.Container.prototype);
PLSlider.prototype.constructor = PLSlider;
Object.defineProperties(PLSlider.prototype, {
  value: {
    set: function set(_value) {
      if (this._value == _value) return;
      this._value = _value;
      if (this._value < 0) this._value = 0;
      if (this._value > 100) this._value = 100;
      this.but.x = (this._width - this.wh) * (this._value / 100) - this.otstupMin * (1 - this._value / 100 * 2);
      this.panel2.width = (this._width - this.wh / 2) * (this._value / 100) - this.otstupMin * (1 - this._value / 100 * 2);
      this.changeActiv();
    },
    get: function get() {
      return this._value;
    }
  },
  width: {
    set: function set(value) {
      if (this._width == value) return;
      this._width = value;
      this.draw();
    },
    get: function get() {
      return this._width;
    }
  },
  height: {
    set: function set(value) {
      if (this._height == value) return;
      this._height = value;
      this.draw();
    },
    get: function get() {
      return this._height;
    }
  },
  activMouse: {
    set: function set(value) {
      if (this._activMouse == value) return;
      this._activMouse = value;
      this.changeActiv();
    },
    get: function get() {
      return this._activMouse;
    }
  }
});

function PLSliderBig(cont, _x, _y, title, fun, min, max) {
  PIXI.Container.call(this);
  cont.addChild(this);
  this.type = 'PLSliderBig';
  var self = this;
  pl102.addElement(this);
  this.fun = fun;
  this.funUp;
  this.funDown;
  this.inputUp;
  this.x = _x;
  this.y = _y;
  this.debugRect = false;
  this.okrug = 1; // округление value

  this.otstup = 14; // отступ слидера до инпута

  this.otstup1 = 17; // отступ для слидера

  this.otstup2 = 7; // отступ инпута

  this.otstup3 = 13; // отступ для текста после инпута по y

  this.otstup4 = 0; // отступ для основного текста

  this.otstup5 = 5; // отступ для текста после инпута по х

  this.slidProc = 0.655; // ширина слидера в процентах

  this.wh = 27;
  this.isDinamMinMax = true;
  this.color1 = pl102.color;
  this.color2 = pl102.color1;
  this._width = 100;
  this._height = 51;
  this._value = 0;
  this._angle = 0;
  this._activMouse = true;
  this._plusText = null;
  var fact = 0.65;
  var fontS = 13;
  this.notInp = false;
  if (title == undefined) title = '----';
  this._title = title;
  if (min == undefined) min = 0;
  this._min = min;
  if (max == undefined) max = 100;
  this._max = max;
  this._visiMinMax = false;
  this.tween = new TWEEN.Tween(this);

  this.getVector = function (length, angle, point) {
    if (point == undefined) var point = {
      x: 0,
      y: 0
    };
    if (length < 0) angle += Math.PI;
    point.x = Math.abs(length) * Math.cos(angle);
    point.y = Math.abs(length) * Math.sin(angle);
    return point;
  };

  this.pEnd = new PIXI.Point();
  this.pInp = new PIXI.Point();
  this.pEnd = this.getVector(this._width * 0.7, this.angle, this.pEnd);
  this.content = new PIXI.Container();
  this.addChild(this.content);
  this.v;
  this.slValue;
  var isOnPrilip = false;
  var prilipNum = null;
  this.slid = new PLSlider(this, 0, pl102.whText, function () {
    self.slValue = this.value;
    self.v = self._min + (self._max - self._min) * (this.value / 100);
    if (self._min == self._max) self.v = 0;
    var indexPrilip = -1;
    var dMin = 999999;
    var dif = 0;

    for (var i = 0; i < self.arrPrilip.length; i++) {
      if (self.arrPrilip[i].num <= self.v + self.arrPrilip[i].width / 2 && self.arrPrilip[i].num >= self.v - self.arrPrilip[i].width / 2) {
        dif = self.diffNum(self.arrPrilip[i].num, self.v);

        if (dif < dMin) {
          dMin = dif;
          indexPrilip = i;
        }
      }
    }

    if (indexPrilip != -1) {
      self.v = self.arrPrilip[indexPrilip].num;
      this.value = (self.v - self._min) / (self._max - self._min) * 100;
    }

    if (self.value != self.v) {
      self.value = self.v;
      if (self.fun != undefined) self.fun();
    }

    self.input.text = self.value;
  });

  this.diffNum = function (a, b) {
    if (a >= 0 && b >= 0) return Math.abs(a - b);
    if (a <= 0 && b <= 0) return Math.abs(Math.abs(a) - Math.abs(b));
    if (a <= 0 && b >= 0) return Math.abs(a) + b;
    if (a >= 0 && b <= 0) return a + Math.abs(b);
  };

  pl102.removeElement(this.slid, true);
  this.slid.okrug = this.okrug;
  this.slid.height = this.wh;
  this.slid.width = this._width * this.slidProc;
  this.label = new PLLabel(this, 0, 0, this._title);
  pl102.removeElement(this.label, true);
  this.rect = this.label.getRect();
  this.label.x = -1;
  this.label.y = -this.otstup4;
  this.label.bold = false;
  this.label.fontSize = fontS; // Массив точек прилипания

  this.arrPrilip = []; // Отрисовка точек прилипания

  this.drawPriliPoint = function (num) {
    this.slid.contPrilip.addChild(this.arrPrilip[this.arrPrilip.length - 1].graph);
    this.arrPrilip[num].graph.clear();
    this.arrPrilip[num].graph.lineStyle(2, pl102.color4);
    var lineX = (this.slid.width - this.slid.but.width) / (Math.abs(this._max) - this._min) * (-this._min + Number(this.arrPrilip[num].num)); // Первая точка

    this.arrPrilip[num].graph.moveTo(lineX, 0); // Вторая точка

    this.arrPrilip[num].graph.lineTo(lineX, 0 + this.slid.panel2.height);
  };

  this.slid.funDown = function () {
    if (self.funDown) self.funDown();
  };

  this.slid.funUp = function () {
    if (self.funUp) self.funUp(self);
  };

  this.input = new PLInput(this, this.slid.width, 0, '0', function () {
    if (this.text.indexOf(',') === 1) {
      var temp = this.text.split(',');
      this.text = temp[0] + '.' + temp[1];
    } else if (this.text.length > 3) this.text.slice(0, 3);

    var ss = this.text;
    self.value = this.text;

    if (self.notInp == true) {
      self._value = Math.round(ss * self.okrug) / self.okrug;
    }

    if (self.fun) self.fun();
    if (self.inputUp) self.inputUp();
    if (self.funUp) self.funUp();
  });
  this.input.isNumer = 0;
  pl102.removeElement(this.input, true);
  this.input.width = this._width * (1 - this.slidProc);
  this.input.height = this.wh;
  this.lblMin = new PLLabel(this.slid.panel, 0, 0, '' + this._min);
  this.lblMax = new PLLabel(this.slid.panel, 0, 0, '' + this._max);
  this.lblMin.interactiveChildren = this.lblMax.interactiveChildren = false;
  this.lblMin.visible = this.lblMax.visible = this._visiMinMax;
  this.lblMin.fontSize = this.lblMax.fontSize = 10;
  this.lblMin.alpha = this.lblMax.alpha = 0.6;
  this.labelSystem = undefined;

  this.setText = function (_text) {
    this.plusText = _text;
  };

  this.kill = function () {
    this.input.kill();
  };

  this.addPrilip = function (num, width) {
    this.arrPrilip.push({
      num: num,
      width: width,
      graph: new PIXI.Graphics()
    });
    this.drawPriliPoint(this.arrPrilip.length - 1);
  };

  this.clearPrilip = function () {
    for (var i = 0; i < this.arrPrilip.length; i++) {
      this.arrPrilip[i].graph.clear();
    }

    this.arrPrilip = [];
  }; /// Графика, накрывающая весь чек-бокс


  this.graphActivM = new PIXI.Graphics();
  this.slid.addChild(this.graphActivM);
  this.graphActivM.alpha = 0;
  this.graphBut = new PIXI.Graphics();
  this.slid.addChild(this.graphBut);
  this.graphBut.alpha = 0.3;

  this.changeActiv = function () {
    this.slid.activMouse = this._activMouse;
    this.input.activMouse = this._activMouse;

    if (!this._activMouse) {
      this.graphActivM.clear();
      this.graphActivM.beginFill(this._color);
      this.graphActivM.drawRect(0, 0, this._width, this.wh);
      this.graphActivM.endFill();
    } else {
      this.graphActivM.clear();
      this.graphBut.clear();
      this.slid.panel.alpha = this.slid.panel2.alpha = 1;
    }
  };

  this.textLength = function () {
    if (!this.labelSystem || !this.labelSystem.text) return 0;
    return this.labelSystem.text.length * fontS * fact;
  };

  this.changeSizeWidth = function () {
    var otst = this.textLength();

    if (this.labelSystem != undefined) {
      this.labelSystem.x = this._width - otst - this.otstup5; // ws + this.input.width + this.otstup5;

      this.labelSystem.y = this.otstup3;
    }

    otst += this.otstup5 * 2;
    var w = this._width;
    var ws = w * this.slidProc;
    var wi = w * (1 - this.slidProc) - otst;
    var h = this._height;
    this.slid.width = ws - this.otstup;
    this.slid.y = this.otstup1;
    this.input.width = wi;
    this.input.x = ws;
    this.input.y = this.otstup2;

    if (this.arrPrilip.length > 0) {
      for (var i = 0; i < this.arrPrilip.length; i++) {
        this.arrPrilip[i].graph.clear();
        this.drawPriliPoint(i);
      }
    }

    this.changeActiv();
    if (this.debugRect) this.drawDebugRect();
  };

  var debugGraph = new PIXI.Graphics();
  this.addChild(debugGraph);

  this.drawDebugRect = function () {
    debugGraph.clear();
    debugGraph.lineStyle(0.5, 0xff0000);
    debugGraph.drawRect(0, 0, this._width, this._height);
  };

  this.changeSizeHeight = function () {
    this.slid.height = this.wh;
    this.input.height = this.wh;
  };

  this.updateMinMax = function () {
    if (this._visiMinMax) {
      this.lblMin.text = '' + this._min;
      this.lblMax.text = '' + this._max;
      var rectMin = this.lblMin.getRect();
      var rectMax = this.lblMax.getRect();
      this.lblMin.x = 0;
      this.lblMax.x = this.slid.width - this.slid.content.x * 2 - rectMax.width;
      this.lblMin.y = this.lblMax.y = this.slid.panel.height;
      this.alpha = 0.5;
      this.tween.to({
        alpha: 1
      }, 500);
      this.tween.start();
      this._height = 38 + rectMax.height;
    } else {
      this._height = 38;
    }
  };

  this.updateSlidValue = function () {
    if (this._min < 0) {
      this.slid.value = (Math.abs(this._min) + this._value) * 100 / (Math.abs(this._min) + Math.abs(this._max) || 1);
    } else {
      this.slid.value = (Math.abs(this._min) - this._value) * 100 / (Math.abs(this._min) - Math.abs(this._max) || 1);
    }
  };

  this.changeSizeHeight();
  this.changeSizeWidth();
  this.updateMinMax();
  this.width = this._width;
  this.angle = this._angle;

  this.startPlus = function () {
    if (this.labelSystem != undefined) return;
    this.labelSystem = new PLLabel(this, 0, 0, '');
    this.labelSystem.bold = false;
    this.labelSystem.fontSize = fontS;
    pl102.removeElement(this.labelSystem, true);
  };
}

PLSliderBig.prototype = Object.create(PIXI.Container.prototype);
PLSliderBig.prototype.constructor = PLSliderBig;
Object.defineProperties(PLSliderBig.prototype, {
  plusText: {
    set: function set(value) {
      if (this._plusText == value) return;
      this._plusText = value;
      this.startPlus();
      this.labelSystem.text = this._plusText;
      this.changeSizeWidth();
    },
    get: function get() {
      return this._plusText;
    }
  },
  min: {
    set: function set(value) {
      if (this._min == value) return;
      this._min = value;
      this.updateSlidValue();
      this.updateMinMax();
    },
    get: function get() {
      return this._min;
    }
  },
  max: {
    set: function set(value) {
      if (this._max == value) return;
      this._max = value;
      this.updateSlidValue();
      this.updateMinMax();
    },
    get: function get() {
      return this._max;
    }
  },
  width: {
    set: function set(value) {
      this._width = value;
      this.changeSizeWidth();
    },
    get: function get() {
      return this._width;
    }
  },
  height: {
    set: function set(value) {
      this._height = value;
    },
    get: function get() {
      return this._height;
    }
  },
  title: {
    set: function set(value) {
      this._title = value;
      this.label.text = this._title;
    },
    get: function get() {
      return this._title;
    }
  },
  value: {
    set: function set(value) {
      if (!isNaN(value * 1)) {
        this._value = value;
        if (this._value < this._min) this._value = this._min;
        if (this._value > this._max) this._value = this._max;
      } else {
        var p = (this._max - this._min) / 2 + this._min;
        this._value = Math.round(p);
        if (this._value <= this._min) this._value = p;
        if (this._value >= this._max) this._value = p;
      }

      this._value = Math.round(this._value * this.okrug) / this.okrug;
      this.input.text = this._value;
      this.updateSlidValue();
      this.changeActiv();
    },
    get: function get() {
      return this._value;
    }
  },
  angle: {
    set: function set(value) {
      this._angle = value;
      this.slid.angle = this._angle;
      this.input.rotation = this._angle;
      this.value = this._value;
      this.width = this._width;
    },
    get: function get() {
      return this._angle;
    }
  },
  activMouse: {
    set: function set(value) {
      if (this._activMouse == value) return;
      this._activMouse = value;
      this.changeActiv();
    },
    get: function get() {
      return this._activMouse;
    }
  },
  visiMinMax: {
    set: function set(value) {
      if (this._visiMinMax == value) return;
      this._visiMinMax = value;
      this.lblMin.visible = this.lblMax.visible = value;
      this.updateMinMax();
    },
    get: function get() {
      return this._visiMinMax;
    }
  }
});

function PLSlidDubBtn(cont, _fun) {
  PIXI.Container.call(this);
  this.type = 'PLSlidDubBtn';
  cont.addChild(this);
  var self = this;
  pl102.addElement(this);
  this.fun = _fun;
  this._step = 1;
  this._width = 100;
  this._min = 0;
  this._max = 100;
  this.btnW = 12;
  this._activMouse = true;

  this.funBtnBefore = function () {
    self.pLSliderBig.value = self.pLSliderBig.value - self._step;
    self.pLSliderBig.fun();
  };

  this.funBtnAfter = function () {
    self.pLSliderBig.value = self.pLSliderBig.value + self._step;
    self.pLSliderBig.fun();
  };

  this.btnBefore = new PLButton(this, 0, 0, '', self.funBtnBefore);
  pl102.removeElement(this.btnBefore, true);
  this.pLSliderBig = new PLSliderBig(this, 0, 0, '', self.fun);
  pl102.removeElement(this.pLSliderBig, true);
  this.btnAfter = new PLButton(this, 0, 0, '', self.funBtnAfter);
  pl102.removeElement(this.btnAfter, true);
  this.btnBefore.width = this.btnAfter.width = this.btnW;
  this.btnBefore.height = this.btnAfter.height = this.pLSliderBig.height;
  this.btnBefore.loadImeg(pl102.base4);
  this.btnBefore.panel.visible = false;
  this.btnBefore.y = pl102.whText + 2;
  this.btnAfter.loadImeg(pl102.base5);
  this.btnAfter.panel.visible = false;
  this.btnAfter.y = pl102.whText + 2;

  this.addPrilip = function (num, width) {
    this.pLSliderBig.addPrilip(num, width);
  };

  this.pLSliderBig.funUp = function () {
    if (self.funUp) self.funUp();
  };

  this.pLSliderBig.inputUp = function () {
    if (self.inputUp) self.inputUp();
  };

  Object.defineProperty(this, 'width', {
    set: function set(val) {
      this.pLSliderBig.slid.width = val * 0.69;
      this.pLSliderBig.input.x = val * 0.7 + this.btnW;
      this.pLSliderBig.input.width = val * 0.3 - this.btnW * 2;
      this.btnBefore.x = val * 0.7;
      this.btnAfter.x = val * 0.7 + (val * 0.3 - this.btnW * 2) + this.btnW;
    },
    get: function get() {
      return this._width;
    }
  });
  Object.defineProperty(this, 'min', {
    set: function set(value) {
      this._min = value;
      this.pLSliderBig.min = this._min;
    },
    get: function get() {
      return this._min;
    }
  });
  Object.defineProperty(this, 'max', {
    set: function set(value) {
      this._max = value;
      this.pLSliderBig.max = this._max;
    },
    get: function get() {
      return this._max;
    }
  });
  Object.defineProperty(this, 'activMouse', {
    set: function set(value) {
      this._activMouse = value;
      this.pLSliderBig.activMouse = value;
    },
    get: function get() {
      return this._activMouse;
    }
  });
}

PLSlidDubBtn.prototype = Object.create(PIXI.Container.prototype);
PLSlidDubBtn.prototype.constructor = PLSlidDubBtn;

function PLInput(cont, _x, _y, text, fun) {
  PIXI.Container.call(this);
  cont.addChild(this);
  this.type = 'PLInput';
  var self = this;
  pl102.addElement(this);
  this.fun = fun;
  this.funEnter;
  this.x = _x;
  this.y = _y;
  this._width = 100;
  this._height = pl102.wh;
  this._activMouse = true;
  this._color = pl102.style.fill; // цвет текст

  this._backgroundColor = '#ffffff'; // "#d0d0d0";// todo color to pl102  // цвет фона

  this._outlineColor = '#909090'; // todo color to pl102  // цвет рамки при фокусе

  this._borderColor = '#cacaca';
  this._fontSize = 15; // pl102.style.fontSize;

  this._align = 'right'; // pl102.style.align;

  this._text = text;
  this._value = text; // тип значений this._text и this._value, true => number, false => string,

  this._isWorkWithNumber = false;
  this.fontStyle = pl102.style.fontStyle;
  this.fontFamily = pl102.style.fontFamily;
  this.paddingRight = pl102.style.paddingRight;
  this.paddingTop = pl102.style.paddingTop;
  this.input = new _PL102Dom.PLDOMElement(document.createElement('input'), this);
  this.input.htmlElement.id = 'input102_' + Math.random();
  this.input.htmlElement.type = 'text';
  this.input.htmlElement.name = this.input.htmlElement.id; // this.input.htmlElement.style.font = this._fontStyle + ' ' + this._fontSize+'px ' + this._fontFamily;

  this.input.htmlElement.style.border = '1px solid';
  this.input.htmlElement.style.color = this._color;
  this.input.htmlElement.style.fontFamily = this.fontFamily;
  this.input.htmlElement.style.fontSize = this._fontSize + 'px';
  this.input.htmlElement.style.fontStyle = this.fontStyle;
  this.input.htmlElement.style.textAlign = this._align;
  this.input.htmlElement.style.paddingRight = this.paddingRight + 'px';
  this.input.htmlElement.style.paddingTop = this.paddingTop + 'px';
  self.input.htmlElement.isOnFocus = false;
  this.input.htmlElement.value = text;
  this.input.height = this._height; /// Графика, накрывающая нпут

  this.graphRect;
  this.graphRect = new PIXI.Graphics();
  this.addChild(this.graphRect);
  this.graphRect.alpha = 0.5; /// Графика - имитирующая инпут

  this.content;
  this.graphCover;
  this.graphRect1;
  this.graphRectMask;
  this.label;
  this.rect;
  var debGraph = new PIXI.Graphics();
  var timeoutID = null;
  var timeOutFun = 1000;

  this.updateActivMouse = function () {
    if (!this.content) this.rectInitial();
    this.label.visible = !this._activMouse;
    this.input.visible = this._activMouse;
    this.drawRect();
  };

  this.rectInitial = function () {
    this.content = new PIXI.Container();
    this.addChild(this.content);
    this.graphRectMask = new PIXI.Graphics();
    this.content.addChild(this.graphRectMask);
    this.graphRect1 = new PIXI.Graphics();
    this.content.addChild(this.graphRect1);
    this.label = new PLLabel(this.content, 1, 5, this._text);
    pl102.removeElement(this.label, true);
    this.label.mask = this.graphRectMask;
    this.rect = this.label.getRect();
    this.rect.width /= this.worldTransform.a;
    this.rect.height /= this.worldTransform.a;
    this.label.y = (this._height - this.rect.height) / 2;
    this.graphRect = new PIXI.Graphics();
    this.addChild(this.graphRect);
    this.graphRect.alpha = 0.5;
    this.graphRect.interactive = true;
    this.content.addChild(debGraph);
  };

  this.drawRect = function () {
    this.label.text = this._text;
    if (this.label.text == '') this.label.text = '0';
    this.rect = this.label.getRect();
    this.rect.width /= this.worldTransform.a;
    this.rect.height /= this.worldTransform.a;
    this.label.y = (this.input.height - this.rect.height) / 2;
    if (this.rect.width >= this._width) this.input.htmlElement.style.paddingRight = '0';else this.input.htmlElement.style.paddingRight = this.paddingRight + 'px';
    this.graphRect1.clear();
    this.graphRect1.beginFill('0x909090');
    this.graphRect1.drawRect(0, 0, this._width, this._height);
    this.graphRect1.beginFill('0xffffff');
    this.graphRect1.drawRect(1, 1, this._width - 2, this._height - 2);
    this.graphRect1.endFill();
    this.graphRectMask.clear();
    this.graphRectMask.beginFill('0x909090');
    this.graphRectMask.drawRect(0, 0, this._width, this._height);
    this.graphRectMask.endFill();

    if (!this._activMouse) {
      this.graphRect.clear();
      this.graphRect.beginFill(pl102.color);
      this.graphRect.drawRect(0, 0, this._width, this._height);
      this.graphRect.endFill();
    } else {
      this.graphRect.clear();
    }
  };

  this.input.htmlElement.onblur = function () {
    self.input.htmlElement.isOnFocus = false;

    if (pl102.isMouseEvents) {
      pl102.stage.off('mousedown', self.offFocus);
    }

    if (pl102.isTouchEvents) {
      pl102.stage.off('touchstart', self.offFocus);
    }

    if (self.funBlur) self.funBlur();
  };

  this.input.htmlElement.onfocus = function () {
    self.input.htmlElement.isOnFocus = true;

    if (pl102.isMouseEvents) {
      pl102.stage.on('mousedown', self.offFocus);
    }

    if (pl102.isTouchEvents) {
      pl102.stage.on('touchstart', self.offFocus);
    }

    if (self.funFocus) self.funFocus();
  };

  this.offFocus = function () {
    // отключение фокуса инпута
    self.input.htmlElement.blur();
  };

  this.input.htmlElement.onkeyup = function (e) {
    if (e.keyCode == 13) {
      // жмакаем Enter
      self.text = self.input.htmlElement.value;
      clearTimeout(timeoutID);
      if (self.fun) self.fun();
      if (self.funEnter) self.funEnter();
    }
  };

  this.input.htmlElement.oninput = function () {
    self.text = filterKey(self.input.htmlElement.value);
    if (self.funChange) self.funChange();
    clearTimeout(timeoutID);
    timeoutID = setTimeout(self.funTimeOut, timeOutFun);
  };

  function filterKey(_text) {
    // ввод только чисел и запятой
    if (self.isNumer === 0) {
      _text = _text.replace('.', ',');
      _text = _text.replace(/\-[^\d,]/g, '');
    }

    return _text;
  }

  this.funTimeOut = function () {
    if (self.fun) self.fun();
  };

  this.planerStil = function (num) {};

  this.interactive = true;

  this.kill = function () {
    if (pl102.isMouseEvents) {
      pl102.stage.off('mousedown', self.offFocus);
    }

    if (pl102.isTouchEvents) {
      pl102.stage.off('touchstart', self.offFocus);
    }

    this.input.htmlElement.onblur = null;
    this.input.htmlElement.onfocus = null;
    this.input.htmlElement.onkeyup = null;
    this.input.htmlElement.oninput = null;
    this.input.kill();
    this.parent = null;
  };

  this.toRGB = function (color) {
    color = '' + color;

    if (color[0] != '#') {
      color = Number(color).toString(16);
      if (color == 0) color = '000000';
      color = '#' + color;
    }

    return color;
  };

  this.color = this._color;
  this.backgroundColor = this._backgroundColor;
  this.outlineColor = this._outlineColor;
  this.borderColor = this._borderColor;
}

PLInput.prototype = Object.create(PIXI.Container.prototype);
PLInput.prototype.constructor = PLInput;
Object.defineProperties(PLInput.prototype, {
  width: {
    set: function set(value) {
      this._width = value;
      this.input.width = value;
      this.updateActivMouse();
    },
    get: function get() {
      return this._width;
    }
  },
  height: {
    set: function set(value) {
      this._height = value;
      this.input.height = value;
      this.updateActivMouse();
    },
    get: function get() {
      return this._height;
    }
  },
  text: {
    set: function set(value) {
      if (this._isWorkWithNumber === true) {
        if (!isNaN(value * 1)) this._text = value * 1;
      } else {
        this._text = value;
      }

      this.input.htmlElement.value = this._text;
      this.updateActivMouse();
    },
    get: function get() {
      return this._text;
    }
  },
  placeholder: {
    set: function set(value) {
      this._placeholder = value;
      this.input.htmlElement.placeholder = this._placeholder;
    },
    get: function get() {
      return this._placeholder;
    }
  },
  value: {
    set: function set(value) {
      this.text = value;
      this.drawRect();
    },
    get: function get() {
      return this._text;
    }
  },
  color: {
    // цвет текста
    set: function set(value) {
      this._color = value;
      this.input.htmlElement.style.color = this.toRGB(value);
    },
    get: function get() {
      return this._color;
    }
  },
  backgroundColor: {
    // цвет задний фон
    set: function set(value) {
      this._backgroundColor = value;
      this.input.htmlElement.style.backgroundColor = this.toRGB(value);
    },
    get: function get() {
      return this._backgroundColor;
    }
  },
  borderColor: {
    // цвет рамка
    set: function set(value) {
      this._borderColor = value;
      this.input.htmlElement.style.borderColor = this.toRGB(value);
    },
    get: function get() {
      return this._borderColor;
    }
  },
  outlineColor: {
    // цвет рамка при фокусе
    set: function set(value) {
      this._outlineColor = value;
      this.input.htmlElement.style.outlineColor = this.toRGB(value);
    },
    get: function get() {
      return this._outlineColor;
    }
  },
  activMouse: {
    set: function set(value) {
      if (this._activMouse == value) return;
      this._activMouse = value;
      this.updateActivMouse();
    },
    get: function get() {
      return this._activMouse;
    }
  },
  fontSize: {
    set: function set(value) {
      if (this._fontSize == value) return;
      this._fontSize = value;
      this.input.htmlElement.style.fontSize = this._fontSize + 'px';
    },
    get: function get() {
      return this._fontSize;
    }
  },
  align: {
    set: function set(value) {
      if (this._align == value) return;
      this._align = value;
      this.input.htmlElement.style.textAlign = this._align;
    },
    get: function get() {
      return this._align;
    }
  },
  isWorkWithNumber: {
    set: function set(value) {
      if (this._isWorkWithNumber === value) return;
      this._isWorkWithNumber = value;
    },
    get: function get() {
      return this._isWorkWithNumber;
    }
  }
});

function PLWindow(cont, _x, _y, _text, fun) {
  PIXI.Container.call(this);
  cont.addChild(this);
  this.type = 'PLWindow';
  this.typeCom = 'pixi';
  var self = this;
  pl102.addElement(this);
  this.fun = fun;
  this.funMinimize;
  this.x = _x || 0;
  this.y = _y || 0;
  this._text = _text;
  if (this._text == undefined) this._text = 'text';
  if (this._text == null) this._text = 'text';
  if (this._text.length == 0) this._text = ' ';
  this._title = this._text;
  this._color = pl102.colorButton1;
  this._minimize = false; // спрятать низ или открыть по ум открыто

  this._width = 100;
  this._height = 100;
  this._hasMinimizeButton = false; // кнопочка для спрятать

  this._sX = 0;
  this._sY = 0;
  this._link;
  this._drag = true;
  this._activMouse = true;
  this._boolFilter = false;
  this.draggable = true; // можно ли тоскать

  this.sX = 0;
  this.sY = 0;
  this.image;
  this.wh = pl102.wh;
  this.gTeni = new PIXI.Graphics();
  this.addChild(this.gTeni);
  this.gTeni.visible = this._boolFilter;
  this.otstup1 = 5;
  this.otstup2 = 3;
  this.otstupCont = pl102.kontur;
  this.color2 = 0x515151;
  this.fontSize = 14;
  this.panelFooter = new PLPanel(this, 0, 0);
  this.panelFooter.width = this._width;
  this.panelFooter.height = this.wh;
  this.panelFooter.image.visible = false;
  this.panelFooter.interactive = true; // // верняя полоска panelFooter

  this.panelTop = new PLPanel(this.panelFooter, this.otstupCont, this.otstupCont);
  this.panelTop.width = this._width - this.otstupCont * 2;
  this.panelTop.height = this.otstup1;
  this.panelTop.color = 0xffffff;
  this.panelTop.image.link = pl102.base6;
  this.panelTop.image.alpha = 1;
  this.panelTop.kontur = false;
  pl102.removeElement(this.panelTop, true); // // середина panelFooter

  this.panelTab = new PLButton(this.panelFooter, this.otstupCont, this.otstup1, '');
  this.panelTab.konturColor = this.color3;
  this.panelTab.width = this._width - this.otstupCont * 2;
  this.panelTab.okDown = false;
  this.panelTab.color = this.color2;
  this.panelTab.height = this.wh - this.otstup1;
  pl102.removeElement(this.panelTab, true);
  this.label = new PLLabel(this, 5, 0, this._title);
  pl102.removeElement(this.label, true);
  this.label.color = 0xffffff;
  this.label.bold = false;
  this.label.fontSize = this.fontSize;
  this.rect = this.label.getRect();
  this.label.y = (this.wh - this.rect.height) / 2 + 2;
  this.addChild(this.label);
  this.but = new PLButton(this, 0, 0, ' ', function () {
    self.onDragStart();
  });
  pl102.removeElement(this.but, true);
  this.but.alpha = 0; // Панель

  this.panel = new PLPanel(this, 0, this.wh);
  this.panel.interactive = true;
  pl102.removeElement(this.panel, true);
  this.panelFooter.interactive = true;
  this.content = new PIXI.Container();
  this.content.type = 'PLWindowCont';
  this.addChild(this.content);
  this.content.y = this.wh;
  this.buton = new PLButton(this, 0, this.otstup1 + 2, ' ', function () {
    self.minimize = !self.minimize;
    if (self.fun != undefined) self.fun('minimized');
  });
  pl102.removeElement(this.buton, true);
  this.buton.visible = false;
  this.buton.visiblePanel = false;
  this.buton.width = this.buton.height = this.wh - this.otstup1 - 2;
  var ww = this.wh - this.otstup1 - 2;
  var otsMy = ww / 4;
  this.graphicsSh = new PIXI.Graphics();
  this.graphicsSh.beginFill(0xffffff); // this.graphicsSh.drawRect(0, 0,10,10)

  this.graphicsSh.moveTo(-otsMy, -otsMy);
  this.graphicsSh.lineTo(otsMy, 0);
  this.graphicsSh.lineTo(-otsMy, otsMy);
  this.graphicsSh.lineTo(-otsMy, -otsMy);
  this.graphicsSh.endFill();
  this.buton.addChild(this.graphicsSh);
  this.graphicsSh.position.x = ww / 2 + 2;
  this.graphicsSh.position.y = ww / 2 - 2; // this.addChild(this.graphicsSh);

  this.onGraphDown = function () {
    self.minimize = !self.minimize;
    if (self.fun != undefined) self.fun('minimized');
  };

  this.graphicsSh.interactive = true;
  this.graphicsSh.buttonMode = true;
  this.graphicsSh.on('mousedown', self.onGraphDown); /// Графика, накрывающая кнопку

  this.graphRect = new PIXI.Graphics();
  this.addChild(this.graphRect);
  this.graphRect.alpha = 0.5;
  this.graphRect.interactive = true;

  this.updateActivMouse = function () {
    if (!this._activMouse) {
      this.graphRect.clear();
      this.graphRect.beginFill(pl102.color);
      this.graphRect.drawRect(this.but.x, this.but.y, this.but.width, this.but.height);
      this.graphRect.endFill();
    } else {
      this.graphRect.clear();
    }
  };

  this.draw102 = function () {
    this.panelFooter.width = this._width;
    this.panelTop.width = this._width - this.otstupCont * 2;
    this.panelTab.width = this._width - this.otstupCont * 2;
    this.gTeni.clear();
    this.gTeni.beginFill(0, 0.6);
    this.gTeni.drawRect(1, 1, this._width + 3, this._height + this.wh + 3);
    this.but.width = this._width;
    this.but.height = this.wh;
    this.panel.height = this._height;
    this.panel.width = this._width;
    this.updateActivMouse();
  };

  this.addLink = function (value) {
    this._link = value;
    this.image = new PLImage(this, 0, this._height - this._nizNum, pl102.base);
    pl102.removeElement(this.image, true);
    this.image.height = this.image.width = this.wh;
    this.image.link = this._link;
    this.label.x = this.wh + 5;
  };

  var np;
  var np2 = new PIXI.Point();
  var np3 = new PIXI.Point();

  this.onDragEnd = function (e) {
    self.dragging = false;

    if (pl102.isMouseEvents) {
      pl102.stage.off('mouseup', self.onDragEnd);
      pl102.stage.off('mousemove', self.onDragMove);
    }

    if (pl102.isTouchEvents) {
      pl102.stage.off('touchend', self.onDragEnd);
      pl102.stage.off('touchmove', self.onDragMove);
    }
  };

  var scal;

  this.onDragMove = function (e) {
    self.position.x = np2.x - (np3.x - pl102.global.x) / scal;
    self.position.y = np2.y - (np3.y - pl102.global.y) / scal;
  };

  this.onDragStart = function () {
    scal = this.transform.worldTransform.a;
    np3.x = pl102.global.x;
    np3.y = pl102.global.y;
    np2.x = self.position.x;
    np2.y = self.position.y;

    if (pl102.isMouseEvents) {
      pl102.stage.off('mouseup', self.onDragEnd);
      pl102.stage.off('mousemove', self.onDragMove);
      pl102.stage.on('mouseup', self.onDragEnd);
      pl102.stage.on('mousemove', self.onDragMove);
    }

    if (pl102.isTouchEvents) {
      pl102.stage.off('touchend', self.onDragEnd);
      pl102.stage.off('touchmove', self.onDragMove);
      pl102.stage.on('touchend', self.onDragEnd);
      pl102.stage.on('touchmove', self.onDragMove);
    }
  };

  this.kill = function () {
    if (this.content == null) return;
  };

  this.minimize = this._minimize;
  this.hasMinimizeButton = this._hasMinimizeButton;
}

PLWindow.prototype = Object.create(PIXI.Container.prototype);
PLWindow.prototype.constructor = PLWindow;
Object.defineProperties(PLWindow.prototype, {
  minimize: {
    set: function set(value) {
      this._minimize = value;
      this.content.visible = !value;
      this.panel.visible = !value;
      if (this._minimize == true) this.graphicsSh.rotation = 0;else this.graphicsSh.rotation = Math.PI / 2;
      if (this.funMinimize != undefined) this.funMinimize();
    },
    get: function get() {
      return this._minimize;
    }
  },
  hasMinimizeButton: {
    set: function set(value) {
      this._hasMinimizeButton = value;
      this.graphicsSh.visible = value;
      this.buton.visible = value;

      if (this._hasMinimizeButton == true) {
        if (this.image != undefined) {
          this.image.x = this.wh;
          this.label.x = this.wh * 2 + this.otstup2;
        } else {
          this.label.x = this.wh;
        }
      } else {
        this.label.x = this.otstup2 * 2;
      }
    },
    get: function get() {
      return this._hasMinimizeButton;
    }
  },
  drag: {
    set: function set(value) {
      this._drag = value;
      this.but.visible = value;
    },
    get: function get() {
      return this._drag;
    }
  },
  width: {
    set: function set(value) {
      if (this._width == value) return;
      this._width = value;
      this.draw102();
    },
    get: function get() {
      return this._width;
    }
  },
  height: {
    set: function set(value) {
      if (this._height == value) return;
      this._height = value;
      this.draw102();
    },
    get: function get() {
      return this._height;
    }
  },
  text: {
    set: function set(value) {
      this._text = value;
      this.label.text = value;
    },
    get: function get() {
      return this._text;
    }
  },
  activMouse: {
    set: function set(value) {
      // debugger
      if (this._activMouse == value) return;
      this._activMouse = value;
      this.updateActivMouse();
    },
    get: function get() {
      return this._activMouse;
    }
  },
  color: {
    set: function set(value) {
      // debugger
      if (this._color == value) return;
      this._color = value;
      this.panel.color = value;
    },
    get: function get() {
      return this._activMouse;
    }
  },
  boolFilter: {
    set: function set(v) {
      if (this._boolFilter == v) return;
      this._boolFilter = v;
      if (this._boolFilter == true) this.gTeni.filters = [pl102.blur];else this.gTeni.filters = null;
      this.gTeni.visible = this._boolFilter;
    },
    get: function get() {
      return this._boolFilter;
    }
  }
});

function PLBitmapData(w, h, rgba, fun) {
  var self = this;
  this.type = 'PLBitmapData';
  pl102.addElement(this);
  this.fun = fun;
  this._width = w != undefined ? w : 100;
  this._height = h != undefined ? h : 100;
  this._color = rgba != undefined ? rgba : [0, 0, 0, 0];
  this._widthVisi = 100;
  this._heightVisi = 100;
  this.canvas = document.createElement('canvas'); // канвас для картинки

  this.ctx = this.canvas.getContext('2d'); // контекст картинки
  // загружаем картинку . путь к картинке или data:base64

  this.load = function (data, isClear) {
    var img = new Image();
    img.crossOrigin = 'Anonymous';

    img.onload = function () {
      if (isClear) {
        self.clear();
      }

      self.width = img.width;
      self.height = img.height;
      self.ctx.drawImage(img, 0, 0);
      self.imgData = self.ctx.getImageData(0, 0, self.width, self.height);
      if (self.fun) self.fun();
    };

    img.src = data;
  };

  this.setCanvas = function (canvas, context2d) {
    self.canvas = canvas;
    self.ctx = context2d;
    self.imgData = self.ctx.getImageData(0, 0, self.canvas.width, self.canvas.height);
    self.upDate();
  };

  this.setImage = function (img) {
    this._width = img.width;
    this._height = img.height;
    this.canvas.width = this._width;
    this.canvas.height = this._height;
    this.ctx.clearRect(0, 0, this._width, this._width);
    this.ctx.drawImage(img, 0, 0);
    this.imgData = this.ctx.getImageData(0, 0, img.width, img.height);
  }; // возвращает data:image/png;base64


  this.setImage2 = function (img, s) {
    this._width = img.width;
    this._height = img.height;
    this.canvas.width = this._width * s;
    this.canvas.height = this._height * s;
    this.ctx.clearRect(0, 0, this._width, this._width);
    this.ctx.drawImage(img, 0, 0, this._width, this._height, 0, 0, this._width * s, this._height * s);
    this.imgData = this.ctx.getImageData(0, 0, img.width, img.height);
  };

  this.getData = function () {
    return this.canvas.toDataURL();
  };

  this.arrRgba = [0, 0, 0, 0]; // получить пиксель. x, y - позиция пикселя
  // возвращает масив [r,g,b,a]. при выходе за контекст [0, 0, 0, 0]

  this.getPixel = function (x, y) {
    this.arrRgba[0] = this.imgData.data[(y * this.imgData.width + x) * 4 + 0];
    this.arrRgba[1] = this.imgData.data[(y * this.imgData.width + x) * 4 + 1];
    this.arrRgba[2] = this.imgData.data[(y * this.imgData.width + x) * 4 + 2];
    this.arrRgba[3] = this.imgData.data[(y * this.imgData.width + x) * 4 + 3];
    this.arrRgba[0] = this.arrRgba[0] ? this.arrRgba[0] : 0;
    this.arrRgba[1] = this.arrRgba[1] ? this.arrRgba[1] : 0;
    this.arrRgba[2] = this.arrRgba[2] ? this.arrRgba[2] : 0;
    this.arrRgba[3] = this.arrRgba[3] ? this.arrRgba[3] : 0;
    return this.arrRgba;
  };

  this.getAlphaPixel = function (x, y) {
    return this.getPixel(x, y)[3];
  }; // установить канал пикселя .x, y - позиция
  // rgba - масив [r,g,b,a]


  this.setPixelDin = function (i, j, rgba) {
    var imgData = this.ctx.createImageData(1, 1);
    imgData.data[0] = rgba[0];
    imgData.data[1] = rgba[1];
    imgData.data[2] = rgba[2];
    imgData.data[3] = rgba[3];
    this.ctx.putImageData(imgData, i, j);
  };

  this.setPixel = function (i, j, rgba) {
    // установить пиксель по координатам
    this.imgData.data[(j * this.imgData.width + i) * 4 + 0] = rgba[0];
    this.imgData.data[(j * this.imgData.width + i) * 4 + 1] = rgba[1];
    this.imgData.data[(j * this.imgData.width + i) * 4 + 2] = rgba[2];
    this.imgData.data[(j * this.imgData.width + i) * 4 + 3] = rgba[3];
  };

  this.addPixel = function (i, j, rgba) {
    // добавить пиксель
    this.setPixel(i, j, this.blendColors(this.getPixel(i, j), rgba));
  }; //


  this.addImgData = function (imgData, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
    // image, sx, sy, sWidth, sHeight, dx, dy
    var context = {
      imgData: imgData,
      arrRgba: []
    };
    var countx = 0;
    var county = 0;

    for (var i = sx; i < sWidth; i++) {
      for (var j = sy; j < sHeight; j++) {
        var pixelOther = this.getPixel.call(context, i, j);
        this.addPixel(dx + countx, dy + county, pixelOther);
        county++;
      }

      county = 0;
      countx++;
    }
  };

  this.addBitmapData = function (bmp, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
    // todo dWidth
    if (arguments.length == 1) {
      sx = sy = 0;
      sWidth = bmp.imgData.width;
      sHeight = bmp.imgData.height;
      dx = dy = 0;
    } else if (arguments.length == 3) {
      dx = sx;
      dy = sy;
      sx = sy = 0;
      sWidth = bmp.imgData.width;
      sHeight = bmp.imgData.height;
    } else if (arguments.length == 9) {
      // нечего
      console.warn('todo dWidth, dHeight');
    } else {
      console.error('не правильные аргументы', arguments.length);
    }

    this.addImgData(bmp.imgData, sx, sy, sWidth, sHeight, dx, dy);
  };

  this.upDate = function () {
    this.ctx.putImageData(this.imgData, 0, 0);
  };

  this.changeWH = function (width, height) {
    var imgData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    this.canvas.width = width != undefined ? width : this._width;
    this.canvas.height = height != undefined ? height : this._height;
    this.clear();
    this.ctx.putImageData(imgData, 0, 0);
    this.imgData = this.ctx.getImageData(0, 0, this._width, this._height);
    this.widthVisi = this._widthVisi;
    this.heightVisi = this._heightVisi;
  };

  this.setColor = function (rgba) {
    if (!rgba) rgba = this._color;
    this.ctx.fillStyle = 'rgba(' + rgba[0] + ',' + rgba[1] + ',' + rgba[2] + ',' + rgba[3] / 255 + ')';
  };

  this.setPixelTempData = function (i, j, rgba) {
    this.tempData.data[(j * this.tempWidth + i) * 4 + 0] = rgba[0];
    this.tempData.data[(j * this.tempWidth + i) * 4 + 1] = rgba[1];
    this.tempData.data[(j * this.tempWidth + i) * 4 + 2] = rgba[2];
    this.tempData.data[(j * this.tempWidth + i) * 4 + 3] = rgba[3];
  };

  this.tempData = [];
  this.tempWidth = 100;
  var sw = 1,
      sh = 1,
      pw = 0,
      ph = 0;
  var vw, vh;

  this.compress = function (w, h, funCompress) {
    w = Math.round(w);
    h = Math.round(h);

    if (w > this._width) {
      w = this._width;
    }

    if (h > this._height) {
      h = this._height;
    }

    sw = this._width / w;
    sh = this._height / h;
    pw = sw % 1;
    ph = sh % 1;
    sw -= pw;
    sh -= ph;
    this.tempWidth = w;
    this.tempData = this.ctx.createImageData(w, h);
    vw = (this._width + 2) / w;
    vh = (this._height + 2) / h;

    for (var i = 0, ii = 0; i < w; i++) {
      for (var j = 0, jj = 0; j < h; j++) {
        this.setPixelTempData(i, j, this.getPixelMerge(Math.round(i * vw), Math.round(j * vh)));
      }
    }

    this.width = w;
    this.height = h;
    this.imgData = this.tempData;
    this.upDate();
    if (funCompress) funCompress(this);
  };

  this.getPixelMerge = function (i, j) {
    var basePixel = this.getPixel(i, j);
    this.tempPixel[0] = basePixel[0];
    this.tempPixel[1] = basePixel[1];
    this.tempPixel[2] = basePixel[2];
    this.tempPixel[3] = basePixel[3];
    var countPix = 1; // количество взятых пикселей

    var pix;
    var ss = 1;

    for (var ii = 0; ii < sw; ii++) {
      if (i + (ii + 1) < this._width) {
        // не вышли за пределы , в право берем пиксель для мержа
        pix = this.getPixel(i + (ii + 1), j);
        this.tempPixel[0] += pix[0] * ss;
        this.tempPixel[1] += pix[1] * ss;
        this.tempPixel[2] += pix[2] * ss;
        this.tempPixel[3] += pix[3] * ss;
        countPix++;
      } else {
        // иначе добавляем базовый пиксель
        this.tempPixel[0] += basePixel[0] * ss;
        this.tempPixel[1] += basePixel[1] * ss;
        this.tempPixel[2] += basePixel[2] * ss;
        this.tempPixel[3] += basePixel[3] * ss;
        countPix++;
      }

      if (i - (ii + 1) > 0) {
        // не вышли за пределы , в лево берем пиксель для мержа
        pix = this.getPixel(i - (ii + 1), j);
        this.tempPixel[0] += pix[0] * ss;
        this.tempPixel[1] += pix[1] * ss;
        this.tempPixel[2] += pix[2] * ss;
        this.tempPixel[3] += pix[3] * ss;
        countPix++;
      } else {
        // иначе добавляем базовый пиксель
        this.tempPixel[0] += basePixel[0] * ss;
        this.tempPixel[1] += basePixel[1] * ss;
        this.tempPixel[2] += basePixel[2] * ss;
        this.tempPixel[3] += basePixel[3] * ss;
        countPix++;
      }
    }

    ss = 1;

    for (var jj = 0; jj < sh; jj++) {
      if (j + (jj + 1) < this._height) {
        // не вышли за пределы , в низ берем пиксель для мержа
        pix = this.getPixel(i, j + (jj + 1));
        this.tempPixel[0] += pix[0] * ss;
        this.tempPixel[1] += pix[1] * ss;
        this.tempPixel[2] += pix[2] * ss;
        this.tempPixel[3] += pix[3] * ss;
        countPix++;
      } else {
        // иначе добавляем базовый пиксель
        this.tempPixel[0] += basePixel[0] * ss;
        this.tempPixel[1] += basePixel[1] * ss;
        this.tempPixel[2] += basePixel[2] * ss;
        this.tempPixel[3] += basePixel[3] * ss;
        countPix++;
      }

      if (j - (jj + 1) > 0) {
        // не вышли за пределы , в вверх берем пиксель для мержа
        pix = this.getPixel(i, j - (jj + 1));
        this.tempPixel[0] += pix[0] * ss;
        this.tempPixel[1] += pix[1] * ss;
        this.tempPixel[2] += pix[2] * ss;
        this.tempPixel[3] += pix[3] * ss;
        countPix++;
      } else {
        // иначе добавляем базовый пиксель
        this.tempPixel[0] += basePixel[0] * ss;
        this.tempPixel[1] += basePixel[1] * ss;
        this.tempPixel[2] += basePixel[2] * ss;
        this.tempPixel[3] += basePixel[3] * ss;
        countPix++;
      }
    }

    this.tempPixel[0] = this.tempPixel[0] / countPix;
    this.tempPixel[1] = this.tempPixel[1] / countPix;
    this.tempPixel[2] = this.tempPixel[2] / countPix;
    this.tempPixel[3] = this.tempPixel[3] / countPix;
    return this.tempPixel;
  };

  this.tempPixel = [];

  this.clear = function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.imgData = this.ctx.getImageData(0, 0, 1, 1);
  };

  this.width = this._width;
  this.height = this._height;
  this.setColor();
  this.ctx.fillRect(0, 0, this._width, this._height);
  this.imgData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
  this.changeWH();

  function blendColors() {
    // миксование rgba цветов blendColors([69,109,160,255],[61,47,82,204])//return[63,59,98,255]
    var args = [];

    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    var base = [0, 0, 0, 0];
    var mix;
    var added;
    var alpha;
    var alphaBase;

    while (added = args.shift()) {
      if (typeof added[3] === 'undefined') {
        added[3] = 255;
      }

      alpha = added[3] / 255;
      alphaBase = base[3] / 255;

      if (alphaBase && alpha) {
        mix = [0, 0, 0, 0];
        mix[3] = 1 - (1 - alpha) * (1 - alphaBase); // alpha

        mix[0] = Math.round(added[0] * alpha / mix[3] + base[0] * alphaBase * (1 - alpha) / mix[3]); // red

        mix[1] = Math.round(added[1] * alpha / mix[3] + base[1] * alphaBase * (1 - alpha) / mix[3]); // green

        mix[2] = Math.round(added[2] * alpha / mix[3] + base[2] * alphaBase * (1 - alpha) / mix[3]); // blue
      } else if (alpha) {
        mix = added;
      } else {
        mix = base;
      }

      base = mix;
    }

    mix[3] = mix[3] * 255; // возвращяем обратно

    return mix;
  }

  this.blendColors = blendColors;
}

Object.defineProperties(PLBitmapData.prototype, {
  width: {
    set: function set(value) {
      var old = this._width;
      this._width = value;
      this.changeWH();

      if (old < this._width) {
        this.setColor();
        this.ctx.fillRect(old, 0, this._width, this._height);
      }

      this.widthVisi = this._widthVisi;
    },
    get: function get() {
      return this._width;
    }
  },
  height: {
    set: function set(value) {
      var old = this._height;
      this._height = value;
      this.changeWH();

      if (old < this._height) {
        this.setColor();
        this.ctx.fillRect(0, old, this._width, this._height);
      }

      this.heightVisi = this._heightVisi;
    },
    get: function get() {
      return this._height;
    }
  },
  widthVisi: {
    set: function set(value) {
      this._widthVisi = value;
    },
    get: function get() {
      return this._widthVisi;
    }
  },
  heightVisi: {
    set: function set(value) {
      this._heightVisi = value;
    },
    get: function get() {
      return this._heightVisi;
    }
  }
});

function PLGalleryPanelBtn(cont, _x, _y, fun) {
  PIXI.Container.call(this);
  this.type = 'PLGalleryPanelBtn';
  cont.addChild(this);
  var self = this;
  pl102.addElement(this);
  this.fun = fun;
  this.x = _x || 0;
  this.y = _y || 0;
  this._btnWidth = 30;
  this._btnHeight = 30;
  this._width = 100;
  this._height = 100;
  this._activ = false;
  this._visiblePanel = true;
  this._boolMask = true;
  this._stepW = 2;
  this._arr = []; // данные для кнопок

  this._activMouse = true;
  this.otstupX = 0;
  this.otstupY = 0;
  this.contentPanel = new PIXI.Container(); // для понели (фон)

  this.addChild(this.contentPanel);
  this.panel = new PLPanel(this.contentPanel, 0, 0);
  pl102.removeElement(this.panel, true);
  this.contentBtn = new PIXI.Container(); // для кнопок(двигается)

  this.addChild(this.contentBtn);
  this.graphicsMask = new PIXI.Graphics();
  this.contentPanel.addChild(this.graphicsMask);
  this.scrol = new PLScrollBarV(this, 0, 0, function () {
    self.contentBtn.y = -this.scrolValue;
  });
  pl102.removeElement(this.scrol, true);
  this.scrol.visiBtn = this.scrol.visiBtn1 = this.scrol.visiPanel = true;
  this.scrol.otstup = 3;
  this.scrol.width = 15;
  this.arrBtn = []; // буфер кнопок

  this.draw102 = function () {
    // mask
    this.graphicsMask.clear();
    this.graphicsMask.beginFill(0xff0000, 0);
    this.graphicsMask.drawRect(0.5, 0.5, this._width - 1, this._height - 1);
    this.graphicsMask.endFill();
    if (this._boolMask) this.contentBtn.mask = this.graphicsMask;else this.contentBtn.mask = null; // panel fon

    this.panel.width = this._width;
    this.panel.height = this._height; // btn

    this._btnWidth = (this._width - this.otstupX * 2) / this._stepW;
    this._btnHeight = (this._width - this.otstupX * 2) / this._stepW;
    this.reposition();

    for (var i = 0; i < this.arrBtn.length; i++) {
      this.arrBtn[i].width = this._btnWidth;
      this.arrBtn[i].height = this._btnHeight;
    } // scrol


    this.scrol.position.set(this._width - this.scrol.width, 0);
    this.scrol.height = this._height;
    this.scrol.heightContent = this.contentBtn.height;
    this.scrol.fun(); // drag scrol

    if (this.scrol.heightContent <= this.scrol.height) this.scrol.visible = false; // visibility scrol
    else this.scrol.visible = true;
  };

  this.reposition = function () {
    var x = this.otstupX,
        y = this.otstupY;
    this.clear(); // clear buffer

    for (var i = 0; i < this._arr.length; i++) {
      var btn = this.getBtn();
      btn.position.set(x, y);
      btn.loadImeg(this._arr[i].link);
      btn.obj = this._arr[i];
      x += this._btnWidth;

      if ((i + 1) % this._stepW == 0) {
        x = 0;
        y += this._btnHeight + this.otstupY;
      }
    }
  };

  this.updateActivMouse = function () {
    this.scrol.activMouse = this._activMouse;

    for (var i = 0; i < this.arrBtn.length; i++) {
      this.arrBtn[i].activMouse = this._activMouse;
    }
  };

  this.onDown = function () {
    if (self.fun) self.fun(this);
  };

  this.getBtn = function () {
    // get the buffer btn
    for (var i = 0; i < this.arrBtn.length; i++) {
      if (!this.arrBtn[i].visible) {
        this.arrBtn[i].visible = true;
        return this.arrBtn[i];
      }
    }

    var btn = new PLButton(this.contentBtn, 0, 0, '', this.onDown);
    pl102.removeElement(btn, true);
    this.arrBtn.push(btn);
    btn.visible = true;
    btn.visiblePanel = false;
    return btn;
  };

  this.clear = function () {
    // clear buffer btn
    for (var i = 0; i < this.arrBtn.length; i++) {
      this.arrBtn[i].visible = false;
    }
  };

  this.draw102();
}

PLGalleryPanelBtn.prototype = Object.create(PIXI.Container.prototype);
PLGalleryPanelBtn.prototype.constructor = PLGalleryPanelBtn;
Object.defineProperties(PLGalleryPanelBtn.prototype, {
  arr: {
    set: function set(value) {
      for (var i = 0; i < this.arrBtn.length; i++) {
        this.arrBtn[i].activ = false;
      }

      this._arr = value || [];
      this.draw102();
    },
    get: function get() {
      return this._arr;
    }
  },
  stepW: {
    set: function set(value) {
      this._stepW = value;
      this.draw102();
    },
    get: function get() {
      return this._stepW;
    }
  },
  width: {
    set: function set(value) {
      this._width = value;
      this.draw102();
    },
    get: function get() {
      return this._width;
    }
  },
  height: {
    set: function set(value) {
      this._height = value;
      this.draw102();
    },
    get: function get() {
      return this._height;
    }
  },
  boolMask: {
    set: function set(value) {
      this._boolMask = value;
      this.draw102();
    },
    get: function get() {
      return this._boolMask;
    }
  },
  activMouse: {
    set: function set(value) {
      this._activMouse = value;
      this.updateActivMouse();
    },
    get: function get() {
      return this._activMouse;
    }
  }
});

function PLScrollBarH(cont, _x, _y, fun) {
  PIXI.Container.call(this);
  this.type = 'PLScrollBarH';
  this.typeCom = 'pixi';
  cont.addChild(this);
  var self = this;
  pl102.addElement(this);
  this.fun = fun;
  this.x = _x || 0;
  this.y = _y || 0;
  this._wh = pl102.wh - 5;
  this._height = this._wh;
  this._width = 100;
  this._value = 0; // процентное значение

  this._scrolValue = 0; //

  this._widthContent = 100; // высота контента

  this._offsetHit = 0;
  this._color = 3026478; // цвет кнопки

  this._color1 = 5526612; // когда нажали

  this._color2 = 11053224; // панели внутреней

  this._color3 = 0xdddddd; // панель внешняя

  this._activMouse = true;
  this._otstup = 0;
  this.debugVisiHit = 0; // 0 || 0.3

  this.content = new PIXI.Container();
  this.addChild(this.content);
  this.grFon = new PIXI.Graphics();
  this.content.addChild(this.grFon);
  this.panel = new PLPanel(this.content, 0, 0);
  pl102.removeElement(this.panel, true);
  this.panel.kontur = false;
  this.panel.color = this._color2;
  this.panel.width = this._width;
  this.graphics = new PIXI.Graphics();
  this.content.addChild(this.graphics);
  this.graphCover = new PIXI.Graphics();
  this.content.addChild(this.graphCover);
  this.graphCover.alpha = 0.5;
  this.graphCover.visible = false;
  this.graphCover.interactive = true;
  this.but = new PLButton(this.content, 0, 0, '', function () {
    self.onDragStart();
  });
  pl102.removeElement(this.but, true);
  this.but.height = this._wh;
  this.but.width = this._wh;
  this.downLocal = new PIXI.Point();
  this.moveLocal = new PIXI.Point();
  this.vector = new PIXI.Point();
  var pv = 0;

  this.onDragStart = function () {
    self.downLocal = self.toLocal(pl102.global);
    pv = self.value;

    if (pl102.isMouseEvents) {
      pl102.stage.off('mouseup', self.onDragEnd);
      pl102.stage.off('mousemove', self.onDragMove);
      pl102.stage.on('mouseup', self.onDragEnd);
      pl102.stage.on('mousemove', self.onDragMove);
    }

    if (pl102.isTouchEvents) {
      pl102.stage.off('touchend', self.onDragEnd);
      pl102.stage.off('touchmove', self.onDragMove);
      pl102.stage.on('touchend', self.onDragEnd);
      pl102.stage.on('touchmove', self.onDragMove);
    }

    self.onDragMove();
  };

  this.onDownStart = function () {
    setVal((self.toLocal(pl102.global).x - self.but.width / 2 - self.otstup) / (self._width - self.otstup * 2 - self.but.width) * 100);
    self.onDragStart();
  };

  this.onDragMove = function () {
    self.moveLocal = self.toLocal(pl102.global);
    self.vector.set(self.moveLocal.x - self.downLocal.x, self.moveLocal.y - self.downLocal.y);
    setVal(pv + self.vector.x / (self._width - self.otstup * 2 - self.but.width) * 100);
  };

  this.onDragEnd = function () {
    self.dragging = false;

    if (pl102.isMouseEvents) {
      pl102.stage.off('mouseup', self.onDragEnd);
      pl102.stage.off('mousemove', self.onDragMove);
    }

    if (pl102.isTouchEvents) {
      pl102.stage.off('touchend', self.onDragEnd);
      pl102.stage.off('touchmove', self.onDragMove);
    }
  };

  this.updateActivMouse = function () {
    this.but.activMouse = this._activMouse;
    this.graphCover.clear();
    this.graphCover.visible = !this._activMouse;
    this.draw102();
  };

  this.draw102 = function () {
    this.graphics.clear(); // расширение невидимое

    this.graphics.beginFill(0xff0000, this.debugVisiHit);
    this.graphics.drawRoundedRect(0, -this.offsetHit, this._width, this._height + this.offsetHit * 2, Math.min((this.but.width - 2) / 2, (this.but.height - 2) / 2, 0.1));
    this.graphics.endFill();
    this.graphCover.clear();
    this.graphCover.beginFill(0xffffff);
    this.graphCover.drawRoundedRect(0, -this.offsetHit, this._width, this._height + this.offsetHit * 2, Math.min((this.but.width - 2) / 2, (this.but.height - 2) / 2, 0.1));
    this.graphCover.endFill();
    this.grFon.clear();
    this.grFon.beginFill(this._color3);
    this.grFon.drawRect(0, 0, this._width, this._height);
    this.grFon.endFill();
    this.but.y = this._otstup;
    this.panel.y = this._otstup;
    this.panel.x = this._otstup;
    this.but.height = this._height - this._otstup * 2;
    this.panel.height = this._height - this._otstup * 2;
    this.panel.width = this._width - this._otstup * 2;
  };

  this.kill = function () {
    if (pl102.isMouseEvents) {
      pl102.stage.off('mouseup', self.onDragEnd);
      pl102.stage.off('mousemove', self.onDragMove);
    }

    if (pl102.isTouchEvents) {
      pl102.stage.off('touchend', self.onDragEnd);
      pl102.stage.off('touchmove', self.onDragMove);
    }

    this.panel.kill();
    this.but.kill();
    this.parent = null;
  };

  if (pl102.isMouseEvents) {
    this.graphics.on('mousedown', this.onDownStart);
  }

  if (pl102.isTouchEvents) {
    this.graphics.on('touchstart', this.onDownStart);
  }

  this.graphics.interactive = true;

  if (pl102.isMouseEvents) {
    this.graphics.on('mousedown', this.onDownStart);
  }

  if (pl102.isTouchEvents) {
    this.graphics.on('touchstart', this.onDownStart);
  }

  this.graphics.interactive = true;

  function setVal(newv) {
    // от 0 до 100
    var v = newv < 0 ? 0 : newv > 100 ? 100 : newv;

    if (v != self._value) {
      self.value = v;
      if (self.fun) self.fun();
    }
  }

  this.draw102();
}

PLScrollBarH.prototype = Object.create(PIXI.Container.prototype);
PLScrollBarH.prototype.constructor = PLScrollBarH;
Object.defineProperties(PLScrollBarH.prototype, {
  otstup: {
    set: function set(value) {
      if (this._otstup == value) return;
      this._otstup = value;
      var pv = this.value;
      this._value = -1;
      this.value = pv;
      this.draw102();
    },
    get: function get() {
      return this._otstup;
    }
  },
  width: {
    set: function set(value) {
      if (this._width == value) return;
      this._width = value;
      if (this._width + this._otstup * 2 >= this._widthContent) this.but.width = this._width - this._otstup * 2;else this.but.width = this._width * this._width / this._widthContent;
      if (this.but.width < this._wh) this.but.width = this._wh;
      var pv = this.value;
      this._value = -1;
      this.value = pv;
      this.draw102();
    },
    get: function get() {
      return this._width;
    }
  },
  scrolValue: {
    set: function set(value) {
      if (this._scrolValue == value) return;
      this._scrolValue = value;
      this.value = this._scrolValue / (this._widthContent - this._width) * 100;
    },
    get: function get() {
      return (this._widthContent - this._width) * this._value / 100 || 0;
      /* this._scrolValue; */
    }
  },
  // значение  0 - 100
  value: {
    set: function set(value) {
      if (this._value == value) return;
      this._value = value;
      if (isNaN(parseFloat(this._value))) this._value = 0;
      if (this._value < 0) this._value = 0;
      if (this._value > 100) this._value = 100;
      this.but.x = this._otstup + (this._width - this._otstup * 2 - this.but.width) * (this._value / 100);
      this._scrolValue = (this._widthContent - this._width) * this._value / 100;
      if (this._scrolValue < 0) this._scrolValue = 0;
    },
    get: function get() {
      return this._value;
    }
  },
  // высота контента
  widthContent: {
    set: function set(value) {
      if (this._widthContent == value) return;
      this._widthContent = value;
      var vv = this._width - this._otstup * 2;

      if (vv >= this._widthContent) {
        this.but.width = vv; // -this._otstup*2;
      } else {
        var s = vv * vv / this._widthContent;
        if (s < this._wh) s = this._wh; // ставим чтоб меньше кнопка не была кнопка

        var d = s - this.but.width; // кнопка только по панели

        if (this.but.x + this.but.width + d > vv + this.graphics.x) this.but.x -= d;else if (this.but.x < 0) this.but.x = 0;
        this.but.width = s;
      }

      var pv = this.value;
      this._value = -1;
      this.value = pv;
    },
    get: function get() {
      return this._widthContent;
    }
  },
  // высота скрола
  height: {
    set: function set(value) {
      if (this._height == value) return;
      this._height = value;
      this.draw102();
    },
    get: function get() {
      return this._height;
    }
  },
  offsetHit: {
    set: function set(value) {
      if (this._offsetHit == value) return;
      this._offsetHit = value;
      this.draw102();
    },
    get: function get() {
      return this._offsetHit;
    }
  },
  color: {
    set: function set(value) {
      if (this._color == value) return;
      this._color = value;
      this.but.color = this._color;
      this.draw102();
    },
    get: function get() {
      return this._color;
    }
  },
  color1: {
    set: function set(value) {
      if (this._color1 == value) return;
      this._color1 = value;
      this.but.color1 = this._color1;
      this.draw102();
    },
    get: function get() {
      return this._color1;
    }
  },
  color2: {
    set: function set(value) {
      if (this._color2 == value) return;
      this._color2 = value;
      this.panel.color = this._color2;
    },
    get: function get() {
      return this._color2;
    }
  },
  color3: {
    set: function set(value) {
      if (this._color3 == value) return;
      this._color3 = value;
      this.draw102();
    },
    get: function get() {
      return this._color3;
    }
  },
  activMouse: {
    set: function set(value) {
      if (this._activMouse == value) return;
      this._activMouse = value;
      this.updateActivMouse();
    },
    get: function get() {
      return this._activMouse;
    }
  }
});

function PLScrollBarV(cont, _x, _y, fun) {
  PIXI.Container.call(this);
  this.type = 'PLScrollBarV';
  this.typeCom = 'pixi';
  cont.addChild(this);
  var self = this;
  pl102.addElement(this);
  this.fun = fun;
  this.x = _x || 0;
  this.y = _y || 0;
  this._wh = pl102.wh - 5;
  this._height = 100;
  this._width = this._wh;
  this._value = 0; // процентное значение

  this._scrolValue = 0; //

  this._heightContent = 100; // высота контента

  this._offsetHit = 0;
  this._color = 3026478; // цвет кнопки

  this._color1 = 5526612; // когда нажали

  this._color2 = 11053224; // панели внутреней

  this._color3 = 0xdddddd; // панель внешняя

  this._activMouse = true;
  this._otstup = 0;
  this.debugVisiHit = 0; // 0 || 0.3

  this.content = new PIXI.Container();
  this.addChild(this.content);
  this.grFon = new PIXI.Graphics();
  this.content.addChild(this.grFon);
  this.panel = new PLPanel(this.content, 0, 0);
  pl102.removeElement(this.panel, true);
  this.panel.kontur = false;
  this.panel.color = this._color2;
  this.panel.width = this._width;
  this.graphics = new PIXI.Graphics();
  this.content.addChild(this.graphics);
  this.graphCover = new PIXI.Graphics();
  this.content.addChild(this.graphCover);
  this.graphCover.alpha = 0.5;
  this.graphCover.visible = false;
  this.graphCover.interactive = true;
  this.but = new PLButton(this.content, 0, 0, '', function () {
    self.onDragStart();
  });
  pl102.removeElement(this.but, true);
  this.but.height = this._wh;
  this.but.width = this._wh;
  this.downLocal = new PIXI.Point();
  this.moveLocal = new PIXI.Point();
  this.vector = new PIXI.Point();
  var pv = 0;

  this.onDragStart = function () {
    self.downLocal = self.toLocal(pl102.global);
    pv = self.value;

    if (pl102.isMouseEvents) {
      pl102.stage.off('mouseup', self.onDragEnd);
      pl102.stage.off('mousemove', self.onDragMove);
      pl102.stage.on('mouseup', self.onDragEnd);
      pl102.stage.on('mousemove', self.onDragMove);
    }

    if (pl102.isTouchEvents) {
      pl102.stage.off('touchend', self.onDragEnd);
      pl102.stage.off('touchmove', self.onDragMove);
      pl102.stage.on('touchend', self.onDragEnd);
      pl102.stage.on('touchmove', self.onDragMove);
    }

    self.onDragMove();
  };

  this.onDownStart = function () {
    setVal((self.toLocal(pl102.global).y - self.but.height / 2 - self.otstup) / (self._height - self.otstup * 2 - self.but.height) * 100);
    self.onDragStart();
  };

  this.onDragMove = function () {
    self.moveLocal = self.toLocal(pl102.global);
    self.vector.set(self.moveLocal.x - self.downLocal.x, self.moveLocal.y - self.downLocal.y);
    setVal(pv + self.vector.y / (self._height - self.otstup * 2 - self.but.height) * 100);
  };

  this.onDragEnd = function () {
    self.dragging = false;

    if (pl102.isMouseEvents) {
      pl102.stage.off('mouseup', self.onDragEnd);
      pl102.stage.off('mousemove', self.onDragMove);
    }

    if (pl102.isTouchEvents) {
      pl102.stage.off('touchend', self.onDragEnd);
      pl102.stage.off('touchmove', self.onDragMove);
    }
  };

  this.updateActivMouse = function () {
    this.but.activMouse = this._activMouse;
    this.graphCover.clear();
    this.graphCover.visible = !this._activMouse;
    this.draw102();
  };

  this.draw102 = function () {
    this.graphics.clear(); // расширение невидимое

    this.graphics.beginFill(0xff0000, this.debugVisiHit);
    this.graphics.drawRoundedRect(-this.offsetHit, 0, this._width + this.offsetHit * 2, this._height, Math.min((this.but.width - 2) / 2, (this.but.height - 2) / 2, 0.1));
    this.graphics.endFill();
    this.graphCover.beginFill(0xffffff);
    this.graphCover.drawRoundedRect(-this.offsetHit, 0, this._width + this.offsetHit * 2, this._height, Math.min((this.but.width - 2) / 2, (this.but.height - 2) / 2, 0.1));
    this.graphCover.endFill();
    this.grFon.clear();
    this.grFon.beginFill(this._color3); //

    this.grFon.drawRect(0, 0, this._width, this._height);
    this.grFon.endFill();
    this.but.x = this._otstup;
    this.panel.y = this._otstup;
    this.panel.x = this._otstup;
    this.but.width = this._width - this._otstup * 2;
    this.panel.width = this._width - this._otstup * 2;
    this.panel.height = this._height - this._otstup * 2;
  };

  this.kill = function () {
    if (pl102.isMouseEvents) {
      pl102.stage.off('mouseup', self.onDragEnd);
      pl102.stage.off('mousemove', self.onDragMove);
    }

    if (pl102.isTouchEvents) {
      pl102.stage.off('touchend', self.onDragEnd);
      pl102.stage.off('touchmove', self.onDragMove);
    }

    this.panel.kill();
    this.but.kill();
    this.parent = null;
  };

  if (pl102.isMouseEvents) {
    this.graphics.on('mousedown', this.onDownStart);
  }

  if (pl102.isTouchEvents) {
    this.graphics.on('touchstart', this.onDownStart);
  }

  this.graphics.interactive = true;

  function setVal(newv) {
    // от 0 до 100
    var v = newv < 0 ? 0 : newv > 100 ? 100 : newv;

    if (v != self._value) {
      self.value = v;
      if (self.fun) self.fun();
    }
  }

  this.draw102();
}

PLScrollBarV.prototype = Object.create(PIXI.Container.prototype);
PLScrollBarV.prototype.constructor = PLScrollBarV;
Object.defineProperties(PLScrollBarV.prototype, {
  otstup: {
    set: function set(value) {
      if (this._otstup == value) return;
      this._otstup = value;
      var pv = this._value;
      this.value = -1;
      this.value = pv;
      this.draw102();
    },
    get: function get() {
      return this._otstup;
    }
  },
  width: {
    set: function set(value) {
      if (this._width == value) return;
      this._width = value;
      this.draw102();
    },
    get: function get() {
      return this._width;
    }
  },
  scrolValue: {
    set: function set(value) {
      if (this._scrolValue == value) return;
      this._scrolValue = value;
      this.value = this._scrolValue / (this._heightContent - this._height) * 100;
    },
    get: function get() {
      return (this._heightContent - this._height) * this._value / 100 || 0;
      /* this._scrolValue; */
    }
  },
  // значение  0 - 100
  value: {
    set: function set(value) {
      if (this._value == value) return;
      this._value = value;
      if (isNaN(parseFloat(this._value))) this._value = 0;
      if (this._value < 0) this._value = 0;
      if (this._value > 100) this._value = 100;
      this.but.y = this._otstup + (this._height - this._otstup * 2 - this.but.height) * (this._value / 100);
      this._scrolValue = (this._heightContent - this._height) * this._value / 100;
      if (this._scrolValue < 0) this._scrolValue = 0;
    },
    get: function get() {
      return this._value;
    }
  },
  // высота контента
  heightContent: {
    set: function set(value) {
      if (this._heightContent == value) return;
      this._heightContent = value;
      var vv = this._height - this._otstup * 2;

      if (vv >= this._heightContent) {
        this.but.height = vv; // -this._otstup*2;
      } else {
        var s = vv * vv / this._heightContent;
        if (s < this._wh) s = this._wh; // ставим чтоб меньше кнопка не была кнопка

        var d = s - this.but.height; // кнопка только по панели

        if (this.but.y + this.but.height + d > vv + this.graphics.y) this.but.y -= d;else if (this.but.y < 0) this.but.y = 0;
        this.but.height = s;
      } // this.value = this._value;


      var pv = this._value;
      this.value = -1;
      this.value = pv;
    },
    get: function get() {
      return this._heightContent;
    }
  },
  height: {
    set: function set(value) {
      if (this._height == value) return;
      this._height = value;
      if (this._height + this._otstup * 2 >= this._heightContent) this.but.height = this._height - this._otstup * 2;else this.but.height = this._height * this._height / this._heightContent;
      if (this.but.height < this._wh) this.but.height = this._wh;
      var pv = this._value;
      this.value = -1;
      this.value = pv;
      this.draw102();
    },
    get: function get() {
      return this._height;
    }
  },
  offsetHit: {
    set: function set(value) {
      if (this._offsetHit == value) return;
      this._offsetHit = value;
      this.draw102();
    },
    get: function get() {
      return this._offsetHit;
    }
  },
  color: {
    set: function set(value) {
      this._color = value;
      this.but.color = this._color;
      this.draw102();
    },
    get: function get() {
      return this._color;
    }
  },
  color1: {
    set: function set(value) {
      this._color1 = value;
      this.but.color1 = this._color1;
      this.draw102();
    },
    get: function get() {
      return this._color1;
    }
  },
  color2: {
    set: function set(value) {
      this._color2 = value;
      this.panel.color = this._color2;
    },
    get: function get() {
      return this._color2;
    }
  },
  color3: {
    set: function set(value) {
      this._color3 = value;
      this.draw102();
    },
    get: function get() {
      return this._color3;
    }
  },
  activMouse: {
    set: function set(value) {
      if (this._activMouse == value) return;
      this._activMouse = value;
      this.updateActivMouse();
    },
    get: function get() {
      return this._activMouse;
    }
  }
});

function PLContur(cont, x, y) {
  PIXI.Container.call(this);
  this.type = 'PLContur';
  var self = this;
  cont.addChild(this);
  pl102.addElement(this);
  this.x = x || 0;
  this.y = y || 0;
  this._width = 100;
  this._height = 100;
  this._wh = 25;
  this._color = 0x000000;
  this._thickness = 5;
  this.innerLine = false;
  this.colorInnerLine = 0xffffff;
  this.graphics = new PIXI.Graphics();
  this.addChild(this.graphics);

  this.draw = function () {
    this.graphics.clear();

    if (this.innerLine === true) {
      this.graphics.lineStyle(Math.abs(this._thickness), this.colorInnerLine, 1);
      this.graphics.drawRect(this._thickness / 2 + Math.abs(this._thickness), this._thickness / 2 + Math.abs(this._thickness), this._width - (this._thickness + Math.abs(this._thickness * 2)), this._height - (this._thickness + Math.abs(this._thickness * 2)));
    }

    this.graphics.lineStyle(Math.abs(this._thickness), this._color, 1);
    this.graphics.drawRect(this._thickness / 2, this._thickness / 2, this._width - this._thickness, this._height - this._thickness);
    this.graphics.endFill();
  };

  this.draw();
}

PLContur.prototype = Object.create(PIXI.Container.prototype);
PLContur.prototype.constructor = PLContur;
Object.defineProperties(PLContur.prototype, {
  width: {
    set: function set(value) {
      if (this._width == value) return;
      this._width = value;
      this.draw();
    },
    get: function get() {
      return this._width;
    }
  },
  height: {
    set: function set(value) {
      if (this._height == value) return;
      this._height = value;
      this.draw();
    },
    get: function get() {
      return this._height;
    }
  },
  color: {
    set: function set(value) {
      if (this._color == value) return;
      this._color = value;
      this.draw();
    },
    get: function get() {
      return this._color;
    }
  },
  thickness: {
    set: function set(value) {
      if (this._thickness == value) return;
      this._thickness = value;
      this.draw();
    },
    get: function get() {
      return this._thickness;
    }
  },
  wh: {
    set: function set(value) {
      if (this._wh == value) return;
      this._wh = value;
      this._height = this._width = this._wh;
      this.draw();
    },
    get: function get() {
      return this._wh;
    }
  }
});

function PLColor(cont, x, y, fun, title) {
  PIXI.Container.call(this);
  this.type = 'PLColor';
  var self = this;
  pl102.addElement(this);
  this.x = x || 0;
  this.y = y || 0;
  this.fun = fun; // дергаем при нажатии на панели и кубики цветов

  this.funDown; // дергаем если клик вне компонента

  this.funSize; // дергаем при изминении размеров;

  this.funChangeVisiblePanel; // дергаем при изминении видимости;

  this.funUp;
  this.funSelectColor; // срабатывает при выборе цвета

  this._width = 180;
  this._height = pl102.wh * 2;
  this._text = title || 'COLOR'; // "null" - отображаетса номер цвета, другое - отображаетса текст

  this._value = '0xffffff';
  this._color = '0xffffff';
  this._otstup = pl102.otstup;
  this._boolActiv = true; // возможность отключить нижнюю панель

  this._colPicActiv = true; // возможность отключить панель с кубиками цветов

  this._boolPlus = false; // возможность добавлять цвета в колор пикер

  this._activMouse = true;
  this._kolElRow = 9; // количество кубиков в ряду, -1 - рисует на всю длину компонент кубики с цветами

  this._kolColor = 9; // общее количество цветов в компонент кубики с цветами

  this.colorPanelH = 130; // высота выпадающей панели

  this.btnH = pl102.wh;
  this.colorDrag = null;
  this.baseColor = '0xffffff';
  this.content = new PIXI.Container();
  cont.addChild(this.content);
  this.content.addChild(this); /// Графика, накрывающая кнопку

  this.graphRect = new PIXI.Graphics();
  this.content.addChild(this.graphRect);
  this.graphRect.alpha = 0.5;
  this.graphRect.interactive = true;
  this.arrColor = [0x555555, 0xff4c4c, 0x4faf5c, 0x80bece, 0xf9ae34, 0xffffff, 0x000000, 0xffd46b, 0xffb86b]; // компонент нижняя панель выбора цвета

  this.pLColorPickerPanel = new PLColorPickerPanel(this, 0, this._height, function (_bool) {
    // цвет строка
    if (self.boolPlus) {
      self.pLColorPicker.setColor(this.color);
    }

    if (self._text == 'null') {
      self.button.text = this.color;
    }

    self.button.color = this.color;

    if (typeof self._color === 'string') {
      self._color = this.color;
      self._value = this.color;
    } else {
      self._color = +this.color;
      self._value = +this.color;
    }

    if (self.fun) self.fun();
    if (self.funSelectColor) self.funSelectColor(this.color);
    if (_bool == undefined) self.setVisiblePanel(false);
  });
  pl102.removeElement(this.pLColorPickerPanel, true);

  this.pLColorPickerPanel.funDrag = function () {
    self.button.color = this.color;
    self.colorDrag = this.colorDrag;
    if (self.funDrag) self.funDrag();
  }; // скрытие нижней панели если клик вне компонента


  var p, intersect;

  this.mouseDown = function () {
    p = self.toLocal(pl102.global);
    intersect = self.contains(p.x, p.y);
    if (self.funDown) self.funDown();

    if (intersect == false) {
      self.setVisiblePanel(false);
    }
  }; // проверка кликаем в компоненте или нет


  var fullHeight;

  this.contains = function (x, y) {
    // todo проверить с масштабирование и поворотом
    fullHeight = self.height;
    if (self.pLColorPickerPanel.activ) fullHeight += self.pLColorPickerPanel.height;
    return x >= 0 && x <= self.width && y >= 0 && y <= fullHeight;
  }; // скрытие нижней панели при клике


  this.colorPanelVisible = function (isVisible) {
    // кидаем компонент поверх остальных в родительском контейнере
    cont.addChild(self.content);
    self.setVisiblePanel(isVisible);
  };

  this.activSob = function (_bool) {
    if (_bool) {
      if (pl102.isMouseEvents) {
        pl102.stage.on('click', self.mouseDown);
      }

      if (pl102.isTouchEvents) {
        pl102.stage.on('tap', self.mouseDown);
      }
    } else {
      if (pl102.isMouseEvents) {
        pl102.stage.off('click', self.mouseDown);
      }

      if (pl102.isTouchEvents) {
        pl102.stage.off('tap', self.mouseDown);
      }
    }
  };

  this.setVisiblePanel = function (isVisible) {
    self.pLColorPickerPanel.activMouse = false;
    self.pLColorPickerPanel.activ = isVisible;
    self.activSob(isVisible);
    if (self.funChangeVisiblePanel) self.funChangeVisiblePanel(isVisible);
  }; // под кнопкой


  this.btnPanel = new PLPanel(this, 0, 0);
  pl102.removeElement(this.btnPanel, true);
  this.btnPanel.image.visible = false;
  this.btnPanel.color = 0xffffff; // под кубиками

  this.btnPanel1 = new PLPanel(this, 0, 0);
  pl102.removeElement(this.btnPanel1, true);
  this.btnPanel1.image.visible = false;
  this.btnPanel1.color = 0xffffff;
  this.button = new PLButton(this.btnPanel, this._otstup, this._otstup, this._text, function () {
    // проверка разрешено ли открывать нижнюю панель
    if (self._boolActiv) {
      self.colorPanelVisible(!self.pLColorPickerPanel.activ);
    }
  });
  pl102.removeElement(this.button, true);
  this.button.boolAnimKontut = false;
  this.button.panel.image.visible = false;
  this.button.color = this.baseColor; // компонент квадратные кнопки с цветами

  this.pLColorPicker = new PLColorPicker(this.btnPanel1, this._otstup, 0, [], function () {
    // цвет - число
    if (self._text == 'null') {
      self.button.text = self.corectForBtn(this.color);
    }

    self.button.color = this.color;

    if (typeof self._color === 'string') {
      self._color = self.corectForBtn(this.color);
      self._value = self.corectForBtn(this.color);
    } else {
      self._color = this.color;
      self._value = this.color;
    }

    self.pLColorPickerPanel.setColor(this.color);
    if (self.fun) self.fun();
  });
  this.pLColorPicker.fullSizePick = this._fullSizePick;
  this.pLColorPicker.kolColor = this._kolColor;
  this.pLColorPicker.kolElRow = this._kolElRow;
  pl102.removeElement(this.pLColorPicker, true); // // при изминении размермеров pLColorPicker перепозиционируем

  this.pLColorPicker.funSize = function () {
    // self.reposition();
    if (self.funSize) self.funSize();
  }; // перерисовка положений при изменении высоты ширины и цвета


  this.reposition = function () {
    this.button.height = this.btnH;
    this.button.width = this._width - this._otstup * 2;
    this.btnPanel.height = this.button.height + this._otstup * 2;
    this.btnPanel.width = this._width;

    if (this._colPicActiv) {
      this.pLColorPicker.width = this._width - this._otstup * 2;
      this.pLColorPicker.y = this._otstup;
      this.btnPanel1.height = this.pLColorPicker.height + this._otstup * 2;
      this.btnPanel1.width = this._width;
      this.btnPanel1.y = this.btnPanel.height - 1;
      this.pLColorPickerPanel.y = this.btnPanel1.y + this.btnPanel1.height + this._otstup;
      this._height = this.btnPanel.height + this.btnPanel1.height;
    } else {
      this.pLColorPickerPanel.y = this.btnPanel.height + this._otstup;
      this._height = this.btnPanel.height;
    }

    this.pLColorPickerPanel.width = this._width;
    this.pLColorPickerPanel.height = this.colorPanelH;
  };

  var color; // добавляем цвета
  // если пришел цвет добавим цвет
  // если пришел undefined или null добавим белый цвет
  // если пришел массив цветов добавим все цвета в общий массив

  this.addColor = function (_param) {
    if (!this._colPicActiv) this.colPicActiv = true;

    if (Array.isArray(_param)) {
      if (_param.length == 0) this.colPicActiv = false;
      this.pLColorPicker.setArray(_param);
      this.updateArrColor();
      return;
    }

    color = _param;

    if (_param == undefined || _param == null) {
      color = this.baseColor;
    }

    this.pLColorPicker.setColor(color);
    this.updateArrColor();
  };

  this.updateArrColor = function () {
    var arr = this.pLColorPicker.arrColor;
    this.arrColor = [];

    for (var i = 0; i < arr.length; i++) {
      this.arrColor.push(arr[i]);
    }
  };

  this.addColor(this.arrColor); // добавляем цвета
  // если пришел цвет удалим цвет
  // если пришел undefined или null удалим последный в списке
  // если пришел массив цветов удалим все цвета с массива

  this.removeColor = function (_param) {
    this.pLColorPicker.removeColor(_param);
    this.arrColor = this.pLColorPicker.arrColor;
  }; // чистим массив с цветами


  this.clearColor = function () {
    if (this._colPicActiv) this.colPicActiv = false;
    this.pLColorPicker.clearColor();
  };

  this.changeActiv = function () {
    if (!this._activMouse) {
      this.graphRect.clear();
      this.graphRect.beginFill(pl102.color);
      this.graphRect.drawRect(this.x, this.y, this._width, this._height + this._otstup * 2);
      this.graphRect.endFill();
    } else {
      this.graphRect.clear();
    }
  };

  this.activMouse = pl102.activMouse;
  var val, s;

  this.convToCorColor = function (_val) {
    var val = _val;
    if (val == undefined || val == null) return this.baseColor;

    if (typeof val === 'number') {
      if (val == -1) return 0xffffff;
      if (val > 16777215) return 0xffffff;
      return val;
    }

    if (typeof val === 'string') {
      val = val.replace('#', 'x');
      if (val.indexOf('0x') == -1 || val.length <= 2) return this.baseColor;
      if (val.length == 4) return val + '0000';
      if (val.length == 5) return val + val.replace('0x', '');
    }

    return val;
  };

  this.compToHex = function (c) {
    var hex = c.toString(16);
    return hex.length == 1 ? '0' + hex : hex;
  };

  this.corectForBtn = function (_val, _obj) {
    if (typeof _val === 'string') return _val;
    var r = Math.floor(_val / (256 * 256));
    var g = Math.floor(_val / 256) % 256;
    var b = _val % 256;
    if (_obj) return {
      r: r,
      g: g,
      b: b
    };
    return '0x' + this.compToHex(r) + this.compToHex(g) + this.compToHex(b);
  };

  this.reposition();
}

PLColor.prototype = Object.create(PIXI.Container.prototype);
PLColor.prototype.constructor = PLColor;
Object.defineProperties(PLColor.prototype, {
  width: {
    set: function set(value) {
      if (this._width == value) return;
      this._width = value;
      this.reposition();
    },
    get: function get() {
      return this._width;
    }
  },
  height: {
    set: function set(value) {
      if (this._height == value) return;
      this._height = value;
      this.reposition();
    },
    get: function get() {
      return this._height;
    }
  },
  color: {
    set: function set(value) {
      if (this._color == value) return;
      this._color = this.convToCorColor(value);
      this._value = this._color;

      if (this._text == 'null') {
        this.button.text = this.corectForBtn(this._color);
        this.button.color = this._color;
      } else {
        this.button.color = this._color;
      }

      this.pLColorPickerPanel.setColor(this._color);
      this.reposition();
    },
    get: function get() {
      return this._color;
    }
  },
  value: {
    set: function set(v) {
      if (this._value == v) return;
      this._value = this.convToCorColor(v);
      this._color = this._value;

      if (this._text == 'null') {
        this.button.text = this.corectForBtn(this._color);
        this.button.color = this._value;
      } else {
        this.button.color = this._value;
      }

      this.pLColorPickerPanel.setColor(this._value);
      this.reposition();
    },
    get: function get() {
      return this._value;
    }
  },
  text: {
    set: function set(value) {
      if (this._text == value) return;
      this._text = value;

      if (this._text == 'null' || this._text == null) {
        this._text = 'null';
        this.button.text = this.corectForBtn(this._color);
      } else {
        this.button.text = this._text;
      }
    },
    get: function get() {
      return this._text;
    }
  },
  otstup: {
    set: function set(value) {
      if (this._otstup == value) return;
      this._otstup = value;
      this.button.x = this._otstup;
      this.button.y = this._otstup;
      this.pLColorPicker.x = this._otstup;
      this.reposition();
    },
    get: function get() {
      return this._otstup;
    }
  },
  boolActiv: {
    set: function set(value) {
      if (this._boolActiv == value) return;
      this._boolActiv = value;
    },
    get: function get() {
      return this._boolActiv;
    }
  },
  activMouse: {
    set: function set(value) {
      if (this._activMouse === value) return;
      this._activMouse = value;
      if (this.pLColorPickerPanel.activ) this.colorPanelVisible(value); // debugger

      this.changeActiv();
    },
    get: function get() {
      return this._activMouse;
    }
  },
  colPicActiv: {
    set: function set(value) {
      if (this._colPicActiv == value) return;
      this._colPicActiv = value;
      if (!this._colPicActiv) this.clearColor();
      this.pLColorPicker.visible = this._colPicActiv;
      this.btnPanel1.visible = this._colPicActiv;
      this.reposition();
    },
    get: function get() {
      return this._colPicActiv;
    }
  },
  boolPlus: {
    set: function set(value) {
      if (this._boolPlus == value) return;
      this._boolPlus = value;
    },
    get: function get() {
      return this._boolPlus;
    }
  },
  kolElRow: {
    set: function set(value) {
      if (this._kolElRow == value) return;
      this._kolElRow = value;
      this.pLColorPicker.kolElRow = this._kolElRow;
      this.reposition();
    },
    get: function get() {
      return this._kolElRow;
    }
  },
  kolColor: {
    set: function set(value) {
      if (this._kolColor == value) return;
      this._kolColor = value;
      this.pLColorPicker.kolColor = this._kolColor;
      this.reposition();
    },
    get: function get() {
      return this._kolColor;
    }
  }
});

function PLColorPicker(cont, x, y, _arr, fun, funSize) {
  PIXI.Container.call(this);
  cont.addChild(this);
  this.type = 'PLColorPicker';
  var self = this;
  pl102.addElement(this);
  this.fun = fun;
  this.funSize = funSize; // передает размеры кнопок в компонент PLColor

  this.x = x || 0;
  this.y = y || 0;
  this._kolColor = 100; // общее ограничение цветов

  this._kolElRow = 7; // ограничение цветов в ряду, -1 - растягивает на всю длину компонента

  this._width = 100;
  this._height = pl102.wh;
  this._activContur = false;
  this._otstup = -1; // по х

  this._otstup1 = 2; // по y

  this.otstup2 = 0; // отступ контура

  this.debugContur = false;
  this.arrColor = [];
  this.arrButton = [];
  this._color = '0xffffff';
  this.color1 = 0x6d6e70;
  this.index;
  this.wh = 0;
  this.typeWH = 'width';
  this.trick = 1; // толщина линии контура

  var button;
  this.contur = new PLContur(this, -this.otstup2, -this.otstup2);
  this.contur.visible = false;
  this.contur.color = this.color1;
  this.contur.thickness = this.trick;
  if (this._activContur) this.contur.visible = true;

  this.funDown = function () {
    self.index = this.idName;
    self.color = self.arrColor[self.index];
    if (self.fun) self.fun();
  }; // добавляем кнопки


  this.plusBut = function () {
    button = new PLButton(this, 0, 0, '', this.funDown);
    pl102.removeElement(button, true);
    button.boolAnimKontut = false;
    button.idName = this.arrButton.length;
    button.width = button.height = this._height;
    button.panel.image.visible = false;
    this.arrButton.push(button);
  };

  this.moveKontur = function (_color) {
    this.index = -1;

    for (var i = 0; i < this.arrButton.length; i++) {
      if (this.arrButton[i].color === _color) {
        this.corectPosCont(this.arrButton[i].ii, this.arrButton[i].jj);
        this.index = i;
        this.contur.visible = true;
        return;
      }
    }

    this.contur.visible = false;
  };

  var columnContur = 0;
  var rowContur = 0;

  this.corectPosCont = function (_col, _row) {
    if (_col !== undefined) columnContur = _col;
    if (_row !== undefined) rowContur = _row;
    this.contur.x = columnContur * (this.wh + this._otstup) - this.otstup2;
    this.contur.y = rowContur * (this.wh + this._otstup1) - this.otstup2;
  }; // растовляет элементы


  this.draw = function () {
    this.corectWH();

    if (this.arrColor.length > this.arrButton.length) {
      this.plusBut();
      this.addChild(this.contur);
      this.draw();
      return;
    }

    for (var i = 0; i < this.arrButton.length; i++) {
      if (this.arrColor[i] != undefined) this.arrButton[i].color = this.arrColor[i];
    }

    for (var i = 0; i < this.arrButton.length; i++) {
      if (this.arrColor.length > i && i < this._kolColor) this.arrButton[i].visible = true;else this.arrButton[i].visible = false;
    }

    this.reposition();
    if (this.funSize) this.funSize();
    if (this.debugContur) this.drawDebCont();
  };

  this.calcRows = function () {
    var k = this.arrColor.length;
    if (this._kolColor < this.arrColor.length) k = this._kolColor;
    if (k <= this._kolElRow) return 1;
    var r = (k / this._kolElRow + '').split('.');
    if (r.length == 1) return +r[0];
    return +r[0] + 1;
  };

  var m = 0,
      m1 = 0,
      m2 = 0,
      ck = 1;

  this.corectWH = function () {
    if (this.typeWH == 'width') {
      if (this._kolElRow == -1) {
        m = this._width - this._otstup * (this.arrColor.length - 1);
        m1 = m / this.arrColor.length;
        this.wh = m1;
        this._height = m1;
      } else {
        m = this._width - this._otstup * (this._kolElRow - 1);
        m1 = m / this._kolElRow;
        this.wh = m1;
        ck = this.calcRows();
        this._height = this.wh * ck + this._otstup1 * (ck - 1);
      }
    }

    if (this.typeWH == 'height') {
      if (this._kolElRow == -1) {
        m = this._height * this.arrColor.length;
        m1 = this._otstup * (this.arrColor.length - 1);
        this.wh = this._height;
        this._width = m + m1;
      } else {
        ck = this.calcRows();
        m2 = (this._height - this._otstup1 * (ck - 1)) / ck;
        this.wh = m2;
        m = m2 * this._kolElRow;
        m1 = this._otstup * (this._kolElRow - 1);
        this._width = m + m1;
      }
    }
  }; // перерисовка кнопок при инменении размеров


  this.reposition = function () {
    var row = 1;
    var ii = 0;
    var jj = 0;

    for (var i = 0; i < this.arrButton.length; i++) {
      if (this.arrButton[i].visible == true) {
        this.arrButton[i].ii = ii;
        this.arrButton[i].jj = jj;
        this.arrButton[i].width = this.wh;
        this.arrButton[i].height = this.wh;
        this.contur.width = this.wh + this.otstup2 * 2;
        this.contur.height = this.wh + this.otstup2 * 2;
        this.arrButton[i].x = ii * (this.wh + this._otstup);
        this.arrButton[i].y = jj * (this.wh + this._otstup1);
      }

      if (this._kolElRow != -1) {
        ii++;

        if (ii >= this._kolElRow) {
          jj++;
          ii = 0;
        }
      } else {
        ii++;
      }
    }

    if (this.funSize) this.funSize();
  };

  var graphDeb;

  this.drawDebCont = function () {
    if (!graphDeb) {
      graphDeb = new PIXI.Graphics();
      this.addChild(graphDeb);
    }

    graphDeb.clear();
    graphDeb.lineStyle(1, 0xff0000);
    graphDeb.drawRect(0, 0, this.width, this.height);
  }; // получаем массив цветов и перерисовываем


  this.setArray = function (_arr) {
    for (var i = 0; i < _arr.length; i++) {
      this.arrColor.push(_arr[i]);
    }

    this.draw();
  }; // получаем цвет и добавляем в начало массива


  this.setColor = function (_color) {
    this.color = _color;
    if (this.arrColor.length != 0) this.arrColor.pop();
    this.arrColor.unshift(_color);
    this.draw();
  }; // добавляем цвета
  // если пришел цвет удалим цвет
  // если пришел undefined или null удалим последный в списке
  // если пришел массив цветов удалим все цвета с массива


  this.removeColor = function (_param) {
    if (_param == undefined || _param == null) {
      this.arrColor.pop();
      return;
    }

    if (Array.isArray(_param)) {
      for (var i = 0; i < _param.length; i++) {
        for (var j = 0; j < this.arrColor.length; j++) {
          if (_param[i] == this.arrColor[j]) {
            this.arrColor.splice(j, 1);
          }
        }
      }
    } else {
      for (var i = 0; i < this.arrColor.length; i++) {
        if (this.arrColor[i] == _param) {
          this.arrColor.splice(i, 1);
        }
      }
    }

    this.draw();
  };

  this.clearColor = function () {
    this.arrColor.length = 0;
    this.draw();
  };
}

PLColorPicker.prototype = Object.create(PIXI.Container.prototype);
PLColorPicker.prototype.constructor = PLColorPicker;
Object.defineProperties(PLColorPicker.prototype, {
  color: {
    set: function set(value) {
      if (this._color == value) return;
      this._color = value;
      this.moveKontur(this._color);
    },
    get: function get() {
      return this._color;
    }
  },
  width: {
    set: function set(value) {
      if (this._width == value) return;
      this._width = value;
      this.typeWH = 'width';
      this.draw();
      this.corectPosCont();
    },
    get: function get() {
      return this._width;
    }
  },
  height: {
    set: function set(value) {
      if (this._height == value) return;
      this._height = value;
      this.typeWH = 'height';
      this.draw();
      this.corectPosCont();
    },
    get: function get() {
      return this._height;
    }
  },
  kolColor: {
    set: function set(value) {
      if (this._kolColor == value) return;
      this._kolColor = value;
      this.draw();
    },
    get: function get() {
      return this._kolColor;
    }
  },
  kolElRow: {
    set: function set(value) {
      if (this._kolElRow == value) return;
      this._kolElRow = Math.round(value);
      this.draw();
    },
    get: function get() {
      return this._kolElRow;
    }
  },
  activContur: {
    set: function set(value) {
      if (this._activContur == value) return;
      this._activContur = value;
      this.contur.visible = this._activContur;
    },
    get: function get() {
      return this._activContur;
    }
  },
  otstup: {
    set: function set(value) {
      if (this._otstup == value) return;
      this._otstup = value;
      this.draw();
    },
    get: function get() {
      return this._otstup;
    }
  },
  otstup1: {
    set: function set(value) {
      if (this._otstup1 == value) return;
      this._otstup1 = value;
      this.draw();
    },
    get: function get() {
      return this._otstup1;
    }
  }
});

function PLColorPick(cont, x, y, fun) {
  PIXI.Container.call(this);
  cont.addChild(this);
  this.type = 'PLColorPickDeb';
  var self = this;
  pl102.addElement(this);
  this.fun = fun;
  this.funDrag;
  this.funOut;
  this.x = x || 0;
  this.y = y || 0;
  this._width = 148;
  this._height = 77;
  this._activMouse = true;
  this._konturColor = pl102.color1;
  this.color = '0xffffff';
  this.colorDrag = '0xffffff';
  this.interactive = true;
  this.dragEvent = true; // возможность отключить выбор цвета по движению

  this.colorBuffer; // сохраняем цвет при клике
  /// Графика, накрывающая кнопку

  this.graphRect = new PIXI.Graphics();
  this.addChild(this.graphRect);
  this.graphRect.alpha = 0.5;
  this.graphRect.interactive = true;
  this._activ = false; // сюда грузим канвас и полуем цвет по координатам

  this.bmp = new PLBitmapData();
  pl102.removeElement(this.bmp, true);
  this.bmp.width = this._width;
  this.bmp.height = this._height; // график для канваса

  this.sprite = new PIXI.Sprite();
  this.addChild(this.sprite);
  this.graphicsBorder = new PIXI.Graphics();
  this.addChild(this.graphicsBorder);
  this.graphColKont = new PIXI.Graphics();
  this.addChild(this.graphColKont);
  this.graphCol = new PIXI.Graphics();
  this.addChild(this.graphCol); // создаем канвас и набиваем цветами

  this.canvas = document.createElement('canvas');
  this.c2d = this.canvas.getContext('2d');
  this.canvas.width = this._width;
  this.canvas.height = this._height;

  this.hexToRgb = function (color) {
    var cache = /^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/.exec(color);
    return {
      r: parseInt(cache[1], 16),
      g: parseInt(cache[2], 16),
      b: parseInt(cache[3], 16)
    };
  };

  this.decStrToRgb = function (color) {
    var cache = /^0x([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/.exec(color);
    return {
      r: parseInt(cache[1], 16),
      g: parseInt(cache[2], 16),
      b: parseInt(cache[3], 16)
    };
  };

  this.hue = [['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'], ['#FFFAFA', '#FFFFFA', '#FFFFFA', '#FAFFFF', '#FAFFFF', '#FFFAFF', '#FFFAFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'], ['#FFC2C2', '#FFFFC2', '#F9FFC2', '#C2FFFF', '#C2FFFF', '#FFC2FF', '#FFC2FF', '#FFF1F1', '#FFFFFF', '#D1D1D1', '#D1D1D1'], ['#FF8A8A', '#FFFF8A', '#C1FF8A', '#8AFFFF', '#8AFFFF', '#F18AFF', '#FF8AFF', '#FFB9B9', '#FFFFFF', '#999999', '#999999'], ['#FF5151', '#FFFF51', '#88FF51', '#51FFF8', '#51C8FF', '#B851FF', '#FF51FF', '#FF8080', '#FFFFFF', '#606060', '#606060'], ['#FF1919', '#FFFF19', '#50FF19', '#19FFC0', '#1990FF', '#8019FF', '#FF19D0', '#FF4848', '#FFFFFF', '#282828', '#282828'], ['#E10000', '#E1CA00', '#30E100', '#00E193', '#0069E1', '#5A00E1', '#E100A1', '#E12929', '#D2D2D2', '#0D0D0D', '#0D0D0D'], ['#A80000', '#A89700', '#24A800', '#00A86E', '#004EA8', '#4300A8', '#A80078', '#A81E1E', '#9D9D9D', '#090909', '#090909'], ['#700000', '#706500', '#187000', '#007049', '#003470', '#2D0070', '#700050', '#701414', '#686868', '#060606', '#060606'], ['#380000', '#383200', '#0C3800', '#003824', '#001A38', '#160038', '#380028', '#380A0A', '#343434', '#030303', '#030303'], ['#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000']];
  var colAdeb, colBdeb;
  this.wTon = 0;
  var procTon = 0.3;

  this.draw = function () {
    this.bmp.width = Math.floor(this._width); // в PLBitmapData нужно передавать целое число

    this.bmp.height = Math.floor(this._height);
    this.c2d.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvas.width = this._width;
    this.canvas.height = this._height; // алгоритм отрисовки градиента с PXColor

    this.wX = Math.round(this._width / 9.0909);
    this.wY = Math.round(this._height / 9.0909);
    var i, j, k;
    this._wColor;
    this._wColor1;
    this._hColor;
    this._hColor1;
    this._rr;
    this._gg;
    this._bb;
    this.colorA;
    this.colorB;

    for (i = 0; i < this.hue.length - 1; i++) {
      for (j = 0; j < this.hue[i].length - 1; j++) {
        this._wColor = this.hexToRgb(this.hue[i][j]);
        this._wColor1 = this.hexToRgb(this.hue[i][j + 1]);
        this._hColor = this.hexToRgb(this.hue[i + 1][j]);
        this._hColor1 = this.hexToRgb(this.hue[i + 1][j + 1]);

        for (k = 0; k < this.wX; k++) {
          this._rr = this._wColor.r + Math.round((this._wColor1.r - this._wColor.r) * (k / (this.wX - 1)));
          this._gg = this._wColor.g + Math.round((this._wColor1.g - this._wColor.g) * (k / (this.wX - 1)));
          this._bb = this._wColor.b + Math.round((this._wColor1.b - this._wColor.b) * (k / (this.wX - 1)));
          this.colorA = 'rgb(' + this._rr + ',' + this._gg + ',' + this._bb + ')';
          this._rr = this._hColor.r + Math.round((this._hColor1.r - this._hColor.r) * (k / (this.wX - 1)));
          this._gg = this._hColor.g + Math.round((this._hColor1.g - this._hColor.g) * (k / (this.wX - 1)));
          this._bb = this._hColor.b + Math.round((this._hColor1.b - this._hColor.b) * (k / (this.wX - 1)));
          this.colorB = 'rgb(' + this._rr + ',' + this._gg + ',' + this._bb + ')';
          this.grd = this.c2d.createLinearGradient(0, this.wY * i, 0, this.wY * i + this.wY);
          this.grd.addColorStop(0, this.colorA);
          this.grd.addColorStop(1, this.colorB);
          this.c2d.fillStyle = this.grd;
          this.c2d.fillRect(j * this.wX + k, this.wY * i, 1, this.wY);
        }
      }
    } // саменяем канвас с PLBitmapData на свой


    this.bmp.setCanvas(self.canvas, self.c2d);
    this.sprite.texture = PIXI.Texture.fromCanvas(this.bmp.canvas);
    this.sprite.width = this._width;
    this.sprite.height = this._height;
    this.drawKontur();
    this.wTon = this._width - self.wX * 2 - self.wX * procTon;
  };

  this.drawKontur = function () {
    // рисуем рамку компонента
    this.graphicsBorder.clear();
    this.graphicsBorder.lineStyle(1, this.konturColor, 1);
    this.graphicsBorder.drawRect(0, 0, this._width, this._height);
    this.graphicsBorder.endFill();
  };

  var imageData,
      data,
      conv,
      maxd = 0,
      wd;

  this.getwTon = function () {
    imageData = this.c2d.getImageData(self.wX * 6, this._height / 2, self.wX, 1);
    data = imageData.data;

    for (var i = 0; i < data.length; i += 4) {
      conv = this.rgbToHsl(data[i], data[i + 1], data[i + 2]);

      if (maxd < conv[0]) {
        wd = i / 4;
      }
    }

    return wd;
  };

  var colhsl, colrgb, colrgbr;
  var posColor = new PIXI.Point();
  var rezD;

  this.findCordFromColor = function (_color) {
    colrgbr = this.decStrToRgb(_color);
    colrgb = [colrgbr.r, colrgbr.g, colrgbr.b];
    colhsl = this.rgbToHsl(colrgbr.r, colrgbr.g, colrgbr.b); // позиция точки выбранного цвета относительно пришедшего цвета

    posColor.x = this.wTon * colhsl[0];
    posColor.y = this._height - this._height * colhsl[2];

    if (colhsl[0] == 0) {
      rezD = this.getColData(colrgb, self.wX * 7, 0, 1, this._height);
      posColor.x = self.wX * 7;
      posColor.y = rezD[3];
    }

    if (colhsl[0] == 0 && colhsl[1] == 0) {
      rezD = this.getColData(colrgb, self.wX * 8, 0, 1, this._height);
      posColor.x = self.wX * 8;
      posColor.y = rezD[3];
    }

    return posColor;
  };

  this.getNearestRGB = function (_colorRGB, _arrRGB) {
    var minDistance = Number.MAX_SAFE_INTEGER;
    var nearestRGB = [0, 0, 0, 0];

    for (var i = 0; i < _arrRGB.length; i++) {
      var curColor = _arrRGB[i];
      var distance = Math.sqrt(Math.pow(_colorRGB[0] - curColor[0], 2) + Math.pow(_colorRGB[1] - curColor[1], 2) + Math.pow(_colorRGB[2] - curColor[2], 2));

      if (distance < minDistance) {
        minDistance = distance;
        nearestRGB = curColor;
      }
    }

    return nearestRGB;
  };

  var dDataVert;
  var dDaVert;

  this.getColData = function (_rgb, _x, _y, _w, _h) {
    dDataVert = this.c2d.getImageData(_x, _y, _w, _h);
    dDaVert = this.getArrCol(dDataVert);
    return this.getNearestRGB(_rgb, dDaVert);
  };

  var arrDataConv = [];
  var arrcf = [];

  this.getArrCol = function (_arr) {
    arrDataConv = [];

    for (var i = 0; i < _arr.data.length; i += 4) {
      arrcf = [];
      arrcf[0] = _arr.data[i];
      arrcf[1] = _arr.data[i + 1];
      arrcf[2] = _arr.data[i + 2];
      arrcf[3] = i / 4;
      arrDataConv.push(arrcf);
    }

    return arrDataConv;
  }; // сюда приходит цвет


  var brigh, newPosCol, ccolor;
  this.bmpCord = {};
  this.bmpCord.xpr = 0;
  this.bmpCord.ypr = 0;

  this.setColor = function (_color, _par, _pos) {
    ccolor = _color;
    if (typeof ccolor === 'number') ccolor = this.numDecToDecStr(_color);
    if (ccolor.indexOf('#') != -1) ccolor = _color.replace('#', '0x');
    if (_pos != undefined) this.bmpCord = _pos;
    newPosCol = this.findCordFromColor(ccolor);
    this.bmpPos.x = newPosCol.x;
    this.bmpPos.y = newPosCol.y;
    colorArr = this.bmp.getPixel(Math.round(this.bmpPosCor.x), Math.round(this.bmpPos.y));
    this.drawContCol('drag');

    if (_par == 'click') {
      this.drawContCol('click');
      this.drawContCol('out');
      this.color = ccolor;
    }

    if (_par == 'out') this.drawContCol('out');
  };

  this.setColorRGB = function (_rgb) {
    var dec = this.rgbToDecStr(_rgb);
    this.setColor(dec.replace('0x', '#'), 'click');
  };

  this.componentToHex = function (c) {
    var hex = c.toString(16);
    return hex.length == 1 ? '0' + hex : hex;
  };

  this.numDecToDecStr = function (_val) {
    if (typeof _val === 'string') return _val;
    var r = Math.floor(_val / (256 * 256));
    var g = Math.floor(_val / 256) % 256;
    var b = _val % 256;
    return '0x' + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
  };

  this.getNewBrightnessColorOne = function (hexcode) {
    var r = parseInt(hexcode.slice(2, 4), 16),
        g = parseInt(hexcode.slice(4, 6), 16),
        b = parseInt(hexcode.slice(6, 8), 16),
        HSL = this.rgbToHsl(r, g, b);
    return 100 - Math.round(HSL[2] * 100);
  }; // конвертируем цвет с RGB в HSL


  this.rgbToHsl = function (r, g, b) {
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    var h,
        s,
        l = (max + min) / 2;

    if (max == min) {
      h = s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;

        case g:
          h = (b - r) / d + 2;
          break;

        case b:
          h = (r - g) / d + 4;
          break;
      }

      h /= 6;
    }

    return [h, s, l];
  }; // вспомогательная функция для rgbToDecStr


  this.cap = function (comp) {
    return comp.length == 1 ? '0' + comp : comp;
  }; // переводим с rgb в hex


  this.rgbToDecStr = function (rgbArr) {
    if (rgbArr == undefined) return '0x000000';
    return '0x' + self.cap(rgbArr[0].toString(16)) + self.cap(rgbArr[1].toString(16)) + self.cap(rgbArr[2].toString(16));
  };

  this.rgb2hsl = function (r, g, b) {
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    var h,
        s,
        l = (max + min) / 2;

    if (max == min) {
      h = s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;

        case g:
          h = (b - r) / d + 2;
          break;

        case b:
          h = (r - g) / d + 4;
          break;
      }

      h /= 6;
    }

    return [h, s, l];
  };

  this.hue2rgb = function (p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  this.hslToRgb = function (h, s, l) {
    var r, g, b;

    if (s == 0) {
      r = g = b = l; // achromatic
    } else {
      this.hue2rgb(p, q, t);
      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = this.hue2rgb(p, q, h + 1 / 3);
      g = this.hue2rgb(p, q, h);
      b = this.hue2rgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }; // получаем цвет по координатам


  var i,
      j,
      colorArr = [255, 255, 255, 255],
      colorCont;

  this.getColor = function () {
    self.bmpCord.xpr = self.bmpPos.x / this._width;
    self.bmpCord.ypr = self.bmpPos.y / this._height;
    i = Math.round(self.bmpPos.x);
    j = Math.round(self.bmpPos.y); // получаем цвет в виде [0, 0, 0, 0]

    colorArr = self.bmp.getPixel(Math.round(i), Math.round(j));
    return self.rgbToDecStr(colorArr);
  };

  var stepo, stept; // определяем цвет точки выбранного цвета (светлее\темнее)

  this.getColCont = function (_color) {
    stepo = self.rgb2hsl(_color[0], _color[1], _color[2]);
    stepo[0] = 0;
    stepo[1] = 0;
    stepo[2] = 1 - stepo[2];
    stept = this.hslToRgb(stepo[0], stepo[1], stepo[2]);
    return this.rgbToDecStr(stept);
  };

  var xf, yf, xc, yc, bool, col, colq;
  var sizCic = 2; // true - отрисовка позиции что таскаем
  // false - отрисовка позиции цвета что выбрали
  // "out" - вернем отрисовку позиции что таскаем в положения выбранного цвета

  this.drawContCol = function (_bool) {
    bool = _bool;
    xf = this.bmpPos.x;
    yf = this.bmpPos.y;
    colorCont = self.getColCont(colorArr);
    colq = colorCont;

    if (bool == 'out') {
      xf = xc;
      yf = yc;
      colq = col;
      this.bmpPos.x = this.bmpPosCor.x;
      bool = 'drag';
    }

    if (xf < sizCic) xf = sizCic;
    if (yf < sizCic) yf = sizCic;
    if (xf > this._width - sizCic) xf = this._width - sizCic;
    if (yf > this._height - sizCic) yf = this._height - sizCic;

    if (bool == 'drag') {
      this.graphCol.clear();
      if (xf == undefined || yf == undefined) return;
      this.graphCol.beginFill(colq, 1);
      this.graphCol.drawCircle(xf, yf, sizCic);
      this.graphCol.endFill();
    }

    if (bool == 'click') {
      xc = this.bmpPos.x;
      yc = this.bmpPos.y;
      col = colq;
      this.graphColKont.clear();
      this.graphColKont.lineStyle(1, colq, 1);
      this.graphColKont.drawCircle(xf, yf, sizCic);
      this.graphColKont.endFill();
    }
  }; // кликаем и берем цвет


  this.colorClick = function () {
    self.color = self.colorDrag;
    self.bmpPosCor.x = self.bmpPos.x;
    self.bmpPosCor.y = self.bmpPos.y;
    self.drawContCol('click');
    if (self.fun) self.fun();
  }; // двигаем и берем цвет


  this.bmpPos = {};
  this.bmpPos.x = 0;
  this.bmpPos.y = 0;
  this.bmpPosCor = {};
  this.bmpPosCor.x = 0;
  this.bmpPosCor.y = 0;

  this.colorMove = function () {
    self.bmpPos = self.toLocal(pl102.global);

    if (self.bmpPos.x < 0 || self.bmpPos.y < 0 || self.bmpPos.x > self._width || self.bmpPos.y > self._height) {
      self.mouseOut();
      return;
    }

    self.colorDrag = self.getColor();
    self.drawContCol('drag');
    if (self.funDrag) self.funDrag();
  };

  this.changeActiv = function () {
    if (!this._activMouse) {
      this.graphRect.clear();
      this.graphRect.beginFill(pl102.color);
      this.graphRect.drawRect(0, 0, this._width, this._height);
      this.graphRect.endFill();
    } else {
      this.graphRect.clear();
    }
  }; // вышли из компонента


  this.mouseOut = function () {
    self.colorDrag = self.color;
    self.drawContCol('out');

    if (pl102.isMouseEvents) {
      this.off('mousemove', this.colorMove);
    }

    if (pl102.isTouchEvents) {
      this.off('touchmove', this.colorMove);
    }

    if (pl102.isMouseEvents) {
      this.on('mouseover', this.colorMove);
    }

    if (self.funOut) self.funOut();
  }; // зашли в область компонента


  this.mouseOver = function () {
    if (pl102.isMouseEvents) {
      this.on('mousemove', this.colorMove);
    }

    if (pl102.isTouchEvents) {
      this.on('touchmove', this.colorMove);
    }

    if (pl102.isMouseEvents) {
      this.off('mouseover', this.colorMove);
    }
  };

  this.draw();
}

PLColorPick.prototype = Object.create(PIXI.Container.prototype);
PLColorPick.prototype.constructor = PLColorPick;
Object.defineProperties(PLColorPick.prototype, {
  width: {
    set: function set(value) {
      if (this._width == value) return;

      if (value < 25) {
        this._width = 25;
      } else {
        this._width = value;
      }

      this.draw();
      this.bmpPosCor.x = this._width;
    },
    get: function get() {
      return this._width;
    }
  },
  height: {
    set: function set(value) {
      if (this._height == value) return;

      if (value < 25) {
        this._height = 25;
      } else {
        this._height = value;
      }

      this.draw();
    },
    get: function get() {
      return this._height;
    }
  },
  activ: {
    set: function set(value) {
      if (this._activ == value) return;
      this._activ = value;

      if (this._activ) {
        if (pl102.isMouseEvents) {
          this.on('click', this.colorClick);
        }

        if (pl102.isTouchEvents) {
          this.on('tap', this.colorClick);
        }

        if (pl102.isMouseEvents) {
          this.on('mouseover', this.mouseOver);
        }
      } else {
        if (pl102.isMouseEvents) {
          this.off('click', this.colorClick);
        }

        if (pl102.isTouchEvents) {
          this.off('tap', this.colorClick);
        }

        if (pl102.isMouseEvents) {
          this.off('mouseover', this.mouseOver);
        }
      }
    },
    get: function get() {
      return this._activ;
    }
  },
  konturColor: {
    set: function set(value) {
      if (this._konturColor == value) return;
      this.drawKontur();
    },
    get: function get() {
      return this._konturColor;
    }
  }
});

function PLColorPickerPanel(cont, x, y, fun, funDrag) {
  PIXI.Container.call(this);
  this.type = 'PLColorPickerPanel';
  var self = this;
  cont.addChild(this);
  pl102.addElement(this);
  this.fun = fun;
  this.funDrag = funDrag; // таскаем мышу внутри компонента

  this.x = x || 0;
  this.y = y || 0;
  this._width = 180;
  this._height = 100;
  this._otstup = pl102.otstup;
  this.color = '0x000000';
  this.colorDrag = '0x000000';
  this.text = '';
  this.gradientView = true; // возможность отключить компонент gradient

  this.inputRGBView = true; // возможность отключить компонент inputRGB

  this._activ = false;
  this.visible = this._activ;
  this.panel = new PLPanel(this);
  pl102.removeElement(this.panel, true);
  this.panel.image.visible = false;
  this.panel.color = 0xffffff;
  this.panel.width = this._width;
  this.panel.height = this._height; // компонент градиент пришедшего цвета от белого к черному

  this.gradient = new PLGradient(this, this._otstup + 1, this._otstup + 1);
  pl102.removeElement(this.gradient, true); // получаем цвет по клику

  this.gradient.fun = function () {
    self.color = this.color;
    self.pLColorPick.setColor(this.color.replace('0x', '#'), 'click');
    self.pLInputRGB.setColor(this.color.replace('0x', '#'));
    if (self.fun) self.fun();
  }; // получаем цвет по движению мыши


  this.gradient.funDrag = function () {
    self.color = this.colorDrag;
    self.colorDrag = this.colorDrag;
    self.pLColorPick.setColor(this.colorDrag.replace('0x', '#'));
    self.pLInputRGB.setColor(this.colorDrag.replace('0x', '#'));
    if (self.funDrag) self.funDrag();
  };

  this.gradient.funOut = function () {
    self.color = this.color;
    self.pLColorPick.setColor(this.colorDrag.replace('0x', '#'), 'out');
    self.pLInputRGB.setColor(this.color.replace('0x', '#'));
    if (self.funDrag) self.funDrag();
  }; // компонент цветовая палитра


  this.pLColorPick = new PLColorPick(this, 0, this._otstup + 1);
  pl102.removeElement(this.pLColorPick, true);

  this.pLColorPick.fun = function () {
    self.color = this.color;
    self.gradient.setColor(this.color.replace('0x', '#'), 'click');
    self.pLInputRGB.setColor(this.color.replace('0x', '#'));
    if (self.fun) self.fun();
  }; // получаем цвет по движению мыши


  this.pLColorPick.funDrag = function () {
    self.color = this.colorDrag;
    self.colorDrag = this.colorDrag;
    self.gradient.setColor(this.colorDrag.replace('0x', '#'));
    self.pLInputRGB.setColor(this.colorDrag.replace('0x', '#'));
    if (self.funDrag) self.funDrag();
  };

  this.pLColorPick.funOut = function () {
    self.color = this.color;
    self.gradient.setColor(this.color.replace('0x', '#'));
    self.pLInputRGB.setColor(this.color.replace('0x', '#'));
    if (self.funDrag) self.funDrag();
  };

  this.hexFromDec = function (decimal) {
    var code = Math.round(decimal).toString(16);
    code.length > 1 || (code = '0' + code);
    return code;
  };

  var hexcode;

  this.setColorRGB = function (color) {
    hexcode = '0x' + this.hexFromDec(color[0]) + this.hexFromDec(color[1]) + this.hexFromDec(color[2]);
    return hexcode;
  };

  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? '0' + hex : hex;
  }

  this.corectCol = function (_val) {
    if (typeof _val === 'string') {
      if (_val.indexOf('0x') != -1) return _val.replace('0x', '#');else return _val;
    }

    var r = Math.floor(_val / (256 * 256));
    var g = Math.floor(_val / 256) % 256;
    var b = _val % 256;
    return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
  };

  this.setColor = function (_color) {
    var color = this.corectCol(_color);
    self.color = color;
    self.gradient.setColor(color, 'click');
    self.pLInputRGB.setColor(color);
    self.pLColorPick.setColor(color, 'click');
  }; // компонент инпуты для воода цвета RGB


  this.pLInputRGB = new PLInputRGB(this, 0, 0, function () {
    self.color = self.setColorRGB(this.color);
    self.gradient.setColorRGB(this.color);
    self.pLColorPick.setColorRGB(this.color);
    if (self.fun) self.fun(false);
  });
  pl102.removeElement(this.pLInputRGB, true); // для перерисовки элементов компонента

  this.reposition = function () {
    this.panel.width = this._width;
    this.panel.height = this._height;
    this.gradient.width = this._width * 13 / 100;
    this.gradient.height = this._height * 77 / 100;
    this.pLColorPick.width = Math.round(this._width - this.gradient.width - this._otstup * 4 - 1);
    this.pLColorPick.height = Math.round(this._height * 77 / 100);
    this.pLColorPick.x = this.gradient.width + this._otstup * 3;
    this.pLInputRGB.width = this.pLColorPick.width;
    this.pLInputRGB.height = this._height - this.pLColorPick.height - this._otstup * 4;
    this.pLInputRGB.x = this.pLColorPick.x;
    this.pLInputRGB.y = this.pLColorPick.height + this._otstup * 2 + 1; // если отключили компонент gradient

    if (this.gradientView == false) {
      this.pLColorPick.width = Math.round(this._width - this._otstup * 3);
      this.pLColorPick.x = this._otstup + 1;
      this.pLInputRGB.width = this.pLColorPick.width;
      this.pLInputRGB.x = this._otstup;
    } // если отключили компонент inputRGB


    if (this.inputRGBView == false) {
      this.pLColorPick.height = this._height - this._otstup * 3;
      this.gradient.height = this.pLColorPick.height;
    }
  };

  this.reposition(); // отключаем компонент inputRGB и перерисовываем остальные компоненты

  this.inputRGBOff = function (value) {
    this.inputRGBView = !value;
    this.pLInputRGB.visible = !value;
    this.reposition();
  }; // отключаем компонент gradient и перерисовываем остальные компоненты


  this.gradientOff = function (value) {
    this.gradientView = !value;
    this.gradient.visible = !value;
    this.reposition();
  };

  this.changeActiv = function () {
    if (!this._activMouse) {
      this.inputRGBOff(true);
      this.gradientOff(true);
      this.graphRect.clear();
      this.graphRect.beginFill(pl102.color);
      this.graphRect.drawRect(0, 0, this._width, this._height);
      this.graphRect.endFill();
    } else {
      this.inputRGBOff(false);
      this.gradientOff(false);
      this.graphRect.clear();
    }
  };
}

PLColorPickerPanel.prototype = Object.create(PIXI.Container.prototype);
PLColorPickerPanel.prototype.constructor = PLColorPickerPanel;
Object.defineProperties(PLColorPickerPanel.prototype, {
  width: {
    set: function set(value) {
      if (this._width == value) return;
      this._width = value;
      this.reposition();
    },
    get: function get() {
      return this._width;
    }
  },
  height: {
    set: function set(value) {
      if (this._height == value) return;
      this._height = value;
      this.reposition();
    },
    get: function get() {
      return this._height;
    }
  },
  activ: {
    set: function set(value) {
      if (this._activ == value) return;
      this._activ = value;
      this.visible = this._activ;
      this.pLColorPick.activ = this._activ;
      this.gradient.activ = this._activ;
    },
    get: function get() {
      return this._activ;
    }
  }
});

function PLGradient(cont, x, y, fun, funDrag) {
  PIXI.Container.call(this);
  this.type = 'PLGradient';
  var self = this;
  cont.addChild(this);
  pl102.addElement(this);
  this.fun = fun;
  this.funDrag = funDrag;
  this.funOut;
  this.x = x || 0;
  this.y = y || 0;
  this._kolColor = 105; // количество цветов в массиве

  this._width = pl102.wh;
  this._height = 100;
  this._konturColor = pl102.color1;
  this._activ = false;
  this.colorPosition; // позиция цвета на градиенте

  this.colorArr = [];
  this.color = '0xffffff';
  this.colorDrag = '0xffffff';
  this.otstup = 0; // отступ для корректного отображения положения курсора
  // графика для отрисовки градиента

  this.graphics = new PIXI.Graphics();
  this.addChild(this.graphics); // графика для отрисовки рамки

  this.cursorFrame = new PIXI.Graphics();
  this.addChild(this.cursorFrame); // графика для отрисовки курсора

  this.cursorGraph = new PIXI.Graphics();
  this.addChild(this.cursorGraph);

  this.drawCursor = function (_x, _y) {
    this.cursorGraph.clear();
    this.cursorGraph.beginFill(0x000000, 0);
    this.cursorGraph.drawCircle(_x / 2, _y / 2, _x * 2);
    this.cursorGraph.lineStyle(0.5, 0xffffff);
    this.cursorGraph.beginFill(0x000000);
    this.cursorGraph.moveTo(0, 0);
    this.cursorGraph.lineTo(_x, _y / 2);
    this.cursorGraph.lineTo(0, _y);
    this.cursorGraph.lineTo(0, 0);
    this.cursorGraph.x = -_x / 2;
    this.otstup = _y / 2;
    this.drawFrame();
  }; // получаем новый цвет от светлого к темному относительно полученного цвета


  this.getNewBrightnessColor = function (hexcode, brightness) {
    var r = parseInt(hexcode.slice(1, 3), 16),
        g = parseInt(hexcode.slice(3, 5), 16),
        b = parseInt(hexcode.slice(5, 7), 16),
        HSL = this.rgbToHsl(r, g, b),
        RGB;
    RGB = this.hslToRgb(HSL[0], HSL[1], brightness / 100);
    hexcode = '#' + this.hexFromDec(RGB[0]) + this.hexFromDec(RGB[1]) + this.hexFromDec(RGB[2]);
    return hexcode;
  }; // получаем значение для отображения курсора напротив полученного цвета


  this.getNewBrightnessColorOne = function (hexcode) {
    var r = parseInt(hexcode.slice(1, 3), 16),
        g = parseInt(hexcode.slice(3, 5), 16),
        b = parseInt(hexcode.slice(5, 7), 16),
        HSL = this.rgbToHsl(r, g, b);
    return 100 - Math.round(HSL[2] * 100);
  }; // преобразование в десятичный шестнадцатеричный код для HEX


  this.hexFromDec = function (decimal) {
    var code = Math.round(decimal).toString(16);
    code.length > 1 || (code = '0' + code);
    return code;
  }; // конвертируем цвет с RGB в HSL


  this.rgbToHsl = function (r, g, b) {
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    var h,
        s,
        l = (max + min) / 2;

    if (max == min) {
      h = s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;

        case g:
          h = (b - r) / d + 2;
          break;

        case b:
          h = (r - g) / d + 4;
          break;
      }

      h /= 6;
    }

    return [h, s, l];
  }; // конвертируем цвет с HSL в RGB


  this.hslToRgb = function (h, s, l) {
    var r, g, b;

    if (s == 0) {
      r = g = b = l;
    } else {
      var hue2rgb = function hue2rgb(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return [r * 255, g * 255, b * 255];
  }; // устанавливаем курсор относительно полученного цвета


  var hhс, hhh;

  this.cursorPositionColor = function () {
    hhс = self._height / 100;
    hhh = self.colorPosition * hhс;
    if (hhh < 0) hhh = -self.otstup;
    if (hhh > self._height - self.otstup) hhh = self._height - self.otstup;
    self.cursorGraph.y = hhh;
  }; // берем цвет из массива относительно клика


  var hhs, i;

  this.getColorClick = function () {
    hhs = this._height / this.colorArr.length;
    i = Math.floor(this.colorPosition / hhs);
    if (this.colorArr[i] != undefined) return this.colorArr[i].replace('#', '0x');
    return 0xffffff;
  }; // отрисовка градиента


  var hh, shag;

  this.draw = function (colorArr) {
    this.graphics.clear();
    hh = this._height / colorArr.length;

    for (var i = 0; i < colorArr.length; i++) {
      this.graphics.beginFill(colorArr[i].replace('#', '0x'));
      this.graphics.drawRect(0, i * hh, this._width, hh);
    }

    this.drawFrame();
    this.cursorPositionColor();
  };

  this.drawFrame = function () {
    this.cursorFrame.clear();
    this.cursorFrame.lineStyle(1, this._konturColor, 1);
    this.cursorFrame.drawRect(0, 0, this._width, this._height);
  }; // сюда приходит цвет


  var shag, j;

  this.setColor = function (_color, _par) {
    self.colorArr = [];
    shag = 100 / this._kolColor;
    j = 0;

    for (var i = 0; i < self._kolColor; i++) {
      self.colorArr.unshift(self.getNewBrightnessColor(_color, +j.toFixed(0)));
      j += shag;
    }

    self.draw(self.colorArr);
    self.colorPosition = self.getNewBrightnessColorOne(_color); // получаем позицирю курсора относительно пришедшего цвета

    self.bmpPosCor = self.colorPosition;
    self.cursorPositionColor();
    if (_par == 'click') this.color = _color.replace('#', '0x');
  }; // сюда приходит цвет в RGB c инпутов


  var hexcode;

  this.setColorRGB = function (color) {
    hexcode = '#' + self.hexFromDec(color[0]) + self.hexFromDec(color[1]) + self.hexFromDec(color[2]);
    self.setColor(hexcode);
  }; // устанавливаем курсор относительно клика


  var hh;
  this.bmpPos = {};
  this.bmpPos.x = 0;
  this.bmpPos.y = 0;
  this.bmpPosCor = 0;

  this.colorMove = function () {
    self.bmpPos = self.graphics.toLocal(pl102.global);

    if (self.bmpPos.x < 0 || self.bmpPos.y < 0 || self.bmpPos.x > self._width || self.bmpPos.y > self._height) {
      self.mouseOut();
      return;
    }

    self.colorPosition = Math.round(self.bmpPos.y);
    if (self.colorPosition < 0) self.colorPosition = -self.otstup;
    if (self.colorPosition > self._height - self.otstup) self.colorPosition = self._height - self.otstup;
    self.cursorGraph.y = self.colorPosition; // self.cursorPositionColor();

    self.colorDrag = self.getColorClick(); // берем цвет из массива относительно клика

    if (self.funDrag) self.funDrag();
  }; // зашли в область компонента


  this.mouseOver = function () {
    if (pl102.isMouseEvents) {
      pl102.stage.on('mousemove', self.colorMove);
    }

    if (pl102.isTouchEvents) {
      pl102.stage.on('touchmove', self.colorMove);
    }

    if (pl102.isMouseEvents) {
      self.graphics.off('mouseover', self.mouseOver);
    }
  }; // вышли с компонента


  this.mouseOut = function () {
    self.colorDrag = self.color;
    self.colorPosition = self.bmpPosCor;
    self.cursorGraph.y = self.colorPosition; // self.cursorPositionColor();

    if (pl102.isMouseEvents) {
      pl102.stage.off('mousemove', self.colorMove);
    }

    if (pl102.isTouchEvents) {
      pl102.stage.off('touchmove', self.colorMove);
    }

    if (pl102.isMouseEvents) {
      self.graphics.on('mouseover', self.mouseOver);
    }

    if (self.funOut) self.funOut();
  }; // курсор опустили поставили событие двигать


  this.mouseDown = function () {
    self.bmpPosCor = self.bmpPos.y;
    self.color = self.colorDrag;
    if (self.fun) self.fun();
  };

  this.graphics.interactive = true;
  this.cursorGraph.interactive = true;
  this.cursorGraph.buttonMode = true;
  this.setColor(this.color.replace('0x', '#'), this._kolColor); // стартовая отрисовка градиента

  this.drawCursor(6, 8);
}

PLGradient.prototype = Object.create(PIXI.Container.prototype);
PLGradient.prototype.constructor = PLGradient;
Object.defineProperties(PLGradient.prototype, {
  width: {
    set: function set(value) {
      if (this._width == value) return;
      this._width = value;
      this.draw(this.colorArr);
    },
    get: function get() {
      return this._width;
    }
  },
  height: {
    set: function set(value) {
      if (this._height == value) return;
      this._height = value;
      this.draw(this.colorArr);
    },
    get: function get() {
      return this._height;
    }
  },
  activ: {
    set: function set(value) {
      if (this._activ == value) return;
      this._activ = value;

      if (this._activ) {
        if (pl102.isMouseEvents) {
          this.graphics.on('click', this.mouseDown); // срабатывание на клик

          this.cursorGraph.on('mousedown', this.mouseDown); // двигаем курсор
        }

        if (pl102.isTouchEvents) {
          this.graphics.on('tap', this.mouseDown); // срабатывание на клик

          this.cursorGraph.on('touchstart', this.mouseDown); // двигаем курсор
        }

        if (pl102.isMouseEvents) {
          this.graphics.on('mouseover', this.mouseOver);
        }
      } else {
        if (pl102.isMouseEvents) {
          this.graphics.off('click', this.mouseDown); // срабатывание на клик

          this.cursorGraph.off('mousedown', this.mouseDown); // двигаем курсор
        }

        if (pl102.isTouchEvents) {
          this.graphics.off('tap', this.mouseDown); // срабатывание на клик

          this.cursorGraph.off('touchstart', this.mouseDown); // двигаем курсор
        }

        if (pl102.isMouseEvents) {
          this.graphics.off('mouseover', this.mouseOver);
        }

        if (pl102.isMouseEvents) {
          pl102.stage.off('mousemove', this.colorMove); // pl102.stage.off("mouseup", this.mouseUpOff);
        }

        if (pl102.isTouchEvents) {
          pl102.stage.off('touchmove', this.colorMove); // pl102.stage.off("touchend", this.mouseUpOff);
        }
      }
    },
    get: function get() {
      return this._activ;
    }
  },
  konturColor: {
    set: function set(value) {
      if (this._konturColor == value) return;
      this._konturColor = value;
      this.drawFrame();
    },
    get: function get() {
      return this._konturColor;
    }
  }
});

function PLInputRGB(cont, x, y, fun) {
  PIXI.Container.call(this);
  this.type = 'PLInputRGB';
  cont.addChild(this);
  var self = this;
  pl102.addElement(this);
  this.fun = fun;
  this.x = x || 0;
  this.y = y || 0;
  this._kolColor = 10;
  this._width = 100;
  this._height = pl102.wh;
  this._otstup = pl102.otstup * 2; // отступ между инпутами

  this._otstup2 = 50; // отступ для текста RGB

  this._activMouse = false;
  this.useOne = false; // цвет работает в диапазоне 0-1

  this.color = [255, 255, 255];
  this.panel = new PLPanel(this);
  pl102.removeElement(this.panel, true);
  this.panel.image.visible = false;
  this.panel.color = 0xffffff;
  this.panel.width = this._width;
  this.panel.height = this._height;
  this.panel.kontur = false;
  this.label = new PLLabel(this, 0, 0, 'RGB:');
  pl102.removeElement(this.label, true); // инпут для ввода цвета канала R

  this.inputR = new PLInput(this, 0, 0, '', function () {
    // проверка на рамки 0-255 цвета и ввод текста
    if (self.useOne) {
      self.color[0] = Math.round(+this.value * 255);

      if (isNaN(+this.value) || +this.value < 0 || +this.value > 1) {
        self.inputR.text = 1;
        self.color[0] = 255;
      }
    } else {
      self.color[0] = +this.value;

      if (isNaN(+this.value) || +this.value < 0 || +this.value > 255) {
        self.inputR.text = 255;
        self.color[0] = 255;
      }
    }

    if (self.fun) self.fun();
  });
  pl102.removeElement(this.inputR, true);
  this.inputR.text = this.color[0]; // инпут для ввода цвета канала G

  this.inputG = new PLInput(this, 0, 0, '', function () {
    // проверка на рамки 0-255 цвета и ввод текста
    if (self.useOne) {
      self.color[1] = Math.round(+this.value * 255);

      if (isNaN(+this.value) || +this.value < 0 || +this.value > 1) {
        self.inputG.text = 1;
        self.color[1] = 255;
      }
    } else {
      self.color[1] = +this.value;

      if (isNaN(+this.value) || +this.value < 0 || +this.value > 255) {
        self.inputG.text = 255;
        self.color[1] = 255;
      }
    }

    if (self.fun) self.fun();
  });
  pl102.removeElement(this.inputG, true);
  this.inputG.text = this.color[1]; // инпут для ввода цвета канала B

  this.inputB = new PLInput(this, 0, 0, '', function () {
    // проверка на рамки 0-255 цвета и ввод текста
    if (self.useOne) {
      self.color[2] = Math.round(+this.value * 255);

      if (isNaN(+this.value) || +this.value < 0 || +this.value > 1) {
        self.inputB.text = 1;
        self.color[2] = 255;
      }
    } else {
      self.color[2] = +this.value;

      if (isNaN(+this.value) || +this.value < 0 || +this.value > 255) {
        self.inputB.text = 255;
        self.color[2] = 255;
      }
    }

    if (self.fun) self.fun();
  });
  pl102.removeElement(this.inputB, true);
  this.inputB.text = this.color[2]; // для перерисовки элементов компонента

  var ws;

  this.reposition = function () {
    ws = (self._width - self._otstup2) / 3;
    self.inputB.width = ws;
    self.inputB.x = self._width - ws + 1;
    self.inputB.height = self._height;
    self.inputG.width = ws;
    self.inputG.x = self.inputB.x - ws - self._otstup;
    self.inputG.height = self._height;
    self.inputR.x = self.inputG.x - ws - self._otstup;
    self.inputR.width = ws;
    self.inputR.height = self._height;
    self.panel.width = self._width;
    self.panel.height = self._height;
    self.label.y = (self._height - self.label.fontSize) / 2 - 2;
  };

  this.reposition(); // конвертируем цвет с HEX в RGB

  this.hexToRGB = function (color) {
    var r, g, b;
    r = parseInt(color.slice(1, 3), 16);
    g = parseInt(color.slice(3, 5), 16);
    b = parseInt(color.slice(5, 7), 16);
    return [r, g, b];
  }; // тут получаем цвет в HEX


  var okrug = 10;

  this.setColor = function (color) {
    var r, g, b;
    r = this.hexToRGB(color)[0];
    g = this.hexToRGB(color)[1];
    b = this.hexToRGB(color)[2];

    if (this.useOne) {
      this.inputR.text = Math.round(r / 255 * okrug) / okrug;
      this.inputG.text = Math.round(g / 255 * okrug) / okrug;
      this.inputB.text = Math.round(b / 255 * okrug) / okrug;
    } else {
      this.inputR.text = r;
      this.inputG.text = g;
      this.inputB.text = b;
    }

    this.color = this.hexToRGB(color);
  };
}

PLInputRGB.prototype = Object.create(PIXI.Container.prototype);
PLInputRGB.prototype.constructor = PLInputRGB;
Object.defineProperties(PLInputRGB.prototype, {
  width: {
    set: function set(value) {
      if (this._width == value) return;
      this._width = value;
      this.reposition();
    },
    get: function get() {
      return this._width;
    }
  },
  height: {
    set: function set(value) {
      if (this._height == value) return;
      this._height = value;
      this.reposition();
    },
    get: function get() {
      return this._height;
    }
  },
  otstup: {
    set: function set(value) {
      if (this._otstup == value) return;
      this._otstup = value;
      this.reposition();
    },
    get: function get() {
      return this._otstup;
    }
  },
  otstup1: {
    set: function set(value) {
      if (this._otstup2 == value) return;
      this._otstup2 = value;
      this.reposition();
    },
    get: function get() {
      return this._otstup2;
    }
  },
  activMouse: {
    set: function set(value) {
      if (this._activMouse == value) return;
      this._activMouse = value;
      this.inputR.activMouse = this._activMouse;
      this.inputG.activMouse = this._activMouse;
      this.inputB.activMouse = this._activMouse;
    },
    get: function get() {
      return this._activMouse;
    }
  }
});

function PLCheckBox(cont, _x, _y, title, fun) {
  PIXI.Container.call(this);
  this.type = 'PLCheckBox';
  var self = this;
  cont.addChild(this);
  pl102.addElement(this);
  this.fun = fun;
  this.x = _x;
  this.y = _y;
  this._value = false;
  this._width = 100;
  this._height = 18;
  this._title = title;
  this._wh10 = this._height / 2;
  this._color = 0xa7a7a7;
  this._color1 = 0x717171;
  this._activMouse = true;
  this.fontSize = 14;
  this.heightRect = 20;
  this.otstup = 20;
  this.otstup1 = 5;
  var bOver = false;
  var bLine = false;
  var activbLine = false;
  this.content = new PIXI.Container();
  this.addChild(this.content);
  this.graphics = new PIXI.Graphics();
  this.content.addChild(this.graphics);
  this.panel = new PLButton(this, 0, 0, ' ');
  pl102.removeElement(this.panel, true);
  this.panel.height = this.panel.width = this._height;
  this.panel.color1 = this._color1;
  this.panel.color = this._color1;
  this.panel.panel.nizAlpha = 0;
  this.label = new PLLabel(this, this.otstup + this.otstup1, 1, this._title);
  pl102.removeElement(this.label, true);
  this.rect = this.label.getRect();
  this.rect.width /= this.worldTransform.a;
  this.rect.height /= this.worldTransform.a;
  this.label.bold = false;
  this.label.fontSize = this.fontSize;
  this.bigBut = new PLButton(this, 0, 0, '', function () {
    self.value = !self.value;
    if (self.fun) self.fun();
  });

  this.bigBut.funUp = function () {
    if (self.funUp) self.funUp();
  };

  pl102.removeElement(this.bigBut, true);
  this.bigBut.height = this._height;
  this.bigBut.width = this._height + this.rect.width + this.otstup1;
  this.bigBut.alpha = 0;
  this.graphActivM = new PIXI.Graphics();
  this.addChild(this.graphActivM);
  this.graphActivM.alpha = 0.01;
  this.graphActivM.interactive = true;
  this.graphRect = new PIXI.Graphics();
  this.addChild(this.graphRect);
  this.graphRect.alpha = 0.5;
  this.graphRect.interactive = true;

  this.changeActiv = function () {
    if (!this._activMouse) {
      this.graphActivM.clear();
      this.graphActivM.lineStyle(1, this._color1);
      this.graphActivM.beginFill(this._color1);
      this.graphActivM.drawRect(0, 0, this.bigBut.width, this.bigBut.height);
      this.graphActivM.endFill();
      this.graphRect.clear();
      this.graphRect.beginFill(this._color1);
      this.graphRect.drawRect(0, 0, this.heightRect, this.heightRect);
      this.graphRect.endFill();
    } else {
      this.graphActivM.clear();
      this.graphRect.clear();
    }
  };

  this.draw102 = function () {
    if (bLine == true) {
      this.graphics.clear();
      this.graphics.lineStyle(1, this._color);
      this.graphics.moveTo(this.heightRect + 3, this._height - 10);
      this.graphics.lineTo(this.heightRect + this.rect.width + 3, this._height - 10);
    }
  };

  this.bigBut.funOver = function () {
    if (!activbLine) return;
    bLine = true;
    self.draw102();
  };

  this.bigBut.funOut = function () {
    if (!activbLine) return;
    bLine = false;
    self.graphics.clear();
  };
}

PLCheckBox.prototype = Object.create(PIXI.Container.prototype);
PLCheckBox.prototype.constructor = PLCheckBox;
Object.defineProperties(PLCheckBox.prototype, {
  width: {
    set: function set(value) {
      this._width = value;
      this.draw102();
    },
    get: function get() {
      return this._width;
    }
  },
  height: {
    set: function set(value) {
      this._height = value;
      this.draw102();
    },
    get: function get() {
      return this._height;
    }
  },
  title: {
    set: function set(value) {
      this._title = value;
      this.label.text = value;
      this.rect = this.label.getRect();
      this.rect.width /= this.worldTransform.a;
      this.rect.height /= this.worldTransform.a;
      this.bigBut.width = this.heightRect + this.rect.width + 5;
      this.changeActiv();
      this.draw102();
    },
    get: function get() {
      return this._title;
    }
  },
  color: {
    set: function set(value) {
      this._color = value;
      this.draw102();
    },
    get: function get() {
      return this._color;
    }
  },
  value: {
    set: function set(val) {
      this._value = val;
      this.panel.activ = val;
    },
    get: function get() {
      return this._value;
    }
  },
  activMouse: {
    set: function set(value) {
      if (this._activMouse == value) return;
      this._activMouse = value;
      this.changeActiv();
    },
    get: function get() {
      return this._activMouse;
    }
  }
});

function PLCheckBoxImage(cont, _x, _y, link, link1, fun) {
  PIXI.Container.call(this);
  cont.addChild(this);
  this.type = 'PLCheckBoxImage';
  var self = this;
  pl102.addElement(this);
  this.fun = fun;
  this.x = _x || 0;
  this.y = _y || 0;
  this._value = false;
  this._width = 100;
  this._height = 100;
  this._link = link;
  this._link1 = link1;
  this._activMouse = true;
  this._activ = false;
  this.isIlumActiv = false; // подсвечивание активности кнопки

  this.kontur = false;
  this.color = 0xcbcbcb;
  this.but = new PLButton(this, 0, 0, '', function () {
    self.value = !self.value;
    if (self.fun) self.fun();
  });
  pl102.removeElement(this.but, true);
  this.but.height = this._height;
  this.but.loadImeg(link);
  this.but.visible = false;
  this.but.panel.image.visible = false;
  this.but1 = new PLButton(this, 0, 0, '', function () {
    self.value = !self.value;
    if (self.fun) self.fun();
  });
  pl102.removeElement(this.but1, true);
  this.but1.height = this._height;
  this.but1.loadImeg(link1);
  this.but1.panel.image.visible = false;
  this.graphic = new PIXI.Graphics();
  this.addChild(this.graphic);

  this.draw102 = function () {
    this.but1.width = this.but.width = this._width;
    this.but1.height = this.but.height = this._height;

    if (this.but.image && this.but1.image) {
      this.but1.image.width = this.but.image.width = this._width;
      this.but1.image.height = this.but.image.height = this._height;
    }

    this.drawContur();
  };

  this.drawContur = function () {
    if (this.kontur) {
      this.graphic.clear();
      this.graphic.lineStyle(1, this.color);
      this.graphic.drawRect(0, 0, this._width, this._height);
    }
  };

  this.setStile = function (p, p1, p2) {
    this._width = p1;
    this._height = p2;
    this.but.setStile(p, p1, p2);
    this.but1.setStile(p, p1, p2);
    this.drawContur();
  };

  Object.defineProperty(this, 'link', {
    set: function set(value) {
      this._link = value;
      this.but.loadImeg(this._link);
    },
    get: function get() {
      return this._link;
    }
  });
  Object.defineProperty(this, 'link1', {
    set: function set(value) {
      this._link1 = value;
      this.but1.loadImeg(this._link1);
    },
    get: function get() {
      return this._link1;
    }
  });
  Object.defineProperty(this, 'width', {
    set: function set(value) {
      this._width = value;
      this.draw102();
    },
    get: function get() {
      return this._width;
    }
  });
  Object.defineProperty(this, 'height', {
    set: function set(value) {
      this._height = value;
      this.draw102();
    },
    get: function get() {
      return this._height;
    }
  });
  Object.defineProperty(this, 'value', {
    set: function set(val) {
      this._value = val;
      this.but.visible = val;
      this.but1.visible = !val;
    },
    get: function get() {
      return this._value;
    }
  });
  Object.defineProperty(this, 'activMouse', {
    set: function set(value) {
      this._activMouse = value;
      this.but.activMouse = this._activMouse;
      this.but1.activMouse = this._activMouse;
    },
    get: function get() {
      return this._activMouse;
    }
  });
  Object.defineProperty(this, 'activ', {
    set: function set(value) {
      if (this._activ !== value) {
        this._activ = value;

        if (this.isIlumActiv === true) {
          this.but.activ = this._activ;
          this.but1.activ = this._activ;
        } else {
          this.value = this._activ;
        }
      }
    },
    get: function get() {
      return this._activ;
    }
  });
  Object.defineProperty(this, 'userType', {
    set: function set(value) {
      this._userType = value;
    },
    get: function get() {
      return this._userType;
    }
  });
}

PLCheckBoxImage.prototype = Object.create(PIXI.Container.prototype);
PLCheckBoxImage.prototype.constructor = PLCheckBoxImage;

function PLTextArea(cont, _x, _y, text, fun) {
  PIXI.Container.call(this);
  this.type = 'PLTextArea';
  cont.addChild(this);
  var self = this;
  pl102.addElement(this);
  this.fun = fun;
  this.x = _x;
  this.y = _y;
  this._text = text;
  this.timeDrag = 0;
  var xz = 'textarea_' + Math.random();
  this._visiDiv = false;
  this._activMouse = true;
  this.label = document.createElement('textarea');
  this.label.id = 'input102_' + Math.random(); // this.label.type = 'text';

  this.label.style.font = pl102.style.fontStyle + ' ' + pl102.style.fontSize + 'px ' + pl102.style.fontFamily;
  this.label.style.color = pl102.colorLabel;
  this.label.style.background = pl102.color3;
  this.label.style.border = '1px solid ' + pl102.colorLabel;
  this.label.style.resize = 'none';
  this.label.style.overflow = 'hidden';
  this._color = pl102.style.fill; // цвет текст

  this._backgroundColor = '#ffffff'; // "#d0d0d0";// todo color to pl102  // цвет фона

  this._outlineColor = '#909090'; // todo color to pl102  // цвет рамки при фокусе

  this._borderColor = '#909090'; // todo color to pl102  // цвет рамки

  this._fontFamily = this.label.style.fontFamily;
  this._bold = this.label.bold;
  this.label.value = this._text;
  pl102.doc.appendChild(this.label);
  this.contLabel = new _PL102Dom.PLDOMElement(this.label, this);
  this.addChild(this.contLabel);
  this.content;
  this.graphRect; // графика накрывающая инпут

  this.graphMask;
  this.label2 = null;
  this.rect;
  this.otstup;
  this.isRectInit = false;
  this.content = new PIXI.Container();
  this.addChild(this.content);
  var rez, tmp;
  this.rect2;

  this.changeActiv = function () {
    if (this._activMouse == false) {
      this.graphRect.clear();
      this.graphCover.clear();
      this.graphMask.clear();
      this.graphMask.beginFill(0xffffff);
      this.graphMask.drawRect(0, 0, this._width, this._height);
      this.graphCover.beginFill(0xffffff);
      this.graphCover.lineStyle(1, 0x000000, 1);
      this.graphCover.drawRect(1, 1, this._width - 2, this._height - 2);
      this.graphRect.beginFill(pl102.color, 0.5);
      this.graphRect.drawRect(0, 0, this._width, this._height);
    } else {
      this.graphRect.clear();
      this.graphCover.clear();
      this.graphMask.clear();
    }
  };

  this.changeVisiDiv = function () {
    if (this.content) {
      if (this._visiDiv) {
        this.content.visible = false;
        this.contLabel.visibleDOM = this.worldVisible;
        this.drawRect();
      } else {
        this.content.visible = true;
        this.contLabel.visibleDOM = false;
        this.drawRect();
      }
    }
  };

  this.rectInitial = function () {
    this.isRectInit = true;
    this.graphMask = new PIXI.Graphics();
    this.content.addChild(this.graphMask);
    this.content.mask = this.graphMask;
    this.graphCover = new PIXI.Graphics();
    this.content.addChild(this.graphCover);
    this.graphCover.interactive = true;
    this.label2 = new PLLabel(this.content, 3, 3, this._text);
    this.label2.label.style.align = 'left'; // перенос на новую строку если в тексте есть пробелы

    this.label2.label.style.wordWrap = true; // перенос на новую строку если текст без пробелов

    this.label2.label.style.breakWords = true;
    pl102.removeElement(this.label2, true);
    this.rect = this.label2.getRect();
    this.rect.width /= this.worldTransform.a;
    this.rect.height /= this.worldTransform.a;
    this.setTinK(this.label.value);
    this.graphRect = new PIXI.Graphics();
    this.content.addChild(this.graphRect);
    this.graphRect.interactive = true;
    this.otstup = 3;
  };

  this.drawRect = function () {
    this.setTinK(this.label.value);
    this.rect = this.label2.getRect();
    this.rect.width /= this.worldTransform.a;
    this.rect.height /= this.worldTransform.a;
    this.changeActiv();
    this.syncTextAreaLabels();
  };

  this.setLabel = function (str) {
    this.checkLengthText();
    this.label2.label.style.wordWrapWidth = this._width;
    this.label2.text = str;
  };

  this.checkLengthText = function (str) {};

  this.setTinK = function (str) {
    this.setLabel(str);
  };

  this.contLabel.htmlElement.onchange = function () {
    if (self.fun) self.fun();
  };

  this.sah = 0;

  this.chInput = function (num) {
    if (num == self.sah) {
      if (self.fun != null && self.fun != undefined) {
        self.fun();
      }
    }
  };

  this.funInp;

  this.contLabel.htmlElement.oninput = function () {
    if (this._visiDiv) {}

    self.text = self.contLabel.htmlElement.value;
    self.sah++;
    var p = self.sah;
    if (self.funInp) self.funInp();
    setTimeout(function () {
      self.chInput(p);
    }, 1000);
  };

  this.kill = function () {
    document.getElementById(this.label.id).parentNode.removeChild(document.getElementById(this.label.id));
  };

  this.toRGB = function (color) {
    color = '' + color;

    if (color[0] != '#') {
      color = Number(color).toString(16);
      if (color == 0) color = '000000';
      color = '#' + color;
    }

    return color;
  };

  this.syncTextAreaLabels = function () {
    if (!this.isRectInit) this.rectInitial(); // Создает label2 (если не было)
    // Коррекция местоположение текста всвязи с заданным align;

    self.label2.label.calculateBounds();
    var wt = this.label2.label.getLocalBounds().width;
    if (this.align == 'left') this.label2.x = this.otstup;
    if (this.align == 'center') this.label2.x = this.width / 2 - wt / 2;
    if (this.align == 'right') this.label2.x = this.width - wt - this.otstup;
  };

  this.width = 100;
  this.height = 100;
  this.color = this._color;
  this.backgroundColor = this._backgroundColor;
  this.outlineColor = this._outlineColor;
  this.borderColor = this._borderColor;
}

PLTextArea.prototype = Object.create(PIXI.Container.prototype);
PLTextArea.prototype.constructor = PLTextArea;
Object.defineProperties(PLTextArea.prototype, {
  width: {
    set: function set(value) {
      this._width = value;
      this.label.width = value;
      this.label.style.width = value + 'px';
      if (this.isRectInit) this.drawRect();
    },
    get: function get() {
      return this._width;
    }
  },
  height: {
    set: function set(value) {
      this._height = value;
      this.label.height = value;
      this.label.style.height = value + 'px';
      if (this.isRectInit) this.drawRect();
    },
    get: function get() {
      return this._height;
    }
  },
  text: {
    set: function set(value) {
      this._text = value;
      this.label.value = value;
      if (this.isRectInit) this.drawRect();
    },
    get: function get() {
      return this._text;
    }
  },
  value: {
    set: function set(value) {
      this._text = value;
      this.label.value = value;
      if (this.isRectInit) this.drawRect();
    },
    get: function get() {
      return this.label.value;
    }
  },
  visiDiv: {
    set: function set(value) {
      this._visiDiv = value;
      if (this.label2 === null) this.rectInitial();
      this.changeVisiDiv();
    },
    get: function get() {
      return this._visiDiv;
    }
  },
  activMouse: {
    set: function set(value) {
      if (this._activMouse == value) return;
      this._activMouse = value;
      this.visiDiv = value;
    },
    get: function get() {
      return this._activMouse;
    }
  },
  color: {
    // цвет текста
    set: function set(value) {
      this._color = value;
      this.label.style.color = this.toRGB(value);
      if (this.isRectInit) this.label2.color = this._color;
    },
    get: function get() {
      return this._color;
    }
  },
  backgroundColor: {
    // цвет задний фон
    set: function set(value) {
      this._backgroundColor = value;
      this.label.style.backgroundColor = this.toRGB(value);
    },
    get: function get() {
      return this._backgroundColor;
    }
  },
  borderColor: {
    // цвет рамка
    set: function set(value) {
      this._borderColor = value;
      this.label.style.borderColor = this.toRGB(value);
    },
    get: function get() {
      return this._borderColor;
    }
  },
  outlineColor: {
    // цвет рамка при фокусе
    set: function set(value) {
      this._outlineColor = value;
      this.label.style.outlineColor = value;
    },
    get: function get() {
      return this._outlineColor;
    }
  },
  bold: {
    set: function set(value) {
      this._bold = value;
      if (this._bold == true) this.label.style.fontWeight = 'bold';else this.label.style.fontWeight = 'normal';
      if (this.isRectInit) this.label2.bold = this._bold;
    },
    get: function get() {
      return this._bold;
    }
  },
  align: {
    set: function set(value) {
      this._align = value;
      this.label.style.textAlign = value;
      if (this.isRectInit) this.label2.align = this._align;
    },
    get: function get() {
      return this._align;
    }
  },
  fontSize: {
    set: function set(value) {
      this._fontSize = value;
      this.label.style.fontSize = value + 'px';
      if (this.isRectInit) this.label2.fontSize = this._fontSize;
    },
    get: function get() {
      return this._fontSize;
    }
  },
  fontFamily: {
    set: function set(value) {
      this._fontFamily = value;
      this.label.style.fontFamily = value;
      if (this.isRectInit) this.label2.fontFamily = this._fontFamily;
    },
    get: function get() {
      return this._fontFamily;
    }
  }
});

function PLComboBoxImage(cont, _x, _y, arr, fun, _link) {
  PIXI.Container.call(this);
  this.type = 'PLComboBoxImage';
  this.typeCom = 'pixi';
  cont.addChild(this);
  var self = this;
  pl102.addElement(this);
  this.fun = fun;
  this.x = _x || 0;
  this.y = _y || 0;
  this._width = 100;
  this._height = 100;
  this._wh = 30;
  this._index = -1;
  this._visiPanel = false;
  this._visiCol = 10000000;
  this._color;
  this.w2 = this._width - this._wh; // переменная для правильной установки скрола, и корректного изменения ширины PXComboBoxElement

  this.array = [];
  this.arrayElement = [];
  this.indexOver = -1;
  this.otstup = 2;
  this.color1 = pl102.color2;
  this.color2 = pl102.color8;
  this.color3 = pl102.color4;
  this.color4 = pl102.color9;
  this.color5 = pl102.color;
  this.panel = new PLPanel(this, 0, this._wh); // основная панел

  pl102.removeElement(this.panel, true);
  this.panel.visible = false;
  this.panel.kontur = true;
  this.gPlus = new PIXI.Graphics(); // Для дебаг отрисовки

  this.addChild(this.gPlus);
  var bbb, ww, hContent, countMan; // нужные переменные, для разных вычислений

  this.sah = this._visiCol;
  this.graphics = new PIXI.Graphics(); // маска для корректного отображения

  this.panel.content.addChild(this.graphics);
  this.content = new PIXI.Container(); // контент для элементов PXComboBoxElement

  this.addChild(this.content);
  this.content2 = new PIXI.Container(); // контент для маски

  this.panel.content.addChild(this.content2);
  this.content2.addChild(this.content);
  this.content2.mask = this.graphics;
  this.graphics.x = this.graphics.y = this.content2.x = this.content2.y = this.otstup;
  this.faceElement = new PLImgFaceElement(this.content, 0, 0); // кнопка с отображением выбраного элемента

  this.faceElement.height = this._wh;
  this.faceElement.width = this._width;
  this.contentFilt = new PIXI.Container();
  this.addChild(this.contentFilt);
  this.tween = new TWEEN.Tween(this.contentFilt);
  this.contentFilt.addChild(this.faceElement); /// графика для нажатия на картинку стрелочки

  this.graphicsImage = new PIXI.Graphics();
  this.addChild(this.graphicsImage);
  this.graphicsImage.interactive = true;
  this.graphicsImage.alpha = 0;
  var img1 = 'data:image/png;base64,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';
  var img2 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAACXElEQVR42u2bMXbbMBBEPxXail0oTSqnSeE7pPFRcgDfKpdxlyu4SJNUbuLElglgd1MQ8KMpMAdYYN7DE59YzXBmQIor6Ojo6Ojo6OhoFMPqszXYmMmvl2vSi8UIvAN2+XiXl0chCmnNKwFaBDg3s8emsj8MByCMwDlwaWYMQxtVYGYAlyUCe+DQoAAHQIoDLlYnPVu/HF4AT6X89mbmnny5wJnnHhhL858V8i04IHM8A3av256qNrMDZK5DEaCJK18pQcou8CYbrfTAiQCq2owAy7iP6y9bKMGlALu1A1qwf3dATYDbW+Xmxri/9y3A9bVxd1cRICUlBCMl3wLMHCsCiCgx+hcgRkOk6gBhmowYfQswTUZKsh0B7wJsRiAlaagDpNYB7URARLYd0EYEZKsElRjVuQPYjsDsAHXugGE7ArMDvHeAbkeg8Q5IhKBv9kifAsxcTwT4Jl/5PF1h8bfvp8HpAz/kF19qDrAY0RhdC7CLse4AEcFCwBYnXf4gEkJ9F5CU0AYE0BCQmgOSSDsRqDlARZBGIqDVG6HiAOcCbDpAsgB4d0CMGyUogsaILU66vA/4nwAWo/sOKFxPS1B1zr9zBxgbr8akCOD9NbkZshJAAXvdGry/HjMr26CRx+QUiKLK9xYEGAZsdkAEdACugI/Ap/x5AN4v4+EECXgBHoEH4CfwMAIBOALlOfjIPEBUJkbddB8wAU+Z65E8KDllVQz4m8mX4SlXz0HZBRPwDPwBpuIAAMknRvzNCy/nhFPmPAFhWBBucli6Nirf0ri8Nf+HCTo6Ojpaxj8XjBn/uv2ZKQAAAABJRU5ErkJggg==';
  var img3 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAACeklEQVR42u2bPW4UQRSEv1mPbWyJjYhA4hA+yQZI3MUJmS/AHYh9DyRnXACJzAkGs0z3+yHYbmu8zPgAr7uk1qw0m1Rt1ev5qYWOjo6Ojo6OjkYxHB1bg4+F/PEKTXq2GIETYFM+b8qKKEQlbWUJYFWAs+vr64eWvH9zc7MF0gicAZfuzm63a4L87e0twGWNwDmwNTNUlbu7u9Dkr66uMDOALaDVAReqiqrWk2FReQIXwONYXVAdUE6GFqD8yOfAWCf/qZkhIuEdMON4CmyqAIOqIiLhHTDjOFQBnqyRcw4vwDHH/wQQkbYF6A5o2QEppfACpJSWBRCRZhww5/gkwGdVXqeE5RxagE1KfFDly7EAJoKnhAd3gKeELTnAVPGc4wuQM7Y4BEXwacKDR8CnCV10QI1AdAHWIqANzYBFB6hqOxFYnQGNREDXImDTFP46gLUhqKqHARFcgGHtUrg6IHoEbNUBrc8AEcGO9sigt4PLN0P2SbH3E67BI3AyYd8VPi44wD1jwQXYbFZuh1UVt4Rb8CtBe2kX0IR7bAFM14agKm4NRGDIyJIDTBWVBiIgafl5gKiWIShtOkBLBA7FichD8IXH4qYZt9gvRgZ/QQC3HH4XwFgWwMwwE/DYDvCBZxWAmQOqALH7AQyO6nMBDHAzLc05jy2AO3aYc06pyRmQVY2v3xoQgAE/uDwDNgBvgTfAu3LcAq/m8QgCAf4CD8A98AO4H4EE7IGf5Yt7DgWi2hgNYfzi9Al4LFz3lKLkVFRx4HchX7tDwTZApPD9A/wCpuoAAC0nRuL1hec9YSmcJyANM8JNlqWXqvIt1eW9+T9M0NHR0dEy/gH9e1uz34fFuAAAAABJRU5ErkJggg=='; /// ловим событие нажатия на кнопке

  this.faceElement.fun = function () {
    if (self.panel.height == 0) return;
    self.visiPanel = !self.visiPanel;
    this.activ = true;
    pl102.stage.on('mousedown', self.isClickPanel);
    self.drawArr();
  }; /// событие нажатия на кнопку


  this.funDown = function () {
    if (self.faceElement.fun) self.faceElement.fun();
  }; /// событие сработает когда мышку наведут на кнопку


  this.funOver = function () {
    self.changeActiv(true);
  }; /// событие сработает когда мышку уберут с кнопки


  this.funOut = function () {
    self.changeActiv(false);
  }; /// функция для смены текста в элементе faceElement


  this.changeActiv = function (val) {
    if (!this.visiPanel && !val) {
      this.faceElement.activ = false;
    }
  }; /// проверяем на панели сейчас


  this.isClickPanel = function () {
    this.p = self.toLocal(pl102.global);

    if (this.p.x <= self.panel.width && this.p.x >= 0 && this.p.y <= self.height * (self.visiCol + 1) && this.p.y >= 0 && self.visiPanel) {
      self.changeActiv(true);
      return true;
    }

    return false;
  }; /// функция отрисовки массива элементов, установка нужных цветов, и отрисовка маски


  this.drawArr = function () {
    bbb = true;
    ww = this._width - this.otstup * 2;
    var countMan = Math.round(this.arrayElement.length / 1);
    hContent = this._wh * countMan + this.otstup * (countMan + 1);
    this.panel.width = this.faceElement.width;

    for (var i = 0; i < this.arrayElement.length; i++) {
      if (this.arrayElement[i].life == true) {
        this.arrayElement[i].y = i * this.faceElement.height; // this.arrayElement[i].width=this.w2;

        this.arrayElement[i].height = this.faceElement.height;
        bbb = !bbb;

        if (this.arrayElement[i]._overOrOut) {
          this.arrayElement[i].color = this.color3;
        } else {
          if (bbb == true) {
            this.arrayElement[i].color = this.color5;
          } else {
            this.arrayElement[i].color = this.color1;
          }
        }

        if (i == this._index) {
          this.arrayElement[i].color = pl102.color11;
        }
      }
    }

    if (this._visiCol > this.array.length) {
      this.panel.height = this.array.length * this.faceElement.height + this.otstup * 2;
    } else {
      this.panel.height = this._visiCol * this.faceElement.height + this.otstup * 2;
    }

    this.graphics.clear();
    this.graphics.beginFill(this.color2);
    this.graphics.drawRect(0, 0, this.panel.width - this.otstup * 2, this.panel.height - this.otstup * 2); // this.sah*(this._wh+this.otstup)

    this.graphicsImage.clear();
    this.graphicsImage.beginFill(0);
    this.graphicsImage.drawRect(0, 0, this.faceElement.width, this.faceElement.height);
  }; /// отловка события нажатия, наведения курсора и когда курсор убирается


  this.klik = function () {
    if (this.sobEvent == 'mouseDown') {
      self._index = this.idArr;
      self.visiPanel = !self.visiPanel;
      self.faceElement.link = self.array[self._index].link;
      self.value = self.array[self._index].text;
      self.drawArr();

      if (self.fun != undefined) {
        self.fun();
      }
    }

    if (this.sobEvent == 'mouseOver') {
      self.drawArr();
    }

    if (this.sobEvent == 'mouseOut') {
      self.drawArr();
    }
  }; /// добавление нового языка


  this.addLang = function (text, link) {
    // this.array.push({text,link}); замена для минимизации
    var o = {};
    o.text = text;
    o.link = link;
    this.array.push(o);
    this.craetElement(text, link);

    if (this.arrayElement.length == 1) {
      this._index = 0;
      this.faceElement.link = this.array[this._index].link;
      this.value = this.array[this._index].text;
    }
  }; /// функция добавления элементов на панель, принимает объект или текс


  var element;

  this.craetElement = function (text, link) {
    element = undefined;

    for (var i = 0; i < this.arrayElement.length; i++) {
      if (this.arrayElement[i].life == false) {
        element = this.arrayElement[i];
        element.life = true;
      }

      this.arrayElement[i];
    }

    if (element == undefined) {
      element = new PLImgBoxElement(this.content, 0, 0, text, link, this.klik);
      element.idArr = this.arrayElement.length;
      this.arrayElement.push(element);
      element.life = true;
    }

    this.arrayElement[this.arrayElement.length - 1].width = 200;
    this.arrayElement[this.arrayElement.length - 1].height = this._wh;
    this.arrayElement[this.arrayElement.length - 1].text = text;
    this.drawArr();
  };

  this.delLang = function (text) {
    for (var i = 0; i < this.array.length; i++) {
      if (this.array[i].text == text) {
        this.array.splice(i, 1);
        this.arrayElement.splice(i, 1);

        for (var j = i; j < this.arrayElement.length; j++) {
          this.arrayElement[j].idArr--;
        }
      }
    }

    this.drawArr();
  };

  this.graphicsImage.on('mousedown', this.funDown);
  this.graphicsImage.on('mouseover', this.funOver);
  this.graphicsImage.on('mouseout', this.faceElement.mouseOut);
  this.graphicsImage.on('mouseover', this.faceElement.mouseOver);
  this.graphicsImage.on('mouseout', this.funOut);
  this.graphicsImage.interactive = true;
  this.graphicsImage.buttonMode = true;
  this.addLang('en', img1);
  this.addLang('ru', img2);
  this.addLang('de', img3);
}

PLComboBoxImage.prototype = Object.create(PIXI.Container.prototype);
PLComboBoxImage.prototype.constructor = PLComboBoxImage;
Object.defineProperties(PLComboBoxImage.prototype, {
  width: {
    set: function set(value) {
      if (this._width != value) {
        this._width = value;
        this.faceElement.width = this._width;

        for (var i = 0; i < this.arrayElement.length; i++) {
          this.arrayElement[i].width = value;
        }

        this.drawArr();
      }
    },
    get: function get() {
      return this._width;
    }
  },
  height: {
    set: function set(value) {
      if (this._height != value) {
        this._height = value;
        this.faceElement.height = this._height;
        this.panel.y = this._height;

        for (var i = 0; i < this.arrayElement.length; ++i) {
          this.arrayElement[i].height = this._height;
        }

        this.drawArr();
      }
    },
    get: function get() {
      return this._width;
    }
  },
  visiPanel: {
    set: function set(value) {
      this._visiPanel = value;
      this.panel.visible = this._visiPanel;
      this.changeActiv(this._visiPanel);
    },
    get: function get() {
      return this._visiPanel;
    }
  },
  visiCol: {
    set: function set(value) {
      this._visiCol = value;
    },
    get: function get() {
      return this._visiCol;
    }
  },
  color: {
    set: function set(value) {
      this._color = value;
      this.faceElement.color = this._color;
    },
    get: function get() {
      return this._color;
    }
  },
  index: {
    set: function set(value) {
      this._index = value;
      this.faceElement.link = this.arrayElement[this._index].link;
      this.drawArr();
    },
    get: function get() {
      return this._index;
    }
  }
});

function PLImgFaceElement(cont, _x, _y, link, fun) {
  PIXI.Container.call(this);
  this.type = 'PLImgFaceElement';
  cont.addChild(this);
  this.idArr = -1; // ид элемента в массиве, в ComboBox

  this.life = false;
  var self = this;
  this.fun = fun;
  this.x = _x || 0;
  this.y = _y || 0;
  this.fun = fun;
  this.funOver;
  this.funOut;
  this._width = 100;
  this._wh = 30;
  this._height = pl102.wh;
  this._color = pl102.color;
  this._color1 = pl102.colorButton1;
  this._activ = false;
  this._visiblePanel = true;
  this._link = link;
  this._boolAnimKontut = true; // Мигание контура при наведении

  this.contentPanel = new PIXI.Container();
  this.addChild(this.contentPanel);
  this.contentFilt = new PIXI.Container();
  this.addChild(this.contentFilt);
  this.panel = new PLPanel(this.contentPanel, 0, 0);
  this.panel.height = this._height;
  this.panel.kontur = false;
  this.panel.color = this._color;
  this.panel.nizNum = 0;
  this.panel.nizAlpha = 0.7;
  this.panel1 = new PLPanel(this.contentPanel, 0, 0);
  this.panel1.height = this._height;
  this.panel1.kontur = false;
  this.panel1.visible = false;
  this.panel1.link = pl102.base2;
  this.panel1.color = this._color1;
  this.panel1.nizNum = 0;
  this.panel1.nizAlpha = 1;
  this.tween = new TWEEN.Tween(this.contentFilt);
  this.icon = new PLImage(this, 0, 0);
  this.icon.height = this.icon.width = this._height * 0.75;
  this.icon.x = (this._width - this.icon.width) / 2;
  this.icon.y = (this._height - this.icon.height) / 2;
  if (link) this.icon.link = link;
  this.contentFilt.addChild(this.icon);
  this.filt = pl102.filter;

  this.updateIcon = function () {
    if (this._width > this._height) {
      this.icon.height = this.icon.width = this._height * 0.75;
    } else {
      this.icon.height = this.icon.width = this._width * 0.75;
    }

    this.icon.x = (this._width - this.icon.width) / 2;
    this.icon.y = (this._height - this.icon.height) / 2;
  };

  this.mouseOut = function (e) {
    if (self._boolAnimKontut == true) {
      self.panel.kontur = false;
      self.panel1.kontur = false;
    }

    if (self.funOut) self.funOut();
  };

  this.mouseOver = function (e) {
    if (self._boolAnimKontut == true) {
      self.panel.kontur = true;
      self.panel1.kontur = true;
    }

    self.contentFilt.alpha = 0.5;
    self.tween.to({
      alpha: 1
    }, 500);
    self.tween.start();
    if (self.funOver) self.funOver();
  };
}

PLImgFaceElement.prototype = Object.create(PIXI.Container.prototype);
PLImgFaceElement.prototype.constructor = PLImgFaceElement;
Object.defineProperties(PLImgFaceElement.prototype, {
  width: {
    set: function set(value) {
      this._width = value;
      this.panel.width = value;
      this.panel1.width = value;
      this.updateIcon();
    },
    get: function get() {
      return this._width;
    }
  },
  height: {
    set: function set(value) {
      this._height = value;
      this.panel.height = value;
      this.panel1.height = value;
      this.updateIcon();
    },
    get: function get() {
      return this._height;
    }
  },
  boolAnimKontut: {
    set: function set(value) {
      this._boolAnimKontut = value;

      if (this._boolAnimKontut == true) {
        this.panel.kontur = false;
        this.panel1.kontur = false;
      } else {
        this.panel.kontur = true;
        this.panel1.kontur = true;
      }
    },
    get: function get() {
      return this._boolAnimKontut;
    }
  },
  color: {
    set: function set(value) {
      if (value == undefined) return;
      this._color = value;
      this.panel.color = value;
      this.panel1.color = value;
    },
    get: function get() {
      return this._color;
    }
  },
  color1: {
    set: function set(value) {
      if (value == undefined) return;
      this._color1 = value;
      this.panel1.color1 = value;
    },
    get: function get() {
      return this._color1;
    }
  },
  visiblePanel: {
    set: function set(value) {
      this._visiblePanel = value;
      this.contentPanel.visible = value;
    },
    get: function get() {
      return this._visiblePanel;
    }
  },
  activ: {
    set: function set(value) {
      this._activ = value;
      this.panel.visible = !value;
      this.panel1.visible = value;
    },
    get: function get() {
      return this._activ;
    }
  },
  link: {
    set: function set(value) {
      this.icon.link = value;
    },
    get: function get() {
      this.icon.link;
    }
  }
});

function PLImgBoxElement(cont, _x, _y, title, link, fun) {
  PIXI.Container.call(this);
  this.type = 'PLImgBoxElement';
  cont.addChild(this);
  this.idArr = -1; // ид элемента в массиве, в ComboBox

  this.life = false;
  var self = this;
  this.fun = fun;
  this.x = _x;
  this.y = _y;
  this.title = title;
  this._color = pl102.color;
  this._wh = 30;
  this.otstup = 4;
  this._width = 100;
  this._height = pl102.wh;
  this._overOrOut = false;
  this.graphicsM = new PIXI.Graphics(); // график для возможности отлавливать события

  this.graphicsM.interactive = true;
  this.addChild(this.graphicsM);
  this.graphic = new PIXI.Graphics(); // сам элемент

  this.graphicsM.addChild(this.graphic);
  this.icon = new PLImage(this, 0, 0, pl102.base);
  this.graphicsM.addChild(this.icon);
  this.icon.link = link;
  this.icon.height = this.icon.width = this._height * 0.75;
  this.icon.x = (this._width - this.icon.width - this.otstup) / 2;
  this.icon.y = (this._height - this.icon.height - this.otstup) / 2;

  this.drawElement = function () {
    this.graphic.clear();
    this.graphic.beginFill(this._color);
    this.graphic.drawRect(0, 0, this._width, this._height, 0);
    this.updateIcon();
  };

  this.updateIcon = function () {
    if (this._width > this._height) {
      this.icon.height = this.icon.width = this._height * 0.75;
    } else {
      this.icon.height = this.icon.width = this._width * 0.75;
    }

    this.icon.x = (this._width - this.icon.width - this.otstup) / 2;
    this.icon.y = (this._height - this.icon.height - this.otstup) / 2;
  };

  this.sobEvent = 'null'; /// событие срабатывает, когда навели курсор на элемент

  this.mouseOver = function (e) {
    self.sobEvent = 'mouseOver';
    self._overOrOut = true;
    if (self.fun != undefined) self.fun();
  }; /// событие срабатывает, когда убрали курсор


  this.mouseOut = function (e) {
    self.sobEvent = 'mouseOut';
    self._overOrOut = false;
    if (self.fun != undefined) self.fun();
  }; /// событие срабатывает, когда нажали на элемент


  this.mouseDown = function (e) {
    self.sobEvent = 'mouseDown';
    if (self.fun != undefined) self.fun();
  };

  this.graphicsM.on('mouseover', this.mouseOver);
  this.graphicsM.on('mouseout', this.mouseOut);
  this.graphicsM.on('mousedown', this.mouseDown);
}

PLImgBoxElement.prototype = Object.create(PIXI.Container.prototype);
PLImgBoxElement.prototype.constructor = PLImgBoxElement;
Object.defineProperties(PLImgBoxElement.prototype, {
  width: {
    set: function set(value) {
      if (this._width != value) {
        this._width = value;
        this.drawElement();
      }
    },
    get: function get() {
      return this._width;
    }
  },
  height: {
    set: function set(value) {
      if (this._height != value) {
        this._height = value;
        this.drawElement();
      }
    },
    get: function get() {
      return this._height;
    }
  },
  color: {
    set: function set(value) {
      if (this._color != value) {
        this._color = value;
        this.drawElement();
      }
    },
    get: function get() {
      return this._color;
    }
  },
  link: {
    set: function set(value) {
      this.icon.link = value;
      this.drawElement();
    },
    get: function get() {
      return this.icon.link;
    }
  }
});

function PLComboBox(cont, _x, _y, arr, fun) {
  PIXI.Container.call(this);
  this.type = 'PLComboBox';
  this.typeCom = 'pixi';
  cont.addChild(this);
  var self = this;
  pl102.addElement(this);
  this.fun = fun;
  this.funMouseOverElement = undefined;
  this.funMouseOut = undefined;
  this.x = _x || 0;
  this.y = _y || 0;
  this._wh = 27;
  this._width = 100;
  this._height = this._wh;
  this._index = -1;
  this._value = -1;
  this._visiPanel = false;
  this._textSize = 16;
  this._visiCol = 5;
  this._color;
  this._activMouse = true;
  this._arrFont = [];
  this._revertPosCont = false;
  this._posY = undefined;
  this._docHeight = undefined;
  /** Автоматичесское определение положение панели вверх/вниз */

  this._isAutoReversePanel = false;
  this.w2 = this._width - this._wh; // переменная для правильной установки скрола, и корректного изменения ширины PXComboBoxElement

  this.array = [];
  this.arrayElement = [];
  this.indexOver = -1;
  this.otstup = 2;
  this.color1 = pl102.color2;
  this.color2 = pl102.color8;
  this.color3 = pl102.color4;
  this.color4 = pl102.color9;
  this.color5 = pl102.color;
  this.panel = new PLPanel(this, 0, this._wh); // основная панел

  pl102.removeElement(this.panel, true);
  this.panel.visible = false;
  this.panel.kontur = true;
  this.on('mouseout', function () {
    if (self.funMouseOut) self.funMouseOut();
  });
  this.interactive = true;
  this.faceElementFun;
  var bbb, ww, hContent, countMan; // нужные переменные, для разных вычислений

  this.sah = this._visiCol;
  this.graphics = new PIXI.Graphics(); // маска для корректного отображения

  this.panel.content.addChild(this.graphics);
  this.content = new PIXI.Container(); // контент для элементов PXComboBoxElement

  this.addChild(this.content);
  this.content2 = new PIXI.Container(); // контент для маски

  this.panel.content.addChild(this.content2);
  this.content2.addChild(this.content);
  this.content2.mask = this.graphics;
  this.graphics.x = this.graphics.y = this.content2.x = this.content2.y = this.otstup;
  this.faceElement = new PLFaceElement(this, 0, 0, 'Text'); // кнопка с отображением выбраного элемента

  pl102.removeElement(this.faceElement, true);
  this.faceElement.height = this._wh;
  this.faceElement.width = this._width;
  this.faceElement.label.font = this._textSize;
  this.contentFilt = new PIXI.Container();
  this.addChild(this.contentFilt);
  this.tween = new TWEEN.Tween(this.contentFilt);
  this.contentFilt.addChild(this.faceElement); /// графика для нажатия на картинку стрелочки

  this.graphicsImage = new PIXI.Graphics();
  this.addChild(this.graphicsImage);
  this.graphicsImage.interactive = true;
  this.graphicsImage.alpha = 0;
  this.graphRect = new PIXI.Graphics();
  this.addChild(this.graphRect);
  this.graphRect.alpha = 0.5;
  this.graphCover = new PIXI.Graphics();
  this.addChild(this.graphCover);
  this.graphCover.alpha = 0.5;
  this.graphCover.visible = false;
  this.graphCover.interactive = true;

  this.updateActivMouse = function () {
    if (this._visiPanel) this.visiPanel = this._activMouse;
    this.graphCover.clear();
    this.graphCover.visible = !this._activMouse;
    this.drawArr();
  };

  this.faceElement.fun = function () {
    if (self.panel.height == 0) return;
    setVisiblePanel(!self.visiPanel);
    this.activ = true;
    if (self.faceElementFun) self.faceElementFun();
    setTimeout(function () {
      if (pl102.isMouseEvents) {
        pl102.stage.on('mousedown', self.closePanel);
        pl102.stage.on('mouseup', self.closePanel);
      }

      if (pl102.isTouchEvents) {
        pl102.stage.on('touchstart', self.closePanel);
        pl102.stage.on('touchend', self.closePanel);
      }
    }, 1);
  };

  var index1 = -1;
  this.funClick;

  this.funDown = function () {
    // кидаем компонент поверх остальных в родительском контейнере
    cont.addChild(self);

    if (self._isAutoReversePanel && !self.panel.visible) {
      self.checkPositionPanel();
    }

    if (self.faceElement.fun) self.faceElement.fun();
    if (self.funClick) self.funClick();
  };

  this.funOver = function () {
    if (self._activMouse) self.changeText(true);
  };

  this.funOut = function () {
    self.changeText(false);
  };

  this.scrollBar = new PLScrollBarV(this.panel, 0, 0, function () {
    var v = self.array.length - self.sah;
    var v1 = Math.round(this.value / 100 * v);
    self.content.y = -self.faceElement.height * v1;
  });
  pl102.removeElement(this.scrollBar, true);
  this.scrollBar.offsetHit;
  this.scrollBar.visible = false;
  pl102Wheel.on(this, 'mousewheel', function (e) {
    self.scrollBar.scrolValue -= e.delta * self._wh;
    self.scrollBar.fun();
  });

  this.changeText = function (val) {
    if (!this.visiPanel && !val) {
      this.faceElement.activ = false;
    }
  }; // метод определяющий направление выпадания панели (вверх/вниз)


  var glodalPoint = new PIXI.Point();

  this.checkPositionPanel = function () {
    this.getGlobalPosition(glodalPoint);
    var isBottom = window.innerHeight - (glodalPoint.y + this._wh) > self.panel.height;
    this.revertPosCont = !isBottom;
  };

  this.isClickPanel = function () {
    this.p = self.toLocal(pl102.global);
    var px = this.p.x <= self.panel.width && this.p.x >= 0;
    var py = this.p.y <= self.height * (self.sah + 1) && this.p.y >= 0;

    if (this._revertPosCont === true) {
      py = this.p.y <= self.height && -this.p.y <= self.height * self.sah;
    }

    if (px && py && self.visiPanel) {
      self.changeText(true);
      return true;
    }

    return false;
  };

  this.closePanel = function () {
    if (self.isClickPanel() === true) {
      return;
    }

    if (pl102.isMouseEvents) {
      pl102.stage.off('mousedown', self.closePanel);
      pl102.stage.off('mouseup', self.closePanel);
    }

    if (pl102.isTouchEvents) {
      pl102.stage.off('touchstart', self.closePanel);
      pl102.stage.off('touchend', self.closePanel);
    }

    self.changeText(false);
    setVisiblePanel(false);
    self.drawArr();
  }; /// когда меняется количество отобржаемых элементов


  this.changeVisiCol = function () {
    this.sah = this._visiCol;
    this.content.y = 0;

    if (this.array.length <= this.sah) {
      this.sah = this.array.length;
      this.scrollBar.visible = false;
      this.w2 = this.faceElement.width;
    } else {
      this.scrollBar.visible = true;
      this.scrollBar.height = this.faceElement.height * this._visiCol + this.otstup;
      this.scrollBar.heightContent = this._wh * this.array.length;
      this.w2 = this.faceElement.width - this.scrollBar.width + this.otstup - 1;
    }

    this.scrollBar.offsetHit = this.scrollBar.width;
    this.panel.height = this._wh * this.sah + this.otstup + 1;
    this.drawArr();
  }; /// функция отрисовки массива элементов, установка нужных цветов, и отрисовка маски


  this.drawArr = function () {
    bbb = true;
    ww = this._width - this.otstup * 2;
    var countMan = Math.round(this.arrayElement.length / 1);
    hContent = this._wh * countMan + this.otstup * (countMan + 1);
    this.panel.width = this.faceElement.width;
    this.scrollBar.width = this._wh / 3;
    this.scrollBar.x = this.panel.width - this.scrollBar.width;

    for (var i = 0; i < this.arrayElement.length; i++) {
      if (this.arrayElement[i].life == true) {
        this.arrayElement[i].y = i * this.faceElement.height;
        this.arrayElement[i].width = this.w2;
        this.arrayElement[i].height = this.faceElement.height;
        bbb = !bbb;

        if (this.arrayElement[i]._overOrOut) {
          this.arrayElement[i].color = this.color3;
        } else {
          if (bbb == true) {
            this.arrayElement[i].color = this.color5;
          } else {
            this.arrayElement[i].color = this.color1;
          }
        }

        if (i == this._index) {
          this.arrayElement[i].color = pl102.color11;
        }
      }
    }

    if (this._visiCol > this.array.length) {
      this.panel.height = this.array.length * this.faceElement.height + this.otstup * 2;
    } else {
      this.panel.height = this._visiCol * this.faceElement.height + this.otstup * 2;
    } // Размеры и координаты стрелки на основной кнопке


    var arrowH = this.faceElement.height / 6;
    var arrowW = this.faceElement.height / 3;
    var arrowX = this.faceElement.width - arrowW - this.faceElement.width / 100 * 10;
    var arrowY = (this.faceElement.height - arrowH) / 2;
    this.graphics.clear();
    this.graphics.beginFill(this.color2);
    this.graphics.drawRect(0, 0, this.w2 - this.otstup * 2, this.panel.height - this.otstup * 2);
    this.graphicsImage.clear();
    this.graphicsImage.beginFill(0);
    this.graphicsImage.drawRect(0, 0, this.faceElement.width, this.faceElement.height);
    this.graphCover.clear();
    this.graphCover.beginFill(0xffffff);
    this.graphCover.drawRect(0, 0, this.faceElement.width, this.faceElement.height);
    this.graphCover.endFill(); // Обозначение точек стрелки

    if (this._revertPosCont === true) this.panel.y = -this.panel.height;else this.panel.y = this._wh;
  }; /// отловка события нажатия, наведения курсора и когда курсор убирается - Водим курсором по панельке


  this.klik = function () {
    if (this.sobEvent == 'mouseDown') {
      self._index = this.idArr;
      self.faceElement.text = self.arrayElement[self._index].text;
      setVisiblePanel(!self.visiPanel);
      self.drawArr();

      if (self._index != index1) {
        if (self._index != -1) {
          if (self.fun != undefined) self.fun();
          index1 = self._index;
        }
      }
    }

    if (this.sobEvent == 'mouseOver') {
      self.drawArr();
      if (self.funMouseOverElement) self.funMouseOverElement(this.idArr);
    }

    if (this.sobEvent == 'mouseOut') {
      self.drawArr();
    }
  };

  function setVisiblePanel(isVisible) {
    self.visiPanel = isVisible;
    if (self.funChangeVisiblePanel) self.funChangeVisiblePanel(isVisible);
  } /// добавление нового элемента


  this.add = function (text) {
    this.array.push(text);
    var newElem = this.craetElement(text);

    if (this.arrayElement.length == 1) {
      // this._index = 0;
      this.faceElement.text = this.array[0
      /* this._index */
      ];
    }

    this.scrollBar.value = 0;
    self.content.y = 0;
    this.changeVisiCol();
  }; /// добавления массива элементов


  var ind;

  this.addArr = function (arr) {
    if (arr == undefined) return;

    for (var i = 0; i < arr.length; i++) {
      this.add(arr[i]);
    }
  };

  this.setObj = function (arr) {
    this.clear();
    this.addArr(arr);
  };

  this.getInnerCompByText = function (_text) {
    for (var i = 0; i < this.arrayElement.length; i++) {
      if (this.arrayElement[i].text === _text) {
        return this.arrayElement[i];
      }
    }

    return null;
  };

  this.textWasChanged = function () {
    if (self.arrayElement.length === 0) return;
    if (self._index < 0) self._index = 0;
    self.faceElement.text = self.arrayElement[self._index].text;
  }; /// функция добавления элементов на панель, принимает объект или текс


  var element;

  this.craetElement = function (text) {
    element = undefined;

    for (var i = 0; i < this.arrayElement.length; i++) {
      if (this.arrayElement[i].life == false) {
        element = this.arrayElement[i];
        element.life = true;
      }

      this.arrayElement[i];
    }

    if (element == undefined) {
      element = new PLComboBoxElement(this.content, 0, 0, text, this.klik);
      pl102.removeElement(element, true);
      element.idArr = this.arrayElement.length;
      this.arrayElement.push(element);
      element.life = true;
    }

    element.width = this.faceElement.width + this.otstup + this._wh;
    element.height = this._wh;
    element.text = text;
    element.textSize = this.faceElement.textSize;
    element.funUpdText = this.textWasChanged;
    this.drawArr();
  };

  this.clear = function () {
    this.arrayElement = [];
    this.array = [];
    this.visiPanel = false;
    this.panel.height = 0;
    this.drawArr();
  };

  if (pl102.isMouseEvents) {
    this.graphicsImage.on('mousedown', this.funDown);
    this.graphicsImage.on('mouseover', this.funOver);
    this.graphicsImage.on('mouseout', this.faceElement.mouseOut);
    this.graphicsImage.on('mouseover', this.faceElement.mouseOver);
    this.graphicsImage.on('mouseout', this.funOut);
  }

  if (pl102.isTouchEvents) {
    this.graphicsImage.on('touchstart', this.funDown);
  }

  this.graphicsImage.interactive = true;
  this.graphicsImage.buttonMode = true;

  if (pl102.isMouseEvents) {
    this.faceElement.graphicsArrow.on('mousedown', this.funDown);
    this.faceElement.graphicsArrow.on('mouseover', this.funOver);
    this.faceElement.graphicsArrow.on('mouseout', this.faceElement.mouseOut);
    this.faceElement.graphicsArrow.on('mouseover', this.faceElement.mouseOver);
    this.faceElement.graphicsArrow.on('mouseout', this.funOut);
  }

  if (pl102.isTouchEvents) {
    this.faceElement.graphicsArrow.on('touchstart', this.funDown);
  }

  this.faceElement.graphicsArrow.interactive = true;
  this.faceElement.graphicsArrow.buttonMode = true;
  this.addArr(arr);
}

PLComboBox.prototype = Object.create(PIXI.Container.prototype);
PLComboBox.prototype.constructor = PLComboBox;
Object.defineProperties(PLComboBox.prototype, {
  width: {
    set: function set(value) {
      if (this._width != value) {
        this._width = value;
        this.faceElement.width = this._width;

        if (this.scrollBar.visible == false) {
          this.w2 = this._width;
        } else {
          this.w2 = this._width;
        }

        this.drawArr();
      }
    },
    get: function get() {
      return this._width;
    }
  },
  height: {
    set: function set(value) {
      if (this._height != value) {
        this._height = value;
        this.faceElement.height = this._height;
        this.panel.y = this._height;

        for (var i = 0; i < this.arrayElement.length; ++i) {
          this.arrayElement[i].height = this._height;
        }

        this.changeVisiCol();
      }
    },
    get: function get() {
      return this._height;
    }
  },
  visiPanel: {
    set: function set(value) {
      if (this._visiPanel == value) return;
      this.faceElement.visiPanel = this._visiPanel;
      this._visiPanel = value;
      this.panel.visible = this._visiPanel;
      this.changeText(this._visiPanel);
      if (this.faceElementFun) this.faceElementFun();
    },
    get: function get() {
      return this._visiPanel;
    }
  },
  textSize: {
    set: function set(value) {
      // if(value < 1) return;
      this._textSize = value;
      this.faceElement.textSize = value;

      for (var i = 0; i < this.arrayElement.length; i++) {
        this.arrayElement[i].textSize = value;
      }
    },
    get: function get() {
      return this._textSize;
    }
  },
  visiCol: {
    set: function set(value) {
      this._visiCol = value;
      this.changeVisiCol();
    },
    get: function get() {
      return this._visiCol;
    }
  },
  color: {
    set: function set(value) {
      this._color = value;
      this.faceElement.color = this._color;
      this.changeVisiCol();
    },
    get: function get() {
      return this._color;
    }
  },
  index: {
    set: function set(value) {
      value = parseInt(value);
      var needsUpdate = this._index != value;
      this._index = value;
      this._value = value;
      this.faceElement.text = this.arrayElement[this._index].text;

      if (needsUpdate) {
        this.drawArr();
      }
    },
    get: function get() {
      return this._index;
    }
  },
  value: {
    set: function set(v) {
      if (typeof v === 'number') {
        this.index = v;
        this._value = v;
      } else {
        for (var i = 0; i < this.arrayElement.length; i++) {
          if (this.arrayElement[i].text === v) {
            this.index = v;
            break;
          }
        }
      }
    },
    get: function get() {
      return this._index;
    }
  },
  activMouse: {
    set: function set(value) {
      if (this._activMouse == value) return;
      this._activMouse = value;
      this.faceElement.activMouse = value;
      this.faceElement.graphicsArrow.interactive = value;
      this.faceElement.graphicsArrow.buttonMode = value;
      this.updateActivMouse();
    },
    get: function get() {
      return this._activMouse;
    }
  },
  arrFont: {
    set: function set(value) {
      this._arrFont = value;
      this.addArr(this._arrFont);
    },
    get: function get() {
      return this._arrFont;
    }
  },
  revertPosCont: {
    set: function set(value) {
      if (this._revertPosCont === value) return;
      this._revertPosCont = value;
      this.drawArr();
    },
    get: function get() {
      return this._revertPosCont;
    }
  },
  isAutoReversePanel: {
    set: function set(value) {
      if (this._isAutoReversePanel === value) return;
      this._isAutoReversePanel = value;
    },
    get: function get() {
      return this._isAutoReversePanel;
    }
  }
});

function PLComboBoxElement(cont, _x, _y, title, fun) {
  PIXI.Container.call(this);
  this.type = 'PLComboBoxElement';
  cont.addChild(this);
  var self = this;
  pl102.addElement(this);
  this.fun = fun;
  this.funUpdText; // когда изменился текст

  this.x = _x;
  this.y = _y;
  this._color = pl102.color;
  this._wh = 30;
  this._width = 100;
  this._height = pl102.wh;
  this._overOrOut = false;
  this._textSize;
  this._text = title;
  this._visiPanel = false;
  this.title = title;
  this.boolText = true;
  this.idArr = -1; // ид элемента в массиве, в ComboBox

  this.life = false;
  this.otstup = 4;
  this.graphicsM = new PIXI.Graphics(); // график для возможности отлавливать события

  this.graphicsM.interactive = true;
  this.addChild(this.graphicsM);
  this.graphic = new PIXI.Graphics(); // сам элемент

  this.graphicsM.addChild(this.graphic);
  this.label;
  this.img;

  this.isBoolText = function (str) {
    if (str.length > 4) {
      if (str.indexOf('.jpg') != -1) return false;
      if (str.indexOf('.png') != -1) return false;
    }

    return true;
  };

  this.boolText = this.isBoolText(this.title);

  this.addElement = function () {
    if (this.boolText == true) {
      this.label = new PLLabel(this, 0, 0, this.title);
      pl102.removeElement(this.label, true);
      this.rect = this.label.getRect();
      this.rect.width /= this.worldTransform.a;
      this.rect.height /= this.worldTransform.a;
      this.label.x = this.otstup * 2;
    } else {
      this.img = new PLImage(this, 0, 0, this.title, function () {
        this.height = self._wh;
        this.width = this.picWidth * self._wh / this.picHeight;
        this.y = (self._wh - this.height) / 2;
      });
      pl102.removeElement(this.img, true);
      this.graphicsM.addChild(this.img);
    }
  };

  this.addElement();

  this.drawElement = function () {
    this.graphic.clear();
    this.graphic.beginFill(this._color);
    this.graphic.drawRect(0, 0, this._width, this._height, 0);
  };

  this.textCenter = function () {
    if (this.boolText == true) {
      this.rect = this.label.getBounds();
      this.rect.width /= this.worldTransform.a;
      this.rect.height /= this.worldTransform.a;
      this.label.y = (this._height - this.rect.height) / 2;
      this.label.x = this._wh / 3;
    }
  };

  this.but = new PLButton(this, 0, 0);
  pl102.removeElement(this.but, true);
  this.but.width = this._width;
  this.but.height = this._height;
  this.but.alpha = 0;
  this.sobEvent = 'null';

  this.but.fun = function () {
    self.sobEvent = 'mouseDown';
    if (self.fun != undefined) self.fun();
  };

  this.but.funOver = function () {
    self.sobEvent = 'mouseOver';
    self._overOrOut = true;
    if (self.fun != undefined) self.fun();
  };

  this.but.funOut = function () {
    self.sobEvent = 'mouseOut';
    self._overOrOut = false;
    if (self.fun != undefined) self.fun();
  };
}

PLComboBoxElement.prototype = Object.create(PIXI.Container.prototype);
PLComboBoxElement.prototype.constructor = PLComboBoxElement;
Object.defineProperties(PLComboBoxElement.prototype, {
  width: {
    set: function set(value) {
      if (this._width != value) {
        this._width = value;
        this.but.width = this._width;
        this.textCenter();
        this.drawElement();
      }
    },
    get: function get() {
      return this._width;
    }
  },
  height: {
    set: function set(value) {
      if (this._height != value) {
        this._height = value;

        if (this.label != undefined) {
          this.rect = this.label.getRect();
        }

        this.but.height = this._height;
        this.textCenter();
        this.drawElement();
      }
    },
    get: function get() {
      return this._height;
    }
  },
  color: {
    set: function set(value) {
      if (this._color != value) {
        this._color = value;
        this.textCenter();
        this.drawElement();
      }
    },
    get: function get() {
      return this._color;
    }
  },
  text: {
    set: function set(value) {
      this._text = value;
      if (this.label !== undefined) this.label.text = this._text;
      if (this.funUpdText) this.funUpdText();
    },
    get: function get() {
      this.boolText = this.isBoolText(this.title);
      if (this.boolText == true) return this.label.text;else return this.img.link;
    }
  },
  textSize: {
    set: function set(value) {
      if (this._boolText == true) {
        this.label.fontSize = value;
        this.textCenter();
        this.drawElement();
      }
    },
    get: function get() {
      return this.label.style.fontSize;
    }
  }
});

function PLFaceElement(cont, _x, _y, text, fun) {
  PIXI.Container.call(this);
  this.type = 'PLFaceElement';
  cont.addChild(this);
  var self = this;
  pl102.addElement(this);
  this.fun = fun;
  this.x = _x || 0;
  this.y = _y || 0;
  this._width = 100;
  this._wh = 30;
  this._height = pl102.wh;
  this._color = pl102.color;
  this._color1 = pl102.colorButton1;
  this._color2 = pl102.color;
  this._activ = false;
  this._visiblePanel = true;
  this._activMouse = true;
  this._text = text;
  this._visiPanel = true;
  this.xz = 10;
  if (this._text == undefined) this._text = 'text';
  if (this._text == null) this._text = 'text';
  if (this._text.length == 0) this._text = ' ';
  this.funOver;
  this.funOut;
  this.boolText = true;
  this.idArr = -1; // ид элемента в массиве, в ComboBox

  this.life = false;
  this.otstup = 4;
  this.contentPanel = new PIXI.Container();
  this.addChild(this.contentPanel);
  this.contentFilt = new PIXI.Container();
  this.addChild(this.contentFilt);
  this.panel = new PLPanel(this.contentPanel, 0, 0);
  pl102.removeElement(this.panel, true);
  this.panel.height = this._height;
  this.panel.kontur = true;
  this.panel.color = this._color;
  this.panel.nizNum = 0;
  this.panel.nizAlpha = 0.2;
  this.panel1 = new PLPanel(this.contentPanel, 0, 0);
  pl102.removeElement(this.panel1, true);
  this.panel1.height = this._height;
  this.panel1.kontur = true;
  this.panel1.visible = false;
  this.panel1.link = pl102.base2;
  this.panel1.color = this._color;
  this.panel1.nizNum = 0;
  this.panel1.nizAlpha = 1; /// графика для нажатия на картинку стрелочки

  this.graphicsArrow = new PIXI.Graphics();
  this.graphicsArrow.interactive = true;
  this.addChild(this.graphicsArrow);
  this.graphicsMask = new PIXI.Graphics();
  this.addChild(this.graphicsMask);
  this.contentFilt.mask = this.graphicsMask;
  this.tween = new TWEEN.Tween(this.contentFilt);
  this.label = new PIXI.Text(this._text, pl102.style);
  this.contentFilt.addChild(this.label);
  this.graphCover = new PIXI.Graphics();
  this.addChild(this.graphCover);
  this.graphCover.alpha = 0.5;
  this.graphCover.visible = false;
  this.graphCover.interactive = true;
  this.rect = this.label.getBounds();
  this.rect.width /= this.worldTransform.a;
  this.rect.height /= this.worldTransform.a;
  this.filt = pl102.filter;

  this.isBoolText = function (str) {
    if (str.length > 4) {
      if (str.indexOf('.jpg') != -1) return false;
      if (str.indexOf('.png') != -1) return false;
    }

    return true;
  };

  this.boolText = this.isBoolText(this._text);
  this.img;

  this.addImg = function () {
    if (this.img == undefined) {
      this.img = new PLImage(this, 0, 0, this._text, function () {
        this.height = self._wh;
        this.width = this.picWidth * self._wh / this.picHeight;
      });
      pl102.removeElement(this.img, true);
      this.contentFilt.addChild(this.img);
    } else {
      this.img.visible = true;
    }

    this.img.link = this._text;
    this.label.text = '';
  };

  this.textCenter = function () {
    this.rect = this.label.getBounds();
    this.rect.width /= this.worldTransform.a;
    this.rect.height /= this.worldTransform.a;
    this.label.y = (this._height - this.rect.height) / 2;
    this.label.x = this._wh / 3;
  };

  this.updateActivMouse = function () {
    this.graphCover.clear();
    this.graphCover.visible = !this._activMouse;
    this.draw102();
  };

  var yy = 0;

  this.draw102 = function () {
    this.textCenter();
    yy = (this._height - this.xz) / 2;
    this.graphCover.clear();
    this.graphCover.beginFill(0xffffff);
    this.graphCover.drawRect(0, 0, this._width, this._height);
    this.graphCover.endFill();
    this.graphicsMask.clear();
    this.graphicsMask.beginFill(0xffffff);
    this.graphicsMask.drawRect(this.otstup, this.otstup, this._width - this.otstup * 2 - yy - this.xz * 2, this._height - this.otstup * 2);
    this.graphicsMask.endFill();
    this.graphicsArrow.x = this._width - yy - this.xz;
    this.graphicsArrow.y = yy;
  };

  this.mouseOut = function (e) {
    if (self.funOut) self.funOut();
  };

  this.mouseOver = function (e) {
    self.panel.kontur = true;
    self.panel1.kontur = true;
    self.contentFilt.alpha = 0.2;
    self.tween.to({
      alpha: 1
    }, 500);
    self.tween.start();
    if (self.funOver) self.funOver();
  };

  this.drawFF = function () {
    this.graphicsArrow.clear();

    if (this._visiPanel == true) {
      this.label.style.fill = pl102.colorLabel;
      this.graphicsArrow.lineStyle(2, pl102.colorLabel);
      this.graphicsArrow.moveTo(0, this.xz / 2);
      this.graphicsArrow.lineTo(this.xz / 2, this.xz);
      this.graphicsArrow.lineTo(this.xz, 0);
    } else {
      this.label.style.fill = pl102.color;
      this.graphicsArrow.lineStyle(2, pl102.color);
      this.graphicsArrow.moveTo(0, this.xz / 2);
      this.graphicsArrow.lineTo(this.xz / 2, this.xz);
      this.graphicsArrow.lineTo(this.xz, 0);
    }
  };

  this.drawFF();
}

PLFaceElement.prototype = Object.create(PIXI.Container.prototype);
PLFaceElement.prototype.constructor = PLFaceElement;
Object.defineProperties(PLFaceElement.prototype, {
  visiPanel: {
    set: function set(value) {
      if (this._visiPanel == value) return;
      this._visiPanel = value;
      this.drawFF();
    },
    get: function get() {
      return this._visiPanel;
    }
  },
  width: {
    set: function set(value) {
      this._width = value;
      this.panel.width = value;
      this.panel1.width = value;
      this.draw102();
    },
    get: function get() {
      return this._width;
    }
  },
  height: {
    set: function set(value) {
      this._height = value;
      this.rect = this.label.getBounds();
      this.panel.height = value;
      this.panel1.height = value;
      this.draw102();
    },
    get: function get() {
      return this._height;
    }
  },
  color: {
    set: function set(value) {
      if (value == undefined) return;
      this._color = value;
      this.label.style.fill = this._color;
      this.panel.color = value;
      this.panel1.color = value;
    },
    get: function get() {
      return this._color;
    }
  },
  text: {
    set: function set(value) {
      this._text = value;
      this.boolText = this.isBoolText(this._text);

      if (this.boolText == false) {
        this.addImg();
      } else {
        this.label.text = this._text;
        if (this._text == undefined) this._text = 'text';
        if (this._text == null) this._text = 'text';
        if (this._text.length == 0) this._text = ' ';

        if (this.img != undefined) {
          this.img.visible = false;
        }

        this.draw102();
      }
    },
    get: function get() {
      return this._text;
    }
  },
  visiblePanel: {
    set: function set(value) {
      this._visiblePanel = value;
      this.contentPanel.visible = value;
    },
    get: function get() {
      return this._visiblePanel;
    }
  },
  activ: {
    set: function set(value) {
      this._activ = value;
      this.panel.visible = !value;
      this.panel1.visible = value;
    },
    get: function get() {
      return this._activ;
    }
  },
  textSize: {
    set: function set(value) {
      this.label.style.fontSize = value;
      this.draw102();
    },
    get: function get() {
      return this.label.style.fontSize;
    }
  },
  activMouse: {
    set: function set(value) {
      if (this._activMouse == value) return;
      this._activMouse = value;
      this.updateActivMouse();
    },
    get: function get() {
      return this._activMouse;
    }
  }
}); // обычная галерея

function PLScrollBarND(cont, _x, _y, fun) {
  PIXI.Container.call(this);
  var self = this;
  cont.addChild(this);
  this.type = 'PLScrollBarND';
  this.x = _x || 0;
  this.y = _y || 0;
  this._width = 100;
  this._height = 100;
  this._color = 0;
  this._color1 = 0;
  this._otstup = 4;
  this._scrolValue = 0;
  this._heightContent = 100;
  this.panel = new PLPanel(this, 0, 0);
  this.panel.kontur = 0;
  this.panel.image.visible = false;
  this.scroll = new PLScrollBarV(this, 0, 0, fun);
  this.scroll.panel.image.visible = false;
  this.scroll.but.panel.image.visible = false;
  this.scroll.but.boolKontur = false;

  this.draw = function () {
    this.panel.width = this._width;
    this.panel.height = this._height;
    this.scroll.x = this._otstup;
    this.scroll.y = this._otstup;
    this.scroll.width = this._width - this._otstup * 2;
  };

  this.draw();
}

PLScrollBarND.prototype = Object.create(PIXI.Container.prototype);
PLScrollBarND.prototype.constructor = PLScrollBarND;
Object.defineProperties(PLScrollBarND.prototype, {
  width: {
    set: function set(value) {
      if (this._width == value) return;
      this._width = value;
      this.draw();
    },
    get: function get() {
      return this._width;
    }
  },
  height: {
    set: function set(value) {
      if (this._height == value) return;
      this._height = value;
      this.scroll.height = this._height - this._otstup * 2;
      this.draw();
    },
    get: function get() {
      return this._height;
    }
  },
  color: {
    set: function set(value) {
      if (this._color == value) return;
      this._color = value;
      this.panel.color = this._color;
    },
    get: function get() {
      return this._color;
    }
  },
  color1: {
    set: function set(value) {
      if (this._color1 == value) return;
      this._color1 = value;
      this.scroll.but.color = this._color1;
    },
    get: function get() {
      return this._color1;
    }
  },
  heightContent: {
    set: function set(value) {
      if (this._heightContent == value) return;
      this._heightContent = value;
      this.scroll.heightContent = this._heightContent - this._otstup * 2;
    },
    get: function get() {
      return this._heightContent;
    }
  },
  scrolValue: {
    set: function set(value) {
      if (this.scroll.scrolValue == value) return;
      this.scroll.scrolValue = value;
    },
    get: function get() {
      return this.scroll.scrolValue;
    }
  },
  value: {
    set: function set(value) {
      if (this.scroll.value == value) return;
      this.scroll.value = value;
    },
    get: function get() {
      return this.scroll.value;
    }
  }
});

function PLDebagContent(cont, _x, _y) {
  PIXI.Container.call(this);
  this.type = 'PLDebagContent';
  this.graphics = new PIXI.Graphics();
  cont.addChild(this.graphics);
  this.graphics.x = _x || 0;
  this.graphics.y = _y || 0;
  this.color = -1;
  this.colorAlpha = 1;
  this.lineSize = -1; // Рандомно

  this.lineColor = 0x999999;
  this.colorAlpha = 1;
  var p, p1, p2, p3;

  this.clear = function () {
    this.graphics.clear();
  };

  this.redragStil = function () {
    if (this.color != -1) this.graphics.beginFill(this.color, this.colorAlpha);

    if (this.lineSize == -1) {
      this.graphics.lineStyle(1, Math.random() * 0xffffff, 0.3);
    } else {
      this.graphics.lineStyle(this.lineSize, this.lineColor, this.colorAlpha);
    }
  };

  this.rect = function (_x, _y, _w, _h) {
    this.redragStil();
    this.graphics.drawRect(_x, _y, _w, _h);
    this.graphics.endFill();
  };

  this.grid = function (_w, _h, _wK, _hK) {
    this.redragStil();
    p = _w || 10;
    p1 = _h || 10;
    p2 = _wK || 10;
    p3 = _hK || 10;

    for (var i = 0; i < p2; i++) {
      this.graphics.moveTo(i * p, 0);
      this.graphics.lineTo(i * p, p1 * p3);
    }

    for (var i = 0; i < p3; i++) {
      this.graphics.moveTo(0, i * p1);
      this.graphics.lineTo(p * p2, i * p1);
    }

    this.graphics.endFill();
  };
}

/***/ })

/******/ });
});