
function PdfEditor (_cont) {
	PIXI.Container.call(this);
	var self = this;
	this.type = 'PdfEditor';

	_cont.addChild(this);

	this._width = 100;
	this._height = 100;

	this._otstup = 2;
	this._otstup1 = 5;
	this._mashtab = 1;
	/** Компонент что занимаеться заменой языков */
	this._languageComponent = null;
	/** Высота верхней менюшки */
	this.headerHeight = 60;
	/** Высота нижней менюшки */
	this.footerHeight = 80;
	/** Длина меню названия комнат */
	this.sketchRoomsWidth = 200;
	/** Длина с учетом открытого меню названия комнат */
	this.widthCropComp = this._width - this.sketchRoomsWidth;
	/** Высота кнопок меню названия комнат */
	this.btnHeight = 27;

	this.panel = new PLPanel(this);
	this.panel.color = 0xBFBFBF;

	this.debug = false;
	/** Конвертация Pdf файла */
	this.pdfEditorConvert = new PdfEditorConvert();
	/** Подстройка, обрезание, фотографирование страницы */
	this.pdfEditorPage = new PdfEditorPage(this);
	this.pdfEditorMenu = new PdfEditorMenu(this);
	/** Фон с крутяшкой что накрывает приложение при загрузке */
	this.pdfEditorPreloader = new PdfEditorPreloader(this);
	this.pdfEditorPreloader.setTypeComp(1);

	/** Подписались на события с менюшки */
	this.pdfEditorMenu.addEventListener('onDown', function (_event) {

		self.pdfEditorPage.setState(_event.param);
		self.pdfEditorMenu.setState(_event.param);

		if (_event.param.name === 'selectPage') {
			self.pdfEditorConvert.getPic(_event.param.index);
		}

		if (_event.param.name === 'loadFile') {
			self.dispatchEvent(new PdfEditorEvent('getFile', _event.param.file));
			self.setFile(_event.param.file);
		}

		if (_event.param.name === 'secondPage') {
			self.pdfEditorConvert.getPic(_event.param.index);
		}
	});

	this.pdfEditorMenu.addEventListener('onCreateBtn', function (_event) {
		self.pdfEditorPage.setState(_event.param);
	});

	this.pdfEditorPreloader.activ = true;
	/** Подписались на события загрузки файла */
	this.pdfEditorPreloader.addEventListener('loadFileFromBtn', function (_event) {
		self.dispatchEvent(new PdfEditorEvent('getFile', _event.param.file));
		self.setFile(_event.param.file);
	});


	/** Подписались на события загрузки картинки */
	this.pdfEditorPage.addEventListener('loadImageComplit', function () {
		self.pdfEditorPreloader.activ = false;
		if (self.debug === true) debug();
	});
	/** Подписались на события изминения страници */
	this.pdfEditorPage.addEventListener('pageWasChanged', function (_event) {

		self.pdfEditorMenu.setState(_event.param);

		if (_event.param.name === 'getPhoto') {
			self.dispatchEvent(new PdfEditorEvent('getPng', _event.param.image));
			if (self.debug === true) pdfEditorDebuger.setB64(_event.param.image);
		}
	});
	/** Подписались на события загрузки нового файла */
	this.pdfEditorConvert.addEventListener('loadFile', function (_event) {
		self.pdfEditorMenu.setState(_event.param);
		self.pdfEditorConvert.getPic(self.correntPage);
	});
	/** Подписались на события загрузки новой страници */
	this.pdfEditorConvert.addEventListener('loadPage', function (_event) {
		self.pdfEditorPreloader.activ = false;
		self.handlFile(_event.param.image, _event.param.rect);
		// if (self.debug === true) pdfEditorDebuger.setB64(_event.param.image);
	});

	this.draw = function () {

		this.pdfEditorPage.x = this._otstup1;
		this.pdfEditorPage.y = (this.headerHeight + this._otstup1) * this._mashtab;

		this.widthCropComp = this._width - this.sketchRoomsWidth * this._mashtab - this._otstup1 * 2;

		this.pdfEditorPage.width = this._width - this._otstup1 * 2;

		var pageH = this._height - this.headerHeight * this._mashtab - this.footerHeight * this._mashtab - this._otstup1 * 2;
		this.pdfEditorPage.height = pageH;
		this.pdfEditorPage.widthCropComp = this.widthCropComp;

		this.pdfEditorMenu.draw();

		if (this.debug === true) {
			// debug();
			pdfEditorDebuger.update();
		}
	};
	/**
	 * Загрузка файла в компонент.
	 * @param {String} _file - файл или картинка в base64.
	 * @param {Rectangle} _rect - размер картинки при фотографировании.
	 */
	this.setFile = function (_file) {

		this.pdfEditorPreloader.activ = true;
		this.pdfEditorPreloader.setTypeComp(0);

		this.pdfEditorPage.clear();
		this.pdfEditorMenu.clear();

		this.correntPage = 1;

		if (_file) {
			this.handlFile(_file);
		} else {
			this.pdfEditorPreloader.setTypeComp(1);
		}
	};
	/**
	 * Обработка загруженного файл.
	 * @param {Base64} _file - файл или картинка.
	 * @param {Rectangle} _rect - размер картинки при фотографировании.
	 */
	this.handlFile = function (_file, _rect) {

		var type = this.getTypeFile(_file);

		if (type !== null) {

			if (type === 'pdf') {
				this.pdfEditorConvert.startPDF(_file);
			}

			if (type === 'image') {
				this.pdfEditorPage.setImage(_file, _rect);
			}
		} else {
			this.pdfEditorPreloader.setTypeComp(1);
		}
	};
	/**
	 * Загрузка иконок приложения.
	 * @param {Array} _array - массив линков на картинки.
	 */
	this.setIcons = function (_array) {
		this.pdfEditorMenu.setIcons(_array);
	};
	/**
	 * Загрузка параметров для меню названий комнат.
	 * @param {Array} _array - массив параметров.
	 */
	this.setSketchRooms = function (_array) {
		this.pdfEditorMenu.setSketchRooms(_array);
	};
	/**
	 * Определение типа загруженного файла.
	 * @param {Base64} _file - файл или картинка.
	 */
	this.getTypeFile = function (_file) {

		if (_file.indexOf('image') !== -1) return 'image';
		if (_file.indexOf('pdf') !== -1) return 'pdf';

		return null;
	};
// -------------------------------дебагер--------------------------------------
	var pdfEditorDebuger = null;
	var graphDebug = null;

	if (this.debug === true) {
		pdfEditorDebuger = new PdfEditorDebuger(this);
		graphDebug = new PIXI.Graphics();
		self.addChild(graphDebug);
	}

	function debug () {

		// graphDebug.clear();
		// graphDebug.lineStyle(1, 0x666464);
		// graphDebug.drawRect(0, 0, self._width, self._height);

		// graphDebug.beginFill(0xff0000);
		// graphDebug.drawRect(0, 0, 100, 100);
	}
}

