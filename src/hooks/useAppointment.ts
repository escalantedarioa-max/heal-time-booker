import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface AppointmentData {
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
  doctorId: string;
  id?: string;
  status?: string;
  createdAt?: Date;
}

export interface AppointmentSearchResult {
  id: string;
  patient: {
    fullName: string;
    cedula: string;
    phone: string;
    email?: string;
  };
  specialty: string;
  date: string;
  time: string;
  status: 'confirmed' | 'cancelled' | 'completed';
  doctorName: string;
}

const API_BASE_URL = 'http://3.21.145.6:4000/api/form';

export function useAppointment() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const createAppointment = async (appointmentData: AppointmentData): Promise<AppointmentData> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call for now - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const finalData: AppointmentData = {
        ...appointmentData,
        id: `apt-${Date.now()}`,
        status: 'confirmed',
        createdAt: new Date()
      };

      toast({
        title: "¡Cita creada exitosamente!",
        description: `Tu cita ha sido confirmada para el ${appointmentData.dateTime.date.toLocaleDateString()}`,
      });

      return finalData;
    } catch (err) {
      const errorMessage = 'Error al crear la cita. Por favor intenta de nuevo.';
      setError(errorMessage);
      
      toast({
        title: "Error al crear la cita",
        description: "Hubo un problema al procesar tu solicitud. Por favor intenta de nuevo.",
        variant: "destructive"
      });
      
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const searchAppointments = async (cedula: string, doctorId: string): Promise<AppointmentSearchResult[]> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API search - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock search result
      const mockAppointment: AppointmentSearchResult = {
        id: `apt-${Date.now()}`,
        patient: {
          fullName: 'María Elena Rodríguez',
          cedula: cedula,
          phone: '+58 412-345-6789',
          email: 'maria.rodriguez@email.com'
        },
        specialty: 'Cardiología',
        date: new Date().toISOString().split('T')[0],
        time: '10:00 AM',
        status: 'confirmed',
        doctorName: 'Dr. María García'
      };

      return [mockAppointment];
    } catch (err) {
      const errorMessage = 'Error al buscar citas. Por favor intenta de nuevo.';
      setError(errorMessage);
      
      toast({
        title: "Error en la búsqueda",
        description: errorMessage,
        variant: "destructive"
      });
      
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const cancelAppointment = async (appointmentId: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Cita cancelada exitosamente",
        description: "La cita ha sido cancelada correctamente.",
      });
    } catch (err) {
      const errorMessage = 'Error al cancelar la cita. Por favor intenta de nuevo.';
      setError(errorMessage);
      
      toast({
        title: "Error al cancelar",
        description: errorMessage,
        variant: "destructive"
      });
      
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createAppointment,
    searchAppointments,
    cancelAppointment,
    isLoading,
    error,
    clearError: () => setError(null)
  };
}