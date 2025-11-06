import { useMutation } from '@tanstack/react-query';
import { reportApi } from '../api/report.api';
import { toast } from 'sonner';
import { apiUtils } from '@/utils/apiUtils';

export const useGenerateReport = () => {
  return useMutation({
    mutationFn: reportApi.generateReportData,
    onError: (error: Error) => {
      const errorMessage = apiUtils.handleApiError(error);
      toast.error('Erreur lors de la génération du rapport', {
        description: errorMessage,
      });
    },
  });
};