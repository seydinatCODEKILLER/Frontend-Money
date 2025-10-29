import { apiClient } from "@/api/client";
import type { ApiResponse } from "@/api/types";

export interface ResetPasswordCredentials {
  token: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  message: string;
  success: boolean;
}

export const resetPasswordApi = {
  resetPassword: async (credentials: ResetPasswordCredentials): Promise<ResetPasswordResponse> => {
    const response = await apiClient.post<ApiResponse<ResetPasswordResponse>>(
      "/auth/reset-password",
      credentials
    );

    if (!response.data.success) {
      throw new Error(response.data.message || "Erreur lors de la réinitialisation du mot de passe");
    }

    return response.data.data;
  },
};