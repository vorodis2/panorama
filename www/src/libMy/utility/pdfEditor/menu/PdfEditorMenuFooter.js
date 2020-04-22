
function PdfEditorMenuFooter (_pdfEditorMenu) {
	PIXI.Container.call(this);
	var self = this;
	this.type = 'PdfEditorMenuFooter';

	this.pdfEditorMenu = _pdfEditorMenu;

	this.pdfEditorMenu.addChild(this);

	this._width = 100;
	this._height = this.pdfEditorMenu.footerHeight;

	this._otstup = this.pdfEditorMenu.otstup;
	this._index = 0;
	this._languageComponent = null;

	// this._indexPage = -1;

	this.array = [];

	this.numPages = 0;

	this.onDown = function (_idArr, _activ) {

		if (_idArr === 3) {

			self.array[_idArr].activ = true;

			setTimeout(function () {
				self.array[_idArr].activ = false;
			}, 100);

			self.pdfEditorMenu.dispatchEvent(new PdfEditorEvent('onDown', {name: 'savePage'}));
		} else {
			self.index = _idArr;
		}

		var param = {};
		var activ = _activ || false;

		param.name = 'indexFooterDown';
		param.index = self._index;

		if (self.numPages > 1) {
			self.pdfEditorMenu.isHideMenuNav = (self.index === 0);
		} else {
			self.pdfEditorMenu.isHideMenuNav = false;
		}

		self.pdfEditorMenu.isHideSketchRooms = (self.index === 2);
		self.pdfEditorMenu.dispatchEvent(new PdfEditorEvent('onDown', param));
	};

	this.array[0] = new FooterWindowCombo(this, 0, 0, 'PdfEditor_menu_step0', this.onDown);
	this.array[0].funSelectPage = function (_num) {
		self.pdfEditorMenu.dispatchEvent(new PdfEditorEvent('onDown', {
			name: 'selectPage',
			index: _num
		}));
	};
	this.array[1] = new FooterWindowCheck(this, 0, 0, 'PdfEditor_menu_step1', this.onDown);
	this.array[2] = new FooterWindowCheck(this, 0, 0, 'PdfEditor_menu_step2', this.onDown);
	this.array[3] = new FooterWindowCheck(this, 0, 0, 'PdfEditor_menu_step3', this.onDown);

	for (var i = 0; i < this.array.length; i++) {
		this.array[i].idArr = i;
	}

	var shag = 0;
	var ww = 0;
	this.draw = function () {

		ww = this._width / this.array.length;
		shag = 0;

		for (var i = 0; i < this.array.length; i++) {
			this.array[i].otstup = this._otstup;
			this.array[i].width = ww;
			this.array[i].height = this._height;
			this.array[i].x = shag;

			shag += ww;
		}
	};

	this.setState = function (_obj) {

		if (_obj.name === 'loadFile') {
			this.updateComboBox(_obj.pages);
		}

		if (_obj.name === 'secondPage') {
			this.array[0].index = _obj.index - 1;
		}
	};

	this.clear =  function () {

		this.array[0].activ = true;
		this.updateComboBox(1);

		for (var i = 1; i < this.array.length - 1; i++) {
			this.array[i].activ = false;
		}
	};

	this.setIcons = function (_array) {
		this.array[1].setIcons(_array[0]);
		this.array[2].setIcons(_array[1]);
		this.array[3].setIcons(_array[2]);
	};

	this.updateComboBox = function (_num) {

		this.numPages = _num;

		var arr = [];

		for (var i = 1; i <= _num; i++) {
			arr.push('Page ' + i);
		}

		this.pdfEditorMenu.isHideMenuNav = (_num !== 1);

		this.array[0].setTabs(arr);
	};
}

PdfEditorMenuFooter.prototype = Object.create(PIXI.Container.prototype);
PdfEditorMenuFooter.prototype.constructor = PdfEditorMenuFooter;

