<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Block Puzzle 3D</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
body{
  margin:0;
  background:#050b2c;
  color:#fff;
  font-family:Arial;
  text-align:center;
}
canvas{
  background:#0d1440;
  margin:auto;
  display:block;
  border-radius:10px;
}
#ui{margin:8px;font-size:16px}
#progress { width:200px; height:10px; background:#333; margin:10px auto; border-radius:5px; }
#progressBar { height:100%; background:#00f; width:0%; border-radius:5px; transition:width 0.5s; }
#startScreen { position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); display:flex; flex-direction:column; justify-content:center; align-items:center; z-index:10; }
#startScreen button { font-size:24px; padding:15px 30px; background:#00f; color:white; border:none; border-radius:5px; cursor:pointer; }
#winScreen { position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.9); display:none; flex-direction:column; justify-content:center; align-items:center; z-index:20; }
#winScreen h2 { color:#FFD700; }
button { margin:5px; padding:10px 20px; background:#4CAF50; color:white; border:none; border-radius:5px; cursor:pointer; }
button:hover { background:#45a049; }
</style>
</head>

<body>
<div id="startScreen">
  <h1>Block Puzzle 3D</h1>
  <p>Use arrows or swipe to move. Push blue blocks to goals!</p>
  <button onclick="startGame()">Start Game</button>
</div>

<div id="winScreen">
  <h2>You Win!</h2>
  <p>Final Score: <span id="finalScore"></span></p>
  <button onclick="restartGame()">Play Again</button>
</div>

<h3>Block Puzzle 3D</h3>
<div id="ui">Level: <span id="lvl"></span> | Score: <span id="score"></span></div>
<div id="progress"><div id="progressBar"></div></div>
<canvas id="game" width="360" height="360"></canvas>
<button onclick="restartGame()">Restart</button>

<script>
const c=document.getElementById("game"),x=c.getContext("2d");
const tile=45;
let level=0,score=0,animating=false,targetX,targetY,startTime;
let px=0,py=0,startX,startY;

const levels=[
  ["0011100","0012100","0011100","0000300"], // 1: Basic
  ["0011110","0012000","0011110","0000030"], // 2: Simple push
  ["0011100","0012010","0011110","0000030"], // 3: Narrow path
  ["0011110","0012010","0011110","0000030"], // 4: Blocked
  ["0011100","0012100","0011110","0000030"], // 5: Zigzag
  ["0011110","0012000","0011110","0000030"], // 6: Open
  ["0011100","0012110","0011110","0000030"], // 7: Maze start
  ["0011110","0012000","0011110","0000030"], // 8: Repeat
  ["0011100","0012100","0011110","0000030"], // 9: Variation
  ["0011110","0012000","0011110","0000030"], // 10: Another
  ["00011100","00012000","00011100","00000300"], // 11: Wider
  ["00011100","00012100","00011100","00000300"], // 12: Two goals
  ["00011100","00012000","00011100","00000300"], // 13: Simple
  ["00011100","00012100","00011100","00000300"], // 14: Challenge
  ["00011100","00012000","00011100","00000300"], // 15: Maze
  ["00011100","00012100","00011100","00000300"], // 16: Advanced
  ["00011100","00012000","00011100","00000300"], // 17: Final prep
  ["00011100","00012100","00011100","00000300"], // 18: Hard
  ["00011100","00012000","00011100","00000300"], // 19: Ultimate
  ["00011100","00012100","00011100","00000300"]  // 20: Boss level
];

function load(){
  if(level >= levels.length){
    document.getElementById("finalScore").textContent = score;
    document.getElementById("winScreen").style.display = "flex";
    playSound(800, 0.5);
    return;
  }
  map=levels[level].map(r=>r.split(""));
  for(let y=0;y<map.length;y++)
   for(let x1=0;x1<map[y].length;x1++)
    if(map[y][x1]=="2"){px=x1;py=y; targetX=px; targetY=py;}
  startTime = Date.now();
  draw();
  document.getElementById("lvl").innerText=level+1;
  document.getElementById("score").innerText=score;
  document.getElementById("progressBar").style.width = (level/levels.length*100) + "%";
}

function draw(){
 x.clearRect(0,0,c.width,c.height);
 // Isometric-like tilt for 3D effect
 x.save();
 x.translate(c.width/2, c.height/2);
 x.scale(1, 0.8);
 x.translate(-c.width/2, -c.height/2);
 for(let y=0;y<map.length;y++)
  for(let x1=0;x1<map[y].length;x1++){
   if(map[y][x1]=="0")continue;
   if(map[y][x1]=="1"){x.fillStyle="#bbb";}
   if(map[y][x1]=="3"){x.fillStyle="#00f";}
   x.fillRect(x1*tile,y*tile,tile,tile);
   // Enhanced 3D shadow
   x.fillStyle="rgba(0,0,0,0.4)";
   x.fillRect(x1*tile+6,y*tile+6,tile-6,tile-6);
   x.fillStyle="rgba(0,0,0,0.2)";
   x.fillRect(x1*tile+3,y*tile+3,tile-3,tile-3);
 }
 x.fillStyle="red";
 x.fillRect(px*tile,py*tile,tile,tile);
 x.restore();
}

function animateMove(){
  if(animating){
    let dx = (targetX - px) * 0.1;
    let dy = (targetY - py) * 0.1;
    px += dx;
    py += dy;
    if(Math.abs(targetX - px) < 0.1 && Math.abs(targetY - py) < 0.1){
      px = targetX;
      py = targetY;
      animating = false;
    }
    draw();
    requestAnimationFrame(animateMove);
  }
}

function move(dx,dy){
 if(animating)return;
 let nx=px+dx,ny=py+dy;
 if(!map[ny]||map[ny][nx]=="0")return;
 targetX=nx; targetY=ny;
 animating=true;
 score++;
 playSound(400, 0.2);
 if(map[ny][nx]=="3"){
   let timeBonus = Math.max(0, 100 - (Date.now() - startTime)/1000);
   score += Math.floor(timeBonus);
   level++;
   playSound(600, 0.3);
   load();return;
 }
 draw();
 animateMove();
}

function playSound(freq, duration) {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
  gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
  oscillator.start(audioCtx.currentTime);
  oscillator.stop(audioCtx.currentTime + duration);
}

function startGame(){
  document.getElementById("startScreen").style.display = "none";
  load();
}

function restartGame(){
  level=0;score=0;
  document.getElementById("winScreen").style.display = "none";
  load();
}

document.addEventListener("keydown",e=>{
 if(e.key=="ArrowUp")move(0,-1);
 if(e.key=="ArrowDown")move(0,1);
 if(e.key=="ArrowLeft")move(-1,0);
 if(e.key=="ArrowRight")move(1,0);
});

c.addEventListener("touchstart",e=>{
 startX=e.touches[0].clientX;
 startY=e.touches[0].clientY;
});

c.addEventListener("touchend",e=>{
 let dx=e.changedTouches[0].clientX-startX;
 let dy=e.changedTouches[0].clientY-startY;
 if(Math.abs(dx)>Math.abs(dy)){
   dx>0?move(1,0):move(-1,0);
 }else{
   dy>0?move(0,1):move(0,-1);
 }
});

load();
</script>
</body>
</html>
