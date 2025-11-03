import { useQuery } from '@tanstack/react-query'
import { alertApi } from '../api/alert.api'

export const useAlertStats = () => {
  const statsQuery = useQuery({
    queryKey: ['alertStats'],
    queryFn: alertApi.getAlertStats,
    staleTime: 1000 * 60 * 2, // 2 minutes
    refetchInterval: 1000 * 30, // Rafraîchir toutes les 30 secondes
  })

  return {
    // Données
    stats: statsQuery.data,
    
    // États
    isLoading: statsQuery.isLoading,
    isError: statsQuery.isError,
    error: statsQuery.error,
    
    // Refetch
    refetch: statsQuery.refetch,
  }
}