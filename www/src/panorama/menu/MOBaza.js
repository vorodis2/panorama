



export class MOBaza  {
  	constructor(par,fun) {  		
  		this.type="MOBaza";
        this.typeNa="xz";
  		var self=this;
        this.par=par
        this.fun=fun

        this._active= false;       
        this.otstup=this.par.otstup;
        this.otstup1=this.par.otstup1;
        this.wh=this.par.wh;
        this.width=this.par.width;
        this.whSize=this.par.whSize;

        this.dCont=new DCont(par.dCont);
        this.dCont.visible=this._active
        this.object=undefined;
        this.postSO=undefined;
        this.postIn=undefined;

        this.init=function(){
            if(this.window!=undefined)return
            this.whSize=this.par.whSize;
            

            this.window=new DWindow(this.dCont,0,0,"xz");
            this.window.width=this.width;
            this.window.hasMinimizeButton=false;
            this.window.dragBool=false;
            if(this.postIn!=undefined)this.postIn();
        }

        this.setObject=function(obj){
            this.object=obj
            this.active=true;
            this.init()
            if(this.postSO!=undefined)this.postSO();
        }


        this.drag=function(){

        }
        this.clear=function(){
            this.active=false
        }
        
  	}

    set active(value) {
        if(this._active!=value){
            this._active= value;
            this.dCont.visible= value;     
        }
    }    
    get active() { return  this._active;}
   

}
