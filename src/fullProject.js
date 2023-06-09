import * as THREE from "three";
import { VRButton } from "three/examples/jsm/webxr/VRButton.js";

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.autoUpdate = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

var ufoShip, camera, home, ground, moon2;
var trees;
var VR = false;
var VRToggle;


function main() {
    // initializations
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.needsUpdate = true;
    document.body.appendChild(renderer.domElement);

    let axesHelper = new THREE.AxesHelper(1000);
    setTarget(new THREE.Vector3(0, 150, 0));
    camera = isoPerspective;

    const dl = new THREE.DirectionalLight(0xffffff, 2);
    dl.position.set(100, 500, 500);
    dl.lookAt(0, 0, 0);
    ground = new Terrain(); 
    ground.position.set(0, -350, 0);

    scene.add(skyDome)

    dropShip();
    trees = iterateGrid();
    trees.forEach((c) =>{
        scene.add(c);
    })

    moon2 = new Moon(500);
    moon2.position.set(-1000, 1000, -3000);

    home = new House();
    home.position.set(150, 100, 0);

    scene.add(axesHelper, dl,  home, ground, moon2);
    iterateGrid(scene);  


    renderer.setAnimationLoop(animate);
    removeHelpers();
}

// function tempFloor() {
//     const floor = new THREE.Mesh(new THREE.PlaneGeometry(500, 500, 1, 1),
//         new THREE.MeshPhongMaterial({
//             color: 0x111180,
//             side: THREE.DoubleSide,
//         })
//     );
//     floor.rotateX(Math.PI / 2);
//     floor.position.set(0, 0, 0);
//     scene.add(floor);
// }

function animate() {
    // tldr, everytime the program has time to render a frame, it'll call this
    // function
    ufoShip.update();
    renderer.render(scene, camera);
}

let keysPressed = {};

function dropShip() {
    ufoShip = new Ufo();
    ufoShip.translateY(500);
    //tempFloor();
    scene.add(ufoShip);
    addHelpers();
}

function removeHelpers() {
    ufoShip.getPointLightHelpers().forEach((c) =>{
        scene.remove(c);
    })
    scene.remove(ufoShip.getSpotLightHelper());
}

function addHelpers() {
    ufoShip.getPointLightHelpers().forEach((c) => {
        scene.add(c);
    });
    scene.add(ufoShip.getSpotLightHelper());

}

function swapCameras() {
    if (!VR) {
        console.log("[INFO]: Switching to VR camera.")
        VRToggle = VRButton.createButton(renderer);
        document.body.appendChild(VRToggle);
        renderer.xr.enabled = true;
        VR = true;
    }
    else {
        console.log("[INFO]: Switching to normal camera.")
        document.body.removeChild(VRToggle);
        renderer.xr.enabled = false;
        camera = cameraControl.isoPerspective;
        VR = false;
    }
}

window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    update();
});

window.addEventListener("keydown", keydownHandler);

function keydownHandler(e) {
    if (keysPressed[e.key])
        return;

    keysPressed[e.key] = true;
    switch (e.key) {
        case '1':
            swapCameras();
            break;

        case 'q':
            console.log("[INFO]: Setting Materials as Lambert.")
            ufoShip.changeMaterials(0);
            home.changeMaterials(0);
            ground.changeMaterials(0);
            trees.forEach((c) => {
                c.changeMaterials(0)
            })
            break;

        case 'w':
            console.log("[INFO]: Setting Materials as Phong.")
            ufoShip.changeMaterials(1);
            home.changeMaterials(1);
            ground.changeMaterials(1);
            trees.forEach((c) => {
                c.changeMaterials(1)
            })
            break;

        case 'e':
            console.log("[INFO]: Setting Materials as Toon.")
            ufoShip.changeMaterials(2);
            home.changeMaterials(2);
            ground.changeMaterials(2);
            trees.forEach((c) => {
                c.changeMaterials(2)
            });
            break;
        case 'r':
            console.log("[INFO]: Disabling lighting calculations. Setting Materials to Basic.")
            ufoShip.changeMaterials(3);
            home.changeMaterials(3);
            ground.changeMaterials(3);
            trees.forEach((c) => {
                c.changeMaterials(3)
            })
            break;

        case 'p':
            ufoShip.togglePointLights();
            console.log("[INFO]:\tToggling UFO Point Lights...\n\tCurrent state: ", ufoShip.getPointLights().getLightsState(), e.key);
            break;

        case 's':
            ufoShip.toggleSpotlight();
            console.log("[INFO]:\tToggling UFO Spotlight...\n\tCurrent state: ", ufoShip.getSpotlightState());
            break;

        case 'x':
            removeHelpers();
            break;

        case 'z':
            addHelpers();
            break;
        
        case 'ArrowLeft':
            ufoShip.setLeft(true);
            break;

        case 'ArrowRight':
            ufoShip.setRight(true);
            break;

        case 'ArrowDown':
            ufoShip.setForwards(true);
            break;

        case 'ArrowUp':
            ufoShip.setBackwards(true);
            break;

        default:
            console.log("[INFO]: unknown key");
            break;
    }
}

