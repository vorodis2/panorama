

import { MOBaza } from './MOBaza.js';

export class MOBlok extends MOBaza {
    constructor(par,fun) {  
        super(par,fun);
        this.type="MOBlok";
        this.typeNa="Blok";
        var self=this;



        

        this.dCont=new DCont(par.dCont);
        this.attInp=[]
        this.mobGallerys=undefined;
        this.button=undefined;
        this.slid
        this.slid1
        this.postIn=function(){
           
            this.window.title="Object"
            this.button=new DButton(this.window.content,this.otstup1,this.otstup1,"",function(){
                self.object.clear();                
            },"resources/image/p0.png");
            this.button.width=this.button.height=this.wh;


            this.button1=new DButton(this.window.content,this.otstup1+(this.otstup1+this.wh),this.otstup1,"",function(){
                self.object.mirrorW= !self.object.mirrorW;            
            },"resources/image/p1.png");
            this.button1.width=this.button1.height=this.wh;


            this.button2=new DButton(this.window.content,this.otstup1+(this.otstup1+this.wh)*2,this.otstup1,"",function(){
                self.object.mirrorD= !self.object.mirrorD;           
            },"resources/image/p2.png");
            this.button2.width=this.button2.height=this.wh;




            var yy=this.wh+this.otstup1*2;

            //Dрагеры WHD
            this.panel=new DPanel(this.window.content,this.otstup1,yy)
            this.panel.width=this.width-this.otstup1*2
            this.panel.height=32
            let hh=this.panel.height
            let ww=(this.panel.width-this.otstup*4)/3
            let ww1=18
            for (var i = 0; i < 3; i++) {
                let s="W"
                if(i==1)s="H"
                if(i==2)s="D" 

                new DLabel(this.panel.content,this.otstup+(ww+this.otstup)*i,this.otstup+8,s)

                this.attInp[i]=new DInput(this.panel.content,this.otstup+(ww+this.otstup)*i+ww1,this.otstup,s,function(){
                    let n=this.value*1;
                    let b=true
                    if( typeof n != "number")b=false;
                    if(isNaN(n))b=false;

                    if(b==false){
                        if(this.idArr==0)this.value=Math.round(self.object.width);
                        if(this.idArr==1)this.value=Math.round(self.object.height)
                        if(this.idArr==2)this.value=Math.round(self.object.depth); 
                        return 
                    } 
                       
                    n=Math.round(n);
                    if(n<1){
                        n=1;
                        this.value=n
                    }
                    
                    if(this.idArr==0)self.object.width=n;
                    if(this.idArr==1)self.object.height=n;
                    if(this.idArr==2)self.object.depth=n;    
                })
                this.attInp[i].height=hh-this.otstup*2
                this.attInp[i].width=ww-ww1
                this.attInp[i].idArr=i;
                this.attInp[i].setNum(1); 
                
               

            }

            yy+=(this.otstup1+this.panel.height);

            this.slid=new DSliderBig(this.window.content, this.otstup1,yy, function(s){ 
                self.object.rotation=this.value*Math.PI/180

            }, "rotation",  -180, 180)
            this.slid.width=this.width-this.otstup1*2
            this.slid.okrug=1

        


    

            yy+=(this.otstup1+this.wh);

            this.mobGallerys=new MOBGallerys(this,function(s,p){

            })
            this.mobGallerys.y= yy
            this.mobGallerys.dCont.x=this.otstup1
        }

        
        
        this.drag=function(){



            this.slid.value=Math.round(self.object.rotation*180/Math.PI);



            this.attInp[0].value=Math.round(self.object.width);
            this.attInp[1].value=Math.round(self.object.height);
            this.attInp[2].value=Math.round(self.object.depth);

            if(self.object._parent){
                if(self.object.parent.type=="Windows"){
                    this.slid.activMouse=false;
                    this.attInp[2].activMouse=false;
                }else{
                    this.slid.activMouse=true;
                    this.attInp[2].activMouse=true;
                }

            }



            this.mobGallerys.setAT(self.object);


            this.window.height=this.mobGallerys.y+this.mobGallerys.height+this.otstup1+32

            

        }


        this.dragGalerry=function(s,p){ 
            if(s=="drag") {
                self.drag() 
                return    
            }    
            self.mobGallerys.dragGalerry(s,p)
        }
       

        this.postSO=function(){            
            this.object.vuborBlok.funDG=this.dragGalerry
            this.object.menu=this
            this.drag()
        }
        this.clear=function(){
            if(this.object!=undefined){ 
                this.object.menu=undefined
                this.object.vuborBlok.funDG=undefined;
            }
            this.object=undefined
            this.active=false
        }


        this.sizeWindow = function(w,h,s){ 
            this.dCont.x=w/s-this.width       
        }
    }

