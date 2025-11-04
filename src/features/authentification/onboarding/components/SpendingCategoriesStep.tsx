// components/onboarding/steps/SpendingCategoriesStep.tsx
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Utensils, Car, Home, Film, ShoppingCart } from "lucide-react";
import type { ReactElement } from "react";

// Types pour les catégories de dépenses
export interface SpendingCategory {
  id: keyof SpendingCategoriesData;
  title: string;
  description: string;
  icon: ReactElement;
  color: string;
  defaultValue: number;
  min: number;
  max: number;
  step: number;
}

// Interface pour les données des catégories de dépenses
export interface SpendingCategoriesData {
  foodBudget: number;
  transportBudget: number;
  entertainmentBudget: number;
  housingBudget: number;
  otherBudget: number;
}

// Props typées pour le composant
interface SpendingCategoriesStepProps {
  data: SpendingCategoriesData;
  onUpdate: (data: SpendingCategoriesData) => void;
  onNext: () => void;
  onBack: () => void;
}

// Données des catégories de dépenses avec typage explicite
const spendingCategories: SpendingCategory[] = [
  {
    id: "foodBudget",
    title: "Alimentation",
    description: "Courses, restaurants, livraison",
    icon: <Utensils className="w-5 h-5" />,
    color: "from-green-500 to-emerald-500",
    defaultValue: 300,
    min: 50,
    max: 1000,
    step: 10,
  },
  {
    id: "transportBudget",
    title: "Transport",
    description: "Essence, transports en commun, taxi",
    icon: <Car className="w-5 h-5" />,
    color: "from-blue-500 to-cyan-500",
    defaultValue: 150,
    min: 20,
    max: 500,
    step: 10,
  },
  {
    id: "entertainmentBudget",
    title: "Loisirs",
    description: "Cinéma, sorties, abonnements",
    icon: <Film className="w-5 h-5" />,
    color: "from-purple-500 to-pink-500",
    defaultValue: 100,
    min: 0,
    max: 300,
    step: 10,
  },
  {
    id: "housingBudget",
    title: "Logement",
    description: "Loyer, charges, électricité",
    icon: <Home className="w-5 h-5" />,
    color: "from-orange-500 to-red-500",
    defaultValue: 500,
    min: 100,
    max: 2000,
    step: 50,
  },
  {
    id: "otherBudget",
    title: "Autres",
    description: "Shopping, santé, divers",
    icon: <ShoppingCart className="w-5 h-5" />,
    color: "from-gray-500 to-slate-500",
    defaultValue: 200,
    min: 0,
    max: 500,
    step: 10,
  },
];

export const SpendingCategoriesStep = ({ 
  data, 
  onUpdate, 
  onNext, 
  onBack 
}: SpendingCategoriesStepProps) => {
  
  // Gestion du changement de budget pour une catégorie
  const handleBudgetChange = (categoryId: keyof SpendingCategoriesData, value: number[]): void => {
    onUpdate({
      ...data,
      [categoryId]: value[0] // Slider retourne un tableau, on prend le premier élément
    });
  };

  // Calcul du budget total
  const totalBudget = Object.values(data).reduce((sum, budget) => sum + budget, 0);

  // Formatage de l'affichage monétaire
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

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
            <ShoppingCart className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-2">
            Votre budget mensuel
          </h2>
          <p className="text-slate-600 dark:text-slate-300">
            Ajustez vos budgets selon vos habitudes de dépenses
          </p>
        </div>

        {/* Budget Total */}
        <motion.div 
          className="bg-gradient-to-r from-blue-500 to-emerald-500 rounded-2xl p-6 mb-8 text-white text-center"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold mb-2">Budget mensuel total</h3>
          <p className="text-3xl font-bold">{formatCurrency(totalBudget)}</p>
          <p className="text-blue-100 text-sm mt-2">
            Basé sur vos revenus et objectifs
          </p>
        </motion.div>

        {/* Catégories de dépenses */}
        <div className="space-y-6 mb-8">
          {spendingCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${category.color} text-white`}>
                    {category.icon}
                  </div>
                  <div>
                    <Label htmlFor={category.id} className="text-sm font-medium">
                      {category.title}
                    </Label>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {category.description}
                    </p>
                  </div>
                </div>
                <span className="text-lg font-semibold text-slate-700 dark:text-slate-300">
                  {formatCurrency(data[category.id])}
                </span>
              </div>

              <Slider
                id={category.id}
                value={[data[category.id]]}
                onValueChange={(value: number[]) => handleBudgetChange(category.id, value)}
                min={category.min}
                max={category.max}
                step={category.step}
                className="mt-4"
              />
              
              <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-2">
                <span>{formatCurrency(category.min)}</span>
                <span>{formatCurrency(category.max)}</span>
              </div>
            </motion.div>
          ))}
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
            onClick={onNext}
            className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white rounded-xl px-8 shadow-lg shadow-blue-500/25"
          >
            Continuer
          </Button>
        </div>
      </motion.div>
    </div>
  );
};