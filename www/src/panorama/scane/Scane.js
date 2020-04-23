
/*

import { Menu } from './menu/Menu.js';*/
import { Map } from './Map.js';
import { Word } from './Word.js';


export class Scane  {
  	constructor(par, fun) {  		
  		this.type="Scane";
  		var self=this;

        this.par=par;
        this.fun=fun;

        this._index=-1 
        this.content3d = new THREE.Object3D();
        this.par.content3d.add(this.content3d);


        this.dCont=new DCont(this.par.dCont);        
        

        this.map=new Map(this,function(s,p){ 

            fun(s,p)
        })

        this.word=new Word(this,function(s,p){ 

            fun(s,p)
        })

        this.fun_rotationZ = function () { 
            
            this.map.fun_rotationZ()
        }

  		//ап дете сцена деленая на 2 в мейне
		this.update = function () {			
            //this.stairs.update();
            this.map.update();
            this.word.update();
		}

        //расчет окна
  		this.sizeWindow = function(w,h,s){    			
            this.map.sizeWindow(w,h,s)
            this.word.sizeWindow(w,h,s)      
  		}

        this.getObj= function(){          
            //return this.stairs.getObj();
        }

        this.setObj= function(o){
            //this.stairs.setObj(o)
            //this.menu.setObj(o)                      
        }
  	} 


    set index(value) {
        if (this._index != value) {
            this._index = value;  
            this.map.index=value;    
            this.word.index=value;         
        }
    }
    get index() { return this._index; } 
}

