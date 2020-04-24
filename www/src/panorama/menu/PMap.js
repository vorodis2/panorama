

import { MOBaza } from './MOBaza.js';


export class PMap extends MOBaza {
  	constructor(par,fun) {  
        super(par,fun);
  		this.type="PMap";

  		var self=this;

        this._open=false;

        this.dCont=new DCont(par.dCont);


       /* this.batton=new DButton(this.dCont,20,0,"",function(){
            self.open=!self.open
            self.sizeWindow()
        },"resources/image/button0.png");        
        this.batton.color="#ffffff";*/

        this.arrConf=[];

        let b=false
        if(mainBig.objectBase.scene==undefined){mainBig.objectBase.scene={};b=true}
        if(mainBig.objectBase.scene.arrFoto==undefined){
            mainBig.objectBase.scene.arrFoto=["resources/image/pic.png","resources/image/pic.png","resources/image/pic.png","resources/image/pic.png"];
            b=true
        }
        if(mainBig.objectBase.scene.array==undefined){
            mainBig.objectBase.scene.array=[];
            b=true
        }

        if(b)self.par.par.locSave.saveTime();

        this.arrConf=mainBig.objectBase.scene.array;
        this.arrFoto=mainBig.objectBase.scene.arrFoto;

 


















        this.dCMenu=undefined;
        if(mainBig.debug==true){
            this.dCMenu=new DCont(this.dCont);
            this.dCMenu.visible=false;


            this.gallery=new GalleryXZ(this.dCMenu,20,120,function(){
                self.openObj(this.obj);            
            });
            this.gallery.height=70;
            this.gallery.width=270;

            this.gallery.start(this.arrConf);            
            this.gallery.kolII=222;


          



            
            
            this.bat=new DButton(this.dCMenu,20,200,"ADD",function(){
                self.arrConf.push({
                    src:"resources/image/pic.png",
                    src1:"resources/image/pic.png",
                    src2:"resources/image/pic.png",
                    x:100,
                    y:100,
                    title:"xzTitle",
                    key:"xzKey"
                })
                self.gallery.start(self.arrConf);
                self.par.par.locSave.saveTime();
                self.openObj(self.gallery.array[self.gallery.array.length-1].object);
                self.gallery.index=self.gallery.array.length-1;

            });


            for (var i = 0; i < this.arrFoto.length; i++) {
                let b=new DButton(this.dCMenu,122+i*34,200," "+i,function(){
                    let idArr=this.idArr
                    if(this.files[0]){
                        let a=this.files[0].name.split(".");
                        let n=new Date().getTime()+"."+a[a.length-1];                       


                        uploadFile("./../resources/d/"+n,this.files[0],function(s){  
                            self.arrFoto[idArr]="resources/d/"+n;
                            self.par.par.locSave.saveTime();                           
                        });
                    }

                })
                b.idArr=i
                b.width=32
                b.startFile("image/*");
            }




            this.window=new DWindow(this.dCMenu,20,230,"teg");
            this.window.width=220
            this.window.visible=false;


            this.batkk=new DButton(this.window,this.window.width-52,2,"clear",function(){
                if(self.arrConf[self.gallery.index]){
                    let s=self.gallery.index-1
                    if(s<0)s=0
                    self.arrConf.splice(self.gallery.index,1)
                    self.gallery.start(self.arrConf);
                    self.par.par.locSave.saveTime();
                    self.gallery.index=s
                } 
            });
            this.batkk.width=50
            this.batkk.height=28
            let sy=5
            new DLabel(this.window.content,5,sy+10,"title:")
            this.input=new DInput(this.window.content, 50,sy,"null",function(){
                self.object.title=this.value;
                self.par.par.locSave.saveTime();       

            })
            this.input.width=this.window.width-50-5
            this.input.timeFun=1

            sy+=32+5;

            new DLabel(this.window.content,5,sy+10,"teg:")
            this.input1=new DInput(this.window.content, 50, sy, "null",function(){
                self.object.key=this.value;
                self.par.par.locSave.saveTime();

            })
            this.input1.width=this.window.width-50-5;
            this.input1.timeFun=1
            sy+=32+5;


            this.battonLoad=new DButton(this.window.content, 5, sy, "null",function(){
                //this.files[0]
                
                if(this.files[0]){
                    let a=this.files[0].name.split(".")
                    let n=new Date().getTime()+"."+a[a.length-1]
                    


                    uploadFile("./../resources/d/"+n,this.files[0],function(s){                        
                        self.object.src="resources/d/"+n;
                        self.gallery.start([])
                        self.gallery.start(self.arrConf)
                        self.par.par.locSave.saveTime();
                    })
                }
            })
            this.battonLoad.width=this.window.width-10;
            this.battonLoad.startFile("image/*");
            sy+=32+5;
            this.battonLoad1=new DButton(this.window.content, 5, sy, "null",function(){
                if(this.files[0]){
                    let a=this.files[0].name.split(".");
                    let n=new Date().getTime()+"."+a[a.length-1];
                    uploadFile("./../resources/d/"+n,this.files[0],function(s){                        
                        self.object.src1="resources/d/"+n;
                        self.gallery.start([])
                        self.gallery.start(self.arrConf)
                        self.par.par.locSave.saveTime();
                    })
                }
            })
            this.battonLoad1.width=this.window.width-10;
            this.battonLoad1.startFile("image/*");

            sy+=32+5;
            this.battonLoad2=new DButton(this.window.content, 5, sy, "null",function(){
                if(this.files[0]){
                    let a=this.files[0].name.split(".");
                    let n=new Date().getTime()+"."+a[a.length-1];
                    uploadFile("./../resources/d/"+n,this.files[0],function(s){                        
                        self.object.src2="resources/d/"+n;
                        self.gallery.start([])
                        self.gallery.start(self.arrConf)
                        self.par.par.locSave.saveTime();
                    })
                }
            })
            this.battonLoad2.width=this.window.width-10;
            this.battonLoad2.startFile("image/*");
            sy+=32+5;


            this.slid=new DSliderBig(this.window.content, 5, sy, function(){
                self.object.x=this.value
                self.par.par.locSave.saveTime();
            },"x",0,1000)
            this.slid.width=this.window.width-10;
            sy+=42+5;

            this.slid1=new DSliderBig(this.window.content, 5, sy, function(){
                self.object.y=this.value
                self.par.par.locSave.saveTime();
            },"y",0,1000)
            this.slid1.width=this.window.width-10;
            sy+=42+5;

            this.window.height=sy+32;
        }

        this.object=undefined    
        this.openObj= function(obj){ 
            this.window.visible=true;
            this.object=obj;            
            this.battonLoad.text=this.object.src;
            this.battonLoad1.text=this.object.src1;
            this.battonLoad2.text=this.object.src2;
            this.input.text=this.object.title
            this.input1.text=this.object.key
            this.slid.value=this.object.x;
            this.slid1.value=this.object.y;
        }


        function uploadFile(dest, file,  fun) {
            let serverURL =  "src/phpBase.php";
            let data = new FormData();
            data.append('tip', 'saveFile');
            data.append('file', file);
            data.append('dest', dest);              
            $.ajax({
                url: serverURL,
                dataType: 'text',
                cache: false,
                contentType: false,
                processData: false,
                data: data,
                type: 'post',
                success: (function(data) {                    
                    fun(data);                   
                })
            });
        }

        var w,h,s

        this.sizeWindow = function(_w,_h,_s){ 
            if(_w){
                w=_w;
                h=_h;
                s=_s;
            }
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
                if(this._indexSah==2){
                        this.dCMenu.visible=true;
                    }else{
                        this.dCMenu.visible=false;
                    }
                }
            }          
            
    }
    get indexSah() { return this._indexSah; }
}







