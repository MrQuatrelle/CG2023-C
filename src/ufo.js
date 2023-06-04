

class ufo extends THREE.Object3D {

	#cabin
	#ship
	#spotlight
	#shipMaterial

	constructor() {
		super();
		this.cabin = this.generateCabin();
		this.ship = this.generateShip();
		this.spotlight = this.generateSpotlight();
		this.cabin.position.set(0,30,0);
		this.spotlight.position.set(0,-10,0);
		this.add(this.cabin, this.ship, this.spotlight);
	}

	#generateCabin() {
		const SphereGeometry = new THREE.SphereGeometry(20);
		const ellipsoidMesh = new THREE.Mesh(
			ellipsoidGeometry,
			new THREE.MeshBasicMaterial({
					color: 0xaaaaaa,
					wireframe: false
			}));
		return ellipsoidMesh;
	}

	#generateShip() {
		const sphereGeometry = new THREE.SphereGeometry(40, 32, 32, 0, 2 * Math.PI, 0, (3 / 4) * Math.PI);
		const sphereMesh = new THREE.Mesh(sphereGeometry,
			new THREE.MeshBasicMaterial({
					color: 0x444444,
					wireframe: false
			}));
		return sphereMesh;
	}

	#generateSpotlight() {
		this.spotLight = new THREE.SpotLight('lightyellow', 5, 20);
		spotLight.castShadow = true;

		spotLight.shadow.mapSize.width = 1024;
		spotLight.shadow.mapSize.height = 1024;

		spotLight.shadow.camera.near = 30;
		spotLight.shadow.camera.far = 500;
		spotLight.shadow.camera.fov = 30;
		return spotLight;
	}
}

export default {
	ufo: ufo
}