import * as THREE from "three";


const houseVertexes = new Float32Array([
    60, -75, -125,  // v0
    60, -75, 125,   // v1
    60, 45, 125,    // v2
    60, 45, -125,   // v3
    -60, -75, -125, // v4
    -60, -75, 125,  // v5
    -60, 45, 125,   // v6
    -60, 45, -125,  // v7
    0, 75, -125,    // v8
    0, 75, 125,     // v9
]);


const houseIndexes = [
    0, 1, 2,
    0, 2, 3,
    0, 3, 7,
    0, 7, 4,
    0, 4, 5,
    0, 5, 1,
    1, 6, 2,
    1, 5, 6,
    4, 6, 5,
    4, 7, 6,
    2, 9, 3,
    3, 9, 8,
    6, 7, 8,
    6, 8, 9,
    3, 8, 7,
    2, 6, 9,
];


const houseGeometry = new THREE.BufferGeometry();

houseGeometry.setIndex(houseIndexes);

houseGeometry.setAttribute("position",
    new THREE.BufferAttribute(houseVertexes, 3)
);

export default {
    houseGeom: houseGeometry,
}
