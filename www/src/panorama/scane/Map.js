

export class Map  {
  	constructor(par, fun) {          
        this.type="Map";
        var self=this;

        this.par=par;
        this.fun=fun;
        this._index=-1;
        this.visi3D= this.par.par.visi3D;

        this.confScane=mainBig.objectBase.scene;
        this.arrFoto=mainBig.objectBase.scene.arrFoto;


        this.width=100;
        this.height=100;

        this.dCont=new DCont(this.par.dCont);   

        //var panel=new DPanel(this.dCont)
        //panel.color="#93c32f"

        this.scPixi=new DebbugPixi()
        this.dCont.div.appendChild(this.scPixi.div)
        this.scPixi.deb.drawPoint(55,55);

        this.content2d = new PIXI.Container();
        this.c2dMap = new PIXI.Container();
        this.c2dGiro = new PIXI.Container();
        this.scPixi.content2d.addChild(this.content2d)
        this.scPixi.content2d.addChild(this.scPixi.deb.content2d)

        this.arrImeg=[];

        this.array=[]


        this.init=function(){
            this.arrImeg[0]=new XZImage(this.content2d,0,0,this.arrFoto[0],function(){
                self.scPixi.width=self.width=this.width=this.picWidth/2;
                self.scPixi.height=self.height=this.height=this.picHeight/2;

                //panel.width=this.width
                //panel.height=this.height
                
                self.sizeWindow()
                self.content2d.addChild(self.c2dMap)

                self.init1()

            })
        }
        this.init1=function(){
            this.arrImeg[1]=new XZImage(this.content2d,0,0,this.arrFoto[1],function(){
                this.width=this.picWidth/2;
                this.height=this.picHeight/2;                
                self.content2d.addChild(self.c2dGiro)             
                self.init2();

            })
        }

        this.init2=function(){//персонаж
            this.arrImeg[2]=new XZImage(this.c2dGiro,0,0,this.arrFoto[2],function(){
                this.width=this.picWidth/2;
                this.height=this.picHeight/2;
                this.x=-this.width/2;
                this.y=-this.height/2;                
                self.sizeWindow(); 
                self.init3();
            })
        }

        this.fun_rotationZ = function () {             
            
            this.c2dGiro.rotation=self.visi3D.rotationZ

            self.intRend=0;

        }



        this.sobBlok=function(s,p){

        }



        this.init3=function(){

            for (var i = 0; i < this.confScane.array.length; i++) {                
                this.array[i]=new MBlok(this,this.confScane.array[i],this.sobBlok,i)
            } 
            this.dragIndex();            
            self.intRend=0;
            self.sizeWindow(); 
        }



     



        this.getSprite = function(p){
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].getSprite(p)!==null)return this.array[i]
            }
            return null
        }


        this.point=new Position();
        this.pointLocal=new Position();
        var sx,sy,sp;
        this.mouseDown = function(e){             
            self.scaleDrag.s=1;
            self.testScale(self.dCont,self.scaleDrag);
            self.dragPoint(e);  

            let s=self.getSprite(self.pointLocal);
            if(s!=null) {
                fun("setIndex",s.idArr);
               
            }
        }



        this.dragPoint=function(e){             
            if(dcmParam.mobile==false){
                if(sp==undefined){
                    sp={
                        x:e.clientX,                        
                        y:e.clientY, 
                        b:false
                    };
                }               
                sx=(e.clientX-sp.x)/self.scaleDrag.s;
                sy=(e.clientY-sp.y)/self.scaleDrag.s; 

                self.pointLocal.x=e.clientX;
                self.pointLocal.y=e.clientY; 


            }else{
                if(sp==undefined){                    
                    sp={
                        x:e.targetTouches[0].clientX, 
                        y:e.targetTouches[0].clientY, 
                        b:false
                    };
                }                               
                sx=(e.targetTouches[0].clientX-sp.x)/self.scaleDrag.s;
                sy=(e.targetTouches[0].clientY-sp.y)/self.scaleDrag.s; 

                self.pointLocal.x=e.targetTouches[0].clientX;
                self.pointLocal.y=e.targetTouches[0].clientY; 
            }
            self.point.x=sx;
            self.point.y=sy;

            self.pointLocal.x/=self.scaleDrag.s
            self.pointLocal.y/=self.scaleDrag.s

            self.pointLocal.x-=(self.dCont.x)
            self.pointLocal.y-=(self.dCont.y)
        }


        this.testScale = function (c,o) {       
            if(c.scale)o.s*=c.scale;
            if(c.parent){
                self.testScale(c.parent,o)
            }
        }
        this.scaleDrag={s:1}
        this.scal;

        if(dcmParam.mobile==false){                 
            this.dCont.div.addEventListener("mousedown", this.mouseDown);
        }else{                  
            this.dCont.div.addEventListener("touchstart", this.mouseDown);                 
        }





        this.dragIndex= function () {
            for (var i = 0; i < this.array.length; i++) {
                if(i==this.index){
                    this.array[i].active=true
                    this.c2dGiro.x=this.array[i].obj.x;
                    this.c2dGiro.y=this.array[i].obj.y;
                }else{
                    this.array[i].active=false;
                }                
            }
        }









        this.init();


        this.intRend=0
        this.render = function () { 
            
            if(this.intRend<=1){
                this.scPixi.tick()
            }
            this.intRend++;
        }


        //ап дете сцена деленая на 2 в мейне
        this.update = function () {
            this.render()
        }

        var w,h,s

        this.sizeWindow = function(_w,_h,_s){ 
            if(_w){
                w=_w;
                h=_h;
                s=_s;
            }
            this.dCont.x= w/s- this.width;
        }  		
  	} 

    set index(value) {
        if (this._index != value) {
            this._index = value;  
            this.dragIndex()       
            
        }
    }
    get index() { return this._index; } 
}






