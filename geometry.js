import * as THREE from 'three';

// scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xFFFCF0);

// camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// renderer
const renderer = new THREE.WebGLRenderer({
    antialias : true
});
renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild( renderer.domElement );

const geometry1 = new THREE.BoxGeometry( 1, 1, 1 );
const material1 = new THREE.MeshBasicMaterial( { color: 0xFFB2B2 } );
const cube = new THREE.Mesh( geometry1, material1 );
cube.position.x = -6;
scene.add( cube );

const geometry2 = new THREE.CapsuleGeometry( 0.6, 0.6, 4, 6 );
const material2 = new THREE.MeshBasicMaterial( { color: 0xFFD6B2 } );
const capsule = new THREE.Mesh( geometry2, material2 );
capsule.position.x = -3;
scene.add( capsule );

const geometry3 = new THREE.ConeGeometry( 0.6, 2, 32 );
const material3 = new THREE.MeshBasicMaterial( {color: 0xFFE473} );
const cone = new THREE.Mesh( geometry3, material3 );
cone.position.x = 0;
scene.add( cone );

const geometry4 = new THREE.CylinderGeometry( 0.5, 0.5, 1, 32 );
const material4 = new THREE.MeshBasicMaterial( {color: 0xBFFF93} );
const cylinder = new THREE.Mesh( geometry4, material4 );
cylinder.position.x = 3;
scene.add( cylinder );

const geometry5 = new THREE.DodecahedronGeometry( 0.5, 0 );
const material5 = new THREE.MeshBasicMaterial( {color: 0x8BE1FF} );
const dodecahedron = new THREE.Mesh( geometry5, material5 );
dodecahedron.position.x = 6;
scene.add( dodecahedron );

camera.position.z = 5;

function animate() {
    requestAnimationFrame( animate );
    const value = 0.01

    cube.rotation.x += value;
    cube.rotation.y += value;
    capsule.rotation.x += value;
    capsule.rotation.y += value;
    cone.rotation.x += value;
    cone.rotation.y += value;
    cylinder.rotation.x += value;
    cylinder.rotation.y += value;
    dodecahedron.rotation.x += value;
    dodecahedron.rotation.y += value;

    renderer.render( scene, camera );
}

animate();

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize);