
export default function MEffectArray (_visi3D, _startArray) {
	var self = this;

	this.visi3D = _visi3D;
	this._startArray = [];// _startArray;//
	
	this._width = _visi3D._width;
	this._height = _visi3D._height;

	this.scene = this.visi3D.scene;
	this.camera = this.visi3D.camera;
	this.renderer = this.visi3D.renderer;

	this.composer = new THREE.EffectComposer(this.renderer);

	this.RENDER_PASS = false;

	this.OUTLINE_PASS = false;
	this.OUTLINE_COLOR = '#0000ff';
	this.OUTLINE_COLOR1 = '#ff0000';
	this.STRJSON = '{"edgeGlow":0,"usePatternTexture":false,"edgeThickness":1,"edgeStrength":3,"downSampleRatio":2,"pulsePeriod":0}';
	this.SAOJSON = '{"saoBlur":true,"output":0,"saoBias":0,"saoBlurDepthCutoff":0,"saoBlurRadius":8,"saoBlurStdDev":4,"saoIntensity":0.18,"saoKernelRadius":100,"saoMinResolution":0,"saoScale":11.58}';

	this.TAA_PASS = false;
	this.SAMPLE_LEVEL = 0;

	this.STEREO_PASS = false;

	this.SHADER_PASS = false;
	this.SAO_PASS = false;
	this.SSAO_PASS = false;


	this._renderPass = this.RENDER_PASS;
	this._outlinePass = this.OUTLINE_PASS;
	this._outlineColor = this.OUTLINE_COLOR;
	this._outlineColor1 = this.OUTLINE_COLOR1;
	this._strJSON = this.STRJSON;

	this._taaPass = this.TAA_PASS;
	this._sampleLevel = this.SAMPLE_LEVEL;


	this._stereoPass = this.STEREO_PASS;


	this._shaderPass = this.SHADER_PASS;
	this._saoPass = this.SAO_PASS;
	this._saoJSON = this.SAOJSON;

	this.jsonCheck = function (_text) {
	  	if (_text == undefined) return false;
	  	if (typeof _text !== 'string') return false;
		if (_text.indexOf('":') == -1) return false;
		if (_text.indexOf('}') == -1) return false;
	  	if (_text === 'null') return false;

	  	try {
	   		JSON.parse(_text);
	  	} catch (e) {
	   		return false;
	 	}
	  	return true;
	};


	this.setObjInObj = function (_o, _str) {
		if (this.jsonCheck(_str) == false) return;
		var _o1 = JSON.parse(_str);
		var t;

		for (var s1 in _o1) {
			for (var s in _o) {
				if (s == s1) {
					t = typeof _o1[s];
					if (t == 'object') {
						this.setObjInObj(_o[s], _o1[s]);
					} else {
						_o[s] = _o1[s];
					}
				}
			}
		}
	};

	this.array = [];
	this.object = {};

	this.init = function () {

		if (this.array.length != 0) return;

		var sah = 0;
		// RenderPass Нх нужно не знаю но нужно, наверно проверить FIXE  js/postprocessing/TAARenderPass.js
		this.array[sah] = new EffectScene(new THREE.RenderPass(this.scene, this.camera));
		this.array[sah].type = 'RenderPass';
		// this.composer.addPass(this.array[sah].effect);
		sah++;


		this.array[sah] = new EffectScene(new THREE.OutlinePass(new THREE.Vector2(this._width, this._height), this.scene, this.camera));
		this.array[sah].type = 'OutlinePass';

		this.array[sah].effect.visibleEdgeColor = new THREE.Color(this._outlineColor);
		this.array[sah].effect.hiddenEdgeColor = new THREE.Color(this._outlineColor1);

		sah++;

		this.array[sah] = new EffectScene(new THREE.TAARenderPass(this.scene, this.camera));
		this.array[sah].type = 'TAARenderPass';

		/* sah++;

		// Сглаживание
		this.array[sah] = new EffectScene(new THREE.StereoEffect(THREE.FXAAShader));
		this.array[sah].type = 'StereoEffect';


		*/


		sah++;

		// Сглаживание
		this.array[sah] = new EffectScene(new THREE.ShaderPass(THREE.FXAAShader));
		this.array[sah].type = 'ShaderPass';



		// this.composer.addPass(this.array[sah].effect);


		this.array[sah].effect.uniforms['resolution'].value.set(1 / this._width, 1 / this._height);
		this.array[sah].sizeWindow = function (_w, _h) {
			this.effect.uniforms['resolution'].value.set(1 / _w, 1 / _h);
		};


		sah++;
		// this.array[sah].effect.renderToScreen = false/*this._bSao ? false : true*/;
		// composer.addPass(effectFXAA);

		// SAO  тенюхи на кружочках
		var prevFar = this.camera.far;
		var prevNear = this.camera.near;
		this.camera.far = 10;
		this.camera.near = 3;
		this.array[sah] = new EffectScene(new THREE.SAOPass(this.scene, this.camera, true, true));
		// this.array[sah].effect.renderToScreen = true;
		this.array[sah].type = 'SAOPass';
		this.camera.far = prevFar;
		this.camera.near = prevNear;

		// var s = '{"saoBlur":true,"output":0,"saoBias":0,"saoBlurDepthCutoff":0,"saoBlurRadius":8,"saoBlurStdDev":4,"saoIntensity":0.18,"saoKernelRadius":100,"saoMinResolution":0,"saoScale":11.58}';


		sah++;/**/

		/* var prevFar = this.camera.far;
		var prevNear = this.camera.near;
		this.camera.far = 10;
		this.camera.near = 3;
		this.array[sah] = new EffectScene(new THREE.SAOPass(this.scene, this.camera, true, true));
		// this.array[sah].effect.renderToScreen = true;
		this.array[sah].type = 'SSAOPass';
		this.camera.far = prevFar;
		this.camera.near = prevNear;


		sah++; */


		for (var i = 0; i < this.array.length; i++) {
			this.object[this.array[i].type] = this.array[i];
		}
		var rr;


		// this.dragOutline()
		this.setObjInObj(this.object['SAOPass'].effect.params, this._saoJSON);
		this.setObjInObj(this.object['OutlinePass'].effect, this._strJSON);
		this.sizeWindow(this._width, this._height);

		this.startArray =  _startArray;//
	};


	var a=[]
	var p = -1;
	this.setValue = function (_key, _key1, _param) {
		if (_key == 'outline') {
						
			if (this.object['OutlinePass'].activ == true) {
				if(Array.isArray(_param)==true){
					this.object['OutlinePass'].effect.selectedObjects = _param;
					return;
				}
				if(_param==null&&_param==undefined){
					this.object['OutlinePass'].effect.selectedObjects = a;
					return;
				}



				this.object['OutlinePass'].effect.selectedObjects = [_param];
			}
		}
	};

	this.drawRender = function () {
		this.clear();
		if (this._renderPass == true) {
			this.object['RenderPass'].activ = true;
			this.clear(true);
			this.object['RenderPass'].effect.renderToScreen = true;
			this.composer.addPass(this.object['RenderPass'].effect);
		}
		if (this._outlinePass == true) {
			this.object['OutlinePass'].activ = true;
			// this.clear(true)
			// this.object['OutlinePass'].effect.renderToScreen = true;

			this.composer.addPass(this.object['OutlinePass'].effect);
			
		}


		if (this._taaPass == true) {
			this.object['TAARenderPass'].activ = true;
			this.clear(true);
			this.object['TAARenderPass'].effect.renderToScreen = true;
			this.composer.addPass(this.object['TAARenderPass'].effect);
		}


		if (this._shaderPass == true) {
			this.object['ShaderPass'].activ = true;
			this.clear(true);
			this.object['ShaderPass'].effect.renderToScreen = true;
			this.composer.addPass(this.object['ShaderPass'].effect);
		}

		if (this._saoPass == true) {
			this.object['SAOPass'].activ = true;
			this.clear(true);
			this.object['SAOPass'].effect.renderToScreen = true;
			this.composer.addPass(this.object['SAOPass'].effect);
		}

		if (this._ssaoPass == true) {
			this.object['SSAOPass'].activ = true;
			this.clear(true);
			this.object['SSAOPass'].effect.renderToScreen = true;
			this.composer.addPass(this.object['SSAOPass'].effect);
		}


	};


	this.redrag = function () {

		var a = [];
		for (var i = 1; i < self.array.length; i++) {
			if (self.array[i].activ == true) {
				a.push(self.array[i].type);
			}
		}
		this.startArray = a;

	};


	this.setArrayMash = function (_tip, _array) {
		// if (this.array.length == 0) return;
		/* if (_tip == 'OutlinePass') {
			this.object[_tip].effect.selectedObjects = _array;
		} */
	};

	var b = true;
	this.render = function () {
		b = false;
		
		if (this.array.length == 0) return false ;

		trace(this.array)
		for (var i = 0; i < this.array.length; i++) {
			if (this.array[i]._activ != false) {
				
				this.array[i].render();

				b = true;
			}
		}

		if (b == true) this.composer.render();

		return b;


	};

	this.sizeWindow = function (_width, _height) {
		this._width = _width;
		this._height = _height;
		if (this.array.length == 0) return;
		this.composer.setSize(this._width, this._height);
		for (var i = 0; i < this.array.length; i++) {
			if (this.array[i].sizeWindow) this.array[i].sizeWindow(_width, _height);
		}
	};
	this.clear = function (b) {
		if (b == undefined) this.composer.passes.length = 0;
		for (var i = 0; i < this.array.length; i++) {
			if (b == undefined) this.array[i].activ = false;
			this.array[i].effect.renderToScreen = false;
			this.array[i].effect.unbiased = false;
		}
	};




}

