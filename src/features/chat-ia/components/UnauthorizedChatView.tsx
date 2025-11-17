import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Shield, Lock, Star, Crown } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface UnauthorizedChatViewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UnauthorizedChatView({ open, onOpenChange }: UnauthorizedChatViewProps) {
  const { user } = useAuth();

  const features = [
    {
      icon: Crown,
      title: "Assistant IA Avancé",
      description: "Conseils personnalisés basés sur vos transactions"
    },
    {
      icon: Star,
      title: "Recommandations Intelligentes",
      description: "Analyses détaillées de vos habitudes financières"
    },
    {
      icon: Shield,
      title: "Support Prioritaire",
      description: "Accès à notre équipe d'experts financiers"
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md md:max-w-lg p-0 rounded-2xl border-0 bg-gradient-to-br from-white to-gray-50/80 dark:from-gray-900 dark:to-gray-800/80 shadow-2xl overflow-hidden">
        {/* Description cachée pour l'accessibilité */}
        <DialogDescription className="sr-only">
          Accès refusé à l'assistant IA financier. Fonctionnalité réservée aux utilisateurs premium.
        </DialogDescription>
        
        {/* Header */}
        <DialogHeader className="p-6 text-center border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-lg">
            <Lock className="w-8 h-8" />
          </div>
          <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
            Accès Premium Requis
          </DialogTitle>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            L'assistant financier IA est une fonctionnalité premium
          </p>
        </DialogHeader>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Message d'explication */}
          <div className="text-center">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Bonjour <span className="font-semibold text-orange-600 dark:text-orange-400">{user?.prenom}</span>, 
              l'assistant financier IA nécessite un accès spécial pour garantir la qualité du service.
            </p>
          </div>

          {/* Features list */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center">
              Ce que vous obtiendrez :
            </h3>
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                      {feature.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}