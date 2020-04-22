
/*
глобальный, перетягивает картинки, юзаеться в клиенте и админ

дев 
vorodis2.com   
vorodis2@gmail.com 
2019
*/



function DragPic(dC) {  
    var self=this   
    this.type="DragPic";
    this.fun=undefined;
    this.dC=dC;
    this._width=100;
    this._height=100;
    this._active=false;
    this.otstup=2;
    this.otstup2=10;
    this.dCont=new DCont();

    this.fUp=undefined;
    this.object=undefined;
    this._x=0;
    this._y=0;

    this.image=new DImage(this.dCont, 0,0);
    this.image.div.style.pointerEvents="none";
    this.dCont.div.style.pointerEvents="none";
     
    this.array=[];
    this.tween=new TWEEN.Tween(this.dCont);

    var sp=undefined; 
    this.scal=1; 
    this.scale=1;
    this.whBase=null;

    this.isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (self.isMobile.Android() || self.isMobile.BlackBerry() || self.isMobile.iOS() || self.isMobile.Opera() || self.isMobile.Windows());
        }
    };
    this.devas = this.isMobile.any();
    if (this.devas == null) this.devas = false;
    else this.devas = true;


    /*
        стартуем картинку
        this.whBase если не null всегда будет такого размера
        link линк на картинку
        object вложеный обьект, хз но инагда нужно
        fUp-при отпуске
    */
    this.start = function(wh,link,object,fUp,boolTim){
        if(this.whBase!=null)wh=this.whBase
        this.image.link=link;
        this.image.width=wh;
        this.image.height=wh;
        this.image.x=-wh/2;
        this.image.y=-wh/2;
        this.fUp=fUp;
        sp=undefined;
        if(boolTim==true)this.scal=1;
        else{
            this.dCont.alpha=0;
            this.tween.to({alpha: 1}, 500).start();
        }
        this.object=object;
        this.link=link;
        this.active = true; 
        for (var i = 0; i < this.array.length; i++) {
            this.array[i].start();
        }       
    }

    //стопим драгер
    this.stop=function(){
        self.active=false;        
        if(sp!=undefined){
            for (var i = 0; i < self.array.length; i++) {
                self.array[i].testRect(self._x, self._y);
            }  
        }
        sp=undefined;
    }

    //вешаем функции на апычь
    this.arrFunUp=[]
    this.addFunAp=function(f){
        this.arrFunUp.push(f)
    }

    //дергает вложеные фунАпы
    this.mouseup = function(e){
        self.stop();        
        if(self.fUp)self.fUp(); 
        for (var i = 0; i < self.arrFunUp.length; i++) {
            self.arrFunUp[i]()
        }       
    }

    //постояно весит в слушатели
    //можно грохнуть и перехвать, гляю мобилы с окончанием евента
    this.mousemove = function(e){
        if(self.active2==true)self.mousemove1(e);
        if(self._active==false)return;
        if(sp==undefined){
            if(self.devas==false){
                sp={
                    x:e.clientX/self.scale,
                    y:e.clientY/self.scale
                };
            }else{
                sp={
                    x:e.touches[0].clientX/self.scale,
                    y:e.touches[0].clientY/self.scale
                };
            }
        } 
        var ss,ss1
        if(self.devas==false){       
            self._x=e.clientX/self.scale;
            self._y=e.clientY/self.scale;            
        }else{
            self._x=e.touches[0].clientX/self.scale;
            self._y=e.touches[0].clientY/self.scale;
        }
        self.dCont.x=self._x;
        self.dCont.y=self._y;    
    }


    //////////////////////////////////////////////////////////////////\\\\\\\\\\\\\\\
    ////////////Кинули дКонтент и функцию, про отпуске над дКонт дергнет функцию\\\\\
    this.addDCont=function(dCont, fun){
        this.array.push(new BoxDragPic(this, dCont, fun, this.array.length));
    }