MEffectArray.prototype = {
	set activ (v) {
		if (this._activ != v) {
			this._activ = v;
		}
	},
	get activ () {
		return this._activ;
	},
	set startArray (v) {
		this._startArray = v;
	},
	get startArray () {
		return this._startArray;
	},


	set renderPass (v) {
		if (this._renderPass != v) {
			this._renderPass = v;

			this.drawRender();
		}
	},
	get renderPass () {
		return this._renderPass;
	},


	set outlinePass (v) {
		if (this._outlinePass != v) {
			this._outlinePass = v;
			this.drawRender();
		}
	},
	get outlinePass () {
		return this._outlinePass;
	},


	set outlineColor (v) {
		if (this._outlineColor != v) {
			this._outlineColor = v;
			this.object['OutlinePass'].effect.visibleEdgeColor = new THREE.Color(this._outlineColor);
	

		}
	},
	get outlineColor () {
		return this._outlineColor;
	},

	set outlineColor1 (v) {
		if (this._outlineColor1 != v) {
			this._outlineColor1 = v;
			this.object['OutlinePass'].effect.hiddenEdgeColor = new THREE.Color(this._outlineColor1);
		}
	},
	get outlineColor1 () {
		return this._outlineColor1;
	},


	set strJSON (v) {
		if (this._strJSON != v) {
			this._strJSON = v;
			this.setObjInObj(this.object['OutlinePass'].effect, this._strJSON);
			// this.dragOutline();
		}
	},
	get strJSON () {
		return this._strJSON;
	},


	set taaPass (v) {
		if (this._taaPass != v) {
			this._taaPass = v;
			this.drawRender();
		}
	},
	get taaPass () {
		return this._taaPass;
	},

	set sampleLevel (v) {
		if (this._sampleLevel != v) {
			this._sampleLevel = v;
			this.object['TAARenderPass'].effect.sampleLevel = this._sampleLevel;
		}
	},
	get sampleLevel () {
		return this._sampleLevel;
	},


	set shaderPass (v) {
		if (this._shaderPass != v) {
			this._shaderPass = v;
			this.drawRender();
		}
	},
	get shaderPass () {
		return this._shaderPass;
	},


	set saoPass (v) {
		if (this._saoPass != v) {
			this._saoPass = v;
			this.drawRender();
		}
	},
	get saoPass () {
		return this._saoPass;
	},


	set saoJSON (v) {
		if (this._saoJSON != v) {
			this._saoJSON = v;
			this.setObjInObj(this.object['SAOPass'].effect.params, this._saoJSON);
			// this.dragOutline();
		}
	},
	get saoJSON () {
		return this._saoJSON;
	}
};


