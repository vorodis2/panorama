

function Rectangle (_x, _y, _width, _height, fun) {
	this._x = _x || 0;
	this._y = _y || 0;

	this._width = _width !== undefined ? _width : 100;
	this._height = _height !== undefined ? _height : 100;

	this.angel = 0;
	this.p = new Position();
	this.fun;


	this.set = function (_x, _y, _width, _height) {
		this._x = _x || 0;
		this._y = _y || 0;

		this._width = _width !== undefined ? _width : 100;
		this._height = _height !== undefined ? _height : 100;

		// if( this.fun) this.fun();
	};

	this.setRect = function (_r) {
		this._x = _r.x;
		this._y = _r.y;

		this._width = _r.width;
		this._height = _r.height;

		this.p.setPoint(_r.p);
		this.angel = _r.angel;
		// if( this.fun) this.fun();
	};
}
Rectangle.prototype = {
	set x (v) {
		if (this._x === v) return;
		this._x = v;
		// if( this.fun) this.fun();
	},
	get x () {
		return this._x;
	},

	set y (v) {
		if (this._y === v) return;
		this._y = v;
		// if( this.fun) this.fun();
	},
	get y () {
		return this._y;
	},

	set width (v) {
		if (this._width === v) return;
		this._width = v;
		// if( this.fun) this.fun();
	},
	get width () {
		return this._width;
	},

	set height (v) {
		if (this._height === v) return;
		this._height = v;
		// if( this.fun) this.fun();
	},
	get height () {
		return this._height;
	}


};
