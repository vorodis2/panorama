/*
    34+/-    PLPanel            - панель
    179+/-   PLImage            - картинка
    328+/-   PLLabel            - надпись
    517+/-   PLButton           - кнопка
    974+/-   PLPreloader        - отображается пока, во время загрузки
    1167+/-  PLSlider           - таскалка
    1407+/-  PLSliderBig        - таскалка с инпутом
    1753+/-  PLSlidDubBtn       - таскалка с инпутом и стрелками больше\меньше
    1855+/-  PLInput            - инпут
    2119+/-  PLWindow           - окно
    2402+/-  PLBitmapData       - битмапа
    2699+/-  PLGalleryPanelBtn  - галерея с кнопками и скролом
    2883+/-  PLScrollBarHP      - скрол горизонтальный с кнопками
    3159+/-  PLScrollBarH       - скрол горизонтальный
    3440+/-  PLScrollBarVP      - скрол вертикальный с кнопками
    3716+/-  PLScrollBarV       - скрол вертикальный
    3989+/-  PLContur           - контур
    4071+/-  PLColor            - интерфейс для выбора цвета
    4521+/-  PLColorPicker      - панель с базовыми цветами
    4723+/-  PLColorPick        - панель с палитрой для выбора уникального цвета
    5334+/-  PLColorPickerPanel - панель с градиентами и инпутами RGB
    5587+/-  PLGradient         - панель с градиентом цвета
    5919+/-  PLInputRGB         - хранит инпуты для ввода RGB значений
    6073+/-  PLCheckBox         - чекбокс
    6240+/-  PLCheckBoxImage    - чекбокс с картинками
    6369+/-  PLTextArea         - текст-ареа
    6643+/-  PLComboBoxImage    - меню картинок (панель с выезжающими кнопками)
    6932+/-  PLImgFaceElement   - часть компонента PLComboBoxImage
    7095+/-  PLImgBoxElement    - часть компонента PLComboBoxImage
    7205+/-  PLComboBox         - меню блоков (панель с выезжающими кнопками)
    7673+/-  PLComboBoxElement  - эл-т в меню комбобокс
    7836+/-  PLFaceElement      - лицевой эл-т в меню комбобокс
*/

import { PLDOMElement } from './PL102Dom.js';
export { StylePL102, Pl102Wheel } from './StylePL102.js';
export { PLDOMElement, pLDom } from './PL102Dom.js';

export function PLPanel (cont, _x, _y) {
	PIXI.Container.call(this);
	this.type = 'PLPanel';
	var self = this;
	cont.addChild(this);
	pl102.addElement(this);

	this.x = _x || 0;
	this.y = _y || 0;
	this.xz = 0;
	this._width = 100;
	this._height = 100;
	this._color = pl102.color;
	this._color1 = pl102.color1;
	this._kontur = true;
	this._nizNum = 30;
	this._nizAlpha = 0.2;
	this._notBac = false;
	this._visiLine = false;

	this.konturThick = pl102.kontur;
	this.lineThick = pl102.kontur;

	this.graphics = new PIXI.Graphics();
	this.addChild(this.graphics);

	this.image = new PLImage(this, 0, this._height - this._nizNum, pl102.base);
	pl102.removeElement(this.image, true);
	this.image.height = 30;
	this._link = this.image._link;
	this.image.alpha = this._nizAlpha;

	this.gPlus = new PIXI.Graphics();// Для дебаг отрисовки
	this.addChild(this.gPlus);

	this.content = new PIXI.Container();
	this.addChild(this.content);

	this.graphLine = new PIXI.Graphics();
	this.addChild(this.graphLine);
	this.graphLine.visible = this._visiLine;

	var ot = 0;
	// перерисовка
	this.draw102 = function () {
		this.graphics.clear();
		if (this._width < 2) return;

		if (this._notBac == true) {
			this.graphics.beginFill(this._color1);
			this.graphics.drawRect(-this.konturThick / 2, -this.konturThick / 2, this._width + this.konturThick, this.konturThick);
			this.graphics.drawRect(-this.konturThick / 2, this._height - this.konturThick / 2, this._width + this.konturThick, this.konturThick);
			this.graphics.drawRect(-this.konturThick / 2, 0, this.konturThick, this._height);
			this.graphics.drawRect(this._width - this.konturThick / 2, 0, this.konturThick, this._height);
			return;
		}

		if (this._kontur == true) {
			ot = this.lineThick;
			this.graphics.beginFill(this._color1);
			this.graphics.drawRect(0, 0, this._width, this._height);
			this.graphics.beginFill(this._color);
			this.graphics.drawRect(this.konturThick, this.konturThick, this._width - this.konturThick * 2, this._height - this.konturThick * 2);
		} else {
			ot = 0;
			this.graphics.beginFill(this._color);
			this.graphics.drawRect(0, 0, this._width, this._height);
		}

		this.graphLine.clear();
		this.graphLine.beginFill(0xffffff);
		this.graphLine.drawRect(ot, this._height - 1, this._width - ot * 2, 1);
		this.graphLine.beginFill(this._color1);
		this.graphLine.drawRect(ot, this._height, this._width - ot * 2, this.konturThick);
	};

	this.kill = function () {};
	this.draw102();
}

PLPanel.prototype = Object.create(PIXI.Container.prototype);
PLPanel.prototype.constructor = PLPanel;
Object.defineProperties(PLPanel.prototype, {
	link: {// замена градиентов
		set: function (value) {
			if (this._link != value) {
				this._link = value;
				this.image.link = this._link;
			}
		},
		get: function () {
			return this._link;
		}
	},
	nizAlpha: {// нижний отступ меньше 0 растягиваеться на все
		set: function (value) {
			if (this._nizAlpha != value) {
				this._nizAlpha = value;
				this.image.alpha = this._nizAlpha;
			}
		},
		get: function () {
			return this._nizAlpha;
		}
	},
	nizNum: {// нижний отступ меньше 0 растягиваеться на все
		set: function (value) {
			if (this._nizNum != value) {
				this._nizNum = value;
				var h = this._height;
				this._height = -1;
				this.height = h;
			}
		},
		get: function () {
			return this._nizNum;
		}
	},
	notBac: {// нижний отступ меньше 0 растягиваеться на все
		set: function (value) {
			if (this._notBac != value) {
				this._notBac = value;
				this.image.visible = !this._notBac;
			}
		},
		get: function () {
			return this._notBac;
		}
	},
	kontur: {// контур вокруг контента
		set: function (value) {
			if (this._kontur != value) {
				this._kontur = value;
				this.draw102();
			}
		},
		get: function () {
			return this._kontur;
		}
	},
	width: {// ширина
		set: function (value) {
			if (this._width != value) {
				this._width = value;
				this.image.width = value;
				this.draw102();
			}
		},
		get: function () {
			return this._width;
		}
	},
	height: {// высота
		set: function (value) {
			if (this._height != value) {
				this._height = value;
				if (this._nizNum <= 0) {
					this.image.height = value;
					this.image.y = 0;
				} else {
					if (this._height > this._nizNum) {
						this.image.height = this._nizNum;
						this.image.y = this._height - this._nizNum;
					} else {
						this.image.height = value;
						this.image.y = 0;
					}
				}
				this.draw102();
			}
		},
		get: function () {
			return this._height;
		}
	},
	color: { // цвет подложки снизу
		set: function (value) {
			if (this._color != value) {
				this._color = value;
				this.draw102();
			}
		},
		get: function () {
			return this._color;
		}
	},
	color1: { // цвет контура
		set: function (value) {
			if (this._color1 != value) {
				this._color1 = value;
				this.draw102();
			}
		},
		get: function () {
			return this._color1;
		}
	},
	visiLine: { // цвет контура
		set: function (value) {
			if (this._visiLine != value) {
				this._visiLine = value;
				this.graphLine.visible = this._visiLine;
			}
		},
		get: function () {
			return this._visiLine;
		}
	}
});

export function PLImage (cont, _x, _y, _linkStart, fun) {
	PIXI.Container.call(this);
	var self = this;
	this.type = 'PLImage';

	cont.addChild(this);
	pl102.addElement(this);

	this.fun = fun;

	this.x = _x || 0;
	this.y = _y || 0;

	this._width = 100;
	this._height = 100;
	this._otstup = 0; // отступ картинки от краев рамки
	this._preloaderBool = false;

	this.picWidth = 0; // реальные размеры картинки
	this.picHeight = 0; // реальные размеры картинки
	// TODO при отсутствие выдает ошибку, текстура не устпевает загрузиться
	this.image = new Image();
	this.interactive = false;
	this.sprite = null;
	this.funError = null;
	this.label = null;
	this.linkOld = null;

	this.loadError = function () {
		if (self.funError) self.funError();
	};

	this.loadComplit = function (texture) {
		self.image = texture.baseTexture.source;
		self.isLoaded = true;
		self.picWidth = texture.width;
		self.picHeight = texture.height;
		if (self.sprite) self.sprite.destroy();
		self.sprite = new PIXI.Sprite(texture);
		self.sprite.interactive = self.interactive;
		self.sprite.visible = true;
		self.addChild(self.sprite);
		self.otstup = self._otstup;
		self.width = self._width;
		self.height = self._height;
		if (self.label) {
			self.removeChild(self.label);
			delete self.label;
			self.label = undefined;
		}
		if (self._preloaderBool) {
			self.preloader.visible = false;
			self.preloader.activ = false;
		}
		if (self.funComplit) self.funComplit();
		if (self.fun) self.fun();
	};

	this.preloader = null;
	this.load = function () {
		if (this._preloaderBool && this.sprite) {
			// если есть прелоадер нужно убрать старую картинку
			this.sprite.visible = false;
		}
		this.isLoaded = false;
		if (!this._link || this._link === 'null') return;
		if (this._preloaderBool && !this.preloader) {
			this.preloader = new PLPreloader(this, 0, 0);
			pl102.removeElement(this.preloader, true);
		}
		if (this._preloaderBool) {
			this.preloader.width = this._width;
			this.preloader.height = this._height;
			this.preloader.activ = true;
			this.preloader.visible = true;
		}
		pl102.loaderTexture.clearFun(this.linkOld, this.loadComplit);
		pl102.loaderTexture.getTexture(this._link, this.loadComplit, this.loadError);
		this.linkOld = this._link;
	};

	this.clear = function () {
		if (self.sprite) {
			self.sprite.destroy();
			delete self.sprite;
		}
		this.destroy();
	};

	if (_linkStart) this.link = _linkStart;
}

PLImage.prototype = Object.create(PIXI.Container.prototype);
PLImage.prototype.constructor = PLImage;

Object.defineProperties(PLImage.prototype, {
	link: {
		set: function (value) {
			if (this._link === value) return;
			this._link = value;
			this.load();
		},
		get: function () {
			return this._link;
		}
	},
	width: {
		set: function (value) {

			this._width = value;
			if (this.sprite) {
				this.sprite.scale.x = (this._width - this._otstup * 2) / this.picWidth;
				this.sprite.position.x = this._otstup;
			}

			if (this._preloaderBool == true) if (this.preloader) this.preloader.width = this._width;
		},
		get: function () {
			return this._width;
		}
	},
	height: {
		set: function (value) {
			this._height = value;
			if (this.sprite) {
				this.sprite.scale.y = (this._height - this._otstup * 2) / this.picHeight;
				this.sprite.position.y = this._otstup;
			}
			if (this._preloaderBool == true) if (this.preloader) this.preloader.height = this._height;
		},
		get: function () {
			return this._height;
		}
	},
	otstup: {
		set: function (value) {
			this._otstup = value;
			this.width = this._width;
			this.height = this._height;
		},
		get: function () {
			return this._otstup;
		}
	}
});

export function PLLabel (cont, _x, _y, _text) {
	PIXI.Container.call(this);
	this.type = 'PLLabel';

	if (cont != undefined)cont.addChild(this);
	this.content = new PIXI.Container();
	this.addChild(this.content);
	var self = this;
	pl102.addElement(this);

	this.funSetText;

	this.x = _x;
	this.y = _y;

	this._bold = true;
	this._text = _text;
	this._height = pl102.wh;
	this._width = 100;
	this._boolTin = false;
	this._fontSize;

	if (this._text == undefined) this._text = 'text';
	if (this._text == null) this._text = 'text';
	if (this._text.length == 0) this._text = ' ';

	this.curW; // длина текста
	this.curH;
	this.style = {};
	for (var s in pl102.style) {
		this.style[s] = pl102.style[s];
	}
	this._align = this.style.align = 'center';
	this._fontFamily = this.style.fontFamily;
	this._fontSize = this.style.fontSize;
	this._color = this.style.fill;
	this._fontStyle = this.style.fontStyle;

	this.label = new PIXI.Text(this._text, this.style);
	this.label.resolution = 1.11;// FIXME размытие шрифтов везде, нашел решение в интрнете наполовину норм, наполовину каличное
	this.label.shader = null;// FIXME эта половина каличная
	this._font = this._fontSize = this.label.style.fontSize;

	this.curW = this.label.width;
	this.curH = this.label.height;
	this.content.addChild(this.label);
	this._color = this.label.style.fill;

	this.setParam = function (_font, _color, _boolTin) {
		this._color = _color;
		this.style.fill = _color;
		this.font = _font;
		this.boolTin = _boolTin;
	};

	this.getRect = function () {
		return this.label.getBounds();
	};

	this.kill = function () {
		this.removeChild(this.label);
		this.label = null;
	};

	this.updateHeight = function () {
		var r = this.label.getBounds();
		this._height = r.height;
	};
	this.updateHeight();

	this.strColor;
	this.strColor2;
}

PLLabel.prototype = Object.create(PIXI.Container.prototype);
PLLabel.prototype.constructor = PLLabel;
Object.defineProperties(PLLabel.prototype, {
	boolTin: {
		set: function (value) {
			if (value != this._boolTin) {

				if (value == true) {
					this.style.dropShadow = true;
					this.style.dropShadowColor = '#000000';
					this.style.dropShadowBlur = 4;
					this.style.dropShadowAngle = Math.PI / 6;
					this.style.dropShadowDistance = 2;
				} else {
					delete this.style.dropShadow;
					delete this.style.dropShadowColor;
					delete this.style.dropShadowBlur;
					delete this.style.dropShadowAngle;
					delete this.style.dropShadowDistance;
				}
				this.label.style = this.style;
				this._boolTin = value;
			}

		},
		get: function () {
			return this._boolTin;
		}
	},
	fontSize: {
		set: function (value) {
			this._fontSize = value;
			this.font = value;
		},
		get: function () {
			return this._fontSize;
		}
	},
	text: {
		set: function (value) {
			this._text = value;
			// TODO разобратса почему не воспринимает цифру 0
			if (value === 0) this._text = value + '';
			this.label.text = this._text;
			this.curW = this.label.width;
			this.curH = this.label.height;
			this.updateHeight();

			if (this.funSetText) this.funSetText();
		},
		get: function () {
			return this._text;
		}
	},
	fontFamily: {
		set: function (value) {
			this._fontFamily = value;
			this.style.fontFamily = value;
			this.label.style = this.style;
		},
		get: function () {
			return this._fontFamily;
		}
	},
	font: {
		set: function (value) {
			this._font = value;
			this.style.fontSize = value;
			this.label.style = this.style;
			this.updateHeight();
		},
		get: function () {
			return this._font;
		}
	},
	bold: {
		set: function (value) {
			this._bold = value;
			if (this._bold == true) this.style.fontStyle = 'bold';
			else this.style.fontStyle = 'normal';
			this.label.style = this.style;
		},
		get: function () {
			return this._bold;
		}
	},
	color: {
		set: function (value) {
			if (this._color != value) {
				this.strColor = value + '';
				this._color = value;
				if (this.strColor.length > 2) {
					if (this.strColor[1] == 'x') {
						this.strColor2 = '#';
						for (var i = 2; i < this.strColor.length; i++) {
							this.strColor2 += this.strColor[i];
						}
						this._color = this.strColor2;
					}
				}
				this.label.style.fill = this._color;
				this.style.fill = this._color;
			}
		},
		get: function () {
			return this._color;
		}
	},
	width: {
		set: function (value) {
			this._width = value;
		},
		get: function () {
			return this._width;
		}
	},
	height: {
		set: function (value) {
			this._height = value;
		},
		get: function () {
			return this._height;
		}
	},
	align: {
		set: function (value) {
			this._align = value;
			this.style.align = value;
			this.label.style = this.style;
		},
		get: function () {
			return this._align;
		}
	}
});

export function PLButton (cont, _x, _y, text, fun, _link) {
	PIXI.Container.call(this);
	this.type = 'PLButton';
	if (cont)cont.addChild(this);
	var self = this;
	pl102.addElement(this);

	this.x = _x || 0;
	this.y = _y || 0;

	this.fun = fun;
	this.funOver;
	this.funOut;
	this.funActiv;
	this.funDown;
	this.funDownFile;
	this.funSetText;
	self.funError = undefined;
	this._width = 100;
	this._height = pl102.wh;
	this._color = pl102.colorButton;
	this._color1 = pl102.colorButton1;
	this._activ = false;
	this._visiblePanel = true;
	this._boolKontur = false;// показывать ли контур
	this._otstup = 0;// отступ картинки от краев
	this._boolProp = true;// масштабировать ли картинку
	this.boolCenter = false;// центрировать ли картинку
	this._okDown = true;
	this._boolAnimKontut = true;// Мигание контура при наведении
	this._activMouse = true;
	this._labelOtstup = null;
	this.boolScalePic = false;


	this.contentPanel = new PIXI.Container();
	this.addChild(this.contentPanel);

	this.panel = new PLPanel(this.contentPanel, 0, 0);
	pl102.removeElement(this.panel, true);
	this.panel.height = this._height;
	this.panel.kontur = false;
	this.panel.color = this._color;
	this.panel.nizNum = 0;
	this.panel.nizAlpha = 0.7;

	this.panel1 = new PLPanel(this.contentPanel, 0, 0);
	pl102.removeElement(this.panel1, true);
	this.panel1.height = this._height;
	this.panel1.kontur = false;
	this.panel1.visible = false;
	this.panel1.link = pl102.base2;
	this.panel1.color = this._color1;
	this.panel1.nizNum = 0;
	this.panel1.nizAlpha = 1;

	this.gPlus = new PIXI.Graphics();// Для дебаг отрисовки
	this.addChild(this.gPlus);

	this.contentFilt = new PIXI.Container();
	this.addChild(this.contentFilt);
	this.tween = new TWEEN.Tween(this.contentFilt);

	this._text = text;
	if (this._text == undefined) this._text = 'text';
	if (this._text == null) this._text = 'text';
	this.label = new PLLabel(this.contentFilt, 5, 5, this._text);
	pl102.removeElement(this.label, true);
	if (this._text.length == 0) this.label.visible=false;


	this.graphF = new PIXI.Graphics();
	this.contentFilt.addChild(this.graphF);

	this.contShap = new PIXI.Container();
	this.contentFilt.addChild(this.contShap);
	// контейнер поверх всех
	this.contDop = new PIXI.Container();
	this.addChild(this.contDop);

	this.image;
	this.filt = pl102.filter;

	this.label.setParam(this.label.font, 0xffffff, true);
	this.rect = this.label.getBounds();

	this.graphInter = new PIXI.Graphics();
	this.addChild(this.graphInter);

	self.tipBut = 0;

	/// Графика, накрывающая кнопку
	this.graphRect = new PIXI.Graphics();
	this.addChild(this.graphRect);
	this.graphRect.alpha = 0.5;
	this.graphRect.visible = false;
	this.graphRect.interactive = true;

	// побстаиваем ширину под текст
	this.textWidth = function (_otstup) {
		var otstup = _otstup || 0;
		this.width = (this.rect.width / this.worldTransform.a + 10) + otstup;
	};

	var ratio;
	this.konturSize = pl102.kontur;
	this.konturColor = pl102.colorSlid;
	this.draw102 = function () {
		this.graphInter.clear();
		this.graphInter.beginFill(0xff0000, 0);
		this.graphInter.drawRect(0, 0, this._width, this._height);

		if (this._boolKontur) {
			this.graphInter.lineStyle(this.konturSize, this.konturColor, 1);// pl102.color1
			this.graphInter.drawRect(0.5, 0.5, this._width, this._height);
		}
		this.graphF.clear();
		this.graphF.beginFill(0xffffff, 0.01);
		this.graphF.drawRect(0, 0, this._width, this._height);


		if (this._labelOtstup == null) {
			this.label.x = (this._width - this.rect.width) / 2;
			if (this.label.x < 5) this.label.x = 5;
		} else {
			this.label.x = this._labelOtstup;
		}
		this.label.y = (this._height - this.rect.height) / 2;

		if (this.image != undefined) {
			this.label.x = this._height + 5;
			if (this.boolScalePic) {
				ratio = this.image.picWidth / this._width;
				if (ratio < this.image.picHeight / this._height) ratio = this.image.picHeight / this._height;
				this.image.width = this.image.picWidth / ratio;
				this.image.height = this.image.picHeight / ratio;
				this.image.x = (this._width - this.image.width) / 2;
				this.image.y = (this._height - this.image.height) / 2;
			}
		}
		if (this._width > this._height) {
			this.contShap.scale.x = this.contShap.scale.y = this._height / 100;
			this.contShap.x = (this._width - this._height) / 2;
			this.contShap.y = 0;
		} else {
			this.contShap.scale.x = this.contShap.scale.y = this._width / 100;
			this.contShap.x = 0;
			this.contShap.y = (this._height - this._width) / 2;
		}
		this.graphRect.clear();
		this.graphRect.beginFill(pl102.color);
		this.graphRect.drawRect(0, 0, this._width, this._height);
		this.graphRect.endFill();
	};

	this.mouseOut = function (e) {
		if (self._boolAnimKontut == true) {
			self.panel.kontur = false;
			self.panel1.kontur = false;
		}
		if (self.funOut) self.funOut(e);
	};

	this.mouseOver = function (e) {
		if (self._boolAnimKontut == true) {
			self.panel.kontur = true;
			self.panel1.kontur = true;
		}
		self.contentFilt.alpha = 0.5;
		self.tween.to({alpha: 1}, 500);
		self.tween.start();
		if (self.funOver) self.funOver(e);
	};

	this.onDown = function (e) {
		if (self.file != undefined) {
			self.file.click();
			if (self.funDownFile)self.funDownFile();
			return;
		}
		if (self.funDown)self.funDown();
		if (self.fun)self.fun();
		self.tipBut = 1;
		self.draw102();
		if (pl102.isMouseEvents) {
			pl102.stage.on('mouseup', self.mouseUp);
		}
		if (pl102.isTouchEvents) {
			pl102.stage.on('touchend', self.mouseUp);
		}

	};
	this.funUp;
	this.mouseUp = function (e) {
		self.tipBut = 0;
		self.draw102();
		if (self.funUp != undefined) {
			self.funUp();
		}
		if (pl102.isMouseEvents) {
			pl102.stage.off('mouseup', self.mouseUp);
		}

		if (pl102.isTouchEvents) {
			pl102.stage.off('touchend', self.mouseUp);
		}
	};

	this.setStile = function (num, _w, _h) {

		if (num == 0) {
			this.label.setParam(14, pl102.style.fill);
			this.panel.nizAlpha = 0.7;
			this.panel.nizNum = 0;
			this.color = pl102.colorButton;
		}
		if (num == 1) {
			this.label.setParam(14, pl102.style.fill);
			this.panel.nizAlpha = 0.25;
			this.panel.nizNum = 30;
			this.color = 0xf0f0f0;
		}
		if (_w) this.width = _w;
		if (_h) this.height = _h;
	};

	this.file;
	this.startFile = function (accept) {
		if (this.file == undefined) {
			this.file = document.createElement('input');
			this.file.type = 'file';
			if (accept) this.file.accept = accept;// "image/*";
			this.file.style.display = 'none';
			this.file.onchange = this.onchange;
		}
	};
	this.result;
	this.files;// files

	this.onchange = function (e) {
		if (e.target.files.length == 0) return;// нечего не выбрали
		self.files = e.target.files;
		var reader = new FileReader();
		reader.readAsDataURL(e.target.files[0]);
		reader.onload = function (_e) {
			self.result = _e.target.result;
			if (self.fun) self.fun(self.result);
			self.file.value = null;
		};
	};

	this.addCont100 = function (cont) {
		this.contShap.addChild(cont);
	};

	this.complitLoadImage = function () {

		if (self.funComplit) self.funComplit();
		self.otstup = self._otstup;//
	};

	this.funErrorImage = function () {
		if (self.funError) self.funError();
	};

	var propI;
	var propE;
	var w, h;
	this.link;
	this.loadImeg = function (link) {
		if (this.link == link) return;
		this.link = link;
		if (this.image == undefined) {
			this.image = new PLImage(this.contentFilt, 0, 0, undefined, function () {

				if (self._boolProp) {
					w = this.image.width;
					h = this.image.height;
					propE = self._height / self._width;
					propI = this.image.height / this.image.width;
					if (propE > propI) {
						this.height = h * (self._width / w);
						this.width = self._width;
					} else {
						this.width = w * (self._height / h);
						this.height = self._height;
					}
					if (self.boolCenter) {
						this.x = (self._width - this._width) / 2;
						this.y = (self._height - this._height) / 2;
					}
				} else {
					this.width = self._height;
					this.height = self._height;
				}
				self.draw102();
			});
			pl102.removeElement(this.image, true);
			this.image._preloaderBool = true;

			this.image.funComplit = this.complitLoadImage;
			this.image.funError = self.funErrorImage;

		}
		if (self._height < self._width) this.image.width = this.image.height = self._height;
		else this.image.width = this.image.height = self._width;
		this.image.link = link;
		this.draw102();
	};

	this.kill = function () {};

	if (_link != undefined) {
		this.loadImeg(_link);
	} else {
		this.draw102();
	}

	this._okDown = false;
	this.okDown = true;
}
PLButton.prototype = Object.create(PIXI.Container.prototype);
PLButton.prototype.constructor = PLButton;
Object.defineProperties(PLButton.prototype, {
	visiblePanel: {
		set: function (value) {
			this._visiblePanel = value;
			this.contentPanel.visible = value;
		},
		get: function () {
			return this._visiblePanel;
		}
	},
	width: {
		set: function (value) {
			if (this._width == value) return;
			this._width = value;

			this.panel.width = value;
			this.panel1.width = value;
			this.draw102();
		},
		get: function () {
			return this._width;
		}
	},
	height: {
		set: function (value) {
			if (this._height == value) return;
			this._height = value;
			this.panel.height = value;
			this.panel1.height = value;
			this.draw102();
		},
		get: function () {
			return this._height;
		}
	},
	boolAnimKontut: {
		set: function (value) {
			this._boolAnimKontut = value;
			if (this._boolAnimKontut == true) {
				this.panel.kontur = false;
				this.panel1.kontur = false;
			} else {
				this.panel.kontur = true;
				this.panel1.kontur = true;
			}
		},
		get: function () {
			return this._boolAnimKontut;
		}
	},
	activ: {
		set: function (value) {
			if (this._activ != value) {
				this._activ = value;
				this.panel.visible = !value;
				this.panel1.visible = value;

				if (this.funActiv) this.funActiv();
			}
		},
		get: function () {
			return this._activ;
		}
	},
	color: {
		set: function (value) {
			this._color = value;
			this.panel.color = value;
		},
		get: function () {
			return this._color;
		}
	},
	color1: {
		set: function (value) {
			this._color1 = value;
			this.panel1.color1 = value;
		},
		get: function () {
			return this._color1;
		}
	},
	activMouse: {
		set: function (value) {
			if (this._activMouse == value) return;
			this._activMouse = value;
			this.graphRect.visible = !this._activMouse;
		},
		get: function () {
			return this._activMouse;
		}
	},
	text: {
		set: function (value) {
			this._text = value;
			if (this._text.length == 0) this.label.visible=false;
			else this.label.visible=true;
			this.label.text = this._text;
			if (this._text == undefined) this._text = 'text';
			if (this._text == null) this._text = 'text';
			if (this._text.length == 0) this._text = ' ';

			this.rect = this.label.getBounds();
			this.rect.width /= this.worldTransform.a;
			this.rect.height /= this.worldTransform.a;
			this.draw102();

			if (this.funSetText) this.funSetText();
		},
		get: function () {
			return this._text;
		}
	},
	boolKontur: {
		set: function (value) {
			this._boolKontur = value;
			this.draw102();
		},
		get: function () {
			return this._boolKontur;
		}
	},
	otstup: {
		set: function (value) {
			this._otstup = value;
			if (this.image) this.image.otstup = this._otstup;
		},
		get: function () {
			return this._otstup;
		}
	},
	boolProp: {
		set: function (value) {
			this._boolProp = value;
		},
		get: function () {
			return this._boolProp;
		}
	},
	okDown: {
		set: function (value) {
			if (this._okDown != value) {
				this._okDown = value;
				if (this._okDown == true) {
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
				} else {
					this.graphInter.interactive = false;
					this.graphInter.buttonMode = false;
					if (pl102.isMouseEvents) {
						this.graphInter.off('mousedown', this.onDown);
						this.graphInter.off('mouseout', this.mouseOut);
						this.graphInter.off('mouseover', this.mouseOver);
					}
					if (pl102.isTouchEvents) {
						this.graphInter.off('touchstart', this.onDown);
					}
				}
			}
		},
		get: function () {
			return this._okDown;
		}
	},
	labelOtstup: {
		set: function (value) {
			if (this._labelOtstup === value) return;
			this._labelOtstup = value;
			this.label.x = this._labelOtstup;
		},
		get: function () {
			return this._labelOtstup;
		}
	}
});

export function PLPreloader (cont, _x, _y) {
	PIXI.Container.call(this);
	this.type = 'PLPreloader';
	cont.addChild(this);
	var self = this;
	pl102.addElement(this);

	this.x = _x || 0;
	this.y = _y || 0;
	this._width = 100;
	this._height = 100;
	this._wh = 64;
	this._podlog = false;
	this._centor = false;
	this._time = 16; // тайм сеттаймера
	this._color = pl102.color;
	this._colorLine = pl102.color1;

	this.angelPlus = 6 * (Math.PI / 180); // шаг поворота
	this.image;
	this.contD = new PIXI.Container();
	this.graphics = new PIXI.Graphics();
	this.contD.addChild(this.graphics);
	this.graphics.visible = false;
	this.addChild(this.contD);

	this.contDrag = new PIXI.Container();
	this.contD.addChild(this.contDrag);
	this.sprite;

	this.drawPod = function () {
		if (this._podlog == true) {
			this.graphics.clear();
			this.graphics.beginFill(this._color, 0.2);
			this.graphics.lineStyle(1, this._color1, 0.2);
			this.graphics.drawRect(0, 0, this._width, this._height);
		}
	};

	this.draw = function () {
		self.drawPod();
		self.contDrag.position.x = self._width / 2;
		self.contDrag.position.y = self._height / 2;
		if (this._centor == true) {
			this.contD.x = -self._width / 2;
			this.contD.y = -self._height / 2;
		} else {
			this.contD.x = 0;
			this.contD.y = 0;
		}
	};

	var p, p1;
	this.korect = function () {
		if (this._width > this._height) {
			p = this._height;
		} else {
			p = this._width;
		}
		p *= 0.8;
		if (p > this._wh) p = this._wh;
		if (p < 1) p = 1;
		this.contDrag.scale.x = this.contDrag.scale.y = p / 100;
	};

	this.loadComplit = function (texture) {
		self.picWidth = texture.width;
		self.picHeight = texture.height;
		self.sprite = new PIXI.Sprite(texture);
		self.sprite.interactive = false;
		self.contDrag.addChild(self.sprite);
		self.sprite.width = 100;
		self.sprite.height = 100;
		self.sprite.x = -50;
		self.sprite.y = -50;
		self.korect();
		self.draw();
	};

	pl102.loaderTexture.getTexture(pl102.base3, this.loadComplit);

	this.dragerRotation = function () {
		self.contDrag.rotation += self.angelPlus;
	};

	this.timer;
	this.setInt = function () {
		clearInterval(this.timer);
		if (this._activ == true) {
			this.timer = setInterval(this.dragerRotation, this._time);
		}
	};

	this.clear = function () {
		this.activ = false;

		this.contD.removeChild(this.graphics);
		this.graphics.destroy();
		delete this.graphics;
		self.contDrag.removeChild(self.sprite);

		self.image.onload = undefined;
		delete this.image;
		this.contD.removeChild(this.contDrag);
		this.contDrag.destroy();
		this.removeChild(this.contD);
		this.contD.destroy();
		this.destroy();
	};
	this.activ = true;

}
PLPreloader.prototype = Object.create(PIXI.Container.prototype);
PLPreloader.prototype.constructor = PLPreloader;
Object.defineProperties(PLPreloader.prototype, {
	wh: {
		set: function (value) {

			if (this._wh != value) {
				this._wh = value;
				this.korect();
			}
		},
		get: function () {
			return this._wh;
		}
	},
	podlog: {
		set: function (value) {

			if (this._podlog != value) {
				this._podlog = value;
				this.graphics.visible = value;
				this.drawPod();
			}
		},
		get: function () {
			return this._podlog;
		}
	},
	centor: {
		set: function (value) {

			if (this._centor != value) {
				this._centor = value;
				this.draw();
			}
		},
		get: function () {
			return this._centor;
		}
	},
	activ: {
		set: function (value) {
			if (value != this._activ) {
				this._activ = value;
				this.visible = value;
				this.setInt(value);
			}
		},
		get: function () {
			return this._activ;
		}
	},
	width: {
		set: function (value) {
			if (this._width != value) {
				this._width = value;
				this.korect();
				this.draw();
			}

		},
		get: function () {
			return this._width;
		}
	},
	height: {
		set: function (value) {
			if (this._height != value) {
				this._height = value;
				this.korect();
				this.draw();
			}
		},
		get: function () {
			return this._height;
		}
	}
});

