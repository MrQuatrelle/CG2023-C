import * as THREE from "three";
import { VRButton } from "three/examples/jsm/webxr/VRButton.js";

import house from "./house.js";
import terrain from "./terrain.js";
import ufo from "./ufo.js"
import cameraControl from "./camera.js";

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.autoUpdate = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

var VR = false;
var VRToggle;

var ufoShip, camera;

main();

function main() {
    // initializations
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.needsUpdate = true;
    document.body.appendChild(renderer.domElement);

    let axesHelper = new THREE.AxesHelper(1000);
    cameraControl.setTarget(new THREE.Vector3(0, 150, 0));
    camera = cameraControl.camera1;

    const dl = new THREE.DirectionalLight(0xffffff, 2);
    dl.position.set(100, 500, 500);
    dl.castShadow = true;
    dl.lookAt(0, 0, 0);

    terrain.terrain.position.set(0, -350, 0);

    dropShip();

    const home = new house.House();
    home.position.set(150, 100, 0);

    scene.add(axesHelper, dl, home, terrain.terrain);

    renderer.setAnimationLoop(animate);
    removeHelpers();
}

function tempFloor() {
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(500, 500, 1, 1),
        new THREE.MeshPhongMaterial({
            color: 0x111180,
            side: THREE.DoubleSide,
        })
    );
    floor.rotateX(Math.PI / 2);
    floor.position.set(0, 0, 0);
    scene.add(floor);
    scene.add(new THREE.AmbientLight("lightyellow", 0.02))
}

function animate() {
    // tldr, everytime the program has time to render a frame, it'll call this
    // function
    ufoShip.update();
    renderer.render(scene, camera);
}

let keysPressed = {};

function dropShip() {
    ufoShip = new ufo.Ufo();
    ufoShip.translateY(400);
    //tempFloor();
    scene.add(ufoShip);
    addHelpers();
}

function removeHelpers() {
    let count = 0;
    scene.children.forEach((c) => {
        if (c.type === "SpotLightHelper" ||
            c.type === "PointLightHelper") {
            console.log(c.type, "removed!");
            scene.remove(c);
            count++;
        }
    })
    if (count == 0)
        console.log("There are no Helpers around these areas.")
}

function addHelpers() {
    ufoShip.getPointLightHelpers().forEach((c) => {
        scene.add(c);
    });
    scene.add(ufoShip.getSpotLightHelper());

}

function swapCameras() {
    if (!VR) {
        console.log("[INFO]: Switching to VR camera.")
        VRToggle = VRButton.createButton(renderer);
        document.body.appendChild(VRToggle);
        renderer.xr.enabled = true;
        VR = true;
    }
    else {
        console.log("[INFO]: Switching to normal camera.")
        document.body.removeChild(VRToggle);
        renderer.xr.enabled = false;
        camera = cameraControl.camera1;
        VR = false;
    }
}

window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    cameraControl.update();
});

window.addEventListener("keydown", keydownHandler);

function keydownHandler(e) {
    if (keysPressed[e.key])
        return;

    keysPressed[e.key] = true;
    switch (e.key) {
        case '1':
            swapCameras();
            break;

        case 'q':
            console.log("[INFO]: Setting Materials as Lambert.")
            ufoShip.changeMaterials(0);
            break;

        case 'w':
            console.log("[INFO]: Setting Materials as Phong.")
            ufoShip.changeMaterials(1);
            break;

        case 'e':
            console.log("[INFO]: Setting Materials as Toon.")
            ufoShip.changeMaterials(2);
            break;

        case 'p':
            ufoShip.togglePointLights();
            console.log("[INFO]:\tToggling UFO Point Lights...\n\tCurrent state: ", ufoShip.getPointLights().getLightsState(), e.key);
            break;

        case 's':
            ufoShip.toggleSpotlight();
            console.log("[INFO]:\tToggling UFO Spotlight...\n\tCurrent state: ", ufoShip.getSpotlightState());
            break;

        case 'x':
            removeHelpers();
            break;

        case 'ArrowLeft':
            ufoShip.setLeft(true);
            break;

        case 'ArrowRight':
            ufoShip.setRight(true);
            break;

        case 'ArrowDown':
            ufoShip.setForwards(true);
            break;

        case 'ArrowUp':
            ufoShip.setBackwards(true);
            break;

        default:
            console.log("[INFO]: unknown key");
            break;
    }
}

window.addEventListener("keyup", keyUpHandler);

function keyUpHandler(e) {
    delete keysPressed[e.key];

    switch (e.key) {
        case 'ArrowLeft':
            ufoShip.setLeft(false);
            break;

        case 'ArrowRight':
            ufoShip.setRight(false);
            break;

        case 'ArrowDown':
            ufoShip.setForwards(false);
            break;

        case 'ArrowUp':
            ufoShip.setBackwards(false);
            break;

        default:
            // do nothing
            break;
    }
}
