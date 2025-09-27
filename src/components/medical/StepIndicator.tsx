import { cn } from '@/lib/utils';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepTitles?: string[];
}

export function StepIndicator({ 
  currentStep, 
  totalSteps, 
  stepTitles = ['Paciente', 'Especialidad', 'Fecha/Hora', 'Confirmación', 'Éxito']
}: StepIndicatorProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        {Array.from({ length: totalSteps }, (_, i) => {
          const stepNumber = i + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          
          return (
            <div key={stepNumber} className="flex items-center">
              {/* Step Circle */}
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300",
                  isActive && "bg-gradient-medical text-white shadow-medical scale-110",
                  isCompleted && "bg-medical-success text-white",
                  !isActive && !isCompleted && "bg-muted text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  stepNumber
                )}
              </div>

              {/* Connection Line */}
              {stepNumber < totalSteps && (
                <div
                  className={cn(
                    "flex-1 h-0.5 mx-2 transition-colors duration-300",
                    stepNumber < currentStep ? "bg-medical-success" : "bg-muted"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Current Step Title */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Paso {currentStep} de {totalSteps}
        </p>
        <p className="font-semibold text-foreground">
          {stepTitles[currentStep - 1]}
        </p>
      </div>
    </div>
  );
}