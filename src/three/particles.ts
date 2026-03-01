import * as THREE from 'three';

interface CloudOptions {
    color: number;
    size: number;
    opacity: number;
}

interface CloudResult {
    points: THREE.Points;
    attr: THREE.BufferAttribute;
}

export function makeParticleCloud(positions: Float32Array, opts: CloudOptions): CloudResult {
    const geo = new THREE.BufferGeometry();
    const attr = new THREE.BufferAttribute(positions, 3);
    geo.setAttribute('position', attr);

    const mat = new THREE.PointsMaterial({
        color: opts.color,
        size: opts.size,
        sizeAttenuation: true,
        transparent: true,
        opacity: opts.opacity,
        depthWrite: false,
    });

    return { points: new THREE.Points(geo, mat), attr };
}
