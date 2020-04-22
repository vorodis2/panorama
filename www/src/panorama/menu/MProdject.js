




export class MProdject  {
  	constructor(par,fun) {  		
  		this.type="MProdject";
  		var self=this;
        this.par=par
        this.fun=fun
        
        this._active=false;


        this.otstup=this.par.otstup;
        this.otstup1=this.par.otstup1;
        this.wh=this.par.wh;
        this.width=this.par.width;
        this.width=222;
        this.whSize=1000

        this.plane=new DPanel(par.dCont);
        this.dCont=new DCont(par.dCont);
        this.dCont.y=this.wh+this.otstup1*2;
        
        this.array=[];

        var php=new Php()
 

        this.plane.visible=this._active;

        this.button=undefined;


        this.arrayId=undefined;



        this.addButton=function(button){
            this.button=button;
        }

        this.w
        this.h
        this.s
        this.window=undefined
        this.init=function(){
            if(this.window!=undefined)return;
            this.window=new DWindow(this.dCont,0,0,"Prodjects");
            this.window.width=this.width;
            this.window.hasMinimizeButton=false;
            this.window.dragBool=false;

            this.gallery=new DGallery(this.window.content,this.otstup1,this.otstup1,function(){
                self.fun("openId",this.obj.title)
                self.active=false;    
            }) 
                       
            this.gallery.kolII=3;
            this.gallery.widthPic=64;
            this.gallery.heightPic=64;
            this.gallery.width=66*this.gallery.kolII+2;            

            if(this.arrayId==undefined){
                this.startArId()
            }            
        }

        this.dragID=function(){
            var index=-1;
            for (var i = 0; i < self.arrayId.length; i++) {
                if(self.arrayId[i].title==this._id){
                    index=i
                    break
                }
            }
            this.gallery.index=index;
        }

        this.plusId=function(id){
            if(this.arrayId==undefined)return
            var o={}
            o.title=id
            o.src="save/"+id+"/icon.png";
            self.arrayId.unshift(o);            
            self.gallery.start(self.arrayId);
            self.dragWindow();
        } 


        var sah=1;
        var sh=100
        var sh2=100
        var ssss
        this.dragWindow=function(){
            sah=1;
            if(self.arrayId)sah=Math.ceil(self.arrayId.length/this.gallery.kolII)
            if(sah<=1)sah=1

            sh= sah*66+2 
            sh2=sh+32+this.otstup1*2;


            ssss=this.dCont.y+sh2+this.otstup1*2
            if(this.dCont.y+sh2+this.otstup1>this.h/this.s){
                sh2=this.h/this.s-this.otstup1-this.dCont.y
                sh=sh2-(32+this.otstup1*2)
            }
           
            this.gallery.height=sh;
            this.window.height=sh2;
        }



        this.grtMaxPlus = function(f){  
            var l = '../save/';  
            php.load({tip:"getDiractFiles", dir:l},function(e){                    
                    f(e)
                }
            )
        }


        this.startArId=function(){
            this.grtMaxPlus(function(e){
                var aa=[];
                var qqa=e.split(",");
                var ss=0
                var a=[]

                for (var i = 1; i < qqa.length; i++) {
                    if(qqa[i]*1!=undefined){
                        a.push(qqa[i]*1)
                    }
                }
                a.sort(function(a, b) {
                  return a - b;
                });

                for (var i = a.length-1; i >=0 ; i--) {
                    ss++
                    aa.push(a[i]*1)
                    if(ss>30)break;
                }
                


                self.arrayId=[];
                for (var i = 0; i < aa.length; i++) {
                    self.arrayId[i]={}
                    self.arrayId[i].title=aa[i]
                    self.arrayId[i].src="save/"+aa[i]+"/icon.png";                    
                }

                self.gallery.start(self.arrayId);
                self.dragWindow();
            })
        }



        this.plane.alpha=0.4;
        this.plane.div.addEventListener("mousedown", function(){
            self.active=false;
        })




        this.sizeWindow = function(w,h,s){ 

            this.w=w
            this.h=h
            this.s=s
            if(this.window==undefined)return;

            this.dCont.x=w/s-this.width -   this.otstup 
            this.plane.width= w/s;
            this.plane.height= h/s; 

            this.dragWindow()
        }
  	}

    set id(value) {
        if(this._id!=value){
            this._id= value;
            if(this.window==undefined)return;

            this.dragID()            
        }
    }    
    get id() { return  this._id;}

    set active(value) { 
        if(this._active != value) {
            this._active = value;
            this.init()
            if(this.button){
                if(value==false) this.button.color=dcmParam.color;
                else this.button.color=dcmParam.activButton;
            }
            this.plane.visible=this.dCont.visible=value;
            this.sizeWindow(this.w,this.h,this.s)
        }    
        
    }    
    get active() { return  this._active;}
  

}
