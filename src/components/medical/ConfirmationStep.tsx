import { useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CheckCircle, User, Calendar, Clock, Stethoscope, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

interface AppointmentData {
  patient: {
    type: 'new' | 'existing';
    fullName: string;
    cedula: string;
    phone: string;
    email?: string;
  };
  specialty: {
    id: string;
    name: string;
  };
  dateTime: {
    date: Date;
    time: string;
  };
}

interface ConfirmationStepProps {
  appointmentData: AppointmentData;
  onConfirm: (reason?: string) => Promise<void>;
  onBack: () => void;
  isSubmitting: boolean;
}

export function ConfirmationStep({ 
  appointmentData, 
  onConfirm, 
  onBack, 
  isSubmitting 
}: ConfirmationStepProps) {
  const [reason, setReason] = useState('');

  const handleConfirm = () => {
    onConfirm(reason.trim() || undefined);
  };

  const { patient, specialty, dateTime } = appointmentData;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Confirmar Cita
        </h2>
        <p className="text-muted-foreground">
          Revisa los datos y confirma tu cita médica
        </p>
      </div>

      {/* Appointment Summary */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="h-5 w-5 mr-2 text-primary" />
            Resumen de la Cita
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Patient Info */}
          <div className="space-y-3">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="font-medium">Información del Paciente</span>
            </div>
            <div className="ml-6 space-y-1 text-sm">
              <p><strong>Nombre:</strong> {patient.fullName}</p>
              <p><strong>Cédula:</strong> {patient.cedula}</p>
              <p><strong>Teléfono:</strong> {patient.phone}</p>
              {patient.email && <p><strong>Email:</strong> {patient.email}</p>}
              <p>
                <strong>Tipo:</strong> 
                <span className={`ml-1 px-2 py-1 rounded-full text-xs ${
                  patient.type === 'new' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {patient.type === 'new' ? 'Paciente Nuevo' : 'Paciente Existente'}
                </span>
              </p>
            </div>
          </div>

          <Separator />

          {/* Specialty Info */}
          <div className="space-y-3">
            <div className="flex items-center">
              <Stethoscope className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="font-medium">Especialidad</span>
            </div>
            <div className="ml-6">
              <p className="text-sm font-semibold text-primary">
                {specialty.name}
              </p>
            </div>
          </div>

          <Separator />

          {/* Date & Time Info */}
          <div className="space-y-3">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="font-medium">Fecha y Hora</span>
            </div>
            <div className="ml-6 space-y-1">
              <div className="flex items-center text-sm">
                <Calendar className="h-3 w-3 mr-2 text-muted-foreground" />
                <span>
                  {format(dateTime.date, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}
                </span>
              </div>
              <div className="flex items-center text-sm">
                <Clock className="h-3 w-3 mr-2 text-muted-foreground" />
                <span className="font-semibold text-primary">{dateTime.time}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Optional Reason */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="h-5 w-5 mr-2 text-primary" />
            Motivo de Consulta (Opcional)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Describe brevemente el motivo de tu consulta..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="resize-none"
            rows={3}
            maxLength={250}
            disabled={isSubmitting}
          />
          <div className="text-right text-xs text-muted-foreground mt-1">
            {reason.length}/250 caracteres
          </div>
        </CardContent>
      </Card>

      {/* Important Notes */}
      <Card className="bg-gradient-subtle border-primary/20">
        <CardContent className="p-4">
          <h4 className="font-semibold text-foreground mb-2">Información Importante:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Llegar 15 minutos antes de la cita</li>
            <li>• Traer documento de identidad</li>
            <li>• Traer estudios médicos previos (si aplica)</li>
            <li>• Se enviará confirmación por SMS</li>
          </ul>
        </CardContent>
      </Card>

      <div className="flex space-x-3">
        <Button
          onClick={onBack}
          variant="outline"
          className="flex-1"
          disabled={isSubmitting}
        >
          Anterior
        </Button>
        <Button
          onClick={handleConfirm}
          className="flex-1 bg-gradient-medical hover:bg-gradient-medical/90 shadow-medical"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <CheckCircle className="h-4 w-4 mr-2 animate-pulse" />
              Confirmando...
            </>
          ) : (
            <>
              <CheckCircle className="h-4 w-4 mr-2" />
              Confirmar Cita
            </>
          )}
        </Button>
      </div>
    </div>
  );
}