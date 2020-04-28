

export class Word  {
  	constructor(par, fun) {          
        this.type="Word";
        var self=this;

        this.par=par;
        this.fun=fun;
        this._index=-1;
        this.visi3D = this.par.par.visi3D;

        this.confScane=mainBig.objectBase.scene;
        this.arrFoto=mainBig.objectBase.scene.arrFoto;


        this.width=100;
        this.height=100;


    
        this.visi3D.utility.sky.active=true;







        //ап дете сцена деленая на 2 в мейне
        this.update = function () {
            
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

    set index(value) {
        if (this._index != value) {
            this._index = value;
            if(this.confScane.array[value])this.visi3D.utility.sky.link=this.confScane.array[value].src; 
        }
    }
    get index() { return this._index; } 
}


