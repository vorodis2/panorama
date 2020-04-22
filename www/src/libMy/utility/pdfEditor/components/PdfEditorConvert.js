
/** Хранение и конвертация файлов pdf */
function PdfEditorConvert () {
	var self = this;
	this.type = 'PdfEditorConvert';
	/** Обработанный файл */
	this.doc = null;
	/** Количество страниц в файле */
	this.numPages = 0;
	/** Массив подгруженных страниц */
	this.arrPage = [];
	/** Пришедший файл */
	this.file = null;

	/** Ссылки на подгрузку дополнительных библиотек */
	this.linkPdfLib = 'planer/lib/pdfjs/pdf.js';
	this.linkPdfWorkLib = 'planer/lib/pdfjs/pdf.worker.js';
	/** подгружены ли дополнительные библиотеки */
	var isLoadedDopLib = false;
	var num = 0;
	var script = null;
	this.init = function () {

		num = 0;

		script = document.createElement('script');
		script.onload = onload;
		script.src = this.linkPdfLib;
		document.head.appendChild(script);

		script = document.createElement('script');
		script.onload = onload;
		script.src = this.linkPdfWorkLib;
		document.head.appendChild(script);
	};

	function onload () {
		num++;
		if (num === 2) {
			isLoadedDopLib = true;
			self.startPDF(self.file);
		}
	}
	/**
     * Загрузка файла pdf
     * @param {string} _file - загружаемый файл
     */
	this.startPDF = function (_file) {

		this.file = _file;
		// подгружены ли дополнительные библиотеки
		if (isLoadedDopLib === false) {
			this.init();
			return;
		}

		this.doc = null;
		this.arrPage = [];

		PDFJS.getDocument(_file).then(

			function (resolve) {

				self.doc = resolve;
				self.numPages = resolve.numPages;
				/**
			     * Файл загрузился
			     *
			     * @event PdfEditorConvert#loadFile
			     * @type {object}
			     * @property {string} name - тип события
			     * @property {number} pages - количество страниц в файле
			     */
				self.dispatchEvent(new PdfEditorEvent('loadFile', {
					name: 'loadFile',
					pages: self.numPages
				}));
			},

			function (reject) {
				/**
			     * Ошибка загрузки файла
			     *
			     * @event PdfEditorConvert#loadFileError
			     * @type {object}
			     */
				self.dispatchEvent(new PdfEditorEvent('loadFileError', {}));
			}
		);
	};

	var viewport = 1;
	var arrCan = [];
	var getCan = function () {

		for (var i = 0; i < arrCan.length; i++) {

			if (arrCan[i].activ === false) return arrCan[i];
		}

		arrCan.push(document.createElement('canvas'));
		return arrCan[arrCan.length - 1];
	};

	this.getPicInPage = function (page, _wh, fun) {

		var canvas = getCan();

		canvas.activ = true;

		var context = canvas.getContext('2d');
		var rect = {};

		rect.width = page.view[2] * 2;
		rect.height = page.view[3] * 2;

		viewport = page.getViewport(3);

		canvas.width = viewport.width;
		canvas.height = viewport.height;

		task = page.render({canvasContext: context, viewport: viewport});
		task.promise.then(

			function (resolve) {
				/**
			     * Страница загрузилась
			     *
			     * @event PdfEditorConvert#loadPage
			     * @type {object}
			     * @property {string} name - тип события
			     * @property {string} image - картинка в формате base64
			     */
				self.dispatchEvent(new PdfEditorEvent('loadPage', {
					name: 'loadPage',
					image: canvas.toDataURL(),
					rect: rect
				}));

				canvas.activ = false;
			},

			function (reject) {
				/**
			     * Ошибка загрузки страницы
			     *
			     * @event PdfEditorConvert#loadPageError
			     * @type {object}
			     */
				self.dispatchEvent(new PdfEditorEvent('loadPageError', {}));

				canvas.activ = false;
			}
		);
	};

	this.getPic = function (sah, _wh) {

		if (this.arrPage[sah] !== undefined) {
			this.getPicInPage(this.arrPage[sah], _wh);
			return;
		}

		var task = this.doc.getPage(sah);

		task.then(

			function (resolve) {
				self.arrPage[sah] = resolve;
				self.getPicInPage(resolve, _wh);
			},

			function (reject) {
				/**
			     * Ошибка загрузки страницы
			     *
			     * @event PdfEditorConvert#loadPageError
			     * @type {object}
			     */
				self.dispatchEvent(new PdfEditorEvent('loadPageError', {}));
			}
		);
	};
}

PdfEditorConvert.prototype = Object.assign(PdfEditorConvert.prototype, EventDispatcher.prototype);
