

import { MOBaza } from './MOBaza.js';


export class PPoint extends MOBaza {
  	constructor(par,fun) {  
        super(par,fun);
  		this.type="PPoint";

  		var self=this;
        this.fun=fun

        this._index=-1;

        this._open=false;

        this.dCont=new DCont(par.dCont);
        this.dContB=new DCont(this.dCont);
        this.visi3D= this.par.par.visi3D;

        this.pOpen = new PPointOpen(this,function(s,p){

        })

        var aBut=false
        var aBut1=false
        this.arrConf=[];

        var blok
        var arKu
        if(mainBig.debug==true){

            let b=false
            if(mainBig.objectBase.points==undefined){mainBig.objectBase.points={};b=true}
            if(mainBig.objectBase.points.array==undefined){
                mainBig.objectBase.points.array=[];
            b=true}

            //if(mainBig.objectBase.points.at==undefined){
                mainBig.objectBase.points.at=[]
                mainBig.objectBase.points.at.push({ wh:40, radius:18, aPic:["resources/image/b0.png","resources/image/b1.png","resources/image/b2.png","resources/image/b3.png"]});
                mainBig.objectBase.points.at.push({ wh:20, radius:8, aPic:["resources/image/b0.png","resources/image/b1.png","resources/image/b2.png","resources/image/b3.png"]});
                b=true;
            //}


            if(b)self.par.par.locSave.saveTime();



            this.but0=new ButTu(this.dContB,["resources/image/b0.png","resources/image/b1.png"],"give Text",function(){
                aBut=this.active
                aBut1=self.but1.active=false
            })

            this.but1=new ButTu(this.dContB,["resources/image/b2.png","resources/image/b3.png"],"give Text",function(){
                aBut1=this.active
                aBut=self.but0.active=false

            })
            this.but1.dCont.y=this.but1.wh;


            this.dContB.x=20;





            this.visi3D.utility.sky.mesh.name="skyMesh"
            this.visi3D.addChildMouse(this.visi3D.utility.sky.mesh)
            this.visi3D.addEvent("down",function(e){ 
                            
                if(aBut)
                if(e!=null&&e.target){
                    if(e.target.uuid==self.visi3D.utility.sky.mesh.uuid){                        
                        var o={
                            time:new Date().getTime(),
                            x:e.point.x,
                            y:e.point.z,
                            z:-e.point.y,
                            ico:0,
                            teg:"null",
                            info:{
                                demo:"resources/image/demo.png"
                            },
                            room:self.index
                        };

                        mainBig.objectBase.points.array.push(o);
                        self.par.par.locSave.saveTime();
                        self.fun("dragPoint");
                        mainBig.glaf.scPixi.render(); 
                    } 
                    return;                  
                }
               
               /* if(aBut1&&e!=null&&e.target&&e.target.blok){                    
                    let p=-1;
                    for (var i = 0; i < mainBig.objectBase.points.array.length; i++) {
                        if(mainBig.objectBase.points.array[i].time==e.target.blok.object.time)p=i
                    }
                    if(p!=-1){
                        mainBig.objectBase.points.array.splice(p,1)
                        self.par.par.locSave.saveTime();
                        self.fun("dragPoint");
                    }
                    return;  
                }
                if(e!=null&&e.target&&e.target.blok){   
                    let p=-1;
                    for (var i = 0; i < mainBig.objectBase.points.array.length; i++) {
                        if(mainBig.objectBase.points.array[i].time==e.target.blok.object.time)p=i
                    }
                    arKu=mainBig.objectBase.points.array[p]


                    blok=e.target.blok
                    trace(self.visi3D.event3DArr)
                    self.visi3D.event3DArr.poiskName=self.visi3D.utility.sky.mesh.name

                    self.visi3D.position3d.pause=true
                    self.visi3D.addEvent("move",self.move);
                    if(dcmParam.mobile==false){            
                        document.addEventListener("mouseup", self.mouseup);
                    }else{                  
                        document.addEventListener("touchend", self.mouseup);                        
                    }
                }*/

            })

            this.move=function(e){                
                if(e!=null&&e.target){
                    if(e.target.uuid==self.visi3D.utility.sky.mesh.uuid){
                        blok.object.x=e.point.x;
                        blok.object.y=e.point.z;
                        blok.object.z=-e.point.y;
                        
                        blok.setObject(blok.object)
                        self.visi3D.intRend = 1;
                        blok.par.drag2d()
                        self.par.par.locSave.saveTime();
                        self.pOpen.active=false
                    }
                }
            }


            this.mouseup=function(e){
                self.visi3D.removeEvent("move",self.move);
                self.visi3D.position3d.pause=false
                self.visi3D.event3DArr.poiskName='xzPoisk'
                blok=undefined;

                if(dcmParam.mobile==false){            
                    document.removeEventListener("mouseup", self.mouseup);
                }else{                  
                    document.removeEventListener("touchend", self.mouseup);                    
                }
            }
        }


        this.setIndexBasa= function(objB) { 
            if(mainBig.debug==true){
                if(aBut1){//удоляшка                    
                    let p=-1;
                    for (var i = 0; i < mainBig.objectBase.points.array.length; i++) {
                        if(mainBig.objectBase.points.array[i].time==objB.object.time)p=i
                    }
                    if(p!=-1){
                        mainBig.objectBase.points.array.splice(p,1)
                        self.par.par.locSave.saveTime();
                        self.fun("dragPoint");
                    } 
                    return;                 
                }

                if(!aBut1&&!aBut){
                    let p=-1;
                    for (var i = 0; i < mainBig.objectBase.points.array.length; i++) {
                        if(mainBig.objectBase.points.array[i].time==objB.object.time)p=i
                    }
                    arKu=mainBig.objectBase.points.array[p];

                    blok=objB                    
                    self.visi3D.event3DArr.poiskName=self.visi3D.utility.sky.mesh.name

                    self.visi3D.position3d.pause=true
                    self.visi3D.addEvent("move",self.move);
                    if(dcmParam.mobile==false){            
                        document.addEventListener("mouseup", self.mouseup);
                    }else{                  
                        document.addEventListener("touchend", self.mouseup);                        
                    } 
                                       
                }

                
            }
            this.pOpen.setIndexBasa(objB)
        }

        this.fun_rotationZ= function() {          
            this.pOpen.active=false
        }

        var w,h,s
        this.sizeWindow = function(_w,_h,_s){ 
            if(_w){
                w=_w;
                h=_h;
                s=_s;
            }
            if(this.dContB&&this.but0)this.dContB.y=h/s-this.but0.wh*2-120;
        }



  	}

