

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
            self.sizeWindow()
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


        this.gallery=new GalleryXZ(this.dCont,0,0,function(){
            self.openObj(this.obj);            
        });
        this.gallery.height=this.wh;
        this.gallery.start(this.arrConf);
        this.gallery.widthPic=this.wh*1.25-this.otstup;
        this.gallery.heightPic=this.wh-this.otstup;
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
                self.gallery.start(self.arrConf);
                self.par.par.locSave.saveTime();

                self.openObj(self.gallery.array[self.gallery.array.length-1].object);
                self.gallery.index=self.gallery.array.length-1;
            });
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
            this.window.height=sy+32;
        }

        this.object=undefined    
        this.openObj= function(obj){ 
            this.window.visible=true;
            this.object=obj;            
            this.battonLoad.text=this.object.src;
            this.battonLoad1.text=this.object.src1;
            this.input.text=this.object.title
            this.input1.text=this.object.key
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

            let ww=w/s
            let www=(this.gallery.widthPic+2)                
            let kh=Math.floor(ww/(this.gallery.widthPic+2));
            if(kh>this.gallery.array.length)kh=this.gallery.array.length

            if(this._open == true){              

                
                
                this.gallery.kolII=kh;

                this.gallery.width=this.gallery.kolII*www+4;
                this.gallery.height=this.gallery.hh;

                this.gallery.x=(w/s-this.gallery.width)/2;
                this.gallery.y=(h/s-this.gallery.height)-2;


                this.batton.y=this.gallery.y-this.batton.height;
                this.batton.x=(w/s-this.batton.width)/2;

            }else{
                
                if(kh==this.gallery.array.length){
                    this.gallery.kolII=kh;
                    this.gallery.width=this.gallery.kolII*www+4;
                    this.gallery.x=(w/s-this.gallery.width)/2;
                }else{
                    this.gallery.x=0
                    this.gallery.kolII=222;  
                    this.gallery.width=w/s;   
                }
                this.gallery.height=this.wh;
                
                this.gallery.y=h/s-this.gallery.height-2;
                this.batton.y=this.gallery.y-this.batton.height;
                this.batton.x=(w/s-this.batton.width)/2;
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

    this.mouseOver = function (e) {
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

    }




}
BoxXZ.prototype = Object.create(DBox.prototype);
BoxXZ.prototype.constructor = BoxXZ;

Object.defineProperties(BoxXZ.prototype, {
    activ: { // активный элемент
        set: function (value) {
            if (this._activ == value) return;
            this._activ = value;
            this._color=this._color1;
           

            if(this._activ){
                this.image.link=this.object.src1;
                this.label.color="#93c32f"
            }else{
                this.image.link=this.object.src;
                this.label.color="#000000"
            }

            //if(this._activ==false)this.panel.color1=this._color1;
           // else this.panel.color1=this._color;

        },
        get: function () {
            return this._activ;
        }
    },
})
