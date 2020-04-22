export function PLColorPalette (_cont, _x, _y, _fun) {
	PIXI.Container.call(this);
	_cont.addChild(this);
	this.type = 'PLColorPalette';
	var self = this;
	pl102.addElement(this);

	this.fun = _fun;
	this.funBtnAdd = null;
	this.funChangeVisiblePanel = null;

	this.x = _x || 0;
	this.y = _y || 0;

	this._width = 100;
	this._height = 50;
	this._otstup = 2;
	this._activMouse = true;
	this._activ = true;
	this._value = '0xffffff';
	this._color = '0xffffff';
	this._isOpenPallPicker = false;

	this.index = 0;

	this.arrColor = [0x000000, 0xfec828, 0x42a5f6, 0xfe7143, 0x66bb6a];
	this.ratio = 0.7;
	/**
	 * Формат пришедшего цвета.
	 * DEC - 16777215, DECSTR - 0xffffff, HEX - 0xffffff, THREE - THREE.Color.
	 */
	this.colorFormat = 'DECSTR';

	var offsetBtn = 2;
	var offsetBorder = 1;

	this.panel = new PLPanel(this, 0, 0);
	this.panel.image.visible = false;
	pl102.removeElement(this.panel, true);

	this.colorConverter = new ColorConverter();

	this.colorPicker = new PLColorPicker(this, 0, 0, '', function () {
		self.index = this.index;
		self.changeValueToFormat(this.color);
		if (self.fun) self.fun();
	});
	this.colorPicker.kolColor = 5;
	this.colorPicker.setArray(this.arrColor);
	this.colorPicker.otstup = this._otstup;
	this.colorPicker.activContur = true;
	this.colorPicker.kolElRow = 5;
	this.colorPicker.contur.innerLine = true;
	this.colorPicker.contur.thickness = -1.5;

	pl102.removeElement(this.colorPicker, true);
	
	this.arrLink = [
		'resources/images/pikNew/color/plus.png',
		'resources/images/pikNew/color/minus.png'
	];
	this.btnAdd = new PLButton(this, 0, 0, '', function () {
		self.isOpenPallPicker = !self._isOpenPallPicker;
		
		// self.mColorPalettePicker.visible = isOpenPallPicker;
		// if (isOpenPallPicker === true) {
		// 	self._height = self.panel.height + self.mColorPalettePicker._height;
		// } else {
		// 	self._height = self.panel.height;
		// }
		if (self.funBtnAdd) self.funBtnAdd();
		// if (self.funChangeVisiblePanel) self.funChangeVisiblePanel(isOpenPallPicker);
	});
	// this.btnAdd.funUp = function () {
	// 	self.checkOpenPalettePicker(isOpenPallPicker);
	// };
	this.btnAdd.boolScalePic = true;
	this.btnAdd.setStile(1);
	this.btnAdd.boolKontur = true;
	this.btnAdd.konturSize = offsetBorder;
	this.btnAdd.konturColor = 0xa9a9a9;
	this.btnAdd.panel.image.alpha = 0;
	this.btnAdd.loadImeg(this.arrLink[0]);
	pl102.removeElement(this.btnAdd, true);

	// this.onBtnAddDown = function () {
	// 	var p = self.toLocal(pl102.global);
	// 	var isW = p.x <= self._width;
	// 	var isH = p.y <= self._height;
	// 	var isInner = (p.x >= 0 && p.y >= 0 && isW && isH);
	// 	if (!isInner) {
	// 		// isOpenPallPicker = false;
	// 		// self.mColorPalettePicker.visible = isOpenPallPicker;
	// 		self.btnAdd.loadImeg(this.arrLink[0]);
	// 		pl102.stage.off('mousedown', self.onBtnAddDown);
	// 		// if (self.funChangeVisiblePanel) self.funChangeVisiblePanel(isOpenPallPicker);
	// 	}
	// };

	// this.checkOpenPalettePicker = function (_visible) {
	// 	if (_visible === true) {
	// 		pl102.stage.on('mousedown', self.onBtnAddDown);
	// 	} else {
	// 		pl102.stage.off('mousedown', self.onBtnAddDown);
	// 	}
	// };

	// this.mColorPalettePicker = new MColorPalettePicker(this, 0, 0, function () {
	// 	if (self.index === -1) return;
	// 	self.changeValueToFormat(this.color);
	// 	self.arrColor[self.index] = this.color;
	// 	self.colorPicker.clearColor();
	// 	self.colorPicker.setArray(self.arrColor);
	// 	if (self.fun) self.fun();
	// });
	// this.mColorPalettePicker.height = 164;
	// this.mColorPalettePicker.visible = isOpenPallPicker;

	this.draw = function () {
		var cpl = this._width * this.ratio;
		var cpr = this._width - cpl;
		var cph = 0;

		this.colorPicker.position.set(this._otstup, this._otstup);
		this.colorPicker.width = cpl - this._otstup * 2;
		cph = this.colorPicker.height;

		this.btnAdd.position.set(cpl, this._otstup + offsetBtn);
		this.btnAdd.width = cpr - this._otstup - offsetBorder * 2;
		this.btnAdd.height = cph - offsetBtn * 2;

		this.panel.width = this._width;
		this.panel.height = cph + this._otstup * 2;

		// this.mColorPalettePicker.position.set(0, this.panel.height);
		// this.mColorPalettePicker.width = this._width;

		// if (isOpenPallPicker === true) {
			// this._height = this.panel.height + this.mColorPalettePicker.height;
		// } else {
			this._height = this.panel.height;
		// }
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

	this.draw();
}

PLColorPalette.prototype = Object.create(PIXI.Container.prototype);
PLColorPalette.prototype.constructor = PLColorPalette;
Object.defineProperties(PLColorPalette.prototype, {
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
			var basicColor = this.getBasicColorFormat(this._value);
			this.colorPicker.moveKontur(basicColor);
			this.index = this.colorPicker.index;
		},
		get: function () {
			return this._value;
		}
	},
	otstup: {
		set: function (value) {
			if (this._otstup == value) return;
			this._otstup = value;
			this.colorPicker.otstup = this._otstup;
			// this.mColorPalettePicker.otstup = this._otstup;
			this.draw();
		},
		get: function () {
			return this._otstup;
		}
	},
	activMouse: {
		set: function (value) {
			if (this._activMouse == value) return;
			this._activMouse = value;
		},
		get: function () {
			return this._activMouse;
		}
	},
	isOpenPallPicker: {
		set: function (value) {
			if (this._isOpenPallPicker === value) return;
			this._isOpenPallPicker = value;
			var indexActImg = (this._isOpenPallPicker === false ? 0 : 1);
			this.btnAdd.loadImeg(this.arrLink[indexActImg]);
		},
		get: function () {
			return this._isOpenPallPicker;
		}
	}
});

