/**
 * Интерфейс для отображения pdf-страниц.
 * @class
 * @param pDFViwer {PDFViwer}
 * @param fun {function} выполняется когда страницы готовы к отображению
 */
function PDFMenu (pDFViwer, fun) {
	PIXI.Container.call(this);
	this.type = 'PDFContur';
	var self = this;
	this.pDFViwer = pDFViwer;
	pDFViwer.addChild(this);
	this.fun = fun;
	this.funChangeSize = null;
	this.w = 100;
	this.h = 100;

	this.wh = pDFViwer.wh;
	this.otstup = pDFViwer.otstup;
	this.wI = pDFViwer.wI;
	this.wJ = pDFViwer.wJ;
	this.wJI = this.wI * this.wJ;

	this.startPage = 0;
	this.finishPage = 0;
	this._activLoad = false;
	this._povedenie=0;
	this.preloader;
	this.numList=-1;
	this.content = new PIXI.Container();
	this.win = new PLWindow(this, 0, 0, 'PDF', function () {

	});
	pl102.removeElement(this.win, true);
	this.win.drag = false;

	this.win.width = this.otstup * 2 + this.wI * (this.otstup + this.wh);
	this.win.height = this.otstup * 2 + this.wJ * (this.otstup + this.wh);

	this.win.content.addChild(this.content);


	this.butCloxe = new PLButton(this.win, 0, 0, 'x', function () {
		self.pDFViwer.activ = false;
	});
	pl102.removeElement(this.butCloxe, true);
	this.butCloxe.width = this.butCloxe.height;
	this.butCloxe.x = this.win.width - this.butCloxe.width;


	this.lebelError = new PLLabel(this.win.content, 20, 20, 'Error: pdf incorrect file!!');


	this.gallery = new PDFNeeGallery(this, function () {		
		self.numList = this.getIndexIsSah(this.index);
		
		if (self.numList){
			if(self.povedenie==0)self.preview.startSah(self.numList);
			if(self.povedenie==1)self.fun("numList");
		}
	});

	this.preview = new PDFNeePrev(this, function (str, p) {
		/* if(str=="testList"){
			self.plusPicPDF.testList(p);
		} */
	});

	this.plusPicPDF = new PlusPicPDF(this, function (str, p) {
		if (str == 'restart') {
			self.restartOtDo(this.array[this.index].startPage, this.array[this.index].finishPage);
			if (self.preview.activ != false) {
				self.preview.startSah(this.array[this.index].startPage);
			}
		}
		if (str == 'down') {
			self.restartOtDo(this.array[this.index].startPage, this.array[this.index].finishPage);
			if (self.preview.activ != false) {
				var ll = this.array[this.index].startPage;
				setTimeout(function () {
					self.preview.startSah(ll);
				}, 100);
				// self.preview.startSah(this.array[this.index].startPage);
			}
		}

		if (str == 'testList') {
			self.restartOtDo(this.array[this.index].startPage, this.array[this.index].finishPage);
			self.gallery.testList(self.numList);
		}
	});

	this.kolList = 0;
	this.sahL = 0;
	this.restart = function () {
		this.content.visible = true;
		this.lebelError.visible = false;
		this.kolList = pDFViwer.hronPDF.numPages; // FIXE
		this.plusPicPDF.restart();
		this.sizeWindow(this.w * 1, this.h * 1);
	};

	this.restartOtDo = function (_ot, _do) {
		this.gallery.clear();
		this.startPage = _ot;
		this.finishPage = _do;
		this.sahL = 0;
		this.loadSah();
	};

	this.funError = function (b) {
		this.content.visible = !b;
		this.lebelError.visible = b;
	};

	this.loadSah = function () {
		var ss = self.sahL + self.startPage;
		if (ss <= self.finishPage) {
			pDFViwer.hronPDF.getPic(ss, self.wh, self.loadSahOk);
		} else {
			this.fun('complit');
		}
	};

	this.loadSahOk = function (base64) {
		self.gallery.addPic(base64, self.sahL + self.startPage);
		self.gallery.testList(self.numList);
		self.sahL++;
		self.loadSah();
	};

	this.clear = function () {
		this.preview.activ = false;
		this.plusPicPDF.content.visible = false;
		self.gallery.clear();
		self.gallery.index = -1;
	};

	this.numList = 1;
	this.setList = function (list) {
		if (list <= 0) return;
		if (list > this.kolList) return;
		self.numList = list;
		self.plusPicPDF.testList(list);
		self.preview.startSah(list);
		self.gallery.poiskListInIndex(list);
	};

	this.sizeWindow = function (_width, _height, _scale) {
		this.w = _width;
		this.h = _height;
		this.win.x = (_width - this.win.width) / 2;
		if (this.plusPicPDF.content.visible == false) {
			this.win.y = (_height - this.win.height) / 2;
		} else {
			this.win.y = (_height - this.win.height - this.plusPicPDF.panel.height) / 2;
			if (this.win.y < 0) this.win.y = 0;
		}

		if (this.funChangeSize !== null) this.funChangeSize();
	};
}
PDFMenu.prototype = Object.create(PIXI.Container.prototype);
PDFMenu.prototype.constructor = PDFMenu;
Object.defineProperties(PDFMenu.prototype, {
	activLoad: {
		set: function (v) {
			if (this._activLoad == v) return;
			this._activLoad = v;
			if (this.preloader == undefined) {
				this.preloader = new PLPreloader(this.win.content);
				pl102.removeElement(this.preloader, true);
				this.preloader.podlog = true;
			}
			this.preloader.width = this.win.width;
			this.preloader.height = this.win.height;
			this.preloader.visible = this.preloader.activ = v;
		},
		get: function () { return this._activLoad; }
	},
	povedenie: {
		set: function (v) {
			if (this._povedenie == v) return;
			this._povedenie = v;			
		},
		get: function () { return this._povedenie; }
	},

	
});

