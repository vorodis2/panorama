function PdfEditorMenuHeader (_pdfEditorMenu) {
	PIXI.Container.call(this);
	var self = this;
	this.type = 'PdfEditorMenuHeader';

	this.pdfEditorMenu = _pdfEditorMenu;

	this.pdfEditorMenu.addChild(this);

	this._width = 100;
	this._height = this.pdfEditorMenu.headerHeight;

	this.contentBtn = new PIXI.Container();
	this.pdfEditorMenu.addChild(this.contentBtn);

	this.drawVerticalButtonsLines = true;

	this.array = [];

	this.array[0] = new PLButton(this.contentBtn, 0, 0, '');
	this.array[1] = new PLButton(this.contentBtn, 0, 0, 'Load', onDown);
	this.array[2] = new PLButton(this.contentBtn, 0, 0, 'Hand', onDown);
	this.array[3] = new PLButton(this.contentBtn, 0, 0, 'Zoom+', onDown);
	this.array[4] = new PLButton(this.contentBtn, 0, 0, 'Zoom-', onDown);
	this.array[5] = new PLButton(this.contentBtn, 0, 0, 'RotLeft', onDown);
	this.array[6] = new PLButton(this.contentBtn, 0, 0, 'RotRight', onDown);
	this.array[7] = new PLButton(this.contentBtn, 0, 0, '');

	for (var i = 0; i < this.array.length; i++) {
		if (i === 1)  this.array[i].startFile('.jpg, .png, .bmp, .jpeg, .pdf');
		this.array[i].idArr = i;
	}

	this.setIcons = function (_array) {
		for (var i = 1; i < this.array.length - 1; i++) {
			this.array[i].text = '';
			this.array[i].loadImeg(_array[i - 1]);
		}
	};

	function onDown (_file) {

		if (this.idArr === 2) {
			this.activ = !this._activ;
			this.gPlus.visible = !this._activ;
		}

		var param = {};

		switch (this.idArr) {
			case 1:
				param.name = 'loadFile';
				param.file = _file;
				break;
			case 2:
				param.name = 'movePage';
				param.isMovePage = this._activ;
				break;
			case 3:
				param.name = 'zoomDeltaPage';
				param.zoomPage = 1;
				break;
			case 4:
				param.name = 'zoomDeltaPage';
				param.zoomPage = -1;
				break;
			case 5:
				param.name = 'rotatePage';
				param.rotatePage = -1;
				break;
			case 6:
				param.name = 'rotatePage';
				param.rotatePage = 1;
				break;
			default:
				param.name = null;
		}

		self.pdfEditorMenu.dispatchEvent(new PdfEditorEvent('onDown', param));
	};

	this.setState = function (_object) {

		if (_object.name === 'pageChange') {

			this.array[2].activMouse = (_object.isCrop === true) ? _object.isInVisibleArea : _object.isCrop;
			this.array[2].activ = (_object.isCrop === true) ? _object.isInVisibleArea : _object.isCrop;
			this.array[2].gPlus.visible = !this.array[2].activ;

			if (this.array[2].activ === true && this.array[2].activMouse === false) {
				this.array[2].activ = false;
			}

			this.array[3].activMouse = (_object.isCrop === true) ? _object.isMaxZoom : _object.isCrop;
			this.array[4].activMouse = (_object.isCrop === true) ? _object.isMinZoom : _object.isCrop;

			this.array[5].activMouse = _object.isCrop;
			this.array[6].activMouse = _object.isCrop;
		}
	};

	this.clear =  function () {
		for (var i = 1; i < this.array.length - 1; i++) {
			this.array[i].activ = false;
			this.array[i].activMouse = true;
		}
	};

	var shag = 0;

	this.graphicsButtonsLines = new PIXI.Graphics();
	this.contentBtn.addChild(this.graphicsButtonsLines);

	this.draw = function () {

		shag = (this._width - this._height * (this.array.length - 1)) / 2;

		for (var i = 0; i < this.array.length; i++) {
	
			if (i === 0) {
				this.array[i].x = this._height;
				this.array[i].width = shag;
				this.array[i].height = this._height;
				continue;
			}
			// Второй элемент (неактивная кнопка)
			// выполняет роль панели
			if (i === this.array.length - 1) {
				this.array[i].x = this._width - this.array[0].width - this._height;
				this.array[i].height = this._height;
				this.array[i].width = this.array[0].width + this._height;
				continue;
			}

			this.array[i].width = this._height;
			this.array[i].height = this._height;

			this.array[i].x = shag;

			if (i === 1) {
				this.array[i].x = 0;
			}

			shag += this._height;
		}

		for (i = 0; i < this.array.length; i++) {
			this.debagGraf1(this.array[i]);
		}

		if (this.drawVerticalButtonsLines) {
			this.graphicsButtonsLines.clear();
			this.graphicsButtonsLines.beginFill();
			for (var i = 0; i < this.array.length; i++) {
				if (!self.array[i]) continue;
				if (!self.array[i].visible) continue;
				if (i === this.array.length - 1) continue;

				var tmpX = self.array[i].x;
				var tmpY = self.array[i].y;
				var tmpWidth = self.array[i].width;
				var tmpHeight = self.array[i].height;

				// Рисовка линии (правая) 0x9c9c9c (Светлая)
				this.graphicsButtonsLines.lineStyle(1, 0x9c9c9c, 1);
				this.graphicsButtonsLines.moveTo(tmpX + tmpWidth - 0.5, tmpY);
				this.graphicsButtonsLines.lineTo(tmpX + tmpWidth - 0.5, tmpY + tmpHeight);

				// Рисовка линии (левее) 0x525252 (Темная)
				this.graphicsButtonsLines.lineStyle(1, 0x525252, 1);
				this.graphicsButtonsLines.moveTo(tmpX + tmpWidth - 1.5, tmpY);
				this.graphicsButtonsLines.lineTo(tmpX + tmpWidth - 1.5, tmpY + tmpHeight);
			}
			this.graphicsButtonsLines.endFill();
		}

		this.graphicsButtonsLines.parent.addChild(this.graphicsButtonsLines);
	};

	var yy;
	var xx;
	var len;
	var step;
	var delS;
	var delE;
	var hheight;
	var sinEndX;
	var sinStartX;
	var otstup = 27;
	var otstup1 = 7;

	this.debagGraf1 = function (button) {
		g = button.gPlus;
		g.clear();
		g.beginFill(0x000000, 0.5);

		len = 220;

		sinStartX = 150; // позиция части с синусом

		if (button.x < sinStartX - button.width) {
			g.drawRect(0, this._height - otstup, button.width, otstup - 1);
			return;
		}

		if (button.x > sinStartX + len) {
			g.drawRect(0, otstup1, button.width, this._height - otstup1 - 1);
			return;
		}

		// налазит синус-часть на кнопку
		hheight = this._height - otstup - otstup1;
		sinEndX = sinStartX + len;
		step = len / 180;
		delStart = 0;
		delEnd = button.width;


		if (button.x < sinStartX) {
			delStart = sinStartX - button.x;
			g.drawRect(0, this._height - otstup, delStart, otstup - 1);
		}

		if (button.x <= (sinStartX + len) && (button.x + button.width) >= (sinStartX + len)) {
			delEnd = sinStartX + len - button.x;
			g.drawRect(delEnd, otstup1, button.width - delEnd, this._height - otstup1 - 2);
		}

		// синус
		if (button.x <= sinStartX || button.x <= (sinStartX + len)) {

			for (var i = delStart; i <= delEnd; i++) {
				xx = (button.x + i - sinStartX) / (len / (180));
				yy = hheight / 2 - Math.sin((xx * Math.PI / 180) - Math.PI / 2) * (hheight / 2) + otstup1;

				if (i == delStart) {
					g.moveTo(i, yy);
				} else {
					g.lineTo(i, yy);
				}
			}

			g.lineTo(delEnd, this._height - 1);
			g.lineTo(delStart, this._height - 1);
		}
	};
}

PdfEditorMenuHeader.prototype = Object.create(PIXI.Container.prototype);
PdfEditorMenuHeader.prototype.constructor = PdfEditorMenuHeader;
// PdfEditorMenuHeader.prototype = Object.assign(PdfEditorMenuHeader.prototype, EventDispatcher.prototype);


Object.defineProperties(PdfEditorMenuHeader.prototype, {

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
	}
});
