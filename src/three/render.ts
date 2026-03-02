import * as THREE from 'three';
import { getDeviceProfile }         from './utils/device.ts';
import { createMouseTracker }       from './utils/mouse.ts';
import { SHAPES }                   from './shapes.ts';
import { initScene }                from './scene.ts';
import { makeParticleCloud }        from './particles.ts';
import { bakeTargets, createMorph } from './morph.ts';
import { createDust }               from './dust.ts';

const profile = getDeviceProfile();
const { renderer, scene, camera } = initScene(profile);

function isDark(): boolean {
	return document.documentElement.getAttribute('data-theme') === 'dark';
}

const COLORS = {
	dark:  { inner: 0xd0f0fd, outer: 0x7ab8cc, dust: 0x304050 },
  	light: { inner: 0x0a7a9e, outer: 0x0a3e4b, dust: 0x2a5a6e },
};

function getColors() {
	return isDark() ? COLORS.dark : COLORS.light;
}

const targets = bakeTargets(SHAPES, profile.nInner, profile.nOuter);
const colors  = getColors();

const { points: innerPts, attr: innerAttr } = makeParticleCloud(
	targets[0].inner.slice(),
  	{ color: colors.inner, size: profile.pointSize.inner, opacity: 0.9 }
);

const { points: outerPts, attr: outerAttr } = makeParticleCloud(
	targets[0].outer.slice(),
  	{ color: colors.outer, size: profile.pointSize.outer, opacity: 0.55 }
);

const group = new THREE.Group();
group.add(innerPts, outerPts);
group.position.set(profile.groupOffset.x, profile.groupOffset.y, 0);
group.scale.setScalar(profile.groupScale);  
scene.add(group);

const dust  = createDust(scene, profile.dustCount);
const morph = createMorph(innerAttr, outerAttr, targets);
const mouse = createMouseTracker(0.04);

const observer = new MutationObserver(() => {
	const c = getColors();
  	(innerPts.material as THREE.PointsMaterial).color.set(c.inner);
  	(outerPts.material as THREE.PointsMaterial).color.set(c.outer);
  	(dust.material     as THREE.PointsMaterial).color.set(c.dust);
});

observer.observe(document.documentElement, {
	attributes: true,
  	attributeFilter: ['data-theme'],
});

let currentIdx = 0;
const AUTO_INT = 5500;
let lastAuto   = performance.now();

function advance(): void {
	currentIdx = (currentIdx + 1) % SHAPES.length;
  	morph.goTo(currentIdx);
  	lastAuto = performance.now();
}

let rotX  = 0;
let rotY  = 0;
let lastT = performance.now();

const BASE_SCALE = profile.groupScale;

function loop(): void {
	requestAnimationFrame(loop);

  	const now = performance.now();
  	const dt  = Math.min((now - lastT) / 1000, 0.05);
  	lastT = now;

  	if (now - lastAuto > AUTO_INT && !morph.getState().active) advance();

  	morph.update(dt);
  	mouse.update();

  	const m = mouse.get();

  	camera.position.x =  m.x * 0.5;
  	camera.position.y = -m.y * 0.35;
  	camera.lookAt(profile.groupOffset.x, profile.groupOffset.y, 0);

  	rotX += 0.0016;
  	rotY += 0.0028;
  	group.rotation.x = rotX + m.y * 0.08;
  	group.rotation.y = rotY + m.x * 0.14;

 	group.scale.setScalar(BASE_SCALE * (1 + Math.sin(now / 1000 * 0.5) * 0.016));

  	dust.rotation.y += 0.0004;

  	renderer.render(scene, camera);
}

loop();