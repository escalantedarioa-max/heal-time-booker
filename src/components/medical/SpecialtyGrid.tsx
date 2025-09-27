import { Heart, Brain, Eye, Bone, Baby, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Specialty {
  id: string;
  name: string;
  icon: string;
}

interface SpecialtyGridProps {
  onSelect: (specialty: { id: string; name: string }) => void;
  onBack: () => void;
  availableSpecialties?: Specialty[];
}

const defaultSpecialties: Specialty[] = [
  { id: 'cardiology', name: 'Cardiología', icon: 'Heart' },
  { id: 'neurology', name: 'Neurología', icon: 'Brain' },
  { id: 'ophthalmology', name: 'Oftalmología', icon: 'Eye' },
  { id: 'orthopedics', name: 'Traumatología', icon: 'Bone' },
  { id: 'pediatrics', name: 'Pediatría', icon: 'Baby' },
  { id: 'general', name: 'Medicina General', icon: 'Stethoscope' }
];

const getIcon = (iconName: string) => {
  const icons = {
    Heart,
    Brain,
    Eye,
    Bone,
    Baby,
    Stethoscope
  };
  
  const IconComponent = icons[iconName as keyof typeof icons];
  return IconComponent || Stethoscope;
};

export function SpecialtyGrid({ 
  onSelect, 
  onBack, 
  availableSpecialties = defaultSpecialties 
}: SpecialtyGridProps) {
  const handleSpecialtySelect = (specialty: Specialty) => {
    onSelect({
      id: specialty.id,
      name: specialty.name
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Seleccionar Especialidad
        </h2>
        <p className="text-muted-foreground">
          Elige la especialidad médica para tu consulta
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {availableSpecialties.map((specialty) => {
          const Icon = getIcon(specialty.icon);
          
          return (
            <Card
              key={specialty.id}
              className="cursor-pointer transition-all duration-300 hover:shadow-medical hover:scale-105 shadow-soft"
              onClick={() => handleSpecialtySelect(specialty)}
            >
              <CardContent className="p-6 text-center">
                <div className="flex flex-col items-center space-y-3">
                  <div className="p-3 bg-gradient-medical rounded-full text-white shadow-medical">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-sm text-foreground leading-tight">
                    {specialty.name}
                  </h3>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex space-x-3">
        <Button
          onClick={onBack}
          variant="outline"
          className="flex-1"
        >
          Anterior
        </Button>
      </div>
    </div>
  );
}