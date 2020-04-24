

import { MOBaza } from './MOBaza.js';

export class MOPol extends MOBaza {
  	constructor(par,fun) {  
        super(par,fun);
  		this.type="MOPol";
        this.typeNa="Pol3D";
  		var self=this;

        for (var i = 0; i < this.par.par.par.par.objectBase.three.length; i++) {
            if(this.par.par.par.par.objectBase.three[i].keyName=="pol"){
                this.arrayGal=this.par.par.par.par.objectBase.three[i].array;
            }
        }

        this.dCont=new DCont(par.dCont);

        
        this.button=undefined;
        this.slid
        this.slid1
        this.postIn=function(){
           
            this.window.title="Floor"
            this.button=new DButton(this.window.content,this.otstup1,this.otstup1,"",function(){
                self.object.clear();                
            },"resources/image/p0.png");
            this.button.width=this.button.height=this.wh;


            this.button1=new DButton(this.window.content,this.otstup1*2+this.wh,this.otstup1,"",function(){
                if(this.alpha==1){
                    self.object.stage.boolText=self.object.boolText=true; 
                    this.alpha=0.5
                    self.drag();
                    return
                }else{
                    self.object.stage.boolText=self.object.boolText=false; 
                    this.alpha=1
                    self.drag();
                    return
                }                
            },"resources/image/w6.png");
            this.button1.width=this.button1.height=this.wh;



            this.panel=new DPanel(this.window.content,this.otstup1,this.otstup1+(this.otstup1+this.wh)*1);
            this.panel.width= this.window.width-this.otstup1*2
            this.panel.height=this.wh;

            this.input=new DInput(this.panel.content,this.otstup1,this.otstup1, "",function(){                
                self.object.text=this.value
                self.drag()
            });
            this.input.width= (this.window.width-this.otstup1*5)/2
            this.input.height=this.wh-this.otstup1*2;

            this.input1=new DInput(this.panel.content,this.otstup1*2+this.input.width,this.otstup1, "",function(){                
                self.object.text1=this.value
                self.drag()
            });
            this.input1.width= this.input.width
            this.input1.height=this.wh-this.otstup1*2;





            this.slid=new DSliderBig(this.window.content, this.otstup1,this.otstup1+ (this.otstup1+this.wh)*2, function(s){ 
                self.object.rotation=this.value

            }, "x",  -180, 180)
            this.slid.width=this.width-this.otstup1*2;
            this.slid.okrug=1;


            this.gallery=new DGallery(this.window.content,this.otstup1,170,function(s,p){
                self.object.col3d2=this.obj.id 
                self.object.stage.col3d2=this.obj.id               
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
            self.slid.value=self.object.rotation;            
            for (var i = 0; i < self.arrayGal.length; i++) {
                if(self.arrayGal[i].id==self.object.col3d2)self.gallery.index=i;                
            }
            if(self.object.boolText==true){
                self.panel.visible=true;
                self.input.value=self.object.text;
                self.input1.value=self.object.text1;
                self.button1.alpha=0.5

                self.slid.y=self.panel.y+self.panel.height+self.otstup1
                self.gallery.y=self.slid.y+50
                self.window.height=self.gallery.height+self.gallery.y+self.otstup1+32;

            } else{
                self.panel.visible=false;
                self.button1.alpha=1
                self.slid.y=self.panel.y+self.otstup1
                self.gallery.y=self.slid.y+50
                self.window.height=self.gallery.height+self.gallery.y+self.otstup1+32;
            }     

        }

       

        this.postSO=function(){            
            this.object.funDragMenu=this.drag
            this.drag()
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

    set index(value) {
        if(this._index!=value){
            this._index= value;
                  
        }
    }  

}