function EffectScene (_effect) {
	var self = this;
	this.type = 'null';
	this.effect = _effect;

	this._activ = false;
	this.render = function () {

	};
}

EffectScene.prototype = {
	set activ (v) {
		if (this._activ != v) {
			this._activ = v;
		}
	},
	get activ () {
		return this._activ;
	}


};


/**
 * @author alteredq / http://alteredqualia.com/
 * @authod mrdoob / http://mrdoob.com/
 * @authod arodic / http://aleksandarrodic.com/
 * @authod fonserbc / http://fonserbc.github.io/
*/

THREE.StereoEffect = function (renderer) {

	var _stereo = new THREE.StereoCamera();
	_stereo.aspect = 0.5;

	this.setSize = function (width, height) {

		renderer.setSize(width, height);

	};

	this.render = function (scene, camera) {

		scene.updateMatrixWorld();

		if (camera.parent === null) camera.updateMatrixWorld();

		_stereo.update(camera);

		var size = renderer.getSize();

		renderer.setScissorTest(true);
		renderer.clear();

		renderer.setScissor(0, 0, size.width / 2, size.height);
		renderer.setViewport(0, 0, size.width / 2, size.height);
		renderer.render(scene, _stereo.cameraL);

		renderer.setScissor(size.width / 2, 0, size.width / 2, size.height);
		renderer.setViewport(size.width / 2, 0, size.width / 2, size.height);
		renderer.render(scene, _stereo.cameraR);

		renderer.setScissorTest(false);

	};

};
/**
 * Created by tpowellmeto on 29/10/2015.
 *
 * peppers ghost effect based on http://www.instructables.com/id/Reflective-Prism/?ALLSTEPS
 */
THREE.PeppersGhostEffect = function (renderer) {

	var scope = this;

	scope.cameraDistance = 15;
	scope.reflectFromAbove = false;

	// Internals
	var _halfWidth, _width, _height;

	var _cameraF = new THREE.PerspectiveCamera(); // front
	var _cameraB = new THREE.PerspectiveCamera(); // back
	var _cameraL = new THREE.PerspectiveCamera(); // left
	var _cameraR = new THREE.PerspectiveCamera(); // right

	var _position = new THREE.Vector3();
	var _quaternion = new THREE.Quaternion();
	var _scale = new THREE.Vector3();

	// Initialization
	renderer.autoClear = false;

	this.setSize = function (width, height) {

		_halfWidth = width / 2;
		if (width < height) {

			_width = width / 3;
			_height = width / 3;

		} else {

			_width = height / 3;
			_height = height / 3;

		}
		renderer.setSize(width, height);

	};

	this.render = function (scene, camera) {

		scene.updateMatrixWorld();

		if (camera.parent === null) camera.updateMatrixWorld();

		camera.matrixWorld.decompose(_position, _quaternion, _scale);

		// front
		_cameraF.position.copy(_position);
		_cameraF.quaternion.copy(_quaternion);
		_cameraF.translateZ(scope.cameraDistance);
		_cameraF.lookAt(scene.position);

		// back
		_cameraB.position.copy(_position);
		_cameraB.quaternion.copy(_quaternion);
		_cameraB.translateZ(-(scope.cameraDistance));
		_cameraB.lookAt(scene.position);
		_cameraB.rotation.z += 180 * (Math.PI / 180);

		// left
		_cameraL.position.copy(_position);
		_cameraL.quaternion.copy(_quaternion);
		_cameraL.translateX(-(scope.cameraDistance));
		_cameraL.lookAt(scene.position);
		_cameraL.rotation.x += 90 * (Math.PI / 180);

		// right
		_cameraR.position.copy(_position);
		_cameraR.quaternion.copy(_quaternion);
		_cameraR.translateX(scope.cameraDistance);
		_cameraR.lookAt(scene.position);
		_cameraR.rotation.x += 90 * (Math.PI / 180);


		renderer.clear();
		renderer.setScissorTest(true);

		renderer.setScissor(_halfWidth - (_width / 2), (_height * 2), _width, _height);
		renderer.setViewport(_halfWidth - (_width / 2), (_height * 2), _width, _height);

		if (scope.reflectFromAbove) {

			renderer.render(scene, _cameraB);

		} else {

			renderer.render(scene, _cameraF);

		}

		renderer.setScissor(_halfWidth - (_width / 2), 0, _width, _height);
		renderer.setViewport(_halfWidth - (_width / 2), 0, _width, _height);

		if (scope.reflectFromAbove) {

			renderer.render(scene, _cameraF);

		} else {

			renderer.render(scene, _cameraB);

		}

		renderer.setScissor(_halfWidth - (_width / 2) - _width, _height, _width, _height);
		renderer.setViewport(_halfWidth - (_width / 2) - _width, _height, _width, _height);

		if (scope.reflectFromAbove) {

			renderer.render(scene, _cameraR);

		} else {

			renderer.render(scene, _cameraL);

		}

		renderer.setScissor(_halfWidth + (_width / 2), _height, _width, _height);
		renderer.setViewport(_halfWidth + (_width / 2), _height, _width, _height);

		if (scope.reflectFromAbove) {

			renderer.render(scene, _cameraL);

		} else {

			renderer.render(scene, _cameraR);

		}

		renderer.setScissorTest(false);

	};


};
/**
 * @author mrdoob / http://mrdoob.com/
 * @author marklundin / http://mark-lundin.com/
 * @author alteredq / http://alteredqualia.com/
 */