// нижния штука с дополнительными картинками
function PlusPicPDF (pDFMenu, _fun) {
	var self = this;
	this.fun = _fun;
	this.pDFMenu = pDFMenu;
	this.content = new PIXI.Container();
	pDFMenu.content.addChild(this.content);

	this._wPar = pDFMenu.win.width;
	this._hPar = pDFMenu.win.height;

	this.panel = new PLPanel(this.content, 0, this._hPar);
	pl102.removeElement(this.panel, true);
	this.panel.width = this._wPar;
	this.content.visible = false;

	this.otstup = pDFMenu.otstup;
	this.wI = pDFMenu.wI;
	this.wJ = pDFMenu.wJ;
	this.wIJ = this.wI * this.wJ;
	this.array = [];

	this._index = -1;

	this.down = function () {
		self.index = this.idArr;
		self.fun('down');
	};

	this.button;
	var but;
	this.getBut = function () {
		for (var i = 0; i < this.array.length; i++) {
			if (this.array[i].visible == false) {
				this.array[i].visible = true;
				return this.array[i];
			}
		}
		but = new PLButton(this.panel.content, 0, 0, '-', this.down);
		pl102.removeElement(but, true);
		but.idArr = this.array.length;
		this.array.push(but);
		return but;
	};

	this.draw = function () {
		var jj = this.otstup;
		var ii = this.otstup;
		for (var i = 0; i < this.array.length; i++) {
			if (this.array[i].visible != false) {

				if (ii + (this.array[i].width + this.otstup) > this._wPar) {
					ii = this.otstup;
					jj += this.otstup + this.array[i].height;
				}
				this.array[i].y = jj;
				this.array[i].x = ii;
				ii += this.array[i].width + this.otstup;
			}
		}
		this.panel.height = jj + this.otstup * 2 + this.array[0].height;

	};

	this.testList = function (numList) {
		if (this.array[this.index] != undefined) {
			if (numList >= this.array[this.index].startPage) {
				if (numList <= this.array[this.index].finishPage) {
					return;
				}
			}
		}
		for (var i = 0; i < this.array.length; i++) {
			if (this.array[i].visible != false) {
				if (numList >= this.array[i].startPage) {
					if (numList <= this.array[i].finishPage) {
						this.index = i;
						self.fun('testList');
					}
				}
			}
		}
	};

	this.restart = function () {
		this.clear();
		this.arrayList = [];
		var j = 0;
		var k = 0;
		var k1 = 0;
		for (var i = 0; i < 92222; i++) {
			k = j * this.wIJ + 1;
			k1 = (j + 1) * this.wIJ;
			if (k1 >= pDFMenu.kolList)k1 = pDFMenu.kolList;
			this.button = this.getBut();
			this.button.startPage = k;
			this.button.finishPage = k1;
			this.button.text = k + '-' + k1;
			this.button.width = this.button.text.length * 12 + 20;
			if (k1 < pDFMenu.kolList) {
				i = 0;
				j++;
			} else {
				break;
			}
		}

		if (j <= 0) {
			this.content.visible = false;
		} else {
			this.content.visible = true;
			this.draw();
		}
		this.index = 0;
		self.fun('restart');
	};

	this.clear = function () {
		this._index = -1;
		for (var i = 0; i < this.array.length; i++) {
			this.array[i].visible = false;
			if (this.array[i].activ == true) this.array[i].activ = false;
		}
	};
}
Object.defineProperties(PlusPicPDF.prototype, {
	index: {
		set: function (v) {
			if (this._index == v) return;
			this._index = v;
			for (var i = 0; i < this.array.length; i++) {
				if (i == this._index) this.array[i].activ = true;
				else this.array[i].activ = false;
			}
		},
		get: function () { return this._index; }
	}
});


