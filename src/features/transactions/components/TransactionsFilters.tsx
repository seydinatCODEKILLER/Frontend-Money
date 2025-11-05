import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, X, Calendar } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { useCategories } from '@/features/categories/hooks/useCategories';

interface TransactionsFiltersProps {
  filters: {
    search: string;
    type: string;
    categoryId: string;
    startDate: string;
    endDate: string;
    status: string;
  };
  onFiltersChange: (filters: { search: string; type: string; categoryId: string; startDate: string; endDate: string; status: string }) => void;
}

export function TransactionsFilters({ filters, onFiltersChange }: TransactionsFiltersProps) {
  const [localSearch, setLocalSearch] = useState(filters.search);
  const { data: categoriesData } = useCategories({ page: 1, limit: 100, status: 'ACTIVE', search: '', type: '' });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onFiltersChange({
        ...filters,
        search: localSearch,
      });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [localSearch, onFiltersChange]);

  const handleFilterChange = (key: string, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const handleDateChange = (key: 'startDate' | 'endDate', date: Date | undefined) => {
    onFiltersChange({
      ...filters,
      [key]: date ? format(date, 'yyyy-MM-dd') : '',
    });
  };

  const clearFilters = () => {
    setLocalSearch('');
    onFiltersChange({
      search: '',
      type: '',
      categoryId: '',
      startDate: '',
      endDate: '',
      status: 'ACTIVE',
    });
  };

  const hasActiveFilters = localSearch || filters.type || filters.categoryId || filters.startDate || filters.endDate;

  return (
    <div className="flex flex-col gap-4 p-4 bg-muted/30 rounded-lg">
      {/* Ligne 1: Recherche et Type */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Rechercher une transaction..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={filters.type} onValueChange={(value) => handleFilterChange('type', value)}>
          <SelectTrigger className="w-full sm:w-48 cursor-pointer">
            <SelectValue placeholder="Type de transaction" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="DEPENSE">Dépenses</SelectItem>
            <SelectItem value="REVENUE">Revenus</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.categoryId} onValueChange={(value) => handleFilterChange('categoryId', value)}>
          <SelectTrigger className="w-full sm:w-48 cursor-pointer">
            <SelectValue placeholder="Catégorie" />
          </SelectTrigger>
          <SelectContent>
            {categoriesData?.categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                <div className="flex items-center gap-2">
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Ligne 2: Dates et Statut */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full sm:w-48 justify-start text-left font-normal",
                !filters.startDate && "text-muted-foreground"
              )}
            >
              <Calendar className="w-4 h-4 mr-2" />
              {filters.startDate ? format(new Date(filters.startDate), 'dd/MM/yyyy', { locale: fr }) : "Date de début"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <CalendarComponent
              mode="single"
              selected={filters.startDate ? new Date(filters.startDate) : undefined}
              onSelect={(date) => handleDateChange('startDate', date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full sm:w-48 justify-start text-left font-normal",
                !filters.endDate && "text-muted-foreground"
              )}
            >
              <Calendar className="w-4 h-4 mr-2" />
              {filters.endDate ? format(new Date(filters.endDate), 'dd/MM/yyyy', { locale: fr }) : "Date de fin"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <CalendarComponent
              mode="single"
              selected={filters.endDate ? new Date(filters.endDate) : undefined}
              onSelect={(date) => handleDateChange('endDate', date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
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
          <Button variant="outline" onClick={clearFilters} className="cursor-pointer">
            <X className="w-4 h-4 mr-2" />
            Effacer
          </Button>
        )}
      </div>
    </div>
  );
}