window.addEventListener("keyup", keyUpHandler);

function keyUpHandler(e) {
    delete keysPressed[e.key];

    switch (e.key) {
        case 'ArrowLeft':
            ufoShip.setLeft(false);
            break;

        case 'ArrowRight':
            ufoShip.setRight(false);
            break;

        case 'ArrowDown':
            ufoShip.setForwards(false);
            break;

        case 'ArrowUp':
            ufoShip.setBackwards(false);
            break;

        default:
            // do nothing
            break;
    }
}
//=======================================================

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


//========================================================================


//===========================================================================

//-------SKYDOME-------

//cria um canvas
var canvas = document.createElement('canvas');
canvas.width = 512;
canvas.height = 512;
var context = canvas.getContext('2d');

//dá fill da cor do fundo 
var gradient = context.createLinearGradient(0, 0,0,1100);
gradient.addColorStop(0, '#000005'); // Dark blue
gradient.addColorStop(1, '#030004'); // Dark violet
context.fillStyle = gradient;
context.fillRect(0,0 , canvas.width, canvas.height); // Fill the entire canvas with black

// gera as estrelas procedimentalmente
const starCount = 350;

for (var i = 0; i < starCount; i++) {
  var x = Math.random() * canvas.width;
  var y = Math.random() * canvas.height;
  var radius = Math.random() * 1;
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI);
  context.fillStyle = '#ffffff';
  context.fill();
}

//cria uma textura a partir do canvas criado
var skyTexture = new THREE.CanvasTexture(canvas);
skyTexture.wrapS = THREE.RepeatWrapping;
skyTexture.wrapT = THREE.RepeatWrapping;
skyTexture.repeat.set(1, 1);

//cria o plano e adiciona textura
var skyMaterial = new THREE.MeshBasicMaterial({ 
  map: skyTexture, 
  side: THREE.BackSide //backside significa que só dá load à parte de dentro da esfera
});

var skyGeometry = new THREE.SphereGeometry(3000, 32, 32, 0, 2 * Math.PI, 0,  (1/2) * Math.PI);
var skyDome = new THREE.Mesh(skyGeometry, skyMaterial);


//-------TEXTURA PARA O PLANO-------

const flowerColors = [
  '#ffffff', // white
  '#D4C600', // yellow
  '#cc99ff', // lilac
  '#4BC6E5' // light blue
];

//cria um canvas
var canvas2 = document.createElement('canvas');
canvas2.width = 512;
canvas2.height = 512;
var context2 = canvas2.getContext('2d');

//dá fill da cor do fundo 
context2.beginPath();
context2.rect(0, 0, canvas2.width, canvas2.height);
context2.fillStyle = '#428000';   //cor da relva
context2.fill();

// gera as flores procedimentalmente
const flowers = 500;

for (var i = 0; i < flowers; i++) {
  var x = Math.random() * canvas2.width;
  var y = Math.random() * canvas2.height;
  var radius = Math.random() * 6;
  context2.beginPath();
  context2.arc(x, y, radius, 0, 2 * Math.PI);
  const flowerColor = flowerColors[Math.floor(Math.random() * flowerColors.length)];
  context2.fillStyle = flowerColor;
  context2.fill();
}

