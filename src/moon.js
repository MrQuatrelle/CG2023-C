import * as THREE from "three";

class Moon extends THREE.Object3D{

    #moon
    //#light

    constructor(){
        super();
        this.moon = this.#generateMoon();
        this.add(this.moon);
    }

    #generateMoon(){

        const moonGeom = new THREE.SphereGeometry(300, 30 ,30);

        var textureLoader = new THREE.TextureLoader();

        // Load the moon texture
        var texture = textureLoader.load('moon_texture.jpg');
        // Create a material with MeshPhongMaterial and apply the moon texture
            var material = new THREE.MeshPhongMaterial({
                map: texture,
                emissive: 0xFEFCD7,
                emissiveIntensity: 0.05,
            });

        var moonHandler = new THREE.Mesh(moonGeom, material);

        return moonHandler;
    }
}

export default {
    Moon: Moon
}