

import { MOBaza } from './MOBaza.js';

export class MOSten extends MOBaza {
  	constructor(par,fun) {  
        super(par,fun);
  		this.type="MOSten";
        this.typeNa="SpliceSten";
  		var self=this;

        
       
        for (var i = 0; i < this.par.par.par.par.objectBase.three.length; i++) {
            if(this.par.par.par.par.objectBase.three[i].keyName=="sten"){
                this.arrayGal=this.par.par.par.par.objectBase.three[i].array;
            }
        }
       

        this.dCont=new DCont(par.dCont);

        
        this.button=undefined;
        this.slid
        this.slid1
        this.postIn=function(){
           
            this.window.title="Sten"
            this.button=new DButton(this.window.content,this.otstup1,this.otstup1,"",function(){
                self.object.clear()
            },"resources/image/p0.png");
            this.button.width=this.button.height=this.wh;

            this.button1=new DButton(this.window.content,this.otstup1*2+this.wh,this.otstup1,"",function(){
                if(this.alpha==1){
                    self.object.stage.boolText=self.object.boolText=true; 
                    this.alpha=0.5
                    return
                }else{
                    self.object.stage.boolText=self.object.boolText=false; 
                    this.alpha=1
                    return
                }                
            },"resources/image/w6.png");
            this.button1.width=this.button1.height=this.wh;



            this.slid=new DSliderBig(this.window.content, this.otstup1,this.otstup1+ (this.otstup1+this.wh)*1, function(s){ 
                self.object.delph=self.slid.value
                self.object.stage.delph=self.slid.value                
            }, "x",  5, 100)
            this.slid.width=this.width-this.otstup1*2;
            this.slid.okrug=1;

            

            this.slid1=new DSliderBig(this.window.content, this.otstup1,this.otstup1+ (this.otstup1+this.wh)*2, function(s){ 
                self.object.height=self.slid1.value;  
                self.object._addPoint.dragGG() 
                self.object._addPoint1.dragGG()              
                //self.object.stage._height=self.slid1.value                
            }, "height",  10, 300)
            this.slid1.width=this.width-this.otstup1*2;
            this.slid1.okrug=1;

            
            this.gallery=new DGSten(this.window.content,this.otstup1,120+(this.otstup1+this.wh),function(s,p){
                
                if(s=="index"){
                    self.object.col3d=this.obj.id
                    self.object.stage.col3d=this.obj.id
                    return
                }
                if(s=="index1"){
                    self.object.col3d1=this.obj.id
                    self.object.stage.col3d1=this.obj.id
                    return
                }
                if(s=="indexBig"){
                    self.object.col3d=this.obj.id
                    self.object.col3d1=this.obj.id

                    self.object.stage.col3d=this.obj.id
                    self.object.stage.col3d1=this.obj.id
                    return
                }
            },this) 
            this.gallery.kolII=3;
            this.gallery.widthPic=64;
            this.gallery.heightPic=64;
            this.gallery.width=66*this.gallery.kolII+2;


            for (var i = 0; i < this.arrayGal.length; i++) {
                this.arrayGal[i].typeThree="Sten3D"
                this.arrayGal[i].title=""
                this.arrayGal[i].src="resources/data/"+this.arrayGal[i].id+"/128.png"
            }
            this.gallery.start(this.arrayGal);
            this.gallery.height=Math.ceil(this.arrayGal.length/this.gallery.kolII)*66+2
            this.window.height=this.gallery.height+this.gallery.y+this.otstup1+32;
        }        
        
        this.drag=function(){
            self.slid.value=self.object.delph; 
            self.slid1.value=self.object.height;           
            for (var i = 0; i < self.arrayGal.length; i++) {
                if(self.arrayGal[i].id==self.object.col3d)self.gallery.index=i;
                if(self.arrayGal[i].id==self.object.col3d1)self.gallery.index1=i;
            }

          
            if(!self.object.boolText)self.button1.alpha=1
            else self.button1.alpha=0.5
        }



       

        this.postSO=function(){ 
            this.object.funDragMenu=this.drag 
            this.drag();
        }
        this.clear=function(){
            if(this.object!=undefined){
                this.object.funDragMenu=undefined;
            }
            this.active=false
        }


        this.sizeWindow = function(w,h,s){ 
            this.dCont.x=w/s-this.width       
        }
  	}

  

}



