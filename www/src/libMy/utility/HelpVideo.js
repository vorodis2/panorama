/** @module planer */
/**
 * @see {helpVideo}
 * @global
 */
var helpVideo;

/**
 * Выводит видеоподсказкy в интерфейс.
 * Видеоряд может менятся в зависимости от шага в приложении
 * @class
 */
function HelpVideo (cont) {
	PIXI.Container.call(this);
	this.type = 'HelpVideo';
	var self = this;
	helpVideo = this;
	cont.addChild(this);


	this._width = 100;
	this._height = 100;
	this._otstup = 20;
	this._helpVideo = undefined;
	this._wh = pl102.wh;
	this._sahMenu = -1;
	this._sahAutoPlay = true;
	this._activ = false;
	this._enebled = true;

	this.ratioVid = 0.665;

	var confVideo = {};
	confVideo.arr = [];

	this._arr = [];

	this.funActiv;

	this.init = function () {
		this.panel = new PLPanel(this);
		pl102.removeElement(this.panel, true);
		this.panel.alpha = 0.5;
		this.panel.interactive = true;
		this.panel.on('mousedown', function () {
			self.activ = false;
		});

		this.contWindow = new PIXI.Container();
		this.addChild(this.contWindow);

		this.pnlHead = new PLPanel(this.contWindow, 0, 0);
		pl102.removeElement(this.pnlHead, true);
		this.pnlHead.height = pl102.wh;
		this.pnlHead.color = pl102.colorButton;
		this.graphCover = new PIXI.Graphics();
		this.contWindow.addChild(this.graphCover);
		this.graphCover.alpha = 0.2;
		pl102.removeElement(this.pnlHead, true);
		this.pnlMain = new PLPanel(this.contWindow, 0, 0, '');
		pl102.removeElement(this.pnlMain, true);

		this.label = new PLLabel(this.contWindow, 5, 0, '');
		this.label.text = 'bl_HELP';
		language.setTextComp(this.label);

		pl102.removeElement(this.label, true);
		this.label.color = 0xffffff;

		this.btnClose = new PLButton(this.contWindow, 0, 0, 'x', function () { self.activ = false; });
		pl102.removeElement(this.btnClose, true);

		/** Обертка для DOMElement 'video'
		* @member {PLVideo} */
		this.video = new PLVideo(this.pnlMain, 0, 0, this._link);
		pl102.removeElement(this.video, true);
		this.video.funEnd = function () {
			self.gallery.index++;
		};

		/**  Галерея с видео
		* @member {GalleryVideo} */
		this.gallery = new GalleryVideo(this.pnlMain, 0, 0, this._arr, function (btn) {
			self.video.link = btn.obj.video.url;
		}, function (item) {
			return item.stepId == self._sahMenu;
		});

		this.cbxOffAutoPlay = new PLCheckBox(this.pnlMain, 0, 0, "", function (btn) {

			infoUzer.config.helpVideo = this.value;
			self.helpVideo = this.value;
			infoUzer.save();

		});

		this.cbxOffAutoPlay.label.text = 'bl_Dont_show_again';
		language.setTextComp(this.cbxOffAutoPlay.label);

		this.cbxOffAutoPlay.label.bold = true;
		this._helpVideo = false;
		if (infoUzer.config) { if (infoUzer.config.helpVideo) this._helpVideo = infoUzer.config.helpVideo; }
		this.cbxOffAutoPlay.value = this._helpVideo;
		this.helpVideo = this._helpVideo;

		this.lblNoVid = new PLLabel(this.contWindow, 5, 0, '');

		this.lblNoVid.text = 'bl_There_is_no_help_for_this_step';
		language.setTextComp(this.lblNoVid);

		pl102.removeElement(this.lblNoVid, true);
		this.lblNoVid.visible = false;
		this.lblNoVid.fontSize = 26;

		this.video.sdrProgres.y = 100;

		this.gallery.arr = this._arr;

		this.draw();
		this.setStyle();
		var remSah = this._sahMenu;
		this.sahMenu = -1;
		this.sahMenu = remSah;
	};
	this.draw = function () {
		if (!this.pnlMain) return;
		var width = this.w <= 1250 ? this._width * 0.85 : this._width;
		var height = this.w <= 1250 ? this._height * 0.85 : this._height;

		this.pnlHead.height = this._wh;
		this.pnlMain.width = this.pnlHead.width = width;
		this.pnlMain.height = height - this.pnlHead.height;
		this.pnlMain.y = this.pnlHead.height;

		this.rect = this.label.getRect();
		this.label.x = this.label.y = (this.pnlHead.height - this.rect.height) / 2;

		this.rect = this.lblNoVid.getRect();
		this.lblNoVid.x = (this.pnlMain.width - this.rect.width) / 2;
		this.lblNoVid.y = (this.pnlMain.height - this.rect.height) / 2;

		this.btnClose.width = this.btnClose.height = this._wh * 0.85;
		this.btnClose.x = this.pnlHead.width - this.btnClose.width;
		this.video.width = width * 0.7;
		this.video.height = width * 0.7 * this.ratioVid;
		this.video.x = this._otstup;
		this.video.y = this._otstup;

		this.gallery.width = width - this.video.width - this._otstup * 3;
		this.gallery.height = this.video.height - this.cbxOffAutoPlay.height - this._otstup;
		this.gallery.x = this.video.width + this._otstup * 2;
		this.gallery.y = this.video.y;

		this.cbxOffAutoPlay.x = this.video.width + this._otstup * 2;
		this.cbxOffAutoPlay.y = this.gallery.y + this.gallery.height + this._otstup - this.cbxOffAutoPlay.height / 4;

		this.video.sdrVolY = (this.video.btnMute.height - this.video.sdrVol.height) / 2 + this.video.btnMute.y;
		this.video.sdrProgrY = (this.video.btnMute.height - this.video.sdrProgres.height) / 2 + this.video.btnMute.y;
		this.video.sdrProgres.y = this.video._otst * 1.7;

		this.graphCover.clear();
		this.graphCover.beginFill(0xffffff);
		this.graphCover.drawRect(this.pnlHead.x, this.pnlHead.y, this.pnlHead.width, this.pnlHead.height);
		this.graphCover.endFill();
	};

	this.setStyle = function () {
		this.wh = 70;
		this.gallery.setParam('colorActiv', 0xffb200);
		this.gallery.setParam('colorTextActiv', 0xffffff);
		this.gallery.setParam('colorTextDefault', 0x000000);
		this.gallery.setParam('bold', false);
		this.gallery.setParam('wh', 50);
		this.gallery.setParam('fontSize', 20);
		this.gallery.setParam('boolTin', false);
		this.pnlHead.color = 0xffb200;
		this.btnClose.label.color = 0xcb8d00;
		this.btnClose.label.boolTin = false;
		this.btnClose.label.fontSize = 18;
		this.label.bold = false;
		this.label.fontSize = 26;
		this.btnClose.visiblePanel = false;
		this.video.sdrProgres.but.visible = false;
		this.video.sdrProgres.panel.color = 0x808080;
		this.video.sdrProgres.panel2.color = 0x0095dd;
		this.video.sdrVol.but.visidle = true;
		this.video.sdrVol.value = 50;
	};

	/** Обработка нажатия клавиш
	 * @param {String} s - код клавиши.
	 * @param {Number} ud - (0 - keydown; 2 - keyup).
	 * @param {boolean} bAlt - нажат ли Alt
	 * @param {boolean} bCtrl - нажат ли Ctrl.
	 * @param {boolean} bShift - нажат ли Shift.
	 */
	this.keyEvent = function (s, ud, bAlt, bCtrl, bShift) {
		if (this._activ == true && ud == 0) {
			if (s == 'esc') {
				this.activ = false;
			} else if (s == 'probel') {
				this.video.bPause = !this.video.bPause;
			} else {
				if (s == '40') {
					if (this.gallery.arrBtn.length - 1 > this.gallery.index) this.gallery.index++;
				}
				if (s == '38') {
					if (this.gallery.index > 0) this.gallery.index--;
				}
				if (s == '39') this.video.time += 5;
				if (s == '37') this.video.time -= 5;
			}
		}
	};

	this.sizeWindow = function (_width, _height, _scale) {
		this.w = _width;
		this.h = _height;
		if (!this.activ) return;
		this.panel.width = this.w;
		this.panel.height = this.h;

		this.contWindow.x = _width <= 1250 ? (_width - this._width * 0.85) / 2 : (_width - this._width) / 2;
		this.contWindow.y = _width <= 1250 ? (_height - this._height * 0.85) / 2 : (_height - this._height) / 2;
		this.draw();
	};
	this.width = 1216;
	this.height = 710;
}
HelpVideo.prototype = Object.create(PIXI.Container.prototype);
HelpVideo.prototype.constructor = HelpVideo;
Object.defineProperties(HelpVideo.prototype, {
	activ: {
		set: function (v) {
			if (this._enebled == false) return;
			if (this._activ == v) return;
			if (v && !this.panel) this.init();
			this._activ = v;
			this.visible = this._activ;
			if (v == true) {
				this.sizeWindow(this.w * 1, this.h * 1);
				this.gallery.index = 0;
			} else {
				this.video.bPause = true;
			}
			if (this.funActiv) this.funActiv();
		},
		get: function () { return this._activ; }
	},
	enebled: {
		set: function (v) {
			if (this._enebled == v) return;
			this._enebled = v;
			if (this._enebled === false) this._activ = false;
		},
		get: function () { return this._enebled; }
	},
	width: {
		set: function (v) {
			if (this._width == v) return;
			this._width = v;
			this.draw();
		},
		get: function () { return this._width; }
	},
	height: {
		set: function (v) {
			if (this._height == v) return;
			this._height = v;
			this.draw();
		},
		get: function () { return this._height; }
	},
	wh: {
		set: function (v) {
			if (this._wh == v) return;
			this._wh = v;
			this.draw();
		},
		get: function () { return this._wh; }
	},
	sahMenu: {
		set: function (v) {
			if (this._sahMenu == v) return;
			this._sahMenu = v;
			for (var i = 0; i < this._arr.length; i++) {
				if (this._arr[i].stepId == v) {
					if (this.gallery) {
						this.video.visible = this.gallery.visible = true;
						this.lblNoVid.visible = false;
						this.gallery.updateArr();
						this.draw();
					}
					if (this._helpVideo != undefined) {

						if (this._helpVideo == false) {
							this.activ = true;
							infoUzer.config.helpVideo = false;
							infoUzer.save();
						} else {
							infoUzer.config.helpVideo = true;
							infoUzer.save();
						}
					}
					return;
				}
			}
			if (this.gallery) {
				this.video.visible = this.gallery.visible = false;
				this.lblNoVid.visible = true;
			}
			if (this._helpVideo != undefined) {

				if (this.cbxOffAutoPlay != undefined && this.cbxOffAutoPlay.value == true) {
					infoUzer.config.helpVideo = this.cbxOffAutoPlay.value;
					infoUzer.save();
					return;
				}
				if (this._helpVideo == false) {
					this.activ = true;
				}
			}
		},
		get: function () { return this._sahMenu; }
	},
	helpVideo: {
		set: function (v) {
			if (this._helpVideo == v) return;
			this._helpVideo = v;
			if (this._helpVideo == undefined) this.init();
			if (this._helpVideo == false) {

				if (this.cbxOffAutoPlay == undefined && infoUzer.config.helpVideo == false) this.init();
				infoUzer.config.helpVideo = false;
				infoUzer.save();
				this.activ = true;
			}
			if (this.gallery) this.gallery.index = 0;
		},
		get: function () { return this._helpVideo; }
	},
	arr: {
		set: function (value) {
			this._arr = value || [];
			if (this.gallery) this.gallery.arr = value;
		},
		get: function () {
			return this._arr;
		}
	}
});


