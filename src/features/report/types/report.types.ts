export type ReportType = "monthly-summary" | "category-breakdown" | "budget-vs-actual";

export interface ReportFilters {
  reportType: ReportType;
  startDate: string;
  endDate: string;
  categoryId?: string;
}

export interface MonthlySummary {
  totalRevenue: number;
  totalExpenses: number;
  netIncome: number;
  transactionCount: number;
}

export interface CategoryBreakdown {
  [categoryName: string]: {
    total: number;
    count: number;
    type: string;
  };
}

export interface BudgetVsActual {
  [categoryName: string]: {
    budget: number | null;
    actual: number;
    difference: number;
    percentage: number;
  };
}

export interface Transaction {
  id: string;
  type: "REVENUE" | "DEPENSE";
  amount: number;
  description: string | null;
  date: string;
  category: {
    id: string;
    name: string;
    color: string | null;
    icon: string | null;
  } | null;
}

export interface ReportData {
  reportType: ReportType;
  startDate: string;
  endDate: string;
  transactions: Transaction[];
  reportData: MonthlySummary | CategoryBreakdown | BudgetVsActual;
}

export interface ReportResponse {
  report: ReportData;
}