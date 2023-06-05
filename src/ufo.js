import * as THREE from "three";

class Ufo extends THREE.Object3D {

	#cabin
	#ship
	#spotlight
	#spotlightHousing

	constructor() {
		super();
		this.cabin = this.#generateCabin();
		this.ship = this.#generateShip();
		this.spotlight = this.#generateSpotlight();
		this.spotlightHousing = this.#generateSpotlightHousing();
		this.spotlightHousing.position.set(0, -10, 0);
		this.cabin.position.set(0,30,0);
		this.spotlight.position.set(0,-10,0);
		this.add(this.cabin, this.ship, this.spotlight, this.spotlightHousing);
	}

	#generateCabin() {
		const sphereGeometry = new THREE.SphereGeometry(40, 32, 32, 0, 2 * Math.PI, 0, (3 / 4) * Math.PI);
		const sphereMesh = new THREE.Mesh(
			sphereGeometry,
			new THREE.MeshBasicMaterial({
					color: 0xaaaaaa,
					wireframe: false
			}));
		return sphereMesh;
	}

	#generateShip() {
		const ellipsoidGeometry = new THREE.SphereGeometry(20);

		ellipsoidGeometry.scale(5, 1.5, 5);
		const ellipsoidMesh = new THREE.Mesh(ellipsoidGeometry,
			new THREE.MeshBasicMaterial({
					color: 0x444444,
					wireframe: false
			}));

		return ellipsoidMesh;
	}

	#generateSpotlightHousing() {
		const tubeGeom = new THREE.CylinderGeometry({radiusTop: 40, radiusBottom: 40, height : 30, openEnded : true});
		const tubeMat  = new THREE.MeshBasicMaterial( {
			color: 0x444444
		});
		const tubeMesh = new THREE.Mesh( tubeGeom, tubeMat);
		return tubeMesh;		
	}

	#generateSpotlight() {
		const spotlight = new THREE.SpotLight('lightyellow', 5, 20);
		spotlight.castShadow = true;

		spotlight.shadow.mapSize.width = 1024;
		spotlight.shadow.mapSize.height = 1024;

		spotlight.shadow.camera.near = 30;
		spotlight.shadow.camera.far = 500;
		spotlight.shadow.camera.fov = 30;
		spotlight.translateY(-30);
		const target = new THREE.Object3D();
		target.translateY(-300);
		spotlight.target = target;
		return spotlight;
	}

	#generateLights() {

	}
}

export default {
	Ufo: Ufo
}