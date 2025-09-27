import { useState } from 'react';
import { ArrowLeft, Search, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

interface AppointmentDetails {
  id: string;
  patient: {
    fullName: string;
    cedula: string;
    phone: string;
  };
  date: Date;
  time: string;
  specialty: string;
  status: string;
}

type CancelStep = 'search' | 'confirm' | 'success';

interface CancelAppointmentProps {
  doctorId: string;
  onBack: () => void;
  onCreateNew: () => void;
}

export function CancelAppointment({
  doctorId,
  onBack,
  onCreateNew
}: CancelAppointmentProps) {
  const [currentStep, setCurrentStep] = useState<CancelStep>('search');
  const [cedula, setCedula] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [foundAppointment, setFoundAppointment] = useState<AppointmentDetails | null>(null);
  const [isCanceling, setIsCanceling] = useState(false);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!cedula.trim()) {
      toast({
        title: "Campo requerido",
        description: "Por favor ingresa la cédula de identidad",
        variant: "destructive"
      });
      return;
    }

    setIsSearching(true);

    try {
      // Simulate API call to search for appointment
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock appointment data
      const mockAppointment: AppointmentDetails = {
        id: 'apt-001',
        patient: {
          fullName: 'Juan Carlos Pérez',
          cedula: cedula,
          phone: '+58 414-123-4567'
        },
        date: new Date(2024, 2, 15),
        time: '10:30 AM',
        specialty: 'Cardiología',
        status: 'confirmed'
      };

      setFoundAppointment(mockAppointment);
      setCurrentStep('confirm');
      
    } catch (error) {
      toast({
        title: "Error en la búsqueda",
        description: "No se pudo encontrar una cita con esa cédula",
        variant: "destructive"
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleCancelConfirm = async () => {
    if (!foundAppointment) return;

    setIsCanceling(true);

    try {
      // Simulate API call to cancel appointment
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Cita cancelada exitosamente",
        description: "La cita ha sido cancelada correctamente",
      });
      
      setCurrentStep('success');
      
    } catch (error) {
      toast({
        title: "Error al cancelar",
        description: "No se pudo cancelar la cita. Por favor intenta de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsCanceling(false);
    }
  };

  const handleSearchAnother = () => {
    setCedula('');
    setFoundAppointment(null);
    setCurrentStep('search');
  };

  const renderSearchStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Cancelar Cita Médica
        </h2>
        <p className="text-muted-foreground">
          Ingresa la cédula del paciente para buscar la cita
        </p>
      </div>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="h-5 w-5 mr-2 text-primary" />
            Buscar Cita
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">
              Cédula de Identidad *
            </label>
            <Input
              type="text"
              placeholder="Ej: 12345678"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              className="mt-1"
              disabled={isSearching}
            />
          </div>

          <Button
            onClick={handleSearch}
            disabled={isSearching || !cedula.trim()}
            className="w-full bg-primary hover:bg-primary/90"
          >
            {isSearching ? (
              <>
                <Search className="h-4 w-4 mr-2 animate-spin" />
                Buscando...
              </>
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Buscar Cita
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderConfirmStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Cita Encontrada
        </h2>
        <p className="text-muted-foreground">
          Verifica los datos y confirma la cancelación
        </p>
      </div>

      {foundAppointment && (
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Detalles de la Cita</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="font-medium">Paciente:</span>
              <span>{foundAppointment.patient.fullName}</span>
              
              <span className="font-medium">Cédula:</span>
              <span>{foundAppointment.patient.cedula}</span>
              
              <span className="font-medium">Teléfono:</span>
              <span>{foundAppointment.patient.phone}</span>
              
              <span className="font-medium">Fecha:</span>
              <span>{foundAppointment.date.toLocaleDateString()}</span>
              
              <span className="font-medium">Hora:</span>
              <span>{foundAppointment.time}</span>
              
              <span className="font-medium">Especialidad:</span>
              <span>{foundAppointment.specialty}</span>
            </div>
          </CardContent>
        </Card>
      )}

      <Alert className="border-destructive/50 bg-destructive/10">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>¿Está seguro de cancelar esta cita?</strong>
          <br />
          Esta acción no se puede deshacer.
        </AlertDescription>
      </Alert>

      <div className="space-y-3">
        <Button
          onClick={handleCancelConfirm}
          disabled={isCanceling}
          variant="destructive"
          className="w-full h-12"
        >
          {isCanceling ? (
            <>
              <AlertTriangle className="h-4 w-4 mr-2 animate-pulse" />
              Cancelando...
            </>
          ) : (
            <>
              <AlertTriangle className="h-4 w-4 mr-2" />
              Sí, Cancelar Cita
            </>
          )}
        </Button>

        <Button
          onClick={handleSearchAnother}
          variant="outline"
          className="w-full"
          disabled={isCanceling}
        >
          Buscar Otra Cita
        </Button>
      </div>
    </div>
  );

  const renderSuccessStep = () => (
    <div className="space-y-6 text-center">
      <div className="flex justify-center">
        <CheckCircle className="h-16 w-16 text-green-500" />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          ¡Cita Cancelada!
        </h2>
        <p className="text-muted-foreground">
          La cita ha sido cancelada exitosamente
        </p>
      </div>

      <Card className="shadow-soft">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground mb-4">
            Se ha enviado una confirmación por SMS al número registrado.
          </p>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <Button
          onClick={onCreateNew}
          className="w-full bg-gradient-medical hover:bg-gradient-medical/90"
        >
          Crear Nueva Cita
        </Button>

        <Button
          onClick={onBack}
          variant="outline"
          className="w-full"
        >
          Volver al Inicio
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-danger text-white py-4 px-4">
        <div className="max-w-md mx-auto flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-white hover:bg-white/20 mr-4"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-bold">Cancelar Cita</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-8">
        {currentStep === 'search' && renderSearchStep()}
        {currentStep === 'confirm' && renderConfirmStep()}
        {currentStep === 'success' && renderSuccessStep()}
      </div>
    </div>
  );
}