// components/profile/ProfileActivity.tsx
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Target, Award, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ProfileActivity() {
  const activities = [
    {
      icon: TrendingUp,
      title: "Objectif budget atteint",
      description: "Vous avez respecté votre budget alimentation ce mois-ci",
      time: "Il y a 2 jours",
      type: "success"
    },
    {
      icon: Target,
      title: "Nouvel objectif défini",
      description: "Objectif d'épargne de 5 000€ défini pour 2024",
      time: "Il y a 1 semaine",
      type: "info"
    },
    {
      icon: Award,
      title: "Badge débloqué",
      description: "Badge 'Économiste' débloqué pour 3 mois consécutifs sous le budget",
      time: "Il y a 2 semaines",
      type: "achievement"
    },
    {
      icon: Clock,
      title: "Analyse mensuelle complétée",
      description: "Votre analyse financière de novembre est disponible",
      time: "Il y a 3 semaines",
      type: "info"
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'achievement':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    }
  };

  return (
    <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Activité récente
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Votre activité et accomplissements récents
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-4 p-3 rounded-lg border border-gray-100 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
              <activity.icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {activity.title}
                </h4>
                <Badge variant="secondary" className={getTypeColor(activity.type)}>
                  {activity.type === 'success' && 'Succès'}
                  {activity.type === 'achievement' && 'Récompense'}
                  {activity.type === 'info' && 'Info'}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {activity.description}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Clock className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {activity.time}
                </span>
              </div>
            </div>
          </div>
        ))}
        
        <Button variant="outline" className="w-full">
          Voir toute l'activité
        </Button>
      </CardContent>
    </Card>
  );
}