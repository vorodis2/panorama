/** @module planer */

/**
 * Управление компонентами менюшек, создание компонентов и настройка.
 * @class
 * @param {Container} _cont - pixi контейнер.
*/
import { PLGalleryADM } from './PLGalleryADM.js';

export function SettingsBig (_cont) {
	var self = this;
	this.type = 'SettingsBig';

	this.content = new PIXI.Container();
	this.content.type = 'SettingsBigCont';
	this.content.settingsBig = this;
	if (_cont != undefined) _cont.addChild(this.content);

	this.dinFun;

	this._otstup = 10;
	this._width = 200;
	this._height = 200;
	this._heightMax = 1000;
	this._value = undefined;
	this.drawArrFon = true;
	this.finalHeight = 200;
	this.arrComp = [];
	this.arrComp2 = [];
	this.objComp = {};

	this.tipRide = false;
	this.arrF = [];
	this.arrayFon = new PLArrayFon(this.content);
	this.arrayFon.width = this._width - 1;
	this.arrayFon.x = 0.5;
	this.arrayFon.alphaIm = 0.12;
	this.debugRect = false;

	this.shagY = 0;

	this.korectText = null;
	var component;
	var shagX = 0;
	var mawH = 0;
	var kolS;
	var shaSlid;
	var predComp = 'null'; // предидущий компонент
	var compPH = 0; // высота фоновых панелей
	var startP = 0; // точки позиции фоновых панелей по Y
	var miniOtstup = 2; // отсуп
	/**
	 * Сборка менюшки, позиционирование компонентов и фона arrayFon под компонентами.
	*/
	this.draw = function () {

		this.getBigH();

		if (this.debugRect) this.drawDebugRect();

		shaSlid = 0;
		this.shagY = this._otstup;

		this.arrF = [];
		this.arrF[0] = 0;
		this.arrF[1] = 2;

		predComp = 'null';
		compPH = 0;
		startP = 0;

		this.arrDividingLine.forEach(function (item) {
			item.visible = false;
		});

		for (var i = 0; i < this.arrComp2.length; i++) {

			if (this.arrComp2[i].visible !== false) {

				var bbwidth = true;

				if (this.arrComp2[i].funDrag !== undefined) {
					if (this.arrComp2[i].funDrag(this, i) === true) continue;
				}

				if (this.arrComp2[i].type === 'PLCheckBoxImage') {
					if (this.arrComp2[i + 1] != undefined) {
						if (this.arrComp2[i + 1].type == 'PLCheckBoxImage') {
							bbwidth = false;
						}
					}
				}

				if (this.arrComp2[i].type === 'SliderImg') {
					if (this.arrComp2[i + 1] != undefined && (++shaSlid) % 2 != 0) {
						if (this.arrComp2[i + 1].type == 'SliderImg') {
							bbwidth = false;
						}
					}
				}

				if (this.arrComp2[i].type === 'SliderImg') {
					this.arrComp2[i].x = this._otstup + this._otstup / 2;

					if (i !== 0) {
						if (this.arrComp2[i - 1].type === 'SliderImg' && shaSlid % 2 === 0) {
							this.arrComp2[i].x = this._width / 2 + this._otstup + this._otstup / 2;
							this.addDividingLine(
								this._width / 2,
								this.shagY - this._otstup + 2,
								this.arrComp2[i].height + this._otstup * 2 - 4
							);
						}
					}
				}

				if (this.arrComp2[i].type === 'PLButSwitch') {
					this.shagY -= this._otstup - miniOtstup;
				}
// -------------------------------PLColorPalette--------------------------------------
				var isCPa = (this.arrComp2[i].type === 'PLColorPalette');
				var isCPaPiv = (this.arrComp2[i].type === 'MColorPalettePicker');

				if (isCPa || isCPaPiv) {
					this.shagY -= this._otstup;
				}
// ------------------------------------------------------------------------------------------------

				if (bbwidth) {
					// позиции и высота фонов компонентам
					if (predComp === this.arrComp2[i].type || this.arrComp2[i].type.indexOf(predComp) !== -1) {
						compPH += this.arrComp2[i].height + this._otstup;
						this.arrF[this.arrF.length - 1] = compPH;
					} else {
						if (predComp === 'null' || i === this.arrComp2.length - 1 && this.arrComp2[this.arrComp2.length - 1].type == 'PLPachkaButton2') {
							startP = this.shagY;
						} else {
							this.shagY += this._otstup;
							startP = this.shagY;
						}
						this.arrF.push(startP);
						this.arrF.push(this.arrComp2[i].height + this._otstup);

						compPH = this.arrComp2[i].height + this._otstup;
					}
					predComp = this.arrComp2[i].type;
					// шаг компонентов по Y
					this.arrComp2[i].y = this.shagY;
					this.shagY += this.arrComp2[i].height + this._otstup;
				} else {
					this.arrComp2[i].y = this.shagY;
				}

				if (this.debugRect) this.drawDebugRect(this.arrComp2[i].y, this.arrComp2[i].height);

				if (this.arrComp2[i].type === 'PLPachkaButton2' || this.arrComp2[i].type === 'PLButSwitch') {
					this.arrF[this.arrF.length - 1] -= this._otstup;
					this.shagY -= this._otstup;

					if (this.arrComp2[i].type === 'PLButSwitch') {
						this.arrF[this.arrF.length - 1] += miniOtstup;
					}
				}
// -------------------------------PLColorPalette--------------------------------------
				if (isCPa || isCPaPiv) {
					this.arrF[this.arrF.length - 1] -= this._otstup;
					this.shagY -= this._otstup;
				}
// ------------------------------------------------------------------------------------------------

			}

		}
		// добавляем массив с точками для отрисовки фона компонентам
		if (this.drawArrFon == true) this.arrayFon.setArrFon(this.arrF);
		// высота менюшки

		this.finalHeight = this.shagY;

		this.draw2();
	};

	this.arrDividingLine = [];
	this.addDividingLine = function (x, y, height) {
		var graphics = null;
		this.arrDividingLine.forEach(function (item) {
			if (item.visible === false) {
				graphics = item;
				item.visible = true;
			}
		}, this);
		if (graphics === null) {
			graphics = new PIXI.Graphics();
			this.arrDividingLine.push(graphics);
			this.content.addChild(graphics);
		}
		graphics.clear();
		graphics.beginFill('0xaeaeae');
		graphics.drawRect(0, 0, 1.5, height);
		graphics.position.set(x, y);
	};

	var debugGraph;
	this.drawDebugRect = function (_y, _h) {
		if (debugGraph == undefined) {
			debugGraph = new PIXI.Graphics();
			this.content.addChild(debugGraph);
		}
		if (_y == undefined) {
			debugGraph.clear();
			return;
		}
		debugGraph.lineStyle(0.5, 0xff0000);
		debugGraph.drawRect(0, _y, this._width, _h);
	};


	this.getHForGal = function () {};

	this.draw2 = function () {};

	var colMax = 0;
	var colMin = 0;
	var actCol = true;// false;
	var indC = -1;
	/*
	 * Росчет и настройка компонентов с динамичесским изминением высторы.
	 * К примеру галереи, расчет высоты и настройка их.
	*/
	this.getBigH = function () {
		mawH = this._otstup * 2;
		kolS = 0;
		indC = -1;
		actCol = true;

		var bButSwitch = false; // есть ли переключатель "цвет/текстура" или нет
		for (var i = 0; i < this.arrComp2.length; i++) {
			if (this.arrComp2[i].visible && this.arrComp2[i].type === 'PLButSwitch') {
				bButSwitch = true;
				i = this.arrComp2.length;
			}
		}

		// считаем максимумы галерей
		for (var i = 0; i < this.arrComp2.length; i++) {
			if (this.arrComp2[i].visible != false) {
				switch (this.arrComp2[i].type) {
					case 'PLGADM':
						kolS += this.arrComp2[i].currentHeight + this._otstup;
						break;
					case 'GalleryAdm':
						kolS += this.arrComp2[i].corentHeight + this._otstup;
						break;
					case 'PLColorUn':
						colMax = this.arrComp2[i].heightMax + this._otstup;
						colMin = this.arrComp2[i].heightMin + this._otstup;
						break;
					default:
						mawH += this.arrComp2[i].height + this._otstup * 2;
				}
			}
		}

		mawH -= this._otstup;
		kolS -= this._otstup;

		var g = mawH + kolS;
		var s = mawH + kolS;
		var hMinHGAll = this._height - mawH; // высота галлереи, когда ее нужно уменьшить

		if (!bButSwitch) {
			g += colMax;
			s += colMin;
			hMinHGAll -= colMin;
		}

		for (var i = 0; i < this.arrComp2.length; i++) {
			if (this.arrComp2[i].visible !== false) {
				var type = this.arrComp2[i].type;
				if (type === 'PLGADM' || type === 'GalleryAdm') {
					if (g > this._height) {
						actCol = false;
						if (s > this._height) {
							this.arrComp2[i].height = hMinHGAll;
						} else {
							this.arrComp2[i].height = kolS;
						}
					} else {
						actCol = true;
						this.arrComp2[i].height = kolS;
					}
				}
				if (this.arrComp2[i].type == 'PLColorUn') indC = i;
				if (indC != -1) this.arrComp2[indC].boolBig = actCol;
			}
		}
	};

	var bbb;
	/**
	 * Скрытие компонентов.
	 * @param {Array} _arr - массив с элементами что скрываем или показываем.
	 * @example ['compName', value, 'compName', value] compName => name компонента, value => true/false
	*/
	this.setVisi = function (_arr) {
		bbb = false;
		for (var i = 0; i < _arr.length; i += 2) {
			if (this.objComp[_arr[i]] != undefined) {
				if (this.objComp[_arr[i]].visible != _arr[i + 1]) {
					bbb = true;
					this.objComp[_arr[i]].visible = _arr[i + 1];
				}
			}
		}
		if (bbb == true) {
			this.draw();
		}
		return bbb;
	};

	this.setValue = function (_id, _value, _num) {
		if (this.objComp[_id] != undefined) this.objComp[_id][_value] = _num;
	};

	this.getValue = function (_id, _value) {
		return this.objComp[_id][_value];
	};

	this.getComp = function (_id, _value) {
		return this.objComp[_id];
	};

	this.getIdIsName = function (_name) {
		for (var s in this.objComp) {
			if (this.objComp[s].param != undefined) {
				if (this.objComp[s].param == _name) {
					return this.objComp[s];
				}
			}
		}
		return null;
	};

	this.object;
	this.setObj = function (_obj) {

		this.object = _obj;
		this._value = _obj;
		this.korektObj();
		this.korektObjParam();
		this.draw();
	};

	this.korektObjParam = function () {
		if (this.object != undefined && this.object.param != undefined) {
			for (var i = 0; i < this.arrComp2.length; i++) {
				if (this.object.param[this.arrComp2[i].param] != undefined) {
					if (this.arrComp2[i].value != undefined) {
						this.updateMinMax(this.arrComp2[i], this.object.param);
						this.updateValueComp(this.arrComp2[i], this.object.param);
					}
				}
			}
		}
	};

	this.updateValueComp = function (_comp, _obj) {
		if (_comp.value != _obj[_comp.param]) {
			if (self.object.arrComp[_comp.idArr2].arrValue && _comp.index !== undefined) {
				_comp.index = self.object.arrComp[_comp.idArr2].arrValue.indexOf(_obj[_comp.param]);
			} else {
				_comp.value = _obj[_comp.param];
			}
		}
	};

	this.updateMinMax = function (_comp, _obj) {
		if (_comp.min != undefined && _obj[_comp.param + 'Min'] != undefined) {
			if (_comp.min != _obj[_comp.param + 'Min']) {

				_comp.min = _obj[_comp.param + 'Min'];
			}
		}
		if (_comp.max != undefined && _obj[_comp.param + 'Max'] != undefined) {
			if (_comp.max != _obj[_comp.param + 'Max']) {

				_comp.max = _obj[_comp.param + 'Max'];
			}
		}
	};

	var b, ss;
	this.korektObj = function () {
		var i, j, ii;
		for (i = 0; i < this.arrComp.length; i++) {
			this.arrComp[i].visible = false;
		}
		this.arrComp2.length = 0;

		for (i = 0; i < this.object.arrComp.length; i++) {

			for (j = 0; j < this.arrComp.length; j++) {

				if (this.object.arrComp[i].name == this.arrComp[j].name) {
					this.arrComp[j].visible = true;


					if (this.object.arrComp[i].tipRide != undefined) {
						this.arrComp[j].tipRide = this.object.arrComp[i].tipRide;
					}

					if (this.object.arrComp[i].typeYesArray != undefined) {
						this.arrComp[j].typeYesArray = this.object.arrComp[i].typeYesArray;
					}

					if (this.object.arrComp[i].typeNotArray != undefined) {
						this.arrComp[j].typeNotArray = this.object.arrComp[i].typeNotArray;
					}

					if (this.object.arrComp[i].arrObj != undefined) {
						this.arrComp[j].clear();
						this.arrComp[j].setObj(this.object.arrComp[i].arrObj);
					}

					for (var key in this.object.arrComp[i]) {
						if (key in this.arrComp[j]) {
							this.arrComp[j][key] = this.object.arrComp[i][key];
						}
					}

					if (this.object.arrComp[i].title != undefined) {
						ss = this.getText(this.object.arrComp[i].title);
						this.arrComp[j].title = ss;
						this.arrComp[j].text = ss;

					}

					if (this.object.arrComp[i].plusText != undefined) {
						if (this.arrComp[j].plusText != undefined) {
							this.arrComp[j].plusText = this.getText(this.object.arrComp[i].plusText);
						}
					}

					if (this.object.arrComp[i].plusArrText != undefined) {
						if (this.arrComp[j].plusArrText != undefined) {
							var arr = this.arrComp[j].plusArrText;

							for (var z = 0; z < arr.length; z++) {
								arr[z] = this.getText(arr[z]);
							}

							this.arrComp[j].plusArrText = arr;
						}
					}

					if (this.object.param != undefined) {
						b = true;
						if (this.object.param[this.object.arrComp[i].param] != undefined) {

							if (self.object.arrComp[i].arrValue && this.arrComp[j].index !== undefined) {
								var ind = self.object.arrComp[i].arrValue.indexOf(this.object.param[this.object.arrComp[i].param]);
								this.arrComp[j].index = ind;
							} else {
								this.arrComp[j].value = this.object.param[this.object.arrComp[i].param];
							}
						} else {
							if (this.object.arrComp[i].param !== undefined) {
								this.arrComp[j].value = this.object.arrComp[i].param;
							}
							this.reDragObject(this.arrComp[j]);
						}
						this.arrComp[j].param = this.object.arrComp[i].param;
					} else {
						if (this.object.objSave != undefined) {
							if (this.object.objSave[this.object.arrComp[i].param] != undefined) {
								this.arrComp[j].value = this.object.objSave[this.object.arrComp[i].param];
								this.arrComp[j].param = this.object.arrComp[i].param;
							}
						}
					}


					this.arrComp[j].idArr2 = i;
					this.arrComp2.push(this.arrComp[j]);
				}
			}
		}
		this.draw();
	};


	this.compFinal;
	this.down = function () {
		self.compFinal = this;

		if (self.object.funPre != undefined) {
			self.object.funPre(this);
		}
		for (var i = 0; i < self.object.arrComp.length; i++) {
			if (self.object.arrComp[i].name == this.name) {
				var paramName = self.object.arrComp[i].param;
				var valueToSet = this.value;

				if (self.object.arrComp[i].arrValue && this.index !== undefined) {
					valueToSet = self.object.arrComp[i].arrValue[this.index];
				}
				if (paramName) {

					if (self.object.param != undefined) {
						self.object.param[paramName] = valueToSet;
						if (self.object.param.settingsBeside) {
							self.object.param.settingsBeside(paramName);
						}
					}

					if (self.object.array != undefined) {
						for (var j = 0; j < self.object.array.length; j++) {
							self.object.array[j][paramName] = valueToSet;
						}
					}

					if (self.object.objSave != undefined && self.object.objSave[paramName] !== undefined) {
						self.object.objSave[paramName] = valueToSet;
					}
				}

				if (self.object.fun != undefined) {
					self.object.fun(this);
				}

				if (self.dinFun != undefined) {
					self.dinFun();
				}
			}
		}

		if ((this.type != 'SliderObject') && (this.type != 'PLSliderBig') && (this.type != 'PLSliderBigRad') && (this.type !== 'SliderImg') && (this.type !== 'PLCheckBox')) {

			if (self.object.funComplit != undefined) {
				self.object.funComplit(this);

			}
		}

	};


	this.funComplit = function () {
		if (self.object.funComplit != undefined) {

			self.object.funComplit(this);
		}
	};

	this.funUp = function () {
		if (self.object.funUp != undefined) {

			self.object.funUp(this);
		}
	};

	this.funActMouse;
	var bb;
	this.setActMouse = function (_arr, bool) {
	};

	this.setActMouseAll = function (_bool) {
		for (var i = 0; i < this.arrComp2.length; i++) {
			this.arrComp2[i].activMouse = _bool;
		}
		for (var i = 0; i < this.arrComp.length; i++) {
			this.arrComp[i].activMouse = _bool;
		}
	};

	this.component;
	var component;
	var bwidth = true;
	this.addComponent = function (_type, _name, _param) {
		if (window[_type] === undefined) {
			console.warn('Не найден компонент при добавлении в SettingsBig => ' + _type);
			return;
		}
		component = null;
		if (_type == 'StringDrag') {
			component = new StringDrag(this.content, 0, 0, _param, this.down);
			component.width = this._width - this._otstup * 2;
		}

		if (_type == 'StringInput') {
			component = new StringInput(this.content, 0, 0, _param, this.down);
			component.width = this._width - this._otstup * 2;
		}

		if (_type == 'PLComboBox') {
			// при клике перебрасываетса в конец массива this.content.children
			component = new PLComboBox(this.content, 0, 0, [], this.down);
			component.x = this._otstup;
			component.width = this._width - this._otstup * 2;
			component.isAutoReversePanel = true;

			component.funChangeVisiblePanel = function () {
				for (var i = 0; i < self.arrComp2.length; i++) {
					if (self.arrComp2[i].idArr !== this.idArr) self.arrComp2[i].activMouse = !this.visiPanel;
				}

				if (self.funActMouse) self.funActMouse(this.visiPanel);
			};
		}

		if (_type == 'PLTextArea') {
			component = new PLTextArea(this.content, 0, 0, _param.text, this.down);
			component.height = _param.height;
			component.label.style.overflow = _param.labelStyle;
			component.label.maxLength = _param.maxLength;
			component.x = this._otstup;
			component.width = this._width - this._otstup * 2;
		}

		if (_type == 'PLCheckBox') {
			component = new PLCheckBox(this.content, 0, 0, _name, this.down);
			component.x = this._otstup;
			component.funUp = this.funComplit;
		}

		if (_type == 'PLLabel') {
			component = new PLLabel(this.content, 0, 0, _name, this.down);
			component.fontSize = 14;
			component.bold = false;
			component.x = this._otstup;
		}

		if (_type == 'PLImage') {
			component = new PLImage(this.content, 0, 0, null, function () {
				this.height = this.width / this.picWidth * this.picHeight;
				self.draw();
				if (self.funWH) self.funWH();
			});
			component.height = this._width - this._otstup * 2;
			component.width = this._width - this._otstup * 2;
			component.x = this._otstup;
			component.name = _name;
		}

		if (_type == 'PLButSwitch') {
			component = new PLButSwitch(this.content, 0, 0, this.down);
			if (_param != undefined) {
				if (_param.arr != undefined) component.setArr(_param.arr);
				if (_param.index != undefined) component.index = _param.index;
			}
			component.width = this._width; // - this._otstup * 2;
			component.x = 0; // this._otstup;
		}
		if (_type == 'PLPachkaCheckBoxImage') {
			component = new PLPachkaCheckBoxImage(this.content, 0, 0, this.down);
			if (_param != undefined) {
				if (_param.typeDown != undefined) component.typeDown = _param.typeDown;
				if (_param.arr != undefined) component.setArr(_param.arr);
				if (_param.index != undefined) component.index = _param.index;

			}
			component.width = this._width - this._otstup * 2;
			component.x = this._otstup;
			component.activContur = true;
			if (_param != undefined) {
				if (_param.width != undefined) {
					component.setWH(_param.width, _param.height);
				}
				if (_param.poved != undefined) component.poved = _param.poved;
				if (_param.isIlumActiv != undefined) component.isIlumActiv = _param.isIlumActiv;
			}
			// component.setStile(1, component.wh, component.wh);
		}

		if (_type == 'PLPachkaImgBut') {
			component = new PLPachkaImgBut(this.content, 0, 0, this.down);
			if (_param != undefined) {
				if (_param.typeDown != undefined) component.typeDown = _param.typeDown;
				if (_param.arr != undefined) component.setArr(_param.arr);
				if (_param.index != undefined) component.index = _param.index;

			}
			component.width = this._width - this._otstup * 2;
			component.x = this._otstup;
			component.activContur = true;
			if (_param != undefined) {
				if (_param.width != undefined) {
					component.setWH(_param.width, _param.height);
				}
				if (_param.otstup != undefined) {
					component.otstup = _param.otstup;
				}
			}
			// component.setStile(1, component.wh, component.wh);
		}

		if (_type == 'PLSwitchPachkaBut') {
			component = new PLSwitchPachkaBut(this.content, 0, 0, this.down);
			if (_param != undefined) {
				if (_param.arr != undefined) component.setArr(_param.arr);
				if (_param.arrButPosition != undefined) component.setButPositionArr(_param.arrButPosition);
				if (_param.height != undefined) component.height = _param.height;
			}
			component.width = this._width - this._otstup * 2;
			component.x = this._otstup;
		}

		if (_type == 'SliderImg') {
			var otst = 40;
			var min = 0;
			var max = 100;
			var okrug = 100;
			var typeValue = 'wh';
			if (_param != undefined) {
				if (_param.min != undefined) min = _param.min;
				if (_param.max != undefined) max = _param.max;
				if (_param.okrug != undefined) okrug = _param.okrug;
				if (_param.typeValue != undefined) typeValue = _param.typeValue;
			}

			component = new SliderImg(this.content, 0, 0);
			if (_param != undefined) {
				if (_param.setText != undefined) component.setText(_param.setText);
				component.name = name;
				component.fun = this.down;
				component.min = min;
				component.max = max;
				component.typeValue = typeValue;

				if (_param.link != undefined) component.link = _param.link;
			}
			component.okrug = okrug;
			component.x = this._otstup;
			component.width = (this._width - (this._otstup * 2) - otst * 2) / 2;// todo ширина задается при создании
			component.funUp = this.funComplit;
		}

		if (_type == 'PLPachkaButton') {
			component = new PLPachkaButton(this.content, 0, 0, this.down);

			for (var i = 0; i < _param.arr.length; i += 2) {
				component.addComponent(_param.arr[i], _param.arr[i + 1]);
			}
			component.width = this._width - this._otstup * 2;
			component.setStile(1, component.wh, component.wh);
		}

		if (_type == 'PLPachkaButton2') {
			component = new PLPachkaButton2(this.content, 0, 0, this.down);
			for (var i = 0; i < _param.arr.length; i++) {
				component.addComponent(_param.arr[i]);
			}
			if (_param.loadBtn != undefined) component.array[_param.loadBtn].startFile('.jpg, .png, .bmp, .jpeg');
			if (_param.notUp != undefined) component.notUp = _param.notUp;

			component.width = this._width;
			component.setStile(1, component.wh, component.wh);
		}

		if (_type == 'PLPachkaButton3') {

			component = new PLPachkaButton3(this.content, 0, 0, this.down);
			component.setArr(_param);
			component.width = this._width;
			component.height = 27;
			for (var i = 0; i < component.arrayComp.length; i++) {
				component.arrayComp[i].hImage = 0;
			}


			// component.setStile(1, component.wh, component.wh);
		}

		if (_type == 'PLButton') {
			component = new PLButton(this.content, 1, 0, '', this.down);
			component.setStile(1, 64, 64);
			if (_param != undefined) {
				if (_param.title != undefined) component.text = _param.title;
				if (_param.link != undefined) component.loadImeg(_param.link);
				if (_param.file != undefined) component.startFile('.jpg, .png, .bmp, .jpeg');
			}
			component.width = this._width - 2;
		}

		if (_type == 'PLColorUn') {
			// при клике перебрасываетса в конец массива this.content.children
			component = new PLColorUn(this.content, 0, 0, this.down);
			component.visiblePanel = false;
			component.width = this._width - this._otstup * 2;
			component.x = this._otstup;

			component.funChangeVisiblePanel = function () {
				for (var i = 0; i < self.arrComp2.length; i++) {
					if (self.arrComp2[i].idArr !== this.idArr) self.arrComp2[i].activMouse = !this.pLColorPickerPanel.visible;
				}

				if (self.funActMouse) self.funActMouse(this.pLColorPickerPanel.visible);
			};

			if (_param != undefined) {
				if (_param.title != undefined) component.text = component.title;
				if (_param.boolBig != undefined) component.boolBig = component.boolBig;
				if (_param.visiblePanel != undefined) component.visiblePanel = component.visiblePanel;
			}

			if (self.draw2) self.draw2();
		}

		if (_type == 'PLColor') {
			// при клике перебрасываетса в конец массива this.content.children
			component = new PLColor(this.content, 0, 0, this.down);

			component.width = this._width - this._otstup * 2;
			component.x = this._otstup;

			component.funChangeVisiblePanel = function () {
				for (var i = 0; i < self.arrComp2.length; i++) {
					if (self.arrComp2[i].idArr !== this.idArr) self.arrComp2[i].activMouse = !this.pLColorPickerPanel.visible;
				}

				if (self.funActMouse) self.funActMouse(this.pLColorPickerPanel.visible);
			};

			if (_param != undefined) {
				if (_param.title != undefined) component.text = _param.title;
				if (_param.boolBig != undefined) component.boolBig = _param.boolBig;
				if (_param.visiblePanel != undefined) component.visiblePanel = _param.visiblePanel;
				if (_param.tipParam != undefined) component.tipParam = _param.tipParam;
			}

			if (self.draw2) self.draw2();
		}

		if (_type == 'PLColorTHREE') {
			// при клике перебрасываетса в конец массива this.content.children
			component = new PLColorTHREE(this.content, 0, 0, this.down);
			component.width = this._width - this._otstup * 2;
			component.x = this._otstup;

			component.funChangeVisiblePanel = function () {
				for (var i = 0; i < self.arrComp2.length; i++) {
					if (self.arrComp2[i].idArr !== this.idArr) self.arrComp2[i].activMouse = !this.pLColorPickerPanel.visible;
				}

				if (self.funActMouse) self.funActMouse(this.pLColorPickerPanel.visible);
				if (self.draw2) self.draw2();
			};

			if (_param != undefined) {
				if (_param.title != undefined) component.text = component.title;
			}
		}

		if (_type == 'MTypedColor') {
			// при клике перебрасываетса в конец массива this.content.children
			var title = null;
			var typePicker = null;
			var isActivCubePicker = null;
			if (_param !== undefined) {
				if (_param.title !== undefined) {
					title = _param.title;
				}
				if (_param.typePicker !== undefined) {
					typePicker = _param.typePicker;
				}
				if (_param.isActivCubePicker !== undefined) {
					isActivCubePicker = _param.isActivCubePicker;
				}
			}
			component = new MTypedColor(this.content, 0, 0, this.down, title, typePicker);
			component.width = this._width - this._otstup * 2;
			component.x = this._otstup;
			component.funChangeVisiblePanel = function () {
				for (var i = 0; i < self.arrComp2.length; i++) {
					if (self.arrComp2[i].idArr !== this.idArr) self.arrComp2[i].activMouse = !this.mColorPickerPanel.visible;
				}
				if (self.funActMouse) self.funActMouse(this.mColorPickerPanel.visible);
				if (self.draw2) self.draw2();
			};
			if (isActivCubePicker !== null) component.colPicActiv = isActivCubePicker;
		}

		if (_type === 'PLColorPalette') {
			component = new PLColorPalette(this.content, 0, 0, this.down);
			component.width = this._width;
			component.otstup = 10;
			component.panel.visible = false;
			component.funBtnAdd = this.down;
		}

		if (_type === 'MColorPalettePicker') {
			component = new MColorPalettePicker(this.content, 0, 0, this.down);
			component.width = this._width;
			component.otstup = 10;
			component.panel.visible = false;
			component.height = 164;
		}

		if (_type == 'PLSliderBig') {
			var min = 0;
			var max = 100;
			var okrug = 100;
			if (_param != undefined) {
				if (_param.min != undefined) min = _param.min;
				if (_param.max != undefined) max = _param.max;
				if (_param.okrug != undefined) okrug = _param.okrug;

			}

			component = new PLSliderBig(this.content, 0, 0, _name, this.down, min, max);

			if (_param != undefined) {
				if (_param.setText != undefined) component.setText(_param.setText);
				if (_param.isDinamMinMax != undefined) {
					component.isDinamMinMax = _param.isDinamMinMax;
				}
			}
			component.notInp = true;
			component.okrug = okrug;
			component.x = this._otstup;
			component.colorText = this.colorText;
			component.width = this._width - this._otstup * 2;
			component.funUp = this.funComplit;
		}

		if (_type == 'PLSliderBigRad') {
			component = new PLSliderBigRad(this.content, 0, 0, _name, this.down);
			if (_param != undefined) {
				if (_param.setText != undefined) component.setText(_param.setText);
			}
			component.funUp = this.funComplit;
			component.x = this._otstup;
			component.width = this._width - this._otstup * 2;
			component.colorText = this.colorText;
		}

		if (_type == 'PLButtonFullWidth') {
			component = new PLButtonFullWidth(this.content, 0, 0, this.down);
			component.x = this._otstup;
			component.width = this._width - this._otstup * 2;
			component.height = (this._width - this._otstup * 2) / 6;
			if (_param != undefined) {
				if (_param.arr != undefined) component.setArr(_param.arr);
			}
		}

		if (_type == 'PLGADM') {
			var vnutri = 2;
			component = new PLGADM(this.content, 0, 0, 'xz', this.down);
			component.boolLeft = true;
			var stepW = 4;
			var povedSlid = 0;

			if (_param != undefined) {
				if (_param.stepW != undefined) stepW = _param.stepW;
				if (_param.povedSlid != undefined) povedSlid = _param.povedSlid;
			}

			// stepW=6;
			component.stepW = stepW;
			component.povedSlid = povedSlid;
			component.visibleIndex = true;
			component.otstup = vnutri;
			component.wh = (this._width - this._otstup * (stepW - 1)) / stepW;
			component.visiItem = 1;
			component.x = this._otstup;
		}

		if (_type == 'GalleryAdm') {
			component = new GalleryAdm(this.content, 0, 0, this.down);
			var stepW = 4;
			if (_param != undefined) {
				if (_param.stepW != undefined) stepW = _param.stepW;
			}
			component.ii = stepW;
			component.x = this._otstup;
			component.width = this._width - this._otstup * 2;
		}

		if (_type == 'SliderObject') {
			var comand = 'new SliderObject(this.content, 0, 0, "xz",this.down)';
			component = eval(comand);
			var stepW = 4;
			if (_param != undefined) {
				if (_param.stepW != undefined) stepW = _param.stepW;
			}
			component.ii = stepW;
			component.x = this._otstup;
			component.width = this._width - this._otstup * 2;
			component.funUp = this.funComplit;
			component.funComplit = this.funComplit;
		}

		if (_type === 'VisualContentLoader') {
			var component = new window['VisualContentLoader'](this.content, 0, 0, this.down);
			if (_param != undefined) {
				if (_param.getFile != undefined) component.funGetFile = _param.getFile;
				if (_param.onload != undefined) component.onload = _param.onload;
			}
			component.x = this._otstup;
			component.width = this._width - this._otstup * 2;
			component.funUp = this.funComplit;
		}

		if (_type == 'PLInputWithText') {
			component = new PLInputWithText(this.content, 0, 0, '', this.down);
			if (_param != undefined) {
				if (_param.title != undefined) component.title = language.getTextByKey(_param.title);
				if (_param.setText != undefined) component.setText(_param.setText);
				if (_param.value != undefined) component.value = _param.value;
			}
			component.x = this._otstup;
		}

		if (_type == 'ContentMenuPlus') {
			component = new ContentMenuPlus(this.content, 0, 0, '', this.down);
			if (_param != undefined) {
				if (_param.content != undefined) component.content = _param.content;
			}
			component.x = this._otstup;
		}

		if (_type == 'NumericPanel') {
			component = new NumericPanel(this.content, 0, 0, this.down);
			if (_param != undefined) {
				if (_param.content != undefined) {
					component.content = _param.content;
				}
				if (_param.data !== undefined) {
					component.data = _param.data;
				}
				if (_param.value !== undefined) {
					component.value = _param.value;
				}
			}
			component.x = this._otstup;
			component.width = this._width - this.otstup * 2;
		}

		if (_param != undefined) {
			if (component != null) {
				if (_param.funDrag != undefined)component.funDrag = _param.funDrag;
			}
		}

		this.component = component;
		// if(bwidth==true)component.width=this._width-this.otstup*2;
		this.addComponent2(_type, _name, _param);

		this.component.visible = false;
		this.component.name = _name;
		this.component.idArr = this.arrComp.length;

		this.arrComp.push(this.component);
		this.objComp[_name] = this.component;
		this.drawComponent();
		return this.component;
	};

	this.component;
	this.addComponent2 = function (_type, _name, _param) {};

	this.addObject = function (_p, _p1) {};

	this.reDragObject = function (_component) {};

	this.drawComponent = function () {};

	this.getText = function (s) {
		if (this.korectText !== null) return this.korectText(s);
		return s;
	};


	// ширина
	Object.defineProperty(this, 'otstup', {
		set: function (value) {
			if (this._otstup != value) {
				this._otstup = value;
				this.drawComponent();
			}
		},
		get: function () {
			return this._otstup;
		}
	});

	// ширина
	Object.defineProperty(this, 'width', {
		set: function (value) {
			if (this._width != value) {
				this._width = value;
				this.arrayFon.width = this._width - 2;
				this.drawComponent();
				if (this.funWH) this.funWH();
			}
		},
		get: function () {
			return this._width;
		}
	});

	// высота
	Object.defineProperty(this, 'height', {
		set: function (value) {
			if (this._height != value) {
				this._height = value;
				this.draw();
				if (this.funWH) this.funWH();
			}
		},
		get: function () {
			return this._height;
		}
	});

	// высота
	Object.defineProperty(this, 'heightMax', {
		set: function (value) {
			if (this._heightMax != value) {
				this._heightMax = value;
				this.drawComponent();
			}
		},
		get: function () {
			return this._heightMax;
		}
	});

	Object.defineProperty(this, 'value', {
		set: function (v) {
			this._value = v;

			var bb = true;

			if (v.fun != undefined)bb = false;
			if (bb == true) this.addObject(v, this.tipRide);
			else this.addObject(v.param, this.tipRide);


		},
		get: function () {
			return this._value;
		}
	});
}


