import * as THREE from "three"
class UFO_Lights extends THREE.Object3D {
	
	#lights;
	constructor() {
		super();
		this.lights = this.#generateLights();
		this.add(this.lights);
	}

	#generateLights(){
		const radius = 80;
		const lights = new THREE.Object3D();
		for(let i = 0; i<8; i++){
			let bulbsGeom = new THREE.SphereGeometry( 5, 32, 16, 0, 2*Math.PI, 0, Math.PI );
			let bulbs = new THREE.Mesh( bulbsGeom, new THREE.MeshPhongMaterial( 0x0000FF));
			let light = new THREE.PointLight('white', 10, 300, 2);
			light.castShadow= true;
			let light_helper = new THREE.PointLightHelper(light, 3);
			light.add(light_helper);
			bulbs.position.set(radius*Math.cos(i*Math.PI/4),0,radius*Math.sin(i*Math.PI/4));
			light.position.set((radius+5)*Math.cos(i*Math.PI/4),-7,radius*Math.sin(i*Math.PI/4));
			lights.add(bulbs, light);
		}
		return lights;
	}
	toggleLights (){
		this.lights.visible = !this.lights.visible;
	}
	getLights(){
		return this.lights;
	}
	getLightsState(){
		return this.lights.visible;
	}
}

export default {
	UFO_Lights: UFO_Lights,
}