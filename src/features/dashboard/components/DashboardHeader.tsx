import { PageHeader } from '@/components/shared/PageHeader';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { 
  RefreshCw, 
  Calendar, 
  ChevronDown,
  Download,
  Settings
} from "lucide-react";

interface DashboardHeaderProps {
  period: string;
  onRefresh: () => void;
  onPeriodChange?: (period: string) => void;
  onExport?: () => void;
}

const periodOptions = [
  { value: "7", label: "7 derniers jours" },
  { value: "30", label: "30 derniers jours" },
  { value: "90", label: "3 derniers mois" },
  { value: "365", label: "12 derniers mois" },
  { value: "current-month", label: "Mois en cours" },
  { value: "last-month", label: "Mois dernier" },
];

export function DashboardHeader({ period, onRefresh, onPeriodChange, onExport }: DashboardHeaderProps) {
  const getPeriodLabel = () => {
    return periodOptions.find(opt => opt.value === period)?.label || period;
  };

  const handlePeriodChange = (newPeriod: string) => {
    onPeriodChange?.(newPeriod);
  };

  // Actions principales
  const actions = [
    {
      label: 'Actualiser',
      icon: <RefreshCw className="w-4 h-4" />,
      onClick: onRefresh,
      variant: 'outline' as const,
    }
  ];

  // Actions dropdown
  const dropdownActions = [
    ...(onExport ? [{
      label: 'Exporter le rapport',
      icon: <Download className="w-4 h-4" />,
      onClick: onExport,
    }] : []),
    {
      label: 'Paramètres du dashboard',
      icon: <Settings className="w-4 h-4" />,
      onClick: () => console.log('Paramètres du dashboard'),
    }
  ];

  // Children avec le sélecteur de période
  const headerChildren = (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between pt-4">
      {/* Sélecteur de période */}
      <div className="flex items-center gap-2">
        <Calendar className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Période:
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <span className="max-w-32 truncate">{getPeriodLabel()}</span>
              <ChevronDown className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            {periodOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => handlePeriodChange(option.value)}
                className={period === option.value ? "bg-muted" : ""}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Indicateur de données en temps réel */}
      <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        Données en temps réel
      </div>
    </div>
  );

  return (
    <PageHeader
      title="Tableau de Bord"
      description="Vue d'ensemble de votre situation financière"
      icon="📊"
      badge={{
        text: 'Live',
        variant: 'default'
      }}
      actions={actions}
      dropdownActions={dropdownActions}
    >
      {headerChildren}
    </PageHeader>
  );
}