

export function PLComboBoxImage2 (cont, _x, _y, _link, _fun, _funD) {
	PIXI.Container.call(this);
	this.type = 'PLComboBoxImage2';
	this.typeCom = 'pixi';
	cont.addChild(this);
	var self = this;

	this.fun = _fun; // нажатие на внутренние кнопки
	this.funD = _funD; // нажатие на кнопку компонента
	this.funCompl;
	this._boolKontur = false;// показывать ли контур
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
	this.gPlus = this.button.gPlus;// Для дебаг отрисовки

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

		if (this._height < this._width) { this.button.image.width = this.button.image.height = this._height; } else { this.button.image.width = this.button.image.height = this._width; }

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
		if (intersect == false) self.activ = false;// { setVisiblePanel(false) };
	};

	// проверка кликаем в компоненте или нет
	var fullHeight;
	this.contains = function (x, y) { // todo проверить с масштабирование и поворотом
		fullHeight = self.button.height;
		if (self.activ) fullHeight += self.panel.height;
		return (x >= 0 && x <= self.panel.width && y >= 0 && y <= fullHeight);
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
		set: function (value) {
			if (this._activ != value) {
				this._activ = value;
				this.button.activ = this._activ;
				this.panel.visible = this._activ;

				if (this.stageDownBool == true) {
					if (this._activ == true) { pl102.stage.on('mousedown', this.stageDown); } else { pl102.stage.off('mousedown', this.stageDown); }
				}
			}
		},
		get: function () {
			return this._activ;
		}
	},
	funActiv: {
		set: function (value) {
			if (this._funActiv == value) return;
			this._funActiv = value;
			this.button.funActiv = this._funActiv;
		},
		get: function () {
			return this._activ;
		}
	},

	height: {
		set: function (value) {
			if (this._height == value) return;
			this._height = value;
			this.reposition();

		},
		get: function () {
			return this._height;
		}
	},

	width: {
		set: function (value) {
			if (this._width == value) return;
			this._width = value;
			this.reposition();
		},
		get: function () {
			return this._width;
		}
	},

	wh: {
		set: function (value) {
			if (this._width == value) return;
			this._wh = value;
			this._width = value;
			this._height = value;
			this.reposition();
		},
		get: function () {
			return this._wh;
		}
	},

	index: {
		set: function (value) {
			this._index = value;

		},
		get: function () { return this._index; }
	},

	indexActivLink: {
		set: function (value) {
			this.array[this._index].activLink = value;

		},
		get: function () { return this.array[this._index].activLink; }
	},

	color: {
		set: function (value) {
			if (this._color == value) return;
			this._color = value;

			this.button.color = this._color;
			for (var i = 0; i < this.array.length; i++) {
				this.array[i].color = value;
			}
		},
		get: function () {
			return this._color;
		}
	},
	boolKontur: {
		set: function (value) {
			this._boolKontur = value;
			this.button.boolKontur = this._boolKontur;
		},
		get: function () {
			return this._boolKontur;
		}
	}
});


export function PLPachkaButton (cont, _x, _y, _fun) {
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

	this.array = [];

	// debugPLCBI2 = new DebugPLCBI2(this, -300, 0);

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
		set: function (value) {
			if (this._activ != value) {
				this._activ = value;
			}
		},
		get: function () {
			return this._activ;
		}
	},
	height: {
		set: function (value) {
			if (this._height == value) return;
			this._height = value;
			this._width = value;
			this._wh = value;
			this.reposition();
		},
		get: function () {
			return this._height;
		}
	},
	width: {
		set: function (value) {
			if (this._width == value) return;
			this._width = value;
			this.wh = (this._width - (this.array.length - 1) * this._otstup) / this.array.length;
			this._height = this._wh;
		},
		get: function () {
			return this._width;
		}
	},
	wh: {
		set: function (value) {
			if (this._width == value) return;
			this._wh = value;
			this.reposition();
		},
		get: function () {
			return this._wh;
		}
	},
	index: {
		set: function (value) {
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
		get: function () { return this._index; }
	},
	value: {
		set: function (v) {
			if (this._index != v) {
				this.index = v;
			}
		},
		get: function () { return this._index; }
	},
	indexActivLink: {
		set: function (value) {
			this.array[this._index].activLink = value;

		},
		get: function () { return this.array[this._index].activLink; }
	},
	color: {
		set: function (value) {
			if (this._color == value) return;
			this._color = value;

			for (var i = 0; i < this.array.length; i++) {
				this.array[i].color = value;
			}
		},
		get: function () {
			return this._color;
		}
	},
	otstup: {
		set: function (value) {
			if (this._otstup == value) return;
			this._otstup = value;
			this.reposition();
		},
		get: function () {
			return this._otstup;
		}
	}
});


