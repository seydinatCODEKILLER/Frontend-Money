import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "../api/dashboard.api";
import type { ExpensesByCategory } from "../api/types";

export const useExpensesByCategory = (period: string = "month") => {
  return useQuery<ExpensesByCategory>({
    queryKey: ["dashboard", "expenses-by-category", period],
    queryFn: () => dashboardApi.getExpensesByCategory(period),
    staleTime: 5 * 60 * 1000,
  });
};