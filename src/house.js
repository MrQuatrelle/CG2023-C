import * as THREE from "three";


class HouseWallsGeometry extends THREE.BufferGeometry {
    constructor() {
        super();

        this.setAttribute(
            "position",
            new THREE.BufferAttribute(
                new Float32Array(this.#generateFrontWallVertexes().concat([
                    125, -75, 60,   // l0
                    125, -75, -60,  // l1
                    125, 45, -60,   // l2
                    125, 45, 60,    // l3
                    -125, -75, -60, // r0
                    -125, -75, 60,  // r1
                    -125, 45, 60,  // r2
                    -125, 45, -60,  // r3
                    125, -75, -60,  // b0
                    -125, -75, -60, // b1
                    -125, 45, -60,  // b2
                    125, 45, -60,   // b3
                ])),
                3)
        );

        this.setIndex(this.#generateFrontWallTriangles().concat([
            22, 23, 24,
            22, 24, 25,
            26, 27, 28,
            26, 28, 29,
            30, 31, 32,
            30, 32, 33,
            34, 35, 36,
            34, 36, 37,
        ]));
    }

    #generateFrontWallVertexes() {
        return [
            -125, -75, 60,  // f0
            -15, -75, 60,   // f0
            -15, -15, 60,   // f0
            -125, -15, 60,   // f0

            -105, -15, 60,   // f0
            -105, 15, 60,   // f0
            -125, 15, 60,   // f0

            -125, 45, 60,   // f0
            125, 45, 60,   // f0
            125, 15, 60,   // f0

            105, 15, 60,   // f0
            105, -15, 60,   // f0
            125, -15, 60,   // f0

            15, -15, 60,   // f0
            15, -75, 60,   // f0
            125, -75, 60,   // f0

            75, -15, 60,   // f0
            75, 15, 60,   // f0
            15, 15, 60,   // f0

            -15, 15, 60,   // f0
            -75, 15, 60,   // f0
            -75, -15, 60,   // f0
        ];
    }

    #generateFrontWallTriangles() {
        return [
            0, 1, 2,
            0, 2, 3,

            3, 4, 5,
            3, 5, 6,

            6, 8, 7,
            6, 9, 8,

            9, 10, 11,
            9, 11, 12,

            12, 13, 14,
            12, 14, 15,

            13, 16, 17,
            13, 17, 18,

            2, 19, 20,
            2, 20, 21,
        ];
    }
}


class HouseRoofGeometry extends THREE.BufferGeometry {
    constructor() {
        super();

        this.setAttribute(
            "position",
            new THREE.BufferAttribute(
                new Float32Array([
                    -125, 45, 60,   //fr
                    125, 45, 60,    //fl
                    125, 75, 0,     //tl
                    -125, 75, 0,    //tr
                    125, 45, 60,    //fl
                    125, 45, -60,   //bl
                    125, 75, 0,     //tl
                    125, 45, -60,   //bl
                    -125, 45, -60,  //br
                    -125, 75, 0,    //tr
                    125, 75, 0,     //tl
                    -125, 45, -60,  //br
                    -125, 45, 60,   //fr
                    -125, 75, 0,    //tr
                ]),
                3
            )
        );

        this.setIndex([
            0, 1, 2,
            0, 2, 3,
            4, 5, 6,
            7, 8, 9,
            7, 9, 10,
            11, 12, 13,
        ]);
    }
}


class windowGeometry extends THREE.BufferGeometry {
    constructor() {
        super();
        this.setAttribute(
            "position",
            new THREE.BufferAttribute(
                new Float32Array([
                    -15, -15, 0,
                    15, -15, 0,
                    15, 15, 0,
                    -15, 15, 0,
                ]),
                3
            )
        );

        this.setIndex([
            0, 1, 2,
            0, 2, 3,
        ]);
    }
}

