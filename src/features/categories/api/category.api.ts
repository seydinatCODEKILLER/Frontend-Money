import type { ApiResponse } from '@/api/types';
import type { Category, CategoriesResponse } from '../types/category.types';
import { apiClient } from '@/api/client';
import type { CategoryFormValues } from '../validations/category.schema';

export const categoryApi = {
  // Récupérer les catégories avec pagination et filtres
  getCategories: async (params: {
    page?: number;
    limit?: number;
    type?: string;
    search?: string;
  } = {}): Promise<CategoriesResponse> => {
    const response = await apiClient.get<ApiResponse<CategoriesResponse>>('/categories', { params });
    if (!response.data.success) {
      throw new Error(response.data.message || 'Erreur lors du chargement des catégories');
    }
    return response.data.data;
  },

  // Créer une catégorie
  createCategory: async (data: CategoryFormValues): Promise<Category> => {
    const response = await apiClient.post<ApiResponse<Category>>('/categories', data);
    if (!response.data.success) {
      throw new Error(response.data.message || 'Erreur lors de la création de la catégorie');
    }
    return response.data.data;
  },

  // Mettre à jour une catégorie
  updateCategory: async (id: string, data: CategoryFormValues): Promise<Category> => {
    const response = await apiClient.put<ApiResponse<Category>>(`/categories/${id}`, data);
    if (!response.data.success) {
      throw new Error(response.data.message || 'Erreur lors de la mise à jour de la catégorie');
    }
    return response.data.data;
  },

  // Supprimer une catégorie (soft delete)
  deleteCategory: async (id: string): Promise<void> => {
    const response = await apiClient.delete<ApiResponse<void>>(`/categories/${id}`);
    if (!response.data.success) {
      throw new Error(response.data.message || 'Erreur lors de la suppression de la catégorie');
    }
  },

  //Restauration d'une catégorie
  restoreCategory: async (id: string): Promise<Category> => {
    const response = await apiClient.patch<ApiResponse<Category>>(`/categories/${id}/restore`);
    if (!response.data.success) {
      throw new Error(response.data.message || 'Erreur lors de la restauration de la catégorie');
    }
    return response.data.data;
  },
};