Object.defineProperties(PdfEditorMenuFooter.prototype, {

	index: {
		set: function (value) {
			if (this._index === value) return;
			this._index = value;

			for (var i = 0; i < this.array.length; i++) {
				this.array[i].activ = (this._index === i);
			}

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

	languageComponent: {
		set: function (value) {
			if (this._languageComponent === value) return;
			this._languageComponent = value;

			for (var i = 0; i < this.array.length; i++) {
				this._languageComponent.setTextComp(this.array[i]);
			}
		},
		get: function () {
			return this._languageComponent;
		}
	}
});

function FooterWindow (cont, _x, _y, _text, fun) {
	PIXI.Container.call(this);
	var self = this;
	this.type = 'FooterWindow';
	
	this.fun = fun;

	this.w = new PLWindow(this);
	this.w.text = _text;
	this.w.drag = false;
	this.w._textAlign = 'center';

	this.idArr = -1;

	this.w.interactive = true;
	this.w.on('mousedown', function () {

		if (self.fun) self.fun(self.idArr, self._activ);

		self.updateActiv();
	});

	cont.addChild(this);

	this._otstup = 2;
	this._width = 100;
	this._height = 100;
	this._activ = false;

	this._x = _x || 0;
	this._y = _y || 0;

	this.correctTextAlign = function () {

		if (this.w._textAlign === 'left') {
			this.w.label.x = 5;
		}

		var realWidth = this.w.label.getLocalBounds().width;

		if (this.w._textAlign === 'center') {
			this.w.label.x = (this._width - realWidth) / 2;
		}

		if (this.w._textAlign === 'right') {
			this.w.label.x = (this.width - realWidth - 5);
		}
	};

	this.draw = function () {};
	this.updateActiv = function () {};
}

FooterWindow.prototype = Object.create(PIXI.Container.prototype);
FooterWindow.prototype.constructor = FooterWindow;

Object.defineProperties(FooterWindow.prototype, {

	textAlign: {
		set: function (value) {
			if (this._textAlign === value) return;
			this._textAlign = value;
			this.draw();
		},
		get: function () {
			return this._textAlign;
		}
	},

	width: {
		set: function (value) {
			if (this._width === value) return;
			this._width = value;
			this.w.width = this._width;
			this.correctTextAlign();
			this.draw();
		},
		get: function () {
			return this._width;
		}
	},

	height: {
		set: function (value) {
			if (this._height === value) return;
			this._height = value - this.w.wh;

			this.w.height = this._height;
			this.draw();
		},
		get: function () {
			return this._height;
		}
	},

	x: {
		set: function (value) {
			if (this._x === value) return;
			this._x = value;
			this.w.x = this._x;
		},
		get: function () {
			return this._x;
		}
	},

	y: {
		set: function (value) {
			if (this._y === value) return;
			this._y = value;
			this.w.y= this._y;
		},
		get: function () {
			return this._y;
		}
	},

	text: {
		set: function (value) {
			this.w._text = value;
			this.w.label.text = value;
		},
		get: function () {
			return this.w._text;
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

	activ: {
		set: function (value) {
			if (this._activ === value) return;
			this._activ = value;
			this.w.panelTab.activ = this._activ;
			this.draw();
			this.updateActiv();
		},
		get: function () {
			return this._activ;
		}
	}
});

function FooterWindowCheck (cont, _x, _y, _text, fun) {
	FooterWindow.call(this, cont, _x, _y, _text, fun);
	var self = this;
	this.type = 'FooterWindowCheck';
	cont.addChild(this.w);

	this.draw = function () {

		var h = this._height - (this._otstup * 2);

		this.btn.x = this._width / 2 - h / 2;
		this.btn.y = this._otstup;

		this.btn.width = h;
		this.btn.height = h;
	};

	this.updateActiv = function () {
		this.btn.activ = this._activ;
	};

	this.btn = new PLButton(this.w.content, 0, 0, '');
	this.btn.setStile(1);
	this.btn.okDown = false;
	// this.btn.fun = this.onDown;

	this.setIcons = function (_link) {
		this.btn.loadImeg(_link);
	};
}

FooterWindowCheck.prototype = Object.create(FooterWindow.prototype);
FooterWindowCheck.prototype.constructor = FooterWindowCheck;

function FooterWindowCombo (cont, _x, _y, _text, fun) {
	FooterWindow.call(this, cont, _x, _y, _text, fun);
	this.type = 'FooterWindowCombo';
	cont.addChild(this.w);
	var self = this;

	this._otstup = 2;
	this._index = -1;

	this.funSelectPage = null;

	this.draw = function () {

		var offset = this._height / 2 - this.comboBox.height / 2;

		this.comboBox.x = offset;
		this.comboBox.y = offset;

		this.comboBox.width = this._width - offset * 2;
	};

	this.onClik = function () {
		if (self.fun) self.fun(self.idArr, this._activ);
	};

	this.onDown = function () {
		if (self.funSelectPage) self.funSelectPage(this._index + 1);
	};

	this.comboBox = new PLComboBox(this.w.content);
	this.comboBox.fun = this.onDown;
	this.comboBox.funClick = this.onClik;
	this.comboBox.addArr(['Page 1']);
	this.comboBox.revertPosCont = true;
	this.comboBox.visiCol = 7;

	this.setTabs = function (_array) {

		if (_array.length === 1) this.comboBox.activMouse = false;
		else this.comboBox.activMouse = true;

		this.comboBox.clear();
		this.comboBox.addArr(_array);
	};
}

FooterWindowCombo.prototype = Object.create(FooterWindow.prototype);
FooterWindowCombo.prototype.constructor = FooterWindowCombo;

Object.defineProperties( FooterWindowCombo.prototype, {

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

	index: {
		set: function (value) {
			if (this._index === value) return;
			this._index = value;

			this.comboBox.index = this._index;
		},
		get: function () {
			return this._index;
		}
	}
});
