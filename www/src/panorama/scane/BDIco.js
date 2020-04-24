



export class BDIco  {
  	constructor(arr) {          
        this.type="BDIco";
        var self=this;
        this.scale=0.0068;

        this.textureLoader=new THREE.TextureLoader();

        this.mDebag = new THREE.MeshBasicMaterial({color:0xff0000,transparent:true, opacity:0.5})  

        this.gSphere = new THREE.SphereBufferGeometry( 20, 32, 32 );
        this.gPlan = new THREE.PlaneBufferGeometry( 1, 1, 1, 1);
        this.gCylinder = new THREE.CylinderBufferGeometry( 1, 1, 1, 32 );

        this.array=[];

        for (var i = 0; i < arr.length; i++) {
            this.array[i]=new BDBlok(this,arr[i]);
        }

  	} 
}

export class BDBlok  {
    constructor(par, obj) { 
        this.obj=obj;
        this.wh=obj.wh;
        this.radius=obj.radius;

        this.textur= par.textureLoader.load(obj.aPic[0]);
        this.textur1= par.textureLoader.load(obj.aPic[1]);
        this.textur2= par.textureLoader.load(obj.aPic[2]);
        this.textur3= par.textureLoader.load(obj.aPic[3]);

        this.material = new THREE.MeshBasicMaterial({map:this.textur})  
        this.material1 = new THREE.MeshBasicMaterial({map:this.textur1}) 
        this.material2 = new THREE.MeshBasicMaterial({map:this.textur2})  
        this.material3 = new THREE.MeshBasicMaterial({map:this.textur3}) 

        this.aM=[this.material,this.material1,this.material2,this.material3]

    }
}