PdfEditor.prototype = Object.create(PIXI.Container.prototype);
PdfEditor.prototype.constructor = PdfEditor;
PdfEditor.prototype = Object.assign(PdfEditor.prototype, EventDispatcher.prototype);

Object.defineProperties(PdfEditor.prototype, {

	width: {
		set: function (value) {
			if (this._width === value) return;
			this._width = value;

			this.panel.width = this._width;
			this.pdfEditorMenu.width = this._width;
			this.pdfEditorPreloader.width = this._width;

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

			this.panel.height = this._height;
			this.pdfEditorMenu.height = this._height;
			this.pdfEditorPreloader.height = this._height;

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

			this.pdfEditorMenu.otstup = this._otstup;
		},
		get: function () {
			return this._otstup;
		}
	},

	otstup1: {
		set: function (value) {
			if (this._otstup1 === value) return;
			this._otstup1 = value;

			this.pdfEditorMenu.otstup1 = this._otstup1;
			this.draw();
		},
		get: function () {
			return this._otstup1;
		}
	},

	mashtab: {
		set: function (value) {
			if (this._mashtab === value) return;
			this._mashtab = value;

			this.pdfEditorMenu.mashtab = this._mashtab;
			this.pdfEditorPage.mashtab = this._mashtab;

			this.draw();
		},
		get: function () {
			return this._mashtab;
		}
	},

	languageComponent: {
		set: function (value) {
			if (this._languageComponent === value) return;
			this._languageComponent = value;

			this.pdfEditorMenu.languageComponent = this._languageComponent;
		},
		get: function () {
			return this._languageComponent;
		}
	}
});