THREE.ParallaxBarrierEffect = function (renderer) {

	var _camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

	var _scene = new THREE.Scene();

	var _stereo = new THREE.StereoCamera();

	var _params = { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBAFormat };

	var _renderTargetL = new THREE.WebGLRenderTarget(512, 512, _params);
	var _renderTargetR = new THREE.WebGLRenderTarget(512, 512, _params);

	var _material = new THREE.ShaderMaterial({

		uniforms: {

			'mapLeft': { type: 't', value: _renderTargetL.texture },
			'mapRight': { type: 't', value: _renderTargetR.texture }

		},

		vertexShader: [

			'varying vec2 vUv;',

			'void main() {',

			'	vUv = vec2( uv.x, uv.y );',
			'	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',

			'}'

		].join('\n'),

		fragmentShader: [

			'uniform sampler2D mapLeft;',
			'uniform sampler2D mapRight;',
			'varying vec2 vUv;',

			'void main() {',

			'	vec2 uv = vUv;',

			'	if ( ( mod( gl_FragCoord.y, 2.0 ) ) > 1.00 ) {',

			'		gl_FragColor = texture2D( mapLeft, uv );',

			'	} else {',

			'		gl_FragColor = texture2D( mapRight, uv );',

			'	}',

			'}'

		].join('\n')

	});

	var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), _material);
	_scene.add(mesh);

	this.setSize = function (width, height) {

		renderer.setSize(width, height);

		var pixelRatio = renderer.getPixelRatio();

		_renderTargetL.setSize(width * pixelRatio, height * pixelRatio);
		_renderTargetR.setSize(width * pixelRatio, height * pixelRatio);

	};

	this.render = function (scene, camera) {

		scene.updateMatrixWorld();

		if (camera.parent === null) camera.updateMatrixWorld();

		_stereo.update(camera);

		trace("!!!")
		renderer.render(scene, _stereo.cameraL, _renderTargetL, true);
		renderer.render(scene, _stereo.cameraR, _renderTargetR, true);
		renderer.render(_scene, _camera);

	};

};
/**
 * @author mrdoob / http://mrdoob.com/
 * @author marklundin / http://mark-lundin.com/
 * @author alteredq / http://alteredqualia.com/
 * @author tschw
 */