export function MColorPalettePicker (_cont, _x, _y, _fun, _funDrag) {
	PIXI.Container.call(this);
	this.type = 'MColorPalettePicker';
	var self = this;
	_cont.addChild(this);
	pl102.addElement(this);

	this.fun = _fun;
	this.funDrag = _funDrag;

	this.x = _x || 0;
	this.y = _y || 0;

	this._width = 100;
	this._height = 100;
	this._otstup = 2;
	this._activMouse = true;
	this._activ = true;

	this.position.set(this.x, this.y);

	this.content = new PIXI.Container();
	this.addChild(this.content);

	this.panel = new PLPanel(this.content, 0, 0);
	// this.panel.visible = false;
	pl102.removeElement(this.panel, true);

	this.ratioLeft = 0.56;
	this.ratioCenter = 0.14;
	this.ratioRight = 1 - (this.ratioLeft + this.ratioCenter);

	this.color = 0xffffff;
	this.colorRGB = [255, 255, 255];
	this.colorHEX = '#ffffff';

	this.colorConverter = new ColorConverter();

	this.colorPick = new PLColorPick(this.content, 0, 0, function () {
		self.colorConvert(this.color);
		self.gradient.setColor(self.colorHEX, 'click');
		self.colorPanel.color = this.color;
		self.inputGroupR.set([self.colorRGB[0]]);
		self.inputGroupG.set([self.colorRGB[1]]);
		self.inputGroupB.set([self.colorRGB[2]]);
		self.inputGroupHex.set([self.colorHEX]);
		// self.offSelect();
		if (self.fun) self.fun();
	});
	this.colorPick.activ = true;

	this.colorPick.funDrag = function () {
		self.colorConvert(this.colorDrag);
		self.gradient.setColor(self.colorHEX);
		self.colorPanel.color = this.colorDrag;
		self.inputGroupR.set([self.colorRGB[0]]);
		self.inputGroupG.set([self.colorRGB[1]]);
		self.inputGroupB.set([self.colorRGB[2]]);
		self.inputGroupHex.set([self.colorHEX]);
		// self.colorDrag = this.colorDrag;
		if (self.funDrag) self.funDrag();
	};

	this.colorPick.funOut = function () {
		self.colorConvert(this.color);
		self.gradient.setColor(self.colorHEX);
		self.colorPanel.color = this.color;
		self.inputGroupR.set([self.colorRGB[0]]);
		self.inputGroupG.set([self.colorRGB[1]]);
		self.inputGroupB.set([self.colorRGB[2]]);
		self.inputGroupHex.set([self.colorHEX]);
		if (self.funDrag) self.funDrag();
	};
	// this.colorPick.konturColor = this.color2;
	pl102.removeElement(this.colorPick, true);

	this.gradient = new PLGradient(this.content, 0, 0, function () {
		self.colorConvert(this.color);
		self.colorPick.setColor(self.colorHEX, 'click');
		self.colorPanel.color = this.color;
		self.inputGroupR.set([self.colorRGB[0]]);
		self.inputGroupG.set([self.colorRGB[1]]);
		self.inputGroupB.set([self.colorRGB[2]]);
		self.inputGroupHex.set([self.colorHEX]);
		// self.offSelect();
		if (self.fun) self.fun();
	});
	this.gradient.drawCursor(4, 5);
	this.gradient.activ = true;

	this.gradient.funDrag = function () {
		self.colorConvert(this.colorDrag);
		self.colorPick.setColor(self.colorHEX);
		self.colorPanel.color = this.colorDrag;
		self.inputGroupR.set([self.colorRGB[0]]);
		self.inputGroupG.set([self.colorRGB[1]]);
		self.inputGroupB.set([self.colorRGB[2]]);
		self.inputGroupHex.set([self.colorHEX]);
		// self.colorDrag = this.colorDrag;
		if (self.funDrag) self.funDrag();
	};

	this.gradient.funOut = function () {
		self.colorConvert(this.color);
		self.colorPick.setColor(self.colorHEX, 'out');
		self.colorPanel.color = this.color;
		self.inputGroupR.set([self.colorRGB[0]]);
		self.inputGroupG.set([self.colorRGB[1]]);
		self.inputGroupB.set([self.colorRGB[2]]);
		self.inputGroupHex.set([self.colorHEX]);
		if (self.funDrag) self.funDrag();
	};
	// this.gradient.konturColor = this.color2;
	pl102.removeElement(this.gradient, true);

	this.imageBtn = new PLButton(this.content, 0, 0, '');
	this.imageBtn.boolScalePic = true;
	this.imageBtn.visiblePanel = false;
	this.imageBtn.loadImeg('resources/images/pikNew/col_pic.png');
	this.imageBtn.otstup = 0;
	this.imageBtn.okDown = false;
	this.imageBtn.width = this.imageBtn.height = 46;
	pl102.removeElement(this.imageBtn, true);

	this.colorPanel = new PLPanel(this.content, 0, 0);
	this.colorPanel.image.visible = false;
	pl102.removeElement(this.colorPanel, true);

	this.inputGroupR = new InputGroup(this.content, 0, 0, 'R', 1, function (_input) {
		if (isNaN(this.value[0] * 1) === true) {
			this.value[0] = self.colorRGB[0];
			_input.value = self.colorRGB[0];
			return;
		}
		self.colorRGB[0] = this.value[0] * 1;
		self.colorConvert(self.colorRGB);

		self.colorPick.setColor(self.colorHEX, 'click');
		self.gradient.setColor(self.colorHEX, 'click');
		self.colorPanel.color = self.color;
		self.inputGroupHex.set([self.colorHEX]);
		if (self.fun) self.fun();
	});
	this.inputGroupR.label.fontSize = 13;
	this.inputGroupR.otstup1 = 1;
	this.inputGroupR.panel.visible = false;
	pl102.removeElement(this.inputGroupR, true);

	this.inputGroupG = new InputGroup(this.content, 0, 0, 'G', 1, function (_input) {
		if (isNaN(this.value[0] * 1) === true) {
			this.value[0] = self.colorRGB[1];
			_input.value = self.colorRGB[1];
			return;
		}
		self.colorRGB[1] = this.value[0] * 1;
		self.colorConvert(self.colorRGB);
		self.colorPick.setColor(self.colorHEX, 'click');
		self.gradient.setColor(self.colorHEX, 'click');
		self.colorPanel.color = self.color;
		self.inputGroupHex.set([self.colorHEX]);
		if (self.fun) self.fun();
	});
	this.inputGroupG.label.fontSize = 13;
	this.inputGroupG.otstup1 = 1;
	this.inputGroupG.panel.visible = false;
	pl102.removeElement(this.inputGroupG, true);

	this.inputGroupB = new InputGroup(this.content, 0, 0, 'B', 1, function (_input) {
		if (isNaN(this.value[0] * 1) === true) {
			this.value[0] = self.colorRGB[2];
			_input.value = self.colorRGB[2];
			return;
		}
		self.colorRGB[2] = this.value[0] * 1;
		self.colorConvert(self.colorRGB);
		self.colorPick.setColor(self.colorHEX, 'click');
		self.gradient.setColor(self.colorHEX, 'click');
		self.colorPanel.color = self.color;
		self.inputGroupHex.set([self.colorHEX]);
		if (self.fun) self.fun();
	});

	this.inputGroupB.label.fontSize = 13;
	this.inputGroupB.otstup1 = 1;
	this.inputGroupB.panel.visible = false;
	pl102.removeElement(this.inputGroupB, true);

	this.inputGroupHex = new InputGroup(this.content, 0, 0, '', 1, function (_input) {
		var length = this.value[0].length;
		var isHex = (this.value[0].indexOf('#') !== -1);
		if (length === 7 && isHex === true) {
			self.colorConvert(this.value[0]);
		} else if (length === 6 && isHex === false) {
			this.value[0] = '#' + this.value[0];
			_input.value = this.value[0];
			self.colorConvert(this.value[0]);
		} else {
			this.value[0] = self.colorHEX;
			_input.value = self.colorHEX;
			return;
		}
		self.colorPick.setColor(self.colorHEX, 'click');
		self.gradient.setColor(self.colorHEX, 'click');
		self.colorPanel.color = self.color;
		self.inputGroupR.set([self.colorRGB[0]]);
		self.inputGroupG.set([self.colorRGB[1]]);
		self.inputGroupB.set([self.colorRGB[2]]);
		if (self.fun) self.fun();
	});
	this.inputGroupHex.array[0].input.htmlElement.style.fontWeight = 'bold';
	pl102.removeElement(this.inputGroupHex, true);

	this.colorConvert = function (_color) {
		if (typeof _color === 'string') {
			if (_color.indexOf('0x') !== -1) {
				// Decimal color
				this.color = this.colorConverter.decStrToDec(_color);
				this.colorRGB = this.colorConverter.decToRgb(_color);
				this.colorHEX = this.colorConverter.decToHex(_color);
			} else {
				// HEX color
				this.colorHEX = _color;
				this.color = this.colorConverter.hexToDec(_color);
				this.colorRGB = this.colorConverter.hexToRgb(_color);
			}
		} else if (typeof _color === 'number') {
			this.color = _color;
			this.colorHEX = this.colorConverter.decToHex(_color);
			this.colorRGB = this.colorConverter.decToRgb(_color);
		} else {
			this.colorRGB = _color;
			this.color = this.colorConverter.rgbToDec(_color);
			this.colorHEX = this.colorConverter.rgbToHex(_color);
		}
	};

	this.draw = function () {
		var wl = this._width * this.ratioLeft;
		var wc = this._width * this.ratioCenter;
		var wr = this._width - (wl + wc);
		var hg = this.inputGroupR.height;
		var hi = this._height - hg * 2 - this._otstup * 3;
		var hp = this._height - hg - this._otstup * 3;
		var wrgb = ((wl + wc) - this._otstup * 4) / 3;
		var ofbix = (wr - this._otstup - this.imageBtn.width) / 2;
		var ofbiy = (hi + this._otstup - this.imageBtn.height) / 2;

		this.colorPick.position.set(this._otstup, this._otstup);
		this.colorPick.width = wl - this._otstup * 2;
		this.colorPick.height = hp;

		this.gradient.position.set(wl, this._otstup);
		this.gradient.width = wc - this._otstup;
		this.gradient.height = hp;

		this.imageBtn.position.set(ofbix + wl + wc, ofbiy);

		this.colorPanel.position.set(wl + wc, hi + this._otstup);
		this.colorPanel.width = wr - this._otstup;
		this.colorPanel.height = hg;

		this.inputGroupR.position.set(this._otstup, hp + this._otstup * 2);
		this.inputGroupR.width = wrgb;

		this.inputGroupG.position.set(this._otstup * 2 + wrgb, hp + this._otstup * 2);
		this.inputGroupG.width = wrgb;

		this.inputGroupB.position.set(this._otstup * 3 + wrgb * 2, hp + this._otstup * 2);
		this.inputGroupB.width = wrgb;

		this.inputGroupHex.position.set(wl + wc, hp + this._otstup * 2);
		this.inputGroupHex.width = wr - this._otstup;

		this.panel.width = this._width;
		this.panel.height = this._height;

	};

	this.setColor = function (_color) {
		this.color = _color;
		if (typeof _color === 'string') {
			this.color = this.colorConverter.decStrToDec(_color);
		}
		this.colorConvert(this.color);
		this.colorPick.setColor(this.colorHEX, 'click');
		this.gradient.setColor(this.colorHEX, 'click');
		this.colorPanel.color = this.color;
		this.inputGroupR.set([this.colorRGB[0]]);
		this.inputGroupG.set([this.colorRGB[1]]);
		this.inputGroupB.set([this.colorRGB[2]]);
		this.inputGroupHex.set([this.colorHEX]);
	};

	this.setColor(this.color);
	this.draw();
}

MColorPalettePicker.prototype = Object.create(PIXI.Container.prototype);
MColorPalettePicker.prototype.constructor = MColorPalettePicker;
Object.defineProperties(MColorPalettePicker.prototype, {
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
			this.draw();

		},
		get: function () {
			return this._otstup;
		}
	}
});
