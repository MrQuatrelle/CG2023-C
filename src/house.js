import * as THREE from "three";


class HouseWallsGeometry extends THREE.BufferGeometry {
    constructor() {
        super();

        this.setAttribute(
            "position",
            new THREE.BufferAttribute(
                new Float32Array([
                    -125, -75, 60,  // v0
                    125, -75, 60,   // v1
                    125, 45, 60,    // v2
                    -125, 45, 60,   // v3
                    -125, -75, -60, // v4
                    125, -75, -60,  // v5
                    125, 45, -60,   // v6
                    -125, 45, -60,  // v7
                ]),
                3)
        );

        this.setIndex([
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
                    -125, 45, 60,
                    125, 45, 60,
                    125, 45, -60,
                    -125, 45, -60,
                    -125, 75, 0,
                    125, 75, 0,
                ]),
                3
            )
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
                    -15, -40, 0,
                    15, -40, 0,
                    15, 40, 0,
                    -15, 40, 0,
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
                side: THREE.DoubleSide,
            })
        );

        walls.geometry.computeVertexNormals();

        const roof = new THREE.Mesh(
            new HouseRoofGeometry(),
            new THREE.MeshPhongMaterial({
                color: 0xff5500,
                side: THREE.DoubleSide,
            })
        );
        roof.geometry.computeVertexNormals();

        const leftWindow = new THREE.Mesh(
            new windowGeometry(),
            new THREE.MeshPhongMaterial({
                color: 0x0033ff88,
                side: THREE.DoubleSide,
            })
        );

        leftWindow.geometry.computeVertexNormals();
        leftWindow.position.set(80, 0, 60);

        const rightWindow = new THREE.Mesh(
            new windowGeometry(),
            new THREE.MeshPhongMaterial({
                color: 0x0033ff88,
                side: THREE.DoubleSide,

            })
        );
        rightWindow.geometry.computeVertexNormals();
        rightWindow.position.set(-80, 0, 60);

        const door = new THREE.Mesh(
            new doorGeometry(),
            new THREE.MeshPhongMaterial({
                color: "brown",
                side: THREE.DoubleSide,

            })
        );
        door.geometry.computeVertexNormals();
        door.position.set(0, -35, 60);

        this.add(walls, roof, leftWindow, rightWindow, door);
    }
}

export default {
    House: House
}
