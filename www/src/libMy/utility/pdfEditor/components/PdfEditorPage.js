function PdfEditorPage (_cont) {
	PIXI.Container.call(this);
	var self = this;
	this.type = 'PdfEditorPage';

	_cont.addChild(this);

	this.content = new PIXI.Container();
	this.content.interactive = true;
	this.addChild(this.content);

	/** Контейнер с маской, что б не скрывались кнопки драгера */
	this.maskedContainer = new PIXI.Container();
	/** Контейнер относительно которого крутиться картинка */
	this.offsetToCenterCont = new PIXI.Container();
	this.maskGraphics = new PIXI.Graphics();
	/** Контейнер с картинкой что масштабируем, крутим  */
	this.centeredImageCont = new PIXI.Container();
	/** Контейнер с картинкой */
	this.imageContainer = new PIXI.Container();

	this.content.addChild(this.maskedContainer);
	this.maskedContainer.addChild(this.offsetToCenterCont);
	this.maskedContainer.addChild(this.maskGraphics);
	this.maskGraphics.hitArea = new PIXI.Rectangle(0, 0, 0, 0);
	this.maskedContainer.mask = this.maskGraphics;
	this.offsetToCenterCont.addChild(this.centeredImageCont);
	this.centeredImageCont.addChild(this.imageContainer);

	/** Длина с учетом открытого меню названия комнат */
	this._widthCropComp = 100;
	this._width = 100;
	this._height = 100;
	this._mashtabImage = 1;
	this._mashtab = 1;
	this._rotation = 0;
	this._activ = true;

	this.maskedContainer.visible = true;
	/** На сколько поворачиваем */
	this.shagRotation = Math.PI / 2;
	/** На сколько увеличиваем */
	this.shagZoom = 0.1;
	this.maxZoom = 4;
	this.minZoom = 0.1;

	this.debug = false;
	/** Масштаб картинки */
	var adaptMash = 1;
	/** Масштаб зума */
	var zoomMash = 0;
	/** Активный шаг с меню футера. */
	var stateIndex = 0;
	/** Активация кнопки таскания если нажиали вне выделеной области. */
	var isDragePage = false;

	/** Полный размер картинки */
	var rectFullImg = new Rectangle();
	/** Размер картинки с учетом масштаба */
	var rectScaledImg = new Rectangle();
	/** Расчитываетса полный размер картинки с учетом поворота */
	var boundImageRect = new Rectangle();
	/** Рект картинки у учетом размеров компонента */
	var viewImageRect = new Rectangle();
	/** Размер компонента */
	var borderPageRect = new PIXI.Rectangle();
	/** Рект выделенной области на картинке */
	var cropRect = new PIXI.Rectangle();

	var loadNewImage = true;
	/** Область интерактива для отлавливания событий */
	var hitAreaContent = new PIXI.Rectangle();
	this.content.hitArea = hitAreaContent;

	this.image = new PLImage(this.imageContainer);
	/** Рисует серый фон на картинке относительно размеров драгера */
	this.pdfEditorBackground = new PdfEditorBackground(this.maskedContainer);
	/** Компонент подстраивает под выделенную область картинку и фоткает */
	this.pdfEditorCrop = new PdfEditorCrop(this.maskedContainer);
	/** Таскалка */
	this.pXD = new PLDragObject();
	this.pXD.arrBtnEventTransfer = [0, 1];
	this.pXD.oppositeCenter = true;
	this.pXD.upBtnRot = false;
	this.pXD.butRot = false;
	/** События от колесика мыши */
	this.wheel = new Pl102Wheel();

	this.image.funComplit = function () {

		self.clear();

		if (this.visible === false) this.visible = true;

		rectFullImg.width = this.picWidth;
		rectFullImg.height = this.picHeight;

		self.image.width = this.picWidth;
		self.image.height = this.picHeight;

		self.offsetToCenterCont.x = borderPageRect.width / 2;
		self.offsetToCenterCont.y = borderPageRect.height / 2;

		self.updateImageSize();

		var px = self.centeredImageCont.width * 0.5 / self._mashtabImage;
		var py = self.centeredImageCont.height * 0.5 / self._mashtabImage;

		self.centeredImageCont.pivot.set(px, py);

		rectScaledImg.p.x = self.offsetToCenterCont.x;
		rectScaledImg.p.y = self.offsetToCenterCont.y;

		self.pXD.rectangle = viewImageRect;

		self.pdfEditorBackground.setRect(self.pXD._rectangle, viewImageRect);

		self.pdfEditorBackground.activ = true;

		loadNewImage = true;

		self.updatePosFromRect(self.offsetToCenterCont.position);

		self.updateToCropRect();

		self.dispatchEvent(new PdfEditorEvent('loadImageComplit'));
	};

	this.pXD.funMouseMove = function () {

		self.checkBorderDrag();
		self.pdfEditorBackground.setRect(this._rectangle, viewImageRect);

		self.updateToCropRect();

		if (self.debug === true) debug();
	};

	this.pdfEditorBackground.funDown = function () {
		self.onDown();
		isDragePage = true;
		self.updateStateMenu();
	};

	this.pdfEditorBackground.funUp = function () {
		isDragePage = false;
		self.updateStateMenu();
		self.onUp();
	};

	this.wheelDrag = function (e) {
		var h = !(stateIndex === 2);
		if (h === true) self.zoomPage(e.delta);
	};

	this.wheel.on(this.content, 'mousewheel', this.wheelDrag);
	/**
	 * Загрузка картинки в компонент.
	 * @param {String} _link - линк на картинку.
	 * @param {Rectangle} _rect - размер картинки при фотографировании.
	 */
	this.setImage = function (_link, _rect) {

		if (this.image.visible === false) this.image.visible = true;

		this.image.link = _link;
		this.pdfEditorCrop.setImage(_link, _rect);
	};
	/**
	 * Подстройка картинки под размер компонента.
	 */
	this.updateImageSize = function () {
		// габаритные размеры картинки
		var rect = calc.getBoundsRect(rectFullImg, this._rotation);
		boundImageRect.width = rect.width;
		boundImageRect.height = rect.height;
		// подстройка картинки к размерам компонента
		adaptMash = borderPageRect.width / boundImageRect.width;

		if (adaptMash > borderPageRect.height / boundImageRect.height) {
			adaptMash = borderPageRect.height / boundImageRect.height;
		}

		this.minZoom = adaptMash;
		// определение максимального масштаба
		var cw = (borderPageRect.width * 2) / (boundImageRect.width * adaptMash);

		this.maxZoom = cw + adaptMash;

		this.mashtabImage = adaptMash + zoomMash;

		if (this._mashtabImage > this.maxZoom) {
			this.mashtabImage = this.maxZoom;
		}

		if (this._mashtabImage < this.minZoom) {
			this.mashtabImage = this.minZoom;
		}

		rectScaledImg.width = boundImageRect.width * this._mashtabImage;
		rectScaledImg.height = boundImageRect.height * this._mashtabImage;
		rectScaledImg.x = -rectScaledImg.width / 2;
		rectScaledImg.y = -rectScaledImg.height / 2;

		this.centeredImageCont.scale.set(this._mashtabImage, this._mashtabImage);
		// побстройка картинки что б не вылазила за границы компонента
		this.updatePosFromRect(self.offsetToCenterCont.position);
		// обновляем менюшки после изминений с картингкой
		this.updateViewRect();
		// обновляем менюшки после изминений с картингкой
		this.updateStateMenu();

		if (loadNewImage === true) this.pXD.rectangle = viewImageRect;
		// отрисовка фона вне выделенной области на картинке
		this.pdfEditorBackground.setRect(this.pXD._rectangle, viewImageRect);

		if (this.debug === true) debug();
	};
	/**
	 * Расчер видимой части картинки относительно размеров компонента.
	 */
	this.updateViewRect = function () {

		if (rectScaledImg.width >= borderPageRect.width) {
			viewImageRect.width = borderPageRect.width;
		} else {
			viewImageRect.width = rectScaledImg.width;
		}

		if (rectScaledImg.height >= borderPageRect.height) {
			viewImageRect.height = borderPageRect.height;
		} else {
			viewImageRect.height = rectScaledImg.height;
		}

		viewImageRect.x = -viewImageRect.width / 2;
		viewImageRect.y = -viewImageRect.height / 2;

		viewImageRect.p.x = borderPageRect.width / 2;
		viewImageRect.p.y = borderPageRect.height / 2;

		var ox = viewImageRect.p.x + viewImageRect.x;
		var oy = viewImageRect.p.y + viewImageRect.y;

		this.pdfEditorBackground.position.set(ox, oy);

		this.pXD.maxDragW = viewImageRect.width;
		this.pXD.maxDragH = viewImageRect.height;
	};

	this.draw = function () {

		borderPageRect.width = this._width;
		borderPageRect.height = this._height;

		this.pdfEditorBackground.width = this._width;
		this.pdfEditorBackground.height = this._height;

		this.pdfEditorCrop.width = this._widthCropComp;
		this.pdfEditorCrop.height = this._height;

		hitAreaContent.width = this._width;
		hitAreaContent.height = this._height;

		this.updateImageSize();

		this.pXD.rectangle = viewImageRect;
		this.pdfEditorBackground.setRect(self.pXD._rectangle, viewImageRect);

		this.updateToCropRect();

		this.drawMask();
	};

	this.drawMask = function () {
		this.maskGraphics.clear();
		this.maskGraphics.beginFill(0xff0000, 0);
		this.maskGraphics.drawRect(0, 0, this._width, this._height);
	};

	this.clear = function () {

		this.pdfEditorCrop.clear();

		adaptMash = 1;
		zoomMash = 0;

		this.mashtabImage = adaptMash + zoomMash;
		this.rotation = 0;

		this.pXD.parent = undefined;

		this.centeredImageCont.scale.set(this._mashtabImage, this._mashtabImage);

		this.centeredImageCont.rotation = this._rotation;

		this.image.visible = false;

		this.offsetToCenterCont.x = borderPageRect.width / 2;
		this.offsetToCenterCont.y = borderPageRect.height / 2;

		this.activ = true;
		this.pdfEditorCrop.activ = false;
		this.pdfEditorBackground.activ = false;
	};

	var pointDown = new PIXI.Point();
	var downLocal = new PIXI.Point();
	var moveLocal = new PIXI.Point();
	var vector = new PIXI.Point();
	this.onDown = function () {

		downLocal = self.content.toLocal(pl102.global);

		pointDown.x = self.offsetToCenterCont.position.x;
		pointDown.y = self.offsetToCenterCont.position.y;

		pl102.stage.off('mousemove', self.movePage);
		pl102.stage.off('mouseup', self.onUp);
		pl102.stage.on('mousemove', self.movePage);
		pl102.stage.on('mouseup', self.onUp);
	};

	var pointMove = new PIXI.Point();
	this.movePage = function (e) {

		var p = pl102.global;
		if (e instanceof MouseEvent) p.set(e.clientX, e.clientY);

		moveLocal = self.content.toLocal(p);

		vector.set(moveLocal.x - downLocal.x, moveLocal.y - downLocal.y);

		pointMove.x = pointDown.x + vector.x;
		pointMove.y = pointDown.y + vector.y;

		rectScaledImg.p.x = pointMove.x;
		rectScaledImg.p.y = pointMove.y;

		self.offsetToCenterCont.position.set(pointMove.x, pointMove.y);
		self.updatePosFromRect(self.offsetToCenterCont.position);

		self.updateViewRect();
	};

	this.onUp = function () {
		pl102.stage.off('mousemove', self.movePage);
		pl102.stage.off('mouseup', self.onUp);
	};

	this.zoomPage = function (_num) {

		if (_num > 0) {
			if (adaptMash + zoomMash < this.maxZoom) {
				zoomMash += this.shagZoom;
			}
		} else {
			if (adaptMash + zoomMash > this.minZoom) {
				zoomMash -= this.shagZoom;
			}
		}

		this.updateImageSize();
		this.checkBorderDrag();
		this.updateToCropRect();

		if (this.debug === true) debug();
	};

	this.rotatePage = function (_num) {

		if (_num > 0) {
			this.rotation = this._rotation + this.shagRotation;
		} else {
			this.rotation = this._rotation - this.shagRotation;
		}

		this.centeredImageCont.rotation = this._rotation;

		this.updateImageSize();
		this.checkBorderDrag();
		this.updateToCropRect();
	};

	var vectorRect = new PIXI.Point();
	/**
	 * Подстройка картинки что б не залазила за границы.
	 * @param {Position} _position - позиция картинки.
	 */
	this.updatePosFromRect = function (_position) {

		vectorRect.x = 0;
		vectorRect.y = 0;

		var bound = this.image.getBounds();
		var imagePoint = this.content.toLocal(bound);

		if (imagePoint.x > 0) {
			vectorRect.x = imagePoint.x;
		}

		if (imagePoint.y > 0) {
			vectorRect.y = imagePoint.y;
		}

		if (rectScaledImg.width + imagePoint.x < borderPageRect.width) {
			vectorRect.x = (rectScaledImg.width + imagePoint.x) - borderPageRect.width;
		}

		if (rectScaledImg.height + imagePoint.y < borderPageRect.height) {
			vectorRect.y = (rectScaledImg.height + imagePoint.y) - borderPageRect.height;
		}

		if (rectScaledImg.width <= borderPageRect.width) {
			vectorRect.x = imagePoint.x + rectScaledImg.width / 2 - borderPageRect.width / 2;
		}

		if (rectScaledImg.height <= borderPageRect.height) {
			vectorRect.y = imagePoint.y + rectScaledImg.height / 2 - borderPageRect.height / 2;
		}

		_position.x -= vectorRect.x;
		_position.y -= vectorRect.y;
	};
	/**
	 * Подстройка драгера относительно границ листа.
	 * @param {Rectangle} _rectangle - позиции драгера.
	 */
	this.updateDragFromRect = function (_rectangle) {

		vectorRect.x = 0;
		vectorRect.y = 0;

		if (viewImageRect.width < _rectangle.width) {
			_rectangle.width = viewImageRect.width;
			_rectangle.x = -viewImageRect.width / 2;
		}

		if (viewImageRect.height < _rectangle.height) {
			_rectangle.height = viewImageRect.height;
			_rectangle.y = -viewImageRect.height / 2;
		}

		var pVx = viewImageRect.p.x + viewImageRect.x;
		var pVy = viewImageRect.p.y + viewImageRect.y;

		var pDx = _rectangle.p.x + _rectangle.x;
		var pDy = _rectangle.p.y + _rectangle.y;

		var pVw = (viewImageRect.p.x + viewImageRect.x) + viewImageRect.width;
		var pVh = (viewImageRect.p.y + viewImageRect.y) + viewImageRect.height;

		var pDw = (_rectangle.p.x + _rectangle.x) + _rectangle.width;
		var pDh = (_rectangle.p.y + _rectangle.y) + _rectangle.height;

		if (pDx - pVx < 0) {
			vectorRect.x = pDx - pVx;
		}

		if (pDy - pVy < 0) {
			vectorRect.y = pDy - pVy;
		}

		if (pDw - pVw > 0) {
			vectorRect.x = pDw - pVw;
		}

		if (pDh - pVh > 0) {
			vectorRect.y = pDh - pVh;
		}

		_rectangle.p.x -= vectorRect.x;
		_rectangle.p.y -= vectorRect.y;
	};
	/**
	 * Обновление приложения при изминении картинки.
	 */
	this.updateStateMenu = function () {

		var wb = rectScaledImg.width > borderPageRect.width;
		var hb = rectScaledImg.height > borderPageRect.height;

		var hideHand = false;

		if (stateIndex === 0 || isDragePage === true) {
			hideHand = (wb || hb);
		} else {
			hideHand = false;
		}
		// Отправка события что страница ихменилась
		this.dispatchEvent(new PdfEditorEvent('pageWasChanged', {
			name: 'pageChange',
			isInVisibleArea: hideHand,
			isMaxZoom: !(self._mashtabImage >= self.maxZoom),
			isMinZoom: !(self._mashtabImage <= self.minZoom),
			isCrop: !(stateIndex === 2)
		}));
	};
	/**
	 * Подстройка драгера если он вылазит за границу картинки.
	 */
	this.checkBorderDrag = function () {
		this.updateDragFromRect(this.pXD._rectangle);
		this.pXD.draw102();
		this.pdfEditorBackground.setRect(this.pXD._rectangle, viewImageRect);
	};
	/** Точка начала выделения. */
	var crPoint = new PIXI.Point();
	/**
	 * Расчет области выделения и настройка компонента отображения выделенной области.
	 */
	this.updateToCropRect = function () {
		// точка начала выделения
		crPoint.x = (this.pXD._rectangle.p.x + this.pXD._rectangle.x);
		crPoint.y = (this.pXD._rectangle.p.y + this.pXD._rectangle.y);
		// определение точки выделения на картинке
		var cropPointGlob = this.content.toGlobal(crPoint);
		var cropPoint = this.imageContainer.toLocal(cropPointGlob);
		// рект выделения
		cropRect.x = cropPoint.x;
		cropRect.y = cropPoint.y;
		cropRect.width = this.pXD._rectangle.width;
		cropRect.height = this.pXD._rectangle.height;
		cropRect.angel = this._rotation;

		this.pdfEditorCrop.cropPic(cropRect);
	};

	this.imageContainer.interactive = true;
	this.imageContainer.on('mousedown', this.onDown);
	/**
	 * Задаем состояние компоненту.
	 * @param {Object} _object - обьект с параметрами.
	 */
	this.setState = function (_object) {

		self.pdfEditorCrop.setState(_object);
		// Настройка компонента относительно шага меню футер
		if (_object.name === 'indexFooterDown') {

			if (_object.index === stateIndex) return;

			this.pXD.parent = (_object.index === 1) ? this.content : undefined;

			if (_object.index === 2) this.updateToCropRect();

			stateIndex = _object.index;

			if (loadNewImage === true) loadNewImage = !(_object.index === 1);

			this.activ = !(_object.index === 2);
			this.pdfEditorCrop.activ = (_object.index === 2);

			if (_object.index === 0) {
				this.imageContainer.interactive = true;
				this.imageContainer.on('mousedown', this.onDown);
			} else {
				this.imageContainer.off('mousedown', this.onDown);
				this.imageContainer.interactive = false;
			}

			self.pdfEditorBackground.alpha = (_object.index === 0) ? 0.5 : 0.8;
			self.pdfEditorBackground.activ = !(_object.index === 2);
			self.pdfEditorBackground.interactive = (_object.index === 1);
		}

		if (_object.name === 'zoomDeltaPage') {
			this.zoomPage(_object.zoomPage);
		}

		if (_object.name === 'rotatePage') {
			this.rotatePage(_object.rotatePage);
		}

		if (_object.name === 'savePage') {

			var prevBackground = self.pdfEditorBackground.activ;
			var prevDrager = self.pXD.parent;

			self.pdfEditorBackground.activ = false;
			self.pXD.parent = undefined;

			var base64 = this.pdfEditorCrop.getPic();

			this.dispatchEvent(new PdfEditorEvent('pageWasChanged', {
				name: 'getPhoto',
				image: base64
			}));

			self.pdfEditorBackground.activ = prevBackground;
			self.pXD.parent = prevDrager;
		}

		this.updateStateMenu();

		// // if (self.debug === true) debug();
	};
	// // -------------------------------дебагеры--------------------------------------
	var graphDebug = null;
	var graphDebug1 = null;
	var graphDebug2 = null;
	var graphDebug3 = null;
	var graphDebug4 = null;

	function debug () {

		if (graphDebug === null) {
			graphDebug = new PIXI.Graphics();
			self.content.addChild(graphDebug);

			graphDebug1 = new PIXI.Graphics();
			self.content.addChild(graphDebug1);

			graphDebug2 = new PIXI.Graphics();
			self.centeredImageCont.addChild(graphDebug2);

			graphDebug3 = new PIXI.Graphics();
			self.offsetToCenterCont.addChild(graphDebug3);

			graphDebug4 = new PIXI.Graphics();
			self.imageContainer.addChild(graphDebug4);
		}

		graphDebug.clear();
		graphDebug1.clear();
		graphDebug2.clear();
		graphDebug3.clear();
		graphDebug4.clear();

		// graphDebug1.lineStyle(4, 0x514f4f);
		// graphDebug1.drawCircle(0, 0, 10);
		// graphDebug1.drawRect(
		// 	viewImageRect.p.x + viewImageRect.x,
		// 	viewImageRect.p.y + viewImageRect.y,
		// 	viewImageRect.width,
		// 	viewImageRect.height
		// );

		// graphDebug.lineStyle(4, 0x514f4f);
		// graphDebug.drawCircle(0, 0, 10);
		// graphDebug.drawRect(
		// 	0,
		// 	0,
		// 	50,
		// 	50
		// );

		/// / позиция смещенного в центр ректа
		// graphDebug3.lineStyle(2, 0xff0000);
		// graphDebug3.drawCircle(rectScaledImg.p.x, rectScaledImg.p.y, 10);
		// graphDebug3.drawRect(
		// 	rectScaledImg.p.x + rectScaledImg.x,
		// 	rectScaledImg.p.y + rectScaledImg.y,
		// 	rectScaledImg.width,
		// 	rectScaledImg.height
		// );

		graphDebug4.beginFill(0xff0000);
		graphDebug4.drawRect(
			100,
			100,
			10,
			10
		);


	}
}

