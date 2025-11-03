
import type { ApiResponse } from "@/api/types";
import type {
  DashboardOverview,
  ExpensesByCategory,
  MonthlyTrends,
  GlobalBudget
} from "./types";
import { apiClient } from "@/api/client";

export const dashboardApi = {
  getOverview: async (): Promise<DashboardOverview> => {
    const response = await apiClient.get<ApiResponse<DashboardOverview>>(
      "/dashboard/overview"
    );
    if (!response.data.success) {
      throw new Error(response.data.message || "Erreur lors du chargement du dashboard");
    }
    return response.data.data;
  },

  getExpensesByCategory: async (period: string = "month"): Promise<ExpensesByCategory> => {
    const response = await apiClient.get<ApiResponse<ExpensesByCategory>>(
      "/dashboard/expenses-by-category",
      {
        params: { period }
      }
    );
    if (!response.data.success) {
      throw new Error(response.data.message || "Erreur lors du chargement des catégories");
    }
    return response.data.data;
  },

  getMonthlyTrends: async (months: number = 6): Promise<MonthlyTrends> => {
    const response = await apiClient.get<ApiResponse<MonthlyTrends>>(
      "/dashboard/monthly-trends",
      {
        params: { months }
      }
    );
    if (!response.data.success) {
      throw new Error(response.data.message || "Erreur lors du chargement des tendances");
    }
    return response.data.data;
  },

  getGlobalBudget: async (): Promise<GlobalBudget> => {
    const response = await apiClient.get<ApiResponse<GlobalBudget>>(
      "/dashboard/global-budget"
    );
    if (!response.data.success) {
      throw new Error(response.data.message || "Erreur lors du chargement du budget");
    }
    return response.data.data;
  },
};