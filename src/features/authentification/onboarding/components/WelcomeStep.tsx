// components/onboarding/steps/WelcomeStep.tsx
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Wallet, TrendingUp, Shield, Zap } from "lucide-react";

interface WelcomeStepProps {
  onNext: () => void;
}

export const WelcomeStep = ({ onNext }: WelcomeStepProps) => {
  const features = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Suivi Intelligent",
      description: "Analysez vos habitudes de dépenses avec des insights personnalisés"
    },
    {
      icon: <Wallet className="w-8 h-8" />,
      title: "Budget Dynamique",
      description: "Créez des budgets flexibles qui s'adaptent à votre style de vie"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Sécurité Totale",
      description: "Vos données financières sont chiffrées et protégées"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Rapports Automatiques",
      description: "Recevez des analyses détaillées de vos finances chaque semaine"
    }
  ];

  return (
    <div className="text-center py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, staggerChildren: 0.1 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300"
              whileHover={{ scale: 1.02, y: -2 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              <div className="text-blue-500 mb-4">{feature.icon}</div>
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <Button
            onClick={onNext}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white px-12 py-6 rounded-2xl text-lg font-semibold shadow-2xl shadow-blue-500/25 hover:shadow-3xl transition-all duration-300"
          >
            Commencer l'aventure
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.div>
          </Button>
          
          <p className="text-slate-500 dark:text-slate-400 mt-4 text-sm">
            Configuration rapide en 5 minutes
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};