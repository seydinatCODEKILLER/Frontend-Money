import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileApi } from '../api/profile.api';
import { toast } from 'sonner';
import { apiUtils } from '@/utils/apiUtils';
import { authApi } from '@/features/authentification/login/api/auth';

export const useUserProfile = () => {
  return useQuery({
    queryKey: ['user-profile'],
    queryFn: authApi.getCurrentUser,
    staleTime: 1000 * 60 * 30,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: profileApi.updateProfile,
    onSuccess: (updatedUser) => {
      // Mettre à jour le cache du profil
      queryClient.setQueryData(['user-profile'], updatedUser);
      
      toast.success('Profil mis à jour avec succès');
    },
    onError: (error: Error) => {
      const errorMessage = apiUtils.handleApiError(error);
      toast.error('Erreur lors de la mise à jour', {
        description: errorMessage,
      });
    },
  });
};