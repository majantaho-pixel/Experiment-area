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
renderer.setClearColor(0x050b2c); // dark blue background

// Light
// Directional Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 5); // camera کے side سے
scene.add(light);

// Ambient Light (floor اور player visible کے لیے)
const ambient = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambient);

// Floor
const floor = new THREE.Mesh(
  new THREE.BoxGeometry(10, 0.2, 10),           // width, height, depth
  new THREE.MeshStandardMaterial({ color: 0x444444 }) // dark gray
);
floor.position.set(0, -0.1, 0); // تھوڑا نیچے رکھیں تاکہ player cube اوپر رہے
scene.add(floor);

// Animate loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// Player movement
document.addEventListener("keydown", (e) => {
  const step = 1;
  if (e.key === "ArrowUp") player.position.z -= step;
  if (e.key === "ArrowDown") player.position.z += step;
  if (e.key === "ArrowLeft") player.position.x -= step;
  if (e.key === "ArrowRight") player.position.x += step;
});
player.position.set(0, 0.5, 0); // Y = 0.5, floor کے اوپر
scene.add(player);
