
export function MTypedColor (cont, x, y, fun, title, typePicker) {
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
	this.content.addChild(this);

	/// Графика, накрывающая кнопку
	this.graphRect = new PIXI.Graphics();
	this.content.addChild(this.graphRect);
	this.graphRect.alpha = 0.5;
	this.graphRect.interactive = true;

	this.colorConverter = new ColorConverter();

	this.arrColor = [0x555555, 0xff4c4c, 0x4faf5c, 0x80bece, 0xf9ae34, 0xffffff, 0x000000, 0xffd46b, 0xffb86b];
	// компонент нижняя панель выбора цвета
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
	};
	// this.mColorPickerPanel.typePicker = 'hsv';
	pl102.removeElement(this.mColorPickerPanel, true);
	// скрытие нижней панели если клик вне компонента
	var p, intersect;
	this.mouseDown = function () {
		p = self.toLocal(pl102.global);
		intersect = self.contains(p.x, p.y);
		if (self.funDown) self.funDown();
		if (intersect == false) { self.setVisiblePanel(false); }
	};

	// проверка кликаем в компоненте или нет
	var fullHeight;
	this.contains = function (x, y) { // todo проверить с масштабирование и поворотом
		fullHeight = self.height;
		if (self.mColorPickerPanel.activ) fullHeight += self.mColorPickerPanel.height;
		return (x >= 0 && x <= self.width && y >= 0 && y <= fullHeight);
	};

	// скрытие нижней панели при клике
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
	};

	// под кнопкой
	this.btnPanel = new PLPanel(this, 0, 0);
	pl102.removeElement(this.btnPanel, true);
	this.btnPanel.image.visible = false;
	this.btnPanel.color = 0xffffff;
	// под кубиками
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
	this.button.color = this.baseColor;

	// компонент квадратные кнопки с цветами
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

	pl102.removeElement(this.pLColorPicker, true);
	// // при изминении размермеров pLColorPicker перепозиционируем
	this.pLColorPicker.funSize = function () {
		// self.reposition();
		if (self.funSize) self.funSize();
	};

	// перерисовка положений при изменении высоты ширины и цвета
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

	var color;
	// добавляем цвета
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

	this.addColor(this.arrColor);

	// добавляем цвета
	// если пришел цвет удалим цвет
	// если пришел undefined или null удалим последный в списке
	// если пришел массив цветов удалим все цвета с массива
	this.removeColor = function (_param) {
		this.pLColorPicker.removeColor(_param);
		this.arrColor = this.pLColorPicker.arrColor;
	};

	// чистим массив с цветами
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
		if (typeof (value) === 'number') {
			this.colorFormat = 'DEC';
			if (value < 0 || value > 16777215) {
				value = 16777215;
				console.warn('Значение цвета выходит за границы 0 -> 16777215!');
			}
			return value;
		}
		if (typeof (value) === 'string') {
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
		if (typeof (value) === 'object') {
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
		if (typeof (value) === 'string') {
			if (value.indexOf('#') !== -1) {
				color = parseInt(value.replace('#', '0x'), 16);
			}
			if (value.indexOf('0x') !== -1) {
				color = parseInt(value, 16);
			}
		}
		if (typeof (value) === 'object') {
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
		set: function (value) {
			if (this._width == value) return;
			this._width = value;
			this.reposition();

		},
		get: function () {
			return this._width;
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
	color: {
		set: function (value) {
			this._color = value;
			this.value = value;
		},
		get: function () {
			return this._value;
		}
	},
	value: {
		set: function (v) {
			if (this._value == v) return;
			this._value = this.check(v);
			this.button.color = this.getBasicColorFormat(this._value);
			if (this._text === 'null') this.button.text = this.getCorrectText();

			this.mColorPickerPanel.color = this.getBasicColorFormat(this._value);
			this.reposition();
		},
		get: function () {
			return this._value;
		}
	},
	text: {
		set: function (value) {
			if (this._text == value) return;
			this._text = value;
			if (this._text === null || this._text === undefined) this._text = 'null';
			if (this._text === 'null') this.button.text = this.getCorrectText();
			else this.button.text = this._text;
		},
		get: function () {
			return this._text;
		}
	},
	otstup: {
		set: function (value) {
			if (this._otstup == value) return;
			this._otstup = value;
			this.button.x = this._otstup;
			this.button.y = this._otstup;
			this.pLColorPicker.x = this._otstup;
			this.mColorPickerPanel.otstup = this._otstup;
			this.reposition();
		},
		get: function () {
			return this._otstup;
		}
	},
	boolActiv: {
		set: function (value) {
			if (this._boolActiv == value) return;
			this._boolActiv = value;
		},
		get: function () {
			return this._boolActiv;
		}
	},
	activMouse: {
		set: function (value) {
			if (this._activMouse === value) return;
			this._activMouse = value;
			if (this.mColorPickerPanel.activ) {
				this.colorPanelVisible(value);
			}
			this.changeActiv();
		},
		get: function () {
			return this._activMouse;
		}
	},
	colPicActiv: {
		set: function (value) {
			if (this._colPicActiv == value) return;
			this._colPicActiv = value;
			if (!this._colPicActiv) this.clearColor();
			this.pLColorPicker.visible = this._colPicActiv;
			this.btnPanel1.visible = this._colPicActiv;
			this.reposition();
		},
		get: function () {
			return this._colPicActiv;
		}
	},
	boolPlus: {
		set: function (value) {
			if (this._boolPlus == value) return;
			this._boolPlus = value;
		},
		get: function () {
			return this._boolPlus;
		}
	},
	kolElRow: {
		set: function (value) {
			if (this._kolElRow == value) return;
			this._kolElRow = value;
			this.pLColorPicker.kolElRow = this._kolElRow;
			this.reposition();
		},
		get: function () {
			return this._kolElRow;
		}
	},
	kolColor: {
		set: function (value) {
			if (this._kolColor == value) return;
			this._kolColor = value;
			this.pLColorPicker.kolColor = this._kolColor;
			this.reposition();
		},
		get: function () {
			return this._kolColor;
		}
	}
});


function MColorPickerPanel (cont, x, y, typePicker, fun, funDrag) {
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
		this.picker.y = this._otstup;
		// первым должны задать высоту, для корректного расчета
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
		set: function (value) {
			if (this._width === value) return;
			this._width = value;
			this.draw();
		},
		get: function () {
			return this._width;
		}
	},
	height: {
		set: function (value) {
			if (this._height === value) return;
			this._height = value;
			this.draw();
		},
		get: function () {
			return this._height;
		}
	},
	otstup: {
		set: function (value) {
			if (this._otstup === value) return;
			this._otstup = value;
			this.picker.otstup = this._otstup;
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
			this.picker.color = this._color;
		},
		get: function () {
			return this._color;
		}
	},
	activ: {
		set: function (value) {
			if (this._activ === value) return;
			this._activ = value;
			this.visible = this._activ;
		},
		get: function () {
			return this._activ;
		}
	},
	activMouse: {
		set: function (value) {
			if (this._activMouse === value) return;
			this._activMouse = value;
			this.panel.activMouse = this._activMouse;
			this.picker.activMouse = this._activMouse;
		},
		get: function () {
			return this._activMouse;
		}
	}
});

function MColorBasicPicker (cont, x, y, fun, funDrag) {
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
	pl102.removeElement(this.gradient, true);

	// получаем цвет по клику
	this.gradient.fun = function () {
		self.color = this._color;
		self.pLColorPick.setColor(this._color.replace('0x', '#'), 'click');
		self.pLInputRGB.setColor(this._color.replace('0x', '#'));
		if (self.fun) self.fun();
	};

	// получаем цвет по движению мыши
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
	};


	// компонент цветовая палитра
	this.pLColorPick = new PLColorPick(this, 0, 0);
	this.pLColorPick.activ = true;
	pl102.removeElement(this.pLColorPick, true);
	this.pLColorPick.fun = function () {
		self._color = this.color;
		self.gradient.setColor(this.color.replace('0x', '#'), 'click');
		self.pLInputRGB.setColor(this.color.replace('0x', '#'));
		if (self.fun) self.fun();

	};
	// получаем цвет по движению мыши
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
		(code.length > 1) || (code = '0' + code);
		return code;
	};

	var hexcode;
	this.setColorRGB = function (color) {
		hexcode = '0x' + this.hexFromDec(color[0]) + this.hexFromDec(color[1]) + this.hexFromDec(color[2]);
		return hexcode;
	};

	function componentToHex (c) {
		var hex = c.toString(16);
		return hex.length == 1 ? '0' + hex : hex;
	}

	this.corectCol = function (_val) {
		if (typeof _val === 'string') {
			if (_val.indexOf('0x') != -1) return _val.replace('0x', '#');
			else return _val;
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
	};

	// компонент инпуты для воода цвета RGB
	this.pLInputRGB = new PLInputRGB(this, 0, 0, function () {
		self._color = self.setColorRGB(this.color);
		self.gradient.setColorRGB(this.color);
		self.pLColorPick.setColorRGB(this.color);
		if (self.fun) self.fun(false);
	});
	pl102.removeElement(this.pLInputRGB, true);

	// для перерисовки элементов компонента
	this.reposition = function () {
		// this.panel.width = this._width;
		// this.panel.height = this._height;
		this.gradient.width = (this._width * 13) / 100;
		this.gradient.height = (this._height * 77) / 100;
		this.pLColorPick.width = Math.round(this._width - this.gradient.width - this._otstup - 1);
		this.pLColorPick.height = Math.round((this._height * 77) / 100);
		this.pLColorPick.x = this.gradient.width + this._otstup;
		this.pLInputRGB.width = this.pLColorPick.width;
		this.pLInputRGB.height = this._height - this.pLColorPick.height - this._otstup * 2;
		this.pLInputRGB.x = this.pLColorPick.x;
		this.pLInputRGB.y = this.pLColorPick.height + this._otstup + 1;
		// если отключили компонент gradient
		if (this.gradientView === false) {
			this.pLColorPick.width = Math.round(this._width - this._otstup * 2);
			this.pLColorPick.x = this._otstup + 1;
			this.pLInputRGB.width = this.pLColorPick.width;
			this.pLInputRGB.x = this._otstup;
		}
		// если отключили компонент inputRGB
		if (this.inputRGBView === false) {
			this.pLColorPick.height = this._height - this._otstup * 2;
			this.gradient.height = this.pLColorPick.height;
		}
	};
	this.reposition();

	// отключаем компонент inputRGB и перерисовываем остальные компоненты
	this.inputRGBOff = function (value) {
		this.inputRGBView = !value;
		this.pLInputRGB.visible = !value;
		this.reposition();
	};

	// отключаем компонент gradient и перерисовываем остальные компоненты
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
		set: function (value) {
			if (this._width == value) return;
			this._width = value;
			this.reposition();
		},
		get: function () {
			return this._width;
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
	color: {
		set: function (value) {
			if (this._color === value) return;
			this._color = this.corectCol(value);
			this.gradient.setColor(this._color, 'click');
			this.pLInputRGB.setColor(this._color);
			this.pLColorPick.setColor(this._color, 'click');
		},
		get: function () {
			return this._color;
		}
	},
	activMouse: {
		set: function (value) {
			if (this._activMouse === value) return;
			this._activMouse = value;
		},
		get: function () {
			return this._activMouse;
		}
	}
});