//cria uma textura a partir do canvas criado
var floorTexture = new THREE.CanvasTexture(canvas2);
floorTexture.wrapS = THREE.RepeatWrapping;
floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(1, 1); 

//cria o plano e adiciona textura
//var floorMaterial = new THREE.MeshBasicMaterial({
//  map: floorTexture, 
//  side: THREE.FrontSide //frontside significa que só dá load à parte de dentro da esfera 
//});
//var floorGeometry = new THREE.PlaneGeometry(600, 600);
//var floorText = new THREE.Mesh(floorGeometry, floorMaterial);
//floorText.rotation.x = -Math.PI / 2; // Rotate 90 degrees around the x-axis

//====================================================================
const heightMapTexture = new THREE.TextureLoader().load(
    "../heightmap.png",
    undefined,
    undefined,
    () => {
        console.error("fail to source heightmap");
    }
);


const terrainMaterials = [
    new THREE.MeshLambertMaterial({
        color: 0x92745b,
        map: floorTexture,
        bumpMap: heightMapTexture,
        displacementMap: heightMapTexture,
        displacementScale: 3000,
        shadowSide: THREE.DoubleSide,
    }),
    new THREE.MeshPhongMaterial({
        color: 0x92745b,
        map: floorTexture,
        bumpMap: heightMapTexture,
        displacementMap: heightMapTexture,
        displacementScale: 3000,
        shininess: 5,
        shadowSide: THREE.DoubleSide,
    }),
    new THREE.MeshToonMaterial({
        color: 0x92745b,
        map: floorTexture,
        bumpMap: heightMapTexture,
        displacementMap: heightMapTexture,
        displacementScale: 3000,
        shadowSide: THREE.DoubleSide,
    }),
    new THREE.MeshBasicMaterial({
        color: 0x92745b,
        map: floorTexture,
        shadowSide: THREE.DoubleSide,
    })
];

