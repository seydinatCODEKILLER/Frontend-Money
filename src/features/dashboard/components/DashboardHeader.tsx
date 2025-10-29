import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { 
  // Plus, 
  RefreshCw, 
  Calendar, 
  ChevronDown, 
  Download,
  Filter
} from "lucide-react";
// import { Link } from "react-router-dom";
import { useState } from "react";

interface DashboardHeaderProps {
  period: string;
  onRefresh: () => void;
  onPeriodChange?: (period: string) => void;
}

const periodOptions = [
  { value: "7", label: "7 derniers jours" },
  { value: "30", label: "30 derniers jours" },
  { value: "90", label: "3 derniers mois" },
  { value: "365", label: "12 derniers mois" },
  { value: "current-month", label: "Mois en cours" },
  { value: "last-month", label: "Mois dernier" },
];

export function DashboardHeader({ period, onRefresh, onPeriodChange }: DashboardHeaderProps) {
  const [selectedPeriod, setSelectedPeriod] = useState(period);

  const handlePeriodChange = (newPeriod: string) => {
    setSelectedPeriod(newPeriod);
    onPeriodChange?.(newPeriod);
  };

  const getPeriodLabel = () => {
    return periodOptions.find(opt => opt.value === selectedPeriod)?.label || selectedPeriod;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
    >
      {/* Title Section */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Tableau de Bord
          </h1>
          <Badge variant="secondary" className="text-xs">
            Live
          </Badge>
        </div>
        <p className="text-muted-foreground">
          Vue d'ensemble de votre situation financière
        </p>
      </div>

      {/* Actions Section */}
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        {/* Period Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="truncate max-w-32">{getPeriodLabel()}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {periodOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => handlePeriodChange(option.value)}
                className={selectedPeriod === option.value ? "bg-muted" : ""}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Filter Button */}
        <Button variant="outline" size="icon" title="Filtrer">
          <Filter className="h-4 w-4" />
        </Button>

        {/* Export Button */}
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Exporter</span>
        </Button>

        {/* Refresh Button */}
        <Button 
          variant="outline" 
          size="icon" 
          onClick={onRefresh}
          title="Actualiser les données"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>

        {/* Add Transaction Button */}
        {/* <Button asChild className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
          <Link to="/dashboard/transactions/new" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Nouvelle Transaction</span>
          </Link>
        </Button> */}
      </div>
    </motion.div>
  );
}