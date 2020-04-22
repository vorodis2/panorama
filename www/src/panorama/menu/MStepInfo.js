



export default class MStepInfo {
    constructor(par, fun, infoArr, buttonLinks) {
        this.type = 'MStepInfo'
        this.par = par
        this.fun = fun
        this.infoArr = infoArr
        this.buttonLinks = buttonLinks

        this.otstup = this.par.otstup;
        this.wh = this.par.wh;

        this._index = -1
        this.dCont = new DCont()
        this._active = false;

        this._visible=false

        this._tipVisi=undefined;

        this.button = new DButton(this.dCont, this.otstup, 0, '', () => {
            this.active = !this.active;
        }, buttonLinks[0])


        this.button.width=this.button.height=this.wh;




        
        this.panel = new DPanel(this.dCont, this.otstup*2+this.wh, 0)
        //this.panel.div.style.overflow = 'hidden auto'
        this.label = new DLabel(this.panel, this.otstup, this.otstup, '')
        this.label.div.style.whiteSpace = 'pre-line';

        this.panel.visible=false;



        this.buttonV2D = new DButton(this.par.dCont, 0, this.otstup, "", () => {
            this.fun('tipVisi',!this.tipVisi)
           /* this.button.loadImeg(`resources/data/${this.view2d ? 7 : 6}/100.png`)
            this.view2d = !this.view2d
            this.fun('tipVisi', +this.view2d)*/

        })//, 'resources/data/6/100.png')

        this.buttonV2D.width = this.buttonV2D.height = 64





        var w=100
        var h=100
        var s=1
        this.sizeWindow= function (_w, _h, _s) {
            if(_w)  {
                w=_w
                h=_h
                s=_s
            }
            this.buttonV2D.x=w/s-this.buttonV2D.height-this.otstup;

            if(this._visible!=false){
                this.button.y=h/s-this.button.height-this.otstup;
                this.label.width=w/s-this.button.height-this.otstup*4;
                this.panel.width=w/s-this.button.height-this.otstup*3;
                this.panel.height=this.label.getRect().height+this.otstup*2;
                this.panel.y=h/s-this.panel.height-this.otstup;  
                trace(this.label.getRect())  

                

            }

        }
    }

    set tipVisi(value) {
        if(this._tipVisi !== value) {
            this._tipVisi  = value;
            if(!value)this.buttonV2D.loadImeg('resources/data/6/100.png')  
            else this.buttonV2D.loadImeg('resources/data/7/100.png') 

             
        }        
    }
    get tipVisi() {
        return this._tipVisi
    }

   

    set visible(value) {
        if(this._visible !== value) {
            this._visible  = value;
            if(value) {
                this.par.dCont.add(this.dCont)
            }  else{
                this.par.dCont.remove(this.dCont)
            }
            this.sizeWindow()      
        }        
    }
    get visible() {
        return this._visible
    }



    set active(value) {
        if(this._active !== value) {
            this._active  = value;
            this.panel.visible=value;         
        }        
    }
    get active() {
        return this._active
    }



    set index(value) {
        if (this._index !== value) {
            this._index = value
            if(this.infoArr[value]!=undefined){
                this.label.text=this.infoArr[value];
                 

                this.sizeWindow()

                this.visible=true;                
            } else {
                this.visible=false;
            }            
        }
        
    }
    get index() {
        return this._index
    }
}