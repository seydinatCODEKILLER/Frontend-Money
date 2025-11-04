import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/auth.store";
import { toast } from "sonner";
import type { LoginResponse } from "@/types/auth.type";
import type { OnboardingData } from "../types/onboarding.type";
import { useNavigate } from "react-router-dom";
import { apiUtils } from "@/utils/apiUtils";
import { registerApi } from "../../register/api/register.api";

interface RegisterWithOnboardingCredentials {
  personalInfo: {
    nom: string;
    prenom: string;
    email: string;
    password: string;
    avatar?: File;
  };
  onboardingData: OnboardingData;
}

export const useRegister = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  return useMutation<LoginResponse, unknown, RegisterWithOnboardingCredentials>({
    mutationFn: (credentials) => 
      registerApi.register({
        ...credentials.personalInfo,
        onboardingData: credentials.onboardingData,
      }),

    onSuccess: (data) => {
      setUser(data);
      toast.success("Bienvenue sur MoneyWise !", {
        description: `Parfait ${data.user.prenom} ! Votre espace personnalisé est prêt.`,
        duration: 5000,
      });
      console.log("Inscription réussie avec les données d'onboarding :", data);
      navigate("/dashboard/analytics");
    },

    onError: (error: unknown) => {
      const errorMessage = apiUtils.handleApiError(error);
      toast.error("Erreur d'inscription", {
        description: errorMessage,
      });
    },
  });
}