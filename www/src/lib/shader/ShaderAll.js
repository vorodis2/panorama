/**
 * @author alteredq / http://alteredqualia.com/
 *
 * Full-screen textured quad shader
 */

THREE.CopyShader = {

	uniforms: {

		"tDiffuse": { value: null },
		"opacity":  { value: 1.0 }

	},

	vertexShader: [

		"varying vec2 vUv;",

		"void main() {",

			"vUv = uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join( "\n" ),

	fragmentShader: [

		"uniform float opacity;",

		"uniform sampler2D tDiffuse;",

		"varying vec2 vUv;",

		"void main() {",

			"vec4 texel = texture2D( tDiffuse, vUv );",
			"gl_FragColor = opacity * texel;",

		"}"

	].join( "\n" )

};


/**
 * @author alteredq / http://alteredqualia.com/
 * @author davidedc / http://www.sketchpatch.net/
 *
 * NVIDIA FXAA by Timothy Lottes
 * http://timothylottes.blogspot.com/2011/06/fxaa3-source-released.html
 * - WebGL port by @supereggbert
 * http://www.glge.org/demos/fxaa/
 */

THREE.FXAAShader = {

	uniforms: {

		"tDiffuse":   { value: null },
		"resolution": { value: new THREE.Vector2( 1 / 1024, 1 / 512 ) }

	},

	vertexShader: [

		"void main() {",

			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join( "\n" ),

	fragmentShader: [

		"uniform sampler2D tDiffuse;",
		"uniform vec2 resolution;",

		"#define FXAA_REDUCE_MIN   (1.0/128.0)",
		"#define FXAA_REDUCE_MUL   (1.0/8.0)",
		"#define FXAA_SPAN_MAX     8.0",

		"void main() {",

			"vec3 rgbNW = texture2D( tDiffuse, ( gl_FragCoord.xy + vec2( -1.0, -1.0 ) ) * resolution ).xyz;",
			"vec3 rgbNE = texture2D( tDiffuse, ( gl_FragCoord.xy + vec2( 1.0, -1.0 ) ) * resolution ).xyz;",
			"vec3 rgbSW = texture2D( tDiffuse, ( gl_FragCoord.xy + vec2( -1.0, 1.0 ) ) * resolution ).xyz;",
			"vec3 rgbSE = texture2D( tDiffuse, ( gl_FragCoord.xy + vec2( 1.0, 1.0 ) ) * resolution ).xyz;",
			"vec4 rgbaM  = texture2D( tDiffuse,  gl_FragCoord.xy  * resolution );",
			"vec3 rgbM  = rgbaM.xyz;",
			"vec3 luma = vec3( 0.299, 0.587, 0.114 );",

			"float lumaNW = dot( rgbNW, luma );",
			"float lumaNE = dot( rgbNE, luma );",
			"float lumaSW = dot( rgbSW, luma );",
			"float lumaSE = dot( rgbSE, luma );",
			"float lumaM  = dot( rgbM,  luma );",
			"float lumaMin = min( lumaM, min( min( lumaNW, lumaNE ), min( lumaSW, lumaSE ) ) );",
			"float lumaMax = max( lumaM, max( max( lumaNW, lumaNE) , max( lumaSW, lumaSE ) ) );",

			"vec2 dir;",
			"dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));",
			"dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));",

			"float dirReduce = max( ( lumaNW + lumaNE + lumaSW + lumaSE ) * ( 0.25 * FXAA_REDUCE_MUL ), FXAA_REDUCE_MIN );",

			"float rcpDirMin = 1.0 / ( min( abs( dir.x ), abs( dir.y ) ) + dirReduce );",
			"dir = min( vec2( FXAA_SPAN_MAX,  FXAA_SPAN_MAX),",
				  "max( vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),",
						"dir * rcpDirMin)) * resolution;",
			"vec4 rgbA = (1.0/2.0) * (",
        	"texture2D(tDiffuse,  gl_FragCoord.xy  * resolution + dir * (1.0/3.0 - 0.5)) +",
			"texture2D(tDiffuse,  gl_FragCoord.xy  * resolution + dir * (2.0/3.0 - 0.5)));",
    		"vec4 rgbB = rgbA * (1.0/2.0) + (1.0/4.0) * (",
			"texture2D(tDiffuse,  gl_FragCoord.xy  * resolution + dir * (0.0/3.0 - 0.5)) +",
      		"texture2D(tDiffuse,  gl_FragCoord.xy  * resolution + dir * (3.0/3.0 - 0.5)));",
    		"float lumaB = dot(rgbB, vec4(luma, 0.0));",

			"if ( ( lumaB < lumaMin ) || ( lumaB > lumaMax ) ) {",

				"gl_FragColor = rgbA;",

			"} else {",
				"gl_FragColor = rgbB;",

			"}",

		"}"

	].join( "\n" )

};



/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.EffectComposer = function ( renderer, renderTarget ) {

	this.renderer = renderer;

	if ( renderTarget === undefined ) {

		var parameters = {
			minFilter: THREE.LinearFilter,
			magFilter: THREE.LinearFilter,
			format: THREE.RGBAFormat,
			stencilBuffer: false
		};

		var size = renderer.getSize();
		renderTarget = new THREE.WebGLRenderTarget( size.width, size.height, parameters );
		renderTarget.texture.name = 'EffectComposer.rt1';

	}

	this.renderTarget1 = renderTarget;
	this.renderTarget2 = renderTarget.clone();
	this.renderTarget2.texture.name = 'EffectComposer.rt2';

	this.writeBuffer = this.renderTarget1;
	this.readBuffer = this.renderTarget2;

	this.passes = [];

	// dependencies

	if ( THREE.CopyShader === undefined ) {

		console.error( 'THREE.EffectComposer relies on THREE.CopyShader' );

	}

	if ( THREE.ShaderPass === undefined ) {

		console.error( 'THREE.EffectComposer relies on THREE.ShaderPass' );

	}

	this.copyPass = new THREE.ShaderPass( THREE.CopyShader );

};

Object.assign( THREE.EffectComposer.prototype, {

	swapBuffers: function() {

		var tmp = this.readBuffer;
		this.readBuffer = this.writeBuffer;
		this.writeBuffer = tmp;

	},

	addPass: function ( pass ) {

		this.passes.push( pass );

		var size = this.renderer.getSize();
		pass.setSize( size.width, size.height );

	},

	insertPass: function ( pass, index ) {

		this.passes.splice( index, 0, pass );

	},

	render: function ( delta ) {

		var maskActive = false;

		var pass, i, il = this.passes.length;

		for ( i = 0; i < il; i ++ ) {

			pass = this.passes[ i ];

			if ( pass.enabled === false ) continue;

			pass.render( this.renderer, this.writeBuffer, this.readBuffer, delta, maskActive );

			if ( pass.needsSwap ) {

				if ( maskActive ) {

					var context = this.renderer.context;

					context.stencilFunc( context.NOTEQUAL, 1, 0xffffffff );

					this.copyPass.render( this.renderer, this.writeBuffer, this.readBuffer, delta );

					context.stencilFunc( context.EQUAL, 1, 0xffffffff );

				}

				this.swapBuffers();

			}

			if ( THREE.MaskPass !== undefined ) {

				if ( pass instanceof THREE.MaskPass ) {

					maskActive = true;

				} else if ( pass instanceof THREE.ClearMaskPass ) {

					maskActive = false;

				}

			}

		}

	},

	reset: function ( renderTarget ) {

		if ( renderTarget === undefined ) {

			var size = this.renderer.getSize();

			renderTarget = this.renderTarget1.clone();
			renderTarget.setSize( size.width, size.height );

		}

		this.renderTarget1.dispose();
		this.renderTarget2.dispose();
		this.renderTarget1 = renderTarget;
		this.renderTarget2 = renderTarget.clone();

		this.writeBuffer = this.renderTarget1;
		this.readBuffer = this.renderTarget2;

	},

	setSize: function ( width, height ) {

		this.renderTarget1.setSize( width, height );
		this.renderTarget2.setSize( width, height );

		for ( var i = 0; i < this.passes.length; i ++ ) {

			this.passes[i].setSize( width, height );

		}

	}

} );


THREE.Pass = function () {

	// if set to true, the pass is processed by the composer
	this.enabled = true;

	// if set to true, the pass indicates to swap read and write buffer after rendering
	this.needsSwap = true;

	// if set to true, the pass clears its buffer before rendering
	this.clear = false;

	// if set to true, the result of the pass is rendered to screen
	this.renderToScreen = false;

};

Object.assign( THREE.Pass.prototype, {

	setSize: function( width, height ) {},

	render: function ( renderer, writeBuffer, readBuffer, delta, maskActive ) {

		console.error( 'THREE.Pass: .render() must be implemented in derived pass.' );

	}

} );


/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.RenderPass = function ( scene, camera, overrideMaterial, clearColor, clearAlpha ) {

	THREE.Pass.call( this );

	this.scene = scene;
	this.camera = camera;

	this.overrideMaterial = overrideMaterial;

	this.clearColor = clearColor;
	this.clearAlpha = ( clearAlpha !== undefined ) ? clearAlpha : 0;

	this.clear = true;
	this.clearDepth = false;
	this.needsSwap = false;

};

THREE.RenderPass.prototype = Object.assign( Object.create( THREE.Pass.prototype ), {

	constructor: THREE.RenderPass,

	render: function ( renderer, writeBuffer, readBuffer, delta, maskActive ) {

		var oldAutoClear = renderer.autoClear;
		renderer.autoClear = false;

		this.scene.overrideMaterial = this.overrideMaterial;

		var oldClearColor, oldClearAlpha;

		if ( this.clearColor ) {

			oldClearColor = renderer.getClearColor().getHex();
			oldClearAlpha = renderer.getClearAlpha();

			renderer.setClearColor( this.clearColor, this.clearAlpha );

		}

		if ( this.clearDepth ) {

			renderer.clearDepth();

		}

		renderer.render( this.scene, this.camera, this.renderToScreen ? null : readBuffer, this.clear );

		if ( this.clearColor ) {

			renderer.setClearColor( oldClearColor, oldClearAlpha );

		}

		this.scene.overrideMaterial = null;
		renderer.autoClear = oldAutoClear;
	}

} );



/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.ShaderPass = function ( shader, textureID ) {

	THREE.Pass.call( this );

	this.textureID = ( textureID !== undefined ) ? textureID : "tDiffuse";

	if ( shader instanceof THREE.ShaderMaterial ) {

		this.uniforms = shader.uniforms;

		this.material = shader;

	} else if ( shader ) {

		this.uniforms = THREE.UniformsUtils.clone( shader.uniforms );

		this.material = new THREE.ShaderMaterial( {

			defines: shader.defines || {},
			uniforms: this.uniforms,
			vertexShader: shader.vertexShader,
			fragmentShader: shader.fragmentShader

		} );

	}

	this.camera = new THREE.OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );
	this.scene = new THREE.Scene();

	this.quad = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2, 2 ), null );
	this.quad.frustumCulled = false; // Avoid getting clipped
	this.scene.add( this.quad );

};

