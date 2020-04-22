


import { EffectComposer } from './shaders/EffectComposer.js';
import { RenderPass } from './shaders/RenderPass.js';
import { OutlinePass } from './shaders/OutlinePass.js';

import { ShaderPass } from './shaders/ShaderPass.js';
import { FXAAShader } from './shaders/FXAAShader.js';

export default class MEffectArray  {
  	constructor(_visi3D, _startArray) { 
  		this._width =100
  		this._height =100

  		this.visi3D=_visi3D

  		this._active=false;

  		this._edgeStrength= 3.0;
		this._edgeGlow= 0.0;
		this._edgeThickness= 1.0;
		this._pulsePeriod= 0;
		this._visibleEdgeColor = '#ffffff';
		this._hiddenEdgeColor = '#190a05';

		this._boolTextur= false;
		this._linkTextur= "null";





  

  		var composer = new EffectComposer( _visi3D.renderer );

  		var renderPass = new RenderPass( _visi3D.scene, _visi3D.camera );
		composer.addPass( renderPass );

		var outlinePass = new OutlinePass( new THREE.Vector2( window.innerWidth, window.innerHeight ), _visi3D.scene, _visi3D.camera );
		composer.addPass( outlinePass );
		this.outlinePass=outlinePass;






		//trace(ShaderPass)

		var effectFXAA = new ShaderPass( FXAAShader );
		effectFXAA.uniforms[ 'resolution' ].value.set( 1 / window.innerWidth, 1 / window.innerHeight );
		composer.addPass( effectFXAA );






  			

  		this.outlinePass.edgeStrength = this._edgeStrength;
		this.outlinePass.edgeGlow = this._edgeGlow;
		this.outlinePass.edgeThickness = this._edgeThickness;
		this.outlinePass.pulsePeriod = this._pulsePeriod;
		

		this.outlinePass.visibleEdgeColor.set( this._visibleEdgeColor );
		this.outlinePass.hiddenEdgeColor.set( this._hiddenEdgeColor);


		this._visibleEdgeColor = '#ffffff';
		this._hiddenEdgeColor = '#190a05';



		this.dragLink = function () {
			new THREE.TextureLoader().load( this._linkTextur, function(texture){
				outlinePass.patternTexture = texture;
				texture.wrapS = THREE.RepeatWrapping;
				texture.wrapT = THREE.RepeatWrapping;
				_visi3D.intRend=1
			} );

		}




  		this.sizeWindow = function (_width, _height) {
			this._width = _width;
			this._height = _height;			
			effectFXAA.uniforms[ 'resolution' ].value.set( 1 / _width, 1 / _height );
			composer.setSize( _width, _height );
		}

  		this.render=function(){
  			if(this._active==false)return this._active;

  			composer.render();
  			return true
  		}  	
  		
	
  		this.setValue= function(_param){  			
  			if(Array.isArray(_param)==true){
				outlinePass.selectedObjects = _param;
				return;
			}
			if(_param==null&&_param==undefined){
				outlinePass.selectedObjects = [];
				return;
			}
			outlinePass.selectedObjects = [_param];  		
  		}




  	}


  	set active(value) {
        if(this._active!=value){
            this._active= value;
            this.visi3D.intRend=1;
        }
    }    
    get active() { return  this._active;} 

  	set edgeStrength(value) {
        if(this._edgeStrength!=value){
            this._edgeStrength= value;
            this.outlinePass.edgeStrength = this._edgeStrength;
        }
    }    
    get edgeStrength() { return  this._edgeStrength;} 

  	set edgeGlow(value) {
        if(this._edgeGlow!=value){
            this._edgeGlow= value;
            this.outlinePass.edgeGlow = this._edgeGlow;
        }
    }    
    get edgeGlow() { return  this._edgeGlow;} 

  	set pulsePeriod(value) {
        if(this._pulsePeriod!=value){
            this._pulsePeriod= value;
            this.outlinePass.pulsePeriod = this._pulsePeriod;
        }
    }    
    get pulsePeriod() { return  this._pulsePeriod;}

  	set linkTextur(value) {
        if(this._linkTextur!=value){
            this._linkTextur= value;
            if(this._linkTextur=="null") {
            	this.outlinePass.usePatternTexture=false;
            }  else{
            	this.outlinePass.usePatternTexture=true;
            	this.dragLink()
            }         
            
        }
    }    
    get linkTextur() { return  this._linkTextur;} 

  	set edgeStrength(value) {
        if(this._edgeStrength!=value){
            this._edgeStrength= value;
            this.outlinePass.edgeStrength = this._edgeStrength;
        }
    }    
    get edgeStrength() { return  this._edgeStrength;} 

  	set visibleEdgeColor(value) {
        if(this._visibleEdgeColor!=value){
            this._visibleEdgeColor= value;
            this.outlinePass.visibleEdgeColor.set(this._visibleEdgeColor)
        }
    }    
    get visibleEdgeColor() { return  this._visibleEdgeColor;} 


 	set hiddenEdgeColor(value) {
        if(this._hiddenEdgeColor!=value){
            this._hiddenEdgeColor= value;
            this.outlinePass.hiddenEdgeColor.set(this._hiddenEdgeColor)
        }
    }    
    get hiddenEdgeColor() { return  this._hiddenEdgeColor;} 



}

