/*
	function TempTest() {
		ProtoCopyFun.call(this);// забираем функции копирования
	}

	var tempTest = new TempTest();
	var copied = tempTest.copy();
*/
/**
	Расширирель функция копирования
	* @constructor
*/
function ProtoCopyFun() {
	function deepcopy (obj) {
		if (typeof obj != "object") {
			return obj;
		}
		if (!obj) return obj;
		var copyObj = new obj.constructor();
		for (var key in obj) {
			if (typeof obj[key] == "object") {
				copyObj[key] = deepcopy(obj[key]);
			} else {
				copyObj[key] = obj[key];
			}
		}
		return copyObj;
	}

	function set(o, obj) {
		for (var key in obj) {
		
			if (typeof obj[key] == "object") {
				if (!o.hasOwnProperty(key)) {
					// o[key] = new obj[key].constructor();//todo нужно ли добавлять обекты которых нет в обекте
					continue;// 
				}

				set(o[key], obj[key]);
			} else {
				if (!o.hasOwnProperty(key)) {
					if (!Array.isArray(obj)) {
						continue;//todo нужно ли добавлять значения которых нет в обекте
					}
				}

				o[key] = obj[key];
			}
		}
	}
	
	/**
	* Получение копии обекта или установить значения из cdr
	* @param cdr - Если передан обект то будем устанавливать значения из него в себя.
	*	если не передан будет делатся копия из себя
	*/
	this.copy = function (cdr) {// глубокое копирование // обект должет быть без цыклических ссылок
		if (cdr) {
			set(this, cdr);
			return this;
		} else {
			return deepcopy(this);
		}
	}

}