THREE.ShaderPass.prototype = Object.assign( Object.create( THREE.Pass.prototype ), {

	constructor: THREE.ShaderPass,

	render: function( renderer, writeBuffer, readBuffer, delta, maskActive ) {

		if ( this.uniforms[ this.textureID ] ) {

			this.uniforms[ this.textureID ].value = readBuffer.texture;

		}

		this.quad.material = this.material;

		if ( this.renderToScreen ) {

			renderer.render( this.scene, this.camera );

		} else {

			renderer.render( this.scene, this.camera, writeBuffer, this.clear );

		}

	}

} );


/**
 * @author spidersharma / http://eduperiment.com/
 */

THREE.OutlinePass = function ( resolution, scene, camera, selectedObjects ) {

	this.renderScene = scene;
	this.renderCamera = camera;
	this.selectedObjects = selectedObjects !== undefined ? selectedObjects : [];
	this.visibleEdgeColor = new THREE.Color( 1, 1, 1 );
	this.hiddenEdgeColor = new THREE.Color( 0.1, 0.04, 0.02 );
	this.edgeGlow = 0.0;
	this.usePatternTexture = false;
	this.edgeThickness = 1.0;
	this.edgeStrength = 3.0;
	this.downSampleRatio = 2;
	this.pulsePeriod = 0;

	THREE.Pass.call( this );

	this.resolution = ( resolution !== undefined ) ? new THREE.Vector2( resolution.x, resolution.y ) : new THREE.Vector2( 256, 256 );

	var pars = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat };

	var resx = Math.round( this.resolution.x / this.downSampleRatio );
	var resy = Math.round( this.resolution.y / this.downSampleRatio );

	this.maskBufferMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff } );
	this.maskBufferMaterial.side = THREE.DoubleSide;
	this.renderTargetMaskBuffer = new THREE.WebGLRenderTarget( this.resolution.x, this.resolution.y, pars );
	this.renderTargetMaskBuffer.texture.name = "OutlinePass.mask";
	this.renderTargetMaskBuffer.texture.generateMipmaps = false;

	this.depthMaterial = new THREE.MeshDepthMaterial();
	this.depthMaterial.side = THREE.DoubleSide;
	this.depthMaterial.depthPacking = THREE.RGBADepthPacking;
	this.depthMaterial.blending = THREE.NoBlending;

	this.prepareMaskMaterial = this.getPrepareMaskMaterial();
	this.prepareMaskMaterial.side = THREE.DoubleSide;

	this.renderTargetDepthBuffer = new THREE.WebGLRenderTarget( this.resolution.x, this.resolution.y, pars );
	this.renderTargetDepthBuffer.texture.name = "OutlinePass.depth";
	this.renderTargetDepthBuffer.texture.generateMipmaps = false;

	this.renderTargetMaskDownSampleBuffer = new THREE.WebGLRenderTarget( resx, resy, pars );
	this.renderTargetMaskDownSampleBuffer.texture.name = "OutlinePass.depthDownSample";
	this.renderTargetMaskDownSampleBuffer.texture.generateMipmaps = false;

	this.renderTargetBlurBuffer1 = new THREE.WebGLRenderTarget( resx, resy, pars );
	this.renderTargetBlurBuffer1.texture.name = "OutlinePass.blur1";
	this.renderTargetBlurBuffer1.texture.generateMipmaps = false;
	this.renderTargetBlurBuffer2 = new THREE.WebGLRenderTarget( Math.round( resx / 2 ), Math.round( resy / 2 ), pars );
	this.renderTargetBlurBuffer2.texture.name = "OutlinePass.blur2";
	this.renderTargetBlurBuffer2.texture.generateMipmaps = false;

	this.edgeDetectionMaterial = this.getEdgeDetectionMaterial();
	this.renderTargetEdgeBuffer1 = new THREE.WebGLRenderTarget( resx, resy, pars );
	this.renderTargetEdgeBuffer1.texture.name = "OutlinePass.edge1";
	this.renderTargetEdgeBuffer1.texture.generateMipmaps = false;
	this.renderTargetEdgeBuffer2 = new THREE.WebGLRenderTarget( Math.round( resx / 2 ), Math.round( resy / 2 ), pars );
	this.renderTargetEdgeBuffer2.texture.name = "OutlinePass.edge2";
	this.renderTargetEdgeBuffer2.texture.generateMipmaps = false;

	var MAX_EDGE_THICKNESS = 4;
	var MAX_EDGE_GLOW = 4;

	this.separableBlurMaterial1 = this.getSeperableBlurMaterial( MAX_EDGE_THICKNESS );
	this.separableBlurMaterial1.uniforms[ "texSize" ].value = new THREE.Vector2( resx, resy );
	this.separableBlurMaterial1.uniforms[ "kernelRadius" ].value = 1;
	this.separableBlurMaterial2 = this.getSeperableBlurMaterial( MAX_EDGE_GLOW );
	this.separableBlurMaterial2.uniforms[ "texSize" ].value = new THREE.Vector2( Math.round( resx / 2 ), Math.round( resy / 2 ) );
	this.separableBlurMaterial2.uniforms[ "kernelRadius" ].value = MAX_EDGE_GLOW;

	// Overlay material
	this.overlayMaterial = this.getOverlayMaterial();

	// copy material
	if ( THREE.CopyShader === undefined )
		console.error( "THREE.OutlinePass relies on THREE.CopyShader" );

	var copyShader = THREE.CopyShader;

	this.copyUniforms = THREE.UniformsUtils.clone( copyShader.uniforms );
	this.copyUniforms[ "opacity" ].value = 1.0;

	this.materialCopy = new THREE.ShaderMaterial( {
		uniforms: this.copyUniforms,
		vertexShader: copyShader.vertexShader,
		fragmentShader: copyShader.fragmentShader,
		blending: THREE.NoBlending,
		depthTest: false,
		depthWrite: false,
		transparent: true
	} );

	this.enabled = true;
	this.needsSwap = false;

	this.oldClearColor = new THREE.Color();
	this.oldClearAlpha = 1;

	this.camera = new THREE.OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );
	this.scene = new THREE.Scene();

	this.quad = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2, 2 ), null );
	this.quad.frustumCulled = false; // Avoid getting clipped
	this.scene.add( this.quad );

	this.tempPulseColor1 = new THREE.Color();
	this.tempPulseColor2 = new THREE.Color();
	this.textureMatrix = new THREE.Matrix4();

};

