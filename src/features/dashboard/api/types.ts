export interface DashboardSummary {
  balance: number;
  totalRevenue: number;
  totalExpenses: number;
  transactionsCount: number;
  budgetAlertsCount: number;
}

export interface BudgetStatus {
  categoryId: string;
  categoryName: string;
  spent: number;
  budget: number;
  remaining: number;
  percentage: number;
  color: string;
  icon: string;
  status: 'safe' | 'warning' | 'danger';
}

export interface RecentTransaction {
  id: string;
  type: 'REVENUE' | 'EXPENSE';
  amount: number;
  description: string;
  date: string;
  category: string;
  color: string;
  icon: string;
}

export interface DashboardOverview {
  summary: DashboardSummary;
  budgetStatus: BudgetStatus[];
  recentTransactions: RecentTransaction[];
  period: string;
}

export interface CategoryData {
  id: string;
  name: string;
  value: number;
  count: number;
  color: string;
  icon: string;
  percentage: number;
}

export interface GlobalBudget {
  totalBudget: number;
  totalSpent: number;
  remaining: number;
  percentageUsed: number;
  categories: BudgetStatus[];
}

export interface MonthlyTrendsData {
  month: string;
  period: string;
  revenue: number;
  expenses: number;
  balance: number;
}

export interface MonthlyTrends {
  data: MonthlyTrendsData[];
  summary: {
    totalRevenue: number;
    totalExpenses: number;
  };
  period: string;
}

export interface ExpenseCategory {
  id: string;
  name: string;
  value: number;
  count: number;
  color: string;
  icon: string;
  percentage: number;
}

export interface ExpensesByCategory {
  data: ExpenseCategory[];
  total: number;
  period: string;
}