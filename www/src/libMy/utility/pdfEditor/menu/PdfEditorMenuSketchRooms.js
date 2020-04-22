
function PdfEditorMenuSketchRooms (_pdfEditorMenu) {
	PIXI.Container.call(this);
	var self = this;
	this.type = 'PdfEditorMenuSketchRooms';

	this.pdfEditorMenu = _pdfEditorMenu;

	this.pdfEditorMenu.addChild(this);

	this._otstup = this.pdfEditorMenu.otstup;
	this._otstup1 = this.pdfEditorMenu.otstup1;

	this._width = this.pdfEditorMenu.sketchRoomsWidth;
	this._height = 100;

	this.btnHeight = this.pdfEditorMenu.btnHeight;

	this._index = -1;
	this._language = null;

	this.visible = false;

	this.gallSketchRooms = new GallSketchRooms(this, 0, 0, onDown);

	this.gallSketchRooms.kolII = 1;
	this.gallSketchRooms.otstup = this._otstup;

	this.gallSketchRooms.height = this._height;
	this.gallSketchRooms.heightPic = this.btnHeight;

	this.setArray = function (_array) {
		trace('<<>>--setArray--', _array)
		this.gallSketchRooms.start(_array);
	};

	this.clear = function () {
		this.visible = false;
	};

	function onDown () {

		self.index = this._index;

		this.startPoint = this.toLocal(pl102.global);

		this.on('mouseout', onCreateBtnClick);
		this.on('click', onCreateBtnClick);

		pl102.stage.on('mouseup', onOut);
	}

	function onOut () {

		self.gallSketchRooms.off('click', onCreateBtnClick);
		self.gallSketchRooms.off('mouseout', onCreateBtnClick);

		pl102.stage.off('mouseup', onOut);
	}

	function onCreateBtnClick (e) {

		var isOut = (e.type === 'mouseout');
		var object = null;

		if (self.index !== -1) {
			object = self.gallSketchRooms.array[self.index].createParam;
		}

		self.pdfEditorMenu.dispatchEvent(new PdfEditorEvent('onCreateBtn', {
			name: 'createSketchRoom',
			id: object.id,
			text: object.text,
			isOut: isOut
		}));
	}

	this.draw = function () {

		var scrollOffset = this._otstup * 3 + this.gallSketchRooms.scrollBarV.width;

		var isVisiScroll = this.gallSketchRooms.scrollBarV.visible;

		if (isVisiScroll === true) {
			this.gallSketchRooms.widthPic = this._width - scrollOffset;
		} else {
			this.gallSketchRooms.widthPic = this._width;
		}

		this.gallSketchRooms.width = this._width;
	};
}

PdfEditorMenuSketchRooms.prototype = Object.create(PIXI.Container.prototype);
PdfEditorMenuSketchRooms.prototype.constructor = PdfEditorMenuSketchRooms;

Object.defineProperties(PdfEditorMenuSketchRooms.prototype, {

	index: {
		set: function (v) {
			if (this._index !== v) {
				this._index = v;
			}
		},
		get: function () {
			return this._index;
		}
	},

	width: {
		set: function (v) {
			if (this._width !== v) {
				this._width = v;

				this.draw();
			}
		},
		get: function () {
			return this._width;
		}
	},

	height: {
		set: function (v) {
			if (this._height !== v) {
				this._height = v;

				this.gallSketchRooms.height = this._height;
				this.draw();
			}
		},
		get: function () {
			return this._height;
		}
	},

	otstup: {
		set: function (v) {
			if (this._otstup !== v) {
				this._otstup = v;

				this.gallSketchRooms.otstup = this._otstup;
				this.draw();
			}
		},
		get: function () {
			return this._otstup;
		}
	},
	otstup1: {
		set: function (v) {
			if (this._otstup1 !== v) {
				this._otstup1 = v;

				this.draw();
			}
		},
		get: function () {
			return this._otstup1;
		}
	},

	language: {
		set: function (value) {
			if (this._language === value) return;
			this._language = value;

			this.gallSketchRooms.language = this._language;
		},
		get: function () {
			return this._language;
		}
	}
});

function GallSketchRooms (cont, _x, _y, fun) {
	GalleryBase.call(this, cont, _x, _y, fun);
	this.type = 'GallSketchRooms';
	this.fun = fun;
	var self = this;

	this._language = null;

	this.createZamen = function () {
		var rez = new BoxGalleryIcons3(this.content, 0, 0, this.downBtn);
		rez.language = this._language;
		return rez;
	};

	this.scrollBarV.otstup = 4;
	this.scrollBarH.otstup = 4;
	this.otstup1 = 15;
	this.boolPositScrol = true;
	this.boolPositOtctup = false;

	this.postDraw = function () {
		this.scrollBarH.visible = false;
		
		this.array = self.originArr || this.array;
	};

	this.preDraw = function () {
		self.originArr = this.array.slice();
		this.array.sort(compare);
	};

	function compare (a, b) {
		return a.text.localeCompare(b.text);
	}

}

GallSketchRooms.prototype = Object.create(GalleryBase.prototype);
GallSketchRooms.prototype.constructor = GallSketchRooms;

Object.defineProperties(GallSketchRooms.prototype, {
	language: {
		set: function (value) {
			if (this._language === value) return;
			this._language = value;

			for (var i = 0; i < this.array.length; i++) {
				this.array[i].language = this._language;
			}
			this.draw();
		},
		get: function () {
			return this._language;
		}
	}
});

