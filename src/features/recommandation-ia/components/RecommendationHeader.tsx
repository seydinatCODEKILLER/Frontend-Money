// features/recommendations/components/RecommendationHeader.tsx
import { PageHeader } from '@/components/shared/PageHeader';
import { useAuth } from '@/hooks/useAuth';
import { Bot, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGenerateRecommendations } from '../hooks/useRecommendations';

interface RecommendationHeaderProps {
  filters: {
    type: string;
  };
  onFiltersChange: (filters: { type: string }) => void;
  onGenerateNew?: () => void;
}

export function RecommendationHeader({ 
  filters, 
  onFiltersChange,
  onGenerateNew 
}: RecommendationHeaderProps) {
  const { user } = useAuth();
  const generateMutation = useGenerateRecommendations();

  const handleGenerateNew = () => {
    generateMutation.mutate();
    // Appeler la callback parent si fournie
    onGenerateNew?.();
  };

  const handleFilterChange = (value: string) => {
    onFiltersChange({
      ...filters,
      type: value,
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      type: '',
    });
  };

  const hasActiveFilters = filters.type;

  // Actions pour le header
  const headerActions = user?.canUseAI ? [
    {
      label: 'Nouvelles recommandations',
      icon: <Bot className={`w-4 h-4 ${generateMutation.isPending ? 'animate-spin' : ''}`} />,
      onClick: handleGenerateNew,
      variant: 'default' as const,
      disabled: generateMutation.isPending,
    },
  ] : [];

  // Dropdown actions pour les filtres
  const dropdownActions = user?.canUseAI ? [
    {
      label: 'Effacer les filtres',
      icon: <X className="w-4 h-4" />,
      onClick: clearFilters,
      disabled: !hasActiveFilters,
    },
  ] : [];

  // Children content avec les filtres
  const headerChildren = user?.canUseAI ? (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between pt-4">
      {/* Filtres */}
      <div className="flex items-center gap-3">
        <Filter className="w-4 h-4 text-muted-foreground" />
        <Select value={filters.type} onValueChange={handleFilterChange}>
          <SelectTrigger className="w-full sm:w-48 cursor-pointer">
            <SelectValue placeholder="Type de recommandation" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="BUDGET_ALERT">Alertes Budget</SelectItem>
            <SelectItem value="SPENDING_PATTERN">Modes de Dépenses</SelectItem>
            <SelectItem value="SAVING_OPPORTUNITY">Économies</SelectItem>
            <SelectItem value="DEBT_REDUCTION">Réduction Dette</SelectItem>
            <SelectItem value="INVESTMENT_SUGGESTION">Investissements</SelectItem>
            <SelectItem value="CATEGORY_OPTIMIZATION">Optimisations</SelectItem>
            <SelectItem value="GOAL_PROGRESSION">Objectifs</SelectItem>
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button 
            variant="outline" 
            onClick={clearFilters} 
            size="sm" 
            className="cursor-pointer"
          >
            <X className="w-4 h-4 mr-2" />
            Effacer
          </Button>
        )}
      </div>

      {/* Statut de génération */}
      {generateMutation.isPending && (
        <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
          <Bot className="w-4 h-4 animate-spin" />
          <span>Génération des recommandations en cours...</span>
        </div>
      )}
    </div>
  ) : null;

  return (
    <PageHeader
      title="Recommandations Intelligentes"
      description={
        user?.canUseAI
          ? "Des conseils personnalisés basés sur l'analyse de vos transactions par notre IA"
          : "Fonctionnalité premium - Passez à Premium pour débloquer les recommandations IA"
      }
      icon={user?.canUseAI ? "💡" : "👑"}
      badge={user?.canUseAI ? undefined : { text: 'Premium', variant: 'outline' }}
      actions={headerActions}
      dropdownActions={dropdownActions}
    >
      {headerChildren}
    </PageHeader>
  );
}