PdfEditorPage.prototype = Object.create(PIXI.Container.prototype);
PdfEditorPage.prototype.constructor = PdfEditorPage;
PdfEditorPage.prototype = Object.assign(PdfEditorPage.prototype, EventDispatcher.prototype);

Object.defineProperties(PdfEditorPage.prototype, {

	activ: {
		set: function (value) {
			if (this._activ === value) return;
			this._activ = value;

			this.centeredImageCont.visible = this._activ;

		},
		get: function () {
			return this._activ;
		}
	},

	widthCropComp: {
		set: function (value) {
			if (this._widthCropComp === value) return;
			this._widthCropComp = value;

			this.draw();
		},
		get: function () {
			return this._widthCropComp;
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

	mashtabImage: {
		set: function (value) {
			if (this._mashtabImage === value) return;
			this._mashtabImage = value;

			this.pdfEditorCrop.mashtabImage = this._mashtabImage;
		},
		get: function () {
			return this._mashtabImage;
		}
	},

	mashtab: {
		set: function (value) {
			if (this._mashtab === value) return;
			this._mashtab = value;

			this.pdfEditorCrop.mashtab = this._mashtab;
		},
		get: function () {
			return this._mashtab;
		}
	},

	rotation: {
		set: function (value) {
			if (this._rotation === value) return;
			this._rotation = value;

			this.pdfEditorCrop.rotation = this._rotation;
		},
		get: function () {
			return this._rotation;
		}
	}
});

function PdfEditorBackground (_cont) {
	PIXI.Container.call(this);
	var self = this;
	this.type = 'PdfEditorBackground';

	_cont.addChild(this);

	this.funDown = null;
	this.funUp = null;

	this.content = new PIXI.Container();
	this.graphCenter = new PIXI.Graphics();
	this.graphTop = new PIXI.Graphics();
	this.graphBottom = new PIXI.Graphics();
	this.graphLeft = new PIXI.Graphics();
	this.graphRight = new PIXI.Graphics();

	this.innerRect = new PIXI.Rectangle();

	this._width = 300;
	this._height = 300;

	this._alpha = 0.8;
	this._activ = false;
	this._color = 0x969494;
	this._interactive = false;

	this.visible = this._activ;

	this.addChild(this.content);
	this.content.addChild(this.graphTop);
	this.content.addChild(this.graphBottom);
	this.content.addChild(this.graphLeft);
	this.content.addChild(this.graphRight);
	this.content.addChild(this.graphCenter);

	this.draw = function () {

		this.graphTop.clear();
		this.graphBottom.clear();
		this.graphLeft.clear();
		this.graphRight.clear();
		this.graphCenter.clear();

		this.graphTop.beginFill(this._color);
		this.graphBottom.beginFill(this._color);
		this.graphLeft.beginFill(this._color);
		this.graphRight.beginFill(this._color);
		this.graphCenter.beginFill(0xff0000, 0);

		var intOffset = 3;

		var heightTop = this.innerRect.y;
		var heightBottom = this._height - this.innerRect.y - this.innerRect.height;

		var widthLeft = this.innerRect.x;

		var rightX = this.innerRect.x + this.innerRect.width;
		var widthRight = this._width - rightX;

		this.graphCenter.drawRect(this.innerRect.x - intOffset, this.innerRect.y - intOffset, this.innerRect.width + intOffset * 2, this.innerRect.height + intOffset * 2);

		this.graphTop.drawRect(0, 0, this._width, heightTop);
		this.graphBottom.drawRect(0, heightTop + this.innerRect.height, this._width, heightBottom);

		this.graphLeft.drawRect(0, heightTop, widthLeft, this.innerRect.height);
		this.graphRight.drawRect(rightX, heightTop, widthRight, this.innerRect.height);
	};

	this.setRect = function (_rectangle, _offsetRect) {

		if (_offsetRect !== undefined) {
			this.innerRect.x =  Math.round((_rectangle.p.x + _rectangle.x) - (_offsetRect.p.x + _offsetRect.x));
			this.innerRect.y =  Math.round((_rectangle.p.y + _rectangle.y) - (_offsetRect.p.y + _offsetRect.y));

			this._width =  Math.round(_offsetRect.width);
			this._height =  Math.round(_offsetRect.height);
		} else {
			this.innerRect.x = Math.round(_rectangle.p.x + _rectangle.x);
			this.innerRect.y = Math.round(_rectangle.p.y + _rectangle.y);
		}

		this.innerRect.width = Math.round(_rectangle.width);
		this.innerRect.height = Math.round(_rectangle.height);

		this.draw();
	};

	this.getBoundDragCont = function (_rectangle) {
		var rect = this.graphCenter.getBounds();
		_rectangle.x = rect.x;
		_rectangle.y = rect.y;
		_rectangle.width = rect.width;
		_rectangle.height = rect.height;
		return rect;
	};

	this.onDown = function () {
		if (self.funDown) self.funDown();
	};

	this.onUp = function () {
		if (self.funUp) self.funUp();
	};

	this.onOut = function () {
		if (self.funUp) self.funUp();
	};

	this.draw();
}

PdfEditorBackground.prototype = Object.create(PIXI.Container.prototype);
PdfEditorBackground.prototype.constructor = PdfEditorBackground;

Object.defineProperties(PdfEditorBackground.prototype, {

	color: {
		set: function (value) {
			if (this._color === value) return;
			this._color = value;

			this.draw();
		},
		get: function () {
			return this._color;
		}
	},

	alpha: {
		set: function (value) {
			if (this._alpha === value) return;
			this._alpha = value;

			this.graphTop.alpha = this._alpha;
			this.graphBottom.alpha = this._alpha;
			this.graphLeft.alpha = this._alpha;
			this.graphRight.alpha = this._alpha;
		},
		get: function () {
			return this._alpha;
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

	interactive: {
		set: function (value) {
			if (this._interactive === value) return;
			this._interactive = value;

			this.content.interactive = this._interactive;

			if (this._interactive === true) {
				this.content.on('mousedown', this.onDown);
				this.content.on('mouseup', this.onUp);
				this.content.on('mouseout', this.onOut);
			} else {
				this.content.off('mousedown', this.onDown);
				this.content.off('mouseup', this.onUp);
				this.content.off('mouseout', this.onOut);
			}
		},
		get: function () {
			return this._interactive;
		}
	}
});
