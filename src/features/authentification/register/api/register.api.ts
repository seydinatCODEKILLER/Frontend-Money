import { apiClient } from "@/api/client";
import type { ApiResponse } from "@/api/types";
import type { LoginResponse } from "@/types/auth.type";

export interface RegisterCredentials {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  avatar?: File;
  onboardingData?: unknown;
}

export const registerApi = {
  register: async (credentials: RegisterCredentials): Promise<LoginResponse> => {
    const formData = new FormData();
    
    // Ajouter les champs texte
    formData.append('nom', credentials.nom);
    formData.append('prenom', credentials.prenom);
    formData.append('email', credentials.email);
    formData.append('password', credentials.password);
    
    // Ajouter l'avatar si présent
    if (credentials.avatar) {
      formData.append('avatar', credentials.avatar);
    }

    const response = await apiClient.post<ApiResponse<LoginResponse>>(
      "/auth/register",
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message || "Erreur lors de l'inscription");
    }

    return response.data.data;
  },
};