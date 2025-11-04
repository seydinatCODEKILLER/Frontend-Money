// components/onboarding/steps/NotificationsStep.tsx
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Bell, TrendingUp, AlertTriangle, Mail } from "lucide-react";

// Interface pour les préférences de notifications
export interface NotificationsData {
  budgetAlerts: boolean;
  weeklyReports: boolean;
  largeExpenses: boolean;
}

// Props typées pour le composant
interface NotificationsStepProps {
  data: NotificationsData;
  onUpdate: (data: NotificationsData) => void;
  onComplete: () => void;
  onBack: () => void;
}

// Type pour les options de notification
interface NotificationOption {
  id: keyof NotificationsData;
  title: string;
  description: string;
  icon: React.ReactElement;
  defaultEnabled: boolean;
}

// Données des options de notification
const notificationOptions: NotificationOption[] = [
  {
    id: "budgetAlerts",
    title: "Alertes de budget",
    description: "Recevez des alertes lorsque vous approchez de vos limites de budget",
    icon: <AlertTriangle className="w-5 h-5" />,
    defaultEnabled: true,
  },
  {
    id: "weeklyReports",
    title: "Rapports hebdomadaires",
    description: "Un résumé de vos finances chaque lundi matin",
    icon: <TrendingUp className="w-5 h-5" />,
    defaultEnabled: true,
  },
  {
    id: "largeExpenses",
    title: "Dépenses importantes",
    description: "Alertes pour les transactions supérieures à 200€",
    icon: <Bell className="w-5 h-5" />,
    defaultEnabled: true,
  },
];

export const NotificationsStep = ({ 
  data, 
  onUpdate, 
  onComplete, 
  onBack 
}: NotificationsStepProps) => {
  
  // Gestion du changement d'état des notifications
  const handleNotificationToggle = (notificationId: keyof NotificationsData, enabled: boolean): void => {
    onUpdate({
      ...data,
      [notificationId]: enabled
    });
  };

  // Gestion de la complétion de l'onboarding
  const handleComplete = (): void => {
    onComplete();
  };

  return (
    <div className="max-w-2xl mx-auto">
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
            <Bell className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-2">
            Personnalisez vos notifications
          </h2>
          <p className="text-slate-600 dark:text-slate-300">
            Choisissez les alertes qui vous intéressent
          </p>
        </div>

        {/* Options de notification */}
        <div className="space-y-6 mb-8">
          {notificationOptions.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-2xl border border-slate-200 dark:border-slate-600"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  {option.icon}
                </div>
                <div className="flex-1">
                  <Label 
                    htmlFor={option.id}
                    className="text-sm font-medium text-slate-800 dark:text-slate-200 cursor-pointer"
                  >
                    {option.title}
                  </Label>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    {option.description}
                  </p>
                </div>
              </div>
              
              <Switch
                id={option.id}
                checked={data[option.id]}
                onCheckedChange={(checked: boolean) => 
                  handleNotificationToggle(option.id, checked)
                }
                aria-label={`Activer/désactiver ${option.title}`}
              />
            </motion.div>
          ))}
        </div>

        {/* Bannière d'information */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-4 mb-8"
        >
          <div className="flex items-start space-x-3">
            <Mail className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300">
                Contrôle total
              </h4>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                Vous pourrez modifier ces paramètres à tout moment dans les paramètres de votre compte.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Résumé des sélections */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mb-6"
        >
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Notifications activées :{" "}
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              {Object.values(data).filter(Boolean).length} sur {Object.values(data).length}
            </span>
          </p>
        </motion.div>

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
            onClick={handleComplete}
            className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white rounded-xl px-8 shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all duration-300"
            size="lg"
          >
            Terminer l'installation
          </Button>
        </div>
      </motion.div>
    </div>
  );
};