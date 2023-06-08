import * as THREE from "three";
import { generateUUID } from "three/src/math/MathUtils";

const loader = new THREE.ImageLoader();

// var heightmap;
// 
// loader.load(
//     '../heightmap.png',
//     (image) => {
//         heightmap = image;
//     },
//     undefined,
//     () => {
//         console.error('An error happened.');
//     }
// );
// 
// function convertPixel(x, y) {
//     const position = (x + heightmap.width * y) * 4;
//     return heightmap.pixels[position] / 255.0;
// }
// 
// function bilinearSample(xf, yf) {
//     let w = heightmap.width - 1;
//     let h = heightmap.height - 1;
// 
//     let x1 = Math.floor(xf * w);
//     let y1 = Math.floor(yf * h);
//     let x2 = Math.min(Math.max(x1 + 1, 0), w);
//     let y2 = Math.min(Math.max(y1 + 1, 0), h);
// 
//     let xp = xf * w - x1;
//     let yp = yf * h - y1;
// 
//     let p11 = convertPixel(x1, y1);
//     let p21 = convertPixel(x2, y1);
//     let p12 = convertPixel(x1, y2);
//     let p22 = convertPixel(x2, y2);
// 
//     let px1 = xp * (p21 - p11) + p11;
//     let px2 = xp * (p22 - p12) + p12;
// 
//     return yp * (px2 - px1) + px1;
// }


const geometry = new THREE.PlaneGeometry(1000, 1000, 500, 500);


const heightMapTexture = new THREE.TextureLoader().load(
    "../heightmap.png",
    undefined,
    undefined,
    () => {
        console.error("fail to source heightmap");
    }
);


const terrainMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    map: heightMapTexture,
    bumpMap: heightMapTexture,
    displacementMap: heightMapTexture,
    displacementScale: 300,
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
