// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x050b2c);

// Camera
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(6, 8, 10);
camera.lookAt(0, 0, 0);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7);
scene.add(light);

// Floor
const floor = new THREE.Mesh(
  new THREE.BoxGeometry(10, 0.2, 10),
  new THREE.MeshStandardMaterial({ color: 0xffffff })
);
scene.add(floor);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
