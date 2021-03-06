
/*

import { Menu } from './menu/Menu.js';
import { MInfo } from './menu/MInfo.js';



import { Grid } from './Grid.js';
import { Stairs } from './stairs/Stairs.js';*/

import { PMenu } from './menu/PMenu.js';

import { MVisi3D } from '../libMy/visi3D/MVisi3D.js';
import { SceneSB } from '../libMy/visi3D/SceneSB.js';

import { Scane } from './scane/Scane.js';

import { DebbugPixi } from './scane/DebbugPixi.js';

export class Glaf  {
  	constructor(main) {  		
  		this.type="Glaf";
  		var self=this;
  		
        this._indexSah=-1
        this._index=-1 
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
        this.saveLoacal=new SaveLoacal(this)
        /*this.saveProdukt=new SaveProdukt(this)*/

        this.ser = window.location.href;
        var arrParams = this.ser.split("?");   
        var aa=arrParams[0].split("index");

        this.resurs="resources/";         
        //new Calc();    

        this.scPixi=new DebbugPixi();
        //this.scPixi.deb.drawPoint(255,255,22);
        main.contentHTML.appendChild(this.scPixi.div);
        this.content2d = new PIXI.Container();
        this.scPixi.content2d.addChild(this.content2d);


        //порезаный от пикси вювер
        this.visi3D = new MVisi3D(main.contentHTML, this.content2d, dcmParam.mobile, true, false, true, true);     
        //this.visi3D.yes3d = true;           
        this.visi3D.groupObject.add(this.content3d);
        global.visi3D=this.visi3D;


        //ловим и откидываем на сцену изменение камеры
        this.visi3D.fun_rotationZ = function () {             
            if(self.scane){
                self.scane.fun_rotationZ();
                self.menu.fun_rotationZ();
            }
        }

        this.rec=function(c){            
            if(c.parent)this.rec(c.parent)
        }

        this.visi3D.arrayDoRender.push(function(){
            self.scane.bazaPoint.drag2d()
            self.scPixi.render();  
        })





        //хрень принемашка ресурсов и настроек камеры для 
        var o='{"ambient":{"works":true,"active":true,"color":"#fdffff","intensity":0.71},"shadow":{"works":true,"active":true,"mapSize":4096,"color":"#8c8c8c","bias":-0.0014,"intensity":1.01,"radius":1.27,"bAlphaForCoating":false,"fixation":true,"rotationX":0.93,"rotationZ":0.73,"distance":500,"cubWidth":1000,"cubHeight":1000,"distanceUpdateShadow":65.41},"sky":{"works":true,"active":true,"color":"#ffffff","link":"null","rotZ":2.73,"radius":7008,"x":0,"y":0,"z":0},"mirror":{"works":true,"link":"resources/scane/sky/fon1.jpg","exposure":1.44,"gamma":2.87,"xz":"reflect","link1":"resources/scane/sky/fon1.jpg","exposure1":-1,"gamma1":-1},"visi3D":{"works":true,"alwaysRender":true,"fov":16,"far":47175,"minZum":0,"maxZum":1,"zume":1,"minRotationX":1.9,"maxRotationX":0,"rotationX":0.94,"rotationZ":0.17,"debug":false,"isDragPan":true,"alphaAd":false,"globZ":0,"powerZum":1},"fog":{"works":true,"active":false,"color":"#ffffff","near":0,"far":0},"effect":{"works":true,"active":false,"edgeStrength":3,"edgeGlow":0,"pulsePeriod":0,"linkTextur":"null","visibleEdgeColor":"#ffffff","hiddenEdgeColor":"#190a05"}}'
        var o='{"ambient":{"works":true,"active":true,"color":"#fdffff","intensity":0.71},"shadow":{"works":true,"active":true,"mapSize":4096,"color":"#8c8c8c","bias":-0.0014,"intensity":1.01,"radius":1.27,"bAlphaForCoating":false,"fixation":true,"rotationX":0.93,"rotationZ":0.73,"distance":500,"cubWidth":1000,"cubHeight":1000,"distanceUpdateShadow":65.41},"sky":{"works":true,"active":true,"color":"#ffffff","link":"null","rotZ":2.73,"radius":7008,"x":0,"y":0,"z":0},"mirror":{"works":true,"link":"resources/scane/sky/fon1.jpg","exposure":1.44,"gamma":2.87,"xz":"reflect","link1":"resources/scane/sky/fon1.jpg","exposure1":-1,"gamma1":-1},"visi3D":{"works":true,"alwaysRender":true,"fov":16,"far":47175,"minZum":0,"maxZum":10942,"zume":289,"minRotationX":1.9,"maxRotationX":0,"rotationX":0.94,"rotationZ":0.17,"debug":false,"isDragPan":false,"alphaAd":false,"globZ":0,"powerZum":1},"fog":{"works":true,"active":false,"color":"#ffffff","near":0,"far":0},"effect":{"works":true,"active":false,"edgeStrength":3,"edgeGlow":0,"pulsePeriod":0,"linkTextur":"null","visibleEdgeColor":"#ffffff","hiddenEdgeColor":"#190a05"}}'
        var o='{"ambient":{"works":true,"active":true,"color":"#fdffff","intensity":0.71},"shadow":{"works":true,"active":true,"mapSize":4096,"color":"#8c8c8c","bias":-0.0014,"intensity":1.01,"radius":1.27,"bAlphaForCoating":false,"fixation":true,"rotationX":0.93,"rotationZ":0.73,"distance":500,"cubWidth":1000,"cubHeight":1000,"distanceUpdateShadow":65.41},"sky":{"works":true,"active":true,"color":"#ffffff","link":"null","rotZ":2.73,"radius":7008,"x":0,"y":0,"z":0},"mirror":{"works":true,"link":"resources/scane/sky/fon1.jpg","exposure":1.44,"gamma":2.87,"xz":"reflect","link1":"resources/scane/sky/fon1.jpg","exposure1":-1,"gamma1":-1},"visi3D":{"works":true,"alwaysRender":false,"fov":16,"far":47175,"minZum":0,"maxZum":10942,"zume":289,"minRotationX":1.9,"maxRotationX":0,"rotationX":0.94,"rotationZ":0.17,"debug":false,"isDragPan":false,"alphaAd":false,"globZ":0,"powerZum":1},"fog":{"works":true,"active":false,"color":"#ffffff","near":0,"far":0},"effect":{"works":true,"active":false,"edgeStrength":3,"edgeGlow":0,"pulsePeriod":0,"linkTextur":"null","visibleEdgeColor":"#ffffff","hiddenEdgeColor":"#190a05"}}'

        var scene=JSON.parse(o)
        this.sceneSB=new SceneSB(this.visi3D);
        for (var i = 0; i <  this.sceneSB.array.length; i++) {
            if (scene[this.sceneSB.array[i].name] === undefined) {
                scene[this.sceneSB.array[i].name] = {};                
            }            
            this.sceneSB.array[i].setBasa(scene[this.sceneSB.array[i].name]);
        }

        this.menu=new PMenu(this,function(s,p){               
            if(s=="indexSah"){
                self.indexSah = p;
                self.saveLoacal.save() 
            } 
            if(s=="dragPoint"){
                self.scane.dragPoint(p)
            }            
        });

        this.scane=new Scane(this,function(s,p){ 
            if(s=="setIndex"){                
                self.index=p;
                self.saveLoacal.save() 
            }
            if(s=="indexBasa"){                
                self.menu.setIndexBasa(p)
            }            
        })



  		//ап дете сцена деленая на 2 в мейне
		this.update = function () {			
            //this.stairs.update();
            this.scane.update();
            this.visi3D.upDate();
		}

        //расчет окна
  		this.sizeWindow = function(w,h,s){    			
  			this.scale=s;
            this.dCont.scale=s;
            this.menu.sizeWindow(w,h,s); 
            this.scane.sizeWindow(w,h,s);
            this.visi3D.sizeWindow(0,0,w,h);

            self.scPixi.width=w;
            self.scPixi.height=h;           
            self.scPixi.render()
                      
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
            this.saveLoacal.init();
        }else{
            this.index = 0;
        }
  	} 

