import { AlertCircle, Wifi, WifiOff } from 'lucide-react';
import PanelLayout from '../components/layout/PanelLayout';
import ScreenTransition from '../components/layout/ScreenTransition';
import CircularGauge from '../components/gauges/CircularGauge';
import BottomControlBar from '../components/controls/BottomControlBar';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useIncubatorStatus } from '../hooks/useIncubatorStatus';
import { useEsp32Commands } from '../hooks/useEsp32Commands';
import type { Screen } from '../App';
import { toast } from 'sonner';

interface DashboardScreenProps {
    onNavigate: (screen: Screen) => void;
}

export default function DashboardScreen({ onNavigate }: DashboardScreenProps) {
    const { data: status, isError, error, isLoading } = useIncubatorStatus();
    const { manualTurn } = useEsp32Commands();

    const handleManualTurn = () => {
        manualTurn.mutate();
    };

    const handleAlarmMute = () => {
        toast.info('Alarm muted');
    };

    const getStatusVariant = (statusText: string): 'normal' | 'warning' | 'alarm' => {
        const lower = statusText.toLowerCase();
        if (lower.includes('alarm')) return 'alarm';
        if (lower.includes('cooling') || lower.includes('heating')) return 'warning';
        return 'normal';
    };

    const getStatusColor = (statusText: string) => {
        const lower = statusText.toLowerCase();
        if (lower.includes('alarm')) return 'destructive';
        if (lower.includes('stable')) return 'default';
        return 'secondary';
    };

    return (
        <ScreenTransition>
            <PanelLayout
                header={
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-4">
                            <img
                                src="/assets/generated/incubator-logo.dim_512x512.png"
                                alt="Incubator"
                                className="h-12 w-12"
                            />
                            <div>
                                <h1 className="text-2xl font-bold tracking-tight">
                                    Incubator Control Panel
                                </h1>
                                <p className="text-sm text-muted-foreground">
                                    {status?.mode || 'No mode selected'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {isError ? (
                                <WifiOff className="h-6 w-6 text-destructive" />
                            ) : (
                                <Wifi className="h-6 w-6 text-success" />
                            )}
                        </div>
                    </div>
                }
                footer={
                    <div className="text-center text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Built with ❤️ using{' '}
                        <a
                            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-foreground transition-colors"
                        >
                            caffeine.ai
                        </a>
                    </div>
                }
            >
                <div className="container mx-auto px-4 py-8 space-y-8">
                    {/* Error/Offline Banner */}
                    {isError && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Connection Error</AlertTitle>
                            <AlertDescription>
                                {error?.message || 'Unable to connect to ESP32 controller'}
                            </AlertDescription>
                        </Alert>
                    )}

                    {/* Gauges */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="flex justify-center">
                            <CircularGauge
                                value={status?.temp ?? 0}
                                min={0}
                                max={50}
                                unit="°C"
                                label="Temperature"
                                status={getStatusVariant(status?.status ?? '')}
                                size={240}
                            />
                        </div>
                        <div className="flex justify-center">
                            <CircularGauge
                                value={status?.humidity ?? 0}
                                min={0}
                                max={100}
                                unit="%"
                                label="Humidity"
                                status={getStatusVariant(status?.status ?? '')}
                                size={240}
                            />
                        </div>
                    </div>

                    {/* Status Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
                        <div className="bg-card border border-border rounded-lg p-6 text-center">
                            <div className="text-4xl font-bold text-primary">
                                {status?.day ?? 0}
                            </div>
                            <div className="text-sm text-muted-foreground mt-2">
                                Day of 21
                            </div>
                        </div>

                        <div className="bg-card border border-border rounded-lg p-6 text-center">
                            <div className="text-4xl font-bold text-accent">
                                {status?.days_left ?? 0}
                            </div>
                            <div className="text-sm text-muted-foreground mt-2">
                                Days Remaining
                            </div>
                        </div>

                        <div className="bg-card border border-border rounded-lg p-6 text-center">
                            <Badge
                                variant={getStatusColor(status?.status ?? '')}
                                className="text-lg px-4 py-2"
                            >
                                {status?.status ?? 'Unknown'}
                            </Badge>
                            <div className="text-sm text-muted-foreground mt-2">
                                System Status
                            </div>
                        </div>

                        <div className="bg-card border border-border rounded-lg p-6 text-center">
                            <div className="text-4xl font-bold font-mono">
                                {status?.turn_time ?? '--:--'}
                            </div>
                            <div className="text-sm text-muted-foreground mt-2">
                                Next Turn In
                            </div>
                        </div>
                    </div>

                    {/* Loading State */}
                    {isLoading && !status && (
                        <div className="text-center text-muted-foreground py-12">
                            <div className="animate-pulse">Loading incubator data...</div>
                        </div>
                    )}
                </div>

                {/* Bottom Controls */}
                <BottomControlBar
                    onNavigate={onNavigate}
                    onManualTurn={handleManualTurn}
                    onAlarmMute={handleAlarmMute}
                    isManualTurnLoading={manualTurn.isPending}
                />
            </PanelLayout>
        </ScreenTransition>
    );
}
