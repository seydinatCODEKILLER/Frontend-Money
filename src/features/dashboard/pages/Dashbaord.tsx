import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { SummaryCards } from "../components/SummaryCards";
import { RecentTransactions } from "../components/RecentTransactions";
import { BudgetStatus } from "../components/BudgetStatus";
// import { ExpensesPieChart } from "../components/ExpensesPieChart";
// import { MonthlyTrendsChart } from "../components/MonthlyTrendsChart";
import { DashboardHeader } from "../components/DashboardHeader";
import { useDashboard } from "../hooks/useDashboard";
// import { useExpensesByCategory } from "../hooks/useExpensesByCategory";
// import { useMonthlyTrends } from "../hooks/useMonthlyTrends";
import { useGlobalBudget } from "../hooks/useGlobalBudget";

export function Dashboard() {
  const { data: overview, isLoading: overviewLoading, refetch: refetchOverview } = useDashboard();
  // const { data: expensesData, isLoading: expensesLoading, refetch: refetchExpenses } = useExpensesByCategory();
  // const { data: trendsData, isLoading: trendsLoading, refetch: refetchTrends } = useMonthlyTrends();
  const { isLoading: budgetLoading, refetch: refetchBudget } = useGlobalBudget();

  const isLoading = overviewLoading || budgetLoading;

  const handleRefresh = () => {
    refetchOverview();
    // refetchExpenses();
    // refetchTrends();
    refetchBudget();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-4">
          <RefreshCw className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Chargement du dashboard...</p>
        </div>
      </div>
    );
  }

  if (!overview) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-muted-foreground">Erreur lors du chargement des données</p>
          <Button onClick={handleRefresh} variant="outline" className="mt-4">
            Réessayer
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <DashboardHeader 
        period={overview.period}
        onRefresh={handleRefresh}
      />

      {/* Summary Cards */}
      <SummaryCards summary={overview.summary} />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Dépenses par Catégorie */}
        {/* {expensesData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ExpensesPieChart data={expensesData} />
          </motion.div>
        )} */}

        {/* Tendances Mensuelles */}
        {/* {trendsData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <MonthlyTrendsChart data={trendsData} />
          </motion.div>
        )} */}
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 gap-6">
        {/* Transactions Récentes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <RecentTransactions transactions={overview.recentTransactions} />
        </motion.div>

        {/* Statut des Budgets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <BudgetStatus budgets={overview.budgetStatus} />
        </motion.div>
      </div>
    </div>
  );
}