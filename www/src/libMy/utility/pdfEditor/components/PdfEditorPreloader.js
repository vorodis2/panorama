function PdfEditorPreloader (_cont) {
	PIXI.Container.call(this);
	var self = this;
	this.type = 'PdfEditorPreloader';

	_cont.addChild(this);

	this._width = 100;
	this._height = 100;

	this._activ = false;
	/**
	 * Тип отображаемого элемента
	 * 0 - прелоадер, 1 - кнопка загрузки файла, 2 - кнопка с текстом
	*/
	this.backgroundColor = 0xa0a0a0;
	this.backgroundAlpha = 0.8;

	this.visible = this._activ;
	this.interactive = true;

	this.graphics = new PIXI.Graphics();
	this.addChild(this.graphics);

	this.preloader = new PLPreloader(this);

	this.button = new PLButton(this, 0, 0, 'Load file', function (_base64) {
		self.dispatchEvent(new PdfEditorEvent('loadFileFromBtn', {file: _base64}));
	});
	this.button.startFile('.jpg, .png, .bmp, .jpeg, .pdf');

	this.draw = function () {

		this.graphics.clear();

		this.graphics.beginFill(this.backgroundColor, this.backgroundAlpha);
		this.graphics.drawRect(0, 0, this._width, this._height);

		this.button.x = this._width / 2 - this.button.width / 2;
		this.button.y = this._height / 2 - this.button.height / 2;

		this.preloader.x = this._width / 2 - this.preloader.width / 2;
		this.preloader.y = this._height / 2 - this.preloader.height / 2;
	};

	this.setTypeComp = function (_type) {
		this.preloader.activ = (_type === 0);
		this.button.visible = (_type === 1);
	};

	this.setTypeComp(0);

	this.draw();
}

PdfEditorPreloader.prototype = Object.create(PIXI.Container.prototype);
PdfEditorPreloader.prototype.constructor = PdfEditorPreloader;
PdfEditorPreloader.prototype = Object.assign(PdfEditorPreloader.prototype, EventDispatcher.prototype);

Object.defineProperties(PdfEditorPreloader.prototype, {

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
	}
});