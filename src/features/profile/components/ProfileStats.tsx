// components/profile/ProfileStats.tsx
import { Card, CardContent } from '@/components/ui/card';
import { Eye, Users, TrendingUp } from 'lucide-react';

interface ProfileStatsProps {
  stats?: {
    profileViews?: number;
    connections?: number;
    impressions?: number;
  };
}

export function ProfileStats({ stats = {} }: ProfileStatsProps) {
  const defaultStats = {
    profileViews: 124,
    connections: 45,
    impressions: 892,
    ...stats
  };

  const statItems = [
    {
      icon: Eye,
      label: "Vues du profil",
      value: defaultStats.profileViews,
      change: "+12 cette semaine"
    },
    {
      icon: Users,
      label: "Connexions",
      value: defaultStats.connections,
      change: "Étendez votre réseau"
    },
    {
      icon: TrendingUp,
      label: "Impressions",
      value: defaultStats.impressions,
      change: "+58 cette semaine"
    }
  ];

  return (
    <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
      <CardContent className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
          Statistiques du profil
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {statItems.map((item, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-2">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {item.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {item.label}
              </div>
              <div className="text-xs text-green-600 dark:text-green-400">
                {item.change}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}