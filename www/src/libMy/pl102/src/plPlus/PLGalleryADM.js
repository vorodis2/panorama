
export function PLGalleryADM (cont, _x, _y, _klush, _fun, _funD, _funU) {
	var self = this;
	this.fun = _fun;
	this.funD = _funD;
	this.funU = _funU;
	this.arrObj = [];
	this.arrBtn = []; // буфер

	this.klush = _klush;
	this.podKlush = 'nullXZ';
	this._width = 100;// 106;
	this._height = 100;// 213;
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
	this._colorThick = 0xffb200;// pl102.color1; // цвет контура кнопок

	this.povedSlid = 0; // 0 - слидер работает как и раньше, 1 - находясь слева, уменьшается в ширину

	this.object;
	this.lavel = 0;// доступный уровень подгалерей
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
	this.onDragEnd = function (e) {
		// pl102.stage.off('mouseup', self.onDragEnd);
	};

	this.boolLink = false;
	var bb;
	this.obj;
	this.idArr;
	var imgLink, title, text, link;
	this.downBut = function () {

		if (self.boolLink == false)self.value = this.obj.id;
		else self.value = this.obj.texture.url;
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
			if (gal.galeri != undefined)bb = !gal.galeri.content.visible;
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
		if (self.funU)self.funU();
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
				return i;
				// return this.testItem(i, bool)
			}
		}
		return -1;// this.testItem(-1, bool)
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
		if (this._visiItem == -1) return;
		// ставим выделение на нужную кнопку
		// если слидер активный вычисляем его позицию и ставим
		if (this.slidV.visible != false) {
			butt = 0;
			butt2 = 0;
			// узнаем в каком ряду в галереи находиться кнопка
			for (var i = 0; i < idArr; i++) {
				butt++;
				if (butt >= this._stepW) {
					butt = 0;
					butt2++;
				}
			}
			if (bool) {
				// устанавливаем скрол в нужную позицию при клике на пол что находиться на сцене
				this.slidV.scrolValue = (butt2 * (this._wh + this.otstup) * 100) / this.slidV.height;
				this.contentB.y = -(this.currentHeight - this._height) * (this.slidV.scrolValue / 100);
			} else {
				// если кнопка наполовину скрыта сверху при клике на нее подгоняем позицию скрола
				verh = this.contentB.y + butt2 * (this._wh + this.otstup);
				if (verh < 0) {
					this.slidV.scrolValue = butt2 * (this._wh + this.otstup);
					this.contentB.y = -(butt2 * (this._wh + this.otstup));
				}
				// если кнопка наполовину скрыта снизу при клике на нее подгоняем позицию скрола
				niz = (butt2 * (this._wh + this.otstup) + this._wh) - (Math.abs(this.contentB.y) + this._height);
				if (niz > 0) {
					this.slidV.scrolValue = ((butt2 * (this._wh + this.otstup) + this._wh) - this._height);
					this.contentB.y = -((butt2 * (this._wh + this.otstup) + this._wh) - this._height);
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
		button.obj = _o;
		// todo выводит айдишники обьектов
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
		}
		//= ========================================================================================================================
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

		if (!isLink(_s)) { // если пришла не ссылка
			self.setColor(_id, _s);
			return;
		}

		if (self.arrBtn[_id].link === _s && self.arrBtn[_id].image && self.arrBtn[_id].image.isLoaded) {
			self.startDoLoad(); // картинка уже загружена идем на следующу
		} else {
			self.arrBtn[_id].loadImeg(_s);
		}
	};

	function isLink (_s) {
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
		this.currentHeight = this._wh * countMan + (this.otstup * (countMan + 1));

		for (var i = 0; i < this.object.data.length; i++) {
			if (this.arrBtn[i].visible == false) continue;

			if (this.arrBtn[i].galeri) {
				this.arrBtn[i].galeri.wh = this._wh;
				this.arrBtn[i].galeri.content.x = (this._wh + this.otstup);
			}

			this.arrBtn[i].x = this.otstup + count * (this.otstup + this._wh);
			this.arrBtn[i].y = this.otstup + count2 * (this.otstup + this._wh);
			this.arrBtn[i].visiblePanel = this._butVisiblePanel;
			if (this.arrBtn[i].transLink) {
				this.arrBtn[i].visiblePanel = true;
				// this.arrBtn[i].panel.nizAlpha = _nizAlpha;
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
		this.slidV.visible = (this.slidV.height < this.slidV.heightContent);

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
				if (yy > 0)yy = 0;
			} else {
				yy -= 10;
				if (yy < -(self.currentHeight - self._height))yy = -(self.currentHeight - self._height);
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

	function getCountVisibleBtn () {
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
		if (this.povedSlid === 1) { // сдвиг и уменьшение ширины
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
	set theme (v) {
		if (this._theme == v) return;
		this._theme = v;
		this.setFilterName(this.filterName);
		this.draw();
	},
	get theme () {
		return this._theme;
	},

	set stepW (v) {
		if (this._stepW == v) return;
		this._stepW = v;
		this.korektWidth();
		this.draw();

	},
	get stepW () {
		return this._stepW;
	},

	set height (v) {
		if (this._height == v) return;
		this._height = v;
		for (var i = 0; i < this.arrBtn.length; i++) {
			if (this.arrBtn[i].galeri) {
				this.arrBtn[i].galeri.height = this._height;
			}
		}
		this.draw();

	},
	get height () {
		return this._height;
	},

	set width (v) {
		if (this._width == v) return;
		this._width = v;
		if (this._boolLeft == false) this.slidV.x = this._width - this.slidV.width;

		this.editSlidByPoved();
	},
	get width () {
		return this._width;
	},

	set  wh (v) {
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
	get wh () {
		return this._wh;
	},
	set  x (v) {
		this._x = v;
		this.content.x = v;
	},
	get x () {
		return this._x;
	},
	set y (v) {
		this._y = v;
		this.content.y = v;
	},
	get y () {
		return this._y;
	},
	set visible (v) {
		this._visible = v;
		this.content.visible = v;
	},
	get visible () {
		return this._visible;
	},
	set  boolLeft (v) {
		this._boolLeft = v;

		if (this._boolLeft == false) this.slidV.x = this._width - 10;
		else this.slidV.x = 0;

		this.editSlidByPoved();
	},
	get boolLeft () {
		return this._boolLeft;
	},
	set  butVisiblePanel (v) {
		this._butVisiblePanel = v;
		for (var i = 0; i < this.arrBtn.length; i++) {
			this.arrBtn[i].visiblePanel = this._butVisiblePanel;
			if (this.arrBtn[i].galeri) {
				this.arrBtn[i].galeri.butVisiblePanel = this._butVisiblePanel;
			}
		}
	},
	get butVisiblePanel () {
		return this._butVisiblePanel;
	},
	set otstupImg (v) {
		if (this._otstupImg == v) return;
		this._otstupImg = v;

	},
	get otstupImg () {
		return this._otstupImg;
	},
	set visiItem (v) {
		if (this._visiItem == v) return;
		this._visiItem = v;

	},
	get visiItem () {
		return this._visiItem;
	},
	set colorThick (v) {
		if (this._colorThick == v) return;
		this._colorThick = v;

	},
	get colorThick () {
		return this._colorThick;
	},
	set kontThick (v) {
		if (this._kontThick == v) return;
		this._kontThick = v;

	},
	get kontThick () {
		return this._kontThick;
	},

	set index (v) {
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
	get index () {
		return this._index;
	},

	set visibleIndex (v) {
		if (this._visibleIndex == v) return;
		this._index = v;
		// this.kont.visible = false;
		this.contentKont.visible = v;

	},
	get visibleIndex () {
		return this._visibleIndex;
	},


	set value  (v) {
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
	get value  () {
		return this._value;
	}


};