class Terrain extends THREE.Object3D{
    #terrain
    constructor(){
        super();
        const geometry = new THREE.PlaneGeometry(5000, 5000, 500, 20);
        this.#terrain = new THREE.Mesh(geometry, terrainMaterials[0]);
        this.#terrain.rotateX(Math.PI / -2);
        this.#terrain.geometry.computeVertexNormals();
        this.add(this.#terrain)

    }
    changeMaterials(type){
        this.#terrain.material = terrainMaterials[type];
    }

}


//=========================================================================================================

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

            }),
            new THREE.MeshBasicMaterial({
                    color: 0xA55D35,
                    wireframe: false,
                    transparent: false
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
            }),
            new THREE.MeshBasicMaterial({
                    color: 0x3A5F0B,
                    wireframe: false,
                    transparent: false
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

//==================================================================


function iterateGrid(){

    var width = 5000;   //comprimento do plano
    var height = 5000;      //largura do plano
    
    var numSegmentsX = 500;     //comprimento do chunk
    var numSegmentsY = 500;     //largura do chunk
    
    var probability = 0.18;  //probabilidade de os sobreiros spawnarem num chunk

    const minHeight = 100;  //altura minima dos sobreiros
    const maxHeight = 300;  //altura maxima

    const minAngle = 0;     //angulo minimo dos sobreiros
    const maxAngle = 2 * Math.PI;      //angulo maximo
    var trees = [];
    for (let j = -width/2; j <= width/2; j += numSegmentsX) {
        for (let i = -height/2; i <= height/2; i += numSegmentsY) {
            
            var randomAngle = Math.random() * (maxAngle - minAngle) + minAngle;
            var randomHeight = Math.random() * (maxHeight - minHeight) + minHeight;
            var randomNum = Math.random();
            
            //tentativa de aceder ao y do plano 
            
            //const n = j*((width/2)+1)+i;
            //var vertex = t.terrain.geometry.vertices[n];
            //var yCoordinate = vertex.y;

            if (randomNum < probability) {
                const sobreiro = new Sobreiro(randomHeight, randomAngle);
                sobreiro.position.set(j/2, 25,i/2);
                trees.push(sobreiro)
            } 
        }
    }
    return trees;
}


//========================================================================================

const isoPerspective = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    10000
);

const dolly = new THREE.Object3D();

var target;

function setTarget(t) {
    target = t;
    isoPerspective.lookAt(t);

}

function update() {
    isoPerspective.aspect = window.innerWidth / window.innerHeight;
    isoPerspective.updateProjectionMatrix();
}

isoPerspective.position.set(700, 150, 700);


//========================================================================================

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
        this.#lights = new UFO_Lights();
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

//===========================================================================================

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

class HouseWallsGeometry extends THREE.BufferGeometry {
    constructor() {
        super();

        this.setAttribute(
            "position",
            new THREE.BufferAttribute(
                new Float32Array(this.#generateFrontWallVertexes().concat([
                    125, -75, 60,   // l0
                    125, -75, -60,  // l1
                    125, 45, -60,   // l2
                    125, 45, 60,    // l3
                    -125, -75, -60, // r0
                    -125, -75, 60,  // r1
                    -125, 45, 60,  // r2
                    -125, 45, -60,  // r3
                    125, -75, -60,  // b0
                    -125, -75, -60, // b1
                    -125, 45, -60,  // b2
                    125, 45, -60,   // b3
                ])),
                3)
        );

        this.setIndex(this.#generateFrontWallTriangles().concat([
            22, 23, 24,
            22, 24, 25,
            26, 27, 28,
            26, 28, 29,
            30, 31, 32,
            30, 32, 33,
            34, 35, 36,
            34, 36, 37,
        ]));
    }

    #generateFrontWallVertexes() {
        return [
            -125, -75, 60,  // f0
            -15, -75, 60,   // f0
            -15, -15, 60,   // f0
            -125, -15, 60,   // f0

            -105, -15, 60,   // f0
            -105, 15, 60,   // f0
            -125, 15, 60,   // f0

            -125, 45, 60,   // f0
            125, 45, 60,   // f0
            125, 15, 60,   // f0

            105, 15, 60,   // f0
            105, -15, 60,   // f0
            125, -15, 60,   // f0

            15, -15, 60,   // f0
            15, -75, 60,   // f0
            125, -75, 60,   // f0

            75, -15, 60,   // f0
            75, 15, 60,   // f0
            15, 15, 60,   // f0

            -15, 15, 60,   // f0
            -75, 15, 60,   // f0
            -75, -15, 60,   // f0
        ];
    }

    #generateFrontWallTriangles() {
        return [
            0, 1, 2,
            0, 2, 3,

            3, 4, 5,
            3, 5, 6,

            6, 8, 7,
            6, 9, 8,

            9, 10, 11,
            9, 11, 12,

            12, 13, 14,
            12, 14, 15,

            13, 16, 17,
            13, 17, 18,

            2, 19, 20,
            2, 20, 21,
        ];
    }
}


class HouseRoofGeometry extends THREE.BufferGeometry {
    constructor() {
        super();

        this.setAttribute(
            "position",
            new THREE.BufferAttribute(
                new Float32Array([
                    -125, 45, 60,   //fr
                    125, 45, 60,    //fl
                    125, 75, 0,     //tl
                    -125, 75, 0,    //tr
                    125, 45, 60,    //fl
                    125, 45, -60,   //bl
                    125, 75, 0,     //tl
                    125, 45, -60,   //bl
                    -125, 45, -60,  //br
                    -125, 75, 0,    //tr
                    125, 75, 0,     //tl
                    -125, 45, -60,  //br
                    -125, 45, 60,   //fr
                    -125, 75, 0,    //tr
                ]),
                3
            )
        );

        this.setIndex([
            0, 1, 2,
            0, 2, 3,
            4, 5, 6,
            7, 8, 9,
            7, 9, 10,
            11, 12, 13,
        ]);
    }
}


class windowGeometry extends THREE.BufferGeometry {
    constructor() {
        super();
        this.setAttribute(
            "position",
            new THREE.BufferAttribute(
                new Float32Array([
                    -15, -15, 0,
                    15, -15, 0,
                    15, 15, 0,
                    -15, 15, 0,
                ]),
                3
            )
        );

        this.setIndex([
            0, 1, 2,
            0, 2, 3,
        ]);
    }
}

