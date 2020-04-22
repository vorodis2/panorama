/**
 * Четвертной переключатель :) (По центру 4 картинки, 2 кнопки над и 2 под ними)
 * @class
 * @param {_cont} контент
 * @param {_x}
 * @param {_y}
 * @param {_fun} функция будт выполняться при нажатии
*/
export function PLSwitchPachkaBut (_cont, _x, _y, _fun) {
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
		}

		// если нужно - создаем новые компоненты
		for (var i = 0; i < this.array.length; i++) {
			if (this.arrayComp[i] === undefined || this.arrayComp[i].visible === false) {
				var pachkaLine = this.getCompPachkaBut();
			}
			this.arrayComp[i].setArr(this.array[i].array, true);
		}
	};


	// создание или получение из кеша
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
		set: function (value) {
			if (this._index === value) return;
			this._index = value;

			this.changeActiv();
		},
		get: function () {
			return this._index;
		}
	},
	width: {
		set: function (value) {
			if (this._width === value) return;
			this._width = value;

			this._wComponent = this._width;
			this.reWH();
			this.reposition();
		},
		get: function () {
			return this._width;
		}
	},
	height: {
		set: function (value) {
			if (this._height === value) return;
			this._height = value;

			this._hComponent = this._height / this.array.length;
			this.reWH();
			this.reposition();
		},
		get: function () {
			return this._height;
		}
	},
	wComponent: {
		set: function (value) {
			if (this._wComponent === value) return;
			this._wComponent = value;

			this.reWH();
			this.reposition();
		},
		get: function () {
			return this._wComponent;
		}
	},
	hComponent: {
		set: function (value) {
			if (this._hComponent === value) return;
			this._hComponent = value;

			this.reWH();
			this.reposition();
		},
		get: function () {
			return this._hComponent;
		}
	}
});


/**
 * Хранит массив <InfoImageWithBut>. (инфо одного ряда)
 * @class
*/
function InfoPachkaLine () {
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
		}

		// очищаем лишнее
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
function InfoImageWithBut (_link, _text) {
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
export function PLPachkaButton3 (_cont, _x, _y, _fun) {
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
		}

		// добавляем если не хватает
		for (var i = 0; i < this.array.length; i++) {
			var b = this.getCompImgBut();
			b.butPosition = this._butPosition;
		}

		for (var i = 0; i < this.arrayComp.length; i++) {
			this.arrayComp[i].activ = false;
		}

		// очищаем лишние
		for (var i = this.array.length; i < this.arrayComp.length; i++) {
			if (this.arrayComp[i] && this.arrayComp[i].visible) {
				this.arrayComp[i].visible = false;
			}
		}

		this.rewriteData();
		this.reposition();
		this.reWH();
	};

	// создание или получение из кеша
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
		set: function (value) {
			if (this._index === value) return;
			this._index = value;

			this.changeActiv();
		},
		get: function () {
			return this._index;
		}
	},
	width: {
		set: function (value) {
			if (this._width === value) return;
			this._width = value;

			this._wComponent = this._width / this.array.length;
			this.reWH();
			this.reposition();
		},
		get: function () {
			return this._width;
		}
	},
	height: {
		set: function (value) {
			if (this._height === value) return;
			this._height = value;

			this._hComponent = this._height;
			this.reWH();
			this.reposition();
		},
		get: function () {
			return this._height;
		}
	},
	wComponent: {
		set: function (value) {
			if (this._wComponent === value) return;
			this._wComponent = value;

			this.reWH();
			this.reposition();
		},
		get: function () {
			return this._wComponent;
		}
	},
	hComponent: {
		set: function (value) {
			if (this._hComponent === value) return;
			this._hComponent = value;

			this.reWH();
			this.reposition();
		},
		get: function () {
			return this._hComponent;
		}
	},
	butPosition: {
		set: function (value) {
			if (this._butPosition === value) return;
			this._butPosition = value;

			for (var i = 0; i < this.arrayComp.length; i++) {
				if (this.arrayComp[i].visible) {
					this.arrayComp[i].butPosition = this._butPosition;
				}
			}
		},
		get: function () {
			return this._butPosition;
		}
	},
	visible: {
		set: function (value) {
			this._visible = value;
		},
		get: function () {
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
function PLImageWithBut (_cont, _x, _y, _fun) {
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
	this._link = '';//'resources/images/cat_sing.png';
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
	};


	// для выполняния Аут/овер на двух связанных компонентах
	var doEvent = true;
	var doEvent1 = true;
	function funOut (e) {

		if (doEvent === false) return;
		doEvent = false;
		if (this.butImg === undefined) self.butImg.mouseOut(e);
		else self.button.mouseOut(e);
		doEvent = true;
	}

	function funOver (e) {
		if (doEvent1 === false) return;
		doEvent1 = false;
		if (this.butImg === undefined) self.butImg.mouseOver(e);
		else self.button.mouseOver(e);
		doEvent1 = true;
	}


	this.init();
}
PLImageWithBut.prototype = Object.create(PIXI.Container.prototype);
PLImageWithBut.prototype.constructor = PLImageWithBut;
Object.defineProperties(PLImageWithBut.prototype, {
	activ: {
		set: function (value) {

			if (this._activ === value) return;
			this._activ = value;

			this.button.activ = this._activ;
		},
		get: function () {
			return this._activ;
		}
	},
	width: {
		set: function (value) {
			if (this._width === value) return;
			this._width = value;

			this.panel.width = this._width;
			this.button.width = this._width;
			this.butImg.width = this._width;
		},
		get: function () {
			return this._width;
		}
	},
	height: {
		set: function (value) {
			if (this._height === value) return;
			this._height = value;

			// картинка подстраиваться под высоту
			this.panel.height = this._height;
			this.butImg.height = this._link === '' ? 0 : this._height - this.button.height;
			this.reposition();
		},
		get: function () {
			return this._height;
		}
	},
	link: {
		set: function (value) {
			if (this._link === value) return;
			this._link = value;
			this.butImg.loadImeg(this._link);
		},
		get: function () {
			return this._link;
		}
	},
	text: {
		set: function (value) {
			if (this._text === value) return;
			this._text = value;
			this.button.text = this._text;
		},
		get: function () {
			return this._text;
		}
	},
	hImage: {
		set: function (value) {
			if (this._hImage === value) return;
			this._hImage = value;

			this.butImg.height = this._link === '' ? 0 : this._hImage;
			this._height = this._hImage + this._hButton;
			this.panel.height = this._height;
			this.reposition();
		},
		get: function () {
			return this._hImage;
		}
	},
	hButton: {
		set: function (value) {
			if (this._hButton === value) return;
			this._hButton = value;

			this.button.height = this._hButton;
			this._height = this._hImage + this._hButton;
			this.panel.height = this._height;
			this.reposition();
		},
		get: function () {
			return this._hButton;
		}
	},
	butPosition: {
		set: function (value) {
			if (this._butPosition === value) return;
			this._butPosition = value;
			this.reposition();
		},
		get: function () {
			return this._butPosition;
		}
	},
	activMouse: {
		set: function (value) {
			if (this._activMouse === value) return;
			this._activMouse = value;

			this.button.activMouse = this._activMouse;
			this.butImg.activMouse = this._activMouse;
		},
		get: function () {
			return this._activMouse;
		}
	}
});
