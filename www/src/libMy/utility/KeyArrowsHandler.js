/**
*   Управление стрелками и [a, w, d, s] на клавиатуре.
*   Принимает пойнт со стартовыми координатами и изменяет.
*   @class
*/
function KeyArrowsHandler () {
	var self = this;
	this.type = 'KeyArrowsHandler';

	this.fun = null;
	this.activ = false; // false - действие в keydown/up не выполняются
	this.funMove = null;
	this._activMove = false; // false - ни одна из кнопок не нажата. Изменение координат не нужно
	this.point = new Position(0, 0);
	this.document = $(document);

	this.moveObjKeyArrowsArr = new MoveObjKeyArrowsArr();

	/**
     * Масив c обьектами, которые содержат массив с keyCode, ф-ю для выполнения движения
	 * и направаление в какую сторону оно происходит.
     * @member {Array<InfoKey>}
     */
	this.arrayKey = [
		new InfoKey([38, 87], 0, -1), // up
		new InfoKey([40, 83], 0, 1), // bottom
		new InfoKey([39, 68], 1, 0), // right
		new InfoKey([37, 65], -1, 0) // left
	];

	/** принимает обьект, положение которого нужно изменить
	* @param {Object | Array<Object>} обьект
	*/
	this.setObj = function (_obj) {
		this.activ = false;
		if (_obj === undefined || _obj === null) return;

		this.moveObjKeyArrowsArr.initFun(_obj);

		if (!this.moveObjKeyArrowsArr.containsFun()) return;

		this.activ = true;
		this.point.set(0, 0);
		this.funMove = this.moveObjKeyArrowsArr.callArrFun;
	};

	var idActivKey;
	this.document.keydown(function (e) {
		if (!self.activ) return;

		if (boolDownMykeyAndCtrl(e) === true) {
			// Отменяет событие, если оно отменяемое, без остановки дальнейшего распространения этого события
		   	e.preventDefault();
		}

		idActivKey = getIdAktivKey(e.keyCode);
		if (idActivKey === -1) return;

		if (!self.arrayKey[idActivKey].activ) {
			self.activMove = true;
			self.arrayKey[idActivKey].activ = true;
		}
	});

	// нажата ли кнопка ctrl вместе с нужными в этом классе
	var arrayKey = [38, 87, 40, 83, 39, 68, 37, 65];
	function boolDownMykeyAndCtrl (_e) {
		if (!_e.ctrlKey) return false;

		for (var i = 0; i < arrayKey.length; i++) {
			if (arrayKey[i] === _e.keyCode)	return true;
		}

		return false;
	}

	this.document.keyup(function (e) {
		if (!self.activ) return;
		idActivKey = getIdAktivKey(e.keyCode);
		if (idActivKey === -1) return;

		self.arrayKey[idActivKey].activ = false;
		self.activMove = leastOneActiv();
	});

	/** Выполняется update. обновление приходит с Floor
	* @param {obj} обьект
	*/
	this.update = function () {
		if (!this.activ) return;
		if (!this._activMove) return;
		aBMouse.activ = false; // to do убрать глобал
		var deltaTime = PIXI.ticker.shared.elapsedMS / 100;

		this.point.set(0, 0);
		for (var i = 0; i < this.arrayKey.length; i++) {
			this.point.x += (this.arrayKey[i].x * deltaTime);
			this.point.y += (this.arrayKey[i].y * deltaTime);
			this.arrayKey[i].update(deltaTime);
		}

		if (this.funMove) this.funMove();
		this.point.set(0, 0);
	};

	function getIdAktivKey (_keyCode) {
		for (var i = 0; i < self.arrayKey.length; i++) {
			if (self.arrayKey[i].keyIndexOf(_keyCode)) {
				return i;
			}
		}
		return -1;
	}

	// возвращает тру если хоть одна нужная кнопка нажата
	function leastOneActiv () {
		for (var i = 0; i < self.arrayKey.length; i++) {
			if (self.arrayKey[i].activ === true) {
				return true;
			}
		}
		return false;
	}

}
KeyArrowsHandler.prototype = {
	set activMove (v) {
		if (this._activMove === v) return;
		this._activMove = v;
		for (var i = 0; i < this.arrayKey.length; i++) {
			this.arrayKey[i].clear();
		}
		if (this.fun) this.fun();
	},
	get activMove () {
		return this._activMove;
	}
};

