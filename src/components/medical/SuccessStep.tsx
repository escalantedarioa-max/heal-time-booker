import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CheckCircle, Calendar, Clock, Phone, Mail, Plus, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface AppointmentData {
  patient: {
    fullName: string;
    cedula: string;
    phone: string;
    email?: string;
  };
  specialty: {
    name: string;
  };
  dateTime: {
    date: Date;
    time: string;
  };
  reason?: string;
}

interface SuccessStepProps {
  appointmentData: AppointmentData;
  onCreateNew: () => void;
  onGoHome: () => void;
}

export function SuccessStep({ 
  appointmentData, 
  onCreateNew, 
  onGoHome 
}: SuccessStepProps) {
  const { patient, specialty, dateTime, reason } = appointmentData;
  
  // Generate a mock appointment ID
  const appointmentId = `APT-${Date.now().toString().slice(-6)}`;

  return (
    <div className="space-y-6 text-center">
      {/* Success Icon and Message */}
      <div className="space-y-4">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-gradient-success rounded-full flex items-center justify-center shadow-success">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>
        </div>
        
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">
            ¡Cita Confirmada!
          </h2>
          <p className="text-lg text-muted-foreground">
            Tu cita médica ha sido creada exitosamente
          </p>
        </div>
      </div>

      {/* Appointment Details Card */}
      <Card className="shadow-success border-green-200 bg-gradient-to-br from-green-50 to-white text-left">
        <CardContent className="p-6 space-y-4">
          <div className="text-center border-b pb-4">
            <h3 className="text-lg font-bold text-foreground">
              ID de Cita: {appointmentId}
            </h3>
            <p className="text-sm text-muted-foreground">
              Guarda este número para futuras referencias
            </p>
          </div>

          <div className="space-y-3">
            {/* Patient Info */}
            <div>
              <h4 className="font-semibold text-foreground flex items-center mb-2">
                <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                Paciente
              </h4>
              <div className="ml-6 text-sm text-muted-foreground space-y-1">
                <p><strong>Nombre:</strong> {patient.fullName}</p>
                <p><strong>Cédula:</strong> {patient.cedula}</p>
              </div>
            </div>

            {/* Appointment Info */}
            <div>
              <h4 className="font-semibold text-foreground flex items-center mb-2">
                <Calendar className="h-4 w-4 mr-2 text-green-600" />
                Detalles de la Cita
              </h4>
              <div className="ml-6 text-sm text-muted-foreground space-y-1">
                <p><strong>Especialidad:</strong> {specialty.name}</p>
                <p className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  <strong>Fecha:</strong> {format(dateTime.date, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}
                </p>
                <p className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  <strong>Hora:</strong> {dateTime.time}
                </p>
                {reason && (
                  <p><strong>Motivo:</strong> {reason}</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Confirmation */}
      <Card className="shadow-soft">
        <CardContent className="p-4">
          <h4 className="font-semibold text-foreground mb-3 flex items-center justify-center">
            <Phone className="h-4 w-4 mr-2 text-primary" />
            Confirmación de Contacto
          </h4>
          <div className="text-sm text-muted-foreground space-y-2">
            <p className="flex items-center justify-center">
              <Phone className="h-3 w-3 mr-2" />
              SMS enviado a: {patient.phone}
            </p>
            {patient.email && (
              <p className="flex items-center justify-center">
                <Mail className="h-3 w-3 mr-2" />
                Email enviado a: {patient.email}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Important Reminders */}
      <Card className="bg-gradient-subtle">
        <CardContent className="p-4">
          <h4 className="font-semibold text-foreground mb-3">Recordatorios Importantes:</h4>
          <ul className="text-sm text-muted-foreground text-left space-y-1">
            <li className="flex items-start">
              <CheckCircle className="h-3 w-3 mr-2 mt-1 text-green-600 flex-shrink-0" />
              Llegar 15 minutos antes de la cita
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-3 w-3 mr-2 mt-1 text-green-600 flex-shrink-0" />
              Traer documento de identidad original
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-3 w-3 mr-2 mt-1 text-green-600 flex-shrink-0" />
              Traer estudios médicos previos (si los tiene)
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-3 w-3 mr-2 mt-1 text-green-600 flex-shrink-0" />
              Recibirás recordatorio 24h antes por SMS
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-3 pt-4">
        <Button
          onClick={onCreateNew}
          className="w-full h-12 bg-gradient-medical hover:bg-gradient-medical/90 shadow-medical text-lg font-semibold"
        >
          <Plus className="h-5 w-5 mr-2" />
          Crear Nueva Cita
        </Button>

        <Button
          onClick={onGoHome}
          variant="outline"
          className="w-full h-12 text-base"
        >
          <Home className="h-4 w-4 mr-2" />
          Volver al Inicio
        </Button>
      </div>

      {/* Footer Note */}
      <div className="text-xs text-muted-foreground pt-4 border-t">
        <p>¿Necesitas ayuda o quieres cancelar tu cita?</p>
        <p className="font-medium">Contacta al centro médico</p>
      </div>
    </div>
  );
}