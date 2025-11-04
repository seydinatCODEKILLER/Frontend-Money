import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Rocket, Settings, CheckCircle2 } from "lucide-react";
import type { RegistrationType } from "../types/onboarding.type";

interface RegistrationTypeStepProps {
  selectedType: RegistrationType;
  onSelect: (type: RegistrationType) => void;
  onNext: () => void;
}

export const RegistrationTypeStep = ({ 
  selectedType, 
  onSelect, 
  onNext 
}: RegistrationTypeStepProps) => {
  const registrationTypes = [
    {
      id: "quick" as RegistrationType,
      title: "Inscription Rapide",
      description: "Créez votre compte en 30 secondes avec des paramètres par défaut",
      icon: <Rocket className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      features: [
        "Paramètres optimisés automatiquement",
        "Catégories de dépenses prédéfinies",
        "Configuration basique des notifications",
        "Prêt à utiliser immédiatement"
      ]
    },
    {
      id: "custom" as RegistrationType,
      title: "Personnalisation Complète",
      description: "Configurez chaque aspect de votre expérience MoneyWise",
      icon: <Settings className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
      features: [
        "Objectifs financiers personnalisés",
        "Budgets adaptés à votre style de vie",
        "Notifications sur mesure",
        "Configuration détaillée en 5 minutes"
      ]
    }
  ];

  return (
    <div className="w-full lg:max-w-6xl md:mx-auto p-6">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {registrationTypes.map((type, index) => (
          <motion.div
            key={type.id}
            initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`
              relative p-6 w-full rounded-3xl border-2 transition-all duration-300 cursor-pointer
              ${selectedType === type.id 
                ? `border-transparent bg-gradient-to-br ${type.color} text-white shadow-2xl scale-105` 
                : "border-slate-200 dark:border-slate-600 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm hover:border-blue-300 dark:hover:border-blue-600 hover:scale-102"
              }
            `}
            onClick={() => onSelect(type.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Badge de sélection */}
            {selectedType === type.id && (
              <motion.div
                className="absolute -top-3 -right-3 bg-white text-emerald-600 p-2 rounded-full shadow-lg"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
              >
                <CheckCircle2 className="w-6 h-6" />
              </motion.div>
            )}

            {/* Icône */}
            <div className={`mb-6 ${selectedType === type.id ? "text-white" : "text-slate-600"}`}>
              {type.icon}
            </div>

            {/* Titre et description */}
            <h3 className={`text-2xl font-bold mb-3 ${selectedType === type.id ? "text-white" : "text-slate-800 dark:text-slate-200"}`}>
              {type.title}
            </h3>
            <p className={`mb-6 ${selectedType === type.id ? "text-blue-100" : "text-slate-600 dark:text-slate-400"}`}>
              {type.description}
            </p>

            {/* Liste des fonctionnalités */}
            <ul className="space-y-3">
              {type.features.map((feature, featureIndex) => (
                <motion.li
                  key={featureIndex}
                  className={`flex items-center gap-3 text-sm ${
                    selectedType === type.id ? "text-blue-100" : "text-slate-600 dark:text-slate-500"
                  }`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + featureIndex * 0.05 }}
                >
                  <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${
                    selectedType === type.id ? "text-white" : "text-emerald-500"
                  }`} />
                  {feature}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Bouton de continuation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        <Button
          onClick={onNext}
          disabled={!selectedType}
          size="lg"
          className={`
           text-sm rounded lg:text-md font-semibold shadow-2xl transition-all duration-300
            ${selectedType 
              ? "bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white hover:shadow-3xl" 
              : "bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed"
            }
          `}
        >
          {selectedType === "quick" ? "Créer mon compte rapidement" : "Personnaliser mon expérience"}
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="ml-2"
          >
            →
          </motion.div>
        </Button>
        
        <p className="text-slate-500 dark:text-slate-400 mt-4 text-sm">
          {selectedType === "quick" 
            ? "Votre compte sera créé avec des paramètres optimisés" 
            : "Vous configurerez chaque aspect de votre application"
          }
        </p>
      </motion.div>
    </div>
  );
};