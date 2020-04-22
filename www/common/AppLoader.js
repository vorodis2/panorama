/**
 */
function AppLoader (link, link1, manifest, fun, link3, py) {
	var self = this;

	this._width = 100;
	this._height = 100;
	this.fun = fun;

	var maxProcFile = 0.7;

	this.indicator = new Indicator(link, link1, function indicatorRedy () {
		self.sizeWindow();

		self.jsLoader.loadArr(manifest/*.map(function (item) { return item.src; })*/);
	}, link3, py);

	this.jsLoader = new JSLoader(onLoadJS, onProgressJS);

	function onLoadJS () {
		if (self.fun) self.fun();
	}

	function onProgressJS () {
		
		self.indicator.procent = this.procent * maxProcFile;
	}

	this.sizeWindow = function (w, h) {
		w = w || self._width;
		h = h || self._height;
		self._width = w;
		self._height = h;
		if (self.indicator) self.indicator.sizeWindow(self._width, self._height);
	};

	this.stop = function () {
		
	}

}

function Indicator (imageName, imageName1, fun, imageName2,py) {
	var self = this;

	this.fun = fun; // сработает когда индикатор готов
	this._tipView = 2; // тип как показавать загрузку 0 - с верху в низ; 1 - слева на право; 2 - с низу в вверх; 3 - с права на лево
	this._procent = 0;
	this._visible = false;
	this.autoHide = true; // автоматически скрыть когда procent === 100%

	this._width = 100; // текущие размеры окна
	this._height = 100; // текущие размеры окна

	this.img = new Image();
	this.img.onload = onLoadImage;

	var link=imageName;
	if(link==null){
		link=imageName1;
		this.img.style.opacity=0.25
	}


	this.img.src = link;
	this.img.style.position = 'absolute';
	this.img.style.pointerEvents = 'none';

	

	this.img1 = new Image();
	this.img1.onload = onLoadImage;
	this.img1.src = imageName1;
	this.img1.style.position = 'absolute';
	this.img1.style.pointerEvents = 'none';


	if(imageName1==null){
		
		trace("11111")
	}


	this.countImgLoaded = 0;
	this.baseImg = { width: 100, height: 100 };

	this.divGlob= document.createElement('div');
	this.divGlob.style.position = 'fixed';
	this.divGlob.style.top = '0px';
	this.divGlob.style.left = '0px';



	this.divFon= document.createElement('div');
	this.divFon.style.position = 'fixed';
	this.divFon.style.top = '0px';
	this.divFon.style.left = '0px';
	this.divFon.style.width='100px';
	this.divFon.style.height='100px';
	this.divFon.style.background="#ffffff"

	this.divGlob.appendChild(this.divFon)

	this.img2=undefined
	this.div2= document.createElement('div');
	this.div2.style.position = 'fixed';
	this.div2.style.top = '0px';
	this.div2.style.left = '0px';

	this.divGlob.appendChild(this.div2)

	this.divGlob.appendChild(this.img)	
	this.divGlob.appendChild(this.img1)

	this.timerId
	var deg=0
	this.py=py||0
	if(imageName2!=undefined){
		this.img2 = new Image();
		this.img2.onload = function(){
			this.width=64;
			this.height=64;/**/
			self.img2.style.top = -this.width/2+'px';
			self.img2.style.left = -this.height/2+'px';
			self.div2.appendChild(self.img2);

		};
		this.img2.src = imageName2;
		this.img2.style.position = 'fixed';
		this.img2.style.pointerEvents = 'none';

		this.timerId = setInterval(function(){
			deg+=1
			self.div2.style.webkitTransform = 'rotate('+deg+'deg)'; 
		    self.div2.style.mozTransform    = 'rotate('+deg+'deg)'; 
		    self.div2.style.msTransform     = 'rotate('+deg+'deg)'; 
		    self.div2.style.oTransform      = 'rotate('+deg+'deg)'; 
		    self.div2.style.transform       = 'rotate('+deg+'deg)'; 
		},1);		
	}






	function onLoadImage () {
		// debugger;
		if (++self.countImgLoaded === 2) {
			delete self.countImgLoaded;
			self.visible = true;
			self.baseImg.width = self.img.width;
			self.baseImg.height = self.img.height;
			self.onUpdateImgWH = updateImgWH;
			self.sizeWindow(self._width, self._height);
			self.viewProcess();
			if (self.fun) self.fun();
		}
	}
	function updateImgWH () {
		self.img1.width = self.img.width = self.baseImg.width * (1 / window.devicePixelRatio);
		self.img1.height = self.img.height = self.baseImg.height * (1 / window.devicePixelRatio);


		self.viewProcess();
	}

	this.sizeWindow = function (_width, _height) {
		self._height = _height;
		self._width = _width;
		if (self.onUpdateImgWH) self.onUpdateImgWH();
		if(this.img2){
			self.div2.style.left = _width/2+'px';
			self.div2.style.top = _height/2+self.py+'px';
		}
		this.divFon.style.width=self._width+'px';
		this.divFon.style.height=self._height+'100px';
	};

	// отображение процесса загрузки
	this.viewProcess = function () {

		var w = self._width / 2 - self.img1.width / 2;
		var h = self._height / 2 - self.img1.height / 2;
		var imW = self.img1.width / 100 * self._procent;
		var imH = self.img1.height / 100 * self._procent;

		self.img.style.top = h + 'px';
		self.img.style.left = w + 'px';
		self.img1.style.top = h + 'px';
		self.img1.style.left = w + 'px';



		switch (self.tipView) {
			case 1:
				self.img1.style.clip = 'rect(auto, ' + imW + 'px,auto, auto)';
				break;
			case 2:
				self.img1.style.clip =
					'rect(' + (self.img.height - imH) + 'px, auto, auto,  auto)';
				break;
			case 3:
				self.img1.style.clip =
					'rect(auto,auto, auto, ' + (self.img.width - imW) + 'px)';
				break;
			default:
				self.img1.style.clip = 'rect(auto,auto, ' + imH + 'px, auto)';
		}
	};
}

