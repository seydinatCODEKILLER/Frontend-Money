import { OnboardingFlow } from "../components/OnboardingFlow";
import { useRegister } from "../hooks/useRegister";
import type { OnboardingData } from "../types/onboarding.type";

export const OnboardingPage = () => {
  const { mutate: register, isPending } = useRegister();

  const handleOnboardingComplete = (onboardingData: OnboardingData) => {
    register({
      personalInfo: onboardingData.personalInfo,
      onboardingData,
    });
  };

  return (
    <div className="h-screen overflow-hidden">
      <OnboardingFlow 
        onComplete={handleOnboardingComplete} 
        isPending={isPending}
      />
    </div>
  );
};