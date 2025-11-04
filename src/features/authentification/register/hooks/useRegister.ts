import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/auth.store";
import { toast } from "sonner";
import type { LoginResponse } from "@/types/auth.type";
import { registerApi, type RegisterCredentials } from "../api/register.api";
import { useNavigate } from "react-router-dom";
import { apiUtils } from "@/utils/apiUtils";

export const useRegister = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  return useMutation<LoginResponse, unknown, RegisterCredentials>({
    mutationFn: (credentials: RegisterCredentials) =>  registerApi.register(credentials),

    onSuccess: (data) => {
      setUser(data);
      toast.success("Inscription réussie", {
        description: `Bienvenue ${data.user.prenom} ! Votre compte a été créé avec succès.`,
      });
      navigate("/dashboard/analytics");
    },

    onError: (error: unknown) => {
      const errorMessage = apiUtils.handleApiError(error);
      toast.error("Erreur d'inscription", {
        description: errorMessage,
      });
    },
  });
};