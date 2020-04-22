
export function PLColorTHREE (cont, x, y, fun, title) {
	PLColor.call(this, cont, x, y, fun, title);
	this.type = 'PLColorTHREE';
	var self = this;

	this._value = new THREE.Color();
	// this._value = {r: 1, g: 1, b: 1};

	this._width = 100;
	this._height = pl102.wh + this._otstup * 2;

	this.colPicActiv = false;

	this.pLColorPickerPanel.fun = function (_bool) {
		if (self._text == 'null') self.button.text = this.color;

		self.button.color = this.color;
		if (typeof self._color === 'string') self._color = this.color;
		else self._color = +this.color;

		self.updValue(self.corectForBtn(+this.color, true));

		if (self.fun) self.fun();
		//if (_bool == undefined) self.setVisiblePanel(false); // При клике по градиенту сразу скрывалась
	};
	this.pLColorPickerPanel.pLInputRGB.useOne = true;

	// //перерисовка положений при изменении высоты ширины и цвета
	this.reposition = function () {
		this.button.height = this.btnH;
		// this.button.color = this._color;
		this.button.width = this._width - this._otstup * 2;
		this.button.height = this._height - this._otstup * 2;

		this.btnPanel.height = this._height;
		this.btnPanel.width = this._width;

		this.pLColorPickerPanel.y = this.btnPanel.height;
		this.pLColorPickerPanel.width = this._width;
		this.pLColorPickerPanel.height = this.colorPanelH;
	};

	this.updValue = function (_obj) {
		var r, g, b;
		r = _obj.r / 255;
		g = _obj.g / 255;
		b = _obj.b / 255;

		this._value.r = r;
		this._value.g = g;
		this._value.b = b;
	};
}

PLColorTHREE.prototype = Object.create(PLColor.prototype);
PLColorTHREE.prototype.constructor = PLColorTHREE;
Object.defineProperties(PLColorTHREE.prototype, {
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
	value: {
		set: function (v) {
			this._value = v;

			// this._value.r = v.r;
			// this._value.g = v.g;
			// this._value.b = v.b;

			var r, g, b;
			r = Math.round(v.r * 255);
			g = Math.round(v.g * 255);
			b = Math.round(v.b * 255);
			this._color = '0x' + this.compToHex(r) + this.compToHex(g) + this.compToHex(b);

			if (this._text == 'null') this.button.text = this._color;
			this.button.color = this._color;
			this.pLColorPickerPanel.setColor(this._color);
		},
		get: function () {
			return this._value;
		}
	},
	color: {
		set: function (value) {
			if (this._color == value) return;
			this._color = this.convToCorColor(value);
			this.updValue(this.corectForBtn(value * 1, true));

			if (this._text == 'null') this.button.text = this.corectForBtn(this._color);
			this.button.color = this._color;

			this.pLColorPickerPanel.setColor(this._color);
		},
		get: function () {
			return this._color;
		}
	}
});
