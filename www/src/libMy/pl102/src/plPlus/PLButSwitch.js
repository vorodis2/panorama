
/**
 * Переключатель с кнопок
 * @class
 * @param {cont} контент
 * @param {_x}
 * @param {_y}
 * @param {_fun}
*/
export function PLButSwitch (_cont, _x, _y, _fun) {
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
				i = (i - 2) > 0 ? i - 2 : -1;
			}
		}

		// выключаем баттон
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
		set: function (value) {
			if (this._width === value) return;
			this._width = value;
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

			for (var i = 0; i < this.arrBut.length; i++) {
				this.arrBut[i].height = this._height;
			}
		},
		get: function () {
			return this._height;
		}
	},
	index: {
		set: function (value) {
			this._index = value;
			this.changeActiv();
		},
		get: function () {
			return this._index;
		}
	},
	plusArrText: {
		set: function (value) {
			this.setArr(value);
		},
		get: function () {
			return this.getArrTab();
		}
	}
});