THREE.OutlinePass.prototype = Object.assign( Object.create( THREE.Pass.prototype ), {

	constructor: THREE.OutlinePass,

	dispose: function () {

		this.renderTargetMaskBuffer.dispose();
		this.renderTargetDepthBuffer.dispose();
		this.renderTargetMaskDownSampleBuffer.dispose();
		this.renderTargetBlurBuffer1.dispose();
		this.renderTargetBlurBuffer2.dispose();
		this.renderTargetEdgeBuffer1.dispose();
		this.renderTargetEdgeBuffer2.dispose();

	},

	setSize: function ( width, height ) {

		this.renderTargetMaskBuffer.setSize( width, height );

		var resx = Math.round( width / this.downSampleRatio );
		var resy = Math.round( height / this.downSampleRatio );
		this.renderTargetMaskDownSampleBuffer.setSize( resx, resy );
		this.renderTargetBlurBuffer1.setSize( resx, resy );
		this.renderTargetEdgeBuffer1.setSize( resx, resy );
		this.separableBlurMaterial1.uniforms[ "texSize" ].value = new THREE.Vector2( resx, resy );

		resx = Math.round( resx / 2 );
		resy = Math.round( resy / 2 );

		this.renderTargetBlurBuffer2.setSize( resx, resy );
		this.renderTargetEdgeBuffer2.setSize( resx, resy );

		this.separableBlurMaterial2.uniforms[ "texSize" ].value = new THREE.Vector2( resx, resy );

	},

	changeVisibilityOfSelectedObjects: function ( bVisible ) {

		function gatherSelectedMeshesCallBack( object ) {

			if ( object instanceof THREE.Mesh ) object.visible = bVisible;

		}

		for ( var i = 0; i < this.selectedObjects.length; i ++ ) {

			var selectedObject = this.selectedObjects[ i ];
			selectedObject.traverse( gatherSelectedMeshesCallBack );

		}

	},
	saveVisibilityOfSelectedObjects: function () {
		function gatherSelectedMeshesCallBack( object ) {
			if ( object instanceof THREE.Mesh ) object.userData.oldVisible = object.visible;
		}
		for ( var i = 0; i < this.selectedObjects.length; i ++ ) {
			var selectedObject = this.selectedObjects[ i ];
			selectedObject.traverse( gatherSelectedMeshesCallBack );
		}
	},
	restoreVisibilityOfSelectedObjects: function () {
		function gatherSelectedMeshesCallBack( object ) {
			if ( object instanceof THREE.Mesh && object.userData.oldVisible !== undefined) object.visible = object.userData.oldVisible;
		}
		for ( var i = 0; i < this.selectedObjects.length; i ++ ) {
			var selectedObject = this.selectedObjects[ i ];
			selectedObject.traverse( gatherSelectedMeshesCallBack );
		}
	},

	changeVisibilityOfNonSelectedObjects: function ( bVisible ) {

		var selectedMeshes = [];

		function gatherSelectedMeshesCallBack( object ) {

			if ( object instanceof THREE.Mesh ) selectedMeshes.push( object );

		}

		for ( var i = 0; i < this.selectedObjects.length; i ++ ) {

			var selectedObject = this.selectedObjects[ i ];
			selectedObject.traverse( gatherSelectedMeshesCallBack );

		}

		function VisibilityChangeCallBack( object ) {

			if ( object instanceof THREE.Mesh || object instanceof THREE.Line || object instanceof THREE.Sprite ) {

				var bFound = false;

				for ( var i = 0; i < selectedMeshes.length; i ++ ) {

					var selectedObjectId = selectedMeshes[ i ].id;

					if ( selectedObjectId === object.id ) {

						bFound = true;
						break;

					}

				}

				if ( ! bFound ) {

					var visibility = object.visible;

					if ( ! bVisible || object.bVisible ) object.visible = bVisible;

					object.bVisible = visibility;

				}

			}

		}

		this.renderScene.traverse( VisibilityChangeCallBack );

	},

	updateTextureMatrix: function () {

		this.textureMatrix.set( 0.5, 0.0, 0.0, 0.5,
														0.0, 0.5, 0.0, 0.5,
														0.0, 0.0, 0.5, 0.5,
														0.0, 0.0, 0.0, 1.0 );
		this.textureMatrix.multiply( this.renderCamera.projectionMatrix );
		this.textureMatrix.multiply( this.renderCamera.matrixWorldInverse );

	},

	render: function ( renderer, writeBuffer, readBuffer, delta, maskActive ) {

		if ( this.selectedObjects.length === 0 ) return;

		this.oldClearColor.copy( renderer.getClearColor() );
		this.oldClearAlpha = renderer.getClearAlpha();
		var oldAutoClear = renderer.autoClear;

		renderer.autoClear = false;

		if ( maskActive ) renderer.context.disable( renderer.context.STENCIL_TEST );

		renderer.setClearColor( 0xffffff, 1 );

		this.saveVisibilityOfSelectedObjects();// added Viktor

		// Make selected objects invisible
		this.changeVisibilityOfSelectedObjects( false );

		var currentBackground = this.renderScene.background;
		this.renderScene.background = null;

		// 1. Draw Non Selected objects in the depth buffer
		this.renderScene.overrideMaterial = this.depthMaterial;
		renderer.render( this.renderScene, this.renderCamera, this.renderTargetDepthBuffer, true );

		// Make selected objects visible
		this.changeVisibilityOfSelectedObjects( true );
		
		this.restoreVisibilityOfSelectedObjects();// added Viktor

		// Update Texture Matrix for Depth compare
		this.updateTextureMatrix();

		// Make non selected objects invisible, and draw only the selected objects, by comparing the depth buffer of non selected objects
		this.changeVisibilityOfNonSelectedObjects( false );
		this.renderScene.overrideMaterial = this.prepareMaskMaterial;
		this.prepareMaskMaterial.uniforms[ "cameraNearFar" ].value = new THREE.Vector2( this.renderCamera.near, this.renderCamera.far );
		this.prepareMaskMaterial.uniforms[ "depthTexture" ].value = this.renderTargetDepthBuffer.texture;
		this.prepareMaskMaterial.uniforms[ "textureMatrix" ].value = this.textureMatrix;
		renderer.render( this.renderScene, this.renderCamera, this.renderTargetMaskBuffer, true );
		this.renderScene.overrideMaterial = null;
		this.changeVisibilityOfNonSelectedObjects( true );

		this.renderScene.background = currentBackground;

		// 2. Downsample to Half resolution
		this.quad.material = this.materialCopy;
		this.copyUniforms[ "tDiffuse" ].value = this.renderTargetMaskBuffer.texture;
		renderer.render( this.scene, this.camera, this.renderTargetMaskDownSampleBuffer, true );

		this.tempPulseColor1.copy( this.visibleEdgeColor );
		this.tempPulseColor2.copy( this.hiddenEdgeColor );

		if ( this.pulsePeriod > 0 ) {

			var scalar = ( 1 + 0.25 ) / 2 + Math.cos( performance.now() * 0.01 / this.pulsePeriod ) * ( 1.0 - 0.25 ) / 2;
			this.tempPulseColor1.multiplyScalar( scalar );
			this.tempPulseColor2.multiplyScalar( scalar );

		}

		// 3. Apply Edge Detection Pass
		this.quad.material = this.edgeDetectionMaterial;
		this.edgeDetectionMaterial.uniforms[ "maskTexture" ].value = this.renderTargetMaskDownSampleBuffer.texture;
		this.edgeDetectionMaterial.uniforms[ "texSize" ].value = new THREE.Vector2( this.renderTargetMaskDownSampleBuffer.width, this.renderTargetMaskDownSampleBuffer.height );
		this.edgeDetectionMaterial.uniforms[ "visibleEdgeColor" ].value = this.tempPulseColor1;
		this.edgeDetectionMaterial.uniforms[ "hiddenEdgeColor" ].value = this.tempPulseColor2;
		renderer.render( this.scene, this.camera, this.renderTargetEdgeBuffer1, true );

		// 4. Apply Blur on Half res
		this.quad.material = this.separableBlurMaterial1;
		this.separableBlurMaterial1.uniforms[ "colorTexture" ].value = this.renderTargetEdgeBuffer1.texture;
		this.separableBlurMaterial1.uniforms[ "direction" ].value = THREE.OutlinePass.BlurDirectionX;
		this.separableBlurMaterial1.uniforms[ "kernelRadius" ].value = this.edgeThickness;
		renderer.render( this.scene, this.camera, this.renderTargetBlurBuffer1, true );
		this.separableBlurMaterial1.uniforms[ "colorTexture" ].value = this.renderTargetBlurBuffer1.texture;
		this.separableBlurMaterial1.uniforms[ "direction" ].value = THREE.OutlinePass.BlurDirectionY;
		renderer.render( this.scene, this.camera, this.renderTargetEdgeBuffer1, true );

		// Apply Blur on quarter res
		this.quad.material = this.separableBlurMaterial2;
		this.separableBlurMaterial2.uniforms[ "colorTexture" ].value = this.renderTargetEdgeBuffer1.texture;
		this.separableBlurMaterial2.uniforms[ "direction" ].value = THREE.OutlinePass.BlurDirectionX;
		renderer.render( this.scene, this.camera, this.renderTargetBlurBuffer2, true );
		this.separableBlurMaterial2.uniforms[ "colorTexture" ].value = this.renderTargetBlurBuffer2.texture;
		this.separableBlurMaterial2.uniforms[ "direction" ].value = THREE.OutlinePass.BlurDirectionY;
		renderer.render( this.scene, this.camera, this.renderTargetEdgeBuffer2, true );

		// Blend it additively over the input texture
		this.quad.material = this.overlayMaterial;
		this.overlayMaterial.uniforms[ "maskTexture" ].value = this.renderTargetMaskBuffer.texture;
		this.overlayMaterial.uniforms[ "edgeTexture1" ].value = this.renderTargetEdgeBuffer1.texture;
		this.overlayMaterial.uniforms[ "edgeTexture2" ].value = this.renderTargetEdgeBuffer2.texture;
		this.overlayMaterial.uniforms[ "patternTexture" ].value = this.patternTexture;
		this.overlayMaterial.uniforms[ "edgeStrength" ].value = this.edgeStrength;
		this.overlayMaterial.uniforms[ "edgeGlow" ].value = this.edgeGlow;
		this.overlayMaterial.uniforms[ "usePatternTexture" ].value = this.usePatternTexture;


		if ( maskActive ) renderer.context.enable( renderer.context.STENCIL_TEST );

		renderer.render( this.scene, this.camera, readBuffer, false );

		renderer.setClearColor( this.oldClearColor, this.oldClearAlpha );
		renderer.autoClear = oldAutoClear;

	},

	getPrepareMaskMaterial: function () {

		return new THREE.ShaderMaterial( {

			uniforms: {
				"depthTexture": { value: null },
				"cameraNearFar": { value: new THREE.Vector2( 0.5, 0.5 ) },
				"textureMatrix": { value: new THREE.Matrix4() }
			},

			vertexShader:
				"varying vec2 vUv;\
				varying vec4 projTexCoord;\
				varying vec4 vPosition;\
				uniform mat4 textureMatrix;\
				void main() {\
					vUv = uv;\
					vPosition = modelViewMatrix * vec4( position, 1.0 );\
					vec4 worldPosition = modelMatrix * vec4( position, 1.0 );\
					projTexCoord = textureMatrix * worldPosition;\
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\
				}",

			fragmentShader:
				"#include <packing>\
				varying vec2 vUv;\
				varying vec4 vPosition;\
				varying vec4 projTexCoord;\
				uniform sampler2D depthTexture;\
				uniform vec2 cameraNearFar;\
				\
				void main() {\
					float depth = unpackRGBAToDepth(texture2DProj( depthTexture, projTexCoord ));\
					float viewZ = -perspectiveDepthToViewZ( depth, cameraNearFar.x, cameraNearFar.y );\
					float depthTest = (-vPosition.z > viewZ) ? 1.0 : 0.0;\
					gl_FragColor = vec4(0.0, depthTest, 1.0, 1.0);\
				}"
		} );

	},

	getEdgeDetectionMaterial: function () {

		return new THREE.ShaderMaterial( {

			uniforms: {
				"maskTexture": { value: null },
				"texSize": { value: new THREE.Vector2( 0.5, 0.5 ) },
				"visibleEdgeColor": { value: new THREE.Vector3( 1.0, 1.0, 1.0 ) },
				"hiddenEdgeColor": { value: new THREE.Vector3( 1.0, 1.0, 1.0 ) },
			},

			vertexShader:
				"varying vec2 vUv;\n\
				void main() {\n\
					vUv = uv;\n\
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\
				}",

			fragmentShader:
				"varying vec2 vUv;\
				uniform sampler2D maskTexture;\
				uniform vec2 texSize;\
				uniform vec3 visibleEdgeColor;\
				uniform vec3 hiddenEdgeColor;\
				\
				void main() {\n\
					vec2 invSize = 1.0 / texSize;\
					vec4 uvOffset = vec4(1.0, 0.0, 0.0, 1.0) * vec4(invSize, invSize);\
					vec4 c1 = texture2D( maskTexture, vUv + uvOffset.xy);\
					vec4 c2 = texture2D( maskTexture, vUv - uvOffset.xy);\
					vec4 c3 = texture2D( maskTexture, vUv + uvOffset.yw);\
					vec4 c4 = texture2D( maskTexture, vUv - uvOffset.yw);\
					float diff1 = (c1.r - c2.r)*0.5;\
					float diff2 = (c3.r - c4.r)*0.5;\
					float d = length( vec2(diff1, diff2) );\
					float a1 = min(c1.g, c2.g);\
					float a2 = min(c3.g, c4.g);\
					float visibilityFactor = min(a1, a2);\
					vec3 edgeColor = 1.0 - visibilityFactor > 0.001 ? visibleEdgeColor : hiddenEdgeColor;\
					gl_FragColor = vec4(edgeColor, 1.0) * vec4(d);\
				}"
		} );

	},

	getSeperableBlurMaterial: function ( maxRadius ) {

		return new THREE.ShaderMaterial( {

			defines: {
				"MAX_RADIUS": maxRadius,
			},

			uniforms: {
				"colorTexture": { value: null },
				"texSize": { value: new THREE.Vector2( 0.5, 0.5 ) },
				"direction": { value: new THREE.Vector2( 0.5, 0.5 ) },
				"kernelRadius": { value: 1.0 }
			},

			vertexShader:
				"varying vec2 vUv;\n\
				void main() {\n\
					vUv = uv;\n\
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\
				}",

			fragmentShader:
				"#include <common>\
				varying vec2 vUv;\
				uniform sampler2D colorTexture;\
				uniform vec2 texSize;\
				uniform vec2 direction;\
				uniform float kernelRadius;\
				\
				float gaussianPdf(in float x, in float sigma) {\
					return 0.39894 * exp( -0.5 * x * x/( sigma * sigma))/sigma;\
				}\
				void main() {\
					vec2 invSize = 1.0 / texSize;\
					float weightSum = gaussianPdf(0.0, kernelRadius);\
					vec3 diffuseSum = texture2D( colorTexture, vUv).rgb * weightSum;\
					vec2 delta = direction * invSize * kernelRadius/float(MAX_RADIUS);\
					vec2 uvOffset = delta;\
					for( int i = 1; i <= MAX_RADIUS; i ++ ) {\
						float w = gaussianPdf(uvOffset.x, kernelRadius);\
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset).rgb;\
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset).rgb;\
						diffuseSum += ((sample1 + sample2) * w);\
						weightSum += (2.0 * w);\
						uvOffset += delta;\
					}\
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);\
				}"
		} );

	},

	getOverlayMaterial: function () {

		return new THREE.ShaderMaterial( {

			uniforms: {
				"maskTexture": { value: null },
				"edgeTexture1": { value: null },
				"edgeTexture2": { value: null },
				"patternTexture": { value: null },
				"edgeStrength": { value: 1.0 },
				"edgeGlow": { value: 1.0 },
				"usePatternTexture": { value: 0.0 }
			},

			vertexShader:
				"varying vec2 vUv;\n\
				void main() {\n\
					vUv = uv;\n\
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\
				}",

			fragmentShader:
				"varying vec2 vUv;\
				uniform sampler2D maskTexture;\
				uniform sampler2D edgeTexture1;\
				uniform sampler2D edgeTexture2;\
				uniform sampler2D patternTexture;\
				uniform float edgeStrength;\
				uniform float edgeGlow;\
				uniform bool usePatternTexture;\
				\
				void main() {\
					vec4 edgeValue1 = texture2D(edgeTexture1, vUv);\
					vec4 edgeValue2 = texture2D(edgeTexture2, vUv);\
					vec4 maskColor = texture2D(maskTexture, vUv);\
					vec4 patternColor = texture2D(patternTexture, 6.0 * vUv);\
					float visibilityFactor = 1.0 - maskColor.g > 0.0 ? 1.0 : 0.5;\
					vec4 edgeValue = edgeValue1 + edgeValue2 * edgeGlow;\
					vec4 finalColor = edgeStrength * maskColor.r * edgeValue;\
					if(usePatternTexture)\
						finalColor += + visibilityFactor * (1.0 - maskColor.r) * (1.0 - patternColor.r);\
					gl_FragColor = finalColor;\
				}",
			blending: THREE.AdditiveBlending,
			depthTest: false,
			depthWrite: false,
			transparent: true
		} );

	}

} );

