import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { resetPasswordApi, type ResetPasswordCredentials } from "../api/reset-password.api";
import { useNavigate } from "react-router-dom";
import { apiUtils } from "@/utils/apiUtils";

export const useResetPassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (credentials: ResetPasswordCredentials) => 
      resetPasswordApi.resetPassword(credentials),

    onSuccess: () => {
      toast.success("Mot de passe réinitialisé", {
        description: "Votre mot de passe a été modifié avec succès. Vous pouvez maintenant vous connecter.",
      });
      navigate("/login");
    },

    onError: (error: unknown) => {
      const errorMessage = apiUtils.handleApiError(error);
      toast.error("Erreur de réinitialisation", {
        description: errorMessage,
      });
    },
  });
};