import { useParams } from 'react-router-dom';
import { AppointmentManager } from '@/components/isolated/AppointmentManager';
import { useDoctorConfig } from '@/hooks/useDoctorConfig';
import { Loader2 } from 'lucide-react';

export default function DoctorAppointment() {
  const { doctorId, specialtyId } = useParams<{ 
    doctorId: string; 
    specialtyId?: string;
  }>();
  
  const { config, isLoading, error } = useDoctorConfig(doctorId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Cargando información del doctor...</p>
        </div>
      </div>
    );
  }

  if (error || !config) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="p-4 border border-destructive/20 rounded-lg bg-destructive/10">
            <h2 className="text-lg font-semibold text-destructive mb-2">
              Doctor no encontrado
            </h2>
            <p className="text-muted-foreground">
              {error || 'No se encontró información para este doctor'}
            </p>
          </div>
          <a 
            href="/" 
            className="inline-flex items-center text-primary hover:underline"
          >
            Ir al inicio
          </a>
        </div>
      </div>
    );
  }

  const customConfig = {
    availableSpecialties: config.availableSpecialties || [],
    timeSlots: config.timeSlots || [],
    businessHours: config.businessHours
  };

  return (
    <AppointmentManager
      doctorId={config.id}
      doctorName={config.name}
      doctorSpecialty={config.specialty}
      specialtyId={specialtyId || config.specialtyId}
      customConfig={customConfig}
    />
  );
}