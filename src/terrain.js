import * as THREE from "three";




const heightMapTexture = new THREE.TextureLoader().load(
    "../heightmap.png",
    undefined,
    undefined,
    () => {
        console.error("fail to source heightmap");
    }
);


const terrainMaterials = [
    new THREE.MeshLambertMaterial({
        color: 0x92745b,
        map: heightMapTexture,
        bumpMap: heightMapTexture,
        displacementMap: heightMapTexture,
        displacementScale: 3000,
        shadowSide: THREE.DoubleSide,
    }),
    new THREE.MeshPhongMaterial({
        color: 0x92745b,
        map: heightMapTexture,
        bumpMap: heightMapTexture,
        displacementMap: heightMapTexture,
        displacementScale: 3000,
        shininess: 5,
        shadowSide: THREE.DoubleSide,
    }),
    new THREE.MeshToonMaterial({
        color: 0x92745b,
        map: heightMapTexture,
        bumpMap: heightMapTexture,
        displacementMap: heightMapTexture,
        displacementScale: 3000,
        shadowSide: THREE.DoubleSide,
    }),
    new THREE.MeshBasicMaterial({
        color: 0x92745b,
        map: heightMapTexture,
        shadowSide: THREE.DoubleSide,
    })
];

class Terrain extends THREE.Object3D{
    #terrain
    constructor(){
        super();
        const geometry = new THREE.PlaneGeometry(5000, 5000, 500, 500);
        this.#terrain = new THREE.Mesh(geometry, terrainMaterials[0]);
        this.#terrain.rotateX(Math.PI / -2);
        this.#terrain.geometry.computeVertexNormals();
        this.add(this.#terrain)

    }
    changeMaterials(type){
        this.#terrain.material = terrainMaterials[type];
    }

}

export default {
    Terrain: Terrain
}