/**
*   Содержит массив с keyCode для которых нужно выполнять одно движение
*   и направаление в какую сторону оно происходит
*   @class
*/
function InfoKey (_arr, _directionX, _directionY) {
	this.array = _arr; // массив keyCode (стрелка вверх и w - 38 & 87)
	this.directionX = _directionX; // направления
	this.directionY = _directionY;

	this.x = 0;
	this.y = 0;
	this.speed = 2;
	this.activ = false;

	this.update = function (deltaTime) {
		if (this.activ === true) {
			this.x += (this.directionX * this.speed) * deltaTime;
			this.y += (this.directionY * this.speed) * deltaTime;
		} else {
			this.x *= (0.85 * deltaTime);
			this.y *= (0.85 * deltaTime);
		}
	};

	this.clear = function () {
		this.x = 0;
		this.y = 0;
	};

	this.keyIndexOf = function (num) { // проверка наличия keyCode в этом массиве
		if (this.array.indexOf(num) !== -1) return true;
		else return false;
	};
}

/*
* Класс который содержит ф-ции для движения обьектов по их типам.
* движение происходит при нажатии стрелок на клаве с класса KeyArrowsHandler.
* Чтобы добавить сюда действие для обьекта:
*       1. Напиши ф-ю "yourObjMove() {}";
*       2. Создай элемент массива с типом этого об-а. this.arrayFunMove["yourObj.type"]
*       2. Присвой ему ф-ю "yourObjMove";
* @class
*/
function MoveObjKeyArrows () {
	this.type = 'MoveObjKeyArrows';
	var self = this;

	this.downObj = null; // Нажатый обьект над которым выполняются действия.
	this.arrayFunMove = []; // Массив который содержит функции для выполнения определенного обьекта

	// возвращает функцию для выполнения при драге
	this.getFunMove = function (_obj) {
		if (this.arrayFunMove[_obj.type] || this.arrayFunMove[_obj.tipe]) {
			this.downObj = _obj;
			return this.arrayFunMove[_obj.tipe]; // "tipe" так как в Pol - type == terrace и т.д.
		}
		if (_obj instanceof Splice) {
			if (this.arrayFunMove['Splice']) {
				this.downObj = _obj;
				return this.arrayFunMove['Splice']; // "tipe" так как в Pol - type == terrace и т.д.
			}
		}
		if (_obj instanceof SpPoint) {
			if (this.arrayFunMove['SpPoint']) {
				this.downObj = _obj;
				return this.arrayFunMove['SpPoint']; // "tipe" так как в Pol - type == terrace и т.д.
			}
		}
		return null;
	};

	// ~~~~~~~~~~~~~~~~~~~ ф-ции для движения обьектов по их типам
	function aidPointMove () { // Подходит для spPointRoad и spPointTabletop
		self.downObj.position.x += this.point.x;
		self.downObj.position.y += this.point.y;
		self.downObj.dragVokrug();
	}

	function colBoxMove () {
		this.point.x += self.downObj.visiCB.pXD.rectangle.p.x;
		this.point.y += self.downObj.visiCB.pXD.rectangle.p.y;
		self.downObj.visiCB.pXD.zdvig('posit', this.point);
		self.downObj.visiCB.update();
	}

	function stenMove () { // Подходит для spliceRoad и spliceTabletop

		if (self.downObj.addPoint !== undefined) {
			self.downObj.addPoint.position.x += this.point.x;
			self.downObj.addPoint.position.y += this.point.y;
			self.downObj.addPoint.dragVokrug();
		}
		if (self.downObj.addPoint1 !== undefined) {
			self.downObj.addPoint1.position.x += this.point.x;
			self.downObj.addPoint1.position.y += this.point.y;
			self.downObj.addPoint1.dragVokrug();
		}
	}

	function blokMove () {

		if (self.downObj.getTypePos() === true) {
			self.downObj.position.x += this.point.x;
			self.downObj.position.y += this.point.y;
			rulitObject.rulit2D.updatePxdFromBlok(self.downObj, self.downObj.rect);
			this.point.set(0, 0);
		} else {
			var offset = (this.point.x * self.downObj.mirrorx) || (this.point.y * self.downObj.mirrory);
			if (self.downObj.parent && self.downObj.parent.tip === 0) {
				self.downObj.position.x = self.downObj.position.x + offset;
			} else {
				self.downObj.windowLength = self.downObj.windowLength + offset;
			}
			self.downObj.dragObj();
			this.point.set(0, 0);
		}
	}

	function polMove () {
		for (var i = 0; i < self.downObj.arrPoint.length; i++) {
			self.downObj.arrPoint[i].position.x += this.point.x;
			self.downObj.arrPoint[i].position.y += this.point.y;
		}
		self.downObj.rectangle.x = this.point.x;
		self.downObj.rectangle.y = this.point.y;
		self.downObj.draw();
	}
	// обьект с координатой и функцией для драга
	this.arrayFunMove['Pol'] = polMove;
	this.arrayFunMove['Blok'] = blokMove;
	this.arrayFunMove['ColBox'] = colBoxMove;
	this.arrayFunMove['AidPoint'] = aidPointMove;
	this.arrayFunMove['SpPoint'] = aidPointMove;
	this.arrayFunMove['Splice'] = stenMove;
}


