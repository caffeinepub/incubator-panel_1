import { useState } from 'react';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import DashboardScreen from './screens/DashboardScreen';
import SpeciesSelectionScreen from './screens/SpeciesSelectionScreen';
import SettingsScreen from './screens/SettingsScreen';

export type Screen = 'dashboard' | 'species' | 'settings';

function App() {
    const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');

    return (
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <div className="min-h-screen bg-background text-foreground">
                {currentScreen === 'dashboard' && (
                    <DashboardScreen onNavigate={setCurrentScreen} />
                )}
                {currentScreen === 'species' && (
                    <SpeciesSelectionScreen onNavigate={setCurrentScreen} />
                )}
                {currentScreen === 'settings' && (
                    <SettingsScreen onNavigate={setCurrentScreen} />
                )}
            </div>
            <Toaster />
        </ThemeProvider>
    );
}

export default App;
