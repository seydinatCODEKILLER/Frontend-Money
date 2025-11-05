// components/alerts/AlertsFilters.tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface AlertsFiltersProps {
  filters: {
    isRead: string;
    type: string;
    sourceType: string;
  };
  onFiltersChange: (filters: { isRead: string; type: string; sourceType: string }) => void;
}

export function AlertsFilters({ filters, onFiltersChange }: AlertsFiltersProps) {
  const handleFilterChange = (key: string, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      isRead: '',
      type: '',
      sourceType: '',
    });
  };

  const hasActiveFilters = filters.isRead || filters.type || filters.sourceType;

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-muted/30 rounded-lg">
      <Select value={filters.isRead} onValueChange={(value) => handleFilterChange('isRead', value)}>
        <SelectTrigger className="w-full sm:w-48 cursor-pointer">
          <SelectValue placeholder="Statut de lecture" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="false">Non lues</SelectItem>
          <SelectItem value="true">Lues</SelectItem>
        </SelectContent>
      </Select>

      <Select value={filters.type} onValueChange={(value) => handleFilterChange('type', value)}>
        <SelectTrigger className="w-full sm:w-48 cursor-pointer">
          <SelectValue placeholder="Type d'alerte" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="BUDGET_DEPASSE">Budget dépassé</SelectItem>
          <SelectItem value="SEUIL_ATTEINT">Seuil atteint</SelectItem>
          <SelectItem value="DEPENSE_IMPORTANTE">Dépense importante</SelectItem>
        </SelectContent>
      </Select>

      <Select value={filters.sourceType} onValueChange={(value) => handleFilterChange('sourceType', value)}>
        <SelectTrigger className="w-full sm:w-48 cursor-pointer">
          <SelectValue placeholder="Source" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="GLOBAL">Globale</SelectItem>
          <SelectItem value="CATEGORY">Catégorie</SelectItem>
          <SelectItem value="TRANSACTION">Transaction</SelectItem>
        </SelectContent>
      </Select>

      {hasActiveFilters && (
        <Button variant="outline" onClick={clearFilters} className="cursor-pointer">
          <X className="w-4 h-4 mr-2" />
          Effacer
        </Button>
      )}
    </div>
  );
}