function MoveObjKeyArrowsArr () {
	var self = this;

	this.cacheObjKeyArrows = new CacheObj('life', MoveObjKeyArrows);
	this.arrFun = [];

	this.initFun = function (_obj) {

		self.arrFun.length = 0;
		self.cacheObjKeyArrows.clear();

		if (Array.isArray(_obj)) {
			for (var i = 0; i < _obj.length; i++) {
				self.arrFun[i] = self.cacheObjKeyArrows.get().getFunMove(_obj[i]);
			}
		} else {
			self.arrFun[0] = self.cacheObjKeyArrows.get().getFunMove(_obj);
		}
	};

	this.containsFun = function () {
		for (var i = 0; i < self.arrFun.length; i++) {
			if (isFunction(self.arrFun[i])) {
				return true;
			}
		}
		return false;
	}

	this.callArrFun = function () {
		if (!self.arrFun || self.arrFun.length === 0) return;
		for (var i = 0; i < self.arrFun.length; i++) {
			if (isFunction(self.arrFun[i])) {
				self.arrFun[i].call(this);
			}
		}
	}

	function isFunction (val) {
		return typeof val === 'function';
	}

	this.traverse = function (callback) {
		self.cacheObjKeyArrows.traverse(function (item, ind, arr) {
			if (self.arrFun[ind]) {
				callback(item);
			}
		});
	};

	this.getCount = function () {
		return self.cacheObjKeyArrows.getCount();
	};
}


function CacheObj (name, construct) {
	var self = this;

	this.array = [];
	var indexCache = 0;

	this.get = function () {
		for (var i = indexCache++; i < this.array.length; i++) {
			if (!this.array[i][name]) {
				this.array[i][name] = true;
				return this.array[i];
			}
		}

		var nObj = new construct();
		nObj[name] = true;
		this.array.push(nObj);
		return nObj;
	};

	this.clear = function () {
		for (var i = 0; i < indexCache; i++) {
			this.array[i][name] = false;
		}
		indexCache = 0;
	};

	this.traverse = function (callback) {
		for (var i = 0; i < indexCache; i++) {
			callback(this.array[i], i, this.array);
		}
	};

	this.getCount = function () {
		return indexCache;
	};

}
