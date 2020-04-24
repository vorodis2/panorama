
import {BDIco} from './BDIco.js';
import {BPBlok} from './BPBlok.js';

export class BazaPoint  {
  	constructor(par, fun) {          
        this.type="BazaPoint";
        var self=this;

        this.par=par;
        this.fun=fun;


        this.visi3D= this.par.par.visi3D;
        this._indexBasa=-1

        this.content3d = new THREE.Object3D();
        this.par.content3d.add(this.content3d);

        this.c2d = new THREE.Object3D();
        this.visi3D.gpObject.add(this.c2d);
       // this.c2d.position.z=1


        




        //this.content3d

        this.arrConf=mainBig.objectBase.points.array

        this.arrayCach=[];
        this.array=[];        

        this.bdIco=new BDIco(mainBig.objectBase.points.at);


        this.mD = new THREE.Mesh(this.bdIco.gPlan,this.bdIco.mDebag);
        this.c2d.add(this.mD)
        this.mD.rotation.x=Math.PI
        //this.mD.scale.set(10,10,1)





        let sss=new DSliderBig(this.par.dCont,222,222,function(){
            self.bdIco.scale=this.value;
            self.drag2d()
        },"scale",0.001,0.01)
        sss.okrug=10000;
        sss.width=300;
        sss.value=self.bdIco.scale
        



        this.dCont=new DCont(this.par.dCont);   

        this.fun_rotationZ = function () { 
            this.drag2d()
        }

        this.drag2d = function () {
            this.c2d.updateWorldMatrix(true, true);
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].drag2d();
            }
            this.visi3D.intRend = 1;
            this.visi3D.render()
        }



        this.dragPoint = function () {             
            this.dragIndex();
        }




        this.sobPoint = function (s,p) { 

        }



        this.clean = function(){
            this.indexBasa=-1;
            for (var i = 0; i < this.arrayCach.length; i++) {
                this.arrayCach[i].life=false;
            }
            this.array=[];
        }


        this.getPoint = function(o){
            for (var i = 0; i < this.arrayCach.length; i++) {
                if(this.arrayCach[i].life==false){
                    if(this.arrayCach[i].ico==o.ico){
                        this.arrayCach[i].life=true
                        this.array.push(this.arrayCach[i]);
                        return this.arrayCach[i];
                    }
                }
            }

            this.arrayCach.push(new BPBlok(this,o,this.sobPoint))
            this.arrayCach[this.arrayCach.length-1].idArr=this.arrayCach.length-1;

            this.array.push(this.arrayCach[this.arrayCach.length-1]);
            this.arrayCach[this.arrayCach.length-1].life=true;

            return this.arrayCach[this.arrayCach.length-1];
        }


        this.dragIndex= function (o) {        
            this.clean()            
            for (var i = 0; i < this.arrConf.length; i++) {
                if(this.arrConf[i].room==this._index){                    
                    let p=this.getPoint(this.arrConf[i]);
                    p.setObject(this.arrConf[i])
                }
            }
            this.drag2d();
        }





        this.down=function(e){            
            if(e&&e.target&&e.target.blok){
                self.indexBasa=e.target.blok.idArr;
            }
        }
        this.out=function(e){            
            if(e&&e.target&&e.target.blok){
                window.document.body.style.cursor = "auto";                
                e.target.blok.active1=true;
            }
            // 
           
        }
        this.over=function(e){
            

            if(e&&e.target&&e.target.blok){
                trace(">>>",e.target.blok)
                window.document.body.style.cursor = "pointer";                  
                e.target.blok.active1=false;
            }            
            
        }


        this.visi3D.addEvent("down",this.down);
        this.visi3D.addEvent("out",this.out);
        this.visi3D.addEvent("over",this.over);




        //ап дете сцена деленая на 2 в мейне
        this.update = function () {
            
        }


        this.width=100;
        this.height=100;
        var w,h,s
        this.sizeWindow = function(_w,_h,_s){ 
            if(_w){
                w=_w;
                h=_h;
                s=_s;
            }
            this.width=w;
            this.height=h;
            
            this.mD.scale.set(w,h,1)



        }  		
  	} 

    set index(value) {
        if (this._index != value) {
            this._index = value;  
            this.dragIndex()       
            
        }
    }
    get index() { return this._index; } 

    set indexBasa(value) {
        if (this._indexBasa != value) {
            this._indexBasa = value;  
            for (var i = 0; i < this.arrayCach.length; i++) {
                if(i==this._indexBasa){
                    this.arrayCach[i].active=true
                }else{
                    this.arrayCach[i].active=false
                }
            }     
            
        }
    }
    get indexBasa() { return this._indexBasa; } 

}






