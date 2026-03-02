interface MouseState {
    x: number; y: number;
    tx: number; ty: number;
}

export function createMouseTracker(smoothing = 0.04) {
    const state: MouseState = { x: 0, y: 0, tx: 0, ty: 0 };

    window.addEventListener('mousemove', (e: MouseEvent) => {
        state.tx = (e.clientX / window.innerWidth - 0.5) * 2;
        state.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    window.addEventListener('touchmove', (e: TouchEvent) => {
        const t = e.touches[0];
        state.tx = (t.clientX / window.innerWidth - 0.5) * 2;
        state.ty = (t.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    function update(): void {
        state.x += (state.tx - state.x) * smoothing;
        state.y += (state.ty - state.y) * smoothing;
    }

    return {  update, get: () => state };
}