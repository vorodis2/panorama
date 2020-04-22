
function LocalStorage(fun,_key) {
	this.fun = fun;
	var self = this;
	this.object;
	this.key = _key||'shirt';
	this.object; // тут храняться все данные с localStorage
	var b;
	// инициализация localStorage
	this.initLoad=function() {
		b=true;
		this.object = window.localStorage[this.key];
		if(this.object == "undefined")b=false;
		if(this.object == undefined)b=false;
		
		// проверка пуст ли  localStorage
		if(b == false) {
			this.object = this.getStartObj(); // если localStorage пуст, записываем обьект с функции getStartObj
		}else {
			this.object = jQuery.parseJSON(this.object); // если localStorage не пуст записываем содержимое предварительно
		}		
		self.fun();
	}
	
	// если localStorage пуст, записываем обьект
	this.getStartObj = function() {
		var obj = {
			activ:false,
			dubag:false,
			sort:-2,
			menu:{},
			xz:{}
		};
		return obj;
	}

	// сохраняем в localStorage данные
	this.save = function() {		
		window.localStorage[this.key] = JSON.stringify(self.object);
	}

	// сохраняем в localStorage данные
	this.clear = function() {
		window.localStorage[this.key] = undefined;
	}
	setTimeout(function() {self.initLoad();}, 1);
		
}



