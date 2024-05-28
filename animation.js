import * as THREE from 'three';

import {FBXLoader} from 'three/addons/loaders/FBXLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xFFFCF0);

// camera
const fov = 100;
const aspect = window.innerWidth / window.innerHeight;
const near = 1.0;
const far = 1000.0;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
// camera.position.set(0, 1, 5);
camera.position.x = 0;
camera.position.y = -1;
camera.position.z = 0;
camera.lookAt(new THREE.Vector3(0, 0, 0));

// light
const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1.0);
directionalLight.position.set(20, 100, 10);
directionalLight.target.position.set(0, 0, 0);
directionalLight.castShadow = true;
directionalLight.shadow.bias = -0.001;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.camera.near = 0.1;
directionalLight.shadow.camera.far = 500.0;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 500.0;
directionalLight.shadow.camera.left = -100;
directionalLight.shadow.camera.right = 100;
directionalLight.shadow.camera.top = 100;
directionalLight.shadow.camera.bottom = -100;
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 4.0);
scene.add(ambientLight);

// renderer
const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias : true
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild( renderer.domElement );

// OrbitControls 추가
console.log(OrbitControls);
const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 2;
controls.maxDistance = 100;
controls.maxPolarAngle = Math.PI / 2;
controls.target.set(0, 20, 0);
controls.update();

// plane
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100, 10, 10),
    new THREE.MeshStandardMaterial({
        color: 0x202020,
}));
plane.castShadow = false;
plane.receiveShadow = true;
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

function loadAnimatedModel () {
    const loader = new FBXLoader();
    loader.load('../resources/avatar.fbx', (fbx) => {
        fbx.scale.setScalar(0.1);
        fbx.traverse(c => {
            c.castShadow = true;
        });
        const animLoader = new FBXLoader();
        animLoader.load('../resources/dance.fbx', (anim) => {
            const mixer = new THREE.AnimationMixer(fbx);
            const idle = mixer.clipAction(anim.animations[0]);
            idle.play();

            // Animation loop for the mixer
            const clock = new THREE.Clock();
            function updateAnimation() {
                requestAnimationFrame(updateAnimation);
                const delta = clock.getDelta();
                mixer.update(delta);
                controls.update();
                renderer.render(scene, camera);
            }
            updateAnimation();
        });
        scene.add(fbx);
        console.log("model loaded!")
    });
}

loadAnimatedModel();

function animate() {

	requestAnimationFrame( animate );

	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();

	renderer.render( scene, camera );

}

animate();

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize);