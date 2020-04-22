function PdfEditorCrop (_cont) {
	PIXI.Container.call(this);
	var self = this;
	this.type = 'PdfEditorPage';
	_cont.addChild(this);
	/** Контейнера подстройки картинки для масштабирования */
	this.contCrop = new PIXI.Container();
	this.contBtnCreate = new PIXI.Container();
	this.addChild(this.contBtnCreate);
	this.centCont = new PIXI.Container();
	this.tempContainer = new PIXI.Container();
	var mask = new PIXI.Graphics();
	/** Контейнера подстройки картинки для фотографирования */
	this.scrshContent = new PIXI.Container();
	this.scrshOffsetContent = new PIXI.Container();
	this.scrshImgContent = new PIXI.Container();
	this.scrshSketchRooms = new PIXI.Container();

	this.addChild(this.scrshContent);
	this.scrshContent.addChild(this.scrshOffsetContent);
	this.scrshContent.addChild(this.scrshSketchRooms);
	this.scrshOffsetContent.addChild(this.scrshImgContent);


	this.addChild(this.centCont);

	this.centCont.addChild(this.tempContainer);
	this.centCont.addChild(mask);
	this.tempContainer.addChild(this.contCrop);

	this.centCont.mask = mask;

	this._width = 100;
	this._height = 100;
	this._mashtab = 1;
	this._mashtabImage = 1;
	this._rotation = 0;
	this._activ = false;

	this.visible = this._activ;

	var scale = 1;
	/** Точкаректа на картинке */
	var pointOnList = new PIXI.Point();
	/** Размер картинки при фотографировании */
	var rectImagePrint = new PIXI.Rectangle();
	/** Размер картинки, для фотографиролвании */
	var imageScrshRect = new PIXI.Rectangle();
	/** Выбранная область подстроенная к масштабам, для фотографирования */
	var rectScrsh = new PIXI.Rectangle();
	/** Рельный размер картинки */
	var imageRect = new PIXI.Rectangle();

	this.screenshoot = new ScreenshootContainer();
	this.pdfEditorSketchRooms = new PdfEditorSketchRooms(this.centCont);
	this.pdfEditorSketchRooms.activ = true;

	this.image = new PLImage(this.contCrop);
	this.image.funComplit = function () {

		self.image.width = this.picWidth;
		self.image.height = this.picHeight;

		imageRect.width = this.picWidth;
		imageRect.height = this.picHeight;
	};
	/**
	 * Загрузка картинки в компонент.
	 * @param {String} _link - линк на картинку.
	 * @param {Rectangle} _rect - размер картинки при фотографировании.
	 */
	this.setImage = function (_link, _rect) {

		this.image.link = _link;

		if (_rect !== undefined) {
			rectImagePrint.width = _rect.width;
			rectImagePrint.height = _rect.height;
		} else {
			rectImagePrint.width = imageRect.width;
			rectImagePrint.height = imageRect.height;
		}
	};
	/**
	 * Фотографирование вырезанной области.
	 * @return {base64} картинка выделенной области.
	 */
	this.getPic = function () {
		// поскольку загруженная картинка и размер картинки для фотографирования
		// разные, необходимо подогнать картинку
		var scale = Math.min(
			rectImagePrint.width / imageRect.width,
			rectImagePrint.height / imageRect.height
		);

		if (scale === 0) scale = 1;

		// увеличение вырезаемой областит к реальному размеру картинки и
		// и подгон к размеру картинки
		rectScrsh.width = (rectToPrint.width / this._mashtabImage) * scale;
		rectScrsh.height = (rectToPrint.height / this._mashtabImage) * scale;

		var boundScrshBef = this.tempContainer.getBounds();
		// перекидываем в контейнер который фотографируем
		this.scrshImgContent.addChild(this.image);
		this.scrshSketchRooms.addChild(this.pdfEditorSketchRooms);
		// подгоняем картинку к размеру фотографирования
		this.scrshImgContent.scale.set(scale, scale);
		// подстроим картинку что б она находилась внутри
		// фотографируемого контейнера
		this.scrshImgContent.rotation = this._rotation;

		var bound = this.scrshImgContent.getBounds();
		var localPoint = this.scrshOffsetContent.toLocal(bound);

		if (localPoint.x < 0) {
			this.scrshImgContent.x = Math.abs(localPoint.x);
		}

		if (localPoint.y < 0) {
			this.scrshImgContent.y = Math.abs(localPoint.y);
		}
		// опеределение масштаба для подгонки контейнера с названиями комнат
		var boundScrshAft = this.scrshImgContent.getBounds();
		var sc = boundScrshAft.width / boundScrshBef.width;

		this.scrshSketchRooms.scale.set(sc, sc);
		// находим точку начала ректа на кратинке
		var pointGlobal = this.scrshImgContent.toGlobal(rectToPrint);
		var pointLocal = this.scrshOffsetContent.toLocal(pointGlobal);
		// смещение картинки что б точка начала ректа выделения была в нуле
		// фотографируемого контейнера
		this.scrshOffsetContent.pivot.set(pointLocal.x, pointLocal.y);
		// скроем крестики удаления кнопок с названиями комнат
		this.pdfEditorSketchRooms.activBtnClose = false;

		var b64 = this.screenshoot.getImAd(
			this.scrshContent,
			rectScrsh.width,
			rectScrsh.height,
			'image/jpeg'
		);
		// вернем назад крестики удаления кнопок с названиями комнат
		this.pdfEditorSketchRooms.activBtnClose = true;
		// вернем все назад
		this.contCrop.addChild(this.image);
		this.centCont.addChild(this.pdfEditorSketchRooms);

		return b64;
	};
	/**
	 * Задаем состояние компоненту.
	 * @param {Object} _object - обьект с параметрами.
	 */
	this.setState = function (_object) {
		self.pdfEditorSketchRooms.setState(_object);
	};

	/** Выбранная область на картинке */
	var rectToPrint = new PIXI.Rectangle();
	/**
	 * Масштабирование выделенной оласти к размеру компонента.
	 * @param {Rectangle} _rectangle - рект выделенной облати на лесте.
	 */
	this.cropPic = function (_rectangle) {
		// подстройка картинки как мы ее видим в преидущем шаге
		this.contCrop.scale.set(this._mashtabImage, this._mashtabImage);
		this.contCrop.rotation = this._rotation;
		// подстройка картинки что б она была внутри контенера что масштабируем
		var bound = this.contCrop.getBounds();
		var localPoint = this.tempContainer.toLocal(bound);

		if (localPoint.x < 0) {
			this.contCrop.x = Math.abs(localPoint.x);
		}

		if (localPoint.y < 0) {
			this.contCrop.y = Math.abs(localPoint.y);
		}

		rectToPrint.x = _rectangle.x;
		rectToPrint.y = _rectangle.y;
		rectToPrint.width = _rectangle.width;
		rectToPrint.height = _rectangle.height;

		pointOnList.x = _rectangle.x;
		pointOnList.y = _rectangle.y;
		// определение точки начала выделения на листе
		var pointGlobal = this.contCrop.toGlobal(pointOnList);
		var pointLocal = this.tempContainer.toLocal(pointGlobal);
		// смещение картинки что б начало выделяемой области
		// было в нуле масштабируемого контейнернера
		this.tempContainer.pivot.set(pointLocal.x, pointLocal.y);
		// разница между выделенной областью и размерам компонента
		scale = Math.min(this._width / _rectangle.width, this._height / _rectangle.height);
		// подстройка что б выделеная область была в центре компонента
		this.tempContainer.scale.set(scale, scale);

		if (_rectangle.width * scale <= this._width) {
			this.centCont.x = (this._width - _rectangle.width * scale) / 2;
		} else {
			this.centCont.x = 0;
		}

		if (_rectangle.height * scale <= this._height) {
			this.centCont.y = (this._height - _rectangle.height * scale) / 2;
		} else {
			this.centCont.y = 0;
		}

		mask.clear();
		mask.beginFill(0xff0000, 0);
		mask.drawRect(0, 0, _rectangle.width * scale, _rectangle.height * scale);

		this.pdfEditorSketchRooms.width = _rectangle.width * scale;
		this.pdfEditorSketchRooms.height = _rectangle.height * scale;
	};

	this.clear = function () {
		this.pdfEditorSketchRooms.clear();
	};

	// var graphDebug = null;

	// var graphDebug1 = new PIXI.Graphics();
	// this.addChild(graphDebug1);

	// this.drawDebug = function (_rectangle) {

	// 	if (graphDebug === null) {
	// 		graphDebug = new PIXI.Graphics();
	// 		this.pdfEditorSketchRooms.addChild(graphDebug);
	// 	}

	// 	graphDebug.clear();
	// 	graphDebug1.clear();

	// 	// graphDebug.beginFill(0xff0000);
	// 	// graphDebug.drawRect(100, 100, 10, 10);

	// 	// var rect = this.tempContainer.getBounds();
	// 	// var rect1 = this.toLocal(rect);

	// 	// graphDebug.lineStyle(2, 0x0000ff);
	// 	// graphDebug.drawCircle(0, 0, 10);
	// 	// graphDebug.drawRect(0, 0, 100, 100);
	// };
}

PdfEditorCrop.prototype = Object.create(PIXI.Container.prototype);
PdfEditorCrop.prototype.constructor = PdfEditorCrop;

Object.defineProperties(PdfEditorCrop.prototype, {

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
		},
		get: function () {
			return this._width;
		}
	},

	height: {
		set: function (value) {
			if (this._height === value) return;
			this._height = value;

			this.pdfEditorSketchRooms.height = this._height;
		},
		get: function () {
			return this._height;
		}
	},

	mashtab: {
		set: function (value) {
			if (this._mashtab === value) return;
			this._mashtab = value;

			this.pdfEditorSketchRooms.mashtab = this._mashtab;
			this.pdfEditorSketchRooms.scale.set(this._mashtab, this._mashtab);
		},
		get: function () {
			return this._mashtab;
		}
	},

	rotation: {
		set: function (value) {
			if (this._rotation === value) return;
			this._rotation = value;
		},
		get: function () {
			return this._rotation;
		}
	},

	mashtabImage: {
		set: function (value) {
			if (this._mashtabImage === value) return;
			this._mashtabImage = value;
		},
		get: function () {
			return this._mashtabImage;
		}
	}
});