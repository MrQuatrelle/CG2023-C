import * as THREE from "three";
import ufo from "./ufo.js"
import cameraControl from "./camera.js";
// import ufo from "./ufo.js"
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
renderer.shadowMapEnabled = true;

var ufoShip, camera;


main();

function main() {
	// initializations
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	scene.background = new THREE.Color("lightblue");
	const axesHelper = new THREE.AxesHelper(1000);
	cameraControl.setTarget(new THREE.Vector3(95, 240, 110));
	camera = cameraControl.camera1;

	ufoShip = new ufo.Ufo();
	tempFloor();
	scene.add(ufoShip,axesHelper);


	animate();
}
function tempFloor(){
	const floor = new THREE.Mesh(new THREE.PlaneGeometry( 500, 500, 1, 1), new THREE.MeshPhongMaterial({color: 0x111180, side: THREE.DoubleSide}));
	floor.rotateX(Math.PI/2);
	floor.position.set(0,0,0);
	scene.add(floor);
	scene.add(new THREE.AmbientLight("lightyellow", 0.05))
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
		case 'p':
			ufoShip.togglePointLights();
			console.log("[INFO]:\tToggling UFO Point Lights...\n\tCurrent state: ", ufoShip.getPointLights().getLightsState(), e.key);
			break;
		case 's':
			ufoShip.toggleSpotlight();
			console.log("[INFO]:\tToggling UFO Spotlight...\n\tCurrent state: ", ufoShip.getSpotlightState());
			break;

		default:
			console.log("[INFO]: unknown key");
			break;
	}
}
