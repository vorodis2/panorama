

import { MOPoint } from './MOPoint.js';
import { MOSten } from './MOSten.js';
import { MOBlok } from './MOBlok.js';
import { MOPol } from './MOPol.js';
import { MOPodloshka } from './MOPodloshka.js';
import { MOHome} from './MOHome.js';


export class MObject  {
  	constructor(par,fun) {  		
  		this.type="MObject";
  		var self=this;
        this.par=par
        this.fun=fun

        this.otstup=this.par.otstup;
        this.otstup1=this.par.otstup1;
        this.wh=this.par.wh;
        this.width=222;
        this.whSize=1000

        this.dCont=new DCont(par.dCont);
        this.dCont.y=this.wh+this.otstup1*2
        
        this.array=[];


        this.dragPic=this.par.dragPic//new DragPic(par.dCont)


        this.array[0]=this.moPoint=new MOPoint(this, function(s,p){});
        this.array[1]=this.moSten=new MOSten(this, function(s,p){});
        this.array[2]=this.moBlok=new MOBlok(this, function(s,p){});
        this.array[3]=this.moPodloshka=new MOPodloshka(this, function(s,p){});
        this.array[4]=this.moPol=new MOPol(this, function(s,p){});
        this.array[5]=this.moHome=new MOHome(this, function(s,p){});
        




        this.clear=function(){
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].clear()
            }
        }

        this.setObject=function(obj){
            this.clear();
           
            
            if(obj){
                for (var i = 0; i < this.array.length; i++) {
                    if(this.array[i].typeNa==obj.type){
                        this.array[i].setObject(obj)
                    }
                }
            }

        }


        this.sizeWindow = function(w,h,s){ 
            this.dCont.x=w/s-this.width -   this.otstup   
        }
  	}

     

}
