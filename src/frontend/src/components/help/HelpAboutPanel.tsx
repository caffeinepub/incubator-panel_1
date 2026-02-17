import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';

export default function HelpAboutPanel() {
    return (
        <Card className="mt-6">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5" />
                    Kiosk Mode Setup
                </CardTitle>
                <CardDescription>
                    How to configure Android for automatic startup and kiosk operation
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
                <div>
                    <h4 className="font-semibold mb-2">Screen Pinning (Basic Kiosk)</h4>
                    <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                        <li>Open Android Settings → Security → Screen Pinning</li>
                        <li>Enable Screen Pinning</li>
                        <li>Open this app in your browser</li>
                        <li>Tap Recent Apps button, then tap the app icon and select "Pin"</li>
                        <li>The app will stay in the foreground until unpinned</li>
                    </ol>
                </div>

                <div>
                    <h4 className="font-semibold mb-2">Auto-Start on Boot</h4>
                    <p className="text-muted-foreground">
                        For automatic startup, you'll need to use a kiosk launcher app from the Play Store
                        (e.g., "Kiosk Browser", "Fully Kiosk Browser") or configure your device as a dedicated
                        kiosk device through Android Enterprise or device administrator settings.
                    </p>
                </div>

                <div>
                    <h4 className="font-semibold mb-2">Full-Screen Mode</h4>
                    <p className="text-muted-foreground">
                        Enable kiosk mode in the settings above to optimize the UI for permanent display
                        and reduce accidental navigation.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