export function PLSlider (cont, _x, _y, fun) {
	PIXI.Container.call(this);
	cont.addChild(this);
	this.type = 'PLSlider';
	var self = this;
	pl102.addElement(this);

	this.fun = fun;

	this.x = _x;
	this.y = _y;
	this.whMin = pl102.whMin;
	this.lineTrick = 1;
	this.otstup = 2;
	this.otstupMin = 3;
	this.debugRect = false;
	this.whPan = 12;
	this.wh = 18;

	this._height = 22;
	this._width = 100;
	this._value = 0;
	this._angle = 0;
	this._activMouse = true;
	this._color1 = pl102.color;

	this.color2 = 0xa2a1a1; // pl102.colorSlid  // правая панель при движении кнопки
	this.color3 = 0x717171; // pl102.colorSlid1 // левая панель при движении кнопки
	this.color4 = 0x444444; // линиия сверху
	this.color5 = 0x858585; // слева справа линии

	var imgBtn = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAWCAYAAADAQbwGAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAA+tJREFUeNp0lc9rVFcUxz/313szSWaGZIJZVLTSRUQQ3AgWFy3BhQu7FvwP+me4aXftptplQGhFt1UwKS1WTNqSFootNBYCTpNIM/k1eZl5P++9rwvfDEbNgcflHc753nu+59zvFRxjy8vLc0qp61rrOaXUKa01Sql/hRA/eu/vnzt37od35Yk3HU+fPj0LfC2E+BhASonWGq01xhiklJRlSZZlj5Mk+fTy5curxwIuLy9/5L3/znvfsNbinANAa00QBARBgNZ6CEiSJIdxHH9y7dq1n94C/G1l5azz/hdrbSvPMgZxTFEUlGVJEATUajVqtRpSSqy1pGlKlmWkaXpQFMWlGzdurAJIgD+fPRNKqXklZUsA1jmccxRFwfCkZVnivSfPc3q9Hnt7e0RRRJZlLWvt/J07d8QIUMCVwJhLxpgRV1UTKMsS5/2rcoQgyzKiKOLg4IA4jrHWAlwqy/IKgAYwxlwXUqKcQwpxhIvBYIB7lURZlkRRRBRFeO8JwxCl1JDX68D3GhDGmDkpJb7qptaaMAgwxgDQ7/cBSJKE7e1tyrKkXq8f4VUIMQcIDRil1EkhxKv6lcIYQ61WY2xsjPGxMTZevgRgbW2NMAxpNBqEYTiiRSkFcBIwGgicc7mU0hyZJyEwxtBqtWi1WqxvbnL+/Pnj7gFlWQIEGjD7vd5OYMy49x5bdTdNU6IoYqvbJUkSrl69ytLSEuPj49TrdYwxKKWG5ZLneXd4QvnixYvVdrt9Os9z0jQljmMO+30ODw/RWnPx4kUAJicn2d/fJ8sywjAcTYOUkt3d3b8AKQGePHmyuLOzQ3d7m61ul+72Nr1eD601p06fZnp6GmDEnbWWJEmI45gkSUjTlJWVlYVhU/xXt24tvX/mzHNjzGye5zjnCMOQ6elpZk6cwBhDnuejRjnnsNZSFAXee+I4fn779u2fASeBwjkX37t374vBYBAP56vVatFut5mYmBgRr7UmDEOCIHhdJOK7d+9+6ZwbAIWqYsONjQ2vlOrMzs5+2Gg0zOTUFO2pKZrNJkqpt66i956iKJKHDx9+/ujRoz+ALaCngLICra+trfWjKPr9woULH8zMzLSbzSb1eh0hxJEynXP0er1/5ufnP1tcXPwb2AH+A5IhoK/WcH19PX/w4MHjRqOx2m6382azOaGUqltri4ODg61Op/PrwsLCNzdv3vy20+nsAnvAJtADrHhNxmrACeA9YBII3iXAwzkGcmC/AusCKVCq14IckFWB5Rt6Kd6I6VdlblZrOswR73gSDDAONKtvbKhKQAHEwCEQAYPKVx77plQmK5Cg2kBWfl8B5ICt/o/Y/wMA/Gv7iVuM/zAAAAAASUVORK5CYII=';

	this.content = new PIXI.Container();
	this.addChild(this.content);
	// графика в местах прилипания
	this.contPrilip = new PIXI.Container();
	this.addChild(this.contPrilip);

	this.panel = new PLPanel(this.content, 0, 0);
	pl102.removeElement(this.panel, true);
	this.panel.width = this._width - this.wh;
	this.panel.height = this.whPan;
	this.panel.color = this.color2;
	this.panel.kontur = false;
	this.panel.nizAlpha = 0.01;

	this.panel2 = new PLPanel(this.content, 0, 0);
	pl102.removeElement(this.panel2, true);
	this.panel2.width = 0;
	this.panel2.height = this.whPan;
	this.panel2.color = this.color3;
	this.panel2.kontur = false;
	this.panel2.nizAlpha = 0;
	this.panel2.addChild(this.contPrilip);

	var graphLines = new PIXI.Graphics();
	this.content.addChild(graphLines);

	this.draw = function () {

		this.wh = this.but.width;

		var x = 0;
		var y = this.wh / 2 - this.whPan / 2;
		var w = this._width;
		var h = this.whPan;

		this.panel.width = w;
		this.button.width = w;
		this.button.x = x;
		this.panel.x = x;
		this.panel.y = y;
		this.panel2.x = x;
		this.panel2.y = y;

		this.contPrilip.x = this.wh / 2;

		graphLines.clear();
		graphLines.beginFill(this.color4);
		graphLines.drawRect(x, y, w, this.lineTrick);
		graphLines.beginFill(this.color3);
		graphLines.drawRect(x, y + 1, w, this.lineTrick);
		graphLines.beginFill(this.color5);
		graphLines.drawRect(x, y, this.lineTrick, h);
		graphLines.drawRect(this._width - 1, y, this.lineTrick, h);
		graphLines.beginFill(this.color2);
		graphLines.drawRect(x, y + h - 1, w, this.lineTrick);

		if (this.debugRect) this.drawDebugRect();
	};

	var debugGraph = new PIXI.Graphics();
	this.content.addChild(debugGraph);
	this.drawDebugRect = function () {
		debugGraph.clear();
		debugGraph.lineStyle(1, 0xff0000);
		debugGraph.drawRect(0, 0, this._width, this._height);
	};

	this.button = new PLButton(this.content, 0, (this.wh - this.whMin) / 2, '', function () {
		self.mouseD();
	});
	pl102.removeElement(this.button, true);
	this.button.height = this.whMin;
	this.button.width = this._width;
	this.button.alpha = 0;
	this.button.funUp = function () {
		if (self.funUp) self.funUp();
	};

	this.but = new PLButton(this.content, 0, 0, '', function () {
		self.onDragStart();
	});
	pl102.removeElement(this.but, true);
	this.but.height = this.wh;
	this.but.width = this.wh;
	this.but.x = -this.otstupMin;
	// this.but.color = pl102.color2;
	this.but.otstup = 0;
	this.but.loadImeg(imgBtn);
	this.but.visiblePanel = false;
	this.but.funComplit = function () {
		this.width = this.image.picWidth;
		this.height = this.image.picHeight;
		self.draw();
	};

	this.onDragStart = function () {
		if (pl102.isMouseEvents) {
			pl102.stage.off('mouseup', self.onDragEnd);
			pl102.stage.off('mousemove', self.onDragMove);
			pl102.stage.on('mouseup', self.onDragEnd);
			pl102.stage.on('mousemove', self.onDragMove);
		}
		if (pl102.isTouchEvents) {
			pl102.stage.off('touchend', self.onDragEnd);
			pl102.stage.off('touchmove', self.onDragMove);
			pl102.stage.on('touchend', self.onDragEnd);
			pl102.stage.on('touchmove', self.onDragMove);
		}
		if (self.funDown) self.funDown();
	};

	var v, v1;
	var ppp = new PIXI.Point(0, 0);
	var pEnd = new PIXI.Point(0, 0);
	var pp;
	this.onDragMove = function (e) {
		v = (self.toLocal(pl102.global).x - self.wh / 2) / ((self._width - self.wh) / 100);
		if (v != self._value) {
			self.value = v;
			if (self.fun) self.fun();
		}
	};

	this.onDragEnd = function (e) {
		if (pl102.isMouseEvents) {
			pl102.stage.off('mouseup', self.onDragEnd);
			pl102.stage.off('mousemove', self.onDragMove);
		}
		if (pl102.isTouchEvents) {
			pl102.stage.off('touchend', self.onDragEnd);
			pl102.stage.off('touchmove', self.onDragMove);
		}
		if (self.funUp) self.funUp();
	};
	// получить дистанцию между точками
	this.getDistance = function (p1, p2) {
		p2 = p2 || rezNull;
		return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2));
	};

	this.mouseD = function () {
		v = (self.toLocal(pl102.global).x - self.but.width / 2) / ((self._width - self.but.width) / 100);
		if (v != self._value) {
			self.value = v;
			if (self.fun) self.fun();
		}
		if (self.funDown) self.funDown();
	};
	/// Графика, накрывающая весь чек-бокс
	this.graphActivM = new PIXI.Graphics();
	this.addChild(this.graphActivM);
	this.graphActivM.alpha = 0;
	this.graphActivM.interactive = true;
	this.graphBut = new PIXI.Graphics();
	this.addChild(this.graphBut);
	this.graphBut.alpha = 0.3;
	this.graphBut.interactive = true;

	this.changeActiv = function () {
		if (!this._activMouse) {
			this.graphActivM.clear();
			this.graphActivM.beginFill(this._color);
			this.graphActivM.drawRect(0, 0, this._width, this._height);
			this.graphActivM.endFill();

			this.graphBut.clear();
			this.graphBut.lineStyle(1, this._color1);
			this.graphBut.beginFill(this._color1);
			this.graphBut.drawCircle(this.but.x + this.but.width * 0.51, this.but.y + this.but.height * 0.52, this.but.width * 0.46);
			this.graphBut.endFill();

			this.panel.alpha = this.panel2.alpha = 0.5;
		} else {
			this.graphActivM.clear();
			this.graphBut.clear();
			this.panel.alpha = this.panel2.alpha = 1;
		}
	};
	this.draw();
}

