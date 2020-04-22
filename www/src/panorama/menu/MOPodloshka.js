

import { MOBaza } from './MOBaza.js';


export class MOPodloshka extends MOBaza {
  	constructor(par,fun) {  
        super(par,fun);
  		this.type="MOPodloshka";
        this.typeNa="Podloshka";
  		var self=this;
        

        var php=new Php()
       
        var ocHeight
        var oComp
        this.dCont=new DCont(par.dCont);

        this.dCComp=new DCont();
        this.button=undefined;
        this.slid
        this.slid1
        this.postIn=function(){
           
            this.window.title="Substrate";
            this.button=new DButton(this.window.content,this.otstup1,this.otstup1,"",function(){ 
                self.object.link="null";
                self.drag()               
            },"resources/image/p0.png");
            this.button.width=this.button.height=this.wh;

            this.button1=new DButton(this.window.content,this.otstup1*2+this.wh,this.otstup1,"",function(base64){ 
                if(base64!=undefined){                   
                    
                    
                    if(self.par.par.par.idBool==true){
                        
                        var ll=self.object._link+""
                        self.object.link=base64
                        self.object._link="notNULL"
                        self.drag() 
                    }else{
                        var ss='../save/'+self.par.par.par.id+"/";
                        var sss='save/'+self.par.par.par.id+"/"+this.files[0].name;                    
                        self.saveFile(ss, this.files[0], function(s){                        
                            self.object.link=s;  
                            self.drag() 
                        },sss) 
                    }

                    
                }                
            },"resources/image/i4.png");
            this.button1.width=this.button1.height=this.wh;
            this.button1.startFile();


            this.window.content.add(this.dCComp);
            this.dCComp.y=this.otstup1*2+this.wh;


            oComp={}
            ocHeight=0
            oComp["visible"]=new DCheckBox(this.dCComp,this.otstup1,ocHeight,"visible",function(){
                self.object.visible=this.value;
            })

            ocHeight+=32


            oComp["x"]=new DSliderBig(this.dCComp,this.otstup1,ocHeight,function(){
                self.object.x=this.value;
            },"x",-this.whSize/2, this.whSize/2)
            oComp["x"].width=this.width-this.otstup1*2
            oComp["x"].okrug=1
            ocHeight+= this.wh

            oComp["y"]=new DSliderBig(this.dCComp,this.otstup1,ocHeight,function(){
                self.object.y=this.value;
            },"y",-this.whSize/2, this.whSize/2)
            oComp["y"].width=this.width-this.otstup1*2
            oComp["y"].okrug=1
            ocHeight+= this.wh

            oComp["z"]=new DSliderBig(this.dCComp,this.otstup1,ocHeight,function(){
                self.object.z=this.value;
            },"z",1, 300)
            oComp["z"].width=this.width-this.otstup1*2
            oComp["z"].okrug=1
            ocHeight+= (this.wh)

            oComp["rotation"]=new DSliderBig(this.dCComp,this.otstup1,ocHeight,function(){
                self.object.rotation=this.value;
            },"rotation",-180, 180)
            oComp["rotation"].width=this.width-this.otstup1*2
            oComp["rotation"].okrug=1
            ocHeight+= (this.wh)

            oComp["alpha"]=new DSliderBig(this.dCComp,this.otstup1,ocHeight,function(){
                self.object.alpha=this.value;
            },"alpha",0, 100)
            oComp["alpha"].width=this.width-this.otstup1*2
            oComp["alpha"].okrug=1
            ocHeight+= (this.wh)

            oComp["scale"]=new DSliderBig(this.dCComp,this.otstup1,ocHeight,function(){
                self.object.scale=this.value;
            },"scale",1, 500)
            oComp["scale"].width=this.width-this.otstup1*2
            oComp["scale"].okrug=1
            ocHeight+= (this.wh)
        }

        
        
        this.drag=function(){
            
            if(self.object.link=="null"){
                this.button.activMouse=false
                this.button1.activMouse=true
                this.window.height=100;
                this.dCComp.visible=false
                return;
            }

            this.dCComp.visible=true


            this.window.height=ocHeight+this.dCComp.y+this.otstup1+22;

            for (let s in oComp) {
                oComp[s].value=self.object[s]
            }


            
           /* self.slid.value=Math.round(self.object.position.x)
            self.slid1.value=Math.round(self.object.position.y)*/
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


        this.saveFile = function (link, file, fun, linkOk ) {
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
        }


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
