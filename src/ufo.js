import * as THREE from "three";

class Ufo extends THREE.Object3D {

	#cabin
	#ship
	#spotlight

	constructor() {
		super();
		this.cabin = this.#generateCabin();
		this.ship = this.#generateShip();
		this.spotlight = this.#generateSpotlight();

		this.cabin.position.set(0,30,0);
		this.spotlight.position.set(0,-10,0);
		this.add(this.cabin, this.ship, this.spotlight);
	}

	#generateCabin() {
		const sphereGeometry = new THREE.SphereGeometry(80, 32, 32, 0, 2 * Math.PI, 0, (3 / 4) * Math.PI);
		const sphereMesh = new THREE.Mesh(
			sphereGeometry,
			new THREE.MeshBasicMaterial({
					color: 0xaaaaaa,
					wireframe: true
			}));
		return sphereMesh;
	}

	#generateShip() {
		const ellipsoidGeometry = new THREE.SphereGeometry(20);

		ellipsoidGeometry.scale(10, 0.5, 10);
		const ellipsoidMesh = new THREE.Mesh(ellipsoidGeometry,
			new THREE.MeshBasicMaterial({
					color: 0x444444,
					wireframe: false
			}));

		return ellipsoidMesh;
	}

	#generateSpotlight() {
		let spotlight = new THREE.SpotLight('lightyellow', 5, 20);
		spotlight.castShadow = true;

		spotlight.shadow.mapSize.width = 1024;
		spotlight.shadow.mapSize.height = 1024;

		spotlight.shadow.camera.near = 30;
		spotlight.shadow.camera.far = 500;
		spotlight.shadow.camera.fov = 30;
		return spotlight;
	}

	#generateLights() {

	}
}

export default {
	Ufo: Ufo
}