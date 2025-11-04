import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VerticalProgressBar } from "./ProgressBar";
import { RegistrationTypeStep } from "./RegistrationTypeStep";
import { QuickRegisterForm } from "./QuickRegisterForm";
import { PersonalInfoStep } from "./PersonalInfoStep";
import { FinancialGoalsStep } from "./FinancialGoalsStep";
import { SpendingCategoriesStep } from "./SpendingCategoriesStep";
import { NotificationsStep } from "./NotificationsStep";
import { User, Target, PieChart, Bell, Rocket } from "lucide-react";
import type { OnboardingData, RegistrationType } from "../types/onboarding.type";

const steps = [
  { id: 0, title: "Type d'inscription", description: "Choisissez votre expérience", icon: <Rocket className="w-4 h-4" /> },
  { id: 1, title: "Informations personnelles", description: "Créez votre profil", icon: <User className="w-4 h-4" /> },
  { id: 2, title: "Objectifs financiers", description: "Définissez vos buts", icon: <Target className="w-4 h-4" /> },
  { id: 3, title: "Catégories de budget", description: "Planifiez vos dépenses", icon: <PieChart className="w-4 h-4" /> },
  { id: 4, title: "Préférences", description: "Personnalisez l'expérience", icon: <Bell className="w-4 h-4" /> },
];

interface OnboardingFlowProps {
  onComplete: (data: OnboardingData) => void;
  isPending: boolean;
}

export const OnboardingFlow = ({ onComplete, isPending }: OnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isProgressBarOpen, setIsProgressBarOpen] = useState(true);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    registrationType: "quick",
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
    }));
  };

  const handleStepClick = (step: number) => {
    if (step <= currentStep) {
      setCurrentStep(step);
      if (window.innerWidth < 1024) {
        setIsProgressBarOpen(false);
      }
    }
  };

  const handleQuickRegister = (personalInfo: OnboardingData['personalInfo']) => {
    const completeData: OnboardingData = {
      ...onboardingData,
      personalInfo,
      // Pour l'inscription rapide, on utilise des valeurs par défaut
      financialGoals: {
        primaryGoal: "TRACKING",
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
        largeExpenses: false,
      },
    };
    onComplete(completeData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <RegistrationTypeStep
            selectedType={onboardingData.registrationType}
            onSelect={(type: RegistrationType) => updateData({ registrationType: type })}
            onNext={nextStep}
          />
        );

      case 1:
        if (onboardingData.registrationType === "quick") {
          return (
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                  Dernière étape
                </h2>
                <p className="text-slate-600 dark:text-slate-300">
                  Remplissez vos informations pour créer votre compte
                </p>
              </div>
              <QuickRegisterForm
                onSubmit={handleQuickRegister}
                isPending={isPending}
              />
            </div>
          );
        }

        return (
          <PersonalInfoStep
            data={onboardingData.personalInfo}
            onUpdate={(data) => updateData({ personalInfo: { ...data, avatar: data.avatar || undefined } })}
            onNext={nextStep}
            onBack={prevStep}
          />
        );

      case 2:
        return (
          <FinancialGoalsStep
            data={onboardingData.financialGoals}
            onUpdate={(data) => updateData({ financialGoals: data })}
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
            onComplete={() => onComplete(onboardingData)}
            onBack={prevStep}
            isPending={isPending}
          />
        );

      default:
        return null;
    }
  };

    return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 dark:from-slate-900 dark:via-blue-900 dark:to-emerald-900 overflow-hidden">
      {/* Barre de progression verticale */}
      <VerticalProgressBar
        steps={steps}
        currentStep={currentStep}
        onStepClick={handleStepClick}
        isOpen={isProgressBarOpen}
        onToggle={setIsProgressBarOpen}
      />

      {/* Contenu principal */}
      <div className="flex-1 overflow-y-auto lg:pl-0">
        <div className="min-h-full flex items-center justify-center p-4 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full max-w-4xl"
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );

};