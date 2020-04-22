
function PdfConverter () {
	var self = this;
	this.type = 'PdfConverter';

	this.doc = null;
	this.numPages = 0;
	this.arrPage = [];
	this.funError = null;

	this.startPDF = function (url, fun) {

		this.doc = null;
		this.arrPage = [];

		PDFJS.getDocument(url).then(
			function (doc) { // в случае удачной загрузки

				self.doc = doc;

				self.numPages = doc.numPages;

				fun();
			},
			function (reason) {
				if (self.funError !== null) self.funError();
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