function BanonMY (cont, _x, _y, _text, fun) {
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
			this.panel.nizNum = 30;
			// this.color=0xf0f0f0;
		}

		if (this.image2) {
			/*
				if(self._height<self._width)this.image2.width= this.image2.height=self._height;
				else this.image2.width = this.image2.height=self._width;
			*/
			this.image2.width = _w;// width;
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
		set: function (value) {
			if (this._activLink != value) {
				this._activLink = value;

				if (this.image2) {
					this.image.visible = value;
					this.image2.visible = !value;
				}
			}
		},
		get: function () {
			return this._activLink;
		}
	},

	heightImg: {
		set: function (value) {
			if (this.image.height == value) return;
			if (this._height < this._width) { this.image.width = this.image.height = this._height; } else { this.image.width = this.image.height = this._width; }
			if (this.image2) { this.image2.width = this.image2.height = this.image.height; }

		},
		get: function () {
			return this._height;
		}
	},

	widthImg: {
		set: function (value) {
			if (this.image.width == value) return;
			if (this._height < this._width) { this.image.width = this.image.height = this._height; } else { this.image.width = this.image.height = this._width; }
			if (this.image2) { this.image2.width = this.image2.height = this.image.height; }
		},
		get: function () {
			return this._width;
		}
	}
});

export function DebugPLCBI2 (cont, _x, _y) {
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

export function PLSliderBigRad (cont, _x, _y, title, fun) {
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
		if (self.fun)self.fun();
	}, 0, 360);
	this.slider.slid.contPrilip.visible = false;

	this.setText = function (_test) {
		this.slider.setText(_test);
	};

	this.funUp;
	this.slider.funUp = function () {
		if (self.funUp != undefined)self.funUp();
	};

	// Vova, починка скетча, вращение
	this.slider.addPrilip(0, 10/*45*/);
	this.slider.addPrilip(90, 10/*45*/);
	this.slider.addPrilip(180, 10/*45*/);
	this.slider.addPrilip(270, 10/*45*/);
	this.slider.addPrilip(360, 10/*45*/);

	this.numPi = 2;

	this.gradInFrame = function (_v) {
		var v = _v;

		var num = ~~(v / Math.PI);

		if (v <= 0) {
			var z = num * -1;
			if (z % 2 == 0) { z += 2; } else { z += 1; }

			v = Math.PI * z + v;
		}


		if (v >= Math.PI * 2) {
			if (num % 2 == 0) {
				this.numPi = num;
			} else {
				if (num < this.numPi) { this.numPi = num - 1; }
			}

			v = v - Math.PI * this.numPi;
		}

		return v;

	};
	Object.defineProperty(this, 'okrug', {
		set: function (value) {
			if (this._okrug != value) {
				this._okrug = value;
				this.slider.okrug = this._okrug;
			}
		},
		get: function () {
			return this._okrug;
		}
	});
	Object.defineProperty(this, 'min', {
		set: function (value) {
			if (this._min != value) {
				this._min = value;
				this.slider.min = this._min;
			}
		},
		get: function () {
			return this._min;
		}
	});
	Object.defineProperty(this, 'max', {
		set: function (value) {
			if (this._max != value) {
				this._max = value;
				this.slider.max = this._max;
			}
		},
		get: function () {
			return this._max;
		}
	});

	Object.defineProperty(this, 'title', {
		set: function (value) {
			if (this._title != value) {
				this._title = value;
				this.slider.title = this._title;
			}
		},
		get: function () {
			return this._title;
		}
	});


	Object.defineProperty(this, 'width', {
		set: function (value) {
			this._width = value;
			this.slider.width = this._width;
		},
		get: function () {
			return this._width;
		}
	});

	Object.defineProperty(this, 'height', {
		get: function () {
			return this.slider.height;
		}
	});

	Object.defineProperty(this, 'value', {
		set: function (v) {
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
		get: function () {
			return this._value;
		}
	});

	Object.defineProperty(this, 'activMouse', {
		set: function (value) {
			if (this._activMouse == value) return;
			this._activMouse = value;
			this.slider.activMouse = this._activMouse;
		},
		get: function () {
			return this._activMouse;
		}
	});

	Object.defineProperty(this, 'colorText', {
		set: function (value) {
			if (this._colorText == value) return;
			this._colorText = value;
			this.slider.colorText = this._colorText;
		},
		get: function () {
			return this._colorText;
		}
	});
}

