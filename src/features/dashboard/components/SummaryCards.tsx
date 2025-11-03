import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Wallet, AlertCircle, Receipt } from "lucide-react";
import { cn } from "@/lib/utils";

interface SummaryCardsProps {
  summary: {
    balance: number;
    totalRevenue: number;
    totalExpenses: number;
    transactionsCount: number;
    budgetAlertsCount: number;
  };
}

export function SummaryCards({ summary }: SummaryCardsProps) {
  const cards = [
    {
      title: "Solde Total",
      value: `€${summary.balance.toLocaleString('fr-FR', { minimumFractionDigits: 2 })}`,
      description: "Votre solde actuel",
      icon: Wallet,
      trend: summary.balance >= 0 ? "positive" : "negative",
      color: "text-green-600"
    },
    {
      title: "Revenus",
      value: `€${summary.totalRevenue.toLocaleString('fr-FR', { minimumFractionDigits: 2 })}`,
      description: "Total des revenus",
      icon: TrendingUp,
      trend: "positive",
      color: "text-blue-600"
    },
    {
      title: "Dépenses",
      value: `€${summary.totalExpenses.toLocaleString('fr-FR', { minimumFractionDigits: 2 })}`,
      description: "Total des dépenses",
      icon: TrendingDown,
      trend: "negative",
      color: "text-red-600"
    },
    {
      title: "Transactions",
      value: summary.transactionsCount.toString(),
      description: "Nombre de transactions",
      icon: Receipt,
      trend: "neutral",
      color: "text-gray-600"
    },
    {
      title: "Alertes Budget",
      value: summary.budgetAlertsCount.toString(),
      description: "Budget Alerte",
      icon: AlertCircle,
      trend: summary.budgetAlertsCount > 0 ? "negative" : "positive",
      color: summary.budgetAlertsCount > 0 ? "text-orange-600" : "text-green-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <card.icon className={cn("h-4 w-4", card.color)} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">
                {card.description}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}