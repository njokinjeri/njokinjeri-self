export interface DeviceProfile {
    tier: 'mobile' | 'tablet' | 'desktop';
    nInner: number;
    nOuter: number;
    dustCount: number;
    pixelRatio: number;
    pointSize: { inner: number; outer: number };
    morphDur: number;
}