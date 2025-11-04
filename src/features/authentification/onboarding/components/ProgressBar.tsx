import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronLeft, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface VerticalProgressBarProps {
  steps: Array<{
    id: number;
    title: string;
    description: string;
    icon: React.ReactElement;
  }>;
  currentStep: number;
  onStepClick?: (step: number) => void;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
}

export const VerticalProgressBar = ({ 
  steps, 
  currentStep, 
  onStepClick,
  isOpen: controlledIsOpen,
  onToggle
}: VerticalProgressBarProps) => {
  const [isOpen, setIsOpen] = useState(true);
  
  // Utiliser le state contrôlé ou non contrôlé
  const isBarOpen = controlledIsOpen !== undefined ? controlledIsOpen : isOpen;
  const handleToggle = () => {
    const newState = !isBarOpen;
    if (controlledIsOpen !== undefined) {
      onToggle?.(newState);
    } else {
      setIsOpen(newState);
    }
  };

  return (
    <>
      {/* Bouton de menu mobile */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <motion.button
          onClick={handleToggle}
          className="w-12 h-12 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-600 shadow-lg flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Menu className="w-5 h-5 text-slate-700 dark:text-slate-300" />
        </motion.button>
      </div>

      {/* Overlay mobile */}
      <AnimatePresence>
        {isBarOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleToggle}
          />
        )}
      </AnimatePresence>

      {/* Barre de progression */}
      <AnimatePresence>
        {isBarOpen && (
          <motion.div
            className={cn(
              "fixed lg:relative z-50 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-r border-slate-200 dark:border-slate-700 h-screen overflow-y-auto",
              "w-80 max-w-[90vw] lg:max-w-none"
            )}
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="p-6 lg:p-8">
              {/* En-tête avec bouton de fermeture */}
              <div className="flex items-center justify-between mb-8 lg:mb-12">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-md">M</span>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                      MoneyWise
                    </h1>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Configuration
                    </p>
                  </div>
                </div>
                
                {/* Bouton de fermeture mobile */}
                <motion.button
                  onClick={handleToggle}
                  className="lg:hidden w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronLeft className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                </motion.button>
              </div>

              {/* Étapes */}
              <div className="space-y-2">
                {steps.map((step) => {
                  const isCompleted = step.id < currentStep;
                  const isCurrent = step.id === currentStep;
                  const isUpcoming = step.id > currentStep;

                  return (
                    <motion.button
                      key={step.id}
                      className={cn(
                        "w-full text-left p-4 rounded-2xl transition-all duration-300 border-2",
                        isCurrent && "border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg scale-105",
                        isCompleted && "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20",
                        isUpcoming && "border-slate-200 dark:border-slate-600 bg-white/50 dark:bg-slate-700/50 hover:border-slate-300 dark:hover:border-slate-500",
                        "lg:hover:scale-102"
                      )}
                      onClick={() => {
                        onStepClick?.(step.id);
                        // Fermer automatiquement sur mobile après sélection
                        if (window.innerWidth < 1024) {
                          handleToggle();
                        }
                      }}
                      whileHover={{ scale: window.innerWidth >= 1024 ? 1.02 : 1 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isUpcoming}
                    >
                      <div className="flex items-center gap-4">
                        {/* Indicateur de progression */}
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 flex-shrink-0",
                          isCompleted && "bg-emerald-500 text-white",
                          isCurrent && "bg-blue-500 text-white shadow-lg",
                          isUpcoming && "bg-slate-200 dark:bg-slate-600 text-slate-500 dark:text-slate-400"
                        )}>
                          {isCompleted ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            step.id + 1
                          )}
                        </div>

                        {/* Contenu de l'étape */}
                        <div className="flex-1 min-w-0">
                          <h3 className={cn(
                            "font-semibold text-sm mb-1",
                            isCompleted && "text-emerald-700 dark:text-emerald-300",
                            isCurrent && "text-blue-700 dark:text-blue-300",
                            isUpcoming && "text-slate-500 dark:text-slate-400"
                          )}>
                            {step.title}
                          </h3>
                          <p className={cn(
                            "text-xs line-clamp-2",
                            isCompleted && "text-emerald-600 dark:text-emerald-400",
                            isCurrent && "text-blue-600 dark:text-blue-400",
                            isUpcoming && "text-slate-400 dark:text-slate-500"
                          )}>
                            {step.description}
                          </p>
                        </div>

                        {/* Icône */}
                        <div className={cn(
                          "p-2 rounded-lg transition-colors flex-shrink-0",
                          isCompleted && "text-emerald-500",
                          isCurrent && "text-blue-500",
                          isUpcoming && "text-slate-400"
                        )}>
                          {step.icon}
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Progression globale */}
              <div className="mt-8 lg:mt-12 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-2xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Progression
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {Math.round((currentStep / (steps.length - 1)) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Indicateur d'étape actuelle pour mobile */}
              <div className="lg:hidden mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {currentStep + 1}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                      Étape actuelle
                    </p>
                    <p className="text-sm text-blue-700 dark:text-blue-300 font-semibold">
                      {steps[currentStep]?.title}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};