// Player (Red Block)
const playerSize = 1;

const playerGeometry = new THREE.BoxGeometry(
  playerSize,
  playerSize,
  playerSize
);

const playerMaterial = new THREE.MeshStandardMaterial({
  color: 0xff0000
});

const player = new THREE.Mesh(playerGeometry, playerMaterial);

// Start position (center)
player.position.set(0, 0.6, 0);
scene.add(player);
