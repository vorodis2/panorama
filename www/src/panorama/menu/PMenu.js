/*import { MLeft } from './MLeft.js';
import { MVerh } from './MVerh.js';
import { MObject } from './MObject.js';
import { DragPic } from './DragPic.js';
import { MProdject } from './MProdject.js';
import MStepInfo from './MStepInfo'
import MTipVisi from './MTipVisi'


import { MInfo } from './MInfo.js';*/


import {PLeftVerg } from './PLeftVerg.js';
import {PCentorVerg } from './PCentorVerg.js';

import {PNiz} from './PNiz.js';
import {PMap} from './PMap.js';
import {PPoint} from './PPoint.js';

export class PMenu  {
  	constructor(par,fun) {  		
  		this.type="PMenu";
  		var self=this;
        this.par=par
        this.fun=fun
        this._index=-1;
        this._id=-1;
        this.debug=par.debug
        this.otstup=4;
        this.otstup1=10;
        this.wh=100;

        this._indexSah=-1;

        this.array=[]

        this.dCont=new DCont(par.dCont);

        this.array[0]=this.pLeftVerg=new PLeftVerg(this, function(s,p){
            self.fun(s,p);
        });

        this.array[1]=this.pCentorVerg=new PCentorVerg(this, function(s,p){
            self.fun(s,p);
        });

        this.array[2]=this.pNiz=new PNiz(this, function(s,p){
            self.fun(s,p);
        });

        this.array[3]=this.pMap=new PMap(this, function(s,p){
            self.fun(s,p);
        });

        this.array[4]=this.pPoint=new PPoint(this, function(s,p){
            self.fun(s,p);
        });


    
  		this.sizeWindow = function(w,h,s) { 
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i])if(this.array[i].sizeWindow)this.array[i].sizeWindow(w,h,s)
            }          
  		}

        this.setObj= function(o){
            //this.mLeft.setObj(o);                                
        }

  	}

    set index(value) {
        if (this._index != value) {
            this._index = value; 
            this.pPoint.index = value; 
        }        
            
    }
    get index() { return this._index; }

    


    set indexSah(value) {
        if (this._indexSah != value) {
            this._indexSah = value; 
            this.pCentorVerg.indexSah=value;
            this.pNiz.indexSah=value;
            this.pMap.indexSah=value;
            this.pPoint.indexSah=value;
        }        
            
    }
    get indexSah() { return this._indexSah; }
}

