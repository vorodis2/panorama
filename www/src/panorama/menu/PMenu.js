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




        /*const bottomInfoArray = [
            'some text\nnext line',
            `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc pulvinar aliquet justo vitae varius. Nulla at interdum diam, vitae pretium nulla. Aenean eu consequat lorem. Quisque laoreet nunc orci, ut vulputate ex faucibus et. Maecenas sagittis nisi vel est finibus, vel placerat velit tristique. Sed nibh neque, consequat sit amet sem eu, pretium feugiat lectus. Sed at purus enim.
            Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla pellentesque mi sit amet lorem dapibus, vitae egestas diam cursus. Donec maximus massa eget purus tincidunt laoreet. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce nec mollis erat. Mauris non nulla tristique, egestas nisl at, fringilla massa. Sed euismod vestibulum orci, quis consequat orci ornare molestie. Praesent quis arcu congue, convallis urna eget, consequat odio. Praesent fringilla volutpat elit, eu auctor mauris hendrerit luctus.`
        ]*/
/*

        this.dCont=new DCont(par.dCont);
        this.dragPic=new DDragPic(null);
        dcmParam.activButton="#f28044";

        this.mVerh=undefined

        this.mLeft = new MLeft(this,function(s,p){
            self.fun(s,p);
        });        
        this.bottomInfo = new MStepInfo(this, 
            this.fun, 
            [
                'Укажите высоту от пола первого этажа до потолка и толщину перекрытияю\nДвигайте синими кнопками.',
                'Укажите размеры проема и наличие стен.\nМожно выпрать прямоугольный и г опбразнный вариант.',
                'Наличие стен на втором этаже.',
                'Укажите ночальную точку, со второго этажа и направление лестницы на первый этаж',
                'Можете добавить стены на первом этаже',
                'Можете добавить проемы на стены первого этажа' 
            ], 
            ['resources/data/50/100.png','resources/data/49/100.png']
        );

        //this.mTipVisi = new MTipVisi(this, this.dCont, this.fun)

        if(this.debug==true){
            this.mVerh = new MVerh(this,function(s,p){
                self.fun(s,p);
            });
        }    

        this.mInfo = new MInfo(par.dCont);


        this.dragPic.dC=par.dCont

*/

    
  		this.sizeWindow = function(w,h,s) {
           // if (this.mVerh) this.mVerh.sizeWindow(w, h, s);
          //  this.bottomInfo.sizeWindow(w, h, s); 
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i])if(this.array[i].sizeWindow)this.array[i].sizeWindow(w,h,s)
            }          
  		}

        this.setObj= function(o){
            //this.mLeft.setObj(o);                                
        }

  	}


    set indexSah(value) {
        if (this._indexSah != value) {
            this._indexSah = value; 
            this.pCentorVerg.indexSah=value;
            this.pNiz.indexSah=value;
        }        
            
    }
    get indexSah() { return this._indexSah; }
/*
    set id(value) {
        if(this._id!=value){
            this._id= value; 
            this.mProdject.id=value;  
            this.mVerh.id=value;          
        }
    }    
    get id() { return  this._id;}  
    
    set index(value) {
        if (this._index != value) {
            this._index = value;            
            this.mLeft.index=value;
            this.bottomInfo.index = value
        }
    }
    get index() { return this._index; }

    set tipVisi(value) {
        if(this._tipVisi !== value) {
            this._tipVisi  = value;
            this.bottomInfo.tipVisi  = value;
         
            trace("@@@@@@@@@@@@@@@@",value)
        }        
    }
    get tipVisi() {
        return this._tipVisi
    }*/
}

