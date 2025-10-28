import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { forgotPasswordApi, type ForgotPasswordCredentials } from "../api/forgot-password.api";
import { apiUtils } from "@/utils/apiUtils";

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (credentials: ForgotPasswordCredentials) => 
      forgotPasswordApi.requestReset(credentials),

    onSuccess: () => {
      toast.success("Email envoyé", {
        description: "Un lien de réinitialisation a été envoyé à votre adresse email.",
      });
    },

    onError: (error: unknown) => {
      const errorMessage = apiUtils.handleApiError(error);
      console.log("Forgot Password Error:", error);
      toast.error("Erreur", {
        description: errorMessage,
      });
    },
  });
};