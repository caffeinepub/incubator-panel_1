import { useQuery } from '@tanstack/react-query';
import { ESP32Client, type ESP32Status, type ESP32ClientError } from '../lib/esp32Client';
import { useLocalSettings } from '../state/useLocalSettings';

export function useIncubatorStatus() {
    const { settings } = useLocalSettings();
    const client = new ESP32Client(settings.esp32BaseUrl);

    return useQuery<ESP32Status, ESP32ClientError>({
        queryKey: ['incubator-status', settings.esp32BaseUrl],
        queryFn: () => client.getStatus(),
        refetchInterval: 3000,
        retry: 2,
        retryDelay: 1000,
        enabled: !!settings.esp32BaseUrl,
    });
}