function GalleryVideo (cont, x, y, arr, fun, funFilt) {
	PIXI.Container.call(this);
	this.type = 'PLGalleryBtn';
	cont.addChild(this);
	var self = this;

	this.x = x || 0;
	this.y = y || 0;

	this.fun = fun;
	this.funFilter = funFilt;
	this.funUp;

	this._width = 100;
	this._height = 100;
	this._wh = 64;
	this._activ = false;
	this._arr = [];// данные для кнопок
	this._arr = arr || [];

	this.colorDefault = 0xffffff;
	this.colorActiv = pl102.color11;
	this.colorTextDefault = 0xffffff;
	this.colorTextActiv = 0xffffff;
	this.fontSize = 16;
	this.bold = true;
	this.boolTin = true;

	this.otstupX = 0;
	this.otstupY = 0;

	this.contentPanel = new PIXI.Container();// для понели (фон)
	this.addChild(this.contentPanel);


	this.contentBtn = new PIXI.Container();// для кнопок(двигается)
	this.addChild(this.contentBtn);

	this.graphicsMask = new PIXI.Graphics();
	this.contentPanel.addChild(this.graphicsMask);
	this.contentBtn.mask = this.graphicsMask;

	this.scrol = new PLScrollBarV(this, 0, 0, function () { self.contentBtn.y = -this.scrolValue; });
	this.scrol.otstup = bigMenu.scrolOtstup;
	this.scrol.width = bigMenu.scrolWidth;
	this.scrol.offsetHit = 12;
	this.scrol.visiBtn = this.scrol.visiBtn1 = this.scrol.visiPanel = true;

	this.arrBtn = [];// буфер кнопок
	this.array = [];

	this.draw102 = function () {
		this.graphicsMask.clear();
		this.graphicsMask.beginFill(0xff0000, 0);
		this.graphicsMask.drawRect(0, 0, this._width + 1, this._height);
		this.graphicsMask.endFill();

		var x = this.otstupX, y = this.otstupY - (this._wh + this.otstupY);
		for (var i = 0; i < this.arrBtn.length; i++) {
			this.arrBtn[i].position.set(x, y += (this._wh + this.otstupY));
			this.arrBtn[i].width = this._width - (this.otstupX * 2);
			this.arrBtn[i].height = this._wh;
		}
		this.scrol.position.set(this._width - this.scrol.width, 0);
		this.scrol.height = this._height;
		this.scrol.heightContent = this.contentBtn.height;
		this.scrol.fun();
		if (this.scrol.heightContent <= this.scrol.height) this.scrol.visible = false;
		else this.scrol.visible = true;
	};
	this.updateArr = function () {
		var x = this.otstupX, y = this.otstupY - (this._wh + this.otstupY);
		this.clear();
		for (var i = 0, j = 0; i < this._arr.length; i++) {
			if (this.funFilter(this._arr[i]) == false) continue;
			var btn = this.getBut();
			btn.position.set(x, y += (this._wh + this.otstupY));
			btn.width = this._width;
			btn.height = this._wh;

			btn.link = this._arr[i].video.preview;
			if (this._arr[i].video.url) btn.text = this.ifLongText(this._arr[i].name);
			else btn.text = this._arr[i].name;

			btn.idArr = j;
			btn.obj = this._arr[i];
			j++;
		}
	};
	// если есть в тексте пробелы переносим на вторую строку
	this.ifLongText = function (_text) {
		if (_text.length > 11 && /\s/g.test(_text) == true) {
			return _text.replace(' ', '\n');
		} else {
			return _text;
		}
	};

	this.onDown = function () {
		for (var i = 0; i < self.arrBtn.length; i++) {
			if (this == self.arrBtn[i]) continue;
			self.arrBtn[i].activ = false;
		}
		self._index = this.idArr;
		this.activ = true;
		if (self.fun) self.fun(this);
	};
	this.getBut = function () {
		for (var i = 0; i < this.arrBtn.length; i++) {
			if (this.arrBtn[i].visible == false) {
				this.arrBtn[i].visible = true;
				return this.arrBtn[i];
			}
		}
		but = new DblBtn(this, 0, 0, '-', this.onDown);
		pl102.removeElement(but, true);
		but.idArr = this.arrBtn.length;
		this.arrBtn.push(but);
		return but;
	};
	this.clear = function () {
		this._index = -1;
		for (var i = 0; i < this.arrBtn.length; i++) {
			this.arrBtn[i].visible = false;
			if (this.arrBtn[i].activ == true) this.arrBtn[i].activ = false;
		}
	};
	this.getActivBtn = function () {
		if (this.arrBtn[this._index]) return this.arrBtn[this._index];
		else return null;
	};

	this.setParam = function (prop, value) {
		if (this[prop] == undefined || this[prop] == value) return;
		this[prop] = value;
		for (var i = 0; i < this.arrBtn.length; i++) {
			if (this.arrBtn[i][prop] != undefined) this.arrBtn[i][prop] = value;
		}
	};
	this.arr = this._arr;
}
GalleryVideo.prototype = Object.create(PIXI.Container.prototype);
GalleryVideo.prototype.constructor = GalleryVideo;
Object.defineProperties(GalleryVideo.prototype, {
	arr: {
		set: function (value) {
			this._arr = value || [];
			this.updateArr();
			this.draw102();
		},
		get: function () {
			return this._arr;
		}
	},
	width: {
		set: function (value) {
			this._width = value;
			this.draw102();
		},
		get: function () {
			return this._width;
		}
	},
	height: {
		set: function (value) {
			this._height = value;
			this.draw102();
		},
		get: function () {
			return this._height;
		}
	},
	wh: {
		set: function (value) {
			this._wh = value;
			this.draw102();
		},
		get: function () {
			return this._wh;
		}
	},
	index: {
		set: function (value) {
			for (var i = 0; i < this.arrBtn.length; i++) {
				if (this.arrBtn[i].visible == false) return;
				if (i == value) {
					this.arrBtn[i].activ = true;
					this._index = value;
					if (this.fun) this.fun(this.arrBtn[i]);
				} else {
					this.arrBtn[i].activ = false;
				}
			}
		},
		get: function () {
			return this._index;
		}
	}
});


