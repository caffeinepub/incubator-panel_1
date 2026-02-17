import { ReactNode } from 'react';

interface ScreenTransitionProps {
    children: ReactNode;
}

export default function ScreenTransition({ children }: ScreenTransitionProps) {
    return (
        <div className="transition-smooth animate-in fade-in duration-300">
            {children}
        </div>
    );
}