///////////////////////////////////////////////////////
////////////////////////тест драга//////////////////////////////

      

    //система проверки клик это или драг
    this.mouseup1 = function(e){        
        self.mouseStop();  
        if(self.fClik!=undefined)self.fClik();       
    }
    this.mousemove1 = function(e){        
        if(sp==undefined){
            if(self.devas==false){
                sp={
                    x:e.clientX,
                    y:e.clientY
                };
            }else{
                sp={
                    x:e.touches[0].clientX,
                    y:e.touches[0].clientY
                };
            }
        }         
        var ss,ss1
        if(self.devas==false){       
            ss=(e.clientX-sp.x);            
            ss1=(e.clientY-sp.y);
        }else{
            ss=(e.touches[0].clientX-sp.x);            
            ss1=(e.touches[0].clientY-sp.y);
        }     
        if(Math.abs(ss>self.dist)||Math.abs(ss1>self.dist)){
            self.mouseStop();
            if(self.fDrag!=undefined)self.fDrag();
        }   
    }

    this.mouseStop = function(){
        sp=undefined;
        self.active2=false;
        if(self.devas==false){            
            document.removeEventListener("mouseup", self.mouseup1);
        }else{           
            document.removeEventListener("touchend", self.mouseup1);
        }  
    }

    this.active2=false;
    this.dist=0;    
    this.fClik=0;
    this.fDrag=0; 
    this.testDrag = function(dist,fClik,fDrag){ 
        sp=undefined;  
        this.dist=dist;
        this.fClik=fClik;
        this.fDrag=fDrag; 
        this.active2=true;        
        if(this.devas==false){
            document.addEventListener("mouseup", self.mouseup1);
        }else{
            document.addEventListener("touchend", self.mouseup1);
        }        
    }

    if(this.devas==false){
        window.addEventListener("mousemove", this.mousemove);       
    }else{
        window.addEventListener("touchmove", this.mousemove);        
    }

//-------------------------------------------------

    Object.defineProperty(this, "active", {
        set: function (value) {            
            if(this._active!=value){
                this._active=value;                               
                if(value==true){   
                    this.dCont.scale=this.scal;
                    this.dCont.alpha=this.scal;
                    this.dC.add(this.dCont);
                    if(this.devas==false){
                        document.addEventListener("mouseup", this.mouseup); 
                    }else{
                        document.addEventListener("touchend", this.mouseup); 
                    }

                }else{
                    this.dC.remove(this.dCont);
                    if(this.devas==false){
                        document.removeEventListener("mouseup", this.mouseup); 
                    }else{
                        document.removeEventListener("touchend", this.mouseup); 
                    }                    
                }                
            }           
        },
        get: function () {
            return this._active;
        }
    });
}




//Хрониьтель контейнеров, для отлова Апа над ними
function BoxDragPic(dr, dCont, fun, idArr) {  
    var self=this   
    this.type="BoxDragPic";
    this.fun=undefined;
    this.dCont=dCont;
    this.fun=fun;
    this.idArr=idArr;
    this.panel=new DPanel(null,0,0)//для подсветки
    this.tween=new TWEEN.Tween(this.panel);
    this.tween.onComplete(function(){        
        self.dCont.remove(self.panel);
    })
    
    this.start=function(){
        if(this.visibleTest(this.dCont)==false)return;       
        this.dCont.add(this.panel);
        this.panel.width=this.dCont.width;
        this.panel.height=this.dCont.height;
        this.panel.alpha=0.5;
        this.tween.stop();
        this.tween.to({alpha: 0}, 500).start();
    }


    var point={x:0, y:0}
    this.testRect=function(_x,  _y){
        if(this.visibleTest(this.dCont)==false)return;    
        point.x=0;
        point.y=0;
        this.getXY(this.dCont, point)        
        if(_x>point.x&&_x<point.x+this.panel.width){
            if(_y>point.y&&_y<point.y+this.panel.height){                
                self.fun(dr.object,dr.link)
            }            
        }
    }
    this.getXY=function(c, p){
        point.x+= c.x;
        point.y+= c.y;      
        if(c.parent!=undefined){
            return this.getXY(c.parent, point);
        }         
    }

    this.visibleTest=function(c){        
        if(c.visible == false)return false
        if(c.parent!=undefined){
            return this.visibleTest(c.parent);
        }else{            
            if(c.htmlBody!=undefined)return true; 
            else return false;            
        }
        return true;    
    }
}