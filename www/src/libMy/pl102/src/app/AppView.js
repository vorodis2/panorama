

import * as pl102 from '../pl102/pl102Components.js';
import * as plPlus from '../plPlus/indexEntry.js';
import { PLParamObject } from '../plPlus/PLParamObject.js';
import { ScrollPane } from '../plPlus/ScrollPane.js';

export default function AppView () {
	var self = this;

	this.otstup = 2;
	this.widthMenu = 200;

	this.content = new PIXI.Container();
	this.contentBtn = new PIXI.Container();
	this.contentBtnPl102 = new PIXI.Container();
	this.contentBtnPl102.visible = false;
	this.contentBtnPlPlus = new PIXI.Container();
	this.contentBtnPlPlus.visible = false;
	this.contentBtn.addChild(this.contentBtnPl102);
	this.contentBtn.addChild(this.contentBtnPlPlus);

	this.contentComp = new PIXI.Container();
	this.contentComp.position.set(this.widthMenu + 50, 50);

	this.metrik = new PLGraphMetrik(this.content, this.contentComp.x, this.contentComp.y, function() {});

	this.scrollPane = new ScrollPane(this.content, 0, 0);
	this.scrollPane.addContent(this.contentBtn);
	this.scrollPane.boolPositOtctup = true;
	// this.scrollPane.isCutMask = false
	this.scrollPane.widthContent = this.widthMenu + this.scrollPane.sizeScroll + this.otstup * 2;
	this.scrollPane.width = this.widthMenu + this.scrollPane.sizeScroll + this.otstup * 2;
	this.content.addChild(this.contentComp);
	this.btnPl102 = new pl102.PLButton(
		this.contentBtn,
		this.otstup,
		this.otstup,
		'PL102',
		function () {
			this.activ = !this._activ;
			self.btnPlPlus.activ = !this._activ;
			self.contentBtnPl102.visible = this.activ;
			self.contentBtnPlPlus.visible = self.btnPlPlus.activ;
			self.scrollPane.heightContent = stepPl102;
			self.scrollPane.update();
			self.clear();
		}
	);
	this.btnPl102.activ = true;
	this.contentBtnPl102.visible = true;
	this.btnPlPlus = new pl102.PLButton(
		this.contentBtn,
		this.otstup + this.btnPl102._width,
		this.otstup,
		'PLPLUS',
		function () {
			this.activ = !this._activ;
			self.btnPl102.activ = !this._activ;
			self.contentBtnPlPlus.visible = this.activ;
			self.contentBtnPl102.visible = self.btnPl102.activ;
			self.scrollPane.heightContent = stepPlPlus;
			self.scrollPane.update();
			self.clear();
		}
	);

	this.arrCreatedCompPl102 = [];
	this.arrCreatedCompPlPlus = [];

	this.arrIgnoreElements = [
		'PLBitmapData',
		'PLImgFaceElement',
		'PLImgBoxElement',
		'pLDom',
		'StylePL102',
		'PLDOMElement',
		'PLComboBoxElement'
	];

	this.paramObject = new PLParamObject(this.content, 0, 0, function () {});
	this.paramObject.width = this.widthMenu;
	this.paramObject.isScroll = true;

	this.sizeWindow = function (_width, _height, _scale) {
		this._width = _width;
		this._height = _height;

		this.metrik.maxX = this._width - this.contentComp.position.x * 2.5;
		this.metrik.minY = this._height - this.contentComp.position.y * 2;

		this.paramObject.x = this._width - this.paramObject.width;
		this.paramObject.heightWindow = this._height - 27;

		this.scrollPane.height = this._height;
		this.scrollPane.update();
	};

	var stepPl102 = this.otstup * 4 + this.btnPl102._height;
	var count = 0;
	for (var key in pl102) {
		if (this.arrIgnoreElements.indexOf(key) !== -1) continue;
		var component = new pl102[key](this.contentComp, 0, 0);
		component.visible = false;
		self.arrCreatedCompPl102.push(component);
		var btn = new pl102.PLButton(this.contentBtnPl102, this.otstup, this.otstup, key, onDown);
		btn.index = count;
		btn.y = stepPl102;
		btn.width = this.widthMenu;
		count++;
		stepPl102 += btn.height + this.otstup;
	}

	var stepPlPlus = this.otstup * 4 + this.btnPl102._height;
	var count = 0;
	for (var key in plPlus) {
		if (this.arrIgnoreElements.indexOf(key) !== -1) continue;
		var component = new plPlus[key](this.contentComp, 0, 0);
		component.visible = false;
		self.arrCreatedCompPlPlus.push(component);
		var btn = new pl102.PLButton(this.contentBtnPlPlus, this.otstup, this.otstup, key, onDown);
		btn.index = count;
		btn.y = stepPlPlus;
		btn.width = this.widthMenu;
		count++;
		stepPlPlus += btn.height + this.otstup;
	}

	this.clear = function () {
		this.arrCreatedCompPl102.forEach(function (item) {
			item.visible = false;
		});
		this.arrCreatedCompPlPlus.forEach(function (item) {
			item.visible = false;
		});
	};

	function onDown () {
		if (self.btnPl102.activ === true) {
			self.arrCreatedCompPl102.forEach(function (item, index) {
				item.visible = (this.index === index);
			}, this);
			self.paramObject.addObject(self.arrCreatedCompPl102[this.index]);
		} else {
			self.arrCreatedCompPlPlus.forEach(function (item, index) {
				item.visible = (this.index === index);
			}, this);
			self.paramObject.addObject(self.arrCreatedCompPlPlus[this.index]);
		}
	}
}

