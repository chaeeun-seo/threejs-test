import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xFFFCF0);

// camera
const fov = 75;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

camera.position.x = 0;
camera.position.y = 1;
camera.position.z = 5;
camera.lookAt(new THREE.Vector3(0, 0, 0));

// renderer
const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias : true
});
renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild( renderer.domElement );

// OrbitControls 추가
console.log(OrbitControls);
const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 2;
controls.maxDistance = 4;
controls.maxPolarAngle = Math.PI / 2;
controls.update();

// 1. ambient light
const ambientLight = new THREE.AmbientLight( 0xffa500, 0.3 );
scene.add( ambientLight );

// 2. directional light (ex. sunlight)
const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5);
directionalLight.position.set(1, 1, 1);
const dlHelper = new THREE.DirectionalLightHelper(directionalLight, 0.5, 0x0000ff);
// scene.add(directionalLight);
// scene.add(dlHelper);

// 3. hemisphere light (up, down)
const hemisphereLight = new THREE.HemisphereLight(0x0000ff, 0xff0000, 0.5);
// scene.add(hemisphereLight);

// 4. point light (light bulb) (multiple light)
const pointLight1 = new THREE.PointLight(0xffffff, 1);
pointLight1.position.set(-2, 0.5, 0.5);
const plhelper1 = new THREE.PointLightHelper(pointLight1, 0.1);
// scene.add(pointLight1);
// scene.add(plhelper1);

const pointLight2 = new THREE.PointLight(0xffffff, 1);
pointLight2.position.set(2, 0.1, 0.5);
const plhelper2 = new THREE.PointLightHelper(pointLight2, 0.1);
// scene.add(pointLight2);
// scene.add(plhelper2);

// 5. rect light
const rectLight = new THREE.RectAreaLight(0xffffff, 2, 1, 1);
rectLight.position.set(0.5, 0.5, 1);
rectLight.lookAt(0, 0, 0);
// scene.add(rectLight);

// 6. spot light
const spotLight = new THREE.SpotLight(0xffffff, 1);
// scene.add(spotLight);

// geometry
const geometry = new THREE.SphereGeometry( 0.8, 32, 16 );

// plane
const planeGeometry = new THREE.PlaneGeometry(20, 20, 1, 1);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
plane.position.y = -0.2;
scene.add(plane);

// sphere
const material1 = new THREE.MeshStandardMaterial( { color : 0xffffff } );
const sphere1 = new THREE.Mesh( geometry, material1 );
sphere1.position.y = 0.7;
scene.add( sphere1 );

function animate() {

	requestAnimationFrame( animate );

	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();

    const value = 0.05

    // sphere1.rotation.y += value;
    // sphere2.rotation.y += value;
    // sphere3.rotation.y += value;
    // sphere4.rotation.y += value;
    // sphere5.rotation.y += value;

	renderer.render( scene, camera );

}

animate();