import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { AlertFilters, AlertsResponse } from '../api/alert.types'
import { alertApi } from '../api/alert.api'

export const useAlert = (filters: AlertFilters = {}) => {
  const queryClient = useQueryClient()

  const alertsQuery = useQuery({
    queryKey: ['alerts', filters],
    queryFn: () => alertApi.getUserAlerts(filters),
    staleTime: 1000 * 60 * 5,
  })

  const markAsReadMutation = useMutation({
    mutationFn: alertApi.markAlertAsRead,
    onSuccess: (updatedAlert) => {
      // Mettre à jour le cache des alertes
      queryClient.setQueryData<AlertsResponse>(['alerts', filters], (oldData) => {
        if (!oldData) return oldData
        
        return {
          ...oldData,
          alerts: oldData.alerts.map(alert => 
            alert.id === updatedAlert.id ? updatedAlert : alert
          ),
        }
      })

      // Invalider les statistiques pour recalcul
      queryClient.invalidateQueries({ queryKey: ['alertStats'] })
    },
  })

  // Mutation pour marquer toutes les alertes comme lues
  const markAllAsReadMutation = useMutation({
    mutationFn: alertApi.markAllAlertsAsRead,
    onSuccess: () => {
      // Mettre à jour toutes les alertes dans le cache
      queryClient.setQueryData<AlertsResponse>(['alerts', filters], (oldData) => {
        if (!oldData) return oldData
        
        return {
          ...oldData,
          alerts: oldData.alerts.map(alert => ({
            ...alert,
            isRead: true
          })),
        }
      })

      // Invalider les statistiques
      queryClient.invalidateQueries({ queryKey: ['alertStats'] })
    },
  })

  return {
    // Données
    alerts: alertsQuery.data?.alerts || [],
    pagination: alertsQuery.data?.pagination,
    
    // États
    isLoading: alertsQuery.isLoading,
    isError: alertsQuery.isError,
    error: alertsQuery.error,
    
    // Mutations
    markAsRead: markAsReadMutation.mutate,
    markAsReadAsync: markAsReadMutation.mutateAsync,
    markAllAsRead: markAllAsReadMutation.mutate,
    markAllAsReadAsync: markAllAsReadMutation.mutateAsync,
    
    // États des mutations
    isMarkingAsRead: markAsReadMutation.isPending,
    isMarkingAllAsRead: markAllAsReadMutation.isPending,
    
    // Refetch
    refetch: alertsQuery.refetch,
  }
}