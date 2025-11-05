import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit2, Trash2, Euro, ArrowUpDown, RotateCcw, TrendingUp, TrendingDown } from 'lucide-react';
import type { Category } from '../types/category.types';
import { cn } from '@/lib/utils';

interface CategoriesTableProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  onRestore?: (category: Category) => void;
  isLoading?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  onSort?: (field: string) => void;
}

export function CategoriesTable({ 
  categories, 
  onEdit, 
  onDelete, 
  onRestore,
  isLoading,
  sortBy,
  sortOrder,
  onSort 
}: CategoriesTableProps) {
  const [localSortBy, setLocalSortBy] = useState(sortBy || 'name');
  const [localSortOrder, setLocalSortOrder] = useState<'asc' | 'desc'>(sortOrder || 'asc');

  const handleSort = (field: string) => {
    const newOrder = localSortBy === field && localSortOrder === 'asc' ? 'desc' : 'asc';
    setLocalSortBy(field);
    setLocalSortOrder(newOrder);
    onSort?.(field);
  };

  const getSortIcon = (field: string) => {
    if (localSortBy !== field) {
      return <ArrowUpDown className="w-3 h-3 ml-1 opacity-40" />;
    }
    return localSortOrder === 'asc' 
      ? <ArrowUpDown className="w-3 h-3 ml-1 text-blue-500" />
      : <ArrowUpDown className="w-3 h-3 ml-1 text-blue-500 rotate-180" />;
  };

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-200/50 dark:border-gray-700/50 hover:bg-transparent">
              {[...Array(6)].map((_, i) => (
                <TableHead key={i} className="h-12">
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg animate-pulse" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, i) => (
              <TableRow key={i} className="border-b border-gray-100/50 dark:border-gray-800/50 hover:bg-transparent">
                {[...Array(6)].map((_, j) => (
                  <TableCell key={j} className="h-14">
                    <div className="h-4 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-lg animate-pulse" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <div className="text-center py-16 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
          <span className="text-2xl">📁</span>
        </div>
        <p className="text-gray-500 dark:text-gray-400 font-medium">Aucune catégorie trouvée</p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
          Essayez de modifier vos filtres de recherche
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm overflow-hidden shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-gray-50 to-gray-25 dark:from-gray-800/50 dark:to-gray-900/20 hover:bg-gray-50/80 dark:hover:bg-gray-800/30">
            <TableHead 
              className="h-12 font-semibold text-gray-700 dark:text-gray-300 cursor-pointer transition-all duration-200 hover:bg-white/50 dark:hover:bg-gray-700/30 first:rounded-tl-2xl"
              onClick={() => handleSort('name')}
            >
              <div className="flex items-center gap-1">
                <span>Catégorie</span>
                {getSortIcon('name')}
              </div>
            </TableHead>
            <TableHead 
              className="h-12 font-semibold text-gray-700 dark:text-gray-300 cursor-pointer transition-all duration-200 hover:bg-white/50 dark:hover:bg-gray-700/30"
              onClick={() => handleSort('type')}
            >
              <div className="flex items-center gap-1">
                <span>Type</span>
                {getSortIcon('type')}
              </div>
            </TableHead>
            <TableHead 
              className="h-12 font-semibold text-gray-700 dark:text-gray-300 cursor-pointer transition-all duration-200 hover:bg-white/50 dark:hover:bg-gray-700/30"
              onClick={() => handleSort('budgetLimit')}
            >
              <div className="flex items-center gap-1">
                <span>Budget</span>
                {getSortIcon('budgetLimit')}
              </div>
            </TableHead>
            <TableHead className="h-12 font-semibold text-gray-700 dark:text-gray-300">
              Transactions
            </TableHead>
            <TableHead className="h-12 font-semibold text-gray-700 dark:text-gray-300">
              Statut
            </TableHead>
            <TableHead className="h-12 font-semibold text-gray-700 dark:text-gray-300 text-right last:rounded-tr-2xl">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category, index) => {
            const isDeleted = category.status === 'DELETED';
            const isExpense = category.type === 'DEPENSE';
            const categoryColor = category.color || (isExpense ? '#ef4444' : '#10b981');
            const transactionCount = category._count?.transactions || 0;
            
            return (
              <TableRow 
                key={category.id} 
                className={cn(
                  "border-b border-gray-100/30 dark:border-gray-800/30 group transition-all duration-300",
                  "hover:bg-gradient-to-r hover:from-white/80 hover:to-gray-50/50 dark:hover:from-gray-800/50 dark:hover:to-gray-700/30",
                  "backdrop-blur-sm",
                  isDeleted && "opacity-70",
                  index === categories.length - 1 && "border-b-0"
                )}
                style={{
                  background: index % 2 === 0 
                    ? `linear-gradient(90deg, ${categoryColor}02, transparent 10%)`
                    : 'transparent'
                }}
              >
                {/* Catégorie */}
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110",
                        "shadow-sm border border-white/20 backdrop-blur-sm"
                      )}
                      style={{
                        backgroundColor: categoryColor,
                        backgroundImage: `linear-gradient(135deg, ${categoryColor}, ${categoryColor}dd)`,
                        boxShadow: `0 4px 12px ${categoryColor}30`
                      }}
                    >
                      {category.icon || (isExpense ? '📤' : '📥')}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-900 dark:text-white leading-tight">
                        {category.name}
                      </span>
                      <div className="flex items-center gap-2 mt-1">
                        <div 
                          className="w-2 h-2 rounded-full animate-pulse"
                          style={{ backgroundColor: transactionCount > 0 ? categoryColor : '#9ca3af' }}
                        />
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {transactionCount} trans.
                        </span>
                      </div>
                    </div>
                  </div>
                </TableCell>

                {/* Type */}
                <TableCell className="py-4">
                  <Badge 
                    variant={isExpense ? "destructive" : "default"}
                    className={cn(
                      "rounded-lg px-3 py-1.5 border-0 shadow-sm font-medium",
                      "transition-all duration-300 group-hover:shadow-md"
                    )}
                  >
                    <div className="flex items-center gap-1.5">
                      {isExpense ? (
                        <TrendingDown className="w-3 h-3" />
                      ) : (
                        <TrendingUp className="w-3 h-3" />
                      )}
                      {isExpense ? "Dépense" : "Revenu"}
                    </div>
                  </Badge>
                </TableCell>

                {/* Budget */}
                <TableCell className="py-4">
                  {category.budgetLimit ? (
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-gradient-to-r from-gray-50 to-white dark:from-gray-800/30 dark:to-gray-700/20 border border-gray-100 dark:border-gray-700/50">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{
                          backgroundColor: `${categoryColor}15`,
                          color: categoryColor,
                        }}
                      >
                        <Euro className="w-3 h-3" />
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {category.budgetLimit.toLocaleString('fr-FR')}€
                      </span>
                    </div>
                  ) : (
                    <span className="text-gray-400 dark:text-gray-500 italic text-sm">
                      Non défini
                    </span>
                  )}
                </TableCell>

                {/* Transactions */}
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-500 ease-out"
                          style={{
                            width: `${Math.min((transactionCount / 10) * 100, 100)}%`,
                            backgroundColor: categoryColor,
                            boxShadow: `0 0 8px ${categoryColor}40`
                          }}
                        />
                      </div>
                    </div>
                    <span className={cn(
                      "font-medium text-sm min-w-8 text-right",
                      transactionCount > 0 ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-500"
                    )}>
                      {transactionCount}
                    </span>
                  </div>
                </TableCell>

                {/* Statut */}
                <TableCell className="py-4">
                  <div className="flex flex-col gap-1.5">
                    <Badge 
                      variant={category.isDefault ? "secondary" : "outline"}
                      className="rounded-lg px-2 py-1 text-xs border-0 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                    >
                      {category.isDefault ? 'Système' : 'Personnalisée'}
                    </Badge>
                    {isDeleted && (
                      <Badge 
                        variant="destructive" 
                        className="rounded-lg px-2 py-1 text-xs bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 border-0"
                      >
                        Supprimée
                      </Badge>
                    )}
                  </div>
                </TableCell>

                {/* Actions */}
                <TableCell className="py-4 text-right">
                  {!category.isDefault && (
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                      {isDeleted ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRestore?.(category)}
                          className="rounded-xl px-3 py-2 h-auto bg-green-50 hover:bg-green-100 text-green-700 hover:text-green-800 dark:bg-green-900/20 dark:hover:bg-green-900/30 dark:text-green-300 transition-all duration-300 hover:scale-105 shadow-sm"
                        >
                          <RotateCcw className="w-3 h-3 mr-1.5" />
                          Restaurer
                        </Button>
                      ) : (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onEdit(category)}
                            className="rounded-xl w-9 h-9 bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 dark:text-blue-300 transition-all duration-300 hover:scale-105 shadow-sm"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onDelete(category)}
                            disabled={transactionCount > 0}
                            className="rounded-xl w-9 h-9 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 dark:bg-red-900/20 dark:hover:bg-red-900/30 dark:text-red-300 transition-all duration-300 hover:scale-105 shadow-sm disabled:opacity-40 disabled:hover:scale-100"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </>
                      )}
                    </div>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}