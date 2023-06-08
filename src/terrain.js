import * as THREE from "three";

const geometry = new THREE.PlaneGeometry(5000, 5000, 500, 500);


const heightMapTexture = new THREE.TextureLoader().load(
    "../heightmap.png",
    undefined,
    undefined,
    () => {
        console.error("fail to source heightmap");
    }
);


const terrainMaterial = new THREE.MeshPhongMaterial({
    color: 0x92745b,
    map: heightMapTexture,
    bumpMap: heightMapTexture,
    displacementMap: heightMapTexture,
    displacementScale: 3000,
    shininess: 5,
    shadowSide: THREE.DoubleSide,
});

const terrain = new THREE.Mesh(geometry, terrainMaterial);

terrain.castShadow = true;
terrain.receiveShadow = true;

terrain.rotateX(Math.PI / -2);
terrain.geometry.computeVertexNormals();

export default {
    terrain: terrain,
}
