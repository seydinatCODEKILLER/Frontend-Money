// components/reports/ReportFilters.tsx
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar, Download, FileText } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import type { ReportType, ReportFilters as ReportFiltersType } from '../types/report.types';
import { useCategories } from '@/features/categories/hooks/useCategories';

interface ReportFiltersProps {
  onGenerate: (filters: ReportFiltersType) => void;
  isGenerating: boolean;
}

export function ReportFilters({ onGenerate, isGenerating }: ReportFiltersProps) {
  const [filters, setFilters] = useState<ReportFiltersType>({
    reportType: '' as ReportType,
    startDate: '',
    endDate: '',
    categoryId: '',
  });

  const { data: categoriesData } = useCategories({ page: 1, limit: 100, status: 'ACTIVE', search: '', type: '' });

  const handleFilterChange = (key: keyof ReportFiltersType, value: string) => {
    const newFilters = {
      ...filters,
      [key]: value,
    };
    setFilters(newFilters);
  };

  const handleDateChange = (key: 'startDate' | 'endDate', date: Date | undefined) => {
    const newFilters = {
      ...filters,
      [key]: date ? format(date, 'yyyy-MM-dd') : '',
    };
    setFilters(newFilters);
  };

  const handleGenerate = () => {
    if (!filters.reportType || !filters.startDate || !filters.endDate) {
      return;
    }
    onGenerate(filters);
  };

  const isFormValid = filters.reportType && filters.startDate && filters.endDate;

  const defaultStartDate = new Date();
  defaultStartDate.setMonth(defaultStartDate.getMonth() - 1);
  const defaultEndDate = new Date();

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-3 md:p-6">
      <div className="flex items-center gap-2 mb-6">
        <FileText className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Générer un Rapport
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Type de rapport */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Type de rapport *
          </label>
          <Select
            value={filters.reportType}
            onValueChange={(value) => handleFilterChange('reportType', value as ReportType)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez un type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly-summary">Synthèse Mensuelle</SelectItem>
              <SelectItem value="category-breakdown">Répartition par Catégorie</SelectItem>
              <SelectItem value="budget-vs-actual">Budget vs Réel</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date de début */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Date de début *
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !filters.startDate && "text-muted-foreground"
                )}
              >
                <Calendar className="w-4 h-4 mr-2" />
                {filters.startDate ? (
                  format(new Date(filters.startDate), 'dd/MM/yyyy', { locale: fr })
                ) : (
                  <span>JJ/MM/AAAA</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent
                mode="single"
                selected={filters.startDate ? new Date(filters.startDate) : defaultStartDate}
                onSelect={(date) => handleDateChange('startDate', date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Date de fin */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Date de fin *
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !filters.endDate && "text-muted-foreground"
                )}
              >
                <Calendar className="w-4 h-4 mr-2" />
                {filters.endDate ? (
                  format(new Date(filters.endDate), 'dd/MM/yyyy', { locale: fr })
                ) : (
                  <span>JJ/MM/AAAA</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent
                mode="single"
                selected={filters.endDate ? new Date(filters.endDate) : defaultEndDate}
                onSelect={(date) => handleDateChange('endDate', date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Catégorie (optionnel) */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Catégorie
          </label>
          <Select
            value={filters.categoryId}
            onValueChange={(value) => handleFilterChange('categoryId', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Toutes les catégories" />
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
      </div>

      {/* Bouton de génération */}
      <div className="flex justify-end mt-6">
        <Button
          onClick={handleGenerate}
          disabled={!isFormValid || isGenerating}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Génération...
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              Générer le PDF
            </>
          )}
        </Button>
      </div>
    </div>
  );
}