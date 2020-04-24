
import { FileLoad } from './FileLoad.js';
export class MLeft  {
  	constructor(par,fun) {  		
  		this.type="MLeft";
  		var self=this;
        this.par=par
        this.fun=fun

        this.otstup=this.par.otstup;
        this.otstup1=this.par.otstup1;
        this.wh=this.par.wh;


        this._index=-1;
        this._tipVisi=-1;
        this._tipDrav=-1;
        this.dCont=new DCont(par.dCont);
        this.dCont.x=this.otstup;
        this.dCont.y=this.otstup;

        this.objectBase=undefined;
        this.objThree=undefined;
        this.panel=undefined;

        this.array=[];


        this.init=function(o){            
            this.objectBase=o;
            for (var i = 0; i < o.three.length; i++) {                
                if(o.three[i].keyName=="MLeft"){
                    this.objThree=o.three[i]
                }
            }

            for (var i = 0; i < this.objThree.array.length; i++) {
                this.array[i]= new MLButGal(this,this.drag,i,this.objThree.array[i])
                if(i==8)this.array[i].init()
            }

            this.index=0;
        }

        this.drag=function(s,p){
            if(s=="gallery"){
                self.korektGallery(s,p)
                return
            }            
            self.fun(s,p);    
        } 

        this.korektGallery=function(s,p){            
            if(p.idArr==0) {//Стрелка 2д/3д
                self.fun("tipVisi",p.index); 
            } 
            if(p.idArr==1) {//Стрелка 2д/3д
                self.fun("tipDrav",p.index); 
            } 
        }

        this.init(this.par.par.par.objectBase); 

    
  		this.sizeWindow = function(w,h,s) {
  		}

        this.setObj= function(o){            
            let index=0;
            if(o.sBase.point!=null)index=1
            this.array[1].index=index                             
        }
  	}

    set index(value) {        
        if(this._index!=value){ 
            this._index= value          
            for (var i = 0; i < this.array.length; i++) {
                if(i==this._index){                    
                    this.array[i].active=true;
                }else{
                    this.array[i].active=false;
                }

            }       
        }
    }    
    get index() { return  this._index;} 

    set tipVisi(value) {
        if(this._tipVisi!=value){
            this._tipVisi= value;
            this.array[0].startIndex=value;       
        }
    }    
    get tipVisi() { return  this._tipVisi;}

    set tipDrav(value) {
        if(this._tipDrav!=value){
            this._tipDrav= value;
            this.array[1].startIndex=value;  
        }
    }    
    get tipDrav() { return  this._tipDrav;}   

}

export class MLButGal  {
    constructor(par,fun,idArr,obj) { 
        this.type="MLButGal";
        var self=this;
        this.par=par
        this.fun=fun
        this.idArr=idArr
        this.obj=obj

        this._active=false;
        this._startIndex=-1;
        this._index=-1;


        this.otstup=this.par.otstup;
        this.otstup1=this.par.otstup1;
        this.wh=this.par.wh;

        this.gallery=undefined

        this.dCont=new DCont(par.dCont);        
        this.button=new DButton(this.dCont,0,idArr*(this.wh+this.otstup),"",function(s){
            
            if(self.idArr==8){
                self.fileLoad.set(this.files)               
                return
            }

            self.fun("index",self.idArr);
        },"resources/data/"+obj.id+"/100.png");
        this.button.width=this.button.height=this.wh;


        this.fileLoad=undefined
        this.startLoad=function(){            
            this.fileLoad=new FileLoad(this.button)
            this.button.startFile()
            global.fileLoad=this.fileLoad
        }


        this.dCGal=new DCont(this.dCont);  
        this.dCGal.x=(this.wh+this.otstup)
        var boolLoad=false;
        this.init=function(o){
            if(boolLoad==true)return  
            boolLoad=true    
            if(this.gallery!=undefined)return            
            if(this.obj.array.length!=0){                
                let b=true;
                if(b&&this.idArr==5) {
                    this.gallery=new DGalObj(this.dCGal,0,0,function(s,p){
                            
                    },this)
                    b=false;
                }    

                if(b) {
                    this.gallery=new DGallery(this.dCGal,0,0,function(){
                        var o={}
                        o.idArr=self.idArr;
                        o.index=this.index;
                        o.obj=this.obj;
                        self.fun("gallery", o);
                    })                    
                }            
                this.gallery.kolII=1;
                this.gallery.widthPic=64;
                this.gallery.heightPic=64;
                this.gallery.width=66*this.gallery.kolII+2;


                for (var i = 0; i < this.obj.array.length; i++) {
                    this.obj.array[i].title=""
                    this.obj.array[i].src="resources/data/"+this.obj.array[i].id+"/128.png"
                }

                this.gallery.start(this.obj.array);

                
                
                

                if(this.obj.array.length==0){
                    this.gallery.visible=false;
                }else{
                    if(this.obj.array.length<=this.gallery.kolII){
                        this.gallery.width=66+2;                  
                    }

                    this.gallery.height=Math.ceil(this.obj.array.length/this.gallery.kolII)*66+2

                    if(this._startIndex!=-1)this.gallery.index=this._startIndex;
                }

                this.gallery.index=this._index
            }

            if(this.idArr==8){
                this.startLoad()
            }

        }
    }
    set index(value) {
        if(this._index!=value){
            this._index= value;            
            if(this.gallery)this.gallery.index=this._index
        }
    }    
    get index() { return  this._index;} 

   

    set active(value) {        
        if(this._active!=value){
            this._active= value;
            this.dCGal.visible= value;           
            this.init() 


            if(this._active==true)this.button.color=dcmParam.activButton;
            else this.button.color=dcmParam.color;

        }
    }    
    get active() { return  this._active;} 

    set startIndex(value) {
        if(this._startIndex!=value){
            this._startIndex= value;
            if(this.gallery!=undefined)this.gallery.index=value;

        }
    }    
    get startIndex() { return  this._startIndex;} 


}



////////////////////////////////////////////////////////////



export class DGalObj extends DGallery {
    constructor(dCont, _x, _y, _fun, par) {  
        super(dCont, _x, _y, _fun);
        this.par=par
       

        this._index=-1;
        this.par=par
        var self=this

        // Функция клика по иконке
        this.downBtn = function (s,p) {
          
            if (self.fun) self.fun(s,p);
        };


        this.createZamen=function(){ 
            var r=new DGOBox(this.content, 0, 0, this.downBtn,  this);                 
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
    }    
    get index() { return  this._index;} 





    
}
export class DGOBox extends DBox {
    constructor(_cont, _x, _y, _fun,par) {  
        super(_cont, _x, _y, _fun);
        this.par=par
        
        //this.dragPic=this.par.par.par.par.dragPic

        var self=this
        var otstup=2
       


        this.down = function (e) {           
            if (self.fun) self.fun("indexBig");
        }
        this.drag = function (e) {
            var o=self.object;
            o.typeThree="Blok"
            var l="resources/data/"+self.object.id+"/128.png";            
            dragPic.start(32, l, o); 
        }

        this.mouseDownNew = function (e) {
            dragPic.testDrag(5, self.down, self.drag);           
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