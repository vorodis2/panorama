/**
*Всякие вкусняшки от html
*тест на мобильник/локальный isMobile
*свернуть развернуть на все окно fullScreen
*/

function UtilityHTML (_doc) {
	this.type = 'UtilityHTML';
	this.doc = _doc;
	var self = this;

	this._fullScreen = 0;
	this.arrFun = [];

	this.addFun = function (_fun) {
		for (var i = 0; i < this.arrFun.length; i++) {
			if (this.arrFun[i] === _fun) return;
		}
		this.arrFun[this.arrFun.length] = _fun;
	};

	var funForReturn;
	this.removeFun = function (_fun) {
		for (var i = 0; i < this.arrFun.length; i++) {
			if (this.rarFun[i] === _fun) {
				funForReturn = this.rarFun[i];
				this.arrFun.splice(i, 1);
				return funForReturn;
			}
		}
	};


	this.isMobile = {
		Android: function () {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function () {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function () {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function () {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function () {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function () {
			return (self.isMobile.Android() || self.isMobile.BlackBerry() || self.isMobile.iOS() || self.isMobile.Opera() || self.isMobile.Windows());
		}

	};


	// Запустить отображение в полноэкранном режиме
	this.launchFullScreen = function (element) {
		if (element.requestFullScreen) {
			element.requestFullScreen();
		} else if (element.mozRequestFullScreen) {
			element.mozRequestFullScreen();
		} else if (element.webkitRequestFullScreen) {
			element.webkitRequestFullScreen();
		}
	};

	// Выход из полноэкранного режима
	this.cancelFullscreen = function () {
		if (self.doc.cancelFullScreen) {
			self.doc.cancelFullScreen();
		} else if (self.doc.mozCancelFullScreen) {
			self.doc.mozCancelFullScreen();
		} else if (self.doc.webkitCancelFullScreen) {
			self.doc.webkitCancelFullScreen();
		}
	};

	// изменения в активности Fullscreen
	var onfullscreenchange = function (e) {

		var fullscreenElement =
		self.doc.fullscreenElement ||
		self.doc.mozFullscreenElement ||
		self.doc.webkitFullscreenElement;

		var fullscreenEnabled =
		self.doc.fullscreenEnabled ||
		self.doc.mozFullscreenEnabled ||
		self.doc.webkitFullscreenEnabled;

		self._fullScreen = !!fullscreenElement;


		for (var i = 0; i < self.arrFun.length; i++) {
			self.arrFun[i]();
		}

	};

	// Событие об изменениии режима
	this.doc.addEventListener('webkitfullscreenchange', onfullscreenchange);
	this.doc.addEventListener('mozfullscreenchange', onfullscreenchange);
	this.doc.addEventListener('fullscreenchange', onfullscreenchange);

}
UtilityHTML.prototype = {
	set fullScreen (v) {
		if (this._fullScreen == v) return;
		this._fullScreen = v;
	},
	get fullScreen () {
		return this._fullScreen;
	}
};
