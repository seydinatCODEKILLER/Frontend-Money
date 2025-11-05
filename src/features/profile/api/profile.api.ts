import type { ApiResponse } from '@/api/types';
import type { UpdateProfileData } from '../types/profile.type';
import { apiClient } from '@/api/client';
import type { ApiUser } from '@/types/auth.type';

export const profileApi = {

  updateProfile: async (data: UpdateProfileData): Promise<ApiUser> => {
    const formData = new FormData();
    
    if (data.nom) formData.append('nom', data.nom);
    if (data.prenom) formData.append('prenom', data.prenom);
    if (data.avatarFile) formData.append('avatarFile', data.avatarFile);

    const response = await apiClient.put<ApiResponse<ApiUser>>('/auth/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'Erreur lors de la mise à jour du profil');
    }
    return response.data.data;
  },
}