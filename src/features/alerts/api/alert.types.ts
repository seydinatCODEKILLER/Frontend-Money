// features/alerts/types/alert.types.ts
export type AlertType = 'BUDGET_DEPASSE' | 'SEUIL_ATTEINT' | 'DEPENSE_IMPORTANTE'
export type AlertSource = 'GLOBAL' | 'CATEGORY' | 'TRANSACTION'

export interface AlertCategory {
  id: string
  name: string
  color: string
  icon: string
}

export interface Alert {
  id: string
  type: AlertType
  sourceType: AlertSource
  category?: AlertCategory | null
  message: string
  amount?: number
  threshold?: number
  isRead: boolean
  status: string
  createdAt: string
  updatedAt: string
}

export interface AlertFilters {
  isRead?: string
  type?: AlertType
  sourceType?: AlertSource
  page?: number
  pageSize?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface AlertsResponse {
  alerts: Alert[]
  pagination: {
    total: number
    page: number
    pageSize: number
    totalPages: number
  }
  filters: Partial<AlertFilters>
}

export interface AlertStats {
  total: number
  unread: number
  byType: {
    budgetDepasse: number
    seuilAtteint: number
    depenseImportante: number
  }
}