function PdfEditorMenuNav (_pdfEditorMenu) {
	PIXI.Container.call(this);
	var self = this;
	this.type = 'PdfEditorMenuNav';

	this.pdfEditorMenu = _pdfEditorMenu;

	this.pdfEditorMenu.addChild(this);

	this._width = 100;
	this._height = 100;
	this._otstup = 2;
	this._mashtab = 1;

	this.wh = 52;

	this._index = 1;
	this.pages = 1;

	this.array = [];

	this.onDown = function () {

		if (this.idArr === 0) self.index = self._index - 1;
		else self.index = self._index + 1;

		self.pdfEditorMenu.dispatchEvent(new PdfEditorEvent('onDown', {
			name: 'secondPage',
			index: self._index
		}));
	};

	this.setState = function (_obj) {

		if (_obj.name === 'selectPage') {
			this.index = _obj.index;
		}
	
		if (_obj.name === 'loadFile') {

			this.index = 1;

			this.array[0].activMouse = (self._index !== 1);

			this.pages = _obj.pages;
		}
	};

	this.array[0] = new PLButton(this, 0, 0, 'Left', this.onDown);
	this.array[1] = new PLButton(this, 0, 0, 'Right', this.onDown);

	for (var i = 0; i < this.array.length; i++) {
		this.array[i].idArr = i;
		this.array[i].setStile(1);
		this.array[i].width = this.wh;
		this.array[i].height = this.wh;
	}

	this.draw = function () {
		this.array[0].x = this._otstup;
		this.array[0].y = (this._height / 2 - this.wh / 2) / this._mashtab;

		this.array[1].x = (this._width - this.wh - this._otstup);
		this.array[1].y = (this._height / 2 - this.wh / 2) / this._mashtab;
	};

	this.setIcons = function (_array) {
		for (var i = 0; i < this.array.length; i++) {
			this.array[i].text = '';
			this.array[i].loadImeg(_array[i]);
		}
	};
}

PdfEditorMenuNav.prototype = Object.create(PIXI.Container.prototype);
PdfEditorMenuNav.prototype.constructor = PdfEditorMenuNav;

Object.defineProperties(PdfEditorMenuNav.prototype, {

	index: {
		set: function (value) {
			if (this._index === value) return;
			this._index = value;

			if (this._index < 1) this._index = 1;
			if (this._index > this.pages) this._index = this.pages;

			this.array[0].activMouse = (this._index !== 1);
			this.array[1].activMouse = (this._index !== this.pages);
			},
		get: function () {
			return this._index;
		}
	},

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
	},

	mashtab: {
		set: function (value) {
			if (this._mashtab === value) return;
			this._mashtab = value;

			this.draw();
		},
		get: function () {
			return this._mashtab;
		}
	}
});
