(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("PLPLUS", [], factory);
	else if(typeof exports === 'object')
		exports["PLPLUS"] = factory();
	else
		root["PLPLUS"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./pl102/src/plPlus/index.js");
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

/***/ "./pl102/src/plPlus/BtnGallery.js":
/*!****************************************!*\
  !*** ./pl102/src/plPlus/BtnGallery.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BtnGallery = BtnGallery;
exports.GalleryAdm = GalleryAdm;

function BtnGallery(_cont, _x, _y, fun) {
  PIXI.Container.call(this);

  _cont.addChild(this);

  this.type = 'BtnGallery';
  var self = this;
  this.klush = 'id';
  this.fun = fun;
  this.x = _x || 0;
  this.y = _y || 0;
  this._tipPosit = 1;
  this._width = 100;
  var widthSlid = 20;
  var otstupSlid = 3; // рисуем кнопки tipPosit
  //   | 123    | 246
  // 1-| 456  0-| 135

  this._otstup = 17;
  this._ii = 2; // шаг по х

  this._jj = 3; // шаг по y

  this._wh = 74;
  this._indexObject = undefined; // индекс активного обьекта

  this.object; // активный обьект

  this.indBtn = -1; // this.colorKont = 0xffb200; // цвет контура
  // this.kontTr = 3; // толшина контура
  // this.otstKont = -this.kontTr/2; // отступ контура

  this.otstupImg = 4; // отступ картинки внутри кнопки

  this._heightMask = 100;
  this._widthMask = 100;
  this.graphics = new PIXI.Graphics();
  this.addChild(this.graphics);
  this.activCont = true; // рисуем ли контур

  this.contBtn = new PIXI.Container();
  this.addChild(this.contBtn);
  this.contBtn.mask = this.graphics; // контур вокруг кнопки

  this.contur = new PLContur(this.contBtn);
  this.contur.wh = this._wh;
  this.contur.color = 0x666666;
  this.contur.thickness = -3;
  this.contur.visible = false;
  this.scrol = new PLScrollBarV(this, 0, 0, function () {
    self.contBtn.y = -this.scrolValue;
  }); // this.scrol.width = 10;
  // this.scrol.alpha = 0.5;
  // this.scrol.otstup = 5;

  this.scrol.offsetHit = 12;
  this.scrol.visible = false;
  this.scrol.otstup = otstupSlid;
  this.scrol.width = widthSlid;
  this.boolWhell = false;
  this._boolLeft = true;
  this.array = []; // массив кнопок

  this.setArray = function (_a) {
    for (var i = 0; i < _a.length; i++) {
      this.addObj(_a[i]);
    }
  };

  var bb, bb2, bb3; // bb позиция найденного элемента -1, - не нашли
  // bb2 обьект который удалили с масива затем вставили
  // bb3 позиция найденного элемента -1 с учетом скрытых снопок, -1 не нашли

  this.addObj = function (_obj) {
    bb = -1;

    for (var i = 0; i < this.array.length; i++) {
      if (this.array[i].visible == false) {
        // if (this.array[i].object[this.klush] == _obj[this.klush]) {
        bb = i;
        this.array[i].visible = true;
        break; // }
      }
    }

    if (bb != -1) {
      bb2 = this.array.splice(i, 1);
      this.array.push(bb2[0]);
      this.draw();
      return;
    }

    for (var i = 0; i < this.array.length; i++) {
      if (this.array[i].visible == false) {
        this.generationButton(this.array[i], _obj);
        this.addObj(_obj);
        this.draw();
        this.contBtn.addChild(this.contur);
        return;
      }
    }

    this.array.push(this.generationButton(null, _obj));
    this.contBtn.addChild(this.contur);
    this.draw();
  };

  this.removeObj = function (_obj) {
    bb = -1;

    for (var i = 0; i < this.array.length; i++) {
      if (this.array[i].visible != false) {
        if (this.array[i].object[this.klush] == _obj[this.klush]) {
          bb = i;
          break;
        }
      }
    }

    if (bb != -1) {
      this.array[i].visible = false;
      this.draw();
      return this.array[i].object;
    }

    return null;
  }; // установка кнопки в указанную позицию


  this.addObjAt = function (_obj, _num) {
    bb = -1;
    bb3 = -1;

    for (var i = 0; i < this.array.length; i++) {
      if (this.array[i].visible != false) {
        if (this.array[i].object[this.klush] == _obj[this.klush]) {
          bb = i;
          break;
        }
      }
    }

    if (bb != -1) {
      bb2 = this.array.splice(i, 1);

      for (var i = 0; i < this.array.length; i++) {
        if (this.array[i].visible != false) {
          bb3++;

          if (bb3 == _num) {
            this.array.splice(i, 0, bb2[0]);
            this.draw();
            return;
          }
        }
      }

      this.array.push(bb2[0]);
      this.draw();
      return;
    }

    this.array.splice(_num, 0, this.generationButton(null, _obj));
    this.contBtn.addChild(this.contur);
    this.draw();
  };

  this.clear = function () {
    for (var i = 0; i < this.array.length; i++) {
      this.array[i].visible = false;
    }
  };

  var btn;
  this.generParent; // cоздание кнопок

  this.generationButton = function (_bt, _obj) {
    // перехват в Galery2
    if (this.generParent != undefined) return this.generParent(_bt, _obj);

    if (_bt == null) {
      btn = new PLButton(this.contBtn, 0, 0, '', this.down);
      btn.setStile(1, this._wh, this._wh);
      btn.boolKontur = true;
      btn.panel.image.visible = false;
      btn.panel.color = 0xffffff;
      btn.otstup = this.otstupImg;
    } else {
      btn = _bt;
    }

    btn.visible = true;
    btn.object = _obj;

    if (_obj.link != undefined) {
      btn.loadImeg(_obj.link);
    } else {
      if (_obj.icon != undefined) btn.loadImeg(_obj.icon.url);else btn.loadImeg('resources/images/admin/no_image.png');
    }

    return btn;
  };

  this.btn;

  this.down = function () {
    self.object = this.object;
    self.indexObject = this.object;
    self.btn = this;
    if (self.fun) self.fun();
  };

  var ix, iy;

  this.draw = function () {
    var vh = this._wh;
    ix = 0;

    if (this._tipPosit == 0) {
      iy = this._jj - 1;
    } else {
      iy = 0;
    }

    for (var i = 0; i < this.array.length; i++) {
      if (this.array[i].visible == false) continue;
      if (this.scrol.visible == true) vh = this._wh - this.scrol.width / this._ii;
      this.array[i].x = this._otstup + ix * (vh + this._otstup);
      this.array[i].y = this._otstup + iy * (vh + this._otstup);

      if (this._tipPosit == 0) {
        iy--;

        if (iy < 0) {
          iy = 1;
          ix++;
        }
      } else {
        ix++;

        if (ix >= this._ii) {
          iy++;
          ix = 0;
        }
      }
    }
  };

  this.drawWH = function () {
    this.graphics.clear();
    this.graphics.beginFill(0);
    this.graphics.drawRect(0, 0, this._widthMask, this._heightMask);
    this.graphics.endFill();
  };

  this.settingSlider = function () {
    this.scrol.position.set(0, 0);

    if (this._boolLeft == false) {
      this.scrol.x = this._widthMask - this.scrol.width;
    }

    this.scrol.height = this._heightMask;
    this.scrol.heightContent = this.contBtn.height;
    this.scrol.fun();
    if (this.scrol.heightContent <= this.scrol.height) this.scrol.visible = false; // visibility scrol
    else this.scrol.visible = true;

    if (this.scrol.visible == true) {
      if (this.boolWhell == false) {
        this.initWhell();
      }
    }
  };

  this.initWhell = function () {
    this.boolWhell = true;
    this.interactive = true;
    pl102Wheel.on(this, 'mousewheel', this.wheelDrag);
  };

  var yy, sy;

  this.wheelDrag = function (e) {
    if (self.scrol.visible == true) {
      yy = self.contBtn.y;

      if (e.delta > 0) {
        yy += 10;
        if (yy > 0) yy = 0;
      } else {
        yy -= 10;
        if (yy < -(self.contBtn.height - self._heightMask)) yy = -(self.contBtn.height - self._heightMask);
      }

      self.contBtn.y = yy;
      sy = -yy / (self.contBtn.height - self._heightMask) * 100;
      self.scrol.value = sy;
    }
  };

  this._heightMask = this._jj * (this._wh + this._otstup) + this._otstup * 2 + 1;
  this._widthMask = this._ii * (this._wh + this._otstup) + this._otstup * 2 + 1;
  this.drawWH();
}

BtnGallery.prototype = Object.create(PIXI.Container.prototype);
BtnGallery.prototype.constructor = BtnGallery;
Object.defineProperties(BtnGallery.prototype, {
  heightMask: {
    set: function set(value) {
      if (this._heightMask == value) return;
      this._heightMask = value;
      this.drawWH();
      this.settingSlider();
    },
    get: function get() {
      return this._heightMaskt;
    }
  },
  widthMask: {
    set: function set(value) {
      if (this._widthMask == value) return;
      this._widthMask = value;
      this.drawWH();

      if (this._boolLeft == false) {
        this.scrol.x = this._width - this.scrol.width;
      }
    },
    get: function get() {
      return this._widthMask;
    }
  },
  tipPosit: {
    set: function set(value) {
      if (this._tipPosit == value) return;
      this._tipPosit = value;
      this.draw();
    },
    get: function get() {
      return this._tipPosit;
    }
  },
  wh: {
    set: function set(value) {
      if (this._wh == value) return;
      this._wh = value;

      for (var i = 0; i < this.array.length; i++) {
        this.array[i].width = this.array[i].height = this._wh;
        this.array[i].image.height = this.array[i].image.width = this._wh;
      }

      this.contur.wh = this._wh;
      this._heightMask = this._jj * (this._wh + this._otstup) + this._otstup * 2;
      this._widthMask = this._ii * (this._wh + this._otstup) + this._otstup * 2;
      this.drawWH();
      this.draw();
    },
    get: function get() {
      return this._wh;
    }
  },
  ii: {
    set: function set(value) {
      if (this._ii == value) return;
      this._ii = value;
      this._heightMask = this._jj * (this._wh + this._otstup) + this._otstup * 2;
      this._widthMask = this._ii * (this._wh + this._otstup) + this._otstup * 2;
      this.drawWH();
      this.draw();
    },
    get: function get() {
      return this._ii;
    }
  },
  jj: {
    set: function set(value) {
      if (this._jj == value) return;
      this._jj = value;
      this._heightMask = this._jj * (this._wh + this._otstup) + this._otstup * 2;
      this._widthMask = this._ii * (this._wh + this._otstup) + this._otstup * 2;
      this.drawWH();
      this.draw();
    },
    get: function get() {
      return this._jj;
    }
  },
  indexObject: {
    set: function set(value) {
      if (this._indexObject == value) return;
      this._indexObject = value;
      this.indBtn = -1;

      if (this._indexObject == undefined || this._indexObject == -1 || this._indexObject == null) {
        this.contur.visible = false;
        return;
      }

      for (var i = 0; i < this.array.length; i++) {
        if (this.array[i].visible != false) {
          if (this.array[i].object[this.klush] == this._indexObject[this.klush]) {
            if (this.activCont) {
              this.contur.visible = true;
              this.indBtn = i;
              this.contur.x = this.array[i].x;
              this.contur.y = this.array[i].y;
              this.btn = this.array[i];
            }
          }
        }
      }
    },
    get: function get() {
      return this._indexObject;
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
  width: {
    set: function set(value) {
      if (this._width == value) return;
      this._width = value;
      this._wh = (this._width - this._otstup * this._ii - this._otstup - 1) / this._ii;
      this.draw();

      if (this._boolLeft == false) {
        this.scrol.x = this._width - this.scrol.width;
      }
    },
    get: function get() {
      return this._width;
    }
  },
  boolLeft: {
    set: function set(value) {
      if (this._boolLeft == value) return;

      if (this._boolLeft == false) {
        this.scrol.x = this._width - 10;
      } else {
        this.scrol.x = 0;
      }
    },
    get: function get() {
      return this._boolLeft;
    }
  }
});

function GalleryAdm(cont, _x, _y, fun) {
  BtnGallery.call(this, cont, _x, _y, fun);
  this.type = 'GalleryAdm';
  var self = this;
  this._otstup = 2;
  this._otstBtn = 2; // отступ между кнопками

  this._ii = 2; // шаг по х

  this._jj = 3; // шаг по y

  this._wh = 74;
  this._indexObject = undefined; // индекс активного обьекта

  this._width = 100;
  this._height = 100;
  this.contur.thickness = 2;
  this.color = 0x686868; // цвет контура PLContur

  this.color1 = 0xcccccc; // край скрола галереи

  this.color2 = 0x666666; // цвет кнопки скрола

  this.corentHeight = 0;
  this.scrol = new PLScrollBarND(this, 0, 0.5, function () {
    self.contBtn.y = -this.scrolValue;
  });
  this.scrol.width = 18;
  this.scrol.visible = false;
  this.scrol.color = this.color1;
  this.scrol.color1 = this.color2;
  this.scrol.scroll.offsetHit = 12;

  this.getNumBtn = function () {
    var num = 0;

    for (var i = 0; i < this.array.length; i++) {
      if (this.array[i].visible == false) continue;
      num++;
    }

    return num;
  };

  var ix, iy;
  var gh = {};
  var vh, num, row;

  this.draw = function () {
    vh = this._wh;
    num = this.getNumBtn();
    row = Math.ceil(num / this._ii);
    this.corentHeight = this._otstup * 2 + row * this._wh + (row - 1) * this._otstBtn;

    if (this.corentHeight > this._height) {
      this.scrol.visible = true; // если скрол внутри галереи
      // this.scrol.x = this._width - this.scrol.width - 1;

      this.scrol.x = this._width + this._otstup;
      this.scrol.height = this._height - 1; // если скрол внутри галереи расчитаем размер кнопки
      // vh = (this._width - this.scrol.width - this._otstup * 2 - (this._ii - 1) * this._otstBtn - 1) / this._ii;

      this.contur.wh = vh;
      this.scrol.heightContent = this._otstup * 2 + row * vh + (row - 1) * this._otstBtn;
      this.contBtn.y = -this.scrol.scrolValue;
      this.initWhell();
    } else {
      this.scrol.visible = false;
      this.contur.wh = vh;
      this.contBtn.y = 0;
      this.scrol.scrolValue = 0;
    }

    ix = 0;

    if (this._tipPosit == 0) {
      iy = this._jj - 1;
    } else {
      iy = 0;
    }

    for (var i = 0; i < this.array.length; i++) {
      if (this.array[i].visible == false) continue;
      this.array[i].x = this._otstup + ix * (vh + this._otstBtn);
      this.array[i].y = this._otstup + iy * (vh + this._otstBtn);
      this.array[i].width = vh;
      this.array[i].height = vh;

      if (this.indBtn != -1 && i == this.indBtn) {
        this.contur.x = this.array[i].x;
        this.contur.y = this.array[i].y;
      }

      if (this._tipPosit == 0) {
        iy--;

        if (iy < 0) {
          iy = 1;
          ix++;
        }
      } else {
        ix++;

        if (ix >= this._ii) {
          iy++;
          ix = 0;
        }
      }
    } // this.graphTestH.clear();
    // this.graphTestH.beginFill(Math.floor(Math.random()*16777215));
    // this.graphTestH.drawRect(0, 0, 10, this.corentHeight);
    // this.graphTestH.endFill();


    this.drawWH();
  };

  this.drawWH = function () {
    this.graphics.clear();
    this.graphics.beginFill(0);
    this.graphics.drawRect(0, 1, this._width - 2, this._height - 2);
    this.graphics.endFill();
  };

  this.settingSlider = function () {}; // массив обектов по которым создаютса кнопки


  this.setObj = function (_arr) {
    this.setArray(_arr);
  }; // грузим картинку в кнопку


  this.setLink = function (_link) {
    if (!self.btn) return;
    self.btn.loadImeg(_link);
  };

  this.wheelDrag = function (e) {
    if (self.scrol.visible == true) {
      yy = self.contBtn.y;

      if (e.delta > 0) {
        yy += 10;
        if (yy > 0) yy = 0;
      } else {
        yy -= 10;
        if (yy < -(self.corentHeight - self._height)) yy = -(self.corentHeight - self._height);
      }

      self.contBtn.y = yy;
      sy = -(yy / (self.corentHeight - self._height) * 100);
      self.scrol.value = sy;
    }
  };
}

GalleryAdm.prototype = Object.create(BtnGallery.prototype);
GalleryAdm.prototype.constructor = GalleryAdm;
Object.defineProperties(GalleryAdm.prototype, {
  width: {
    set: function set(value) {
      if (this._width == value) return;
      this._width = value;
      this._wh = (this._width - this._otstBtn * (this._ii - 1) - this._otstup * 2 - 1) / this._ii; // this._widthMask = this._width;

      this.contur.wh = this._wh;
      this.draw();

      if (this._boolLeft == false) {
        this.scrol.x = this._width - this.scrol.width;
      }
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
  }
});

/***/ }),

/***/ "./pl102/src/plPlus/DragerImage.js":
/*!*****************************************!*\
  !*** ./pl102/src/plPlus/DragerImage.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DragerImage = DragerImage;

/**
*   тоскалка картинок по экрану в диве выше
*/
function DragerImage() {
  window.dragerImage = this;
  var self = this;
  var offsetX = 0;
  var offsetY = 0;
  var coordX = 0;
  var coordY = 0;
  var isDrag = false;
  var image;
  image = new Image();
  var div = document.createElement('div');
  div.style.position = 'absolute';
  div.style.zIndex = '10';
  div.style.pointerEvents = 'none'; // Предотвращает события мыши для дива(прозрачний для событий)

  div.appendChild(image);
  var scale = 1;
  var moveX = 0;
  var moveY = 0;

  function move(e) {
    e = e || window.event;
    moveX = e.clientX;
    moveY = e.clientY;

    if (moveY === undefined) {
      moveX = e.touches[0].clientX;
      moveY = e.touches[0].clientY;
    } else {
      e.preventDefault();
    }

    div.style.left = coordX + moveX - offsetX + 'px';
    div.style.top = coordY + moveY - offsetY + 'px';
  }

  function onload() {
    if (!isDrag) return;
    image.style.width = 100 * scale + '%';
    image.style.height = 100 * scale + '%';
    div.width = image.width;
    div.height = image.height;
    div.style.left = offsetX - div.width * scale / 2 + 'px';
    div.style.top = offsetY - div.height * scale / 2 + 'px';
    coordX = parseInt(div.style.left);
    coordY = parseInt(div.style.top);
    document.body.appendChild(div);
    div.style.left = coordX + moveX - offsetX + 'px';
    div.style.top = coordY + moveY - offsetY + 'px';
    image.style.width = image.width + 'px';
    image.style.height = image.height + 'px';
  }

  this.start = function (link, p, _scale, stopWhenUp) {
    scale = _scale || 1;
    if (isDrag === true) return;
    offsetX = p.x;
    offsetY = p.y;
    moveX = offsetX;
    moveY = offsetY;
    image.src = link;
    image.onload = onload;
    isDrag = true;
    document.addEventListener('mousemove', move);
    document.addEventListener('touchmove', move);

    if (stopWhenUp) {
      document.addEventListener('mouseup', self.stop);
    }
  };

  this.stop = function () {
    isDrag = false;
    document.removeEventListener('mousemove', move);
    document.removeEventListener('touchmove', move);
    document.removeEventListener('mouseup', self.stop);
    div.remove();
  };
}

/***/ }),

/***/ "./pl102/src/plPlus/EnginComp.js":
/*!***************************************!*\
  !*** ./pl102/src/plPlus/EnginComp.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SliderImg = SliderImg;

/**
 * Колор что в value принимает THREE.Color
 * @class
*/
function ColorThree(cont, _x, _y, fun) {
  PLColor.call(this, cont, _x, _y, fun);
  this.type = 'ColorThree';
  var self = this;
  this._value = new THREE.Color();

  this.pLColorPickerPanel.fun = function (_bool) {
    if (self.boolPlus) {
      self.pLColorPicker.setColor(this.color);
    }

    if (self._text == 'null') {
      self.button.text = this.color;
    }

    self.button.color = this.color;
    self._color = +this.color;

    self._value.set(self._color);

    if (self.fun) self.fun();
    if (_bool == undefined) self.setVisiblePanel(false);
  };

  this.pLColorPicker.fun = function () {
    if (self._text == 'null') {
      self.button.text = self.corectForBtn(this.color);
    }

    self.button.color = this.color;
    self._color = this.color;

    self._value.set(self._color);

    self.pLColorPickerPanel.setColor(this.color);
    if (self.fun) self.fun();
  };

  Object.defineProperty(this, 'value', {
    set: function set(v) {
      if (this._value == v) return;
      this._value = v;
    },
    get: function get() {
      return this._value;
    }
  });
}

ColorThree.prototype = Object.create(PLColor.prototype);
ColorThree.prototype.constructor = ColorThree;
/**
 * Слидер который изминяет свое значение таская кнопку по сторонам
 * @class
*/

function SliderImg(cont, _x, _y, _name, _fun, _min, _max, _title, _link) {
  PIXI.Container.call(this);
  this.type = 'SliderImg';
  cont.addChild(this);
  var self = this;
  pl102.addElement(this);
  this.fun = _fun;
  this.funUp;
  this.funDown;
  var debug = false;

  if (debug == true) {
    var graphDrag = new PIXI.Graphics();
    this.addChild(graphDrag);
  }

  this._activMouse = true;
  this._name = _name;
  this._link = _link != undefined ? _link : 'null';
  this._title = _title != undefined ? _title : 'null';
  this._min = _min != undefined ? _min : 0;
  this._max = _max != undefined ? _max : 100;
  this._editNot = false;
  this._plusText = null;
  this.x = _x || 0;
  this.y = _y || 0;
  this.otstup = 6; // отступ от кнопки к инпуту

  this.otstup1 = 6.5; // отступ текста что после инпута y

  this.otstup2 = 4; // отступ текста что после инпута x

  this.otstup3 = 6; // отступ текста что вместо инпута по y

  this.wh = pl102.wh;
  this.fontSize = 15; // текст на месте инпута

  this.fontSize1 = 13; // текст после инпута по y

  this._width = 100;
  this._height = this.wh;
  this._value = 0;
  this._okrug = 1;
  this._shag = 1; // увеличение\уменьшение value

  this._typeValue = 'wh'; // "angel" работаем с углом, "wh" размеры

  this.input = new PLInput(this, 0, 0, '0', function () {
    if (self._typeValue === 'angel') {
      setVal(this.value * calc.DEG2RAD);
    } else {
      setVal(this.value);
    }
  });
  this.input.value = this._value;
  this.input.isWorkWithNumber = true;
  pl102.removeElement(this.input, true);
  this.btn = new PLButton(this, 0, 0);
  this.btn.label.visible = false;
  this.btn.loadImeg(this._link);
  this.btn.visiblePanel = false;
  this.btn.otstup = 0;

  this.btn.funDown = function () {
    self.onDragStart();
  };

  pl102.removeElement(this.btn, true);
  this.label = new PLLabel(this, 0, 0, ''); // после интпута дополнительный текст (типа система измерения)

  this.label.visible = false;
  this.label.bold = false;
  this.label.fontSize = this.fontSize1;
  this.label2 = new PLLabel(this, 0, 0, '');
  this.label2.visible = false;
  this.label2.bold = false;
  this.label2.fontSize = this.fontSize;
  this.labelTitle = new PLLabel(this, 0, 0, '');
  this.labelTitle.visible = false;
  this.labelTitle.bold = false;
  this.labelTitle.fontSize = this.fontSize;

  if (this._title != 'null') {
    this.labelTitle.visible = true;
    this.labelTitle.text = this._title;
  }

  pl102.removeElement(this.label, true);

  this.setText = function (_text) {
    this.plusText = _text;

    if (this.label == undefined) {
      this.label = new PLLabel(this, 0, 0, 'cm');
      pl102.removeElement(this.label, true);
    }

    this.label.visible = true;
    this.label.text = _text;
    this.draw();
  };

  var dragerImage = new DragerImage();
  var downValue = 0;
  var downLocal = new PIXI.Point();
  var moveLocal = new PIXI.Point();
  var vector = new PIXI.Point(); // вектор на сколько здвинули

  var angleLine = 3.92; // 225 градусов;// угол линии

  var vLineStart = new PIXI.Point();
  var vLineEnd = new PIXI.Point();
  var ot = 0; // уменьшение инпута на размер текста

  var rl; // рект label

  var dopY = 0;
  var rect;

  this.draw = function () {
    dopY = 0;
    rl = 0;
    this.btn.width = this.wh;
    this.btn.height = this.wh;

    if (this._title == 'null') {
      dopY = 0;
      this.height = this.wh;
    } else {
      rect = this.labelTitle.getRect();
      dopY = rect.height + this.otstup;
      this.height = this.wh + dopY;
    }

    this.btn.y = dopY;

    if (this.btn.image) {
      this.btn.image.width = this.wh;
      this.btn.image.height = this.wh;
    }

    if (this.label.visible) rl = this.textLength();
    this.input.width = this._width - this.wh - this.otstup - rl;
    this.input.height = this.wh;
    this.input.x = this.wh + this.otstup;
    this.input.y = dopY;
    rect = this.label2.getRect();
    if (this._editNot) this.label.x = this.input.x + rect.width + this.otstup2 * 2;else this.label.x = this.input.x + this.input.width + this.otstup2;
    this.label.y = this.otstup1 + dopY;
    rect = this.label.getRect();
    this.label2.x = this.wh + this.otstup;
    this.label2.y = this.otstup3 + dopY;
    if (graphDrag) this.drawDebug();
  }; // расчет отступа для текста после инпута


  this.textLength = function () {
    if (this.label == undefined) return 0;
    return this.label.getRect().width;
  };

  this.onDragStart = function () {
    downValue = self._value * self._shag;
    downLocal = self.toLocal(pl102.global);
    startMoveEvent();
    dragerImage.start(self.btn.link, pl102.global, 1, true);
    if (self.funDown) self.funDown();
  };

  var vectorInLine;
  var angleMove;
  var dist;
  var dMo = 0;

  this.onDragMove = function (e) {
    var p = pl102.global;
    if (e instanceof MouseEvent) p.set(e.clientX, e.clientY);
    moveLocal = self.toLocal(p);
    vector.set(moveLocal.x - downLocal.x, moveLocal.y - downLocal.y);
    calc.getVector(99999, angleLine, vLineStart);
    calc.getVector(-99999, angleLine, vLineEnd);
    vectorInLine = calc.isPointInLin(vLineStart, vLineEnd, vector, 99999, 99999);
    angleMove = calc.getTreeAngel(vLineStart, vectorInLine, vector); // с какой стороны (90 || -90)

    dist = calc.getDistance(vectorInLine, vector) * (angleMove < 0 ? -1 : 1);
    dMo = (downValue + dist) / self._shag;
    setVal(dMo);
    if (graphDrag) this.drawDebug();
  };

  var anZn = 0;

  this.updateText = function () {
    if (this._typeValue == 'wh') {
      this.input.text = Math.round(this._value * this._okrug) / this._okrug;
      this.label2.text = Math.round(this._value * this._okrug) / this._okrug;
    }

    if (this._typeValue == 'angel') {
      anZn = Math.round(this._value * calc.RAD2DEG);
      if (anZn < 0) anZn = 360 + anZn;
      this.input.text = anZn;
      this.label2.text = anZn;
    }
  };

  this.drawDebug = function () {
    graphDrag.clear();
    graphDrag.lineStyle(1, 0xff0000);
    graphDrag.moveTo(vLineStart.x, vLineStart.y);
    graphDrag.lineTo(vLineEnd.x, vLineEnd.y);
    graphDrag.drawCircle(vector.x, vector.y, 5);
    graphDrag.drawCircle(vectorInLine.x, vectorInLine.y, 5);
    graphDrag.drawRect(0, 0, self._width, self._height);
  };

  this.onDragEnd = function (e) {
    stopMoveEvent();
    if (self.funUp) self.funUp();
  };

  this.kill = function () {
    this.input.kill();
  };

  this.changeActiv = function () {
    this.input.activMouse = this.activMouse;
    this.label.activMouse = this.activMouse;
    this.label2.visible = this.activMouse;
    this.btn.okDown = this.activMouse;
    this.btn.alpha = this.activMouse === true ? 1 : 0.5;
  };

  this.clearValue = function () {
    this._value = 0;
    this.label2.value = '';
    this.label2.visible = false;
    this.draw();
  };

  this.changeEdit = function () {
    if (this._editNot) {
      this.btn.alpha = 0.5;
      this.btn.okDown = false;
      this.input.visible = false;
      this.label2.visible = true;
    } else {
      this.btn.alpha = 1;
      this.btn.okDown = true;
      this.input.visible = true;
      this.label2.visible = false;
    }
  };

  function startMoveEvent() {
    stopMoveEvent();

    if (pl102.isMouseEvents) {
      document.body.addEventListener('mouseup', self.onDragEnd);
      document.body.addEventListener('mousemove', self.onDragMove);
    }

    if (pl102.isTouchEvents) {
      document.body.addEventListener('touchend', self.onDragEnd);
      document.body.addEventListener('touchmove', self.onDragMove);
    }
  }

  function stopMoveEvent() {
    if (pl102.isMouseEvents) {
      document.body.removeEventListener('mouseup', self.onDragEnd);
      document.body.removeEventListener('mousemove', self.onDragMove);
    }

    if (pl102.isTouchEvents) {
      document.body.removeEventListener('touchend', self.onDragEnd);
      document.body.removeEventListener('touchmove', self.onDragMove);
    }
  }

  function setVal(newv) {
    if (newv != self._value) {
      self.value = newv;
      if (self.fun) self.fun();
    }
  }

  this.draw();
}

SliderImg.prototype = Object.create(PIXI.Container.prototype);
SliderImg.prototype.constructor = SliderImg;
Object.defineProperties(SliderImg.prototype, {
  name: {
    set: function set(value) {
      if (this._name == value) return;
      this._name = value;
    },
    get: function get() {
      return this._name;
    }
  },
  title: {
    set: function set(value) {
      if (this._title == value) return;
      this._title = value;
      if (this._title == '') this._title = 'null';

      if (this._title != 'null') {
        this.labelTitle.visible = true;
        this.labelTitle.text = this._title;
        this.draw();
      } else {
        this.labelTitle.visible = false;
      }
    },
    get: function get() {
      return this._title;
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
    },
    get: function get() {
      return this._height;
    }
  },
  link: {
    set: function set(value) {
      if (this._link == value) return;
      this._link = value;
      this.btn.loadImeg(this._link);
    },
    get: function get() {
      return this._link;
    }
  },
  min: {
    set: function set(value) {
      if (this._min == value) return;
      this._min = value;
    },
    get: function get() {
      return this._min;
    }
  },
  max: {
    set: function set(value) {
      if (this._max == value) return;
      this._max = value;
    },
    get: function get() {
      return this._max;
    }
  },
  value: {
    set: function set(value) {
      if (this._value == value) return;
      this._value = value;
      if (!this.label2.visible) this.label2.visible = true;
      if (this._value < this._min) this._value = this._min;
      if (this._value > this._max) this._value = this._max;
      this.updateText();
      this.draw();
    },
    get: function get() {
      return this._value;
    }
  },
  okrug: {
    set: function set(value) {
      if (this._okrug == value) return;
      this._okrug = value;
    },
    get: function get() {
      return this._okrug;
    }
  },
  shag: {
    set: function set(value) {
      if (this._shag == value) return;
      this._shag = value;
    },
    get: function get() {
      return this._shag;
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
  editNot: {
    set: function set(value) {
      if (this._editNot == value) return;
      this._editNot = value;
      this.changeEdit();
    },
    get: function get() {
      return this._editNot;
    }
  },
  typeValue: {
    set: function set(value) {
      if (this._typeValue == value) return;
      this._typeValue = value;
    },
    get: function get() {
      return this._typeValue;
    }
  },
  plusText: {
    set: function set(value) {
      if (this._plusText == value) return;
      this._plusText = value;
      this.setText(value);
    },
    get: function get() {
      return this._plusText;
    }
  }
});

/***/ }),

/***/ "./pl102/src/plPlus/HSVGradient.js":
/*!*****************************************!*\
  !*** ./pl102/src/plPlus/HSVGradient.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HSVGradient = HSVGradient;

/**
 * Компонент выбора цвета на основе формата hsv.
 * @class
 */
function HSVGradient(cont, x, y, fun) {
  PIXI.Container.call(this);
  this.type = 'HSVGradient';
  var self = this;
  pl102.addElement(this);
  cont.addChild(this);
  this.x = x || 0;
  this.y = y || 0;
  this.fun = fun;
  this.funOnMove = null;
  this._width = 100;
  this._height = 100;
  this._otstup = 2;
  this._color = 16777215;
  this.color_hsv = [0, 0, 100];
  this.color_rgb = [255, 255, 255];
  this.color_hex = '#ffffff';
  this.localColor = 16711680;
  var ratio = 0.62;
  this.colorConverter = new ColorConverter();
  this.graphics = new PIXI.Graphics();
  this.addChild(this.graphics);
  /** Точка позиции курсора */

  var localPoint = new PIXI.Point();
  /** Массив основных компонентов */

  this.arrayGradient = [];
  /** Массив указателей */

  this.arrayPointer = [];
  /** Массив линков для основных компонентов */

  this.gradientLinks = ['resources/images/pikNew/color/hsvBG.png', 'resources/images/pikNew/color/hueBG.jpg', 'resources/images/pikNew/color/satBG.png', 'resources/images/pikNew/color/valBG.png'];
  /** Массив линков для указателей */

  this.pointerLinks = ['resources/images/pikNew/color/colorPickerLarge.png', 'resources/images/pikNew/color/verticalSliderTransparent.png', 'resources/images/pikNew/color/verticalSliderTransparent.png', 'resources/images/pikNew/color/verticalSliderTransparent.png'];
  this.gradientLinks.forEach(function (item, index) {
    this.arrayGradient[index] = new PLImage(this);
    this.arrayGradient[index].link = item;
    this.arrayGradient[index].idArr = index;
    this.arrayGradient[index].interactive = true;
    this.arrayGradient[index].buttonMode = true;
    this.arrayGradient[index].on('mouseover', onOver);
  }, this);
  this.pointerLinks.forEach(function (item, index) {
    this.arrayPointer[index] = new PLImage(this, 0, 0, '', function () {
      this.pivot.set(this.picWidth / 2, this.picHeight / 2); // this.scale.set(0.9, 0.9);

      this.width = this.picWidth;
      this.height = this.picHeight;
    });
    this.arrayPointer[index].link = item;
    this.arrayPointer[index].idArr = index;
    this.arrayPointer[index].interactive = true;
    this.arrayPointer[index].buttonMode = true;
    this.arrayPointer[index].isPointer = true;
    this.arrayPointer[index].on('mouseover', onOverPointer);
    this.arrayPointer[index].on('mousedown', onDown);
  }, this);

  function onUp(e) {
    self.arrayGradient[correntIdArr].off('mousemove', onMove);
    self.arrayGradient[correntIdArr].off('mouseup', onUp);
    pl102.stage.off('mouseup', onUp);
    self.arrayGradient.forEach(function (item) {
      item.interactive = true;
    });
    if (self.fun) self.fun();
  }

  var correntIdArr = false;

  function onDown(e) {
    var isPointer = e.target.isPointer !== undefined;
    var target = isPointer ? self.arrayGradient[e.target.idArr] : e.target;
    target.off('mousemove', onMove);
    target.off('mouseup', onUp);
    pl102.stage.off('mouseup', onUp);
    target.on('mousemove', onMove);
    target.on('mouseup', onUp);
    pl102.stage.on('mouseup', onUp);
    correntIdArr = target.idArr;
    self.dragPoint(target);
    self.arrayGradient.forEach(function (item) {
      if (item.idArr !== target.idArr) {
        item.interactive = false;
      }
    });
    self.drag(target);
    if (target.idArr === 1) self.dragLocal(target);
    self.dragPoint(target);
    self.dragPointer(target);
    self.drawBackground();
    self.convert();
  }

  function onOverPointer(e) {
    e.target.defaultCursor = 'url(resources/images/pikNew/color/579006.png) 10 10, auto';
  }

  function onOver(e) {
    e.target.off('mousedown', onDown);
    e.target.on('mousedown', onDown);
    correntIdArr = e.target.idArr;
    self.dragPoint(e.target);
    e.target.defaultCursor = 'url(resources/images/pikNew/color/579006.png) 10 10, auto';
  }

  function onOut(e) {}

  function onMove(e) {
    self.drag(e.target);
    if (e.target.idArr === 1) self.dragLocal(e.target);
    self.dragPoint(e.target);
    self.dragPointer(e.target);
    self.drawBackground();
    self.convert();
    if (self.funOnMove) self.funOnMove();
  }
  /**
   * Конвертация цвета для отрисовки фона соответсвующего выбранному цвету
   */


  this.dragLocal = function () {
    this.convertToLocal();
  };
  /**
  * Запись и проверка корекности локальной позиции курсора
  * @param {PLImage} element - картинка на которую навели.
  */


  this.dragPoint = function (element) {
    localPoint.copy(element.toLocal(pl102.global));
    if (localPoint.x > element.width) localPoint.x = element.width;
    if (localPoint.x < 0) localPoint.x = 0;
    if (localPoint.y > element.height) localPoint.y = element.height;
    if (localPoint.y < 0) localPoint.y = 0;
  };
  /**
   * Установка указателей в соответсвуюшю параметрам цвета 
   * @param {PLImage} element - картинка на которую навели.
   */


  this.dragPointer = function (element) {
    if (!element || element.idArr === 1) {
      var y1 = this.color_hsv[0] / 360 * this.arrayGradient[1].height;
      self.arrayPointer[1].x = this.arrayGradient[1].x;
      self.arrayPointer[1].y = y1 + this.arrayGradient[1].y;
    }

    var x0 = this.color_hsv[1] / 100 * this.arrayGradient[0].width;
    var y0 = (100 - this.color_hsv[2]) / 100 * this.arrayGradient[0].height;
    self.arrayPointer[0].x = x0 + this.arrayGradient[0].x;
    self.arrayPointer[0].y = y0 + this.arrayGradient[0].y;
    var y2 = this.color_hsv[1] / 100 * this.arrayGradient[2].height;
    self.arrayPointer[2].x = this.arrayGradient[2].x;
    self.arrayPointer[2].y = y2 + this.arrayGradient[2].y;
    var y3 = (100 - this.color_hsv[2]) / 100 * this.arrayGradient[3].height;
    self.arrayPointer[3].x = this.arrayGradient[3].x;
    self.arrayPointer[3].y = y3 + this.arrayGradient[3].y;
  };
  /**
   * Перерасчет значений hsv формат относительно положению курсора
   * @param {PLImage} element - картинка на которую навели.
   */


  this.drag = function (element) {
    if (element.idArr === 0) {
      this.color_hsv[1] = Math.round(localPoint.x / element.width * 100);
      this.color_hsv[2] = Math.round((element.height - localPoint.y) / element.height * 100);
    }

    if (element.idArr === 1) {
      this.color_hsv[0] = Math.round(localPoint.y / element.height * 360);
    }

    if (element.idArr === 2) {
      this.color_hsv[1] = Math.round(localPoint.y / element.height * 100);
    }

    if (element.idArr === 3) {
      this.color_hsv[2] = Math.round((element.height - localPoint.y) / element.height * 100);
    }
  };

  this.draw = function () {
    var whField = this._width * ratio;
    var wGradient = (this._width * (1 - ratio) - this._otstup * 3) / 3;
    this.arrayGradient[0].width = whField;
    this.arrayGradient[0].height = whField;
    this.arrayGradient[1].x = whField + this._otstup;
    this.arrayGradient[1].width = wGradient;
    this.arrayGradient[1].height = whField;
    this.arrayGradient[2].x = whField + wGradient + this._otstup * 2;
    this.arrayGradient[2].width = wGradient;
    this.arrayGradient[2].height = whField;
    this.arrayGradient[3].x = whField + wGradient * 2 + this._otstup * 3;
    this.arrayGradient[3].width = wGradient;
    this.arrayGradient[3].height = whField;
    this.dragPointer();
    this._height = whField;
    this.drawBackground();
  };
  /**
   * Отрисовка фона относительно выбранного цвета
   */


  this.drawBackground = function () {
    this.graphics.clear();
    this.graphics.beginFill(this.localColor);
    this.graphics.lineStyle(1, 0x999999);
    this.arrayGradient.forEach(function (item, index) {
      this.graphics.drawRect(item.x, item.y, item.width, item.height);
    }, this);
  };
  /**
   * Конвертация цвета в другие необходимые форматы
   */


  this.convert = function () {
    this.color_rgb = this.colorConverter.hsvToRgb(this.color_hsv);
    this.color_hex = this.colorConverter.rgbToHex(this.color_rgb);
    this._color = this.colorConverter.rgbToDec(this.color_rgb);
  };
  /**
   * Конвертация цвета для отрисовки фонового цвета
   */


  this.convertToLocal = function () {
    var hsv = [this.color_hsv[0], 100, 100];
    var rgb = this.colorConverter.hsvToRgb(hsv);
    var hex = this.colorConverter.rgbToHex(rgb);
    var dec = this.colorConverter.hexToDec(hex);
    this.localColor = dec;
  };
  /**
   * Принимаем цвет формата hsv
   * @param {Array} hsv - [0 -> 360, 0 -> 100, 0 -> 100].
   */


  this.setHSV = function (hsv) {
    this.color_hsv[0] = hsv[0];
    this.color_hsv[1] = hsv[1];
    this.color_hsv[2] = hsv[2];
    this.convert();
    this.convertToLocal();
    this.dragPointer();
    this.drawBackground();
  };
  /**
   * Принимаем цвет формата rgb
   * @param {Array} rgb - [0 -> 255, 0 -> 255, 0 -> 255].
   */


  this.setRGB = function (rgb) {
    this.color_rgb[0] = rgb[0];
    this.color_rgb[1] = rgb[1];
    this.color_rgb[2] = rgb[2];
    this.color_hsv = this.colorConverter.rgbToHsv(this.color_rgb);
    this.color_hex = this.colorConverter.rgbToHex(this.color_rgb);
    this._color = this.colorConverter.rgbToDec(this.color_rgb);
    this.convertToLocal();
    this.dragPointer();
    this.drawBackground();
  };

  this.draw();
}

HSVGradient.prototype = Object.create(PIXI.Container.prototype);
HSVGradient.prototype.constructor = HSVGradient;
Object.defineProperties(HSVGradient.prototype, {
  width: {
    set: function set(value) {
      if (this._width === value) return;
      this._width = value;
      this.draw(); // this.reposition();
    },
    get: function get() {
      return this._width;
    }
  },
  height: {
    set: function set(value) {
      if (this._height === value) return;
      this._height = value;
    },
    get: function get() {
      return this._height;
    }
  },
  otstup: {
    set: function set(value) {
      if (this._otstup === value) return;
      this._otstup = value;
      this.draw();
    },
    get: function get() {
      return this._otstup;
    }
  },
  color: {
    set: function set(value) {
      if (this._color === value) return;
      this._color = value;
      this.color_hex = this.colorConverter.decToHex(this._color);
      this.color_rgb = this.colorConverter.hexToRgb(this.color_hex);
      this.color_hsv = this.colorConverter.rgbToHsv(this.color_rgb);
      this.convertToLocal();
      this.dragPointer();
      this.drawBackground();
    },
    get: function get() {
      return this._color;
    }
  },
  activMouse: {
    set: function set(value) {
      if (this._activMouse === value) return;
      this._activMouse = value;
      this.arrayGradient.forEach(function (item) {
        item.activMouse = this._activMouse;
      }, this);
      this.arrayPointer.forEach(function (item) {
        item.activMouse = this._activMouse;
      }, this);
    },
    get: function get() {
      return this._activMouse;
    }
  }
});

/***/ }),

/***/ "./pl102/src/plPlus/InputGroup.js":
/*!****************************************!*\
  !*** ./pl102/src/plPlus/InputGroup.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputGroup = InputGroup;

/**
 * Компонент с набором инпутов, перед инпутами есть текст.
 * @param {String} text - Текст перед инпутами.
 * @param {Number} amount - Количество инпутов.
 * @class
 */
function InputGroup(cont, x, y, text, amount, fun) {
  PIXI.Container.call(this);
  this.type = 'InputGroup';
  cont.addChild(this);
  var self = this;
  pl102.addElement(this);
  this.fun = fun;
  this.x = x || 0;
  this.y = y || 0;
  this.text = text || '';
  this.amount = amount || 0;
  this._width = 100;
  this._height = pl102.wh;
  this._otstup = 2; // отступ между инпутами

  this._otstup1 = this._otstup; // отступ между текстом и инпутами

  this._activMouse = false;
  /**
   * Вводимые с инпутов значения хряняться в это м массиве
   * соответвенно по расположению инпута.
   */

  this.value = [];
  /** Массив инпутов */

  this.array = [];
  this.panel = new PLPanel(this);
  pl102.removeElement(this.panel, true);
  this.panel.image.visible = false;
  this.panel.color = 0xffffff;
  this.panel.width = this._width;
  this.panel.height = this._height;
  this.panel.kontur = false;
  this.label = new PLLabel(this, 0, 0, this.text);
  pl102.removeElement(this.label, true);
  this.label.visible = !(this.text.length === 0);

  this.add = function () {
    for (var i = 0; i < this.amount; i++) {
      this.array[i] = new PLInput(this, 0, 0, '', onFocus);
      this.array[i].idArr = i;
      this.array[i].align = 'center';
      this.array[i].paddingRight = '0';
      pl102.removeElement(this.array[i], true);
    }
  };

  this.add();
  /**
   * Задаем значения инпутам
   * @param {Array} array - массив значений что записываються инпутам.
   */

  this.set = function (array) {
    for (var i = 0; i < array.length; i++) {
      this.array[i].text = array[i];
      this.value[i] = array[i];
    }

    if (array.length !== this.array.length) {
      console.warn('Пришли не коректные значения!!!', this);
    }
  };

  function onFocus(e) {
    self.value[this.idArr] = this.value;
    if (self.fun) self.fun(this);
  }

  this.draw = function () {
    var l = this.array.length;
    var wt = this.text.length === 0 ? 0 : this.label.curW + this._otstup1;
    var wi = this._width - wt;
    this.label.text = this.text;
    this.label.y = (this._height - this.label.fontSize) / 2 - 2;

    if (l === 0) {
      this.label.x = this._width / 2 - this.label.curW / 2 + 1;
    } else {
      this.array.forEach(function (item, index) {
        item.width = (wi - this._otstup * l + this._otstup) / l;
        item.height = this._height;
        item.x = wt + (item.width + this._otstup) * index;
      }, this);
    }

    this.panel.width = this._width;
    this.panel.height = this._height;
  };

  this.draw();
}

InputGroup.prototype = Object.create(PIXI.Container.prototype);
InputGroup.prototype.constructor = InputGroup;
Object.defineProperties(InputGroup.prototype, {
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
  },
  activMouse: {
    set: function set(value) {
      if (this._activMouse == value) return;
      this._activMouse = value;
      this.array.forEach(function (item) {
        item.activMouse = this._activMouse;
      }, this);
    },
    get: function get() {
      return this._activMouse;
    }
  }
});

/***/ }),

/***/ "./pl102/src/plPlus/MTypedColor.js":
/*!*****************************************!*\
  !*** ./pl102/src/plPlus/MTypedColor.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MTypedColor = MTypedColor;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function MTypedColor(cont, x, y, fun, title, typePicker) {
  PIXI.Container.call(this);
  this.type = 'MTypedColor';
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

  /**
   * Формат пришедшего цвета.
   * DEC - 16777215, DECSTR - 0xffffff, HEX - 0xffffff, THREE - THREE.Color.
   */

  this.colorFormat = 'DECSTR';
  /** Тип пикера с панели. basic || hsv */

  this.typePicker = typePicker || 'basic';
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
  this.colorConverter = new ColorConverter();
  this.arrColor = [0x555555, 0xff4c4c, 0x4faf5c, 0x80bece, 0xf9ae34, 0xffffff, 0x000000, 0xffd46b, 0xffb86b]; // компонент нижняя панель выбора цвета

  this.mColorPickerPanel = new MColorPickerPanel(this, 0, 0, this.typePicker);

  this.mColorPickerPanel.fun = function () {
    var basicColor = self.getBasicColorFormat(this.color);
    self.button.color = basicColor;
    self.changeValueToFormat(basicColor);

    if (self.boolPlus) {
      self.pLColorPicker.setColor(basicColor);
    }

    if (self._text === 'null') self.button.text = self.getCorrectText();
    if (self.fun) self.fun();
    if (self.funSelectColor) self.funSelectColor(self._value);
  };

  this.mColorPickerPanel.funDrag = function () {
    var basicColor = self.getBasicColorFormat(this.color);
    self.button.color = basicColor;
    self.colorDrag = basicColor;
    if (self.funDrag) self.funDrag();
  }; // this.mColorPickerPanel.typePicker = 'hsv';


  pl102.removeElement(this.mColorPickerPanel, true); // скрытие нижней панели если клик вне компонента

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
    if (self.mColorPickerPanel.activ) fullHeight += self.mColorPickerPanel.height;
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
        pl102.stage.on('mousedown', self.mouseDown);
      }

      if (pl102.isTouchEvents) {
        pl102.stage.on('touchstart', self.mouseDown);
      }
    } else {
      if (pl102.isMouseEvents) {
        pl102.stage.off('mousedown', self.mouseDown);
      }

      if (pl102.isTouchEvents) {
        pl102.stage.off('touchstart', self.mouseDown);
      }
    }
  };

  this.setVisiblePanel = function (isVisible) {
    self.mColorPickerPanel.activ = isVisible;
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
      self.colorPanelVisible(!self.mColorPickerPanel.activ);
    }
  });
  pl102.removeElement(this.button, true);
  this.button.boolAnimKontut = false;
  this.button.panel.image.visible = false;
  this.button.color = this.baseColor; // компонент квадратные кнопки с цветами

  this.pLColorPicker = new PLColorPicker(this.btnPanel1, this._otstup, 0, [], function () {
    var basicColor = self.getBasicColorFormat(this.color);
    self.button.color = basicColor;
    self.changeValueToFormat(basicColor);
    self.mColorPickerPanel.color = basicColor;
    if (self._text === 'null') self.button.text = self.getCorrectText();
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
      this.mColorPickerPanel.y = this.btnPanel1.y + this.btnPanel1.height + this._otstup;
      this._height = this.btnPanel.height + this.btnPanel1.height;
    } else {
      this.mColorPickerPanel.y = this.btnPanel.height + this._otstup;
      this._height = this.btnPanel.height;
    }

    this.mColorPickerPanel.width = this._width;
    this.mColorPickerPanel.height = this.colorPanelH;
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

  this.changeValueToFormat = function (value) {
    if (this.colorFormat === 'DECSTR') {
      this._value = this.colorConverter.decToDecStr(value);
    } else if (this.colorFormat === 'HEX') {
      this._value = this.colorConverter.decToHex(value);
    } else if (this.colorFormat === 'THREE') {
      this._value.set(value);
    } else {
      this._value = value;
    }

    this._color = this._value;
  };

  this.check = function (_value) {
    var value = _value;

    if (typeof value === 'number') {
      this.colorFormat = 'DEC';

      if (value < 0 || value > 16777215) {
        value = 16777215;
        console.warn('Значение цвета выходит за границы 0 -> 16777215!');
      }

      return value;
    }

    if (typeof value === 'string') {
      this.colorFormat = 'DECSTR';
      var splitParam = '';

      if (value.indexOf('#') !== -1) {
        this.colorFormat = 'HEX';
        splitParam = '#';
      }

      if (value.indexOf('0x') !== -1) splitParam = '0x';

      if (splitParam.length === 0 || value.split(splitParam)[1].length < 6) {
        value = '0xffffff';
        console.warn('Не корректное значение цвета!! (#ffffff || 0xffffff)', value);
      }

      return value;
    }

    if (_typeof(value) === 'object') {
      if (window['THREE'] && 'addColors' in value) {
        this.colorFormat = 'THREE';
        return value;
      }
    }

    console.warn('Пришедшее значение не поддерживаеться!', value);
    return this._value;
  };

  this.getCorrectText = function () {
    var text = this._value;

    if (this.colorFormat === 'THREE') {
      text = 'THREE.Color';
    }

    return text;
  };

  this.getBasicColorFormat = function (value) {
    var color = value;

    if (typeof value === 'string') {
      if (value.indexOf('#') !== -1) {
        color = parseInt(value.replace('#', '0x'), 16);
      }

      if (value.indexOf('0x') !== -1) {
        color = parseInt(value, 16);
      }
    }

    if (_typeof(value) === 'object') {
      if (window['THREE'] && 'getHexString' in value) {
        var hex = value.getHexString();
        color = parseInt(hex.replace('#', '0x'), 16);
      }
    }

    return color;
  };

  this.reposition();
}

MTypedColor.prototype = Object.create(PIXI.Container.prototype);
MTypedColor.prototype.constructor = MTypedColor;
Object.defineProperties(MTypedColor.prototype, {
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
      this._color = value;
      this.value = value;
    },
    get: function get() {
      return this._value;
    }
  },
  value: {
    set: function set(v) {
      if (this._value == v) return;
      this._value = this.check(v);
      this.button.color = this.getBasicColorFormat(this._value);
      if (this._text === 'null') this.button.text = this.getCorrectText();
      this.mColorPickerPanel.color = this.getBasicColorFormat(this._value);
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
      if (this._text === null || this._text === undefined) this._text = 'null';
      if (this._text === 'null') this.button.text = this.getCorrectText();else this.button.text = this._text;
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
      this.mColorPickerPanel.otstup = this._otstup;
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

      if (this.mColorPickerPanel.activ) {
        this.colorPanelVisible(value);
      }

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

function MColorPickerPanel(cont, x, y, typePicker, fun, funDrag) {
  PIXI.Container.call(this);
  this.type = 'MColorPickerPanel';
  var self = this;
  pl102.addElement(this);
  cont.addChild(this);
  this.x = x || 0;
  this.y = y || 0;
  this.fun = fun;
  this.funDrag = funDrag;
  this._width = 180;
  this._height = pl102.wh * 2;
  this._otstup = 2;
  this._color = 16777215;
  this._activ = false;
  this._activMouse = true;
  this.typePicker = typePicker || 'basic';
  this.visible = this._activ;
  this.panel = new PLPanel(this);
  this.panel.image.visible = false;
  pl102.removeElement(this.panel, true);
  this.picker = null;

  this.init = function () {
    this.picker = this.getPicker();
    this.picker.color = this._color;
    this.picker.otstup = this._otstup;
    this.draw();
  };

  this.onDown = function () {
    self._color = this.color;
    if (self.fun) self.fun();
  };

  this.onMove = function () {
    self._color = this.color;
    if (self.funDrag) self.funDrag();
  };

  this.getPicker = function () {
    if (this.typePicker === 'basic') {
      return new MColorBasicPicker(this, 0, 0, this.onDown, this.onMove);
    } else if (this.typePicker === 'hsv') {
      return new MColorSHVPicker(this, 0, 0, this.onDown, this.onMove);
    }

    return new MColorBasicPicker(this, 0, 0, this.onDown, this.onMove);
    console.warn('Не корректное значение типа создаваемого пикера', this.typePicker);
  };

  this.draw = function () {
    this.panel.width = this._width;
    this.picker.x = this._otstup;
    this.picker.y = this._otstup; // первым должны задать высоту, для корректного расчета

    this.picker.height = this._height - this._otstup * 2;
    this.picker.width = this._width - this._otstup * 2;
    this.panel.height = this.picker.height + this._otstup * 2;
    this._height = this.panel.height;
  };

  this.init();
}

MColorPickerPanel.prototype = Object.create(PIXI.Container.prototype);
MColorPickerPanel.prototype.constructor = MColorPickerPanel;
Object.defineProperties(MColorPickerPanel.prototype, {
  width: {
    set: function set(value) {
      if (this._width === value) return;
      this._width = value;
      this.draw();
    },
    get: function get() {
      return this._width;
    }
  },
  height: {
    set: function set(value) {
      if (this._height === value) return;
      this._height = value;
      this.draw();
    },
    get: function get() {
      return this._height;
    }
  },
  otstup: {
    set: function set(value) {
      if (this._otstup === value) return;
      this._otstup = value;
      this.picker.otstup = this._otstup;
      this.draw();
    },
    get: function get() {
      return this._otstup;
    }
  },
  color: {
    set: function set(value) {
      if (this._color === value) return;
      this._color = value;
      this.picker.color = this._color;
    },
    get: function get() {
      return this._color;
    }
  },
  activ: {
    set: function set(value) {
      if (this._activ === value) return;
      this._activ = value;
      this.visible = this._activ;
    },
    get: function get() {
      return this._activ;
    }
  },
  activMouse: {
    set: function set(value) {
      if (this._activMouse === value) return;
      this._activMouse = value;
      this.panel.activMouse = this._activMouse;
      this.picker.activMouse = this._activMouse;
    },
    get: function get() {
      return this._activMouse;
    }
  }
});

function MColorBasicPicker(cont, x, y, fun, funDrag) {
  PIXI.Container.call(this);
  this.type = 'PLColorPickerPanel';
  var self = this;
  cont.addChild(this);
  pl102.addElement(this);
  this.fun = fun;
  this.funDrag = funDrag; // таскаем мышу внутри компонента

  this.x = x || 0;
  this.y = y || 0;
  this._width = 100;
  this._height = 100;
  this._otstup = pl102.otstup;
  this._activMouse = true;
  this._color = '0x000000';
  this.colorDrag = '0x000000';
  this.text = '';
  this.gradientView = true; // возможность отключить компонент gradient

  this.inputRGBView = true; // возможность отключить компонент inputRGB
  // this._activ = false;
  // this.visible = this._activ;
  // this.panel = new PLPanel(this);
  // pl102.removeElement(this.panel, true);
  // this.panel.image.visible = false;
  // this.panel.color = 0xffffff;
  // this.panel.width = this._width;
  // this.panel.height = this._height;
  // компонент градиент пришедшего цвета от белого к черному

  this.gradient = new PLGradient(this, 0, 0);
  this.gradient.activ = true;
  pl102.removeElement(this.gradient, true); // получаем цвет по клику

  this.gradient.fun = function () {
    self.color = this._color;
    self.pLColorPick.setColor(this._color.replace('0x', '#'), 'click');
    self.pLInputRGB.setColor(this._color.replace('0x', '#'));
    if (self.fun) self.fun();
  }; // получаем цвет по движению мыши


  this.gradient.funDrag = function () {
    self._color = this.colorDrag;
    self.colorDrag = this.colorDrag;
    self.pLColorPick.setColor(this.colorDrag.replace('0x', '#'));
    self.pLInputRGB.setColor(this.colorDrag.replace('0x', '#'));
    if (self.funDrag) self.funDrag();
  };

  this.gradient.funOut = function () {
    self._color = this.color;
    self.pLColorPick.setColor(this.colorDrag.replace('0x', '#'), 'out');
    self.pLInputRGB.setColor(this.color.replace('0x', '#'));
    if (self.funDrag) self.funDrag();
  }; // компонент цветовая палитра


  this.pLColorPick = new PLColorPick(this, 0, 0);
  this.pLColorPick.activ = true;
  pl102.removeElement(this.pLColorPick, true);

  this.pLColorPick.fun = function () {
    self._color = this.color;
    self.gradient.setColor(this.color.replace('0x', '#'), 'click');
    self.pLInputRGB.setColor(this.color.replace('0x', '#'));
    if (self.fun) self.fun();
  }; // получаем цвет по движению мыши


  this.pLColorPick.funDrag = function () {
    self._color = this.colorDrag;
    self.colorDrag = this.colorDrag;
    self.gradient.setColor(this.colorDrag.replace('0x', '#'));
    self.pLInputRGB.setColor(this.colorDrag.replace('0x', '#'));
    if (self.funDrag) self.funDrag();
  };

  this.pLColorPick.funOut = function () {
    self._color = this.color;
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
    self._color = color;
    self.gradient.setColor(color, 'click');
    self.pLInputRGB.setColor(color);
    self.pLColorPick.setColor(color, 'click');
  }; // компонент инпуты для воода цвета RGB


  this.pLInputRGB = new PLInputRGB(this, 0, 0, function () {
    self._color = self.setColorRGB(this.color);
    self.gradient.setColorRGB(this.color);
    self.pLColorPick.setColorRGB(this.color);
    if (self.fun) self.fun(false);
  });
  pl102.removeElement(this.pLInputRGB, true); // для перерисовки элементов компонента

  this.reposition = function () {
    // this.panel.width = this._width;
    // this.panel.height = this._height;
    this.gradient.width = this._width * 13 / 100;
    this.gradient.height = this._height * 77 / 100;
    this.pLColorPick.width = Math.round(this._width - this.gradient.width - this._otstup - 1);
    this.pLColorPick.height = Math.round(this._height * 77 / 100);
    this.pLColorPick.x = this.gradient.width + this._otstup;
    this.pLInputRGB.width = this.pLColorPick.width;
    this.pLInputRGB.height = this._height - this.pLColorPick.height - this._otstup * 2;
    this.pLInputRGB.x = this.pLColorPick.x;
    this.pLInputRGB.y = this.pLColorPick.height + this._otstup + 1; // если отключили компонент gradient

    if (this.gradientView === false) {
      this.pLColorPick.width = Math.round(this._width - this._otstup * 2);
      this.pLColorPick.x = this._otstup + 1;
      this.pLInputRGB.width = this.pLColorPick.width;
      this.pLInputRGB.x = this._otstup;
    } // если отключили компонент inputRGB


    if (this.inputRGBView === false) {
      this.pLColorPick.height = this._height - this._otstup * 2;
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

MColorBasicPicker.prototype = Object.create(PIXI.Container.prototype);
MColorBasicPicker.prototype.constructor = MColorBasicPicker;
Object.defineProperties(MColorBasicPicker.prototype, {
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
      if (this._color === value) return;
      this._color = this.corectCol(value);
      this.gradient.setColor(this._color, 'click');
      this.pLInputRGB.setColor(this._color);
      this.pLColorPick.setColor(this._color, 'click');
    },
    get: function get() {
      return this._color;
    }
  },
  activMouse: {
    set: function set(value) {
      if (this._activMouse === value) return;
      this._activMouse = value;
    },
    get: function get() {
      return this._activMouse;
    }
  }
});

function MColorSHVPicker(cont, x, y, fun, funOnMove) {
  PIXI.Container.call(this);
  this.type = 'MColorSHVPicker';
  var self = this;
  pl102.addElement(this);
  cont.addChild(this);
  this.x = x || 0;
  this.y = y || 0;
  this.fun = fun;
  this.funOnMove = funOnMove;
  this._width = 100;
  this._height = 100;
  this._otstup = 2;
  this._color = 16777215; // this._activ = false;

  this._activMouse = true;
  var ratio = 0.3;
  var scaleText = 0.8;
  var scaleStart = 200;
  this.hsvGradient = new HSVGradient(this, 0, 0, function () {
    self._color = this._color;
    self.colorHandler();
    if (self.fun) self.fun();
  });

  this.hsvGradient.funOnMove = function () {
    self._color = this._color;
    if (self.funOnMove) self.funOnMove();
  };

  pl102.removeElement(this.hsvGradient, true);
  this.contentColorFormat = new PIXI.Container();
  this.addChild(this.contentColorFormat);
  this.inputGroupRGB = new InputGroup(this.contentColorFormat, 0, 0, 'RGB', 3, function () {
    for (var i = 0; i < this.value.length; i++) {
      if (isNaN(this.value[i] * 1)) {
        this.value[i] = self.hsvGradient.color_rgb[i];
      } else {
        this.value[i] = this.value[i] * 1;
        if (this.value[i] < 0) this.value[i] = 0;
      }
    }

    if (this.value[0] > 255) this.value[0] = 255;
    if (this.value[1] > 255) this.value[1] = 255;
    if (this.value[2] > 255) this.value[2] = 255;
    self.hsvGradient.setRGB(this.value);
    self.colorHandler();
    if (self.fun) self.fun();
  });
  this.inputGroupRGB.label.fontSize = this.inputGroupRGB.label.fontSize * scaleText;
  this.inputGroupRGB.draw();
  this.inputGroupRGB.panel.visible = false;
  pl102.removeElement(this.inputGroupRGB, true);
  this.inputGroupHSV = new InputGroup(this.contentColorFormat, 0, 0, 'HSV', 3, function () {
    for (var i = 0; i < this.value.length; i++) {
      if (isNaN(this.value[i] * 1)) {
        this.value[i] = self.hsvGradient.color_hsv[i];
      } else {
        this.value[i] = this.value[i] * 1;
        if (this.value[i] < 0) this.value[i] = 0;
      }
    }

    if (this.value[0] > 360) this.value[0] = 360;
    if (this.value[1] > 100) this.value[1] = 100;
    if (this.value[2] > 100) this.value[2] = 100;
    self.hsvGradient.setHSV(this.value);
    self.colorHandler();
    if (self.fun) self.fun();
  });
  this.inputGroupHSV.label.fontSize = this.inputGroupHSV.label.fontSize * scaleText;
  this.inputGroupHSV.draw();
  this.inputGroupHSV.panel.visible = false;
  this.inputGroupHSV.otstup1 = 4;
  pl102.removeElement(this.inputGroupHSV, true);
  this.inputGroupHEX = new InputGroup(this.contentColorFormat, 0, 0, 'HEX', 0);
  this.inputGroupHEX.label.fontSize = this.inputGroupHEX.label.fontSize * scaleText;
  this.inputGroupHEX.draw();
  this.inputGroupRGB.panel.visible = false;
  this.inputGroupHEXInput = new InputGroup(this.contentColorFormat, 0, 0, '', 1, function () {
    if (this.value[0].length === 6) {
      self.color = parseInt('0x' + this.value[0], 16);
    } else {
      this.set([self.hsvGradient.color_hex.replace('#', '')]);
    }

    if (self.fun) self.fun();
  });
  this.inputGroupHEXInput.panel.visible = false;
  pl102.removeElement(this.inputGroupHEXInput, true);

  this.draw = function () {
    this.hsvGradient.width = this._width;
    var h = this.hsvGradient.height;
    var w0 = ratio * this._width;
    var w1 = this._width - w0 - this._otstup;
    var scale = this._width < scaleStart ? this._width / scaleStart : 1;
    this.contentColorFormat.y = h + this._otstup;
    this.inputGroupHEX.width = w0 / scale;
    this.inputGroupHEXInput.y = (this.inputGroupHSV.height * scale + this._otstup) / scale;
    this.inputGroupHEXInput.width = w0 / scale;
    this.inputGroupRGB.x = (w0 + this._otstup) / scale;
    this.inputGroupRGB.width = w1 / scale;
    this.inputGroupHSV.x = (w0 + this._otstup) / scale;
    this.inputGroupHSV.y = (this.inputGroupRGB.height * scale + this._otstup) / scale;
    this.inputGroupHSV.width = w1 / scale;
    this.contentColorFormat.scale.set(scale, scale);
    this._height = h + (this.inputGroupHSV.height * 2 + this._otstup * 2) * scale;
  };

  this.colorHandler = function () {
    this.inputGroupHEXInput.set([this.hsvGradient.color_hex.replace('#', '')]);
    this.inputGroupRGB.set(this.hsvGradient.color_rgb);
    this.inputGroupHSV.set(this.hsvGradient.color_hsv);
  };

  this.draw();
  this.colorHandler();
}

MColorSHVPicker.prototype = Object.create(PIXI.Container.prototype);
MColorSHVPicker.prototype.constructor = MColorSHVPicker;
Object.defineProperties(MColorSHVPicker.prototype, {
  width: {
    set: function set(value) {
      if (this._width === value) return;
      this._width = value;
      this.draw();
    },
    get: function get() {
      return this._width;
    }
  },
  height: {
    set: function set(value) {
      if (this._height === value) return;
      this._height = value;
      this.draw();
    },
    get: function get() {
      return this._height;
    }
  },
  otstup: {
    set: function set(value) {
      if (this._otstup === value) return;
      this._otstup = value;
      this.hsvGradient.otstup = this._otstup;
      this.inputGroupRGB.otstup = this._otstup;
      this.inputGroupHSV.otstup = this._otstup;
      this.draw();
    },
    get: function get() {
      return this._otstup;
    }
  },
  color: {
    set: function set(value) {
      if (this._color === value) return;
      this._color = value;
      if (typeof this._color === 'string') this._color = parseInt(value, 16);
      this.hsvGradient.color = this._color;
      this.colorHandler();
    },
    get: function get() {
      return this._color;
    }
  },
  activMouse: {
    set: function set(value) {
      if (this._activMouse === value) return;
      this._activMouse = value;
      this.inputGroupRGB.activMouse = this._activMouse;
      this.inputGroupHSV.activMouse = this._activMouse;
      this.inputGroupHEX.activMouse = this._activMouse;
      this.inputGroupHEXInput.activMouse = this._activMouse;
      this.hsvGradient.activMouse = this._activMouse;
    },
    get: function get() {
      return this._activMouse;
    }
  }
});

/***/ }),

/***/ "./pl102/src/plPlus/NumericPanel.js":
/*!******************************************!*\
  !*** ./pl102/src/plPlus/NumericPanel.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NumericPanel = NumericPanel;

function NumericPanel(cont, _x, _y, _fun) {
  PIXI.Container.call(this);
  var self = this;
  this._value = 0;
  this.type = 'NumericPanel';
  this.content = new PIXI.Container();
  this.addChild(this.content);
  if (cont !== undefined) cont.addChild(this);
  this.fun = _fun;
  this.x = _x || 0;
  this.y = _y || 0;
  this.arrayBtn = [];
  this.otstup = 2;
  this._data = [];
  this.cache = [];
  this._width = 100;
  this._height = 100;
  this._value = 1;
  this.panel = new PLPanel(this.content, this.content.x, this.content.y);
  this.panel.width = this._width;
  this.panel.height = pl102.wh + this.otstup * 2;
  this.label = new PLLabel(this.content, 0, 0, 'NO DATA');

  this.refreshData = function () {
    this.clear();

    for (var i = 0; i < this._data.length; i++) {
      this.arrayBtn[i] = this.getBtn();
      this.arrayBtn[i].text = this._data[i];
    }

    this.label.visible = this._data.length == 0;

    if (this.label.visible) {
      this.label.x = this.panel.width - pl102.wh - this.otstup * 5;
      this.label.y = this.panel.height / 2 - this.label.height + this.otstup * 5;
    }

    this.reposition();
  };

  this.clear = function () {
    for (var i = 0; i < this.cache.length; i++) {
      this.cache[i].life = false;
    }
  };

  this.getBtn = function () {
    for (var i = 0; i < this.cache.length; i++) {
      if (this.cache[i].life === false) {
        this.cache[i].life = true;
        return this.cache[i];
      }
    }

    var numBtn = new PLButton(this.content, 0, 0, '', this.onDownBtn);
    numBtn.life = true;
    this.cache.push(numBtn);
    return numBtn;
  };

  this.reposition = function () {
    var x = this.otstup;
    var y = this.otstup;
    this.panel.width = this._width;
    var btnW = (this._width - this.otstup * 2) / this._data.length;

    for (var i = 0; i < this.arrayBtn.length; i++) {
      if (this.arrayBtn[i].life) {
        this.arrayBtn[i].width = btnW - this.otstup;
        this.arrayBtn[i].label.fontSize = 12;
        this.arrayBtn[i].position.set(x, y);
        x += btnW;
      }
    }
  };

  this.onDownBtn = function () {
    self.value = this.text;
    if (self.fun) self.fun();
  };

  this.setActive = function (value) {
    var isDisabled = true;

    for (var i = 0; i < self.arrayBtn.length; i++) {
      if (self.arrayBtn[i].text == value && isDisabled) {
        isDisabled = false;
        self.arrayBtn[i].activ = true;
      } else {
        self.arrayBtn[i].activ = false;
      }
    }
  };
}

NumericPanel.prototype = Object.create(PIXI.Container.prototype);
NumericPanel.prototype.constructor = NumericPanel;
Object.defineProperties(NumericPanel.prototype, {
  data: {
    set: function set(v) {
      if (v.length !== 0) {
        this._data = v;
      }

      this.refreshData();
    },
    get: function get() {
      return this._data;
    }
  },
  value: {
    set: function set(value) {
      if (this._value === value) return;
      this._value = value;
      this.setActive(this._value);
    },
    get: function get() {
      return this._value;
    }
  },
  width: {
    set: function set(value) {
      if (this._width === value) return;
      this._width = value;
      this.refreshData();
    },
    get: function get() {
      return this._value;
    }
  }
});

/***/ }),

/***/ "./pl102/src/plPlus/PLArrayFon.js":
/*!****************************************!*\
  !*** ./pl102/src/plPlus/PLArrayFon.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PLArrayFon = PLArrayFon;

function PLArrayFon(cont, _link) {
  PIXI.Container.call(this);
  this.type = 'PLArrayFon';
  var self = this;
  cont.addChild(this);
  this.content = new PIXI.Container();
  this.addChild(this.content);
  this.contentGraph = new PIXI.Container();
  this.addChild(this.contentGraph);
  this.link = _link || pl102.base;
  this._width = 100;
  this._alphaIm = 0.3;
  this.colorLine = 0xa4a4a4; //pl102.color10//0xa4a4a4;

  this.lineWidth = 1;
  this.content.alpha = this._alphaIm;
  this.otstupLineImg = 1; //this._nizNum = 30;
  //this._nizAlpha = 0.2;

  this.graphics = new PIXI.Graphics();
  this.contentGraph.addChild(this.graphics);
  this.array;
  this.arrayImage = []; // this.y = 300

  var img;

  this.setArrFon = function (_arr) {
    this.array = _arr;
    this.clear();

    for (var i = 0; i < this.array.length; i += 2) {
      if (this.arrayImage[i / 2]) {
        this.arrayImage[i / 2].visible = true;
      } else {
        img = new PLImage(this.content, 0, 0, this.link); //img.alpha= this._nizAlpha;
        //img.height = this._nizNum;

        img.visible = true;
        img.width = this._width;
        this.arrayImage.push(img);
      }

      this.arrayImage[i / 2].y = this.array[i];
      this.arrayImage[i / 2].height = this.array[i + 1] - this.lineWidth - this.otstupLineImg;
      this.arrayImage[i / 2].kontur = false; //this.editHeight(this.arrayImage[i/2], this.array[i+1]);

      this.draw102();
    }
  };

  this.editHeight = function (_img, _h) {
    if (this._nizNum <= 0) {
      _img.height = _h;
      _img.y = 0;
    } else {
      if (_h > this._nizNum) {
        _img.height = this._nizNum;
        _img.y = _img.y + _h - this._nizNum;
      } else {
        _img.height = _h;
      }
    }
  };

  var h;

  this.draw102 = function () {
    this.graphics.clear();

    for (var i = 0; i < this.arrayImage.length; i++) {
      if (this.arrayImage[i].visible == true) {
        h = this.arrayImage[i].y + this.arrayImage[i].height + this.lineWidth + this.otstupLineImg;
        this.graphics.beginFill();
        this.graphics.lineStyle(this.lineWidth, this.colorLine);
        this.graphics.moveTo(0, h);
        this.graphics.lineTo(this._width, h);
        this.graphics.endFill();
      }
    }
  };

  this.clear = function () {
    for (var i = 0; i < this.arrayImage.length; i++) {
      this.arrayImage[i].visible = false;
      this.arrayImage[i].y = 0;
    }
  };
}

;
PLArrayFon.prototype = Object.create(PIXI.Container.prototype);
PLArrayFon.prototype.constructor = PLArrayFon;
Object.defineProperties(PLArrayFon.prototype, {
  width: {
    set: function set(value) {
      if (this._width == value) return;
      this._width = value;

      for (var i = 0; i < this.arrayImage.length; i++) {
        this.arrayImage[i].width = this._width;
      }

      this.draw102();
    },
    get: function get() {
      return this._width;
    }
  },
  alphaIm: {
    set: function set(value) {
      if (this._alphaIm == value) return;
      this._alphaIm = value;
      this.content.alpha = value;
    },
    get: function get() {
      return this._alphaIm;
    }
  }
});

/***/ }),

/***/ "./pl102/src/plPlus/PLButSwitch.js":
/*!*****************************************!*\
  !*** ./pl102/src/plPlus/PLButSwitch.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PLButSwitch = PLButSwitch;

/**
 * Переключатель с кнопок
 * @class
 * @param {cont} контент
 * @param {_x}
 * @param {_y}
 * @param {_fun}
*/
function PLButSwitch(_cont, _x, _y, _fun) {
  PIXI.Container.call(this);
  this.type = 'PLButSwitch';

  _cont.addChild(this);

  var self = this;
  this.x = _x || 0;
  this.y = _y || 0;
  this.fun = _fun;
  this._width = 100;
  this._height = pl102.wh;
  this._index = -1; // индекс активной вкладки

  this._plusArrText = []; // массив ничего не хранит! но он нужен для перевода arrTab. сет/гет

  this.arrTab = []; // мфссив названий вкладок

  this.arrBut = []; // массив кнопок (активные и те что в кеше)

  this.otstup = 10; // отступ текста в кнопке

  this.colorActiv = 0xffffff; // цвет активной кнопки

  this.colorNotActiv = pl102.color5; // цвет неактивной кнопки

  this.content = new PIXI.Container();
  this.addChild(this.content);
  var text = '';
  /**
      * Добавить вкладку
      * @param {_text} текст вкладки
      */

  this.addTab = function (_text) {
    this.addArr([_text]);
  };
  /**
      * Добавить массив вкладок
      * @param {_arr[<text>]} массив текста вкладок
      */


  this.addArr = function (_arr) {
    for (var i = 0; i < _arr.length; i++) {
      text = _arr[i] || 'text';
      this.arrTab.push(text);
      var b = this.getButton();
      b.text = text;
    }

    this.reCount();
    this.changeActiv();
    this.reposition();
  };
  /**
      * Заменяет массив вкладок
      * @param {_arr[<text>]} массив текста вкладок
      */


  this.setArr = function (_arr) {
    this.clearTab();
    this.addArr(_arr);
  };

  this.getArrTab = function () {
    var arr = [];

    for (var i = 0; i < this.arrTab.length; i++) {
      arr[i] = this.arrTab[i];
    }

    return arr;
  };

  this.clearTab = function () {
    this.arrTab.length = 0;

    for (var i = 0; i < this.arrBut.length; i++) {
      this.arrBut[i].visible = false;
    }
  };

  this.removeTabByText = function (_text) {
    // удаляем с таб
    for (var i = 0; i < this.arrTab.length; i++) {
      if (this.arrTab[i] === _text) {
        this.arrTab.splice(i, 1);
        i = i - 2 > 0 ? i - 2 : -1;
      }
    } // выключаем баттон


    for (var i = 0; i < this.arrBut.length; i++) {
      if (this.arrBut[i].visible) {
        if (this.arrBut[i].text === _text) {
          this.arrBut[i].visible = false;
        }
      }
    }

    this.reCount();
    this.reposition();
    this.index = 0;
  };
  /**
      * пересчитываем idArr для кнопок
      */


  this.reCount = function () {
    num = 0;

    for (var i = 0; i < this.arrBut.length; i++) {
      if (this.arrBut[i].visible) {
        this.arrBut[i].idArr = num;
        num++;
      }
    }
  };

  this.getButton = function () {
    for (var i = 0; i < this.arrBut.length; i++) {
      if (this.arrBut[i].visible === false) {
        // переношу в конец списка и возвращаю
        var but = this.arrBut[i];
        but.visible = true;
        this.arrBut.splice(i, 1);
        this.arrBut.push(but);
        return this.arrBut[this.arrBut.length - 1];
      }
    }

    var b = new PLButton(this.content, 0, 0, '', this.butDow);
    b.setStile(1);
    b.label.bold = false;
    b.labelOtstup = this.otstup;
    this.arrBut.push(b);
    return b;
  };

  this.butDow = function () {
    self.index = this.idArr;
    if (self.fun) self.fun();
  };

  var num = 0;
  var wOneTab = 0;

  this.reposition = function () {
    num = 0;
    wOneTab = this._width / this.arrTab.length;

    for (var i = 0; i < this.arrBut.length; i++) {
      if (this.arrBut[i].visible) {
        this.arrBut[i].x = wOneTab * num;
        this.arrBut[i].width = wOneTab;
        num++;
      }
    }
  };

  this.changeActiv = function () {
    for (var i = 0; i < this.arrBut.length; i++) {
      if (this.arrBut[i].visible) {
        this.arrBut[i].color = this.colorNotActiv;

        if (this.arrBut[i].idArr === this._index) {
          this.arrBut[i].color = this.colorActiv;
        }
      }
    }
  };
}

PLButSwitch.prototype = Object.create(PIXI.Container.prototype);
PLButSwitch.prototype.constructor = PLButSwitch;
Object.defineProperties(PLButSwitch.prototype, {
  width: {
    set: function set(value) {
      if (this._width === value) return;
      this._width = value;
      this.reposition();
    },
    get: function get() {
      return this._width;
    }
  },
  height: {
    set: function set(value) {
      if (this._height === value) return;
      this._height = value;

      for (var i = 0; i < this.arrBut.length; i++) {
        this.arrBut[i].height = this._height;
      }
    },
    get: function get() {
      return this._height;
    }
  },
  index: {
    set: function set(value) {
      this._index = value;
      this.changeActiv();
    },
    get: function get() {
      return this._index;
    }
  },
  plusArrText: {
    set: function set(value) {
      this.setArr(value);
    },
    get: function get() {
      return this.getArrTab();
    }
  }
});

/***/ }),

/***/ "./pl102/src/plPlus/PLButtonFullWidth.js":
/*!***********************************************!*\
  !*** ./pl102/src/plPlus/PLButtonFullWidth.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PLButtonFullWidth = PLButtonFullWidth;

function PLButtonFullWidth(_cont, _x, _y, _fun) {
  PIXI.Container.call(this);

  _cont.addChild(this);

  this.type = 'PLButtonFullWidth';
  var self = this;
  this.fun = _fun;
  this._width = 100;
  this._height = 100;
  this._otstup = 2;
  this._typeStyle = 0;
  this.array = [];
  this.arrayBtn = [];
  this.index = -1;

  this.down = function () {
    self.index = this.idArr;
    if (self.fun) self.fun();
  };

  var btn;

  this.create = function (_title, _link) {
    btn = new PLButton(this, 0, 0, '', this.down);
    btn.idArr = this.arrayBtn.length;
    if (_title != '') btn.text = _title;
    if (_link != '') btn.loadImeg(_link);
    this.arrayBtn.push(btn);
  };

  this.draw = function () {
    var wh = this._width / this.arrayBtn.length;

    for (var i = 0; i < this.arrayBtn.length; i++) {
      this.arrayBtn[i].x = i * wh;
      this.arrayBtn[i].width = wh;
      this.arrayBtn[i].height = this._height;
    }
  };

  this.setArr = function (_arr) {
    this.array = _arr;

    for (var i = 0; i < this.array.length; i++) {
      this.create(this.array[i].title, this.array[i].link);
    }

    this.setStyle();
    this.draw();
  };

  this.setStyle = function () {
    if (this.typeStyle == 0) {
      for (var i = 0; i < this.arrayBtn.length; i++) {
        this.arrayBtn[i].konturColor = 0x9b9fa8;
        this.arrayBtn[i].boolCenter = true;
        this.arrayBtn[i].visiblePanel = false;
        this.arrayBtn[i].otstup = 2;
        this.arrayBtn[i].boolKontur = true;
      }
    }
  };
}

PLButtonFullWidth.prototype = Object.create(PIXI.Container.prototype);
PLButtonFullWidth.prototype.constructor = PLButtonFullWidth;
Object.defineProperties(PLButtonFullWidth.prototype, {
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
  typeStyle: {
    set: function set(value) {
      if (this._typeStyle == value) return;
      this._typeStyle = value;
      this.draw();
    },
    get: function get() {
      return this._typeStyle;
    }
  }
});

/***/ }),

/***/ "./pl102/src/plPlus/PLColorPalette.js":
/*!********************************************!*\
  !*** ./pl102/src/plPlus/PLColorPalette.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PLColorPalette = PLColorPalette;
exports.MColorPalettePicker = MColorPalettePicker;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function PLColorPalette(_cont, _x, _y, _fun) {
  PIXI.Container.call(this);

  _cont.addChild(this);

  this.type = 'PLColorPalette';
  var self = this;
  pl102.addElement(this);
  this.fun = _fun;
  this.funBtnAdd = null;
  this.funChangeVisiblePanel = null;
  this.x = _x || 0;
  this.y = _y || 0;
  this._width = 100;
  this._height = 50;
  this._otstup = 2;
  this._activMouse = true;
  this._activ = true;
  this._value = '0xffffff';
  this._color = '0xffffff';
  this._isOpenPallPicker = false;
  this.index = 0;
  this.arrColor = [0x000000, 0xfec828, 0x42a5f6, 0xfe7143, 0x66bb6a];
  this.ratio = 0.7;
  /**
   * Формат пришедшего цвета.
   * DEC - 16777215, DECSTR - 0xffffff, HEX - 0xffffff, THREE - THREE.Color.
   */

  this.colorFormat = 'DECSTR';
  var offsetBtn = 2;
  var offsetBorder = 1;
  this.panel = new PLPanel(this, 0, 0);
  this.panel.image.visible = false;
  pl102.removeElement(this.panel, true);
  this.colorConverter = new ColorConverter();
  this.colorPicker = new PLColorPicker(this, 0, 0, '', function () {
    self.index = this.index;
    self.changeValueToFormat(this.color);
    if (self.fun) self.fun();
  });
  this.colorPicker.kolColor = 5;
  this.colorPicker.setArray(this.arrColor);
  this.colorPicker.otstup = this._otstup;
  this.colorPicker.activContur = true;
  this.colorPicker.kolElRow = 5;
  this.colorPicker.contur.innerLine = true;
  this.colorPicker.contur.thickness = -1.5;
  pl102.removeElement(this.colorPicker, true);
  this.arrLink = ['resources/images/pikNew/color/plus.png', 'resources/images/pikNew/color/minus.png'];
  this.btnAdd = new PLButton(this, 0, 0, '', function () {
    self.isOpenPallPicker = !self._isOpenPallPicker; // self.mColorPalettePicker.visible = isOpenPallPicker;
    // if (isOpenPallPicker === true) {
    // 	self._height = self.panel.height + self.mColorPalettePicker._height;
    // } else {
    // 	self._height = self.panel.height;
    // }

    if (self.funBtnAdd) self.funBtnAdd(); // if (self.funChangeVisiblePanel) self.funChangeVisiblePanel(isOpenPallPicker);
  }); // this.btnAdd.funUp = function () {
  // 	self.checkOpenPalettePicker(isOpenPallPicker);
  // };

  this.btnAdd.boolScalePic = true;
  this.btnAdd.setStile(1);
  this.btnAdd.boolKontur = true;
  this.btnAdd.konturSize = offsetBorder;
  this.btnAdd.konturColor = 0xa9a9a9;
  this.btnAdd.panel.image.alpha = 0;
  this.btnAdd.loadImeg(this.arrLink[0]);
  pl102.removeElement(this.btnAdd, true); // this.onBtnAddDown = function () {
  // 	var p = self.toLocal(pl102.global);
  // 	var isW = p.x <= self._width;
  // 	var isH = p.y <= self._height;
  // 	var isInner = (p.x >= 0 && p.y >= 0 && isW && isH);
  // 	if (!isInner) {
  // 		// isOpenPallPicker = false;
  // 		// self.mColorPalettePicker.visible = isOpenPallPicker;
  // 		self.btnAdd.loadImeg(this.arrLink[0]);
  // 		pl102.stage.off('mousedown', self.onBtnAddDown);
  // 		// if (self.funChangeVisiblePanel) self.funChangeVisiblePanel(isOpenPallPicker);
  // 	}
  // };
  // this.checkOpenPalettePicker = function (_visible) {
  // 	if (_visible === true) {
  // 		pl102.stage.on('mousedown', self.onBtnAddDown);
  // 	} else {
  // 		pl102.stage.off('mousedown', self.onBtnAddDown);
  // 	}
  // };
  // this.mColorPalettePicker = new MColorPalettePicker(this, 0, 0, function () {
  // 	if (self.index === -1) return;
  // 	self.changeValueToFormat(this.color);
  // 	self.arrColor[self.index] = this.color;
  // 	self.colorPicker.clearColor();
  // 	self.colorPicker.setArray(self.arrColor);
  // 	if (self.fun) self.fun();
  // });
  // this.mColorPalettePicker.height = 164;
  // this.mColorPalettePicker.visible = isOpenPallPicker;

  this.draw = function () {
    var cpl = this._width * this.ratio;
    var cpr = this._width - cpl;
    var cph = 0;
    this.colorPicker.position.set(this._otstup, this._otstup);
    this.colorPicker.width = cpl - this._otstup * 2;
    cph = this.colorPicker.height;
    this.btnAdd.position.set(cpl, this._otstup + offsetBtn);
    this.btnAdd.width = cpr - this._otstup - offsetBorder * 2;
    this.btnAdd.height = cph - offsetBtn * 2;
    this.panel.width = this._width;
    this.panel.height = cph + this._otstup * 2; // this.mColorPalettePicker.position.set(0, this.panel.height);
    // this.mColorPalettePicker.width = this._width;
    // if (isOpenPallPicker === true) {
    // this._height = this.panel.height + this.mColorPalettePicker.height;
    // } else {

    this._height = this.panel.height; // }
  };

  this.getBasicColorFormat = function (value) {
    var color = value;

    if (typeof value === 'string') {
      if (value.indexOf('#') !== -1) {
        color = parseInt(value.replace('#', '0x'), 16);
      }

      if (value.indexOf('0x') !== -1) {
        color = parseInt(value, 16);
      }
    }

    if (_typeof(value) === 'object') {
      if (window['THREE'] && 'getHexString' in value) {
        var hex = value.getHexString();
        color = parseInt(hex.replace('#', '0x'), 16);
      }
    }

    return color;
  };

  this.changeValueToFormat = function (value) {
    if (this.colorFormat === 'DECSTR') {
      this._value = this.colorConverter.decToDecStr(value);
    } else if (this.colorFormat === 'HEX') {
      this._value = this.colorConverter.decToHex(value);
    } else if (this.colorFormat === 'THREE') {
      this._value.set(value);
    } else {
      this._value = value;
    }

    this._color = this._value;
  };

  this.check = function (_value) {
    var value = _value;

    if (typeof value === 'number') {
      this.colorFormat = 'DEC';

      if (value < 0 || value > 16777215) {
        value = 16777215;
        console.warn('Значение цвета выходит за границы 0 -> 16777215!');
      }

      return value;
    }

    if (typeof value === 'string') {
      this.colorFormat = 'DECSTR';
      var splitParam = '';

      if (value.indexOf('#') !== -1) {
        this.colorFormat = 'HEX';
        splitParam = '#';
      }

      if (value.indexOf('0x') !== -1) splitParam = '0x';

      if (splitParam.length === 0 || value.split(splitParam)[1].length < 6) {
        value = '0xffffff';
        console.warn('Не корректное значение цвета!! (#ffffff || 0xffffff)', value);
      }

      return value;
    }

    if (_typeof(value) === 'object') {
      if (window['THREE'] && 'addColors' in value) {
        this.colorFormat = 'THREE';
        return value;
      }
    }

    console.warn('Пришедшее значение не поддерживаеться!', value);
    return this._value;
  };

  this.draw();
}

PLColorPalette.prototype = Object.create(PIXI.Container.prototype);
PLColorPalette.prototype.constructor = PLColorPalette;
Object.defineProperties(PLColorPalette.prototype, {
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
      this._color = value;
      this.value = value;
    },
    get: function get() {
      return this._value;
    }
  },
  value: {
    set: function set(v) {
      if (this._value == v) return;
      this._value = this.check(v);
      var basicColor = this.getBasicColorFormat(this._value);
      this.colorPicker.moveKontur(basicColor);
      this.index = this.colorPicker.index;
    },
    get: function get() {
      return this._value;
    }
  },
  otstup: {
    set: function set(value) {
      if (this._otstup == value) return;
      this._otstup = value;
      this.colorPicker.otstup = this._otstup; // this.mColorPalettePicker.otstup = this._otstup;

      this.draw();
    },
    get: function get() {
      return this._otstup;
    }
  },
  activMouse: {
    set: function set(value) {
      if (this._activMouse == value) return;
      this._activMouse = value;
    },
    get: function get() {
      return this._activMouse;
    }
  },
  isOpenPallPicker: {
    set: function set(value) {
      if (this._isOpenPallPicker === value) return;
      this._isOpenPallPicker = value;
      var indexActImg = this._isOpenPallPicker === false ? 0 : 1;
      this.btnAdd.loadImeg(this.arrLink[indexActImg]);
    },
    get: function get() {
      return this._isOpenPallPicker;
    }
  }
});

function MColorPalettePicker(_cont, _x, _y, _fun, _funDrag) {
  PIXI.Container.call(this);
  this.type = 'MColorPalettePicker';
  var self = this;

  _cont.addChild(this);

  pl102.addElement(this);
  this.fun = _fun;
  this.funDrag = _funDrag;
  this.x = _x || 0;
  this.y = _y || 0;
  this._width = 100;
  this._height = 100;
  this._otstup = 2;
  this._activMouse = true;
  this._activ = true;
  this.position.set(this.x, this.y);
  this.content = new PIXI.Container();
  this.addChild(this.content);
  this.panel = new PLPanel(this.content, 0, 0); // this.panel.visible = false;

  pl102.removeElement(this.panel, true);
  this.ratioLeft = 0.56;
  this.ratioCenter = 0.14;
  this.ratioRight = 1 - (this.ratioLeft + this.ratioCenter);
  this.color = 0xffffff;
  this.colorRGB = [255, 255, 255];
  this.colorHEX = '#ffffff';
  this.colorConverter = new ColorConverter();
  this.colorPick = new PLColorPick(this.content, 0, 0, function () {
    self.colorConvert(this.color);
    self.gradient.setColor(self.colorHEX, 'click');
    self.colorPanel.color = this.color;
    self.inputGroupR.set([self.colorRGB[0]]);
    self.inputGroupG.set([self.colorRGB[1]]);
    self.inputGroupB.set([self.colorRGB[2]]);
    self.inputGroupHex.set([self.colorHEX]); // self.offSelect();

    if (self.fun) self.fun();
  });
  this.colorPick.activ = true;

  this.colorPick.funDrag = function () {
    self.colorConvert(this.colorDrag);
    self.gradient.setColor(self.colorHEX);
    self.colorPanel.color = this.colorDrag;
    self.inputGroupR.set([self.colorRGB[0]]);
    self.inputGroupG.set([self.colorRGB[1]]);
    self.inputGroupB.set([self.colorRGB[2]]);
    self.inputGroupHex.set([self.colorHEX]); // self.colorDrag = this.colorDrag;

    if (self.funDrag) self.funDrag();
  };

  this.colorPick.funOut = function () {
    self.colorConvert(this.color);
    self.gradient.setColor(self.colorHEX);
    self.colorPanel.color = this.color;
    self.inputGroupR.set([self.colorRGB[0]]);
    self.inputGroupG.set([self.colorRGB[1]]);
    self.inputGroupB.set([self.colorRGB[2]]);
    self.inputGroupHex.set([self.colorHEX]);
    if (self.funDrag) self.funDrag();
  }; // this.colorPick.konturColor = this.color2;


  pl102.removeElement(this.colorPick, true);
  this.gradient = new PLGradient(this.content, 0, 0, function () {
    self.colorConvert(this.color);
    self.colorPick.setColor(self.colorHEX, 'click');
    self.colorPanel.color = this.color;
    self.inputGroupR.set([self.colorRGB[0]]);
    self.inputGroupG.set([self.colorRGB[1]]);
    self.inputGroupB.set([self.colorRGB[2]]);
    self.inputGroupHex.set([self.colorHEX]); // self.offSelect();

    if (self.fun) self.fun();
  });
  this.gradient.drawCursor(4, 5);
  this.gradient.activ = true;

  this.gradient.funDrag = function () {
    self.colorConvert(this.colorDrag);
    self.colorPick.setColor(self.colorHEX);
    self.colorPanel.color = this.colorDrag;
    self.inputGroupR.set([self.colorRGB[0]]);
    self.inputGroupG.set([self.colorRGB[1]]);
    self.inputGroupB.set([self.colorRGB[2]]);
    self.inputGroupHex.set([self.colorHEX]); // self.colorDrag = this.colorDrag;

    if (self.funDrag) self.funDrag();
  };

  this.gradient.funOut = function () {
    self.colorConvert(this.color);
    self.colorPick.setColor(self.colorHEX, 'out');
    self.colorPanel.color = this.color;
    self.inputGroupR.set([self.colorRGB[0]]);
    self.inputGroupG.set([self.colorRGB[1]]);
    self.inputGroupB.set([self.colorRGB[2]]);
    self.inputGroupHex.set([self.colorHEX]);
    if (self.funDrag) self.funDrag();
  }; // this.gradient.konturColor = this.color2;


  pl102.removeElement(this.gradient, true);
  this.imageBtn = new PLButton(this.content, 0, 0, '');
  this.imageBtn.boolScalePic = true;
  this.imageBtn.visiblePanel = false;
  this.imageBtn.loadImeg('resources/images/pikNew/col_pic.png');
  this.imageBtn.otstup = 0;
  this.imageBtn.okDown = false;
  this.imageBtn.width = this.imageBtn.height = 46;
  pl102.removeElement(this.imageBtn, true);
  this.colorPanel = new PLPanel(this.content, 0, 0);
  this.colorPanel.image.visible = false;
  pl102.removeElement(this.colorPanel, true);
  this.inputGroupR = new InputGroup(this.content, 0, 0, 'R', 1, function (_input) {
    if (isNaN(this.value[0] * 1) === true) {
      this.value[0] = self.colorRGB[0];
      _input.value = self.colorRGB[0];
      return;
    }

    self.colorRGB[0] = this.value[0] * 1;
    self.colorConvert(self.colorRGB);
    self.colorPick.setColor(self.colorHEX, 'click');
    self.gradient.setColor(self.colorHEX, 'click');
    self.colorPanel.color = self.color;
    self.inputGroupHex.set([self.colorHEX]);
    if (self.fun) self.fun();
  });
  this.inputGroupR.label.fontSize = 13;
  this.inputGroupR.otstup1 = 1;
  this.inputGroupR.panel.visible = false;
  pl102.removeElement(this.inputGroupR, true);
  this.inputGroupG = new InputGroup(this.content, 0, 0, 'G', 1, function (_input) {
    if (isNaN(this.value[0] * 1) === true) {
      this.value[0] = self.colorRGB[1];
      _input.value = self.colorRGB[1];
      return;
    }

    self.colorRGB[1] = this.value[0] * 1;
    self.colorConvert(self.colorRGB);
    self.colorPick.setColor(self.colorHEX, 'click');
    self.gradient.setColor(self.colorHEX, 'click');
    self.colorPanel.color = self.color;
    self.inputGroupHex.set([self.colorHEX]);
    if (self.fun) self.fun();
  });
  this.inputGroupG.label.fontSize = 13;
  this.inputGroupG.otstup1 = 1;
  this.inputGroupG.panel.visible = false;
  pl102.removeElement(this.inputGroupG, true);
  this.inputGroupB = new InputGroup(this.content, 0, 0, 'B', 1, function (_input) {
    if (isNaN(this.value[0] * 1) === true) {
      this.value[0] = self.colorRGB[2];
      _input.value = self.colorRGB[2];
      return;
    }

    self.colorRGB[2] = this.value[0] * 1;
    self.colorConvert(self.colorRGB);
    self.colorPick.setColor(self.colorHEX, 'click');
    self.gradient.setColor(self.colorHEX, 'click');
    self.colorPanel.color = self.color;
    self.inputGroupHex.set([self.colorHEX]);
    if (self.fun) self.fun();
  });
  this.inputGroupB.label.fontSize = 13;
  this.inputGroupB.otstup1 = 1;
  this.inputGroupB.panel.visible = false;
  pl102.removeElement(this.inputGroupB, true);
  this.inputGroupHex = new InputGroup(this.content, 0, 0, '', 1, function (_input) {
    var length = this.value[0].length;
    var isHex = this.value[0].indexOf('#') !== -1;

    if (length === 7 && isHex === true) {
      self.colorConvert(this.value[0]);
    } else if (length === 6 && isHex === false) {
      this.value[0] = '#' + this.value[0];
      _input.value = this.value[0];
      self.colorConvert(this.value[0]);
    } else {
      this.value[0] = self.colorHEX;
      _input.value = self.colorHEX;
      return;
    }

    self.colorPick.setColor(self.colorHEX, 'click');
    self.gradient.setColor(self.colorHEX, 'click');
    self.colorPanel.color = self.color;
    self.inputGroupR.set([self.colorRGB[0]]);
    self.inputGroupG.set([self.colorRGB[1]]);
    self.inputGroupB.set([self.colorRGB[2]]);
    if (self.fun) self.fun();
  });
  this.inputGroupHex.array[0].input.htmlElement.style.fontWeight = 'bold';
  pl102.removeElement(this.inputGroupHex, true);

  this.colorConvert = function (_color) {
    if (typeof _color === 'string') {
      if (_color.indexOf('0x') !== -1) {
        // Decimal color
        this.color = this.colorConverter.decStrToDec(_color);
        this.colorRGB = this.colorConverter.decToRgb(_color);
        this.colorHEX = this.colorConverter.decToHex(_color);
      } else {
        // HEX color
        this.colorHEX = _color;
        this.color = this.colorConverter.hexToDec(_color);
        this.colorRGB = this.colorConverter.hexToRgb(_color);
      }
    } else if (typeof _color === 'number') {
      this.color = _color;
      this.colorHEX = this.colorConverter.decToHex(_color);
      this.colorRGB = this.colorConverter.decToRgb(_color);
    } else {
      this.colorRGB = _color;
      this.color = this.colorConverter.rgbToDec(_color);
      this.colorHEX = this.colorConverter.rgbToHex(_color);
    }
  };

  this.draw = function () {
    var wl = this._width * this.ratioLeft;
    var wc = this._width * this.ratioCenter;
    var wr = this._width - (wl + wc);
    var hg = this.inputGroupR.height;
    var hi = this._height - hg * 2 - this._otstup * 3;
    var hp = this._height - hg - this._otstup * 3;
    var wrgb = (wl + wc - this._otstup * 4) / 3;
    var ofbix = (wr - this._otstup - this.imageBtn.width) / 2;
    var ofbiy = (hi + this._otstup - this.imageBtn.height) / 2;
    this.colorPick.position.set(this._otstup, this._otstup);
    this.colorPick.width = wl - this._otstup * 2;
    this.colorPick.height = hp;
    this.gradient.position.set(wl, this._otstup);
    this.gradient.width = wc - this._otstup;
    this.gradient.height = hp;
    this.imageBtn.position.set(ofbix + wl + wc, ofbiy);
    this.colorPanel.position.set(wl + wc, hi + this._otstup);
    this.colorPanel.width = wr - this._otstup;
    this.colorPanel.height = hg;
    this.inputGroupR.position.set(this._otstup, hp + this._otstup * 2);
    this.inputGroupR.width = wrgb;
    this.inputGroupG.position.set(this._otstup * 2 + wrgb, hp + this._otstup * 2);
    this.inputGroupG.width = wrgb;
    this.inputGroupB.position.set(this._otstup * 3 + wrgb * 2, hp + this._otstup * 2);
    this.inputGroupB.width = wrgb;
    this.inputGroupHex.position.set(wl + wc, hp + this._otstup * 2);
    this.inputGroupHex.width = wr - this._otstup;
    this.panel.width = this._width;
    this.panel.height = this._height;
  };

  this.setColor = function (_color) {
    this.color = _color;

    if (typeof _color === 'string') {
      this.color = this.colorConverter.decStrToDec(_color);
    }

    this.colorConvert(this.color);
    this.colorPick.setColor(this.colorHEX, 'click');
    this.gradient.setColor(this.colorHEX, 'click');
    this.colorPanel.color = this.color;
    this.inputGroupR.set([this.colorRGB[0]]);
    this.inputGroupG.set([this.colorRGB[1]]);
    this.inputGroupB.set([this.colorRGB[2]]);
    this.inputGroupHex.set([this.colorHEX]);
  };

  this.setColor(this.color);
  this.draw();
}

MColorPalettePicker.prototype = Object.create(PIXI.Container.prototype);
MColorPalettePicker.prototype.constructor = MColorPalettePicker;
Object.defineProperties(MColorPalettePicker.prototype, {
  width: {
    set: function set(value) {
      if (this._width === value) return;
      this._width = value;
      this.draw();
    },
    get: function get() {
      return this._width;
    }
  },
  height: {
    set: function set(value) {
      if (this._height === value) return;
      this._height = value;
      this.draw();
    },
    get: function get() {
      return this._height;
    }
  },
  otstup: {
    set: function set(value) {
      if (this._otstup === value) return;
      this._otstup = value;
      this.draw();
    },
    get: function get() {
      return this._otstup;
    }
  }
});

/***/ }),

/***/ "./pl102/src/plPlus/PLColorTHREE.js":
/*!******************************************!*\
  !*** ./pl102/src/plPlus/PLColorTHREE.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PLColorTHREE = PLColorTHREE;

function PLColorTHREE(cont, x, y, fun, title) {
  PLColor.call(this, cont, x, y, fun, title);
  this.type = 'PLColorTHREE';
  var self = this;
  this._value = new THREE.Color(); // this._value = {r: 1, g: 1, b: 1};

  this._width = 100;
  this._height = pl102.wh + this._otstup * 2;
  this.colPicActiv = false;

  this.pLColorPickerPanel.fun = function (_bool) {
    if (self._text == 'null') self.button.text = this.color;
    self.button.color = this.color;
    if (typeof self._color === 'string') self._color = this.color;else self._color = +this.color;
    self.updValue(self.corectForBtn(+this.color, true));
    if (self.fun) self.fun(); //if (_bool == undefined) self.setVisiblePanel(false); // При клике по градиенту сразу скрывалась
  };

  this.pLColorPickerPanel.pLInputRGB.useOne = true; // //перерисовка положений при изменении высоты ширины и цвета

  this.reposition = function () {
    this.button.height = this.btnH; // this.button.color = this._color;

    this.button.width = this._width - this._otstup * 2;
    this.button.height = this._height - this._otstup * 2;
    this.btnPanel.height = this._height;
    this.btnPanel.width = this._width;
    this.pLColorPickerPanel.y = this.btnPanel.height;
    this.pLColorPickerPanel.width = this._width;
    this.pLColorPickerPanel.height = this.colorPanelH;
  };

  this.updValue = function (_obj) {
    var r, g, b;
    r = _obj.r / 255;
    g = _obj.g / 255;
    b = _obj.b / 255;
    this._value.r = r;
    this._value.g = g;
    this._value.b = b;
  };
}

PLColorTHREE.prototype = Object.create(PLColor.prototype);
PLColorTHREE.prototype.constructor = PLColorTHREE;
Object.defineProperties(PLColorTHREE.prototype, {
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
  value: {
    set: function set(v) {
      this._value = v; // this._value.r = v.r;
      // this._value.g = v.g;
      // this._value.b = v.b;

      var r, g, b;
      r = Math.round(v.r * 255);
      g = Math.round(v.g * 255);
      b = Math.round(v.b * 255);
      this._color = '0x' + this.compToHex(r) + this.compToHex(g) + this.compToHex(b);
      if (this._text == 'null') this.button.text = this._color;
      this.button.color = this._color;
      this.pLColorPickerPanel.setColor(this._color);
    },
    get: function get() {
      return this._value;
    }
  },
  color: {
    set: function set(value) {
      if (this._color == value) return;
      this._color = this.convToCorColor(value);
      this.updValue(this.corectForBtn(value * 1, true));
      if (this._text == 'null') this.button.text = this.corectForBtn(this._color);
      this.button.color = this._color;
      this.pLColorPickerPanel.setColor(this._color);
    },
    get: function get() {
      return this._color;
    }
  }
});

/***/ }),

/***/ "./pl102/src/plPlus/PLColorUn.js":
/*!***************************************!*\
  !*** ./pl102/src/plPlus/PLColorUn.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PLColorUn = PLColorUn;

function PLColorUn(cont, x, y, fun, title) {
  PLColor.call(this, cont, x, y, fun, title);
  this.type = 'PLColorUn';
  var self = this;
  pl102.addElement(this);
  this._color = '0xffffff';
  this._boolBig = false;
  this._otstup = 2;
  this._visiblePanel = true;
  this.contentBig = new PIXI.Container();
  this.contentSm = new PIXI.Container();
  this.addChild(this.contentSm);
  this.addChild(this.contentBig);
  this.contentSm.visible = false;
  this.contentBig.visible = false;
  this.heightMax = 200;
  this.heightMin = 100;
  this.debugRect = false;
  this.pLColorPickerPanel.setParent(this.contentSm);
  this.btnPanel.setParent(this.contentSm);
  this.btnPanel1.setParent(this.contentSm);
  this.colorBig = new ColorBig(this.contentBig, 0, 0, function () {
    self._color = this.color;
    self._value = this.color;
    if (self.fun) self.fun();
  });
  pl102.removeElement(this.colorBig, true); // //перерисовка положений при изменении высоты ширины и цвета

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
      this.heightMin = this.btnPanel.height + this.btnPanel1.height;
    } else {
      this.pLColorPickerPanel.y = this.btnPanel.height;
      this.heightMin = this.btnPanel.height;
    }

    if (this._boolBig == true) {
      this.colorBig.width = this._width;
      this.colorBig.height = this._height;
    }

    this.pLColorPickerPanel.width = this._width;
    this.pLColorPickerPanel.height = this.colorPanelH;
    if (this.debugRect) this.drawDebugRect();
  };

  var debugGraph;

  this.drawDebugRect = function () {
    if (debugGraph == undefined) {
      debugGraph = new PIXI.Graphics();
      this.addChild(debugGraph);
    }

    debugGraph.clear();
    debugGraph.lineStyle(0.5, 0xff0000);
    debugGraph.drawRect(0, 0, this._width, this._height);
  };

  this.colorBig.otstup = this._otstup;
  this.colorBig.setColor(this._color);

  this.colorBig.funSelectColor = function (_color) {
    if (self.funSelectColor) self.funSelectColor(_color);
    if (self.funSelectColorBig) self.funSelectColorBig(_color);
  };

  this.changeToBig = function () {
    if (this.pLColorPickerPanel.activ === true) {
      this.pLColorPickerPanel.activ = false;
    }

    this.contentSm.visible = !this._boolBig;
    this.contentBig.visible = this._boolBig;
    this.colorBig.activ = this._boolBig;

    if (this._boolBig == true) {
      this._height = this.heightMax;
      this.colorBig.setSize(this._width, this._height);
      this.colorBig.setColor(this._color);
    } else {
      this._height = this.heightMin;
      if (this.boolPlus) this.pLColorPicker.setColor(this.color);
      if (this._text == 'null') this.button.text = this.color;
      this.button.color = this.color;
    }

    if (this.debugRect) this.drawDebugRect();
  };

  this.updateArrColorInBig = function (_arr) {
    this.clearColor();
    this.addColor(_arr);
  };

  this.addColor = function (_param) {
    if (!this._colPicActiv) this.colPicActiv = true;

    if (Array.isArray(_param)) {
      if (_param.length == 0) this.colPicActiv = false;
      this.colorBig.colorPicker.setArray(_param);
      this.pLColorPicker.setArray(_param);
      this.updateArrColor();
      return;
    }

    color = _param;

    if (_param == undefined || _param == null) {
      color = this.baseColor;
    }

    this.pLColorPicker.setColor(color);
    this.colorBig.colorPicker.setColor(color);
    this.updateArrColor();
  };

  this.clearColor = function () {
    if (this._colPicActiv) this.colPicActiv = false;
    this.colorBig.colorPicker.clearColor();
    this.pLColorPicker.clearColor();
  };

  this.clearColor();
  this.addColor(this.arrColor);
  this.changeToBig();
}

PLColorUn.prototype = Object.create(PLColor.prototype);
PLColorUn.prototype.constructor = PLColorUn;
Object.defineProperties(PLColorUn.prototype, {
  boolBig: {
    set: function set(value) {
      if (this._boolBig == value) return;
      this._boolBig = value;
      this.changeToBig();
    },
    get: function get() {
      return this._boolBig;
    }
  },
  width: {
    set: function set(value) {
      if (this._width == value) return;
      this._width = value;
      this.reposition();
      this._height = this.heightMin;
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

      if (this._boolBig) this.colorBig.setColor(this._color);
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

      if (this._boolBig) this.colorBig.setColor(this._color);
      this.pLColorPickerPanel.setColor(this._value);
      this.pLColorPicker.color = this._value;
      this.reposition();
    },
    get: function get() {
      return this._value;
    }
  },
  otstup: {
    set: function set(value) {
      if (this._otstup == value) return;
      this._otstup = value;
      this.button.x = this._otstup;
      this.button.y = this._otstup;
      this.pLColorPicker.x = this._otstup;
      this.colorBig.otstup = this._otstup;
      this.reposition();
    },
    get: function get() {
      return this._otstup;
    }
  },
  visiblePanel: {
    set: function set(value) {
      if (this._visiblePanel == value) return;
      this._visiblePanel = value;
      this.colorBig.panel.image.visible = this._visiblePanel;
      this.colorBig.panel.graphics.visible = this._visiblePanel;
      this.colorBig.panel1.image.visible = this._visiblePanel;
      this.colorBig.panel1.graphics.visible = this._visiblePanel;
      this.colorBig.panel1.graphLine.visible = this._visiblePanel;
      this.colorBig.panel2.graphics.visible = this._visiblePanel;
      this.btnPanel.graphics.visible = this._visiblePanel;
      this.btnPanel.image.visible = this._visiblePanel;
      this.btnPanel1.graphics.visible = this._visiblePanel;
      this.btnPanel1.image.visible = this._visiblePanel;
    },
    get: function get() {
      return this._visiblePanel;
    }
  },
  activMouse: {
    set: function set(value) {
      if (this._activMouse == value) return;
      this._activMouse = value; // this.changeActiv();

      if (this.colorBig == undefined) return;
      this.colorBig.activMouse = this._activMouse;
      if (this.pLColorPickerPanel.activ) this.colorPanelVisible(value);
    },
    get: function get() {
      return this._activMouse;
    }
  }
});

function ColorBig(_cont, _x, _y, _fun) {
  PIXI.Container.call(this);

  _cont.addChild(this);

  this.type = 'ColorBig';
  var self = this;
  pl102.addElement(this);
  this._activMouse = true;
  this.fun = _fun;
  this.funSelectColor;
  this.x = _x || 0;
  this.y = _y || 0;
  this._width = 100;
  this._height = 100;
  this._inpRGBH = 27;
  this._color = '0x000000';
  this.colorDrag = '0x000000';
  this.debugRect = false;
  this.trick = pl102.kontur;
  this._otstup = 5;
  this.color1 = '0x9d9d9d';
  this.color2 = '0xa9a9a9'; // контуры

  this.color3 = 0xffffff; // цвет панелей panel1 и panel2

  this.color4 = 0xffffff; // цвет кнопки добавления цвета

  this.fontSize = 14; // pl102.style.fontSize

  this.fontStyle = pl102.style.fontStyle;
  this.fontFamily = pl102.style.fontFamily;
  this.arrColor1 = [0x555555, 0xff4c4c, 0x4faf5c, 0x80bece, 0xf9ae34, 0xffffff];
  this.panel = new PLPanel(this, 0, 0);
  this.panel.image.visible = false;
  pl102.removeElement(this.panel, true);
  this.panel2 = new PLPanel(this.panel, this.trick, this.trick);
  this.panel2.kontur = false;
  this.panel2.color = this.color3;
  this.panel2.image.visible = false;
  pl102.removeElement(this.panel2, true);
  this.panel1 = new PLPanel(this.panel, this.trick, this.trick);
  this.panel1.kontur = false;
  this.panel1.visiLine = true;
  this.panel1.color = this.color3;
  pl102.removeElement(this.panel1, true);
  this.colorPick = new PLColorPick(this.panel1, 0, 0, function () {
    self.color = this.color;
    self.gradient.setColor(this.color.replace('0x', '#'), 'click');
    self.inputRGBBig.setColor(this.color.replace('0x', '#'));
    self.colorPanel.color = this.color;
    self.inputColor.value = this.color.replace('0x', '');
    self.offSelect();
    if (self.fun) self.fun();
  });

  this.colorPick.funDrag = function () {
    self.color = this.colorDrag;
    self.colorDrag = this.colorDrag;
    self.gradient.setColor(this.colorDrag.replace('0x', '#'));
    self.inputRGBBig.setColor(this.colorDrag.replace('0x', '#'));
    self.colorPanel.color = this.colorDrag;
    self.inputColor.value = this.colorDrag.replace('0x', '');
    if (self.funDrag) self.funDrag();
  };

  this.colorPick.funOut = function () {
    self.color = this.color;
    self.gradient.setColor(this.color.replace('0x', '#'));
    self.inputRGBBig.setColor(this.color.replace('0x', '#'));
    self.colorPanel.color = this.color;
    self.inputColor.value = this.color.replace('0x', '');
    if (self.funDrag) self.funDrag();
  };

  this.colorPick.konturColor = this.color2;
  pl102.removeElement(this.colorPick, true);
  this.gradient = new PLGradient(this.panel1, 0, 0, function () {
    self.color = this.color;
    self.colorPick.setColor(this.color.replace('0x', '#'), 'click');
    self.inputRGBBig.setColor(this.color.replace('0x', '#'));
    self.colorPanel.color = this.color;
    self.inputColor.value = this.color.replace('0x', '');
    self.offSelect();
    if (self.fun) self.fun();
  });
  this.gradient.drawCursor(4, 5);

  this.gradient.funDrag = function () {
    self.color = this.colorDrag;
    self.colorDrag = this.colorDrag;
    self.colorPick.setColor(this.colorDrag.replace('0x', '#'));
    self.inputRGBBig.setColor(this.colorDrag.replace('0x', '#'));
    self.colorPanel.color = this.colorDrag;
    self.inputColor.value = this.colorDrag.replace('0x', '');
    if (self.funDrag) self.funDrag();
  };

  this.gradient.funOut = function () {
    self.color = this.color;
    self.colorPick.setColor(this.color.replace('0x', '#'), 'out');
    self.inputRGBBig.setColor(this.color.replace('0x', '#'));
    self.colorPanel.color = this.color;
    self.inputColor.value = this.color.replace('0x', '');
    if (self.funDrag) self.funDrag();
  };

  this.gradient.konturColor = this.color2;
  pl102.removeElement(this.gradient, true);
  this.image = new PLImage(this.panel1, 0, 0);
  this.image.otstup = 4;
  this.image.link = 'resources/images/pikNew/col_pic.png';
  pl102.removeElement(this.image, true);
  this.colorPanel = new PLPanel(this.panel1, 0, 0);
  pl102.removeElement(this.colorPanel, true);
  this.inputRGBBig = new PLInputRGBBig(this.panel1, 0, 0, function () {
    self.color = self.setColorRGB(this.color);
    self.colorPick.setColor(self.color.replace('0x', '#'), 'click');
    self.colorPanel.color = self.color;
    self.inputColor.value = self.color.replace('0x', '');
    self.gradient.setColor(self.color.replace('0x', '#'));
    self.offSelect();
    if (self.fun) self.fun();
  });
  this.inputRGBBig.konturColor = this.color2;
  this.inputRGBBig.height = this._inpRGBH;
  this.inputRGBBig.fontSize = this.fontSize;
  pl102.removeElement(this.inputRGBBig, true);
  this.label = new PLLabel(this.panel1, 0, 0, '#');
  this.label.fontSize = this.fontSize - 2;
  pl102.removeElement(this.label, true);
  var fgCo = 0;
  this.inputColor = new PLInput(this.panel1, 0, 0, '', function () {
    fgCo = +('0x' + this.value);
    if (isNaN(fgCo)) fgCo = '0x000000';
    if (fgCo > 16777215 || fgCo < 0) self.color = '0x000000';else self.color = self.corectCol(fgCo).replace('#', '0x');
    self.colorPick.setColor(self.color.replace('0x', '#'), 'click');
    self.colorPanel.color = self.color;
    self.gradient.setColor(self.color.replace('0x', '#'));
    self.inputRGBBig.setColor(self.color.replace('0x', '#'));
    self.offSelect();
    if (self.fun) self.fun();
  });
  this.inputColor.borderColor = this.color2.replace('0x', '#');
  this.inputColor.input.htmlElement.style.font = this.fontStyle + ' ' + this.fontSize + 'px ' + this.fontFamily;
  pl102.removeElement(this.inputColor, true);
  this.colorPicker = new PLColorPicker(this.panel2, 0, 0, '', function () {
    // if (!this.contur.visible) this.contur.visible = true;
    self.color = this.color;
    self.setColor(this.color);
    if (self.fun) self.fun();
  });
  this.colorPicker.kolColor = 6;
  this.colorPicker.setArray(this.arrColor1);
  this.colorPicker.otstup = this._otstup;
  this.colorPicker.activContur = true;
  this.colorPicker.kolElRow = 6;
  pl102.removeElement(this.colorPicker, true);
  this.btnAdd = new PLButton(this.panel2, 0, 0, '', function () {
    if (self.funSelectColor) self.funSelectColor(self.color);
  });
  this.btnAdd.boolCenter = true;
  this.btnAdd.boolKontur = true;
  this.btnAdd.boolScalePic = true;
  this.btnAdd.konturSize = 1;
  this.btnAdd.konturColor = this.color2;
  this.btnAdd.color = this.color4;
  this.btnAdd.panel.image.alpha = 0.2;
  this.btnAdd.otstup = 1;
  this.btnAdd.loadImeg('resources/images/pikNew/69.png');
  pl102.removeElement(this.btnAdd, true);

  this.offSelect = function () {// this.colorPicker.contur.visible = false;
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
    if (typeof _val === 'string') return _val.replace('0x', '#');
    var obj = {};
    var r = Math.floor(_val / (256 * 256));
    var g = Math.floor(_val / 256) % 256;
    var b = _val % 256;
    return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }; // set decimal color, string or number


  this.setColor = function (_color) {
    var color = this.corectCol(_color);
    this.color = color.replace('#', '0x');
    this.gradient.setColor(color, 'click');
    this.inputRGBBig.setColor(color);
    this.colorPick.setColor(color, 'click');
    this.colorPanel.color = color.replace('#', '0x');
    this.inputColor.value = color.replace('#', '');
  };

  this.setColor(this.color);
  var procPW = 0.65; // ширина секции colorPick

  var procGW = 0.10; // ширина секции gradient

  this.draw = function () {
    // this.colorPicker.x = this._otstup;
    this.colorPicker.y = this._otstup;
    this.colorPicker.otstup = this._otstup;
    this.colorPicker.width = this._width * procPW - this._otstup;
    this.panel.width = this._width;
    this.panel.height = this._height;
    this.panel1.width = this._width - this.trick * 2;
    this.panel2.width = this._width - this.trick * 2;
    var hp2 = this.colorPicker.height + this._otstup * 2;
    var hp1 = this._height - hp2 - this.trick * 2;
    this.panel1.height = hp1 - this.trick;
    this.panel2.y = hp1 + this.trick;
    this.panel2.height = hp2;
    var wcp = this._width * procPW - this._otstup;
    var cph = hp1 - this._otstup * 3 - this.inputRGBBig.height;
    this.colorPick.x = this._otstup;
    this.colorPick.y = this._otstup;
    this.colorPick.width = wcp;
    this.colorPick.height = cph;
    this.inputRGBBig.x = this._otstup;
    this.inputRGBBig.y = cph + this._otstup * 2;
    this.inputRGBBig.width = this.colorPick.width;
    this.gradient.x = this._otstup + this._width * procPW;
    this.gradient.y = this._otstup;
    this.gradient.width = this._width * procGW - this._otstup;
    this.gradient.height = cph;
    this.gradient.drawCursor(this._otstup * 1.5, this._otstup * 1.5 + 1);
    var cpw = this._width - this.gradient.x - this.gradient.width - this._otstup * 2 - this.trick;
    var cpx = this.gradient.x + this.gradient.width + this._otstup;
    this.colorPanel.x = cpx;
    this.colorPanel.y = cph + this._otstup - this._inpRGBH;
    this.colorPanel.width = cpw;
    this.colorPanel.height = this._inpRGBH;
    this.image.x = cpx;
    this.image.y = cph - this._inpRGBH - cpw;
    this.image.width = cpw;
    this.image.height = cpw;
    this.inputColor.x = cpx;
    this.inputColor.y = cph + this._otstup * 2;
    this.inputColor.width = cpw;
    this.inputColor.height = this._inpRGBH;
    var r = this.label.getRect();
    this.label.x = cpx - 3 - r.width;
    this.label.y = cph + this._otstup * 2 + this._inpRGBH / 2 - r.height / 2;
    this.btnAdd.x = cpx;
    this.btnAdd.y = this._otstup;
    this.btnAdd.width = cpw - this.trick;
    this.btnAdd.height = this.colorPicker.height - this.trick;
    this.btnAdd.image.width = this.btnAdd.image.height = this.colorPicker.height - this.trick;
    if (this.debugRect) this.drawDebugRect();
  };

  var debugGraph;

  this.drawDebugRect = function () {
    if (debugGraph == undefined) {
      debugGraph = new PIXI.Graphics();
      this.addChild(debugGraph);
    }

    debugGraph.clear();
    debugGraph.lineStyle(0.5, 0xff0000);
    debugGraph.drawRect(0, 0, this._width, this._height);
  };

  this.setSize = function (_width, _height) {
    this._width = _width;
    this._height = _height;
    this.draw();
  };

  this.draw();
}

ColorBig.prototype = Object.create(PIXI.Container.prototype);
ColorBig.prototype.constructor = ColorBig;
Object.defineProperties(ColorBig.prototype, {
  color: {
    set: function set(value) {
      this._color = value;
      this.colorPicker.color = this._color;
    },
    get: function get() {
      return this._color;
    }
  },
  activ: {
    set: function set(value) {
      if (this._activ == value) return;
      this._activ = value;
      this.colorPick.activ = this._activ;
      this.gradient.activ = this._activ;
    },
    get: function get() {
      return this._activ;
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
  activMouse: {
    set: function set(value) {
      if (this._activMouse == value) return;
      this._activMouse = value;
      this.inputColor.activMouse = this._activMouse;
      this.inputRGBBig.activMouse = this._activMouse;
    },
    get: function get() {
      return this._activMouse;
    }
  }
});

function PLInputRGBBig(cont, x, y, fun) {
  PLInputRGB.call(this, cont, x, y, fun);
  this.type = 'PLInputRGBBig';
  var self = this;
  pl102.addElement(this);
  this.activMouse = true;
  this._otstup = 24;
  this.otstup1 = 2;
  this._konturColor = pl102.color1;
  this.panel.kontur = false;
  this.panel.visible = false;
  this.label.visible = false;
  this._fontSize = pl102.style.fontSize;
  this.fontStyle = pl102.style.fontStyle;
  this.fontFamily = pl102.style.fontFamily;
  this.label1 = new PLLabel(this, 0, 0, 'R');
  this.label1.fontSize = this._fontSize;
  pl102.removeElement(this.label, true);
  this.label2 = new PLLabel(this, 0, 0, 'G');
  this.label2.fontSize = this._fontSize;
  pl102.removeElement(this.label1, true);
  this.label3 = new PLLabel(this, 0, 0, 'B');
  pl102.removeElement(this.label2, true);
  this.label3.fontSize = this._fontSize; // для перерисовки элементов компонента

  var ws;

  this.reposition = function () {
    var r = this.label1.getRect();
    var g = this.label2.getRect();
    var b = this.label3.getRect();
    ws = (this._width - this._otstup * 2 - r.width - this.otstup1) / 3;
    this.label1.x = 0;
    this.inputR.x = r.width + this.otstup1;
    this.inputR.width = ws;
    this.inputR.height = this._height;
    this.label1.y = this._height / 2 - r.height / 2;
    this.inputG.x = this.inputR.x + ws + this._otstup;
    this.inputG.width = ws;
    this.inputG.height = this._height;
    this.label2.x = this.inputG.x - this.otstup1 - g.width;
    this.label2.y = this._height / 2 - g.height / 2;
    this.inputB.x = this.inputG.x + ws + this._otstup;
    this.inputB.width = ws;
    this.inputB.height = this._height;
    this.label3.x = this.inputB.x - this.otstup1 - b.width;
    this.label3.y = this._height / 2 - b.height / 2;
    this.panel.width = this._width;
    this.panel.height = this._height;
  };

  this.reposition();
}

PLInputRGBBig.prototype = Object.create(PLInputRGB.prototype);
PLInputRGBBig.prototype.constructor = PLInputRGBBig;
Object.defineProperties(PLInputRGBBig.prototype, {
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
  konturColor: {
    set: function set(value) {
      if (this._konturColor == value) return;
      this._konturColor = value;
      this.inputR.borderColor = this._konturColor.replace('0x', '#');
      this.inputG.borderColor = this._konturColor.replace('0x', '#');
      this.inputB.borderColor = this._konturColor.replace('0x', '#');
    },
    get: function get() {
      return this._konturColor;
    }
  },
  fontSize: {
    set: function set(value) {
      if (this._fontSize == value) return;
      this._fontSize = value;
      this.inputR.input.htmlElement.style.font = this.fontStyle + ' ' + this._fontSize + 'px ' + this.fontFamily;
      this.inputG.input.htmlElement.style.font = this.fontStyle + ' ' + this._fontSize + 'px ' + this.fontFamily;
      this.inputB.input.htmlElement.style.font = this.fontStyle + ' ' + this._fontSize + 'px ' + this.fontFamily;
      this.label1.fontSize = this._fontSize - 2;
      this.label2.fontSize = this._fontSize - 2;
      this.label3.fontSize = this._fontSize - 2;
    },
    get: function get() {
      return this._fontSize;
    }
  }
});

/***/ }),

/***/ "./pl102/src/plPlus/PLComboBoxImage2.js":
/*!**********************************************!*\
  !*** ./pl102/src/plPlus/PLComboBoxImage2.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PLComboBoxImage2 = PLComboBoxImage2;
exports.PLPachkaButton = PLPachkaButton;
exports.DebugPLCBI2 = DebugPLCBI2;
exports.PLSliderBigRad = PLSliderBigRad;
exports.PLPachkaButton2 = PLPachkaButton2;
exports.PLPachkaCheckBoxImage = PLPachkaCheckBoxImage;
exports.PLPachkaImgBut = PLPachkaImgBut;

function PLComboBoxImage2(cont, _x, _y, _link, _fun, _funD) {
  PIXI.Container.call(this);
  this.type = 'PLComboBoxImage2';
  this.typeCom = 'pixi';
  cont.addChild(this);
  var self = this;
  this.fun = _fun; // нажатие на внутренние кнопки

  this.funD = _funD; // нажатие на кнопку компонента

  this.funCompl;
  this._boolKontur = false; // показывать ли контур

  this._funActiv;
  this.stageDownBool = true;
  this._activ = false;
  this._wh = 64;
  this.array = [];
  this._height = this._wh;
  this._width = this._wh;
  this.x = _x || 0;
  this.y = _y || 0;
  this.button = new PLButton(this, 0, 0, '', function () {
    self.activ = !self.activ;
    if (self.funD) self.funD();
  });
  if (_link) this.button.loadImeg(_link);
  this.button.width = this._wh;
  this.button.height = this._wh;
  this.button.boolKontur = this._boolKontur;
  this.gPlus = this.button.gPlus; // Для дебаг отрисовки
  // debugPLCBI2 = new DebugPLCBI2(this, -300, 0);

  this.panel = new PLPanel(this, 0, this._height + 1); // основная панел

  this.panel.visible = this._activ;

  this.onDown = function () {
    self.index = this.idArr;
    this.activLink = !this.activLink;
    if (self.fun) self.fun();
  };

  var but;

  this.addComponent = function (l, l1) {
    but = new BanonMY(this.panel.content, 0, 0, '', this.onDown);
    but.idArr = this.array.length;
    but.width = this._width;
    but.height = this._height;

    but.funComplit = function () {
      this.load22();

      if (self.funCompl) {
        self.funCompl();
      }
    };

    but.addComponent(l, l1);
    this.array.push(but);
    this.reposition();
  };

  var hh;

  this.reposition = function () {
    this.button.height = this._height;
    this.button.width = this._width;

    if (this._height < this._width) {
      this.button.image.width = this.button.image.height = this._height;
    } else {
      this.button.image.width = this.button.image.height = this._width;
    }

    hh = 0;

    for (var i = 0; i < this.array.length; i++) {
      if (this.array[i].visible) {
        this.array[i].y = hh;
        hh += this._height;
        this.array[i].height = this._height;
        this.array[i].width = this._width;
        this.array[i].heightImg = this._height;
        this.array[i].widthImg = this._width;
      }
    }

    this.panel.y = this._height;
    this.panel.width = this._width;
    this.panel.height = hh;
  };

  this.setStile = function (num, _w, _h) {
    if (num == 1) {
      this.button.panel.nizAlpha = 0.25;
      this.button.panel.nizNum = 30;
      this.color = 0xf0f0f0;
    }

    for (var i = 0; i < this.array.length; i++) {
      this.array[i].setStile(num, _w, _h);
      this.array[i].setStile2(num, _w, _h);
    }

    if (_w) this.width = _w;
    if (_h) this.height = _h;
  };

  this.stageDown = function () {
    var p = self.toLocal(pl102.global);
    var intersect = self.contains(p.x, p.y);
    if (intersect == false) self.activ = false; // { setVisiblePanel(false) };
  }; // проверка кликаем в компоненте или нет


  var fullHeight;

  this.contains = function (x, y) {
    // todo проверить с масштабирование и поворотом
    fullHeight = self.button.height;
    if (self.activ) fullHeight += self.panel.height;
    return x >= 0 && x <= self.panel.width && y >= 0 && y <= fullHeight;
  };

  this.setButIndexActiv = function (_index, _indexActivLink) {
    this._index = _index;
    this.indexActivLink = _indexActivLink;
  };

  this.getButIndexActiv = function (_index) {
    this._index = _index;
    return this.indexActivLink;
  };

  this.setButVisi = function (_num, _visi) {
    this.array[_num].visible = _visi;
    this.reposition();
  };
}

PLComboBoxImage2.prototype = Object.create(PIXI.Container.prototype);
PLComboBoxImage2.prototype.constructor = PLComboBoxImage2;
Object.defineProperties(PLComboBoxImage2.prototype, {
  activ: {
    set: function set(value) {
      if (this._activ != value) {
        this._activ = value;
        this.button.activ = this._activ;
        this.panel.visible = this._activ;

        if (this.stageDownBool == true) {
          if (this._activ == true) {
            pl102.stage.on('mousedown', this.stageDown);
          } else {
            pl102.stage.off('mousedown', this.stageDown);
          }
        }
      }
    },
    get: function get() {
      return this._activ;
    }
  },
  funActiv: {
    set: function set(value) {
      if (this._funActiv == value) return;
      this._funActiv = value;
      this.button.funActiv = this._funActiv;
    },
    get: function get() {
      return this._activ;
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
  wh: {
    set: function set(value) {
      if (this._width == value) return;
      this._wh = value;
      this._width = value;
      this._height = value;
      this.reposition();
    },
    get: function get() {
      return this._wh;
    }
  },
  index: {
    set: function set(value) {
      this._index = value;
    },
    get: function get() {
      return this._index;
    }
  },
  indexActivLink: {
    set: function set(value) {
      this.array[this._index].activLink = value;
    },
    get: function get() {
      return this.array[this._index].activLink;
    }
  },
  color: {
    set: function set(value) {
      if (this._color == value) return;
      this._color = value;
      this.button.color = this._color;

      for (var i = 0; i < this.array.length; i++) {
        this.array[i].color = value;
      }
    },
    get: function get() {
      return this._color;
    }
  },
  boolKontur: {
    set: function set(value) {
      this._boolKontur = value;
      this.button.boolKontur = this._boolKontur;
    },
    get: function get() {
      return this._boolKontur;
    }
  }
});

function PLPachkaButton(cont, _x, _y, _fun) {
  PIXI.Container.call(this);
  this.type = 'PLPachkaButton';
  this.typeCom = 'pixi';
  cont.addChild(this);
  var self = this;
  this.fun = _fun;
  this.content = new PIXI.Container();
  this.addChild(this.content);
  this._activ = false;
  this._height = this._wh;
  this._width = this._wh;
  this._wh = 64;
  this._otstup = 2;
  this.x = _x || 0;
  this.y = _y || 0;
  this.array = []; // debugPLCBI2 = new DebugPLCBI2(this, -300, 0);

  this.onDown = function () {
    self.index = this.idArr;
    if (self.fun) self.fun();
  };

  var but;

  this.addComponent = function (l, l1) {
    but = new BanonMY(this.content, 0, 0, '', this.onDown);
    but.idArr = this.array.length;
    but.width = this._wh;
    but.height = this._wh;

    but.funComplit = function () {
      this.load22();
    };

    but.addComponent(l, l1);
    this.array.push(but);
    this.reposition();
  };

  this.reposition = function () {
    for (var i = 0; i < this.array.length; i++) {
      this.array[i].x = (this._wh + this._otstup) * i;
      this.array[i].height = this._wh;
      this.array[i].width = this._wh;
      this.array[i].heightImg = this._height;
      this.array[i].widthImg = this._width;
    }
  };

  this.setStile = function (num, _w, _h) {
    if (num == 1) {
      this.color = 0xf0f0f0;
    }

    for (var i = 0; i < this.array.length; i++) {
      this.array[i].setStile(num, _w, _h);
      this.array[i].setStile2(num, _w, _h);
    }

    if (_w) this.width = _w;
    if (_h) this.height = _h;
  };

  this.activ = true;
}

PLPachkaButton.prototype = Object.create(PIXI.Container.prototype);
PLPachkaButton.prototype.constructor = PLPachkaButton;
Object.defineProperties(PLPachkaButton.prototype, {
  activ: {
    set: function set(value) {
      if (this._activ != value) {
        this._activ = value;
      }
    },
    get: function get() {
      return this._activ;
    }
  },
  height: {
    set: function set(value) {
      if (this._height == value) return;
      this._height = value;
      this._width = value;
      this._wh = value;
      this.reposition();
    },
    get: function get() {
      return this._height;
    }
  },
  width: {
    set: function set(value) {
      if (this._width == value) return;
      this._width = value;
      this.wh = (this._width - (this.array.length - 1) * this._otstup) / this.array.length;
      this._height = this._wh;
    },
    get: function get() {
      return this._width;
    }
  },
  wh: {
    set: function set(value) {
      if (this._width == value) return;
      this._wh = value;
      this.reposition();
    },
    get: function get() {
      return this._wh;
    }
  },
  index: {
    set: function set(value) {
      if (this._index != value) {
        this._index = value;

        for (var i = 0; i < this.array.length; i++) {
          if (i == this._index) {
            this.array[i].activLink = true;
          } else {
            this.array[i].activLink = false;
          }
        }
      }
    },
    get: function get() {
      return this._index;
    }
  },
  value: {
    set: function set(v) {
      if (this._index != v) {
        this.index = v;
      }
    },
    get: function get() {
      return this._index;
    }
  },
  indexActivLink: {
    set: function set(value) {
      this.array[this._index].activLink = value;
    },
    get: function get() {
      return this.array[this._index].activLink;
    }
  },
  color: {
    set: function set(value) {
      if (this._color == value) return;
      this._color = value;

      for (var i = 0; i < this.array.length; i++) {
        this.array[i].color = value;
      }
    },
    get: function get() {
      return this._color;
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
  }
});

function BanonMY(cont, _x, _y, _text, fun) {
  PLButton.call(this, cont, _x, _y, _text, fun);
  this.type = 'BanonMY';
  this.typeCom = 'pixi';
  this.image2;
  this._activLink = false;
  var self = this;

  this.addComponent = function (l, l1) {
    this.loadImeg(l);

    if (l1 != undefined) {
      this.image2 = new PLImage(this.contentFilt, 0, 0, l1, function () {
        this.width = self.image.width;
        this.height = self.image.width;
      });
    }
  };

  this.load22 = function () {
    if (this.image2 != undefined) {
      this.image2.x = this.image.x;
      this.image2.y = this.image.y;
      this.image2.width = this.image.width;
      this.image2.height = this.image.height;
      this.activLink = true;
    }
  };

  this.setStile2 = function (num, _w, _h) {
    if (num == 1) {
      this.panel.nizAlpha = 0.25;
      this.panel.nizNum = 30; // this.color=0xf0f0f0;
    }

    if (this.image2) {
      /*
      	if(self._height<self._width)this.image2.width= this.image2.height=self._height;
      	else this.image2.width = this.image2.height=self._width;
      */
      this.image2.width = _w; // width;

      this.image2.height = _h;
    }

    if (_w) this.width = _w;
    if (_h) this.height = _h;
  };
}

BanonMY.prototype = Object.create(PLButton.prototype);
BanonMY.prototype.constructor = BanonMY;
Object.defineProperties(BanonMY.prototype, {
  activLink: {
    set: function set(value) {
      if (this._activLink != value) {
        this._activLink = value;

        if (this.image2) {
          this.image.visible = value;
          this.image2.visible = !value;
        }
      }
    },
    get: function get() {
      return this._activLink;
    }
  },
  heightImg: {
    set: function set(value) {
      if (this.image.height == value) return;

      if (this._height < this._width) {
        this.image.width = this.image.height = this._height;
      } else {
        this.image.width = this.image.height = this._width;
      }

      if (this.image2) {
        this.image2.width = this.image2.height = this.image.height;
      }
    },
    get: function get() {
      return this._height;
    }
  },
  widthImg: {
    set: function set(value) {
      if (this.image.width == value) return;

      if (this._height < this._width) {
        this.image.width = this.image.height = this._height;
      } else {
        this.image.width = this.image.height = this._width;
      }

      if (this.image2) {
        this.image2.width = this.image2.height = this.image.height;
      }
    },
    get: function get() {
      return this._width;
    }
  }
});

function DebugPLCBI2(cont, _x, _y) {
  PIXI.Container.call(this);
  this.type = 'PLPanel';
  var self = this;
  cont.addChild(this);
  pl102.addElement(this);
  this.x = _x || 0;
  this.y = _y || 0;
  this._width = 100;
  this._height = 100;

  this.init = function () {
    this.w = new PLWindow(this, 0, 0, 'DebugPLCBI2');
    this.w.width = 200;
    this.w.height = 200;
    this.s1 = new PLSliderBig(this.w.content, 0, 0, 'height', function () {
      cont.height = this.value;
      self.s2.value = cont.width;
      self.s3.value = cont.height;
    }, 20, 200);
    this.s1.width = this.w.width - 10;
    this.s1.value = cont.wh;
    this.s2 = new PLSliderBig(this.w.content, 0, 50, 'width', function () {
      cont.width = this.value;
      self.s1.value = cont.height;
      self.s3.value = cont.wh;
    }, 20, 200);
    this.s2.width = this.w.width - 10;
    this.s2.value = cont.width;
    this.s3 = new PLSliderBig(this.w.content, 0, 100, 'wh', function () {
      cont.wh = this.value;
      self.s1.value = cont.height;
      self.s1.value = cont.width;
    }, 20, 200);
    this.s3.width = this.w.width - 10;
    this.s3.value = cont.wh;
    this.but = new PLButton(this.w.content, 5, 165, 'setStile', function () {
      cont.setStile(1, 100, 100);
    });
    this.but.width = this.w.width - 10;
  };

  this.init();
}

DebugPLCBI2.prototype = Object.create(PLButton.prototype);
DebugPLCBI2.prototype.constructor = DebugPLCBI2;

function PLSliderBigRad(cont, _x, _y, title, fun) {
  PIXI.Container.call(this);
  this.type = 'PLSliderBigRad';
  cont.addChild(this);
  var self = this;
  this.fun = fun;
  this.x = _x;
  this.y = _y;
  this._width = 100;
  this._height = pl102.wh + 18;
  this._value = 0;
  this._title = title || '----';
  this._activMouse = true;
  this._colorText = pl102.color1;
  this.content = new PIXI.Container();
  this.addChild(this.content);
  this.slider = new PLSliderBig(this.content, 0, 0, this._title, function () {
    self._value = this.value * Math.PI / 180;
    if (self.fun) self.fun();
  }, 0, 360);
  this.slider.slid.contPrilip.visible = false;

  this.setText = function (_test) {
    this.slider.setText(_test);
  };

  this.funUp;

  this.slider.funUp = function () {
    if (self.funUp != undefined) self.funUp();
  }; // Vova, починка скетча, вращение


  this.slider.addPrilip(0, 10
  /*45*/
  );
  this.slider.addPrilip(90, 10
  /*45*/
  );
  this.slider.addPrilip(180, 10
  /*45*/
  );
  this.slider.addPrilip(270, 10
  /*45*/
  );
  this.slider.addPrilip(360, 10
  /*45*/
  );
  this.numPi = 2;

  this.gradInFrame = function (_v) {
    var v = _v;
    var num = ~~(v / Math.PI);

    if (v <= 0) {
      var z = num * -1;

      if (z % 2 == 0) {
        z += 2;
      } else {
        z += 1;
      }

      v = Math.PI * z + v;
    }

    if (v >= Math.PI * 2) {
      if (num % 2 == 0) {
        this.numPi = num;
      } else {
        if (num < this.numPi) {
          this.numPi = num - 1;
        }
      }

      v = v - Math.PI * this.numPi;
    }

    return v;
  };

  Object.defineProperty(this, 'okrug', {
    set: function set(value) {
      if (this._okrug != value) {
        this._okrug = value;
        this.slider.okrug = this._okrug;
      }
    },
    get: function get() {
      return this._okrug;
    }
  });
  Object.defineProperty(this, 'min', {
    set: function set(value) {
      if (this._min != value) {
        this._min = value;
        this.slider.min = this._min;
      }
    },
    get: function get() {
      return this._min;
    }
  });
  Object.defineProperty(this, 'max', {
    set: function set(value) {
      if (this._max != value) {
        this._max = value;
        this.slider.max = this._max;
      }
    },
    get: function get() {
      return this._max;
    }
  });
  Object.defineProperty(this, 'title', {
    set: function set(value) {
      if (this._title != value) {
        this._title = value;
        this.slider.title = this._title;
      }
    },
    get: function get() {
      return this._title;
    }
  });
  Object.defineProperty(this, 'width', {
    set: function set(value) {
      this._width = value;
      this.slider.width = this._width;
    },
    get: function get() {
      return this._width;
    }
  });
  Object.defineProperty(this, 'height', {
    get: function get() {
      return this.slider.height;
    }
  });
  Object.defineProperty(this, 'value', {
    set: function set(v) {
      if (this._value != v) {
        v = this.gradInFrame(v);
        this._value = v;
        this.slider.value = v * 180 / Math.PI;

        if (this.slider.value == 360) {
          this.slider.value = 0;
        }

        this._value = this.slider.value * Math.PI / 180;
      }
    },
    get: function get() {
      return this._value;
    }
  });
  Object.defineProperty(this, 'activMouse', {
    set: function set(value) {
      if (this._activMouse == value) return;
      this._activMouse = value;
      this.slider.activMouse = this._activMouse;
    },
    get: function get() {
      return this._activMouse;
    }
  });
  Object.defineProperty(this, 'colorText', {
    set: function set(value) {
      if (this._colorText == value) return;
      this._colorText = value;
      this.slider.colorText = this._colorText;
    },
    get: function get() {
      return this._colorText;
    }
  });
}

PLSliderBigRad.prototype = Object.create(PIXI.Container.prototype);
PLSliderBigRad.prototype.constructor = PLSliderBigRad;

function PLPachkaButton2(cont, _x, _y, _fun) {
  PIXI.Container.call(this);
  cont.addChild(this);
  this.type = 'PLPachkaButton2';
  this.typeCom = 'pixi';
  var self = this;
  this.fun = _fun;
  this._activ = false;
  this._wh = 64;
  this._height = this._wh;
  this._width = this._wh;
  this._title = [];
  this._index = 0;
  this._value = this._index;
  this.activBtnState = []; // массив активностей кнопок, boolean

  this._otstup = 1; // отступ между кнопками

  this.otstupImg = 3; // отступ картинки в кнопках

  this.valueBtn = false;
  this.array = [];
  this.notUp = []; // массив кнопок на которые не будет срабатывать up

  this.x = _x || 0;
  this.y = _y || 0; // debugPLCBI2 = new DebugPLCBI2(this, -300, 0);

  this.content = new PIXI.Container();
  this.addChild(this.content);
  var check = false;

  this.onDown = function (_val) {
    check = self.checkNotUp(this.idArr);

    if (check) {
      this.activ = !this.activ;
    } else {
      if (!_val) this.activ = true;
    }

    self.index = this.idArr;
    self.valueBtn = this.value;
    setTimeout(function () {
      self.updateBtnState();
      if (self.fun) self.fun();
    }, 100);
  };

  this.updateBtnState = function () {
    for (var i = 0; i < this.array.length; i++) {
      if (this.checkNotUp(i) === true) this.activBtnState[i] = this.array[i].activ;else this.activBtnState[i] = false;
    }
  };

  this.onUp = function () {
    self.activNot();
  };

  this.activNot = function () {
    if (check === true) return;
    this.array[this.index].activ = false;
  };

  this.checkNotUp = function (_index) {
    for (var i = 0; i < this.notUp.length; i++) {
      if (this.notUp[i] == _index) return true;
    }

    return false;
  };

  this.contentPanel = new PIXI.Container();
  this.content.addChild(this.contentPanel);
  this.arrPanel = [];

  this.getPanel = function () {
    for (var i = 0; i < this.arrPanel.length; i++) {
      if (!this.arrPanel[i].visible) {
        this.arrPanel[i].visible = true;
        return this.arrPanel[i];
      }
    }

    this.arrPanel[i] = new PLButton(this.contentPanel, 0, 0, '');
    this.arrPanel[i].graphInter.interactive = false;
    this.arrPanel[i].graphInter.buttonMode = false;
    return this.arrPanel[i];
  };

  this.clearPanel = function () {
    for (var i = 0; i < this.arrPanel.length; i++) {
      this.arrPanel[i].visible = false;
    }
  };

  var but;

  this.addComponent = function (l) {
    if (Array.isArray(l) == true) {
      but = new PLCheckBoxImage(this.content, 0, 0, l[0], l[1], '');
      but.idArr = this.array.length;
      but.but.panel.image.visible = true;
      but.but1.panel.image.visible = true;
      but.width = this._wh;
      but.height = this._wh;
      but.fun = this.onDown;
    } else {
      but = new PLButton(this.content, 0, 0, '');
      but.idArr = this.array.length;
      but.width = this._wh;
      but.height = this._wh;
      but.otstup = this.otstupImg; // but.boolScalePic = true;

      but.loadImeg(l);
      but.funUp = this.onUp;
      but.fun = this.onDown;
      but.funDownFile = this.onDown;
    }

    this.activBtnState.push(but.activ);
    this.array.push(but);
    this.reposition();
  };

  var ii = 0;

  this.reposition = function () {
    for (var i = this.array.length - 1; i >= 0; i--) {
      this.array[i].x = this._wh * i + this._otstup * (i + 1);
      this.array[i].height = this._wh;
      this.array[i].width = this._wh;
    }

    this.fillPanel();
  };

  this.setStile = function (num, _w, _h) {
    if (_w) this.width = _w;
    if (_h) this.height = _h;
  };

  this.fillPanel = function () {
    // заполняем панелью там где tittle[i] = 0
    //
    this.clearPanel(); // убираем панели

    var arrInd = [];

    for (var i = 0; i < this._title.length; i++) {
      var parn = arrInd.length % 2 == 0;

      if (this._title[i] == 0 && parn) {
        arrInd.push(i);
      } else if (this._title[i] != 0 && !parn) {
        arrInd.push(i);
      }
    }

    if (arrInd.length % 2 != 0) {
      arrInd.push(i);
    }

    var countPanel = arrInd.length / 2; // количество панелей

    var index = 0;

    for (var i = 0; i < countPanel; i++) {
      var panel = this.getPanel();
      var x = this._wh * arrInd[index] + this._otstup * (arrInd[index] + 1);
      var x1 = this._wh * arrInd[index + 1] + this._otstup * arrInd[index + 1];
      panel.x = x;
      panel.width = x1 - x;
      panel.height = this._height;
      index += 2;
    }
  };

  this.activ = true;
}

PLPachkaButton2.prototype = Object.create(PIXI.Container.prototype);
PLPachkaButton2.prototype.constructor = PLPachkaButton2;
Object.defineProperties(PLPachkaButton2.prototype, {
  title: {
    set: function set(value) {
      this._title = value;

      if (this._title.length != undefined) {
        if (this._title.length == this.array.length) {
          for (var i = 0; i < this.array.length; i++) {
            this.array[i].visible = this._title[i] != 0; // елемент видимый если i не равет 0

            if (this.array[i].visible) {
              this.array[i].activMouse = this._title[i] == 1;
            }
          }
        }
      }

      this.reposition();
    },
    get: function get() {
      return this._title;
    }
  },
  activ: {
    set: function set(value) {
      if (this._activ != value) {
        this._activ = value;
      }
    },
    get: function get() {
      return this._activ;
    }
  },
  height: {
    set: function set(value) {
      if (this._height == value) return;
      this._height = value;
      this._width = value;
      this._wh = value;
      this.reposition();
    },
    get: function get() {
      return this._height;
    }
  },
  width: {
    set: function set(value) {
      if (this._width == value) return;
      this._width = value;
      this.wh = (this._width - (this.array.length - 1) * this._otstup) / this.array.length;
      this._height = this._wh;
      this.reposition();
    },
    get: function get() {
      return this._width;
    }
  },
  wh: {
    set: function set(value) {
      if (this._width == value) return;
      this._wh = value;
      this.reposition();
    },
    get: function get() {
      return this._wh;
    }
  },
  index: {
    set: function set(value) {
      if (this._index != value) {
        this._index = value;

        for (var i = 0; i < this.array.length; i++) {
          if (i == this._index) {
            this.array[i].activLink = true;
          } else {
            this.array[i].activLink = false;
          }
        }
      }
    },
    get: function get() {
      return this._index;
    }
  },
  value: {
    set: function set(v) {
      if (this._index != v) {
        this.index = v;
      }
    },
    get: function get() {
      return this._index;
    }
  },
  indexActivLink: {
    set: function set(value) {
      this.array[this._index].activLink = value;
    },
    get: function get() {
      return this.array[this._index].activLink;
    }
  },
  color: {
    set: function set(value) {
      if (this._color == value) return;
      this._color = value;

      for (var i = 0; i < this.array.length; i++) {
        this.array[i].color = value;
      }
    },
    get: function get() {
      return this._color;
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
  }
});

function PLPachkaCheckBoxImage(cont, _x, _y, _fun) {
  PIXI.Container.call(this);
  cont.addChild(this);
  this.type = 'PLPachkaCheckBoxImage';
  this.typeCom = 'pixi';
  var self = this;
  this.fun = _fun;
  this.x = _x || 0;
  this.y = _y || 0;
  this._activ = false;
  this._wh = 64;
  this._height = this._wh;
  this._width = this._wh;
  this._index = -1;
  this._value = -1;
  this._arrayActiv = []; // массив активности компонентов

  this._activContur = false;
  this._otstup = 2;
  this._link = 'null';
  this._link1 = 'null';
  this._activMouse = true;
  this._isIlumActiv = false; // подсвечивание активности кнопки

  this.contTrick = -2;
  this.typeDown = 0; // 0-вкл\выкл каждая кнопка, 1-вкл одна кнопка остальные выкл

  this.color1 = 0x6d6e70;
  this.object = 'null';
  this.arrayBtn = []; // кноки

  this.array = []; // картинки для кнопок

  this._poved = 0;
  this.content = new PIXI.Container();
  this.addChild(this.content);
  this.contur = new PLContur(this, 0, 0);
  this.contur.visible = false;
  this.contur.color = this.color1;
  this.contur.thickness = this.contTrick;
  if (this._activContur) this.contur.visible = true;

  this.onDown = function () {
    if (this.object) self.object = this.object;
    self._value = this.idArr;
    if (self.typeDown == 0) self._index = this.idArr;

    if (self.typeDown == 1) {
      self.index = this.idArr;
      if (self.index == this.idArr) this.value = true;
    } // if (self.typeDown == 0) {
    //     self._value = this.value;
    //     self._index = this.idArr;
    // }
    // if (self.typeDown == 1) {
    //     self._value = true;
    //     self.index = this.idArr;
    //     if (self.index == this.idArr) this.value = true;
    // }


    if (self._poved == 1) {
      for (var i = 0; i < self.arrayBtn.length; i++) {
        if (i == self._index) {
          self.arrayBtn[i].activ = true;
        } else {
          self.arrayBtn[i].activ = false;
        }
      }
    }

    self.contur.x = self.arrayBtn[this.idArr].x;
    self.contur.y = self.arrayBtn[this.idArr].y;
    self._arrayActiv[this.idArr] = this.value;
    if (self.fun) self.fun();
  };

  this.setArr = function (_arr) {
    this.array = _arr;

    for (var i = 0; i < this.array.length; i += 2) {
      this.addComponent(this.array[i], this.array[i + 1]);
    }
  };

  this.setWH = function (_wB, _hB) {
    for (var i = 0; i < this.arrayBtn.length; i++) {
      this.arrayBtn[i].x = 0;
      this.arrayBtn[i].width = _wB;
      this.arrayBtn[i].height = _hB;
      this.arrayBtn[i].x = (_wB + this._otstup) * i;
    }

    this.contur.width = _wB;
    this.contur.height = _hB;
    this._height = _hB;
  };

  var but;

  this.addComponent = function (_link, _link1) {
    but = new PLCheckBoxImage(this.content, 0, 0, _link, _link1, this.onDown);
    but.kontur = true;
    but.isIlumActiv = this._isIlumActiv;
    but.setStile(1, this._wh, this._wh);
    but.idArr = this.arrayBtn.length;
    but.width = this._wh;
    but.height = this._wh;

    this._arrayActiv.push(but.value);

    this.arrayBtn.push(but);
    this.reposition();
  };

  this.reposition = function () {
    if (this.arrayBtn.length == 0) this._wh = this._width;else this._wh = (this._width - (this.arrayBtn.length - 1) * this._otstup) / this.arrayBtn.length;

    for (var i = 0; i < this.arrayBtn.length; i++) {
      this.arrayBtn[i].x = (this._wh + this._otstup) * i;
      this.arrayBtn[i].height = this._wh;
      this.arrayBtn[i].width = this._wh;
    }

    this.contur.width = this._wh;
    this.contur.height = this._wh;
    this._height = this._wh;
  };

  this.setIcons = function (_l, _l1) {
    this.link = _l;
    this.link1 = _l1;
  };

  this.clear = function () {};

  this.setStile = function () {};

  this.setActivMouse = function (id, value) {
    this.arrayBtn[id].activMouse = value;
  };
}

PLPachkaCheckBoxImage.prototype = Object.create(PIXI.Container.prototype);
PLPachkaCheckBoxImage.prototype.constructor = PLPachkaCheckBoxImage;
Object.defineProperties(PLPachkaCheckBoxImage.prototype, {
  height: {
    set: function set(value) {
      if (this._height == value) return;
      this._height = value;
    },
    get: function get() {
      return this._height;
    }
  },
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
  wh: {
    set: function set(value) {
      if (this._width == value) return;
      this._wh = value;
      this.reposition();
    },
    get: function get() {
      return this._wh;
    }
  },
  index: {
    set: function set(value) {
      if (this._index != value) {
        this._index = value;

        for (var i = 0; i < this.arrayBtn.length; i++) {
          if (i == this._index) {
            this.contur.x = this.arrayBtn[i].x;
            this.contur.y = this.arrayBtn[i].y;
            this.arrayBtn[i].value = true;
          } else {
            this.arrayBtn[i].value = false;
          }
        }

        if (this._poved == 1) {
          for (var i = 0; i < this.arrayBtn.length; i++) {
            if (i == this._index) {
              this.arrayBtn[i].activ = true;
            } else {
              this.arrayBtn[i].activ = false;
            }
          }
        }
      }
    },
    get: function get() {
      return this._index;
    }
  },
  value: {
    set: function set(v) {
      if (this._value == v) return;
      this._value = v;
    },
    get: function get() {
      return this._value;
    }
  },
  arrayActiv: {
    set: function set(value) {
      if (!Array.isArray(value)) return;

      for (var i = 0; i < value.length; i++) {
        this._arrayActiv[i] = value[i];
        this.arrayBtn[i].value = value[i];
      }
    },
    get: function get() {
      return this._arrayActiv;
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
  link: {
    set: function set(value) {
      this._link = value;
      this.arrayBtn[this._index].link = value;
    },
    get: function get() {
      return this._link;
    }
  },
  link1: {
    set: function set(value) {
      this._link1 = value;
      this.arrayBtn[this._index].link1 = value;
    },
    get: function get() {
      return this._link1;
    }
  },
  activMouse: {
    set: function set(value) {
      if (this._activMouse == value) return;
      this._activMouse = value;

      for (var i = 0; i < this.arrayBtn.length; i++) {
        this.arrayBtn[i].activMouse = this._activMouse;
      }

      if (!this._activMouse) this.activContur = false;
    },
    get: function get() {
      return this._activMouse;
    }
  },
  poved: {
    set: function set(value) {
      if (this._poved == value) return;
      this._poved = value;
      if (this.arrayBtn.length == 0) return; // var w=this.arrayBtn[i].width;
      // var h=this.arrayBtn[i].height;

      if (this._poved == 0) {
        this.contur.visible = true;

        for (var i = 0; i < this.arrayBtn.length; i++) {
          this.arrayBtn[i].setStile(1, this.arrayBtn[i].width, this.arrayBtn[i].height);
        }
      }

      if (this._poved == 1) {
        this.contur.visible = false;

        for (var i = 0; i < this.arrayBtn.length; i++) {
          this.arrayBtn[i].setStile(0, this.arrayBtn[i].width, this.arrayBtn[i].height);
        }
      }
    },
    get: function get() {
      return this._poved;
    }
  },
  isIlumActiv: {
    set: function set(value) {
      if (this._isIlumActiv == value) return;
      this._isIlumActiv = value;

      for (var i = 0; i < this.arrayBtn.length; i++) {
        this.arrayBtn[i].isIlumActiv = this._isIlumActiv;
      }
    },
    get: function get() {
      return this._isIlumActiv;
    }
  }
});

function PLPachkaImgBut(cont, _x, _y, _fun) {
  PIXI.Container.call(this);
  cont.addChild(this);
  this.type = 'PLPachkaImgBut';
  this.typeCom = 'pixi';
  var self = this;
  this.fun = _fun;
  this.x = _x || 0;
  this.y = _y || 0;
  this._activ = false;
  this._wh = 64;
  this._height = this._wh;
  this._width = this._wh;
  this._index = -1;
  this._value = -1;
  this._arrayActiv = []; // массив активности компонентов

  this._otstup = 2;
  this._link = 'null';
  this._link1 = 'null';
  this._activMouse = true;
  this.contTrick = -2;
  this.typeDown = 0; // 0-вкл\выкл каждая кнопка, 1-вкл одна кнопка остальные выкл

  this.color1 = 0x6d6e70;
  this.arrayBtnImg = []; // кнопки-картинки

  this.arrayButton = []; // кнопки

  this.array = []; // картинки для кнопок

  this.content = new PIXI.Container();
  this.addChild(this.content);

  for (var i = 0; i < this.arrayBtnImg.length; i++) {
    this.arrayBtnImg[i].setStile(0, this.arrayBtnImg[i].width, this.arrayBtnImg[i].height);
    this.arrayButton[i].setStile(0, this.arrayButton[i].width, this.arrayButton[i].height);
  }

  this.onDown = function () {
    self._value = this.idArr;
    self.index = this.idArr;

    for (var i = 0; i < self.arrayButton.length; i++) {
      self.arrayButton[i].activ = i === self._index;
      self.arrayBtnImg[i].activ = false;
    }

    self._arrayActiv[this.idArr] = this.value;
    if (self.fun) self.fun();
  };

  this.setArr = function (_arr) {
    this.array = _arr;

    for (var i = 0; i < this.array.length; i += 2) {
      this.addComponent(this.array[i], this.array[i + 1]);
    }
  };

  this.setWH = function (_wB, _hB) {
    for (var i = 0; i < this.arrayBtnImg.length; i++) {
      this.arrayBtnImg[i].x = 0;
      this.arrayBtnImg[i].width = _wB;
      this.arrayBtnImg[i].height = _hB;
      this.arrayBtnImg[i].x = (_wB + this._otstup) * i;
      this.arrayButton[i].x = (_wB + this._otstup) * i;
      this.arrayButton[i].y = this.arrayBtnImg[i].height;
      this.arrayButton[i].width = _wB;
    }

    this._height = _hB;
  };

  var butImg;
  var button;
  this.arrayButton = [];

  this.addComponent = function (_link, _text) {
    butImg = new PLButton(this.content, 0, 0, '', this.onDown, _link);
    butImg.setStile(1, this._wh, this._wh);
    butImg.idArr = this.arrayBtnImg.length;
    butImg.boolKontur = true;
    butImg.funOut = funOut;
    butImg.funOver = funOver;
    button = new PLButton(this.content, 0, 0, _text, this.onDown);
    button.idArr = this.arrayBtnImg.length;
    button.funOut = funOut;
    button.funOver = funOver;

    this._arrayActiv.push(butImg.value);

    this.arrayBtnImg.push(butImg);
    this.arrayButton.push(button);
    this.reposition();
  };

  this.reposition = function () {
    if (this.arrayBtnImg.length == 0) this._wh = this._width;else this._wh = (this._width - (this.arrayBtnImg.length - 1) * this._otstup) / this.arrayBtnImg.length;

    for (var i = 0; i < this.arrayBtnImg.length; i++) {
      this.arrayBtnImg[i].x = (this._wh + this._otstup) * i;
      this.arrayBtnImg[i].height = this._wh;
      this.arrayBtnImg[i].width = this._wh;
      this.arrayButton[i].x = this.arrayBtnImg[i].x;
      this.arrayButton[i].y = this._wh;
      this.arrayButton[i].width = this._wh;
    }

    this._height = this._wh;

    if (this.arrayButton.length != 0) {
      this._height += this.arrayButton[0].height;
    }
  };

  this.clear = function () {};

  this.setStile = function () {}; // для выполняния Аут/овер на двух связанных компонентах


  var doEvent = true;
  var doEvent1 = true;

  function funOut(e) {
    if (doEvent === false) return;
    doEvent = false;
    if (this.image === undefined) self.arrayBtnImg[this.idArr].mouseOut(e);else self.arrayButton[this.idArr].mouseOut(e);
    doEvent = true;
  }

  function funOver(e) {
    if (doEvent1 === false) return;
    doEvent1 = false;
    if (this.image === undefined) self.arrayBtnImg[this.idArr].mouseOver(e);else self.arrayButton[this.idArr].mouseOver(e);
    doEvent1 = true;
  }
}

PLPachkaImgBut.prototype = Object.create(PIXI.Container.prototype);
PLPachkaImgBut.prototype.constructor = PLPachkaImgBut;
Object.defineProperties(PLPachkaImgBut.prototype, {
  height: {
    set: function set(value) {
      if (this._height == value) return;
      this._height = value;
    },
    get: function get() {
      return this._height;
    }
  },
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
  wh: {
    set: function set(value) {
      if (this._width == value) return;
      this._wh = value;
      this.reposition();
    },
    get: function get() {
      return this._wh;
    }
  },
  index: {
    set: function set(value) {
      if (this._index != value) {
        this._index = value;

        for (var i = 0; i < this.arrayButton.length; i++) {
          this.arrayButton[i].activ = i === this._index;
          this.arrayBtnImg[i].activ = false;
        }
      }
    },
    get: function get() {
      return this._index;
    }
  },
  value: {
    set: function set(v) {
      if (this._value == v) return;
      this._value = v;
    },
    get: function get() {
      return this._value;
    }
  },
  arrayActiv: {
    set: function set(value) {
      if (!Array.isArray(value)) return;

      for (var i = 0; i < value.length; i++) {
        this._arrayActiv[i] = value[i];
        this.arrayBtnImg[i].value = value[i];
      }
    },
    get: function get() {
      return this._arrayActiv;
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
  link: {
    set: function set(value) {
      this._link = value;
      this.arrayBtnImg[this._index].link = value;
    },
    get: function get() {
      return this._link;
    }
  },
  activMouse: {
    set: function set(value) {
      if (this._activMouse == value) return;
      this._activMouse = value;

      for (var i = 0; i < this.arrayBtnImg.length; i++) {
        this.arrayBtnImg[i].activMouse = this._activMouse;
      }
    },
    get: function get() {
      return this._activMouse;
    }
  }
});

/***/ }),

/***/ "./pl102/src/plPlus/PLGalleryADM.js":
/*!******************************************!*\
  !*** ./pl102/src/plPlus/PLGalleryADM.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PLGalleryADM = PLGalleryADM;

function PLGalleryADM(cont, _x, _y, _klush, _fun, _funD, _funU) {
  var self = this;
  this.fun = _fun;
  this.funD = _funD;
  this.funU = _funU;
  this.arrObj = [];
  this.arrBtn = []; // буфер

  this.klush = _klush;
  this.podKlush = 'nullXZ';
  this._width = 100; // 106;

  this._height = 100; // 213;

  this._boolLeft = false;
  this.boolG = true;
  this.galBool = false;
  this.isFullHeightPanel = false;
  this._butVisiblePanel = false;
  this._visibleIndex = false;
  this.otstup = 0;
  this._wh = 60;
  this._stepW = 1;
  this.idArr = 0;
  this._otstupImg = 2; // отстур картинки

  this._visiItem = -1; // видимость контура кнопок

  this._kontThick = 4; // толщина линии контура кнопок

  this._colorThick = 0xffb200; // pl102.color1; // цвет контура кнопок

  this.povedSlid = 0; // 0 - слидер работает как и раньше, 1 - находясь слева, уменьшается в ширину

  this.object;
  this.lavel = 0; // доступный уровень подгалерей

  this.content = new PIXI.Container();
  cont.addChild(this.content);
  this.content.x = _x || 0;
  this.content.y = _y || 0;
  this.shapeMask = new PIXI.Graphics();
  this.content.addChild(this.shapeMask);
  this.contentB = new PIXI.Container();
  this.content.addChild(this.contentB);
  this.contentBbb = new PIXI.Container();
  this.contentB.addChild(this.contentBbb);
  this.contentKont = new PIXI.Container();
  this.contentB.addChild(this.contentKont);
  this.contentKont.visible = this._visibleIndex;
  this.kont = new PLContur(this.contentKont, 0, 0);
  this.kont.width = this._wh;
  this.kont.height = this._wh;
  this.kont.thickness = this._kontThick;
  this.kont.color = this._colorThick;
  this.kont.visible = false;
  this._value = 'null';
  this._theme = undefined;
  this.visiDoble = true;
  this.funVisiSlider;
  this.contentB.mask = this.shapeMask;
  this.childrenGal = [];
  this.funDown;
  this.funUp;
  this.textAll = 'All';
  this.slidV = new PLScrollBarV(this.content, this._width - 18, this.otstup, function () {
    self.contentB.y = -this.scrolValue;
  });
  this.slidV.visible = false;
  this.slidV.otstup = 3;
  this.slidV.width = 15;
  var object;

  this.onDragEnd = function (e) {// pl102.stage.off('mouseup', self.onDragEnd);
  };

  this.boolLink = false;
  var bb;
  this.obj;
  this.idArr;
  var imgLink, title, text, link;

  this.downBut = function () {
    if (self.boolLink == false) self.value = this.obj.id;else self.value = this.obj.texture.url;
    self.setAt(this.idArr, this);
  };

  var bbb;

  this.setAt = function (num, gal) {
    var bbb = true;

    if (gal == undefined) {
      gal = self.arrBtn[num];
      bbb = false;
    }

    self.idArr = num;
    self.obj = self.object.data[num];
    bb = true;

    if (self.obj[self.klush] != undefined) {
      if (gal.galeri != undefined) bb = !gal.galeri.content.visible;
    }

    for (var i = 0; i < self.arrBtn.length; i++) {
      if (self.arrBtn[i].galeri != undefined) {
        self.arrBtn[i].galeri.content.visible = false;
      }
    }

    if (self.obj[self.klush] != undefined) {
      if (gal.galeri == undefined) {
        if (self.boolG == true) {
          gal.galeri = new PLGalleryADM(self.content, -(64 * 2 + self.otstup * 3 + gal.x), 0, self.klush, self.fun, self.funD, self.funU);
          gal.galeri.stepW = 2;
          gal.galeri.lavel = self.lavel + 1;
          gal.galeri.setObj(self.obj[self.klush], 60);
          gal.galeri.height = self._height;
          gal.galeri.boolLeft = self._boolLeft;
        } else {
          gal.galeri = new PLGalleryADM(self.content, self.wh + self.otstup * 3 + gal.x, 0, self.klush, self.fun, self.funD, self.funU);
          gal.galeri.setObj(self.obj[self.klush], self._wh);
          gal.galeri.height = self._height;
          gal.galeri.lavel = self.lavel + 1;
          gal.galeri.boolLeft = self._boolLeft;
        }
      }

      if (gal.galeri != undefined) {
        gal.galeri.content.visible = bb;
      }
    }

    if (self.visiDoble == false) {
      if (gal.galeri) {
        gal.galeri.content.visible = true;
      }
    }

    if (self.fun) {
      if (bbb == true) {
        self.galBool = false;

        if (gal.galeri) {
          self.galBool = true;
        }

        self.fun();
      }
    }
  };

  this.fDown = function () {
    self.testItem(this.idArr, false); // при нажатии на кнопку шлем id кнопки, выделяем ее и позиционируем слидер

    self.idArr = this.idArr;
    self.obj = self.object.data[this.idArr];
    self.obj.indexGalADM = self.object.index;
    if (self.funD) self.funD();

    if (pl102.isMouseEvents) {
      pl102.stage.on('mouseup', self.fUp);
    }

    if (pl102.isTouchEvents) {
      pl102.stage.on('touchend', self.fUp);
    }
  };

  this.fUp = function () {
    if (self.funU) self.funU();

    if (pl102.isMouseEvents) {
      pl102.stage.off('mouseup', self.fUp);
    }

    if (pl102.isTouchEvents) {
      pl102.stage.off('touchend', self.fUp);
    }
  };

  this.activBtnFromLink = function (link, bool) {
    for (var i = 0; i < this.arrBtn.length; i++) {
      if (this.arrBtn[i].obj.texture.url == link) {
        return i; // return this.testItem(i, bool)
      }
    }

    return -1; // this.testItem(-1, bool)
  };

  var butt; // расчитываемая переменная для определения позиции активной кнопки в галереи

  var butt2; // расчитываемая переменная для определения позиции активной кнопки в галереи

  var verh; // расчитываемая переменная для определения сверху ли наполовину скрыта кнопка

  var niz; // расчитываемая переменная для определения снизу ли наполовину скрыта кнопка
  // с пола получаем id кнопки, выделяем ее и ставим слидер в соответствующую позицию
  // bool активирует подстройку слидера относительно активной кнопки
  // true при клике на пол на сцене
  // false при клике на кнопку в галереи

  this.testItem = function (idArr, bool) {
    if (this._visiItem == -1) return; // ставим выделение на нужную кнопку
    // если слидер активный вычисляем его позицию и ставим

    if (this.slidV.visible != false) {
      butt = 0;
      butt2 = 0; // узнаем в каком ряду в галереи находиться кнопка

      for (var i = 0; i < idArr; i++) {
        butt++;

        if (butt >= this._stepW) {
          butt = 0;
          butt2++;
        }
      }

      if (bool) {
        // устанавливаем скрол в нужную позицию при клике на пол что находиться на сцене
        this.slidV.scrolValue = butt2 * (this._wh + this.otstup) * 100 / this.slidV.height;
        this.contentB.y = -(this.currentHeight - this._height) * (this.slidV.scrolValue / 100);
      } else {
        // если кнопка наполовину скрыта сверху при клике на нее подгоняем позицию скрола
        verh = this.contentB.y + butt2 * (this._wh + this.otstup);

        if (verh < 0) {
          this.slidV.scrolValue = butt2 * (this._wh + this.otstup);
          this.contentB.y = -(butt2 * (this._wh + this.otstup));
        } // если кнопка наполовину скрыта снизу при клике на нее подгоняем позицию скрола


        niz = butt2 * (this._wh + this.otstup) + this._wh - (Math.abs(this.contentB.y) + this._height);

        if (niz > 0) {
          this.slidV.scrolValue = butt2 * (this._wh + this.otstup) + this._wh - this._height;
          this.contentB.y = -(butt2 * (this._wh + this.otstup) + this._wh - this._height);
        }
      }
    }
  };

  this.oldArrBtn = [];
  var poz;
  var but, button;

  this.getButton = function (_o) {
    for (var i = 0; i < this.oldArrBtn.length; i++) {
      if (this.oldArrBtn[i].visible == false) {
        if (this.oldArrBtn[i].link == _o.image.url) {
          but = this.oldArrBtn[i];
          but.idArr = this.arrBtn.length;
          but.transLink = false;
          return but;
        }
      }
    }

    but = new PLButton(this.contentBbb, 0, 0, '', this.downBut);
    but.funDown = this.fDown;
    but.idArr = this.arrBtn.length;
    but.width = this._wh;
    but.height = this._wh;
    but.funError = this.startDoLoad;
    but.funComplit = this.funComplitImg;
    but.visiblePanel = this._butVisiblePanel;
    but.boolKontur = true;
    but.otstup = this._otstupImg;
    this.oldArrBtn.push(but);
    return but;
  };

  this.funComplit = null;

  this.startDoLoad = function () {
    self.waitLoad = false;
    self.startLoad();
  };

  this.funComplitImg = function () {
    self.waitLoad = false;
    self.startLoad();
    if (self.funComplit) self.funComplit();
  };

  this.plus = function (_o) {
    button = this.getButton(_o);
    button.obj = _o; // todo выводит айдишники обьектов
    //= ========================================================================================================================

    if (menuDebag.bigVisible == true && _o instanceof BlokObjConf) {
      var labl = new PLLabel(button.contDop, 0, 0);
      var text = _o.id;
      if (_o.product) text = _o.product.copyFromProductId + ' (' + _o.id + ')';
      labl.fontSize = 11;
      labl.text = text;
      var rect = labl.getRect();
      labl.x = 3;
      labl.y = button.width - rect.height - 1;
    } //= ========================================================================================================================


    button.visible = true;
    this.arrBtn.push(button);
    this.arrLoadedImgId.push(button.idArr);
  };

  this.loadImgComplite = true;
  this.stopLoad = false;

  this.startLoad = function () {
    if (self.waitLoad) return;
    if (this.stopLoad) return;

    if (this.arrLoadedImgId.length === 0) {
      this.loadImgComplite = true;
    } else {
      self.waitLoad = true;
      this.loadImgComplite = false;
      var id = this.arrLoadedImgId.shift();
      this.setLoadImeg(id, self.object.data[id].image.url);
    }
  };

  this.setLoadImeg = function (_id, _s) {
    if (_s === undefined || _s === null) return;

    if (!isLink(_s)) {
      // если пришла не ссылка
      self.setColor(_id, _s);
      return;
    }

    if (self.arrBtn[_id].link === _s && self.arrBtn[_id].image && self.arrBtn[_id].image.isLoaded) {
      self.startDoLoad(); // картинка уже загружена идем на следующу
    } else {
      self.arrBtn[_id].loadImeg(_s);
    }
  };

  function isLink(_s) {
    return !(_s.indexOf('.') === -1 && _s.indexOf('data:image') === -1);
  }

  this.setColor = function (_id, _s) {
    self.arrBtn[_id].color = _s;
    self.arrBtn[_id].panel.nizAlpha = 0;
    self.arrBtn[_id].transLink = true;
    self.draw();
    self.startDoLoad();
  };
  /*
     FIXE - если сделать set второй раз для того же объекта
     т.к. this.arrBtn не обнуляется вылетает ошибка. + нет кеширования.
     */


  this.array = [];
  this.arrLoadedImgId = [];
  var postfixLink = '?x=' + Math.random();
  /**
  * Инициализация галереи
  */

  this.setObj = function (_obj, wh) {
    postfixLink = '?x=' + Math.random();
    this.arrLoadedImgId = [];
    this.clear();
    if (wh != undefined) this._wh = wh;
    this.object = _obj;
    this.contentB.y = 0;
    this.slidV.scrolValue = 0;

    for (var i = 0; i < _obj.data.length; i++) {
      this.plus(_obj.data[i]);
    }

    this.startLoad();
    this.draw();
    var t = this._theme;
    this._theme = null;
    this.theme = t;
  };

  this.addObj = function (newObj) {
    if (this.object == undefined) {
      this.object = {};
      this.object.data = [];
    }

    this.object.data.push(newObj);
    this.plus(this.object.data[this.object.data.length - 1]);
    this.startLoad();
    this.draw();
    var t = this._theme;
    this._theme = null;
    this.theme = t;
  };

  this.clear = function () {
    this._value = 'nullXXXZZZ';

    for (var i = 0; i < this.arrBtn.length; i++) {
      this.arrBtn[i].visible = false;
    }

    this.arrBtn.length = 0;
    this.index = -1;
  };

  this.currentHeight = 0;
  var count = 0;
  var count2 = 0;
  var countMan;
  this.currentHeight = 0;

  this.draw = function () {
    if (this.object == undefined) return;
    this.currentHeight = 0;
    count = 0;
    count2 = 0;
    var visibleBtn = getCountVisibleBtn();
    countMan = Math.ceil(visibleBtn / this._stepW);
    this.currentHeight = this._wh * countMan + this.otstup * (countMan + 1);

    for (var i = 0; i < this.object.data.length; i++) {
      if (this.arrBtn[i].visible == false) continue;

      if (this.arrBtn[i].galeri) {
        this.arrBtn[i].galeri.wh = this._wh;
        this.arrBtn[i].galeri.content.x = this._wh + this.otstup;
      }

      this.arrBtn[i].x = this.otstup + count * (this.otstup + this._wh);
      this.arrBtn[i].y = this.otstup + count2 * (this.otstup + this._wh);
      this.arrBtn[i].visiblePanel = this._butVisiblePanel;

      if (this.arrBtn[i].transLink) {
        this.arrBtn[i].visiblePanel = true; // this.arrBtn[i].panel.nizAlpha = _nizAlpha;
      }

      count++;

      if (count >= this._stepW) {
        count = 0;
        count2++;
      }
    }

    this.slidV.heightContent = this.currentHeight;
    this.slidV.height = this._height;
    this.slidV.fun(); // drag contentB

    this.slidV.visible = this.slidV.height < this.slidV.heightContent;
    if (this.funVisiSlider) this.funVisiSlider();

    if (this.slidV.visible == true) {
      if (this.boolWhell == false) {
        this.initWhell();
      }
    } else {
      this.contentB.x = (this._width - this._stepW * (this.otstup + this._wh)) / 2;
    }

    this.shapeMask.clear();
    this.shapeMask.beginFill(0, 0.5);
    this.shapeMask.drawRect(0, 0, this._width + 1, this._height);
  };

  this.boolWhell = false;
  var yy, sy;

  this.wheelDrag = function (e) {
    if (self.slidV.visible == true) {
      yy = self.contentB.y;

      if (e.delta > 0) {
        yy += 10;
        if (yy > 0) yy = 0;
      } else {
        yy -= 10;
        if (yy < -(self.currentHeight - self._height)) yy = -(self.currentHeight - self._height);
      }

      self.contentB.y = yy;
      self.slidV.scrolValue = -self.contentB.y;
    }

    if (this.funVisiSlider) this.funVisiSlider();
  };

  this.initWhell = function () {
    this.boolWhell = true;
    this.content.interactive = true;
    pl102Wheel.on(this.content, 'mousewheel', this.wheelDrag);
  };

  this.arrSortedId = [];
  /**
  * Фильтрация иконок галереи
  * @param callback - Функция проверки каждого элемента. Вызывается с аргументами (element, index, array). Возвращает true для показа элемента и false для его пропуска.
  */

  this.filter = function (callback) {
    this.arrSortedId = [];

    for (var i = 0; i < this.arrBtn.length; i++) {
      var p = callback(this.arrBtn[i], i, this.arrBtn) == true;
      if (p) this.arrSortedId.push(this.arrBtn[i].idArr);
      this.arrBtn[i].visible = p;
    }

    this.draw();
  };

  this.korektWidth = function () {
    this.width = this._stepW * (this._wh + this.otstup);
  };

  function getCountVisibleBtn() {
    var count = 0;

    for (var i = 0; i < self.arrBtn.length; i++) {
      if (self.arrBtn[i].visible) count++;
    }

    return count;
  }
  /**
  * Изм6еняем положение и вид слидера, зависит от this.povedSlid
  */


  this.editSlidByPoved = function () {
    // 0 - слидер работает как и раньше, 1 - находясь слева, уменьшается в ширину
    if (this.povedSlid === 0) {
      this.slidV.width = bigMenu.scrolWidth;
      this.slidV.offsetHit = 0;
    }

    if (this.povedSlid === 1) {
      // сдвиг и уменьшение ширины
      if (this._boolLeft === true) {
        this.slidV.width = bigMenu.scrolWidth / 2;
        this.slidV.x = -this.slidV.width;
        this.slidV.offsetHit = bigMenu.scrolWidth / 2;
      }
    }
  };
  /**
  * Фильтрация иконок галереи
  * @param value - значение по которому нужно отфильтровать галерею. value = All - отменить фильтр обектов. обект данных item.obj.product.categoryId
  */


  this.setFilterName = function (value) {
    this.filterName = value;
    this.filter(function (item) {
      if (!item.obj.product && !item.obj.arrObjPar) return true;

      if (item.obj.arrObjPar) {
        if (self.theme !== undefined && self.theme !== null) {
          var b = false;

          for (var jj = 0; jj < item.obj.arrObjPar.length; jj++) {
            var prod = item.obj.arrObjPar[jj].product;
            if (!prod) return true;
            var theme = prod.theme;

            for (var i = 0; i < self.theme.length; i++) {
              if (self.theme[i] == theme) {
                b = true;
                break;
              }
            }
          }

          if (b == false) return false;
        }

        if (value === undefined) value = self.textAll;
        if (value === self.textAll) return true;
        return true;
      }

      if (self.theme !== undefined && self.theme !== null) {
        var b = false;

        for (var i = 0; i < self.theme.length; i++) {
          if (self.theme[i] == item.obj.product.theme) b = true;
        }

        if (b == false) return false;
      }

      if (value === undefined) value = self.textAll;
      if (value === self.textAll) return true;
      return value == item.obj.product.categoryId;
    });
    this.arrLoadedImgId = this.arrSortedId;
    this.startLoad();
  };
}

PLGalleryADM.prototype = {
  set theme(v) {
    if (this._theme == v) return;
    this._theme = v;
    this.setFilterName(this.filterName);
    this.draw();
  },

  get theme() {
    return this._theme;
  },

  set stepW(v) {
    if (this._stepW == v) return;
    this._stepW = v;
    this.korektWidth();
    this.draw();
  },

  get stepW() {
    return this._stepW;
  },

  set height(v) {
    if (this._height == v) return;
    this._height = v;

    for (var i = 0; i < this.arrBtn.length; i++) {
      if (this.arrBtn[i].galeri) {
        this.arrBtn[i].galeri.height = this._height;
      }
    }

    this.draw();
  },

  get height() {
    return this._height;
  },

  set width(v) {
    if (this._width == v) return;
    this._width = v;
    if (this._boolLeft == false) this.slidV.x = this._width - this.slidV.width;
    this.editSlidByPoved();
  },

  get width() {
    return this._width;
  },

  set wh(v) {
    if (this._wh == v) return;
    this._wh = v;
    this.kont.width = this._wh;
    this.kont.height = this._wh;

    for (var i = 0; i < this.oldArrBtn.length; i++) {
      this.oldArrBtn[i].width = this.arrBtn[i].height = this._wh;
    }

    this.korektWidth();
    this.draw();
  },

  get wh() {
    return this._wh;
  },

  set x(v) {
    this._x = v;
    this.content.x = v;
  },

  get x() {
    return this._x;
  },

  set y(v) {
    this._y = v;
    this.content.y = v;
  },

  get y() {
    return this._y;
  },

  set visible(v) {
    this._visible = v;
    this.content.visible = v;
  },

  get visible() {
    return this._visible;
  },

  set boolLeft(v) {
    this._boolLeft = v;
    if (this._boolLeft == false) this.slidV.x = this._width - 10;else this.slidV.x = 0;
    this.editSlidByPoved();
  },

  get boolLeft() {
    return this._boolLeft;
  },

  set butVisiblePanel(v) {
    this._butVisiblePanel = v;

    for (var i = 0; i < this.arrBtn.length; i++) {
      this.arrBtn[i].visiblePanel = this._butVisiblePanel;

      if (this.arrBtn[i].galeri) {
        this.arrBtn[i].galeri.butVisiblePanel = this._butVisiblePanel;
      }
    }
  },

  get butVisiblePanel() {
    return this._butVisiblePanel;
  },

  set otstupImg(v) {
    if (this._otstupImg == v) return;
    this._otstupImg = v;
  },

  get otstupImg() {
    return this._otstupImg;
  },

  set visiItem(v) {
    if (this._visiItem == v) return;
    this._visiItem = v;
  },

  get visiItem() {
    return this._visiItem;
  },

  set colorThick(v) {
    if (this._colorThick == v) return;
    this._colorThick = v;
  },

  get colorThick() {
    return this._colorThick;
  },

  set kontThick(v) {
    if (this._kontThick == v) return;
    this._kontThick = v;
  },

  get kontThick() {
    return this._kontThick;
  },

  set index(v) {
    if (this._index == v) return;
    this._index = v;
    this.kont.visible = false;

    if (this.arrBtn[this._index] != undefined) {
      this.kont.x = this.arrBtn[this._index].x;
      this.kont.y = this.arrBtn[this._index].y;
      this.kont.visible = true;
    } else {
      this.contentB.y = 0;
      this.slidV.scrolValue = 0;
    }
  },

  get index() {
    return this._index;
  },

  set visibleIndex(v) {
    if (this._visibleIndex == v) return;
    this._index = v; // this.kont.visible = false;

    this.contentKont.visible = v;
  },

  get visibleIndex() {
    return this._visibleIndex;
  },

  set value(v) {
    var bb = true;
    this._value = v;

    if (this.object != undefined) {
      for (var i = 0; i < this.arrBtn.length; i++) {
        if (this.arrBtn[i].obj.id == v) {
          this.index = i;
          bb = false;
          this.boolLink = false;
          break;
        }
      }
    }

    if (bb == true) this.index = -1;
  },

  get value() {
    return this._value;
  }

};

/***/ }),

/***/ "./pl102/src/plPlus/PLInputWithText.js":
/*!*********************************************!*\
  !*** ./pl102/src/plPlus/PLInputWithText.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PLInputWithText = PLInputWithText;

function PLInputWithText(_cont, _x, _y, _text, _fun) {
  PLInput.call(this, _cont, _x, _y, _text, _fun);

  _cont.addChild(this);

  this.type = 'PLInputWithText';
  var self = this;
  pl102.addElement(this);
  this.otstup = 6;
  this.label = new PLLabel(this, 0, 0);
  this.label.visible = false;

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

    if (!this._activMouse) {
      this.graphRect.clear();
      this.graphRect.beginFill(pl102.color);
      this.graphRect.drawRect(0, 0, this._width, this._height);
      this.graphRect.endFill();
    } else {
      this.graphRect.clear();
    }
  };

  this.setText = function (_text) {
    if (this.label.visible == false) this.label.visible = true;
    this.label.text = _text;
    var rect = this.label.getRect();
    this.label.x = this._width + this.otstup;
    this.label.y = (this._height - rect.height) / 2;
    var lblTxt;
    lblTxt = this.label;
    language.setTextComp(lblTxt);
  };
}

PLInputWithText.prototype = Object.create(PLInput.prototype);
PLInputWithText.prototype.constructor = PLInputWithText;
Object.defineProperties(PLInputWithText.prototype, {
  title: {
    set: function set(value) {
      if (this._title == value) return;
      this._title = value;
      if (this._title == '') this._title = 'null';

      if (this._title != 'null') {
        if (this.label.visible == false) this.label.visible = true;
        this.label.text = this._title;
      }
    },
    get: function get() {
      return this._title;
    }
  }
});

/***/ }),

/***/ "./pl102/src/plPlus/PLParamObject.js":
/*!*******************************************!*\
  !*** ./pl102/src/plPlus/PLParamObject.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PLParamObject = PLParamObject;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function PLParamObject(_cont, _x, _y, _fun, _infoInt) {
  SettingsBig.call(this, _cont);
  this.type = 'PLParamObject';
  var self = this;
  this.fun = _fun;
  this._x = _x || 0;
  this._y = _y || 0;
  this.cont = _cont;
  this.infoInt = _infoInt != undefined ? _infoInt : -1;
  this._height = 100;
  this._bWindow = true;
  this._ignTypeArr = false;
  this._actIgnBtn = true;
  this._title = 'PLParamObject';
  this._priorityType = false;
  this._isScroll = false; // скрол панель 1 го уровня

  this.arrayColor = [];
  this.oShablon = [];
  this.textJSON = '{}';
  this.objJSON = {};
  this.funMinimize;
  this.funKorektObj = undefined; // отдают на верх на коректировку обьекты наполнения

  this.parrentPLPO = undefined;
  this.tipRide = false;
  this.oP;
  this.ignBtn;
  this.wh = pl102.wh;
  this.w;
  this.typeArray = [];
  this.typeNotArray = null;
  this.typeYesArray = null;

  if (this._bWindow) {
    this.w = new PLWindow(this.cont, this._x, this._y, this._title, function () {
      if (self.funMinimize) {
        if (this.minimize == true) self._height = 1;else {
          self.draw();
          self._height = self.finalHeight;
        }
        self.funMinimize();
      }
    });
    this.w.content.addChild(this.content);
    pl102.removeElement(this.w, true);
    this.w.drag = false;
    this.w.width = this.width;
    this.w.height = this.height;

    if (this.infoInt == 0) {
      this.textArea = new PLTextArea(this.w.content, this._otstup, this._otstup, 'null');
      this.textArea.height = 60;
      this.textArea.width = this.w.width - this._otstup * 3 - 20;
      this.but = new PLButton(this.w.content, this.textArea.width + this._otstup * 2, this._otstup, '<', function () {
        self.setObjStr(self.textArea.text);
      });
      this.but.setStile(1, 64, 64);
      this.but.height = this.textArea.height;
      this.but.width = 20;

      this.funActMouse = function (b) {
        this.textArea.activMouse = !b;
      };
    }

    if (this.infoInt == 1) {
      this.w.hasMinimizeButton = true;
      this.w.minimize = true;
      this.w.drag = false;
      this._height = this.wh;

      this.w.fun = function () {
        if (this.minimize == true) {
          self._height = self.wh;
        } else {
          if (self.parrentPLPO != undefined) {
            // при открытии вложенного PLPO другие - закрываются
            for (var i = 0; i < self.parrentPLPO.arrPLPO.length; i++) {
              if (self.parrentPLPO.arrPLPO[i].w.minimize == false && self.parrentPLPO.arrPLPO[i].idArr != self.idArr) {
                self.parrentPLPO.arrPLPO[i].w.minimize = true;
                self.parrentPLPO.arrPLPO[i].w.fun();
              }
            }
          }

          self.draw();
          self._height = self.w.height;
        }

        if (self.parrentPLPO != undefined) self.parrentPLPO.draw();
        if (self.funMinimize) self.funMinimize(this.minimize);
      };
    }
  } else {
    this.content.x = _x;
    this.content.y = _y;
  }

  this.arrType = ['numbercolor', 'boolean', 'number', 'string'];

  for (var item in this.arrType) {
    this.oShablon[item] = [];
  }

  this.addObject = function (obj, tipRide) {
    if (tipRide != undefined) this.tipRide = tipRide;
    this.oP = obj;
    this.oShablon = []; // for( item of this.arrType) this.oShablon[item] = [];
    // замена для минимизации

    for (var i = 0; i < this.arrType.length; i++) {
      this.oShablon[this.arrType[i]] = [];
    }

    this.generatShablon();
    this.clearShablon();
    this.creatToShablon();
    this.startToShablon();
    this.draw2();
    this.setTextInput();
  };

  var ar, bb, bbb; // очищаем если есть левые параметры

  this.clearShablon = function (arrParam) {
    var i, j, k;

    if (this.typeYesArray != null && this._ignTypeArr == false) {
      for (i = 0; i < this.arrType.length; i++) {
        ar = this.oShablon[this.arrType[i]];

        for (j = 0; j < ar.length; j++) {
          bb = true;

          for (k = 0; k < this.typeYesArray.length; k++) {
            if (ar[j] == this.typeYesArray[k]) {
              bb = false;
            }
          }

          if (bb == true) {
            ar.splice(j, 1);
            k = 999;
            j = -1;
          }
        }
      }

      for (var s in this.oShablon) {
        bb = true;

        for (i = 0; i < this.arrType.length; i++) {
          if (this.arrType[i] == s) bb = false;
        }

        if (bb == true) {
          ar = this.oShablon[s];

          for (i = 0; i < ar.length; i++) {
            bbb = true;

            for (var ss in this.oP) {
              if (this.oP[ss] == ar[i]) {
                for (k = 0; k < this.typeYesArray.length; k++) {
                  if (ss == this.typeYesArray[k]) {
                    bbb = false;
                    k = 999;
                  }
                }
              }
            }

            if (bbb == true) {
              ar.splice(i, 1);
              i = -1;
            }
          }
        }
      }
    }

    if (this.typeNotArray != null && this._ignTypeArr == false) {
      for (i = 0; i < this.arrType.length; i++) {
        ar = this.oShablon[this.arrType[i]];

        for (j = 0; j < ar.length; j++) {
          for (k = 0; k < this.typeNotArray.length; k++) {
            if (ar[j] == this.typeNotArray[k]) {
              ar.splice(j, 1);
              k = 999;
              j = -1;
            }
          }
        }
      }

      for (var s in this.oShablon) {
        bb = true;

        for (i = 0; i < this.arrType.length; i++) {
          if (this.arrType[i] == s) bb = false;
        }

        if (bb == true) {
          ar = this.oShablon[s];

          for (i = 0; i < ar.length; i++) {
            for (var ss in this.oP) {
              if (this.oP[ss] == ar[i]) {
                for (k = 0; k < this.typeNotArray.length; k++) {
                  if (ss == this.typeNotArray[k]) {
                    ar.splice(i, 1);
                    i = -1;
                  }
                }
              }
            }
          }
        }
      }
    }
  };

  this.draw2 = function () {
    this.w.height = this.finalHeight; //+pl102.wh/2;

    if (this.parrentPLPO != undefined) this.w.height = this.finalHeight + pl102.wh - this._otstup; //else this.w.height = this.finalHeight;

    if (this.infoInt == 0) {
      this.textArea.y = this.finalHeight;
      this.but.y = this.finalHeight;
      this.w.height += this.textArea.height;
    }

    if (this.ignBtn) this.ignBtn.x = this.w.width - this.ignBtn.width - 3;
    self.updateScroll();
  };

  this.generatShablon = function () {
    var arrParam, arrParam1, arrParam2;
    var type;

    if (this.tipRide == true) {
      arrParam = this.oP;
      this.generatShablon2(arrParam);
    } else {
      arrParam1 = Object.getOwnPropertyNames(Object.getPrototypeOf(this.oP));
      arrParam2 = Object.getOwnPropertyNames(this.oP);
      this.generatShablon2(arrParam1);
    }
  };

  this.generatShablon2 = function (arrParam) {
    // Наполнение
    for (var item in arrParam) {
      if (this.tipRide != true) item = arrParam[item];
      if (item == 'constructor') continue;
      type = _typeof(this.oP[item]);
      type = this.addPrefix(type, item, this.oP[item]);
      if (this.oShablon[type]) this.oShablon[type].push(item);
    }

    for (var c in this.oP) {
      if (this.oP[c] != undefined) {
        if (_typeof(this.oP[c]) === 'object') {
          for (var i = 0; i < this.typeArray.length; i++) {
            if (this.oP[c] instanceof this.typeArray[i].type) {
              type = this.typeArray[i].name;
              if (this.oShablon[type] == undefined) this.oShablon[type] = [];

              if (this.typeArray[i].nameComp != undefined) {
                this.oShablon[type].push(c.replace('_', ''));
                if (this.arrType.indexOf(type) == -1) this.arrType.push(type);
              } else {
                this.oShablon[type].push(this.oP[c]);
              }
            }
          }
        }
      }
    } // Сортировка


    for (var type in this.oShablon) {
      this.oShablon[type].sort();
    }
  };

  this.component;
  this.arrPLPO = [];

  this.addComponent2 = function (_type, _name, _param) {
    var b = false;
    var g = this.typeArray;

    for (var i = 0; i < g.length; i++) {
      if (_name.indexOf(g[i].name) != -1 && g[i].nameComp == undefined) b = true;
    }

    if (b == true) {
      this.component = new PLParamObject(this.content, this.otstup, 0, this.down, 1);
      this.component.otstup = this.otstup;
      this.arrPLPO.push(this.component);
      this.arrPLPO[this.arrPLPO.length - 1].idArr = this.arrPLPO.length - 1;
      this.component.parrentPLPO = this;
      this.component.width = this._width - this.otstup * 2;
      this.component.funMinimize = this.funMin;

      if (_param != undefined) {
        if (_param.title != undefined) this.component.title = _param.title;
        if (_param.tipRide != undefined) this.component.tipRide = _param.tipRide;
      }

      if (this.dinFun != undefined) this.component.dinFun = this.dinFun;
    }
  };

  this.funMin = function (_component) {
    if (self.funMinimize) {
      self.draw();
      self._height = self.w.height;
      self.funMinimize();
    }
  };

  this.reDragObject = function (_component) {};

  this.creatToShablon = function () {
    for (var type in this.oShablon) {
      for (var i = 0; i < this.oShablon[type].length; i++) {
        this.addTypeComp(type, i);
      }
    }
  };

  this.addTypeComp = function (type, index) {
    var nameComp, comp, t;
    if (type == 'boolean') nameComp = 'PLCheckBox';
    if (type == 'numbercolor') nameComp = 'PLColor';
    if (type == 'number') nameComp = 'PLSliderBig';
    if (type == 'string') nameComp = 'StringDrag';

    for (var i = 0; i < this.typeArray.length; i++) {
      if (this.typeArray[i].name == type) {
        nameComp = 'PLParamObject';

        if (this.typeArray[i].nameComp != undefined) {
          nameComp = this.typeArray[i].nameComp;
        }
      }
    }

    if (this.objComp[type + index] == undefined && nameComp) {
      comp = this.addComponent(nameComp, type + index);
      this.funDragSlider(comp);
    }
  };

  this.setTextInput = function () {
    this.objJSON = this.getObjStr();
    this.textJSON = JSON.stringify(this.objJSON);
    if (this.infoInt == 0) self.textArea.text = this.textJSON;
  };

  this.getObjStr = function () {
    var o = {};
    var bb;

    for (var type in self.oShablon) {
      for (var i = 0; i < self.oShablon[type].length; i++) {
        bb = false;

        for (var j = 0; j < this.arrType.length; j++) {
          if (this.arrType[j] == type) bb = true;
        }

        if (bb == false) {
          for (var j = 0; j < this.arrComp2.length; j++) {
            if (this.arrComp2[j].type == 'PLParamObject') {
              for (var ss in this.oP) {
                if (this.oP[ss] == this.arrComp2[j].param) {
                  o[ss] = this.arrComp2[j].getObjStr();
                }
              }
            }
          }
        } else {
          o[self.oShablon[type][i]] = self.oP[self.oShablon[type][i]];
        }
      }
    }

    return o;
  };

  this.setObjStr = function (_str) {
    var o = JSON.parse(_str);
    self.setObjStr2(o);
    self.korektObjParamMinMax();
    if (self.funD) self.funD();
  };

  this.setObjStr2 = function (o) {
    for (var c in o) {
      if (self.oP[c] != undefined) {
        if (_typeof(self.oP[c]) === 'object') {
          for (var i = 0; i < this.arrComp2.length; i++) {
            if (this.arrComp2[i].param == self.oP[c]) {
              this.arrComp2[i].setObjStr2(o[c]);
            }
          }
        } else {
          self.oP[c] = o[c];

          if (self.objComp[c] != undefined) {
            self.objComp[c].value = o[c];
          }
        }
      }
    }

    this.korektObjParam();
  };

  this.korektObjParamMinMax = function () {
    if (this.object != undefined && this.object.param != undefined) {
      for (var i = 0; i < this.arrComp2.length; i++) {
        if (this.object.param[this.arrComp2[i].param] != undefined) {
          if (this.arrComp2[i].type == 'PLSliderBig') {
            if (slider.isDinamMinMax === false) return;
            this.omm = this.diapozon(this.oP[this.arrComp2[i].param]);
            this.arrComp2[i].min = this.omm.min;
            this.arrComp2[i].max = this.omm.max;
          }
        }
      }
    }

    self.korektObjParam();
  };

  this.componentS;

  this.funComplit = function (s) {
    if (s == undefined) s = self.compFinal;
    this.component = this;
    self.componentS = s;
    self.funDragSlider(this);
    self.setTextInput();
    if (self.fun) self.fun(s);
  };

  this.funD;

  this.funDrag = function () {
    if (self.funD) self.funD();
  };

  this.pointObject = {
    min: 0,
    max: 100
  };
  this.arrayNum = [-10000000, -1000000, -100000, -10000, -5000, -1000, -500, -100, -50, -1, 0, 1, 50, 100, 500, 1000, 5000, 10000, 100000, 1000000, 10000000];
  var zz = 1;

  this.diapozon = function (_num) {
    this.pointObject.min = 0;
    this.pointObject.max = 10;

    for (var i = 1; i < this.arrayNum.length - 1; i++) {
      if (this.arrayNum[i] == _num) {
        this.pointObject.min = this.arrayNum[i - 1];
        this.pointObject.max = this.arrayNum[i + 1];
        return this.pointObject;
      }
    }

    for (var i = 1; i < this.arrayNum.length - 1; i++) {
      if (this.arrayNum[i - 1] < _num && this.arrayNum[i] > _num) {
        this.pointObject.min = this.arrayNum[i - 1];
        this.pointObject.max = this.arrayNum[i];
        return this.pointObject;
      }
    }

    return this.pointObject;
  };

  this.omm;

  this.funDragSlider = function (slider) {
    if (!slider) return;

    if (slider.type == 'PLSliderBig') {
      if (slider.isDinamMinMax === false) return;
      if (slider.visiMinMax == false) slider.visiMinMax = true;
      this.omm = this.diapozon(slider.value);
      slider.min = this.omm.min;
      slider.max = this.omm.max;
      slider.value = slider.value;
    }
  };

  var bb; // Если нужен какой то уникальный слидер по названию

  this.addPrefix = function (type, param, znak) {
    if (type == 'string') {
      if (znak != undefined) {
        if (znak.length < 9) {
          if (znak.toLowerCase().indexOf('#') != -1) return type = 'numbercolor';
          if (znak.toLowerCase().indexOf('0x') != -1) return type = 'numbercolor';
        }
      }
    }

    return type;
  };

  this.formComp = function (_type, _i, _param, _obj) {
    var oo = {
      name: _type + _i,
      param: _param,
      title: _param
    };

    if (_type == 'number') {
      this.omm = this.diapozon(this.oP[_param]);
      oo.max = this.omm.max;
      oo.min = this.omm.min;
    }

    bb = false;

    for (var j = 0; j < this.arrType.length; j++) {
      if (this.arrType[j] == _type) {
        bb = true;
      }
    }

    if (bb == false) {
      for (var ss in this.oP) {
        if (this.oP[ss] == _param) {
          oo.title = ss;
          oo.tipRide = false;

          for (var ii = 0; ii < this.typeArray.length; ii++) {
            if (this.typeArray[ii].tipRide != undefined) {
              if (_param instanceof this.typeArray[ii].type) {
                oo.tipRide = this.typeArray[ii].tipRide;
              }
            }

            if (this.typeArray[ii].typeYesArray != undefined) {
              if (_param instanceof this.typeArray[ii].type) {
                oo.typeYesArray = this.typeArray[ii].typeYesArray;
              }
            }

            if (this.typeArray[ii].typeNotArray != undefined) {
              if (_param instanceof this.typeArray[ii].type) {
                oo.typeNotArray = this.typeArray[ii].typeNotArray;
              }
            }
          }
        }
      }
    } else {
      for (var ij = 0; ij < this.typeArray.length; ij++) {
        if (_type == this.typeArray[ij].name && this.typeArray[ij].typeYesArray != undefined) {
          oo.typeYesArray = this.typeArray[ij].typeYesArray;
        }
      }
    }
    /*if (this.typeYesArray != null && this._ignTypeArr == false) {
    		}*/


    _obj.arrComp.push(oo);
  };

  this.startToShablon = function () {
    this.omm = this.diapozon(100);
    var oo, bb, jj;
    var o = {};
    o.arrComp = [];
    self.object = o;
    var pp, aa, aa2, bb;

    if (this._priorityType == true && this._ignTypeArr == false && this.typeYesArray != null) {
      aa = [];

      for (var s in this.oShablon) {
        for (var i = 0; i < this.oShablon[s].length; i++) {
          pp = 'null';

          if (typeof this.oShablon[s][i] === 'string') {
            pp = this.oShablon[s][i];
          } else {
            for (var ss in this.oP) {
              if (this.oP[ss] == this.oShablon[s][i]) pp = ss;
            }
          }

          aa.push(this.oShablon[s][i], s, pp);
        }
      }

      var sah = 0;

      for (var k = 0; k < this.typeYesArray.length; k++) {
        pp = this.typeYesArray[k];

        for (var i = 0; i < aa.length; i += 3) {
          if (pp == aa[i + 2]) {
            this.formComp(aa[i + 1], k, aa[i + 2], o);
          }
        }

        sah++;
      }
    } else {
      for (var type in this.oShablon) {
        for (var i = 0; i < this.oShablon[type].length; i++) {
          this.formComp(type, i, this.oShablon[type][i], o);
        }
      }
    }

    if (this.typeYesArray != null && this._ignTypeArr == false) {
      var aa = [];

      for (var i = 0; i < this.typeYesArray.length; i++) {
        for (var j = 0; j < o.arrComp.length; j++) {
          if (o.arrComp[j].param == this.typeYesArray[i]) {
            aa.push(o.arrComp[j]);
            break;
          }
        }
      }

      o.arrComp = aa;
    }

    o.param = this.oP;
    o.fun = this.funDrag;
    o.funComplit = this.funComplit;
    if (this.funKorektObj != undefined) this.funKorektObj(o);
    this.setObj(o);
  };

  this.funWH = function () {
    if (this.w) this.w.width = this.width;
  };

  this.getObj = function () {};

  var signBtn = 15;

  this.createIgnBtn = function () {
    this.ignBtn = new PLButton(this.w, 0, 0, '+', function () {
      self.ignTypeArr = !self._ignTypeArr;
      if (self._ignTypeArr == true) this.text = '-';else this.text = '+';

      if (self.funMinimize) {
        if (self.w.minimize) self.w.minimize = false;
        self.draw(); // self._height = self.finalHeight + self.wh + self.otstup;

        self._height = self.w.height;
        self.funMinimize();
      }
    });
    this.ignBtn.width = this.ignBtn.height = signBtn;
    this.ignBtn.visible = this._actIgnBtn;
    this.ignBtn.y = 7;
  };

  if (this._actIgnBtn == true) this.createIgnBtn();
  this._heightWindow = 100;

  this.updateScroll = function () {
    if (!this.scrollPane || !this.isScroll) return;
    var fheight = this.finalHeight; // -- finalHeight не учитывает колора который выподает todo нужно правильно расчитать finalHeight у SettingsBig

    for (var i = 0; i < this.arrComp2.length; i++) {
      if (!this.arrComp2[i].visible) continue;

      if (this.arrComp2[i].pLColorPickerPanel && this.arrComp2[i].pLColorPickerPanel.visible) {
        var bot = this.arrComp2[i].y + this.arrComp2[i].pLColorPickerPanel.y + this.arrComp2[i].pLColorPickerPanel.height;

        if (bot > fheight) {
          fheight += bot - fheight; // если панелька колора ниже чем finalHeight
        }

        break;
      }
    }

    this.scrollPane.width = this._width;
    this.scrollPane.widthContent = this._width;
    this.scrollPane.height = this._heightWindow;
    this.scrollPane.heightContent = fheight;
    this.scrollPane.update();
    self.w.height = self._heightWindow;
    self._height = self.w.height;
  };

  this.initScroll = function () {
    if (this.w == undefined) return;
    if (this.scrollPane != undefined) return;
    this.scrollPane = new ScrollPane(this.w.content, 0, 0);
    this.scrollPane.addContent(this.content);
    this.scrollPane.boolPositOtctup = true;
    self.updateScroll();
  };
}

PLParamObject.prototype.constructor = PLParamObject;
Object.defineProperties(PLParamObject.prototype, {
  bWindow: {
    set: function set(v) {
      if (this._bWindow == v) return;
      this._bWindow = v;

      if (v == true) {
        if (!this.w) {
          this.w = new PLWindow(this.cont, this._x, this._y, 'PLParamObject Test');
          pl102.removeElement(this.w, true);
          this.w.width = this.width;
          this.w.height = this.height;
        }

        this.w.visible = true;
        this.w.addChild(this.content);
        this.content.x = 0;
        this.content.y = 30;
      } else {
        if (this.w) this.w.visible = false;
        this.cont.addChild(this.content);
        this.content.x = this._x;
        this.content.y = this._y;
      }
    },
    get: function get() {
      return this._bWindow;
    }
  },
  x: {
    set: function set(v) {
      this._x = v;
      if (this.w) this.w.x = this._x;
    },
    get: function get() {
      return this._x;
    }
  },
  y: {
    set: function set(v) {
      this._y = v;
      if (this.w) this.w.y = this._y;
    },
    get: function get() {
      return this._y;
    }
  },
  height: {
    set: function set(v) {},
    get: function get() {
      return this._height;
    }
  },
  heightWindow: {
    set: function set(v) {
      this._heightWindow = v;
      this.updateScroll();
    },
    get: function get() {
      return this._heightWindow;
    }
  },
  visible: {
    set: function set(v) {
      this._visible = v;
      if (this.w) this.w.visible = this._visible;
    },
    get: function get() {
      return this._visible;
    }
  },
  title: {
    set: function set(v) {
      if (this._title != v) {
        this._title = v;
        if (this.w) this.w.text = this._title;
      }
    },
    get: function get() {
      return this._title;
    }
  },
  ignTypeArr: {
    set: function set(v) {
      if (this._ignTypeArr == v) return;
      this._ignTypeArr = v;
      this.addObject(this.oP);
    },
    get: function get() {
      return this._ignTypeArr;
    }
  },
  actIgnBtn: {
    set: function set(v) {
      if (this._actIgnBtn == v) return;
      this._actIgnBtn = v;
      if (!this.ignBtn) this.createIgnBtn();
      this.ignBtn.visible = this._actIgnBtn;
    },
    get: function get() {
      return this._actIgnBtn;
    }
  },
  priorityType: {
    set: function set(v) {
      if (this._priorityType == v) return;
      this._priorityType = v;
      this.addObject(this.oP);
    },
    get: function get() {
      return this._priorityType;
    }
  },
  isScroll: {
    set: function set(v) {
      if (this._isScroll == v) return;
      this._isScroll = v;
      this.initScroll();
    },
    get: function get() {
      return this._isScroll;
    }
  }
});

/***/ }),

/***/ "./pl102/src/plPlus/PLSwitchPachkaBut.js":
/*!***********************************************!*\
  !*** ./pl102/src/plPlus/PLSwitchPachkaBut.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PLSwitchPachkaBut = PLSwitchPachkaBut;
exports.PLPachkaButton3 = PLPachkaButton3;

/**
 * Четвертной переключатель :) (По центру 4 картинки, 2 кнопки над и 2 под ними)
 * @class
 * @param {_cont} контент
 * @param {_x}
 * @param {_y}
 * @param {_fun} функция будт выполняться при нажатии
*/
function PLSwitchPachkaBut(_cont, _x, _y, _fun) {
  PIXI.Container.call(this);
  this.type = 'PLSwitchPachkaBut';
  var self = this;

  _cont.addChild(this);

  this.content = new PIXI.Container();
  this.addChild(this.content);
  this.x = _x || 0;
  this.y = _y || 0;
  this.fun = _fun;
  this._index = -1; // id активной кнопки

  this._wComponent = 100; // ширина PLImageWithBut

  this._hComponent = 100 + pl102.wh;
  this._height = 100;
  this.array = []; // массив InfoImageWithBut(link, text)

  this.arrayComp = []; // массив PLImageWithBut

  this.idActivLine = -1; // номер ряда на котором расположена активная кнопка

  /**
      * Задать массив
      * @param {_arr} массив массивов [ 1 ряд - [link, text, link, text...], 2 ряд - [link, text, link, text...]]
      */

  this.setArr = function (_arr) {
    for (var i = 0; i < _arr.length; i++) {
      if (this.array[i] === undefined) {
        var infP = new InfoPachkaLine();
        infP.idArr = this.array.length;
        this.array.push(infP);
      }

      this.array[i].setArr(_arr[i]);
    }

    this.array.length = _arr.length; // очищаем лишнее

    this.updteArrayComp(); // обновляем массив компонентов

    if (this.array[0]) {
      this._wComponent = this.arrayComp[0].width;
      this._hComponent = this.arrayComp[0].height;
    }

    this.reposition();
    this.reWH();
  };
  /**
      * Задать массив
      * @param {_arr} массив чисел, которые отображают положение кнопок у ряда. [0, 1, 0...] - [для ряда1, 2, 3....]
      */


  this.setButPositionArr = function (_arr) {
    for (var i = 0; i < _arr.length; i++) {
      if (this.arrayComp[i]) {
        this.arrayComp[i].butPosition = _arr[i];
      }
    }
  };
  /**
      * Обновить компонены. определить какие видно, а какие нет и обновить их данные
      */


  this.updteArrayComp = function () {
    for (var i = this.array.length; i < this.arrayComp.length; i++) {
      this.arrayComp[i].visible = false;
      this.arrayComp[i].activ = false;
    } // если нужно - создаем новые компоненты


    for (var i = 0; i < this.array.length; i++) {
      if (this.arrayComp[i] === undefined || this.arrayComp[i].visible === false) {
        var pachkaLine = this.getCompPachkaBut();
      }

      this.arrayComp[i].setArr(this.array[i].array, true);
    }
  }; // создание или получение из кеша


  this.getCompPachkaBut = function () {
    for (var i = 0; i < this.arrayComp.length; i++) {
      if (!this.arrayComp[i].visible) {
        this.arrayComp[i].visible = true;
        return this.arrayComp[i];
      }
    }

    var but = new PLPachkaButton3(this.content, 0, 0, this.funDown);
    but.setStile(1);
    but.idArr = this.arrayComp.length;
    this.arrayComp.push(but);
    return this.arrayComp[this.arrayComp.length - 1];
  };
  /**
      * удаляем не компонент, а элемент массива
      */


  this.removeById = function (_id) {
    if (this.array[_id] === undefined) return;
    this.array.splice(_id, 1);
    this.updteArrayComp();
    this.reposition();
    this.index = -1;
  };
  /**
      * Перезаписываем данные в arrayComp
      */


  this.rewriteData = function () {
    for (var i = 0; i < this.array.length; i++) {
      this.arrayComp[i].link = this.array[i].link;
      this.arrayComp[i].text = this.array[i].text;
    }
  };
  /**
      * функция нажатия на PLImageWithBut
      */


  this.funDown = function () {
    // чтобы кнопка при повторном нажатии была активна
    if (this.index === self.identifyBackIndex(self.index)) {
      if (self.idActivLine === this.idArr) {
        this.arrayComp[self.identifyBackIndex(self.index)].activ = true;
      }
    }

    self.idActivLine = this.idArr;
    var ind = self.identifyIndex(this.idArr, this.index, this.array.length);
    self.index = ind;
    if (self.fun) self.fun();
  };
  /**
      * Получить компоненты с текстом. нужно для перевода
      */


  this.getCompWithText = function () {
    var arr = [];
    var arrC = this.arrayComp;

    for (var i = 0; i < arrC.length; i++) {
      for (var j = 0; j < arrC[i].arrayComp.length; j++) {
        arr.push(arrC[i].arrayComp[j]);
      }
    }

    return arr;
  };

  this.identifyIndex = function (_idArr, _index, _lenght) {
    return _index + _idArr * _lenght;
  };

  this.identifyBackIndex = function (_index) {
    var ind = -1;
    this.idActivLine = -1;

    if (this.array[0]) {
      this.idActivLine = Math.floor(_index / this.array[0].array.length);
      ind = _index - this.idActivLine * this.array[0].array.length;
    }

    return ind;
  };

  this.reposition = function () {
    for (var i = 0; i < this.arrayComp.length; i++) {
      this.arrayComp[i].y = this._hComponent * i;
    }
  };
  /**
      * Подстраиваем высоту и ширину PLImageWithBut
      */


  this.reWH = function () {
    if (this.array.length === 0) return;
    this._width = this._wComponent;
    this._height = this._hComponent * this.array.length;

    for (var i = this.arrayComp.length - 1; i >= 0; i--) {
      if (this.arrayComp[i].visible) {
        this.arrayComp[i].width = this._wComponent;
        this.arrayComp[i].height = this._hComponent;
      }
    }
  };
  /**
      * Подстраиваем активность PLImageWithBut
      */


  this.changeActiv = function () {
    // тут пересчитывается self.idActivLine и возвращается индекс актив кнопки
    var indexButActiv = this.identifyBackIndex(this._index);

    for (var i = 0; i < this.arrayComp.length; i++) {
      this.arrayComp[i].index = -1;
    }

    if (this.arrayComp[self.idActivLine]) {
      this.arrayComp[self.idActivLine].index = indexButActiv;
    }
  };
}

PLSwitchPachkaBut.prototype = Object.create(PIXI.Container.prototype);
PLSwitchPachkaBut.prototype.constructor = PLSwitchPachkaBut;
Object.defineProperties(PLSwitchPachkaBut.prototype, {
  index: {
    set: function set(value) {
      if (this._index === value) return;
      this._index = value;
      this.changeActiv();
    },
    get: function get() {
      return this._index;
    }
  },
  width: {
    set: function set(value) {
      if (this._width === value) return;
      this._width = value;
      this._wComponent = this._width;
      this.reWH();
      this.reposition();
    },
    get: function get() {
      return this._width;
    }
  },
  height: {
    set: function set(value) {
      if (this._height === value) return;
      this._height = value;
      this._hComponent = this._height / this.array.length;
      this.reWH();
      this.reposition();
    },
    get: function get() {
      return this._height;
    }
  },
  wComponent: {
    set: function set(value) {
      if (this._wComponent === value) return;
      this._wComponent = value;
      this.reWH();
      this.reposition();
    },
    get: function get() {
      return this._wComponent;
    }
  },
  hComponent: {
    set: function set(value) {
      if (this._hComponent === value) return;
      this._hComponent = value;
      this.reWH();
      this.reposition();
    },
    get: function get() {
      return this._hComponent;
    }
  }
});
/**
 * Хранит массив <InfoImageWithBut>. (инфо одного ряда)
 * @class
*/

function InfoPachkaLine() {
  var self = this;
  this.type = 'InfoPachkaLine';
  this.array = [];

  this.setArr = function (_arr) {
    var num = 0;

    for (var i = 0; i < _arr.length; i += 2) {
      if (this.array[num] === undefined) {
        this.array.push(new InfoImageWithBut());
      }

      this.array[num].link = _arr[i];
      this.array[num].text = _arr[i + 1];
      this.array.idArr = num;
      num++;
    } // очищаем лишнее


    this.array.length = _arr.length / 2;
  };

  this.removeById = function (_id) {
    this.array.splice(_id, 1);
  };
}
/**
 * Хранит информацию линка и текста
 * @class
 * @param {_link} ссылка картинки
 * @param {_text} текст кнопки
*/


function InfoImageWithBut(_link, _text) {
  var self = this;
  this.type = 'InfoImageWithBut';
  this.link = '';
  this.text = '';
}
/**
 * Ряд который состоит с PLImageWithBut.
 * @class
 * @param {_cont} контент
 * @param {_x}
 * @param {_y}
 * @param {_fun} функция будт выполняться при нажатии
*/


function PLPachkaButton3(_cont, _x, _y, _fun) {
  PIXI.Container.call(this);
  this.type = 'PLPachkaButton3';
  var self = this;

  _cont.addChild(this);

  this.content = new PIXI.Container();
  this.addChild(this.content);
  this.x = _x || 0;
  this.y = _y || 0;
  this.fun = _fun;
  this._index = -1; // id активной кнопки

  this._wComponent = 100; // ширина PLImageWithBut

  this._hComponent = 100 + pl102.wh;
  this._width = this._wComponent;
  this._height = this._hComponent;
  this._butPosition = 0; // позиция кнопки PLImageWithBut (снизу/сверху)

  this._visible = true;
  this.array = []; // this.array = this.infoPachkaLine.array

  this.arrayComp = []; // массив PLImageWithBut

  this.infoPachkaLine = new InfoPachkaLine(); // записывает и хранит в себе массив array = [link, text, link, text....]

  /**
      * Задать массив
      * @param {_arr} массив ссылок и текста [link, text, link, text...]
      * @param {_bArrinfoPachka} этот маасив уже записан в infoPachkaLine
      */

  this.setArr = function (_arr, _bArrinfoPachka) {
    if (_bArrinfoPachka === undefined || !_bArrinfoPachka) {
      this.infoPachkaLine.setArr(_arr);
      this.array = this.infoPachkaLine.array;
    } else {
      this.array = _arr;
    } // добавляем если не хватает


    for (var i = 0; i < this.array.length; i++) {
      var b = this.getCompImgBut();
      b.butPosition = this._butPosition;
    }

    for (var i = 0; i < this.arrayComp.length; i++) {
      this.arrayComp[i].activ = false;
    } // очищаем лишние


    for (var i = this.array.length; i < this.arrayComp.length; i++) {
      if (this.arrayComp[i] && this.arrayComp[i].visible) {
        this.arrayComp[i].visible = false;
      }
    }

    this.rewriteData();
    this.reposition();
    this.reWH();
  }; // создание или получение из кеша


  this.getCompImgBut = function () {
    for (var i = 0; i < this.arrayComp.length; i++) {
      if (!this.arrayComp[i].visible) {
        this.arrayComp[i].visible = true;
        return this.arrayComp[i];
      }
    }

    var but = new PLImageWithBut(this.content, 0, 0, this.funDown);
    but.idArr = this.arrayComp.length;
    if (this.stile !== -1) but.setStile(this.stile);
    this.arrayComp.push(but);
    return this.arrayComp[this.arrayComp.length - 1];
  };
  /**
      * удаляем не компонент, а элемент массива
      */


  this.removeById = function (_id) {
    if (this.array[_id] === undefined) return;
    this.infoPachkaLine.removeById(_id);
    this.array = this.infoPachkaLine.array;

    for (var i = this.array.length; i < this.arrayComp.length; i++) {
      this.arrayComp[i].visible = false;
      this.arrayComp[i].activ = false;
    }

    this.rewriteData();
    this.reWH();
    this.reposition();
    this.index = -1;
  };
  /**
      * Перезаписываем данные в arrayComp
      */


  this.rewriteData = function () {
    for (var i = 0; i < this.array.length; i++) {
      this.arrayComp[i].link = this.array[i].link;
      this.arrayComp[i].text = this.array[i].text;
    }
  };

  this.reposition = function () {
    if (this.array.length === 0) return;

    for (var i = 0; i < this.arrayComp.length; i++) {
      if (this.arrayComp[i].visible) {
        this.arrayComp[i].x = this._wComponent * i;
      }
    }
  };
  /**
      * Подстраиваем высоту и ширину PLImageWithBut
      */


  this.reWH = function () {
    if (this.array.length === 0) return;
    this._width = this._wComponent * this.array.length;
    this._height = this._hComponent;

    for (var i = this.arrayComp.length - 1; i >= 0; i--) {
      if (this.arrayComp[i].visible) {
        this.arrayComp[i].width = this._wComponent;
        this.arrayComp[i].height = this._hComponent;
      }
    }
  };

  this.stile = -1;

  this.setStile = function (_id) {
    this.stile = _id;

    for (var i = 0; i < this.arrayComp.length; i++) {
      this.arrayComp[i].setStile(_id);
    }
  };
  /**
      * функция нажатия на PLImageWithBut
      */


  this.funDown = function () {
    self.index = this.idArr;
    if (self.fun) self.fun();
  };
  /**
      * Подстраиваем активность PLImageWithBut
      */


  this.changeActiv = function () {
    for (var i = 0; i < this.arrayComp.length; i++) {
      if (this.arrayComp[i].visible) {
        this.arrayComp[i].activ = false;
      }

      if (this.arrayComp[i].idArr === this._index) {
        this.arrayComp[i].activ = true;
      }
    }
  };
}

PLPachkaButton3.prototype = Object.create(PIXI.Container.prototype);
PLPachkaButton3.prototype.constructor = PLPachkaButton3;
Object.defineProperties(PLPachkaButton3.prototype, {
  index: {
    set: function set(value) {
      if (this._index === value) return;
      this._index = value;
      this.changeActiv();
    },
    get: function get() {
      return this._index;
    }
  },
  width: {
    set: function set(value) {
      if (this._width === value) return;
      this._width = value;
      this._wComponent = this._width / this.array.length;
      this.reWH();
      this.reposition();
    },
    get: function get() {
      return this._width;
    }
  },
  height: {
    set: function set(value) {
      if (this._height === value) return;
      this._height = value;
      this._hComponent = this._height;
      this.reWH();
      this.reposition();
    },
    get: function get() {
      return this._height;
    }
  },
  wComponent: {
    set: function set(value) {
      if (this._wComponent === value) return;
      this._wComponent = value;
      this.reWH();
      this.reposition();
    },
    get: function get() {
      return this._wComponent;
    }
  },
  hComponent: {
    set: function set(value) {
      if (this._hComponent === value) return;
      this._hComponent = value;
      this.reWH();
      this.reposition();
    },
    get: function get() {
      return this._hComponent;
    }
  },
  butPosition: {
    set: function set(value) {
      if (this._butPosition === value) return;
      this._butPosition = value;

      for (var i = 0; i < this.arrayComp.length; i++) {
        if (this.arrayComp[i].visible) {
          this.arrayComp[i].butPosition = this._butPosition;
        }
      }
    },
    get: function get() {
      return this._butPosition;
    }
  },
  visible: {
    set: function set(value) {
      this._visible = value;
    },
    get: function get() {
      return this._visible;
    }
  }
});
/**
 * Компонент кнопки с картинкой. кнопка может находится под/над картинкой
 * @class
 * @param {_cont} контент
 * @param {_x}
 * @param {_y}
 * @param {_fun} функция будт выполняться при нажатии
*/

function PLImageWithBut(_cont, _x, _y, _fun) {
  PIXI.Container.call(this);
  this.type = 'PLImageWithBut';
  var self = this;

  _cont.addChild(this);

  this.content = new PIXI.Container();
  this.addChild(this.content);
  this.x = _x || 0;
  this.y = _y || 0;
  this.fun = _fun;
  this._activ = false;
  this._width = 100;
  this._height = 100;
  this._link = ''; //'resources/images/cat_sing.png';

  this._text = 'text';
  this._hImage = 100;
  this._hButton = pl102.wh;
  this._butPosition = 0; // 0 - сверху, 1 - снизу. (Воозможно потом понадобится справа/слева)

  this._activMouse = true;
  this.button = null;
  this.image = null;
  this.panel = null;

  this.init = function () {
    this._height = this._hImage + this._hButton;
    this.panel = new PLPanel(this.content, 0, 0);
    this.panel.height = this._height;
    this.button = new PLButton(this.panel.content, 0, 0, this._tex, this.funDown);
    this.button.width = this._width;
    this.button.funOut = funOut;
    this.button.funOver = funOver;
    this.butImg = new PLButton(this.panel.content, 0, 0, '', this.funDown);
    this.butImg.width = this._width;
    this.butImg.loadImeg(this._link);
    this.butImg.panel.nizAlpha = 0;
    this.butImg.color = 0xffffff;
    this.button.funOut = funOut;
    this.button.funOver = funOver;
    this.button.boolKontur = this.butImg.boolKontur = true;
    this.button.konturColor = this.butImg.konturColor = pl102.color11;
    this.reposition();
  };

  this.reposition = function () {
    if (this._butPosition === 0) {
      this.button.y = 0;
      this.butImg.y = this.button.height;
    } else if (this._butPosition === 1) {
      this.butImg.y = 0;
      this.button.y = this.butImg.height;
    }
  };

  this.funDown = function () {
    self.activ = !self.activ;
    if (self.fun) self.fun();
  };

  this.setStile = function (_id) {
    if (_id === 1) {
      this.button.label.setParam(12, this.button.label.color, false);
    }
  }; // для выполняния Аут/овер на двух связанных компонентах


  var doEvent = true;
  var doEvent1 = true;

  function funOut(e) {
    if (doEvent === false) return;
    doEvent = false;
    if (this.butImg === undefined) self.butImg.mouseOut(e);else self.button.mouseOut(e);
    doEvent = true;
  }

  function funOver(e) {
    if (doEvent1 === false) return;
    doEvent1 = false;
    if (this.butImg === undefined) self.butImg.mouseOver(e);else self.button.mouseOver(e);
    doEvent1 = true;
  }

  this.init();
}

PLImageWithBut.prototype = Object.create(PIXI.Container.prototype);
PLImageWithBut.prototype.constructor = PLImageWithBut;
Object.defineProperties(PLImageWithBut.prototype, {
  activ: {
    set: function set(value) {
      if (this._activ === value) return;
      this._activ = value;
      this.button.activ = this._activ;
    },
    get: function get() {
      return this._activ;
    }
  },
  width: {
    set: function set(value) {
      if (this._width === value) return;
      this._width = value;
      this.panel.width = this._width;
      this.button.width = this._width;
      this.butImg.width = this._width;
    },
    get: function get() {
      return this._width;
    }
  },
  height: {
    set: function set(value) {
      if (this._height === value) return;
      this._height = value; // картинка подстраиваться под высоту

      this.panel.height = this._height;
      this.butImg.height = this._link === '' ? 0 : this._height - this.button.height;
      this.reposition();
    },
    get: function get() {
      return this._height;
    }
  },
  link: {
    set: function set(value) {
      if (this._link === value) return;
      this._link = value;
      this.butImg.loadImeg(this._link);
    },
    get: function get() {
      return this._link;
    }
  },
  text: {
    set: function set(value) {
      if (this._text === value) return;
      this._text = value;
      this.button.text = this._text;
    },
    get: function get() {
      return this._text;
    }
  },
  hImage: {
    set: function set(value) {
      if (this._hImage === value) return;
      this._hImage = value;
      this.butImg.height = this._link === '' ? 0 : this._hImage;
      this._height = this._hImage + this._hButton;
      this.panel.height = this._height;
      this.reposition();
    },
    get: function get() {
      return this._hImage;
    }
  },
  hButton: {
    set: function set(value) {
      if (this._hButton === value) return;
      this._hButton = value;
      this.button.height = this._hButton;
      this._height = this._hImage + this._hButton;
      this.panel.height = this._height;
      this.reposition();
    },
    get: function get() {
      return this._hButton;
    }
  },
  butPosition: {
    set: function set(value) {
      if (this._butPosition === value) return;
      this._butPosition = value;
      this.reposition();
    },
    get: function get() {
      return this._butPosition;
    }
  },
  activMouse: {
    set: function set(value) {
      if (this._activMouse === value) return;
      this._activMouse = value;
      this.button.activMouse = this._activMouse;
      this.butImg.activMouse = this._activMouse;
    },
    get: function get() {
      return this._activMouse;
    }
  }
});

/***/ }),

/***/ "./pl102/src/plPlus/ScrollPane.js":
/*!****************************************!*\
  !*** ./pl102/src/plPlus/ScrollPane.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScrollPane = ScrollPane;

function ScrollPane(cont, _x, _y) {
  // 'use strict';
  PIXI.Container.call(this);
  this.type = 'ScrollPane';
  var self = this;

  if (cont) {
    cont.addChild(this);
    this.x = _x;
    this.y = _y;
  }

  this._debug = false;
  this._isCutMask = true; // режит маска или нет

  this._otstup = 0; //

  this._width = 100; // размер панели

  this._height = 100; // размер панели

  this._widthContent = 100; // размер контента

  this._heightContent = 100; // размер контента
  // this._tipPosScroll = 0; // тип позыцыонирования скролов (0 - лево верх, 1 - право верх, 2 - право низ, 3 - лево низ)

  this._isInside = false; // где скролы внутри ?

  this._sizeScroll = 7; // размер скролов

  this._boolPositScrol = true; // выворот положений

  this._boolPositOtctup = false; // внутурь/наружу

  this.arrDom = []; // PLDOMElement

  this.cont = new PIXI.Container(); //

  this.content = new PIXI.Container(); //

  this.gmask = new PIXI.Graphics();
  this.graphics = new PIXI.Graphics(); // for debug

  this.cont.addChild(this.content);
  this.addChild(this.graphics);
  this.addChild(this.gmask);
  this.addChild(this.cont); // Вертикальный и горизонтальный скролл

  this.scrollBarH = new PLScrollBarH(this, 0, 0, function () {
    if (this.widthContent > this.width) {
      self.content.x = -this.scrolValue;
    }

    updateMaskHtml();
  });
  this.scrollBarH.graphics.buttonMode = true;
  this.scrollBarV = new PLScrollBarV(this, 0, 0, function () {
    if (this.heightContent > this.height) {
      self.content.y = -this.scrolValue;
    }

    updateMaskHtml();
  });
  this.scrollBarV.graphics.buttonMode = true;

  this.updateArrDom = function () {
    this.arrDom = getArrPLDOMElement(this.content);
    updateMaskHtml();
  };

  this.update = function () {
    this.updateArrDom();
  };

  this.addContent = function (cont) {
    this.content.addChild(cont);
    this.updateArrDom();
    updateMaskHtml();
  };

  this.removeContent = function (cont) {
    this.content.removeChild(cont);
    this.updateArrDom();
    updateMaskHtml();
  };

  var ii, jj, ww, hh, bat, sahLoad, wM, hM, sliderOtstup;

  this.draw = function () {
    this.graphics.clear();
    this.graphics.beginFill(0x3232ff, 0.4);
    this.graphics.drawRect(0, 0, this._width, this._height);
    this.graphics.visible = this._debug;
    ww = this._widthContent;
    hh = this._heightContent;
    if (ww > this._width) this.scrollBarH.visible = true;else this.scrollBarH.visible = false;
    if (hh > this._height) this.scrollBarV.visible = true;else this.scrollBarV.visible = false;
    this.scrollBarV.width = this._sizeScroll;
    this.scrollBarH.height = this._sizeScroll;
    this.scrollBarV.height = this._height;
    this.scrollBarH.width = this._width;
    this.scrollBarH.widthContent = ww;
    this.scrollBarV.heightContent = hh;
    this.scrollBarH.scrolValue = -this.content.x;
    this.scrollBarV.scrolValue = -this.content.y;
    this.content.x = -this.scrollBarH.scrolValue;
    this.content.y = -this.scrollBarV.scrolValue;

    if (ww > this._width) {
      wM = this._width;
    } else {
      wM = ww;
    }

    if (hh > this._height) {
      hM = this._height;
    } else {
      hM = hh;
    }

    this.ww = ww;
    this.wM = wM;
    this.hh = hh;
    this.hM = hM;

    if (this._boolPositScrol) {
      if (this._boolPositOtctup) {
        this.scrollBarH.y = hM - this.otstup - this._sizeScroll;
        this.scrollBarV.x = wM - this.otstup - this._sizeScroll;
      } else {
        this.scrollBarH.y = hM + this.otstup;
        this.scrollBarV.x = wM + this.otstup;
      }
    } else {
      if (this._boolPositOtctup) {
        this.scrollBarH.y = this.otstup;
        this.scrollBarV.x = this.otstup;
      } else {
        this.scrollBarH.y = -this.otstup - this._sizeScroll;
        this.scrollBarV.x = -this.otstup - this._sizeScroll;
      }
    }

    this.gmask.clear();
    this.gmask.beginFill(0x00ff00, 0);
    this.gmask.drawRect(0, 0, this._width, this._height);

    if (self._isCutMask) {
      this.content.mask = this.gmask;
    } else {
      this.content.mask = null;
    }

    updateMaskHtml();
  };

  this.innerRect = new PIXI.Rectangle();
  this.point = new PIXI.Point();
  this.point1 = new PIXI.Point();
  var p = new PIXI.Point();

  var _scaleCoeff;

  function updateMaskHtml() {
    // режим маску на дом елементах
    if (pl102.devas == false) _scaleCoeff = 1 / window.devicePixelRatio;else _scaleCoeff = 1;
    p.set(0, 0);
    var pg = self.toGlobal(p);
    p.set(self._width, self._height);
    var pg1 = self.toGlobal(p);
    pg1.x *= _scaleCoeff;
    pg1.y *= _scaleCoeff;
    pg.x *= _scaleCoeff;
    pg.y *= _scaleCoeff;

    for (var i in self.arrDom) {
      var plDom = self.arrDom[i];

      plDom._recursivePostUpdateTransform();

      var element = plDom.htmlElement;
      var r = element.getBoundingClientRect();
      var scaleX = r.width / element.offsetWidth;
      var scaleY = r.height / element.offsetHeight;
      var niz = (pg1.y - r.y) / scaleY;
      var verh = (pg.y - r.y) / scaleY;
      var rig = (pg1.x - r.x) / scaleX;
      var lef = (pg.x - r.x) / scaleX;

      if (self._isCutMask) {
        element.style.clip = 'rect(' + verh + 'px, ' + rig + 'px, ' + niz + 'px, ' + lef + 'px)';
      } else {
        element.style.clip = null;
      }
    }
  }

  function getArrPLDOMElement(content) {
    var arr = [];

    if (content.type === 'PLDOMElement') {
      arr.push(content);
      return arr;
    } else {
      for (var i in content.children) {
        arr = arr.concat(getArrPLDOMElement(content.children[i]));
      }
    }

    return arr;
  }

  if (this._debug) {
    var cont22 = new PIXI.Container(); // cont22.scale.set(0.5, 0.5);

    new PLInput(cont22, 0, 0);
    new PLInput(cont22, 0, 40);
    new PLInput(cont22, 30, 80);
    new PLInput(cont22, 50, 120);
    new PLInput(cont22, 0, 160);
    var cont221 = new PIXI.Container();
    cont221.position.set(120, 50);
    cont221.scale.set(0.5, 0.5);
    new PLInput(cont221, 0, 0);
    new PLInput(cont221, 0, 40);
    new PLInput(cont221, 30, 80);
    new PLInput(cont221, 50, 120);
    new PLInput(cont221, 0, 160);
    cont22.addChild(cont221);
    var cont2211 = new PIXI.Container();
    cont2211.position.set(200, 50);
    cont2211.scale.set(2.5, 2.5);
    new PLInput(cont2211, 0, 0);
    new PLInput(cont2211, 0, 40);
    new PLInput(cont2211, 30, 80);
    new PLInput(cont2211, 50, 120);
    new PLInput(cont2211, 0, 160);
    cont22.addChild(cont221);
    cont22.addChild(cont2211);
    this.addContent(cont22);
    this.g = new PIXI.Graphics(); // for debug типа внешний контейнер который нужно здвигать

    this.addContent(this.g);
    this._heightContent = 300;
    this._widthContent = 360;
    this.g.clear();
    this.g.beginFill(0xdd00dd, 0.2);
    this.g.drawRect(0, 0, this._widthContent, this._heightContent);
    this.g.drawCircle(this._widthContent / 2, this._heightContent / 2, 10);
  }

  var hhh, www;
  this.sahDelta = 20;

  this.mousewheel = function (e) {
    if (self.scrollBarV.visible) {
      self.scrollBarV.scrolValue -= 10 * e.delta;
      self.scrollBarV.fun();
    } else if (self.scrollBarH.visible) {
      self.scrollBarH.scrolValue -= 10 * e.delta;
      self.scrollBarH.fun();
    }

    updateMaskHtml();
  };

  this.draw();
  this.boolWheel = true;
}

ScrollPane.prototype = Object.create(PIXI.Container.prototype);
ScrollPane.prototype.constructor = ScrollPane;
Object.defineProperties(ScrollPane.prototype, {
  boolWheel: {
    // включить\выключить прокрутку колесом
    set: function set(value) {
      if (this._boolWheel == value) return;
      this._boolWheel = value;
      this.interactive = this._boolWheel;

      if (this._boolWheel == true) {
        pl102Wheel.on(this, 'mousewheel', this.mousewheel);
      } else {
        pl102Wheel.off(this, 'mousewheel', this.mousewheel);
      }
    },
    get: function get() {
      return this._boolWheel;
    }
  },
  boolPositScrol: {
    // вынести\внести отступ за элемент
    set: function set(value) {
      if (this._boolPositScrol == value) return;
      this._boolPositScrol = value;
      this.draw();
    },
    get: function get() {
      return this._boolPositScrol;
    }
  },
  boolPositOtctup: {
    // зеркальное отображение слайдеров
    set: function set(value) {
      if (this._boolPositOtctup == value) return;
      this._boolPositOtctup = value;
      this.draw();
    },
    get: function get() {
      return this._boolPositOtctup;
    }
  },
  sizeScroll: {
    set: function set(value) {
      if (this._sizeScroll == value) return;
      this._sizeScroll = value;
      this.draw();
    },
    get: function get() {
      return this._sizeScroll;
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
  widthContent: {
    set: function set(value) {
      if (this._widthContent == value) return;
      this._widthContent = value;
      this.draw();
    },
    get: function get() {
      return this._widthContent;
    }
  },
  heightContent: {
    set: function set(value) {
      if (this._heightContent == value) return;
      this._heightContent = value;
      this.draw();
    },
    get: function get() {
      return this._heightContent;
    }
  },
  debug: {
    set: function set(value) {
      if (this._debug == value) return;
      this._debug = value;
      this.graphics.visible = value;
    },
    get: function get() {
      return this._debug;
    }
  },
  // tipPosScroll: {
  //     set: function(value) {
  //         value = Math.max(0, Math.min(Math.round(value % 4), 3));
  //         if (this._tipPosScroll == value) return;
  //         this._tipPosScroll = value;
  //         this.draw();
  //     },
  //     get: function() {
  //         return this._tipPosScroll;
  //     }
  // },
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
  // isInside: {
  //     set: function(value) {
  //         if (this._isInside == value) return;
  //         this._isInside = value;
  //         this.draw();
  //     },
  //     get: function() {
  //         return this._isInside;
  //     }
  // },
  isCutMask: {
    set: function set(value) {
      if (this._isCutMask == value) return;
      this._isCutMask = value;
      this.draw();
    },
    get: function get() {
      return this._isCutMask;
    }
  }
});

/***/ }),

/***/ "./pl102/src/plPlus/SettingsBig.js":
/*!*****************************************!*\
  !*** ./pl102/src/plPlus/SettingsBig.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SettingsBig = SettingsBig;
exports.PLGADM = PLGADM;
exports.ContentMenuPlus = ContentMenuPlus;
exports.StringDrag = StringDrag;
exports.StringInput = StringInput;

var _PLGalleryADM = __webpack_require__(/*! ./PLGalleryADM.js */ "./pl102/src/plPlus/PLGalleryADM.js");

/** @module planer */

/**
 * Управление компонентами менюшек, создание компонентов и настройка.
 * @class
 * @param {Container} _cont - pixi контейнер.
*/
function SettingsBig(_cont) {
  var self = this;
  this.type = 'SettingsBig';
  this.content = new PIXI.Container();
  this.content.type = 'SettingsBigCont';
  this.content.settingsBig = this;
  if (_cont != undefined) _cont.addChild(this.content);
  this.dinFun;
  this._otstup = 10;
  this._width = 200;
  this._height = 200;
  this._heightMax = 1000;
  this._value = undefined;
  this.drawArrFon = true;
  this.finalHeight = 200;
  this.arrComp = [];
  this.arrComp2 = [];
  this.objComp = {};
  this.tipRide = false;
  this.arrF = [];
  this.arrayFon = new PLArrayFon(this.content);
  this.arrayFon.width = this._width - 1;
  this.arrayFon.x = 0.5;
  this.arrayFon.alphaIm = 0.12;
  this.debugRect = false;
  this.shagY = 0;
  this.korectText = null;
  var component;
  var shagX = 0;
  var mawH = 0;
  var kolS;
  var shaSlid;
  var predComp = 'null'; // предидущий компонент

  var compPH = 0; // высота фоновых панелей

  var startP = 0; // точки позиции фоновых панелей по Y

  var miniOtstup = 2; // отсуп

  /**
   * Сборка менюшки, позиционирование компонентов и фона arrayFon под компонентами.
  */

  this.draw = function () {
    this.getBigH();
    if (this.debugRect) this.drawDebugRect();
    shaSlid = 0;
    this.shagY = this._otstup;
    this.arrF = [];
    this.arrF[0] = 0;
    this.arrF[1] = 2;
    predComp = 'null';
    compPH = 0;
    startP = 0;
    this.arrDividingLine.forEach(function (item) {
      item.visible = false;
    });

    for (var i = 0; i < this.arrComp2.length; i++) {
      if (this.arrComp2[i].visible !== false) {
        var bbwidth = true;

        if (this.arrComp2[i].funDrag !== undefined) {
          if (this.arrComp2[i].funDrag(this, i) === true) continue;
        }

        if (this.arrComp2[i].type === 'PLCheckBoxImage') {
          if (this.arrComp2[i + 1] != undefined) {
            if (this.arrComp2[i + 1].type == 'PLCheckBoxImage') {
              bbwidth = false;
            }
          }
        }

        if (this.arrComp2[i].type === 'SliderImg') {
          if (this.arrComp2[i + 1] != undefined && ++shaSlid % 2 != 0) {
            if (this.arrComp2[i + 1].type == 'SliderImg') {
              bbwidth = false;
            }
          }
        }

        if (this.arrComp2[i].type === 'SliderImg') {
          this.arrComp2[i].x = this._otstup + this._otstup / 2;

          if (i !== 0) {
            if (this.arrComp2[i - 1].type === 'SliderImg' && shaSlid % 2 === 0) {
              this.arrComp2[i].x = this._width / 2 + this._otstup + this._otstup / 2;
              this.addDividingLine(this._width / 2, this.shagY - this._otstup + 2, this.arrComp2[i].height + this._otstup * 2 - 4);
            }
          }
        }

        if (this.arrComp2[i].type === 'PLButSwitch') {
          this.shagY -= this._otstup - miniOtstup;
        } // -------------------------------PLColorPalette--------------------------------------


        var isCPa = this.arrComp2[i].type === 'PLColorPalette';
        var isCPaPiv = this.arrComp2[i].type === 'MColorPalettePicker';

        if (isCPa || isCPaPiv) {
          this.shagY -= this._otstup;
        } // ------------------------------------------------------------------------------------------------


        if (bbwidth) {
          // позиции и высота фонов компонентам
          if (predComp === this.arrComp2[i].type || this.arrComp2[i].type.indexOf(predComp) !== -1) {
            compPH += this.arrComp2[i].height + this._otstup;
            this.arrF[this.arrF.length - 1] = compPH;
          } else {
            if (predComp === 'null' || i === this.arrComp2.length - 1 && this.arrComp2[this.arrComp2.length - 1].type == 'PLPachkaButton2') {
              startP = this.shagY;
            } else {
              this.shagY += this._otstup;
              startP = this.shagY;
            }

            this.arrF.push(startP);
            this.arrF.push(this.arrComp2[i].height + this._otstup);
            compPH = this.arrComp2[i].height + this._otstup;
          }

          predComp = this.arrComp2[i].type; // шаг компонентов по Y

          this.arrComp2[i].y = this.shagY;
          this.shagY += this.arrComp2[i].height + this._otstup;
        } else {
          this.arrComp2[i].y = this.shagY;
        }

        if (this.debugRect) this.drawDebugRect(this.arrComp2[i].y, this.arrComp2[i].height);

        if (this.arrComp2[i].type === 'PLPachkaButton2' || this.arrComp2[i].type === 'PLButSwitch') {
          this.arrF[this.arrF.length - 1] -= this._otstup;
          this.shagY -= this._otstup;

          if (this.arrComp2[i].type === 'PLButSwitch') {
            this.arrF[this.arrF.length - 1] += miniOtstup;
          }
        } // -------------------------------PLColorPalette--------------------------------------


        if (isCPa || isCPaPiv) {
          this.arrF[this.arrF.length - 1] -= this._otstup;
          this.shagY -= this._otstup;
        } // ------------------------------------------------------------------------------------------------

      }
    } // добавляем массив с точками для отрисовки фона компонентам


    if (this.drawArrFon == true) this.arrayFon.setArrFon(this.arrF); // высота менюшки

    this.finalHeight = this.shagY;
    this.draw2();
  };

  this.arrDividingLine = [];

  this.addDividingLine = function (x, y, height) {
    var graphics = null;
    this.arrDividingLine.forEach(function (item) {
      if (item.visible === false) {
        graphics = item;
        item.visible = true;
      }
    }, this);

    if (graphics === null) {
      graphics = new PIXI.Graphics();
      this.arrDividingLine.push(graphics);
      this.content.addChild(graphics);
    }

    graphics.clear();
    graphics.beginFill('0xaeaeae');
    graphics.drawRect(0, 0, 1.5, height);
    graphics.position.set(x, y);
  };

  var debugGraph;

  this.drawDebugRect = function (_y, _h) {
    if (debugGraph == undefined) {
      debugGraph = new PIXI.Graphics();
      this.content.addChild(debugGraph);
    }

    if (_y == undefined) {
      debugGraph.clear();
      return;
    }

    debugGraph.lineStyle(0.5, 0xff0000);
    debugGraph.drawRect(0, _y, this._width, _h);
  };

  this.getHForGal = function () {};

  this.draw2 = function () {};

  var colMax = 0;
  var colMin = 0;
  var actCol = true; // false;

  var indC = -1;
  /*
   * Росчет и настройка компонентов с динамичесским изминением высторы.
   * К примеру галереи, расчет высоты и настройка их.
  */

  this.getBigH = function () {
    mawH = this._otstup * 2;
    kolS = 0;
    indC = -1;
    actCol = true;
    var bButSwitch = false; // есть ли переключатель "цвет/текстура" или нет

    for (var i = 0; i < this.arrComp2.length; i++) {
      if (this.arrComp2[i].visible && this.arrComp2[i].type === 'PLButSwitch') {
        bButSwitch = true;
        i = this.arrComp2.length;
      }
    } // считаем максимумы галерей


    for (var i = 0; i < this.arrComp2.length; i++) {
      if (this.arrComp2[i].visible != false) {
        switch (this.arrComp2[i].type) {
          case 'PLGADM':
            kolS += this.arrComp2[i].currentHeight + this._otstup;
            break;

          case 'GalleryAdm':
            kolS += this.arrComp2[i].corentHeight + this._otstup;
            break;

          case 'PLColorUn':
            colMax = this.arrComp2[i].heightMax + this._otstup;
            colMin = this.arrComp2[i].heightMin + this._otstup;
            break;

          default:
            mawH += this.arrComp2[i].height + this._otstup * 2;
        }
      }
    }

    mawH -= this._otstup;
    kolS -= this._otstup;
    var g = mawH + kolS;
    var s = mawH + kolS;
    var hMinHGAll = this._height - mawH; // высота галлереи, когда ее нужно уменьшить

    if (!bButSwitch) {
      g += colMax;
      s += colMin;
      hMinHGAll -= colMin;
    }

    for (var i = 0; i < this.arrComp2.length; i++) {
      if (this.arrComp2[i].visible !== false) {
        var type = this.arrComp2[i].type;

        if (type === 'PLGADM' || type === 'GalleryAdm') {
          if (g > this._height) {
            actCol = false;

            if (s > this._height) {
              this.arrComp2[i].height = hMinHGAll;
            } else {
              this.arrComp2[i].height = kolS;
            }
          } else {
            actCol = true;
            this.arrComp2[i].height = kolS;
          }
        }

        if (this.arrComp2[i].type == 'PLColorUn') indC = i;
        if (indC != -1) this.arrComp2[indC].boolBig = actCol;
      }
    }
  };

  var bbb;
  /**
   * Скрытие компонентов.
   * @param {Array} _arr - массив с элементами что скрываем или показываем.
   * @example ['compName', value, 'compName', value] compName => name компонента, value => true/false
  */

  this.setVisi = function (_arr) {
    bbb = false;

    for (var i = 0; i < _arr.length; i += 2) {
      if (this.objComp[_arr[i]] != undefined) {
        if (this.objComp[_arr[i]].visible != _arr[i + 1]) {
          bbb = true;
          this.objComp[_arr[i]].visible = _arr[i + 1];
        }
      }
    }

    if (bbb == true) {
      this.draw();
    }

    return bbb;
  };

  this.setValue = function (_id, _value, _num) {
    if (this.objComp[_id] != undefined) this.objComp[_id][_value] = _num;
  };

  this.getValue = function (_id, _value) {
    return this.objComp[_id][_value];
  };

  this.getComp = function (_id, _value) {
    return this.objComp[_id];
  };

  this.getIdIsName = function (_name) {
    for (var s in this.objComp) {
      if (this.objComp[s].param != undefined) {
        if (this.objComp[s].param == _name) {
          return this.objComp[s];
        }
      }
    }

    return null;
  };

  this.object;

  this.setObj = function (_obj) {
    this.object = _obj;
    this._value = _obj;
    this.korektObj();
    this.korektObjParam();
    this.draw();
  };

  this.korektObjParam = function () {
    if (this.object != undefined && this.object.param != undefined) {
      for (var i = 0; i < this.arrComp2.length; i++) {
        if (this.object.param[this.arrComp2[i].param] != undefined) {
          if (this.arrComp2[i].value != undefined) {
            this.updateMinMax(this.arrComp2[i], this.object.param);
            this.updateValueComp(this.arrComp2[i], this.object.param);
          }
        }
      }
    }
  };

  this.updateValueComp = function (_comp, _obj) {
    if (_comp.value != _obj[_comp.param]) {
      if (self.object.arrComp[_comp.idArr2].arrValue && _comp.index !== undefined) {
        _comp.index = self.object.arrComp[_comp.idArr2].arrValue.indexOf(_obj[_comp.param]);
      } else {
        _comp.value = _obj[_comp.param];
      }
    }
  };

  this.updateMinMax = function (_comp, _obj) {
    if (_comp.min != undefined && _obj[_comp.param + 'Min'] != undefined) {
      if (_comp.min != _obj[_comp.param + 'Min']) {
        _comp.min = _obj[_comp.param + 'Min'];
      }
    }

    if (_comp.max != undefined && _obj[_comp.param + 'Max'] != undefined) {
      if (_comp.max != _obj[_comp.param + 'Max']) {
        _comp.max = _obj[_comp.param + 'Max'];
      }
    }
  };

  var b, ss;

  this.korektObj = function () {
    var i, j, ii;

    for (i = 0; i < this.arrComp.length; i++) {
      this.arrComp[i].visible = false;
    }

    this.arrComp2.length = 0;

    for (i = 0; i < this.object.arrComp.length; i++) {
      for (j = 0; j < this.arrComp.length; j++) {
        if (this.object.arrComp[i].name == this.arrComp[j].name) {
          this.arrComp[j].visible = true;

          if (this.object.arrComp[i].tipRide != undefined) {
            this.arrComp[j].tipRide = this.object.arrComp[i].tipRide;
          }

          if (this.object.arrComp[i].typeYesArray != undefined) {
            this.arrComp[j].typeYesArray = this.object.arrComp[i].typeYesArray;
          }

          if (this.object.arrComp[i].typeNotArray != undefined) {
            this.arrComp[j].typeNotArray = this.object.arrComp[i].typeNotArray;
          }

          if (this.object.arrComp[i].arrObj != undefined) {
            this.arrComp[j].clear();
            this.arrComp[j].setObj(this.object.arrComp[i].arrObj);
          }

          for (var key in this.object.arrComp[i]) {
            if (key in this.arrComp[j]) {
              this.arrComp[j][key] = this.object.arrComp[i][key];
            }
          }

          if (this.object.arrComp[i].title != undefined) {
            ss = this.getText(this.object.arrComp[i].title);
            this.arrComp[j].title = ss;
            this.arrComp[j].text = ss;
          }

          if (this.object.arrComp[i].plusText != undefined) {
            if (this.arrComp[j].plusText != undefined) {
              this.arrComp[j].plusText = this.getText(this.object.arrComp[i].plusText);
            }
          }

          if (this.object.arrComp[i].plusArrText != undefined) {
            if (this.arrComp[j].plusArrText != undefined) {
              var arr = this.arrComp[j].plusArrText;

              for (var z = 0; z < arr.length; z++) {
                arr[z] = this.getText(arr[z]);
              }

              this.arrComp[j].plusArrText = arr;
            }
          }

          if (this.object.param != undefined) {
            b = true;

            if (this.object.param[this.object.arrComp[i].param] != undefined) {
              if (self.object.arrComp[i].arrValue && this.arrComp[j].index !== undefined) {
                var ind = self.object.arrComp[i].arrValue.indexOf(this.object.param[this.object.arrComp[i].param]);
                this.arrComp[j].index = ind;
              } else {
                this.arrComp[j].value = this.object.param[this.object.arrComp[i].param];
              }
            } else {
              if (this.object.arrComp[i].param !== undefined) {
                this.arrComp[j].value = this.object.arrComp[i].param;
              }

              this.reDragObject(this.arrComp[j]);
            }

            this.arrComp[j].param = this.object.arrComp[i].param;
          } else {
            if (this.object.objSave != undefined) {
              if (this.object.objSave[this.object.arrComp[i].param] != undefined) {
                this.arrComp[j].value = this.object.objSave[this.object.arrComp[i].param];
                this.arrComp[j].param = this.object.arrComp[i].param;
              }
            }
          }

          this.arrComp[j].idArr2 = i;
          this.arrComp2.push(this.arrComp[j]);
        }
      }
    }

    this.draw();
  };

  this.compFinal;

  this.down = function () {
    self.compFinal = this;

    if (self.object.funPre != undefined) {
      self.object.funPre(this);
    }

    for (var i = 0; i < self.object.arrComp.length; i++) {
      if (self.object.arrComp[i].name == this.name) {
        var paramName = self.object.arrComp[i].param;
        var valueToSet = this.value;

        if (self.object.arrComp[i].arrValue && this.index !== undefined) {
          valueToSet = self.object.arrComp[i].arrValue[this.index];
        }

        if (paramName) {
          if (self.object.param != undefined) {
            self.object.param[paramName] = valueToSet;

            if (self.object.param.settingsBeside) {
              self.object.param.settingsBeside(paramName);
            }
          }

          if (self.object.array != undefined) {
            for (var j = 0; j < self.object.array.length; j++) {
              self.object.array[j][paramName] = valueToSet;
            }
          }

          if (self.object.objSave != undefined && self.object.objSave[paramName] !== undefined) {
            self.object.objSave[paramName] = valueToSet;
          }
        }

        if (self.object.fun != undefined) {
          self.object.fun(this);
        }

        if (self.dinFun != undefined) {
          self.dinFun();
        }
      }
    }

    if (this.type != 'SliderObject' && this.type != 'PLSliderBig' && this.type != 'PLSliderBigRad' && this.type !== 'SliderImg' && this.type !== 'PLCheckBox') {
      if (self.object.funComplit != undefined) {
        self.object.funComplit(this);
      }
    }
  };

  this.funComplit = function () {
    if (self.object.funComplit != undefined) {
      self.object.funComplit(this);
    }
  };

  this.funUp = function () {
    if (self.object.funUp != undefined) {
      self.object.funUp(this);
    }
  };

  this.funActMouse;
  var bb;

  this.setActMouse = function (_arr, bool) {};

  this.setActMouseAll = function (_bool) {
    for (var i = 0; i < this.arrComp2.length; i++) {
      this.arrComp2[i].activMouse = _bool;
    }

    for (var i = 0; i < this.arrComp.length; i++) {
      this.arrComp[i].activMouse = _bool;
    }
  };

  this.component;
  var component;
  var bwidth = true;

  this.addComponent = function (_type, _name, _param) {
    if (window[_type] === undefined) {
      console.warn('Не найден компонент при добавлении в SettingsBig => ' + _type);
      return;
    }

    component = null;

    if (_type == 'StringDrag') {
      component = new StringDrag(this.content, 0, 0, _param, this.down);
      component.width = this._width - this._otstup * 2;
    }

    if (_type == 'StringInput') {
      component = new StringInput(this.content, 0, 0, _param, this.down);
      component.width = this._width - this._otstup * 2;
    }

    if (_type == 'PLComboBox') {
      // при клике перебрасываетса в конец массива this.content.children
      component = new PLComboBox(this.content, 0, 0, [], this.down);
      component.x = this._otstup;
      component.width = this._width - this._otstup * 2;
      component.isAutoReversePanel = true;

      component.funChangeVisiblePanel = function () {
        for (var i = 0; i < self.arrComp2.length; i++) {
          if (self.arrComp2[i].idArr !== this.idArr) self.arrComp2[i].activMouse = !this.visiPanel;
        }

        if (self.funActMouse) self.funActMouse(this.visiPanel);
      };
    }

    if (_type == 'PLTextArea') {
      component = new PLTextArea(this.content, 0, 0, _param.text, this.down);
      component.height = _param.height;
      component.label.style.overflow = _param.labelStyle;
      component.label.maxLength = _param.maxLength;
      component.x = this._otstup;
      component.width = this._width - this._otstup * 2;
    }

    if (_type == 'PLCheckBox') {
      component = new PLCheckBox(this.content, 0, 0, _name, this.down);
      component.x = this._otstup;
      component.funUp = this.funComplit;
    }

    if (_type == 'PLLabel') {
      component = new PLLabel(this.content, 0, 0, _name, this.down);
      component.fontSize = 14;
      component.bold = false;
      component.x = this._otstup;
    }

    if (_type == 'PLImage') {
      component = new PLImage(this.content, 0, 0, null, function () {
        this.height = this.width / this.picWidth * this.picHeight;
        self.draw();
        if (self.funWH) self.funWH();
      });
      component.height = this._width - this._otstup * 2;
      component.width = this._width - this._otstup * 2;
      component.x = this._otstup;
      component.name = _name;
    }

    if (_type == 'PLButSwitch') {
      component = new PLButSwitch(this.content, 0, 0, this.down);

      if (_param != undefined) {
        if (_param.arr != undefined) component.setArr(_param.arr);
        if (_param.index != undefined) component.index = _param.index;
      }

      component.width = this._width; // - this._otstup * 2;

      component.x = 0; // this._otstup;
    }

    if (_type == 'PLPachkaCheckBoxImage') {
      component = new PLPachkaCheckBoxImage(this.content, 0, 0, this.down);

      if (_param != undefined) {
        if (_param.typeDown != undefined) component.typeDown = _param.typeDown;
        if (_param.arr != undefined) component.setArr(_param.arr);
        if (_param.index != undefined) component.index = _param.index;
      }

      component.width = this._width - this._otstup * 2;
      component.x = this._otstup;
      component.activContur = true;

      if (_param != undefined) {
        if (_param.width != undefined) {
          component.setWH(_param.width, _param.height);
        }

        if (_param.poved != undefined) component.poved = _param.poved;
        if (_param.isIlumActiv != undefined) component.isIlumActiv = _param.isIlumActiv;
      } // component.setStile(1, component.wh, component.wh);

    }

    if (_type == 'PLPachkaImgBut') {
      component = new PLPachkaImgBut(this.content, 0, 0, this.down);

      if (_param != undefined) {
        if (_param.typeDown != undefined) component.typeDown = _param.typeDown;
        if (_param.arr != undefined) component.setArr(_param.arr);
        if (_param.index != undefined) component.index = _param.index;
      }

      component.width = this._width - this._otstup * 2;
      component.x = this._otstup;
      component.activContur = true;

      if (_param != undefined) {
        if (_param.width != undefined) {
          component.setWH(_param.width, _param.height);
        }

        if (_param.otstup != undefined) {
          component.otstup = _param.otstup;
        }
      } // component.setStile(1, component.wh, component.wh);

    }

    if (_type == 'PLSwitchPachkaBut') {
      component = new PLSwitchPachkaBut(this.content, 0, 0, this.down);

      if (_param != undefined) {
        if (_param.arr != undefined) component.setArr(_param.arr);
        if (_param.arrButPosition != undefined) component.setButPositionArr(_param.arrButPosition);
        if (_param.height != undefined) component.height = _param.height;
      }

      component.width = this._width - this._otstup * 2;
      component.x = this._otstup;
    }

    if (_type == 'SliderImg') {
      var otst = 40;
      var min = 0;
      var max = 100;
      var okrug = 100;
      var typeValue = 'wh';

      if (_param != undefined) {
        if (_param.min != undefined) min = _param.min;
        if (_param.max != undefined) max = _param.max;
        if (_param.okrug != undefined) okrug = _param.okrug;
        if (_param.typeValue != undefined) typeValue = _param.typeValue;
      }

      component = new SliderImg(this.content, 0, 0);

      if (_param != undefined) {
        if (_param.setText != undefined) component.setText(_param.setText);
        component.name = name;
        component.fun = this.down;
        component.min = min;
        component.max = max;
        component.typeValue = typeValue;
        if (_param.link != undefined) component.link = _param.link;
      }

      component.okrug = okrug;
      component.x = this._otstup;
      component.width = (this._width - this._otstup * 2 - otst * 2) / 2; // todo ширина задается при создании

      component.funUp = this.funComplit;
    }

    if (_type == 'PLPachkaButton') {
      component = new PLPachkaButton(this.content, 0, 0, this.down);

      for (var i = 0; i < _param.arr.length; i += 2) {
        component.addComponent(_param.arr[i], _param.arr[i + 1]);
      }

      component.width = this._width - this._otstup * 2;
      component.setStile(1, component.wh, component.wh);
    }

    if (_type == 'PLPachkaButton2') {
      component = new PLPachkaButton2(this.content, 0, 0, this.down);

      for (var i = 0; i < _param.arr.length; i++) {
        component.addComponent(_param.arr[i]);
      }

      if (_param.loadBtn != undefined) component.array[_param.loadBtn].startFile('.jpg, .png, .bmp, .jpeg');
      if (_param.notUp != undefined) component.notUp = _param.notUp;
      component.width = this._width;
      component.setStile(1, component.wh, component.wh);
    }

    if (_type == 'PLPachkaButton3') {
      component = new PLPachkaButton3(this.content, 0, 0, this.down);
      component.setArr(_param);
      component.width = this._width;
      component.height = 27;

      for (var i = 0; i < component.arrayComp.length; i++) {
        component.arrayComp[i].hImage = 0;
      } // component.setStile(1, component.wh, component.wh);

    }

    if (_type == 'PLButton') {
      component = new PLButton(this.content, 1, 0, '', this.down);
      component.setStile(1, 64, 64);

      if (_param != undefined) {
        if (_param.title != undefined) component.text = _param.title;
        if (_param.link != undefined) component.loadImeg(_param.link);
        if (_param.file != undefined) component.startFile('.jpg, .png, .bmp, .jpeg');
      }

      component.width = this._width - 2;
    }

    if (_type == 'PLColorUn') {
      // при клике перебрасываетса в конец массива this.content.children
      component = new PLColorUn(this.content, 0, 0, this.down);
      component.visiblePanel = false;
      component.width = this._width - this._otstup * 2;
      component.x = this._otstup;

      component.funChangeVisiblePanel = function () {
        for (var i = 0; i < self.arrComp2.length; i++) {
          if (self.arrComp2[i].idArr !== this.idArr) self.arrComp2[i].activMouse = !this.pLColorPickerPanel.visible;
        }

        if (self.funActMouse) self.funActMouse(this.pLColorPickerPanel.visible);
      };

      if (_param != undefined) {
        if (_param.title != undefined) component.text = component.title;
        if (_param.boolBig != undefined) component.boolBig = component.boolBig;
        if (_param.visiblePanel != undefined) component.visiblePanel = component.visiblePanel;
      }

      if (self.draw2) self.draw2();
    }

    if (_type == 'PLColor') {
      // при клике перебрасываетса в конец массива this.content.children
      component = new PLColor(this.content, 0, 0, this.down);
      component.width = this._width - this._otstup * 2;
      component.x = this._otstup;

      component.funChangeVisiblePanel = function () {
        for (var i = 0; i < self.arrComp2.length; i++) {
          if (self.arrComp2[i].idArr !== this.idArr) self.arrComp2[i].activMouse = !this.pLColorPickerPanel.visible;
        }

        if (self.funActMouse) self.funActMouse(this.pLColorPickerPanel.visible);
      };

      if (_param != undefined) {
        if (_param.title != undefined) component.text = _param.title;
        if (_param.boolBig != undefined) component.boolBig = _param.boolBig;
        if (_param.visiblePanel != undefined) component.visiblePanel = _param.visiblePanel;
        if (_param.tipParam != undefined) component.tipParam = _param.tipParam;
      }

      if (self.draw2) self.draw2();
    }

    if (_type == 'PLColorTHREE') {
      // при клике перебрасываетса в конец массива this.content.children
      component = new PLColorTHREE(this.content, 0, 0, this.down);
      component.width = this._width - this._otstup * 2;
      component.x = this._otstup;

      component.funChangeVisiblePanel = function () {
        for (var i = 0; i < self.arrComp2.length; i++) {
          if (self.arrComp2[i].idArr !== this.idArr) self.arrComp2[i].activMouse = !this.pLColorPickerPanel.visible;
        }

        if (self.funActMouse) self.funActMouse(this.pLColorPickerPanel.visible);
        if (self.draw2) self.draw2();
      };

      if (_param != undefined) {
        if (_param.title != undefined) component.text = component.title;
      }
    }

    if (_type == 'MTypedColor') {
      // при клике перебрасываетса в конец массива this.content.children
      var title = null;
      var typePicker = null;
      var isActivCubePicker = null;

      if (_param !== undefined) {
        if (_param.title !== undefined) {
          title = _param.title;
        }

        if (_param.typePicker !== undefined) {
          typePicker = _param.typePicker;
        }

        if (_param.isActivCubePicker !== undefined) {
          isActivCubePicker = _param.isActivCubePicker;
        }
      }

      component = new MTypedColor(this.content, 0, 0, this.down, title, typePicker);
      component.width = this._width - this._otstup * 2;
      component.x = this._otstup;

      component.funChangeVisiblePanel = function () {
        for (var i = 0; i < self.arrComp2.length; i++) {
          if (self.arrComp2[i].idArr !== this.idArr) self.arrComp2[i].activMouse = !this.mColorPickerPanel.visible;
        }

        if (self.funActMouse) self.funActMouse(this.mColorPickerPanel.visible);
        if (self.draw2) self.draw2();
      };

      if (isActivCubePicker !== null) component.colPicActiv = isActivCubePicker;
    }

    if (_type === 'PLColorPalette') {
      component = new PLColorPalette(this.content, 0, 0, this.down);
      component.width = this._width;
      component.otstup = 10;
      component.panel.visible = false;
      component.funBtnAdd = this.down;
    }

    if (_type === 'MColorPalettePicker') {
      component = new MColorPalettePicker(this.content, 0, 0, this.down);
      component.width = this._width;
      component.otstup = 10;
      component.panel.visible = false;
      component.height = 164;
    }

    if (_type == 'PLSliderBig') {
      var min = 0;
      var max = 100;
      var okrug = 100;

      if (_param != undefined) {
        if (_param.min != undefined) min = _param.min;
        if (_param.max != undefined) max = _param.max;
        if (_param.okrug != undefined) okrug = _param.okrug;
      }

      component = new PLSliderBig(this.content, 0, 0, _name, this.down, min, max);

      if (_param != undefined) {
        if (_param.setText != undefined) component.setText(_param.setText);

        if (_param.isDinamMinMax != undefined) {
          component.isDinamMinMax = _param.isDinamMinMax;
        }
      }

      component.notInp = true;
      component.okrug = okrug;
      component.x = this._otstup;
      component.colorText = this.colorText;
      component.width = this._width - this._otstup * 2;
      component.funUp = this.funComplit;
    }

    if (_type == 'PLSliderBigRad') {
      component = new PLSliderBigRad(this.content, 0, 0, _name, this.down);

      if (_param != undefined) {
        if (_param.setText != undefined) component.setText(_param.setText);
      }

      component.funUp = this.funComplit;
      component.x = this._otstup;
      component.width = this._width - this._otstup * 2;
      component.colorText = this.colorText;
    }

    if (_type == 'PLButtonFullWidth') {
      component = new PLButtonFullWidth(this.content, 0, 0, this.down);
      component.x = this._otstup;
      component.width = this._width - this._otstup * 2;
      component.height = (this._width - this._otstup * 2) / 6;

      if (_param != undefined) {
        if (_param.arr != undefined) component.setArr(_param.arr);
      }
    }

    if (_type == 'PLGADM') {
      var vnutri = 2;
      component = new PLGADM(this.content, 0, 0, 'xz', this.down);
      component.boolLeft = true;
      var stepW = 4;
      var povedSlid = 0;

      if (_param != undefined) {
        if (_param.stepW != undefined) stepW = _param.stepW;
        if (_param.povedSlid != undefined) povedSlid = _param.povedSlid;
      } // stepW=6;


      component.stepW = stepW;
      component.povedSlid = povedSlid;
      component.visibleIndex = true;
      component.otstup = vnutri;
      component.wh = (this._width - this._otstup * (stepW - 1)) / stepW;
      component.visiItem = 1;
      component.x = this._otstup;
    }

    if (_type == 'GalleryAdm') {
      component = new GalleryAdm(this.content, 0, 0, this.down);
      var stepW = 4;

      if (_param != undefined) {
        if (_param.stepW != undefined) stepW = _param.stepW;
      }

      component.ii = stepW;
      component.x = this._otstup;
      component.width = this._width - this._otstup * 2;
    }

    if (_type == 'SliderObject') {
      var comand = 'new SliderObject(this.content, 0, 0, "xz",this.down)';
      component = eval(comand);
      var stepW = 4;

      if (_param != undefined) {
        if (_param.stepW != undefined) stepW = _param.stepW;
      }

      component.ii = stepW;
      component.x = this._otstup;
      component.width = this._width - this._otstup * 2;
      component.funUp = this.funComplit;
      component.funComplit = this.funComplit;
    }

    if (_type === 'VisualContentLoader') {
      var component = new window['VisualContentLoader'](this.content, 0, 0, this.down);

      if (_param != undefined) {
        if (_param.getFile != undefined) component.funGetFile = _param.getFile;
        if (_param.onload != undefined) component.onload = _param.onload;
      }

      component.x = this._otstup;
      component.width = this._width - this._otstup * 2;
      component.funUp = this.funComplit;
    }

    if (_type == 'PLInputWithText') {
      component = new PLInputWithText(this.content, 0, 0, '', this.down);

      if (_param != undefined) {
        if (_param.title != undefined) component.title = language.getTextByKey(_param.title);
        if (_param.setText != undefined) component.setText(_param.setText);
        if (_param.value != undefined) component.value = _param.value;
      }

      component.x = this._otstup;
    }

    if (_type == 'ContentMenuPlus') {
      component = new ContentMenuPlus(this.content, 0, 0, '', this.down);

      if (_param != undefined) {
        if (_param.content != undefined) component.content = _param.content;
      }

      component.x = this._otstup;
    }

    if (_type == 'NumericPanel') {
      component = new NumericPanel(this.content, 0, 0, this.down);

      if (_param != undefined) {
        if (_param.content != undefined) {
          component.content = _param.content;
        }

        if (_param.data !== undefined) {
          component.data = _param.data;
        }

        if (_param.value !== undefined) {
          component.value = _param.value;
        }
      }

      component.x = this._otstup;
      component.width = this._width - this.otstup * 2;
    }

    if (_param != undefined) {
      if (component != null) {
        if (_param.funDrag != undefined) component.funDrag = _param.funDrag;
      }
    }

    this.component = component; // if(bwidth==true)component.width=this._width-this.otstup*2;

    this.addComponent2(_type, _name, _param);
    this.component.visible = false;
    this.component.name = _name;
    this.component.idArr = this.arrComp.length;
    this.arrComp.push(this.component);
    this.objComp[_name] = this.component;
    this.drawComponent();
    return this.component;
  };

  this.component;

  this.addComponent2 = function (_type, _name, _param) {};

  this.addObject = function (_p, _p1) {};

  this.reDragObject = function (_component) {};

  this.drawComponent = function () {};

  this.getText = function (s) {
    if (this.korectText !== null) return this.korectText(s);
    return s;
  }; // ширина


  Object.defineProperty(this, 'otstup', {
    set: function set(value) {
      if (this._otstup != value) {
        this._otstup = value;
        this.drawComponent();
      }
    },
    get: function get() {
      return this._otstup;
    }
  }); // ширина

  Object.defineProperty(this, 'width', {
    set: function set(value) {
      if (this._width != value) {
        this._width = value;
        this.arrayFon.width = this._width - 2;
        this.drawComponent();
        if (this.funWH) this.funWH();
      }
    },
    get: function get() {
      return this._width;
    }
  }); // высота

  Object.defineProperty(this, 'height', {
    set: function set(value) {
      if (this._height != value) {
        this._height = value;
        this.draw();
        if (this.funWH) this.funWH();
      }
    },
    get: function get() {
      return this._height;
    }
  }); // высота

  Object.defineProperty(this, 'heightMax', {
    set: function set(value) {
      if (this._heightMax != value) {
        this._heightMax = value;
        this.drawComponent();
      }
    },
    get: function get() {
      return this._heightMax;
    }
  });
  Object.defineProperty(this, 'value', {
    set: function set(v) {
      this._value = v;
      var bb = true;
      if (v.fun != undefined) bb = false;
      if (bb == true) this.addObject(v, this.tipRide);else this.addObject(v.param, this.tipRide);
    },
    get: function get() {
      return this._value;
    }
  });
}

function PLGADM(cont, _x, _y, _klush, _fun, _funD, _funU) {
  _PLGalleryADM.PLGalleryADM.call(this, cont, _x, _y, _klush, _fun, _funD, _funU);

  this.type = 'PLGADM';
  var self = this;
  this.kont.color = 0x717171;
  this.kont.thickness = 2;
}

PLGADM.prototype = Object.create(_PLGalleryADM.PLGalleryADM.prototype);
PLGADM.prototype.constructor = PLGADM;
Object.defineProperties(PLGADM.prototype, {
  index: {
    set: function set(v) {
      if (this._index == v) return;
      this._index = v;
      this.kont.visible = false;

      if (this.arrBtn[this._index] != undefined) {
        this.kont.x = this.arrBtn[this._index].x;
        this.kont.y = this.arrBtn[this._index].y;
        this.kont.visible = true;
      } else {
        this.contentB.y = 0;
        this.slidV.scrolValue = 0;
      }

      if (this.arrBtn[v]) {
        this.slidV.scrolValue = this.arrBtn[v].y;
        this.contentB.y = -this.slidV.scrolValue;
      }
    },
    get: function get() {
      return this._index;
    }
  },
  height: {
    set: function set(v) {
      if (this._height == v) return;
      this._height = v;

      for (var i = 0; i < this.arrBtn.length; i++) {
        if (this.arrBtn[i].galeri) {
          this.arrBtn[i].galeri.height = this._height;
        }
      }

      this.draw();

      if (this.arrBtn[this._index]) {
        this.slidV.scrolValue = this.arrBtn[this._index].y;
        this.contentB.y = -this.slidV.scrolValue;
      }
    },
    get: function get() {
      return this._height;
    }
  }
});

function ContentMenuPlus(cont, _x, _y, _fun) {
  PIXI.Container.call(this);
  this.type = 'ContentMenuPlus';
  cont.addChild(this);
  this.x = _x || 0;
  this.y = _y || 0;
  this.fun = _fun;
  this._content = undefined;
}

ContentMenuPlus.prototype = Object.create(PIXI.Container.prototype);
ContentMenuPlus.prototype.constructor = ContentMenuPlus;
Object.defineProperties(ContentMenuPlus.prototype, {
  content: {
    // ширина
    set: function set(value) {
      this._content = value;
      this.addChild(this._content);
    },
    get: function get() {
      return this._content;
    }
  }
});

function StringDrag(cont, _x, _y, _title, _fun) {
  PIXI.Container.call(this);
  this.type = 'StringDrag';
  var self = this;
  cont.addChild(this);
  this.x = _x || 0;
  this.y = _y || 0;
  this.fun = _fun;
  this._width = 100;
  this._height = pl102.wh + 4;
  this._activJsonParam = false;
  this._isJSON = false;
  this.otstup = 2;
  this.wh = pl102.wh;
  var settingsBig = null;

  this.init = function () {
    this.input = new PLInput(this, this.otstup, this.otstup, 'null', function () {
      self._value = this.text;
      self.drag();
      self.fun();
    });
    this.input.width = (this._width - this.otstup * 2) / 2;
    this.input.x = this._width - this.input.width - this.otstup;

    this.input.funChange = function () {
      self._value = this.text;
    };

    this.but = new PLButton(this, this.otstup, this.otstup, ':', function () {
      self.fun();
    });
    this.but.setStile(1, this.wh * 2, this.wh);
    this.input.x = this.but.width + this.otstup * 2;
    this.butMenu = new PLButton(this, this.otstup, this.otstup, '', function () {
      self.activJsonParam = !self._activJsonParam;
    });
    this.butMenu.setStile(1, this.wh, this.wh); // ////

    this.paramObject = new PLParamObject(this, this.otstup, this.wh + this.otstup * 2, function () {
      self.value = JSON.stringify(this.objJSON);
      self.fun();
    });
    this.paramObject.visible = false;
    this.paramObject.w.drag = true;
    this.paramObject.width = this._width;
    this.paramObject.heightWindow = 225 - this.otstup;
    this.paramObject.funMinimize = this.funMinPO;
    this.paramObject.isScroll = true; // this.paramObject.funComplit = this.onDown;
    // this.paramObject.funUp = this.onUp;

    this.drag();
  };

  this.funMinPO = function () {
    self.activJsonParam = false;
  }; // проверка на является ли текст json-ом


  this.jsonCheck = function (_text) {
    if (_text === undefined) return false;
    if (_text === 'null') return false;
    if (typeof _text !== 'string') return false;
    if (_text.indexOf('":') === -1) return false;
    if (_text.indexOf('}') === -1) return false;

    try {
      JSON.parse(_text);
    } catch (e) {
      return false;
    }

    return true;
  };

  this.drag = function () {
    this.isJSON = this.jsonCheck(this._value);
    this.paramObject.width = this._width;
    this.input.width = (this._width - this.otstup) / 2;
    this.input.x = this._width - this.input.width;
    this.butMenu.x = this._width - this.input.width - this.butMenu.width - this.otstup;
    var h = 0;

    if (this._activJsonParam && this._isJSON) {
      h = this.paramObject.y + this.paramObject.w.height + pl102.wh;
    } else {
      h = pl102.wh + this.otstup * 2;
    }

    if (this.height !== h) {
      this.height = h;
      this.dragSettingsBig();
    }
  };

  this.dragSettingsBig = function () {
    if (settingsBig === null) settingsBig = lookForSettingsBig(this.parent);
    if (settingsBig !== null) settingsBig.draw();
  };

  var lookForSettingsBig = function lookForSettingsBig(_cont) {
    if (_cont === null) return null;
    if (_cont.settingsBig) return _cont.settingsBig;
    return lookForSettingsBig(_cont.parent);
  };

  this.init();
}

StringDrag.prototype = Object.create(PIXI.Container.prototype);
StringDrag.prototype.constructor = StringDrag;
Object.defineProperties(StringDrag.prototype, {
  text: {
    set: function set(value) {
      if (this._value === value) return;
      this.value = value;
      if (this._value == undefined) return;
      this.but.text = value.substr(0, 4) + ' >';
      this.input.text = value;
    },
    get: function get() {
      return this._value;
    }
  },
  activJsonParam: {
    set: function set(value) {
      if (this._activJsonParam === value) return;
      this._activJsonParam = value;
      this.butMenu.activ = this._activJsonParam;
      this.paramObject.visible = this._activJsonParam;
      this.drag();
    },
    get: function get() {
      return this._activJsonParam;
    }
  },
  isJSON: {
    set: function set(value) {
      // if (this._isJSON === value) return;
      this._isJSON = value;

      if (this._isJSON === true) {
        this.objJSON = JSON.parse(this._value);
        this.paramObject.addObject(this.objJSON, true);
      }

      this.butMenu.visible = this.isJSON;
      this.paramObject.visible = this.isJSON === false ? false : this._activJsonParam;
      this.but.width = this._width - this.input.width - this.otstup * 2;
      this.but.width = this._isJSON === true ? this.but.width - this.butMenu.width - this.otstup : this.but.width;
    },
    get: function get() {
      return this._isJSON;
    }
  },
  value: {
    set: function set(v) {
      if (this._value === v) return;
      this._value = v;
      this.input.text = this._value;
      this.activ = false;
      this.drag();
    },
    get: function get() {
      return this._value;
    }
  },
  width: {
    // ширина
    set: function set(value) {
      if (this._width === value) return;
      this._width = value;
      this.drag();
    },
    get: function get() {
      return this._width;
    }
  },
  height: {
    // высота
    set: function set(value) {
      if (this._height === value) return;
      this._height = value;
      this.drag();
    },
    get: function get() {
      return this._height;
    }
  },
  activMouse: {
    set: function set(value) {
      if (this._activMouse == value) return;
      this._activMouse = value;
      this.input.activMouse = value;
      this.but.activMouse = value;
    },
    get: function get() {
      return this._activMouse;
    }
  }
});

function StringInput(cont, _x, _y, _title, _fun) {
  PIXI.Container.call(this);
  this.type = 'StringDrag';
  var self = this;
  cont.addChild(this);
  this.x = _x || 0;
  this.y = _y || 0;
  this.fun = _fun;
  this._title = _title;
  this._text = '--';
  this._width = 100;
  this._height = pl102.wh;
  this.input = new PLInput(this, 0, 0, 'null', function () {
    self._value = this.text;
    self.fun();
  });
  this.label = new PLLabel(this, 0, 5, _title, function () {
    self.fun();
  });

  this.draw = function () {
    this.input.width = this._width * 2 / 3;
    this.input.x = this._width / 3;
  };

  this.draw();
}

StringInput.prototype = Object.create(PIXI.Container.prototype);
StringInput.prototype.constructor = StringInput;
Object.defineProperties(StringInput.prototype, {
  text: {
    // ширина
    set: function set(value) {
      if (this._text != value) {
        this._text = value; // this.label.text = value;
      }
    },
    get: function get() {
      return this._text;
    }
  },
  title: {
    // ширина
    set: function set(value) {
      if (this._title != value) {
        this._title = value;
        this.label.text = value;
      }
    },
    get: function get() {
      return this._title;
    }
  },
  value: {
    // ширина
    set: function set(v) {
      if (this._value != v) {
        this._value = v;
        this.input.text = this._value;
      }
    },
    get: function get() {
      return this._value;
    }
  },
  width: {
    // ширина
    set: function set(value) {
      if (this._width != value) {
        this._width = value;
        this.draw();
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
        this.draw();
      }
    },
    get: function get() {
      return this._height;
    }
  },
  activMouse: {
    set: function set(value) {
      if (this._activMouse == value) return;
      this._activMouse = value;
      this.input.activMouse = value; // this.but.activMouse = value;
    },
    get: function get() {
      return this._activMouse;
    }
  }
});

/***/ }),

/***/ "./pl102/src/plPlus/SliderObject.js":
/*!******************************************!*\
  !*** ./pl102/src/plPlus/SliderObject.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SliderObject = SliderObject;

function FotoMy() {
  window.fotoMy = this;
  this.renderer = new PIXI.autoDetectRenderer(100, 100, {
    antialias: true,
    transparent: true
  });
  this.fotoCont = new PIXI.Container();
  this.prevRendSize = {
    width: 256,
    height: 256
  };
  this.imageSize = {
    width: 64,
    height: 64
  };
  this.rectToPrint = {
    x: 0,
    y: 0,
    width: 64,
    height: 64
  };
  this.l = new PLLabel(null, 0, 0, '');
  this.l.fontSize = pl102.wh;

  this.getLinkText = function (s) {
    this.l.text = ' ' + s.toUpperCase();
    var rr = this.l.getRect();
    var s = rr.width;
    if (s < rr.height) s = rr.height;
    return this.getImAd(this.l, s, s);
  };

  this.getImAd = function (cont2d, _w, _h) {
    var mimeType = 'image/png'; // renderer = main.renderer;
    // добален resolution поскольку если у рендера
    // resolution больше 1 - масштабируеться сцена и фотография
    // получаеться меньше своего реального размера с черным фоном

    var resolution = this.renderer.resolution;
    this.renderer.resolution = 1;
    this.prevRendSize.width = this.renderer.width;
    this.prevRendSize.height = this.renderer.height;
    this.renderer.resize(Math.round(_w), Math.round(_h));
    this.renderer.render(cont2d);
    var b64 = this.renderer.view.toDataURL(mimeType, 1);
    this.renderer.resize(this.prevRendSize.width, this.prevRendSize.height);
    this.renderer.resolution = resolution;
    return b64;
  };
}

function SliderObject(cont, _x, _y, text, fun) {
  PIXI.Container.call(this);
  this.type = 'SliderObject';
  cont.addChild(this);
  var self = this;
  pl102.addElement(this);
  this.x = _x || 0;
  this.y = _y || 0;
  this._width = 200;
  this._height = pl102.wh;
  this._activMouse = true;
  this._value = null;
  this.tipRide = true;
  this.arrayParam = [];
  this.fun = fun;
  this._textWidth = -1;
  this.funComplit = undefined;
  this._min = 0;
  this._max = 100;
  this._okrug = 1;
  if (window.fotoMy === undefined) new FotoMy();
  this.label = new PLLabel(this, 0, 8, text);

  this.draw102 = function () {
    this.drag();
  };

  this.clear = function () {
    this.array = [];

    for (var i = 0; i < this.arrayCeh.length; i++) {
      this.arrayCeh[i].visible = false;
    }
  };

  var ww, www;

  this.drag = function () {
    if (this._textWidth === -1) {
      www = (this._width - this.label.curW) / this.array.length;

      for (var i = 0; i < this.array.length; i++) {
        this.array[i].width = www;
        this.array[i].x = this.label.curW + i * www;
      }
    } else {
      www = (this._width - this._textWidth) / this.array.length;

      for (var i = 0; i < this.array.length; i++) {
        this.array[i].width = www;
        this.array[i].x = this._textWidth + i * www;
      }
    }
  };

  this.dragDin = function () {
    self._value[this.param] = this.slider.value;
    if (self.fun) self.fun();
  };

  this.dragFin = function () {
    if (self.funComplit) self.funComplit();
  };

  this.array = [];
  this.arrayCeh = [];

  this.creat = function (s) {
    for (var i = 0; i < this.arrayCeh.length; i++) {
      if (this.arrayCeh[i].param == s) {
        this.arrayCeh[i].visible = true;
        this.arrayCeh[i].idArr = this.array.length;
        this.array.push(this.arrayCeh[i]);
        return this.arrayCeh[i];
      }
    }

    var ss = new DragGG(this, s, this.dragDin, this.dragFin);
    ss.idArrCeh = this.arrayCeh.length;
    ss.idArr = this.array.length;
    ss.slider.min = this.min;
    ss.slider.max = this.max;
    ss.slider.okrug = this.okrug;
    this.array.push(ss);
    this.arrayCeh.push(ss);
    return ss;
  };

  this.dragValue = function () {
    this.clear();
    var arrParam = this.gener(this._value);

    for (var i = 0; i < arrParam.length; i++) {
      this.creat(arrParam[i]).slider.value = this._value[arrParam[i]];
    }

    this.drag();
  };

  this.gener = function (o) {
    var a = [];

    for (var item in o) {
      if (typeof o[item] === 'number') {
        a.push(item);
      }
    }

    return a;
  };
}

SliderObject.prototype = Object.create(PIXI.Container.prototype);
SliderObject.prototype.constructor = SliderObject;
Object.defineProperties(SliderObject.prototype, {
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
      this._height = value; // this.draw102();
    },
    get: function get() {
      return this._height;
    }
  },
  activMouse: {
    set: function set(value) {
      if (this._activMouse == value) return;
      this._activMouse = value;

      for (var i = 0; i < this.arrayCeh.length; i++) {
        this.arrayCeh[i].slider.activMouse = value;
      }
    },
    get: function get() {
      return this._activMouse;
    }
  },
  text: {
    set: function set(value) {
      this._text = value;
      this.label.text = this._text;
    },
    get: function get() {
      return this._text;
    }
  },
  value: {
    set: function set(v) {
      this._value = v;
      this.dragValue();
    },
    get: function get() {
      return this._value;
    }
  },
  min: {
    set: function set(value) {
      if (this._min == value) return;
      this._min = value;

      for (var i = 0; i < this.arrayCeh.length; i++) {
        this.arrayCeh[i].slider.min = value;
      }
    },
    get: function get() {
      return this._min;
    }
  },
  max: {
    set: function set(value) {
      if (this._max == value) return;
      this._max = value;

      for (var i = 0; i < this.arrayCeh.length; i++) {
        this.arrayCeh[i].slider.max = value;
      }
    },
    get: function get() {
      return this._max;
    }
  },
  okrug: {
    set: function set(value) {
      if (this._okrug == value) return;
      this._okrug = value;

      for (var i = 0; i < this.arrayCeh.length; i++) {
        this.arrayCeh[i].slider.okrug = value;
      }
    },
    get: function get() {
      return this._okrug;
    }
  },
  textWidth: {
    set: function set(value) {
      if (this._textWidth == value) return;
      this._textWidth = value;
      this.draw102();
    },
    get: function get() {
      return this._textWidth;
    }
  }
});

function DragGG(par, _str, fun, funUp) {
  PIXI.Container.call(this);
  this.type = 'DragGG';
  par.addChild(this);
  var self = this;
  pl102.addElement(this);
  this._width = 100;
  this._height = pl102.wh;
  this.param = _str;
  this.fun = fun;
  this.funUp = funUp;
  this.slider = new SliderImgJek(this, 0, 0, '', function () {
    self.fun();
  }, -555, 555, null, fotoMy.getLinkText(_str));

  this.slider.funUp = function () {
    self.funUp();
  };

  this.draw102 = function () {
    this.slider.width = this._width;
  };
}

DragGG.prototype = Object.create(PIXI.Container.prototype);
DragGG.prototype.constructor = DragGG;
Object.defineProperties(DragGG.prototype, {
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
  }
});

function SliderImgJek(cont, _x, _y, _name, _fun, _min, _max, _title, _link) {
  PIXI.Container.call(this);
  this.type = 'SliderImg';
  cont.addChild(this);
  var self = this;
  pl102.addElement(this);
  this.fun = _fun;
  this.funUp;
  this.funDown;
  var debug = false;

  if (debug == true) {
    var graphDrag = new PIXI.Graphics();
    this.addChild(graphDrag);
  }

  this._activMouse = true;
  this._name = _name;
  this._link = _link != undefined ? _link : 'null';
  this._title = _title != undefined ? _title : 'null';
  this._min = _min != undefined ? _min : 0;
  this._max = _max != undefined ? _max : 100;
  this._editNot = false;
  this._plusText = null;
  this.x = _x || 0;
  this.y = _y || 0;
  this.otstup = 0; // отступ от кнопки к инпуту

  this.otstup1 = 6.5; // отступ текста что после инпута y

  this.otstup2 = 4; // отступ текста что после инпута x

  this.otstup3 = 6; // отступ текста что вместо инпута по y

  this.wh = pl102.wh;
  this.fontSize = 15; // текст на месте инпута

  this.fontSize1 = 13; // текст после инпута по y

  this._width = 100;
  this._height = this.wh;
  this._value = 0;
  this._okrug = 1;
  this._shag = 1; // увеличение\уменьшение value

  this._typeValue = 'wh'; // "angel" работаем с углом, "wh" размеры

  this.input = new PLInput(this, 0, 0, '0', function () {
    if (self._typeValue === 'angel') {
      setVal(this.value * calc.DEG2RAD);
    } else {
      setVal(this.value);
    }

    self.onDragEnd();
  });
  this.input.value = this._value;
  this.input.isWorkWithNumber = false;
  pl102.removeElement(this.input, true);
  this.btn = new PLButton(this, 0, 0);
  this.btn.label.visible = false;
  this.btn.loadImeg(this._link);
  this.btn.visiblePanel = false;
  this.btn.otstup = 0;

  this.btn.funDown = function () {
    self.onDragStart();
  };

  pl102.removeElement(this.btn, true);
  this.label = new PLLabel(this, 0, 0, ''); // после интпута дополнительный текст (типа система измерения)

  this.label.visible = false;
  this.label.bold = false;
  this.label.fontSize = this.fontSize1;
  this.label2 = new PLLabel(this, 0, 0, '');
  this.label2.visible = false;
  this.label2.bold = false;
  this.label2.fontSize = this.fontSize;
  this.labelTitle = new PLLabel(this, 0, 0, '');
  this.labelTitle.visible = false;
  this.labelTitle.bold = false;
  this.labelTitle.fontSize = this.fontSize;

  if (this._title != 'null') {
    this.labelTitle.visible = true;
    this.labelTitle.text = this._title;
  }

  pl102.removeElement(this.label, true);

  this.setText = function (_text) {
    this.plusText = _text;

    if (this.label == undefined) {
      this.label = new PLLabel(this, 0, 0, 'cm');
      pl102.removeElement(this.label, true);
    }

    this.label.visible = true;
    this.label.text = _text;
    this.draw();
  };

  var dragerImage = new DragerImage();
  var downValue = 0;
  var downLocal = new PIXI.Point();
  var moveLocal = new PIXI.Point();
  var vector = new PIXI.Point(); // вектор на сколько здвинули

  var angleLine = 3.92; // 225 градусов;// угол линии

  var vLineStart = new PIXI.Point();
  var vLineEnd = new PIXI.Point();
  var ot = 0; // уменьшение инпута на размер текста

  var rl; // рект label

  var dopY = 0;
  var rect;

  this.draw = function () {
    dopY = 0;
    rl = 0;
    this.btn.width = this.wh;
    this.btn.height = this.wh;

    if (this._title == 'null') {
      dopY = 0;
      this.height = this.wh;
    } else {
      rect = this.labelTitle.getRect();
      dopY = rect.height + this.otstup;
      this.height = this.wh + dopY;
    }

    this.btn.y = dopY;

    if (this.btn.image) {
      this.btn.image.width = this.wh;
      this.btn.image.height = this.wh;
    }

    if (this.label.visible) rl = this.textLength();
    this.input.width = this._width - this.wh - this.otstup - rl;
    this.input.height = this.wh;
    this.input.x = this.wh + this.otstup;
    this.input.y = dopY;
    rect = this.label2.getRect();
    if (this._editNot) this.label.x = this.input.x + rect.width + this.otstup2 * 2;else this.label.x = this.input.x + this.input.width + this.otstup2;
    this.label.y = this.otstup1 + dopY;
    rect = this.label.getRect();
    this.label2.x = this.wh + this.otstup;
    this.label2.y = this.otstup3 + dopY;
    if (graphDrag) this.drawDebug();
  }; // расчет отступа для текста после инпута


  this.textLength = function () {
    if (this.label == undefined) return 0;
    return this.label.getRect().width;
  };

  this.onDragStart = function () {
    downValue = self._value * self._shag;
    downLocal = self.toLocal(pl102.global);
    startMoveEvent();
    dragerImage.start(self.btn.link, pl102.global, 1, true);
    if (self.funDown) self.funDown();
  };

  var vectorInLine;
  var angleMove;
  var dist;
  var dMo = 0;

  this.onDragMove = function (e) {
    var p = pl102.global;
    if (e instanceof MouseEvent) p.set(e.clientX, e.clientY);
    moveLocal = self.toLocal(p);
    vector.set(moveLocal.x - downLocal.x, moveLocal.y - downLocal.y);
    calc.getVector(99999, angleLine, vLineStart);
    calc.getVector(-99999, angleLine, vLineEnd);
    vectorInLine = calc.isPointInLin(vLineStart, vLineEnd, vector, 99999, 99999);
    angleMove = calc.getTreeAngel(vLineStart, vectorInLine, vector); // с какой стороны (90 || -90)

    dist = calc.getDistance(vectorInLine, vector) * (angleMove < 0 ? -1 : 1);
    dMo = (downValue + dist) / self._shag;
    setVal(dMo);
    if (graphDrag) this.drawDebug();
  };

  this.onDragEnd = function (e) {
    stopMoveEvent();
    if (self.funUp) self.funUp();
  };

  this.input.funEnter = this.onDragEnd;
  var anZn = 0;

  this.filter = function (value) {
    if (typeof value === 'string') {
      value = value.replace(',', '.');
      var regEx = /((-)?\d+[\.\,]\d+)|(-)?\d+/g; // ввод только чисел с точкой

      if (value.match(regEx)) {
        var v = value.match(regEx)[0] * 1;
        if (v > this._max) v = this._max;
        if (v < this._min) v = this._min;
        return v;
      } else {
        return 1;
      }
    }

    return value;
  };

  this.updateText = function () {
    if (this._typeValue == 'wh') {
      this._value = this.filter(this._value);
      this.input.text = Math.round(this._value * this._okrug) / this._okrug;
      this.label2.text = Math.round(this._value * this._okrug) / this._okrug;
    }

    if (this._typeValue == 'angel') {
      anZn = Math.round(this._value * calc.RAD2DEG);
      if (anZn < 0) anZn = 360 + anZn;
      this.input.text = anZn;
      this.label2.text = anZn;
    }
  };

  this.drawDebug = function () {
    graphDrag.clear();
    graphDrag.lineStyle(1, 0xff0000);
    graphDrag.moveTo(vLineStart.x, vLineStart.y);
    graphDrag.lineTo(vLineEnd.x, vLineEnd.y);
    graphDrag.drawCircle(vector.x, vector.y, 5);
    graphDrag.drawCircle(vectorInLine.x, vectorInLine.y, 5);
    graphDrag.drawRect(0, 0, self._width, self._height);
  };

  this.kill = function () {
    this.input.kill();
  };

  this.changeActiv = function () {
    this.input.activMouse = this.activMouse;
    this.label.activMouse = this.activMouse;
    this.label2.visible = this.activMouse;
    this.btn.okDown = this.activMouse;
    this.btn.alpha = this.activMouse === true ? 1 : 0.5;
  };

  this.clearValue = function () {
    this._value = 0;
    this.label2.value = ''; // this.label2.visible = false;

    this.draw();
  };

  this.calculateShag = function () {
    // Общее уравнение прямой 8 * x + 190 * y − 1980 = 0
    var dY = this._max - this._min;
    var dX = (1980 - 8 * dY) / 190;
    this._shag = dX;
  };

  this.changeEdit = function () {
    if (this._editNot) {
      this.btn.alpha = 0.5;
      this.btn.okDown = false;
      this.input.visible = false; // this.label2.visible = true;
    } else {
      this.btn.alpha = 1;
      this.btn.okDown = true;
      this.input.visible = true; // this.label2.visible = false;
    }
  };

  function startMoveEvent() {
    stopMoveEvent();

    if (pl102.isMouseEvents) {
      document.body.addEventListener('mouseup', self.onDragEnd);
      document.body.addEventListener('mousemove', self.onDragMove);
    }

    if (pl102.isTouchEvents) {
      document.body.addEventListener('touchend', self.onDragEnd);
      document.body.addEventListener('touchmove', self.onDragMove);
    }
  }

  function stopMoveEvent() {
    if (pl102.isMouseEvents) {
      document.body.removeEventListener('mouseup', self.onDragEnd);
      document.body.removeEventListener('mousemove', self.onDragMove);
    }

    if (pl102.isTouchEvents) {
      document.body.removeEventListener('touchend', self.onDragEnd);
      document.body.removeEventListener('touchmove', self.onDragMove);
    }
  }

  function setVal(newv) {
    if (newv != self._value) {
      self.value = newv;
      if (self.fun) self.fun();
    }
  }

  this.draw();
}

SliderImgJek.prototype = Object.create(PIXI.Container.prototype);
SliderImgJek.prototype.constructor = SliderImgJek;
Object.defineProperties(SliderImgJek.prototype, {
  name: {
    set: function set(value) {
      if (this._name == value) return;
      this._name = value;
    },
    get: function get() {
      return this._name;
    }
  },
  title: {
    set: function set(value) {
      if (this._title == value) return;
      this._title = value;
      if (this._title == '') this._title = 'null';

      if (this._title != 'null') {
        this.labelTitle.visible = true;
        this.labelTitle.text = this._title;
        this.draw();
      } else {
        this.labelTitle.visible = false;
      }
    },
    get: function get() {
      return this._title;
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
    },
    get: function get() {
      return this._height;
    }
  },
  link: {
    set: function set(value) {
      if (this._link == value) return;
      this._link = value;
      this.btn.loadImeg(this._link);
    },
    get: function get() {
      return this._link;
    }
  },
  min: {
    set: function set(value) {
      if (this._min == value) return;
      this._min = value;
      this.calculateShag();
    },
    get: function get() {
      return this._min;
    }
  },
  max: {
    set: function set(value) {
      if (this._max == value) return;
      this._max = value;
      this.calculateShag();
    },
    get: function get() {
      return this._max;
    }
  },
  value: {
    set: function set(value) {
      if (this._value == value) return;
      this._value = value; // if (!this.label2.visible) this.label2.visible = true;

      if (this._value < this._min) this._value = this._min;
      if (this._value > this._max) this._value = this._max;
      this.updateText();
      this.draw();
    },
    get: function get() {
      return this._value;
    }
  },
  okrug: {
    set: function set(value) {
      if (this._okrug == value) return;
      this._okrug = value;
    },
    get: function get() {
      return this._okrug;
    }
  },
  shag: {
    set: function set(value) {
      if (this._shag == value) return;
      this._shag = value;
    },
    get: function get() {
      return this._shag;
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
  editNot: {
    set: function set(value) {
      if (this._editNot == value) return;
      this._editNot = value;
      this.changeEdit();
    },
    get: function get() {
      return this._editNot;
    }
  },
  typeValue: {
    set: function set(value) {
      if (this._typeValue == value) return;
      this._typeValue = value;
    },
    get: function get() {
      return this._typeValue;
    }
  },
  plusText: {
    set: function set(value) {
      if (this._plusText == value) return;
      this._plusText = value;
      this.setText(value);
    },
    get: function get() {
      return this._plusText;
    }
  }
});

/***/ }),

/***/ "./pl102/src/plPlus/VisualContentLoader.js":
/*!*************************************************!*\
  !*** ./pl102/src/plPlus/VisualContentLoader.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisualContentLoader = VisualContentLoader;

function VisualContentLoader(cont, _x, _y, _fun) {
  PIXI.Container.call(this);
  this.type = 'VisualContentLoader';
  var self = this;
  cont.addChild(this);
  this.funGetFile = null;
  this.onload = null;
  this.funUp = null;
  this.fun = _fun;
  this.x = _x || 0;
  this.y = _y || 0;
  this._otstup = 2;
  this._wh = pl102.wh;
  this._color = pl102.color1;
  this._width = 100;
  this._height = this._wh * 2 + this._otstup;
  this._link = 'null';
  this._value = this._link;
  this._title = null;
  this.linkError = 'resources/picNotFound.jpg';
  this.content = new PIXI.Container();
  this.addChild(this.content);
  var downloadUtill = new DownloadUtill();
  this.downloadUtill = downloadUtill;
  this.contur = new PLContur(this.content, 0, 0);
  this.contur.width = this._height;
  this.contur.height = this._height;
  this.contur.thickness = 0.5;
  this.contur.color = this._color;
  this.label = new PLLabel(this.content, 0, 0, '');
  this.image = new PLImage(this.content, 0, 0);

  this.image.funComplit = function () {
    var scale = Math.min(self._height / this.picWidth, self._height / this.picHeight);
    this.scale.set(scale, scale);
    this.width = this.picWidth;
    this.height = this.picHeight;
    var rx = self._height - this._width * scale;
    var ry = self._height - this._height * scale;
    this.x = rx === 0 ? rx : rx / 2;
    this.y = ry === 0 ? ry : ry / 2;
  };

  this.input = new PLInput(this.content, this._otstup, 0, 'null', function () {
    self.link = this.value;
    if (self.fun) self.fun();
  }); // this.input.activMouse = false;

  this.btnLoad = new PLButton(this.content, 0, 0, 'Load', function (base64) {
    self.label.visible = false;
    self.image.visible = false;
    if (self.onload) self.onload(true);

    if (self.funGetFile) {
      self.funGetFile(base64, function (_link) {
        trace('vghjgfhj', _link);
        var link = _link !== null ? _link : self.linkError;
        self.link = _link;
        trace('vghjgfhdsfgdsgfj', self.link);
        if (self.fun) self.fun();
        if (self.onload) self.onload(false);
      });
    } else {
      self.input.value = base64;
      self._link = base64;
      if (self.fun) self.fun();
      if (self.onload) self.onload(false);
    }

    var fileName = this.files[0].name.split('.');
    var exp = fileName[fileName.length - 1];

    if (exp === 'jd' || exp === 'JD' || exp === 'hdr' || exp === 'HDR') {
      self.label.visible = true;
      self.label.text = '.' + exp;
      self.label.pivot.set(self.label.curW / 2, self.label.curH / 2);
      self.label.position.set(self._height / 2, self._height / 2);
    } else {
      self.image.visible = true;
      self.image.link = base64;
    }
  });
  this.btnLoad.x = this._height + this._otstup;
  this.btnLoad.y = this._wh + this._otstup;
  this.btnLoad.startFile('.jpg, .png, .bmp, .jpeg, .hdr, .jd');
  this.localLoad = new PLButton(this.content, 0, 0, '', function () {
    if (self.input.value.indexOf('base64') !== -1) {
      this.downloadUtill.saveBase64(self.input.value);
    } else {
      console.warn('Сохранение с линка не добавлено!');
    }

    if (self.fun) self.fun();
  }, 'resources/images/adminAr/61.png');
  this.localLoad.width = this._wh;
  this.localLoad.activMouse = false;
  this.linkClear = new PLButton(this.content, 0, 0, 'X', function () {
    self.label.visible = false;
    self.link = 'null'; //self.link = self.linkError;

    if (self.fun) self.fun();
  });
  this.linkClear.width = this._wh;

  this.image.funError = function () {
    trace("vghjgfhj   bbb " + self.link);
    self.image.link = self.linkError; //self.link = self.linkError;
    //self.input.value = self.linkError;
    //self.link = self.linkError;
    //if (self.fun) self.fun();

    console.log("FIXI ANTON хдр збрасывает");
  }; // this.downloadUtill.saveBase64(base64);
  // this.downloadUtill.b64toBlob(b64Data, contentType, sliceSize);
  // this.downloadUtill.saveDataBlob(blob, fileName);
  // function saveBase64 (base64) {
  // 	var block = base64.split(';'); // 'data:image/jpeg и base64,...
  // 	var typeImg = block[0].split(':')[1]; // image/jpeg
  // 	var typeFile = '.' + block[0].split('/')[1]; // .jpeg
  // 	var realData = block[1].split(',')[1]; // куча кода после base64,
  // 	saveDataBlob(b64toBlob(realData, typeImg), 'picture' + typeFile);
  // }
  // function b64toBlob (b64Data, contentType, sliceSize) {
  // 	contentType = contentType || '';
  // 	sliceSize = sliceSize || 512;
  // 	var byteCharacters = atob(b64Data);
  // 	var byteArrays = [];
  // 	for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
  // 		var slice = byteCharacters.slice(offset, offset + sliceSize);
  // 		var byteNumbers = new Array(slice.length);
  // 		for (var i = 0; i < slice.length; i++) {
  // 			byteNumbers[i] = slice.charCodeAt(i);
  // 		}
  // 		var byteArray = new Uint8Array(byteNumbers);
  // 		byteArrays.push(byteArray);
  // 	}
  // 	var blob = new Blob(byteArrays, {type: contentType});
  // 	return blob;
  // }
  // function saveDataBlob (blob, fileName) {
  // 	var a = document.createElement('a');
  // 	document.body.appendChild(a);
  // 	var url = window.URL.createObjectURL(blob);
  // 	a.style = 'display: none';
  // 	a.href = url;
  // 	a.download = fileName;
  // 	a.click();
  // 	window.URL.revokeObjectURL(url);
  // 	document.body.removeChild(a);
  // }


  this.draw = function () {
    this.input.width = this._width - this._wh * 2 - this._otstup * 3 - this._height;
    this.input.x = this._height + this._otstup;
    this.localLoad.x = this.input.x + this.input.width + this._otstup;
    this.linkClear.x = this.localLoad.x + this._wh + this._otstup;
    this.btnLoad.width = this._width - this._height - this._otstup;
  };

  this.draw();
}

VisualContentLoader.prototype = Object.create(PIXI.Container.prototype);
VisualContentLoader.prototype.constructor = VisualContentLoader;
Object.defineProperties(VisualContentLoader.prototype, {
  width: {
    set: function set(value) {
      if (this._width === value) return;
      this._width = value;
      this.draw();
    },
    get: function get() {
      return this._width;
    }
  },
  height: {
    set: function set(value) {},
    get: function get() {
      return this._height;
    }
  },
  link: {
    set: function set(value) {
      if (this._link === value) return;
      this._link = value;

      if (this.link === 'null') {
        this.image.visible = false;
        this.input.value = this.link;
      } else if (this.link === this.linkError) {
        this.image.link = this.linkError;
        this.input.value = this.link;
      } else {
        this.image.visible = true;
        this.image.link = this._link;
        this.input.value = this._link;
      }
    },
    get: function get() {
      return this._link;
    }
  },
  value: {
    set: function set(value) {
      this.link = value;
    },
    get: function get() {
      return this._link;
    }
  },
  title: {
    set: function set(value) {
      if (this._title === value) return;
      this._title = value;
      this.btnLoad.text = value;
    },
    get: function get() {
      return this._title;
    }
  }
});

/***/ }),

/***/ "./pl102/src/plPlus/index.js":
/*!***********************************!*\
  !*** ./pl102/src/plPlus/index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var plPlus = _interopRequireWildcard(__webpack_require__(/*! ./indexEntry.js */ "./pl102/src/plPlus/indexEntry.js"));

Object.keys(plPlus).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return plPlus[key];
    }
  });
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

for (var key in plPlus) {
  global[key] = plPlus[key];
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./pl102/src/plPlus/indexEntry.js":
/*!****************************************!*\
  !*** ./pl102/src/plPlus/indexEntry.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ScrollPane = __webpack_require__(/*! ./ScrollPane.js */ "./pl102/src/plPlus/ScrollPane.js");

Object.keys(_ScrollPane).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ScrollPane[key];
    }
  });
});

var _PLGalleryADM = __webpack_require__(/*! ./PLGalleryADM.js */ "./pl102/src/plPlus/PLGalleryADM.js");

Object.keys(_PLGalleryADM).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _PLGalleryADM[key];
    }
  });
});

var _PLArrayFon = __webpack_require__(/*! ./PLArrayFon.js */ "./pl102/src/plPlus/PLArrayFon.js");

Object.keys(_PLArrayFon).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _PLArrayFon[key];
    }
  });
});

var _PLButSwitch = __webpack_require__(/*! ./PLButSwitch.js */ "./pl102/src/plPlus/PLButSwitch.js");

Object.keys(_PLButSwitch).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _PLButSwitch[key];
    }
  });
});

var _PLComboBoxImage = __webpack_require__(/*! ./PLComboBoxImage2.js */ "./pl102/src/plPlus/PLComboBoxImage2.js");

Object.keys(_PLComboBoxImage).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _PLComboBoxImage[key];
    }
  });
});

var _PLSwitchPachkaBut = __webpack_require__(/*! ./PLSwitchPachkaBut.js */ "./pl102/src/plPlus/PLSwitchPachkaBut.js");

Object.keys(_PLSwitchPachkaBut).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _PLSwitchPachkaBut[key];
    }
  });
});

var _EnginComp = __webpack_require__(/*! ./EnginComp.js */ "./pl102/src/plPlus/EnginComp.js");

Object.keys(_EnginComp).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _EnginComp[key];
    }
  });
});

var _InputGroup = __webpack_require__(/*! ./InputGroup.js */ "./pl102/src/plPlus/InputGroup.js");

Object.keys(_InputGroup).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _InputGroup[key];
    }
  });
});

var _HSVGradient = __webpack_require__(/*! ./HSVGradient.js */ "./pl102/src/plPlus/HSVGradient.js");

Object.keys(_HSVGradient).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _HSVGradient[key];
    }
  });
});

var _PLButtonFullWidth = __webpack_require__(/*! ./PLButtonFullWidth.js */ "./pl102/src/plPlus/PLButtonFullWidth.js");

Object.keys(_PLButtonFullWidth).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _PLButtonFullWidth[key];
    }
  });
});

var _BtnGallery = __webpack_require__(/*! ./BtnGallery.js */ "./pl102/src/plPlus/BtnGallery.js");

Object.keys(_BtnGallery).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _BtnGallery[key];
    }
  });
});

var _SliderObject = __webpack_require__(/*! ./SliderObject.js */ "./pl102/src/plPlus/SliderObject.js");

Object.keys(_SliderObject).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _SliderObject[key];
    }
  });
});

var _VisualContentLoader = __webpack_require__(/*! ./VisualContentLoader.js */ "./pl102/src/plPlus/VisualContentLoader.js");

Object.keys(_VisualContentLoader).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _VisualContentLoader[key];
    }
  });
});

var _PLInputWithText = __webpack_require__(/*! ./PLInputWithText.js */ "./pl102/src/plPlus/PLInputWithText.js");

Object.keys(_PLInputWithText).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _PLInputWithText[key];
    }
  });
});

var _NumericPanel = __webpack_require__(/*! ./NumericPanel.js */ "./pl102/src/plPlus/NumericPanel.js");

Object.keys(_NumericPanel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _NumericPanel[key];
    }
  });
});

var _PLParamObject = __webpack_require__(/*! ./PLParamObject.js */ "./pl102/src/plPlus/PLParamObject.js");

Object.keys(_PLParamObject).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _PLParamObject[key];
    }
  });
});

var _SettingsBig = __webpack_require__(/*! ./SettingsBig.js */ "./pl102/src/plPlus/SettingsBig.js");

Object.keys(_SettingsBig).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _SettingsBig[key];
    }
  });
});

var _DragerImage = __webpack_require__(/*! ./DragerImage.js */ "./pl102/src/plPlus/DragerImage.js");

Object.keys(_DragerImage).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _DragerImage[key];
    }
  });
});

var _PLColorUn = __webpack_require__(/*! ./PLColorUn.js */ "./pl102/src/plPlus/PLColorUn.js");

Object.keys(_PLColorUn).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _PLColorUn[key];
    }
  });
});

var _MTypedColor = __webpack_require__(/*! ./MTypedColor.js */ "./pl102/src/plPlus/MTypedColor.js");

Object.keys(_MTypedColor).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _MTypedColor[key];
    }
  });
});

var _PLColorTHREE = __webpack_require__(/*! ./PLColorTHREE.js */ "./pl102/src/plPlus/PLColorTHREE.js");

Object.keys(_PLColorTHREE).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _PLColorTHREE[key];
    }
  });
});

var _PLColorPalette = __webpack_require__(/*! ./PLColorPalette.js */ "./pl102/src/plPlus/PLColorPalette.js");

Object.keys(_PLColorPalette).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _PLColorPalette[key];
    }
  });
});

/***/ })

/******/ });
});