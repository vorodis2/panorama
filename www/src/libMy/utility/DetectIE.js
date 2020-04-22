function DetectIE (_div, link) { // Проверка на поддержку WebGL
	var self = this; // везде пишем при старте
	this.type = 'DetectIE'; // такой же тип как класс в плане стринга

	this._value = false;
	this.parentNode = _div;
	this.image;
	this.div;


	this.w = 100;
	this.h = 100;
	this.bool = false;

	self.picWidth = 100;
	self.picHeight = 100;


	this.init = function () {
		this.parentNode.innerHTML = '';

		this.div = document.createElement('div');
		this.div.style.position = 'absolute';

		this.image = document.createElement('img');
		this.image.setAttribute('src', link)//'/resources/images/browserCrash.png');
		this.image.setAttribute('alt', ' ');

		this.image.onload = self.loadComplit;

		this.div.appendChild(this.image);
		this.parentNode.appendChild(this.div);
		self.sizeWindow(self.w * 1, self.h * 1);

	};


	this.loadComplit = function () {
		self.picWidth = this.width;
		self.picHeight = this.height;
		self.bool = true;
		self.sizeWindow(self.w * 1, self.h * 1);
	};


	this.sizeWindow = function (_width, _height) {
		this.w = _width;
		this.h = _height;

		if (this.bool === false) return;
		var s = this.w / self.picWidth;
		if (this.h / self.picHeight < s) s = this.h / self.picHeight;

		if (s > 1) s = 1;

		this.image.width = self.picWidth * s;
		this.image.height = self.picHeight * s;


		this.div.style.left = (_width - this.image.width) / 2 + 'px';
		this.div.style.top = (_height - this.image.height) / 2 + 'px';

	};


	this.isWebGL = function () {
		// определяем версию браузера

		if (window.WebGLRenderingContext) {
			var canvas = document.createElement('canvas');
			var names = ['webgl', 'experimental-webgl', 'moz-webgl', 'webkit-3d'];

			try {
				var context = canvas.getContext(names[0]) ||
                    canvas.getContext(names[1]) ||
                    canvas.getContext(names[2]) ||
                    canvas.getContext(names[3]);
				if (!context) {
					return false;
				}
				if (typeof context.getParameter !== 'function') {
					return false;
				}
				context.clearStencil(0);
				var errors = context.getError();
				return errors === 0;
			} catch (e) {
				return false;
			}
		}

		return false;
	};

	 this.GetIEVersion = function () {
		if (navigator.userAgent.indexOf('MSIE') !== -1 ||navigator.appVersion.indexOf('Trident/') > 0) {
			return true;
		}
	};

	this.getIEV = function () {
		var r=true;
		if (navigator.userAgent.indexOf('MSIE') !== -1 ||navigator.appVersion.indexOf('Trident/') > 0) {
			var a=navigator.appVersion.split("Trident/")
			trace(a[1][0])
			var vv=a[1][0]*1
			if(isNaN(vv)==true)return false
			if(vv<7){
				return false
			}
			trace(navigator.appVersion)
		}

		return r
	}
	



	if (this.isWebGL() || this.GetIEVersion()) {
		return false;
	} else {
		return true;
	}
}