THREE.AnaglyphEffect = function (renderer, width, height) {

	// Matrices generated with angler.js https://github.com/tschw/angler.js/
	// (in column-major element order, as accepted by WebGL)

	this.colorMatrixLeft = new THREE.Matrix3().fromArray([

		1.0671679973602295, 	-0.0016435992438346148,		 0.0001777536963345483, // r out
		-0.028107794001698494,	-0.00019593400065787137,	-0.0002875397040043026, // g out
		-0.04279090091586113,	 0.000015809757314855233,	-0.00024287120322696865 // b out

	]);

	//		red						green 						blue  						in

	this.colorMatrixRight = new THREE.Matrix3().fromArray([

		-0.0355340838432312,	-0.06440307199954987,		 0.018319187685847282,	// r out
		-0.10269022732973099,	 0.8079727292060852,		-0.04835830628871918,	// g out
		0.0001224992738571018,	-0.009558862075209618,		 0.567823588848114		// b out

	]);

	var _camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

	var _scene = new THREE.Scene();

	var _stereo = new THREE.StereoCamera();

	var _params = { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBAFormat };

	if (width === undefined) width = 512;
	if (height === undefined) height = 512;

	var _renderTargetL = new THREE.WebGLRenderTarget(width, height, _params);
	var _renderTargetR = new THREE.WebGLRenderTarget(width, height, _params);

	var _material = new THREE.ShaderMaterial({

		uniforms: {

			'mapLeft': { type: 't', value: _renderTargetL.texture },
			'mapRight': { type: 't', value: _renderTargetR.texture },

			'colorMatrixLeft': { type: 'm3', value: this.colorMatrixLeft },
			'colorMatrixRight': { type: 'm3', value: this.colorMatrixRight }

		},

		vertexShader: [

			'varying vec2 vUv;',

			'void main() {',

			'	vUv = vec2( uv.x, uv.y );',
			'	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',

			'}'

		].join('\n'),

		fragmentShader: [

			'uniform sampler2D mapLeft;',
			'uniform sampler2D mapRight;',
			'varying vec2 vUv;',

			'uniform mat3 colorMatrixLeft;',
			'uniform mat3 colorMatrixRight;',

			// These functions implement sRGB linearization and gamma correction

			'float lin( float c ) {',
			'	return c <= 0.04045 ? c * 0.0773993808 :',
			'			pow( c * 0.9478672986 + 0.0521327014, 2.4 );',
			'}',

			'vec4 lin( vec4 c ) {',
			'	return vec4( lin( c.r ), lin( c.g ), lin( c.b ), c.a );',
			'}',

			'float dev( float c ) {',
			'	return c <= 0.0031308 ? c * 12.92',
			'			: pow( c, 0.41666 ) * 1.055 - 0.055;',
			'}',


			'void main() {',

			'	vec2 uv = vUv;',

			'	vec4 colorL = lin( texture2D( mapLeft, uv ) );',
			'	vec4 colorR = lin( texture2D( mapRight, uv ) );',

			'	vec3 color = clamp(',
			'			colorMatrixLeft * colorL.rgb +',
			'			colorMatrixRight * colorR.rgb, 0., 1. );',

			'	gl_FragColor = vec4(',
			'			dev( color.r ), dev( color.g ), dev( color.b ),',
			'			max( colorL.a, colorR.a ) );',

			'}'

		].join('\n')

	});

	var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), _material);
	_scene.add(mesh);

	this.setSize = function (width, height) {

		renderer.setSize(width, height);

		var pixelRatio = renderer.getPixelRatio();

		_renderTargetL.setSize(width * pixelRatio, height * pixelRatio);
		_renderTargetR.setSize(width * pixelRatio, height * pixelRatio);

	};

	this.render = function (scene, camera) {

		scene.updateMatrixWorld();

		if (camera.parent === null) camera.updateMatrixWorld();

		/*_stereo.update(camera);

		renderer.render(scene, _stereo.cameraL, _renderTargetL, true);
		renderer.render(scene, _stereo.cameraR, _renderTargetR, true);*/
		renderer.render(_scene, _camera);

	};

	this.dispose = function () {

		if (_renderTargetL) _renderTargetL.dispose();
		if (_renderTargetR) _renderTargetR.dispose();

	};

};


/*
 * @author zz85 / https://github.com/zz85
 *
 * Ascii generation is based on http://www.nihilogic.dk/labs/jsascii/
 * Maybe more about this later with a blog post at http://lab4games.net/zz85/blog
 *
 * 16 April 2012 - @blurspline
 */

