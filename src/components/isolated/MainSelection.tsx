import { CalendarPlus, CalendarX, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface MainSelectionProps {
  onSelectCreate: () => void;
  onSelectCancel: () => void;
  doctorName: string;
  doctorSpecialty: string;
}

export function MainSelection({
  onSelectCreate,
  onSelectCancel,
  doctorName,
  doctorSpecialty
}: MainSelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header with gradient */}
      <div className="bg-gradient-medical text-white py-8 px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <Stethoscope className="h-8 w-8 mr-3" />
            <div>
              <h1 className="text-2xl font-bold">{doctorName}</h1>
              <p className="text-white/90 text-lg">{doctorSpecialty}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Selection */}
      <div className="max-w-md mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Sistema de Citas Médicas
            </h2>
            <p className="text-muted-foreground">
              Selecciona una opción para continuar
            </p>
          </div>

          {/* Create Appointment Button */}
          <Card className="p-6 shadow-soft hover:shadow-medical transition-all duration-300">
            <Button
              onClick={onSelectCreate}
              variant="default"
              size="lg"
              className="w-full h-20 bg-gradient-medical hover:bg-gradient-medical/90 
                       border-0 shadow-medical text-lg font-semibold
                       transition-all duration-300 hover:scale-[1.02]"
            >
              <CalendarPlus className="h-8 w-8 mr-4" />
              <div className="text-left">
                <div className="font-bold">Crear una Cita</div>
                <div className="text-sm text-white/90 font-normal">
                  Agenda una nueva consulta médica
                </div>
              </div>
            </Button>
          </Card>

          {/* Cancel Appointment Button */}
          <Card className="p-6 shadow-soft hover:shadow-danger transition-all duration-300">
            <Button
              onClick={onSelectCancel}
              variant="destructive"
              size="lg"
              className="w-full h-20 bg-gradient-danger hover:bg-gradient-danger/90 
                       border-0 shadow-danger text-lg font-semibold
                       transition-all duration-300 hover:scale-[1.02]"
            >
              <CalendarX className="h-8 w-8 mr-4" />
              <div className="text-left">
                <div className="font-bold">Cancelar una Cita</div>
                <div className="text-sm text-white/90 font-normal">
                  Cancela una cita existente
                </div>
              </div>
            </Button>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-muted-foreground">
          <p>¿Necesitas ayuda? Contacta al centro médico</p>
        </div>
      </div>
    </div>
  );
}