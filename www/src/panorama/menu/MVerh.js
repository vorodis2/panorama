


export class MVerh  {
  	constructor(par,fun) {  		
  		this.type="MVerh";
  		var self=this;
        this.par=par
        this.fun=fun

        this._id=this.par._id;

        let otstup=this.par.otstup;
        let otstup1=this.par.otstup1;
        let wh=this.par.wh;




        let dCont=new DCont(par.dCont);        
        dCont.height=wh+otstup*2

        

        let panel = new DPanel(dCont,300,otstup)
        panel.height=wh+otstup*3

        let dCBut=new DCont(panel); 
        var a=[]

        for (var i = 0; i < 3; i++) {
            var x=(otstup+wh)*i
           // if(i==3)x=(otstup+wh)*(i-4)

            a[i]=new DButton(dCBut,x,otstup,""+i,function(){
                if(this.idArr==0){                    
                    self.par.par.fManager.activOne(self.par.par.home)
                }
                if(this.idArr==1){
                    self.par.par.fManager.activOne(self.par.par.fManager.floor.podloshka)                   
                }
                if(this.idArr==2)self.save()
            })
            a[i].idArr=i;
            a[i].width=a[i].height=wh;

          /*  if(i==3){
                a[i].activMouse=false
                a[i].alpha=0.25
            }*/
        }
        this.aButton=a
        //self.par.mProdject.addButton(a[1])


        this.save = function(){ 
            a[2].color=dcmParam.activButton;            
           
            
            if(this._id!=-1){

                if(this.par.par.idBool==false){
                    

                    fun("saveThisProdukt",function(s){                
                        a[2].color=dcmParam.color;                    
                    }) 
                    return

                }
            }

            fun("saveProdukt",function(s){                
                self.par.mInfo.setFunInput(
                    "Save",
                    "Produkt saved!!",
                    s,
                    function(s){ 
                        a[2].color=dcmParam.color;                            
                    }
                );
            })     
            
        }

        this.sizeWindow = function(w,h,s){ 
            panel.width= w/s-otstup-400
            dCBut.x=   panel.width-(otstup+wh)*3 -otstup   
        }
    }

    set id(value) {
        if(this._id!=value){
            this._id= value;           
        }
    }    
    get id() { return  this._id;}  


}