THREE.AsciiEffect = function (renderer, charSet, options) {

	// its fun to create one your own!

	charSet = (charSet === undefined) ? ' .:-=+*#%@' : charSet;

	// ' .,:;=|iI+hHOE#`$';
	// darker bolder character set from https://github.com/saw/Canvas-ASCII-Art/
	// ' .\'`^",:;Il!i~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$'.split('');

	if (!options) options = {};

	// Some ASCII settings

	var bResolution = !options[ 'resolution' ] ? 0.15 : options[ 'resolution' ]; // Higher for more details
	var iScale = !options[ 'scale' ] ? 1 : options[ 'scale' ];
	var bColor = !options[ 'color' ] ? false : options[ 'color' ]; // nice but slows down rendering!
	var bAlpha = !options[ 'alpha' ] ? false : options[ 'alpha' ]; // Transparency
	var bBlock = !options[ 'block' ] ? false : options[ 'block' ]; // blocked characters. like good O dos
	var bInvert = !options[ 'invert' ] ? false : options[ 'invert' ]; // black is white, white is black

	var strResolution = 'low';

	var width, height;

	var domElement = document.createElement('div');
	domElement.style.cursor = 'default';

	var oAscii = document.createElement('table');
	domElement.appendChild(oAscii);

	var iWidth, iHeight;
	var oImg;

	this.setSize = function (w, h) {

		width = w;
		height = h;

		renderer.setSize(w, h);

		initAsciiSize();

	};


	this.render = function (scene, camera) {

		renderer.render(scene, camera);
		asciifyImage(renderer, oAscii);

	};

	this.domElement = domElement;


	// Throw in ascii library from http://www.nihilogic.dk/labs/jsascii/jsascii.js

	/*
	* jsAscii 0.1
	* Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
	* MIT License [http://www.nihilogic.dk/licenses/mit-license.txt]
	*/

	function initAsciiSize () {

		iWidth = Math.round(width * fResolution);
		iHeight = Math.round(height * fResolution);

		oCanvas.width = iWidth;
		oCanvas.height = iHeight;
		// oCanvas.style.display = "none";
		// oCanvas.style.width = iWidth;
		// oCanvas.style.height = iHeight;

		oImg = renderer.domElement;

		if (oImg.style.backgroundColor) {

			oAscii.rows[ 0 ].cells[ 0 ].style.backgroundColor = oImg.style.backgroundColor;
			oAscii.rows[ 0 ].cells[ 0 ].style.color = oImg.style.color;

		}

		oAscii.cellSpacing = 0;
		oAscii.cellPadding = 0;

		var oStyle = oAscii.style;
		oStyle.display = 'inline';
		oStyle.width = Math.round(iWidth / fResolution * iScale) + 'px';
		oStyle.height = Math.round(iHeight / fResolution * iScale) + 'px';
		oStyle.whiteSpace = 'pre';
		oStyle.margin = '0px';
		oStyle.padding = '0px';
		oStyle.letterSpacing = fLetterSpacing + 'px';
		oStyle.fontFamily = strFont;
		oStyle.fontSize = fFontSize + 'px';
		oStyle.lineHeight = fLineHeight + 'px';
		oStyle.textAlign = 'left';
		oStyle.textDecoration = 'none';

	}


	var aDefaultCharList = (' .,:;i1tfLCG08@').split('');
	var aDefaultColorCharList = (' CGO08@').split('');
	var strFont = 'courier new, monospace';

	var oCanvasImg = renderer.domElement;

	var oCanvas = document.createElement('canvas');
	if (!oCanvas.getContext) {

		return;

	}

	var oCtx = oCanvas.getContext('2d');
	if (!oCtx.getImageData) {

		return;

	}

	var aCharList = (bColor ? aDefaultColorCharList : aDefaultCharList);

	if (charSet) aCharList = charSet;

	var fResolution = 0.5;

	switch (strResolution) {

		case 'low' : 	fResolution = 0.25; break;
		case 'medium' : fResolution = 0.5; break;
		case 'high' : 	fResolution = 1; break;

	}

	if (bResolution) fResolution = bResolution;

	// Setup dom

	var fFontSize = (2 / fResolution) * iScale;
	var fLineHeight = (2 / fResolution) * iScale;

	// adjust letter-spacing for all combinations of scale and resolution to get it to fit the image width.

	var fLetterSpacing = 0;

	if (strResolution == 'low') {

		switch (iScale) {
			case 1 : fLetterSpacing = -1; break;
			case 2 :
			case 3 : fLetterSpacing = -2.1; break;
			case 4 : fLetterSpacing = -3.1; break;
			case 5 : fLetterSpacing = -4.15; break;
		}

	}

	if (strResolution == 'medium') {

		switch (iScale) {
			case 1 : fLetterSpacing = 0; break;
			case 2 : fLetterSpacing = -1; break;
			case 3 : fLetterSpacing = -1.04; break;
			case 4 :
			case 5 : fLetterSpacing = -2.1; break;
		}

	}

	if (strResolution == 'high') {

		switch (iScale) {
			case 1 :
			case 2 : fLetterSpacing = 0; break;
			case 3 :
			case 4 :
			case 5 : fLetterSpacing = -1; break;
		}

	}


	// can't get a span or div to flow like an img element, but a table works?


	// convert img element to ascii

	function asciifyImage (canvasRenderer, oAscii) {

		oCtx.clearRect(0, 0, iWidth, iHeight);
		oCtx.drawImage(oCanvasImg, 0, 0, iWidth, iHeight);
		var oImgData = oCtx.getImageData(0, 0, iWidth, iHeight).data;

		// Coloring loop starts now
		var strChars = '';

		// console.time('rendering');

		for (var y = 0; y < iHeight; y += 2) {

			for (var x = 0; x < iWidth; x++) {

				var iOffset = (y * iWidth + x) * 4;

				var iRed = oImgData[ iOffset ];
				var iGreen = oImgData[ iOffset + 1 ];
				var iBlue = oImgData[ iOffset + 2 ];
				var iAlpha = oImgData[ iOffset + 3 ];
				var iCharIdx;

				var fBrightness;

				fBrightness = (0.3 * iRed + 0.59 * iGreen + 0.11 * iBlue) / 255;
				// fBrightness = (0.3*iRed + 0.5*iGreen + 0.3*iBlue) / 255;

				if (iAlpha == 0) {

					// should calculate alpha instead, but quick hack :)
					// fBrightness *= (iAlpha / 255);
					fBrightness = 1;

				}

				iCharIdx = Math.floor((1 - fBrightness) * (aCharList.length - 1));

				if (bInvert) {

					iCharIdx = aCharList.length - iCharIdx - 1;

				}

				// good for debugging
				// fBrightness = Math.floor(fBrightness * 10);
				// strThisChar = fBrightness;

				var strThisChar = aCharList[ iCharIdx ];

				if (strThisChar === undefined || strThisChar == ' ') { strThisChar = '&nbsp;'; }

				if (bColor) {

					strChars += "<span style='" +
						'color:rgb(' + iRed + ',' + iGreen + ',' + iBlue + ');' +
						(bBlock ? 'background-color:rgb(' + iRed + ',' + iGreen + ',' + iBlue + ');' : '') +
						(bAlpha ? 'opacity:' + (iAlpha / 255) + ';' : '') +
						"'>" + strThisChar + '</span>';

				} else {

					strChars += strThisChar;

				}

			}
			strChars += '<br/>';

		}

		oAscii.innerHTML = '<tr><td>' + strChars + '</td></tr>';

		// console.timeEnd('rendering');

		// return oAscii;

	}

	// end modified asciifyImage block

};


/**
*
* Supersample Anti-Aliasing Render Pass
*
* @author bhouston / http://clara.io/
*
* This manual approach to SSAA re-renders the scene ones for each sample with camera jitter and accumulates the results.
*
* References: https://en.wikipedia.org/wiki/Supersampling
*
*/

