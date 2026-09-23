import * as THREE from 'three';import './style.css';

const app=document.querySelector('#game');
const scene=new THREE.Scene();scene.background=new THREE.Color(0x07111f);scene.fog=new THREE.Fog(0x07111f,35,105);
const camera=new THREE.PerspectiveCamera(65,innerWidth/innerHeight,.05,180);
const renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});renderer.setPixelRatio(Math.min(devicePixelRatio,1.75));renderer.setSize(innerWidth,innerHeight);renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;app.appendChild(renderer.domElement);

scene.add(new THREE.HemisphereLight(0xaed7ff,0x18212c,1.8));
const sun=new THREE.DirectionalLight(0xffe4b5,3);sun.position.set(20,35,12);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);scene.add(sun);

const world=new THREE.Group();scene.add(world);
const mat={ground:new THREE.MeshStandardMaterial({color:0x8c5b38,roughness:.95}),metal:new THREE.MeshStandardMaterial({color:0x263849,metalness:.65,roughness:.38}),cover:new THREE.MeshStandardMaterial({color:0x394b3e,roughness:.8}),accent:new THREE.MeshStandardMaterial({color:0xff8a3d,emissive:0x3b1200,emissiveIntensity:.35}),player:new THREE.MeshStandardMaterial({color:0x4ca6ff,roughness:.55}),enemy:new THREE.MeshStandardMaterial({color:0xff4f63,roughness:.55}),weapon:new THREE.MeshStandardMaterial({color:0x171d24,metalness:.8,roughness:.25})};
function box(x,y,z,sx,sy,sz,m,cast=true){const q=new THREE.Mesh(new THREE.BoxGeometry(sx,sy,sz),m);q.position.set(x,y,z);q.castShadow=cast;q.receiveShadow=true;world.add(q);return q}
box(0,-.5,0,58,1,42,mat.ground,false);
for(const p of [[-18,2,-8,5,4,3],[15,2,-7,6,4,3],[-12,2,10,4,4,5],[12,2,10,5,4,4],[0,1,-14,8,2,2],[0,1,14,8,2,2]])box(...p,mat.cover);
for(const x of [-24,24])for(const z of [-14,14])box(x,3,z,2,6,2,mat.metal);
for(const x of [-8,8]){box(x,5,0,3,1,10,mat.metal);box(x,8,0,3,1,5,mat.metal)}
const platform=new THREE.Mesh(new THREE.CylinderGeometry(6,6,1,32),mat.metal);platform.position.set(0,3,0);platform.castShadow=true;platform.receiveShadow=true;world.add(platform);

function makePlayer(material,name){const g=new THREE.Group();const body=new THREE.Mesh(new THREE.CapsuleGeometry(.55,1.05,5,10),material);body.position.y=1.35;body.castShadow=true;g.add(body);const head=new THREE.Mesh(new THREE.SphereGeometry(.4,16,12),material);head.position.y=2.25;head.castShadow=true;g.add(head);const gun=new THREE.Mesh(new THREE.BoxGeometry(.16,.18,1.15),mat.weapon);gun.position.set(.55,1.55,-.55);gun.rotation.x=-.03;gun.castShadow=true;g.add(gun);g.userData={name,health:100,vel:new THREE.Vector3(),fuel:100,cool:0,alive:true};world.add(g);return g}
const player=makePlayer(mat.player,'YOU');player.position.set(0,0,15);
const enemies=[];[[-15,0,-8],[15,0,-8],[-17,0,10]].forEach((p,i)=>{const e=makePlayer(mat.enemy,'BOT-'+(i+1));e.position.set(...p);enemies.push(e)});

