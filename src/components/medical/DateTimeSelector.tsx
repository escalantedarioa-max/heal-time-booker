import { useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface DateTimeSelectorProps {
  onSelect: (dateTime: { date: Date; time: string }) => void;
  onBack: () => void;
  selectedSpecialty?: { id: string; name: string };
  timeSlots?: string[];
}

const defaultTimeSlots = [
  '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM',
  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'
];

export function DateTimeSelector({ 
  onSelect, 
  onBack, 
  selectedSpecialty,
  timeSlots = defaultTimeSlots 
}: DateTimeSelectorProps) {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const { toast } = useToast();

  const handleDateSelect = async (date: Date | undefined) => {
    if (!date) return;

    setSelectedDate(date);
    setSelectedTime(''); // Reset time selection
    
    // Simulate loading available time slots for selected date
    const mockAvailableSlots = timeSlots.filter((_, index) => 
      Math.random() > 0.3 // Randomly make some slots unavailable
    );
    
    setAvailableSlots(mockAvailableSlots);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleNext = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Selección incompleta",
        description: "Por favor selecciona fecha y hora",
        variant: "destructive"
      });
      return;
    }

    onSelect({
      date: selectedDate,
      time: selectedTime
    });
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Disable past dates and Sundays
    const dayOfWeek = date.getDay();
    return date < today || dayOfWeek === 0;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Fecha y Hora
        </h2>
        <p className="text-muted-foreground">
          Selecciona cuándo quieres tu consulta de {selectedSpecialty?.name}
        </p>
      </div>

      {/* Date Selection */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-primary" />
            Seleccionar Fecha
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CalendarComponent
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            disabled={isDateDisabled}
            locale={es}
            className={cn("w-full justify-center p-3 pointer-events-auto")}
          />
        </CardContent>
      </Card>

      {/* Time Selection */}
      {selectedDate && (
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-primary" />
              Horarios Disponibles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground mb-4">
              {format(selectedDate, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}
            </div>
            
            {availableSlots.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {availableSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleTimeSelect(time)}
                    className={cn(
                      "text-sm transition-all duration-200",
                      selectedTime === time 
                        ? "bg-gradient-medical hover:bg-gradient-medical/90 shadow-medical" 
                        : "hover:bg-muted"
                    )}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No hay horarios disponibles para esta fecha</p>
                <p className="text-sm">Por favor selecciona otra fecha</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Selected Summary */}
      {selectedDate && selectedTime && (
        <Card className="bg-gradient-subtle shadow-soft">
          <CardContent className="p-4">
            <div className="text-center">
              <h4 className="font-semibold text-foreground mb-2">Cita Seleccionada</h4>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">{selectedSpecialty?.name}</span>
                <br />
                {format(selectedDate, "EEEE, d 'de' MMMM", { locale: es })} a las {selectedTime}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex space-x-3">
        <Button
          onClick={onBack}
          variant="outline"
          className="flex-1"
        >
          Anterior
        </Button>
        <Button
          onClick={handleNext}
          className="flex-1 bg-gradient-medical hover:bg-gradient-medical/90"
          disabled={!selectedDate || !selectedTime}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}