THREE.OutlinePass.BlurDirectionX = new THREE.Vector2( 1.0, 0.0 );
THREE.OutlinePass.BlurDirectionY = new THREE.Vector2( 0.0, 1.0 );



THREE.DepthLimitedBlurShader = {
	defines: {
		'KERNEL_RADIUS': 4,
		'DEPTH_PACKING': 1,
		'PERSPECTIVE_CAMERA': 1
	},
	uniforms: {
		'tDiffuse': { type: 't', value: null },
		'size': { type: 'v2', value: new THREE.Vector2( 512, 512 ) },
		'sampleUvOffsets': { type: 'v2v', value: [ new THREE.Vector2( 0, 0 ) ] },
		'sampleWeights': { type: '1fv', value: [ 1.0 ] },
		'tDepth': { type: 't', value: null },
		'cameraNear': { type: 'f', value: 10 },
		'cameraFar': { type: 'f', value: 1000 },
		'depthCutoff': { type: 'f', value: 10 },
	},
	vertexShader: [
		"#include <common>",

		"uniform vec2 size;",

		"varying vec2 vUv;",
		"varying vec2 vInvSize;",

		"void main() {",
		"	vUv = uv;",
		"	vInvSize = 1.0 / size;",

		"	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
		"}"

	].join( "\n" ),
	fragmentShader: [
		"#include <common>",
		"#include <packing>",

		"uniform sampler2D tDiffuse;",
		"uniform sampler2D tDepth;",

		"uniform float cameraNear;",
		"uniform float cameraFar;",
		"uniform float depthCutoff;",

		"uniform vec2 sampleUvOffsets[ KERNEL_RADIUS + 1 ];",
		"uniform float sampleWeights[ KERNEL_RADIUS + 1 ];",

		"varying vec2 vUv;",
		"varying vec2 vInvSize;",

		"float getDepth( const in vec2 screenPosition ) {",
		"	#if DEPTH_PACKING == 1",
		"	return unpackRGBAToDepth( texture2D( tDepth, screenPosition ) );",
		"	#else",
		"	return texture2D( tDepth, screenPosition ).x;",
		"	#endif",
		"}",

		"float getViewZ( const in float depth ) {",
		"	#if PERSPECTIVE_CAMERA == 1",
		"	return perspectiveDepthToViewZ( depth, cameraNear, cameraFar );",
		"	#else",
		"	return orthoDepthToViewZ( depth, cameraNear, cameraFar );",
		"	#endif",
		"}",

		"void main() {",
		"	float depth = getDepth( vUv );",
		"	if( depth >= ( 1.0 - EPSILON ) ) {",
		"		discard;",
		"	}",

		"	float centerViewZ = -getViewZ( depth );",
		"	bool rBreak = false, lBreak = false;",

		"	float weightSum = sampleWeights[0];",
		"	vec4 diffuseSum = texture2D( tDiffuse, vUv ) * weightSum;",

		"	for( int i = 1; i <= KERNEL_RADIUS; i ++ ) {",

		"		float sampleWeight = sampleWeights[i];",
		"		vec2 sampleUvOffset = sampleUvOffsets[i] * vInvSize;",

		"		vec2 sampleUv = vUv + sampleUvOffset;",
		"		float viewZ = -getViewZ( getDepth( sampleUv ) );",

		"		if( abs( viewZ - centerViewZ ) > depthCutoff ) rBreak = true;",

		"		if( ! rBreak ) {",
		"			diffuseSum += texture2D( tDiffuse, sampleUv ) * sampleWeight;",
		"			weightSum += sampleWeight;",
		"		}",

		"		sampleUv = vUv - sampleUvOffset;",
		"		viewZ = -getViewZ( getDepth( sampleUv ) );",

		"		if( abs( viewZ - centerViewZ ) > depthCutoff ) lBreak = true;",

		"		if( ! lBreak ) {",
		"			diffuseSum += texture2D( tDiffuse, sampleUv ) * sampleWeight;",
		"			weightSum += sampleWeight;",
		"		}",

		"	}",

		"	gl_FragColor = diffuseSum / weightSum;",
		"}"
	].join( "\n" )
};

