

import { RGBELoader } from './loader/RGBELoader.js';
export default function MSky (_parent) {
	this.parent = _parent;
	var self = this;
	this._active = false;


	this.RADIUS = 1000;

	this.POS_X = 0;
	this.POS_Y = 0;
	this.POS_Z = 0;

	this.LINK = 'null';
	this.COLOR = '0xffffff';

	this._radius = this.RADIUS;
	this._link = this.LINK;
	this._color = this.COLOR;
	this._shadRotZ = this.parent.ROTATION_Z;
	this._rotZ = 0;

	this._x = this.POS_X;
	this._y = this.POS_Y;
	this._z = this.POS_Z;

	this.mesh = undefined;

	this.cont3d = undefined;
	this.cont3d1 = undefined;
	this.textur = undefined;
	this.loaderHDR =undefined;
	this.init = function () {
		if (this.mesh != undefined) return;
		this.geometry = new THREE.SphereGeometry(1, 32, 32);
		this.loader = new THREE.TextureLoader();

		this.loaderHDR = new RGBELoader();

		this.material = new THREE.MeshBasicMaterial({
			side: THREE.BackSide,
			color: 0xffffff			
		});
		

		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.scale.set(this._radius, this._radius, this._radius);

		this.cont3d = new THREE.Object3D();
		this.cont3d1 = new THREE.Object3D();
		this.cont3d.add(this.cont3d1);
		this.cont3d1.add(this.mesh);



		this.cont3d1.rotation.y = 0//Math.PI / 2//this._shadRotZ;
		this.mesh.rotation.y = this._rotZ;



		this.cont3d.rotation.x = -Math.PI / 2;

	};

	this.dergActiv = function () {
		if (this._active == true) {
			if (this.cont3d.parent == null) this.parent.parent.groupObject.add(this.cont3d);
		} else {
			if (this.cont3d.parent != null) this.parent.parent.groupObject.remove(this.cont3d);
		}

	};

	var tt;
	this.dergLink = function () {
		if (this._link == 'null') { // сносим мапу
			if (this.material.map != null) {
				this.material.map = null;
				this.material.needsUpdate = true;
			}
		} else { // грузим новую
			tt = this.checkFormat(this._link);
			if (tt == 0) { // щбычная
				this.loader.load(this._link, function (textur) {
					self.textur = textur;
					self.material.map =	textur;
					self.material.needsUpdate = true;
					self.parent.parent.intRend = 1;
				});
			}
			if (tt == 1) { // hdr
				console.log("Подключи в загрущик RGBELoader токо если надо hdr загрузить!!!");
				return 
				this.loaderHDR.load(this._link, function (textur) {
					self.textur = textur;

					self.textur.encoding = THREE.RGBEEncoding;
					self.textur.minFilter = THREE.NearestFilter;
					self.textur.magFilter = THREE.NearestFilter;
					self.textur.flipY = true;
					self.material.map =	textur;
					self.material.needsUpdate = true;
					self.parent.parent.intRend = 1;
				});
			}
		}
	};

	this.checkFormat = function (link) {
		if (link.indexOf('.png') !== -1) return 0;
		if (link.indexOf('.jpeg') !== -1) return 0;
		if (link.indexOf('.jpg') !== -1) return 0;

		if (link.length > 150) { // это бейс 64 хз какой но не хдр наверно)))
			if (link.indexOf('png') !== -1) return 0;
			if (link.indexOf('jpeg') !== -1) return 0;
			if (link.indexOf('jpg') !== -1) return 0;
			return 1;
		}
		return 1;
	};


	this.render = function () {
		/* if(this.mesh==undefined)return
		if(this._active == false)return

		if(this._rotationZ!=this.parent.parent.rotationZ){
			this._rotationZ=this.parent.parent.rotationZ
			//this.cont3d1.rotation.y=this._rotationZ
		} */

	};


}
MSky.prototype = {
	set x (v) {
		if (this._x === v) return;
		this._x = v;
		this.cont3d.position.x = v;
		this.parent.parent.intRend = 1;
	},
	get x () {
		return this._x;
	},

	set y (v) {
		if (this._y === v) return;
		this._y = v;
		this.cont3d.position.y = v;
		this.parent.parent.intRend = 1;
	},
	get y () {
		return this._y;
	},

	set z (v) {
		if (this._z === v) return;
		this._z = v;
		this.cont3d.position.z = v;
		this.parent.parent.intRend = 1;
	},
	get z () {
		return this._z;
	},

	set active (v) {
		if (this._active === v) return;
		this._active = v;
		this.init();
		this.dergActiv();
	},
	get active () {
		return this._active;
	},

	set radius (v) {
		if (this._radius === v) return;
		this._radius = v;
		if (this.mesh != undefined) {
			this.mesh.scale.set(this._radius, this._radius, this._radius);
		}

	},
	get radius () {
		return this._radius;
	},

	set link (v) {
		if (this._link === v) return;
		this._link = v;
		this.init();
		this.dergLink();
		/* if(this._link=="null"){
			this.material
		} */

	},
	get link () {
		return this._link;
	},

	/*set shadRotZ (v) {
		if (this._shadRotZ === v) return;
		this._shadRotZ = v;
		if (this.mesh != undefined) {
			this.cont3d1.rotation.y = this._shadRotZ;
		}

	},
	get shadRotZ () {
		return this._shadRotZ;
	},

	set rotZ (v) {
		if (this._rotZ === v) return;
		this._rotZ = v;
		if (this.mesh != undefined) {
			this.mesh.rotation.y = this._rotZ;
		}

	},
	get rotZ () {
		return this._rotZ;
	},*/

	set color (v) {
		if (this._color === v) return;
		this._color = v;
		this.init();
		var c = this._color;
		if (typeof c === 'string') {
			if (c.indexOf('x') != -1) {
				var a = c.split('x');
				c = '#' + a[1];
			}
		}
		this.material.color = new THREE.Color(c);

	},
	get color () {
		return this._color;
	}
};
