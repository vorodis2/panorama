
function PdfEditorSketchRooms (_cont) {
	PIXI.Container.call(this);
	var self = this;
	this.type = 'PdfEditorSketchRooms';

	_cont.addChild(this);

	this.btnCreateCont = new PIXI.Container();

	this._otstup = 2;
	this._width = 100;
	this._height = 100;
	this._mashtab = 1;

	this._activ = false;
	this._activBtnClose = true;
	this._sellectedBtn = null;

	this.arrBtn = [];

	function setParamNewObj (_object) {

		self.sellectedBtn = self.createBtn(_object);

		if (_object.isOut === true) {
			self.pxd._rectangle.width = self.sellectedBtn.width;
			self.pxd._rectangle.height = self.sellectedBtn.height;
			self.pxd._rectangle.x = -self.sellectedBtn.width / 2;
			self.pxd._rectangle.y = -self.sellectedBtn.height / 2;

			self.pxd._rectangle.p.x = self.sellectedBtn.x - self.pxd._rectangle.x;
			self.pxd._rectangle.p.y = self.sellectedBtn.y - self.pxd._rectangle.y;

			self.pxd.parent = self;

			self.pxd.funDown();
		}
	}

	function onStartDragBtn () {
		self.sellectedBtn = this;
		self.updatePxdFromObj(this);

		self.pxd.parent = self;
		self.pxd.funDown();

		self.addChild(this);
	}

	this.createBtn = function (_object) {

		if (!_object) return;

		var x = 0;
		var y = 0;
		var btn = null;

		for (var i = 0; i < this.arrBtn.length; i++) {
			if (this.arrBtn[i].visible === false) {
				btn = this.arrBtn[i];
				btn.visible = true;
				break;
			}
		}

		if (btn === null) {
			btn = new SketchRoomsBtn(this, x, y, '', onStartDragBtn);
			btn.boolKontur = true;
			btn.idGall = _object.id;
			btn.panel.nizAlpha = 0.25;
			btn.panel.nizNum = 30;
			btn.color = 0xf0f0f0;
			btn.idArr = self.arrBtn.length;
			self.arrBtn.push(btn);
		}

		btn.text = _object.text;

		var rect = btn.label.getLocalBounds();

		width = rect.width + this._otstup * 4;
		height = rect.height + this._otstup * 2;

		if (_object.isOut === true) {
			var localPoint = this.toLocal(pl102.global);
			x = localPoint.x - width / 2;
			y = localPoint.y - height / 2;
		} else {
			x = (this._width / 2 - width / 2) / this._mashtab;
			y = (this._height / 2 - height / 2) / this._mashtab;
		}

		btn.width = width;
		btn.height = height;
		btn.x = x;
		btn.y = y;

		return btn;
	};

	this.clear = function () {
		for (var i = 0; i < this.arrBtn.length; i++) {
			this.arrBtn[i].visible = false;
		}
	};

	this.updateObjFromPxd = function (btn) {
		btn.x = (self.pxd.rectangle.x + self.pxd.rectangle.p.x);
		btn.y = (self.pxd.rectangle.y + self.pxd.rectangle.p.y);
	};

	this.updatePxdFromObj = function (btn) {
		self.pxd._rectangle.width = btn.width;
		self.pxd._rectangle.height = btn.height;
		self.pxd._rectangle.x = -btn.width / 2;
		self.pxd._rectangle.y = -btn.height / 2;
		self.pxd._rectangle.p.x = btn.x - self.pxd._rectangle.x;
		self.pxd._rectangle.p.y = btn.y - self.pxd._rectangle.y;
		self.pxd.funDown();
	};

	var globBorderPoint = new PIXI.Point();
	var convRect = new PIXI.Rectangle();
	this.setState = function (_object) {
		if (_object.name === 'createSketchRoom') {
			setParamNewObj(_object);
		}
	};

	this.pxd = new PLDragObject(function () {

		if (self.sellectedBtn) {
			self.updateObjFromPxd(self.sellectedBtn);
			self.arrBtn[self.sellectedBtn.idArr].x = self.pxd.rectangle.p.x + self.pxd.rectangle.x;
			self.arrBtn[self.sellectedBtn.idArr].y = self.pxd.rectangle.p.y + self.pxd.rectangle.y;
		}
	});

	this.pxd.funUp = function () {
		this.parent = undefined;
	};

	this.pxd.buttonDragAll._normDrag = null;
	this.pxd.buttonDragAll.normDrag = 'null';

	this.pxd.borderRect.x = 0;
	this.pxd.borderRect.y = 0;

	this.draw = function () {};
}