PLSliderBigRad.prototype = Object.create(PIXI.Container.prototype);
PLSliderBigRad.prototype.constructor = PLSliderBigRad;

export function PLPachkaButton2 (cont, _x, _y, _fun) {
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
	this.y = _y || 0;

	// debugPLCBI2 = new DebugPLCBI2(this, -300, 0);
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
			if (this.checkNotUp(i) === true) this.activBtnState[i] = this.array[i].activ;
			else this.activBtnState[i] = false;
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
			but.otstup = this.otstupImg;
			// but.boolScalePic = true;
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
			this.array[i].x = (this._wh * i + this._otstup * (i + 1));
			this.array[i].height = this._wh;
			this.array[i].width = this._wh;
		}

		this.fillPanel();
	};

	this.setStile = function (num, _w, _h) {
		if (_w) this.width = _w;
		if (_h) this.height = _h;
	};

	this.fillPanel = function () { // заполняем панелью там где tittle[i] = 0
		//
		this.clearPanel();// убираем панели

		var arrInd = [];

		for (var i = 0; i < this._title.length; i++) {
			var parn = (arrInd.length % 2) == 0;
			if (this._title[i] == 0 && parn) {
				arrInd.push(i);
			} else if (this._title[i] != 0 && !parn) {
				arrInd.push(i);
			}
		}
		if ((arrInd.length % 2) != 0) {
			arrInd.push(i);
		}
		var countPanel = arrInd.length / 2;// количество панелей
		var index = 0;
		for (var i = 0; i < countPanel; i++) {
			var panel = this.getPanel();
			var x = (this._wh * (arrInd[index]) + this._otstup * ((arrInd[index]) + 1));
			var x1 = (this._wh * (arrInd[index + 1]) + this._otstup * ((arrInd[index + 1])));
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
		set: function (value) {
			this._title = value;
			if (this._title.length != undefined) {
				if (this._title.length == this.array.length) {

					for (var i = 0; i < this.array.length; i++) {

						this.array[i].visible = (this._title[i] != 0); // елемент видимый если i не равет 0
						
						if (this.array[i].visible) {
							this.array[i].activMouse = (this._title[i] == 1);
						}
					}
				}
			}
			this.reposition();
		},
		get: function () {
			return this._title;
		}
	},
	activ: {
		set: function (value) {
			if (this._activ != value) {
				this._activ = value;
			}
		},
		get: function () {
			return this._activ;
		}
	},
	height: {
		set: function (value) {
			if (this._height == value) return;
			this._height = value;
			this._width = value;
			this._wh = value;

			this.reposition();
		},
		get: function () {
			return this._height;
		}
	},
	width: {
		set: function (value) {
			if (this._width == value) return;
			this._width = value;

			this.wh = (this._width - (this.array.length - 1) * this._otstup) / this.array.length;
			this._height = this._wh;
			this.reposition();
		},
		get: function () {
			return this._width;
		}
	},
	wh: {
		set: function (value) {
			if (this._width == value) return;
			this._wh = value;
			this.reposition();
		},
		get: function () {
			return this._wh;
		}
	},
	index: {
		set: function (value) {
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
		get: function () {
			return this._index;
		}
	},
	value: {
		set: function (v) {
			if (this._index != v) {
				this.index = v;
			}
		},
		get: function () {
			return this._index;
		}
	},
	indexActivLink: {
		set: function (value) {
			this.array[this._index].activLink = value;
		},
		get: function () {
			return this.array[this._index].activLink;
		}
	},
	color: {
		set: function (value) {
			if (this._color == value) return;
			this._color = value;

			for (var i = 0; i < this.array.length; i++) {
				this.array[i].color = value;
			}
		},
		get: function () {
			return this._color;
		}
	},
	otstup: {
		set: function (value) {
			if (this._otstup == value) return;
			this._otstup = value;
			this.reposition();
		},
		get: function () {
			return this._otstup;
		}
	}
});