function PDFNeeGallery (pDFMenu, _fun) {
	var self = this;
	this.fun = _fun;
	this.pDFMenu = pDFMenu;
	this.content = new PIXI.Container();
	pDFMenu.content.addChild(this.content);

	this.array = [];
	this.index = -1;
	this.clik = function () {
		self.index = this.idArr;
		self.fun();
	};

	var button;
	this.init = function () {
		for (var i = 0; i < pDFMenu.wI; i++) {
			for (var j = 0; j < pDFMenu.wJ; j++) {
				button = new PLButton(this.content, pDFMenu.otstup + i * (pDFMenu.otstup + pDFMenu.wh), pDFMenu.otstup + j * (pDFMenu.otstup + pDFMenu.wh), '', this.clik);
				pl102.removeElement(button, true);
				button.idArr = this.array.length;
				button.otstup = 4;
				button.ii = i;
				button.jj = j;
				this.array.push(button);
				button.setStile(1, pDFMenu.wh, pDFMenu.wh);
			}
		}
		this.clear();
	};


	this.testList = function (numLink) {
		for (var i = 0; i < this.array.length; i++) {
			if (this.array[i].visible == true) {
				if (this.array[i].sah + pDFMenu.startPage == numLink) {
					this.index = i;
				}
			}
		}
	};

	this.addPic = function (base64, sah) {
		for (var i = 0; i < this.array.length; i++) {
			if (this.array[i].visible == false) {
				button = this.array[i];
				break;
			}
		}
		button.visible = true;
		button.loadImeg(base64);
		button.sah = sah;
		button.funComplit = function () {
			this.image.x = (this.width - this.image.image.width) / 2;
			this.image.y = (this.height - this.image.image.height) / 2;
		};
	};

	this.getIndexIsSah = function (index) {
		if (this.array[index] == undefined) return null;
		return this.array[index].sah;
	};

	this.poiskListInIndex = function (list) {
		for (var i = 0; i < this.array.length; i++) {
			if (this.array[i].visible != false) {
				if (this.array[i].sah == list) {
					this.index = i;
					return true;
				}
			}
		}
		return false;
	};

	this.clear = function () {
		for (var i = 0; i < this.array.length; i++) {
			this.array[i].visible = false;
		}
	};

	this.init();
}
Object.defineProperties(PDFNeeGallery.prototype, {
	index: {
		set: function (v) {
			if (this._index == v) return;
			this._index = v;
			/*  for (var i = 0; i < this.array.length; i++) {
				if(this._index==i){
					this.array[i].activ=true;
				}
				else this.array[i].activ=false;
			} */
		},
		get: function () { return this._index; }
	}
});


