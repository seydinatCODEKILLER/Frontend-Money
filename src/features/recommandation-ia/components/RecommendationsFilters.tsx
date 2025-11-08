// features/recommendations/components/RecommendationsFilters.tsx
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { X, Filter, RefreshCw } from 'lucide-react';

interface RecommendationsFiltersProps {
  filters: {
    type: string;
  };
  onFiltersChange: (filters: { type: string }) => void;
  onGenerateNew?: () => void;
  isGenerating?: boolean;
}

export function RecommendationsFilters({ 
  filters, 
  onFiltersChange, 
  onGenerateNew,
  isGenerating 
}: RecommendationsFiltersProps) {
  const handleFilterChange = (key: string, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      type: '',
    });
  };

  const hasActiveFilters = filters.type;

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-muted/30 rounded-lg items-center justify-between">
      <div className="flex flex-col sm:flex-row gap-4 flex-1">
        {/* Filtre par type */}
        <div className="flex items-center gap-3">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <Select value={filters.type} onValueChange={(value) => handleFilterChange('type', value)}>
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
            <Button variant="outline" onClick={clearFilters} size="sm" className="cursor-pointer">
              <X className="w-4 h-4 mr-2" />
              Effacer
            </Button>
          )}
        </div>
      </div>

      {/* Bouton de génération */}
      {onGenerateNew && (
  <Button
    onClick={onGenerateNew}
    disabled={isGenerating}
    className={`
      relative overflow-hidden group transition-all 
      ${isGenerating ? "opacity-80 cursor-wait" : "cursor-pointer"}
    `}
  >
    {/* Effet Halo */}
    <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity"></span>

    {/* Icône */}
    <RefreshCw 
      className={`
        w-4 h-4 mr-2 
        ${isGenerating ? "animate-spin text-purple-600" : "text-blue-600 group-hover:text-purple-600 transition-colors"}
      `}
    />

    {/* Texte */}
    <span className="font-medium">
      {isGenerating ? "Génération intelligente..." : "Générer des recommandations IA"}
    </span>

    {/* Effet glow subtil */}
    <span className="absolute -inset-3 rounded-xl blur-lg bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-40 transition-all"></span>
  </Button>
)}
    </div>
  );
}