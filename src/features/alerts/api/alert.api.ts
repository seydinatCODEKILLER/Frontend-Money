import { apiClient } from '@/api/client'
import type { Alert, AlertFilters, AlertsResponse, AlertStats } from '../api/alert.types'
import type { ApiResponse } from '@/api/types'

export const alertApi = {
  // Récupérer les alertes avec filtres
  getUserAlerts: async (filters: AlertFilters = {}): Promise<AlertsResponse> => {
    const response = await apiClient.get<ApiResponse<AlertsResponse>>(
      '/alerts',
      { params: filters }
    )
    if (!response.data.success) {
      throw new Error(response.data.message || 'Erreur lors du chargement des alertes')
    }
    return response.data.data
  },

  // Marquer une alerte comme lue
  markAlertAsRead: async (alertId: string): Promise<Alert> => {
    const response = await apiClient.patch<ApiResponse<Alert>>(
      `/alerts/${alertId}/read`
    )
    if (!response.data.success) {
      throw new Error(response.data.message || "Erreur lors du marquage de l'alerte")
    }
    return response.data.data
  },

  // Marquer toutes les alertes comme lues
  markAllAlertsAsRead: async (): Promise<void> => {
    const response = await apiClient.patch<ApiResponse<void>>('/alerts/read-all')
    if (!response.data.success) {
      throw new Error(response.data.message || "Erreur lors du marquage des alertes")
    }
  },

  // Récupérer les statistiques des alertes
  getAlertStats: async (): Promise<AlertStats> => {
    const response = await apiClient.get<ApiResponse<AlertStats>>('/alerts/stats')
    if (!response.data.success) {
      throw new Error(response.data.message || 'Erreur lors du chargement des statistiques')
    }
    return response.data.data
  },
}