class doorGeometry extends THREE.BufferGeometry {
    constructor() {
        super();
        this.setAttribute(
            "position",
            new THREE.BufferAttribute(
                new Float32Array([
                    -15, -45, 0,
                    15, -45, 0,
                    15, 45, 0,
                    -15, 45, 0,
                ]),
                3
            )
        );

        this.setIndex([
            0, 1, 2,
            0, 2, 3,
        ]);
    }
}

const doorMaterials = [
    new THREE.MeshLambertMaterial({
        color: "brown",
        side: THREE.FrontSide,
    }),
    new THREE.MeshPhongMaterial({
        color: "brown",
        side: THREE.FrontSide,
    }),
    new THREE.MeshToonMaterial({
        color: "brown",
        side: THREE.FrontSide,
    }),
    new THREE.MeshBasicMaterial({
        color: "brown",
        side: THREE.FrontSide,
    }),

    ];

const wallsMaterials = [
    new THREE.MeshLambertMaterial({
                color: 0xffffff,
                side: THREE.FrontSide,
            }),
    new THREE.MeshPhongMaterial({
                color: 0xffffff,
                side: THREE.FrontSide,
            }),
    new THREE.MeshToonMaterial({
                color: 0xffffff,
                side: THREE.FrontSide,
            }),
    new THREE.MeshBasicMaterial({
                color: 0xffffff,
                side: THREE.FrontSide,
            }),
    ];

const roofMaterials = [
    new THREE.MeshLambertMaterial({
        color: 0xff5500,
        side: THREE.FrontSide,
    }),
    new THREE.MeshPhongMaterial({
        color: 0xff5500,
        side: THREE.FrontSide,
    }),
    new THREE.MeshToonMaterial({
        color: 0xff5500,
        side: THREE.FrontSide,
    }),
    new THREE.MeshBasicMaterial({
        color: 0xff5500,
        side: THREE.FrontSide,
    })
];

const windowsMaterials = [
    new THREE.MeshLambertMaterial({
        color: 0x0033ff88,
        side: THREE.FrontSide,
    }),
    new THREE.MeshPhongMaterial({
        color: 0x0033ff88,
        side: THREE.FrontSide,
    }),
    new THREE.MeshToonMaterial({
        color: 0x0033ff88,
        side: THREE.FrontSide,
    }),
    new THREE.MeshBasicMaterial({
        color: 0x0033ff88,
        side: THREE.FrontSide,
    })
];


class House extends THREE.Object3D {
    #walls
    #roof
    #leftWindow
    #rightWindow
    #door
    constructor() {
        
        super();
        this.#walls = new THREE.Mesh(
            new HouseWallsGeometry(),
            wallsMaterials[0]
        );

        this.#walls.geometry.computeVertexNormals();

        this.#roof = new THREE.Mesh(
            new HouseRoofGeometry(),
            roofMaterials[0]
        );
        this.#roof.geometry.computeVertexNormals();

        this.#leftWindow = new THREE.Mesh(
            new windowGeometry(),
            windowsMaterials[0]
        );

        this.#leftWindow.geometry.computeVertexNormals();
        this.#leftWindow.position.set(90, 0, 60);

        this.#rightWindow = new THREE.Mesh(
            new windowGeometry(),
            windowsMaterials[0]
        );

        this.#rightWindow.geometry.computeVertexNormals();
        this.#rightWindow.position.set(-90, 0, 60);

        this.#door = new THREE.Mesh(
            new doorGeometry(),
            doorMaterials[0]
        );
        this.#door.geometry.computeVertexNormals();
        this.#door.position.set(0, -30, 60);

        this.add(this.#walls, this.#roof, this.#leftWindow, this.#rightWindow, this.#door);
    }
    changeMaterials(type){
        this.#walls.material = wallsMaterials[type];
        this.#rightWindow.material = windowsMaterials[type];
        this.#leftWindow.material = windowsMaterials[type];
        this.#door.material = doorMaterials[type];
        this.#roof.material = roofMaterials[type];
    }
}

export default {
    House: House
}
