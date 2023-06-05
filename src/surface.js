import * as THREE from "three";

const w = 1000, h = 1000;

function createSurface(){
    geometry = new THREE.PlaneGeometry( w, h, w_seg, h_seg );

    const loader = new THREE.TextureLoader();
    const data = loader.load('heightmap.png');

    const vertices = geometry.attributes.position.array;
    
    for ( let i = 0, j = 0, l = vertices.length; i < l; i ++, j += 3 ) {
        vertices[ j + 1 ] = data[ i ] * 10;
    }

    return geometry;
}

export default {
    createSurface : createSurface
}