export function PLPachkaCheckBoxImage (cont, _x, _y, _fun) {
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
		}

		// if (self.typeDown == 0) {
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
		if (this.arrayBtn.length == 0) this._wh = this._width;
		else this._wh = (this._width - (this.arrayBtn.length - 1) * this._otstup) / this.arrayBtn.length;

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
		set: function (value) {
			if (this._height == value) return;
			this._height = value;
		},
		get: function () {
			return this._height;
		}
	},
	width: {
		set: function (value) {
			if (this._width == value) return;
			this._width = value;
			this.reposition();
		},
		get: function () {
			return this._width;
		}
	},
	wh: {
		set: function (value) {
			if (this._width == value) return;
			this._wh = value;
			this.reposition();
		},
		get: function () {
			return this._wh;
		}
	},
	index: {
		set: function (value) {
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
		get: function () {
			return this._index;
		}
	},
	value: {
		set: function (v) {
			if (this._value == v) return;
			this._value = v;
		},
		get: function () {
			return this._value;
		}
	},
	arrayActiv: {
		set: function (value) {
			if (!Array.isArray(value)) return;
			for (var i = 0; i < value.length; i++) {
				this._arrayActiv[i] = value[i];
				this.arrayBtn[i].value = value[i];
			}
		},
		get: function () {
			return this._arrayActiv;
		}
	},
	otstup: {
		set: function (value) {
			if (this._otstup == value) return;
			this._otstup = value;
			this.reposition();
		},
		get: function () {
			return this._otstup;
		}
	},
	activContur: {
		set: function (value) {
			if (this._activContur == value) return;
			this._activContur = value;
			this.contur.visible = this._activContur;
		},
		get: function () {
			return this._activContur;
		}
	},
	link: {
		set: function (value) {
			this._link = value;
			this.arrayBtn[this._index].link = value;
		},
		get: function () {
			return this._link;
		}
	},
	link1: {
		set: function (value) {
			this._link1 = value;
			this.arrayBtn[this._index].link1 = value;
		},
		get: function () {
			return this._link1;
		}
	},
	activMouse: {
		set: function (value) {
			if (this._activMouse == value) return;
			this._activMouse = value;
			for (var i = 0; i < this.arrayBtn.length; i++) {
				this.arrayBtn[i].activMouse = this._activMouse;
			}
			if (!this._activMouse) this.activContur = false;
		},
		get: function () {
			return this._activMouse;
		}
	},
	poved: {
		set: function (value) {
			if (this._poved == value) return;
			this._poved = value;
			if (this.arrayBtn.length == 0) return;
		   // var w=this.arrayBtn[i].width;
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
		get: function () {
			return this._poved;
		}
	},
	isIlumActiv: {
		set: function (value) {
			if (this._isIlumActiv == value) return;
			this._isIlumActiv = value;

			for (var i = 0; i < this.arrayBtn.length; i++) {
				this.arrayBtn[i].isIlumActiv = this._isIlumActiv;
			}
		},
		get: function () {
			return this._isIlumActiv;
		}
	},
});


