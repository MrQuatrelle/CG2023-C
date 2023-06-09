import * as THREE from "three";
import lights from "./ufo_lights.js"



class Ufo extends THREE.Object3D {

	#cabin
	#ship
	#spotlight
	#spotlightHousing
	#spotLightHelper
	#lights
	#cabinMaterials
	#shipMaterials
	#spotlightHousingMaterials

	#rotationSpeed = 3; //units a second
    #moveSpeed = 300; //units a second

    doGoRight = false;
    doGoLeft = false;
    doGoForward = false;
    doGoBackward = false;

    #clock
    #delta

    constructor() {

        super();

        this.#clock = new THREE.Clock();
        this.#delta = this.#clock.getDelta();

        this.#cabinMaterials = [
            new THREE.MeshLambertMaterial({
                color: 0x555555,
                wireframe: false,
                transparent: false,
                shadowSide: THREE.DoubleSide
            }),
            new THREE.MeshPhongMaterial({
                color: 0x555555,
                wireframe: false,
                transparent: false,
                shadowSide: THREE.DoubleSide

            }),
            new THREE.MeshToonMaterial({
                color: 0x555555,
                wireframe: false,
                transparent: false,
                shadowSide: THREE.DoubleSide

            }),
			new THREE.MeshBasicMaterial({
				color: 0x555555,
				wireframe: false,
				transparent: false
			})];
        this.#shipMaterials = [
            new THREE.MeshLambertMaterial({
                color: 0x225522,
                wireframe: false,
                transparent: false,
                shadowSide: THREE.DoubleSide
            }),
            new THREE.MeshPhongMaterial({
                color: 0x225522,
                wireframe: false,
                transparent: false,
                shadowSide: THREE.DoubleSide
            }),
            new THREE.MeshToonMaterial({
                color: 0x225522,
                wireframe: false,
                transparent: false,
                shadowSide: THREE.DoubleSide
            }),
			new THREE.MeshBasicMaterial({
				color: 0x225522,
				wireframe: false,
				transparent: false
			})];

        this.#spotlightHousingMaterials = [
            new THREE.MeshLambertMaterial({
                color: 0xFF00AA,
                side: THREE.DoubleSide
            }),
            new THREE.MeshPhongMaterial({
                color: 0xFF00AA,
                side: THREE.DoubleSide
            }),
            new THREE.MeshToonMaterial({
                color: 0xFF00AA,
                side: THREE.DoubleSide
            }),
			new THREE.MeshBasicMaterial({
				color: 0xFF00AA,
				wireframe: false,
				transparent: false
			})];

        this.#cabin = this.#generateCabin();
        this.#ship = this.#generateShip();
        this.#spotlight = this.#generateSpotlight();
        this.#spotlightHousing = this.#generateSpotlightHousing();
        this.#lights = new lights.UFO_Lights();
        this.#lights.translateY(-20);
        this.#spotlightHousing.position.set(0, -30, 0);
        this.#cabin.position.set(0, 30, 0);
        this.#spotlight.position.set(0, -30, 0);

        this.add(this.#cabin, this.#ship, this.#spotlightHousing,
            this.#spotlight, this.#lights);
    }

    #generateCabin() {
        const sphereGeometry = new THREE.SphereGeometry(
            40, 32, 32, 0, 2 * Math.PI, 0, (5 / 8) * Math.PI);
        const sphereMesh = new THREE.Mesh(sphereGeometry, this.#cabinMaterials[0]);


        sphereMesh.translateY(70);
        return sphereMesh;
    }

    #generateShip() {
        const ellipsoidGeometry = new THREE.SphereGeometry(20);

        ellipsoidGeometry.scale(5, 1.5, 5);
        const ellipsoidMesh = new THREE.Mesh(ellipsoidGeometry, this.#shipMaterials[0]);

        return ellipsoidMesh;
    }

    #generateSpotlightHousing() {
        const tubeGeom = new THREE.CylinderGeometry(60.0, 60.0, 20.0, 32, 10, true, 0, 2 * Math.PI);
        const tubeMesh = new THREE.Mesh(tubeGeom, this.#spotlightHousingMaterials[0]);

        return tubeMesh;
    }


    #generateSpotlight() {
        const spotlight = new THREE.SpotLight('white', 30.0, 700.0, Math.PI / 6, 0.0, 0.9);
        spotlight.castShadow = true;
        const target = new THREE.Object3D();
        target.position.set(0, -65, 0);
        spotlight.target = target;
        this.#spotLightHelper = new THREE.SpotLightHelper(spotlight);
        spotlight.add(target);
        return spotlight;
    }
    togglePointLights() {
        this.#lights.toggleLights();
    }

    getPointLights() {
        let dings = [];
        let count = 0;
        this.#lights.traverse((obj) => {
            if (obj instanceof THREE.PointLight) {
                dings[count++] = obj;
            }
        })
        return dings;
    }
    changeMaterials(type) {
        this.#cabin.material = this.#cabinMaterials[type];
        this.#ship.material = this.#shipMaterials[type];
        this.#spotlightHousing.material = this.#spotlightHousingMaterials[type];
        this.#lights.changeMaterials(type);

    }

    toggleSpotlight() {
        this.#spotlight.visible = !this.#spotlight.visible;
    }

    getPointLightHelpers() {
        return this.#lights.getLightHelpers();
    }

    getSpotlightState() {
        return this.#spotlight.visible;
    }

    getSpotLightHelper() {
        return this.#spotLightHelper;
    }

    update() {
        this.#delta = this.#clock.getDelta();
        this.#rotate();

        if (this.doGoRight) {
            this.#moveRight();
        }

        if (this.doGoLeft) {
            this.#moveLeft();
        }

        if (this.doGoForwards) {
            this.#moveForwards();
        }

        if (this.doGoBackwards) {
            this.#moveBackwards();
        }
    }

    #rotate() {
        const delta = this.#delta * this.#rotationSpeed;
        this.rotation.y += delta;
    }

    #moveRight() {
        const delta = this.#delta * this.#moveSpeed;
        this.position.x += delta;
    }

    #moveLeft() {
        const delta = this.#delta * this.#moveSpeed;
        this.position.x += -delta;
    }

    #moveForwards() {
        const delta = this.#delta * this.#moveSpeed;
        this.position.z += delta;
    }

    #moveBackwards() {
        const delta = this.#delta * this.#moveSpeed;
        this.position.z += -delta;
    }

    setRight(value) {
        this.doGoRight = value;
    }

    setLeft(value) {
        this.doGoLeft = value;
    }

    setForwards(value) {
        this.doGoForwards = value;
    }

    setBackwards(value) {
        this.doGoBackwards = value;
    }

}

export default {
    Ufo: Ufo,
}
