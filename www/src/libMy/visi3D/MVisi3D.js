
import MEffectArray from './MEffectArray.js';
import MPosition3d from './MPosition3d.js';
import MEvent3DArr from './MEvent3DArr.js';
import MUtility from './MUtility.js';/**/
import CubeMap from './CubeMap.js';

export function MVisi3D (_contentHTML, _content2d, _devas, _directional, _efect, _event3DArr, _alpha) {
	var self = this;

	_devas = _devas !== undefined ? _devas : false;
	_directional = _directional !== undefined ? _directional : true;
	_efect = _efect !== undefined ? _efect : true;
	_event3DArr = _event3DArr !== undefined ? _event3DArr : true;
	_alpha = _alpha !== undefined ? _alpha : false;
	this.intRend=0;
	this.devas = _devas;
	this.alpha=_alpha;

	this.arrSetiScene = [];

	this._xVerh = 0;
	this._yVerh = 0;
	this._zVerh = 0;
	this._rotationX = 0;
	this._rotationZ = 0;
	this._zume = 1000;
	this._arrOut = [];
	this._x = 0;
	this._y = 0;
	this._height = 100;
	this._width = 100;
	this.yes3d = true;
	this.intRendOk = 1;
	this._visible = true;
	this._isDragPan = false;
	this._activMouse = true;
	this._staticShadow = false;
	this._fov=45

	this.alwaysRender = false;


	this.AMBIEN_COLOR = '#ffffff';// цвет амдеба
	this.AMBIEN_INTENSITY = 0.79;// интенсивность амдеба

	this.LIGHT_COLOR = '#ffffff';
	this.LIGHT_BIAS = 0.001;
	this.SHADOW_INTENSITY = 0.22;
	this.SHADOW_RADIUS = 1;
	this.SHADOW_WH = 4096;
	this.DISTANCE = 0;
	this.CUB_HEIGHT = 500;
	this.CUB_WIDTH = 500;


	this.FOV = 45;
	this.FAR = 45000;

	this._fov=this.FOV

	this.content = undefined;
	this.graphics = undefined;


	if (_content2d != undefined) {
		this.content = eval('new PIXI.Container()');
		this.graphics = eval('new PIXI.Graphics()');
		_content2d.addChild(this.content);
		this.content.addChild(this.graphics);
		this.graphics.interactive = true;
	}

	this.camera;
	this.scene = new THREE.Scene();
	
	var color = 0xffffff//0x010101//0xe2e7ed;//
	this.color=color
	this.camera = new THREE.PerspectiveCamera(this.FOV, this._width / this._height, 1, this.FAR);
	//this.camera = new THREE.OrthographicCamera(this.FOV, this._width / this._height, 1, this.FAR);
	/*if (this.devas == true) {
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setSize(this._width, this._height);
		this.renderer.setClearColor(color, 1);
	} else {*/
		
		this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: _alpha});
		this.renderer.shadowMap.enabled = true;
		this.renderer.setSize(this._width, this._height);
		if (_alpha == true) this.renderer.setClearColor(color, 0);
		else this.renderer.setClearColor(color, 1);
	//}
	

	this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	this.efect;
		
	this.efect = new MEffectArray(this);
	


	
	_contentHTML.appendChild(this.renderer.domElement);
	this.event3DArr;
	if (_event3DArr == true) {
		
		this.event3DArr = new MEvent3DArr(this, this.camera, this.renderer.domElement);
		this.scene.event3DArr = this.event3DArr;

		this.event3DArr.addDragEvent(this.graphics, this.renderer.domElement)// _contentHTML);


		this.event3DArr.activ = this._activMouse;
	}

	this.camera.position.set(0, 0, -60);
	this.camera.rotation.set(Math.PI, 0, 0);

	
	//this.renderer.domElement.style.zIndex = -1;
	this.renderer.domElement.style.position = 'fixed';
	this.renderer.domElement.style.top = '0px';
	this.renderer.domElement.style.left = '0px';

	this.group = new THREE.Object3D();
	this.group.rotation.x = Math.PI / 2;	
	this.scene.add(this.group);
	
	this.group1 = new THREE.Object3D();
	this.group.add(this.group1);
	this.group2 = new THREE.Object3D();
	this.group1.add(this.group2);
	this.groupObject = new THREE.Object3D();
	this.group2.add(this.groupObject);

	this.group3d = new THREE.Object3D();
	this.groupObject.add(this.group3d);

	this.gCGG = new THREE.Object3D();
	this.group.add(this.gCGG);
	this.gCAngel = new THREE.Object3D();
	this.gCGG.add(this.gCAngel);
	this.gCam1 = new THREE.Object3D();
	this.gCAngel.add(this.gCam1);
	this.gCam2 = new THREE.Object3D();
	this.gCam1.add(this.gCam2);
	this.ggCam = new THREE.Object3D();
	this.gCam2.add(this.ggCam);
	this.ggCam.add(this.camera);


	this.ggCam.position.z = -this._zume;
	this.camera.position.z = 0;

	this.axesHelper = new THREE.AxesHelper(100);
	this.scene.add(this.axesHelper);
	this.axesHelper.visible = false;

	this.arrPoint = [];
	var disLig = 4000;
	var powerLig = 0.4;
	var dis = 10000;

	this.sunLight;
	this.ambientLight = new THREE.AmbientLight(this.AMBIEN_COLOR, this.AMBIEN_INTENSITY);// 0.8);
	this.scene.add(this.ambientLight);
	this.ambientLight.castShadow = false;

	if (_directional == true) {
		var sunIntensity = this.SHADOW_INTENSITY;
		this.sunLight = new THREE.DirectionalLight(this.LIGHT_COLOR, sunIntensity, 0, 0, 0.2);
		// this.sunLight.position.set(  4500, this.offsetD, -8000);
		this.sunLight.position.set(0, (this.DISTANCE + this.CUB_HEIGHT * 2), 0);
		this.sunLight.castShadow = true;
		this.sunLight.shadow.camera.near = this.CUB_HEIGHT;// 7000
		this.sunLight.shadow.camera.far = this.CUB_HEIGHT + this.CUB_HEIGHT * 2;// 20000

		this.sunLight.shadow.camera.right = this.CUB_WIDTH;
		this.sunLight.shadow.camera.left = -this.CUB_WIDTH;
		this.sunLight.shadow.camera.top	= this.CUB_WIDTH;
		this.sunLight.shadow.camera.bottom = -this.CUB_WIDTH;
		this.sunLight.shadow.mapSize.width = this.SHADOW_WH;
		this.sunLight.shadow.mapSize.height = this.SHADOW_WH;
		this.sunLight.shadow.bias = this.LIGHT_BIAS;
		this.sunLight.shadow.radius = this.SHADOW_RADIUS;
	}

	this.initOut = function () {};

	this.position3d = new MPosition3d(self, this.graphics, this.renderer.domElement);
	this.utility = new MUtility(self);

	this.arrayDoRender = [];
	this.arrayDoRender2 = [];
	this.shadowNeedsUpdate = false;

	this.render = function () {
		if (this.yes3d == false) return;

		if (this.arrayDoRender2.length != 0) {
			for (var i = 0; i < this.arrayDoRender2.length; i++) this.arrayDoRender2[i]();
		}

		
		this.utility.render();
		this.intRend = 10;
		if (this.shadowNeedsUpdate) {
			this.shadowNeedsUpdate = false;
			this.renderer.shadowMap.needsUpdate = true;
		}

		if (this.efect) {
			if (this.efect.render() == false) this.renderer.render(this.scene, this.camera);
		} else this.renderer.render(this.scene, this.camera);


		if (this.arrayDoRender.length != 0) {
			for (var i = 0; i < this.arrayDoRender.length; i++) this.arrayDoRender[i]();
		}

		

	};
	this.upDate = function () {
		if (this.alwaysRender || (this.intRend == this.intRendOk)) {
			this.render();
		}
		if (this.intRend < 10) this.intRend++;
	};

	this.renderer.render(this.scene, this.camera);

	this.sizeWindow = function (_x, _y, _width, _height) {

		if (_x != undefined) this._x = _x;
		if (_y != undefined) this._y = _y;
		if (_height != undefined) this._height = _height;
		if (_width != undefined) this._width = _width;

		if (this.content != undefined) {
			this.content.x = this._x;
			this.content.y = this._y;
			this.graphics.clear();
			this.graphics.beginFill(0xff0000, 0.0);
			this.graphics.drawRect(0, 0, this._width, this._height);
			this.graphics.endFill();
		}

		this.renderer.domElement.style.left = this._x + 'px';
		this.renderer.domElement.style.top = this._y + 'px';

		this.camera.aspect = this._width / this._height;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(this._width, this._height);
		this.intRend = 1;

		if (this.event3DArr) {
			this.event3DArr.sizeWindow(this._width, this._height);
			this.event3DArr.setRect(this._x, this._y, this._width, this._height);
		}
		if (this.efect) this.efect.sizeWindow(this._width, this._height);
	};

	this.render();
	this.sizeWindow();

	var bbbbbb;
	// Набрасываем на объекты тени
	this.objShadow = function (obj, bol) {
		if (bol == undefined) bol = true;
		bbbbbb = true;
		if (obj.material) {
			if (obj.material.transparent == true && obj.material.opacity < 1) {
				bbbbbb = false;
			}
		}
		if (bbbbbb == true) {
			obj.castShadow = bol;
			obj.receiveShadow = bol;
		}

		if (obj.children != undefined) {
			for (var i = 0; i < obj.children.length; i++) {
				if (obj.children != undefined) {
					this.objShadow(obj.children[i], bol);
				} else {
					bbbbbb = true;
					if (obj.children[i].material) {
						if (obj.material.transparent == true && obj.material.opacity < 1) {
							bbbbbb = false;
						}
					}

					if (bbbbbb == true) {
						obj.children[i].castShadow = bol;
						obj.children[i].receiveShadow = bol;
					}
				}
			}
		}
	};


	this.cubeMap=new CubeMap();
    this.cubeMap.init(this.renderer, this.scene);
    //this.cubeMap.getTexture().mapping = THREE.EquirectangularReflectionMapping;

    this.getEnvMap = function () {
        return self.cubeMap.getTexture();
    };

    this.cubeMap1=new CubeMap();
    this.cubeMap1.init(this.renderer, this.scene);
    var t=this.cubeMap1.getTexture()
    //t.mapping = THREE.EquirectangularRefractionMapping;
   // t.mapping = THREE.CubeUVReflectionMapping
    t.mapping = THREE.CubeRefractionMapping;
    
    //t.repeat.x=-1
    //t.center.x=Math.PI*1.5
    this.cubeMap1.upDate()

    this.getEnvMap1 = function () {
        return self.cubeMap1.getTexture();
    };



    this.getObj= function(){ 
        var o={}
       	o.xVerh = this._xVerh;
		o.yVerh = this._yVerh;
		o.zVerh = this._zVerh
		o.rotationX = this._rotationX;
		o.rotationZ = this._rotationZ;
		o.zume = this._zume;	
        return o
    }
 
    this.setObj= function(o){
    	
    	if(o==undefined) return
    		
        this.xVerh = o.xVerh;
		this.yVerh = o.yVerh;
		this.zVerh = o.zVerh;
		this.rotationX = o.rotationX;
		this.rotationZ = o.rotationZ;
		this.zume = o.zume;
    }

    this.mousemove=function(e){
  		self.position3d.stageMoveNew(e);
        self.event3DArr.mousemove(e);
	}
	this.getFunMouseMove=function(){
		
		if(self.devas==false){
			self.position3d.div.removeEventListener("mousemove", self.mousemove);		
		}else{
			self.position3d.div.removeEventListener("touchmove", self.mousemove);
		}
		return self.mousemove;
	}
	
	if(self.devas==false) {	
		self.position3d.div.addEventListener('mousemove', self.mousemove);		
	} else {		
		self.position3d.div.addEventListener('touchmove', self.mousemove);//, { passive: false, capture: true });					
	}


	document.oncontextmenu = function disablecontext(e) { return false;  }


	this.addEvent = function (str, fun) { if (this.event3DArr) this.event3DArr.eventSob.addEvent(str, fun); };
	this.removeEvent = function (str, fun) { if (this.event3DArr) this.event3DArr.eventSob.removeEvent(str, fun); };

	this.addChildMouse = function (child) { if (this.event3DArr) this.event3DArr.addChild(child); };
	this.removeChildMouse = function (child) { if (this.event3DArr) this.event3DArr.removeChild(child); };/**/
	this.fun_rotationX
	this.fun_rotationZ
}

