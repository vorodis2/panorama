
function FotoMy () {

	window.fotoMy = this;

	this.renderer = new PIXI.autoDetectRenderer(100, 100, {antialias: true, transparent: true});
	this.fotoCont = new PIXI.Container();
	this.prevRendSize = {width: 256, height: 256};
	this.imageSize = {width: 64, height: 64};
	this.rectToPrint = {x: 0, y: 0, width: 64, height: 64};
	this.l = new PLLabel(null, 0, 0, '');
	this.l.fontSize = pl102.wh;

	this.getLinkText = function (s) {	
		this.l.text = ' ' + s.toUpperCase();
		var rr = this.l.getRect();
		var s = rr.width;
		if (s < rr.height)s = rr.height;
		return this.getImAd(this.l, s, s);
	};

	this.getImAd = function (cont2d, _w, _h) {

		var mimeType = 'image/png';
		// renderer = main.renderer;
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

export function SliderObject (cont, _x, _y, text, fun) {
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
		if (self.fun)self.fun();
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
		set: function (value) {
			if (this._width == value) return;
			this._width = value;
			this.draw102();
		},
		get: function () {
			return this._width;
		}
	},
	height: {
		set: function (value) {
			if (this._height == value) return;
			this._height = value;
			// this.draw102();
		},
		get: function () {
			return this._height;
		}
	},
	activMouse: {
		set: function (value) {
			if (this._activMouse == value) return;
			this._activMouse = value;
			for (var i = 0; i < this.arrayCeh.length; i++) {
				this.arrayCeh[i].slider.activMouse = value;
			}
		},
		get: function () {
			return this._activMouse;
		}
	},
	text: {
		set: function (value) {
			this._text = value;
			this.label.text = this._text;
		},
		get: function () {
			return this._text;
		}
	},
	value: {
		set: function (v) {
			this._value = v;
			this.dragValue();
		},
		get: function () {
			return this._value;
		}
	},
	min: {
		set: function (value) {
			if (this._min == value) return;
			this._min = value;
			for (var i = 0; i < this.arrayCeh.length; i++) {
				this.arrayCeh[i].slider.min = value;
			}
		},
		get: function () {
			return this._min;
		}
	},
	max: {
		set: function (value) {
			if (this._max == value) return;
			this._max = value;
			for (var i = 0; i < this.arrayCeh.length; i++) {
				this.arrayCeh[i].slider.max = value;
			}
		},
		get: function () {
			return this._max;
		}
	},
	okrug: {
		set: function (value) {
			if (this._okrug == value) return;
			this._okrug = value;
			for (var i = 0; i < this.arrayCeh.length; i++) {
				this.arrayCeh[i].slider.okrug = value;
			}
		},
		get: function () {
			return this._okrug;
		}
	},
	textWidth: {
		set: function (value) {
			if (this._textWidth == value) return;
			this._textWidth = value;
			this.draw102();
		},
		get: function () {
			return this._textWidth;
		}
	}
});

function DragGG (par, _str, fun, funUp) {
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
		set: function (value) {
			if (this._width == value) return;
			this._width = value;
			this.draw102();
		},
		get: function () {
			return this._width;
		}
	},
	height: {
		set: function (value) {
			if (this._height == value) return;
			this._height = value;
			this.draw102();
		},
		get: function () {
			return this._height;
		}
	}
});


function SliderImgJek (cont, _x, _y, _name, _fun, _min, _max, _title, _link) {
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
		if (this._editNot) this.label.x = this.input.x + rect.width + this.otstup2 * 2;
		else this.label.x = this.input.x + this.input.width + this.otstup2;
		this.label.y = this.otstup1 + dopY;

		rect = this.label.getRect();

		this.label2.x = this.wh + this.otstup;
		this.label2.y = this.otstup3 + dopY;

		if (graphDrag) this.drawDebug();
	};
	// расчет отступа для текста после инпута
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
		dist = calc.getDistance(vectorInLine, vector) * ((angleMove < 0) ? -1 : 1);

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
		if (typeof (value) === 'string') {
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
		this.btn.alpha = (this.activMouse === true) ? 1 : 0.5;
	};

	this.clearValue = function () {
		this._value = 0;
		this.label2.value = '';
		// this.label2.visible = false;
		this.draw();
	};

	this.calculateShag = function () {
		// Общее уравнение прямой 8 * x + 190 * y − 1980 = 0
		var dY = this._max - this._min;
		var dX = ((1980 - (8 * dY)) / 190);
		this._shag = dX;
	};

	this.changeEdit = function () {
		if (this._editNot) {
			this.btn.alpha = 0.5;
			this.btn.okDown = false;
			this.input.visible = false;
			// this.label2.visible = true;
		} else {
			this.btn.alpha = 1;
			this.btn.okDown = true;
			this.input.visible = true;
			// this.label2.visible = false;
		}
	};

	function startMoveEvent () {
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

	function stopMoveEvent () {
		if (pl102.isMouseEvents) {
			document.body.removeEventListener('mouseup', self.onDragEnd);
			document.body.removeEventListener('mousemove', self.onDragMove);
		}
		if (pl102.isTouchEvents) {
			document.body.removeEventListener('touchend', self.onDragEnd);
			document.body.removeEventListener('touchmove', self.onDragMove);
		}
	}

	function setVal (newv) {
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
		set: function (value) {
			if (this._name == value) return;
			this._name = value;
		},
		get: function () {
			return this._name;
		}
	},
	title: {
		set: function (value) {
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
		get: function () {
			return this._title;
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
		},
		get: function () {
			return this._height;
		}
	},
	link: {
		set: function (value) {
			if (this._link == value) return;
			this._link = value;
			this.btn.loadImeg(this._link);
		},
		get: function () {
			return this._link;
		}
	},
	min: {
		set: function (value) {
			if (this._min == value) return;
			this._min = value;
			this.calculateShag();
		},
		get: function () {
			return this._min;
		}
	},
	max: {
		set: function (value) {
			if (this._max == value) return;
			this._max = value;
			this.calculateShag();
		},
		get: function () {
			return this._max;
		}
	},
	value: {
		set: function (value) {

			if (this._value == value) return;
			this._value = value;
			// if (!this.label2.visible) this.label2.visible = true;
			if (this._value < this._min) this._value = this._min;
			if (this._value > this._max) this._value = this._max;
			this.updateText();
			this.draw();
		},
		get: function () {
			return this._value;
		}
	},
	okrug: {
		set: function (value) {
			if (this._okrug == value) return;
			this._okrug = value;
		},
		get: function () {
			return this._okrug;
		}
	},
	shag: {
		set: function (value) {
			if (this._shag == value) return;
			this._shag = value;
		},
		get: function () {
			return this._shag;
		}
	},
	activMouse: {
		set: function (value) {
			if (this._activMouse == value) return;
			this._activMouse = value;
			this.changeActiv();
		},
		get: function () {
			return this._activMouse;
		}
	},
	editNot: {
		set: function (value) {
			if (this._editNot == value) return;
			this._editNot = value;
			this.changeEdit();
		},
		get: function () {
			return this._editNot;
		}
	},
	typeValue: {
		set: function (value) {
			if (this._typeValue == value) return;
			this._typeValue = value;
		},
		get: function () {
			return this._typeValue;
		}
	},
	plusText: {
		set: function (value) {
			if (this._plusText == value) return;
			this._plusText = value;
			this.setText(value);
		},
		get: function () {
			return this._plusText;
		}
	}
});
