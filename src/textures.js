import * as THREE from "three";

//-------SKYDOME-------

// canvas para a textura
var canvas = document.createElement('canvas');
canvas.width = 512;
canvas.height = 512;
var context = canvas.getContext('2d');

//TODO - tentativa de gradient
/*
var gradient = context.createLinearGradient(0, 0, canvas.height * 2,0);
gradient.addColorStop(0, '#00008B'); // Dark blue
gradient.addColorStop(1, '#8B008B'); // Dark violet
context.fillStyle = gradient;
context.fillRect(0,0 , canvas.width, canvas.height); // Fill the entire canvas with black
*/

context.beginPath();
context.rect(0, 0, canvas.width, canvas.height);
context.fillStyle = '#000000';
context.fill();

// gera as estrelas procedimentalmente
var starCount = 250;
for (var i = 0; i < starCount; i++) {
  var x = Math.random() * canvas.width;
  var y = Math.random() * canvas.height;
  var radius = Math.random() * 5;
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI);
  context.fillStyle = '#ffffff';
  context.fill();
}

var skyTexture = new THREE.CanvasTexture(canvas);
skyTexture.wrapS = THREE.RepeatWrapping;
skyTexture.wrapT = THREE.RepeatWrapping;
skyTexture.repeat.set(9, 9);

var skyMaterial = new THREE.MeshBasicMaterial({ map: skyTexture, side: THREE.BackSide });
var skyGeometry = new THREE.SphereGeometry(300, 32, 32, 0, 2 * Math.PI, 0,  (1/2) * Math.PI);
var skyDome = new THREE.Mesh(skyGeometry, skyMaterial);


//-------TEXTURA PARA O PLANO-------

const flowerColors = [
  '#ffffff', // white
  '#ffef70', // yellow
  '#cc99ff', // lilac
  '#aed6f1' // light blue
];

var canvas2 = document.createElement('canvas');
canvas2.width = 512;
canvas2.height = 512;
var context2 = canvas2.getContext('2d');

context2.beginPath();
context2.rect(0, 0, canvas2.width, canvas2.height);
context2.fillStyle = '#ACFFAC';
context2.fill();

const flowers = 250;
for (var i = 0; i < flowers; i++) {
  var x = Math.random() * canvas2.width;
  var y = Math.random() * canvas2.height;
  var radius = Math.random() * 20;
  context2.beginPath();
  context2.arc(x, y, radius, 0, 2 * Math.PI);
  const flowerColor = flowerColors[Math.floor(Math.random() * flowerColors.length)];
  context2.fillStyle = flowerColor;
  context2.fill();
}

var floorTexture = new THREE.CanvasTexture(canvas2);
floorTexture.wrapS = THREE.RepeatWrapping;
floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(9, 9); 

var floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.FrontSide });
var floorGeometry = new THREE.PlaneGeometry(500, 500);
var floorText = new THREE.Mesh(floorGeometry, floorMaterial);

export default {
    skyDome: skyDome,
    floorText: floorText,
}