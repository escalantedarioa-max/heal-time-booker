import { useState } from 'react';
import { MainSelection } from './MainSelection';
import { IsolatedAppointmentForm } from './IsolatedAppointmentForm';
import { CancelAppointment } from './CancelAppointment';

type ViewType = 'selection' | 'create' | 'cancel';

interface AppointmentManagerProps {
  doctorId?: string;
  doctorName?: string;
  doctorSpecialty?: string;
  specialtyId?: string;
  customConfig?: {
    availableSpecialties?: Array<{
      id: string;
      name: string;
      icon: string;
    }>;
    timeSlots?: string[];
    businessHours?: {
      start: string;
      end: string;
    };
  };
}

export function AppointmentManager({
  doctorId = "dr-001",
  doctorName = "Dr. María García",
  doctorSpecialty = "Cardiología",
  specialtyId = "cardiology",
  customConfig
}: AppointmentManagerProps) {
  const [currentView, setCurrentView] = useState<ViewType>('selection');

  const handleSelectCreate = () => {
    setCurrentView('create');
  };

  const handleSelectCancel = () => {
    setCurrentView('cancel');
  };

  const handleBack = () => {
    setCurrentView('selection');
  };

  const handleSuccess = () => {
    // Optionally stay in success state or return to selection
    setTimeout(() => {
      setCurrentView('selection');
    }, 3000);
  };

  const handleError = (error: string) => {
    console.error('Appointment error:', error);
    // Handle error - could show toast or error state
  };

  const handleCreateNew = () => {
    setCurrentView('create');
  };

  return (
    <div className="min-h-screen bg-background">
      {currentView === 'selection' && (
        <MainSelection
          onSelectCreate={handleSelectCreate}
          onSelectCancel={handleSelectCancel}
          doctorName={doctorName}
          doctorSpecialty={doctorSpecialty}
        />
      )}

      {currentView === 'create' && (
        <IsolatedAppointmentForm
          doctorId={doctorId}
          specialtyId={specialtyId}
          onSuccess={handleSuccess}
          onError={handleError}
          onBack={handleBack}
          customConfig={customConfig}
        />
      )}

      {currentView === 'cancel' && (
        <CancelAppointment
          doctorId={doctorId}
          onBack={handleBack}
          onCreateNew={handleCreateNew}
        />
      )}
    </div>
  );
}