    set indexSah(value) {
        if (this._indexSah != value) {
            this._indexSah = value;  
            this.menu.indexSah=value;          
            
        }
    }
    get indexSah() { return this._indexSah; } 


    set index(value) {
        if (this._index != value) {
            this._index = value;  
            this.menu.index=value; 
            this.scane.index=value;  
            this.menu.index=value;         
            
        }
    }
    get index() { return this._index; } 


}



export class LocSave  {
    constructor(main) {         
        this.par=main;
        var self=this
        this.objectBase=this.par.par.objectBase
        this.php=new Php()

        this.save=function(){             
            var ss  =JSON.stringify(this.objectBase); 
            var l = "../"+this.par.resurs+"info.json";            
            this.php.load({tip:"saveJSON", link:l, text:ss},function(e){

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


export class SaveLoacal  {
    constructor(par) {         
        this.type="SaveLoacal";
        this.par=par;
        this.localStorage=this.par.par.localStorage

        this.init=function(){
            if(this.localStorage.object.objSave==undefined)this.localStorage.object.objSave={}
            if(this.localStorage.object.objSave.indexSah==undefined) this.localStorage.object.objSave.indexSah=0;
            if(this.localStorage.object.objSave.index==undefined) this.localStorage.object.objSave.index=0;
            this.par.indexSah=this.localStorage.object.objSave.indexSah
            this.par.index=this.localStorage.object.objSave.index
        }

        this.save=function(){
            for(var s in this.localStorage.object.objSave){
                this.localStorage.object.objSave[s]=this.par[s];                
            }
            this.localStorage.save();
        }
    }
}

