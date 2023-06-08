import * as THREE from "three";
import cameraControl from "./camera.js";
import house from "./house.js";
import terrain from "./terrain.js";

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;

var ufoShip, camera;

main();

function main() {
    // initializations
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.needsUpdate = true;
    document.body.appendChild(renderer.domElement);
    let axesHelper = new THREE.AxesHelper(1000);
    cameraControl.setTarget(new THREE.Vector3(0, 0, 0));
    camera = cameraControl.camera4;

    // ufoShip = new ufo.Ufo();

    // scene.add(ufoShip,axesHelper);
    const dl = new THREE.SpotLight(0xffffff, 10, 10000, 10);
    dl.position.set(100, 200, 100);
    dl.castShadow = true;
    dl.lookAt(0, 0, 0);

    const dlHelper = new THREE.DirectionalLightHelper(dl);

    // TODO: TESTING
    const h = new house.House();
    h.position.set(0, 100, 0);

    scene.add(axesHelper, dl, h, terrain.terrain);

    animate();
}

function animate() {
    // tldr, everytime the program has time to render a frame, it'll call this
    // function

    window.addEventListener("keydown", keydownHandler);
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    cameraControl.update();
});

let keysPressed = {};

function keydownHandler(e) {
    keysPressed[e.key] = true;

    switch (e.key) {
        case '1':
            console.log("[INFO]: showing camera1");
            camera = cameraControl.camera1;
            break;

        case '2':
            console.log("[INFO]: showing camera2");
            camera = cameraControl.camera2;
            break;

        case '3':
            console.log("[INFO]: showing camera3");
            camera = cameraControl.camera3;
            break;

        case '4':
            console.log("[INFO]: showing camera4");
            camera = cameraControl.camera4;
            break;

        case '5':
            console.log("[INFO]: showing camera5");
            camera = cameraControl.camera5;
            break;

        case '6':
            console.log("[INFO]: showing camera6");
            camera = cameraControl.camera6;
            break;

        case 'w':
            console.log("[INFO]: showing wiremesh");
            scene.traverse((c) => {
                if (c.isMesh) {
                    c.material.wireframe = !(c.material.wireframe);
                    c.material.needsUpdate = true;
                }
            });
            break;

        default:
            console.log("[INFO]: unknown key");
            break;
    }

    delete keysPressed[e.key];
}