PdfEditorSketchRooms.prototype = Object.create(PIXI.Container.prototype);
PdfEditorSketchRooms.prototype.constructor = PdfEditorSketchRooms;
Object.defineProperties(PdfEditorSketchRooms.prototype, {

	activ: {
		set: function (v) {
			if (this._activ === v) return;
			this._activ = v;
	
			this.visible = this._activ;
		},
		get: function () {
			return this._activ;
		}
	},

	activBtnClose: {
		set: function (v) {
			if (this._activBtnClose === v) return;
			this._activBtnClose = v;

			for (var i = 0; i < this.arrBtn.length; i++) {
				this.arrBtn[i].closeBtn.visible = this._activBtnClose;
			}
		},
		get: function () {
			return this._activBtnClose;
		}
	},

	width: {
		set: function (v) {
			if (this._width != v) {
				this._width = v;

				this.pxd.borderRect.width = this._width / this._mashtab;

				this.draw();
				// this.updateBorderDrag();
			}
		},
		get: function () {
			return this._width;
		}
	},

	height: {
		set: function (v) {
			if (this._height != v) {
				this._height = v;

				this.pxd.borderRect.height = this._height / this._mashtab;

				this.draw();
				// this.updateBorderDrag();
			}
		},
		get: function () {
			return this._height;
		}
	},

	otstup: {
		set: function (v) {
			if (this._otstup != v) {
				this._otstup = v;
				this.draw();
			}
		},
		get: function () {
			return this._otstup;
		}
	},

	mashtab: {
		set: function (v) {
			if (this._mashtab != v) {
				this._mashtab = v;

				this.pxd.borderRect.width = this._width / this._mashtab;
				this.pxd.borderRect.height = this._height / this._mashtab;
			}
		},
		get: function () {
			return this._mashtab;
		}
	}
});

function SketchRoomsBtn (cont, _x, _y, text, fun, _link) {
	PLButton.call(this, cont, _x, _y, text, fun, _link);
	var self = this;
	this.type = 'SketchRoomsBtn';

	this.otstup = 6;

	this.onDownClose = function () {
		self.visible = false;
	};

	this.closeBtn = new PLButton(this, 0, 0, 'x', this.onDownClose);
	var rect = this.closeBtn.label.getRect();
	this.closeBtn.width = rect.width;
	this.closeBtn.height = rect.height;
	this.closeBtn.visiblePanel = false;

	this.drawCloseBtn = function () {
		this.closeBtn.x = this._width - this.closeBtn.width - this.otstup - 2;
		this.closeBtn.y = -(this.closeBtn.height + this.otstup) + 5;
	};
}

SketchRoomsBtn.prototype = Object.create(PLButton.prototype);
SketchRoomsBtn.prototype.constructor = SketchRoomsBtn;

Object.defineProperties(SketchRoomsBtn.prototype, {

	width: {
		set: function (value) {
			this._width = value;

			this.panel.width = value;
			this.panel1.width = value;
			this.draw102();
			this.drawCloseBtn();
		},
		get: function () {
			return this._width;
		}
	},

	height: {
		set: function (value) {
			this._height = value;
			this.panel.height = value;
			this.panel1.height = value;
			this.draw102();
			this.drawCloseBtn();
		},
		get: function () {
			return this._height;
		}
	}
});