const bullets=[];const raycaster=new THREE.Raycaster();const keys={};let yaw=0,pitch=-.1,score=0,kills=0,timeLeft=300,gameOver=false,mouseDown=false;
const hud=document.createElement('div');hud.className='hud';hud.innerHTML='<div class="brand">SKY<span>ARENA</span><small>3D COMBAT PROTOTYPE</small></div><div class="stats"><div>HP <b id="hp">100</b></div><div>JET <b id="fuel">100</b></div><div>AMMO <b id="ammo">30</b></div><div>KILLS <b id="kills">0</b></div></div><div class="crosshair">+</div><div class="hint">WASD MOVE · SPACE JUMP · SHIFT JETPACK · MOUSE AIM/FIRE · R RELOAD</div><div id="banner" class="banner"></div>';app.appendChild(hud);
const hpEl=document.querySelector('#hp'),fuelEl=document.querySelector('#fuel'),ammoEl=document.querySelector('#ammo'),killsEl=document.querySelector('#kills'),banner=document.querySelector('#banner');
function setBanner(t){banner.textContent=t;banner.classList.toggle('show',!!t)}
function shoot(){if(gameOver||player.userData.cool>0||player.userData.ammo<=0)return;player.userData.cool=.11;player.userData.ammo--;const origin=player.position.clone();origin.y+=1.6;const dir=new THREE.Vector3(0,0,-1).applyEuler(new THREE.Euler(pitch,yaw,0,'YXZ'));const b=new THREE.Mesh(new THREE.SphereGeometry(.055,8,8),mat.accent);b.position.copy(origin);b.userData={vel:dir.multiplyScalar(48),life:1.3};scene.add(b);bullets.push(b);const ray=new THREE.Raycaster(origin,dir,.1,50);const targets=enemies.filter(e=>e.userData.alive);const hit=ray.intersectObjects(targets,true)[0];if(hit){let e=hit.object;while(e.parent&&!targets.includes(e))e=e.parent;if(targets.includes(e))damage(e,34)}}
function damage(e,d){e.userData.health-=d;if(e.userData.health<=0){e.userData.alive=false;e.visible=false;kills++;killsEl.textContent=kills;setTimeout(()=>respawnBot(e),1400)}}
function respawnBot(e){e.position.set((Math.random()>.5?1:-1)*(8+Math.random()*12),0,(Math.random()>.5?1:-1)*(5+Math.random()*8));e.userData.health=100;e.userData.alive=true;e.visible=true}
function updatePlayer(dt){const u=player.userData;u.cool=Math.max(0,u.cool-dt);const forward=new THREE.Vector3(Math.sin(yaw),0,Math.cos(yaw));const right=new THREE.Vector3(Math.cos(yaw),0,-Math.sin(yaw));const input=new THREE.Vector3();if(keys.KeyW)input.add(forward.multiplyScalar(-1));if(keys.KeyS)input.add(forward);if(keys.KeyD)input.add(right);if(keys.KeyA)input.sub(right);if(input.lengthSq())input.normalize().multiplyScalar(keys.ShiftLeft?9:6);u.vel.x=THREE.MathUtils.damp(u.vel.x,input.x,10,dt);u.vel.z=THREE.MathUtils.damp(u.vel.z,input.z,10,dt);if(keys.Space&&player.position.y<=.05)u.vel.y=8;if(keys.ShiftLeft&&u.fuel>0){u.vel.y=THREE.MathUtils.damp(u.vel.y,7,6,dt);u.fuel=Math.max(0,u.fuel-28*dt)}else{u.vel.y-=22*dt;u.fuel=Math.min(100,u.fuel+18*dt)}player.position.addScaledVector(u.vel,dt);if(player.position.y<0){player.position.y=0;u.vel.y=0}player.position.x=THREE.MathUtils.clamp(player.position.x,-27,27);player.position.z=THREE.MathUtils.clamp(player.position.z,-19,19);player.rotation.y=yaw;camera.position.lerp(new THREE.Vector3(player.position.x,player.position.y+3.3,player.position.z+7).applyAxisAngle(new THREE.Vector3(0,1,0),yaw),1-Math.pow(.0001,dt));camera.lookAt(player.position.x,player.position.y+1.45,player.position.z);hpEl.textContent=Math.max(0,Math.round(u.health));fuelEl.textContent=Math.round(u.fuel);ammoEl.textContent=u.ammo??30}
function updateBots(dt){for(const e of enemies){if(!e.userData.alive)continue;const to=player.position.clone().sub(e.position);const dist=to.length();e.lookAt(player.position.x,e.position.y+1.3,player.position.z);if(dist>9)e.position.addScaledVector(to.normalize(),dt*2.2);else if(dist<5)e.position.addScaledVector(to.normalize(),-dt*1.2);e.position.y=0;e.userData.cool=Math.max(0,e.userData.cool-dt);if(dist<24&&e.userData.cool<=0){e.userData.cool=1.1;const chance=Math.random();if(chance<.72){player.userData.health-=8;if(player.userData.health<=0){player.userData.health=100;player.position.set(0,0,15);setBanner('RESPAWN')}}}}}
function updateBullets(dt){for(let i=bullets.length-1;i>=0;i--){const b=bullets[i];b.position.addScaledVector(b.userData.vel,dt);b.userData.life-=dt;if(b.userData.life<=0){scene.remove(b);bullets.splice(i,1)}}}
addEventListener('keydown',e=>{keys[e.code]=true;if(e.code==='KeyR')player.userData.ammo=30;if(e.code==='Escape')document.exitPointerLock?.()});
addEventListener('keyup',e=>keys[e.code]=false);
renderer.domElement.addEventListener('click',()=>renderer.domElement.requestPointerLock?.());
addEventListener('mousedown',e=>{if(e.button===0){mouseDown=true;shoot()}});
addEventListener('mouseup',e=>{if(e.button===0)mouseDown=false});
addEventListener('mousemove',e=>{if(document.pointerLockElement!==renderer.domElement)return;yaw-=e.movementX*.0025;pitch=THREE.MathUtils.clamp(pitch-e.movementY*.0025,-1.1,.75)});
addEventListener('touchstart',e=>{if(e.touches.length){shoot()}},{passive:true});
function animate(){requestAnimationFrame(animate);const dt=Math.min(clock.getDelta(),.033);if(!gameOver){if(mouseDown)shoot();updatePlayer(dt);updateBots(dt);updateBullets(dt);timeLeft-=dt;if(timeLeft<=0){gameOver=true;setBanner('MATCH COMPLETE — KILLS '+kills)}}renderer.render(scene,camera)}
const clock=new THREE.Clock();player.userData.ammo=30;setBanner('CLICK TO LOCK MOUSE · ENTER THE ARENA');setTimeout(()=>setBanner(''),2800);addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)});animate();
