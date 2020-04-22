
/**
 * Компонент с набором инпутов, перед инпутами есть текст.
 * @param {String} text - Текст перед инпутами.
 * @param {Number} amount - Количество инпутов.
 * @class
 */
export function InputGroup (cont, x, y, text, amount, fun) {
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

	function onFocus (e) {
		self.value[this.idArr] = this.value;
		if (self.fun) self.fun(this);
	}

	this.draw = function () {
		var l = this.array.length;
		var wt = (this.text.length === 0) ? 0 : this.label.curW + this._otstup1;
		var wi = this._width - wt;
		this.label.text = this.text;
		this.label.y = (this._height - this.label.fontSize) / 2 - 2;
		if (l === 0) {
			this.label.x = this._width / 2 - this.label.curW / 2 + 1;
		} else {
			this.array.forEach(function (item, index) {
				item.width = (wi - (this._otstup * l) + this._otstup) / l;
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
	otstup1: {
		set: function (value) {
			if (this._otstup1 == value) return;
			this._otstup1 = value;
			this.draw();
		},
		get: function () {
			return this._otstup1;
		}
	},
	activMouse: {
		set: function (value) {
			if (this._activMouse == value) return;
			this._activMouse = value;
			this.array.forEach(function (item) {
				item.activMouse = this._activMouse;
			}, this);
		},
		get: function () {
			return this._activMouse;
		}
	}
});