export class MBlok  {
    constructor(par,obj,fun,idArr) {
        var self=this
        this.type="MBlok";
        this.par=par;
        this.obj=obj;
        this.fun=fun;
        this.idArr=idArr;
        this._active=false;

        this.content2d = new PIXI.Container();
        this.par.c2dMap.addChild(this.content2d);        
        this.arrImeg=[] 

        this.bLoad=false
        self.bitmapData


        this.arrImeg[0]=new XZImage(this.content2d,0,0,obj.src1,function(){
            this.width=this.picWidth/2;
            this.height=this.picHeight/2;
            self.par.intRend=0

            self.bitmapData=new DBitmapData(2,2,undefined,function(){
                self.bLoad=true;

            })
            self.bitmapData.load(obj.src1)
        })

        this.arrImeg[1]=new XZImage(this.content2d,0,0,obj.src2,function(){
            this.width=this.picWidth/2;
            this.height=this.picHeight/2;
            self.par.intRend=0
        })
        this.arrImeg[1].visible=false;


        this.arrImeg[2]=new XZImage(this.content2d,0,0,par.arrFoto[3],function(){
            this.width=this.picWidth/2;
            this.height=this.picHeight/2;
            this.x=obj.x-this.width/2;
            this.y=obj.y-this.height/2;
            self.par.intRend=0;
        })



        this.getSprite = function(p){
            if(this.bLoad==false)return null

            let i=Math.round(p.x*2)
            if(i<0) i=0
            if(i>self.bitmapData.width-1) i=self.bitmapData.width-1;

            let j=Math.round(p.y*2)
            if(j<0) j=0
            if(j>self.bitmapData.height-1) j=self.bitmapData.height-1;

            let a=self.bitmapData.getPixel(i,j)            
            if(a[3]!=0)return this            
            return null
        }




    }

    set active(v) {
        if(this._active!=v){
            this._active = v;  
                  
            this.arrImeg[0].visible=!v;
            this.arrImeg[1].visible=v;
            this.par.intRend=0;
        }       
    }   
    get active() { return  this._active;} 


}

























export class DebbugPixi  {
    constructor() {
        var self=this
        this.div= document.createElement('div');
        this.div.style.position = 'fixed';
        this.div.style.top = '0px';
        this.div.style.left = '0px';

        this._width=100;
        this._height=100;
        this._active=true;

        this.stage = new PIXI.Container();
        this.content2d = new PIXI.Container();
        this.stage.addChild(this.content2d);
        this.renderer = new PIXI.autoDetectRenderer(this._width, this._height, {antialias: true, transparent: true, preserveDrawingBuffer: true });
        this.renderer.view.style.position = 'fixed';
        //var t = new PIXI.ticker.Ticker();
        this.div.appendChild(this.renderer.view);


        this.deb = new Deb(this);


        this.tick = function () {   
            if(self._active==false) return        
            self.renderer.resolution = window.devicePixelRatio * self.resolution;// ставим разрешение рендера (соотношение пикселей)
            self.renderer.render(self.stage);

        }

        //t.add(this.tick, this);
        //t.start();

        this.sizeWindow = function(w,h){            
            if(w){
                self._width=w;
                self._height=h;
            }

            if(self.renderer){
                var precresol = self.resolution;// запоминаем предыдущее разрешение пикселей рендера
                self.renderer.view.style.width = self._width + 'px';
                self.renderer.view.style.height = self._height + 'px';                
                self.renderer.resolution = 1;// перед изменение размера в дефолт
                self.renderer.resize(self._width, self._height);
                self.renderer.resolution = precresol;// ставим обратно разрешение
            }                      
        }

    }  
    set width(v) {
        if(this._width!=v){
            this._width = v;            
            this.sizeWindow() 
        }       
    }   
    get width() { return  this._width;}  

    set height(v) {
        if(this._height!=v){
            this._height = v;            
            this.sizeWindow(); 
        }       
    }   
    get height() { return  this._height;}
} 






