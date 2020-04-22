

import { MOBaza } from './MOBaza.js';


export class MOHome extends MOBaza {
  	constructor(par,fun) {  
        super(par,fun);
  		this.type="MOPodloshka";
        this.typeNa="Home";
  		var self=this;
        

        var ocHeight
        var oComp
        this.dCont=new DCont(par.dCont);

        this.dCComp=new DCont();
        this.button=undefined;
        this.slid
        this.slid1
        this.array=[]

        this.postIn=function(){
           
            this.window.title="Floors";           

            for (var i = 0; i < 4; i++) {
                this.array[i]=new DButton(this.window.content,this.otstup+(this.otstup+this.wh)*i,this.otstup,""+i,function(){ 
                   
                    self.object.indexFloor=this.idArr;
                    self.drag();
                });
                this.array[i].idArr=i
                this.array[i].width=this.array[i].height=this.wh;
               // if(i==3)this.array[i].text="<";
            }


            this.button=new DButton(this.window.content,this.otstup1,this.otstup1+(this.otstup+this.wh),"",function(){
                self.object.array[self.object.indexFloor].clear();                
            },"resources/image/p0.png");
            this.button.width=this.button.height=this.wh;


            oComp={}
            ocHeight=this.wh+this.otstup+this.otstup1+(this.otstup+this.wh)
            oComp["visible"]=new DCheckBox(this.window.content,this.otstup1,ocHeight,"visible",function(){
                
                self.object.array[self.object.indexFloor].visible=this.value

            })
            ocHeight+=32;

            oComp["height"]=new DSliderBig(this.window.content,this.otstup1,ocHeight,function(){
                self.object.array[self.object.indexFloor].height=this.value;
                self.object.dragIF();
            },"height",1, 300)
            oComp["height"].width=this.width-this.otstup1*2
            oComp["height"].okrug=1
            ocHeight+= (this.wh)

            this.window.height=ocHeight+this.dCComp.y+this.otstup1+22;
        }

        
        
        this.drag=function(){

            for (var i = 0; i < this.object.array.length; i++) {
                if(this.object.indexFloor==i){
                    this.array[i].color=dcmParam.activButton;

                    trace(this.object.array[i])

                    oComp["visible"].value=this.object.array[i].visible;
                    oComp["height"].value=this.object.array[i].height;



                }else{
                    this.array[i].color=dcmParam.color;
                }
            }
          /*  if(this.object.indexFloor==0){
                this.array[3].alpha=0.5;
            }else{
                this.array[3].alpha=1;
            }*/



        }

       

        this.postSO=function(){            
            //this.object.arrayClass[0].funDragMenu=this.drag
            this.drag()
        }
        this.clear=function(){
            if(this.object!=undefined){
               // trace("#")
               // this.object.arrayClass[0].funDragMenu=undefined;
            }
            this.active=false
        }


       /* this.saveFile = function (link, file, fun, linkOk ) {
            var l='../resources/tmp/'
            php.load({tip: 'mkdir', dir: l}, function (e) { 
                var ll=php.server+"src/upload.php";
                var form_data = new FormData();
                form_data.append('file', file); 
                     
                $.ajax({
                    url: ll,
                    dataType: 'text',
                    cache: false,
                    contentType: false,
                    processData: false,
                    data: form_data,
                    type: 'post',
                    success: function(php_script_response){
                        var llll='../resources/tmp/';
                        var llllll=link;                                          
                        php.load({tip: 'copyDir', dirWith: llll, dir: llllll}, function (e) {
                            php.load({tip: "removeDirRec", dir: llll, }, function (e) {    
                                fun(linkOk)                           
                            })            
                        })
                    }
                });
            })
        }*/


        this.sizeWindow = function(w,h,s){ 
            this.dCont.x=w/s-this.width       
        }
  	}

    set index(value) {
        if(this._index!=value){
            this._index= value;
                  
        }
    }  

}
