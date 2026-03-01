import * as THREE from 'three';

export function sampleSurface(geometry: THREE.BufferGeometry, count: number): Float32Array {
  const g   = geometry.toNonIndexed();
  const pos = g.attributes.position as THREE.BufferAttribute;
  const triCount = Math.floor(pos.count / 3);
  const out = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const t = Math.floor(Math.random() * triCount) * 3;
    let r1 = Math.random(), r2 = Math.random();
    if (r1 + r2 > 1) { r1 = 1 - r1; r2 = 1 - r2; }

    out[i*3]   = pos.getX(t) + r1*(pos.getX(t+1)-pos.getX(t)) + r2*(pos.getX(t+2)-pos.getX(t));
    out[i*3+1] = pos.getY(t) + r1*(pos.getY(t+1)-pos.getY(t)) + r2*(pos.getY(t+2)-pos.getY(t));
    out[i*3+2] = pos.getZ(t) + r1*(pos.getZ(t+1)-pos.getZ(t)) + r2*(pos.getZ(t+2)-pos.getZ(t));
  }
  return out;
}

export function applyJitter(arr: Float32Array, amount: number): Float32Array {
  for (let i = 0; i < arr.length; i++) {
    arr[i] += (Math.random() - 0.5) * amount;
  }
  return arr;
}