

import { MOBaza } from './MOBaza.js';


export class PCentorVerg extends MOBaza {
  	constructor(par,fun) {  
        super(par,fun);
  		this.type="PLeftVerg";

  		var self=this;

        this.width=100
        this._indexSah=-1

        this.dCont=new DCont(par.dCont);

        /*this.batton=new DButton(this.dCont,20,0,"",function(){
            fun("downPLeftVerg");
        },"resources/image/logo_ludwig_since-2x.png")
        this.batton.width=225;
        this.batton.height=115;
        this.batton.color="#ffffff";*/
        this.array;
        this.arr;
        this.arr2;
        this.init=function(){
            this.arr=["resources/image/pic0.png","resources/image/pic1.png","resources/image/pic2.png"];
            this.arr2=["resources/image/pic0_.png","resources/image/pic1_.png","resources/image/pic2_.png"];
            this.array=[]
            let ww=125;
            let hh=100;
            for (var i = 0; i < this.arr.length; i++) {
                this.array[i]=new DButton(this.dCont,0+i*(ww+this.otstup),0,"",function(){                    
                    fun("indexSah",this.idArr);
                },this.arr[i]);
                this.array[i].width=ww;
                this.array[i].height=hh;
                this.array[i].color="#ffffff";
                this.array[i].idArr=i;
                this.width=this.arr.length*(ww+this.otstup)+ww;                
            }
        }

        
        if(mainBig.debug==true)this.init();




        this.sizeWindow = function(w,h,s){             
            this.dCont.x=(w/s-this.width)/2;     
        }
  	}

    set indexSah(value) {
        if (this._indexSah != value) {
            this._indexSah = value;            
            if(this.array){
                for (var i = 0; i < this.array.length; i++) {
                    if(i==this._indexSah){
                        if(this.array[i]._link!=this.arr2[i])this.array[i].loadImeg(this.arr2[i]);                        
                        this.array[i].color="#93c32f";
                    }else{
                        if(this.array[i]._link!=this.arr[i])this.array[i].loadImeg(this.arr[i]);
                        this.array[i].color="#ffffff";    
                    }                    
                }
            }
        }
    }
    get indexSah() { return this._indexSah; }

}
