
export function PLColorUn (cont, x, y, fun, title) {
	PLColor.call(this, cont, x, y, fun, title);
	this.type = 'PLColorUn';
	var self = this;
	pl102.addElement(this);

	this._color = '0xffffff';
	this._boolBig = false;
	this._otstup = 2;
	this._visiblePanel = true;
	this.contentBig = new PIXI.Container();
	this.contentSm = new PIXI.Container();
	this.addChild(this.contentSm);
	this.addChild(this.contentBig);
	this.contentSm.visible = false;
	this.contentBig.visible = false;

	this.heightMax = 200;
	this.heightMin = 100;
	this.debugRect = false;

	this.pLColorPickerPanel.setParent(this.contentSm);
	this.btnPanel.setParent(this.contentSm);
	this.btnPanel1.setParent(this.contentSm);

	this.colorBig = new ColorBig(this.contentBig, 0, 0, function () {
		self._color = this.color;
		self._value = this.color;
		if (self.fun) self.fun();
	});
	pl102.removeElement(this.colorBig, true);
	// //перерисовка положений при изменении высоты ширины и цвета
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

			this.pLColorPickerPanel.y = this.btnPanel1.y + this.btnPanel1.height + this._otstup;

			this.heightMin = this.btnPanel.height + this.btnPanel1.height;
		} else {
			this.pLColorPickerPanel.y = this.btnPanel.height;
			this.heightMin = this.btnPanel.height;
		}

		if (this._boolBig == true) {
			this.colorBig.width = this._width;
			this.colorBig.height = this._height;
		}


		this.pLColorPickerPanel.width = this._width;
		this.pLColorPickerPanel.height = this.colorPanelH;

		if (this.debugRect) this.drawDebugRect();
	};

	var debugGraph;
	this.drawDebugRect = function () {
		if (debugGraph == undefined) {
			debugGraph = new PIXI.Graphics();
			this.addChild(debugGraph);
		}
		debugGraph.clear();
		debugGraph.lineStyle(0.5, 0xff0000);
		debugGraph.drawRect(0, 0, this._width, this._height);
	};


	this.colorBig.otstup = this._otstup;
	this.colorBig.setColor(this._color);
	this.colorBig.funSelectColor = function (_color) {
		if (self.funSelectColor) self.funSelectColor(_color);
		if (self.funSelectColorBig) self.funSelectColorBig(_color);
	};

	this.changeToBig = function () {

		if (this.pLColorPickerPanel.activ === true) {
			this.pLColorPickerPanel.activ = false;
		}
		this.contentSm.visible = !this._boolBig;
		this.contentBig.visible = this._boolBig;
		this.colorBig.activ = this._boolBig;

		if (this._boolBig == true) {
			this._height = this.heightMax;
			this.colorBig.setSize(this._width, this._height);
			this.colorBig.setColor(this._color);
		} else {
			this._height = this.heightMin;
			if (this.boolPlus) this.pLColorPicker.setColor(this.color);
			if (this._text == 'null') this.button.text = this.color;
			this.button.color = this.color;
		}

		if (this.debugRect) this.drawDebugRect();
	};

	this.updateArrColorInBig = function (_arr) {
		this.clearColor();
		this.addColor(_arr);
	};

	this.addColor = function (_param) {
		if (!this._colPicActiv) this.colPicActiv = true;

		if (Array.isArray(_param)) {
			if (_param.length == 0) this.colPicActiv = false;

			this.colorBig.colorPicker.setArray(_param);
			this.pLColorPicker.setArray(_param);
			this.updateArrColor();

			return;
		}

		color = _param;
		if (_param == undefined || _param == null) {
			color = this.baseColor;
		}

		this.pLColorPicker.setColor(color);
		this.colorBig.colorPicker.setColor(color);
		this.updateArrColor();
	};

	this.clearColor = function () {
		if (this._colPicActiv) this.colPicActiv = false;
		this.colorBig.colorPicker.clearColor();
		this.pLColorPicker.clearColor();
	};

	this.clearColor();
	this.addColor(this.arrColor);

	this.changeToBig();

}

