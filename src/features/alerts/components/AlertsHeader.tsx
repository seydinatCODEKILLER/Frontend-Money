import { PrebuiltPageHeader } from '@/components/shared/PageHeader';
import { useAlertStats } from '../hooks/useAlert';
import { Bell, AlertTriangle, CheckCircle } from 'lucide-react';

export function AlertsHeader() {
  const { data: stats } = useAlertStats();

  const statsData = stats ? [
    {
      label: 'Total',
      value: stats.totalCount,
      icon: <Bell className="w-4 h-4" />
    },
    {
      label: 'Non lues',
      value: stats.unreadCount,
      change: stats.totalCount > 0 ? Math.round((stats.unreadCount / stats.totalCount) * 100) : 0,
      icon: <AlertTriangle className="w-4 h-4" />
    },
    {
      label: 'Lues',
      value: stats.totalCount - stats.unreadCount,
      icon: <CheckCircle className="w-4 h-4" />
    }
  ] : [];

  return (
    <PrebuiltPageHeader
      title="Alertes Budget"
      description="Surveillez vos budgets et dépenses en temps réel"
      icon="🚨"
      variant={stats ? "with-stats" : "simple"}
      stats={statsData}
      badge={stats && stats.unreadCount > 0 ? {
        text: `${stats.unreadCount} non lue${stats.unreadCount !== 1 ? 's' : ''}`,
        variant: 'destructive'
      } : undefined}
    />
  );
}