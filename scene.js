import * as THREE from './vendor/three.module.js';
const host = document.querySelector('#scene');
const fallback = host.querySelector('.phone-fallback');
const toggle = document.querySelector('#motion-toggle');
const preference = matchMedia('(prefers-reduced-motion: reduce)');
let paused = preference.matches;
try {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.7));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, .1, 100);
  camera.position.set(0, 0, 8.8);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x657895, 3));
  const key = new THREE.DirectionalLight(0xffffff, 5); key.position.set(-3, 4, 6); scene.add(key);
  const rim = new THREE.DirectionalLight(0x8aabff, 3); rim.position.set(4, 0, -2); scene.add(rim);
  const phone = new THREE.Group(); scene.add(phone);
  function roundShape(w, h, r) {
    const s = new THREE.Shape(), x = -w / 2, y = -h / 2;
    s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r);
    s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r);
    s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y); return s;
  }
  const bodyGeometry = new THREE.ExtrudeGeometry(roundShape(1.86, 3.66, .25), { depth: .16, bevelEnabled: true, bevelSegments: 4, steps: 1, bevelSize: .055, bevelThickness: .055, curveSegments: 16 });
  const body = new THREE.Mesh(bodyGeometry, new THREE.MeshStandardMaterial({ color: 0x303948, metalness: .78, roughness: .28 })); phone.add(body);
  const surface = document.createElement('canvas'); surface.width = 640; surface.height = 1280;
  const ctx = surface.getContext('2d');
  ctx.fillStyle = '#f0f2f9'; ctx.fillRect(0, 0, 640, 1280);
  ctx.fillStyle = '#26303a'; ctx.font = '500 26px Arial'; ctx.fillText('9:41', 43, 55);
  ctx.fillRect(532, 36, 32, 14); ctx.fillRect(570, 36, 20, 14);
  ctx.font = '21px Arial'; ctx.fillStyle = '#717b8f'; ctx.fillText('DESIGNED TO MAKE A DIFFERENCE', 40, 190);
  ctx.fillStyle = '#222c3e'; ctx.font = '58px Arial'; ctx.fillText('Hello, world.', 40, 269);
  ctx.font = '28px Arial'; ctx.fillStyle = '#707c91'; ctx.fillText('Small details.', 42, 327); ctx.fillText('Big possibilities.', 42, 368);
  const grad = ctx.createLinearGradient(140, 410, 480, 850); grad.addColorStop(0, '#6885fa'); grad.addColorStop(1, '#203fb2');
  ctx.save(); ctx.translate(320, 618); ctx.fillStyle = grad;
  for (let i = 0; i < 12; i++) { ctx.save(); ctx.rotate(i * Math.PI / 6); ctx.beginPath(); ctx.roundRect(-36, -211, 72, 270, 36); ctx.fill(); ctx.restore(); } ctx.restore();
  ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.roundRect(35, 894, 570, 175, 24); ctx.fill();
  ctx.fillStyle = '#3157dc'; ctx.font = '21px Arial'; ctx.fillText('CRAFTED WITH PURPOSE', 60, 940);
  ctx.fillStyle = '#273349'; ctx.font = '31px Arial'; ctx.fillText('Ideas → Experiences', 60, 997);
  ctx.fillStyle = '#8a93a4'; ctx.font = '22px Arial'; ctx.fillText('React Native  /  Full stack', 60, 1036);
  ctx.fillStyle = '#3157dc'; ctx.beginPath(); ctx.roundRect(35, 1100, 570, 78, 18); ctx.fill();
  ctx.fillStyle = '#fff'; ctx.font = '25px Arial'; ctx.fillText('Let’s build something.                  ↗', 61, 1149);
  ctx.fillStyle = '#3c4351'; ctx.beginPath(); ctx.roundRect(230, 1230, 180, 8, 4); ctx.fill();
  const texture = new THREE.CanvasTexture(surface); texture.colorSpace = THREE.SRGBColorSpace; texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  const screenGeometry = new THREE.ShapeGeometry(roundShape(1.72, 3.5, .2), 24);
  const pos = screenGeometry.attributes.position; const uv = screenGeometry.attributes.uv;
  for (let i = 0; i < pos.count; i++) uv.setXY(i, (pos.getX(i) + .86) / 1.72, (pos.getY(i) + 1.75) / 3.5);
  const screen = new THREE.Mesh(screenGeometry, new THREE.MeshBasicMaterial({ map: texture })); screen.position.z = .221; phone.add(screen);
  const notch = new THREE.Mesh(new THREE.ShapeGeometry(roundShape(.53, .125, .06)), new THREE.MeshBasicMaterial({ color: 0x151d28 })); notch.position.set(0, 1.61, .23); phone.add(notch);
  const lens = new THREE.Mesh(new THREE.CircleGeometry(.027, 20), new THREE.MeshStandardMaterial({ color: 0x31496b, metalness: .7, roughness: .2 })); lens.position.set(.17, 1.61, .234); phone.add(lens);
  for (const [x, y, h] of [[-.976, .65, .35], [-.976, .12, .35], [.976, .48, .52]]) { const button = new THREE.Mesh(new THREE.BoxGeometry(.04, h, .075), new THREE.MeshStandardMaterial({color: 0x667185, metalness: .7, roughness: .3})); button.position.set(x, y, .065); phone.add(button); }
  const ring = new THREE.Mesh(new THREE.TorusGeometry(.21, .035, 12, 60), new THREE.MeshStandardMaterial({color:0x3157dc,metalness:.4,roughness:.3})); ring.position.set(1.8,-1.2,0); ring.rotation.set(.7,.4,.2); scene.add(ring);
  const pebble = new THREE.Mesh(new THREE.IcosahedronGeometry(.15, 1), new THREE.MeshStandardMaterial({color:0x8fa3d3,metalness:.55,roughness:.2})); pebble.position.set(-1.75,1.4,0); scene.add(pebble);
  let pointerX = 0, pointerY = 0, visible = true;
  phone.rotation.set(.12,-.33,-.18);
  function resize() { const {width,height} = host.getBoundingClientRect(); renderer.setSize(width,height); camera.aspect = width / height; camera.updateProjectionMatrix(); render(); }
  function render() { renderer.render(scene,camera); }
  const observer = new ResizeObserver(resize); observer.observe(host);
  new IntersectionObserver(entries => { visible = entries[0].isIntersecting; }).observe(host);
  host.addEventListener('pointermove', e => { const r = host.getBoundingClientRect(); pointerX = (e.clientX-r.left)/r.width-.5; pointerY = (e.clientY-r.top)/r.height-.5; });
  host.addEventListener('pointerleave', () => { pointerX=0; pointerY=0; });
  function updateToggle() { toggle.textContent = paused ? 'Play motion ▷' : 'Pause motion Ⅱ'; toggle.setAttribute('aria-pressed', String(paused)); }
  toggle.hidden = false; updateToggle();
  toggle.addEventListener('click', () => { paused = !paused; updateToggle(); });
  preference.addEventListener('change', e => { paused=e.matches; updateToggle(); });
  renderer.setAnimationLoop(time => { if (!visible || document.hidden || paused) return; const t=time*.001; phone.rotation.y += (-.33+pointerX*.65-phone.rotation.y)*.035; phone.rotation.x += (.12+pointerY*.25-phone.rotation.x)*.035; phone.rotation.z=-.18+Math.sin(t*.45)*.035; phone.position.y=Math.sin(t*.8)*.065; ring.rotation.y=t*.35; pebble.rotation.y=t*.3; render(); });
  renderer.domElement.addEventListener('webglcontextlost', event => { event.preventDefault(); renderer.setAnimationLoop(null); renderer.domElement.style.display='none'; fallback.hidden=false; toggle.hidden=true; });
  resize(); fallback.hidden=true;
  document.querySelector('#scene-hint').textContent='MOVE YOUR POINTER. EXPLORE A NEW ANGLE.';
} catch (error) { console.warn('3D unavailable; showing the static phone.', error); toggle.hidden=true; }
