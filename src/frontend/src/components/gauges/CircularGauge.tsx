import { useEffect, useRef, useState } from 'react';

interface CircularGaugeProps {
    value: number;
    min: number;
    max: number;
    unit: string;
    label: string;
    status?: 'normal' | 'warning' | 'alarm';
    size?: number;
}

export default function CircularGauge({
    value,
    min,
    max,
    unit,
    label,
    status = 'normal',
    size = 200,
}: CircularGaugeProps) {
    const [displayValue, setDisplayValue] = useState(value);
    const prevValueRef = useRef(value);

    useEffect(() => {
        const start = prevValueRef.current;
        const end = value;
        const duration = 800;
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = start + (end - start) * eased;

            setDisplayValue(current);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                prevValueRef.current = end;
            }
        };

        animate();
    }, [value]);

    const percentage = ((value - min) / (max - min)) * 100;
    const circumference = 2 * Math.PI * (size / 2 - 20);
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    const statusColors = {
        normal: 'oklch(0.65 0.18 140)',
        warning: 'oklch(0.70 0.20 45)',
        alarm: 'oklch(0.65 0.22 25)',
    };

    return (
        <div className="flex flex-col items-center gap-2">
            <div className="relative" style={{ width: size, height: size }}>
                <svg
                    width={size}
                    height={size}
                    className="transform -rotate-90"
                >
                    {/* Background circle */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={size / 2 - 20}
                        fill="none"
                        stroke="oklch(0.25 0 0)"
                        strokeWidth="16"
                    />
                    {/* Progress circle */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={size / 2 - 20}
                        fill="none"
                        stroke={statusColors[status]}
                        strokeWidth="16"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-all duration-700 ease-out"
                        style={{
                            filter: status === 'alarm' ? 'drop-shadow(0 0 8px currentColor)' : 'none',
                        }}
                    />
                    {status === 'alarm' && (
                        <circle
                            cx={size / 2}
                            cy={size / 2}
                            r={size / 2 - 20}
                            fill="none"
                            stroke={statusColors[status]}
                            strokeWidth="16"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            className="pulse-ring"
                            opacity="0.3"
                        />
                    )}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-5xl font-bold tracking-tight">
                        {displayValue.toFixed(1)}
                    </div>
                    <div className="text-2xl text-muted-foreground font-medium">
                        {unit}
                    </div>
                </div>
            </div>
            <div className="text-lg font-medium text-muted-foreground uppercase tracking-wide">
                {label}
            </div>
        </div>
    );
}
