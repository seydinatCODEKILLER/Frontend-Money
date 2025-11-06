import type { ApiResponse } from '@/api/types';
import type { ReportData, ReportFilters } from '../types/report.types';
import { apiClient } from '@/api/client';

export const reportApi = {
  generateReportData: async (filters: ReportFilters): Promise<ReportData> => {
    const response = await apiClient.post<ApiResponse<ReportData>>('/reports/generate-data', filters);
    if (!response.data.success) {
      throw new Error(response.data.message || 'Erreur lors de la génération du rapport');
    }
    return response.data.data;
  },
}