export class DGSten extends DGallery {
    constructor(dCont, _x, _y, _fun, par) {  
        super(dCont, _x, _y, _fun);
        this.par=par
    

        this._index=-1;
        this._index1=-1;
        this.par=par
        var self=this

        // Функция клика по иконке
        this.downBtn = function (s,p) {
            if(s=="index")self.index = this.idArr; 
            if(s=="index1")self.index1 = this.idArr; 

            if(s=="indexBig"){
                self.index = this.idArr;
                self.index1 = this.idArr;
            } 
            
            self.obj = self.array[this.idArr].object;
            if (self.fun) self.fun(s,p);
        };


        this.createZamen=function(){ 
            var r=new DGBox(this.content, 0, 0, this.downBtn,  this);                 
            return r;
        }

        var aa=0.3
        this.dragIndex=function(){ 
            for (var i = 0; i < this.array.length; i++) {
                if(this._index1 == i||this._index == i){
                    if (this._index == i) {
                        this.array[i].activ = true;
                        this.array[i].setAct(0,true)                      
                        if (this._index1 != i)this.array[i].setAct(1,false)
                    }
                    if (this._index1 == i) {
                        this.array[i].activ = true;
                        this.array[i].setAct(1,true)  
                        if (this._index != i)this.array[i].setAct(0,false)
                    }

                }else {
                    this.array[i].activ = false;
                    this.array[i].setAct(0,false)
                    this.array[i].setAct(1,false)                   
                }
            } 

        }
    }

    set index(value) {   
        this._index = value;
        this.dragIndex()
    }    
    get index() { return  this._index;} 



    set index1(value) {      
        this._index1 = value;
        this.dragIndex()
    }    
    get index1() { return  this._index1;}


    
}
export class DGBox extends DBox {
    constructor(_cont, _x, _y, _fun,par) {  
        super(_cont, _x, _y, _fun);
        this.par=par
        this.dragPic=this.par.par.par.dragPic
        trace("adfs",this.dragPic)
        var self=this
        var otstup=2
        var wh=12
        var ab=[]
        ab[0]=new DButton(this.content,otstup,otstup,"",function(){
            self.fun("index");
        });
        ab[0].width=ab[0].height=wh;
        ab[0].borderRadius=wh;

        ab[1]=new DButton(this.content,44+otstup,otstup,"",function(){
            self.fun("index1");
        });
        ab[1].width=ab[1].height=wh;
        ab[1].borderRadius=wh;
        
        this.setAct=function(p,a){
            if(a==true){
                ab[p].alpha=1;
                ab[p].color=dcmParam.activButton;
            }else{
                ab[p].alpha=0.2;
                ab[p].color=dcmParam.color;
            }
        }


        this.down = function (e) {  
            
            if (self.fun) self.fun("indexBig");
        }
        this.drag = function (e) {
            
            var o=self.object;
            var l="resources/data/"+self.object.id+"/original.png";            
            self.dragPic.start(32, l, o); 
        }

        this.mouseDownNew = function (e) {
            self.dragPic.testDrag(5, self.down, self.drag);           
        };


        if(dcmParam.mobile==false){
            this.image.image.removeEventListener("mousedown", this.mouseDown)
            this.panel.div.removeEventListener("mousedown", this.mouseDown)
            }else{
            this.image.image.removeEventListener("touchstart", this.mouseDown)
            this.panel.div.removeEventListener("touchstart", this.mouseDown)
        }

        



        if(dcmParam.mobile==false){
            this.image.image.addEventListener("mousedown", this.mouseDownNew)
            this.panel.div.addEventListener("mousedown", this.mouseDownNew)
            }else{
            this.image.image.addEventListener("touchstart", this.mouseDownNew)
            this.panel.div.addEventListener("touchstart", this.mouseDownNew)
        }
    }
}

