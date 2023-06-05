import * as THREE from "three";
import cameraControl from "./camera.js";
import house from "./house.js";

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();

var ufoShip, camera;


main();

function main() {
    // initializations
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    scene.background = new THREE.Color("lightblue");
    let axesHelper = new THREE.AxesHelper(1000);
    cameraControl.setTarget(new THREE.Vector3(95, 240, 110));
    camera = cameraControl.camera4;

    // ufoShip = new ufo.Ufo();

    // scene.add(ufoShip,axesHelper);
    scene.add(axesHelper);

    // TODO: TESTING
    let houseMesh = new THREE.Mesh(
        new house.houseWalls(),
        new THREE.MeshBasicMaterial({ color: 0x333333 })
    );

    let roofMesh = new THREE.Mesh(
        new house.houseRoof(),
        new THREE.MeshBasicMaterial({ color: 0xff0000 })
    );

    scene.add(houseMesh, roofMesh);

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

        // case 'w':
        //     console.log("[INFO]: showing wiremesh");
        //     scene.traverse((c) => {
        //         if (c.isMesh) {
        //             c.material.wireframe = !(c.material.wireframe);
        //             c.material.needsUpdate = true;
        //         }
        //     });
        //     break;

        default:
            console.log("[INFO]: unknown key");
            break;
    }

    delete keysPressed[e.key];
}
