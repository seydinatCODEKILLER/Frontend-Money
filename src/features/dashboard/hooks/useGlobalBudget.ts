import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "../api/dashboard.api";

export const useGlobalBudget = () => {
  return useQuery({
    queryKey: ['dashboard', 'global-budget'],
    queryFn: () => dashboardApi.getGlobalBudget(),
    staleTime: 5 * 60 * 1000,
  });
};