export class Deb  {
    constructor(par) {
        var self=this;        
        this.par=par;
        this.content2d = new PIXI.Container();
        this.par.content2d.addChild(this.content2d);
        this.graphics = new PIXI.Graphics();
        this.content2d.addChild(this.graphics);



        this.clear=function(){
            this.graphics.clear();
        }

        var x,y,w,h,color,radius,alpha
        this.drawPoint=function(_x,_y,_color,_radius,_alpha){
            x=_x||0;
            y=_y||0;
            color=_color||0xff0000;
            radius=_radius||5;
            alpha=_alpha||0.5;

            
            this.graphics.lineStyle(1, color, alpha);
            this.graphics.beginFill(color, alpha*0.8);
            this.graphics.drawCircle(x-radius/2,y-radius/2,radius);

        }


        this.drawRect=function(_x,_y,_w,_h,_color,_radius,_alpha){
            x=_x||0;
            y=_y||0;
            w=_w||5;
            h=_h||5;
            color=_color||0xff0000;
            radius=_radius||5;
            alpha=_alpha||0.5;
            this.graphics.lineStyle(1, color, alpha);
            this.graphics.beginFill(color, alpha*0.8);
            this.graphics.drawRect(x,y,w,h,radius);
        }

    }
}


export function XZImage (cont, _x, _y, _linkStart, fun) {
    PIXI.Container.call(this);
    var self = this;
    this.type = 'XZImage';

    cont.addChild(this);
   

    this.fun = fun;

    this.x = _x || 0;
    this.y = _y || 0;

    this._width = 100;
    this._height = 100;
    this._otstup = 0; // отступ картинки от краев рамки
    this._preloaderBool = false;

    this.picWidth = 0; // реальные размеры картинки
    this.picHeight = 0; // реальные размеры картинки
    // TODO при отсутствие выдает ошибку, текстура не устпевает загрузиться
    this.image = new Image();
    this.interactive = false;
    this.sprite = null;
    this.funError = null;
    this.label = null;
    this.linkOld = null;

    this.loadError = function () {
        if (self.funError) self.funError();
    };

    this.loadComplit = function (texture) {
        //self.image = texture.baseTexture.source;
        self.isLoaded = true;
        self.picWidth = self.image.width;
        self.picHeight = self.image.height;
        if (self.sprite) self.sprite.destroy();
        self.sprite = new PIXI.Sprite(new PIXI.Texture(new PIXI.BaseTexture(self.image)));
        self.sprite.interactive = self.interactive;
        self.sprite.visible = true;
        self.addChild(self.sprite);
        self.otstup = self._otstup;
        self.width = self._width;
        self.height = self._height;
        if (self.label) {
            self.removeChild(self.label);
            delete self.label;
            self.label = undefined;
        }
        if (self._preloaderBool) {
            self.preloader.visible = false;
            self.preloader.activ = false;
        }
        if (self.funComplit) self.funComplit();
        if (self.fun) self.fun();
    };
    this.image.crossOrigin = '';
    this.image.onload = this.loadComplit;
    this.image.onerror =this.loadError;


    this.preloader = null;
    this.load = function () {
        if (this._preloaderBool && this.sprite) {
            // если есть прелоадер нужно убрать старую картинку
            this.sprite.visible = false;
        }
        this.isLoaded = false;
        if (!this._link || this._link === 'null') return;
        
        
        self.image.src = this._link;




        //pl102.loaderTexture.clearFun(this.linkOld, this.loadComplit);
        //pl102.loaderTexture.getTexture(this._link, this.loadComplit, this.loadError);


        this.linkOld = this._link;
    };

    this.clear = function () {
        if (self.sprite) {
            self.sprite.destroy();
            delete self.sprite;
        }
        this.destroy();
    };

    if (_linkStart) this.link = _linkStart;
}

XZImage.prototype = Object.create(PIXI.Container.prototype);
XZImage.prototype.constructor = XZImage;

Object.defineProperties(XZImage.prototype, {
    link: {
        set: function (value) {
            if (this._link === value) return;
            this._link = value;
            this.load();
        },
        get: function () {
            return this._link;
        }
    },
    width: {
        set: function (value) {

            this._width = value;
            if (this.sprite) {
                this.sprite.scale.x = (this._width - this._otstup * 2) / this.picWidth;
                this.sprite.position.x = this._otstup;
            }

            if (this._preloaderBool == true) if (this.preloader) this.preloader.width = this._width;
        },
        get: function () {
            return this._width;
        }
    },
    height: {
        set: function (value) {
            this._height = value;
            if (this.sprite) {
                this.sprite.scale.y = (this._height - this._otstup * 2) / this.picHeight;
                this.sprite.position.y = this._otstup;
            }
            if (this._preloaderBool == true) if (this.preloader) this.preloader.height = this._height;
        },
        get: function () {
            return this._height;
        }
    },
    otstup: {
        set: function (value) {
            this._otstup = value;
            this.width = this._width;
            this.height = this._height;
        },
        get: function () {
            return this._otstup;
        }
    }
});
