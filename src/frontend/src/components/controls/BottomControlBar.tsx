import { Button } from '@/components/ui/button';
import { RotateCw, Egg, Settings, BellOff, Loader2 } from 'lucide-react';
import type { Screen } from '../../App';

interface BottomControlBarProps {
    onNavigate: (screen: Screen) => void;
    onManualTurn: () => void;
    onAlarmMute: () => void;
    isManualTurnLoading?: boolean;
}

export default function BottomControlBar({
    onNavigate,
    onManualTurn,
    onAlarmMute,
    isManualTurnLoading = false,
}: BottomControlBarProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-card border-t border-border">
            <Button
                size="lg"
                variant="default"
                onClick={onManualTurn}
                disabled={isManualTurnLoading}
                className="h-20 text-lg font-semibold flex flex-col gap-2"
            >
                {isManualTurnLoading ? (
                    <Loader2 className="h-8 w-8 animate-spin" />
                ) : (
                    <RotateCw className="h-8 w-8" />
                )}
                <span>Manual Turn</span>
            </Button>

            <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigate('species')}
                className="h-20 text-lg font-semibold flex flex-col gap-2"
            >
                <Egg className="h-8 w-8" />
                <span>Species</span>
            </Button>

            <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigate('settings')}
                className="h-20 text-lg font-semibold flex flex-col gap-2"
            >
                <Settings className="h-8 w-8" />
                <span>Settings</span>
            </Button>

            <Button
                size="lg"
                variant="outline"
                onClick={onAlarmMute}
                className="h-20 text-lg font-semibold flex flex-col gap-2"
            >
                <BellOff className="h-8 w-8" />
                <span>Mute Alarm</span>
            </Button>
        </div>
    );
}
