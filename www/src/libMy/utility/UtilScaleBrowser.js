
/*
 *	Этот класс отслеживает изменение масштаба окна браузера
 *	Расщитывает правильнгую высоту/ширину всего планера
*/

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
