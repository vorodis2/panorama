/**
 * Утилита конвартиации цвета в разные форматы.
 * @class
 */
function ColorConverter () {

	function hsvToRgb (hsv) {
		var h = hsv[0] / 360;
		var s = hsv[1] / 100;
		var v = hsv[2] / 100;
		var r, g, b;

		var i = Math.floor(h * 6);
		var f = h * 6 - i;
		var p = v * (1 - s);
		var q = v * (1 - f * s);
		var t = v * (1 - (1 - f) * s);

		switch (i % 6) {
			case 0: r = v, g = t, b = p; break;
			case 1: r = q, g = v, b = p; break;
			case 2: r = p, g = v, b = t; break;
			case 3: r = p, g = q, b = v; break;
			case 4: r = t, g = p, b = v; break;
			case 5: r = v, g = p, b = q; break;
		}

		return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
	}
	/**
     * Конвертация RGB в HSV
     * @param {Array} rgb - [0 -> 255, 0 -> 255, 0 -> 255].
     * @return {Array} [0 -> 360, 0 -> 100, 0 -> 100].
     */
	function rgbToHsv (rgb) {
		var r = rgb[0] / 255;
		var g = rgb[1] / 255;
		var b = rgb[2] / 255;
		var max = Math.max(r, g, b);
		var min = Math.min(r, g, b);
		var h, s, v = max;
		var d = max - min;
		s = max === 0 ? 0 : d / max;

		if (max === min) {
			h = 0; // achromatic
		} else {
			switch (max) {
				case r: h = (g - b) / d + (g < b ? 6 : 0); break;
				case g: h = (b - r) / d + 2; break;
				case b: h = (r - g) / d + 4; break;
			}

			h /= 6;
		}
		return [Math.round(h * 360), Math.round(s * 100), Math.round(v * 100)];
	}

	function toHex (c) {
		var hex = c.toString(16);
		return hex.length === 1 ? '0' + hex : hex;
	}
	/**
     * Конвертация RGB в String
     * @param {Array} rgb - [0 -> 255, 0 -> 255, 0 -> 255].
     * @return {String} 'ffffff.
     */
	function rgbToStr (rgb) {
		return '' + toHex(rgb[0]) + toHex(rgb[1]) + toHex(rgb[2]);
	}
	/**
     * Конвертация Decimal number ->  string
     * @param {Number} decimal - [0 -> 255, 0 -> 255, 0 -> 255].
     * @return {String} 'ffffff.
     */
	function decToString (number) {
		var mi = number - 0;
		var red = parseInt(mi / 65536);
		var green = parseInt((mi - red * 65536) / 256);
		var blue = mi - red * 65536 - green * 256;

		var r16 = red.toString(16);
		while (r16.length < 2) {
			r16 = '0' + r16;
		}
		var g16 = green.toString(16);
		while (g16.length < 2) {
			g16 = '0' + g16;
		}
		var b16 = blue.toString(16);
		while (b16.length < 2) {
			b16 = '0' + b16;
		}
		return r16 + g16 + b16;
	}
	/**
     * Конвертация HEX ->  RGB
     * @param {String} hex - '#ffffff',
     * @return {Array} [0 -> 255, 0 -> 255, 0 -> 255].
     */
	function hexToRgb (hex) {
		var c;
		if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
			c = hex.substring(1).split('');
			if (c.length === 3) {
				c = [c[0], c[0], c[1], c[1], c[2], c[2]];
			}
			c = '0x' + c.join('');
			return [(c >> 16) & 255, (c >> 8) & 255, c & 255];
		}
	}
	/**
     * Конвертация RGB -> Decimal
     * @param {Array} rgb - [0 -> 255, 0 -> 255, 0 -> 255],
     * @param {Boolean} isString - вернет строку или число,
     * @return {Number | String} 16777215 || 0xffffff.
     */
	function rgbToDec (rgb, isString) {
		var str = rgbToStr(rgb);
		if (isString === true) {
			return '0x' + str;
		}
		return parseInt('0x' + str, 16);
	}
	/**
     * Конвертация Decimal -> RGB
     * @param {Number | String} decimal - 16777215 || 0xffffff,
     * @return {Array} [0 -> 255, 0 -> 255, 0 -> 255].
     */
	function decToRgb (decimal) {
		var str = (typeof decimal === 'string') ? decimal.split('0x')[1] : decToString(decimal);
		var hex = '#' + str;
		return hexToRgb(hex);
	}
	/**
     * Конвертация RGB -> HEX
     * @param {Array} rgb - [0 -> 255, 0 -> 255, 0 -> 255],
     * @return {String} '#ffffff'.
     */
	function rgbToHex (rgb) {
		return '#' + rgbToStr(rgb);
	}
	/**
     * Конвертация Decimal number -> Decimal string.
     * @param {Number} number - 16777215,
     * @return {String} '0xffffff'.
     */
	function decToDecStr (number) {
		return '0x' + decToString(number);
	}
	/**
     * Конвертация Decimal string -> Decimal number.
     * @param {String} string - '0xffffff',
     * @return {Number} 16777215.
     */
	function decStrToDec (string) {
		return parseInt(string, 16);
	}
	/**
     * Конвертация Decimal -> HEX.
     * @param {Number | String} decimal - 16777215 || 0xffffff,
     * @return {String} '#ffffff'.
     */
	function decToHex (decimal) {
		var str = (typeof decimal === 'string') ? decimal.split('0x')[1] : decToString(decimal);
		return '#' + str;
	}
	/**
     * Конвертация HEX -> Decimal.
     * @param {String} hex - '#ffffff',
     * @param {Boolean} isString - вернет строку или число,
     * @return {Number | String} 16777215 || 0xffffff.
     */
	function hexToDec (hex, isString) {
		var str = hex.split('#')[1];
		if (isString === true) {
			return '0x' + str;
		}
		return parseInt('0x' + str, 16);
	}

	this.rgbToDec = rgbToDec;
	this.rgbToHex = rgbToHex;
	this.rgbToHsv = rgbToHsv;

	this.decToRgb = decToRgb;
	this.decToHex = decToHex;
	this.decToDecStr = decToDecStr;
	this.decStrToDec = decStrToDec;

	this.hexToDec = hexToDec;
	this.hexToRgb = hexToRgb;

	this.hsvToRgb = hsvToRgb;
}
