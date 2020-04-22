

import { MOBaza } from './MOBaza.js';


export class PLeftVerg extends MOBaza {
  	constructor(par,fun) {  
        super(par,fun);
  		this.type="PLeftVerg";

  		var self=this;

        this.dCont=new DCont(par.dCont);

        this.batton=new DButton(this.dCont,20,0,"",function(){
            fun("downPLeftVerg");
        },"resources/image/logo_ludwig_since-2x.png")
        this.batton.width=225;
        this.batton.height=115;
        this.batton.color="#ffffff";

        this.sizeWindow = function(w,h,s){ 
            this.dCont.x=w/s-this.width;       
        }
  	}
}
