import * as THREE from "three"
class UFO_Lights extends THREE.Object3D {
	
	#lights;
	#lightHelpers;
	#bulbs
	#bulbMaterials;
	constructor() {
		super();
		this.#bulbMaterials = [
			new THREE.MeshLambertMaterial({
					color: 0x0000FF,
					transparent: false
				}),
			new THREE.MeshPhongMaterial({
					color: 0x0000FF,
					transparent: false
				}),
			new THREE.MeshToonMaterial({
					color: 0x0000FF,
					transparent: false
				}),
			new THREE.MeshBasicMaterial({
					color: 0x0000FF,
					transparent: false
			})];
		this.#bulbs = new THREE.Object3D();
		this.#lightHelpers = [];
		this.#lights = this.#generateLights();
		this.add(this.#lights, this.#bulbs);
	}

	#generateLights(){
		const radius = 80;
		const lights= new THREE.Object3D();
		for(let i = 0; i<8; i++){
			let bulbsGeom = new THREE.SphereGeometry( 5, 32, 16, 0, 2*Math.PI, 0, Math.PI );
			let bulb = new THREE.Mesh( bulbsGeom, this.#bulbMaterials[0]);
			let light = new THREE.PointLight('white', 15, 40, 2);
			bulb.position.set(radius*Math.cos(i*Math.PI/4),0,radius*Math.sin(i*Math.PI/4));
			light.position.set((radius)*Math.cos(i*Math.PI/4),-5,(radius)*Math.sin(i*Math.PI/4));
			light.castShadow= true;
			light.shadow.camera.near = 0.1;
			light.shadow.camera.far = 500;
			light.shadow.mapSize.width = 512;
			light.shadow.mapSize.height = 512;
			this.#lightHelpers[i] = new THREE.PointLightHelper(light,5);
			this.#bulbs.add(bulb);
			lights.add(light);
		}
		return lights;
	}
	toggleLights (){
		this.#lights.visible = !this.#lights.visible;
	}
	getLights(){
		return this.#lights;
	}
	getLightHelpers(){
		return this.#lightHelpers;
	}
	getLightsState(){
		return this.#lights.visible;
	}
	changeMaterials(type){
		let count = 0;
		this.#lights.children.forEach((c) =>{
			if(c.isMesh){
				if(c.material != this.#bulbMaterials[type]){
					c.material = this.#bulbMaterials[type];
					count++;
				}
				else{
					console.log("[INFO]: This Material was already enabled.")
				}
			}
		})
		if(count = 0){
			console.log("[INFO]: No materials changed")
		}
	}
}

export default {
	UFO_Lights: UFO_Lights,
}