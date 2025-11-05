import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit2, Trash2, Euro, RotateCcw, Calendar, Tag, TrendingUp, TrendingDown } from 'lucide-react';
import type { Transaction } from '../types/transaction.types';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface TransactionCardProps {
  transaction: Transaction;
  onEdit: () => void;
  onDelete: () => void;
  onRestore?: () => void;
  isDeleting?: boolean;
  isRestoring?: boolean;
}

export function TransactionCard({ 
  transaction, 
  onEdit, 
  onDelete, 
  onRestore, 
  isDeleting, 
  isRestoring 
}: TransactionCardProps) {
  const isDeleted = transaction.status === 'DELETED';
  const isExpense = transaction.type === 'DEPENSE';
  const categoryColor = transaction.category?.color || (isExpense ? '#ef4444' : '#10b981');
  const amountColor = isExpense ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400';

  return (
    <Card
      className={cn(
        "group relative overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-white to-gray-50/80 dark:from-gray-900 dark:to-gray-800/80",
        "shadow-sm hover:shadow-xl transition-all duration-500 ease-out hover:-translate-y-2",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/50 before:to-transparent before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100",
        isDeleted && "opacity-70 grayscale"
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

      <CardContent className="p-6 relative z-10">
        {/* Header avec montant et type */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg",
                "backdrop-blur-sm border border-white/20 shadow-sm",
                isExpense ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"
              )}
            >
              <Euro className="w-5 h-5" />
            </div>
            
            <div className="flex flex-col">
              <div className={cn("text-2xl font-bold", amountColor)}>
                {transaction.amount.toLocaleString('fr-FR')}€
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Badge 
                  variant={isExpense ? "destructive" : "default"}
                  className="rounded-lg px-2 py-0.5 text-xs font-medium border-0 shadow-sm"
                >
                <div className="flex items-center gap-1">
                  {isExpense ? (
                    <TrendingDown className="w-3 h-3" />
                    ) : (
                      <TrendingUp className="w-3 h-3" />
                    )}
                    {isExpense ? "Dépense" : "Revenu"}
                </div>
                  </Badge>
              </div>
            </div>
          </div>

          {/* Statut */}
          <div className="flex flex-col items-end gap-1">
            {isDeleted && (
              <Badge 
                variant="destructive" 
                className="rounded-lg px-2 py-0.5 text-xs bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 border-0"
              >
                Supprimée
              </Badge>
            )}
          </div>
        </div>

        {/* Separator */}
        <div 
          className="w-full h-px my-4 opacity-20"
          style={{ backgroundColor: categoryColor }}
        />

        {/* Informations détaillées */}
        <div className="space-y-3">
          {/* Catégorie */}
          {transaction.category && (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-900/50 border border-gray-100 dark:border-gray-700">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                style={{ 
                  backgroundColor: transaction.category.color || categoryColor,
                  backgroundImage: `linear-gradient(135deg, ${transaction.category.color || categoryColor}, ${transaction.category.color || categoryColor}dd)`
                }}
              >
                {transaction.category.icon || <Tag className="w-3 h-3" />}
              </div>
              <div className="flex-1">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {transaction.category.name}
                </span>
              </div>
            </div>
          )}

          {/* Description */}
          {transaction.description && (
            <div className="p-3 rounded-lg bg-gradient-to-r from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-900/50 border border-gray-100 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                {transaction.description}
              </p>
            </div>
          )}

          {/* Date */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>Date</span>
            </div>
            <span className="font-medium text-gray-900 dark:text-white">
              {format(new Date(transaction.date), 'dd MMM yyyy', { locale: fr })}
            </span>
          </div>
        </div>
      </CardContent>

      {/* Actions */}
      <CardFooter className="p-4 pt-2 bg-gradient-to-t from-white/80 to-transparent dark:from-gray-900/80 backdrop-blur-sm border-t border-gray-100/50 dark:border-gray-700/50">
        <div className="flex justify-end gap-2 w-full">
          {isDeleted ? (
            <Button
              size="sm"
              variant="ghost"
              disabled={isRestoring}
              onClick={onRestore}
              className="rounded-xl px-3 py-2 h-auto bg-green-50 hover:bg-green-100 text-green-700 hover:text-green-800 dark:bg-green-900/20 dark:hover:bg-green-900/30 dark:text-green-300 transition-all duration-300 group/restore"
            >
              <RotateCcw className="w-4 h-4 mr-2 transition-transform group-hover/restore:rotate-180" />
              Restaurer
            </Button>
          ) : (
            <>
              <Button
                size="icon"
                variant="ghost"
                onClick={onEdit}
                className="rounded-xl w-10 h-10 bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 dark:text-blue-300 transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <Edit2 className="w-4 h-4" />
              </Button>

              <Button
                size="icon"
                variant="ghost"
                disabled={isDeleting}
                onClick={onDelete}
                className="rounded-xl w-10 h-10 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 dark:bg-red-900/20 dark:hover:bg-red-900/30 dark:text-red-300 transition-all duration-300 hover:scale-105 disabled:opacity-40 disabled:hover:scale-100 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </>
          )}
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