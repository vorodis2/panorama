/**
 * Компонент выбора цвета на основе формата hsv.
 * @class
 */
export function HSVGradient (cont, x, y, fun) {
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
	this.gradientLinks = [
		'resources/images/pikNew/color/hsvBG.png',
		'resources/images/pikNew/color/hueBG.jpg',
		'resources/images/pikNew/color/satBG.png',
		'resources/images/pikNew/color/valBG.png'
	];
	/** Массив линков для указателей */
	this.pointerLinks = [
		'resources/images/pikNew/color/colorPickerLarge.png',
		'resources/images/pikNew/color/verticalSliderTransparent.png',
		'resources/images/pikNew/color/verticalSliderTransparent.png',
		'resources/images/pikNew/color/verticalSliderTransparent.png'
	];

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
			this.pivot.set(this.picWidth / 2, this.picHeight / 2);
			// this.scale.set(0.9, 0.9);
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

	function onUp (e) {
		self.arrayGradient[correntIdArr].off('mousemove', onMove);
		self.arrayGradient[correntIdArr].off('mouseup', onUp);
		pl102.stage.off('mouseup', onUp);
		self.arrayGradient.forEach(function (item) {
			item.interactive = true;
		});
		if (self.fun) self.fun();
	}

	var correntIdArr = false;
	function onDown (e) {
		var isPointer = (e.target.isPointer !== undefined);
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

	function onOverPointer (e) {
		e.target.defaultCursor = 'url(resources/images/pikNew/color/579006.png) 10 10, auto';
	}

	function onOver (e) {
		e.target.off('mousedown', onDown);
		e.target.on('mousedown', onDown);
		correntIdArr = e.target.idArr;
		self.dragPoint(e.target);
		e.target.defaultCursor = 'url(resources/images/pikNew/color/579006.png) 10 10, auto';
	}

	function onOut (e) {}

	function onMove (e) {
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
			var y1 = (this.color_hsv[0] / 360) * this.arrayGradient[1].height;
			self.arrayPointer[1].x = this.arrayGradient[1].x;
			self.arrayPointer[1].y = y1 + this.arrayGradient[1].y;
		}
		var x0 = (this.color_hsv[1] / 100) * this.arrayGradient[0].width;
		var y0 = ((100 - this.color_hsv[2]) / 100) * this.arrayGradient[0].height;
		self.arrayPointer[0].x = x0 + this.arrayGradient[0].x;
		self.arrayPointer[0].y = y0 + this.arrayGradient[0].y;

		var y2 = (this.color_hsv[1] / 100) * this.arrayGradient[2].height;
		self.arrayPointer[2].x = this.arrayGradient[2].x;
		self.arrayPointer[2].y = y2 + this.arrayGradient[2].y;

		var y3 = ((100 - this.color_hsv[2]) / 100) * this.arrayGradient[3].height;
		self.arrayPointer[3].x = this.arrayGradient[3].x;
		self.arrayPointer[3].y = y3 + this.arrayGradient[3].y;
	};
	/**
	 * Перерасчет значений hsv формат относительно положению курсора
	 * @param {PLImage} element - картинка на которую навели.
	 */
	this.drag = function (element) {
		if (element.idArr === 0) {
			this.color_hsv[1] = Math.round((localPoint.x / element.width) * 100);
			this.color_hsv[2] = Math.round(((element.height - localPoint.y) / element.height) * 100);
		}
		if (element.idArr === 1) {
			this.color_hsv[0] = Math.round((localPoint.y / element.height) * 360);
		}
		if (element.idArr === 2) {
			this.color_hsv[1] = Math.round((localPoint.y / element.height) * 100);
		}
		if (element.idArr === 3) {
			this.color_hsv[2] = Math.round(((element.height - localPoint.y) / element.height) * 100);
		}
	};

	this.draw = function () {
		var whField = (this._width) * ratio;
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
		set: function (value) {
			if (this._width === value) return;
			this._width = value;
			this.draw();
			// this.reposition();
		},
		get: function () {
			return this._width;
		}
	},
	height: {
		set: function (value) {
			if (this._height === value) return;
			this._height = value;
		},
		get: function () {
			return this._height;
		}
	},
	otstup: {
		set: function (value) {
			if (this._otstup === value) return;
			this._otstup = value;
			this.draw();
		},
		get: function () {
			return this._otstup;
		}
	},
	color: {
		set: function (value) {
			if (this._color === value) return;
			this._color = value;
			this.color_hex = this.colorConverter.decToHex(this._color);
			this.color_rgb = this.colorConverter.hexToRgb(this.color_hex);
			this.color_hsv = this.colorConverter.rgbToHsv(this.color_rgb);
			this.convertToLocal();
			this.dragPointer();
			this.drawBackground();
		},
		get: function () {
			return this._color;
		}
	},
	activMouse: {
		set: function (value) {
			if (this._activMouse === value) return;
			this._activMouse = value;
			this.arrayGradient.forEach(function (item) {
				item.activMouse = this._activMouse;
			}, this);
			this.arrayPointer.forEach(function (item) {
				item.activMouse = this._activMouse;
			}, this);
		},
		get: function () {
			return this._activMouse;
		}
	}
});
