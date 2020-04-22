/**
 * Оборачивает в себе объект PDFJS библиотеки jspdf.js.
 * Загружает pdf-фалы и преобразовывает страницы в base64
 * @class
 */
function HronPDF () {
	this.doc;
	this.numPages = 0;
	this.arrPage = [];
	var self = this;

	this.funError;
	this.startPDF = function (url, fun) {

		this.doc = undefined;
		this.arrPage = [];
		PDFJS.getDocument(url).then(
			function (doc) { // в случае удачной загрузки
				self.doc = doc;
				self.numPages = doc.numPages;
				fun();
			},
			function (reason) {
				if (self.funError != undefined)self.funError();
				// FIXI  http://prntscr.com/gt49pg
			}
		);
	};

	var viewport;
	var arrCan = [];
	var getCan = function () {
		for (var i = 0; i < arrCan.length; i++) {
			if (arrCan[i].activ == false) {
				return arrCan[i];
			}
		}
		arrCan.push(document.createElement('canvas'));
		return arrCan[arrCan.length - 1];
	};

	this.getPicInPage = function (page, _wh, fun) {
		var canvas = getCan();
		canvas.activ = true;
		var context = canvas.getContext('2d');
		var ww = page.view[2];
		var hh = page.view[3];
		var ss = 1;
		if (_wh != undefined) {
			ss = _wh / ww;
			if (ss > _wh / hh)ss = _wh / hh;
		}
		canvas.width = ww * ss;
		canvas.height = hh * ss;
		viewport = page.getViewport(ss);
		task = page.render({canvasContext: context, viewport: viewport});
		task.promise.then(
			function () {
				fun(canvas.toDataURL());
				canvas.activ = false;
			},
			function (reason) {
				fun(null);
				canvas.activ = false;
			}
		);
	};

	this.getPic = function (sah, _wh, fun) {
		if (this.arrPage[sah] != undefined) {
			this.getPicInPage(this.arrPage[sah], _wh, fun);
			return;
		}
		var task = this.doc.getPage(sah);
		task.then(
			function (page) {
				self.arrPage[sah] = page;
				self.getPicInPage(page, _wh, fun); /**/
			},
			function (reason) {
				if (fun)fun(null);
			}
		);
	};

}


/**
 * Для постраничной загрузки и вывода пользователю PDF-документа.
 * Позволяет вернуть base64 выбранной страницы.
 * @class
 * @param cont {PIXI.Container} контейнер родителя
 * @param fun {function}
 */
function PDFViwer (cont, fun) {
	PIXI.Container.call(this);
	this.type = 'PDFViwer';
	this.canvas;
	this.pdf;


	cont.addChild(this);
	this.visible = false;
	var self = this;
	this.fun = fun;
	this.funActiv;
	this.funComplit;
	this.funChangeSize = null;
	this.w = 100;
	this.h = 100;
	this._activLoad = true;

	this.wh = 200;
	this.otstup = 2;
	this.wI = 4;
	this.wJ = 2;
	this.povedenie=0;
	this.numList=0;

	this.panel = new PLPanel(this);
	this.panel.alpha = 0.5;
	this.panel.interactive = true;
	this.panel.on('mousedown', function () {
		if (self._activLoad == true) return;
		self.activ = false;
	});


	/** Обертка для объекта PDFJS библиотеки jspdf.js.
    * @member {HronPDF}
    */
	this.hronPDF;

	/** Интерфейс - для отображения и выбора страниц
    * @member {PDFMenu}
    */
	this.pDFMenu;

	/** Загружает pdf-файл в галерею
     * @param {String} url - ссылка на файл.
     */
	this.addFileToGal = function (url) {
		this.activ = true;
		this.activLoad = true;
		if (this.hronPDF == undefined) {
			this.init(url);
			return;
		}
		self.pDFMenu.funError(false);
		this.startPDF(url);
	};

	this.linkDoc = 'null';
	this.startPDF = function (url) {
		this.initMenu();
		this.pDFMenu.activLoad = this.activLoad;
		this.pDFMenu.sizeWindow(this.w, this.h);
		this.linkDoc = url;
		this.activLoad = true;
		self.hronPDF.startPDF(url, this.startPDF2);

	};
	this.startPDF2 = function () {
		self.pDFMenu.restart();
	};

	this.initMenu = function () {
		if (this.pDFMenu == undefined) {
			this.pDFMenu = new PDFMenu(this, function (str) {
				if (str == 'complit') {
					self.activLoad = false;
					if (self.funComplit) self.funComplit();
				}
				if (str == "numList") {
					self.numList=this.numList;
					self.fun()
					
				}
			});
			this.pDFMenu.povedenie=self.povedenie;
			self.pDFMenu.funError(false);
		}
	};

	this.funError = function () {
		self.initMenu();
		self.pDFMenu.funError(true);
		self.activLoad = false;
	};

	this.init = function (url) {
		var sah = 0;
		function onload () {
			sah++;
			if (sah == 2) {
				self.hronPDF = new HronPDF(self);
				this.activLoad = true;
				self.hronPDF.funError = self.funError;
				self.startPDF(url);
				self.hronPDF.funChangeSize = self.funChangeSize;
			}
		}
		var script = document.createElement('script');
		script.onload = onload;
		script.src = 'planer/lib/pdfjs/pdf.js';
		document.head.appendChild(script);

		script = document.createElement('script');
		script.onload = onload;
		script.src = 'planer/lib/pdfjs/pdf.worker.js';
		document.head.appendChild(script);
	};

	this.keyEvent = function (s, ud) {};

	this.sizeWindow = function (_width, _height, _scale) {
		this.w = _width;
		this.h = _height;
		if (this.activ == false) return;
		this.panel.width = this.w;
		this.panel.height = this.h;
		if (this.pDFMenu != undefined) {
			this.pDFMenu.sizeWindow(_width, _height);
		}
	};
}
PDFViwer.prototype = Object.create(PIXI.Container.prototype);
PDFViwer.prototype.constructor = PDFViwer;

Object.defineProperties(PDFViwer.prototype, {

	activLoad: {
		set: function (v) {
			if (this._activLoad == v) return;
			this._activLoad = v;

			if (this.pDFMenu) {
				this.pDFMenu.activLoad = v;
			}

			// FIXE вывести не возможность двигаться дальше
		},
		get: function () { return this._activLoad; }
	},
	activ: {
		set: function (v) {
			if (this._activ == v) return;
			this._activ = v;
			this.visible = this._activ;
			if (v == true) this.sizeWindow(this.w * 1, this.h * 1);
			else {
				this.pDFMenu.clear();
			}
			if (this.funActiv) this.funActiv();
		},
		get: function () { return this._activ; }
	}

});
