import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StepIndicator } from '../medical/StepIndicator';
import { PatientForm } from '../medical/PatientForm';
import { SpecialtyGrid } from '../medical/SpecialtyGrid';
import { DateTimeSelector } from '../medical/DateTimeSelector';
import { ConfirmationStep } from '../medical/ConfirmationStep';
import { SuccessStep } from '../medical/SuccessStep';
import { useToast } from '@/hooks/use-toast';

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
  reason?: string;
}

interface IsolatedAppointmentFormProps {
  doctorId: string;
  specialtyId?: string;
  onSuccess: () => void;
  onError: (error: string) => void;
  onBack: () => void;
  customConfig?: {
    availableSpecialties?: Array<{
      id: string;
      name: string;
      icon: string;
    }>;
    timeSlots?: string[];
  };
}

export function IsolatedAppointmentForm({
  doctorId,
  specialtyId,
  onSuccess,
  onError,
  onBack,
  customConfig
}: IsolatedAppointmentFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [appointmentData, setAppointmentData] = useState<Partial<AppointmentData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const totalSteps = 5;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const handlePatientData = (patientData: AppointmentData['patient']) => {
    setAppointmentData(prev => ({ ...prev, patient: patientData }));
    handleNext();
  };

  const handleSpecialtySelect = (specialty: AppointmentData['specialty']) => {
    setAppointmentData(prev => ({ ...prev, specialty }));
    handleNext();
  };

  const handleDateTimeSelect = (dateTime: AppointmentData['dateTime']) => {
    setAppointmentData(prev => ({ ...prev, dateTime }));
    handleNext();
  };

  const handleConfirm = async (reason?: string) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const finalData = {
        ...appointmentData,
        reason,
        doctorId,
        id: `apt-${Date.now()}`,
        status: 'confirmed',
        createdAt: new Date()
      };
      
      console.log('Appointment created:', finalData);
      
      toast({
        title: "¡Cita creada exitosamente!",
        description: `Tu cita ha sido confirmada para el ${appointmentData.dateTime?.date.toLocaleDateString()}`,
      });
      
      setCurrentStep(5); // Success step
      
    } catch (error) {
      onError('Error al crear la cita. Por favor intenta de nuevo.');
      toast({
        title: "Error al crear la cita",
        description: "Hubo un problema al procesar tu solicitud. Por favor intenta de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PatientForm
            onSubmit={handlePatientData}
            onBack={handlePrevious}
          />
        );
      case 2:
        return (
          <SpecialtyGrid
            onSelect={handleSpecialtySelect}
            onBack={handlePrevious}
            availableSpecialties={customConfig?.availableSpecialties}
          />
        );
      case 3:
        return (
          <DateTimeSelector
            onSelect={handleDateTimeSelect}
            onBack={handlePrevious}
            selectedSpecialty={appointmentData.specialty}
            timeSlots={customConfig?.timeSlots}
          />
        );
      case 4:
        return (
          <ConfirmationStep
            appointmentData={appointmentData as AppointmentData}
            onConfirm={handleConfirm}
            onBack={handlePrevious}
            isSubmitting={isSubmitting}
          />
        );
      case 5:
        return (
          <SuccessStep
            appointmentData={appointmentData as AppointmentData}
            onCreateNew={() => {
              setCurrentStep(1);
              setAppointmentData({});
            }}
            onGoHome={onBack}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-medical text-white py-4 px-4">
        <div className="max-w-md mx-auto flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePrevious}
            className="text-white hover:bg-white/20 mr-4"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-bold">Nueva Cita Médica</h1>
          </div>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="max-w-md mx-auto px-4 py-4">
        <StepIndicator 
          currentStep={currentStep} 
          totalSteps={totalSteps}
        />
      </div>

      {/* Step Content */}
      <div className="max-w-md mx-auto px-4">
        {renderStep()}
      </div>
    </div>
  );
}