function PdfEditorEvent (_type, _param) {
	this.type = _type || null;
	this.param = _param || {};
}


function PdfEditorDebuger (_comp) {
	var self = this;
	this.content = new PIXI.Container();
	_comp.addChild(this.content);

	this.window = new PLWindow(this.content);
	this.window.width = 150;
	this.window.y = 410;

	var imgGpaph = new PIXI.Graphics();
	this.window.content.addChild(imgGpaph);
	this.image = new PLImage(this.window.content);
	this.image.funComplit = function () {

		var scale =  Math.min(500 / this.picWidth, 500 / this.picHeight);

		self.image.width = this.picWidth;
		self.image.height = this.picHeight;
		self.image.x = self.window.width;
		trace('<<>>--------------------------------------------------')
		trace('<<>>--размер картинки--', this.picWidth, this.picHeight)
		trace('<<>>--------------------------------------------------')
		self.image.scale.set(scale, scale)

		// imgGpaph.x = -self.image.width*scale;

		// imgGpaph.clear();
		// imgGpaph.lineStyle(2, 0x000000);
		// imgGpaph.drawRect(0, 0, self.image.width, self.image.height);
	};


	// -------------------------------PDFViwer--------------------------------------

	this.pdfViewer = new PDFViwer(this.window.content, function () {
		this.hronPDF.getPic(this.numList, undefined, function (b64) {
			_comp.setFile(b64);
		});
	});

	this.pdfViewer.wh = 60;
	this.pdfViewer.wI = 2;
	this.pdfViewer.wJ = 2;
	this.pdfViewer.povedenie = 1;

	this.pdfViewer.x = 180;

	this.addFileToGal = function (_file) {
		self.pdfViewer.addFileToGal(_file);
	};

	this.setB64 = function (b64) {
		self.image.link = b64;
	};
	// ------------------------------------------------------------------------------------------------
	var posX = 5;
	var posY = 0;
	this.slid = new PLSliderBig(this.window.content, posX, posY, 'width', function () {
		_comp.width = this.value;
	}, 200, 1000);
	this.slid.value = _comp._width;
	this.slid.width = 130;

	posY += this.slid.height;
	this.slid1 = new PLSliderBig(this.window.content, posX, posY, 'height', function () {
		_comp.height = this.value;
	}, 200, 1000);
	this.slid1.width = 130;

	posY += this.slid1.height;
	this.slid2 = new PLSliderBig(this.window.content, posX, posY, 'otstup', function () {
		_comp.otstup = this.value;
	}, 0, 100);
	this.slid2.width = 130;


	posY += this.slid2.height;
	this.slid3 = new PLSliderBig(this.window.content, posX, posY, 'otstup1', function () {
		_comp.otstup1 = this.value;
	}, 0, 100);
	this.slid3.width = 130;

	// posY += this.slid2.height;
	// this.btn = new PLButton(this.window.content, posX, posY, 'Start Crop', function () {
	// 	this.activ = !this._activ;
	// 	_comp.pdfEditorPage.emit('setState', {typeEvent: 'startCropPage', isStartCropPage: this._activ});
	// });
	// this.btn.width = 130;

	// posY += this.btn.height;
	// this.btn = new PLButton(this.window.content, posX, posY, 'Crop', function () {
	// 	this.activ = !this._activ;
		
	// 	if (this.activ === true) _comp.pdfEditorPage.width = 300;
	// 	else _comp.pdfEditorPage.width = 500 - _comp.otstup1*2;

	// 	_comp.pdfEditorPage.emit('setState', {typeEvent: 'cropPage', isCropPage: this._activ});
	// });
	// this.btn.width = 130;

	posY += this.slid3.height;

	this.window.height = posY + 2;

	this.update = function () {
		this.slid.value = _comp._width;
		this.slid1.value = _comp._height;
		this.slid2.value = _comp._otstup;
		this.slid3.value = _comp._otstup1;
	}

	this.update();
}