class doorGeometry extends THREE.BufferGeometry {
    constructor() {
        super();
        this.setAttribute(
            "position",
            new THREE.BufferAttribute(
                new Float32Array([
                    -15, -45, 0,
                    15, -45, 0,
                    15, 45, 0,
                    -15, 45, 0,
                ]),
                3
            )
        );

        this.setIndex([
            0, 1, 2,
            0, 2, 3,
        ]);
    }
}

const doorMaterials = [
    new THREE.MeshLambertMaterial({
        color: "brown",
        side: THREE.FrontSide,
    }),
    new THREE.MeshPhongMaterial({
        color: "brown",
        side: THREE.FrontSide,
    }),
    new THREE.MeshToonMaterial({
        color: "brown",
        side: THREE.FrontSide,
    }),
    new THREE.MeshBasicMaterial({
        color: "brown",
        side: THREE.FrontSide,
    }),

    ];

const wallsMaterials = [
    new THREE.MeshLambertMaterial({
                color: 0xffffff,
                side: THREE.FrontSide,
            }),
    new THREE.MeshPhongMaterial({
                color: 0xffffff,
                side: THREE.FrontSide,
            }),
    new THREE.MeshToonMaterial({
                color: 0xffffff,
                side: THREE.FrontSide,
            }),
    new THREE.MeshBasicMaterial({
                color: 0xffffff,
                side: THREE.FrontSide,
            }),
    ];

const roofMaterials = [
    new THREE.MeshLambertMaterial({
        color: 0xff5500,
        side: THREE.FrontSide,
    }),
    new THREE.MeshPhongMaterial({
        color: 0xff5500,
        side: THREE.FrontSide,
    }),
    new THREE.MeshToonMaterial({
        color: 0xff5500,
        side: THREE.FrontSide,
    }),
    new THREE.MeshBasicMaterial({
        color: 0xff5500,
        side: THREE.FrontSide,
    })
];

const windowsMaterials = [
    new THREE.MeshLambertMaterial({
        color: 0x0000ff88,
        side: THREE.FrontSide,
    }),
    new THREE.MeshPhongMaterial({
        color: 0x0000ff88,
        side: THREE.FrontSide,
    }),
    new THREE.MeshToonMaterial({
        color: 0x0000ff88,
        side: THREE.FrontSide,
    }),
    new THREE.MeshBasicMaterial({
        color: 0x0000ff88,
        side: THREE.FrontSide,
    })
];


class House extends THREE.Object3D {
    #walls
    #roof
    #leftWindow
    #rightWindow
    #door
    constructor() {
        
        super();
        this.#walls = new THREE.Mesh(
            new HouseWallsGeometry(),
            wallsMaterials[0]
        );

        this.#walls.geometry.computeVertexNormals();

        this.#roof = new THREE.Mesh(
            new HouseRoofGeometry(),
            roofMaterials[0]
        );
        this.#roof.geometry.computeVertexNormals();

        this.#leftWindow = new THREE.Mesh(
            new windowGeometry(),
            windowsMaterials[0]
        );

        this.#leftWindow.geometry.computeVertexNormals();
        this.#leftWindow.position.set(90, 0, 60);

        this.#rightWindow = new THREE.Mesh(
            new windowGeometry(),
            windowsMaterials[0]
        );

        this.#rightWindow.geometry.computeVertexNormals();
        this.#rightWindow.position.set(-90, 0, 60);

        this.#door = new THREE.Mesh(
            new doorGeometry(),
            doorMaterials[0]
        );
        this.#door.geometry.computeVertexNormals();
        this.#door.position.set(0, -30, 60);

        this.add(this.#walls, this.#roof, this.#leftWindow, this.#rightWindow, this.#door);
    }
    changeMaterials(type){
        this.#walls.material = wallsMaterials[type];
        this.#rightWindow.material = windowsMaterials[type];
        this.#leftWindow.material = windowsMaterials[type];
        this.#door.material = doorMaterials[type];
        this.#roof.material = roofMaterials[type];
    }
}


main();