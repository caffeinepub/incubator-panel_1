import { useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PanelLayout from '../components/layout/PanelLayout';
import ScreenTransition from '../components/layout/ScreenTransition';
import HelpAboutPanel from '../components/help/HelpAboutPanel';
import { useLocalSettings } from '../state/useLocalSettings';
import { useKioskMode } from '../state/useKioskMode';
import { useEsp32Commands } from '../hooks/useEsp32Commands';
import type { Screen } from '../App';
import { toast } from 'sonner';

interface SettingsScreenProps {
    onNavigate: (screen: Screen) => void;
}

export default function SettingsScreen({ onNavigate }: SettingsScreenProps) {
    const { settings, updateSettings } = useLocalSettings();
    const { kioskMode, setKioskMode } = useKioskMode();
    const { setTemp, setHumidity } = useEsp32Commands();

    const [localTemp, setLocalTemp] = useState(settings.temperature);
    const [localHumidity, setLocalHumidity] = useState(settings.humidity);
    const [localTurningInterval, setLocalTurningInterval] = useState(settings.turningInterval);
    const [localBaseUrl, setLocalBaseUrl] = useState(settings.esp32BaseUrl);

    const handleSave = () => {
        // Update local settings
        updateSettings({
            temperature: localTemp,
            humidity: localHumidity,
            turningInterval: localTurningInterval,
            esp32BaseUrl: localBaseUrl,
        });

        // Send to ESP32
        setTemp.mutate(localTemp);
        setHumidity.mutate(localHumidity);

        toast.success('Settings saved successfully');
    };

    return (
        <ScreenTransition>
            <PanelLayout
                header={
                    <div className="flex items-center gap-4 w-full">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onNavigate('dashboard')}
                        >
                            <ArrowLeft className="h-6 w-6" />
                        </Button>
                        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
                    </div>
                }
            >
                <div className="container mx-auto px-4 py-8 max-w-3xl space-y-6">
                    {/* ESP32 Connection */}
                    <Card>
                        <CardHeader>
                            <CardTitle>ESP32 Connection</CardTitle>
                            <CardDescription>
                                Configure the base URL for your ESP32 controller
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="baseUrl">Base URL</Label>
                                <Input
                                    id="baseUrl"
                                    type="text"
                                    placeholder="http://192.168.4.1"
                                    value={localBaseUrl}
                                    onChange={(e) => setLocalBaseUrl(e.target.value)}
                                    className="text-lg"
                                />
                                <p className="text-sm text-muted-foreground">
                                    Example: http://192.168.4.1 or http://192.168.1.50
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Incubation Parameters */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Incubation Parameters</CardTitle>
                            <CardDescription>
                                Adjust temperature, humidity, and turning interval
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="temperature">Temperature</Label>
                                    <span className="text-2xl font-bold">
                                        {localTemp.toFixed(1)}°C
                                    </span>
                                </div>
                                <Slider
                                    id="temperature"
                                    min={30}
                                    max={42}
                                    step={0.1}
                                    value={[localTemp]}
                                    onValueChange={(value) => setLocalTemp(value[0])}
                                    className="py-4"
                                />
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="humidity">Humidity</Label>
                                    <span className="text-2xl font-bold">
                                        {localHumidity.toFixed(0)}%
                                    </span>
                                </div>
                                <Slider
                                    id="humidity"
                                    min={30}
                                    max={80}
                                    step={1}
                                    value={[localHumidity]}
                                    onValueChange={(value) => setLocalHumidity(value[0])}
                                    className="py-4"
                                />
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="turning">Egg Turning Interval</Label>
                                    <span className="text-2xl font-bold">
                                        {localTurningInterval}h
                                    </span>
                                </div>
                                <Slider
                                    id="turning"
                                    min={1}
                                    max={12}
                                    step={1}
                                    value={[localTurningInterval]}
                                    onValueChange={(value) => setLocalTurningInterval(value[0])}
                                    className="py-4"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Kiosk Mode */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Display Settings</CardTitle>
                            <CardDescription>
                                Configure kiosk mode for dedicated display
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="kiosk-mode">Kiosk Mode</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Optimize UI for permanent display and reduce accidental navigation
                                    </p>
                                </div>
                                <Switch
                                    id="kiosk-mode"
                                    checked={kioskMode}
                                    onCheckedChange={setKioskMode}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Save Button */}
                    <Button
                        size="lg"
                        onClick={handleSave}
                        disabled={setTemp.isPending || setHumidity.isPending}
                        className="w-full text-lg h-14"
                    >
                        <Save className="h-5 w-5 mr-2" />
                        Save Settings
                    </Button>

                    {/* Help Panel */}
                    <HelpAboutPanel />
                </div>
            </PanelLayout>
        </ScreenTransition>
    );
}
