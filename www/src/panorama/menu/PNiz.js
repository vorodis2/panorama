

import { MOBaza } from './MOBaza.js';


export class PNiz extends MOBaza {
  	constructor(par,fun) {  
        super(par,fun);
  		this.type="PNiz";

  		var self=this;

        this._open=false;

        this.dCont=new DCont(par.dCont);


        this.batton=new DButton(this.dCont,20,0,"",function(){
            self.open=!self.open
        },"resources/image/button0.png");        
        this.batton.color="#ffffff";

        this.arrConf=[];

        let b=false
        if(mainBig.objectBase.teg==undefined){mainBig.objectBase.teg=[];b=true}
        if(b)self.par.par.locSave.saveTime();

        this.arrConf=mainBig.objectBase.teg;


        
        /*for (var i = 0; i < 2; i++) {            
            this.arrConf.push({src:"resources/image/button0.png",title:"xz"+i})
        }*/


        this.gallery=new DGallery(this.dCont,0,0,function(){

        });
        this.gallery.height=this.wh;
        this.gallery.start(this.arrConf);
        this.gallery.widthPic=this.gallery.heightPic=this.wh-this.otstup;
        this.gallery.kolII=222;



        this.dCMenu=undefined;
        if(mainBig.debug==true){
            this.dCMenu=new DCont(this.dCont);
            this.dCMenu.visible=false;
            this.bat=new DButton(this.dCMenu,20,200,"ADD",function(){
                self.arrConf.push({
                    src:"resources/image/pic.png",
                    src1:"resources/image/pic.png",
                    title:"xzTitle",
                    key:"xzKey"
                })
                self.gallery.start(self.arrConf)
                self.par.par.locSave.saveTime();
            });
            this.window=new DWindow(this.dCMenu,20,230,"teg");

        }



        this.sizeWindow = function(w,h,s){ 
            this.gallery.width=w/s;
            this.gallery.y=h/s-this.gallery.height;
            this.batton.y=this.gallery.y-this.batton.height;
            this.batton.x=(w/s-this.batton.width)/2;


        }
  	}

    set open(value) {
        if(this._open!=value){
            this._open= value; 
            if(value)this.batton.loadImeg("resources/image/button0_.png");
            else this.batton.loadImeg("resources/image/button0.png");                      
        }
    }    
    get open() { return  this._open;} 

    set indexSah(value) {
        if (this._indexSah != value) {
            this._indexSah = value; 
            if(this.dCMenu) {
                if(this._indexSah==1){
                        this.dCMenu.visible=true;
                    }else{
                        this.dCMenu.visible=false;
                    }
                }
            }          
            
    }
    get indexSah() { return this._indexSah; }




}
