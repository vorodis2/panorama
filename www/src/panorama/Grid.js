

export class Grid extends THREE.Object3D {
    constructor(_size, _sah, _link,_alpha) {
        super();
        this.type="Grid";
        let loader = new THREE.TextureLoader();
        this.texture=loader.load(_link)
        this.texture.wrapS = THREE.RepeatWrapping;
        this.texture.wrapT = THREE.RepeatWrapping;
        this.texture.repeat.set( _sah, _sah );



        let material=new THREE.MeshPhongMaterial({color:0xffffff, map:this.texture})
        material.side=THREE.DoubleSide  


        let mesh=new THREE.Mesh( new THREE.PlaneBufferGeometry( _size, _size,1,1), material)        
        this.add(mesh)
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if(_alpha!=undefined){
            material.transparent=true
            material.opacity=_alpha;
        }


  	}
}
