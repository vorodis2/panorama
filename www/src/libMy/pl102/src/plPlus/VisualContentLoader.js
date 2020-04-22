
export function VisualContentLoader (cont, _x, _y, _fun) {
	PIXI.Container.call(this);
	this.type = 'VisualContentLoader';
	var self = this;
	cont.addChild(this);

	this.funGetFile = null;
	this.onload = null;
	this.funUp = null;
	this.fun = _fun;

	this.x = _x || 0;
	this.y = _y || 0;
	this._otstup = 2;
	this._wh = pl102.wh;
	this._color = pl102.color1;
	this._width = 100;
	this._height = this._wh * 2 + this._otstup;
	this._link = 'null';
	this._value = this._link;
	this._title = null;

	this.linkError = 'resources/picNotFound.jpg';

	this.content = new PIXI.Container();
	this.addChild(this.content);

	var downloadUtill = new DownloadUtill();
	this.downloadUtill = downloadUtill;

	this.contur = new PLContur(this.content, 0, 0);
	this.contur.width = this._height;
	this.contur.height = this._height;
	this.contur.thickness = 0.5;
	this.contur.color = this._color;

	this.label = new PLLabel(this.content, 0, 0, '');

	this.image = new PLImage(this.content, 0, 0);
	this.image.funComplit = function () {
		var scale = Math.min(self._height / this.picWidth, self._height / this.picHeight);
		this.scale.set(scale, scale);
		this.width = this.picWidth;
		this.height = this.picHeight;
		var rx = self._height - (this._width * scale);
		var ry = self._height - (this._height * scale);
		this.x = (rx === 0) ? rx : rx / 2;
		this.y = (ry === 0) ? ry : ry / 2;
	};

	this.input = new PLInput(this.content, this._otstup, 0, 'null', function () {
		self.link = this.value;
		if (self.fun) self.fun();
	});
	// this.input.activMouse = false;


	this.btnLoad = new PLButton(this.content, 0, 0, 'Load', function (base64) {
		self.label.visible = false;
		self.image.visible = false;

		if (self.onload) self.onload(true);

		if (self.funGetFile) {
			self.funGetFile(base64, function (_link) {
				trace('vghjgfhj', _link);
				var link = (_link !== null) ? _link : self.linkError;
				self.link = _link;
				trace('vghjgfhdsfgdsgfj', self.link);
				if (self.fun) self.fun();
				if (self.onload) self.onload(false);
			});
		} else {
			self.input.value = base64;
			self._link = base64;

			if (self.fun) self.fun();
			if (self.onload) self.onload(false);
		}

		var fileName = this.files[0].name.split('.');
		var exp = fileName[fileName.length - 1];
		if (exp === 'jd' || exp === 'JD' || exp === 'hdr' || exp === 'HDR') {
			self.label.visible = true;
			self.label.text = '.' + exp;
			self.label.pivot.set(self.label.curW / 2, self.label.curH / 2);
			self.label.position.set(self._height / 2, self._height / 2);
		} else {
			self.image.visible = true;
			self.image.link = base64;
		}
	});
	this.btnLoad.x = this._height + this._otstup;
	this.btnLoad.y = this._wh + this._otstup;
	this.btnLoad.startFile('.jpg, .png, .bmp, .jpeg, .hdr, .jd');

	this.localLoad = new PLButton(this.content, 0, 0, '', function () {
		if (self.input.value.indexOf('base64') !== -1) {
			this.downloadUtill.saveBase64(self.input.value);
		} else {
			console.warn('Сохранение с линка не добавлено!');
		}
		if (self.fun) self.fun();
	}, 'resources/images/adminAr/61.png');
	this.localLoad.width = this._wh;
	this.localLoad.activMouse = false;

	this.linkClear = new PLButton(this.content, 0, 0, 'X', function () {
		self.label.visible = false;
		self.link = 'null';
		//self.link = self.linkError;
		if (self.fun) self.fun();
	});
	this.linkClear.width = this._wh;

	this.image.funError = function () {
		self.image.link = self.linkError
		console.log("FIXI ANTON хдр збрасывает");
	};


	this.draw = function () {
		this.input.width = this._width - this._wh * 2 - this._otstup * 3 - this._height;
		this.input.x = this._height + this._otstup;
		this.localLoad.x = this.input.x + this.input.width + this._otstup;
		this.linkClear.x = this.localLoad.x + this._wh + this._otstup;
		this.btnLoad.width = this._width - this._height - this._otstup;
	};

	this.draw();
}

VisualContentLoader.prototype = Object.create(PIXI.Container.prototype);
VisualContentLoader.prototype.constructor = VisualContentLoader;

Object.defineProperties(VisualContentLoader.prototype, {
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
		set: function (value) {},
		get: function () {
			return this._height;
		}
	},
	link: {
		set: function (value) {
			if (this._link === value) return;
			this._link = value;
			if (this.link === 'null') {
				this.image.visible = false;
				this.input.value = this.link;
			} else if (this.link === this.linkError) {
				this.image.link = this.linkError;
				this.input.value = this.link;
			} else {
				this.image.visible = true;
				this.image.link = this._link;
				this.input.value = this._link;
			}
		},
		get: function () {
			return this._link;
		}
	},
	value: {
		set: function (value) {
			this.link = value;
		},
		get: function () {
			return this._link;
		}
	},
	title: {
		set: function (value) {
			if (this._title === value) return;
			this._title = value;

			this.btnLoad.text = value;
		},
		get: function () {
			return this._title;
		}
	}
});