function LineGrafikJ2 (par) {
	var self = this;
	this._value = 0;
	this.type = 'LineGrafikJ2';
	this.content = new PIXI.Container();
	par.content.addChild(this.content);
	this.graphics = new PIXI.Graphics();
	this.content.addChild(this.graphics);

	var ss;
	this.draw = function () {
		this.graphics.clear();
		if (this._value == 0) return;
		this.graphics.lineStyle(1, par._color, 0.5);
		ss = par._sah / (par._sah1);

		this.graphics.moveTo(0, 0);
		this.graphics.lineTo(this._value, 0);

		this.graphics.moveTo(this._value, -par._stroke * 2.0);
		this.graphics.lineTo(this._value, par._stroke * 2.0);


		for (var i = par._sah; i < this._value; i += par._sah) {
			this.graphics.moveTo(i, -par._stroke * 1.5);
			this.graphics.lineTo(i, par._stroke * 1.5);
		}

		for (var i = 0; i < this._value; i += par._sah) {
			for (var j = i + ss; j < i + par._sah; j += ss) {
				if (j < this._value) {
					this.graphics.moveTo(j, -par._stroke);
					this.graphics.lineTo(j, par._stroke);
				}

			}
		}
	};

}
Object.defineProperties(LineGrafikJ2.prototype, {
	value: {
		set: function (value) {
			if (this._value === value) return;
			this._value = value;
			this.draw();
		},
		get: function () {
			return this._value;
		}
	}
});

function PLGraphMetrik (cont, _x, _y, _fun) {
	var self = this;
	this.type = 'GraphMetrik';
	this.content = new PIXI.Container();
	if (cont != undefined) cont.addChild(this.content);
	this.fun = _fun;
	this.content.x = _x || 0;
	this.content.y = _y || 0;


	this._sah = 100;
	this._sah1 = 5;
	this._maxX = 100;
	this._minY = 100;
	this._minX = 0;
	this._maxY = 0;

	this._stroke = 5;
	this._color = pl102.color8; // 0x000000

	this.array = [];
	this.array.push(new LineGrafikJ2(this));// this._maxX
	this.array.push(new LineGrafikJ2(this));// this._maxY
	this.array.push(new LineGrafikJ2(this));// this._maxX
	this.array.push(new LineGrafikJ2(this));// this._maxX


	this.array[0].value = this._maxX;
	this.array[1].value = this._minY;
	this.array[2].value = this._minX;
	this.array[3].value = this._maxY;

	this.array[0].content.rotation = 0;
	this.array[1].content.rotation = Math.PI / 2;
	this.array[2].content.rotation = Math.PI;
	this.array[3].content.rotation = Math.PI + Math.PI / 2;


	this.draw = function () {
		for (var i = 0; i < this.array.length; i++) {
			this.array[i].draw();
		}
	};
}

Object.defineProperties(PLGraphMetrik.prototype, {
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
	sah: {
		set: function (value) {
			if (this._sah === value) return;
			this._sah = value;
			if (this._sah < 0) this._sah = 0.01;
			this.draw();
		},
		get: function () {
			return this._sah;
		}
	},
	sah1: {
		set: function (value) {
			if (this._sah1 === value) return;
			this._sah1 = value;
			if (this._sah1 < 0) this._sah1 = 0.01;
			this.draw();
		},
		get: function () {
			return this._sah1;
		}
	},
	maxX: {
		set: function (value) {
			if (this._maxX === value) return;
			this._maxX = value;
			if (this._maxX < 0) this._maxX = 0;
			this.array[0].value = this._maxX;
		},
		get: function () {
			return this._maxX;
		}
	},


	minY: {
		set: function (value) {
			if (this._minY === value) return;
			this._minY = value;
			if (this._minY < 0) this._minY = 0;
			this.array[1].value = this._minY;
		},
		get: function () {
			return this._minY;
		}
	},

	minX: {
		set: function (value) {
			if (this._minX === value) return;
			this._minX = value;
			if (this._minX < 0) this._minX = 0;
			this.array[2].value = this._minX;
		},
		get: function () {
			return this._minX;
		}
	},
	maxY: {
		set: function (value) {
			if (this._maxY === value) return;
			this._maxY = value;
			if (this._maxY < 0) this._maxY = 0;
			this.array[3].value = this._maxY;
		},
		get: function () {
			return this._maxY;
		}
	},
	stroke: {
		set: function (value) {
			if (this._stroke === value) return;
			this._stroke = value;
			this.draw();
		},
		get: function () {
			return this._stroke;
		}
	}
});
