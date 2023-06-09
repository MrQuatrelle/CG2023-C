import * as THREE from "three";

const isoPerspective = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    5000
);

const stereoCamera = new THREE.StereoCamera();
const dolly = new THREE.Object3D();
dolly.add(stereoCamera);

var target;

function setTarget(t) {
    target = t;
    isoPerspective.lookAt(t);

}

function update() {
    isoPerspective.aspect = window.innerWidth / window.innerHeight;
    isoPerspective.updateProjectionMatrix();
    stereoCamera.updateProjectionMatrix();
}

isoPerspective.position.set(700, 150, 700);
dolly.position.set(700, 150, 700);


export default {
    setTarget: setTarget,
    update: update,
    camera1: isoPerspective,
    camera2: stereoCamera,
}

