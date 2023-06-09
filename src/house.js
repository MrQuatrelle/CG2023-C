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


class House extends THREE.Object3D {
    constructor() {
        super();
        const walls = new THREE.Mesh(
            new HouseWallsGeometry(),
            new THREE.MeshPhongMaterial({
                color: 0xffffff,
                side: THREE.FrontSide,
            })
        );

        walls.geometry.computeVertexNormals();

        const roof = new THREE.Mesh(
            new HouseRoofGeometry(),
            new THREE.MeshPhongMaterial({
                color: 0xff5500,
                side: THREE.FrontSide,
            })
        );
        roof.geometry.computeVertexNormals();

        const leftWindow = new THREE.Mesh(
            new windowGeometry(),
            new THREE.MeshPhongMaterial({
                color: 0x0033ff88,
                side: THREE.FrontSide,
            })
        );

        leftWindow.geometry.computeVertexNormals();
        leftWindow.position.set(90, 0, 60);

        const rightWindow = new THREE.Mesh(
            new windowGeometry(),
            new THREE.MeshPhongMaterial({
                color: 0x0033ff88,
                side: THREE.FrontSide,

            })
        );
        rightWindow.geometry.computeVertexNormals();
        rightWindow.position.set(-90, 0, 60);

        const door = new THREE.Mesh(
            new doorGeometry(),
            new THREE.MeshPhongMaterial({
                color: "brown",
                side: THREE.FrontSide,

            })
        );
        door.geometry.computeVertexNormals();
        door.position.set(0, -30, 60);

        this.add(walls, roof, leftWindow, rightWindow, door);
    }
}

export default {
    House: House
}
