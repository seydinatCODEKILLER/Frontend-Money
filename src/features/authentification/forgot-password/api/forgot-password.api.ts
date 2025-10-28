import { apiClient } from "@/api/client";
import type { ApiResponse } from "@/api/types";


export interface ForgotPasswordCredentials {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
  success: boolean;
}

export const forgotPasswordApi = {
  requestReset: async (credentials: ForgotPasswordCredentials): Promise<ForgotPasswordResponse> => {
    const response = await apiClient.post<ApiResponse<ForgotPasswordResponse>>(
      "/auth/forgot-password",
      credentials
    );

    if (!response.data.success) {
      throw new Error(response.data.message || "Erreur lors de la demande de réinitialisation");
    }

    return response.data.data;
  },

  resetPassword: async (token: string, password: string): Promise<ForgotPasswordResponse> => {
    const response = await apiClient.post<ApiResponse<ForgotPasswordResponse>>(
      "/auth/reset-password",
      { token, password }
    );

    if (!response.data.success) {
      throw new Error(response.data.message || "Erreur lors de la réinitialisation du mot de passe");
    }

    return response.data.data;
  },
};