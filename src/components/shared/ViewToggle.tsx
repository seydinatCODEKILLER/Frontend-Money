import { Button } from "@/components/ui/button";
import { LayoutGrid, Table, List, GanttChart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export type ViewMode = "card" | "table" | "list" | "grid";

interface ViewToggleProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  className?: string;
  availableModes?: ViewMode[];
  showLabels?: boolean;
  size?: "sm" | "md" | "lg";
}

const viewModeConfig = {
  card: {
    icon: LayoutGrid,
    label: "Cartes",
    description: "Vue en cartes"
  },
  table: {
    icon: Table,
    label: "Tableau",
    description: "Vue en tableau"
  },
  list: {
    icon: List,
    label: "Liste",
    description: "Vue en liste"
  },
  grid: {
    icon: GanttChart,
    label: "Grille",
    description: "Vue en grille"
  }
} as const;

export function ViewToggle({ 
  viewMode, 
  onViewModeChange, 
  className,
  availableModes = ["card", "table"],
  showLabels = true,
  size = "md"
}: ViewToggleProps) {
  const sizeClasses = {
    sm: "h-7 px-2 text-xs",
    md: "h-8 px-3 text-sm",
    lg: "h-9 px-4 text-base"
  };

  return (
    <TooltipProvider>
      <div className={cn("flex items-center gap-1 p-1 bg-muted/50 rounded-lg", className)}>
        {availableModes.map((mode) => {
          const config = viewModeConfig[mode];
          const Icon = config.icon;
          
          return (
            <Tooltip key={mode}>
              <TooltipTrigger asChild>
                <Button
                  variant={viewMode === mode ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onViewModeChange(mode)}
                  className={cn(
                    "flex items-center gap-2 transition-all",
                    sizeClasses[size],
                    viewMode === mode 
                      ? "bg-background shadow-sm" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className={cn(
                    size === "sm" ? "w-3 h-3" : "w-4 h-4"
                  )} />
                  {showLabels && (
                    <span className={cn(
                      size === "sm" ? "hidden xs:inline" : "hidden sm:inline"
                    )}>
                      {config.label}
                    </span>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{config.description}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
}