import { useState, useEffect } from 'react';

const KIOSK_MODE_KEY = 'incubator-kiosk-mode';

export function useKioskMode() {
    const [kioskMode, setKioskModeState] = useState<boolean>(() => {
        try {
            const stored = localStorage.getItem(KIOSK_MODE_KEY);
            return stored === 'true';
        } catch {
            return false;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(KIOSK_MODE_KEY, String(kioskMode));
        } catch (error) {
            console.error('Failed to save kiosk mode:', error);
        }
    }, [kioskMode]);

    const setKioskMode = (enabled: boolean) => {
        setKioskModeState(enabled);
    };

    return {
        kioskMode,
        setKioskMode,
    };
}
