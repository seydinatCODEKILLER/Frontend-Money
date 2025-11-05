// features/alerts/components/NotificationsMenu.tsx
import {
  Bell,
  TrendingUp,
  AlertTriangle,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useAlert } from "@/features/alerts/hooks/useAlert";
import { useAlertStats } from "@/features/alerts/hooks/useAlertStats";
import type { Alert } from "@/features/alerts/types/alert.types";

// Utilitaires pour les alertes
const getAlertIcon = (type: Alert["type"]) => {
  switch (type) {
    case "BUDGET_DEPASSE":
      return <AlertTriangle className="h-4 w-4 text-destructive" />;
    case "SEUIL_ATTEINT":
      return <TrendingUp className="h-4 w-4 text-amber-500" />;
    case "DEPENSE_IMPORTANTE":
      return <Zap className="h-4 w-4 text-blue-500" />;
    default:
      return <Bell className="h-4 w-4" />;
  }
};

const getAlertBadgeVariant = (type: Alert["type"]) => {
  switch (type) {
    case "BUDGET_DEPASSE":
      return "destructive";
    case "SEUIL_ATTEINT":
      return "outline";
    case "DEPENSE_IMPORTANTE":
      return "default";
    default:
      return "secondary";
  }
};

const getAlertTypeText = (type: Alert["type"]) => {
  switch (type) {
    case "BUDGET_DEPASSE":
      return "Budget dépassé";
    case "SEUIL_ATTEINT":
      return "Seuil atteint";
    case "DEPENSE_IMPORTANTE":
      return "Dépense importante";
    default:
      return "Alerte";
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "Aujourd'hui";
  } else if (diffDays === 1) {
    return "Hier";
  } else if (diffDays < 7) {
    return `Il y a ${diffDays} jours`;
  } else {
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
    });
  }
};

export const NotificationsMenu = () => {
  // Récupérer les 3 dernières alertes non lues
  const { alerts, markAsRead, isMarkingAsRead } = useAlert({
    isRead: "false",
    pageSize: 3,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  // Récupérer les statistiques pour le compteur
  const { stats } = useAlertStats();

  const unreadCount = stats?.unread || 0;

  const handleMarkAsRead = (alertId: string) => {
    markAsRead(alertId);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground flex items-center justify-center">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-96">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Badge variant="secondary" className="text-xs">
              {unreadCount} non lu{unreadCount > 1 ? "s" : ""}
            </Badge>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {alerts.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            <CheckCircle2 className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>Aucune nouvelle notification</p>
            <p className="text-xs mt-1">Toutes les alertes sont à jour</p>
          </div>
        ) : (
          <div className="max-h-64 overflow-y-auto">
            {alerts.map((alert) => (
              <DropdownMenuItem
                key={alert.id}
                className={cn(
                  "p-3 border-b last:border-b-0 cursor-pointer transition-colors",
                  !alert.isRead && "bg-muted/50",
                  isMarkingAsRead && "opacity-50"
                )}
                onClick={() => handleMarkAsRead(alert.id)}
                disabled={isMarkingAsRead}
              >
                <div className="flex items-start gap-3 w-full">
                  <div className="flex-shrink-0 mt-0.5">
                    {getAlertIcon(alert.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge
                        variant={getAlertBadgeVariant(alert.type)}
                        className="text-xs"
                      >
                        {getAlertTypeText(alert.type)}
                      </Badge>
                      {!alert.isRead && (
                        <span className="h-2 w-2 rounded-full bg-primary"></span>
                      )}
                    </div>
                    <p className="text-sm font-medium leading-tight mb-1">
                      {alert.message}
                    </p>
                    {alert.amount && (
                      <p className="text-xs text-muted-foreground">
                        Montant:{" "}
                        {alert.amount.toLocaleString("fr-FR", {
                          style: "currency",
                          currency: "EUR",
                        })}
                        {alert.threshold &&
                          ` / ${alert.threshold.toLocaleString("fr-FR", {
                            style: "currency",
                            currency: "EUR",
                          })}`}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDate(alert.createdAt)}
                    </p>
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
          </div>
        )}

        {alerts.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <div className="p-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-xs"
                asChild
              >
                <a href="/alerts">Voir toutes les alertes</a>
              </Button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
