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

// light
const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
directionalLight.position.set(1, 500, 10000);
scene.add( directionalLight );

// const light = new THREE.PointLight( 0xffffff, 1, 100 );
// light.position.set( 2, 1, 0.9 );
// scene.add( light );

// const pointLight = new THREE.PointLight(0xffffff, 1);
// pointLight.position.set(0.9, -0.9, 0.9);
// pointLight.position.set(0, 2, 12);
// scene.add(pointLight);

// geometry
const geometry = new THREE.TorusGeometry( 0.3, 0.15, 16, 40 );

// basic material
const material1 = new THREE.MeshBasicMaterial( { 
    color: 0xCA8BFF,
    wireframe: true,
} );
const torus1 = new THREE.Mesh( geometry, material1 );
torus1.position.x = -2;
scene.add( torus1 );

// standard material
const material2 = new THREE.MeshStandardMaterial( { 
    color: 0xCA8BFF,
    metalness: 0.5, 
    roughness: 0.5,
    // transparent: true,
    // opacity: 0.9,
} );
const torus2 = new THREE.Mesh( geometry, material2 );
torus2.position.x = -1;
scene.add( torus2 );

// physical material
const material3 = new THREE.MeshPhysicalMaterial( { 
    color: 0xCA8BFF,
    clearcoat: 1,
    clearcoarRoughness: 0.1,
} );
const torus3 = new THREE.Mesh( geometry, material3 );
torus3.position.x = 0;
scene.add( torus3 );

// lambert material
const material4 = new THREE.MeshLambertMaterial( { color: 0xCA8BFF } );
const torus4 = new THREE.Mesh( geometry, material4 );
torus4.position.x = 1;
scene.add( torus4 );

// phong material
const material5 = new THREE.MeshPhongMaterial( { 
    color: 0xCA8BFF,
    shininess: 300,
    specular : 0x004fff,
} );
const torus5 = new THREE.Mesh( geometry, material5 );
torus5.position.x = 2;
scene.add( torus5 );

camera.position.z = 5;

function animate() {
    requestAnimationFrame( animate );
    const value = 0.05

    torus1.rotation.y += value;
    torus2.rotation.y += value;
    torus3.rotation.y += value;
    torus4.rotation.y += value;
    torus5.rotation.y += value;

    renderer.render(scene, camera);
}

animate();