function GalleryXZ(dCont, _x, _y, _fun) {
    DGallery.call(this, dCont, _x, _y, _fun);               
    this.type="GalleryXZ"; 
    this.createZamen=function(){            
        var r=new BoxXZ(this.content, 0, 0, this.downBtn);            
        return r;
    }    
}
GalleryXZ.prototype = Object.create(DGallery.prototype);
GalleryXZ.prototype.constructor = GalleryXZ;

Object.defineProperties(GalleryXZ.prototype, {

   /* index: {// Активный элемент
        set: function (value) {
            
            if (this.array[value] != undefined) {
                this.korektPoIndex(value);
            }
            
            this._index = value;
           

            for (var i = 0; i < this.array.length; i++) {
                if (this._index == i) this.array[i].activ = true;
                else this.array[i].activ = false;
            }

        },
        get: function () {
            return this._index;
        }
    },*/
})


function BoxXZ(dCont, _x, _y, _fun) {
    DBox.call(this, dCont, _x, _y, _fun);
    this.type = 'BoxXZ';
    var self=this

    this.label.div.style.pointerEvents="none";
    this.label.textAlign="center";
    this.label.color="#000000"
    

    this.startLoad = function (_obj) {
        
        this.label.visible=true
        if(this.object!=undefined) {
            self.funLoad();
            return   
        }        

        this.object = _obj;

        if (_obj.title) {
            this.label.text = _obj.title;
            this.label.value = _obj.title;
            this.label.visible = true;
        }
        if (_obj.src) {
            //this.image.visible = true;
            if (this.image.link == _obj.src) {
                if (self.funLoad) self.funLoad();
            } else {
                this.image.width = 100;
                this.image.height = 100;
                this.image.link = _obj.src;
            }
        }else{
            if (self.funLoad) self.funLoad();
        }
        this.draw();
    };
    var ss
    this.draw = function () {
        let hh=this._height-30
        ss = (this._width - this._otstup * 2) / this.image.picWidth;
        if (ss > (hh - this._otstup * 2) / this.image.picHeight)ss = (hh - this._otstup * 2) / this.image.picHeight;
        this.image.x = 0;
        this.image.width=this.image.picWidth*ss;
        this.image.height=this.image.picHeight*ss;

        this.image.x = (this._width - this.image.picWidth * ss) / 2;
        this.image.y = (this._height - this.image.picHeight * ss) / 2-10;

        this.label.x = 2//(this._width - this.label.curW) / 2;
        this.label.y = this._height - 20;

        this.label.width=this.panel.width

        if (this.postDraw) this.postDraw();
    };



    if(dcmParam.mobile==false){

        this.panel.div.removeEventListener("mouseout", this.mouseOut);
        this.image.image.removeEventListener("mouseout", this.mouseOut);

        this.panel.div.removeEventListener("mouseover", this.mouseOver);
        this.image.image.removeEventListener("mouseover", this.mouseOver); 
    }

   /* this.mouseOver = function (e) {
        self.boolOut = false;
        
        if(self._activ==false)self.panel.color1=dcmParam.compToHexArray(dcmParam.hexDec(self._color1), -5);
        else self.panel.color1=dcmParam.compToHexArray(dcmParam.hexDec(self._color), -5);
        if (self.funOver) self.funOver(self);
    };
    this.mouseOut = function (e) {      
        
        if(self._activ==false)self.panel.color1=self._color1;
        else self.panel.color1=self._color;

        if (self.funOut) self.funOut(self);
    };



    if(dcmParam.mobile==false){

        this.panel.div.addEventListener("mouseout", this.mouseOut);
        this.image.image.addEventListener("mouseout", this.mouseOut);

        this.panel.div.addEventListener("mouseover", this.mouseOver);
        this.image.image.addEventListener("mouseover", this.mouseOver);  

    }*/




}
BoxXZ.prototype = Object.create(DBox.prototype);
BoxXZ.prototype.constructor = BoxXZ;

Object.defineProperties(BoxXZ.prototype, {
    activ: { // активный элемент
        set: function (value) {
            if (this._activ == value) return;
            this._activ = value;
           // this._color=this._color1;
          

            if(this._activ){
                this.image.link=this.object.src1;
                this.label.color="#93c32f"
            }else{
                this.image.link=this.object.src;
                this.label.color="#000000"
            }

            if(this._activ==false)this.panel.color1=this._color1;
            else this.panel.color1=this._color;

        },
        get: function () {
            return this._activ;
        }
    },
})
