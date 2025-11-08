import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { recommendationApi } from '../api/recommendation.api';
import type { RecommendationFilters } from '../types/recommendation.types';
import { toast } from 'sonner';
import { apiUtils } from '@/utils/apiUtils';

export const useRecommendations = (filters: RecommendationFilters) => {
  return useQuery({
    queryKey: ['recommendations', filters],
    queryFn: () => recommendationApi.getRecommendations(filters),
    staleTime: 1000 * 60 * 10,
  });
};

export const useGenerateRecommendations = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: recommendationApi.generateRecommendations,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['recommendations'] });
      toast.success('Recommandations générées avec succès', {
        description: `${data.generated} nouvelles recommandations créées`,
      });
    },
    onError: (error: Error) => {
      const errorMessage = apiUtils.handleApiError(error);
      toast.error('Erreur lors de la génération', {
        description: errorMessage,
      });
    },
  });
};

export const useDeleteRecommendation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: recommendationApi.deleteRecommendation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recommendations'] });
      toast.success('Recommandation supprimée avec succès');
    },
    onError: (error: Error) => {
      const errorMessage = apiUtils.handleApiError(error);
      toast.error('Erreur lors de la suppression', {
        description: errorMessage,
      });
    },
  });
};