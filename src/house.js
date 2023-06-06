import * as THREE from "three";


const houseVertexes = new Float32Array([
    60, 45, 125,    // v2
    60, 45, -125,   // v3
    -60, 45, 125,   // v6
    -60, 45, -125,  // v7
    0, 75, -125,    // v8
    0, 75, 125,     // v9
]);


const houseIndexes = [
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


class HouseWallsGeometry extends THREE.BufferGeometry {
    constructor() {
        super();

        this.setAttribute(
            "position",
            new THREE.BufferAttribute(
                new Float32Array([
                    60, -75, -125,  // v0
                    60, -75, 125,   // v1
                    60, 45, 125,    // v2
                    60, 45, -125,   // v3
                    -60, -75, -125, // v4
                    -60, -75, 125,  // v5
                    -60, 45, 125,   // v6
                    -60, 45, -125,  // v7
                ]),
                3)
        );

        this.setIndex([
            2, 1, 0,
            3, 2, 0,
            7, 3, 0,
            4, 7, 0,
            5, 4, 0,
            1, 5, 0,
            2, 6, 1,
            6, 5, 1,
            5, 6, 4,
            6, 7, 4,
        ]);
    }
}


class HouseRoofGeometry extends THREE.BufferGeometry {
    constructor() {
        super();

        this.setAttribute(
            "position",
            new THREE.BufferAttribute(
                new Float32Array([
                    60, 45, -125,
                    60, 45, 125,
                    -60, 45, 125,
                    -60, 45, -125,
                    0, 75, -125,
                    0, 75, 125,
                ]),
                3)
        );

        this.setIndex([
            3, 4, 0,
            5, 2, 1,
            5, 1, 0,
            4, 5, 0,
            5, 3, 2,
            5, 4, 3,
        ]);
    }
}

class House extends THREE.Object3D {
    constructor() {
        super();
        let walls = new THREE.Mesh(new HouseWallsGeometry(),
            new THREE.MeshStandardMaterial({
                color: 0x333333,
                metalness: 1,
            })
        );

        let roof = new THREE.Mesh(new HouseRoofGeometry(),
            new THREE.MeshStandardMaterial({
                color: 0xff5500,
                metalness: 2,
            })
        );

        this.add(walls, roof);
    }
}

export default {
    House: House,
}
