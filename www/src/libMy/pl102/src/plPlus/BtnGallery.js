export function BtnGallery (_cont, _x, _y, fun) {
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
	var otstupSlid = 3;

	// рисуем кнопки tipPosit
	//   | 123    | 246
	// 1-| 456  0-| 135
	this._otstup = 17;
	this._ii = 2; // шаг по х
	this._jj = 3; // шаг по y
	this._wh = 74;
	this._indexObject = undefined; // индекс активного обьекта

	this.object; // активный обьект
	this.indBtn = -1;

	// this.colorKont = 0xffb200; // цвет контура
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
	this.contBtn.mask = this.graphics;
	// контур вокруг кнопки
	this.contur = new PLContur(this.contBtn);
	this.contur.wh = this._wh;
	this.contur.color = 0x666666;
	this.contur.thickness = -3;
	this.contur.visible = false;


	this.scrol = new PLScrollBarV(this, 0, 0, function () {
		self.contBtn.y = -this.scrolValue;
	});
	// this.scrol.width = 10;
	// this.scrol.alpha = 0.5;
	// this.scrol.otstup = 5;
	this.scrol.offsetHit = 12;
	this.scrol.visible = false;
	this.scrol.otstup = otstupSlid;
	this.scrol.width = widthSlid;

	this.boolWhell = false;
	this._boolLeft = true;

	this.array = [];
	// массив кнопок
	this.setArray = function (_a) {
		for (var i = 0; i < _a.length; i++) {
			this.addObj(_a[i]);
		}
	};

	var bb, bb2, bb3;
	// bb позиция найденного элемента -1, - не нашли
	// bb2 обьект который удалили с масива затем вставили
	// bb3 позиция найденного элемента -1 с учетом скрытых снопок, -1 не нашли
	this.addObj = function (_obj) {
		bb = -1;

		for (var i = 0; i < this.array.length; i++) {
			if (this.array[i].visible == false) {
				// if (this.array[i].object[this.klush] == _obj[this.klush]) {
					bb = i;
					this.array[i].visible = true;
					break;
				// }
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
	};
	// установка кнопки в указанную позицию
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
	this.generParent;
	// cоздание кнопок
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
			if (_obj.icon != undefined) btn.loadImeg(_obj.icon.url);
			else btn.loadImeg('resources/images/admin/no_image.png');
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

		if (this.scrol.heightContent <= this.scrol.height) this.scrol.visible = false;// visibility scrol
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
				if (yy > 0)yy = 0;
			} else {
				yy -= 10;
				if (yy < -(self.contBtn.height - self._heightMask))yy = -(self.contBtn.height - self._heightMask);
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
		set: function (value) {
			if (this._heightMask == value) return;
			this._heightMask = value;
			this.drawWH();
			this.settingSlider();
		},
		get: function () {
			return this._heightMaskt;
		}
	},
	widthMask: {
		set: function (value) {
			if (this._widthMask == value) return;
			this._widthMask = value;
			this.drawWH();

			if (this._boolLeft == false) {
				this.scrol.x = this._width - this.scrol.width;
			}
		},
		get: function () {
			return this._widthMask;
		}
	},
	tipPosit: {
		set: function (value) {
			if (this._tipPosit == value) return;
			this._tipPosit = value;
			this.draw();
		},
		get: function () {
			return this._tipPosit;
		}
	},
	wh: {
		set: function (value) {
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
		get: function () {
			return this._wh;
		}
	},
	ii: {
		set: function (value) {
			if (this._ii == value) return;
			this._ii = value;
			this._heightMask = this._jj * (this._wh + this._otstup) + this._otstup * 2;
			this._widthMask = this._ii * (this._wh + this._otstup) + this._otstup * 2;
			this.drawWH();
			this.draw();
		},
		get: function () {
			return this._ii;
		}
	},
	jj: {
		set: function (value) {
			if (this._jj == value) return;
			this._jj = value;
			this._heightMask = this._jj * (this._wh + this._otstup) + this._otstup * 2;
			this._widthMask = this._ii * (this._wh + this._otstup) + this._otstup * 2;
			this.drawWH();
			this.draw();
		},
		get: function () {
			return this._jj;
		}
	},
	indexObject: {
		set: function (value) {
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
		get: function () {
			return this._indexObject;
		}
	},
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
	width: {
		set: function (value) {
			if (this._width == value) return;
			this._width = value;
			this._wh = (this._width - this._otstup * this._ii - this._otstup - 1) / this._ii;
			this.draw();

			if (this._boolLeft == false) {
				this.scrol.x = this._width - this.scrol.width;
			}
		},
		get: function () {
			return this._width;
		}
	},
	boolLeft: {
		set: function (value) {
			if (this._boolLeft == value) return;
			if (this._boolLeft == false) {
				this.scrol.x = this._width - 10;
			} else {
				this.scrol.x = 0;
			}
		},
		get: function () {
			return this._boolLeft;
		}
	}
});

export function GalleryAdm (cont, _x, _y, fun) {
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

			this.scrol.visible = true;
			// если скрол внутри галереи
			// this.scrol.x = this._width - this.scrol.width - 1;
			this.scrol.x = this._width + this._otstup;

			this.scrol.height = this._height - 1;
			// если скрол внутри галереи расчитаем размер кнопки
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
		}

		// this.graphTestH.clear();
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

	this.settingSlider = function () {};

	// массив обектов по которым создаютса кнопки
	this.setObj = function (_arr) {
		this.setArray(_arr);
	};

	// грузим картинку в кнопку
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
		set: function (value) {
			if (this._width == value) return;
			this._width = value;

			this._wh = ((this._width - (this._otstBtn * (this._ii - 1)) - this._otstup * 2 - 1)) / this._ii;
			// this._widthMask = this._width;
			this.contur.wh = this._wh;
			this.draw();

			if (this._boolLeft == false) {
				this.scrol.x = this._width - this.scrol.width;
			}
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
	}
});
