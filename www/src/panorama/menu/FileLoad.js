

export class FileLoad  {
  	constructor(object,fun) {  		
  		this.type="FileLoad";
  		var self=this;
        this.object=object
        this.fun=fun
        this.wh=18
        this._kol=0;


        this.dCont=new DCont(this.object.parent);
        this.dCont.x=this.object.x+this.object.width-2-this.wh;
        this.dCont.y=this.object.y+this.object.height-2-this.wh;



        this.panel=new DPanel(this.dCont)
        this.label=new DLabel(this.panel,3.5,0,"9")
        this.label.color=dcmParam.colorText;
        this.label.div.style.pointerEvents="none";
        this.panel.width=this.panel.height=this.label.width=this.label.height=this.wh
        this.panel.borderRadius=this.wh/2
        this.panel.color=dcmParam.activButton;
        this.panel.visible=false;



        this.array=[]       
        
        this.clear=function(){  
            this.array=[]
            this.kol = this.array.length; 
        }

        this.set=function(a){             
            for (var i = 0; i < a.length; i++) {
                if(this.array.length==9){
                    mInfo.setFun(
                        "Огроничение количества",
                        "Загружать можно не более 9 файлов. Вы можете очистить все загруженые файлы",
                        function(s){
                            if(s=="ok") self.clear();                           
                        }
                    )
                    this.kol = this.array.length;
                    return
                }
                if (a[i].size > 2096000) {
                    mInfo.setFun(
                        "Фаил слишком большой!",
                        "Фаил "+a[i].name+" имеет слишком большой размер. Файлы должны быить меньше 2 мегобайт.",
                        function () {
                        }
                    );
                    return
                }
                trace(a[i])

                this.array.push(a[i])                
            }            
            this.kol = this.array.length;             
        }

  	}

    set kol(value) {
        if(this._kol!=value){
            this._kol= value;            
            if(this._kol<=0){
                this.panel.visible=false
            }else{
                this.panel.visible=true
                this.label.text=this._kol
            }
                 
        }
    }    
    get kol() { return  this._kol;}

}