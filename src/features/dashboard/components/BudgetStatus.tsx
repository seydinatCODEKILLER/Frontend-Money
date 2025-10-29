import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BudgetStatus } from "../api/types";

interface BudgetStatusProps {
  budgets: BudgetStatus[];
}

export function BudgetStatus({ budgets }: BudgetStatusProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'danger':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <Info className="h-4 w-4 text-orange-500" />;
      default:
        return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Statut des Budgets</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {budgets.map((budget, index) => (
          <motion.div
            key={budget.categoryId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${budget.color}20` }}
                >
                  <span style={{ color: budget.color }}>📊</span>
                </div>
                <span className="font-medium text-sm">{budget.categoryName}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  €{budget.spent.toLocaleString('fr-FR')} / €{budget.budget.toLocaleString('fr-FR')}
                </span>
                {getStatusIcon(budget.status)}
              </div>
            </div>

            <div className="space-y-1">
              <Progress 
                value={budget.percentage} 
                className={cn(
                  "h-2",
                  budget.status === 'danger' && "bg-red-100",
                  budget.status === 'warning' && "bg-orange-100",
                  budget.status === 'safe' && "bg-green-100"
                )}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{budget.percentage}% utilisé</span>
                <span>Reste: €{budget.remaining.toLocaleString('fr-FR')}</span>
              </div>
            </div>
          </motion.div>
        ))}

        {budgets.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>Aucun budget défini</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}