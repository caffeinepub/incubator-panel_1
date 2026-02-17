import { useState, useEffect } from 'react';

export interface LocalSettings {
    esp32BaseUrl: string;
    temperature: number;
    humidity: number;
    turningInterval: number;
    kioskMode: boolean;
}

const DEFAULT_SETTINGS: LocalSettings = {
    esp32BaseUrl: 'http://192.168.4.1',
    temperature: 37.5,
    humidity: 60,
    turningInterval: 4,
    kioskMode: false,
};

const STORAGE_KEY = 'incubator-settings';

function loadSettings(): LocalSettings {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            return { ...DEFAULT_SETTINGS, ...parsed };
        }
    } catch (error) {
        console.error('Failed to load settings:', error);
    }
    return DEFAULT_SETTINGS;
}

function saveSettings(settings: LocalSettings): void {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
        console.error('Failed to save settings:', error);
    }
}

export function useLocalSettings() {
    const [settings, setSettings] = useState<LocalSettings>(loadSettings);

    useEffect(() => {
        saveSettings(settings);
    }, [settings]);

    const updateSettings = (partial: Partial<LocalSettings>) => {
        setSettings((prev) => ({ ...prev, ...partial }));
    };

    return {
        settings,
        updateSettings,
    };
}
