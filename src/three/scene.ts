import * as THREE from 'three';
import type {DeviceProfile} from './utils/device';

interface SceneResult {
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
}

export function initScene(profile: DeviceProfile): SceneResult {
    const canvas = document.getElementById('scene') as HTMLCanvasElement;

    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,          
    });
    renderer.setPixelRatio(profile.pixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);  

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        52,
        window.innerWidth / window.innerHeight,
        0.1,
        200
    );
    camera.position.z = 7.5;

    window.addEventListener('resize', () => {
        const W = window.innerWidth;
        const H = window.innerHeight;
        camera.aspect = W / H;
        camera.updateProjectionMatrix();
        renderer.setSize(W, H);
    });
    
    return { renderer, scene, camera };
}