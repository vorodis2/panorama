
/*

import { Menu } from './menu/Menu.js';
import { MInfo } from './menu/MInfo.js';



import { Grid } from './Grid.js';
import { Stairs } from './stairs/Stairs.js';*/

import { PMenu } from './menu/PMenu.js';

import { MVisi3D } from '../libMy/visi3D/MVisi3D.js';
import { SceneSB } from '../libMy/visi3D/SceneSB.js';


export class Glaf  {
  	constructor(main) {  		
  		this.type="Glaf";
  		var self=this;
  		
        this._indexSah=-1

        this.debug=main.debug;
        

        this.mobile= dcmParam.mobile
        this.scale=1;
		this.dCont=undefined;
        this.main=main
        this.par=main
        this.otstup=5;
        this._free=true;




        this.content3d = new THREE.Object3D();

        this.dCont=new DCont(document.body);        
        this.dCV=new DCont();

        this.dCVisi= new DCont(main.contentHTML)
        this.dCVisi.visible=false;
        this.dCPixi= new DCont(main.contentHTML)
        this.dCPixi.visible=false;


        this.locSave=new LocSave(this)
       /* this.saveLoacal=new SaveLoacal(this)
        this.saveProdukt=new SaveProdukt(this)*/

        this.ser = window.location.href;
        var arrParams = this.ser.split("?");   
        var aa=arrParams[0].split("index");

        this.resurs="resources/";         
        //new Calc();    

        //порезаный от пикси вювер
        this.visi3D = new MVisi3D(this.dCVisi.div, null, dcmParam.mobile, true, false, true, true);     
        this.visi3D.yes3d = true;           
        this.visi3D.groupObject.add(this.content3d);
        global.visi3D=this.visi3D

        //ловим и откидываем на сцену изменение камеры
        this.visi3D.fun_rotationZ = function () { 

            //trace(self.visi3D.rotationX, self.visi3D.rotationZ, "   ",self.visi3D.zume)
        }



        this.rec=function(c){            
            if(c.parent)this.rec(c.parent)
        }
        this.rec(self.content3d)

        //хрень принемашка ресурсов и настроек камеры для 
      /*  this.sceneSB=new SceneSB(this.visi3D);
        for (var i = 0; i <  this.sceneSB.array.length; i++) {
            if (main.objectBase.scene[this.sceneSB.array[i].name] === undefined) {
                main.objectBase.scene[this.sceneSB.array[i].name] = {};                
            }            
            this.sceneSB.array[i].setBasa(main.objectBase.scene[this.sceneSB.array[i].name]);
        }*/

        this.menu=new PMenu(this,function(s,p){   
            trace(s,p)  
            if(s=="indexSah"){
                self.indexSah = p; 
            }             
        });



  		//ап дете сцена деленая на 2 в мейне
		this.update = function () {			
            //this.stairs.update();
		}

        //расчет окна
  		this.sizeWindow = function(w,h,s){    			
  			this.scale=s;
            this.dCont.scale=s;
            this.menu.sizeWindow(w,h,s); 
            /*this.stairs.sizeWindow(w,h,s);         
            
            this.mInfo.sizeWindow(w,h,s); */           
  		}

        this.getObj= function(){          
            //return this.stairs.getObj();
        }

        this.setObj= function(o){
            //this.stairs.setObj(o)
            //this.menu.setObj(o)                      
        }

        if(mainBig.debug==true){
            this.indexSah = 0; 
        }
  	} 

    set indexSah(value) {
        if (this._indexSah != value) {
            this._indexSah = value;  
            this.menu.indexSah=value;          
            
        }
    }
    get indexSah() { return this._indexSah; } 
}



export class LocSave  {
    constructor(main) {         
        this.par=main;
        var self=this
        this.objectBase=this.par.par.objectBase
        this.php=new Php()

        this.save= function(){


            trace("@@@@",this.par.par.objectBase);
        } 


        this.save=function(){ 

            /*this.objectBase.bd=[]
            this.objectBase.materials=[]
            this.objectBase.three=[]*/
            trace(this.objectBase);
            var ss  =JSON.stringify(this.objectBase); 
            var l = "../"+this.par.resurs+"info.json"; 

            this.php.load({tip:"saveJSON", link:l, text:ss},function(e){
                //self.saveLoad()

            });       
        }

        this.sah=0
        this.saveTime=function(){
            this.sah++;
            var s=this.sah;
            setTimeout(function() {

                if(self.sah==s)self.save()
            }, 100);

        }  



    }
}
