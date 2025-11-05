import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { categoryApi } from '../api/category.api';
import type { CategoryFilters } from '../types/category.types';
import { toast } from 'sonner';
import type { CategoryFormValues } from '../validations/category.schema';
import { apiUtils } from '@/utils/apiUtils';

export const useCategories = (filters: CategoryFilters) => {
  return useQuery({
    queryKey: ['categories', filters],
    queryFn: () => categoryApi.getCategories(filters),
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: categoryApi.createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Catégorie créée avec succès');
    },
    onError: (error: Error) => {
      const errorMessage = apiUtils.handleApiError(error);
      toast.error('Erreur lors de la création', {
        description: errorMessage,
      });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CategoryFormValues }) =>
      categoryApi.updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Catégorie mise à jour avec succès');
    },
    onError: (error: Error) => {
      const errorMessage = apiUtils.handleApiError(error);
      toast.error('Erreur lors de la mise à jour', {
        description: errorMessage,
      });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: categoryApi.deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Catégorie supprimée avec succès');
    },
    onError: (error: Error) => {
      const errorMessage = apiUtils.handleApiError(error);
      toast.error('Erreur lors de la suppression', {
        description: errorMessage,
      });
    },
  });
};

export const useRestoreCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: categoryApi.restoreCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Catégorie restaurée avec succès');
    },
    onError: (error: Error) => {
      const errorMessage = apiUtils.handleApiError(error);
      toast.error('Erreur lors de la restauration', {
        description: errorMessage,
      });
    },
  });
};