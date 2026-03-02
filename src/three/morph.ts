import * as THREE from 'three';
import type { ShapeConfig }    from './shapes.ts';
import { sampleSurface, applyJitter } from './sampler.ts';
import { easeInOut }      from './utils/math.ts';

export interface MorphTarget {
    inner: Float32Array;
    outer: Float32Array;
}

export function bakeTargets(shapes: ShapeConfig[], nInner: number, nOuter: number): MorphTarget[] {
  return shapes.map(s => {
    const inner = applyJitter(sampleSurface(s.makeInner(), nInner), s.innerJitter);
    const raw   = sampleSurface(s.makeOuter(), nOuter);
    const outer = new Float32Array(raw.length);
    for (let i = 0; i < raw.length; i++) outer[i] = raw[i] * s.outerScale;
    applyJitter(outer, s.outerJitter);
    return { inner, outer };
  });
}

export function createMorph(
    innerAttr: THREE.BufferAttribute,
    outerAttr: THREE.BufferAttribute,
    targets:   MorphTarget[]
) {
    const state = {
        active:    false,
        t:         1,
        current:   0,
        toIndex:   0,
        fromInner: null as Float32Array | null,
        fromOuter: null as Float32Array | null,
  };
  
  function goTo(index: number): void {
    if (state.active || index === state.current) return;
    state.fromInner = (innerAttr.array as Float32Array).slice();
    state.fromOuter = (outerAttr.array as Float32Array).slice();
    state.toIndex   = index;
    state.t         = 0;
    state.active    = true;
  }

  function update(dt: number): boolean {
    if (!state.active) return false;
    state.t += dt / 1.6;
    if (state.t >= 1) { state.t = 1; state.active = false; state.current = state.toIndex; }

    const e   = easeInOut(Math.min(state.t, 1));
    const tgt = targets[state.toIndex];

    for (let i = 0; i < innerAttr.array.length; i++) {
      (innerAttr.array as Float32Array)[i] = state.fromInner![i] + (tgt.inner[i] - state.fromInner![i]) * e;
    }
    for (let i = 0; i < outerAttr.array.length; i++) {
      (outerAttr.array as Float32Array)[i] = state.fromOuter![i] + (tgt.outer[i] - state.fromOuter![i]) * e;
    }
    innerAttr.needsUpdate = true;
    outerAttr.needsUpdate = true;

    return !state.active;
  }

  return { goTo, update, getState: () => state };
}