    set index(value) {
        if (this._index != value) {
            this._index = value;             
        }        
            
    }
    get index() { return this._index; }


    set indexSah(value) {
        if (this._indexSah != value) {
            this._indexSah = value; 
            if(this.dCont) {
                if(this._indexSah==0){
                        this.dCont.visible=true;
                    }else{
                        this.dCont.visible=false;
                    }
                }
            }          
            
    }
    get indexSah() { return this._indexSah; }
}



export class ButTu  {
    constructor(dC,a,t,fun) {          
        this.type="ButTu";
        var self=this;
        this.fun=fun
        this.arr=a;

        this.wh=40;
        this._active=false;
        this.dCont=new DCont(dC);
        this.batton=new DButton(this.dCont,0,0," ",function(){
            self.active=!self.active;
            self.fun()
        },this.arr[0])
        this.batton.width=this.batton.height=this.wh


        this.label=new DLabel(this.dCont,this.wh+5,(this.wh-18)/2,t)
        this.label.width=200
        this.label.div.style.pointerEvents="none";

    }
    set active(value) {
        if (this._active != value) {
            this._active = value;
            if(value){
                this.batton.loadImeg(this.arr[1])
            }else{
                this.batton.loadImeg(this.arr[0])
            }
        } 
    }
    get active() { return this._active; }
}


export class PPointOpen extends MOBaza {
    constructor(par,fun) {  
        super(par,fun);
        this.type="PPointOpen";
        this.dCont=new DCont(par.dCont);
        this._active=false
        this.dCont.visible = this._active;

        this.image=new DImage(this.dCont,0,0,null,function(){
            this.visible=true;
            this.width=this.picWidth;
            this.height=this.picHeight;
            this.y=-this.height/2;            
        })
        this.image.visible=false;

       // new DPanel(this.dCont)

        this.setIndexBasa= function(objB) { 
            trace("setIndexBasa",objB)
            this.dCont.x=objB.content2d.x
            this.dCont.y=objB.content2d.y
            this.active=true;
            this.image.link=objB.object.info.demo
        }


    }
    set active(value) {
        if (this._active != value) {
            this._active = value;
            this.dCont.visible = value

        } 
    }
    get active() { return this._active; }
}