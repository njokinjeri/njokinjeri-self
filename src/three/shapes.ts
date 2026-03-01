import * as THREE from 'three';

export interface ShapeConfig {
    name: string;
    makeInner: () => THREE.BufferGeometry;
    makeOuter: () => THREE.BufferGeometry;
    outerScale: number;
    innerJitter: number;
    outerJitter: number;
};

export const SHAPES: ShapeConfig[] = [
    {
        name: 'Dodecahedron',
        makeInner: () => new THREE.DodecahedronGeometry(1.0, 0),
        makeOuter: () => new THREE.DodecahedronGeometry(1.0, 0),
        outerScale: 1.7,
        innerJitter: 0.06,
        outerJitter: 0.18,
    },
    {
        name: 'Sphere',
        makeInner: () => new THREE.SphereGeometry(1.0, 32, 32),
        makeOuter: () => new THREE.SphereGeometry(1.0, 24, 24),
        outerScale: 1.65,
        innerJitter: 0.04,
        outerJitter: 0.14,
    },
    {
        name: 'Cube',
        makeInner: () => new THREE.BoxGeometry(1.6, 1.6, 1.6),
        makeOuter: () => new THREE.BoxGeometry(1.0, 1.6, 1.6),
        outerScale: 1.62,
        innerJitter: 0.05,
        outerJitter: 0.15,
    }
]