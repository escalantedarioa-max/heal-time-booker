import { useState, useEffect } from 'react';

export interface DoctorConfig {
  id: string;
  name: string;
  specialty: string;
  specialtyId: string;
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
  colors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  contact?: {
    phone?: string;
    email?: string;
    address?: string;
  };
}

const defaultConfig: Partial<DoctorConfig> = {
  availableSpecialties: [
    { id: 'cardiology', name: 'Cardiología', icon: 'Heart' },
    { id: 'neurology', name: 'Neurología', icon: 'Brain' },
    { id: 'ophthalmology', name: 'Oftalmología', icon: 'Eye' },
    { id: 'orthopedics', name: 'Traumatología', icon: 'Bone' },
    { id: 'pediatrics', name: 'Pediatría', icon: 'Baby' },
    { id: 'general', name: 'Medicina General', icon: 'Stethoscope' }
  ],
  timeSlots: [
    '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM',
    '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
    '04:00 PM', '04:30 PM', '05:00 PM'
  ],
  businessHours: {
    start: '08:00',
    end: '17:00'
  }
};

const doctorConfigs: Record<string, DoctorConfig> = {
  'dr-001': {
    id: 'dr-001',
    name: 'Dr. María García',
    specialty: 'Cardiología',
    specialtyId: 'cardiology',
    ...defaultConfig,
    colors: {
      primary: '#3B82F6',
      secondary: '#10B981',
      accent: '#8B5CF6'
    }
  },
  'dr-002': {
    id: 'dr-002',
    name: 'Dr. Carlos Mendoza',
    specialty: 'Neurología',
    specialtyId: 'neurology',
    ...defaultConfig,
    colors: {
      primary: '#8B5CF6',
      secondary: '#06B6D4',
      accent: '#F59E0B'
    }
  },
  'dr-003': {
    id: 'dr-003',
    name: 'Dra. Ana López',
    specialty: 'Pediatría',
    specialtyId: 'pediatrics',
    ...defaultConfig,
    colors: {
      primary: '#EC4899',
      secondary: '#10B981',
      accent: '#F59E0B'
    }
  }
};

export function useDoctorConfig(doctorId?: string) {
  const [config, setConfig] = useState<DoctorConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDoctorConfig = async () => {
      if (!doctorId) {
        setConfig(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // Simulate API call - in real implementation, fetch from backend
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const doctorConfig = doctorConfigs[doctorId];
        
        if (!doctorConfig) {
          throw new Error(`Doctor with ID ${doctorId} not found`);
        }

        setConfig(doctorConfig);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading doctor configuration');
        setConfig(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadDoctorConfig();
  }, [doctorId]);

  const updateConfig = (updates: Partial<DoctorConfig>) => {
    if (config) {
      setConfig({ ...config, ...updates });
    }
  };

  return {
    config,
    isLoading,
    error,
    updateConfig,
    availableDoctors: Object.keys(doctorConfigs)
  };
}