function MColorSHVPicker (cont, x, y, fun, funOnMove) {
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
	this._color = 16777215;
	// this._activ = false;
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
		var scale = (this._width < scaleStart) ? this._width / scaleStart : 1;

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
		set: function (value) {
			if (this._width === value) return;
			this._width = value;
			this.draw();
		},
		get: function () {
			return this._width;
		}
	},
	height: {
		set: function (value) {
			if (this._height === value) return;
			this._height = value;
			this.draw();
		},
		get: function () {
			return this._height;
		}
	},
	otstup: {
		set: function (value) {
			if (this._otstup === value) return;
			this._otstup = value;
			this.hsvGradient.otstup = this._otstup;
			this.inputGroupRGB.otstup = this._otstup;
			this.inputGroupHSV.otstup = this._otstup;
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
			if (typeof this._color === 'string') this._color = parseInt(value, 16);
			this.hsvGradient.color = this._color;
			this.colorHandler();
		},
		get: function () {
			return this._color;
		}
	},
	activMouse: {
		set: function (value) {
			if (this._activMouse === value) return;
			this._activMouse = value;
			this.inputGroupRGB.activMouse = this._activMouse;
			this.inputGroupHSV.activMouse = this._activMouse;
			this.inputGroupHEX.activMouse = this._activMouse;
			this.inputGroupHEXInput.activMouse = this._activMouse;
			this.hsvGradient.activMouse = this._activMouse;
		},
		get: function () {
			return this._activMouse;
		}
	}
});
