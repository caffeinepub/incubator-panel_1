import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ESP32Client, type ESP32ClientError } from '../lib/esp32Client';
import { useLocalSettings } from '../state/useLocalSettings';
import { toast } from 'sonner';

export function useEsp32Commands() {
    const { settings } = useLocalSettings();
    const client = new ESP32Client(settings.esp32BaseUrl);
    const queryClient = useQueryClient();

    const manualTurn = useMutation<void, ESP32ClientError>({
        mutationFn: () => client.manualTurn(),
        onSuccess: () => {
            toast.success('Manual egg turn triggered');
            queryClient.invalidateQueries({ queryKey: ['incubator-status'] });
        },
        onError: (error) => {
            toast.error(`Manual turn failed: ${error.message}`);
        },
    });

    const setTemp = useMutation<void, ESP32ClientError, number>({
        mutationFn: (value) => client.setTemp(value),
        onSuccess: () => {
            toast.success('Temperature updated');
            queryClient.invalidateQueries({ queryKey: ['incubator-status'] });
        },
        onError: (error) => {
            toast.error(`Failed to set temperature: ${error.message}`);
        },
    });

    const setHumidity = useMutation<void, ESP32ClientError, number>({
        mutationFn: (value) => client.setHumidity(value),
        onSuccess: () => {
            toast.success('Humidity updated');
            queryClient.invalidateQueries({ queryKey: ['incubator-status'] });
        },
        onError: (error) => {
            toast.error(`Failed to set humidity: ${error.message}`);
        },
    });

    const setMode = useMutation<void, ESP32ClientError, string>({
        mutationFn: (value) => client.setMode(value),
        onSuccess: () => {
            toast.success('Species mode updated');
            queryClient.invalidateQueries({ queryKey: ['incubator-status'] });
        },
        onError: (error) => {
            toast.error(`Failed to set mode: ${error.message}`);
        },
    });

    return {
        manualTurn,
        setTemp,
        setHumidity,
        setMode,
    };
}