Object.defineProperties(Indicator.prototype, {
	procent: {
		set: function (value) {
			this._procent = value;
			
			this.viewProcess();
			if (this.autoHide && this._procent === 100) {
				this.visible = false;
			}
		},
		get: function () {
			return this._procent;
		}
	},
	tipView: {
		set: function (value) {
			this._tipView = value;
			this.viewProcess();
		},
		get: function () {
			return this._tipView;
		}
	},
	visible: {
		set: function (value) {
			if (this._visible === value) return;
			this._visible = value;
			if (this._visible) {
				document.body.appendChild(this.divGlob);
				/*document.body.appendChild(this.img);
				document.body.appendChild(this.img1);
				document.body.appendChild(this.div2);*/
			} else {
				document.body.removeChild(this.divGlob);
				/*document.body.removeChild(this.img);
				document.body.removeChild(this.img1);
				document.body.removeChild(this.div2);*/
				if(this.timerId!=undefined){
					clearInterval(this.timerId);
				}
			}
			this.viewProcess();
		},
		get: function () {
			return this._visible;
		}
	}
});

function JSLoader (onLoad, onProgress, onError) {
	var scope = this;
	var itemsLoaded = 0;
	var itemsTotal = 0;

	this.arrResponce = [];
	this.procentObj = {};

	this.procent = 0;
	this.onLoad = onLoad;
	this.onProgress = onProgress;
	this.onError = onError;

	// масив url к js файлам
	this.loadArr = function (arrUrl) {
		this.arrUrl = arrUrl;
		for (var i = 0; i < arrUrl.length; i++) {
			scope._load(arrUrl[i]);
		}
	};

	this.itemStart = function (url) {
		itemsTotal++;
		scope.procentObj[url] = 0;
		updateProcent();
	};

	this.itemProgress = function (url, e) {
		scope.procentObj[url] = e.loaded / e.total * 100 || 0;
		updateProcent();

		if (scope.onProgress !== undefined) {
			scope.onProgress(url, itemsLoaded, itemsTotal);
		}
	};

	this.itemEnd = function (url, response) {
		itemsLoaded++;
		scope.procentObj[url] = 100;
		updateProcent();

		if (response) {
			scope.arrResponce[scope.arrUrl.indexOf(url)] = (response);
		}
		if (scope.onProgress !== undefined) {
			scope.onProgress(url, itemsLoaded, itemsTotal);
		}
		if (itemsLoaded === itemsTotal) {
			scope.complete();
		}
	};

	function updateProcent () {
		var sum = 0;
		for (var i in scope.procentObj) {
			sum += scope.procentObj[i];
		}

		sum = itemsLoaded/itemsTotal;

		
		scope.procent = sum*100;
	}

	this.itemError = function (url, event) {
		if (scope.onError !== undefined) {
			scope.onError(url);
		}
	};

	this._load = function (url) {
		
		loadUrl(url, function onLoad (event) {			
			if (this.readyState === 4 && this.status === 200) {				
				var response = event.target.response;
				scope.itemEnd(url, response);
			} else {
				scope.itemEnd(url);
				scope.itemError(url, event);
			}
		}, function onProgress (event) {
			scope.itemProgress(url, event);
		}, function onError (event) {
			scope.itemEnd(url);
			scope.itemError(url, event);
		});
		scope.itemStart(url);
	};

	


	function loadUrl (objUrl, onLoad, onProgress, onError) {
		

		if(objUrl.type==undefined){
			var request = new XMLHttpRequest();
			request.open('GET', objUrl.src, true);
			request.addEventListener('load', onLoad, false);
			request.addEventListener('progress', onProgress, false);
			request.addEventListener('error', onError, false);
			request.send(null);
		}else{

			if(objUrl.type=="FontFace"){
				
				if(window["FontFace"]!=undefined){
					var fontFace = new FontFace(objUrl.name, 'url('+objUrl.src+')');
					fontFace.load().then(function(_face) {
						document.fonts.add(_face);					
						onLoad()
		  				//document.body.style.fontFamily = '"Junction Regular", Arial';
					}).catch(function(error) {
						onError(error)
					});
				}else{
					var s=""
					s+='@font-face { font-family: "'+objUrl.name+'"; src: url('+objUrl.src+') format("truetype"); }'
					var style = document.createElement('style');
					style.type = 'text/css';
					style.innerHTML=s;
					

					window.document.body.appendChild(style)
					setTimeout(function() {
						onLoad()
					}, 500);
					
				}		

			}

		}
	}
}


JSLoader.prototype.complete = function () {
	var head = document.getElementsByTagName('head')[0];
	for (var i = 0; i < this.arrResponce.length; i++) {
		var devName = '\n' + '//@ sourceURL=' + this.arrUrl[i] + '\n' + '//# sourceURL=' + this.arrUrl[i];
		var source = this.arrResponce[i] + devName;

		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.textContent = source;
		head.appendChild(script);
	}
	if (this.onLoad !== undefined) {
		this.onLoad();
	}
};
