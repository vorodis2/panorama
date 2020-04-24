



export class DDebugColl  {
  	constructor(dCont,x,y) {  		
  		this.type="DDebugColl";
  		var self=this;;
        this.coll=undefined;
            
        this.scale=1
        this.otstup=30


        this.window = new DWindow(dCont,x,y,"DDebugColl");
        this.panel=new DPanel(this.window.content,this.otstup,this.otstup);
        this.panel.color="#cccccc";

        this.array=[]

        var p,r
        this.addColl=function (coll) {
            this.coll=coll
        }


        this.upDate=function () {
            
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].visible=false
            }

            this.panel.width=this.coll.world.width*this.scale
            this.panel.height=this.coll.world.height*this.scale
            
            this.window.width=this.otstup*2+this.panel.width
            this.window.height=this.otstup*2+this.panel.height+32


            for (var i = 0; i < this.coll.arrRect.length; i++) {
                if(this.array[i]==undefined){
                    this.array[i]=new DPanel(this.panel,0,0);
                    this.array[i].alpha=0.5
                }
                p=this.array[i]
                r=this.coll.arrRect[i]
                p.visible=true;
                p.x=r.position.x+r.x;
                p.y=r.position.y+r.y;
            
            }    


        }




      
  	}
}
