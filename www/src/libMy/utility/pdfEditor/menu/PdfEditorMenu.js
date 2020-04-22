function PdfEditorMenu (_pdfEditor) {
	PIXI.Container.call(this);
	var self = this;
	this.type = 'PdfEditorMenu';

	this.pdfEditor = _pdfEditor;

	this.pdfEditor.addChild(this);

	this._width = 100;
	this._height = 100;
	this._otstup = this.pdfEditor.otstup;
	this._otstup1 = this.pdfEditor.otstup1;
	this._mashtab = 1;
	this._isHideMenuNav = true;
	this._isHideSketchRooms = true;
	this._languageComponent = null;

	this.headerHeight = this.pdfEditor.headerHeight;
	this.footerHeight = this.pdfEditor.footerHeight;
	this.sketchRoomsWidth = this.pdfEditor.sketchRoomsWidth;
	this.btnHeight = this.pdfEditor.btnHeight;

	this.pdfEditorMenuHeader = new PdfEditorMenuHeader(this);
	this.pdfEditorMenuFooter = new PdfEditorMenuFooter(this);
	this.pdfEditorMenuNav = new PdfEditorMenuNav(this);
	this.pdfEditorMenuSketchRooms = new PdfEditorMenuSketchRooms(this);

	this.setIcons = function (_array) {
		this.pdfEditorMenuHeader.setIcons(_array[0]);
		this.pdfEditorMenuFooter.setIcons(_array[1]);
		this.pdfEditorMenuNav.setIcons(_array[2]);
	};

	this.draw = function () {
		this.pdfEditorMenuHeader.width = this._width / this._mashtab;
		this.pdfEditorMenuFooter.width = this._width / this._mashtab;
		this.pdfEditorMenuNav.width = this._width / this._mashtab;

		this.pdfEditorMenuSketchRooms.x = (this._width / this._mashtab - this.sketchRoomsWidth - this._otstup1);
		this.pdfEditorMenuSketchRooms.y = this.headerHeight + this._otstup1;

		var offset = this.footerHeight - (this.footerHeight * this._mashtab);
		this.pdfEditorMenuFooter.y = ((this._height - this.footerHeight + offset) / this._mashtab);

		var offsetSketchRoomsH = this.pdfEditorMenuFooter.y - this.pdfEditorMenuSketchRooms.y - this._otstup1;
		this.pdfEditorMenuSketchRooms.height = offsetSketchRoomsH;
	};

	this.clear = function () {
		this.pdfEditorMenuHeader.clear();
		this.pdfEditorMenuFooter.clear();
		this.pdfEditorMenuSketchRooms.clear();
	};

	this.setState = function (_obj) {
		this.pdfEditorMenuHeader.setState(_obj);
		this.pdfEditorMenuFooter.setState(_obj);
		this.pdfEditorMenuNav.setState(_obj);
	};

	this.setSketchRooms = function (_array) {
		this.pdfEditorMenuSketchRooms.setArray(_array);
	};
}

PdfEditorMenu.prototype = Object.create(PIXI.Container.prototype);
PdfEditorMenu.prototype.constructor = PdfEditorMenu;
PdfEditorMenu.prototype = Object.assign(PdfEditorMenu.prototype, EventDispatcher.prototype);

Object.defineProperties(PdfEditorMenu.prototype, {

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

			this.pdfEditorMenuNav.height = this._height;
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

			this.pdfEditorMenuFooter.otstup = this._otstup;

			this.draw();
		},
		get: function () {
			return this._otstup;
		}
	},

	otstup1: {
		set: function (value) {
			if (this._otstup1 === value) return;
			this._otstup1 = value;

			this.pdfEditorMenuNav.otstup = this._otstup1;
				
			this.draw();
		},
		get: function () {
			return this._otstup1;
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

	isHideMenuNav: {
		set: function (value) {
			this._isHideMenuNav = value;

			this.pdfEditorMenuNav.visible = this._isHideMenuNav;
		},
		get: function () {
			return this._isHideMenuNav;
		}
	},

	mashtab: {
		set: function (value) {
			if (this._mashtab === value) return;
			this._mashtab = value;

			this.scale.set(this._mashtab, this._mashtab);
			this.pdfEditorMenuFooter.mashtab = this._mashtab;
			this.pdfEditorMenuNav.mashtab = this._mashtab;

			this.draw();
		},
		get: function () {
			return this._mashtab;
		}
	},

	isHideSketchRooms: {
		set: function (value) {
			this._isHideSketchRooms = value;

			this.pdfEditorMenuSketchRooms.visible = this._isHideSketchRooms;
			this.dispatchEvent(new PdfEditorEvent('onDown', {
				name: 'redrawPage',
				width: this.sketchRoomsWidth,
				isRedrawPage: this._isHideSketchRooms
			}));

		},
		get: function () {
			return this._isHideSketchRooms;
		}
	},

	languageComponent: {
		set: function (value) {
			if (this._languageComponent === value) return;
			this._languageComponent = value;

			this.pdfEditorMenuSketchRooms.language = this._languageComponent.value;
			this.pdfEditorMenuFooter.languageComponent = this._languageComponent;
		},
		get: function () {
			return this._languageComponent;
		}
	}
});
