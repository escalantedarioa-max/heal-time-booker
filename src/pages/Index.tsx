import { AppointmentManager } from '@/components/isolated/AppointmentManager';

const Index = () => {
  return (
    <AppointmentManager
      doctorId="dr-001"
      doctorName="Dr. María García"
      doctorSpecialty="Cardiología"
      specialtyId="cardiology"
      customConfig={{
        availableSpecialties: [
          { id: 'cardiology', name: 'Cardiología', icon: 'Heart' },
          { id: 'neurology', name: 'Neurología', icon: 'Brain' },
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
      }}
    />
  );
};

export default Index;