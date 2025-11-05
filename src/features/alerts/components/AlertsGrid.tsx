import { AlertCard } from "./AlertCard";
import { Skeleton } from "@/components/ui/skeleton";
import { RefreshCw, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Alert } from "../types/alert.types";
import { PaginationControls } from "@/components/shared/PaginationControls";
import { useAlert } from "../hooks/useAlert";

interface AlertsGridProps {
  page: number;
  filters: {
    isRead: string;
    type: string;
    sourceType: string;
  };
  onPageChange: (page: number) => void;
}

export function AlertsGrid({
  page,
  filters,
  onPageChange,
}: AlertsGridProps) {
  const { 
    alerts, 
    pagination, 
    isLoading, 
    isError, 
    refetch, 
    markAsReadAsync,
    isMarkingAsRead 
  } = useAlert({
    page,
    pageSize: 12,
    isRead: filters.isRead,
    type: filters.type as 'BUDGET_DEPASSE' | 'SEUIL_ATTEINT' | 'DEPENSE_IMPORTANTE',
    sourceType: filters.sourceType as 'GLOBAL' | 'CATEGORY' | 'TRANSACTION',
  });

  const handleMarkAsRead = async (alert: Alert) => {
    await markAsReadAsync(alert.id);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-80 rounded-2xl" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12">
        <RefreshCw className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground mb-4">
          Erreur lors du chargement des alertes
        </p>
        <Button onClick={() => refetch()} variant="outline">
          Réessayer
        </Button>
      </div>
    );
  }

  if (!alerts || alerts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
          <Bell className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-muted-foreground">
          {filters.isRead || filters.type || filters.sourceType
            ? "Aucune alerte trouvée avec ces critères"
            : "Aucune alerte pour le moment"}
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Vous serez notifié lorsqu'une nouvelle alerte sera générée.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {alerts.map((alert) => (
          <AlertCard
            key={alert.id}
            alert={alert}
            onMarkAsRead={() => handleMarkAsRead(alert)}
            isMarkingAsRead={isMarkingAsRead}
          />
        ))}
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <PaginationControls
            currentPage={page}
            totalPages={pagination.totalPages}
            onPageChange={onPageChange}
            totalItems={pagination.total}
            itemsPerPage={pagination.pageSize}
          />
        </div>
      )}
    </>
  );
}