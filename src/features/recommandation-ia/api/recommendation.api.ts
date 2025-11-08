import type { ApiResponse } from '@/api/types';
import type { FinancialRecommendation, RecommendationsResponse, RecommendationFilters } from '../types/recommendation.types';
import { apiClient } from '@/api/client';

export const recommendationApi = {
  // Récupérer les recommandations avec pagination et filtres
  getRecommendations: async (params: RecommendationFilters): Promise<RecommendationsResponse> => {
    const response = await apiClient.get<ApiResponse<RecommendationsResponse>>('/recommendations', { params });
    if (!response.data.success) {
      throw new Error(response.data.message || 'Erreur lors du chargement des recommandations');
    }
    return response.data.data;
  },

  // Générer de nouvelles recommandations automatiques
  generateRecommendations: async (): Promise<{ generated: number; recommendations: FinancialRecommendation[] }> => {
    const response = await apiClient.post<ApiResponse<{ generated: number; recommendations: FinancialRecommendation[] }>>('/recommendations/generate');
    if (!response.data.success) {
      throw new Error(response.data.message || 'Erreur lors de la génération des recommandations');
    }
    return response.data.data;
  },

  // Supprimer une recommandation
  deleteRecommendation: async (id: string): Promise<void> => {
    const response = await apiClient.delete<ApiResponse<void>>(`/recommendations/${id}`);
    if (!response.data.success) {
      throw new Error(response.data.message || 'Erreur lors de la suppression de la recommandation');
    }
  },
};