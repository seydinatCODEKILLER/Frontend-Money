// features/recommendations/components/RecommendationCard.tsx
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Lightbulb, TrendingUp, TrendingDown, PiggyBank, AlertTriangle, Target, Zap } from 'lucide-react';
import type { FinancialRecommendation } from '../types/recommendation.types';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface RecommendationCardProps {
  recommendation: FinancialRecommendation;
  onDelete: () => void;
  isDeleting?: boolean;
}

export function RecommendationCard({ 
  recommendation, 
  onDelete, 
  isDeleting 
}: RecommendationCardProps) {
  const getTypeConfig = (type: string) => {
    const configs = {
      BUDGET_ALERT: { 
        icon: AlertTriangle, 
        color: 'text-red-600 bg-red-50 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800',
        badgeColor: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
      },
      SPENDING_PATTERN: { 
        icon: TrendingDown, 
        color: 'text-orange-600 bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800',
        badgeColor: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
      },
      SAVING_OPPORTUNITY: { 
        icon: PiggyBank, 
        color: 'text-green-600 bg-green-50 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800',
        badgeColor: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
      },
      DEBT_REDUCTION: { 
        icon: TrendingDown, 
        color: 'text-purple-600 bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800',
        badgeColor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
      },
      INVESTMENT_SUGGESTION: { 
        icon: TrendingUp, 
        color: 'text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800',
        badgeColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
      },
      CATEGORY_OPTIMIZATION: { 
        icon: Zap, 
        color: 'text-yellow-600 bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800',
        badgeColor: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
      },
      GOAL_PROGRESSION: { 
        icon: Target, 
        color: 'text-indigo-600 bg-indigo-50 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-400 dark:border-indigo-800',
        badgeColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300'
      }
    };

    return configs[type as keyof typeof configs] || { 
      icon: Lightbulb, 
      color: 'text-gray-600 bg-gray-50 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800',
      badgeColor: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300'
    };
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      BUDGET_ALERT: 'Alerte Budget',
      SPENDING_PATTERN: 'Mode de Dépenses',
      SAVING_OPPORTUNITY: 'Économie',
      DEBT_REDUCTION: 'Réduction Dette',
      INVESTMENT_SUGGESTION: 'Investissement',
      CATEGORY_OPTIMIZATION: 'Optimisation',
      SUBSCRIPTION_REVIEW: 'Abonnements',
      INCOME_OPTIMIZATION: 'Revenus',
      GOAL_PROGRESSION: 'Objectifs',
      SYSTEM_SUGGESTION: 'Suggestion'
    };
    return labels[type] || type;
  };

  const { icon: Icon, color, badgeColor } = getTypeConfig(recommendation.type);
  const categoryColor = recommendation.category?.color || '#6b7280';

  return (
    <Card
      className={cn(
        "group relative overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-white to-gray-50/80 dark:from-gray-900 dark:to-gray-800/80",
        "shadow-sm hover:shadow-xl transition-all duration-500 ease-out hover:-translate-y-2",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/50 before:to-transparent before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100"
      )}
      style={{
        background: `linear-gradient(135deg, ${categoryColor}08, ${categoryColor}02 40%, transparent 100%)`,
      }}
    >
      {/* Accent color bar */}
      <div 
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-20"
        style={{ color: categoryColor }}
      />

      <CardContent className="p-3 md:p-6 relative z-10">
        {/* Header avec type et badge */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg",
                "backdrop-blur-sm border border-white/20 shadow-sm",
                color
              )}
            >
              <Icon className="w-5 h-5" />
            </div>
            
            <div className="flex flex-col">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">
                {recommendation.title}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge 
                  className={cn("rounded-lg px-2 py-0.5 text-xs font-medium border-0 shadow-sm", badgeColor)}
                >
                  {getTypeLabel(recommendation.type)}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div 
          className="w-full h-px my-4 opacity-20"
          style={{ backgroundColor: categoryColor }}
        />

        {/* Message de recommandation */}
        <div className="space-y-3">
          <div className="p-3 rounded-lg bg-gradient-to-r from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-900/50 border border-gray-100 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {recommendation.message}
            </p>
          </div>

          {/* Catégorie concernée */}
          {recommendation.category && (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-900/50 border border-gray-100 dark:border-gray-700">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm"
                style={{ 
                  backgroundColor: recommendation.category.color || categoryColor,
                  backgroundImage: `linear-gradient(135deg, ${recommendation.category.color || categoryColor}, ${recommendation.category.color || categoryColor}dd)`
                }}
              >
                {recommendation.category.icon || '📊'}
              </div>
              <div className="flex-1">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Concerné: {recommendation.category.name}
                </span>
              </div>
            </div>
          )}

          {/* Date */}
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <span>Généré le</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {format(new Date(recommendation.createdAt), 'dd MMM yyyy à HH:mm', { locale: fr })}
            </span>
          </div>
        </div>
      </CardContent>

      {/* Actions */}
      <CardFooter className="pt-2 p-2 bg-gradient-to-t from-white/80 to-transparent dark:from-gray-900/80 backdrop-blur-sm border-t border-gray-100/50 dark:border-gray-700/50">
        <div className="flex justify-end gap-2 w-full">
          <Button
            size="icon"
            variant="ghost"
            disabled={isDeleting}
            onClick={onDelete}
            className="rounded-xl w-10 h-10 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 dark:bg-red-900/20 dark:hover:bg-red-900/30 dark:text-red-300 transition-all duration-300 hover:scale-105 disabled:opacity-40 disabled:hover:scale-100 cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardFooter>

      {/* Effet de hover gradient */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${categoryColor}08, transparent 50%)`
        }}
      />
    </Card>
  );
}