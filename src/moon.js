import * as THREE from "three";

class Moon extends THREE.Object3D{

    #moon
    #directionalLight
    #ambientLight
    #radius

    constructor(radius){
        super();
        this.radius = radius;
        this.moon = this.#generateMoon();
        this.directionalLight = this.#generateDirectionalLight();
        this.ambientLight = this.#generateAmbientLight();
        this.add(this.moon, this.directionalLight, this.ambientLight);
    }

    #generateMoon(){

        var moonGeom = new THREE.SphereGeometry(this.radius, 30 ,30);

        var textureLoader = new THREE.TextureLoader();
        var texture = textureLoader.load('moon_texture.jpg');
       
        var material = new THREE.MeshPhongMaterial({
            map: texture,
            emissive: 0xFFFFFF,
            emissiveIntensity: 0.1,
        });

        var moonHandler = new THREE.Mesh(moonGeom, material);

        return moonHandler;
    }

    #generateDirectionalLight(){

        var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(50, 0, 250);

        return directionalLight;
    }

    #generateAmbientLight(){

        var ambientLight = new THREE.AmbientLight( 0x777777, 0.002); // soft white light
        
        return ambientLight;
    }
}

export default {
    Moon: Moon
}