function PDFNeePrev (pDFMenu, _fun) {
	var self = this;
	this.fun = _fun;
	this.pDFMenu = pDFMenu;
	this.content = new PIXI.Container();
	pDFMenu.content.addChild(this.content);

	this.width = pDFMenu.win.width;
	this.height = pDFMenu.win.height;

	this.oldW = 100;
	this.oldH = 100;

	this.wh = 64;
	this.otstup = 5;

	this.link = 'resources/images/pikNew/';

	this._activ = false;
	this.content.visible = this._activ;
	this.bLoad;
	this.init = function () {
		this.panel = new PLPanel(this.content);
		pl102.removeElement(this.panel, true);
		this.panel.alpha = 0.5;
		this.panel.interactive = true;

		this.panel.width = pDFMenu.win.width;
		this.panel.height = pDFMenu.win.height;
		this.panel.on('mousedown', function () {
			self.activ = false;
		});

		this.pdfImege = new PDFImege(this.content, this.imLoad);
		this.pdfImege.maxW = this.width - (this.wh + this.otstup * 2) * 2;
		this.pdfImege.maxH = this.height - this.otstup * 2;
		this.pdfImege.x = this.width / 2;
		this.pdfImege.y = this.height / 2;

		this.preloader = new PLPreloader(this.content);
		pl102.removeElement(this.preloader, true);
		this.preloader.podlog = true;
		this.preloader.activ = false;
		this.preloader.centor = true;
		this.preloader.x = this.width / 2;
		this.preloader.y = this.height / 2;


		this.bR = new PLButton(this.content, 0, (this.height - this.wh) / 2, '', function () {
			self.pDFMenu.setList(self.numList + 1);
		});
		pl102.removeElement(this.bR, true);
		this.bR.setStile(1, this.wh, this.wh);
		this.bR.loadImeg(this.link + 'pdf/6.2.png');

		this.bL = new PLButton(this.content, 0, (this.height - this.wh) / 2, '', function () {
			self.pDFMenu.setList(self.numList - 1);
			// self.fun("testList",ghju)
		});
		pl102.removeElement(this.bL, true);
		this.bL.setStile(1, this.wh, this.wh);
		this.bL.loadImeg(this.link + 'pdf/5.2.png');


		this.bP = new PLButton(this.content, this.otstup, this.height - this.wh - this.otstup, '', function () {
			var a = self.pdfImege.angel;
			a++;
			if (a >= 4)a = 0;
			self.pdfImege.angel = a;
		});
		pl102.removeElement(this.bP, true);
		this.bP.setStile(1, this.wh, this.wh);
		this.bP.loadImeg(this.link + 'pdf/8.2.png');


		this.bLoad = new PLButton(this.content, this.width - this.wh - this.otstup, this.height - this.wh - this.otstup, '', function () {
			this.activMouse = false;
			self.pdfImege.otdatPic(function (base64) {
				self.bLoad.activMouse = true;
				// self.pDFMenu.pDFViwer.activ = false;
				if (self.pDFMenu.pDFViwer.fun) self.pDFMenu.pDFViwer.fun('sevePicAndPDF', base64);
			});
		});
		pl102.removeElement(this.bLoad, true);
		this.bLoad.width = this.wh;
		this.bLoad.height = this.wh;
		this.bLoad.activ = true;
		this.bLoad.loadImeg(this.link + 'pdf/7.2.png');
	};

	this.imLoad = function () {
		self.preloader.activ = false;
		self.bLoad.activMouse = true;
		self.restertPic(this.width, this.height);
	};

	this.restertPic = function (_w, _h) {
		this.oldW = _w;
		this.oldH = _h;
		this.preloader.width = _w;
		this.preloader.height = _h;
		this.bL.x = this.preloader.x - this.otstup - _w / 2 - this.wh;
		this.bR.x = this.preloader.x + this.otstup + _w / 2;
	};

	this.getPic = function (bas64) {
		self.pdfImege.linkLoad(bas64);
	};

	this.numList;
	this.startSah = function (numList) {

		this.numList = numList;
		this.activ = true;
		this.restertPic(this.oldW, this.oldH);
		this.preloader.activ = true;
		this.bLoad.activMouse = false;
		this.pDFMenu.pDFViwer.hronPDF.getPic(numList, undefined, this.getPic);
	};
	this.init();
}
Object.defineProperties(PDFNeePrev.prototype, {
	activ: {
		set: function (v) {
			if (this._activ == v) return;
			this._activ = v;
			this.content.visible = this._activ;
		},
		get: function () { return this._activ; }
	}
});

