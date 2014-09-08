// Basic settings
var width = window.innerWidth;
var height = window.innerHeight;
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement); // Doublecheck if I can assign this to a specific place
var scene = new THREE.Scene;


// Camera settings
var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
camera.position.y = 350;
camera.position.x = 0;
camera.position.z = 500;
camera.lookAt( new THREE.Vector3(0,0,0) );

// Background
var skyboxGeometry = new THREE.CubeGeometry(10000, 10000, 10000);
var skyboxMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide });
var skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);

// Lighting
var pointLight = new THREE.PointLight(0xffffff, 4, 1000);
pointLight.position.set(0, 0, 0);

scene.add(new THREE.AmbientLight(0x333333,40));






scene.add(camera); 
scene.add(skybox);
scene.add(pointLight);


// Test grouping
//var cubeGeometry = new THREE.CubeGeometry(100, 100, 100);
//var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x1ec876 });
//var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
//cube.rotation.y = Math.PI * 45 / 180; 
//scene.add(cube);


