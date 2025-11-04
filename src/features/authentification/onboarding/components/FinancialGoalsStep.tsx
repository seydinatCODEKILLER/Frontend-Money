import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Target, PiggyBank, ChartNoAxesCombined, CreditCard, TrendingUp } from "lucide-react";
import type { ReactElement } from "react";

// Types pour les objectifs financiers
export type FinancialGoalType = "SAVING" | "BUDGETING" | "DEBT" | "INVESTING" | "TRACKING";

interface FinancialGoal {
  id: FinancialGoalType;
  title: string;
  description: string;
  icon: ReactElement;
  color: string;
}

// Données des objectifs financiers avec typage explicite
const financialGoals: FinancialGoal[] = [
  {
    id: "SAVING",
    title: "Épargne",
    description: "Mettre de l'argent de côté pour mes projets",
    icon: <PiggyBank className="w-6 h-6" />,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "BUDGETING",
    title: "Budget",
    description: "Mieux contrôler mes dépenses mensuelles",
    icon: <ChartNoAxesCombined className="w-6 h-6" />,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "DEBT",
    title: "Dettes",
    description: "Réduire ou éliminer mes dettes",
    icon: <CreditCard className="w-6 h-6" />,
    color: "from-red-500 to-orange-500",
  },
  {
    id: "INVESTING",
    title: "Investissement",
    description: "Faire croître mon patrimoine",
    icon: <TrendingUp className="w-6 h-6" />,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "TRACKING",
    title: "Suivi",
    description: "Comprendre où va mon argent",
    icon: <Target className="w-6 h-6" />,
    color: "from-indigo-500 to-blue-500",
  },
];

// Interface pour les données de l'étape des objectifs financiers
export interface FinancialGoalsData {
  primaryGoal: FinancialGoalType | null;
  monthlyIncome: number;
  savingsTarget?: number;
  debtAmount?: number;
}

// Props typées pour le composant
interface FinancialGoalsStepProps {
  data: FinancialGoalsData;
  onUpdate: (data: FinancialGoalsData) => void;
  onNext: () => void;
  onBack: () => void;
}

export const FinancialGoalsStep = ({ 
  data, 
  onUpdate, 
  onNext, 
  onBack 
}: FinancialGoalsStepProps) => {
  
  // Gestion de la sélection d'objectif avec typage
  const handleGoalSelect = (goalId: FinancialGoalType): void => {
    onUpdate({ 
      ...data, 
      primaryGoal: goalId 
    });
  };

  // Gestion du changement de revenu avec validation
  const handleIncomeChange = (income: number): void => {
    const validatedIncome = Math.max(0, income); // Éviter les valeurs négatives
    onUpdate({ 
      ...data, 
      monthlyIncome: validatedIncome 
    });
  };

  // Gestion de la continuation avec validation
  const handleContinue = (): void => {
    if (data.primaryGoal && data.monthlyIncome > 0) {
      onNext();
    }
  };

  // Vérification si le formulaire est valide
  const isFormValid = Boolean(data.primaryGoal && data.monthlyIncome > 0);

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-2xl"
      >
        {/* En-tête */}
        <div className="text-center mb-8">
          <motion.div
            className="w-16 h-16 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-2xl mx-auto mb-4 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
          >
            <Target className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-2">
            Vos objectifs financiers
          </h2>
          <p className="text-slate-600 dark:text-slate-300">
            Quel est votre principal objectif avec MoneyWise ?
          </p>
        </div>

        {/* Grille des objectifs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {financialGoals.map((goal) => {
            const isSelected = data.primaryGoal === goal.id;
            
            return (
              <motion.button
                key={goal.id}
                type="button"
                className={`p-6 rounded-2xl border-2 text-left transition-all duration-300 ${
                  isSelected
                    ? `border-blue-500 bg-gradient-to-br ${goal.color} text-white shadow-lg scale-105`
                    : "border-slate-200 dark:border-slate-600 bg-white/50 dark:bg-slate-700/50 hover:border-blue-300 dark:hover:border-blue-600 hover:scale-102"
                }`}
                onClick={() => handleGoalSelect(goal.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-pressed={isSelected}
                aria-label={`Sélectionner l'objectif : ${goal.title}`}
              >
                <div className={`mb-3 ${isSelected ? "text-white" : "text-blue-500"}`}>
                  {goal.icon}
                </div>
                <h3 className="font-semibold mb-2">{goal.title}</h3>
                <p className={`text-sm ${
                  isSelected ? "text-blue-100" : "text-slate-600 dark:text-slate-400"
                }`}>
                  {goal.description}
                </p>
              </motion.button>
            );
          })}
        </div>

        {/* Revenu mensuel */}
        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl p-6 mb-8">
          <Label htmlFor="income" className="text-sm font-medium mb-4 block">
            Revenu mensuel approximatif *
          </Label>
          <div className="relative">
            <Input
              id="income"
              type="number"
              min="0"
              step="100"
              placeholder="0"
              value={data.monthlyIncome || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                handleIncomeChange(Number(e.target.value))
              }
              className="h-12 rounded-xl border-2 border-slate-200 focus:border-blue-500 text-lg pl-8 pr-20"
              aria-required="true"
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500">
              €/mois
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            Cette information nous aide à personnaliser vos recommandations
          </p>
        </div>

        {/* Boutons de navigation */}
        <div className="flex justify-between pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="rounded-xl px-8"
          >
            Retour
          </Button>
          
          <Button
            type="button"
            onClick={handleContinue}
            disabled={!isFormValid}
            className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white rounded-xl px-8 shadow-lg shadow-blue-500/25 disabled:opacity-50 transition-all duration-300"
            aria-disabled={!isFormValid}
          >
            Continuer
          </Button>
        </div>
      </motion.div>
    </div>
  );
};