THREE.SSAARenderPass = function (scene, camera, clearColor, clearAlpha) {

	THREE.Pass.call(this);

	this.scene = scene;
	this.camera = camera;

	this.sampleLevel = 4; // specified as n, where the number of samples is 2^n, so sampleLevel = 4, is 2^4 samples, 16.
	this.unbiased = true;

	// as we need to clear the buffer in this pass, clearColor must be set to something, defaults to black.
	this.clearColor = (clearColor !== undefined) ? clearColor : 0x000000;
	this.clearAlpha = (clearAlpha !== undefined) ? clearAlpha : 0;

	if (THREE.CopyShader === undefined) console.error('THREE.SSAARenderPass relies on THREE.CopyShader');

	var copyShader = THREE.CopyShader;
	this.copyUniforms = THREE.UniformsUtils.clone(copyShader.uniforms);

	this.copyMaterial = new THREE.ShaderMaterial({
		uniforms: this.copyUniforms,
		vertexShader: copyShader.vertexShader,
		fragmentShader: copyShader.fragmentShader,
		premultipliedAlpha: true,
		transparent: true,
		blending: THREE.AdditiveBlending,
		depthTest: false,
		depthWrite: false
	});

	this.camera2 = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
	this.scene2	= new THREE.Scene();
	this.quad2 = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), this.copyMaterial);
	this.quad2.frustumCulled = false; // Avoid getting clipped
	this.scene2.add(this.quad2);

};

THREE.SSAARenderPass.prototype = Object.assign(Object.create(THREE.Pass.prototype), {

	constructor: THREE.SSAARenderPass,

	dispose: function () {

		if (this.sampleRenderTarget) {

			this.sampleRenderTarget.dispose();
			this.sampleRenderTarget = null;

		}

	},

	setSize: function (width, height) {

		if (this.sampleRenderTarget)	this.sampleRenderTarget.setSize(width, height);

	},

	render: function (renderer, writeBuffer, readBuffer) {

		if (!this.sampleRenderTarget) {

			this.sampleRenderTarget = new THREE.WebGLRenderTarget(readBuffer.width, readBuffer.height, { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat });
			this.sampleRenderTarget.texture.name = 'SSAARenderPass.sample';

		}

		var jitterOffsets = THREE.SSAARenderPass.JitterVectors[ Math.max(0, Math.min(this.sampleLevel, 5)) ];

		var autoClear = renderer.autoClear;
		renderer.autoClear = false;

		var oldClearColor = renderer.getClearColor().getHex();
		var oldClearAlpha = renderer.getClearAlpha();

		var baseSampleWeight = 1.0 / jitterOffsets.length;
		var roundingRange = 1 / 32;
		this.copyUniforms[ 'tDiffuse' ].value = this.sampleRenderTarget.texture;

		var width = readBuffer.width; var height = readBuffer.height;


		traec("@@@@@@@@@@@@@@@@@")
		// render the scene multiple times, each slightly jitter offset from the last and accumulate the results.
		for (var i = 0; i < jitterOffsets.length; i++) {

			var jitterOffset = jitterOffsets[ i ];

			if (this.camera.setViewOffset) {

				this.camera.setViewOffset(width, height,
					jitterOffset[ 0 ] * 0.0625, jitterOffset[ 1 ] * 0.0625, // 0.0625 = 1 / 16
					width, height);

			}

			var sampleWeight = baseSampleWeight;

			if (this.unbiased) {

				// the theory is that equal weights for each sample lead to an accumulation of rounding errors.
				// The following equation varies the sampleWeight per sample so that it is uniformly distributed
				// across a range of values whose rounding errors cancel each other out.

				var uniformCenteredDistribution = (-0.5 + (i + 0.5) / jitterOffsets.length);
				sampleWeight += roundingRange * uniformCenteredDistribution;

			}

			this.copyUniforms[ 'opacity' ].value = sampleWeight;
			renderer.setClearColor(this.clearColor, this.clearAlpha);
			renderer.render(this.scene, this.camera, this.sampleRenderTarget, true);

			if (i === 0) {

				renderer.setClearColor(0x000000, 0.0);

			}

			renderer.render(this.scene2, this.camera2, this.renderToScreen ? null : writeBuffer, (i === 0));

		}

		if (this.camera.clearViewOffset) this.camera.clearViewOffset();

		renderer.autoClear = autoClear;
		renderer.setClearColor(oldClearColor, oldClearAlpha);

	}

});