function DblBtn (par, _x, _y, text, fun, _link) {
	PIXI.Container.call(this);
	this.type = 'DblBtn';
	par.contentBtn.addChild(this);
	var self = this;

	this.x = _x || 0;
	this.y = _y || 0;

	this.fun = fun;
	this.funOver;
	this.funOut;
	this.funUp;
	this.image;

	this._otstupText = 5;
	this._isCenterText = false;
	this._nizAlpha = 0.15;
	this._nizNum = 30;
	this._offsetImg = 5;

	this._procentBtn = 0.3;
	this._width = 100;
	this._height = pl102.wh;
	this._activ = false;
	this._visiblePanel = true;
	this.tipBut = 0;
	this._link;
	this._colorDefault = par.colorDefault;
	this._colorActiv = par.colorActiv;
	this._colorTextDefault = par.colorTextDefault;
	this._colorTextActiv = par.colorTextActiv;
	this._fontSize = par.fontSize;
	this._boolTin = par.boolTin;
	this._bold = par.bold;

	this.contentPanel = new PIXI.Container();
	this.addChild(this.contentPanel);

	this.graphActiv = new PIXI.Graphics();
	this.addChild(this.graphActiv);

	if (_link) this.initImgBtn(_link);

	this.btnText = new PLButton(this.contentPanel, 0, 0, text, function () {});
	this.btnText.color = this._colorDefault;
	this.btnText.konturBool = false;
	this.btnText.panel.nizNum = 30;
	this.btnText.panel.nizAlpha = 0.15;
	this.btnText.label.fontSize = this._fontSize;

	this.graphInter = new PIXI.Graphics();
	this.addChild(this.graphInter);

	this._text = this.btnText.text;

	this.initImgBtn = function (link) {
		this.btnImg = new PLButton(this.contentPanel, 0, 0, '', function () {}, link);
		this.btnImg.boolCenter = true;
		this.btnImg.color = this._colorDefault;
		this.btnImg.procentImg = 1;
		this.btnImg.offsetImg = this._offsetImg;
		this.btnImg.konturBool = false;
		this.btnImg.imageScaling = true;
		this.btnImg.panel.nizNum = 30;
		this.btnImg.panel.nizAlpha = 0.15;
		this.btnImg.otstup = 4;
	};

	this.mouseOut = function (e) {
		if (self.btnImg) self.btnImg.mouseOut(e);
		self.btnText.mouseOut(e);
		if (self.funOut) self.funOut();
	};

	this.mouseOver = function (e) {
		if (self.btnImg) self.btnImg.mouseOver(e);
		self.btnText.mouseOver(e);
		if (self.funOver) self.funOver();
	};

	this.onDown = function (e) {
		self.tipBut = 1;
		self.draw102();

		if (pl102.isMouseEvents) {
			pl102.stage.on('mouseup', self.mouseUp);
		}

		if (pl102.isTouchEvents) {
			pl102.stage.on('touchend', self.mouseUp);
		}

		if (self.fun)self.fun();
	};
	this.mouseUp = function (e) {
		self.tipBut = 0;
		self.draw102();
		if (pl102.isMouseEvents) {
			pl102.stage.off('mouseup', self.mouseUp);
		}
		if (pl102.isTouchEvents) {
			pl102.stage.off('touchend', self.mouseUp);
		}
		if (self.funUp)self.funUp();
	};

	this.graphInter.interactive = true;
	this.graphInter.buttonMode = true;

	if (pl102.isMouseEvents) {
		this.graphInter.on('mousedown', this.onDown);
		this.graphInter.on('mouseout', this.mouseOut);
		this.graphInter.on('mouseover', this.mouseOver);
	}
	if (pl102.isTouchEvents) {
		this.graphInter.on('touchstart', this.onDown);
	}

	this.draw102 = function () {
		if (this.btnImg) {
			this.btnImg.width = this._width * this._procentBtn;
			this.btnText.width = this._width - this.btnImg.width;
			this.btnText.x = this.btnImg.width;
			this.btnImg.height = this.btnText.height = this._height;
		} else {
			this.btnText.width = this._width;
			this.btnText.x = 0;
			this.btnText.height = this._height;
		}
		if (this.btnImg) this.btnImg.panel.color = this._activ ? this._colorActiv : this._colorDefault;
		this.btnText.panel.color = this._activ ? this._colorActiv : this._colorDefault;
		this.btnText.label.color = this._activ ? this._colorTextActiv : this._colorTextDefault;

		this.graphInter.clear();
		this.graphInter.beginFill(0xff0000, 0);
		this.graphInter.drawRect(0, 0, this._width, this._height);
		this.graphInter.endFill();
		this.graphInter.lineStyle(1, pl102.color1);
		this.graphInter.moveTo(this.btnText.x + 0.5, 0);
		this.graphInter.lineTo(this.btnText.x + 0.5, this._height);
		this.graphInter.lineStyle(1, pl102.color1, 0.8);
		this.graphInter.drawRect(0.5, 0.5, this._width, this._height);
	};

	this.loadImeg = function (link) {
		if (!this.btnImg) this.initImgBtn(link);
		else this.btnImg.loadImeg(link);
	};

	this.draw102();

	// Графика, накрывающая кнопку
	this.graphRect = new PIXI.Graphics();
	this.addChild(this.graphRect);
	this.graphRect.alpha = 0.5;
	this.graphRect.interactive = true;

	/// Накрывает графикой кнопку или очищает накрытие
	// в зависимости от состояния this._activMouse
	this.changeActiv = function () {
		if (!this._activMouse) {
			this.graphRect.clear();
			this.graphRect.beginFill(pl102.color);
			this.graphRect.drawRect(0, 0, this._width, this._height);
			this.graphRect.endFill();
		} else {
			this.graphRect.clear();
		}
	};
	this.nizAlpha = this._nizAlpha;
	this.nizNum = this._nizNum;
	this.otstupText = this._otstupText;
	this.isCenterText = this._isCenterText;
}

