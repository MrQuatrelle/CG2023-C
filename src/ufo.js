import * as THREE from "three";
import lights from "./ufo_lights.js"

class Ufo extends THREE.Object3D {

	#cabin
	#ship
	#spotlight
	#spotlightHousing
	#amblight
	#lights
	constructor() {
		super();
		this.cabin = this.#generateCabin();
		this.ship = this.#generateShip();
		this.spotlight = this.#generateSpotlight();
		this.spotlightHousing = this.#generateSpotlightHousing();
		this.lights = new lights.UFO_Lights();
		this.lights.translateY(-18);
		this.spotlightHousing.position.set(0, -30, 0);
		this.cabin.position.set(0,30,0);
		this.spotlight.position.set(0,-30,0);
		
		this.add(this.cabin, this.ship,  this.spotlightHousing, this.spotlight, this.lights);
		this.translateY(200);
	}

	#generateCabin() {
		const sphereGeometry = new THREE.SphereGeometry(40, 32, 32, 0, 2 * Math.PI, 0, (3 / 4) * Math.PI);
		const sphereMesh = new THREE.Mesh(
			sphereGeometry,
			new THREE.MeshPhongMaterial({
					color: 0xaaaaaa,
					wireframe: false
			}));
		return sphereMesh;
	}

	#generateShip() {
		const ellipsoidGeometry = new THREE.SphereGeometry(20);

		ellipsoidGeometry.scale(5, 1.5, 5);
		const ellipsoidMesh = new THREE.Mesh(ellipsoidGeometry,
			new THREE.MeshPhongMaterial({
					color: 0x44ff44,
					wireframe: false
			}));
		return ellipsoidMesh;
	}

	#generateSpotlightHousing() {
		const tubeGeom = new THREE.CylinderGeometry(60.0, 60.0, 20.0,32,10, true, 0, 2*Math.PI);
		const tubeMat  = new THREE.MeshPhongMaterial( {
			color: 0xFF00AA
		});
		const tubeMesh = new THREE.Mesh( tubeGeom, tubeMat);
		return tubeMesh;		
	}

	

	#generateSpotlight() {
		const spotlight = new THREE.SpotLight('white', 100.0, 300.0, Math.PI/16, 0.0, 0.9);
		spotlight.castShadow = true;
		const target = new THREE.Object3D();
		target.position.set(0,-65,0);
		spotlight.target=target;
		const spotLightHelper = new THREE.SpotLightHelper(spotlight); spotlight.add(spotLightHelper);
		spotlight.add(target);
		return spotlight;
	}
	togglePointLights(){
		this.lights.toggleLights();
	}

	getPointLights(){
		return this.lights
	}

	toggleSpotlight(){
		this.spotlight.visible = !this.spotlight.visible;
	}

	getSpotlightState(){
		return this.spotlight.visible;
	}

}

export default {
	Ufo: Ufo
}