import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Lock, Star, Mail, Crown, TrendingUp, Lightbulb, Target } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { PageHeader } from '@/components/shared/PageHeader';

export function UnauthorizedRecommendationsView() {
  const { user } = useAuth();

  const features = [
    {
      icon: Lightbulb,
      title: "Recommandations Personnalisées",
      description: "Analyses intelligentes de vos habitudes de dépenses"
    },
    {
      icon: TrendingUp,
      title: "Optimisations Budget",
      description: "Conseils pour améliorer votre gestion financière"
    },
    {
      icon: Target,
      title: "Objectifs sur Mesure",
      description: "Plans d'action adaptés à vos objectifs financiers"
    },
    {
      icon: Shield,
      title: "Alertes Intelligentes",
      description: "Notifications proactives pour vos finances"
    }
  ];

  const handleContactSupport = () => {
    window.open('mailto:support@moneywise.com?subject=Demande d\'accès aux recommandations IA&body=Bonjour, je souhaite obtenir l\'accès aux recommandations financières IA.', '_blank');
  };

  const handleUpgrade = () => {
    // Redirection vers la page d'upgrade
    console.log('Redirection vers la page d\'upgrade');
  };

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <PageHeader
        title="Recommandations Intelligentes"
        description="Des conseils personnalisés basés sur l'analyse de vos transactions par notre IA"
        icon="💡"
      />

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Message d'explication */}
        <Card className="rounded-2xl border-0 bg-gradient-to-br from-white to-gray-50/80 dark:from-gray-900 dark:to-gray-800/80 shadow-lg">
          <CardHeader className="text-center pb-4">
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-lg">
              <Lock className="w-10 h-10" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
              Accès Premium Requis
            </CardTitle>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Les recommandations IA sont une fonctionnalité premium
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Bonjour <span className="font-semibold text-orange-600 dark:text-orange-400">{user?.prenom}</span>, 
                les recommandations financières intelligentes nécessitent un accès premium pour garantir des analyses de qualité.
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-3 pt-4">
              <Button
                onClick={handleUpgrade}
                className="rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-sm transition-all duration-300 hover:scale-105 cursor-pointer py-3"
              >
                <Crown className="w-5 h-5 mr-2" />
                Passer à Premium
              </Button>
              <Button
                onClick={handleContactSupport}
                variant="outline"
                className="rounded-xl border-orange-200 text-orange-700 hover:bg-orange-50 dark:border-orange-800 dark:text-orange-300 dark:hover:bg-orange-900/20 transition-all duration-300 cursor-pointer py-3"
              >
                <Mail className="w-5 h-5 mr-2" />
                Contacter le support
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Right Column - Features */}
        <Card className="rounded-2xl border-0 bg-gradient-to-br from-white to-gray-50/80 dark:from-gray-900 dark:to-gray-800/80 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900 dark:text-white text-center">
              Ce que vous obtiendrez
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm md:text-base">
                      {feature.title}
                    </h4>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats preview */}
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border border-orange-200 dark:border-orange-800">
              <div className="text-center">
                <p className="text-sm text-orange-700 dark:text-orange-300 font-semibold">
                  Exemple d'analyse premium
                </p>
                <div className="flex justify-center gap-6 mt-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">15%</div>
                    <div className="text-xs text-orange-600 dark:text-orange-400">Économies potentielles</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">3</div>
                    <div className="text-xs text-orange-600 dark:text-orange-400">Optimisations</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Info */}
      <Card className="rounded-2xl border-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Star className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Pourquoi passer à Premium ?
            </h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Notre IA analyse vos transactions pour identifier des opportunités d'économies, 
            optimiser votre budget et vous aider à atteindre vos objectifs financiers plus rapidement.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Analyses en temps réel
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Conseils personnalisés
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Support prioritaire
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}