PLColorUn.prototype = Object.create(PLColor.prototype);
PLColorUn.prototype.constructor = PLColorUn;
Object.defineProperties(PLColorUn.prototype, {
	boolBig: {
		set: function (value) {
			if (this._boolBig == value) return;
			this._boolBig = value;
			this.changeToBig();
		},
		get: function () {
			return this._boolBig;
		}
	},
	width: {
		set: function (value) {
			if (this._width == value) return;
			this._width = value;
			this.reposition();
			this._height = this.heightMin;
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
			if (this._color == value) return;
			this._color = this.convToCorColor(value);
			this._value = this._color;

			if (this._text == 'null') {
				this.button.text = this.corectForBtn(this._color);
				this.button.color = this._color;
			} else {
				this.button.color = this._color;
			}

			if (this._boolBig) this.colorBig.setColor(this._color);

			this.pLColorPickerPanel.setColor(this._color);
			this.reposition();
		},
		get: function () {
			return this._color;
		}
	},
	value: {
		set: function (v) {
			if (this._value == v) return;
			this._value = this.convToCorColor(v);
			this._color = this._value;

			if (this._text == 'null') {
				this.button.text = this.corectForBtn(this._color);
				this.button.color = this._value;
			} else {
				this.button.color = this._value;
			}

			if (this._boolBig) this.colorBig.setColor(this._color);
			this.pLColorPickerPanel.setColor(this._value);
			this.pLColorPicker.color = this._value;
			this.reposition();
		},
		get: function () {
			return this._value;
		}
	},
	otstup: {
		set: function (value) {
			if (this._otstup == value) return;
			this._otstup = value;
			this.button.x = this._otstup;
			this.button.y = this._otstup;
			this.pLColorPicker.x = this._otstup;
			this.colorBig.otstup = this._otstup;
			this.reposition();
		},
		get: function () {
			return this._otstup;
		}
	},
	visiblePanel: {
		set: function (value) {
			if (this._visiblePanel == value) return;
			this._visiblePanel = value;

			this.colorBig.panel.image.visible = this._visiblePanel;
			this.colorBig.panel.graphics.visible = this._visiblePanel;
			this.colorBig.panel1.image.visible = this._visiblePanel;
			this.colorBig.panel1.graphics.visible = this._visiblePanel;
			this.colorBig.panel1.graphLine.visible = this._visiblePanel;
			this.colorBig.panel2.graphics.visible = this._visiblePanel;
			this.btnPanel.graphics.visible = this._visiblePanel;
			this.btnPanel.image.visible = this._visiblePanel;
			this.btnPanel1.graphics.visible = this._visiblePanel;
			this.btnPanel1.image.visible = this._visiblePanel;
		},
		get: function () {
			return this._visiblePanel;
		}
	},
	activMouse: {
		set: function (value) {
			if (this._activMouse == value) return;
			this._activMouse = value;

			// this.changeActiv();
			if (this.colorBig == undefined) return;
			this.colorBig.activMouse = this._activMouse;
			if (this.pLColorPickerPanel.activ) this.colorPanelVisible(value);
		},
		get: function () {
			return this._activMouse;
		}
	}
});