DblBtn.prototype = Object.create(PIXI.Container.prototype);
DblBtn.prototype.constructor = DblBtn;

Object.defineProperties(DblBtn.prototype, {
	activMouse: {
		set: function (value) {
			this._activMouse = value;
			this.changeActiv();
		},
		get: function () {
			return this._activMouse;
		}
	},

	otstupText: {
		set: function (value) {
			this.btnText.otstupText = value;
		},
		get: function () {
			return this.btnText.otstupText;
		}
	},
	isCenterText: {
		set: function (value) {
			this.btnText.isCenterText = value;
		},
		get: function () {
			return this.btnText.isCenterText;
		}
	},
	color: {
		set: function (value) {
			this._color = value;
			if (this.btnImg) this.btnImg.color = value;
			this.btnText.color = value;
		},
		get: function () {
			return this._color;
		}
	},
	color1: {
		set: function (value) {
			this._color1 = value;
			if (this.btnImg) this.btnImg.color1 = value;
			this.btnText.color1 = value;
		},
		get: function () {
			return this._color1;
		}
	},
	colorDefault: {
		set: function (value) {
			if (this._colorDefault == value) return;
			this._colorDefault = value;
			this.draw102();
		},
		get: function () {
			return this._colorDefault;
		}
	},
	colorActiv: {
		set: function (value) {
			if (this._colorActiv == value) return;
			this._colorActiv = value;
			this.draw102();
		},
		get: function () {
			return this._colorActiv;
		}
	},
	colorTextDefault: {
		set: function (value) {
			if (this._colorTextDefault == value) return;
			this._colorTextDefault = value;
			this.draw102();
		},
		get: function () {
			return this._colorTextDefault;
		}
	},
	colorTextActiv: {
		set: function (value) {
			if (this._colorTextActiv == value) return;
			this._colorTextActiv = value;
			this.draw102();
		},
		get: function () {
			return this._colorTextActiv;
		}
	},
	nizAlpha: {
		set: function (value) {
			this._nizAlpha = value;
			if (this.btnImg) this.btnImg.nizAlpha = value;
			this.btnText.nizAlpha = value;
		},
		get: function () {
			return this._nizAlpha;
		}
	},
	nizNum: {
		set: function (value) {
			this._nizNum = value;
			if (this.btnImg) this.btnImg.nizNum = value;
			this.btnText.nizNum = value;
		},
		get: function () {
			return this._nizNum;
		}
	},
	activ: {
		set: function (value) {
			this._activ = value;
			this.graphActiv.visible = value;
			this.draw102();
		},
		get: function () {
			return this._activ;
		}
	},
	width: {
		set: function (value) {
			this._width = value;
			this.draw102();
		},
		get: function () {
			return this._width;
		}
	},
	height: {
		set: function (value) {
			this._height = value;
			this.draw102();
		},
		get: function () {
			return this._height;
		}
	},
	text: {
		set: function (value) {
			this._text = value;
			this.btnText.text = this._text;

		},
		get: function () {
			return this._text;
		}
	},
	fontSize: {
		set: function (value) {
			if (this._fontSize == value) return;
			this._fontSize = value;
			this.btnText.label.fontSize = this._fontSize;
		},
		get: function () {
			return this._fontSize;
		}
	},
	boolTin: {
		set: function (value) {
			if (this._boolTin == value) return;
			this._boolTin = value;
			this.btnText.label.boolTin = this._boolTin;
		},
		get: function () {
			return this._boolTin;
		}
	},
	bold: {
		set: function (value) {
			if (this._bold == value) return;
			this._bold = value;
			this.btnText.label.bold = this._bold;
		},
		get: function () {
			return this._bold;
		}
	},
	link: {
		set: function (value) {
			if (!value) return;
			if (value && this._link == value) return;
			this._link = value;
			if (!this.btnImg) this.initImgBtn(value);
			else this.btnImg.link = value;
		},
		get: function () {
			return this._link;
		}
	}
});