THREE.BlurShaderUtils = {

	createSampleWeights: function ( kernelRadius, stdDev ) {

		var gaussian = function ( x, stdDev ) {

			return Math.exp( - ( x * x ) / ( 2.0 * ( stdDev * stdDev ) ) ) / ( Math.sqrt( 2.0 * Math.PI ) * stdDev );

		};

		var weights = [];

		for ( var i = 0; i <= kernelRadius; i ++ ) {

			weights.push( gaussian( i, stdDev ) );

		}

		return weights;

	},

	createSampleOffsets: function ( kernelRadius, uvIncrement ) {

		var offsets = [];

		for ( var i = 0; i <= kernelRadius; i ++ ) {

			offsets.push( uvIncrement.clone().multiplyScalar( i ) );

		}

		return offsets;

	},

	configure: function ( material, kernelRadius, stdDev, uvIncrement ) {

		material.defines[ 'KERNEL_RADIUS' ] = kernelRadius;
		material.uniforms[ 'sampleUvOffsets' ].value = THREE.BlurShaderUtils.createSampleOffsets( kernelRadius, uvIncrement );
		material.uniforms[ 'sampleWeights' ].value = THREE.BlurShaderUtils.createSampleWeights( kernelRadius, stdDev );
		material.needsUpdate = true;

	}

};


