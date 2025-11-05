
import {useAlertStats } from '../hooks/useAlert';

export function AlertsHeader() {
  const { data: stats } = useAlertStats();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-yellow-600 bg-clip-text text-transparent">
          Alertes Budget
        </h1>
        <p className="text-muted-foreground mt-2">
          {stats ? (
            <>
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {stats.unreadCount} alerte{stats.unreadCount !== 1 ? 's' : ''} non lue{stats.unreadCount !== 1 ? 's' : ''}
              </span>
              {' '}sur {stats.totalCount} au total
            </>
          ) : (
            "Surveillez vos budgets et dépenses"
          )}
        </p>
      </div>
    </div>
  );
}