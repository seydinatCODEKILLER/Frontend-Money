import { Card, CardContent } from '@/components/ui/card';
import { useRecommendations } from '../hooks/useRecommendations';
import { Lightbulb, TrendingUp, AlertTriangle, PiggyBank } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface RecommendationsStatsProps {
  limit?: number;
}

export function RecommendationsStats({ limit = 5 }: RecommendationsStatsProps) {
  const { data, isLoading } = useRecommendations({
    page: 1,
    limit,
    type: '',
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="rounded-2xl border-0 bg-gradient-to-br from-white to-gray-50/80 dark:from-gray-900 dark:to-gray-800/80 shadow-sm">
            <CardContent className="p-6">
              <Skeleton className="h-6 w-20 mb-2" />
              <Skeleton className="h-4 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const recommendations = data?.recommendations || [];
  
  const stats = {
    total: recommendations.length,
    budgetAlerts: recommendations.filter(r => r.type === 'BUDGET_ALERT').length,
    savingOpportunities: recommendations.filter(r => r.type === 'SAVING_OPPORTUNITY').length,
    investmentSuggestions: recommendations.filter(r => r.type === 'INVESTMENT_SUGGESTION').length,
  };

  const statCards = [
    {
      title: 'Total',
      value: stats.total,
      description: 'Recommandations actives',
      icon: Lightbulb,
      color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400',
    },
    {
      title: 'Alertes Budget',
      value: stats.budgetAlerts,
      description: 'À surveiller',
      icon: AlertTriangle,
      color: 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400',
    },
    {
      title: 'Économies',
      value: stats.savingOpportunities,
      description: 'Opportunités identifiées',
      icon: PiggyBank,
      color: 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400',
    },
    {
      title: 'Investissements',
      value: stats.investmentSuggestions,
      description: 'Suggestions',
      icon: TrendingUp,
      color: 'text-purple-600 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat) => (
        <Card 
          key={stat.title}
          className="rounded-2xl border-0 bg-gradient-to-br from-white to-gray-50/80 dark:from-gray-900 dark:to-gray-800/80 shadow-sm hover:shadow-md transition-all duration-300"
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-1">
                  {stat.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  {stat.description}
                </p>
              </div>
              <div className={`
                w-12 h-12 rounded-xl flex items-center justify-center
                ${stat.color} border border-white/20 shadow-sm
              `}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}