THREE.SAOShader = {
	defines: {
		'NUM_SAMPLES': 7,
		'NUM_RINGS': 4,
		'NORMAL_TEXTURE': 0,
		'DIFFUSE_TEXTURE': 0,
		'DEPTH_PACKING': 1,
		'PERSPECTIVE_CAMERA': 1
	},
	uniforms: {

		'tDepth': { type: 't', value: null },
		'tDiffuse': { type: 't', value: null },
		'tNormal': { type: 't', value: null },
		'size': { type: 'v2', value: new THREE.Vector2( 512, 512 ) },

		'cameraNear': { type: 'f', value: 1 },
		'cameraFar': { type: 'f', value: 100 },
		'cameraProjectionMatrix': { type: 'm4', value: new THREE.Matrix4() },
		'cameraInverseProjectionMatrix': { type: 'm4', value: new THREE.Matrix4() },

		'scale': { type: 'f', value: 1.0 },
		'intensity': { type: 'f', value: 0.1 },
		'bias': { type: 'f', value: 0.5 },

		'minResolution': { type: 'f', value: 0.0 },
		'kernelRadius': { type: 'f', value: 100.0 },
		'randomSeed': { type: 'f', value: 0.0 }
	},
	vertexShader: [
		"varying vec2 vUv;",

		"void main() {",
		"	vUv = uv;",
		"	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
		"}"

	].join( "\n" ),
	fragmentShader: [
		"#include <common>",

		"varying vec2 vUv;",

		"#if DIFFUSE_TEXTURE == 1",
		"uniform sampler2D tDiffuse;",
		"#endif",

		"uniform sampler2D tDepth;",

		"#if NORMAL_TEXTURE == 1",
		"uniform sampler2D tNormal;",
		"#endif",

		"uniform float cameraNear;",
		"uniform float cameraFar;",
		"uniform mat4 cameraProjectionMatrix;",
		"uniform mat4 cameraInverseProjectionMatrix;",

		"uniform float scale;",
		"uniform float intensity;",
		"uniform float bias;",
		"uniform float kernelRadius;",
		"uniform float minResolution;",
		"uniform vec2 size;",
		"uniform float randomSeed;",

		"// RGBA depth",

		"#include <packing>",

		"vec4 getDefaultColor( const in vec2 screenPosition ) {",
		"	#if DIFFUSE_TEXTURE == 1",
		"	return texture2D( tDiffuse, vUv );",
		"	#else",
		"	return vec4( 1.0 );",
		"	#endif",
		"}",

		"float getDepth( const in vec2 screenPosition ) {",
		"	#if DEPTH_PACKING == 1",
		"	return unpackRGBAToDepth( texture2D( tDepth, screenPosition ) );",
		"	#else",
		"	return texture2D( tDepth, screenPosition ).x;",
		"	#endif",
		"}",

		"float getViewZ( const in float depth ) {",
		"	#if PERSPECTIVE_CAMERA == 1",
		"	return perspectiveDepthToViewZ( depth, cameraNear, cameraFar );",
		"	#else",
		"	return orthoDepthToViewZ( depth, cameraNear, cameraFar );",
		"	#endif",
		"}",

		"vec3 getViewPosition( const in vec2 screenPosition, const in float depth, const in float viewZ ) {",
		"	float clipW = cameraProjectionMatrix[2][3] * viewZ + cameraProjectionMatrix[3][3];",
		"	vec4 clipPosition = vec4( ( vec3( screenPosition, depth ) - 0.5 ) * 2.0, 1.0 );",
		"	clipPosition *= clipW; // unprojection.",

		"	return ( cameraInverseProjectionMatrix * clipPosition ).xyz;",
		"}",

		"vec3 getViewNormal( const in vec3 viewPosition, const in vec2 screenPosition ) {",
		"	#if NORMAL_TEXTURE == 1",
		"	return unpackRGBToNormal( texture2D( tNormal, screenPosition ).xyz );",
		"	#else",
		"	return normalize( cross( dFdx( viewPosition ), dFdy( viewPosition ) ) );",
		"	#endif",
		"}",

		"float scaleDividedByCameraFar;",
		"float minResolutionMultipliedByCameraFar;",

		"float getOcclusion( const in vec3 centerViewPosition, const in vec3 centerViewNormal, const in vec3 sampleViewPosition ) {",
		"	vec3 viewDelta = sampleViewPosition - centerViewPosition;",
		"	float viewDistance = length( viewDelta );",
		"	float scaledScreenDistance = scaleDividedByCameraFar * viewDistance;",

		"	return max(0.0, (dot(centerViewNormal, viewDelta) - minResolutionMultipliedByCameraFar) / scaledScreenDistance - bias) / (1.0 + pow2( scaledScreenDistance ) );",
		"}",

		"// moving costly divides into consts",
		"const float ANGLE_STEP = PI2 * float( NUM_RINGS ) / float( NUM_SAMPLES );",
		"const float INV_NUM_SAMPLES = 1.0 / float( NUM_SAMPLES );",

		"float getAmbientOcclusion( const in vec3 centerViewPosition ) {",
		"	// precompute some variables require in getOcclusion.",
		"	scaleDividedByCameraFar = scale / cameraFar;",
		"	minResolutionMultipliedByCameraFar = minResolution * cameraFar;",
		"	vec3 centerViewNormal = getViewNormal( centerViewPosition, vUv );",

		"	// jsfiddle that shows sample pattern: https://jsfiddle.net/a16ff1p7/",
		"	float angle = rand( vUv + randomSeed ) * PI2;",
		"	vec2 radius = vec2( kernelRadius * INV_NUM_SAMPLES ) / size;",
		"	vec2 radiusStep = radius;",

		"	float occlusionSum = 0.0;",
		"	float weightSum = 0.0;",

		"	for( int i = 0; i < NUM_SAMPLES; i ++ ) {",
		"		vec2 sampleUv = vUv + vec2( cos( angle ), sin( angle ) ) * radius;",
		"		radius += radiusStep;",
		"		angle += ANGLE_STEP;",

		"		float sampleDepth = getDepth( sampleUv );",
		"		if( sampleDepth >= ( 1.0 - EPSILON ) ) {",
		"			continue;",
		"		}",

		"		float sampleViewZ = getViewZ( sampleDepth );",
		"		vec3 sampleViewPosition = getViewPosition( sampleUv, sampleDepth, sampleViewZ );",
		"		occlusionSum += getOcclusion( centerViewPosition, centerViewNormal, sampleViewPosition );",
		"		weightSum += 1.0;",
		"	}",

		"	if( weightSum == 0.0 ) discard;",

		"	return occlusionSum * ( intensity / weightSum );",
		"}",


		"void main() {",
		"	float centerDepth = getDepth( vUv );",
		"	if( centerDepth >= ( 1.0 - EPSILON ) ) {",
		"		discard;",
		"	}",

		"	float centerViewZ = getViewZ( centerDepth );",
		"	vec3 viewPosition = getViewPosition( vUv, centerDepth, centerViewZ );",

		"	float ambientOcclusion = getAmbientOcclusion( viewPosition );",

		"	gl_FragColor = getDefaultColor( vUv );",
		"	gl_FragColor.xyz *=  1.0 - ambientOcclusion;",
		"}"
	].join( "\n" )
};







/**
 * @author ludobaka / ludobaka.github.io
 * SAO implementation inspired from bhouston previous SAO work
 */

THREE.SAOPass = function ( scene, camera, depthTexture, useNormals, resolution ) {

	THREE.Pass.call( this );

	this.scene = scene;
	this.camera = camera;

	this.clear = true;
	this.needsSwap = false;

	this.supportsDepthTextureExtension = ( depthTexture !== undefined ) ? depthTexture : false;
	this.supportsNormalTexture = ( useNormals !== undefined ) ? useNormals : false;

	this.oldClearColor = new THREE.Color();
	this.oldClearAlpha = 1;

	this.params = {
		output: 0,
		saoBias: 0.5,
		saoIntensity: 0.18,
		saoScale: 1,
		saoKernelRadius: 100,
		saoMinResolution: 0,
		saoBlur: true,
		saoBlurRadius: 8,
		saoBlurStdDev: 4,
		saoBlurDepthCutoff: 0.01
	};

	this.resolution = ( resolution !== undefined ) ? new THREE.Vector2( resolution.x, resolution.y ) : new THREE.Vector2( 256, 256 );

	this.saoRenderTarget = new THREE.WebGLRenderTarget( this.resolution.x, this.resolution.y, {
		minFilter: THREE.LinearFilter,
		magFilter: THREE.LinearFilter,
		format: THREE.RGBAFormat
	} );
	this.blurIntermediateRenderTarget = this.saoRenderTarget.clone();
	this.beautyRenderTarget = this.saoRenderTarget.clone();

	this.normalRenderTarget = new THREE.WebGLRenderTarget( this.resolution.x, this.resolution.y, {
		minFilter: THREE.NearestFilter,
		magFilter: THREE.NearestFilter,
		format: THREE.RGBAFormat
	} );
	this.depthRenderTarget = this.normalRenderTarget.clone();

	if ( this.supportsDepthTextureExtension ) {

		var depthTexture = new THREE.DepthTexture();
		depthTexture.type = THREE.UnsignedShortType;
		depthTexture.minFilter = THREE.NearestFilter;
		depthTexture.maxFilter = THREE.NearestFilter;

		this.beautyRenderTarget.depthTexture = depthTexture;
		this.beautyRenderTarget.depthBuffer = true;

	}

	this.depthMaterial = new THREE.MeshDepthMaterial();
	this.depthMaterial.depthPacking = THREE.RGBADepthPacking;
	this.depthMaterial.blending = THREE.NoBlending;

	this.normalMaterial = new THREE.MeshNormalMaterial();
	this.normalMaterial.blending = THREE.NoBlending;

	if ( THREE.SAOShader === undefined ) {

		console.error( 'THREE.SAOPass relies on THREE.SAOShader' );

	}

	this.saoMaterial = new THREE.ShaderMaterial( THREE.SAOShader );
	this.saoMaterial.extensions.derivatives = true;
	this.saoMaterial.extensions.drawBuffers = true;
	this.saoMaterial.defines[ 'DEPTH_PACKING' ] = this.supportsDepthTextureExtension ? 0 : 1;
	this.saoMaterial.defines[ 'NORMAL_TEXTURE' ] = this.supportsNormalTexture ? 1 : 0;
	this.saoMaterial.uniforms[ 'tDepth' ].value = ( this.supportsDepthTextureExtension ) ? depthTexture : this.depthRenderTarget.texture;
	this.saoMaterial.uniforms[ 'tNormal' ].value = this.normalRenderTarget.texture;
	this.saoMaterial.uniforms[ 'size' ].value.set( this.resolution.x, this.resolution.y );
	this.saoMaterial.uniforms[ 'cameraNear' ].value = this.camera.near;
	this.saoMaterial.uniforms[ 'cameraFar' ].value = this.camera.far;
	this.saoMaterial.uniforms[ 'cameraInverseProjectionMatrix' ].value.getInverse( this.camera.projectionMatrix );
	this.saoMaterial.uniforms[ 'cameraProjectionMatrix' ].value = this.camera.projectionMatrix;
	this.saoMaterial.blending = THREE.NoBlending;

	if ( THREE.DepthLimitedBlurShader === undefined ) {

		console.error( 'THREE.SAOPass relies on THREE.DepthLimitedBlurShader' );

	}

	this.vBlurMaterial = new THREE.ShaderMaterial( {
		uniforms: THREE.UniformsUtils.clone( THREE.DepthLimitedBlurShader.uniforms ),
		defines: THREE.DepthLimitedBlurShader.defines,
		vertexShader: THREE.DepthLimitedBlurShader.vertexShader,
		fragmentShader: THREE.DepthLimitedBlurShader.fragmentShader
	} );
	this.vBlurMaterial.defines[ 'DEPTH_PACKING' ] = this.supportsDepthTextureExtension ? 0 : 1;
	this.vBlurMaterial.uniforms[ 'tDiffuse' ].value = this.saoRenderTarget.texture;
	this.vBlurMaterial.uniforms[ 'tDepth' ].value = ( this.supportsDepthTextureExtension ) ? depthTexture : this.depthRenderTarget.texture;
	this.vBlurMaterial.uniforms[ 'cameraNear' ].value = this.camera.near;
	this.vBlurMaterial.uniforms[ 'cameraFar' ].value = this.camera.far;
	this.vBlurMaterial.uniforms[ 'size' ].value.set( this.resolution.x, this.resolution.y );
	this.vBlurMaterial.blending = THREE.NoBlending;

	this.hBlurMaterial = new THREE.ShaderMaterial( {
		uniforms: THREE.UniformsUtils.clone( THREE.DepthLimitedBlurShader.uniforms ),
		defines: THREE.DepthLimitedBlurShader.defines,
		vertexShader: THREE.DepthLimitedBlurShader.vertexShader,
		fragmentShader: THREE.DepthLimitedBlurShader.fragmentShader
	} );
	this.hBlurMaterial.defines[ 'DEPTH_PACKING' ] = this.supportsDepthTextureExtension ? 0 : 1;
	this.hBlurMaterial.uniforms[ 'tDiffuse' ].value = this.blurIntermediateRenderTarget.texture;
	this.hBlurMaterial.uniforms[ 'tDepth' ].value = ( this.supportsDepthTextureExtension ) ? depthTexture : this.depthRenderTarget.texture;
	this.hBlurMaterial.uniforms[ 'cameraNear' ].value = this.camera.near;
	this.hBlurMaterial.uniforms[ 'cameraFar' ].value = this.camera.far;
	this.hBlurMaterial.uniforms[ 'size' ].value.set( this.resolution.x, this.resolution.y );
	this.hBlurMaterial.blending = THREE.NoBlending;

	if ( THREE.CopyShader === undefined ) {

		console.error( 'THREE.SAOPass relies on THREE.CopyShader' );

	}

	this.materialCopy = new THREE.ShaderMaterial( {
		uniforms: THREE.UniformsUtils.clone( THREE.CopyShader.uniforms ),
		vertexShader: THREE.CopyShader.vertexShader,
		fragmentShader: THREE.CopyShader.fragmentShader,
		blending: THREE.NoBlending
	} );
	this.materialCopy.transparent = true;
	this.materialCopy.depthTest = false;
	this.materialCopy.depthWrite = false;
	this.materialCopy.blending = THREE.CustomBlending;
	this.materialCopy.blendSrc = THREE.DstColorFactor;
	this.materialCopy.blendDst = THREE.ZeroFactor;
	this.materialCopy.blendEquation = THREE.AddEquation;
	this.materialCopy.blendSrcAlpha = THREE.DstAlphaFactor;
	this.materialCopy.blendDstAlpha = THREE.ZeroFactor;
	this.materialCopy.blendEquationAlpha = THREE.AddEquation;

	if ( THREE.CopyShader === undefined ) {

		console.error( 'THREE.SAOPass relies on THREE.UnpackDepthRGBAShader' );

	}

	this.depthCopy = new THREE.ShaderMaterial( {
		uniforms: THREE.UniformsUtils.clone( THREE.UnpackDepthRGBAShader.uniforms ),
		vertexShader: THREE.UnpackDepthRGBAShader.vertexShader,
		fragmentShader: THREE.UnpackDepthRGBAShader.fragmentShader,
		blending: THREE.NoBlending
	} );

	this.quadCamera = new THREE.OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );
	this.quadScene = new THREE.Scene();
	this.quad = new THREE.Mesh( new THREE.PlaneGeometry( 2, 2 ), null );
	this.quadScene.add( this.quad );

};

