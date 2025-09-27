import { useState } from 'react';
import { User, Phone, Mail, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface PatientData {
  type: 'new' | 'existing';
  fullName: string;
  cedula: string;
  phone: string;
  email?: string;
}

interface PatientFormProps {
  onSubmit: (data: PatientData) => void;
  onBack: () => void;
}

export function PatientForm({ onSubmit, onBack }: PatientFormProps) {
  const [activeTab, setActiveTab] = useState<'new' | 'existing'>('new');
  const [formData, setFormData] = useState<Partial<PatientData>>({
    type: 'new',
    fullName: '',
    cedula: '',
    phone: '',
    email: ''
  });
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: keyof PatientData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTabChange = (value: string) => {
    const tabType = value as 'new' | 'existing';
    setActiveTab(tabType);
    setFormData(prev => ({ 
      ...prev, 
      type: tabType,
      // Clear form when switching tabs
      fullName: '',
      cedula: '',
      phone: '',
      email: ''
    }));
  };

  const handleSearchExisting = async () => {
    if (!formData.cedula?.trim()) {
      toast({
        title: "Campo requerido",
        description: "Por favor ingresa la cédula para buscar",
        variant: "destructive"
      });
      return;
    }

    setIsSearching(true);

    try {
      // Simulate API search
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock found patient data
      const foundPatient = {
        fullName: 'María Elena Rodríguez',
        phone: '+58 412-345-6789',
        email: 'maria.rodriguez@email.com'
      };

      setFormData(prev => ({
        ...prev,
        fullName: foundPatient.fullName,
        phone: foundPatient.phone,
        email: foundPatient.email
      }));

      toast({
        title: "Paciente encontrado",
        description: `Se cargaron los datos de ${foundPatient.fullName}`,
      });

    } catch (error) {
      toast({
        title: "Paciente no encontrado",
        description: "No existe un paciente registrado con esa cédula",
        variant: "destructive"
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleSubmit = () => {
    // Validation
    if (!formData.cedula?.trim()) {
      toast({
        title: "Campo requerido",
        description: "La cédula es obligatoria",
        variant: "destructive"
      });
      return;
    }

    if (activeTab === 'new') {
      if (!formData.fullName?.trim() || !formData.phone?.trim()) {
        toast({
          title: "Campos requeridos",
          description: "Nombre completo y teléfono son obligatorios",
          variant: "destructive"
        });
        return;
      }
    }

    if (!formData.fullName?.trim()) {
      toast({
        title: "Error",
        description: "No se han cargado los datos del paciente",
        variant: "destructive"
      });
      return;
    }

    const patientData: PatientData = {
      type: activeTab,
      fullName: formData.fullName!,
      cedula: formData.cedula!,
      phone: formData.phone!,
      email: formData.email || undefined
    };

    onSubmit(patientData);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Identificación del Paciente
        </h2>
        <p className="text-muted-foreground">
          Selecciona si es un paciente nuevo o existente
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="new">Paciente Nuevo</TabsTrigger>
          <TabsTrigger value="existing">Paciente Existente</TabsTrigger>
        </TabsList>

        <TabsContent value="new" className="space-y-4 mt-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2 text-primary" />
                Datos del Nuevo Paciente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">
                  Nombre Completo *
                </label>
                <Input
                  type="text"
                  placeholder="Ej: Juan Carlos Pérez"
                  value={formData.fullName || ''}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">
                  Cédula de Identidad *
                </label>
                <Input
                  type="text"
                  placeholder="Ej: 12345678"
                  value={formData.cedula || ''}
                  onChange={(e) => handleInputChange('cedula', e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">
                  Teléfono *
                </label>
                <Input
                  type="tel"
                  placeholder="Ej: +58 414-123-4567"
                  value={formData.phone || ''}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">
                  Email (Opcional)
                </label>
                <Input
                  type="email"
                  placeholder="Ej: juan.perez@email.com"
                  value={formData.email || ''}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="existing" className="space-y-4 mt-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2 text-primary" />
                Buscar Paciente Existente
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
                  value={formData.cedula || ''}
                  onChange={(e) => handleInputChange('cedula', e.target.value)}
                  className="mt-1"
                  disabled={isSearching}
                />
              </div>

              <Button
                onClick={handleSearchExisting}
                disabled={isSearching || !formData.cedula?.trim()}
                className="w-full"
                variant="outline"
              >
                {isSearching ? (
                  <>
                    <User className="h-4 w-4 mr-2 animate-pulse" />
                    Buscando...
                  </>
                ) : (
                  <>
                    <User className="h-4 w-4 mr-2" />
                    Buscar Paciente
                  </>
                )}
              </Button>

              {/* Patient found data display */}
              {formData.fullName && activeTab === 'existing' && (
                <div className="border rounded-lg p-4 bg-muted/30">
                  <h4 className="font-semibold text-foreground mb-2">Paciente Encontrado:</h4>
                  <div className="space-y-1 text-sm">
                    <p><strong>Nombre:</strong> {formData.fullName}</p>
                    <p><strong>Teléfono:</strong> {formData.phone}</p>
                    {formData.email && <p><strong>Email:</strong> {formData.email}</p>}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex space-x-3">
        <Button
          onClick={onBack}
          variant="outline"
          className="flex-1"
        >
          Anterior
        </Button>
        <Button
          onClick={handleSubmit}
          className="flex-1 bg-gradient-medical hover:bg-gradient-medical/90"
          disabled={!formData.cedula?.trim() || !formData.fullName?.trim()}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}