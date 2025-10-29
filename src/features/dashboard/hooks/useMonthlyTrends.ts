import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "../api/dashboard.api";

export const useMonthlyTrends = () => {
  return useQuery({
    queryKey: ['dashboard', 'monthly-trends'],
    queryFn: () => dashboardApi.getMonthlyTrends(),
    staleTime: 5 * 60 * 1000,
  });
};