THREE.SAOPass.OUTPUT = {
	'Beauty': 1,
	'Default': 0,
	'SAO': 2,
	'Depth': 3,
	'Normal': 4
};

THREE.SAOPass.prototype = Object.assign( Object.create( THREE.Pass.prototype ), {
	constructor: THREE.SAOPass,

	render: function ( renderer, writeBuffer, readBuffer, delta, maskActive ) {

		// Rendering readBuffer first when rendering to screen
		if ( this.renderToScreen ) {

			this.materialCopy.blending = THREE.NoBlending;
			this.materialCopy.uniforms[ 'tDiffuse' ].value = readBuffer.texture;
			this.materialCopy.needsUpdate = true;
			this.renderPass( renderer, this.materialCopy, null );

		}

		if ( this.params.output == 1 ) {
			// console.error("return", this.params.output);

			return;

		}

		this.oldClearColor.copy( renderer.getClearColor() );
		this.oldClearAlpha = renderer.getClearAlpha();
		var oldAutoClear = renderer.autoClear;
		renderer.autoClear = false;

		renderer.setRenderTarget( this.depthRenderTarget );
		renderer.clear( this.depthRenderTarget );

		this.saoMaterial.uniforms[ 'bias' ].value = this.params.saoBias;
		this.saoMaterial.uniforms[ 'intensity' ].value = this.params.saoIntensity;
		this.saoMaterial.uniforms[ 'scale' ].value = this.params.saoScale;
		this.saoMaterial.uniforms[ 'kernelRadius' ].value = this.params.saoKernelRadius;
		this.saoMaterial.uniforms[ 'minResolution' ].value = this.params.saoMinResolution;
		// this.saoMaterial.uniforms['randomSeed'].value = Math.random();

		var depthCutoff = this.params.saoBlurDepthCutoff * ( this.camera.far - this.camera.near );
		this.vBlurMaterial.uniforms[ 'depthCutoff' ].value = depthCutoff;
		this.hBlurMaterial.uniforms[ 'depthCutoff' ].value = depthCutoff;

		this.params.saoBlurRadius = Math.floor( this.params.saoBlurRadius );
		if ( ( this.prevStdDev !== this.params.saoBlurStdDev ) || ( this.prevNumSamples !== this.params.saoBlurRadius ) ) {

			THREE.BlurShaderUtils.configure( this.vBlurMaterial, this.params.saoBlurRadius, this.params.saoBlurStdDev, new THREE.Vector2( 0, 1 ) );
			THREE.BlurShaderUtils.configure( this.hBlurMaterial, this.params.saoBlurRadius, this.params.saoBlurStdDev, new THREE.Vector2( 1, 0 ) );
			this.prevStdDev = this.params.saoBlurStdDev;
			this.prevNumSamples = this.params.saoBlurRadius;

		}

		// Rendering scene to depth texture
		renderer.setClearColor( 0x000000 );
		renderer.render( this.scene, this.camera, this.beautyRenderTarget, true );

		// Re-render scene if depth texture extension is not supported
		if ( ! this.supportsDepthTextureExtension ) {
			console.error("SupportsDepth", this.supportsDepthTextureExtension);
			// Clear rule : far clipping plane in both RGBA and Basic encoding
			this.renderOverride( renderer, this.depthMaterial, this.depthRenderTarget, 0xffffff, 1.0 );

		}

		if ( this.supportsNormalTexture ) {
			// Clear rule : default normal is facing the camera
			this.renderOverride( renderer, this.normalMaterial, this.normalRenderTarget, 0x7777ff, 1.0 );

		}

		// Rendering SAO texture
		this.renderPass( renderer, this.saoMaterial, this.saoRenderTarget, 0xffffff, 1.0 );

		// Blurring SAO texture
		if ( this.params.saoBlur ) {

			this.renderPass( renderer, this.vBlurMaterial, this.blurIntermediateRenderTarget, 0xffffff, 1.0 );
			this.renderPass( renderer, this.hBlurMaterial, this.saoRenderTarget, 0xffffff, 1.0 );

		}

		var outputMaterial = this.materialCopy;
		// Setting up SAO rendering
		if ( this.params.output == 3 ) {

			// console.error("33333");

			if ( this.supportsDepthTextureExtension ) {

				// console.error("333 - 1");

				this.materialCopy.uniforms[ 'tDiffuse' ].value = this.beautyRenderTarget.depthTexture;
				this.materialCopy.needsUpdate = true;

			} else {

				// console.error("333 - 2");

				this.depthCopy.uniforms[ 'tDiffuse' ].value = this.depthRenderTarget.texture;
				this.depthCopy.needsUpdate = true;
				outputMaterial = this.depthCopy;

			}

		} else if ( this.params.output == 4 ) {

			// console.error("444 - 1");

			this.materialCopy.uniforms[ 'tDiffuse' ].value = this.normalRenderTarget.texture;
			this.materialCopy.needsUpdate = true;

		} else {

			// console.error("444 - 2");

			this.materialCopy.uniforms[ 'tDiffuse' ].value = this.saoRenderTarget.texture;
			this.materialCopy.needsUpdate = true;

		}

		// Blending depends on output, only want a CustomBlending when showing SAO
		if ( this.params.output == 0 ) {

			// console.error("000 - 1");

			outputMaterial.blending = THREE.CustomBlending;

		} else {

			// console.error("000 - 2");

			outputMaterial.blending = THREE.NoBlending;

		}

		// Rendering SAOPass result on top of previous pass
		this.renderPass( renderer, outputMaterial, this.renderToScreen ? null : readBuffer );

		renderer.setClearColor( this.oldClearColor, this.oldClearAlpha );
		renderer.autoClear = oldAutoClear;

	},

	renderPass: function ( renderer, passMaterial, renderTarget, clearColor, clearAlpha ) {

		// save original state
		var originalClearColor = renderer.getClearColor();
		var originalClearAlpha = renderer.getClearAlpha();
		var originalAutoClear = renderer.autoClear;

		// setup pass state
		renderer.autoClear = false;
		var clearNeeded = ( clearColor !== undefined ) && ( clearColor !== null );
		if ( clearNeeded ) {

			renderer.setClearColor( clearColor );
			renderer.setClearAlpha( clearAlpha || 0.0 );

		}

		this.quad.material = passMaterial;
		renderer.render( this.quadScene, this.quadCamera, renderTarget, clearNeeded );

		// restore original state
		renderer.autoClear = originalAutoClear;
		renderer.setClearColor( originalClearColor );
		renderer.setClearAlpha( originalClearAlpha );

	},

	renderOverride: function ( renderer, overrideMaterial, renderTarget, clearColor, clearAlpha ) {

		var originalClearColor = renderer.getClearColor();
		var originalClearAlpha = renderer.getClearAlpha();
		var originalAutoClear = renderer.autoClear;

		renderer.autoClear = false;

		clearColor = overrideMaterial.clearColor || clearColor;
		clearAlpha = overrideMaterial.clearAlpha || clearAlpha;
		var clearNeeded = ( clearColor !== undefined ) && ( clearColor !== null );
		if ( clearNeeded ) {

			renderer.setClearColor( clearColor );
			renderer.setClearAlpha( clearAlpha || 0.0 );

		}

		this.scene.overrideMaterial = overrideMaterial;
		renderer.render( this.scene, this.camera, renderTarget, clearNeeded );
		this.scene.overrideMaterial = null;

		// restore original state
		renderer.autoClear = originalAutoClear;
		renderer.setClearColor( originalClearColor );
		renderer.setClearAlpha( originalClearAlpha );

	},

	setSize: function ( width, height ) {

		this.beautyRenderTarget.setSize( width, height );
		this.saoRenderTarget.setSize( width, height );
		this.blurIntermediateRenderTarget.setSize( width, height );
		this.normalRenderTarget.setSize( width, height );
		this.depthRenderTarget.setSize( width, height );

		this.saoMaterial.uniforms[ 'size' ].value.set( width, height );
		this.saoMaterial.uniforms[ 'cameraInverseProjectionMatrix' ].value.getInverse( this.camera.projectionMatrix );
		this.saoMaterial.uniforms[ 'cameraProjectionMatrix' ].value = this.camera.projectionMatrix;
		this.saoMaterial.needsUpdate = true;

		this.vBlurMaterial.uniforms[ 'size' ].value.set( width, height );
		this.vBlurMaterial.needsUpdate = true;

		this.hBlurMaterial.uniforms[ 'size' ].value.set( width, height );
		this.hBlurMaterial.needsUpdate = true;
	}

} );