function PDFImege (cont, fun) {
	PIXI.Container.call(this);
	var self = this;
	cont.addChild(this);
	this.fun = fun;

	this._width = 100;
	this._height = 100;
	this._angel = 0;

	this.maxH = 100;
	this.maxW = 100;

	this.picWidth = 100;
	this.picHeight = 100;
	this.prosentWinH = 1;

	this.contIm = new PIXI.Container();
	this.addChild(this.contIm);

	this.imLoadPic = function () {
		self.picWidth = this.picWidth;
		self.picHeight = this.picHeight;
		self.prosentWinH = this.picWidth / this.picHeight;
		self.imLoad();
	};

	this.imLoad = function () {
		self.draw();
		self.fun();
	};

	this.image = new PLImage(this.contIm, -50, -50, undefined, this.imLoadPic);
	pl102.removeElement(this.image, true);
	this.graphics = new PIXI.Graphics();
	this.addChild(this.graphics);

	this.draw = function () {
		if (this._angel == 0) this.contIm.rotation = 0;
		if (this._angel == 1) this.contIm.rotation = Math.PI / 2;
		if (this._angel == 2) this.contIm.rotation = Math.PI;
		if (this._angel == 3) this.contIm.rotation = Math.PI + Math.PI / 2;

		if ((this._angel == 0) || (this._angel == 2)) {
			if ((self.picWidth / this.maxW) < (self.picHeight / this.maxH)) {
				this.image.height = this.maxH;
				this.image.width = this.maxH * self.prosentWinH;
			} else {
				this.image.width = this.maxW;
				this.image.height = this.maxW / self.prosentWinH;
			}
			this._width = this.image.width;
			this._height = this.image.height;
		} else {
			if ((self.picWidth / this.maxH) < (self.picHeight / this.maxW)) {
				this.image.width = this.maxW * self.prosentWinH;
				this.image.height = this.maxW;
			} else {
				this.image.width = this.maxH;
				this.image.height = this.maxH / self.prosentWinH;
			}
			this._width = this.image.height;
			this._height = this.image.width;
		}
		this.image.x = -this.image.width / 2;
		this.image.y = -this.image.height / 2;
	};

	this.base64;
	this.linkLoad = function (base64) {
		this.base64 = base64;
		this.image.link = base64;
	};
	this.bmp = new PLBitmapData();
	pl102.removeElement(this.bmp, true);
	this.bmp2 = new PLBitmapData();
	pl102.removeElement(this.bmp2, true);

	this.otdatPic = function (fun) {
		if (this._angel == 0) {
			fun(this.base64);
			return;
		}

		self.bmp.setImage(this.image.image);

		if (this._angel == 2) {
			this.bmp2.width = this.bmp.width;
			this.bmp2.height = this.bmp.height;
			for (var i = 0; i < this.bmp2._width; i++) {
				for (var j = 0; j < this.bmp2._height; j++) {
					this.bmp2.setPixel(i, j, this.bmp.getPixel(i, this.bmp2._height - j));
				}
			}
			this.bmp2.upDate();
			fun(this.bmp2.getData());
			return;
		}

		this.bmp2.width = this.bmp.height;
		this.bmp2.height = this.bmp.width;

		if (this._angel == 3) {
			for (var i = 0; i < this.bmp2._width; i++) {
				for (var j = 0; j < this.bmp2._height; j++) {
					this.bmp2.setPixel(i, j, this.bmp.getPixel(this.bmp2._height - j, i));
				}
			}
			this.bmp2.upDate();
			fun(this.bmp2.getData());
			return;
		}

		if (this._angel == 1) {
			for (var i = 0; i < this.bmp2._width; i++) {
				for (var j = 0; j < this.bmp2._height; j++) {
					this.bmp2.setPixel(i, j, this.bmp.getPixel(j, this.bmp2._width - i));
				}
			}
			this.bmp2.upDate();
			fun(this.bmp2.getData());
		}
	};
}
PDFImege.prototype = Object.create(PIXI.Container.prototype);
PDFImege.prototype.constructor = PDFImege;
Object.defineProperties(PDFImege.prototype, {
	angel: {
		set: function (value) {
			if (this._angel == value) return;
			this._angel = value;
			this.imLoad();
		},
		get: function () {
			return this._angel;
		}
	},
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
	}
});
