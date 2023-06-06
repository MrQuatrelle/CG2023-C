import * as THREE from "three";

const front = new THREE.OrthographicCamera(
    - window.innerWidth / 2,
    window.innerWidth / 2,
    window.innerHeight / 2,
    - window.innerHeight / 2,
);

const lateral = new THREE.OrthographicCamera(
    - window.innerWidth / 2,
    window.innerWidth / 2,
    window.innerHeight / 2,
    - window.innerHeight / 2,
);

const top = new THREE.OrthographicCamera(
    - window.innerWidth / 2,
    window.innerWidth / 2,
    window.innerHeight / 2,
    - window.innerHeight / 2,
);

const bottom = new THREE.OrthographicCamera(
    - window.innerWidth / 2,
    window.innerWidth / 2,
    window.innerHeight / 2,
    - window.innerHeight / 2,
);

const isoOrthographic = new THREE.OrthographicCamera(
    - window.innerWidth / 2,
    window.innerWidth / 2,
    window.innerHeight / 2,
    - window.innerHeight / 2,
);

const isoPerspective = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    3000
);

var target;
const cameras = [front, lateral, top, bottom, isoOrthographic, isoPerspective]

function setTarget(t) {
    target = t;
    cameras.forEach((c) => { c.lookAt(t) });
}

function update() {
    cameras.forEach((c) => {
        if (c.isOrthographicCamera) {
            c.right = window.innerWidth / 2;
            c.left = -window.innerWidth / 2;
            c.top = window.innerHeight / 2;
            c.bottom = -window.innerHeight / 2;
        }
        else if (c.isPerspectiveCamera) {
            c.aspect = window.innerWidth / window.innerHeight;
        }

        c.updateProjectionMatrix();
    });

}

lateral.position.set(1000, 240, 110);
front.position.set(95, 240, 1000);
top.position.set(95, 1000, 110);
bottom.position.set(0, -500, 0);
isoOrthographic.position.set(600, 600, 600);
isoPerspective.position.set(600, 600, 600);

export default {
    setTarget: setTarget,
    update: update,
    camera1: front,
    camera2: lateral,
    camera3: top,
    camera4: isoOrthographic,
    camera5: isoPerspective,
    camera6: bottom,
}

