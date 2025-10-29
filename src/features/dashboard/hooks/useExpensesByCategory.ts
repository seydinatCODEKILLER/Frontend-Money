import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "../api/dashboard.api";
import type { ExpensesByCategory } from "../api/types";

export const useExpensesByCategory = () => {
  return useQuery<ExpensesByCategory>({
    queryKey: ["dashboard", "expenses-by-category"],
    queryFn: () => dashboardApi.getExpensesByCategory(),
    staleTime: 5 * 60 * 1000,
  });
};