/**
 * Screen-space ambient occlusion pass.
 *
 * Has the following parameters
 *  - radius
 *  	- Ambient occlusion shadow radius (numeric value).
 *  - onlyAO
 *  	- Display only ambient occlusion result (boolean value).
 *  - aoClamp
 *  	- Ambient occlusion clamp (numeric value).
 *  - lumInfluence
 *  	- Pixel luminosity influence in AO calculation (numeric value).
 * 
 * To output to screen set renderToScreens true
 *
 * @author alteredq / http://alteredqualia.com/
 * @author tentone
 * @class SSAOPass
 */
THREE.SSAOPass = function ( scene, camera, width, height ) {

	if ( THREE.SSAOShader === undefined) {

		console.warn( 'THREE.SSAOPass depends on THREE.SSAOShader' );
		return new THREE.ShaderPass();

	}

	THREE.ShaderPass.call( this, THREE.SSAOShader );

	this.width = ( width !== undefined ) ? width : 512;
	this.height = ( height !== undefined ) ? height : 256;

	this.renderToScreen = false;

	this.camera2 = camera;
	this.scene2 = scene;

	//Depth material
	this.depthMaterial = new THREE.MeshDepthMaterial();
	this.depthMaterial.depthPacking = THREE.RGBADepthPacking;
	this.depthMaterial.blending = THREE.NoBlending;

	//Depth render target
	this.depthRenderTarget = new THREE.WebGLRenderTarget( this.width, this.height, { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter } );
	//this.depthRenderTarget.texture.name = 'SSAOShader.rt';
	
	//Shader uniforms
	this.uniforms[ 'tDepth' ].value = this.depthRenderTarget.texture;
	this.uniforms[ 'size' ].value.set( this.width, this.height );
	this.uniforms[ 'cameraNear' ].value = this.camera2.near;
	this.uniforms[ 'cameraFar' ].value = this.camera2.far;

	this.uniforms[ 'radius' ].value = 4;
	this.uniforms[ 'onlyAO' ].value = false;
	this.uniforms[ 'aoClamp' ].value = 0.25;
	this.uniforms[ 'lumInfluence' ].value = 0.7;

	//Setters and getters for uniforms
	var self = this;
	Object.defineProperties(this, {

		radius: {
			get: function() { return this.uniforms[ 'radius' ].value; },
			set: function( value ) { this.uniforms[ 'radius' ].value = value; }
		},

		onlyAO: {
			get: function() { return this.uniforms[ 'onlyAO' ].value; },
			set: function( value ) { this.uniforms[ 'onlyAO' ].value = value; }
		},

		aoClamp: {
			get: function() { return this.uniforms[ 'aoClamp' ].value; },
			set: function( value ) { this.uniforms[ 'aoClamp' ].value = value; }
		},

		lumInfluence: {
			get: function() { return this.uniforms[ 'lumInfluence' ].value; },
			set: function( value ) { this.uniforms[ 'lumInfluence' ].value = value; }
		},

	});
}

THREE.SSAOPass.prototype = Object.create( THREE.ShaderPass.prototype );

/**
 * Render using this pass.
 * 
 * @method render
 * @param {WebGLRenderer} renderer
 * @param {WebGLRenderTarget} writeBuffer Buffer to write output.
 * @param {WebGLRenderTarget} readBuffer Input buffer.
 * @param {Number} delta Delta time in milliseconds.
 * @param {Boolean} maskActive Not used in this pass.
 */
THREE.SSAOPass.prototype.render = function( renderer, writeBuffer, readBuffer, delta, maskActive ) {

	//Render depth into depthRenderTarget
	this.scene2.overrideMaterial = this.depthMaterial;
	
	renderer.render( this.scene2, this.camera2, this.depthRenderTarget, true );
	
	this.scene2.overrideMaterial = null;


	//SSAO shaderPass
	THREE.ShaderPass.prototype.render.call( this, renderer, writeBuffer, readBuffer, delta, maskActive );

};

/**
 * Change scene to be renderer by this render pass.
 *
 * @method setScene
 * @param {Scene} scene
 */
THREE.SSAOPass.prototype.setScene = function(scene) {
	
	this.scene2 = scene;

};

/**
 * Set camera used by this render pass.
 *
 * @method setCamera
 * @param {Camera} camera
 */
THREE.SSAOPass.prototype.setCamera = function( camera ) {

	this.camera2 = camera;

	this.uniforms[ 'cameraNear' ].value = this.camera2.near;
	this.uniforms[ 'cameraFar' ].value = this.camera2.far;

};

/**
 * Set resolution of this render pass.
 * 
 * @method setSize
 * @param {Number} width
 * @param {Number} height
 */
THREE.SSAOPass.prototype.setSize = function( width, height ) {

	this.width = width;
	this.height = height;

	this.uniforms[ 'size' ].value.set( this.width, this.height );
	this.depthRenderTarget.setSize( this.width, this.height );

};


/**
 * @author alteredq / http://alteredqualia.com/
 *
 * Unpack RGBA depth shader
 * - show RGBA encoded depth as monochrome color
 */

THREE.UnpackDepthRGBAShader = {

	uniforms: {

		"tDiffuse": { value: null },
		"opacity":  { value: 1.0 }

	},

	vertexShader: [

		"varying vec2 vUv;",

		"void main() {",

			"vUv = uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join( "\n" ),

	fragmentShader: [

		"uniform float opacity;",

		"uniform sampler2D tDiffuse;",

		"varying vec2 vUv;",

		"#include <packing>",

		"void main() {",

			"float depth = 1.0 - unpackRGBAToDepth( texture2D( tDiffuse, vUv ) );",
			"gl_FragColor = opacity * vec4( vec3( depth ), 1.0 );",

		"}"

	].join( "\n" )

};
