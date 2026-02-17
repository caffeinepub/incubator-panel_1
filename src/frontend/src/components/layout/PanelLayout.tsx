import { ReactNode } from 'react';
import { useKioskMode } from '../../state/useKioskMode';

interface PanelLayoutProps {
    children: ReactNode;
    header?: ReactNode;
    footer?: ReactNode;
}

export default function PanelLayout({ children, header, footer }: PanelLayoutProps) {
    const { kioskMode } = useKioskMode();

    return (
        <div className="flex flex-col min-h-screen bg-background">
            {/* Header */}
            {header && (
                <header className="border-b border-border bg-card">
                    <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                        {header}
                    </div>
                </header>
            )}

            {/* Main Content */}
            <main className={`flex-1 ${kioskMode ? 'overflow-hidden' : 'overflow-auto'}`}>
                {children}
            </main>

            {/* Footer */}
            {footer && !kioskMode && (
                <footer className="border-t border-border bg-card">
                    <div className="container mx-auto px-4 py-3">
                        {footer}
                    </div>
                </footer>
            )}
        </div>
    );
}