function BoxGalleryIcons3 (cont, _x, _y, fun) {
	BoxGalleryIcons.call(this, cont, _x, _y, fun);
	this.type = 'BoxGalleryIcons3';
	this.fun = fun;
	var self = this;

	this._lineSize = 3;
	this._text = '';
	this._language = null;

	this.borderOffset = 6;
	this.startColor = this.panel.color;

	this.object = null;
	this.createParam = {};
	this.translations = null;

	this.pnl = new PLPanel(this, 0, 0, fun);
	this.pnl.addChild(this.content);

	var ss;
	this.startLoad = function (_obj) {

		ss = false;

		this.object = _obj;
		this.createParam = {};
		this.createParam.id = _obj.id;

		if (_obj.translations) {

			var text = _obj.name;

			if (this._language !== null) {
				this.translations = _obj.translations.name;
				text = this.translations[this._language];
			}

			this.text = text;

			this.createParam.text = this._text;

			this.label.visible = true;

			ss = true;
		}

		if (_obj.link) {

			this.image.visible = true;

			if (this.image.link === _obj.link) {
				ss = true;
			} else {
				this.image.width = 100;
				this.image.height = 100;
				this.image.link = _obj.link;
			}
		}

		if (ss) self.funLoad();

		this.draw();

		this.lineSize = 1;
		this.color = 0x000000;
	};

	this.panelLeft = new PLPanel(this, 0, 0);
	this.panelLeft.color = 0xf2efef;
	this.panelRight = new PLPanel(this, 0, 0);
	this.panelRight.color = 0xf2efef;
	this.postDraw = function () {

		this.label.x = (this._width - this.label.curW) / 2;
		this.label.y = (this._height - this.label.curH) / 2;

		this.pnl.x = this.x;
		this.pnl.y = this.panel.y;
		this.pnl.width = this.width - 10;
		this.pnl.height = this.panel.height;

		this.panelLeft.width = this.borderOffset;
		this.panelRight.width = this.borderOffset;

		this.panelLeft.height = this._height;
		this.panelRight.height = this._height;

		this.panelLeft.x = this.x;
		this.panelRight.x = this._width - this.borderOffset - this.x - 1;
	};
}

BoxGalleryIcons3.prototype = Object.create(BoxGalleryIcons.prototype);
BoxGalleryIcons3.prototype.constructor = BoxGalleryIcons3;

Object.defineProperties(BoxGalleryIcons3.prototype, {

	text: {
		set: function (v) {
			if (this._text !== v) {
				this._text = v;

				this.label.text = this._text;
				this.createParam.text = this._text;

				this.postDraw();
			}
		},
		get: function () {
			return this._text;
		}
	},

	language: {
		set: function (value) {
			if (this._language === value) return;
			this._language = value;

			if (this.translations !== null) {
				this.text = this.translations[this._language];
			}
		},
		get: function () {
			return this._language;
		}
	}
});

// function DebugDragBtnMenu (_cont, _x, _y, _fun) {

// 	PIXI.Container.call(this);
// 	var self = this;
// 	this.type = 'DebugDragMenu';

// 	_cont.addChild(this);

// 	this._otstup = 2;
// 	this._otstup1 = 15;
// 	this.obj = undefined;
// 	this.objJson = [];
// 	this.arrSlid = [];

// 	this.window = new PLWindow(this, 0, 0, 'Debug PdfEditorMenuSketchRooms');
// 	this.window.width = 350;
// 	this.window.height = 550;
// 	this.window.x = _x;
// 	this.window.y = _y;

// 	this.objToStr = null;
// 	this.strToObj = null;


// 	this.getArrBtn = new PLButton(this.window, 0, 0, 'Get', function () {
// 		self.objToStr = self.obj.toJson();
// 		self.textArea.text = self.objToStr;
// 	});

// 	this.getArrBtn.width = Math.round(this.window.width / 2) - this._otstup * 4;
// 	this.getArrBtn.x = this._otstup;
// 	this.getArrBtn.y = this.window.wh + this._otstup1;


// 	this.setArrBtn = new PLButton(this.window, 0, 0, 'Set', function () {
// 		self.strToObj = JSON.parse(self.textArea.text);
// 		self.obj.changeArrBtn(self.strToObj);
// 		self.textArea.text = '';
// 	});

// 	this.setArrBtn.width = Math.round(this.window.width / 2) - this._otstup * 4;
// 	this.setArrBtn.x = this.window.width - this.setArrBtn.width - this._otstup * 2;
// 	this.setArrBtn.y = this.window.wh + this._otstup1;


// 	this.textArea = new PLTextArea(this.window, 0, 0, '', function () {

// 	});

// 	this.textArea.x = this._otstup1;
// 	this.textArea.y = this.setArrBtn.y + this.setArrBtn.height + this._otstup1;
// 	this.textArea.width = this.window.width - this._otstup1 * 2;
// 	this.textArea.height = this.window.height - this.textArea.y;
// }
// DebugDragBtnMenu.prototype = Object.create(PIXI.Container.prototype);
// DebugDragBtnMenu.prototype.constructor = DebugDragBtnMenu;
// Object.defineProperties(DebugDragBtnMenu.prototype, {

// });