    set index(value) {
        if(this._index!=value){
            this._index= value;
                  
        }
    }  

}


export class MOBGallerys  {
    constructor(par,fun) { 
        this.type="MOBGallerys";        
        var self=this;
        this.par=par
        this.fun=fun
        this.dCont=new DCont(this.par.window.content);

        this._y=0;
        this.height=0;
        this.at=undefined;
        this.array=[]
        this.otstup1=this.par.otstup1
        this.object


        var gal,hh,hhh
        this.setAT=function(object){
            this.at=object.at
            this.object=object
            
            this.setAT2()
        }    
        this.setAT2=function(){    
            this.clear()
            hh=0
            hhh=0
            for (var i = 0; i < this.at.length; i++) {
                
                gal=this.getGal();
                gal.y=hhh
                gal.keyName=this.at[i].keyName;
                if(this.at[i].keyName.indexOf("iz")==-1){ 
                    for (var j = 0; j < this.at[i].array.length; j++) {
                        this.at[i].array[j].src="resources/data/"+this.at[i].array[j].id+"/128.png"
                    }
                }else{
                    for (var j = 0; j < this.at[i].array.length; j++) {
                        this.at[i].array[j].src="resources/data/"+this.object.id+"/resources/"+this.at[i].array[j].name
                    } 
                }


                hh=Math.ceil(this.at[i].array.length/gal.kolII)*66+2

                gal.height=hh;               

                hhh+=hh+2
                gal.start(this.at[i].array) 
                gal.visible=true 
                gal.index=-1  
                if(this.at[i].array.length==0) gal.visible=false             
            }
            this.dragGalerry()
            this.height=hhh;
        }


        this.dragGalerry=function(s,p){ 
            if(s==undefined)  {
                if(self.par.object.vuborBlok._vubor){
                    for (var i = 0; i < self.par.object.vuborBlok._vubor.length; i++) {
                        if(this.array[i]){
                            if(this.array[i].visible==true){
                                
                                this.array[i].index=self.par.object.vuborBlok._vubor[i].index
                            }
                        }                
                    }
                }                
            }  
            if(s=="reCreat")  {
                this.setAT2()
            }

        }


        var g
        this.getGal=function(){
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].visible==false){
                    this.array[i].visible=true;
                    return this.array[i]
                }
            }

            g=new MOBGal(this.dCont,0,0,function(s,p){
                
                
                self.par.object.vuborBlok.setDrag(this.keyName,this.index,true)
                
            },this) 
            g.kolII=3;
            g.widthPic=64;
            g.heightPic=64;
            g.width=66*g.kolII+2;




            this.array[this.array.length]=g
            return g;
        }


        this.clear=function(){
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].visible=false                
            }
            this.height=0;

        }



    }
    set y(value) {
        if(this._y!=value){         
            this._y= value;
            this.dCont.y= this._y;        
        }
    }    
    get y() { return  this._y;}  
} 




export class MOBGal extends DGallery {
    constructor(dCont, _x, _y, _fun, par) {  
        super(dCont, _x, _y, _fun);
        this.par=par


        this.createZamen=function(){ 
            var r=new MOBBox(this.content, 0, 0, this.downBtn,  this);                 
            return r;
        }

    }    
}
export class MOBBox extends DBox {
    constructor(_cont, _x, _y, _fun,par) {  
        super(_cont, _x, _y, _fun);
        this.par=par

        var b,link;
        // Добавление картинки и текста, пошаговая загрузка.
        this.startLoad = function (_obj) {
            
           
            if(this.object!=undefined) {
                this.funLoad();
                return   
            }  
            

            this.object = _obj;

           
            if (_obj.src) {
                //this.image.visible = true;
                if (this.image.link == _obj.src) {
                    if (this.funLoad) this.funLoad();
                } else {
                    this.image.width = 100;
                    this.image.height = 100;
                    this.image.link = _obj.src;
                }
            }else{
                if (this.funLoad) this.funLoad();
            }
            this.draw();
        };
        
    }
}

