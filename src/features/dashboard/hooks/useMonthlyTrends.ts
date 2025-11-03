import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "../api/dashboard.api";
import type { MonthlyTrends } from "../api/types";

export const useMonthlyTrends = (months: number = 6) => {
  return useQuery<MonthlyTrends>({
    queryKey: ['dashboard', 'monthly-trends', months],
    queryFn: () => dashboardApi.getMonthlyTrends(months),
    staleTime: 5 * 60 * 1000,
  });
}