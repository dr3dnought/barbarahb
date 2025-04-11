'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocalStorage } from '~/shared/lib/hooks';

interface DeviceOrientationEventiOS extends DeviceOrientationEvent {
    requestPermission?: () => Promise<'granted' | 'denied'>;
}

export const useRotationPermission = () => {
    const requestPermission = (DeviceOrientationEvent as unknown as DeviceOrientationEventiOS).requestPermission;

    const [granted, setGranted] = useLocalStorage<boolean>(
        'permission-granted',
        typeof requestPermission !== 'function',
    );

    const request = useCallback(async () => {
        if (!requestPermission) return;

        const response = await requestPermission();
        setGranted(response === 'granted');
    }, [requestPermission, setGranted]);

    return useMemo(() => [granted, request] as const, [granted, request]);
};

export const useRotationTransform = () => {
    const [rotationX, setRotationX] = useState(0);
    const [rotationY, setRotationY] = useState(0);

    useEffect(() => {
        const onDeviceOrientationListener = (event: DeviceOrientationEvent) => {
            const tilt = 25;
            const degree = 20;

            const beta = event.beta ?? 45;
            const gamma = event.gamma ?? 45;

            const factorBeta = Math.min(Math.max(beta - 45, -tilt), tilt) / tilt;
            const factorGamma = Math.min(Math.max(gamma, -tilt), tilt) / tilt;

            setRotationX(-1 * degree * factorBeta);
            setRotationY(degree * factorGamma);
        };

        const onMouseMoveListener = (event: MouseEvent) => {
            const degree = 20;

            const factorX = (event.x - window.innerWidth / 2) / (window.innerWidth / 2);
            const factorY = (event.y - window.innerHeight / 2) / (window.innerHeight / 2);

            setRotationX(-1 * degree * factorY);
            setRotationY(degree * factorX);
        };

        window.addEventListener('deviceorientation', onDeviceOrientationListener);
        window.addEventListener('mousemove', onMouseMoveListener);

        return () => {
            window.removeEventListener('deviceorientation', onDeviceOrientationListener);
            window.removeEventListener('mousemove', onMouseMoveListener);
        };
    }, []);

    return `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
};
