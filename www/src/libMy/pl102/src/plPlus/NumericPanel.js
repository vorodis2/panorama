export function NumericPanel (cont, _x, _y, _fun) {
	PIXI.Container.call(this);
	var self = this;
	this._value = 0;
	this.type = 'NumericPanel';
	this.content = new PIXI.Container();
	this.addChild(this.content);
	if (cont !== undefined) cont.addChild(this);
	this.fun = _fun;
	this.x = _x || 0;
	this.y = _y || 0;
	this.arrayBtn = [];
	this.otstup = 2;

	this._data = [];
	this.cache = [];
	this._width = 100;
	this._height = 100;
	this._value = 1;

	this.panel = new PLPanel(this.content, this.content.x, this.content.y);
	this.panel.width = this._width;
	this.panel.height = pl102.wh + this.otstup * 2;
	this.label = new PLLabel(this.content, 0, 0, 'NO DATA');

	this.refreshData = function () {
		this.clear();
		for (var i = 0; i < this._data.length; i++) {
			this.arrayBtn[i] = this.getBtn();
			this.arrayBtn[i].text = this._data[i];
		}
		this.label.visible = this._data.length == 0;

		if (this.label.visible) {
			this.label.x = this.panel.width - pl102.wh - this.otstup * 5;
			this.label.y = this.panel.height / 2 - this.label.height + this.otstup * 5;
		}

		this.reposition();
	};

	this.clear = function () {
		for (var i = 0; i < this.cache.length; i++) {
			this.cache[i].life = false;
		}
	};

	this.getBtn = function () {
		for (var i = 0; i < this.cache.length; i++) {
			if (this.cache[i].life === false) {
				this.cache[i].life = true;
				return this.cache[i];
			}
		}
		var numBtn = new PLButton(this.content, 0, 0, '', this.onDownBtn);
		numBtn.life = true;
		this.cache.push(numBtn);
		return numBtn;
	};

	this.reposition = function () {
		var x = this.otstup;
		var y = this.otstup;
		this.panel.width = this._width;
		var btnW = ((this._width - this.otstup * 2) / this._data.length);
		for (var i = 0; i < this.arrayBtn.length; i++) {
			if (this.arrayBtn[i].life) {
				this.arrayBtn[i].width = btnW - this.otstup;
				this.arrayBtn[i].label.fontSize = 12;
				this.arrayBtn[i].position.set(x, y);
				x += btnW;
			}
		}
	};

	this.onDownBtn = function () {
		self.value = this.text;
		if (self.fun) self.fun();
	};

	this.setActive = function (value) {
		var isDisabled = true;
		for (var i = 0; i < self.arrayBtn.length; i++) {
			if (self.arrayBtn[i].text == value && isDisabled) {
				isDisabled = false;
				self.arrayBtn[i].activ = true;
			} else {
				self.arrayBtn[i].activ = false;
			}
		}
	};

}

NumericPanel.prototype = Object.create(PIXI.Container.prototype);
NumericPanel.prototype.constructor = NumericPanel;

Object.defineProperties(NumericPanel.prototype, {
	data: {
		set: function (v) {
			if (v.length !== 0) {
				this._data = v;
			}
			this.refreshData();
		},
		get: function () {
			return this._data;
		}
	},
	value: {
		set: function (value) {
			if (this._value === value) return;
			this._value = value;
			this.setActive(this._value);
		},
		get: function () {
			return this._value;
		}
	},
	width: {
		set: function (value) {
			if (this._width === value) return;
			this._width = value;
			this.refreshData();
		},
		get: function () {
			return this._value;
		}
	}
});
