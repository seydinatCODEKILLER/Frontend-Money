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
import { Edit2, Trash2, ArrowUpDown, RotateCcw, Calendar, Tag } from 'lucide-react';
import type { Transaction } from '../types/transaction.types';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface TransactionsTableProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (transaction: Transaction) => void;
  onRestore?: (transaction: Transaction) => void;
  isLoading?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  onSort?: (field: string) => void;
}

export function TransactionsTable({ 
  transactions, 
  onEdit, 
  onDelete, 
  onRestore,
  isLoading,
  sortBy,
  sortOrder,
  onSort 
}: TransactionsTableProps) {
  const [localSortBy, setLocalSortBy] = useState(sortBy || 'date');
  const [localSortOrder, setLocalSortOrder] = useState<'asc' | 'desc'>(sortOrder || 'desc');

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

  if (!transactions || transactions.length === 0) {
    return (
      <div className="text-center py-16 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
          <span className="text-2xl">💰</span>
        </div>
        <p className="text-gray-500 dark:text-gray-400 font-medium">Aucune transaction trouvée</p>
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
              onClick={() => handleSort('date')}
            >
              <div className="flex items-center gap-1">
                <span>Date</span>
                {getSortIcon('date')}
              </div>
            </TableHead>
            <TableHead 
              className="h-12 font-semibold text-gray-700 dark:text-gray-300 cursor-pointer transition-all duration-200 hover:bg-white/50 dark:hover:bg-gray-700/30"
              onClick={() => handleSort('amount')}
            >
              <div className="flex items-center gap-1">
                <span>Montant</span>
                {getSortIcon('amount')}
              </div>
            </TableHead>
            <TableHead className="h-12 font-semibold text-gray-700 dark:text-gray-300">
              Catégorie
            </TableHead>
            <TableHead className="h-12 font-semibold text-gray-700 dark:text-gray-300">
              Description
            </TableHead>
            <TableHead className="h-12 font-semibold text-gray-700 dark:text-gray-300">
              Type
            </TableHead>
            <TableHead className="h-12 font-semibold text-gray-700 dark:text-gray-300 text-right last:rounded-tr-2xl">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction, index) => {
            const isDeleted = transaction.status === 'DELETED';
            const isExpense = transaction.type === 'DEPENSE';
            const categoryColor = transaction.category?.color || (isExpense ? '#ef4444' : '#10b981');
            const amountColor = isExpense ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400';
            
            return (
              <TableRow 
                key={transaction.id} 
                className={cn(
                  "border-b border-gray-100/30 dark:border-gray-800/30 group transition-all duration-300",
                  "hover:bg-gradient-to-r hover:from-white/80 hover:to-gray-50/50 dark:hover:from-gray-800/50 dark:hover:to-gray-700/30",
                  "backdrop-blur-sm",
                  isDeleted && "opacity-70",
                  index === transactions.length - 1 && "border-b-0"
                )}
                style={{
                  background: index % 2 === 0 
                    ? `linear-gradient(90deg, ${categoryColor}02, transparent 10%)`
                    : 'transparent'
                }}
              >
                {/* Date */}
                <TableCell className="py-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      {format(new Date(transaction.date), 'dd/MM/yyyy', { locale: fr })}
                    </span>
                  </div>
                </TableCell>

                {/* Montant */}
                <TableCell className="py-4">
                  <div className={cn("text-lg font-bold", amountColor)}>
                    {isExpense ? '-' : '+'}{transaction.amount.toLocaleString('fr-FR')}€
                  </div>
                </TableCell>

                {/* Catégorie */}
                <TableCell className="py-4">
                  {transaction.category ? (
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm"
                        style={{ 
                          backgroundColor: transaction.category.color || categoryColor,
                          backgroundImage: `linear-gradient(135deg, ${transaction.category.color || categoryColor}, ${transaction.category.color || categoryColor}dd)`
                        }}
                      >
                        {transaction.category.icon || <Tag className="w-3 h-3" />}
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {transaction.category.name}
                      </span>
                    </div>
                  ) : (
                    <span className="text-gray-400 dark:text-gray-500 italic text-sm">
                      Non catégorisée
                    </span>
                  )}
                </TableCell>

                {/* Description */}
                <TableCell className="py-4">
                  <span className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                    {transaction.description || '-'}
                  </span>
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
                    {isExpense ? "Dépense" : "Revenu"}
                  </Badge>
                </TableCell>

                {/* Actions */}
                <TableCell className="py-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    {isDeleted ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRestore?.(transaction)}
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
                          onClick={() => onEdit(transaction)}
                          className="rounded-xl w-9 h-9 bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 dark:text-blue-300 transition-all duration-300 hover:scale-105 shadow-sm"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDelete(transaction)}
                          className="rounded-xl w-9 h-9 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 dark:bg-red-900/20 dark:hover:bg-red-900/30 dark:text-red-300 transition-all duration-300 hover:scale-105 shadow-sm"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}