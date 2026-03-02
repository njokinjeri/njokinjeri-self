export interface DeviceProfile {
    tier: 'mobile' | 'tablet' | 'desktop';
    nInner: number;
    nOuter: number;
    dustCount: number;
    pixelRatio: number;
    pointSize: { inner: number; outer: number };
    morphDur: number;
    groupOffset: { x: number; y: number};
    groupScale: number;
    cameraZ: number;
}

export function getDeviceProfile(): DeviceProfile {
    const w = window.innerWidth;
    const dpr = window.devicePixelRatio || 1;
    const isTouch = navigator.maxTouchPoints > 0;
    const isMobile = isTouch && w < 768;
    const isTablet = isTouch && w >= 768 && w < 1024;

    if (isMobile) return {
        tier: 'mobile',
        nInner: 2000, nOuter: 4000, dustCount: 600,
        pixelRatio: Math.min(dpr, 2),
        pointSize: { inner: 0.024, outer: 0.018},
        morphDur: 1.4,
        groupOffset: { x: 0, y: 0 }, 
        groupScale: 1.4,
        cameraZ: 7.5,
    };

    if (isTablet) return {
        tier: 'tablet',
        nInner: 3200, nOuter: 6400, dustCount: 900,
        pixelRatio: Math.min(dpr, 2),
        pointSize: { inner: 0.020, outer: 0.015},
        morphDur: 1.5,
        groupOffset: { x: 2.8, y: 0 },
        groupScale: 1.4,
        cameraZ: 4.0,

    };

    return {
        tier: 'desktop',
        nInner: 5500, nOuter: 10000, dustCount: 1600,
        pixelRatio: Math.min(dpr, 2),
        pointSize: { inner: 0.016, outer: 0.013},
        morphDur: 1.6,
        groupOffset: { x: 3.2, y: 0 },
        groupScale: 1.4,
        cameraZ: 4.5,
    };
}