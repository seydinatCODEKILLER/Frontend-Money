// components/onboarding/ProgressBar.tsx
import { motion } from "framer-motion";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto mb-12">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">
          Étape {currentStep} sur {totalSteps}
        </h3>
        <span className="text-sm text-slate-500 dark:text-slate-400">
          {Math.round(progress)}% complété
        </span>
      </div>
      
      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
        <motion.div
          className="bg-gradient-to-r from-blue-500 to-emerald-500 h-3 rounded-full shadow-lg shadow-blue-500/25"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};