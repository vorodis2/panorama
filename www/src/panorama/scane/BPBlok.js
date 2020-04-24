



export class BPBlok  {
  	constructor(par, obj, fun) {          
        this.type="BPBlok";
        var self=this;


        this.par=par;
        this.ico=obj.ico;
        this.fun=fun;

        this.par.visi3D;
        this._life=false;

        this._active=false;
        this._active1=false;

        this.bMat=this.par.bdIco.array[obj.ico]

        this.ss=0.015


        this.content3d = new THREE.Object3D();
        this.mesh = new THREE.Mesh(this.par.bdIco.gSphere,this.par.bdIco.mDebag);
        this.content3d.add(this.mesh);



        this.c2d = new THREE.Object3D();        
        this.mesh = new THREE.Mesh(this.par.bdIco.gCylinder,this.par.bdIco.mDebag);
        this.mesh.rotation.x=Math.PI/2
        this.c2d.add(this.mesh);

        this.mesh.scale.set(this.ss*this.bMat.radius,0.001,this.ss*this.bMat.radius);
        this.mesh.blok=this;

        this.mesh1 = new THREE.Mesh(this.par.bdIco.gPlan,this.bMat.material);
        this.mesh1.scale.set(this.ss*this.bMat.wh,this.ss*this.bMat.wh,this.ss*this.bMat.wh);
        this.mesh1.rotation.x=Math.PI;
        this.c2d.add(this.mesh1);





        this.pNull=new THREE.Vector3(0,0,0);

        this.object=undefined    
        this.setObject= function (o) { 
            this.object=o; 
            this.content3d.position.set(o.x, o.y, o.z);
            this.content3d.updateMatrixWorld();
        }

        this.drag2d = function () {
            //this.content3d.updateMatrixWorld();
            let p=this.content3d.localToWorld(this.pNull.clone());

            this.toScreenXY(p)

            

            this.c2d.position.x = vectorScreen.x*this.par.bdIco.scale;
            this.c2d.position.y = vectorScreen.y*this.par.bdIco.scale;


           // trace(this.idArr+"  ",vectorScreen, p)
        }

        /*vS1=this.toScreenXY(this.content3d.localToWorld(this.position.clone()));*/
        var vectorScreen = new THREE.Vector2(0,0);  
        this.toScreenXY = function(vector3) { //
            vector3.project( visi3D.camera );
            vectorScreen.x = Math.round( (   vector3.x  ) * visi3D._width);
            vectorScreen.y = Math.round( ( - vector3.y  ) * visi3D._height);            
        }



        this.dragActive = function() { //
            let sah=0;
            if(this._active==true){
                if(this._active1==true){
                    sah=2;
                }else{
                    sah=3;
                }
            }else{
                if(this._active1==true){
                    sah=0;
                }else{
                    sah=1;
                }
            }
            
            if(this.mesh1.xzSah!=sah){
                this.mesh1.xzSah=sah;
                this.mesh1.material=this.bMat.aM[sah];
                this.par.visi3D.intRend=1
            }


        }



        this.setObject(obj)

       
  	} 

    set active(value) {
        if (this._active != value) {
            this._active = value;                       
            this.dragActive()
        }
    }
    get active() { return this._active; } 

    set active1(value) {
        if (this._active1 != value) {
            this._active1 = value;                       
            this.dragActive()
        }
    }
    get active1() { return this._active1; }     


    set life(value) {
        if (this._life != value) {
            this._life = value; 
            if(value==true) {              
                this.par.content3d.add(this.content3d);
                this.par.c2d.add(this.c2d);
                this.par.visi3D.addChildMouse(this.mesh)
            }   else{
                this.par.content3d.remove(this.content3d);
                this.par.c2d.remove(this.c2d);
                this.par.visi3D.removeChildMouse(this.mesh)
            }             
            
        }
    }
    get life() { return this._life; } 
}


