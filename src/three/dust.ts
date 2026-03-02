import * as THREE from 'three';

export function createDust(scene: THREE.Scene, count: number): THREE.Points {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
        const r = 5 + Math.random() * 8;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        arr[i*3]   = r * Math.sin(phi) * Math.cos(theta);
        arr[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
        arr[i*3+2] = r * Math.cos(phi);
    }
    const geo  = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(arr, 3));

    const mesh = new THREE.Points(geo, new THREE.PointsMaterial({
        color: 0x505060, 
        size: 0.022, 
        sizeAttenuation: true,
        transparent: true, 
        opacity: 0.2, 
        depthWrite: false,
    }));
    scene.add(mesh);
    return mesh;
}