MVisi3D.prototype = {

	set staticShadow (v) {
		this.renderer.shadowMap.autoUpdate = !v;
		this._staticShadow = v;
	},
	get staticShadow () {
		return this._staticShadow;
	},
	set rotationX (v) {
		if (this._rotationX === v) return;
		this._rotationX = v;
		this.intRend = 1;
		this.gCam2.rotation.x = v;		
		if(this.fun_rotationX)this.fun_rotationX()
	},
	get rotationX () {
		return this._rotationX;
	},
	set rotationZ (v) {
		if (this._rotationZ === v) return;
		this._rotationZ = v;
		this.gCam1.rotation.z = v;
		this.intRend = 1;
		if(this.fun_rotationZ)this.fun_rotationZ()
	},
	get rotationZ () {
		return this._rotationZ;
	},
	set zume (v) {
		if (this._zume === v) return;
		this._zume = v;
		this.ggCam.position.z = -v;
		this.camera.position.z = 0;
		this.intRend = 1;
		
	},
	get zume () {
		return this._zume;
	},

	set fov (v) {
		this._fov = v;
		this.camera.fov = v;
		this.camera.updateProjectionMatrix();
	},
	get fov () {
		return this._fov;
	},


	
	set yVerh (v) {
		this._yVerh = v;
		this.gCGG.position.z = v;
		this.intRend = 1;
	},
	get yVerh () {
		return this.gCGG.position.z;
	},
	set xVerh (v) {
		this._xVerh = v;
		this.gCGG.position.x = v;
		this.intRend = 1;
	},
	get xVerh () {
		return this.gCGG.position.x;
	},
	set zVerh (v) {
		this._zVerh = v;
		this.gCGG.position.y = v;
		this.intRend = 1;
	},
	get zVerh () {
		return this.gCGG.position.y;
	},
	set arrOut (v) {
		this._arrOut = v;
		if(this.alpha==true)return
		
		if(this.efect)this.efect.setValue(this._arrOut);
		
		this.intRend = 1;
	},
	get arrOut () {
		return this._arrOut;
	},
	set x (v) {
		this._x = v;
		this.sizeWindow();
	},
	get x () {
		return this._x;
	},

	set y (v) {
		this._y = v;
		this.sizeWindow();
	},
	get y () {
		return this._y;
	},

	set height (v) {
		this._height = v;
		this.sizeWindow();
	},
	get height () {
		return this._height;
	},

	set width (v) {
		this._width = v;
		this.sizeWindow();
	},
	get width () {
		return this._width;
	},
	set visible (v) {
		this._visible = v;
		this.content.visible = v;
		this.renderer.domElement.style.visibility = v ? 'visible' : 'hidden';
	},
	get visible () {
		return this._visible;
	},
	set isDragPan (v) {
		this._isDragPan = v;
		this.position3d.isDragPan = v;
	},
	get isDragPan () {
		return this._isDragPan;
	},
	set activMouse (v) {
		this._activMouse = v;
		if (this.event3DArr) this.event3DArr.activ = this._activMouse;

	},
	get activMouse () {
		return this._activMouse;
	},
	set minZum (v) {
		this.position3d.minZum = v;
	},
	get minZum () {
		return this.position3d.minZum;
	},
	set maxZum (v) {
		this.position3d.maxZum = v;
	},
	get maxZum () {
		return this.position3d.maxZum;
	},
	set maxRotationX (v) {
		this.position3d.minMaxX.x = v;
	},
	get maxRotationX () {
		return this.position3d.minMaxX.x;
	},
	set minRotationX (v) {
		if (v < this.rotationX) {
			this.rotationX = v;
		}
		this.position3d.minMaxX.y = v;
	},
	get minRotationX () {
		return this.position3d.minMaxX.y;
	}
};