export function PLGADM (cont, _x, _y, _klush, _fun, _funD, _funU) {
	PLGalleryADM.call(this, cont, _x, _y, _klush, _fun, _funD, _funU);
	this.type = 'PLGADM';
	var self = this;

	this.kont.color = 0x717171;
	this.kont.thickness = 2;
}
PLGADM.prototype = Object.create(PLGalleryADM.prototype);
PLGADM.prototype.constructor = PLGADM;

Object.defineProperties(PLGADM.prototype, {
	index: {
		set: function (v) {
			if (this._index == v) return;

			this._index = v;
			this.kont.visible = false;

			if (this.arrBtn[this._index] != undefined) {
				this.kont.x = this.arrBtn[this._index].x;
				this.kont.y = this.arrBtn[this._index].y;
				this.kont.visible = true;
			} else {
				this.contentB.y = 0;
				this.slidV.scrolValue = 0;
			}

			if (this.arrBtn[v]) {
				this.slidV.scrolValue = this.arrBtn[v].y;
				this.contentB.y = -this.slidV.scrolValue;
			}
		},
		get: function () {
			return this._index;
		}
	},

	height: {
		set: function (v) {
			if (this._height == v) return;
			this._height = v;
			for (var i = 0; i < this.arrBtn.length; i++) {
				if (this.arrBtn[i].galeri) {
					this.arrBtn[i].galeri.height = this._height;
				}
			}
			this.draw();

			if (this.arrBtn[this._index]) {
				this.slidV.scrolValue = this.arrBtn[this._index].y;
				this.contentB.y = -this.slidV.scrolValue;
			}
		},
		get: function () {
			return this._height;
		}
	}
});