PLSlider.prototype = Object.create(PIXI.Container.prototype);
PLSlider.prototype.constructor = PLSlider;
Object.defineProperties(PLSlider.prototype, {
	value: {
		set: function (_value) {
			if (this._value == _value) return;
			this._value = _value;
			if (this._value < 0) this._value = 0;
			if (this._value > 100) this._value = 100;
			this.but.x = (this._width - this.wh) * (this._value / 100) - this.otstupMin * (1 - (this._value / 100) * 2);
			this.panel2.width = (this._width - this.wh / 2) * (this._value / 100) - this.otstupMin * (1 - (this._value / 100) * 2);
			this.changeActiv();
		},
		get: function () {
			return this._value;
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
	},
	activMouse: {
		set: function (value) {
			if (this._activMouse == value) return;
			this._activMouse = value;
			this.changeActiv();
		},
		get: function () {
			return this._activMouse;
		}
	}
});

export function PLSliderBig (cont, _x, _y, title, fun, min, max) {
	PIXI.Container.call(this);
	cont.addChild(this);
	this.type = 'PLSliderBig';
	var self = this;
	pl102.addElement(this);

	this.fun = fun;
	this.funUp;
	this.funDown;
	this.inputUp;

	this.x = _x;
	this.y = _y;

	this.debugRect = false;

	this.okrug = 1; // округление value
	this.otstup = 14; // отступ слидера до инпута
	this.otstup1 = 17; // отступ для слидера
	this.otstup2 = 7; // отступ инпута
	this.otstup3 = 13; // отступ для текста после инпута по y
	this.otstup4 = 0; // отступ для основного текста
	this.otstup5 = 5; // отступ для текста после инпута по х
	this.slidProc = 0.655; // ширина слидера в процентах
	this.wh = 27;
	this.isDinamMinMax = true;

	this.color1 = pl102.color;
	this.color2 = pl102.color1;

	this._width = 100;
	this._height = 51;
	this._value = 0;
	this._angle = 0;
	this._activMouse = true;
	this._plusText = null;
	var fact = 0.65;
	var fontS = 13;
	this.notInp=false

	if (title == undefined) title = '----';
	this._title = title;
	if (min == undefined) min = 0;
	this._min = min;
	if (max == undefined) max = 100;
	this._max = max;
	this._visiMinMax = false;


	this.tween = new TWEEN.Tween(this);

	this.getVector = function (length, angle, point) {
		if (point == undefined) var point = {x: 0, y: 0};
		if (length < 0) angle += Math.PI;
		point.x = Math.abs(length) * Math.cos(angle);
		point.y = Math.abs(length) * Math.sin(angle);
		return point;
	};

	this.pEnd = new PIXI.Point();
	this.pInp = new PIXI.Point();

	this.pEnd = this.getVector(this._width * 0.7, this.angle, this.pEnd);
	this.content = new PIXI.Container();
	this.addChild(this.content);

	this.v;
	this.slValue;
	var isOnPrilip = false;
	var prilipNum = null;
	this.slid = new PLSlider(this, 0, pl102.whText, function () {
		self.slValue = this.value;
		self.v = self._min + (self._max - self._min) * (this.value / 100);
		if (self._min == self._max) self.v = 0;

		var indexPrilip = -1;
		var dMin = 999999;
		var dif = 0;
		for (var i = 0; i < self.arrPrilip.length; i++) {

			if (self.arrPrilip[i].num <= self.v + self.arrPrilip[i].width / 2 &&
               self.arrPrilip[i].num >= self.v - self.arrPrilip[i].width / 2) {

				dif = self.diffNum(self.arrPrilip[i].num, self.v);
				if (dif < dMin) {
					dMin = dif;
					indexPrilip = i;
				}
			}
		}
		if (indexPrilip != -1) {
			self.v = self.arrPrilip[indexPrilip].num;
			this.value = (self.v - self._min) / (self._max - self._min) * 100;
		}
		if (self.value != self.v) {
			self.value = self.v;
			if (self.fun != undefined) self.fun();
		}
		self.input.text = self.value;
	});

	this.diffNum = function (a, b) {
		if (a >= 0 && b >= 0) return Math.abs(a - b);
		if (a <= 0 && b <= 0) return Math.abs(Math.abs(a) - Math.abs(b));
		if (a <= 0 && b >= 0) return Math.abs(a) + b;
		if (a >= 0 && b <= 0) return a + Math.abs(b);
	};

	pl102.removeElement(this.slid, true);
	this.slid.okrug = this.okrug;
	this.slid.height = this.wh;
	this.slid.width = this._width * this.slidProc;

	this.label = new PLLabel(this, 0, 0, this._title);
	pl102.removeElement(this.label, true);
	this.rect = this.label.getRect();
	this.label.x = -1;
	this.label.y = -this.otstup4;
	this.label.bold = false;
	this.label.fontSize = fontS;


	// Массив точек прилипания
	this.arrPrilip = [];
	// Отрисовка точек прилипания
	this.drawPriliPoint = function (num) {
		this.slid.contPrilip.addChild(this.arrPrilip[this.arrPrilip.length - 1].graph);
		this.arrPrilip[num].graph.clear();
		this.arrPrilip[num].graph.lineStyle(2, pl102.color4);
		var lineX = (this.slid.width - this.slid.but.width) / (Math.abs(this._max) - this._min) * (-this._min + (Number(this.arrPrilip[num].num)));
		// Первая точка
		this.arrPrilip[num].graph.moveTo(lineX, 0);
		// Вторая точка
		this.arrPrilip[num].graph.lineTo(lineX, 0 + this.slid.panel2.height);
	};


	this.slid.funDown = function () {
		if (self.funDown) self.funDown();

	};
	this.slid.funUp = function () {
		if (self.funUp) self.funUp(self);
	};


	this.input = new PLInput(this, this.slid.width, 0, '0', function () {
		if (this.text.indexOf(',') === 1) {
			var temp = this.text.split(',');
			this.text = temp[0] + '.' + temp[1];
		} else if (this.text.length > 3) this.text.slice(0, 3);
		var ss = this.text;
		self.value = this.text;
		if (self.notInp == true) {
			self._value = Math.round(ss * self.okrug) / self.okrug;
		}
		if (self.fun) self.fun();
		if (self.inputUp) self.inputUp();
		if (self.funUp) self.funUp();
	});
	this.input.isNumer = 0;

	pl102.removeElement(this.input, true);
	this.input.width = this._width * (1 - this.slidProc);
	this.input.height = this.wh;

	this.lblMin = new PLLabel(this.slid.panel, 0, 0, '' + this._min);
	this.lblMax = new PLLabel(this.slid.panel, 0, 0, '' + this._max);
	this.lblMin.interactiveChildren = this.lblMax.interactiveChildren = false;
	this.lblMin.visible = this.lblMax.visible = this._visiMinMax;
	this.lblMin.fontSize = this.lblMax.fontSize = 10;
	this.lblMin.alpha = this.lblMax.alpha = 0.6;

	this.labelSystem = undefined;
	this.setText = function (_text) {
		this.plusText = _text;
	};

	this.kill = function () {
		this.input.kill();
	};

	this.addPrilip = function (num, width) {
		this.arrPrilip.push({ num: num, width: width, graph: new PIXI.Graphics() });
		this.drawPriliPoint(this.arrPrilip.length - 1);
	};

	this.clearPrilip = function () {
		for (var i = 0; i < this.arrPrilip.length; i++) {
			this.arrPrilip[i].graph.clear();
		}
		this.arrPrilip = [];
	};

	/// Графика, накрывающая весь чек-бокс
	this.graphActivM = new PIXI.Graphics();
	this.slid.addChild(this.graphActivM);
	this.graphActivM.alpha = 0;
	this.graphBut = new PIXI.Graphics();
	this.slid.addChild(this.graphBut);
	this.graphBut.alpha = 0.3;

	this.changeActiv = function () {
		this.slid.activMouse = this._activMouse;
		this.input.activMouse = this._activMouse;
		if (!this._activMouse) {
			this.graphActivM.clear();
			this.graphActivM.beginFill(this._color);
			this.graphActivM.drawRect(0, 0, this._width, this.wh);
			this.graphActivM.endFill();
		} else {
			this.graphActivM.clear();
			this.graphBut.clear();
			this.slid.panel.alpha = this.slid.panel2.alpha = 1;
		}
	};

	this.textLength = function () {
		if (!this.labelSystem || !this.labelSystem.text) return 0;
		return this.labelSystem.text.length * fontS * fact;
	};

	this.changeSizeWidth = function () {
		var otst = this.textLength();
		if (this.labelSystem != undefined) {
			this.labelSystem.x = this._width - otst - this.otstup5;// ws + this.input.width + this.otstup5;
			this.labelSystem.y = this.otstup3;
		}
		otst += this.otstup5 * 2;
		var w = this._width;
		var ws = w * this.slidProc;
		var wi = w * (1 - this.slidProc) - otst;
		var h = this._height;


		this.slid.width = ws - this.otstup;
		this.slid.y = this.otstup1;

		this.input.width = wi;
		this.input.x = ws;
		this.input.y = this.otstup2;

		if (this.arrPrilip.length > 0) {
			for (var i = 0; i < this.arrPrilip.length; i++) {
				this.arrPrilip[i].graph.clear();
				this.drawPriliPoint(i);
			}
		}
		this.changeActiv();
		if (this.debugRect) this.drawDebugRect();
	};


	var debugGraph = new PIXI.Graphics();
	this.addChild(debugGraph);
	this.drawDebugRect = function () {
		debugGraph.clear();
		debugGraph.lineStyle(0.5, 0xff0000);
		debugGraph.drawRect(0, 0, this._width, this._height);
	};

	this.changeSizeHeight = function () {
		this.slid.height = this.wh;
		this.input.height = this.wh;
	};

	this.updateMinMax = function () {
		if (this._visiMinMax) {
			this.lblMin.text = '' + this._min;
			this.lblMax.text = '' + this._max;
			var rectMin = this.lblMin.getRect();
			var rectMax = this.lblMax.getRect();
			this.lblMin.x = 0;
			this.lblMax.x = this.slid.width - this.slid.content.x * 2 - rectMax.width;
			this.lblMin.y = this.lblMax.y = this.slid.panel.height;
			this.alpha = 0.5;
			this.tween.to({ alpha: 1 }, 500);
			this.tween.start();
			this._height = 38 + rectMax.height;
		} else {
			this._height = 38;
		}
	};

	this.updateSlidValue = function () {
		if (this._min < 0) {
			this.slid.value = (Math.abs(this._min) + this._value) * 100 / ((Math.abs(this._min) + Math.abs(this._max)) || 1);
		} else {
			this.slid.value = (Math.abs(this._min) - this._value) * 100 / ((Math.abs(this._min) - Math.abs(this._max)) || 1);
		}
	};

	this.changeSizeHeight();
	this.changeSizeWidth();
	this.updateMinMax();

	this.width = this._width;
	this.angle = this._angle;

	this.startPlus = function () {
		if (this.labelSystem != undefined) return;
		this.labelSystem = new PLLabel(this, 0, 0, '');
		this.labelSystem.bold = false;
		this.labelSystem.fontSize = fontS;
		pl102.removeElement(this.labelSystem, true);
	};
}

PLSliderBig.prototype = Object.create(PIXI.Container.prototype);
PLSliderBig.prototype.constructor = PLSliderBig;

Object.defineProperties(PLSliderBig.prototype, {
	plusText: {
		set: function (value) {
			if (this._plusText == value) return;
			this._plusText = value;
			this.startPlus();
			this.labelSystem.text = this._plusText;
			this.changeSizeWidth();
		},
		get: function () {
			return this._plusText;
		}
	},

	min: {
		set: function (value) {
			if (this._min == value) return;
			this._min = value;
			this.updateSlidValue();
			this.updateMinMax();
		},
		get: function () {
			return this._min;
		}
	},
	max: {
		set: function (value) {
			if (this._max == value) return;
			this._max = value;

			this.updateSlidValue();
			this.updateMinMax();
		},
		get: function () {
			return this._max;
		}
	},
	width: {
		set: function (value) {
			this._width = value;
			this.changeSizeWidth();
		},
		get: function () {
			return this._width;
		}
	},
	height: {
		set: function (value) {
			this._height = value;
		},
		get: function () {
			return this._height;
		}
	},
	title: {
		set: function (value) {
			this._title = value;
			this.label.text = this._title;
		},
		get: function () {
			return this._title;
		}
	},
	value: {
		set: function (value) {

			if (!isNaN(value * 1)) {

				this._value = value;

				if (this._value < this._min) this._value = this._min;
				if (this._value > this._max) this._value = this._max;
			} else {

				var p = (this._max - this._min) / 2 + this._min;
				this._value = Math.round(p);

				if (this._value <= this._min) this._value = p;
				if (this._value >= this._max) this._value = p;
			}

			this._value = Math.round(this._value * this.okrug) / this.okrug;

			this.input.text = this._value;

			this.updateSlidValue();
			this.changeActiv();
		},
		get: function () {
			return this._value;
		}
	},
	angle: {
		set: function (value) {
			this._angle = value;
			this.slid.angle = this._angle;
			this.input.rotation = this._angle;

			this.value = this._value;
			this.width = this._width;
		},
		get: function () {
			return this._angle;
		}
	},
	activMouse: {
		set: function (value) {
			if (this._activMouse == value) return;
			this._activMouse = value;
			this.changeActiv();
		},
		get: function () {
			return this._activMouse;
		}
	},
	visiMinMax: {
		set: function (value) {
			if (this._visiMinMax == value) return;
			this._visiMinMax = value;
			this.lblMin.visible = this.lblMax.visible = value;
			this.updateMinMax();

		},
		get: function () {
			return this._visiMinMax;
		}
	}
});

export function PLSlidDubBtn (cont, _fun) {
	PIXI.Container.call(this);
	this.type = 'PLSlidDubBtn';
	cont.addChild(this);

	var self = this;
	pl102.addElement(this);

	this.fun = _fun;
	this._step = 1;
	this._width = 100;
	this._min = 0;
	this._max = 100;
	this.btnW = 12;
	this._activMouse = true;

	this.funBtnBefore = function () {
		self.pLSliderBig.value = self.pLSliderBig.value - self._step;
		self.pLSliderBig.fun();
	};

	this.funBtnAfter = function () {
		self.pLSliderBig.value = self.pLSliderBig.value + self._step;
		self.pLSliderBig.fun();
	};

	this.btnBefore = new PLButton(this, 0, 0, '', self.funBtnBefore);
	pl102.removeElement(this.btnBefore, true);
	this.pLSliderBig = new PLSliderBig(this, 0, 0, '', self.fun);
	pl102.removeElement(this.pLSliderBig, true);
	this.btnAfter = new PLButton(this, 0, 0, '', self.funBtnAfter);
	pl102.removeElement(this.btnAfter, true);

	this.btnBefore.width = this.btnAfter.width = this.btnW;
	this.btnBefore.height = this.btnAfter.height = this.pLSliderBig.height;

	this.btnBefore.loadImeg(pl102.base4);
	this.btnBefore.panel.visible = false;
	this.btnBefore.y = pl102.whText + 2;

	this.btnAfter.loadImeg(pl102.base5);
	this.btnAfter.panel.visible = false;
	this.btnAfter.y = pl102.whText + 2;

	this.addPrilip = function (num, width) {
		this.pLSliderBig.addPrilip(num, width);
	};

	this.pLSliderBig.funUp = function () {
		if (self.funUp) self.funUp();
	};

	this.pLSliderBig.inputUp = function () {
		if (self.inputUp) self.inputUp();
	};

	Object.defineProperty(this, 'width', {
		set: function (val) {
			this.pLSliderBig.slid.width = val * 0.69;
			this.pLSliderBig.input.x = val * 0.7 + this.btnW;
			this.pLSliderBig.input.width = val * 0.3 - this.btnW * 2;
			this.btnBefore.x = val * 0.7;
			this.btnAfter.x = val * 0.7 + (val * 0.3 - this.btnW * 2) + this.btnW;
		},
		get: function () {
			return this._width;
		}
	});
	Object.defineProperty(this, 'min', {
		set: function (value) {
			this._min = value;
			this.pLSliderBig.min = this._min;
		},
		get: function () {
			return this._min;
		}
	});
	Object.defineProperty(this, 'max', {
		set: function (value) {
			this._max = value;
			this.pLSliderBig.max = this._max;
		},
		get: function () {
			return this._max;
		}
	});
	Object.defineProperty(this, 'activMouse', {
		set: function (value) {
			this._activMouse = value;
			this.pLSliderBig.activMouse = value;
		},
		get: function () {
			return this._activMouse;
		}
	});

}
PLSlidDubBtn.prototype = Object.create(PIXI.Container.prototype);
PLSlidDubBtn.prototype.constructor = PLSlidDubBtn;

export function PLInput (cont, _x, _y, text, fun) {
	PIXI.Container.call(this);
	cont.addChild(this);
	this.type = 'PLInput';
	var self = this;
	pl102.addElement(this);

	this.fun = fun;
	this.funEnter;

	this.x = _x;
	this.y = _y;

	this._width = 100;
	this._height = pl102.wh;
	this._activMouse = true;
	this._color = pl102.style.fill; // цвет текст
	this._backgroundColor = '#ffffff'; // "#d0d0d0";// todo color to pl102  // цвет фона
	this._outlineColor = '#909090'; // todo color to pl102  // цвет рамки при фокусе
	this._borderColor = '#cacaca';
	this._fontSize = 15;// pl102.style.fontSize;
	this._align = 'right';// pl102.style.align;

	this._text = text;
	this._value = text;
	// тип значений this._text и this._value, true => number, false => string,
	this._isWorkWithNumber = false;

	this.fontStyle = pl102.style.fontStyle;
	this.fontFamily = pl102.style.fontFamily;
	this.paddingRight = pl102.style.paddingRight;
	this.paddingTop = pl102.style.paddingTop;


	this.input = new PLDOMElement(document.createElement('input'), this);
	this.input.htmlElement.id = 'input102_' + Math.random();
	this.input.htmlElement.type = 'text';
	this.input.htmlElement.name = this.input.htmlElement.id;
	// this.input.htmlElement.style.font = this._fontStyle + ' ' + this._fontSize+'px ' + this._fontFamily;
	this.input.htmlElement.style.border = '1px solid';
	this.input.htmlElement.style.color = this._color;
	this.input.htmlElement.style.fontFamily = this.fontFamily;
	this.input.htmlElement.style.fontSize = this._fontSize + 'px';
	this.input.htmlElement.style.fontStyle = this.fontStyle;
	this.input.htmlElement.style.textAlign = this._align;
	this.input.htmlElement.style.paddingRight = this.paddingRight + 'px';
	this.input.htmlElement.style.paddingTop = this.paddingTop + 'px';
	self.input.htmlElement.isOnFocus = false;
	this.input.htmlElement.value = text;
	this.input.height = this._height;

	/// Графика, накрывающая нпут
	this.graphRect;
	this.graphRect = new PIXI.Graphics();
	this.addChild(this.graphRect);
	this.graphRect.alpha = 0.5;
	/// Графика - имитирующая инпут
	this.content;
	this.graphCover;
	this.graphRect1;
	this.graphRectMask;
	this.label;
	this.rect;

	var debGraph = new PIXI.Graphics();
	var timeoutID = null;
	var timeOutFun = 1000;

	this.updateActivMouse = function () {
		if (!this.content) this.rectInitial();
		this.label.visible = !this._activMouse;
		this.input.visible = this._activMouse;
		this.drawRect();
	};

	this.rectInitial = function () {
		this.content = new PIXI.Container();
		this.addChild(this.content);
		this.graphRectMask = new PIXI.Graphics();
		this.content.addChild(this.graphRectMask);

		this.graphRect1 = new PIXI.Graphics();
		this.content.addChild(this.graphRect1);


		this.label = new PLLabel(this.content, 1, 5, this._text);
		pl102.removeElement(this.label, true);
		this.label.mask = this.graphRectMask;

		this.rect = this.label.getRect();
		this.rect.width /= this.worldTransform.a;
		this.rect.height /= this.worldTransform.a;

		this.label.y = (this._height - this.rect.height) / 2;

		this.graphRect = new PIXI.Graphics();
		this.addChild(this.graphRect);

		this.graphRect.alpha = 0.5;
		this.graphRect.interactive = true;

		this.content.addChild(debGraph);
	};

	this.drawRect = function () {
		this.label.text = this._text;
		if (this.label.text == '') this.label.text = '0';

		this.rect = this.label.getRect();
		this.rect.width /= this.worldTransform.a;
		this.rect.height /= this.worldTransform.a;

		this.label.y = (this.input.height - this.rect.height) / 2;

		if (this.rect.width >= this._width) this.input.htmlElement.style.paddingRight = '0';
		else this.input.htmlElement.style.paddingRight = this.paddingRight + 'px';

		this.graphRect1.clear();
		this.graphRect1.beginFill('0x909090');
		this.graphRect1.drawRect(0, 0, this._width, this._height);
		this.graphRect1.beginFill('0xffffff');
		this.graphRect1.drawRect(1, 1, this._width - 2, this._height - 2);
		this.graphRect1.endFill();

		this.graphRectMask.clear();
		this.graphRectMask.beginFill('0x909090');
		this.graphRectMask.drawRect(0, 0, this._width, this._height);
		this.graphRectMask.endFill();

		if (!this._activMouse) {
			this.graphRect.clear();
			this.graphRect.beginFill(pl102.color);
			this.graphRect.drawRect(0, 0, this._width, this._height);
			this.graphRect.endFill();
		} else {
			this.graphRect.clear();
		}
	};

	this.input.htmlElement.onblur = function () {
		self.input.htmlElement.isOnFocus = false;
		if (pl102.isMouseEvents) {
			pl102.stage.off('mousedown', self.offFocus);
		}
		if (pl102.isTouchEvents) {
			pl102.stage.off('touchstart', self.offFocus);
		}
		if (self.funBlur) self.funBlur();
	};
	this.input.htmlElement.onfocus = function () {
		self.input.htmlElement.isOnFocus = true;
		if (pl102.isMouseEvents) {
			pl102.stage.on('mousedown', self.offFocus);
		}
		if (pl102.isTouchEvents) {
			pl102.stage.on('touchstart', self.offFocus);
		}
		if (self.funFocus) self.funFocus();
	};

	this.offFocus = function () { // отключение фокуса инпута
		self.input.htmlElement.blur();
	};

	this.input.htmlElement.onkeyup = function (e) {
		if (e.keyCode == 13) { // жмакаем Enter
			self.text = self.input.htmlElement.value;
			clearTimeout(timeoutID);
			if (self.fun) self.fun();
			if (self.funEnter) self.funEnter();
		}
	};

	this.input.htmlElement.oninput = function () {
		self.text = filterKey(self.input.htmlElement.value);
		if (self.funChange) self.funChange();
		clearTimeout(timeoutID);
		timeoutID = setTimeout(self.funTimeOut, timeOutFun);

	};

	function filterKey (_text) { // ввод только чисел и запятой
		if (self.isNumer === 0) {
			_text = _text.replace('.', ',');
			_text = _text.replace(/\-[^\d,]/g, '');
		}
		return _text;
	}
	this.funTimeOut = function () {
		if (self.fun) self.fun();
	};

	this.planerStil = function (num) {};

	this.interactive = true;

	this.kill = function () {
		if (pl102.isMouseEvents) {
			pl102.stage.off('mousedown', self.offFocus);
		}
		if (pl102.isTouchEvents) {
			pl102.stage.off('touchstart', self.offFocus);
		}
		this.input.htmlElement.onblur = null;
		this.input.htmlElement.onfocus = null;
		this.input.htmlElement.onkeyup = null;
		this.input.htmlElement.oninput = null;
		this.input.kill();
		this.parent = null;
	};

	this.toRGB = function (color) {
		color = '' + color;
		if (color[0] != '#') {
			color = Number(color).toString(16);
			if (color == 0) color = '000000';
			color = '#' + color;
		}
		return color;
	};

	this.color = this._color;
	this.backgroundColor = this._backgroundColor;
	this.outlineColor = this._outlineColor;
	this.borderColor = this._borderColor;
}

PLInput.prototype = Object.create(PIXI.Container.prototype);
PLInput.prototype.constructor = PLInput;
Object.defineProperties(PLInput.prototype, {
	width: {
		set: function (value) {
			this._width = value;
			this.input.width = value;
			this.updateActivMouse();
		},
		get: function () {
			return this._width;
		}
	},
	height: {
		set: function (value) {
			this._height = value;
			this.input.height = value;
			this.updateActivMouse();
		},
		get: function () {
			return this._height;
		}
	},
	text: {
		set: function (value) {

			if (this._isWorkWithNumber === true) {
				if (!isNaN(value * 1)) this._text = value * 1;
			} else {
				this._text = value;
			}

			this.input.htmlElement.value = this._text;

			this.updateActivMouse();
		},
		get: function () {
			return this._text;
		}
	},
	placeholder: {
		set: function (value) {
			this._placeholder = value;
			this.input.htmlElement.placeholder = this._placeholder;
		},
		get: function () {
			return this._placeholder;
		}
	},
	value: {
		set: function (value) {
			this.text = value;

			this.drawRect();
		},
		get: function () {
			return this._text;
		}
	},
	color: {// цвет текста
		set: function (value) {
			this._color = value;
			this.input.htmlElement.style.color = this.toRGB(value);
		},
		get: function () {
			return this._color;
		}
	},
	backgroundColor: {// цвет задний фон
		set: function (value) {
			this._backgroundColor = value;
			this.input.htmlElement.style.backgroundColor = this.toRGB(value);
		},
		get: function () {
			return this._backgroundColor;
		}
	},
	borderColor: {// цвет рамка
		set: function (value) {
			this._borderColor = value;
			this.input.htmlElement.style.borderColor = this.toRGB(value);
		},
		get: function () {
			return this._borderColor;
		}
	},
	outlineColor: {// цвет рамка при фокусе
		set: function (value) {
			this._outlineColor = value;
			this.input.htmlElement.style.outlineColor = this.toRGB(value);
		},
		get: function () {
			return this._outlineColor;
		}
	},
	activMouse: {
		set: function (value) {
			if (this._activMouse == value) return;
			this._activMouse = value;
			this.updateActivMouse();
		},
		get: function () {
			return this._activMouse;
		}
	},
	fontSize: {
		set: function (value) {
			if (this._fontSize == value) return;
			this._fontSize = value;
			this.input.htmlElement.style.fontSize = this._fontSize + 'px';
		},
		get: function () {
			return this._fontSize;
		}
	},
	align: {
		set: function (value) {
			if (this._align == value) return;
			this._align = value;
			this.input.htmlElement.style.textAlign = this._align;
		},
		get: function () {
			return this._align;
		}
	},
	isWorkWithNumber: {
		set: function (value) {
			if (this._isWorkWithNumber === value) return;
			this._isWorkWithNumber = value;
		},
		get: function () {
			return this._isWorkWithNumber;
		}
	}
});

export function PLWindow (cont, _x, _y, _text, fun) {
	PIXI.Container.call(this);
	cont.addChild(this);
	this.type = 'PLWindow';
	this.typeCom = 'pixi';
	var self = this;
	pl102.addElement(this);

	this.fun = fun;
	this.funMinimize;

	this.x = _x || 0;
	this.y = _y || 0;

	this._text = _text;
	if (this._text == undefined) this._text = 'text';
	if (this._text == null) this._text = 'text';
	if (this._text.length == 0) this._text = ' ';

	this._title = this._text;
	this._color = pl102.colorButton1;
	this._minimize = false; // спрятать низ или открыть по ум открыто
	this._width = 100;
	this._height = 100;
	this._hasMinimizeButton = false; // кнопочка для спрятать
	this._sX = 0;
	this._sY = 0;
	this._link;
	this._drag = true;
	this._activMouse = true;
	this._boolFilter = false;

	this.draggable = true; // можно ли тоскать
	this.sX = 0;
	this.sY = 0;
	this.image;
	this.wh = pl102.wh;

	this.gTeni = new PIXI.Graphics();
	this.addChild(this.gTeni);
	this.gTeni.visible = this._boolFilter;

	this.otstup1 = 5;
	this.otstup2 = 3;
	this.otstupCont = pl102.kontur;
	this.color2 = 0x515151;
	this.fontSize = 14;

	this.panelFooter = new PLPanel(this, 0, 0);
	this.panelFooter.width = this._width;
	this.panelFooter.height = this.wh;
	this.panelFooter.image.visible = false;
	this.panelFooter.interactive = true;

	// // верняя полоска panelFooter
	this.panelTop = new PLPanel(this.panelFooter, this.otstupCont, this.otstupCont);
	this.panelTop.width = this._width - this.otstupCont * 2;
	this.panelTop.height = this.otstup1;
	this.panelTop.color = 0xffffff;
	this.panelTop.image.link = pl102.base6;
	this.panelTop.image.alpha = 1;
	this.panelTop.kontur = false;
	pl102.removeElement(this.panelTop, true);

	// // середина panelFooter
	this.panelTab = new PLButton(this.panelFooter, this.otstupCont, this.otstup1, '');
	this.panelTab.konturColor = this.color3;
	this.panelTab.width = this._width - this.otstupCont * 2;
	this.panelTab.okDown = false;
	this.panelTab.color = this.color2;
	this.panelTab.height = this.wh - this.otstup1;
	pl102.removeElement(this.panelTab, true);

	this.label = new PLLabel(this, 5, 0, this._title);
	pl102.removeElement(this.label, true);
	this.label.color = 0xffffff;
	this.label.bold = false;
	this.label.fontSize = this.fontSize;
	this.rect = this.label.getRect();

	this.label.y = ((this.wh - this.rect.height) / 2) + 2;
	this.addChild(this.label);

	this.but = new PLButton(this, 0, 0, ' ', function () {
		self.onDragStart();
	});
	pl102.removeElement(this.but, true);
	this.but.alpha = 0;

	// Панель
	this.panel = new PLPanel(this, 0, this.wh);
	this.panel.interactive = true;
	pl102.removeElement(this.panel, true);

	this.panelFooter.interactive = true;

	this.content = new PIXI.Container();
	this.content.type = 'PLWindowCont';
	this.addChild(this.content);
	this.content.y = this.wh;

	this.buton = new PLButton(this, 0, this.otstup1 + 2, ' ', function () {
		self.minimize = !self.minimize;
		if (self.fun != undefined) self.fun('minimized');
	});
	pl102.removeElement(this.buton, true);
	this.buton.visible = false;
	this.buton.visiblePanel = false;
	this.buton.width = this.buton.height = this.wh - this.otstup1 - 2;

	var ww = this.wh - this.otstup1 - 2;
	var otsMy = ww / 4;
	this.graphicsSh = new PIXI.Graphics();
	this.graphicsSh.beginFill(0xffffff);
	// this.graphicsSh.drawRect(0, 0,10,10)
	this.graphicsSh.moveTo(-otsMy, -otsMy);
	this.graphicsSh.lineTo(otsMy, 0);
	this.graphicsSh.lineTo(-otsMy, otsMy);
	this.graphicsSh.lineTo(-otsMy, -otsMy);
	this.graphicsSh.endFill();
	this.buton.addChild(this.graphicsSh);
	this.graphicsSh.position.x = ww / 2 + 2;
	this.graphicsSh.position.y = ww / 2 - 2;
	// this.addChild(this.graphicsSh);

	this.onGraphDown = function () {
		self.minimize = !self.minimize;
		if (self.fun != undefined) self.fun('minimized');
	};

	this.graphicsSh.interactive = true;
	this.graphicsSh.buttonMode = true;
	this.graphicsSh.on('mousedown', self.onGraphDown);

	/// Графика, накрывающая кнопку
	this.graphRect = new PIXI.Graphics();
	this.addChild(this.graphRect);
	this.graphRect.alpha = 0.5;
	this.graphRect.interactive = true;

	this.updateActivMouse = function () {
		if (!this._activMouse) {
			this.graphRect.clear();
			this.graphRect.beginFill(pl102.color);
			this.graphRect.drawRect(this.but.x, this.but.y, this.but.width, this.but.height);
			this.graphRect.endFill();
		} else {
			this.graphRect.clear();
		}
	};

	this.draw102 = function () {
		this.panelFooter.width = this._width;
		this.panelTop.width = this._width - this.otstupCont * 2;
		this.panelTab.width = this._width - this.otstupCont * 2;

		this.gTeni.clear();
		this.gTeni.beginFill(0, 0.6);
		this.gTeni.drawRect(1, 1, this._width + 3, this._height + this.wh + 3);

		this.but.width = this._width;
		this.but.height = this.wh;

		this.panel.height = this._height;
		this.panel.width = this._width;

		this.updateActivMouse();
	};

	this.addLink = function (value) {
		this._link = value;
		this.image = new PLImage(this, 0, this._height - this._nizNum, pl102.base);
		pl102.removeElement(this.image, true);
		this.image.height = this.image.width = this.wh;
		this.image.link = this._link;

		this.label.x = this.wh + 5;
	};

	var np;
	var np2 = new PIXI.Point();
	var np3 = new PIXI.Point();
	this.onDragEnd = function (e) {
		self.dragging = false;
		if (pl102.isMouseEvents) {
			pl102.stage.off('mouseup', self.onDragEnd);
			pl102.stage.off('mousemove', self.onDragMove);
		}
		if (pl102.isTouchEvents) {
			pl102.stage.off('touchend', self.onDragEnd);
			pl102.stage.off('touchmove', self.onDragMove);
		}
	};

	var scal;
	this.onDragMove = function (e) {
		self.position.x = np2.x - (np3.x - pl102.global.x) / scal;
		self.position.y = np2.y - (np3.y - pl102.global.y) / scal;
	};

	this.onDragStart = function () {
		scal = this.transform.worldTransform.a;
		np3.x = pl102.global.x;
		np3.y = pl102.global.y;
		np2.x = self.position.x;
		np2.y = self.position.y;

		if (pl102.isMouseEvents) {
			pl102.stage.off('mouseup', self.onDragEnd);
			pl102.stage.off('mousemove', self.onDragMove);
			pl102.stage.on('mouseup', self.onDragEnd);
			pl102.stage.on('mousemove', self.onDragMove);
		}

		if (pl102.isTouchEvents) {
			pl102.stage.off('touchend', self.onDragEnd);
			pl102.stage.off('touchmove', self.onDragMove);
			pl102.stage.on('touchend', self.onDragEnd);
			pl102.stage.on('touchmove', self.onDragMove);
		}
	};

	this.kill = function () {
		if (this.content == null) return;
	};

	this.minimize = this._minimize;
	this.hasMinimizeButton = this._hasMinimizeButton;
}

PLWindow.prototype = Object.create(PIXI.Container.prototype);
PLWindow.prototype.constructor = PLWindow;
Object.defineProperties(PLWindow.prototype, {
	minimize: {
		set: function (value) {
			this._minimize = value;
			this.content.visible = !value;
			this.panel.visible = !value;
			if (this._minimize == true) this.graphicsSh.rotation = 0;
			else this.graphicsSh.rotation = Math.PI / 2;

			if (this.funMinimize != undefined) this.funMinimize();
		},
		get: function () {
			return this._minimize;
		}
	},
	hasMinimizeButton: {
		set: function (value) {
			this._hasMinimizeButton = value;
			this.graphicsSh.visible = value;
			this.buton.visible = value;
			if (this._hasMinimizeButton == true) {
				if (this.image != undefined) {
					this.image.x = this.wh;
					this.label.x = this.wh * 2 + this.otstup2;
				} else {
					this.label.x = this.wh;
				}
			} else {
				this.label.x = this.otstup2 * 2;
			}
		},
		get: function () {
			return this._hasMinimizeButton;
		}
	},
	drag: {
		set: function (value) {
			this._drag = value;
			this.but.visible = value;

		},
		get: function () {
			return this._drag;
		}
	},
	width: {
		set: function (value) {
			if (this._width == value) return;
			this._width = value;
			this.draw102();
		},
		get: function () {
			return this._width;
		}
	},
	height: {
		set: function (value) {
			if (this._height == value) return;
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
			this.label.text = value;
		},
		get: function () {
			return this._text;
		}
	},
	activMouse: {
		set: function (value) {
			// debugger
			if (this._activMouse == value) return;
			this._activMouse = value;
			this.updateActivMouse();
		},
		get: function () {
			return this._activMouse;
		}
	},
	color: {
		set: function (value) {
			// debugger
			if (this._color == value) return;
			this._color = value;
			this.panel.color = value;
		},
		get: function () {
			return this._activMouse;
		}
	},
	boolFilter: {
		set: function (v) {
			if (this._boolFilter == v) return;
			this._boolFilter = v;
			if (this._boolFilter == true) this.gTeni.filters = [pl102.blur];
			else this.gTeni.filters = null;
			this.gTeni.visible = this._boolFilter;
		},
		get: function () {
			return this._boolFilter;
		}
	}
});

export function PLBitmapData (w, h, rgba, fun) {
	var self = this;
	this.type = 'PLBitmapData';
	pl102.addElement(this);

	this.fun = fun;
	this._width = w != undefined ? w : 100;
	this._height = h != undefined ? h : 100;
	this._color = rgba != undefined ? rgba : [0, 0, 0, 0];
	this._widthVisi = 100;
	this._heightVisi = 100;

	this.canvas = document.createElement('canvas'); // канвас для картинки
	this.ctx = this.canvas.getContext('2d'); // контекст картинки

	// загружаем картинку . путь к картинке или data:base64
	this.load = function (data, isClear) {
		var img = new Image();
		img.crossOrigin = 'Anonymous';
		img.onload = function () {
			if (isClear) {
				self.clear();
			}
			self.width = img.width;
			self.height = img.height;
			self.ctx.drawImage(img, 0, 0);
			self.imgData = self.ctx.getImageData(0, 0, self.width, self.height);
			if (self.fun) self.fun();
		};
		img.src = data;
	};

	this.setCanvas = function (canvas, context2d) {
		self.canvas = canvas;
		self.ctx = context2d;
		self.imgData = self.ctx.getImageData(0, 0, self.canvas.width, self.canvas.height);
		self.upDate();
	};

	this.setImage = function (img) {
		this._width = img.width;
		this._height = img.height;
		this.canvas.width = this._width;
		this.canvas.height = this._height;
		this.ctx.clearRect(0, 0, this._width, this._width);
		this.ctx.drawImage(img, 0, 0);
		this.imgData = this.ctx.getImageData(0, 0, img.width, img.height);
	};

	// возвращает data:image/png;base64


	this.setImage2 = function (img, s) {
		this._width = img.width;
		this._height = img.height;
		this.canvas.width = this._width*s;
		this.canvas.height = this._height*s;
		this.ctx.clearRect(0, 0, this._width, this._width);
		this.ctx.drawImage(img, 0, 0, this._width,this._height,0,0,this._width*s,this._height*s);
		this.imgData = this.ctx.getImageData(0, 0, img.width, img.height);
	};

	this.getData = function () {
		return this.canvas.toDataURL();
	};

	this.arrRgba = [0, 0, 0, 0];
	// получить пиксель. x, y - позиция пикселя
	// возвращает масив [r,g,b,a]. при выходе за контекст [0, 0, 0, 0]
	this.getPixel = function (x, y) {
		this.arrRgba[0] = this.imgData.data[(y * this.imgData.width + x) * 4 + 0];
		this.arrRgba[1] = this.imgData.data[(y * this.imgData.width + x) * 4 + 1];
		this.arrRgba[2] = this.imgData.data[(y * this.imgData.width + x) * 4 + 2];
		this.arrRgba[3] = this.imgData.data[(y * this.imgData.width + x) * 4 + 3];

		this.arrRgba[0] = this.arrRgba[0] ? this.arrRgba[0] : 0;
		this.arrRgba[1] = this.arrRgba[1] ? this.arrRgba[1] : 0;
		this.arrRgba[2] = this.arrRgba[2] ? this.arrRgba[2] : 0;
		this.arrRgba[3] = this.arrRgba[3] ? this.arrRgba[3] : 0;
		return this.arrRgba;
	};

	this.getAlphaPixel = function (x, y) {
		return this.getPixel(x, y)[3];
	};

	// установить канал пикселя .x, y - позиция
	// rgba - масив [r,g,b,a]
	this.setPixelDin = function (i, j, rgba) {
		var imgData = this.ctx.createImageData(1, 1);
		imgData.data[0] = rgba[0];
		imgData.data[1] = rgba[1];
		imgData.data[2] = rgba[2];
		imgData.data[3] = rgba[3];
		this.ctx.putImageData(imgData, i, j);
	};

	this.setPixel = function (i, j, rgba) { // установить пиксель по координатам
		this.imgData.data[(j * this.imgData.width + i) * 4 + 0] = rgba[0];
		this.imgData.data[(j * this.imgData.width + i) * 4 + 1] = rgba[1];
		this.imgData.data[(j * this.imgData.width + i) * 4 + 2] = rgba[2];
		this.imgData.data[(j * this.imgData.width + i) * 4 + 3] = rgba[3];
	};

	this.addPixel = function (i, j, rgba) { // добавить пиксель
		this.setPixel(i, j, this.blendColors(this.getPixel(i, j), rgba));
	};

	//
	this.addImgData = function (imgData, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) { // image, sx, sy, sWidth, sHeight, dx, dy
		var context = {
			imgData: imgData,
			arrRgba: []
		};
		var countx = 0;
		var county = 0;
		for (var i = sx; i < sWidth; i++) {
			for (var j = sy; j < sHeight; j++) {
				var pixelOther = this.getPixel.call(context, i, j);

				this.addPixel(dx + countx, dy + county, pixelOther);

				county++;
			}
			county = 0;
			countx++;
		}
	};

	this.addBitmapData = function (bmp, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) { // todo dWidth
		if (arguments.length == 1) {
			sx = sy = 0;
			sWidth = bmp.imgData.width;
			sHeight = bmp.imgData.height;
			dx = dy = 0;
		} else if (arguments.length == 3) {
			dx = sx;
			dy = sy;
			sx = sy = 0;
			sWidth = bmp.imgData.width;
			sHeight = bmp.imgData.height;
		} else if (arguments.length == 9) {
			// нечего
			console.warn('todo dWidth, dHeight');
		} else {
			console.error('не правильные аргументы', arguments.length);
		}
		this.addImgData(bmp.imgData, sx, sy, sWidth, sHeight, dx, dy);
	};

	this.upDate = function () {
		this.ctx.putImageData(this.imgData, 0, 0);
	};

	this.changeWH = function (width, height) {
		var imgData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
		this.canvas.width = width != undefined ? width : this._width;
		this.canvas.height = height != undefined ? height : this._height;
		this.clear();
		this.ctx.putImageData(imgData, 0, 0);
		this.imgData = this.ctx.getImageData(0, 0, this._width, this._height);
		this.widthVisi = this._widthVisi;
		this.heightVisi = this._heightVisi;
	};

	this.setColor = function (rgba) {
		if (!rgba) rgba = this._color;
		this.ctx.fillStyle = 'rgba(' + rgba[0] + ',' + rgba[1] + ',' + rgba[2] + ',' + rgba[3] / 255 + ')';
	};

	this.setPixelTempData = function (i, j, rgba) {
		this.tempData.data[(j * this.tempWidth + i) * 4 + 0] = rgba[0];
		this.tempData.data[(j * this.tempWidth + i) * 4 + 1] = rgba[1];
		this.tempData.data[(j * this.tempWidth + i) * 4 + 2] = rgba[2];
		this.tempData.data[(j * this.tempWidth + i) * 4 + 3] = rgba[3];
	};

	this.tempData = [];
	this.tempWidth = 100;
	var sw = 1,
		sh = 1,
		pw = 0,
		ph = 0;
	var vw, vh;
	this.compress = function (w, h, funCompress) {
		w = Math.round(w);
		h = Math.round(h);
		if (w > this._width) {
			w = this._width;
		}
		if (h > this._height) {
			h = this._height;
		}
		sw = this._width / w;
		sh = this._height / h;

		pw = sw % 1;
		ph = sh % 1;
		sw -= pw;
		sh -= ph;

		this.tempWidth = w;
		this.tempData = this.ctx.createImageData(w, h);

		vw = (this._width + 2) / w;
		vh = (this._height + 2) / h;
		for (var i = 0, ii = 0; i < w; i++) {
			for (var j = 0, jj = 0; j < h; j++) {
				this.setPixelTempData(i, j, this.getPixelMerge(Math.round(i * vw), Math.round(j * vh)));
			}
		}

		this.width = w;
		this.height = h;
		this.imgData = this.tempData;
		this.upDate();
		if (funCompress) funCompress(this);
	};

	this.getPixelMerge = function (i, j) {
		var basePixel = this.getPixel(i, j);
		this.tempPixel[0] = basePixel[0];
		this.tempPixel[1] = basePixel[1];
		this.tempPixel[2] = basePixel[2];
		this.tempPixel[3] = basePixel[3];
		var countPix = 1; // количество взятых пикселей
		var pix;
		var ss = 1;
		for (var ii = 0; ii < sw; ii++) {
			if (i + (ii + 1) < this._width) { // не вышли за пределы , в право берем пиксель для мержа
				pix = this.getPixel(i + (ii + 1), j);
				this.tempPixel[0] += (pix[0] * ss);
				this.tempPixel[1] += (pix[1] * ss);
				this.tempPixel[2] += (pix[2] * ss);
				this.tempPixel[3] += (pix[3] * ss);
				countPix++;
			} else { // иначе добавляем базовый пиксель
				this.tempPixel[0] += basePixel[0] * ss;
				this.tempPixel[1] += basePixel[1] * ss;
				this.tempPixel[2] += basePixel[2] * ss;
				this.tempPixel[3] += basePixel[3] * ss;
				countPix++;
			}
			if (i - (ii + 1) > 0) { // не вышли за пределы , в лево берем пиксель для мержа
				pix = this.getPixel(i - (ii + 1), j);
				this.tempPixel[0] += pix[0] * ss;
				this.tempPixel[1] += pix[1] * ss;
				this.tempPixel[2] += pix[2] * ss;
				this.tempPixel[3] += pix[3] * ss;
				countPix++;
			} else { // иначе добавляем базовый пиксель
				this.tempPixel[0] += basePixel[0] * ss;
				this.tempPixel[1] += basePixel[1] * ss;
				this.tempPixel[2] += basePixel[2] * ss;
				this.tempPixel[3] += basePixel[3] * ss;
				countPix++;
			}
		}
		ss = 1;
		for (var jj = 0; jj < sh; jj++) {
			if (j + (jj + 1) < this._height) { // не вышли за пределы , в низ берем пиксель для мержа
				pix = this.getPixel(i, j + (jj + 1));
				this.tempPixel[0] += pix[0] * ss;
				this.tempPixel[1] += pix[1] * ss;
				this.tempPixel[2] += pix[2] * ss;
				this.tempPixel[3] += pix[3] * ss;
				countPix++;
			} else { // иначе добавляем базовый пиксель
				this.tempPixel[0] += basePixel[0] * ss;
				this.tempPixel[1] += basePixel[1] * ss;
				this.tempPixel[2] += basePixel[2] * ss;
				this.tempPixel[3] += basePixel[3] * ss;
				countPix++;
			}
			if (j - (jj + 1) > 0) { // не вышли за пределы , в вверх берем пиксель для мержа
				pix = this.getPixel(i, j - (jj + 1));
				this.tempPixel[0] += pix[0] * ss;
				this.tempPixel[1] += pix[1] * ss;
				this.tempPixel[2] += pix[2] * ss;
				this.tempPixel[3] += pix[3] * ss;
				countPix++;
			} else { // иначе добавляем базовый пиксель
				this.tempPixel[0] += basePixel[0] * ss;
				this.tempPixel[1] += basePixel[1] * ss;
				this.tempPixel[2] += basePixel[2] * ss;
				this.tempPixel[3] += basePixel[3] * ss;
				countPix++;
			}
		}
		this.tempPixel[0] = this.tempPixel[0] / (countPix);
		this.tempPixel[1] = this.tempPixel[1] / (countPix);
		this.tempPixel[2] = this.tempPixel[2] / (countPix);
		this.tempPixel[3] = this.tempPixel[3] / (countPix);
		return this.tempPixel;
	};

	this.tempPixel = [];

	this.clear = function () {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.imgData = this.ctx.getImageData(0, 0, 1, 1);
	};

	this.width = this._width;
	this.height = this._height;
	this.setColor();
	this.ctx.fillRect(0, 0, this._width, this._height);
	this.imgData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

	this.changeWH();

	function blendColors () { // миксование rgba цветов blendColors([69,109,160,255],[61,47,82,204])//return[63,59,98,255]
		var args = [];
		for (var i = 0; i < arguments.length; i++) {
			args.push(arguments[i]);
		}
		var base = [0, 0, 0, 0];
		var mix;
		var added;
		var alpha;
		var alphaBase;
		while (added = args.shift()) {
			if (typeof added[3] === 'undefined') {
				added[3] = 255;
			}

			alpha = added[3] / 255;
			alphaBase = base[3] / 255;

			if (alphaBase && alpha) {
				mix = [0, 0, 0, 0];
				mix[3] = 1 - (1 - alpha) * (1 - alphaBase); // alpha
				mix[0] = Math.round((added[0] * alpha / mix[3]) + (base[0] * alphaBase * (1 - alpha) / mix[3])); // red
				mix[1] = Math.round((added[1] * alpha / mix[3]) + (base[1] * alphaBase * (1 - alpha) / mix[3])); // green
				mix[2] = Math.round((added[2] * alpha / mix[3]) + (base[2] * alphaBase * (1 - alpha) / mix[3])); // blue
			} else if (alpha) {
				mix = added;
			} else {
				mix = base;
			}
			base = mix;
		}
		mix[3] = mix[3] * 255;// возвращяем обратно
		return mix;
	}
	this.blendColors = blendColors;

}
Object.defineProperties(PLBitmapData.prototype, {
	width: {
		set: function (value) {
			var old = this._width;
			this._width = value;
			this.changeWH();
			if (old < this._width) {
				this.setColor();
				this.ctx.fillRect(old, 0, this._width, this._height);
			}
			this.widthVisi = this._widthVisi;

		},
		get: function () {
			return this._width;
		}
	},
	height: {
		set: function (value) {
			var old = this._height;
			this._height = value;
			this.changeWH();
			if (old < this._height) {
				this.setColor();
				this.ctx.fillRect(0, old, this._width, this._height);
			}
			this.heightVisi = this._heightVisi;

		},
		get: function () {
			return this._height;
		}
	},
	widthVisi: {
		set: function (value) {
			this._widthVisi = value;
		},
		get: function () {

			return this._widthVisi;
		}
	},
	heightVisi: {
		set: function (value) {
			this._heightVisi = value;

		},
		get: function () {
			return this._heightVisi;
		}
	}
});

export function PLGalleryPanelBtn (cont, _x, _y, fun) {
	PIXI.Container.call(this);
	this.type = 'PLGalleryPanelBtn';
	cont.addChild(this);
	var self = this;
	pl102.addElement(this);

	this.fun = fun;
	this.x = _x || 0;
	this.y = _y || 0;
	this._btnWidth = 30;
	this._btnHeight = 30;
	this._width = 100;
	this._height = 100;
	this._activ = false;
	this._visiblePanel = true;
	this._boolMask = true;
	this._stepW = 2;
	this._arr = [];// данные для кнопок
	this._activMouse = true;

	this.otstupX = 0;
	this.otstupY = 0;

	this.contentPanel = new PIXI.Container();// для понели (фон)
	this.addChild(this.contentPanel);

	this.panel = new PLPanel(this.contentPanel, 0, 0);
	pl102.removeElement(this.panel, true);

	this.contentBtn = new PIXI.Container();// для кнопок(двигается)
	this.addChild(this.contentBtn);

	this.graphicsMask = new PIXI.Graphics();
	this.contentPanel.addChild(this.graphicsMask);

	this.scrol = new PLScrollBarV(this, 0, 0, function () { self.contentBtn.y = -this.scrolValue; });
	pl102.removeElement(this.scrol, true);
	this.scrol.visiBtn = this.scrol.visiBtn1 = this.scrol.visiPanel = true;
	this.scrol.otstup = 3;
	this.scrol.width = 15;

	this.arrBtn = [];// буфер кнопок

	this.draw102 = function () {
		// mask
		this.graphicsMask.clear();
		this.graphicsMask.beginFill(0xff0000, 0);
		this.graphicsMask.drawRect(0.5, 0.5, this._width - 1, this._height - 1);
		this.graphicsMask.endFill();
		if (this._boolMask) this.contentBtn.mask = this.graphicsMask;
		else this.contentBtn.mask = null;
		// panel fon
		this.panel.width = this._width;
		this.panel.height = this._height;
		// btn
		this._btnWidth = (this._width - (this.otstupX * 2)) / this._stepW;
		this._btnHeight = (this._width - (this.otstupX * 2)) / this._stepW;
		this.reposition();
		for (var i = 0; i < this.arrBtn.length; i++) {
			this.arrBtn[i].width = this._btnWidth;
			this.arrBtn[i].height = this._btnHeight;
		}
		// scrol
		this.scrol.position.set(this._width - this.scrol.width, 0);
		this.scrol.height = this._height;
		this.scrol.heightContent = this.contentBtn.height;
		this.scrol.fun();// drag scrol
		if (this.scrol.heightContent <= this.scrol.height) this.scrol.visible = false;// visibility scrol
		else this.scrol.visible = true;
	};

	this.reposition = function () {
		var x = this.otstupX, y = this.otstupY;
		this.clear();// clear buffer
		for (var i = 0; i < this._arr.length; i++) {
			var btn = this.getBtn();
			btn.position.set(x, y);
			btn.loadImeg(this._arr[i].link);
			btn.obj = this._arr[i];

			x += this._btnWidth;
			if ((i + 1) % this._stepW == 0) {
				x = 0;
				y += (this._btnHeight + this.otstupY);
			}
		}

	};

	this.updateActivMouse = function () {
		this.scrol.activMouse = this._activMouse;
		for (var i = 0; i < this.arrBtn.length; i++) {
			this.arrBtn[i].activMouse = this._activMouse;
		}
	};

	this.onDown = function () {
		if (self.fun) self.fun(this);
	};

	this.getBtn = function () { // get the buffer btn
		for (var i = 0; i < this.arrBtn.length; i++) {
			if (!this.arrBtn[i].visible) {
				this.arrBtn[i].visible = true;
				return this.arrBtn[i];
			}
		}
		var btn = new PLButton(this.contentBtn, 0, 0, '', this.onDown);
		pl102.removeElement(btn, true);
		this.arrBtn.push(btn);
		btn.visible = true;
		btn.visiblePanel = false;
		return btn;
	};

	this.clear = function () { // clear buffer btn
		for (var i = 0; i < this.arrBtn.length; i++) {
			this.arrBtn[i].visible = false;
		}
	};
	this.draw102();
}
PLGalleryPanelBtn.prototype = Object.create(PIXI.Container.prototype);
PLGalleryPanelBtn.prototype.constructor = PLGalleryPanelBtn;
Object.defineProperties(PLGalleryPanelBtn.prototype, {
	arr: {
		set: function (value) {
			for (var i = 0; i < this.arrBtn.length; i++) {
				this.arrBtn[i].activ = false;
			}
			this._arr = value || [];
			this.draw102();
		},
		get: function () {
			return this._arr;
		}
	},
	stepW: {
		set: function (value) {
			this._stepW = value;
			this.draw102();
		},
		get: function () {
			return this._stepW;
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
	boolMask: {
		set: function (value) {
			this._boolMask = value;
			this.draw102();
		},
		get: function () {
			return this._boolMask;
		}
	},
	activMouse: {
		set: function (value) {
			this._activMouse = value;
			this.updateActivMouse();
		},
		get: function () {
			return this._activMouse;
		}
	}
});

export function PLScrollBarH (cont, _x, _y, fun) {
	PIXI.Container.call(this);
	this.type = 'PLScrollBarH';
	this.typeCom = 'pixi';
	cont.addChild(this);
	var self = this;
	pl102.addElement(this);

	this.fun = fun;
	this.x = _x || 0;
	this.y = _y || 0;
	this._wh = pl102.wh - 5;
	this._height = this._wh;
	this._width = 100;
	this._value = 0; // процентное значение
	this._scrolValue = 0; //
	this._widthContent = 100; // высота контента
	this._offsetHit = 0;
	this._color = 3026478;// цвет кнопки
	this._color1 = 5526612;// когда нажали
	this._color2 = 11053224;// панели внутреней
	this._color3 = 0xdddddd;// панель внешняя
	this._activMouse = true;
	this._otstup = 0;

	this.debugVisiHit = 0;// 0 || 0.3

	this.content = new PIXI.Container();
	this.addChild(this.content);

	this.grFon = new PIXI.Graphics();
	this.content.addChild(this.grFon);

	this.panel = new PLPanel(this.content, 0, 0);
	pl102.removeElement(this.panel, true);
	this.panel.kontur = false;
	this.panel.color = this._color2;
	this.panel.width = this._width;
	this.graphics = new PIXI.Graphics();
	this.content.addChild(this.graphics);

	this.graphCover = new PIXI.Graphics();
	this.content.addChild(this.graphCover);
	this.graphCover.alpha = 0.5;
	this.graphCover.visible = false;
	this.graphCover.interactive = true;


	this.but = new PLButton(this.content, 0, 0, '', function () {
		self.onDragStart();
	});
	pl102.removeElement(this.but, true);
	this.but.height = this._wh;
	this.but.width = this._wh;

	this.downLocal = new PIXI.Point();
	this.moveLocal = new PIXI.Point();
	this.vector = new PIXI.Point();
	var pv = 0;

	this.onDragStart = function () {
		self.downLocal = self.toLocal(pl102.global);
		pv = self.value;
		if (pl102.isMouseEvents) {
			pl102.stage.off('mouseup', self.onDragEnd);
			pl102.stage.off('mousemove', self.onDragMove);
			pl102.stage.on('mouseup', self.onDragEnd);
			pl102.stage.on('mousemove', self.onDragMove);
		}
		if (pl102.isTouchEvents) {
			pl102.stage.off('touchend', self.onDragEnd);
			pl102.stage.off('touchmove', self.onDragMove);
			pl102.stage.on('touchend', self.onDragEnd);
			pl102.stage.on('touchmove', self.onDragMove);
		}
		self.onDragMove();
	};

	this.onDownStart = function () {
		setVal(((self.toLocal(pl102.global).x - self.but.width / 2) - self.otstup) / ((self._width - self.otstup * 2) - self.but.width) * 100);
		self.onDragStart();
	};

	this.onDragMove = function () {
		self.moveLocal = self.toLocal(pl102.global);
		self.vector.set(self.moveLocal.x - self.downLocal.x, self.moveLocal.y - self.downLocal.y);
		setVal(pv + (self.vector.x / ((self._width - self.otstup * 2) - self.but.width) * 100));
	};

	this.onDragEnd = function () {
		self.dragging = false;
		if (pl102.isMouseEvents) {
			pl102.stage.off('mouseup', self.onDragEnd);
			pl102.stage.off('mousemove', self.onDragMove);
		}
		if (pl102.isTouchEvents) {
			pl102.stage.off('touchend', self.onDragEnd);
			pl102.stage.off('touchmove', self.onDragMove);
		}
	};

	this.updateActivMouse = function () {
		this.but.activMouse = this._activMouse;
		this.graphCover.clear();
		this.graphCover.visible = !this._activMouse;
		this.draw102();
	};

	this.draw102 = function () {
		this.graphics.clear();
		// расширение невидимое
		this.graphics.beginFill(0xff0000, this.debugVisiHit);
		this.graphics.drawRoundedRect(0, -this.offsetHit, this._width, this._height + this.offsetHit * 2, Math.min((this.but.width - 2) / 2, (this.but.height - 2) / 2, 0.1));
		this.graphics.endFill();

		this.graphCover.clear();
		this.graphCover.beginFill(0xffffff);
		this.graphCover.drawRoundedRect(0, -this.offsetHit, this._width, this._height + this.offsetHit * 2, Math.min((this.but.width - 2) / 2, (this.but.height - 2) / 2, 0.1));
		this.graphCover.endFill();

		this.grFon.clear();
		this.grFon.beginFill(this._color3);
		this.grFon.drawRect(0, 0, this._width, this._height);
		this.grFon.endFill();

		this.but.y = this._otstup;
		this.panel.y = this._otstup;
		this.panel.x = this._otstup;
		this.but.height = this._height - this._otstup * 2;
		this.panel.height = this._height - this._otstup * 2;
		this.panel.width = this._width - this._otstup * 2;
	};

	this.kill = function () {
		if (pl102.isMouseEvents) {
			pl102.stage.off('mouseup', self.onDragEnd);
			pl102.stage.off('mousemove', self.onDragMove);
		}
		if (pl102.isTouchEvents) {
			pl102.stage.off('touchend', self.onDragEnd);
			pl102.stage.off('touchmove', self.onDragMove);
		}
		this.panel.kill();
		this.but.kill();
		this.parent = null;
	};

	if (pl102.isMouseEvents) {
		this.graphics.on('mousedown', this.onDownStart);
	}
	if (pl102.isTouchEvents) {
		this.graphics.on('touchstart', this.onDownStart);
	}
	this.graphics.interactive = true;

	if (pl102.isMouseEvents) {
		this.graphics.on('mousedown', this.onDownStart);
	}
	if (pl102.isTouchEvents) {
		this.graphics.on('touchstart', this.onDownStart);
	}
	this.graphics.interactive = true;

	function setVal (newv) { // от 0 до 100
		var v = (newv < 0 ? 0 : (newv > 100 ? 100 : newv));
		if (v != self._value) {
			self.value = v;
			if (self.fun) self.fun();
		}
	}
	this.draw102();
}
PLScrollBarH.prototype = Object.create(PIXI.Container.prototype);
PLScrollBarH.prototype.constructor = PLScrollBarH;
Object.defineProperties(PLScrollBarH.prototype, {
	otstup: {
		set: function (value) {
			if (this._otstup == value) return;
			this._otstup = value;
			var pv = this.value;
			this._value = -1;
			this.value = pv;
			this.draw102();
		},
		get: function () { return this._otstup; }
	},
	width: {
		set: function (value) {
			if (this._width == value) return;
			this._width = value;

			if (this._width + this._otstup * 2 >= this._widthContent) this.but.width = this._width - this._otstup * 2;
			else this.but.width = this._width * this._width / this._widthContent;
			if (this.but.width < this._wh) this.but.width = this._wh;

			var pv = this.value;
			this._value = -1;
			this.value = pv;
			this.draw102();
		},
		get: function () {
			return this._width;
		}
	},

	scrolValue: {
		set: function (value) {
			if (this._scrolValue == value) return;
			this._scrolValue = value;
			this.value = this._scrolValue / (this._widthContent - this._width) * 100;
		},
		get: function () { return ((this._widthContent - this._width) * this._value / 100) || 0;/* this._scrolValue; */ }
	},
	// значение  0 - 100
	value: {
		set: function (value) {
			if (this._value == value) return;
			this._value = value;
			if (isNaN(parseFloat(this._value))) this._value = 0;
			if (this._value < 0) this._value = 0;
			if (this._value > 100) this._value = 100;
			this.but.x = this._otstup + ((this._width - this._otstup * 2) - this.but.width) * (this._value / 100);
			this._scrolValue = (this._widthContent - this._width) * this._value / 100;
			if (this._scrolValue < 0) this._scrolValue = 0;
		},
		get: function () {
			return this._value;
		}
	},

	// высота контента
	widthContent: {
		set: function (value) {
			if (this._widthContent == value) return;
			this._widthContent = value;
			var vv = this._width - this._otstup * 2;
			if (vv >= this._widthContent) {
				this.but.width = vv;// -this._otstup*2;
			} else {
				var s = vv * vv / this._widthContent;
				if (s < this._wh) s = this._wh; // ставим чтоб меньше кнопка не была кнопка
				var d = s - this.but.width;
				// кнопка только по панели
				if (this.but.x + this.but.width + d > vv + this.graphics.x) this.but.x -= d;
				else if (this.but.x < 0) this.but.x = 0;
				this.but.width = s;
			}

			var pv = this.value;
			this._value = -1;
			this.value = pv;
		},
		get: function () {
			return this._widthContent;
		}
	},
	// высота скрола
	height: {
		set: function (value) {
			if (this._height == value) return;
			this._height = value;
			this.draw102();

		},
		get: function () {
			return this._height;
		}
	},
	offsetHit: {
		set: function (value) {
			if (this._offsetHit == value) return;
			this._offsetHit = value;
			this.draw102();
		},
		get: function () { return this._offsetHit; }
	},
	color: {
		set: function (value) {
			if (this._color == value) return;
			this._color = value;
			this.but.color = this._color;
			this.draw102();
		},
		get: function () { return this._color; }
	},
	color1: {
		set: function (value) {
			if (this._color1 == value) return;
			this._color1 = value;
			this.but.color1 = this._color1;
			this.draw102();
		},
		get: function () { return this._color1; }
	},
	color2: {
		set: function (value) {
			if (this._color2 == value) return;
			this._color2 = value;
			this.panel.color = this._color2;
		},
		get: function () { return this._color2; }
	},
	color3: {
		set: function (value) {
			if (this._color3 == value) return;
			this._color3 = value;
			this.draw102();
		},
		get: function () { return this._color3; }
	},
	activMouse: {
		set: function (value) {
			if (this._activMouse == value) return;
			this._activMouse = value;
			this.updateActivMouse();
		},
		get: function () { return this._activMouse; }
	}
});

export function PLScrollBarV (cont, _x, _y, fun) {
	PIXI.Container.call(this);
	this.type = 'PLScrollBarV';
	this.typeCom = 'pixi';
	cont.addChild(this);
	var self = this;
	pl102.addElement(this);

	this.fun = fun;
	this.x = _x || 0;
	this.y = _y || 0;
	this._wh = pl102.wh - 5;
	this._height = 100;
	this._width = this._wh;
	this._value = 0; // процентное значение
	this._scrolValue = 0; //
	this._heightContent = 100; // высота контента
	this._offsetHit = 0;
	this._color = 3026478;// цвет кнопки
	this._color1 = 5526612;// когда нажали
	this._color2 = 11053224;// панели внутреней
	this._color3 = 0xdddddd;// панель внешняя
	this._activMouse = true;
	this._otstup = 0;

	this.debugVisiHit = 0;// 0 || 0.3

	this.content = new PIXI.Container();
	this.addChild(this.content);

	this.grFon = new PIXI.Graphics();
	this.content.addChild(this.grFon);

	this.panel = new PLPanel(this.content, 0, 0);
	pl102.removeElement(this.panel, true);
	this.panel.kontur = false;
	this.panel.color = this._color2;
	this.panel.width = this._width;
	this.graphics = new PIXI.Graphics();
	this.content.addChild(this.graphics);

	this.graphCover = new PIXI.Graphics();
	this.content.addChild(this.graphCover);
	this.graphCover.alpha = 0.5;
	this.graphCover.visible = false;
	this.graphCover.interactive = true;


	this.but = new PLButton(this.content, 0, 0, '', function () {
		self.onDragStart();
	});
	pl102.removeElement(this.but, true);
	this.but.height = this._wh;
	this.but.width = this._wh;

	this.downLocal = new PIXI.Point();
	this.moveLocal = new PIXI.Point();
	this.vector = new PIXI.Point();
	var pv = 0;

	this.onDragStart = function () {
		self.downLocal = self.toLocal(pl102.global);
		pv = self.value;
		if (pl102.isMouseEvents) {
			pl102.stage.off('mouseup', self.onDragEnd);
			pl102.stage.off('mousemove', self.onDragMove);
			pl102.stage.on('mouseup', self.onDragEnd);
			pl102.stage.on('mousemove', self.onDragMove);
		}

		if (pl102.isTouchEvents) {
			pl102.stage.off('touchend', self.onDragEnd);
			pl102.stage.off('touchmove', self.onDragMove);
			pl102.stage.on('touchend', self.onDragEnd);
			pl102.stage.on('touchmove', self.onDragMove);
		}
		self.onDragMove();
	};

	this.onDownStart = function () {
		setVal(((self.toLocal(pl102.global).y - self.but.height / 2) - self.otstup) / (self._height - self.otstup * 2 - self.but.height) * 100);
		self.onDragStart();
	};

	this.onDragMove = function () {
		self.moveLocal = self.toLocal(pl102.global);
		self.vector.set(self.moveLocal.x - self.downLocal.x, self.moveLocal.y - self.downLocal.y);
		setVal(pv + ((self.vector.y) / (self._height - self.otstup * 2 - self.but.height) * 100));
	};

	this.onDragEnd = function () {
		self.dragging = false;
		if (pl102.isMouseEvents) {
			pl102.stage.off('mouseup', self.onDragEnd);
			pl102.stage.off('mousemove', self.onDragMove);
		}
		if (pl102.isTouchEvents) {
			pl102.stage.off('touchend', self.onDragEnd);
			pl102.stage.off('touchmove', self.onDragMove);
		}
	};

	this.updateActivMouse = function () {
		this.but.activMouse = this._activMouse;

		this.graphCover.clear();
		this.graphCover.visible = !this._activMouse;
		this.draw102();
	};

	this.draw102 = function () {
		this.graphics.clear();
		// расширение невидимое
		this.graphics.beginFill(0xff0000, this.debugVisiHit);
		this.graphics.drawRoundedRect(-this.offsetHit, 0, this._width + this.offsetHit * 2, this._height, Math.min((this.but.width - 2) / 2, (this.but.height - 2) / 2, 0.1));
		this.graphics.endFill();

		this.graphCover.beginFill(0xffffff);
		this.graphCover.drawRoundedRect(-this.offsetHit, 0, this._width + this.offsetHit * 2, this._height, Math.min((this.but.width - 2) / 2, (this.but.height - 2) / 2, 0.1));
		this.graphCover.endFill();

		this.grFon.clear();
		this.grFon.beginFill(this._color3);//
		this.grFon.drawRect(0, 0, this._width, this._height);
		this.grFon.endFill();

		this.but.x = this._otstup;
		this.panel.y = this._otstup;
		this.panel.x = this._otstup;
		this.but.width = this._width - this._otstup * 2;
		this.panel.width = this._width - this._otstup * 2;
		this.panel.height = this._height - this._otstup * 2;
	};

	this.kill = function () {
		if (pl102.isMouseEvents) {
			pl102.stage.off('mouseup', self.onDragEnd);
			pl102.stage.off('mousemove', self.onDragMove);
		}
		if (pl102.isTouchEvents) {
			pl102.stage.off('touchend', self.onDragEnd);
			pl102.stage.off('touchmove', self.onDragMove);
		}
		this.panel.kill();
		this.but.kill();
		this.parent = null;
	};

	if (pl102.isMouseEvents) {
		this.graphics.on('mousedown', this.onDownStart);
	}
	if (pl102.isTouchEvents) {
		this.graphics.on('touchstart', this.onDownStart);
	}
	this.graphics.interactive = true;

	function setVal (newv) { // от 0 до 100
		var v = (newv < 0 ? 0 : (newv > 100 ? 100 : newv));
		if (v != self._value) {
			self.value = v;
			if (self.fun) self.fun();
		}
	}
	this.draw102();

}
PLScrollBarV.prototype = Object.create(PIXI.Container.prototype);
PLScrollBarV.prototype.constructor = PLScrollBarV;
Object.defineProperties(PLScrollBarV.prototype, {

	otstup: {
		set: function (value) {
			if (this._otstup == value) return;
			this._otstup = value;

			var pv = this._value;
			this.value = -1;
			this.value = pv;
			this.draw102();
		},
		get: function () { return this._otstup; }
	},
	width: {
		set: function (value) {
			if (this._width == value) return;
			this._width = value;

			this.draw102();
		},
		get: function () {
			return this._width;
		}
	},
	scrolValue: {
		set: function (value) {
			if (this._scrolValue == value) return;
			this._scrolValue = value;
			this.value = this._scrolValue / (this._heightContent - this._height) * 100;
		},
		get: function () { return ((this._heightContent - this._height) * this._value / 100) || 0;/* this._scrolValue; */ }
	},
	// значение  0 - 100
	value: {
		set: function (value) {
			if (this._value == value) return;
			this._value = value;
			if (isNaN(parseFloat(this._value))) this._value = 0;
			if (this._value < 0) this._value = 0;
			if (this._value > 100) this._value = 100;
			this.but.y = this._otstup + ((this._height - this._otstup * 2) - this.but.height) * (this._value / 100);
			this._scrolValue = (this._heightContent - this._height) * this._value / 100;
			if (this._scrolValue < 0) this._scrolValue = 0;
		},
		get: function () {
			return this._value;
		}
	},
	// высота контента
	heightContent: {
		set: function (value) {
			if (this._heightContent == value) return;
			this._heightContent = value;
			var vv = this._height - this._otstup * 2;
			if (vv >= this._heightContent) {
				this.but.height = vv;// -this._otstup*2;
			} else {
				var s = vv * vv / this._heightContent;
				if (s < this._wh) s = this._wh; // ставим чтоб меньше кнопка не была кнопка
				var d = s - this.but.height;
				// кнопка только по панели
				if (this.but.y + this.but.height + d > vv + this.graphics.y) this.but.y -= d;
				else if (this.but.y < 0) this.but.y = 0;
				this.but.height = s;
			}
			// this.value = this._value;
			var pv = this._value;
			this.value = -1;
			this.value = pv;
		},
		get: function () {
			return this._heightContent;
		}
	},
	height: {
		set: function (value) {
			if (this._height == value) return;
			this._height = value;

			if (this._height + this._otstup * 2 >= this._heightContent) this.but.height = this._height - this._otstup * 2;
			else this.but.height = this._height * this._height / this._heightContent;
			if (this.but.height < this._wh) this.but.height = this._wh;
			var pv = this._value;
			this.value = -1;
			this.value = pv;

			this.draw102();
		},
		get: function () {
			return this._height;
		}
	},
	offsetHit: {
		set: function (value) {
			if (this._offsetHit == value) return;
			this._offsetHit = value;
			this.draw102();
		},
		get: function () { return this._offsetHit; }
	},
	color: {
		set: function (value) {
			this._color = value;
			this.but.color = this._color;
			this.draw102();
		},
		get: function () { return this._color; }
	},
	color1: {
		set: function (value) {
			this._color1 = value;
			this.but.color1 = this._color1;
			this.draw102();
		},
		get: function () { return this._color1; }
	},
	color2: {
		set: function (value) {
			this._color2 = value;
			this.panel.color = this._color2;
		},
		get: function () { return this._color2; }
	},
	color3: {
		set: function (value) {
			this._color3 = value;
			this.draw102();
		},
		get: function () { return this._color3; }
	},
	activMouse: {
		set: function (value) {
			if (this._activMouse == value) return;
			this._activMouse = value;
			this.updateActivMouse();
		},
		get: function () { return this._activMouse; }
	}
});

export function PLContur (cont, x, y) {
	PIXI.Container.call(this);
	this.type = 'PLContur';
	var self = this;
	cont.addChild(this);
	pl102.addElement(this);

	this.x = x || 0;
	this.y = y || 0;
	this._width = 100;
	this._height = 100;
	this._wh = 25;
	this._color = 0x000000;
	this._thickness = 5;

	this.innerLine = false;
	this.colorInnerLine = 0xffffff;

	this.graphics = new PIXI.Graphics();
	this.addChild(this.graphics);

	this.draw = function () {
		this.graphics.clear();
		if (this.innerLine === true) {
			this.graphics.lineStyle(Math.abs(this._thickness), this.colorInnerLine, 1);
			this.graphics.drawRect(
				this._thickness / 2 + Math.abs(this._thickness),
				this._thickness / 2 + Math.abs(this._thickness),
				this._width - (this._thickness + Math.abs(this._thickness * 2)),
				this._height - (this._thickness + Math.abs(this._thickness * 2))
			);
		}
		this.graphics.lineStyle(Math.abs(this._thickness), this._color, 1);
		this.graphics.drawRect(
			this._thickness / 2,
			this._thickness / 2,
			this._width - this._thickness,
			this._height - this._thickness
		);
		this.graphics.endFill();
	};

	this.draw();
}

PLContur.prototype = Object.create(PIXI.Container.prototype);
PLContur.prototype.constructor = PLContur;
Object.defineProperties(PLContur.prototype, {
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
	},
	color: {
		set: function (value) {
			if (this._color == value) return;
			this._color = value;
			this.draw();
		},
		get: function () {
			return this._color;
		}
	},
	thickness: {
		set: function (value) {
			if (this._thickness == value) return;
			this._thickness = value;
			this.draw();
		},
		get: function () {
			return this._thickness;
		}
	},
	wh: {
		set: function (value) {
			if (this._wh == value) return;
			this._wh = value;
			this._height = this._width = this._wh;
			this.draw();
		},
		get: function () {
			return this._wh;
		}
	}
});

export function PLColor (cont, x, y, fun, title) {
	PIXI.Container.call(this);
	this.type = 'PLColor';
	var self = this;
	pl102.addElement(this);

	this.x = x || 0;
	this.y = y || 0;

	this.fun = fun; // дергаем при нажатии на панели и кубики цветов
	this.funDown; // дергаем если клик вне компонента
	this.funSize; // дергаем при изминении размеров;
	this.funChangeVisiblePanel; // дергаем при изминении видимости;
	this.funUp;
	this.funSelectColor; // срабатывает при выборе цвета

	this._width = 180;
	this._height = pl102.wh * 2;
	this._text = title || 'COLOR'; // "null" - отображаетса номер цвета, другое - отображаетса текст
	this._value = '0xffffff';
	this._color = '0xffffff';
	this._otstup = pl102.otstup;
	this._boolActiv = true; // возможность отключить нижнюю панель
	this._colPicActiv = true; // возможность отключить панель с кубиками цветов
	this._boolPlus = false; // возможность добавлять цвета в колор пикер
	this._activMouse = true;
	this._kolElRow = 9; // количество кубиков в ряду, -1 - рисует на всю длину компонент кубики с цветами
	this._kolColor = 9; // общее количество цветов в компонент кубики с цветами

	this.colorPanelH = 130; // высота выпадающей панели
	this.btnH = pl102.wh;
	this.colorDrag = null;
	this.baseColor = '0xffffff';

	this.content = new PIXI.Container();
	cont.addChild(this.content);
	this.content.addChild(this);


	/// Графика, накрывающая кнопку
	this.graphRect = new PIXI.Graphics();
	this.content.addChild(this.graphRect);
	this.graphRect.alpha = 0.5;
	this.graphRect.interactive = true;

	this.arrColor = [0x555555, 0xff4c4c, 0x4faf5c, 0x80bece, 0xf9ae34, 0xffffff, 0x000000, 0xffd46b, 0xffb86b];
	// компонент нижняя панель выбора цвета
	this.pLColorPickerPanel = new PLColorPickerPanel(this, 0, this._height, function (_bool) {
		// цвет строка
		if (self.boolPlus) {
			self.pLColorPicker.setColor(this.color);
		}

		if (self._text == 'null') {
			self.button.text = this.color;
		}

		self.button.color = this.color;
		if (typeof self._color === 'string') {
			self._color = this.color;
			self._value = this.color;
		} else {
			self._color = +this.color;
			self._value = +this.color;
		}

		if (self.fun) self.fun();
		if (self.funSelectColor) self.funSelectColor(this.color);

		if (_bool == undefined) self.setVisiblePanel(false);
	});
	pl102.removeElement(this.pLColorPickerPanel, true);

	this.pLColorPickerPanel.funDrag = function () {
		self.button.color = this.color;
		self.colorDrag = this.colorDrag;
		if (self.funDrag) self.funDrag();
	};

	// скрытие нижней панели если клик вне компонента
	var p, intersect;
	this.mouseDown = function () {
		p = self.toLocal(pl102.global);
		intersect = self.contains(p.x, p.y);
		if (self.funDown) self.funDown();
		if (intersect == false) { self.setVisiblePanel(false); }
	};

	// проверка кликаем в компоненте или нет
	var fullHeight;
	this.contains = function (x, y) { // todo проверить с масштабирование и поворотом
		fullHeight = self.height;
		if (self.pLColorPickerPanel.activ) fullHeight += self.pLColorPickerPanel.height;
		return (x >= 0 && x <= self.width && y >= 0 && y <= fullHeight);
	};

	// скрытие нижней панели при клике
	this.colorPanelVisible = function (isVisible) {
		// кидаем компонент поверх остальных в родительском контейнере
		cont.addChild(self.content);

		self.setVisiblePanel(isVisible);
	};

	this.activSob = function (_bool) {
		if (_bool) {
			if (pl102.isMouseEvents) {
				pl102.stage.on('click', self.mouseDown);
			}

			if (pl102.isTouchEvents) {
				pl102.stage.on('tap', self.mouseDown);
			}
		} else {
			if (pl102.isMouseEvents) {
				pl102.stage.off('click', self.mouseDown);
			}

			if (pl102.isTouchEvents) {
				pl102.stage.off('tap', self.mouseDown);
			}
		}
	};

	this.setVisiblePanel = function (isVisible) {

		self.pLColorPickerPanel.activMouse = false;
		self.pLColorPickerPanel.activ = isVisible;
		self.activSob(isVisible);
		if (self.funChangeVisiblePanel) self.funChangeVisiblePanel(isVisible);
	};

	// под кнопкой
	this.btnPanel = new PLPanel(this, 0, 0);
	pl102.removeElement(this.btnPanel, true);
	this.btnPanel.image.visible = false;
	this.btnPanel.color = 0xffffff;
	// под кубиками
	this.btnPanel1 = new PLPanel(this, 0, 0);
	pl102.removeElement(this.btnPanel1, true);
	this.btnPanel1.image.visible = false;
	this.btnPanel1.color = 0xffffff;

	this.button = new PLButton(this.btnPanel, this._otstup, this._otstup, this._text, function () {
		// проверка разрешено ли открывать нижнюю панель
		if (self._boolActiv) {
			self.colorPanelVisible(!self.pLColorPickerPanel.activ);
		}

	});
	pl102.removeElement(this.button, true);
	this.button.boolAnimKontut = false;
	this.button.panel.image.visible = false;
	this.button.color = this.baseColor;

	// компонент квадратные кнопки с цветами
	this.pLColorPicker = new PLColorPicker(this.btnPanel1, this._otstup, 0, [], function () {
		// цвет - число
		if (self._text == 'null') {
			self.button.text = self.corectForBtn(this.color);
		}

		self.button.color = this.color;
		if (typeof self._color === 'string') {
			self._color = self.corectForBtn(this.color);
			self._value = self.corectForBtn(this.color);
		} else {
			self._color = this.color;
			self._value = this.color;
		}

		self.pLColorPickerPanel.setColor(this.color);

		if (self.fun) self.fun();
	});

	this.pLColorPicker.fullSizePick = this._fullSizePick;
	this.pLColorPicker.kolColor = this._kolColor;
	this.pLColorPicker.kolElRow = this._kolElRow;

	pl102.removeElement(this.pLColorPicker, true);
	// // при изминении размермеров pLColorPicker перепозиционируем
	this.pLColorPicker.funSize = function () {
		// self.reposition();
		if (self.funSize) self.funSize();
	};

	// перерисовка положений при изменении высоты ширины и цвета
	this.reposition = function () {

		this.button.height = this.btnH;
		this.button.width = this._width - this._otstup * 2;

		this.btnPanel.height = this.button.height + this._otstup * 2;
		this.btnPanel.width = this._width;

		if (this._colPicActiv) {
			this.pLColorPicker.width = this._width - this._otstup * 2;
			this.pLColorPicker.y = this._otstup;

			this.btnPanel1.height = this.pLColorPicker.height + this._otstup * 2;
			this.btnPanel1.width = this._width;
			this.btnPanel1.y = this.btnPanel.height - 1;

			this.pLColorPickerPanel.y = this.btnPanel1.y + this.btnPanel1.height + this._otstup;

			this._height = this.btnPanel.height + this.btnPanel1.height;
		} else {
			this.pLColorPickerPanel.y = this.btnPanel.height + this._otstup;
			this._height = this.btnPanel.height;
		}

		this.pLColorPickerPanel.width = this._width;
		this.pLColorPickerPanel.height = this.colorPanelH;
	};

	var color;
	// добавляем цвета
	// если пришел цвет добавим цвет
	// если пришел undefined или null добавим белый цвет
	// если пришел массив цветов добавим все цвета в общий массив
	this.addColor = function (_param) {
		if (!this._colPicActiv) this.colPicActiv = true;

		if (Array.isArray(_param)) {
			if (_param.length == 0) this.colPicActiv = false;

			this.pLColorPicker.setArray(_param);

			this.updateArrColor();
			return;
		}

		color = _param;
		if (_param == undefined || _param == null) {
			color = this.baseColor;
		}

		this.pLColorPicker.setColor(color);
		this.updateArrColor();
	};

	this.updateArrColor = function () {
		var arr = this.pLColorPicker.arrColor;

		this.arrColor = [];
		for (var i = 0; i < arr.length; i++) {
			this.arrColor.push(arr[i]);
		}
	};

	this.addColor(this.arrColor);

	// добавляем цвета
	// если пришел цвет удалим цвет
	// если пришел undefined или null удалим последный в списке
	// если пришел массив цветов удалим все цвета с массива
	this.removeColor = function (_param) {
		this.pLColorPicker.removeColor(_param);
		this.arrColor = this.pLColorPicker.arrColor;
	};

	// чистим массив с цветами
	this.clearColor = function () {
		if (this._colPicActiv) this.colPicActiv = false;
		this.pLColorPicker.clearColor();
	};
	this.changeActiv = function () {
		if (!this._activMouse) {
			this.graphRect.clear();
			this.graphRect.beginFill(pl102.color);
			this.graphRect.drawRect(this.x, this.y, this._width, this._height + this._otstup * 2);
			this.graphRect.endFill();
		} else {
			this.graphRect.clear();
		}
	};
	this.activMouse = pl102.activMouse;


	var val, s;
	this.convToCorColor = function (_val) {
		var val = _val;
		if (val == undefined || val == null) return this.baseColor;

		if (typeof (val) === 'number') {
			if (val == -1) return 0xffffff;
			if (val > 16777215) return 0xffffff;
			return val;
		}
		if (typeof (val) === 'string') {
			val = val.replace('#', 'x');
			if (val.indexOf('0x') == -1 || val.length <= 2) return this.baseColor;
			if (val.length == 4) return val + '0000';
			if (val.length == 5) return val + val.replace('0x', '');
		}

		return val;
	};

	this.compToHex = function (c) {
		var hex = c.toString(16);
		return hex.length == 1 ? '0' + hex : hex;
	};

	this.corectForBtn = function (_val, _obj) {
		if (typeof (_val) === 'string') return _val;
		var r = Math.floor(_val / (256 * 256));
		var g = Math.floor(_val / 256) % 256;
		var b = _val % 256;
		if (_obj) return {r: r, g: g, b: b};
		return '0x' + this.compToHex(r) + this.compToHex(g) + this.compToHex(b);
	};

	this.reposition();
}
PLColor.prototype = Object.create(PIXI.Container.prototype);
PLColor.prototype.constructor = PLColor;
Object.defineProperties(PLColor.prototype, {
	width: {
		set: function (value) {
			if (this._width == value) return;
			this._width = value;
			this.reposition();

		},
		get: function () {
			return this._width;
		}
	},
	height: {
		set: function (value) {
			if (this._height == value) return;
			this._height = value;
			this.reposition();

		},
		get: function () {
			return this._height;
		}
	},
	color: {
		set: function (value) {
			if (this._color == value) return;
			this._color = this.convToCorColor(value);
			this._value = this._color;

			if (this._text == 'null') {
				this.button.text = this.corectForBtn(this._color);
				this.button.color = this._color;
			} else {
				this.button.color = this._color;
			}


			this.pLColorPickerPanel.setColor(this._color);
			this.reposition();

		},
		get: function () {
			return this._color;
		}
	},
	value: {
		set: function (v) {
			if (this._value == v) return;
			this._value = this.convToCorColor(v);
			this._color = this._value;
			if (this._text == 'null') {
				this.button.text = this.corectForBtn(this._color);
				this.button.color = this._value;
			} else {
				this.button.color = this._value;
			}

			this.pLColorPickerPanel.setColor(this._value);
			this.reposition();
		},
		get: function () {
			return this._value;
		}
	},
	text: {
		set: function (value) {
			if (this._text == value) return;
			this._text = value;

			if (this._text == 'null' || this._text == null) {
				this._text = 'null';
				this.button.text = this.corectForBtn(this._color);
			} else {
				this.button.text = this._text;
			}
		},
		get: function () {
			return this._text;
		}
	},
	otstup: {
		set: function (value) {
			if (this._otstup == value) return;
			this._otstup = value;
			this.button.x = this._otstup;
			this.button.y = this._otstup;
			this.pLColorPicker.x = this._otstup;
			this.reposition();

		},
		get: function () {
			return this._otstup;
		}
	},
	boolActiv: {
		set: function (value) {
			if (this._boolActiv == value) return;
			this._boolActiv = value;
		},
		get: function () {
			return this._boolActiv;
		}
	},
	activMouse: {
		set: function (value) {
			if (this._activMouse === value) return;
			this._activMouse = value;
			if (this.pLColorPickerPanel.activ) this.colorPanelVisible(value);
			// debugger
			this.changeActiv();
		},
		get: function () {
			return this._activMouse;
		}
	},
	colPicActiv: {
		set: function (value) {
			if (this._colPicActiv == value) return;
			this._colPicActiv = value;
			if (!this._colPicActiv) this.clearColor();
			this.pLColorPicker.visible = this._colPicActiv;
			this.btnPanel1.visible = this._colPicActiv;
			this.reposition();
		},
		get: function () {
			return this._colPicActiv;
		}
	},
	boolPlus: {
		set: function (value) {
			if (this._boolPlus == value) return;
			this._boolPlus = value;
		},
		get: function () {
			return this._boolPlus;
		}
	},
	kolElRow: {
		set: function (value) {
			if (this._kolElRow == value) return;
			this._kolElRow = value;
			this.pLColorPicker.kolElRow = this._kolElRow;

			this.reposition();
		},
		get: function () {
			return this._kolElRow;
		}
	},
	kolColor: {
		set: function (value) {
			if (this._kolColor == value) return;
			this._kolColor = value;
			this.pLColorPicker.kolColor = this._kolColor;

			this.reposition();
		},
		get: function () {
			return this._kolColor;
		}
	}
});

export function PLColorPicker (cont, x, y, _arr, fun, funSize) {
	PIXI.Container.call(this);
	cont.addChild(this);
	this.type = 'PLColorPicker';
	var self = this;
	pl102.addElement(this);

	this.fun = fun;
	this.funSize = funSize; // передает размеры кнопок в компонент PLColor

	this.x = x || 0;
	this.y = y || 0;

	this._kolColor = 100; // общее ограничение цветов
	this._kolElRow = 7; // ограничение цветов в ряду, -1 - растягивает на всю длину компонента
	this._width = 100;
	this._height = pl102.wh;
	this._activContur = false;
	this._otstup = -1; // по х
	this._otstup1 = 2; // по y
	this.otstup2 = 0; // отступ контура

	this.debugContur = false;
	this.arrColor = [];
	this.arrButton = [];
	this._color = '0xffffff';
	this.color1 = 0x6d6e70;
	this.index;
	this.wh = 0;
	this.typeWH = 'width';
	this.trick = 1; // толщина линии контура

	var button;

	this.contur = new PLContur(this, -this.otstup2, -this.otstup2);
	this.contur.visible = false;
	this.contur.color = this.color1;
	this.contur.thickness = this.trick;
	if (this._activContur) this.contur.visible = true;

	this.funDown = function () {
		self.index = this.idName;
		self.color = self.arrColor[self.index];
		if (self.fun) self.fun();
	};

	// добавляем кнопки
	this.plusBut = function () {
		button = new PLButton(this, 0, 0, '', this.funDown);
		pl102.removeElement(button, true);
		button.boolAnimKontut = false;
		button.idName = this.arrButton.length;
		button.width = button.height = this._height;
		button.panel.image.visible = false;
		this.arrButton.push(button);
	};

	this.moveKontur = function (_color) {
		this.index = -1;
		for (var i = 0; i < this.arrButton.length; i++) {
			if (this.arrButton[i].color === _color) {
				this.corectPosCont(this.arrButton[i].ii, this.arrButton[i].jj);
				this.index = i;
				this.contur.visible = true;
				return;
			}
		}
		this.contur.visible = false;
	};
	var columnContur = 0;
	var rowContur = 0;
	this.corectPosCont = function (_col, _row) {
		if (_col !== undefined) columnContur = _col;
		if (_row !== undefined) rowContur = _row;
		this.contur.x = columnContur * (this.wh + this._otstup) - this.otstup2;
		this.contur.y = rowContur * (this.wh + this._otstup1) - this.otstup2;
	};
	// растовляет элементы
	this.draw = function () {
		this.corectWH();

		if (this.arrColor.length > this.arrButton.length) {
			this.plusBut();
			this.addChild(this.contur);
			this.draw();
			return;
		}

		for (var i = 0; i < this.arrButton.length; i++) {
			if (this.arrColor[i] != undefined) this.arrButton[i].color = this.arrColor[i];
		}

		for (var i = 0; i < this.arrButton.length; i++) {
			if (this.arrColor.length > i && i < this._kolColor) this.arrButton[i].visible = true;
			else this.arrButton[i].visible = false;
		}

		this.reposition();
		if (this.funSize) this.funSize();
		if (this.debugContur) this.drawDebCont();
	};

	this.calcRows = function () {
		var k = this.arrColor.length;
		if (this._kolColor < this.arrColor.length) k = this._kolColor;

		if (k <= this._kolElRow) return 1;
		var r = (k / this._kolElRow + '').split('.');
		if (r.length == 1) return +r[0];
		return (+r[0]) + 1;
	};

	var m = 0, m1 = 0, m2 = 0, ck = 1;
	this.corectWH = function () {
		if (this.typeWH == 'width') {
			if (this._kolElRow == -1) {
				m = this._width - this._otstup * (this.arrColor.length - 1);
				m1 = m / this.arrColor.length;
				this.wh = m1;
				this._height = m1;
			} else {
				m = this._width - this._otstup * (this._kolElRow - 1);
				m1 = m / this._kolElRow;
				this.wh = m1;
				ck = this.calcRows();
				this._height = this.wh * ck + this._otstup1 * (ck - 1);
			}
		}

		if (this.typeWH == 'height') {
			if (this._kolElRow == -1) {
				m = this._height * this.arrColor.length;
				m1 = this._otstup * (this.arrColor.length - 1);
				this.wh = this._height;
				this._width = m + m1;
			} else {
				ck = this.calcRows();
				m2 = (this._height - this._otstup1 * (ck - 1)) / ck;
				this.wh = m2;
				m = m2 * this._kolElRow;
				m1 = this._otstup * (this._kolElRow - 1);
				this._width = m + m1;
			}
		}
	};


	// перерисовка кнопок при инменении размеров
	this.reposition = function () {
		var row = 1;
		var ii = 0;
		var jj = 0;

		for (var i = 0; i < this.arrButton.length; i++) {

			if (this.arrButton[i].visible == true) {
				this.arrButton[i].ii = ii;
				this.arrButton[i].jj = jj;
				this.arrButton[i].width = this.wh;
				this.arrButton[i].height = this.wh;
				this.contur.width = this.wh + this.otstup2 * 2;
				this.contur.height = this.wh + this.otstup2 * 2;
				this.arrButton[i].x = ii * (this.wh + this._otstup);
				this.arrButton[i].y = jj * (this.wh + this._otstup1);
			}

			if (this._kolElRow != -1) {
				ii++;
				if (ii >= this._kolElRow) {
					jj++;
					ii = 0;
				}
			} else {
				ii++;
			}
		}

		if (this.funSize) this.funSize();
	};

	var graphDeb;
	this.drawDebCont = function () {
		if (!graphDeb) {
			graphDeb = new PIXI.Graphics();
			this.addChild(graphDeb);
		}

		graphDeb.clear();
		graphDeb.lineStyle(1, 0xff0000);
		graphDeb.drawRect(0, 0, this.width, this.height);
	};

	// получаем массив цветов и перерисовываем
	this.setArray = function (_arr) {
		for (var i = 0; i < _arr.length; i++) {
			this.arrColor.push(_arr[i]);
		}
		this.draw();
	};

	// получаем цвет и добавляем в начало массива
	this.setColor = function (_color) {
		this.color = _color;
		if (this.arrColor.length != 0) this.arrColor.pop();
		this.arrColor.unshift(_color);
		this.draw();
	};
	// добавляем цвета
	// если пришел цвет удалим цвет
	// если пришел undefined или null удалим последный в списке
	// если пришел массив цветов удалим все цвета с массива
	this.removeColor = function (_param) {
		if (_param == undefined || _param == null) {
			this.arrColor.pop();
			return;
		}
		if (Array.isArray(_param)) {
			for (var i = 0; i < _param.length; i++) {
				for (var j = 0; j < this.arrColor.length; j++) {
					if (_param[i] == this.arrColor[j]) {
						this.arrColor.splice(j, 1);
					}
				}
			}
		} else {
			for (var i = 0; i < this.arrColor.length; i++) {
				if (this.arrColor[i] == _param) {
					this.arrColor.splice(i, 1);
				}
			}
		}

		this.draw();
	};

	this.clearColor = function () {
		this.arrColor.length = 0;
		this.draw();
	};
}

PLColorPicker.prototype = Object.create(PIXI.Container.prototype);
PLColorPicker.prototype.constructor = PLColorPicker;
Object.defineProperties(PLColorPicker.prototype, {
	color: {
		set: function (value) {
			if (this._color == value) return;
			this._color = value;
			this.moveKontur(this._color);
		},
		get: function () {
			return this._color;
		}
	},
	width: {
		set: function (value) {
			if (this._width == value) return;
			this._width = value;
			this.typeWH = 'width';
			this.draw();
			this.corectPosCont();
		},
		get: function () {
			return this._width;
		}
	},
	height: {
		set: function (value) {
			if (this._height == value) return;
			this._height = value;
			this.typeWH = 'height';
			this.draw();
			this.corectPosCont();
		},
		get: function () {
			return this._height;
		}
	},
	kolColor: {
		set: function (value) {
			if (this._kolColor == value) return;
			this._kolColor = value;
			this.draw();
		},
		get: function () {
			return this._kolColor;
		}
	},
	kolElRow: {
		set: function (value) {
			if (this._kolElRow == value) return;
			this._kolElRow = Math.round(value);
			this.draw();

		},
		get: function () {
			return this._kolElRow;
		}
	},
	activContur: {
		set: function (value) {
			if (this._activContur == value) return;
			this._activContur = value;
			this.contur.visible = this._activContur;
		},
		get: function () {
			return this._activContur;
		}
	},
	otstup: {
		set: function (value) {
			if (this._otstup == value) return;
			this._otstup = value;
			this.draw();
		},
		get: function () {
			return this._otstup;
		}
	},
	otstup1: {
		set: function (value) {
			if (this._otstup1 == value) return;
			this._otstup1 = value;
			this.draw();
		},
		get: function () {
			return this._otstup1;
		}
	}
});

export function PLColorPick (cont, x, y, fun) {
	PIXI.Container.call(this);
	cont.addChild(this);
	this.type = 'PLColorPickDeb';
	var self = this;
	pl102.addElement(this);

	this.fun = fun;
	this.funDrag;
	this.funOut;

	this.x = x || 0;
	this.y = y || 0;
	this._width = 148;
	this._height = 77;
	this._activMouse = true;
	this._konturColor = pl102.color1;

	this.color = '0xffffff';
	this.colorDrag = '0xffffff';
	this.interactive = true;
	this.dragEvent = true; // возможность отключить выбор цвета по движению
	this.colorBuffer; // сохраняем цвет при клике


	/// Графика, накрывающая кнопку
	this.graphRect = new PIXI.Graphics();
	this.addChild(this.graphRect);
	this.graphRect.alpha = 0.5;
	this.graphRect.interactive = true;

	this._activ = false;

	// сюда грузим канвас и полуем цвет по координатам
	this.bmp = new PLBitmapData();
	pl102.removeElement(this.bmp, true);
	this.bmp.width = this._width;
	this.bmp.height = this._height;

	// график для канваса
	this.sprite = new PIXI.Sprite();
	this.addChild(this.sprite);

	this.graphicsBorder = new PIXI.Graphics();
	this.addChild(this.graphicsBorder);

	this.graphColKont = new PIXI.Graphics();
	this.addChild(this.graphColKont);
	this.graphCol = new PIXI.Graphics();
	this.addChild(this.graphCol);

	// создаем канвас и набиваем цветами
	this.canvas = document.createElement('canvas');
	this.c2d = this.canvas.getContext('2d');
	this.canvas.width = this._width;
	this.canvas.height = this._height;

	this.hexToRgb = function (color) {
		var cache = /^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/.exec(color);
		return { r: parseInt(cache[1], 16), g: parseInt(cache[2], 16), b: parseInt(cache[3], 16) };
	};

	this.decStrToRgb = function (color) {
		var cache = /^0x([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/.exec(color);
		return { r: parseInt(cache[1], 16), g: parseInt(cache[2], 16), b: parseInt(cache[3], 16) };
	};

	this.hue = [
		['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'],
		['#FFFAFA', '#FFFFFA', '#FFFFFA', '#FAFFFF', '#FAFFFF', '#FFFAFF', '#FFFAFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'],
		['#FFC2C2', '#FFFFC2', '#F9FFC2', '#C2FFFF', '#C2FFFF', '#FFC2FF', '#FFC2FF', '#FFF1F1', '#FFFFFF', '#D1D1D1', '#D1D1D1'],
		['#FF8A8A', '#FFFF8A', '#C1FF8A', '#8AFFFF', '#8AFFFF', '#F18AFF', '#FF8AFF', '#FFB9B9', '#FFFFFF', '#999999', '#999999'],
		['#FF5151', '#FFFF51', '#88FF51', '#51FFF8', '#51C8FF', '#B851FF', '#FF51FF', '#FF8080', '#FFFFFF', '#606060', '#606060'],
		['#FF1919', '#FFFF19', '#50FF19', '#19FFC0', '#1990FF', '#8019FF', '#FF19D0', '#FF4848', '#FFFFFF', '#282828', '#282828'],
		['#E10000', '#E1CA00', '#30E100', '#00E193', '#0069E1', '#5A00E1', '#E100A1', '#E12929', '#D2D2D2', '#0D0D0D', '#0D0D0D'],
		['#A80000', '#A89700', '#24A800', '#00A86E', '#004EA8', '#4300A8', '#A80078', '#A81E1E', '#9D9D9D', '#090909', '#090909'],
		['#700000', '#706500', '#187000', '#007049', '#003470', '#2D0070', '#700050', '#701414', '#686868', '#060606', '#060606'],
		['#380000', '#383200', '#0C3800', '#003824', '#001A38', '#160038', '#380028', '#380A0A', '#343434', '#030303', '#030303'],
		['#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000']
	];

	var colAdeb, colBdeb;
	this.wTon = 0;
	var procTon = 0.3;
	this.draw = function () {


		this.bmp.width = Math.floor(this._width); // в PLBitmapData нужно передавать целое число
		this.bmp.height = Math.floor(this._height);

		this.c2d.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.canvas.width = this._width;
		this.canvas.height = this._height;

		// алгоритм отрисовки градиента с PXColor
		this.wX = Math.round(this._width / 9.0909);
		this.wY = Math.round(this._height / 9.0909);

		var i, j, k;

		this._wColor;
		this._wColor1;

		this._hColor;
		this._hColor1;
		this._rr;
		this._gg;
		this._bb;
		this.colorA;
		this.colorB;

		for (i = 0; i < this.hue.length - 1; i++) {

			for (j = 0; j < this.hue[i].length - 1; j++) {

				this._wColor = this.hexToRgb(this.hue[i][j]);
				this._wColor1 = this.hexToRgb(this.hue[i][j + 1]);

				this._hColor = this.hexToRgb(this.hue[i + 1][j]);
				this._hColor1 = this.hexToRgb(this.hue[i + 1][j + 1]);

				for (k = 0; k < this.wX; k++) {
					this._rr = this._wColor.r + Math.round((this._wColor1.r - this._wColor.r) * (k / (this.wX - 1)));
					this._gg = this._wColor.g + Math.round((this._wColor1.g - this._wColor.g) * (k / (this.wX - 1)));
					this._bb = this._wColor.b + Math.round((this._wColor1.b - this._wColor.b) * (k / (this.wX - 1)));
					this.colorA = 'rgb(' + this._rr + ',' + this._gg + ',' + this._bb + ')';

					this._rr = this._hColor.r + Math.round((this._hColor1.r - this._hColor.r) * (k / (this.wX - 1)));
					this._gg = this._hColor.g + Math.round((this._hColor1.g - this._hColor.g) * (k / (this.wX - 1)));
					this._bb = this._hColor.b + Math.round((this._hColor1.b - this._hColor.b) * (k / (this.wX - 1)));
					this.colorB = 'rgb(' + this._rr + ',' + this._gg + ',' + this._bb + ')';
					this.grd = this.c2d.createLinearGradient(0, this.wY * i, 0, this.wY * i + this.wY);
					this.grd.addColorStop(0, this.colorA);
					this.grd.addColorStop(1, this.colorB);
					this.c2d.fillStyle = this.grd;
					this.c2d.fillRect(j * this.wX + k, this.wY * i, 1, this.wY);
				}
			}
		}

		// саменяем канвас с PLBitmapData на свой
		this.bmp.setCanvas(self.canvas, self.c2d);

		this.sprite.texture = PIXI.Texture.fromCanvas(this.bmp.canvas);
		this.sprite.width = this._width;
		this.sprite.height = this._height;

		this.drawKontur();

		this.wTon = this._width - self.wX * 2 - self.wX * procTon;
	};

	this.drawKontur = function () {
		// рисуем рамку компонента
		this.graphicsBorder.clear();
		this.graphicsBorder.lineStyle(1, this.konturColor, 1);
		this.graphicsBorder.drawRect(0, 0, this._width, this._height);
		this.graphicsBorder.endFill();
	};

	var imageData, data, conv, maxd = 0, wd;
	this.getwTon = function () {
		imageData = this.c2d.getImageData(self.wX * 6, this._height / 2, self.wX, 1);
		data = imageData.data;
		for (var i = 0; i < data.length; i += 4) {
			conv = this.rgbToHsl(data[i], data[i + 1], data[i + 2]);
			if (maxd < conv[0]) {
				wd = i / 4;
			}
		}
		return wd;
	};


	var colhsl, colrgb, colrgbr;
	var posColor = new PIXI.Point();
	var rezD;
	this.findCordFromColor = function (_color) {
		colrgbr = this.decStrToRgb(_color);
		colrgb = [colrgbr.r, colrgbr.g, colrgbr.b];
		colhsl = this.rgbToHsl(colrgbr.r, colrgbr.g, colrgbr.b);
		// позиция точки выбранного цвета относительно пришедшего цвета
		posColor.x = this.wTon * colhsl[0];
		posColor.y = this._height - this._height * colhsl[2];

		if (colhsl[0] == 0) {
			rezD = this.getColData(colrgb, self.wX * 7, 0, 1, this._height);
			posColor.x = self.wX * 7;
			posColor.y = rezD[3];
		}

		if (colhsl[0] == 0 && colhsl[1] == 0) {
			rezD = this.getColData(colrgb, self.wX * 8, 0, 1, this._height);
			posColor.x = self.wX * 8;
			posColor.y = rezD[3];
		}

		return posColor;
	};


	this.getNearestRGB = function (_colorRGB, _arrRGB) {

		var minDistance = Number.MAX_SAFE_INTEGER;
		var nearestRGB = [0, 0, 0, 0];

		for (var i = 0; i < _arrRGB.length; i++) {
			var curColor = _arrRGB[i];

			var distance = Math.sqrt(
				Math.pow((_colorRGB[0] - curColor[0]), 2) +
                Math.pow((_colorRGB[1] - curColor[1]), 2) +
                Math.pow((_colorRGB[2] - curColor[2]), 2)
			);

			if (distance < minDistance) {
				minDistance = distance;
				nearestRGB = curColor;
			}
		}

		return nearestRGB;
	};

	var dDataVert;
	var dDaVert;
	this.getColData = function (_rgb, _x, _y, _w, _h) {

		dDataVert = this.c2d.getImageData(_x, _y, _w, _h);
		dDaVert = this.getArrCol(dDataVert);

		return this.getNearestRGB(_rgb, dDaVert);
	};

	var arrDataConv = [];
	var arrcf = [];
	this.getArrCol = function (_arr) {

		arrDataConv = [];
		for (var i = 0; i < _arr.data.length; i += 4) {
			arrcf = [];
			arrcf[0] = _arr.data[i];
			arrcf[1] = _arr.data[i + 1];
			arrcf[2] = _arr.data[i + 2];
			arrcf[3] = i / 4;
			arrDataConv.push(arrcf);
		}

		return arrDataConv;
	};

	// сюда приходит цвет
	var brigh, newPosCol, ccolor;
	this.bmpCord = {};
	this.bmpCord.xpr = 0;
	this.bmpCord.ypr = 0;
	this.setColor = function (_color, _par, _pos) {

		ccolor = _color;

		if (typeof (ccolor) === 'number') ccolor = this.numDecToDecStr(_color);
		if (ccolor.indexOf('#') != -1) ccolor = _color.replace('#', '0x');
		if (_pos != undefined) this.bmpCord = _pos;

		newPosCol = this.findCordFromColor(ccolor);

		this.bmpPos.x = newPosCol.x;
		this.bmpPos.y = newPosCol.y;

		colorArr = this.bmp.getPixel(Math.round(this.bmpPosCor.x), Math.round(this.bmpPos.y));

		this.drawContCol('drag');

		if (_par == 'click') {
			this.drawContCol('click');
			this.drawContCol('out');
			this.color = ccolor;
		}

		if (_par == 'out') this.drawContCol('out');
	};

	this.setColorRGB = function (_rgb) {
		var dec = this.rgbToDecStr(_rgb);
		this.setColor(dec.replace('0x', '#'), 'click');
	};

	this.componentToHex = function (c) {
		var hex = c.toString(16);
		return hex.length == 1 ? '0' + hex : hex;
	};

	this.numDecToDecStr = function (_val) {
		if (typeof (_val) === 'string') return _val;
		var r = Math.floor(_val / (256 * 256));
		var g = Math.floor(_val / 256) % 256;
		var b = _val % 256;
		return '0x' + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
	};

	this.getNewBrightnessColorOne = function (hexcode) {
		var r = parseInt(hexcode.slice(2, 4), 16),
			g = parseInt(hexcode.slice(4, 6), 16),
			b = parseInt(hexcode.slice(6, 8), 16),
			HSL = this.rgbToHsl(r, g, b);
		return 100 - (Math.round(HSL[2] * 100));
	};

	// конвертируем цвет с RGB в HSL
	this.rgbToHsl = function (r, g, b) {
		r /= 255, g /= 255, b /= 255;
		var max = Math.max(r, g, b),
			min = Math.min(r, g, b);
		var h, s, l = (max + min) / 2;

		if (max == min) {
			h = s = 0; // achromatic
		} else {
			var d = max - min;
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
			switch (max) {
				case r:
					h = (g - b) / d + (g < b ? 6 : 0);
					break;
				case g:
					h = (b - r) / d + 2;
					break;
				case b:
					h = (r - g) / d + 4;
					break;
			}
			h /= 6;
		}
		return [h, s, l];
	};

	// вспомогательная функция для rgbToDecStr
	this.cap = function (comp) {
		return (comp.length == 1) ? '0' + comp : comp;
	};

	// переводим с rgb в hex
	this.rgbToDecStr = function (rgbArr) {
		if (rgbArr == undefined) return '0x000000';
		return '0x' + self.cap(rgbArr[0].toString(16)) + self.cap(rgbArr[1].toString(16)) + self.cap(rgbArr[2].toString(16));
	};

	this.rgb2hsl = function (r, g, b) {
		r /= 255, g /= 255, b /= 255;
		var max = Math.max(r, g, b), min = Math.min(r, g, b);
		var h, s, l = (max + min) / 2;

		if (max == min) {
			h = s = 0; // achromatic
		} else {
			var d = max - min;
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
			switch (max) {
				case r: h = (g - b) / d + (g < b ? 6 : 0); break;
				case g: h = (b - r) / d + 2; break;
				case b: h = (r - g) / d + 4; break;
			}
			h /= 6;
		}

		return [h, s, l];
	};

	this.hue2rgb = function (p, q, t) {
		if (t < 0) t += 1;
		if (t > 1) t -= 1;
		if (t < 1 / 6) return p + (q - p) * 6 * t;
		if (t < 1 / 2) return q;
		if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
		return p;
	};

	this.hslToRgb = function (h, s, l) {
		var r, g, b;

		if (s == 0) {
			r = g = b = l; // achromatic
		} else {
			this.hue2rgb(p, q, t);

			var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
			var p = 2 * l - q;
			r = this.hue2rgb(p, q, h + 1 / 3);
			g = this.hue2rgb(p, q, h);
			b = this.hue2rgb(p, q, h - 1 / 3);
		}

		return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
	};

	// получаем цвет по координатам
	var i, j, colorArr = [255, 255, 255, 255], colorCont;
	this.getColor = function () {
		self.bmpCord.xpr = self.bmpPos.x / this._width;
		self.bmpCord.ypr = self.bmpPos.y / this._height;
		i = Math.round(self.bmpPos.x);
		j = Math.round(self.bmpPos.y);
		// получаем цвет в виде [0, 0, 0, 0]
		colorArr = self.bmp.getPixel(Math.round(i), Math.round(j));
		return self.rgbToDecStr(colorArr);
	};

	var stepo, stept;
	// определяем цвет точки выбранного цвета (светлее\темнее)
	this.getColCont = function (_color) {
		stepo = self.rgb2hsl(_color[0], _color[1], _color[2]);
		stepo[0] = 0;
		stepo[1] = 0;
		stepo[2] = 1 - stepo[2];
		stept = this.hslToRgb(stepo[0], stepo[1], stepo[2]);
		return this.rgbToDecStr(stept);
	};

	var xf, yf, xc, yc, bool, col, colq;
	var sizCic = 2;
	// true - отрисовка позиции что таскаем
	// false - отрисовка позиции цвета что выбрали
	// "out" - вернем отрисовку позиции что таскаем в положения выбранного цвета
	this.drawContCol = function (_bool) {
		bool = _bool;

		xf = this.bmpPos.x;
		yf = this.bmpPos.y;
		colorCont = self.getColCont(colorArr);

		colq = colorCont;

		if (bool == 'out') {
			xf = xc;
			yf = yc;
			colq = col;
			this.bmpPos.x = this.bmpPosCor.x;
			bool = 'drag';
		}

		if (xf < sizCic) xf = sizCic;
		if (yf < sizCic) yf = sizCic;
		if (xf > this._width - sizCic) xf = this._width - sizCic;
		if (yf > this._height - sizCic) yf = this._height - sizCic;

		if (bool == 'drag') {
			this.graphCol.clear();
			if (xf == undefined || yf == undefined) return;

			this.graphCol.beginFill(colq, 1);
			this.graphCol.drawCircle(xf, yf, sizCic);
			this.graphCol.endFill();
		}

		if (bool == 'click') {
			xc = this.bmpPos.x;
			yc = this.bmpPos.y;
			col = colq;
			this.graphColKont.clear();
			this.graphColKont.lineStyle(1, colq, 1);
			this.graphColKont.drawCircle(xf, yf, sizCic);
			this.graphColKont.endFill();
		}
	};

	// кликаем и берем цвет
	this.colorClick = function () {

		self.color = self.colorDrag;

		self.bmpPosCor.x = self.bmpPos.x;
		self.bmpPosCor.y = self.bmpPos.y;

		self.drawContCol('click');

		if (self.fun) self.fun();
	};

	// двигаем и берем цвет

	this.bmpPos = {};
	this.bmpPos.x = 0;
	this.bmpPos.y = 0;
	this.bmpPosCor = {};
	this.bmpPosCor.x = 0;
	this.bmpPosCor.y = 0;
	this.colorMove = function () {

		self.bmpPos = self.toLocal(pl102.global);

		if (self.bmpPos.x < 0 || self.bmpPos.y < 0 || self.bmpPos.x > self._width || self.bmpPos.y > self._height) {
			self.mouseOut();
			return;
		}

		self.colorDrag = self.getColor();

		self.drawContCol('drag');

		if (self.funDrag) self.funDrag();
	};

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

	// вышли из компонента
	this.mouseOut = function () {

		self.colorDrag = self.color;

		self.drawContCol('out');

		if (pl102.isMouseEvents) {
			this.off('mousemove', this.colorMove);
		}
		if (pl102.isTouchEvents) {
			this.off('touchmove', this.colorMove);
		}
		if (pl102.isMouseEvents) {
			this.on('mouseover', this.colorMove);
		}

		if (self.funOut) self.funOut();
	};
	// зашли в область компонента
	this.mouseOver = function () {

		if (pl102.isMouseEvents) {
			this.on('mousemove', this.colorMove);
		}
		if (pl102.isTouchEvents) {
			this.on('touchmove', this.colorMove);
		}
		if (pl102.isMouseEvents) {
			this.off('mouseover', this.colorMove);
		}
	};

	this.draw();
}

PLColorPick.prototype = Object.create(PIXI.Container.prototype);
PLColorPick.prototype.constructor = PLColorPick;
Object.defineProperties(PLColorPick.prototype, {
	width: {
		set: function (value) {

			if (this._width == value) return;
			if (value < 25) {
				this._width = 25;
			} else { this._width = value; }

			this.draw();
			this.bmpPosCor.x = this._width;
		},
		get: function () {
			return this._width;
		}
	},
	height: {
		set: function (value) {

			if (this._height == value) return;
			if (value < 25) {
				this._height = 25;
			} else { this._height = value; }

			this.draw();
		},
		get: function () {
			return this._height;
		}
	},
	activ: {
		set: function (value) {
			if (this._activ == value) return;
			this._activ = value;

			if (this._activ) {
				if (pl102.isMouseEvents) {
					this.on('click', this.colorClick);
				}
				if (pl102.isTouchEvents) {
					this.on('tap', this.colorClick);
				}
				if (pl102.isMouseEvents) {
					this.on('mouseover', this.mouseOver);
				}

			} else {

				if (pl102.isMouseEvents) {
					this.off('click', this.colorClick);
				}
				if (pl102.isTouchEvents) {
					this.off('tap', this.colorClick);
				}
				if (pl102.isMouseEvents) {
					this.off('mouseover', this.mouseOver);
				}
			}

		},
		get: function () {
			return this._activ;
		}
	},
	konturColor: {
		set: function (value) {
			if (this._konturColor == value) return;
			this.drawKontur();
		},
		get: function () {
			return this._konturColor;
		}
	}
});

export function PLColorPickerPanel (cont, x, y, fun, funDrag) {
	PIXI.Container.call(this);
	this.type = 'PLColorPickerPanel';
	var self = this;
	cont.addChild(this);
	pl102.addElement(this);

	this.fun = fun;
	this.funDrag = funDrag; // таскаем мышу внутри компонента
	this.x = x || 0;
	this.y = y || 0;
	this._width = 180;
	this._height = 100;
	this._otstup = pl102.otstup;

	this.color = '0x000000';
	this.colorDrag = '0x000000';
	this.text = '';
	this.gradientView = true; // возможность отключить компонент gradient
	this.inputRGBView = true; // возможность отключить компонент inputRGB

	this._activ = false;
	this.visible = this._activ;

	this.panel = new PLPanel(this);
	pl102.removeElement(this.panel, true);
	this.panel.image.visible = false;
	this.panel.color = 0xffffff;
	this.panel.width = this._width;
	this.panel.height = this._height;

	// компонент градиент пришедшего цвета от белого к черному
	this.gradient = new PLGradient(this, this._otstup + 1, this._otstup + 1);
	pl102.removeElement(this.gradient, true);

	// получаем цвет по клику
	this.gradient.fun = function () {
		self.color = this.color;
		self.pLColorPick.setColor(this.color.replace('0x', '#'), 'click');
		self.pLInputRGB.setColor(this.color.replace('0x', '#'));
		if (self.fun) self.fun();
	};

	// получаем цвет по движению мыши
	this.gradient.funDrag = function () {

		self.color = this.colorDrag;
		self.colorDrag = this.colorDrag;

		self.pLColorPick.setColor(this.colorDrag.replace('0x', '#'));
		self.pLInputRGB.setColor(this.colorDrag.replace('0x', '#'));

		if (self.funDrag) self.funDrag();
	};

	this.gradient.funOut = function () {

		self.color = this.color;
		self.pLColorPick.setColor(this.colorDrag.replace('0x', '#'), 'out');
		self.pLInputRGB.setColor(this.color.replace('0x', '#'));

		if (self.funDrag) self.funDrag();
	};


	// компонент цветовая палитра
	this.pLColorPick = new PLColorPick(this, 0, this._otstup + 1);
	pl102.removeElement(this.pLColorPick, true);
	this.pLColorPick.fun = function () {
		self.color = this.color;
		self.gradient.setColor(this.color.replace('0x', '#'), 'click');
		self.pLInputRGB.setColor(this.color.replace('0x', '#'));
		if (self.fun) self.fun();

	};
	// получаем цвет по движению мыши
	this.pLColorPick.funDrag = function () {

		self.color = this.colorDrag;
		self.colorDrag = this.colorDrag;

		self.gradient.setColor(this.colorDrag.replace('0x', '#'));
		self.pLInputRGB.setColor(this.colorDrag.replace('0x', '#'));

		if (self.funDrag) self.funDrag();
	};

	this.pLColorPick.funOut = function () {

		self.color = this.color;

		self.gradient.setColor(this.color.replace('0x', '#'));
		self.pLInputRGB.setColor(this.color.replace('0x', '#'));

		if (self.funDrag) self.funDrag();
	};

	this.hexFromDec = function (decimal) {
		var code = Math.round(decimal).toString(16);
		(code.length > 1) || (code = '0' + code);
		return code;
	};

	var hexcode;
	this.setColorRGB = function (color) {
		hexcode = '0x' + this.hexFromDec(color[0]) + this.hexFromDec(color[1]) + this.hexFromDec(color[2]);
		return hexcode;
	};

	function componentToHex (c) {
		var hex = c.toString(16);
		return hex.length == 1 ? '0' + hex : hex;
	}

	this.corectCol = function (_val) {
		if (typeof _val === 'string') {
			if (_val.indexOf('0x') != -1) return _val.replace('0x', '#');
			else return _val;
		}
		var r = Math.floor(_val / (256 * 256));
		var g = Math.floor(_val / 256) % 256;
		var b = _val % 256;
		return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
	};


	this.setColor = function (_color) {

		var color = this.corectCol(_color);
		self.color = color;

		self.gradient.setColor(color, 'click');
		self.pLInputRGB.setColor(color);
		self.pLColorPick.setColor(color, 'click');
	};

	// компонент инпуты для воода цвета RGB
	this.pLInputRGB = new PLInputRGB(this, 0, 0, function () {
		self.color = self.setColorRGB(this.color);
		self.gradient.setColorRGB(this.color);
		self.pLColorPick.setColorRGB(this.color);
		if (self.fun) self.fun(false);
	});
	pl102.removeElement(this.pLInputRGB, true);

	// для перерисовки элементов компонента
	this.reposition = function () {
		this.panel.width = this._width;
		this.panel.height = this._height;
		this.gradient.width = (this._width * 13) / 100;
		this.gradient.height = (this._height * 77) / 100;
		this.pLColorPick.width = Math.round(this._width - this.gradient.width - this._otstup * 4 - 1);
		this.pLColorPick.height = Math.round((this._height * 77) / 100);
		this.pLColorPick.x = this.gradient.width + this._otstup * 3;
		this.pLInputRGB.width = this.pLColorPick.width;
		this.pLInputRGB.height = this._height - this.pLColorPick.height - this._otstup * 4;
		this.pLInputRGB.x = this.pLColorPick.x;
		this.pLInputRGB.y = this.pLColorPick.height + this._otstup * 2 + 1;
		// если отключили компонент gradient
		if (this.gradientView == false) {
			this.pLColorPick.width = Math.round(this._width - this._otstup * 3);
			this.pLColorPick.x = this._otstup + 1;
			this.pLInputRGB.width = this.pLColorPick.width;
			this.pLInputRGB.x = this._otstup;
		}
		// если отключили компонент inputRGB
		if (this.inputRGBView == false) {
			this.pLColorPick.height = this._height - this._otstup * 3;
			this.gradient.height = this.pLColorPick.height;
		}
	};
	this.reposition();

	// отключаем компонент inputRGB и перерисовываем остальные компоненты
	this.inputRGBOff = function (value) {
		this.inputRGBView = !value;
		this.pLInputRGB.visible = !value;
		this.reposition();
	};

	// отключаем компонент gradient и перерисовываем остальные компоненты
	this.gradientOff = function (value) {
		this.gradientView = !value;
		this.gradient.visible = !value;
		this.reposition();
	};

	this.changeActiv = function () {
		if (!this._activMouse) {
			this.inputRGBOff(true);
			this.gradientOff(true);
			this.graphRect.clear();
			this.graphRect.beginFill(pl102.color);
			this.graphRect.drawRect(0, 0, this._width, this._height);
			this.graphRect.endFill();
		} else {
			this.inputRGBOff(false);
			this.gradientOff(false);
			this.graphRect.clear();
		}
	};
}

PLColorPickerPanel.prototype = Object.create(PIXI.Container.prototype);
PLColorPickerPanel.prototype.constructor = PLColorPickerPanel;
Object.defineProperties(PLColorPickerPanel.prototype, {
	width: {
		set: function (value) {
			if (this._width == value) return;
			this._width = value;
			this.reposition();
		},
		get: function () {
			return this._width;
		}
	},
	height: {
		set: function (value) {
			if (this._height == value) return;
			this._height = value;
			this.reposition();
		},
		get: function () {
			return this._height;
		}
	},
	activ: {
		set: function (value) {
			if (this._activ == value) return;
			this._activ = value;
			this.visible = this._activ;
			this.pLColorPick.activ = this._activ;
			this.gradient.activ = this._activ;
		},
		get: function () {
			return this._activ;
		}
	}

});

export function PLGradient (cont, x, y, fun, funDrag) {
	PIXI.Container.call(this);
	this.type = 'PLGradient';
	var self = this;
	cont.addChild(this);
	pl102.addElement(this);

	this.fun = fun;
	this.funDrag = funDrag;
	this.funOut;

	this.x = x || 0;
	this.y = y || 0;

	this._kolColor = 105; // количество цветов в массиве
	this._width = pl102.wh;
	this._height = 100;
	this._konturColor = pl102.color1;
	this._activ = false;

	this.colorPosition; // позиция цвета на градиенте
	this.colorArr = [];
	this.color = '0xffffff';
	this.colorDrag = '0xffffff';
	this.otstup = 0; // отступ для корректного отображения положения курсора

	// графика для отрисовки градиента
	this.graphics = new PIXI.Graphics();
	this.addChild(this.graphics);
	// графика для отрисовки рамки
	this.cursorFrame = new PIXI.Graphics();
	this.addChild(this.cursorFrame);
	// графика для отрисовки курсора
	this.cursorGraph = new PIXI.Graphics();
	this.addChild(this.cursorGraph);

	this.drawCursor = function (_x, _y) {
		this.cursorGraph.clear();
		this.cursorGraph.beginFill(0x000000, 0);
		this.cursorGraph.drawCircle(_x / 2, _y / 2, _x * 2);
		this.cursorGraph.lineStyle(0.5, 0xffffff);
		this.cursorGraph.beginFill(0x000000);
		this.cursorGraph.moveTo(0, 0);
		this.cursorGraph.lineTo(_x, _y / 2);
		this.cursorGraph.lineTo(0, _y);
		this.cursorGraph.lineTo(0, 0);
		this.cursorGraph.x = -_x / 2;
		this.otstup = _y / 2;
		this.drawFrame();
	};

	// получаем новый цвет от светлого к темному относительно полученного цвета
	this.getNewBrightnessColor = function (hexcode, brightness) {
		var r = parseInt(hexcode.slice(1, 3), 16),
			g = parseInt(hexcode.slice(3, 5), 16),
			b = parseInt(hexcode.slice(5, 7), 16),
			HSL = this.rgbToHsl(r, g, b),
			RGB;
		RGB = this.hslToRgb(HSL[0], HSL[1], brightness / 100);
		hexcode = '#' + this.hexFromDec(RGB[0]) + this.hexFromDec(RGB[1]) + this.hexFromDec(RGB[2]);
		return hexcode;
	};

	// получаем значение для отображения курсора напротив полученного цвета
	this.getNewBrightnessColorOne = function (hexcode) {
		var r = parseInt(hexcode.slice(1, 3), 16),
			g = parseInt(hexcode.slice(3, 5), 16),
			b = parseInt(hexcode.slice(5, 7), 16),
			HSL = this.rgbToHsl(r, g, b);
		return 100 - (Math.round(HSL[2] * 100));
	};

	// преобразование в десятичный шестнадцатеричный код для HEX
	this.hexFromDec = function (decimal) {
		var code = Math.round(decimal).toString(16);
		(code.length > 1) || (code = '0' + code);
		return code;
	};

	// конвертируем цвет с RGB в HSL
	this.rgbToHsl = function (r, g, b) {
		r /= 255, g /= 255, b /= 255;
		var max = Math.max(r, g, b),
			min = Math.min(r, g, b);
		var h, s, l = (max + min) / 2;

		if (max == min) {
			h = s = 0; // achromatic
		} else {
			var d = max - min;
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
			switch (max) {
				case r:
					h = (g - b) / d + (g < b ? 6 : 0);
					break;
				case g:
					h = (b - r) / d + 2;
					break;
				case b:
					h = (r - g) / d + 4;
					break;
			}
			h /= 6;
		}
		return [h, s, l];
	};

	// конвертируем цвет с HSL в RGB
	this.hslToRgb = function (h, s, l) {
		var r, g, b;

		if (s == 0) {
			r = g = b = l;
		} else {
			function hue2rgb (p, q, t) {
				if (t < 0) t += 1;
				if (t > 1) t -= 1;
				if (t < 1 / 6) return p + (q - p) * 6 * t;
				if (t < 1 / 2) return q;
				if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
				return p;
			}

			var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
			var p = 2 * l - q;
			r = hue2rgb(p, q, h + 1 / 3);
			g = hue2rgb(p, q, h);
			b = hue2rgb(p, q, h - 1 / 3);
		}

		return [r * 255, g * 255, b * 255];
	};

	// устанавливаем курсор относительно полученного цвета
	var hhс, hhh;
	this.cursorPositionColor = function () {
		hhс = self._height / 100;
		hhh = (self.colorPosition * hhс);

		if (hhh < 0) hhh = -self.otstup;
		if (hhh > self._height - self.otstup) hhh = self._height - self.otstup;
		self.cursorGraph.y = hhh;
	};

	// берем цвет из массива относительно клика
	var hhs, i;
	this.getColorClick = function () {

		hhs = this._height / this.colorArr.length;
		i = (Math.floor(this.colorPosition / hhs));
		if (this.colorArr[i] != undefined) return this.colorArr[i].replace('#', '0x');
		return 0xffffff;
	};

	// отрисовка градиента
	var hh, shag;
	this.draw = function (colorArr) {

		this.graphics.clear();
		hh = this._height / colorArr.length;
		for (var i = 0; i < colorArr.length; i++) {
			this.graphics.beginFill(colorArr[i].replace('#', '0x'));
			this.graphics.drawRect(0, i * hh, this._width, hh);
		}

		this.drawFrame();

		this.cursorPositionColor();
	};

	this.drawFrame = function () {
		this.cursorFrame.clear();
		this.cursorFrame.lineStyle(1, this._konturColor, 1);
		this.cursorFrame.drawRect(0, 0, this._width, this._height);
	};

	// сюда приходит цвет
	var shag, j;
	this.setColor = function (_color, _par) {

		self.colorArr = [];
		shag = 100 / this._kolColor;
		j = 0;
		for (var i = 0; i < self._kolColor; i++) {
			self.colorArr.unshift(self.getNewBrightnessColor(_color, +j.toFixed(0)));
			j += shag;

		}
		self.draw(self.colorArr);
		self.colorPosition = self.getNewBrightnessColorOne(_color); // получаем позицирю курсора относительно пришедшего цвета
		self.bmpPosCor = self.colorPosition;
		self.cursorPositionColor();

		if (_par == 'click') this.color = _color.replace('#', '0x');
	};
	// сюда приходит цвет в RGB c инпутов
	var hexcode;
	this.setColorRGB = function (color) {
		hexcode = '#' + self.hexFromDec(color[0]) + self.hexFromDec(color[1]) + self.hexFromDec(color[2]);
		self.setColor(hexcode);
	};

	// устанавливаем курсор относительно клика
	var hh;
	this.bmpPos = {};
	this.bmpPos.x = 0;
	this.bmpPos.y = 0;
	this.bmpPosCor = 0;
	this.colorMove = function () {

		self.bmpPos = self.graphics.toLocal(pl102.global);

		if (self.bmpPos.x < 0 || self.bmpPos.y < 0 || self.bmpPos.x > self._width || self.bmpPos.y > self._height) {
			self.mouseOut();
			return;
		}

		self.colorPosition = Math.round(self.bmpPos.y);
		if (self.colorPosition < 0) self.colorPosition = -self.otstup;
		if (self.colorPosition > self._height - self.otstup) self.colorPosition = self._height - self.otstup;
		self.cursorGraph.y = self.colorPosition;
		// self.cursorPositionColor();

		self.colorDrag = self.getColorClick(); // берем цвет из массива относительно клика

		if (self.funDrag) self.funDrag();
	};
	// зашли в область компонента
	this.mouseOver = function () {

		if (pl102.isMouseEvents) {
			pl102.stage.on('mousemove', self.colorMove);
		}
		if (pl102.isTouchEvents) {
			pl102.stage.on('touchmove', self.colorMove);
		}
		if (pl102.isMouseEvents) {
			self.graphics.off('mouseover', self.mouseOver);
		}
	};

	// вышли с компонента
	this.mouseOut = function () {

		self.colorDrag = self.color;

		self.colorPosition = self.bmpPosCor;
		self.cursorGraph.y = self.colorPosition;
		// self.cursorPositionColor();

		if (pl102.isMouseEvents) {
			pl102.stage.off('mousemove', self.colorMove);
		}
		if (pl102.isTouchEvents) {
			pl102.stage.off('touchmove', self.colorMove);
		}

		if (pl102.isMouseEvents) {
			self.graphics.on('mouseover', self.mouseOver);
		}
		if (self.funOut) self.funOut();
	};

	// курсор опустили поставили событие двигать
	this.mouseDown = function () {
		self.bmpPosCor = self.bmpPos.y;
		self.color = self.colorDrag;
		if (self.fun) self.fun();
	};

	this.graphics.interactive = true;
	this.cursorGraph.interactive = true;
	this.cursorGraph.buttonMode = true;

	this.setColor(this.color.replace('0x', '#'), this._kolColor); // стартовая отрисовка градиента
	this.drawCursor(6, 8);
}

PLGradient.prototype = Object.create(PIXI.Container.prototype);
PLGradient.prototype.constructor = PLGradient;
Object.defineProperties(PLGradient.prototype, {
	width: {
		set: function (value) {
			if (this._width == value) return;
			this._width = value;
			this.draw(this.colorArr);
		},
		get: function () {
			return this._width;
		}
	},
	height: {
		set: function (value) {
			if (this._height == value) return;
			this._height = value;
			this.draw(this.colorArr);
		},
		get: function () {
			return this._height;
		}
	},
	activ: {
		set: function (value) {
			if (this._activ == value) return;
			this._activ = value;
			if (this._activ) {
				if (pl102.isMouseEvents) {
					this.graphics.on('click', this.mouseDown); // срабатывание на клик
					this.cursorGraph.on('mousedown', this.mouseDown); // двигаем курсор
				}
				if (pl102.isTouchEvents) {
					this.graphics.on('tap', this.mouseDown); // срабатывание на клик
					this.cursorGraph.on('touchstart', this.mouseDown); // двигаем курсор
				}
				if (pl102.isMouseEvents) {

					this.graphics.on('mouseover', this.mouseOver);
				}
			} else {
				if (pl102.isMouseEvents) {
					this.graphics.off('click', this.mouseDown); // срабатывание на клик
					this.cursorGraph.off('mousedown', this.mouseDown); // двигаем курсор
				}
				if (pl102.isTouchEvents) {
					this.graphics.off('tap', this.mouseDown); // срабатывание на клик
					this.cursorGraph.off('touchstart', this.mouseDown); // двигаем курсор
				}
				if (pl102.isMouseEvents) {
					this.graphics.off('mouseover', this.mouseOver);
				}
				if (pl102.isMouseEvents) {
					pl102.stage.off('mousemove', this.colorMove);
					// pl102.stage.off("mouseup", this.mouseUpOff);
				}
				if (pl102.isTouchEvents) {
					pl102.stage.off('touchmove', this.colorMove);
					// pl102.stage.off("touchend", this.mouseUpOff);
				}
			}
		},
		get: function () {
			return this._activ;
		}
	},
	konturColor: {
		set: function (value) {
			if (this._konturColor == value) return;
			this._konturColor = value;
			this.drawFrame();
		},
		get: function () {
			return this._konturColor;
		}
	}
});

export function PLInputRGB (cont, x, y, fun) {
	PIXI.Container.call(this);
	this.type = 'PLInputRGB';
	cont.addChild(this);
	var self = this;
	pl102.addElement(this);

	this.fun = fun;
	this.x = x || 0;
	this.y = y || 0;
	this._kolColor = 10;
	this._width = 100;
	this._height = pl102.wh;
	this._otstup = pl102.otstup * 2; // отступ между инпутами
	this._otstup2 = 50; // отступ для текста RGB
	this._activMouse = false;

	this.useOne = false; // цвет работает в диапазоне 0-1

	this.color = [255, 255, 255];
	this.panel = new PLPanel(this);
	pl102.removeElement(this.panel, true);
	this.panel.image.visible = false;
	this.panel.color = 0xffffff;
	this.panel.width = this._width;
	this.panel.height = this._height;
	this.panel.kontur = false;

	this.label = new PLLabel(this, 0, 0, 'RGB:');
	pl102.removeElement(this.label, true);

	// инпут для ввода цвета канала R
	this.inputR = new PLInput(this, 0, 0, '', function () {
		// проверка на рамки 0-255 цвета и ввод текста
		if (self.useOne) {
			self.color[0] = Math.round((+this.value) * 255);
			if (isNaN(+this.value) || +this.value < 0 || +this.value > 1) {
				self.inputR.text = 1;
				self.color[0] = 255;
			}
		} else {
			self.color[0] = +this.value;
			if (isNaN(+this.value) || +this.value < 0 || +this.value > 255) {
				self.inputR.text = 255;
				self.color[0] = 255;
			}
		}

		if (self.fun) self.fun();
	});
	pl102.removeElement(this.inputR, true);
	this.inputR.text = this.color[0];

	// инпут для ввода цвета канала G
	this.inputG = new PLInput(this, 0, 0, '', function () {
		// проверка на рамки 0-255 цвета и ввод текста
		if (self.useOne) {
			self.color[1] = Math.round((+this.value) * 255);
			if (isNaN(+this.value) || +this.value < 0 || +this.value > 1) {
				self.inputG.text = 1;
				self.color[1] = 255;
			}
		} else {
			self.color[1] = +this.value;
			if (isNaN(+this.value) || +this.value < 0 || +this.value > 255) {
				self.inputG.text = 255;
				self.color[1] = 255;
			}
		}

		if (self.fun) self.fun();
	});
	pl102.removeElement(this.inputG, true);
	this.inputG.text = this.color[1];

	// инпут для ввода цвета канала B
	this.inputB = new PLInput(this, 0, 0, '', function () {
		// проверка на рамки 0-255 цвета и ввод текста
		if (self.useOne) {
			self.color[2] = Math.round((+this.value) * 255);
			if (isNaN(+this.value) || +this.value < 0 || +this.value > 1) {
				self.inputB.text = 1;
				self.color[2] = 255;
			}
		} else {
			self.color[2] = +this.value;
			if (isNaN(+this.value) || +this.value < 0 || +this.value > 255) {
				self.inputB.text = 255;
				self.color[2] = 255;
			}
		}

		if (self.fun) self.fun();
	});
	pl102.removeElement(this.inputB, true);
	this.inputB.text = this.color[2];

	// для перерисовки элементов компонента
	var ws;
	this.reposition = function () {
		ws = (self._width - self._otstup2) / 3;
		self.inputB.width = ws;
		self.inputB.x = self._width - ws + 1;
		self.inputB.height = self._height;

		self.inputG.width = ws;
		self.inputG.x = self.inputB.x - ws - self._otstup;
		self.inputG.height = self._height;

		self.inputR.x = self.inputG.x - ws - self._otstup;
		self.inputR.width = ws;
		self.inputR.height = self._height;

		self.panel.width = self._width;
		self.panel.height = self._height;

		self.label.y = (self._height - self.label.fontSize) / 2 - 2;
	};
	this.reposition();

	// конвертируем цвет с HEX в RGB

	this.hexToRGB = function (color) {
		var r, g, b;
		r = parseInt(color.slice(1, 3), 16);
		g = parseInt(color.slice(3, 5), 16);
		b = parseInt(color.slice(5, 7), 16);
		return [r, g, b];
	};

	// тут получаем цвет в HEX
	var okrug = 10;
	this.setColor = function (color) {
		var r, g, b;
		r = this.hexToRGB(color)[0];
		g = this.hexToRGB(color)[1];
		b = this.hexToRGB(color)[2];


		if (this.useOne) {
			this.inputR.text = Math.round((r / 255) * okrug) / okrug;
			this.inputG.text = Math.round((g / 255) * okrug) / okrug;
			this.inputB.text = Math.round((b / 255) * okrug) / okrug;
		} else {
			this.inputR.text = r;
			this.inputG.text = g;
			this.inputB.text = b;
		}
		this.color = this.hexToRGB(color);
	};
}
PLInputRGB.prototype = Object.create(PIXI.Container.prototype);
PLInputRGB.prototype.constructor = PLInputRGB;
Object.defineProperties(PLInputRGB.prototype, {
	width: {
		set: function (value) {
			if (this._width == value) return;
			this._width = value;
			this.reposition();
		},
		get: function () {
			return this._width;
		}
	},
	height: {
		set: function (value) {
			if (this._height == value) return;
			this._height = value;
			this.reposition();
		},
		get: function () {
			return this._height;
		}
	},
	otstup: {
		set: function (value) {
			if (this._otstup == value) return;
			this._otstup = value;
			this.reposition();
		},
		get: function () {
			return this._otstup;
		}
	},
	otstup1: {
		set: function (value) {
			if (this._otstup2 == value) return;
			this._otstup2 = value;
			this.reposition();
		},
		get: function () {
			return this._otstup2;
		}
	},
	activMouse: {
		set: function (value) {
			if (this._activMouse == value) return;
			this._activMouse = value;

			this.inputR.activMouse = this._activMouse;
			this.inputG.activMouse = this._activMouse;
			this.inputB.activMouse = this._activMouse;
		},
		get: function () {
			return this._activMouse;
		}
	}
});

export function PLCheckBox (cont, _x, _y, title, fun) {
	PIXI.Container.call(this);
	this.type = 'PLCheckBox';
	var self = this;
	cont.addChild(this);
	pl102.addElement(this);

	this.fun = fun;

	this.x = _x;
	this.y = _y;

	this._value = false;
	this._width = 100;
	this._height = 18;
	this._title = title;
	this._wh10 = this._height / 2;
	this._color = 0xa7a7a7;
	this._color1 = 0x717171;
	this._activMouse = true;

	this.fontSize = 14;
	this.heightRect = 20;
	this.otstup = 20;
	this.otstup1 = 5;

	var bOver = false;
	var bLine = false;
	var activbLine = false;

	this.content = new PIXI.Container();
	this.addChild(this.content);

	this.graphics = new PIXI.Graphics();
	this.content.addChild(this.graphics);

	this.panel = new PLButton(this, 0, 0, ' ');
	pl102.removeElement(this.panel, true);
	this.panel.height = this.panel.width = this._height;
	this.panel.color1 = this._color1;
	this.panel.color = this._color1;
	this.panel.panel.nizAlpha = 0;

	this.label = new PLLabel(this, this.otstup + this.otstup1, 1, this._title);
	pl102.removeElement(this.label, true);
	this.rect = this.label.getRect();
	this.rect.width /= this.worldTransform.a;
	this.rect.height /= this.worldTransform.a;
	this.label.bold = false;
	this.label.fontSize = this.fontSize;

	this.bigBut = new PLButton(this, 0, 0, '', function () {
		self.value = !self.value;
		if (self.fun) self.fun();
	});
	this.bigBut.funUp = function () {
		if (self.funUp) self.funUp();
	};

	pl102.removeElement(this.bigBut, true);
	this.bigBut.height = this._height;
	this.bigBut.width = this._height + this.rect.width + this.otstup1;
	this.bigBut.alpha = 0;

	this.graphActivM = new PIXI.Graphics();
	this.addChild(this.graphActivM);
	this.graphActivM.alpha = 0.01;
	this.graphActivM.interactive = true;

	this.graphRect = new PIXI.Graphics();
	this.addChild(this.graphRect);
	this.graphRect.alpha = 0.5;
	this.graphRect.interactive = true;

	this.changeActiv = function () {
		if (!this._activMouse) {
			this.graphActivM.clear();
			this.graphActivM.lineStyle(1, this._color1);
			this.graphActivM.beginFill(this._color1);
			this.graphActivM.drawRect(0, 0, this.bigBut.width, this.bigBut.height);
			this.graphActivM.endFill();

			this.graphRect.clear();
			this.graphRect.beginFill(this._color1);
			this.graphRect.drawRect(0, 0, this.heightRect, this.heightRect);
			this.graphRect.endFill();
		} else {
			this.graphActivM.clear();
			this.graphRect.clear();
		}
	};

	this.draw102 = function () {
		if (bLine == true) {
			this.graphics.clear();
			this.graphics.lineStyle(1, this._color);
			this.graphics.moveTo(this.heightRect + 3, this._height - 10);
			this.graphics.lineTo(this.heightRect + this.rect.width + 3, this._height - 10);
		}
	};

	this.bigBut.funOver = function () {
		if (!activbLine) return;
		bLine = true;
		self.draw102();
	};

	this.bigBut.funOut = function () {
		if (!activbLine) return;
		bLine = false;
		self.graphics.clear();
	};
}

PLCheckBox.prototype = Object.create(PIXI.Container.prototype);
PLCheckBox.prototype.constructor = PLCheckBox;
Object.defineProperties(PLCheckBox.prototype, {
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
	title: {
		set: function (value) {
			this._title = value;
			this.label.text = value;
			this.rect = this.label.getRect();
			this.rect.width /= this.worldTransform.a;
			this.rect.height /= this.worldTransform.a;
			this.bigBut.width = this.heightRect + this.rect.width + 5;
			this.changeActiv();
			this.draw102();
		},
		get: function () {
			return this._title;
		}
	},
	color: {
		set: function (value) {
			this._color = value;
			this.draw102();
		},
		get: function () {
			return this._color;
		}
	},
	value: {
		set: function (val) {
			this._value = val;
			this.panel.activ = val;
		},
		get: function () {
			return this._value;
		}
	},
	activMouse: {
		set: function (value) {
			if (this._activMouse == value) return;
			this._activMouse = value;
			this.changeActiv();
		},
		get: function () {
			return this._activMouse;
		}
	}
});


export function PLCheckBoxImage (cont, _x, _y, link, link1, fun) {
	PIXI.Container.call(this);
	cont.addChild(this);
	this.type = 'PLCheckBoxImage';
	var self = this;
	pl102.addElement(this);

	this.fun = fun;

	this.x = _x || 0;
	this.y = _y || 0;

	this._value = false;
	this._width = 100;
	this._height = 100;
	this._link = link;
	this._link1 = link1;
	this._activMouse = true;
	this._activ = false;

	this.isIlumActiv = false; // подсвечивание активности кнопки

	this.kontur = false;
	this.color = 0xcbcbcb;

	this.but = new PLButton(this, 0, 0, '', function () {
		self.value = !self.value;
		if (self.fun) self.fun();
	});
	pl102.removeElement(this.but, true);
	this.but.height = this._height;
	this.but.loadImeg(link);
	this.but.visible = false;
	this.but.panel.image.visible = false;

	this.but1 = new PLButton(this, 0, 0, '', function () {
		self.value = !self.value;
		if (self.fun) self.fun();
	});
	pl102.removeElement(this.but1, true);
	this.but1.height = this._height;
	this.but1.loadImeg(link1);
	this.but1.panel.image.visible = false;

	this.graphic = new PIXI.Graphics();
	this.addChild(this.graphic);
	this.draw102 = function () {
		this.but1.width = this.but.width = this._width;
		this.but1.height = this.but.height = this._height;

		if (this.but.image && this.but1.image) {
			this.but1.image.width = this.but.image.width = this._width;
			this.but1.image.height = this.but.image.height = this._height;
		}

		this.drawContur();
	};

	this.drawContur = function () {
		if (this.kontur) {
			this.graphic.clear();
			this.graphic.lineStyle(1, this.color);
			this.graphic.drawRect(0, 0, this._width, this._height);
		}
	};

	this.setStile = function (p, p1, p2) {
		this._width = p1;
		this._height = p2;
		this.but.setStile(p, p1, p2);
		this.but1.setStile(p, p1, p2);
		this.drawContur();
	};

	Object.defineProperty(this, 'link', {
		set: function (value) {
			this._link = value;
			this.but.loadImeg(this._link);
		},
		get: function () {
			return this._link;
		}
	});

	Object.defineProperty(this, 'link1', {
		set: function (value) {
			this._link1 = value;
			this.but1.loadImeg(this._link1);
		},
		get: function () {
			return this._link1;
		}
	});

	Object.defineProperty(this, 'width', {
		set: function (value) {
			this._width = value;
			this.draw102();
		},
		get: function () {
			return this._width;
		}
	});
	Object.defineProperty(this, 'height', {
		set: function (value) {
			this._height = value;
			this.draw102();
		},
		get: function () {
			return this._height;
		}
	});
	Object.defineProperty(this, 'value', {
		set: function (val) {
			this._value = val;
			this.but.visible = val;
			this.but1.visible = !val;
		},
		get: function () {
			return this._value;
		}
	});
	Object.defineProperty(this, 'activMouse', {
		set: function (value) {
			this._activMouse = value;
			this.but.activMouse = this._activMouse;
			this.but1.activMouse = this._activMouse;
		},
		get: function () {
			return this._activMouse;
		}
	});

	Object.defineProperty(this, 'activ', {
		set: function (value) {
			if (this._activ !== value) {
				this._activ = value;

				if (this.isIlumActiv === true) {
					this.but.activ = this._activ;
					this.but1.activ = this._activ;
				} else {
					this.value = this._activ;
				}
			}
		},
		get: function () {
			return this._activ;
		}
	});

	Object.defineProperty(this, 'userType', {
		set: function (value) {
			this._userType = value;

		},
		get: function () {
			return this._userType;
		}
	});


}

PLCheckBoxImage.prototype = Object.create(PIXI.Container.prototype);
PLCheckBoxImage.prototype.constructor = PLCheckBoxImage;


export function PLTextArea (cont, _x, _y, text, fun) {
	PIXI.Container.call(this);
	this.type = 'PLTextArea';
	cont.addChild(this);
	var self = this;
	pl102.addElement(this);

	this.fun = fun;
	this.x = _x;
	this.y = _y;
	this._text = text;

	this.timeDrag = 0;

	var xz = 'textarea_' + Math.random();

	this._visiDiv = false;
	this._activMouse = true;

	this.label = document.createElement('textarea');
	this.label.id = 'input102_' + Math.random();
	// this.label.type = 'text';
	this.label.style.font = pl102.style.fontStyle + ' ' + pl102.style.fontSize + 'px ' + pl102.style.fontFamily;
	this.label.style.color = pl102.colorLabel;
	this.label.style.background = pl102.color3;
	this.label.style.border = '1px solid ' + pl102.colorLabel;

	this.label.style.resize = 'none';
	this.label.style.overflow = 'hidden';

	this._color = pl102.style.fill; // цвет текст
	this._backgroundColor = '#ffffff'; // "#d0d0d0";// todo color to pl102  // цвет фона
	this._outlineColor = '#909090'; // todo color to pl102  // цвет рамки при фокусе
	this._borderColor = '#909090'; // todo color to pl102  // цвет рамки
	this._fontFamily = this.label.style.fontFamily;
	this._bold = this.label.bold;

	this.label.value = this._text;
	pl102.doc.appendChild(this.label);

	this.contLabel = new PLDOMElement(this.label, this);
	this.addChild(this.contLabel);


	this.content;
	this.graphRect; // графика накрывающая инпут
	this.graphMask;
	this.label2 = null;
	this.rect;
	this.otstup;
	this.isRectInit = false;

	this.content = new PIXI.Container();
	this.addChild(this.content);

	var rez, tmp;
	this.rect2;

	this.changeActiv = function () {
		if (this._activMouse == false) {

			this.graphRect.clear();
			this.graphCover.clear();
			this.graphMask.clear();

			this.graphMask.beginFill(0xffffff);
			this.graphMask.drawRect(0, 0, this._width, this._height);

			this.graphCover.beginFill(0xffffff);
			this.graphCover.lineStyle(1, 0x000000, 1);
			this.graphCover.drawRect(1, 1, this._width - 2, this._height - 2);

			this.graphRect.beginFill(pl102.color, 0.5);
			this.graphRect.drawRect(0, 0, this._width, this._height);

		} else {
			this.graphRect.clear();
			this.graphCover.clear();
			this.graphMask.clear();
		}
	};

	this.changeVisiDiv = function () {
		if (this.content) {
			if (this._visiDiv) {
				this.content.visible = false;
				this.contLabel.visibleDOM = this.worldVisible;
				this.drawRect();
			} else {
				this.content.visible = true;
				this.contLabel.visibleDOM = false;
				this.drawRect();
			}
		}
	};

	this.rectInitial = function () {

		this.isRectInit = true;

		this.graphMask = new PIXI.Graphics();
		this.content.addChild(this.graphMask);

		this.content.mask = this.graphMask;

		this.graphCover = new PIXI.Graphics();
		this.content.addChild(this.graphCover);
		this.graphCover.interactive = true;

		this.label2 = new PLLabel(this.content, 3, 3, this._text);
		this.label2.label.style.align = 'left';
		// перенос на новую строку если в тексте есть пробелы
		this.label2.label.style.wordWrap = true;
		// перенос на новую строку если текст без пробелов
		this.label2.label.style.breakWords = true;
		pl102.removeElement(this.label2, true);

		this.rect = this.label2.getRect();
		this.rect.width /= this.worldTransform.a;
		this.rect.height /= this.worldTransform.a;

		this.setTinK(this.label.value);

		this.graphRect = new PIXI.Graphics();
		this.content.addChild(this.graphRect);
		this.graphRect.interactive = true;

		this.otstup = 3;
	};

	this.drawRect = function () {

		this.setTinK(this.label.value);

		this.rect = this.label2.getRect();
		this.rect.width /= this.worldTransform.a;
		this.rect.height /= this.worldTransform.a;

		this.changeActiv();
		this.syncTextAreaLabels();
	};

	this.setLabel = function (str) {
		this.checkLengthText();
		this.label2.label.style.wordWrapWidth = this._width;
		this.label2.text = str;
	};

	this.checkLengthText = function (str) {


	};

	this.setTinK = function (str) {
		this.setLabel(str);
	};

	this.contLabel.htmlElement.onchange = function () {
		if (self.fun) self.fun();
	};

	this.sah = 0;

	this.chInput = function (num) {
		if (num == self.sah) {
			if (self.fun != null && self.fun != undefined) {
				self.fun();
			}
		}
	};

	this.funInp;
	this.contLabel.htmlElement.oninput = function () {
		if (this._visiDiv) {
		}
		self.text = self.contLabel.htmlElement.value;
		self.sah++;
		var p = self.sah;
		if (self.funInp)self.funInp();
		setTimeout(function () { self.chInput(p); }, 1000);
	};

	this.kill = function () {
		document.getElementById(this.label.id).parentNode.removeChild(document.getElementById(this.label.id));
	};
	this.toRGB = function (color) {
		color = '' + color;
		if (color[0] != '#') {
			color = Number(color).toString(16);
			if (color == 0) color = '000000';
			color = '#' + color;
		}
		return color;
	};
	this.syncTextAreaLabels = function () {
		if (!this.isRectInit) this.rectInitial(); // Создает label2 (если не было)
		// Коррекция местоположение текста всвязи с заданным align;
		self.label2.label.calculateBounds();
		var wt = this.label2.label.getLocalBounds().width;

		if (this.align == 'left') this.label2.x = this.otstup;
		if (this.align == 'center') this.label2.x = (this.width / 2) - (wt / 2);
		if (this.align == 'right') this.label2.x = (this.width) - (wt) - this.otstup;
	};

	this.width = 100;
	this.height = 100;
	this.color = this._color;
	this.backgroundColor = this._backgroundColor;
	this.outlineColor = this._outlineColor;
	this.borderColor = this._borderColor;
}

PLTextArea.prototype = Object.create(PIXI.Container.prototype);
PLTextArea.prototype.constructor = PLTextArea;

Object.defineProperties(PLTextArea.prototype, {
	width: {
		set: function (value) {
			this._width = value;
			this.label.width = value;
			this.label.style.width = value + 'px';
			if (this.isRectInit) this.drawRect();
		},
		get: function () { return this._width; }
	},
	height: {
		set: function (value) {
			this._height = value;
			this.label.height = value;
			this.label.style.height = value + 'px';
			if (this.isRectInit) this.drawRect();
		},
		get: function () { return this._height; }
	},
	text: {
		set: function (value) {
			this._text = value;
			this.label.value = value;
			if (this.isRectInit) this.drawRect();
		},
		get: function () {
			return this._text;
		}
	},
	value: {
		set: function (value) {
			this._text = value;
			this.label.value = value;
			if (this.isRectInit) this.drawRect();
		},
		get: function () {
			return this.label.value;
		}
	},
	visiDiv: {
		set: function (value) {
			this._visiDiv = value;
			if (this.label2 === null) this.rectInitial();
			this.changeVisiDiv();
		},
		get: function () {
			return this._visiDiv;
		}
	},
	activMouse: {
		set: function (value) {
			if (this._activMouse == value) return;
			this._activMouse = value;
			this.visiDiv = value;
		},
		get: function () {
			return this._activMouse;
		}
	},
	color: {// цвет текста
		set: function (value) {
			this._color = value;
			this.label.style.color = this.toRGB(value);
			if (this.isRectInit) this.label2.color = this._color;
		},
		get: function () {
			return this._color;
		}
	},
	backgroundColor: {// цвет задний фон
		set: function (value) {
			this._backgroundColor = value;
			this.label.style.backgroundColor = this.toRGB(value);
		},
		get: function () {
			return this._backgroundColor;
		}
	},
	borderColor: {// цвет рамка
		set: function (value) {
			this._borderColor = value;
			this.label.style.borderColor = this.toRGB(value);
		},
		get: function () {
			return this._borderColor;
		}
	},
	outlineColor: {// цвет рамка при фокусе
		set: function (value) {
			this._outlineColor = value;
			this.label.style.outlineColor = value;
		},
		get: function () {
			return this._outlineColor;
		}
	},
	bold: {
		set: function (value) {
			this._bold = value;
			if (this._bold == true) this.label.style.fontWeight = 'bold';
			else this.label.style.fontWeight = 'normal';
			if (this.isRectInit) this.label2.bold = this._bold;
		},
		get: function () {
			return this._bold;
		}
	},
	align: {
		set: function (value) {
			this._align = value;
			this.label.style.textAlign = value;
			if (this.isRectInit) this.label2.align = this._align;
		},
		get: function () {
			return this._align;
		}
	},
	fontSize: {
		set: function (value) {
			this._fontSize = value;
			this.label.style.fontSize = value + 'px';
			if (this.isRectInit) this.label2.fontSize = this._fontSize;
		},
		get: function () {
			return this._fontSize;
		}
	},
	fontFamily: {
		set: function (value) {
			this._fontFamily = value;
			this.label.style.fontFamily = value;
			if (this.isRectInit) this.label2.fontFamily = this._fontFamily;
		},
		get: function () {
			return this._fontFamily;
		}
	}
});

export function PLComboBoxImage (cont, _x, _y, arr, fun, _link) {
	PIXI.Container.call(this);
	this.type = 'PLComboBoxImage';
	this.typeCom = 'pixi';
	cont.addChild(this);
	var self = this;
	pl102.addElement(this);

	this.fun = fun;
	this.x = _x || 0;
	this.y = _y || 0;
	this._width = 100;
	this._height = 100;
	this._wh = 30;
	this._index = -1;
	this._visiPanel = false;
	this._visiCol = 10000000;
	this._color;

	this.w2 = this._width - this._wh; // переменная для правильной установки скрола, и корректного изменения ширины PXComboBoxElement

	this.array = [];
	this.arrayElement = [];
	this.indexOver = -1;
	this.otstup = 2;

	this.color1 = pl102.color2;
	this.color2 = pl102.color8;
	this.color3 = pl102.color4;
	this.color4 = pl102.color9;
	this.color5 = pl102.color;
	this.panel = new PLPanel(this, 0, this._wh); // основная панел
	pl102.removeElement(this.panel, true);
	this.panel.visible = false;
	this.panel.kontur = true;

	this.gPlus = new PIXI.Graphics();// Для дебаг отрисовки
	this.addChild(this.gPlus);

	var bbb, ww, hContent, countMan; // нужные переменные, для разных вычислений
	this.sah = this._visiCol;

	this.graphics = new PIXI.Graphics(); // маска для корректного отображения
	this.panel.content.addChild(this.graphics);

	this.content = new PIXI.Container(); // контент для элементов PXComboBoxElement
	this.addChild(this.content);
	this.content2 = new PIXI.Container(); // контент для маски
	this.panel.content.addChild(this.content2);
	this.content2.addChild(this.content);
	this.content2.mask = this.graphics;
	this.graphics.x = this.graphics.y = this.content2.x = this.content2.y = this.otstup;

	this.faceElement = new PLImgFaceElement(this.content, 0, 0); // кнопка с отображением выбраного элемента
	this.faceElement.height = this._wh;
	this.faceElement.width = this._width;

	this.contentFilt = new PIXI.Container();
	this.addChild(this.contentFilt);
	this.tween = new TWEEN.Tween(this.contentFilt);
	this.contentFilt.addChild(this.faceElement);

	/// графика для нажатия на картинку стрелочки
	this.graphicsImage = new PIXI.Graphics();
	this.addChild(this.graphicsImage);
	this.graphicsImage.interactive = true;
	this.graphicsImage.alpha = 0;

	var img1 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAALrUlEQVR42u2beVBVRxbGGRNjxYqj1lDRSRxHnVhJJtE4TtDgMqNZ1DgmMaOl4xCpMeqYSKImammMIVqCjBBEkFXZZBEVN0REggv79tjXxyoiIDuyLy7f9Glvv3r33aeC2x9IV/2qoU+f0/2d27dvX+piYNBf+kt/6S/9pb/0l/7yjJffPKNoxA9gPMd4njGwj/O8pHWASAI1vMAYzHiJ8VvGUMawPsZQSdtLktYXJO0GgxhD6gMCcLu1FdqlqbUL3sH52OaU9FgQpXzbNr2I8rjGcw7MQW1jBzpyclBpacnHoLo9MxOkWdLOfxhx7Ycf0JaSglsNDdAt1Q3tSM6tRWJ29SMhSmtiol5EedRxVDk1uF7Xhjs3b6KzsFATv7OggLfduXOHEjBC0m5gyBhf7eqK1rg41Dg6oiksDLfb22VJaG3vxpmoUjgezX5oRKEx9CHKo4xx/GIJGps70VlcjFoPDx6XahIvyu3btykB4yXtBq8wJjY0daC7vBzVLi6ocnBAzcGD6Cgq4tnSJquwHq4ncuBwJKvXiBgUXx/C/jCxnQOzkZpXi1ttbbgRGqqJ2Xj2LG8Tsak0s1ubNEvaDUYzjLY5JqCythU3b9xA/bFjqLKz4zSGhMgCEBTg5KUS2Pln9gpNAqTYugh7b+MeCStCPbuAHWy517CVTLGo7lCrFRewht3OP7kkUgKMJO0GYxjTNvwSjQuJ5ThxsRhNLZ1oUalwnWXwuq0tqpyd0Z6fz5eONun5tWzZZcHWN71HCD+KqQ9h72k8+8OZ7H6vxk22eTcEB2viNAQF8Tbtuba2dyEkupRrJK2kWdJuMI4x/ds9kTgfVwbrQ2k8MInrZhti3eHDqLS25jScPq0ITMk6Fl7E/R6E8BHxdBH2nsTyO5fPdvh2tLOrXLV/P/enui03V3Gh1KWN2M8uFPmRRtJKmiXtdxOwdvdlBLNNzsorVcORsEIusDmB3R4ssxVWVrhub88H1R0kNa8Ge/0yZP66iL4URx/Cfr8YNj7pSMiqws2WFtSfOqXxrT9+nLdpz6mlrQtBESUyf9JIWhUJWGNxkd3Xxdh1MFmG9aFUpORVo6uuDjWHDqF81y5OXWAgupubcevWLQ2NzR3wD81XxBCIfiKGLsJ+L3/PoDxU17eilV1luiDkQ3VrVpZsHkRucT27TdIUMUgjaVUkYNXOcBz9tRA73JL04huiRsONdtyIicG13btRtmMHytmya8nOxk32bNVGlVMFK88URQxhJ199CLuun4V7MmLSKtDV1IRatkGL/jXs8EZt2mM3tXQgMPzeOkgjaVUkYIV5GL+vtjsl3JNdB1VIzKpERw07aLDH5NXt2znVbJ/oZE+P7u5uDfWNbfA+kyvzFzbhp4uwa/u4Hs/C9dpmNLPTGyWe+lHdnJYmG4/ILKjBbs/k+2ogjaRVkQDTH8+xJZaLrQ5xD8TjdA7qGtnOGxGBq+bmKN26FWVsOTZnZCgmlZBZiR2uidxPtFF/fQg79f3JOQERydfQ2diIaj8/TZ8qdhtSm/YYjU3tOByq7tHcSSNpVSTg31uD4XYiG5vsYnrEdqd4xKaXo62qChVOTijZtIlz3dsbHezp0dXVpaG2oQUHTmRpfhd9dRF2h4B0VFQ3oYld5dKff+Y2qm8kJ8viEml5VfjZJaHH8yaNpFWRgKWbg7D/SAbWW0f2CudjGaiua0ZdeDhKNm9G8fr1uMJeOhrZZDs7O/VCffQh7O319aj09NS0V7Dbjdq0Y9SzFegVlNPr+ZJG0qpIwKLvTrJdMxVmVpd7zca9UYhMvoqWigqU7d2LQjMzTrmbG9pqa9HR0SFD2HUR9uItW/jvVDfExyv8VVkV2LIv+qHmShpJqyIB1dXVd7PPXoKeNPlr1ujlaYxNGkmrIgGVlZU8u23s3P+kUX/5pV6extikkbQqEhA7bx6Kf/wRucuX92lII2lVJCDqww9RyDax7GXL+jSkkbQqEnB59mzkr1uHzMWL+zSkkbQqEhA+cybyvvoKGZ991qchjaRVkYDzxsbIXrECqfPn92lII2lVJCBkyhRkmphA9dFHfRrSSFoVCchkLxsN9AcQ9tr7pEmaNUsvT2Ns0ph598/i8gSksXN3PTtu1rKT25MmYfp0vTyNsUkjaVUk4M/zbTDv62OYauLTa+b8NwCnL2TxE5Y2xcePI2HOHMROncpr0U6/60PXv7KgABnff6+xp65ciXJ29fzOpGD2ysMPNVfSSFoVCXh97v940MlLvHrF99ZhyC8qQxV7KxRU5Ocj7ZtvEDN5Mid9wwbeJuyiXRftGNoUnzyJOPbooj6xbKWoXVyQoy7F6h1nez1f0khaFQn40wcWmGHqiwn/dO8RM0x9EBiaxo+V2hQEBCBmxgxETpjA64LAQCSlF2DJxhOaPmTTh7Cv2B6EzNwSWdxreXlIWbtW0zeJbWZXU1PheSIR75l492LeviCtigSMmbUTU5Z5483PDjwQM4uzyFVfQQV7+xOU5eZCtXo1Lr/5Jif56695m71PNCYt9uB+oq/oo4uwU993l3rCPTBBNgaRf/Qoot57j/ePZCsi294eGTnFMP3hVI/mThpJqyIBo2aa84mO/4frPTH6lycCgpNRXl4uI8/XF5FGRrg0fjyv1WwVxKeosXDdUZm/6E/99CHs2j4mW04gPbtINt7V7GyoVq3S+CWwE94VlQoHjsYxDe731UAaSasiAb833oa3Fh7AmLmOelllfhqZOUUoKyvTcIVtSPGmpggfM4aTwN7oqM3G4zJeX+CiiCH8RH9dhF3X762FbnA5HCMbm8j188OlSZO470W2IjJsbJCSUYClG4/dUwdpJK2KBLw8dSvLkDNGfeAg4+2FrvA5GY/S0lIZWR4euPD22wgbNYrX2T4+iErIxrw1vooYAuFLPvoQ9nv5L9pwBKo0tWwexenpiGNveSJG9IIFKIyPh6NvJN5YoNRDGkmrIgG/++smjJmzHyNn2Wkw3RqI1Aw1SkpKNBSyjSd66VKcGzmSE/PFF7zN0uVX/PEjB5m/LiKG8NVF2O8X47WP98PO85JsTkSmlxd+feMNHuf82LFItrREYkoOFn7rL/MnjaRVkYBhk77Dq+/bw3CGLcbPd4RnYKxikAw3N4Sxe+6coSGvMzw9cTk2A7NXeHG/B6FJAPPXh7D3JNYna/24QNnFSUm5e3GkeBHs7KGOicE+r0tMuAP3I42kVZGAIRPW4eW/2WLZxgCoUnNRVFSkIZ9tMBGff47g4cM5kUuW8LadjqEY+fe9GD7NpkeIeCKOLsLe03h/+GAfbA6Gy+ZKpLm7I3TcOB4z5NVXkbRzJ+KTsjD/Kx+ukbQqEjDCaAPcj0SjsLBQRoqTE0JGj8aZIUN4nXrgAMKjUjHd5CCGTNnTK0RMiqUPYe9t3LmrvRGbmCmbtzopCRGLFmliX2DvGjkREbD1uADDyeuVCfDw8kcBO3oK8hITcZFtKKcHD+ZcYiuA2n7adxbDja0x+F2rXiNii5i6CPvDxH555i+wcgmTaSBSXF1xlq0Cin+G3RYJ5uZwc/dVJiCAPbvVajUniR0ugthmcnLQIF6rnJ1x/rIKU5a6YNBfLB4aEZ/i6kPYH2WM9//jjqi4NE0sIoc9FS58+ikf49SLL8Ju4kRZAvgHEv7+/rxj+Lx5ODlwIOfCJ5/wtm22Z/CSkRUGvmPxSGgSIMXXRdgfdZzhxntg4XhOlgRCxW7noBEjYPncc7IPJPgnMi5mZtg9bBh2DRgAy6FD4cZeYKzt3PDazA0YMG7lY8GXnRgJGkMfwv64xntn7mY4OLlr4hLebDXbsqO09icyr0gfDH3MWM4wY2xkbOljbJS0LZe0aj6SMpQ+GZsmGRYzTKSOpn2E5ZKmxZLGadqfyQ2RPhp8TcoKLQ1jaZPoSxhL2iZKWjUfSg6SfjCUlsRoaXMYK+2SfYGxkqbRkkZD7U9ln/mPpZ/5z+Wf+X+Y6C/9pb/0l2e2/B97xwclgGw+uAAAAABJRU5ErkJggg==';
	var img2 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAACXElEQVR42u2bMXbbMBBEPxXail0oTSqnSeE7pPFRcgDfKpdxlyu4SJNUbuLElglgd1MQ8KMpMAdYYN7DE59YzXBmQIor6Ojo6Ojo6OhoFMPqszXYmMmvl2vSi8UIvAN2+XiXl0chCmnNKwFaBDg3s8emsj8MByCMwDlwaWYMQxtVYGYAlyUCe+DQoAAHQIoDLlYnPVu/HF4AT6X89mbmnny5wJnnHhhL858V8i04IHM8A3av256qNrMDZK5DEaCJK18pQcou8CYbrfTAiQCq2owAy7iP6y9bKMGlALu1A1qwf3dATYDbW+Xmxri/9y3A9bVxd1cRICUlBCMl3wLMHCsCiCgx+hcgRkOk6gBhmowYfQswTUZKsh0B7wJsRiAlaagDpNYB7URARLYd0EYEZKsElRjVuQPYjsDsAHXugGE7ArMDvHeAbkeg8Q5IhKBv9kifAsxcTwT4Jl/5PF1h8bfvp8HpAz/kF19qDrAY0RhdC7CLse4AEcFCwBYnXf4gEkJ9F5CU0AYE0BCQmgOSSDsRqDlARZBGIqDVG6HiAOcCbDpAsgB4d0CMGyUogsaILU66vA/4nwAWo/sOKFxPS1B1zr9zBxgbr8akCOD9NbkZshJAAXvdGry/HjMr26CRx+QUiKLK9xYEGAZsdkAEdACugI/Ap/x5AN4v4+EECXgBHoEH4CfwMAIBOALlOfjIPEBUJkbddB8wAU+Z65E8KDllVQz4m8mX4SlXz0HZBRPwDPwBpuIAAMknRvzNCy/nhFPmPAFhWBBucli6Nirf0ri8Nf+HCTo6Ojpaxj8XjBn/uv2ZKQAAAABJRU5ErkJggg==';
	var img3 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAACeklEQVR42u2bPW4UQRSEv1mPbWyJjYhA4hA+yQZI3MUJmS/AHYh9DyRnXACJzAkGs0z3+yHYbmu8zPgAr7uk1qw0m1Rt1ev5qYWOjo6Ojo6OjkYxHB1bg4+F/PEKTXq2GIETYFM+b8qKKEQlbWUJYFWAs+vr64eWvH9zc7MF0gicAZfuzm63a4L87e0twGWNwDmwNTNUlbu7u9Dkr66uMDOALaDVAReqiqrWk2FReQIXwONYXVAdUE6GFqD8yOfAWCf/qZkhIuEdMON4CmyqAIOqIiLhHTDjOFQBnqyRcw4vwDHH/wQQkbYF6A5o2QEppfACpJSWBRCRZhww5/gkwGdVXqeE5RxagE1KfFDly7EAJoKnhAd3gKeELTnAVPGc4wuQM7Y4BEXwacKDR8CnCV10QI1AdAHWIqANzYBFB6hqOxFYnQGNREDXImDTFP46gLUhqKqHARFcgGHtUrg6IHoEbNUBrc8AEcGO9sigt4PLN0P2SbH3E67BI3AyYd8VPi44wD1jwQXYbFZuh1UVt4Rb8CtBe2kX0IR7bAFM14agKm4NRGDIyJIDTBWVBiIgafl5gKiWIShtOkBLBA7FichD8IXH4qYZt9gvRgZ/QQC3HH4XwFgWwMwwE/DYDvCBZxWAmQOqALH7AQyO6nMBDHAzLc05jy2AO3aYc06pyRmQVY2v3xoQgAE/uDwDNgBvgTfAu3LcAq/m8QgCAf4CD8A98AO4H4EE7IGf5Yt7DgWi2hgNYfzi9Al4LFz3lKLkVFRx4HchX7tDwTZApPD9A/wCpuoAAC0nRuL1hec9YSmcJyANM8JNlqWXqvIt1eW9+T9M0NHR0dEy/gH9e1uz34fFuAAAAABJRU5ErkJggg==';

	/// ловим событие нажатия на кнопке
	this.faceElement.fun = function () {
		if (self.panel.height == 0) return;
		self.visiPanel = !self.visiPanel;
		this.activ = true;
		pl102.stage.on('mousedown', self.isClickPanel);
		self.drawArr();
	};
	/// событие нажатия на кнопку
	this.funDown = function () {
		if (self.faceElement.fun) self.faceElement.fun();
	};
	/// событие сработает когда мышку наведут на кнопку
	this.funOver = function () {
		self.changeActiv(true);
	};
	/// событие сработает когда мышку уберут с кнопки
	this.funOut = function () {
		self.changeActiv(false);
	};
	/// функция для смены текста в элементе faceElement
	this.changeActiv = function (val) {
		if (!this.visiPanel && !val) {
			this.faceElement.activ = false;
		}
	};
	/// проверяем на панели сейчас
	this.isClickPanel = function () {
		this.p = self.toLocal(pl102.global);
		if (((this.p.x <= self.panel.width) && (this.p.x >= 0)) && ((this.p.y <= self.height * (self.visiCol + 1)) && (this.p.y >= 0)) && self.visiPanel) {
			self.changeActiv(true);
			return true;
		}
		return false;
	};
	/// функция отрисовки массива элементов, установка нужных цветов, и отрисовка маски
	this.drawArr = function () {
		bbb = true;
		ww = this._width - this.otstup * 2;
		var countMan = Math.round(this.arrayElement.length / 1);
		hContent = this._wh * countMan + (this.otstup * (countMan + 1));
		this.panel.width = this.faceElement.width;
		for (var i = 0; i < this.arrayElement.length; i++) {
			if (this.arrayElement[i].life == true) {
				this.arrayElement[i].y = i * (this.faceElement.height);
				// this.arrayElement[i].width=this.w2;
				this.arrayElement[i].height = this.faceElement.height;
				bbb = !bbb;
				if (this.arrayElement[i]._overOrOut) {
					this.arrayElement[i].color = this.color3;
				} else {
					if (bbb == true) {
						this.arrayElement[i].color = this.color5;
					} else {
						this.arrayElement[i].color = this.color1;
					}
				}
				if (i == this._index) { this.arrayElement[i].color = pl102.color11; }
			}
		}
		if (this._visiCol > this.array.length) {
			this.panel.height = this.array.length * this.faceElement.height + this.otstup * 2;
		} else {
			this.panel.height = this._visiCol * this.faceElement.height + this.otstup * 2;
		}

		this.graphics.clear();
		this.graphics.beginFill(this.color2);
		this.graphics.drawRect(0, 0, this.panel.width - (this.otstup * 2), this.panel.height - (this.otstup * 2)); // this.sah*(this._wh+this.otstup)

		this.graphicsImage.clear();
		this.graphicsImage.beginFill(0);
		this.graphicsImage.drawRect(0, 0, this.faceElement.width, this.faceElement.height);
	};
	/// отловка события нажатия, наведения курсора и когда курсор убирается
	this.klik = function () {
		if (this.sobEvent == 'mouseDown') {
			self._index = this.idArr;
			self.visiPanel = !self.visiPanel;
			self.faceElement.link = self.array[self._index].link;
			self.value = self.array[self._index].text;
			self.drawArr();
			if (self.fun != undefined) {
				self.fun();
			}
		}
		if (this.sobEvent == 'mouseOver') {
			self.drawArr();
		}
		if (this.sobEvent == 'mouseOut') {
			self.drawArr();
		}
	};

	/// добавление нового языка
	this.addLang = function (text, link) {
		// this.array.push({text,link}); замена для минимизации
		var o = {};
		o.text = text;
		o.link = link;
		this.array.push(o);

		this.craetElement(text, link);
		if (this.arrayElement.length == 1) {
			this._index = 0;
			this.faceElement.link = this.array[this._index].link;
			this.value = this.array[this._index].text;
		}
	};

	/// функция добавления элементов на панель, принимает объект или текс
	var element;
	this.craetElement = function (text, link) {
		element = undefined;
		for (var i = 0; i < this.arrayElement.length; i++) {
			if (this.arrayElement[i].life == false) {
				element = this.arrayElement[i];
				element.life = true;
			}
			this.arrayElement[i];
		}
		if (element == undefined) {
			element = new PLImgBoxElement(this.content, 0, 0, text, link, this.klik);
			element.idArr = this.arrayElement.length;
			this.arrayElement.push(element);
			element.life = true;
		}
		this.arrayElement[this.arrayElement.length - 1].width = 200;
		this.arrayElement[this.arrayElement.length - 1].height = this._wh;
		this.arrayElement[this.arrayElement.length - 1].text = text;
		this.drawArr();
	};
	this.delLang = function (text) {
		for (var i = 0; i < this.array.length; i++) {
			if (this.array[i].text == text) {
				this.array.splice(i, 1);
				this.arrayElement.splice(i, 1);
				for (var j = i; j < this.arrayElement.length; j++) {
					this.arrayElement[j].idArr--;
				}
			}
		}
		this.drawArr();
	};

	this.graphicsImage.on('mousedown', this.funDown);
	this.graphicsImage.on('mouseover', this.funOver);
	this.graphicsImage.on('mouseout', this.faceElement.mouseOut);
	this.graphicsImage.on('mouseover', this.faceElement.mouseOver);
	this.graphicsImage.on('mouseout', this.funOut);

	this.graphicsImage.interactive = true;
	this.graphicsImage.buttonMode = true;

	this.addLang('en', img1);
	this.addLang('ru', img2);
	this.addLang('de', img3);
}
PLComboBoxImage.prototype = Object.create(PIXI.Container.prototype);
PLComboBoxImage.prototype.constructor = PLComboBoxImage;
Object.defineProperties(PLComboBoxImage.prototype, {
	width: {
		set: function (value) {
			if (this._width != value) {
				this._width = value;
				this.faceElement.width = this._width;
				for (var i = 0; i < this.arrayElement.length; i++) {
					this.arrayElement[i].width = value;
				}
				this.drawArr();
			}
		},
		get: function () { return this._width; }
	},
	height: {
		set: function (value) {
			if (this._height != value) {
				this._height = value;
				this.faceElement.height = this._height;

				this.panel.y = this._height;
				for (var i = 0; i < this.arrayElement.length; ++i) {
					this.arrayElement[i].height = this._height;
				}
				this.drawArr();
			}
		},
		get: function () { return this._width; }
	},
	visiPanel: {
		set: function (value) {
			this._visiPanel = value;
			this.panel.visible = this._visiPanel;
			this.changeActiv(this._visiPanel);
		},
		get: function () { return this._visiPanel; }
	},
	visiCol: {
		set: function (value) {
			this._visiCol = value;
		},
		get: function () { return this._visiCol; }
	},
	color: {
		set: function (value) {
			this._color = value;
			this.faceElement.color = this._color;
		},
		get: function () { return this._color; }
	},
	index: {
		set: function (value) {
			this._index = value;
			this.faceElement.link = this.arrayElement[this._index].link;
			this.drawArr();
		},
		get: function () { return this._index; }
	}
});

export function PLImgFaceElement (cont, _x, _y, link, fun) {
	PIXI.Container.call(this);
	this.type = 'PLImgFaceElement';
	cont.addChild(this);
	this.idArr = -1; // ид элемента в массиве, в ComboBox
	this.life = false;
	var self = this;
	this.fun = fun;

	this.x = _x || 0;
	this.y = _y || 0;

	this.fun = fun;
	this.funOver;
	this.funOut;

	this._width = 100;
	this._wh = 30;
	this._height = pl102.wh;
	this._color = pl102.color;
	this._color1 = pl102.colorButton1;
	this._activ = false;
	this._visiblePanel = true;
	this._link = link;

	this._boolAnimKontut = true;// Мигание контура при наведении

	this.contentPanel = new PIXI.Container();
	this.addChild(this.contentPanel);

	this.contentFilt = new PIXI.Container();
	this.addChild(this.contentFilt);

	this.panel = new PLPanel(this.contentPanel, 0, 0);
	this.panel.height = this._height;
	this.panel.kontur = false;
	this.panel.color = this._color;
	this.panel.nizNum = 0;
	this.panel.nizAlpha = 0.7;

	this.panel1 = new PLPanel(this.contentPanel, 0, 0);
	this.panel1.height = this._height;
	this.panel1.kontur = false;
	this.panel1.visible = false;
	this.panel1.link = pl102.base2;
	this.panel1.color = this._color1;
	this.panel1.nizNum = 0;
	this.panel1.nizAlpha = 1;

	this.tween = new TWEEN.Tween(this.contentFilt);

	this.icon = new PLImage(this, 0, 0);
	this.icon.height = this.icon.width = this._height * 0.75;
	this.icon.x = (this._width - this.icon.width) / 2;
	this.icon.y = (this._height - this.icon.height) / 2;
	if (link) this.icon.link = link;

	this.contentFilt.addChild(this.icon);

	this.filt = pl102.filter;

	this.updateIcon = function () {
		if (this._width > this._height) { this.icon.height = this.icon.width = this._height * 0.75; } else { this.icon.height = this.icon.width = this._width * 0.75; }
		this.icon.x = (this._width - this.icon.width) / 2;
		this.icon.y = (this._height - this.icon.height) / 2;
	};

	this.mouseOut = function (e) {
		if (self._boolAnimKontut == true) {
			self.panel.kontur = false;
			self.panel1.kontur = false;
		}
		if (self.funOut) self.funOut();
	};
	this.mouseOver = function (e) {
		if (self._boolAnimKontut == true) {
			self.panel.kontur = true;
			self.panel1.kontur = true;
		}
		self.contentFilt.alpha = 0.5;
		self.tween.to({alpha: 1}, 500);
		self.tween.start();
		if (self.funOver) self.funOver();
	};

}
PLImgFaceElement.prototype = Object.create(PIXI.Container.prototype);
PLImgFaceElement.prototype.constructor = PLImgFaceElement;
Object.defineProperties(PLImgFaceElement.prototype, {
	width: {
		set: function (value) {
			this._width = value;
			this.panel.width = value;
			this.panel1.width = value;
			this.updateIcon();
		},
		get: function () { return this._width; }
	},
	height: {
		set: function (value) {
			this._height = value;
			this.panel.height = value;
			this.panel1.height = value;
			this.updateIcon();
		},
		get: function () { return this._height; }
	},
	boolAnimKontut: {
		set: function (value) {
			this._boolAnimKontut = value;
			if (this._boolAnimKontut == true) {
				this.panel.kontur = false;
				this.panel1.kontur = false;
			} else {
				this.panel.kontur = true;
				this.panel1.kontur = true;
			}
		},
		get: function () { return this._boolAnimKontut; }
	},
	color: {
		set: function (value) {
			if (value == undefined) return;
			this._color = value;
			this.panel.color = value;
			this.panel1.color = value;
		},
		get: function () { return this._color; }
	},
	color1: {
		set: function (value) {
			if (value == undefined) return;
			this._color1 = value;
			this.panel1.color1 = value;
		},
		get: function () { return this._color1; }
	},
	visiblePanel: {
		set: function (value) {
			this._visiblePanel = value;
			this.contentPanel.visible = value;
		},
		get: function () { return this._visiblePanel; }
	},
	activ: {
		set: function (value) {
			this._activ = value;
			this.panel.visible = !value;
			this.panel1.visible = value;
		},
		get: function () { return this._activ; }
	},
	link: {
		set: function (value) {
			this.icon.link = value;
		},
		get: function () { this.icon.link; }
	}
});

export function PLImgBoxElement (cont, _x, _y, title, link, fun) {
	PIXI.Container.call(this);
	this.type = 'PLImgBoxElement';
	cont.addChild(this);
	this.idArr = -1; // ид элемента в массиве, в ComboBox
	this.life = false;
	var self = this;
	this.fun = fun;

	this.x = _x;
	this.y = _y;
	this.title = title;
	this._color = pl102.color;
	this._wh = 30;
	this.otstup = 4;
	this._width = 100;
	this._height = pl102.wh;
	this._overOrOut = false;

	this.graphicsM = new PIXI.Graphics(); // график для возможности отлавливать события
	this.graphicsM.interactive = true;
	this.addChild(this.graphicsM);

	this.graphic = new PIXI.Graphics(); // сам элемент
	this.graphicsM.addChild(this.graphic);


	this.icon = new PLImage(this, 0, 0, pl102.base);
	this.graphicsM.addChild(this.icon);
	this.icon.link = link;
	this.icon.height = this.icon.width = this._height * 0.75;
	this.icon.x = (this._width - this.icon.width - this.otstup) / 2;
	this.icon.y = (this._height - this.icon.height - this.otstup) / 2;

	this.drawElement = function () {
		this.graphic.clear();
		this.graphic.beginFill(this._color);
		this.graphic.drawRect(0, 0, this._width, this._height, 0);
		this.updateIcon();
	};
	this.updateIcon = function () {
		if (this._width > this._height) { this.icon.height = this.icon.width = this._height * 0.75; } else { this.icon.height = this.icon.width = this._width * 0.75; }
		this.icon.x = (this._width - this.icon.width - this.otstup) / 2;
		this.icon.y = (this._height - this.icon.height - this.otstup) / 2;
	};

	this.sobEvent = 'null';
	/// событие срабатывает, когда навели курсор на элемент
	this.mouseOver = function (e) {
		self.sobEvent = 'mouseOver';
		self._overOrOut = true;
		if (self.fun != undefined)self.fun();
	};
	/// событие срабатывает, когда убрали курсор
	this.mouseOut = function (e) {
		self.sobEvent = 'mouseOut';
		self._overOrOut = false;
		if (self.fun != undefined)self.fun();
	};
	/// событие срабатывает, когда нажали на элемент
	this.mouseDown = function (e) {
		self.sobEvent = 'mouseDown';
		if (self.fun != undefined)self.fun();
	};
	this.graphicsM.on('mouseover', this.mouseOver);
	this.graphicsM.on('mouseout', this.mouseOut);
	this.graphicsM.on('mousedown', this.mouseDown);
}
PLImgBoxElement.prototype = Object.create(PIXI.Container.prototype);
PLImgBoxElement.prototype.constructor = PLImgBoxElement;
Object.defineProperties(PLImgBoxElement.prototype, {
	width: {
		set: function (value) {
			if (this._width != value) {
				this._width = value;
				this.drawElement();
			}
		},
		get: function () { return this._width; }
	},
	height: {
		set: function (value) {
			if (this._height != value) {
				this._height = value;
				this.drawElement();
			}
		},
		get: function () { return this._height; }
	},
	color: {
		set: function (value) {
			if (this._color != value) {
				this._color = value;
				this.drawElement();
			}
		},
		get: function () { return this._color; }
	},
	link: {
		set: function (value) {
			this.icon.link = value;
			this.drawElement();
		},
		get: function () { return this.icon.link; }
	}
});

export function PLComboBox (cont, _x, _y, arr, fun) {
	PIXI.Container.call(this);
	this.type = 'PLComboBox';
	this.typeCom = 'pixi';
	cont.addChild(this);
	var self = this;
	pl102.addElement(this);

	this.fun = fun;
	this.funMouseOverElement = undefined;
	this.funMouseOut = undefined;
	this.x = _x || 0;
	this.y = _y || 0;
	this._wh = 27;
	this._width = 100;
	this._height = this._wh;
	this._index = -1;
	this._value = -1;
	this._visiPanel = false;
	this._textSize = 16;
	this._visiCol = 5;
	this._color;
	this._activMouse = true;
	this._arrFont = [];
	this._revertPosCont = false;
	this._posY = undefined;
	this._docHeight = undefined;
	/** Автоматичесское определение положение панели вверх/вниз */
	this._isAutoReversePanel = false;
	this.w2 = this._width - this._wh; // переменная для правильной установки скрола, и корректного изменения ширины PXComboBoxElement

	this.array = [];
	this.arrayElement = [];
	this.indexOver = -1;
	this.otstup = 2;

	this.color1 = pl102.color2;
	this.color2 = pl102.color8;
	this.color3 = pl102.color4;
	this.color4 = pl102.color9;
	this.color5 = pl102.color;
	this.panel = new PLPanel(this, 0, this._wh); // основная панел
	pl102.removeElement(this.panel, true);
	this.panel.visible = false;
	this.panel.kontur = true;
	this.on('mouseout', function () {
		if (self.funMouseOut) self.funMouseOut();
	});
	this.interactive = true;

	this.faceElementFun;

	var bbb, ww, hContent, countMan; // нужные переменные, для разных вычислений
	this.sah = this._visiCol;

	this.graphics = new PIXI.Graphics(); // маска для корректного отображения
	this.panel.content.addChild(this.graphics);

	this.content = new PIXI.Container(); // контент для элементов PXComboBoxElement
	this.addChild(this.content);
	this.content2 = new PIXI.Container(); // контент для маски
	this.panel.content.addChild(this.content2);

	this.content2.addChild(this.content);

	this.content2.mask = this.graphics;
	this.graphics.x = this.graphics.y = this.content2.x = this.content2.y = this.otstup;

	this.faceElement = new PLFaceElement(this, 0, 0, 'Text'); // кнопка с отображением выбраного элемента
	pl102.removeElement(this.faceElement, true);
	this.faceElement.height = this._wh;
	this.faceElement.width = this._width;
	this.faceElement.label.font = this._textSize;

	this.contentFilt = new PIXI.Container();
	this.addChild(this.contentFilt);
	this.tween = new TWEEN.Tween(this.contentFilt);
	this.contentFilt.addChild(this.faceElement);

	/// графика для нажатия на картинку стрелочки
	this.graphicsImage = new PIXI.Graphics();
	this.addChild(this.graphicsImage);
	this.graphicsImage.interactive = true;
	this.graphicsImage.alpha = 0;

	this.graphRect = new PIXI.Graphics();
	this.addChild(this.graphRect);
	this.graphRect.alpha = 0.5;

	this.graphCover = new PIXI.Graphics();
	this.addChild(this.graphCover);
	this.graphCover.alpha = 0.5;
	this.graphCover.visible = false;
	this.graphCover.interactive = true;

	this.updateActivMouse = function () {
		if (this._visiPanel) this.visiPanel = this._activMouse;
		this.graphCover.clear();
		this.graphCover.visible = !this._activMouse;
		this.drawArr();
	};

	this.faceElement.fun = function () {

		if (self.panel.height == 0) return;
		setVisiblePanel(!self.visiPanel);

		this.activ = true;

		if (self.faceElementFun) self.faceElementFun();

		setTimeout(function () {

			if (pl102.isMouseEvents) {
				pl102.stage.on('mousedown', self.closePanel);
				pl102.stage.on('mouseup', self.closePanel);
			}

			if (pl102.isTouchEvents) {
				pl102.stage.on('touchstart', self.closePanel);
				pl102.stage.on('touchend', self.closePanel);
			}

		}, 1);
	};

	var index1 = -1;
	this.funClick;
	this.funDown = function () {
		// кидаем компонент поверх остальных в родительском контейнере
		cont.addChild(self);
		if (self._isAutoReversePanel && !self.panel.visible) {
			self.checkPositionPanel();
		}
		if (self.faceElement.fun) self.faceElement.fun();
		if (self.funClick) self.funClick();
	};

	this.funOver = function () {
		if (self._activMouse) self.changeText(true);
	};
	this.funOut = function () {
		self.changeText(false);
	};
	this.scrollBar = new PLScrollBarV(this.panel, 0, 0, function () {
		var v = (self.array.length - self.sah);
		var v1 = Math.round((this.value / 100) * v);
		self.content.y = -(self.faceElement.height) * v1;
	});
	pl102.removeElement(this.scrollBar, true);

	this.scrollBar.offsetHit;

	this.scrollBar.visible = false;

	pl102Wheel.on(this, 'mousewheel', function (e) {
		self.scrollBar.scrolValue -= e.delta * self._wh;
		self.scrollBar.fun();
	});

	this.changeText = function (val) {
		if (!this.visiPanel && !val) {
			this.faceElement.activ = false;
		}
	};
	// метод определяющий направление выпадания панели (вверх/вниз)
	var glodalPoint = new PIXI.Point();
	this.checkPositionPanel = function () {
		this.getGlobalPosition(glodalPoint);
		var isBottom = ((window.innerHeight - (glodalPoint.y + this._wh)) > self.panel.height);
		this.revertPosCont = !isBottom;
	};

	this.isClickPanel = function () {
		this.p = self.toLocal(pl102.global);

		var px = ((this.p.x <= self.panel.width) && (this.p.x >= 0));
		var py = ((this.p.y <= self.height * (self.sah + 1)) && (this.p.y >= 0));

		if (this._revertPosCont === true) {
			py = (this.p.y <= self.height) && (-this.p.y <= (self.height * self.sah));
		}

		if (px && py && self.visiPanel) {
			self.changeText(true);
			return true;
		}

		return false;
	};

	this.closePanel = function () {
		if (self.isClickPanel() === true) {
			return;
		}

		if (pl102.isMouseEvents) {
			pl102.stage.off('mousedown', self.closePanel);
			pl102.stage.off('mouseup', self.closePanel);
		}
		if (pl102.isTouchEvents) {
			pl102.stage.off('touchstart', self.closePanel);
			pl102.stage.off('touchend', self.closePanel);
		}


		self.changeText(false);
		setVisiblePanel(false);
		self.drawArr();
	};
	/// когда меняется количество отобржаемых элементов
	this.changeVisiCol = function () {
		this.sah = this._visiCol;
		this.content.y = 0;
		if (this.array.length <= this.sah) {
			this.sah = this.array.length;
			this.scrollBar.visible = false;
			this.w2 = this.faceElement.width;
		} else {
			this.scrollBar.visible = true;
			this.scrollBar.height = (this.faceElement.height) * this._visiCol + this.otstup;
			this.scrollBar.heightContent = this._wh * this.array.length;
			this.w2 = this.faceElement.width - this.scrollBar.width + this.otstup - 1;
		}
		this.scrollBar.offsetHit = this.scrollBar.width;
		this.panel.height = (this._wh * this.sah) + this.otstup + 1;
		this.drawArr();
	};
	/// функция отрисовки массива элементов, установка нужных цветов, и отрисовка маски
	this.drawArr = function () {
		bbb = true;
		ww = this._width - this.otstup * 2;
		var countMan = Math.round(this.arrayElement.length / 1);
		hContent = this._wh * countMan + (this.otstup * (countMan + 1));
		this.panel.width = this.faceElement.width;
		this.scrollBar.width = this._wh / 3;
		this.scrollBar.x = this.panel.width - this.scrollBar.width;
		for (var i = 0; i < this.arrayElement.length; i++) {
			if (this.arrayElement[i].life == true) {
				this.arrayElement[i].y = i * (this.faceElement.height);
				this.arrayElement[i].width = this.w2;
				this.arrayElement[i].height = this.faceElement.height;
				bbb = !bbb;
				if (this.arrayElement[i]._overOrOut) {
					this.arrayElement[i].color = this.color3;
				} else {
					if (bbb == true) {
						this.arrayElement[i].color = this.color5;
					} else {
						this.arrayElement[i].color = this.color1;
					}
				}
				if (i == this._index) { this.arrayElement[i].color = pl102.color11; }
			}
		}
		if (this._visiCol > this.array.length) {
			this.panel.height = this.array.length * this.faceElement.height + this.otstup * 2;
		} else {
			this.panel.height = this._visiCol * this.faceElement.height + this.otstup * 2;
		}
		// Размеры и координаты стрелки на основной кнопке
		var arrowH = this.faceElement.height / 6;
		var arrowW = this.faceElement.height / 3;
		var arrowX = this.faceElement.width - arrowW - this.faceElement.width / 100 * 10;
		var arrowY = (this.faceElement.height - arrowH) / 2;

		this.graphics.clear();
		this.graphics.beginFill(this.color2);
		this.graphics.drawRect(0, 0, this.w2 - this.otstup * 2, this.panel.height - (this.otstup * 2));

		this.graphicsImage.clear();
		this.graphicsImage.beginFill(0);
		this.graphicsImage.drawRect(0, 0, this.faceElement.width, this.faceElement.height);

		this.graphCover.clear();
		this.graphCover.beginFill(0xffffff);
		this.graphCover.drawRect(0, 0, this.faceElement.width, this.faceElement.height);
		this.graphCover.endFill();
		// Обозначение точек стрелки
		if (this._revertPosCont === true) this.panel.y = -this.panel.height;
		else this.panel.y = this._wh;
	};


	/// отловка события нажатия, наведения курсора и когда курсор убирается - Водим курсором по панельке
	this.klik = function () {
		if (this.sobEvent == 'mouseDown') {
			self._index = this.idArr;
			self.faceElement.text = self.arrayElement[self._index].text;
			setVisiblePanel(!self.visiPanel);
			self.drawArr();
			if (self._index != index1) {
				if (self._index != -1) {
					if (self.fun != undefined) self.fun();
					index1 = self._index;
				}
			}
		}
		if (this.sobEvent == 'mouseOver') {
			self.drawArr();
			if (self.funMouseOverElement) self.funMouseOverElement(this.idArr);
		}
		if (this.sobEvent == 'mouseOut') {
			self.drawArr();
		}
	};

	function setVisiblePanel (isVisible) {
		self.visiPanel = isVisible;
		if (self.funChangeVisiblePanel) self.funChangeVisiblePanel(isVisible);
	}

	/// добавление нового элемента
	this.add = function (text) {
		this.array.push(text);
		var newElem = this.craetElement(text);
		if (this.arrayElement.length == 1) {
			// this._index = 0;
			this.faceElement.text = this.array[0/* this._index */];
		}
		this.scrollBar.value = 0;
		self.content.y = 0;
		this.changeVisiCol();
	};

	/// добавления массива элементов
	var ind;

	this.addArr = function (arr) {
		if (arr == undefined) return;
		for (var i = 0; i < arr.length; i++) {
			this.add(arr[i]);
		}
	};
	this.setObj = function (arr) {
		this.clear();
		this.addArr(arr);
	};

	this.getInnerCompByText = function (_text) {
		for (var i = 0; i < this.arrayElement.length; i++) {
			if (this.arrayElement[i].text === _text) {
				return this.arrayElement[i];
			}
		}

		return null;
	};

	this.textWasChanged = function () {

		if (self.arrayElement.length === 0) return;

		if (self._index < 0) self._index = 0;

		self.faceElement.text = self.arrayElement[self._index].text;
	};

	/// функция добавления элементов на панель, принимает объект или текс
	var element;
	this.craetElement = function (text) {
		element = undefined;
		for (var i = 0; i < this.arrayElement.length; i++) {
			if (this.arrayElement[i].life == false) {
				element = this.arrayElement[i];
				element.life = true;
			}
			this.arrayElement[i];
		}
		if (element == undefined) {
			element = new PLComboBoxElement(this.content, 0, 0, text, this.klik);
			pl102.removeElement(element, true);
			element.idArr = this.arrayElement.length;
			this.arrayElement.push(element);
			element.life = true;
		}
		element.width = this.faceElement.width + this.otstup + this._wh;
		element.height = this._wh;
		element.text = text;
		element.textSize = this.faceElement.textSize;
		element.funUpdText = this.textWasChanged;
		this.drawArr();
	};
	this.clear = function () {
		this.arrayElement = [];
		this.array = [];
		this.visiPanel = false;
		this.panel.height = 0;
		this.drawArr();
	};

	if (pl102.isMouseEvents) {
		this.graphicsImage.on('mousedown', this.funDown);
		this.graphicsImage.on('mouseover', this.funOver);
		this.graphicsImage.on('mouseout', this.faceElement.mouseOut);
		this.graphicsImage.on('mouseover', this.faceElement.mouseOver);
		this.graphicsImage.on('mouseout', this.funOut);
	}
	if (pl102.isTouchEvents) {
		this.graphicsImage.on('touchstart', this.funDown);
	}

	this.graphicsImage.interactive = true;
	this.graphicsImage.buttonMode = true;
	if (pl102.isMouseEvents) {
		this.faceElement.graphicsArrow.on('mousedown', this.funDown);
		this.faceElement.graphicsArrow.on('mouseover', this.funOver);
		this.faceElement.graphicsArrow.on('mouseout', this.faceElement.mouseOut);
		this.faceElement.graphicsArrow.on('mouseover', this.faceElement.mouseOver);
		this.faceElement.graphicsArrow.on('mouseout', this.funOut);
	}
	if (pl102.isTouchEvents) {
		this.faceElement.graphicsArrow.on('touchstart', this.funDown);
	}

	this.faceElement.graphicsArrow.interactive = true;
	this.faceElement.graphicsArrow.buttonMode = true;

	this.addArr(arr);
}
PLComboBox.prototype = Object.create(PIXI.Container.prototype);
PLComboBox.prototype.constructor = PLComboBox;
Object.defineProperties(PLComboBox.prototype, {
	width: {
		set: function (value) {
			if (this._width != value) {
				this._width = value;
				this.faceElement.width = this._width;
				if (this.scrollBar.visible == false) {
					this.w2 = this._width;
				} else {
					this.w2 = this._width;
				}
				this.drawArr();
			}
		},
		get: function () { return this._width; }
	},
	height: {
		set: function (value) {
			if (this._height != value) {
				this._height = value;
				this.faceElement.height = this._height;
				this.panel.y = this._height;
				for (var i = 0; i < this.arrayElement.length; ++i) {
					this.arrayElement[i].height = this._height;
				}
				this.changeVisiCol();
			}
		},
		get: function () {
			return this._height;
		}
	},
	visiPanel: {
		set: function (value) {
			if (this._visiPanel == value) return;
			this.faceElement.visiPanel = this._visiPanel;
			this._visiPanel = value;
			this.panel.visible = this._visiPanel;
			this.changeText(this._visiPanel);
			if (this.faceElementFun) this.faceElementFun();
		},
		get: function () { return this._visiPanel; }
	},
	textSize: {
		set: function (value) {
			// if(value < 1) return;
			this._textSize = value;

			this.faceElement.textSize = value;

			for (var i = 0; i < this.arrayElement.length; i++) {
				this.arrayElement[i].textSize = value;
			}
		},
		get: function () { return this._textSize; }
	},
	visiCol: {
		set: function (value) {
			this._visiCol = value;
			this.changeVisiCol();
		},
		get: function () { return this._visiCol; }
	},
	color: {
		set: function (value) {
			this._color = value;
			this.faceElement.color = this._color;
			this.changeVisiCol();
		},
		get: function () { return this._color; }
	},
	index: {
		set: function (value) {
			value = parseInt(value);
			var needsUpdate = this._index != value;
			this._index = value;
			this._value = value;
			this.faceElement.text = this.arrayElement[this._index].text;
			if (needsUpdate) {
				this.drawArr();
			}
		},
		get: function () {
			return this._index;
		}
	},
	value: {
		set: function (v) {

			if (typeof v === 'number') {
				this.index = v;
				this._value = v;
			} else {
				for (var i = 0; i < this.arrayElement.length; i++) {
					if (this.arrayElement[i].text === v) {
						this.index = v;
						break;
					}
				}
			}
		},
		get: function () {
			return this._index;
		}
	},
	activMouse: {
		set: function (value) {
			if (this._activMouse == value) return;
			this._activMouse = value;
			this.faceElement.activMouse = value;
			this.faceElement.graphicsArrow.interactive = value;
			this.faceElement.graphicsArrow.buttonMode = value;
			this.updateActivMouse();
		},
		get: function () {
			return this._activMouse;
		}
	},
	arrFont: {
		set: function (value) {
			this._arrFont = value;
			this.addArr(this._arrFont);
		},
		get: function () {
			return this._arrFont;
		}
	},
	revertPosCont: {
		set: function (value) {
			if (this._revertPosCont === value) return;
			this._revertPosCont = value;

			this.drawArr();
		},
		get: function () {
			return this._revertPosCont;
		}
	},
	isAutoReversePanel: {
		set: function (value) {
			if (this._isAutoReversePanel === value) return;
			this._isAutoReversePanel = value;
		},
		get: function () {
			return this._isAutoReversePanel;
		}
	}
});

export function PLComboBoxElement (cont, _x, _y, title, fun) {
	PIXI.Container.call(this);
	this.type = 'PLComboBoxElement';
	cont.addChild(this);
	var self = this;
	pl102.addElement(this);

	this.fun = fun;
	this.funUpdText; // когда изменился текст
	this.x = _x;
	this.y = _y;
	this._color = pl102.color;
	this._wh = 30;
	this._width = 100;
	this._height = pl102.wh;
	this._overOrOut = false;
	this._textSize;
	this._text = title;
	this._visiPanel = false;


	this.title = title;

	this.boolText = true;
	this.idArr = -1; // ид элемента в массиве, в ComboBox
	this.life = false;
	this.otstup = 4;

	this.graphicsM = new PIXI.Graphics(); // график для возможности отлавливать события
	this.graphicsM.interactive = true;
	this.addChild(this.graphicsM);

	this.graphic = new PIXI.Graphics(); // сам элемент
	this.graphicsM.addChild(this.graphic);

	this.label;
	this.img;

	this.isBoolText = function (str) {
		if (str.length > 4) {
			if (str.indexOf('.jpg') != -1) return false;
			if (str.indexOf('.png') != -1) return false;
		}
		return true;
	};
	this.boolText = this.isBoolText(this.title);

	this.addElement = function () {
		if (this.boolText == true) {
			this.label = new PLLabel(this, 0, 0, this.title);
			pl102.removeElement(this.label, true);
			this.rect = this.label.getRect();
			this.rect.width /= this.worldTransform.a;
			this.rect.height /= this.worldTransform.a;
			this.label.x = this.otstup * 2;
		} else {
			this.img = new PLImage(this, 0, 0, this.title, function () {
				this.height = self._wh;
				this.width = this.picWidth * self._wh / this.picHeight;
				this.y = (self._wh - this.height) / 2;
			});
			pl102.removeElement(this.img, true);
			this.graphicsM.addChild(this.img);
		}

	};
	this.addElement();
	this.drawElement = function () {
		this.graphic.clear();
		this.graphic.beginFill(this._color);
		this.graphic.drawRect(0, 0, this._width, this._height, 0);
	};

	this.textCenter = function () {
		if (this.boolText == true) {
			this.rect = this.label.getBounds();
			this.rect.width /= this.worldTransform.a;
			this.rect.height /= this.worldTransform.a;
			this.label.y = (this._height - this.rect.height) / 2;
			this.label.x = this._wh / 3;
		}
	};

	this.but = new PLButton(this, 0, 0);
	pl102.removeElement(this.but, true);
	this.but.width = this._width;
	this.but.height = this._height;
	this.but.alpha = 0;

	this.sobEvent = 'null';
	this.but.fun = function () {
		self.sobEvent = 'mouseDown';
		if (self.fun != undefined)self.fun();
	};

	this.but.funOver = function () {
		self.sobEvent = 'mouseOver';
		self._overOrOut = true;
		if (self.fun != undefined)self.fun();
	};

	this.but.funOut = function () {
		self.sobEvent = 'mouseOut';
		self._overOrOut = false;
		if (self.fun != undefined)self.fun();
	};


}
PLComboBoxElement.prototype = Object.create(PIXI.Container.prototype);
PLComboBoxElement.prototype.constructor = PLComboBoxElement;
Object.defineProperties(PLComboBoxElement.prototype, {

	width: {
		set: function (value) {
			if (this._width != value) {
				this._width = value;
				this.but.width = this._width;
				this.textCenter();
				this.drawElement();
			}
		},
		get: function () { return this._width; }
	},
	height: {
		set: function (value) {
			if (this._height != value) {
				this._height = value;
				if (this.label != undefined) { this.rect = this.label.getRect(); }
				this.but.height = this._height;
				this.textCenter();
				this.drawElement();
			}
		},
		get: function () { return this._height; }
	},
	color: {
		set: function (value) {
			if (this._color != value) {
				this._color = value;
				this.textCenter();
				this.drawElement();
			}
		},
		get: function () { return this._color; }
	},
	text: {
		set: function (value) {
			this._text = value;

			if (this.label !== undefined) this.label.text = this._text;

			if (this.funUpdText) this.funUpdText();
		},
		get: function () {
			this.boolText = this.isBoolText(this.title);

			if (this.boolText == true) return this.label.text;
			else return this.img.link;
		}
	},
	textSize: {
		set: function (value) {
			if (this._boolText == true) {
				this.label.fontSize = value;
				this.textCenter();
				this.drawElement();
			}
		},
		get: function () { return this.label.style.fontSize; }
	}
});

export function PLFaceElement (cont, _x, _y, text, fun) {
	PIXI.Container.call(this);
	this.type = 'PLFaceElement';
	cont.addChild(this);
	var self = this;
	pl102.addElement(this);

	this.fun = fun;
	this.x = _x || 0;
	this.y = _y || 0;
	this._width = 100;
	this._wh = 30;
	this._height = pl102.wh;
	this._color = pl102.color;
	this._color1 = pl102.colorButton1;
	this._color2 = pl102.color;
	this._activ = false;
	this._visiblePanel = true;
	this._activMouse = true;
	this._text = text;
	this._visiPanel = true;
	this.xz = 10;

	if (this._text == undefined) this._text = 'text';
	if (this._text == null) this._text = 'text';
	if (this._text.length == 0) this._text = ' ';

	this.funOver;
	this.funOut;

	this.boolText = true;
	this.idArr = -1; // ид элемента в массиве, в ComboBox
	this.life = false;

	this.otstup = 4;

	this.contentPanel = new PIXI.Container();
	this.addChild(this.contentPanel);

	this.contentFilt = new PIXI.Container();
	this.addChild(this.contentFilt);

	this.panel = new PLPanel(this.contentPanel, 0, 0);
	pl102.removeElement(this.panel, true);
	this.panel.height = this._height;
	this.panel.kontur = true;
	this.panel.color = this._color;
	this.panel.nizNum = 0;
	this.panel.nizAlpha = 0.2;

	this.panel1 = new PLPanel(this.contentPanel, 0, 0);
	pl102.removeElement(this.panel1, true);
	this.panel1.height = this._height;
	this.panel1.kontur = true;
	this.panel1.visible = false;
	this.panel1.link = pl102.base2;
	this.panel1.color = this._color;
	this.panel1.nizNum = 0;
	this.panel1.nizAlpha = 1;

	/// графика для нажатия на картинку стрелочки
	this.graphicsArrow = new PIXI.Graphics();
	this.graphicsArrow.interactive = true;
	this.addChild(this.graphicsArrow);
	this.graphicsMask = new PIXI.Graphics();
	this.addChild(this.graphicsMask);
	this.contentFilt.mask = this.graphicsMask;

	this.tween = new TWEEN.Tween(this.contentFilt);
	this.label = new PIXI.Text(this._text, pl102.style);
	this.contentFilt.addChild(this.label);

	this.graphCover = new PIXI.Graphics();
	this.addChild(this.graphCover);
	this.graphCover.alpha = 0.5;
	this.graphCover.visible = false;
	this.graphCover.interactive = true;

	this.rect = this.label.getBounds();
	this.rect.width /= this.worldTransform.a;
	this.rect.height /= this.worldTransform.a;

	this.filt = pl102.filter;

	this.isBoolText = function (str) {
		if (str.length > 4) {
			if (str.indexOf('.jpg') != -1) return false;
			if (str.indexOf('.png') != -1) return false;
		}
		return true;
	};
	this.boolText = this.isBoolText(this._text);

	this.img;
	this.addImg = function () {
		if (this.img == undefined) {
			this.img = new PLImage(this, 0, 0, this._text, function () {
				this.height = self._wh;
				this.width = this.picWidth * self._wh / this.picHeight;
			});
			pl102.removeElement(this.img, true);

			this.contentFilt.addChild(this.img);

		} else { this.img.visible = true; }
		this.img.link = this._text;
		this.label.text = '';
	};

	this.textCenter = function () {
		this.rect = this.label.getBounds();
		this.rect.width /= this.worldTransform.a;
		this.rect.height /= this.worldTransform.a;
		this.label.y = (this._height - this.rect.height) / 2;
		this.label.x = this._wh / 3;
	};
	this.updateActivMouse = function () {
		this.graphCover.clear();
		this.graphCover.visible = !this._activMouse;
		this.draw102();
	};

	var yy = 0;
	this.draw102 = function () {
		this.textCenter();
		yy = (this._height - this.xz) / 2;

		this.graphCover.clear();
		this.graphCover.beginFill(0xffffff);
		this.graphCover.drawRect(0, 0, this._width, this._height);
		this.graphCover.endFill();

		this.graphicsMask.clear();
		this.graphicsMask.beginFill(0xffffff);
		this.graphicsMask.drawRect(this.otstup, this.otstup, this._width - this.otstup * 2 - yy - this.xz * 2, this._height - this.otstup * 2);
		this.graphicsMask.endFill();


		this.graphicsArrow.x = this._width - yy - this.xz;
		this.graphicsArrow.y = yy;

	};
	this.mouseOut = function (e) {
		if (self.funOut) self.funOut();
	};
	this.mouseOver = function (e) {
		self.panel.kontur = true;
		self.panel1.kontur = true;
		self.contentFilt.alpha = 0.2;
		self.tween.to({alpha: 1}, 500);
		self.tween.start();
		if (self.funOver) self.funOver();
	};


	this.drawFF = function () {
		this.graphicsArrow.clear();

		if (this._visiPanel == true) {
			this.label.style.fill = pl102.colorLabel;
			this.graphicsArrow.lineStyle(2, pl102.colorLabel);
			this.graphicsArrow.moveTo(0, this.xz / 2);
			this.graphicsArrow.lineTo(this.xz / 2, this.xz);
			this.graphicsArrow.lineTo(this.xz, 0);

		} else {
			this.label.style.fill = pl102.color;
			this.graphicsArrow.lineStyle(2, pl102.color);
			this.graphicsArrow.moveTo(0, this.xz / 2);
			this.graphicsArrow.lineTo(this.xz / 2, this.xz);
			this.graphicsArrow.lineTo(this.xz, 0);
		}
	};
	this.drawFF();

}
PLFaceElement.prototype = Object.create(PIXI.Container.prototype);
PLFaceElement.prototype.constructor = PLFaceElement;
Object.defineProperties(PLFaceElement.prototype, {
	visiPanel: {
		set: function (value) {
			if (this._visiPanel == value) return;
			this._visiPanel = value;
			this.drawFF();
		},
		get: function () { return this._visiPanel; }
	},

	width: {
		set: function (value) {
			this._width = value;
			this.panel.width = value;
			this.panel1.width = value;
			this.draw102();
		},
		get: function () { return this._width; }
	},
	height: {
		set: function (value) {
			this._height = value;
			this.rect = this.label.getBounds();
			this.panel.height = value;
			this.panel1.height = value;
			this.draw102();
		},
		get: function () { return this._height; }
	},
	color: {
		set: function (value) {
			if (value == undefined) return;
			this._color = value;
			this.label.style.fill = this._color;
			this.panel.color = value;
			this.panel1.color = value;
		},
		get: function () { return this._color; }
	},
	text: {
		set: function (value) {
			this._text = value;
			this.boolText = this.isBoolText(this._text);
			if (this.boolText == false) {
				this.addImg();
			} else {
				this.label.text = this._text;
				if (this._text == undefined) this._text = 'text';
				if (this._text == null) this._text = 'text';
				if (this._text.length == 0) this._text = ' ';

				if (this.img != undefined) { this.img.visible = false; }
				this.draw102();
			}
		},
		get: function () { return this._text; }
	},
	visiblePanel: {
		set: function (value) {
			this._visiblePanel = value;
			this.contentPanel.visible = value;
		},
		get: function () { return this._visiblePanel; }
	},
	activ: {
		set: function (value) {
			this._activ = value;
			this.panel.visible = !value;
			this.panel1.visible = value;
		},
		get: function () { return this._activ; }
	},
	textSize: {
		set: function (value) {
			this.label.style.fontSize = value;
			this.draw102();
		},
		get: function () { return this.label.style.fontSize; }
	},
	activMouse: {
		set: function (value) {
			if (this._activMouse == value) return;
			this._activMouse = value;
			this.updateActivMouse();
		},
		get: function () {
			return this._activMouse;
		}
	}
});

// обычная галерея
export function PLScrollBarND (cont, _x, _y, fun) {
	PIXI.Container.call(this);
	var self = this;
	cont.addChild(this);
	this.type = 'PLScrollBarND';

	this.x = _x || 0;
	this.y = _y || 0;


	this._width = 100;
	this._height = 100;
	this._color = 0;
	this._color1 = 0;
	this._otstup = 4;
	this._scrolValue = 0;
	this._heightContent = 100;

	this.panel = new PLPanel(this, 0, 0);
	this.panel.kontur = 0;
	this.panel.image.visible = false;

	this.scroll = new PLScrollBarV(this, 0, 0, fun);
	this.scroll.panel.image.visible = false;

	this.scroll.but.panel.image.visible = false;
	this.scroll.but.boolKontur = false;

	this.draw = function () {
		this.panel.width = this._width;
		this.panel.height = this._height;
		this.scroll.x = this._otstup;
		this.scroll.y = this._otstup;
		this.scroll.width = this._width - this._otstup * 2;
	};
	this.draw();

}

PLScrollBarND.prototype = Object.create(PIXI.Container.prototype);
PLScrollBarND.prototype.constructor = PLScrollBarND;
Object.defineProperties(PLScrollBarND.prototype, {
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
			this.scroll.height = this._height - this._otstup * 2;
			this.draw();

		},
		get: function () {
			return this._height;
		}
	},
	color: {
		set: function (value) {
			if (this._color == value) return;
			this._color = value;
			this.panel.color = this._color;

		},
		get: function () {
			return this._color;
		}
	},
	color1: {
		set: function (value) {
			if (this._color1 == value) return;
			this._color1 = value;
			this.scroll.but.color = this._color1;

		},
		get: function () {
			return this._color1;
		}
	},
	heightContent: {
		set: function (value) {
			if (this._heightContent == value) return;
			this._heightContent = value;
			this.scroll.heightContent = this._heightContent - this._otstup * 2;
		},
		get: function () {
			return this._heightContent;
		}
	},
	scrolValue: {
		set: function (value) {
			if (this.scroll.scrolValue == value) return;
			this.scroll.scrolValue = value;
		},
		get: function () {
			return this.scroll.scrolValue;
		}
	},
	value: {
		set: function (value) {
			if (this.scroll.value == value) return;
			this.scroll.value = value;
		},
		get: function () {
			return this.scroll.value;
		}
	}
});


export function PLDebagContent (cont, _x, _y) {
	PIXI.Container.call(this);
	this.type = 'PLDebagContent';


	this.graphics = new PIXI.Graphics();
	cont.addChild(this.graphics);

	this.graphics.x = _x || 0;
	this.graphics.y = _y || 0;

	this.color = -1;
	this.colorAlpha = 1;

	this.lineSize = -1;// Рандомно
	this.lineColor = 0x999999;
	this.colorAlpha = 1;
	var p, p1, p2, p3;

	this.clear = function () {
		this.graphics.clear();
	};


	this.redragStil = function () {
		if (this.color != -1) this.graphics.beginFill(this.color, this.colorAlpha);
		if (this.lineSize == -1) {
			this.graphics.lineStyle(1, Math.random() * 0xffffff, 0.3);
		} else {
			this.graphics.lineStyle(this.lineSize, this.lineColor, this.colorAlpha);
		}
	};


	this.rect = function (_x, _y, _w, _h) {
		this.redragStil();
		this.graphics.drawRect(_x, _y, _w, _h);
		this.graphics.endFill();
	};

	this.grid = function (_w, _h, _wK, _hK) {
		this.redragStil();
		p = _w || 10;
		p1 = _h || 10;
		p2 = _wK || 10;
		p3 = _hK || 10;

		for (var i = 0; i < p2; i++) {
			this.graphics.moveTo(i * p, 0);
			this.graphics.lineTo(i * p, p1 * p3);
		}
		for (var i = 0; i < p3; i++) {
			this.graphics.moveTo(0, i * p1);
			this.graphics.lineTo(p * p2, i * p1);
		}
		this.graphics.endFill();
	};
}
