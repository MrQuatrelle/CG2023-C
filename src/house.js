import * as THREE from "three";


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
            0, 2, 1,
            0, 3, 2,
        ]);
    }
}


class House extends THREE.Object3D {
    constructor() {
        super();
        const walls = new THREE.Mesh(
            new HouseWallsGeometry(),
            new THREE.MeshStandardMaterial({
                color: 0xffffff,
            })
        );
        walls.castShadow = true;
        walls.receiveShadow = true;

        const roof = new THREE.Mesh(
            new HouseRoofGeometry(),
            new THREE.MeshStandardMaterial({
                color: 0xff5500,
            })
        );
        roof.castShadow = true;
        roof.receiveShadow = true;

        const leftWindow = new THREE.Mesh(
            new windowGeometry(),
            new THREE.MeshStandardMaterial({
                color: 0x0033ff88,
                
            })
        );
        leftWindow.castShadow = true;
        leftWindow.receiveShadow = true;

        leftWindow.position.set(90, 0, 30);

        this.add(walls, roof, leftWindow);
    }
}

export default {
    House: House
}