function ColorBig (_cont, _x, _y, _fun) {
	PIXI.Container.call(this);
	_cont.addChild(this);
	this.type = 'ColorBig';
	var self = this;
	pl102.addElement(this);

	this._activMouse = true;

	this.fun = _fun;
	this.funSelectColor;

	this.x = _x || 0;
	this.y = _y || 0;

	this._width = 100;
	this._height = 100;
	this._inpRGBH = 27;

	this._color = '0x000000';
	this.colorDrag = '0x000000';
	this.debugRect = false;
	this.trick = pl102.kontur;

	this._otstup = 5;

	this.color1 = '0x9d9d9d';
	this.color2 = '0xa9a9a9'; // контуры
	this.color3 = 0xffffff; // цвет панелей panel1 и panel2
	this.color4 = 0xffffff; // цвет кнопки добавления цвета

	this.fontSize = 14; // pl102.style.fontSize
	this.fontStyle = pl102.style.fontStyle;
	this.fontFamily = pl102.style.fontFamily;

	this.arrColor1 = [0x555555, 0xff4c4c, 0x4faf5c, 0x80bece, 0xf9ae34, 0xffffff];

	this.panel = new PLPanel(this, 0, 0);
	this.panel.image.visible = false;
	pl102.removeElement(this.panel, true);

	this.panel2 = new PLPanel(this.panel, this.trick, this.trick);
	this.panel2.kontur = false;
	this.panel2.color = this.color3;
	this.panel2.image.visible = false;
	pl102.removeElement(this.panel2, true);

	this.panel1 = new PLPanel(this.panel, this.trick, this.trick);
	this.panel1.kontur = false;
	this.panel1.visiLine = true;
	this.panel1.color = this.color3;
	pl102.removeElement(this.panel1, true);

	this.colorPick = new PLColorPick(this.panel1, 0, 0, function () {
		self.color = this.color;
		self.gradient.setColor(this.color.replace('0x', '#'), 'click');
		self.inputRGBBig.setColor(this.color.replace('0x', '#'));
		self.colorPanel.color = this.color;
		self.inputColor.value = this.color.replace('0x', '');
		self.offSelect();
		if (self.fun) self.fun();
	});

	this.colorPick.funDrag = function () {
		self.color = this.colorDrag;
		self.colorDrag = this.colorDrag;
		self.gradient.setColor(this.colorDrag.replace('0x', '#'));
		self.inputRGBBig.setColor(this.colorDrag.replace('0x', '#'));
		self.colorPanel.color = this.colorDrag;
		self.inputColor.value = this.colorDrag.replace('0x', '');
		if (self.funDrag) self.funDrag();
	};

	this.colorPick.funOut = function () {
		self.color = this.color;
		self.gradient.setColor(this.color.replace('0x', '#'));
		self.inputRGBBig.setColor(this.color.replace('0x', '#'));
		self.colorPanel.color = this.color;
		self.inputColor.value = this.color.replace('0x', '');
		if (self.funDrag) self.funDrag();
	};
	this.colorPick.konturColor = this.color2;
	pl102.removeElement(this.colorPick, true);

	this.gradient = new PLGradient(this.panel1, 0, 0, function () {
		self.color = this.color;
		self.colorPick.setColor(this.color.replace('0x', '#'), 'click');
		self.inputRGBBig.setColor(this.color.replace('0x', '#'));
		self.colorPanel.color = this.color;
		self.inputColor.value = this.color.replace('0x', '');
		self.offSelect();
		if (self.fun) self.fun();
	});
	this.gradient.drawCursor(4, 5);

	this.gradient.funDrag = function () {
		self.color = this.colorDrag;
		self.colorDrag = this.colorDrag;
		self.colorPick.setColor(this.colorDrag.replace('0x', '#'));
		self.inputRGBBig.setColor(this.colorDrag.replace('0x', '#'));
		self.colorPanel.color = this.colorDrag;
		self.inputColor.value = this.colorDrag.replace('0x', '');
		if (self.funDrag) self.funDrag();
	};

	this.gradient.funOut = function () {
		self.color = this.color;
		self.colorPick.setColor(this.color.replace('0x', '#'), 'out');
		self.inputRGBBig.setColor(this.color.replace('0x', '#'));
		self.colorPanel.color = this.color;
		self.inputColor.value = this.color.replace('0x', '');
		if (self.funDrag) self.funDrag();
	};
	this.gradient.konturColor = this.color2;
	pl102.removeElement(this.gradient, true);

	this.image = new PLImage(this.panel1, 0, 0);
	this.image.otstup = 4;
	this.image.link = 'resources/images/pikNew/col_pic.png';
	pl102.removeElement(this.image, true);

	this.colorPanel = new PLPanel(this.panel1, 0, 0);
	pl102.removeElement(this.colorPanel, true);

	this.inputRGBBig = new PLInputRGBBig(this.panel1, 0, 0, function () {
		self.color = self.setColorRGB(this.color);
		self.colorPick.setColor(self.color.replace('0x', '#'), 'click');
		self.colorPanel.color = self.color;
		self.inputColor.value = self.color.replace('0x', '');
		self.gradient.setColor(self.color.replace('0x', '#'));
		self.offSelect();
		if (self.fun) self.fun();
	});
	this.inputRGBBig.konturColor = this.color2;
	this.inputRGBBig.height = this._inpRGBH;
	this.inputRGBBig.fontSize = this.fontSize;
	pl102.removeElement(this.inputRGBBig, true);

	this.label = new PLLabel(this.panel1, 0, 0, '#');
	this.label.fontSize = this.fontSize - 2;
	pl102.removeElement(this.label, true);
	var fgCo = 0;
	this.inputColor = new PLInput(this.panel1, 0, 0, '', function () {
		fgCo = +('0x' + this.value);
		if (isNaN(fgCo)) fgCo = '0x000000';
		if (fgCo > 16777215 || fgCo < 0) self.color = '0x000000';
		else self.color = self.corectCol(fgCo).replace('#', '0x');
		self.colorPick.setColor(self.color.replace('0x', '#'), 'click');
		self.colorPanel.color = self.color;
		self.gradient.setColor(self.color.replace('0x', '#'));
		self.inputRGBBig.setColor(self.color.replace('0x', '#'));
		self.offSelect();
		if (self.fun) self.fun();
	});

	this.inputColor.borderColor = this.color2.replace('0x', '#');
	this.inputColor.input.htmlElement.style.font = this.fontStyle + ' ' + this.fontSize + 'px ' + this.fontFamily;
	pl102.removeElement(this.inputColor, true);

	this.colorPicker = new PLColorPicker(this.panel2, 0, 0, '', function () {
		// if (!this.contur.visible) this.contur.visible = true;
		self.color = this.color;
		self.setColor(this.color);
		if (self.fun) self.fun();
	});
	this.colorPicker.kolColor = 6;
	this.colorPicker.setArray(this.arrColor1);
	this.colorPicker.otstup = this._otstup;
	this.colorPicker.activContur = true;
	this.colorPicker.kolElRow = 6;
	pl102.removeElement(this.colorPicker, true);

	this.btnAdd = new PLButton(this.panel2, 0, 0, '', function () {
		if (self.funSelectColor) self.funSelectColor(self.color);
	});
	this.btnAdd.boolCenter = true;
	this.btnAdd.boolKontur = true;
	this.btnAdd.boolScalePic = true;
	this.btnAdd.konturSize = 1;
	this.btnAdd.konturColor = this.color2;
	this.btnAdd.color = this.color4;
	this.btnAdd.panel.image.alpha = 0.2;
	this.btnAdd.otstup = 1;
	this.btnAdd.loadImeg('resources/images/pikNew/69.png');
	pl102.removeElement(this.btnAdd, true);

	this.offSelect = function () {
		// this.colorPicker.contur.visible = false;
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
		if (typeof (_val) === 'string') return _val.replace('0x', '#');
		var obj = {};
		var r = Math.floor(_val / (256 * 256));
		var g = Math.floor(_val / 256) % 256;
		var b = _val % 256;
		return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
	};
	// set decimal color, string or number
	this.setColor = function (_color) {
		var color = this.corectCol(_color);
		this.color = color.replace('#', '0x');
		this.gradient.setColor(color, 'click');
		this.inputRGBBig.setColor(color);
		this.colorPick.setColor(color, 'click');
		this.colorPanel.color = color.replace('#', '0x');
		this.inputColor.value = color.replace('#', '');
	};

	this.setColor(this.color);

	var procPW = 0.65; // ширина секции colorPick
	var procGW = 0.10; // ширина секции gradient
	this.draw = function () {

		// this.colorPicker.x = this._otstup;
		this.colorPicker.y = this._otstup;
		this.colorPicker.otstup = this._otstup;
		this.colorPicker.width = this._width * procPW - this._otstup;

		this.panel.width = this._width;
		this.panel.height = this._height;
		this.panel1.width = this._width - this.trick * 2;
		this.panel2.width = this._width - this.trick * 2;

		var hp2 = this.colorPicker.height + this._otstup * 2;
		var hp1 = this._height - hp2 - this.trick * 2;

		this.panel1.height = hp1 - this.trick;
		this.panel2.y = hp1 + this.trick;
		this.panel2.height = hp2;

		var wcp = this._width * procPW - this._otstup;
		var cph = hp1 - this._otstup * 3 - this.inputRGBBig.height;

		this.colorPick.x = this._otstup;
		this.colorPick.y = this._otstup;
		this.colorPick.width = wcp;
		this.colorPick.height = cph;

		this.inputRGBBig.x = this._otstup;
		this.inputRGBBig.y = cph + this._otstup * 2;
		this.inputRGBBig.width = this.colorPick.width;

		this.gradient.x = this._otstup + this._width * procPW;
		this.gradient.y = this._otstup;
		this.gradient.width = this._width * procGW - this._otstup;
		this.gradient.height = cph;
		this.gradient.drawCursor(this._otstup * 1.5, (this._otstup * 1.5) + 1);

		var cpw = this._width - this.gradient.x - this.gradient.width - this._otstup * 2 - this.trick;
		var cpx = this.gradient.x + this.gradient.width + this._otstup;

		this.colorPanel.x = cpx;
		this.colorPanel.y = cph + this._otstup - this._inpRGBH;
		this.colorPanel.width = cpw;
		this.colorPanel.height = this._inpRGBH;

		this.image.x = cpx;
		this.image.y = cph - this._inpRGBH - cpw;
		this.image.width = cpw;
		this.image.height = cpw;

		this.inputColor.x = cpx;
		this.inputColor.y = cph + this._otstup * 2;
		this.inputColor.width = cpw;
		this.inputColor.height = this._inpRGBH;

		var r = this.label.getRect();
		this.label.x = cpx - 3 - r.width;
		this.label.y = cph + this._otstup * 2 + this._inpRGBH / 2 - r.height / 2;

		this.btnAdd.x = cpx;
		this.btnAdd.y = this._otstup;
		this.btnAdd.width = cpw - this.trick;
		this.btnAdd.height = this.colorPicker.height - this.trick;
		this.btnAdd.image.width = this.btnAdd.image.height = this.colorPicker.height - this.trick;

		if (this.debugRect) this.drawDebugRect();
	};

	var debugGraph;
	this.drawDebugRect = function () {
		if (debugGraph == undefined) {
			debugGraph = new PIXI.Graphics();
			this.addChild(debugGraph);
		}
		debugGraph.clear();
		debugGraph.lineStyle(0.5, 0xff0000);
		debugGraph.drawRect(0, 0, this._width, this._height);
	};

	this.setSize = function (_width, _height) {
		this._width = _width;
		this._height = _height;
		this.draw();
	};

	this.draw();
}