// These jitter vectors are specified in integers because it is easier.
// I am assuming a [-8,8) integer grid, but it needs to be mapped onto [-0.5,0.5)
// before being used, thus these integers need to be scaled by 1/16.
//
// Sample patterns reference: https://msdn.microsoft.com/en-us/library/windows/desktop/ff476218%28v=vs.85%29.aspx?f=255&MSPPError=-2147217396
THREE.SSAARenderPass.JitterVectors = [
	[
		[ 0, 0 ]
	],
	[
		[ 4, 4 ], [ -4, -4 ]
	],
	[
		[ -2, -6 ], [ 6, -2 ], [ -6, 2 ], [ 2, 6 ]
	],
	[
		[ 1, -3 ], [ -1, 3 ], [ 5, 1 ], [ -3, -5 ],
		[ -5, 5 ], [ -7, -1 ], [ 3, 7 ], [ 7, -7 ]
	],
	[
		[ 1, 1 ], [ -1, -3 ], [ -3, 2 ], [ 4, -1 ],
		[ -5, -2 ], [ 2, 5 ], [ 5, 3 ], [ 3, -5 ],
		[ -2, 6 ], [ 0, -7 ], [ -4, -6 ], [ -6, 4 ],
		[ -8, 0 ], [ 7, -4 ], [ 6, 7 ], [ -7, -8 ]
	],
	[
		[ -4, -7 ], [ -7, -5 ], [ -3, -5 ], [ -5, -4 ],
		[ -1, -4 ], [ -2, -2 ], [ -6, -1 ], [ -4, 0 ],
		[ -7, 1 ], [ -1, 2 ], [ -6, 3 ], [ -3, 3 ],
		[ -7, 6 ], [ -3, 6 ], [ -5, 7 ], [ -1, 7 ],
		[ 5, -7 ], [ 1, -6 ], [ 6, -5 ], [ 4, -4 ],
		[ 2, -3 ], [ 7, -2 ], [ 1, -1 ], [ 4, -1 ],
		[ 2, 1 ], [ 6, 2 ], [ 0, 4 ], [ 4, 4 ],
		[ 2, 5 ], [ 7, 5 ], [ 5, 6 ], [ 3, 7 ]
	]
];

/**
 *
 * Temporal Anti-Aliasing Render Pass
 *
 * @author bhouston / http://clara.io/
 *
 * When there is no motion in the scene, the TAA render pass accumulates jittered camera samples across frames to create a high quality anti-aliased result.
 *
 * References:
 *
 * TODO: Add support for motion vector pas so that accumulation of samples across frames can occur on dynamics scenes.
 *
 */

THREE.TAARenderPass = function (scene, camera, params) {

	if (THREE.SSAARenderPass === undefined) {

		console.error('THREE.TAARenderPass relies on THREE.SSAARenderPass');

	}

	THREE.SSAARenderPass.call(this, scene, camera, params);

	this.sampleLevel = 0;
	this.accumulate = false;

};

THREE.TAARenderPass.JitterVectors = THREE.SSAARenderPass.JitterVectors;

THREE.TAARenderPass.prototype = Object.assign(Object.create(THREE.SSAARenderPass.prototype), {

	constructor: THREE.TAARenderPass,

	render: function (renderer, writeBuffer, readBuffer, delta) {

		if (!this.accumulate) {

			THREE.SSAARenderPass.prototype.render.call(this, renderer, writeBuffer, readBuffer, delta);

			this.accumulateIndex = -1;
			return;

		}

		var jitterOffsets = THREE.TAARenderPass.JitterVectors[ 5 ];

		if (!this.sampleRenderTarget) {

			this.sampleRenderTarget = new THREE.WebGLRenderTarget(readBuffer.width, readBuffer.height, this.params);
			this.sampleRenderTarget.texture.name = 'TAARenderPass.sample';

		}

		if (!this.holdRenderTarget) {

			this.holdRenderTarget = new THREE.WebGLRenderTarget(readBuffer.width, readBuffer.height, this.params);
			this.holdRenderTarget.texture.name = 'TAARenderPass.hold';

		}

		if (this.accumulate && this.accumulateIndex === -1) {

			THREE.SSAARenderPass.prototype.render.call(this, renderer, this.holdRenderTarget, readBuffer, delta);

			this.accumulateIndex = 0;

		}

		var autoClear = renderer.autoClear;
		renderer.autoClear = false;

		var sampleWeight = 1.0 / (jitterOffsets.length);
		trace("##")
		if (this.accumulateIndex >= 0 && this.accumulateIndex < jitterOffsets.length) {

			this.copyUniforms[ 'opacity' ].value = sampleWeight;
			this.copyUniforms[ 'tDiffuse' ].value = writeBuffer.texture;

			// render the scene multiple times, each slightly jitter offset from the last and accumulate the results.
			var numSamplesPerFrame = Math.pow(2, this.sampleLevel);
			for (var i = 0; i < numSamplesPerFrame; i++) {

				var j = this.accumulateIndex;
				var jitterOffset = jitterOffsets[ j ];

				if (this.camera.setViewOffset) {

					this.camera.setViewOffset(readBuffer.width, readBuffer.height,
						jitterOffset[ 0 ] * 0.0625, jitterOffset[ 1 ] * 0.0625, // 0.0625 = 1 / 16
						readBuffer.width, readBuffer.height);

				}

				renderer.render(this.scene, this.camera, writeBuffer, true);
				renderer.render(this.scene2, this.camera2, this.sampleRenderTarget, (this.accumulateIndex === 0));

				this.accumulateIndex++;

				if (this.accumulateIndex >= jitterOffsets.length) break;

			}

			if (this.camera.clearViewOffset) this.camera.clearViewOffset();

		}

		var accumulationWeight = this.accumulateIndex * sampleWeight;

		if (accumulationWeight > 0) {

			this.copyUniforms[ 'opacity' ].value = 1.0;
			this.copyUniforms[ 'tDiffuse' ].value = this.sampleRenderTarget.texture;
			renderer.render(this.scene2, this.camera2, writeBuffer, true);

		}

		if (accumulationWeight < 1.0) {

			this.copyUniforms[ 'opacity' ].value = 1.0 - accumulationWeight;
			this.copyUniforms[ 'tDiffuse' ].value = this.holdRenderTarget.texture;
			renderer.render(this.scene2, this.camera2, writeBuffer, (accumulationWeight === 0));

		}

		renderer.autoClear = autoClear;

	}

});
