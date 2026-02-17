import { Button } from '@/components/ui/button';

interface SpeciesTileButtonProps {
    species: string;
    icon: string;
    onClick: () => void;
    isLoading?: boolean;
}

export default function SpeciesTileButton({
    species,
    icon,
    onClick,
    isLoading = false,
}: SpeciesTileButtonProps) {
    return (
        <Button
            variant="outline"
            onClick={onClick}
            disabled={isLoading}
            className="h-40 flex flex-col gap-4 hover:bg-accent hover:border-primary transition-all"
        >
            <img
                src={icon}
                alt={species}
                className="w-24 h-24 object-contain"
            />
            <span className="text-xl font-semibold">{species}</span>
        </Button>
    );
}
