import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, Bell, TrendingUp, AlertTriangle, Euro } from 'lucide-react';
import type { Alert, AlertType } from '../types/alert.types';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface AlertCardProps {
  alert: Alert;
  onMarkAsRead: () => void;
  isMarkingAsRead?: boolean;
}

export function AlertCard({ 
  alert, 
  onMarkAsRead, 
  isMarkingAsRead, 
}: AlertCardProps) {
  const getAlertConfig = (type: AlertType) => {
    switch (type) {
      case 'BUDGET_DEPASSE':
        return {
          color: '#ef4444',
          icon: <TrendingUp className="w-4 h-4" />,
          title: 'Budget dépassé',
          variant: 'destructive' as const,
        };
      case 'SEUIL_ATTEINT':
        return {
          color: '#f59e0b',
          icon: <AlertTriangle className="w-4 h-4" />,
          title: 'Seuil atteint',
          variant: 'default' as const,
        };
      case 'DEPENSE_IMPORTANTE':
        return {
          color: '#8b5cf6',
          icon: <Bell className="w-4 h-4" />,
          title: 'Dépense importante',
          variant: 'default' as const,
        };
      default:
        return {
          color: '#6b7280',
          icon: <Bell className="w-4 h-4" />,
          title: 'Alerte',
          variant: 'default' as const,
        };
    }
  };

  const config = getAlertConfig(alert.type);
  const categoryColor = alert.category?.color || config.color;

  return (
    <Card
      className={cn(
        "group relative overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-white to-gray-50/80 dark:from-gray-900 dark:to-gray-800/80",
        "shadow-sm hover:shadow-xl transition-all duration-500 ease-out hover:-translate-y-2",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/50 before:to-transparent before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100",
        !alert.isRead && "ring-2 ring-blue-500/20"
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

      {/* Badge non lu */}
      {!alert.isRead && (
        <div className="absolute top-3 right-3">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
        </div>
      )}

      <CardContent className="p-6 relative z-10">
        {/* Header avec type et catégorie */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg",
                "backdrop-blur-sm border border-white/20 shadow-sm"
              )}
              style={{
                backgroundColor: `${categoryColor}15`,
                color: categoryColor,
                boxShadow: `0 4px 20px ${categoryColor}20, inset 0 1px 0 ${categoryColor}10`
              }}
            >
              {config.icon}
            </div>
            
            <div className="flex flex-col">
              <h3 className="font-semibold text-gray-900 dark:text-white tracking-tight leading-tight">
                {config.title}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge 
                  variant={config.variant}
                  className="rounded-lg px-2 py-0.5 text-xs font-medium border-0 shadow-sm"
                >
                  {config.icon}
                  {config.title}
                </Badge>

                {alert.category && (
                  <Badge 
                    variant="outline"
                    className="rounded-lg px-2 py-0.5 text-xs border-0 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                  >
                    {alert.category.icon} {alert.category.name}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div 
          className="w-full h-px my-4 opacity-20"
          style={{ backgroundColor: categoryColor }}
        />

        {/* Message et détails */}
        <div className="space-y-3">
          {/* Message */}
          <div className="p-3 rounded-lg bg-gradient-to-r from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-900/50 border border-gray-100 dark:border-gray-700">
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {alert.message}
            </p>
          </div>

          {/* Montants */}
          {(alert.amount || alert.threshold) && (
            <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-900/50 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-4">
                {alert.amount && (
                  <div className="flex items-center gap-2">
                    <Euro className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      Montant: <span className="font-bold text-gray-900 dark:text-white">{alert.amount.toLocaleString('fr-FR')}€</span>
                    </span>
                  </div>
                )}
                {alert.threshold && (
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      Seuil: <span className="font-bold text-gray-900 dark:text-white">{alert.threshold.toLocaleString('fr-FR')}€</span>
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Date */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span>Reçue le</span>
            </div>
            <span className="font-medium text-gray-900 dark:text-white text-sm">
              {format(new Date(alert.createdAt), 'dd MMM yyyy à HH:mm', { locale: fr })}
            </span>
          </div>
        </div>
      </CardContent>

      {/* Actions */}
      <CardFooter className="p-4 pt-2 bg-gradient-to-t from-white/80 to-transparent dark:from-gray-900/80 backdrop-blur-sm border-t border-gray-100/50 dark:border-gray-700/50">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2">
            {alert.isRead ? (
              <Badge variant="outline" className="rounded-lg px-2 py-1 text-xs bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300">
                <EyeOff className="w-3 h-3 mr-1" />
                Lu
              </Badge>
            ) : (
              <Badge variant="outline" className="rounded-lg px-2 py-1 text-xs bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                <Eye className="w-3 h-3 mr-1" />
                Non lu
              </Badge>
            )}
          </div>

          <div className="flex gap-2">
            {!alert.isRead && (
              <Button
                size="sm"
                variant="secondary"
                disabled={isMarkingAsRead}
                onClick={onMarkAsRead}
                className="rounded-xl px-3 py-2 h-auto bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 dark:text-blue-300 transition-all duration-300"
              >
                <Eye className="w-4 h-4 mr-2" />
                Marquer comme lu
              </Button>
            )}
          </div>
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