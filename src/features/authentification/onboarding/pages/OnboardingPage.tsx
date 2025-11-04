import { OnboardingFlow } from "../components/OnboardingFlow";
import { useRegister } from "..//hooks/useRegister";
import type { OnboardingData } from "..//types/onboarding.type";

export const OnboardingPage = () => {
  const { mutate: register, isPending } = useRegister();

  const handleOnboardingComplete = (onboardingData: OnboardingData) => {
    register({
      personalInfo: onboardingData.personalInfo,
      onboardingData,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 dark:from-slate-900 dark:via-blue-900 dark:to-emerald-900">
      <OnboardingFlow onComplete={handleOnboardingComplete} />
      
      {/* Loading Overlay */}
      {isPending && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-slate-700 dark:text-slate-300">
              Préparation de votre espace personnalisé...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};