import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CategoriesFiltersProps {
  filters: {
    search: string;
    type: string;
    status: string;
  };
  onFiltersChange: (filters: { search: string; type: string; status: string }) => void;
}

export function CategoriesFilters({ filters, onFiltersChange }: CategoriesFiltersProps) {
  const [localSearch, setLocalSearch] = useState(filters.search);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onFiltersChange({
        ...filters,
        search: localSearch,
      });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [localSearch, onFiltersChange]);

  const handleTypeChange = (type: string) => {
    onFiltersChange({
      ...filters,
      type,
    });
  };

  const handleStatusChange = (status: string) => {
    onFiltersChange({
      ...filters,
      status,
    });
  };

  const clearFilters = () => {
    setLocalSearch('');
    onFiltersChange({
      search: '',
      type: '',
      status: 'ACTIVE',
    });
  };

  const hasActiveFilters = localSearch || filters.type || filters.status;

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-muted/30 rounded-lg">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Rechercher une catégorie..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <Select value={filters.type} onValueChange={handleTypeChange}>
        <SelectTrigger className="w-full sm:w-48 cursor-pointer">
          <SelectValue placeholder="Type de transaction" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="DEPENSE">Dépenses</SelectItem>
          <SelectItem value="REVENUE">Revenus</SelectItem>
        </SelectContent>
      </Select>

      <Select value={filters.status} onValueChange={handleStatusChange}>
        <SelectTrigger className="w-full sm:w-48 cursor-pointer">
          <SelectValue placeholder="Statut" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ACTIVE">Actives</SelectItem>
          <SelectItem value="DELETED">Supprimées</SelectItem>
          <SelectItem value="ALL">Toutes</SelectItem>
        </SelectContent>
      </Select>

      {hasActiveFilters && (
        <Button variant="outline" onClick={clearFilters} className='cursor-pointer'>
          <X className="w-4 h-4 mr-2" />
          Effacer
        </Button>
      )}
    </div>
  );
}