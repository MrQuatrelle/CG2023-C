class UFO_Light extends THREE.Object3D {
	
	#light;
	#light_helper;

	constructor() {
		super();
		this.light = new THREE.PointLight('white', 5, 20);
		this.light_helper = new THREE.PointLightHelper(this.light, 1);
		this.add(this.light, this.light_helper);
	}

	setLightPosition(x, y, z) {
		this.position.set(x, y, z);
	}

	getLight() {
		return this.light;
	}

	getLightHelper() {

		return this.light_helper;

	}
}