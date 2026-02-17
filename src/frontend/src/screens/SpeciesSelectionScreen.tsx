import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PanelLayout from '../components/layout/PanelLayout';
import ScreenTransition from '../components/layout/ScreenTransition';
import SpeciesTileButton from '../components/species/SpeciesTileButton';
import { useEsp32Commands } from '../hooks/useEsp32Commands';
import type { Screen } from '../App';

interface SpeciesSelectionScreenProps {
    onNavigate: (screen: Screen) => void;
}

const SPECIES = [
    { name: 'Chicken', icon: '/assets/generated/species-chicken.dim_256x256.png' },
    { name: 'Duck', icon: '/assets/generated/species-duck.dim_256x256.png' },
    { name: 'Quail', icon: '/assets/generated/species-quail.dim_256x256.png' },
    { name: 'Goose', icon: '/assets/generated/species-goose.dim_256x256.png' },
    { name: 'Custom', icon: '/assets/generated/species-custom.dim_256x256.png' },
];

export default function SpeciesSelectionScreen({ onNavigate }: SpeciesSelectionScreenProps) {
    const { setMode } = useEsp32Commands();

    const handleSpeciesSelect = (species: string) => {
        setMode.mutate(species, {
            onSuccess: () => {
                setTimeout(() => onNavigate('dashboard'), 1000);
            },
        });
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
                        <h1 className="text-2xl font-bold tracking-tight">
                            Select Species
                        </h1>
                    </div>
                }
            >
                <div className="container mx-auto px-4 py-12">
                    <div className="max-w-4xl mx-auto">
                        <p className="text-center text-muted-foreground mb-8 text-lg">
                            Choose the species to load preset incubation parameters
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {SPECIES.map((species) => (
                                <SpeciesTileButton
                                    key={species.name}
                                    species={species.name}
                                    icon={species.icon}
                                    onClick={() => handleSpeciesSelect(species.name)}
                                    isLoading={setMode.isPending}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </PanelLayout>
        </ScreenTransition>
    );
}
