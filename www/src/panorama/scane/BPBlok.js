

import {XZImage} from './DebbugPixi.js';

export class BPBlok  {
  	constructor(par, obj, fun) {          
        this.type="BPBlok";
        var self=this;


        this.par=par;
        this.ico=obj.ico;
        this.fun=fun;

        this.par.visi3D;
        this._life=false;

        this._active=false;
        this._active1=false;

        this.bMat=this.par.bdIco.array[obj.ico]

        this.ss=0.31


        this.content3d = new THREE.Object3D();
        this.mesh = new THREE.Mesh(this.par.bdIco.gSphere,this.par.bdIco.mDebag);
        this.content3d.add(this.mesh);



        this.content2d = new PIXI.Container();
        
  





       /* this.c2d = new THREE.Object3D();        
        this.mesh = new THREE.Mesh(this.par.bdIco.gCylinder,this.par.bdIco.mDebag);
        this.mesh.rotation.x=Math.PI/2;
        this.c2d.add(this.mesh);


        this.mesh.scale.set(this.ss*this.bMat.radius,0.001,this.ss*this.bMat.radius);
        this.mesh.blok=this;

        this.mesh1 = new THREE.Mesh(this.par.bdIco.gPlan,this.bMat.material);
        this.mesh1.scale.set(this.ss*this.bMat.wh,this.ss*this.bMat.wh,this.ss*this.bMat.wh);
        this.mesh1.rotation.x=Math.PI;

        this.c2d.add(this.mesh1);*/

        this.arrayImage=[]
        for (var i = 0; i < 2; i++) {
            this.arrayImage[i]=new XZImage(this.content2d,-this.bMat.wh/2,-this.bMat.wh/2, this.bMat.obj.aPic[i])
            this.arrayImage[i].width=this.arrayImage[i].height=this.bMat.wh
            this.arrayImage[i].visible=false
        }

        this.graphics = new PIXI.Graphics();
        this.content2d.addChild(this.graphics);
        this.graphics.beginFill(0xff0000, 0.0);
        this.graphics.drawCircle(0,0,this.bMat.radius);
        this.graphics.interactive = true;
        this.graphics.buttonMode = true;

        this.graphics.blok=true

        this.debagDragPoint = function (num,w,r) {
            if(num==this.ico){
                for (var i = 0; i < this.arrayImage.length; i++) {  
                    this.arrayImage[i].width=this.arrayImage[i].height=w;                    
                    this.arrayImage[i].x=this.arrayImage[i].y=-w/2;
                    this.graphics.clear();
                    this.graphics.beginFill(0xff0000, 0.5);
                    this.graphics.drawCircle(0,0,r);
                }
            }

        }


        this.pNull=new THREE.Vector3(0,0,0);

        this.object=undefined    
        this.setObject= function (o) { 
            this.object=o; 
            this.content3d.position.set(o.x, o.y, o.z);
            this.content3d.updateMatrixWorld();
        }

        this.drag2d = function () {
            let p=this.content3d.localToWorld(this.pNull.clone());
            this.toScreenXY(p);
            this.content2d.x=vectorScreen.x;
            this.content2d.y=vectorScreen.y;
        }


        var vectorScreen = new THREE.Vector2(0,0);  
        this.toScreenXY = function(vector3) { //
            vector3.project( visi3D.camera );
            vectorScreen.x = Math.round( (   vector3.x  ) * visi3D._width/2+visi3D._width/2);
            vectorScreen.y = Math.round( ( - vector3.y  ) * visi3D._height/2+visi3D._height/2);            
        }



        this.dragActive = function() { //
            let sah=0;
            if(this._active==true){
                sah=1;
                /*if(this._active1==true){
                    sah=2;
                }else{
                    sah=3;
                }*/
            }else{
                /*if(this._active1==true){
                    sah=0;
                }else{
                    sah=1;
                }*/
            }

            for (var i = 0; i < this.arrayImage.length; i++) {               
                if(i==sah)this.arrayImage[i].visible = true;
                else this.arrayImage[i].visible = false;

                if(this._active1)this.arrayImage[i].alpha=0.5
                else this.arrayImage[i].alpha=1
            }
        }
        this.dragActive();
        this.setObject(obj);  


        this.onDown = function (e) {
            self.fun("indexBasa", self); 
            mainBig.glaf.scPixi.render(); 
        }

        this.mouseOut = function (e) {
            self.active1=false;
            mainBig.glaf.scPixi.render(); 
        }

        this.mouseOver = function (e) {
            self.active1=true;
            mainBig.glaf.scPixi.render(); 
        }


        this.graphics.on('mousedown', this.onDown);
        this.graphics.on('mouseout', this.mouseOut);
        this.graphics.on('mouseover', this.mouseOver);



  	} 

    set active(value) {
        if (this._active != value) {
            this._active = value;                       
            this.dragActive()
        }
    }
    get active() { return this._active; } 

    set active1(value) {
        if (this._active1 != value) {
            this._active1 = value;                       
            this.dragActive()
        }
    }
    get active1() { return this._active1; }     


    set life(value) {
        if (this._life != value) {
            this._life = value; 
            if(value==true) {              
                this.par.content3d.add(this.content3d);
                this.par.content2d.addChild(this.content2d);
            }else{
                this.par.content3d.remove(this.content3d);                
                this.par.content2d.removeChild(this.content2d);
            }             
            
        }
    }
    get life() { return this._life; } 
}


