
export function ScrollPane (cont, _x, _y) {
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
	this.addChild(this.cont);

	// Вертикальный и горизонтальный скролл
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

		if (ww > this._width) this.scrollBarH.visible = true;
		else this.scrollBarH.visible = false;

		if (hh > this._height) this.scrollBarV.visible = true;
		else this.scrollBarV.visible = false;


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
	function updateMaskHtml () { // режим маску на дом елементах

		if (pl102.devas == false)_scaleCoeff = (1 / window.devicePixelRatio);
		else _scaleCoeff = 1;


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

			var niz = (pg1.y - (r.y)) / scaleY;
			var verh = (pg.y - (r.y)) / scaleY;
			var rig = (pg1.x - (r.x)) / scaleX;
			var lef = (pg.x - (r.x)) / scaleX;

			if (self._isCutMask) {
				element.style.clip = 'rect(' + verh + 'px, ' + rig + 'px, ' + niz + 'px, ' + lef + 'px)';
			} else {
				element.style.clip = null;
			}
		}
	}

	function getArrPLDOMElement (content) {
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

		var cont22 = new PIXI.Container();
		// cont22.scale.set(0.5, 0.5);
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
	boolWheel: { // включить\выключить прокрутку колесом
		set: function (value) {
			if (this._boolWheel == value) return;
			this._boolWheel = value;
			this.interactive = this._boolWheel;
			if (this._boolWheel == true) {
				pl102Wheel.on(this, 'mousewheel', this.mousewheel);
			} else {
				pl102Wheel.off(this, 'mousewheel', this.mousewheel);
			}
		},
		get: function () {
			return this._boolWheel;
		}
	},
	boolPositScrol: { // вынести\внести отступ за элемент
		set: function (value) {
			if (this._boolPositScrol == value) return;
			this._boolPositScrol = value;
			this.draw();
		},
		get: function () {
			return this._boolPositScrol;
		}
	},

	boolPositOtctup: { // зеркальное отображение слайдеров
		set: function (value) {
			if (this._boolPositOtctup == value) return;
			this._boolPositOtctup = value;
			this.draw();
		},
		get: function () {
			return this._boolPositOtctup;
		}
	},
	sizeScroll: {
		set: function (value) {
			if (this._sizeScroll == value) return;
			this._sizeScroll = value;
			this.draw();
		},
		get: function () {
			return this._sizeScroll;
		}
	},

	width: {
		set: function (value) {
			if (this._width == value) return;
			this._width = value;
			this.draw();
		},
		get: function () {
			return this._width;
		}
	},

	height: {
		set: function (value) {
			if (this._height == value) return;
			this._height = value;
			this.draw();
		},
		get: function () {
			return this._height;
		}
	},

	widthContent: {
		set: function (value) {
			if (this._widthContent == value) return;
			this._widthContent = value;
			this.draw();
		},
		get: function () {
			return this._widthContent;
		}
	},

	heightContent: {
		set: function (value) {
			if (this._heightContent == value) return;
			this._heightContent = value;
			this.draw();
		},
		get: function () {
			return this._heightContent;
		}
	},
	debug: {
		set: function (value) {
			if (this._debug == value) return;
			this._debug = value;
			this.graphics.visible = value;
		},
		get: function () {
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
		set: function (value) {
			if (this._otstup == value) return;
			this._otstup = value;
			this.draw();
		},
		get: function () {
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
		set: function (value) {
			if (this._isCutMask == value) return;
			this._isCutMask = value;
			this.draw();
		},
		get: function () {
			return this._isCutMask;
		}
	}

});
