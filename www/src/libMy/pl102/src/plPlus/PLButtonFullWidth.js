export function PLButtonFullWidth (_cont, _x, _y, _fun) {
	PIXI.Container.call(this);
	_cont.addChild(this);
	this.type = 'PLButtonFullWidth';
	var self = this;

	this.fun = _fun;

	this._width = 100;
	this._height = 100;
	this._otstup = 2;
	this._typeStyle = 0;

	this.array = [];
	this.arrayBtn = [];

	this.index = -1;

	this.down = function () {
		self.index = this.idArr;
		if (self.fun) self.fun();
	};

	var btn;
	this.create = function (_title, _link) {
		btn = new PLButton(this, 0, 0, '', this.down);
		btn.idArr = this.arrayBtn.length;
		if (_title != '') btn.text = _title;
		if (_link != '') btn.loadImeg(_link);
		this.arrayBtn.push(btn);
	};

	this.draw = function () {
		var wh = this._width / this.arrayBtn.length;
		for (var i = 0; i < this.arrayBtn.length; i++) {
			this.arrayBtn[i].x = i * wh;
			this.arrayBtn[i].width = wh;
			this.arrayBtn[i].height = this._height;
		}
	};

	this.setArr = function (_arr) {
		this.array = _arr;
		for (var i = 0; i < this.array.length; i++) {
			this.create(this.array[i].title, this.array[i].link);
		}
		this.setStyle();
		this.draw();
	};

	this.setStyle = function () {
		if (this.typeStyle == 0) {
			for (var i = 0; i < this.arrayBtn.length; i++) {
				this.arrayBtn[i].konturColor = 0x9b9fa8;
				this.arrayBtn[i].boolCenter = true;
				this.arrayBtn[i].visiblePanel = false;
				this.arrayBtn[i].otstup = 2;
				this.arrayBtn[i].boolKontur = true;
			}
		}
	};


}

PLButtonFullWidth.prototype = Object.create(PIXI.Container.prototype);
PLButtonFullWidth.prototype.constructor = PLButtonFullWidth;
Object.defineProperties(PLButtonFullWidth.prototype, {
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
	typeStyle: {
		set: function (value) {
			if (this._typeStyle == value) return;
			this._typeStyle = value;
			this.draw();
		},
		get: function () {
			return this._typeStyle;
		}
	}
});