import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PersonalInfoStep } from "./PersonalInfoStep";
import { FinancialGoalsStep } from "./FinancialGoalsStep";
import { SpendingCategoriesStep } from "./SpendingCategoriesStep";
import { NotificationsStep } from "./NotificationsStep";
import { WelcomeStep } from "./WelcomeStep";
import { ProgressBar } from "./ProgressBar";
import type { OnboardingData } from "../types/onboarding.type";

const steps = [
  { id: 0, title: "Bienvenue", description: "Commencez votre voyage financier" },
  { id: 1, title: "Informations", description: "Créez votre profil" },
  { id: 2, title: "Objectifs", description: "Définissez vos buts" },
  { id: 3, title: "Budget", description: "Planifiez vos dépenses" },
  { id: 4, title: "Préférences", description: "Personnalisez l'expérience" },
];

interface OnboardingFlowProps {
  onComplete: (data: OnboardingData) => void;
}

export const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    step: 0,
    personalInfo: {
      nom: "",
      prenom: "",
      email: "",
      password: "",
    },
    financialGoals: {
      primaryGoal: "SAVING",
      monthlyIncome: 0,
    },
    spendingCategories: {
      foodBudget: 300,
      transportBudget: 150,
      entertainmentBudget: 100,
      housingBudget: 500,
      otherBudget: 200,
    },
    notifications: {
      budgetAlerts: true,
      weeklyReports: true,
      largeExpenses: true,
    },
  });

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateData = (newData: Partial<OnboardingData>) => {
    setOnboardingData(prev => ({
      ...prev,
      ...newData,
      step: currentStep,
    }));
  };

  const handleComplete = () => {
    onComplete(onboardingData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <WelcomeStep onNext={nextStep} />;
      case 1:
        return (
          <PersonalInfoStep
            data={onboardingData.personalInfo}
            onUpdate={(data) =>
              updateData({
                personalInfo: { ...data, avatar: data.avatar ?? undefined },
              })
            }
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 2:
        return (
          <FinancialGoalsStep
            data={onboardingData.financialGoals}
            onUpdate={(data) =>
              updateData({
                financialGoals: { ...data, primaryGoal: data.primaryGoal ?? "SAVING" },
              })
            }
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <SpendingCategoriesStep
            data={onboardingData.spendingCategories}
            onUpdate={(data) => updateData({ spendingCategories: data })}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 4:
        return (
          <NotificationsStep
            data={onboardingData.notifications}
            onUpdate={(data) => updateData({ notifications: data })}
            onComplete={handleComplete}
            onBack={prevStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 dark:from-slate-900 dark:via-blue-900 dark:to-emerald-900">
      <div className="container mx-auto px-4 py-8">
        {/* Progress Bar - cachée sur l'écran de bienvenue */}
        {currentStep > 0 && (
          <ProgressBar currentStep={currentStep} totalSteps={steps.length - 1} />
        )}

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};