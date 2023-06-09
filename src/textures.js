import * as THREE from "three";

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

var skyGeometry = new THREE.SphereGeometry(300, 32, 32, 0, 2 * Math.PI, 0,  (1/2) * Math.PI);
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
var floorMaterial = new THREE.MeshBasicMaterial({
  map: floorTexture, 
  side: THREE.FrontSide //frontside significa que só dá load à parte de dentro da esfera 
});
//var floorGeometry = new THREE.PlaneGeometry(600, 600);
//var floorText = new THREE.Mesh(floorGeometry, floorMaterial);
//floorText.rotation.x = -Math.PI / 2; // Rotate 90 degrees around the x-axis

export default {
    skyDome: skyDome,
    floorMaterial: floorMaterial,
}