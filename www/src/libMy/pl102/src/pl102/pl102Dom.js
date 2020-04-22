
function PLDom () {
	this.arrDom = [];
	var self = this;

	this.addDOM = function (dom) {
		dom.arrId = this.arrDom.length;
		this.arrDom.push(dom);
		invisbilityCheck(dom);
	};
	
	this.grablaFun = function (displayObject) {

		if (displayObject.type == 'PLDOMElement') {
			displayObject.visibleDOM = worldVisible(displayObject);// .worldVisible;
			al = 1;
			displayObject.alphaDOM = worldAlpha(displayObject);// displayObject.worldAlpha;
		} else {
			if (displayObject.children) {
				for (var i = 0; i < displayObject.children.length; i++) {
					this.grablaFun(displayObject.children[i]);
				}
			}
		}
	};

	var al = 1;
	var worldAlpha = function (displayObject) {
		al = Math.min(al, displayObject.alpha);
		if (displayObject.parent) {
			al = worldAlpha(displayObject.parent);
		}
		return al;
	};

	var worldVisible = function (displayObject) {
		if (!displayObject.visible) return false;
		if (displayObject.parent) {
			return worldVisible(displayObject.parent);
		}
		return true;
	};

	var invisbilityCheck = function (displayObject) {

		if (displayObject.grablaFun == undefined)displayObject.grablaFun = self.grablaFun;
		if (displayObject.parent) {
			invisbilityCheck(displayObject.parent);
		}
	};

	this.addContentInGrab = function (displayObject) {
		invisbilityCheck(displayObject);
	};

};
export var pLDom = new PLDom();


var DomUtill = (function DomUtill () {
	var _dummyElement = document.createElement('span');
	var _hasComputedStyle = !!window.getComputedStyle;
	var _hasCurrentStyle = !!document.documentElement.currentStyle;
	// var _hasBoundingClientRect = !!_dummyElement.getBoundingClientRect;

	// css prefixer
	var getPrefixedCSS = (function () {
		var prefixCache = {};
		var prefixCacheCapitalized = {};
		var cssPrefixes = ['Webkit', 'O', 'Moz', 'ms'];
		var style = (_hasComputedStyle && _dummyElement.ownerDocument.defaultView.getComputedStyle(_dummyElement, null)) || _dummyElement.currentStyle;
		return function (name, capitalize) {
			if (!_hasComputedStyle && !_hasCurrentStyle) {
				return name;
			}
			if (prefixCache[name] === undefined) {
				var bits = name.split('-');
				var capName = bits[0];
				for (var i = 1; i < bits.length; i++) {
					capName += bits[i].charAt(0).toUpperCase() + bits[i].slice(1);
				}
				prefixCache[name] = name + '';
				prefixCacheCapitalized[name] = capName + '';
				if (!(name in style)) {
					capName = capName.charAt(0).toUpperCase() + capName.slice(1);
					for (var i = 0; i < cssPrefixes.length; i++) {
						if ((cssPrefixes[i] + capName) in style) {
							prefixCache[name] = '-' + cssPrefixes[i].toLowerCase() + '-' + name;
							prefixCacheCapitalized[name] = cssPrefixes[i] + capName;
							break;
						}
					}
				}
			}
			return capitalize ? prefixCacheCapitalized[name] : prefixCache[name];
		};
	})();

	// exports
	return {
		getPrefixedCSS: getPrefixedCSS
	};
})();


/*
   new PLDOMElement(document.createElement('input'), pixiContent);
*/
export function PLDOMElement (htmlElement, pixiContent) {
	PIXI.Container.call(this);
	pixiContent.addChild(this);
	this.type = 'PLDOMElement';
	this.typeCom = 'pixi';
	this.arrId = 0;
	var self = this;

	this.htmlElement = htmlElement;
	this.htmlElement.style.position = 'fixed';
	this.htmlElement.style.top = '0px';
	this.htmlElement.style.left = '0px';
	this.htmlElement.style.zIndex = '1';

	// transforms
	var cssTransform = DomUtill.getPrefixedCSS('transform', true);
	var cssTransformOrigin = DomUtill.getPrefixedCSS('transform-origin', true);
	var cssBoxSizing = DomUtill.getPrefixedCSS('box-sizing', true);
	this.htmlElement.style[cssBoxSizing] = 'border-box';
	this.htmlElement.style[cssTransformOrigin] = '0 0';
	var _mat;

	this.updateDomElement = function () {
		// update matrix
		_mat = 'matrix(' + this.worldTransform.a + ',' + this.worldTransform.b + ',' + this.worldTransform.c + ',' + this.worldTransform.d + ',' + 0 + ',' + 0 + ')';
		this.htmlElement.style[cssTransform] = _mat;

		this.htmlElement.style.top = this.worldTransform.ty + 'px';
		this.htmlElement.style.left = +this.worldTransform.tx + 'px';

	};

	pLDom.addDOM(this);
	this.transform.grabla = this.updateDomElement.bind(this);
	if (!htmlElement.parentNode) pl102.doc.appendChild(htmlElement);


	this.kill = function () {
		this.htmlElement.parentNode.removeChild(this.htmlElement);
		this.parent = null;
	};

	this.interactive = true;
	this.hitArea = new PIXI.Rectangle(0, 0, 100, 20);
	this.width = 100;
	this.height = 20;
	this.alphaDOM = this.worldAlpha;
	this.visibleDOM = this.worldVisible;
	// this._visibleDOM = true;
	// FIXE TODO всплывалка в визебле моргает при старте
	/* setTimeout(function(){self.updateDomElement()}, 1);
    this.updateDomElement(); */

}
PLDOMElement.prototype = Object.create(PIXI.Container.prototype);
PLDOMElement.prototype.constructor = PLDOMElement;

Object.defineProperties(PLDOMElement.prototype, {

	width: {
		set: function (value) {
			this._width = value;
			this.htmlElement.style.width = this._width + 'px';
			this.hitArea.width = value;
		},
		get: function () {
			return this._width;
		}
	},

	height: {
		set: function (value) {
			this._height = value;
			this.hitArea.height = value;
			this.htmlElement.style.height = this._height + 'px';
		},
		get: function () {
			return this._height;
		}
	},

	visibleDOM: {
		set: function (value) {
			this._visibleDOM = value;
			this.htmlElement.style.visibility = this._visibleDOM ? 'visible ' : 'hidden';
		},
		get: function () {
			return this._visibleDOM;
		}
	},
	alphaDOM: {
		set: function (value) {
			this._alphaDOM = value;
			this.htmlElement.style.opacity = this._alphaDOM;
		},
		get: function () {
			return this._alphaDOM;
		}
	}


});
