import * as THREE from "three";
import cameraControl from "./camera.js";

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();

var ufoShip;
var camera;


function main() {
	// initializations
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	scene.background = new THREE.Color(0xdddddd);
	const cameraControl = new Camera();
	cameraControl.setTarget(new THREE.Vector3(95, 240, 110));
	camera = cameraControl.camera5;

	ufoShip = new ufo.ufo();

	scene.add(ufoShip);

	animate();
}

function animate() {
	// tldr, everytime the program has time to render a frame, it'll call this
	// function

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

		default:
			console.log("[INFO]: unknown key");
			break;
	}
}