export function PLPachkaImgBut (cont, _x, _y, _fun) {
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
			self.arrayButton[i].activ = (i === self._index);
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
		if (this.arrayBtnImg.length == 0) this._wh = this._width;
		else this._wh = (this._width - (this.arrayBtnImg.length - 1) * this._otstup) / this.arrayBtnImg.length;

		for (var i = 0; i < this.arrayBtnImg.length; i++) {
			this.arrayBtnImg[i].x = (this._wh + this._otstup) * i;
			this.arrayBtnImg[i].height = this._wh;
			this.arrayBtnImg[i].width = this._wh;

			this.arrayButton[i].x = this.arrayBtnImg[i].x;
			this.arrayButton[i].y = this._wh;
			this.arrayButton[i].width = this._wh;
		}

		this._height = this._wh;
		if (this.arrayButton.length !=0) {
			this._height += this.arrayButton[0].height;
		}
	};

	this.clear = function () {};
	this.setStile = function () {};

	// для выполняния Аут/овер на двух связанных компонентах
	var doEvent = true;
	var doEvent1 = true;
	function funOut (e) {
		if (doEvent === false) return;
		doEvent = false;
		if (this.image === undefined) self.arrayBtnImg[this.idArr].mouseOut(e);
		else self.arrayButton[this.idArr].mouseOut(e);
		doEvent = true;
	}

	function funOver (e) {
		if (doEvent1 === false) return;
		doEvent1 = false;
		if (this.image === undefined) self.arrayBtnImg[this.idArr].mouseOver(e);
		else self.arrayButton[this.idArr].mouseOver(e);
		doEvent1 = true;
	}
}

PLPachkaImgBut.prototype = Object.create(PIXI.Container.prototype);
PLPachkaImgBut.prototype.constructor = PLPachkaImgBut;
Object.defineProperties(PLPachkaImgBut.prototype, {
	height: {
		set: function (value) {
			if (this._height == value) return;
			this._height = value;
		},
		get: function () {
			return this._height;
		}
	},
	width: {
		set: function (value) {
			if (this._width == value) return;
			this._width = value;
			this.reposition();
		},
		get: function () {
			return this._width;
		}
	},
	wh: {
		set: function (value) {
			if (this._width == value) return;
			this._wh = value;
			this.reposition();
		},
		get: function () {
			return this._wh;
		}
	},
	index: {
		set: function (value) {
			if (this._index != value) {
				this._index = value;

				for (var i = 0; i < this.arrayButton.length; i++) {
					this.arrayButton[i].activ = (i === this._index);
					this.arrayBtnImg[i].activ = false;
				}
			}
		},
		get: function () {
			return this._index;
		}
	},
	value: {
		set: function (v) {
			if (this._value == v) return;
			this._value = v;
		},
		get: function () {
			return this._value;
		}
	},
	arrayActiv: {
		set: function (value) {
			if (!Array.isArray(value)) return;
			for (var i = 0; i < value.length; i++) {
				this._arrayActiv[i] = value[i];
				this.arrayBtnImg[i].value = value[i];
			}
		},
		get: function () {
			return this._arrayActiv;
		}
	},
	otstup: {
		set: function (value) {
			if (this._otstup == value) return;
			this._otstup = value;
			this.reposition();
		},
		get: function () {
			return this._otstup;
		}
	},
	link: {
		set: function (value) {
			this._link = value;
			this.arrayBtnImg[this._index].link = value;
		},
		get: function () {
			return this._link;
		}
	},
	activMouse: {
		set: function (value) {
			if (this._activMouse == value) return;
			this._activMouse = value;
			for (var i = 0; i < this.arrayBtnImg.length; i++) {
				this.arrayBtnImg[i].activMouse = this._activMouse;
			}
		},
		get: function () {
			return this._activMouse;
		}
	}
});