ColorBig.prototype = Object.create(PIXI.Container.prototype);
ColorBig.prototype.constructor = ColorBig;
Object.defineProperties(ColorBig.prototype, {

	color: {
		set: function (value) {
			this._color = value;
			this.colorPicker.color = this._color;
		},
		get: function () {
			return this._color;
		}
	},
	activ: {
		set: function (value) {
			if (this._activ == value) return;
			this._activ = value;
			this.colorPick.activ = this._activ;
			this.gradient.activ = this._activ;
		},
		get: function () {
			return this._activ;
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
	activMouse: {
		set: function (value) {
			if (this._activMouse == value) return;
			this._activMouse = value;


			this.inputColor.activMouse = this._activMouse;
			this.inputRGBBig.activMouse = this._activMouse;

		},
		get: function () {
			return this._activMouse;
		}
	}
});


function PLInputRGBBig (cont, x, y, fun) {
	PLInputRGB.call(this, cont, x, y, fun);
	this.type = 'PLInputRGBBig';
	var self = this;
	pl102.addElement(this);
	this.activMouse = true;
	this._otstup = 24;
	this.otstup1 = 2;

	this._konturColor = pl102.color1;

	this.panel.kontur = false;
	this.panel.visible = false;

	this.label.visible = false;
	this._fontSize = pl102.style.fontSize;
	this.fontStyle = pl102.style.fontStyle;
	this.fontFamily = pl102.style.fontFamily;

	this.label1 = new PLLabel(this, 0, 0, 'R');
	this.label1.fontSize = this._fontSize;
	pl102.removeElement(this.label, true);
	this.label2 = new PLLabel(this, 0, 0, 'G');
	this.label2.fontSize = this._fontSize;
	pl102.removeElement(this.label1, true);
	this.label3 = new PLLabel(this, 0, 0, 'B');
	pl102.removeElement(this.label2, true);
	this.label3.fontSize = this._fontSize;

	// для перерисовки элементов компонента
	var ws;
	this.reposition = function () {
		var r = this.label1.getRect();
		var g = this.label2.getRect();
		var b = this.label3.getRect();
		ws = (this._width - this._otstup * 2 - r.width - this.otstup1) / 3;

		this.label1.x = 0;
		this.inputR.x = r.width + this.otstup1;
		this.inputR.width = ws;
		this.inputR.height = this._height;
		this.label1.y = this._height / 2 - r.height / 2;

		this.inputG.x = this.inputR.x + ws + this._otstup;
		this.inputG.width = ws;
		this.inputG.height = this._height;
		this.label2.x = this.inputG.x - this.otstup1 - g.width;
		this.label2.y = this._height / 2 - g.height / 2;

		this.inputB.x = this.inputG.x + ws + this._otstup;
		this.inputB.width = ws;
		this.inputB.height = this._height;
		this.label3.x = this.inputB.x - this.otstup1 - b.width;
		this.label3.y = this._height / 2 - b.height / 2;

		this.panel.width = this._width;
		this.panel.height = this._height;
	};
	this.reposition();
}

PLInputRGBBig.prototype = Object.create(PLInputRGB.prototype);
PLInputRGBBig.prototype.constructor = PLInputRGBBig;
Object.defineProperties(PLInputRGBBig.prototype, {
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
	konturColor: {
		set: function (value) {
			if (this._konturColor == value) return;
			this._konturColor = value;
			this.inputR.borderColor = this._konturColor.replace('0x', '#');
			this.inputG.borderColor = this._konturColor.replace('0x', '#');
			this.inputB.borderColor = this._konturColor.replace('0x', '#');
		},
		get: function () {
			return this._konturColor;
		}
	},
	fontSize: {
		set: function (value) {
			if (this._fontSize == value) return;
			this._fontSize = value;
			this.inputR.input.htmlElement.style.font = this.fontStyle + ' ' + this._fontSize + 'px ' + this.fontFamily;
			this.inputG.input.htmlElement.style.font = this.fontStyle + ' ' + this._fontSize + 'px ' + this.fontFamily;
			this.inputB.input.htmlElement.style.font = this.fontStyle + ' ' + this._fontSize + 'px ' + this.fontFamily;
			this.label1.fontSize = this._fontSize - 2;
			this.label2.fontSize = this._fontSize - 2;
			this.label3.fontSize = this._fontSize - 2;
		},
		get: function () {
			return this._fontSize;
		}
	}
});
