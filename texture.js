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
directionalLight.position.set(1, 500, 1000);
scene.add( directionalLight );

// texture
const textureLoader = new THREE.TextureLoader();
const textureBaseColor = textureLoader.load("../images/Ground_Dirt_008_baseColor.jpg");
const textureNormalMap = textureLoader.load("../images/Ground_Dirt_008_normal.jpg");
const textureHeightMap = textureLoader.load("../images/Ground_Dirt_008_height.png");
const textureRoughnessMap = textureLoader.load("../images/Ground_Dirt_008_roughness.jpg");

// geometry
const geometry = new THREE.SphereGeometry( 0.8, 32, 16 );

// base
const material1 = new THREE.MeshStandardMaterial( { 
    map: textureBaseColor,
} );
const sphere1 = new THREE.Mesh( geometry, material1 );
sphere1.position.x = -4;
scene.add( sphere1 );

// base + normal
const material2 = new THREE.MeshStandardMaterial( { 
    map: textureBaseColor,
    normalMap: textureNormalMap, 
} );
const sphere2 = new THREE.Mesh( geometry, material2 );
sphere2.position.x = -2;
scene.add( sphere2 );

// base + normal + height
const material3 = new THREE.MeshPhysicalMaterial( { 
    map: textureBaseColor,
    normalMap: textureNormalMap,
    displacementMap: textureHeightMap,
    displacementScale: 0.2,
} );
const sphere3 = new THREE.Mesh( geometry, material3 );
sphere3.position.x = 0;
scene.add( sphere3 );

// base + normal + height + roughness
const material4 = new THREE.MeshLambertMaterial( { 
    map: textureBaseColor,
    normalMap: textureNormalMap,
    displacementMap: textureHeightMap,
    displacementScale: 0.2,
    roughnessMap: textureRoughnessMap,
    roughness: 0.1,
} );
const sphere4 = new THREE.Mesh( geometry, material4 );
sphere4.position.x = 2;
scene.add( sphere4 );

// phong material
const material5 = new THREE.MeshPhongMaterial( { 
    color: 0xCA8BFF,
    shininess: 300,
    specular : 0x004fff,
} );
const sphere5 = new THREE.Mesh( geometry, material5 );
sphere5.position.x = 4;
scene.add( sphere5 );

camera.position.z = 8;

function animate() {
    requestAnimationFrame( animate );
    const value = 0.05

    // sphere1.rotation.y += value;
    // sphere2.rotation.y += value;
    // sphere3.rotation.y += value;
    // sphere4.rotation.y += value;
    // sphere5.rotation.y += value;

    renderer.render(scene, camera);
}

animate();