export function ContentMenuPlus (cont, _x, _y, _fun) {
	PIXI.Container.call(this);
	this.type = 'ContentMenuPlus';
	cont.addChild(this);
	this.x = _x || 0;
	this.y = _y || 0;
	this.fun = _fun;
	this._content = undefined;
}
ContentMenuPlus.prototype = Object.create(PIXI.Container.prototype);
ContentMenuPlus.prototype.constructor = ContentMenuPlus;
Object.defineProperties(ContentMenuPlus.prototype, {
	content: { // ширина
		set: function (value) {
			this._content = value;
			this.addChild(this._content);

		},
		get: function () {
			return this._content;
		}
	}
});


export function StringDrag (cont, _x, _y, _title, _fun) {
	PIXI.Container.call(this);
	this.type = 'StringDrag';
	var self = this;
	cont.addChild(this);
	this.x = _x || 0;
	this.y = _y || 0;
	this.fun = _fun;

	this._width = 100;
	this._height = pl102.wh + 4;

	this._activJsonParam = false;
	this._isJSON = false;

	this.otstup = 2;
	this.wh = pl102.wh;

	var settingsBig = null;


	this.init = function () {


		this.input = new PLInput(this, this.otstup, this.otstup, 'null', function () {
			self._value = this.text;
			self.drag();
			self.fun();
		});
		this.input.width = (this._width - this.otstup * 2) / 2;
		this.input.x = this._width - this.input.width - this.otstup;

		this.input.funChange = function () {
			self._value = this.text;
		};


		this.but = new PLButton(this, this.otstup, this.otstup, ':', function () {
			self.fun();
		});
		this.but.setStile(1, this.wh * 2, this.wh);
		this.input.x = this.but.width + this.otstup * 2;

		this.butMenu = new PLButton(this, this.otstup, this.otstup, '', function () {
			self.activJsonParam = !self._activJsonParam;
		});
		this.butMenu.setStile(1, this.wh, this.wh);

		// ////
		this.paramObject = new PLParamObject(this, this.otstup, this.wh + this.otstup * 2, function () {
			self.value = JSON.stringify(this.objJSON);
			self.fun();
		});
		this.paramObject.visible = false;
		this.paramObject.w.drag = true;
		this.paramObject.width = this._width;
		this.paramObject.heightWindow = 225 - this.otstup;
		this.paramObject.funMinimize = this.funMinPO;
		this.paramObject.isScroll = true;

		// this.paramObject.funComplit = this.onDown;
		// this.paramObject.funUp = this.onUp;

		this.drag();
	};


	this.funMinPO = function () {
		self.activJsonParam = false;
	};


	// проверка на является ли текст json-ом
	this.jsonCheck = function (_text) {
		if (_text === undefined) return false;
		if (_text === 'null') return false;
		if (typeof _text !== 'string') return false;
		if (_text.indexOf('":') === -1) return false;
		if (_text.indexOf('}') === -1) return false;

		try {
			JSON.parse(_text);
		} catch (e) {
			return false;
		}
		return true;
	};


	this.drag = function () {
		this.isJSON = this.jsonCheck(this._value);

		this.paramObject.width = this._width;
		this.input.width = (this._width - this.otstup) / 2;
		this.input.x = this._width - this.input.width;
		this.butMenu.x = this._width - this.input.width - this.butMenu.width - this.otstup;

		var h = 0;

		if (this._activJsonParam && this._isJSON) {
			h = this.paramObject.y + this.paramObject.w.height + pl102.wh;
		} else {
			h = pl102.wh + this.otstup * 2;
		}

		if (this.height !== h) {
			this.height = h;
			this.dragSettingsBig();
		}
	};


	this.dragSettingsBig = function () {
		if (settingsBig === null) settingsBig = lookForSettingsBig(this.parent);
		if (settingsBig !== null) settingsBig.draw();
	};


	var lookForSettingsBig = function (_cont) {
		if (_cont === null) return null;
		if (_cont.settingsBig) return _cont.settingsBig;
		return lookForSettingsBig(_cont.parent);
	};

	this.init();
}
StringDrag.prototype = Object.create(PIXI.Container.prototype);
StringDrag.prototype.constructor = StringDrag;
Object.defineProperties(StringDrag.prototype, {
	text: {
		set: function (value) {
			if (this._value === value) return;
			this.value = value;

			if (this._value == undefined) return;

			this.but.text = value.substr(0, 4) + ' >';
			this.input.text = value;

		},
		get: function () {
			return this._value;
		}
	},
	activJsonParam: {
		set: function (value) {
			if (this._activJsonParam === value) return;
			this._activJsonParam = value;

			this.butMenu.activ = this._activJsonParam;
			this.paramObject.visible = this._activJsonParam;

			this.drag();
		},
		get: function () {
			return this._activJsonParam;
		}
	},
	isJSON: {
		set: function (value) {
			// if (this._isJSON === value) return;
			this._isJSON = value;

			if (this._isJSON === true) {
				this.objJSON = JSON.parse(this._value);
				this.paramObject.addObject(this.objJSON, true);
			}

			this.butMenu.visible = this.isJSON;
			this.paramObject.visible = this.isJSON === false ? false : this._activJsonParam;

			this.but.width = this._width - this.input.width - this.otstup * 2;
			this.but.width = this._isJSON === true ? this.but.width - this.butMenu.width - this.otstup : this.but.width;
		},
		get: function () {
			return this._isJSON;
		}
	},

	value: {
		set: function (v) {

			if (this._value === v) return;
			this._value = v;
			this.input.text = this._value;
			this.activ = false;

			this.drag();
		},
		get: function () {
			return this._value;
		}
	},
	width: { // ширина
		set: function (value) {
			if (this._width === value) return;
			this._width = value;
			this.drag();
		},
		get: function () {
			return this._width;
		}
	},
	height: { // высота
		set: function (value) {
			if (this._height === value) return;
			this._height = value;
			this.drag();
		},
		get: function () {
			return this._height;
		}
	},
	activMouse: {
		set: function (value) {
			if (this._activMouse == value) return;
			this._activMouse = value;
			this.input.activMouse = value;
			this.but.activMouse = value;

		},
		get: function () {
			return this._activMouse;
		}
	}
});


export function StringInput (cont, _x, _y, _title, _fun) {
	PIXI.Container.call(this);
	this.type = 'StringDrag';
	var self = this;
	cont.addChild(this);
	this.x = _x || 0;
	this.y = _y || 0;
	this.fun = _fun;
	this._title = _title;
	this._text = '--';
	this._width = 100;
	this._height = pl102.wh;

	this.input = new PLInput(this, 0, 0, 'null', function () {
		self._value = this.text;
		self.fun();
	});


	this.label = new PLLabel(this, 0, 5, _title, function () {
		self.fun();
	});
	this.draw = function () {
		this.input.width = (this._width) * 2 / 3;
		this.input.x = (this._width) / 3;
	};
	this.draw();
}
StringInput.prototype = Object.create(PIXI.Container.prototype);
StringInput.prototype.constructor = StringInput;
Object.defineProperties(StringInput.prototype, {
	text: { // ширина
		set: function (value) {
			if (this._text != value) {
				this._text = value;
				// this.label.text = value;
			}
		},
		get: function () {
			return this._text;
		}
	},
	title: { // ширина
		set: function (value) {
			if (this._title != value) {
				this._title = value;
				this.label.text = value;
			}
		},
		get: function () {
			return this._title;
		}
	},
	value: { // ширина
		set: function (v) {
			if (this._value != v) {
				this._value = v;
				this.input.text = this._value;
			}
		},
		get: function () {
			return this._value;
		}
	},
	width: { // ширина
		set: function (value) {
			if (this._width != value) {
				this._width = value;
				this.draw();
			}
		},
		get: function () {
			return this._width;
		}
	},
	height: { // высота
		set: function (value) {
			if (this._height != value) {
				this._height = value;
				this.draw();
			}
		},
		get: function () {
			return this._height;
		}
	},
	activMouse: {
		set: function (value) {
			if (this._activMouse == value) return;

			this._activMouse = value;
			this.input.activMouse = value;
			// this.but.activMouse = value;

		},
		get: function () {
			return this._activMouse;
		}
	}
});
