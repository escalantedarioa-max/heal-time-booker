import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

interface ShortLinkData {
  doctorId: string;
  specialtyId?: string;
  redirectUrl: string;
}

// Mock short link mappings - in real implementation, fetch from backend
const shortLinkMappings: Record<string, ShortLinkData> = {
  'garcia-cardio': {
    doctorId: 'dr-001',
    specialtyId: 'cardiology',
    redirectUrl: '/doctor/dr-001/specialty/cardiology'
  },
  'mendoza-neuro': {
    doctorId: 'dr-002',
    specialtyId: 'neurology',
    redirectUrl: '/doctor/dr-002/specialty/neurology'
  },
  'lopez-pediatria': {
    doctorId: 'dr-003',
    specialtyId: 'pediatrics',
    redirectUrl: '/doctor/dr-003/specialty/pediatrics'
  }
};

export function ShortLinkRedirect() {
  const { shortCode } = useParams<{ shortCode: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const resolveShortLink = async () => {
      if (!shortCode) {
        setError('Código de enlace no válido');
        setIsLoading(false);
        return;
      }

      try {
        // Simulate API call to resolve short link
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const linkData = shortLinkMappings[shortCode];
        
        if (!linkData) {
          setError('Enlace no encontrado');
          return;
        }

        setRedirectUrl(linkData.redirectUrl);
      } catch (err) {
        setError('Error al resolver el enlace');
      } finally {
        setIsLoading(false);
      }
    };

    resolveShortLink();
  }, [shortCode]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Redirigiendo...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="p-4 border border-destructive/20 rounded-lg bg-destructive/10">
            <h2 className="text-lg font-semibold text-destructive mb-2">
              Enlace no válido
            </h2>
            <p className="text-muted-foreground">{error}</p>
          </div>
          <a 
            href="/" 
            className="inline-flex items-center text-primary hover:underline"
          >
            Ir al inicio
          </a>
        </div>
      </div>
    );
  }

  if (redirectUrl) {
    return <Navigate to={redirectUrl} replace />;
  }

  return null;
}