
import AppView from './AppView.js';
import * as pl102Components from '../pl102/pl102Components.js';

export default function App () {
	var self = this;

	this._width = document.documentElement.clientWidth;
	this._height = document.documentElement.clientHeight;

	window.trace = console.log.bind(window.console);

	this.resolution = 2;

	this.contentHTML = document.createElement('div');
	this.contentHTML.style.position = 'fixed';

	document.body.appendChild(this.contentHTML);

	this.stage = new PIXI.Container();
	this.renderer = new PIXI.autoDetectRenderer(
		this._width,
		this._height,
		{
			antialias: true,
			transparent: true,
			preserveDrawingBuffer: true
		}
	);
	this.renderer.view.style.position = 'fixed';
	this.contentHTML.appendChild(this.renderer.view);
	this.stylePL102 = new pl102Components.StylePL102(this.stage, this.renderer, this.contentHTML);
	this.appView = new AppView();
	this.stage.addChild(this.appView.content);
	this.renderer.maskManager.enableScissor = false;

	var ticker = new PIXI.ticker.Ticker();
	ticker.minFPS = 50;
	ticker.add(tick, this);
	ticker.start();

	function tick () {
		self.renderer.resolution = window.devicePixelRatio * self.resolution;
		self.renderer.render(self.stage);
		TWEEN.update();
	}

	window.onresize = sizeWindow;

	var utilScaleBrowser = new UtilScaleBrowser(this.contentHTML, 720, 720);
	function sizeWindow () {
		utilScaleBrowser.sizeWindow(
			document.documentElement.clientWidth,
			document.documentElement.clientHeight
		);
		self._height = utilScaleBrowser._height;
		self._width = utilScaleBrowser._width;
		self.scale = utilScaleBrowser._scale;
		if (self.renderer) {
			var precresol = self.renderer.resolution;// запоминаем предыдущее разрешение пикселей рендера
			self.renderer.view.style.width = self._width + 'px';
			self.renderer.view.style.height = self._height + 'px';
			self.renderer.view.style.top = 0 + 'px';
			self.renderer.view.style.left = 0 + 'px';
			self.renderer.resolution = 1;// перед изменение размера в дефолт
			self.renderer.resize(self._width, self._height);
			self.renderer.resolution = precresol;// ставим обратно разрешение
		}
		trace('<<>>--000000--', self.appView)
		self.appView.sizeWindow(self._width, self._height);
	}

	sizeWindow(this._width, this._height);
}


function UtilScaleBrowser (_div, _minW, _minH) {
	var self = this;
	this.type = 'UtilScaleBrowser';

	this._div = _div;
	// debugger
	this._minW = _minW || 800;
	this._minH = _minH || 600;
	this._width = 100;
	this._height = 100;
	this._scale = 1;
	this._scaleCoeff = 1;
	this.w = 100;
	this.h = 100;
	this.grabla = false;
	this.devas = false;

	this.nativeWidth = undefined;
	this.nativeHeight = undefined;

	this.sizeWindow = function (_width, _height) {
		this.w = _width;
		this.h = _height;

		if (this.devas == false) this._scaleCoeff = (1 / window.devicePixelRatio);
		else this._scaleCoeff = 1;

		this._width = this.w / this._scaleCoeff;
		this._height = this.h / this._scaleCoeff;

		this._div.style.transform = 'scale(' + this._scaleCoeff + ')';
		this._div.style.transformOrigin = '0 0';

		var s;
		if (this.nativeWidth !== undefined &&
		this.nativeHeight !== undefined &&
		this._scaleCoeff < 1) { // Граблища убирающая съезд интерфейса в лоадере.
			s =	this.nativeHeight / this._minH;
			if (s > this.nativeWidth / this._minW)s = this.nativeWidth / this._minW;
			if (s > 1) s = 1;
			this._scale = s;
			if (this._scaleCoeff < 1) {
				this._width = this.nativeWidth / this._scaleCoeff;
				this._height = this.nativeHeight / this._scaleCoeff;
				this._scale = this._scale / this._scaleCoeff;
			}
		} else {
			s =	this._height / this._minH;
			if (s > this._width / this._minW)s = this._width / this._minW;
			if (s > 1) s = 1;
			this._scale = s;
		}
	};
}
