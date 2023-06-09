import * as THREE from "three";

const rotationSpeed = 2; //units a second
const moveSpeed = 2; //units a second

class Sobreiro extends THREE.Object3D {

	#tronco
	#troncoSecundario
	#branch
	#copas

	#sobreiroMaterials
	#copasMaterials

	#height

	constructor(height, orientation) {
		super();
		this.#height = height;
		this.#sobreiroMaterials = [
			new THREE.MeshLambertMaterial({
					color: 0xA55D35,
					wireframe:false,
					transparent: false,
					shadowSide: THREE.DoubleSide
			}),
			new THREE.MeshPhongMaterial({
					color: 0xA55D35,
					wireframe:false,
					transparent: false,
					shadowSide: THREE.DoubleSide

			}),
			new THREE.MeshToonMaterial({
					color: 0xA55D35,
					wireframe:false,
					transparent: false,
					shadowSide: THREE.DoubleSide

			})];
		this.#copasMaterials = [
			new THREE.MeshLambertMaterial({
					color: 0x3A5F0B,
					wireframe: false,
					transparent: false,
					shadowSide: THREE.DoubleSide
			}),
			new THREE.MeshPhongMaterial({
					color: 0x3A5F0B,
					wireframe: false,
					transparent: false,
					shadowSide: THREE.DoubleSide
			}),
			new THREE.MeshToonMaterial({
					color: 0x3A5F0B,
					wireframe: false,
					transparent: false,
					shadowSide: THREE.DoubleSide
			})];
		
		this.#tronco = this.#generateLog();
		this.#troncoSecundario = this.#generateSecondLog();
		this.#branch = this.#generateBranch();
		
		this.#copas = this.#generateLeaves();
		this.#yepTree();

		this.add(this.#tronco, this.#troncoSecundario, this.#branch);
		this.rotateY(orientation);
		this.#copas.forEach((c) => {this.add(c)})
		
	}

	#generateLog(){
		const logGeom = new THREE.CylinderGeometry(25, 25, this.#height/4, 32, 32);
		const logMesh = new THREE.Mesh(logGeom, this.#sobreiroMaterials[0]);
		return logMesh;
	}

	#generateSecondLog(){
		const logGeom = new THREE.CylinderGeometry(20, 20, this.#height/1.5, 32, 32);
		const logMesh = new THREE.Mesh(logGeom, this.#sobreiroMaterials[0]);
		return logMesh;
	}

	#generateBranch(){
		const logGeom = new THREE.CylinderGeometry(10, 10, this.#height/3, 32, 32, false, 0, 2*Math.PI);
		const logMesh = new THREE.Mesh(logGeom, this.#sobreiroMaterials[0]);
		return logMesh;
	}

	#generateLeaves(){
		const copaGeom = new THREE.SphereGeometry(this.#height/10,32, 32);
		copaGeom.scale(4,1,3);
		const copaMesh = [new THREE.Mesh(copaGeom, this.#copasMaterials[0]), new THREE.Mesh(copaGeom, this.#copasMaterials[0])];

		return copaMesh;
	}

	#yepTree(){
		this.#tronco.translateY(this.#height/12);
		this.#troncoSecundario.rotateZ(-Math.PI/5);
		this.#troncoSecundario.position.set(
			25,
			this.#height/1.8*Math.sin(Math.PI/3)-this.#height/12,
			0);
		this.#branch.rotateZ(Math.PI/4);
		this.#branch.position.set(
			-this.#height/10*Math.sin(Math.PI/3),
			this.#height/2,
			0);
		this.#copas[0].position.set(-this.#height/5,this.#height/1.8,0)
		this.#copas[1].position.set(this.#height/4, this.#height/1.5,0)
	}

	changeMaterials(type){
		this.#tronco.material = this.#sobreiroMaterials[type];
		this.#troncoSecundario.material = this.#sobreiroMaterials[type];
		this.#branch.material = this.#sobreiroMaterials[type];
		this.#copas.forEach((c) => {
			c.material = this.#copasMaterials[type];
		});
	}
}

export default {
	Sobreiro: Sobreiro
}