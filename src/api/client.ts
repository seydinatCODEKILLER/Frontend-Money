import axios, { type AxiosRequestConfig } from "axios";
import { useAuthStore } from "@/stores/auth.store";
import { toast } from "sonner";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://moneywise-9crf.onrender.com/api",
  timeout: 20000,
  headers: { "Content-Type": "application/json" },
});

// ➜ Intercepteur de requêtes
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ➜ Intercepteur de réponses
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status, data } = error.response || {};

    if (status === 401) {
      return Promise.reject(error);
    }

    if (status === 403) {
      toast.error("Accès refusé", {
        description: data?.message || "Vous n'avez pas les permissions nécessaires.",
      });
    }

    if (status === 422 && data?.errors) {
      const errorMessages = Object.values(data.errors).flat().join(", ");
      toast.error("Erreur de validation", { description: errorMessages });
    }

    if (status >= 500) {
      toast.error("Erreur serveur", {
        description: data?.message || "Une erreur est survenue côté serveur.",
      });
    }

    return Promise.reject(error);
  }
);

export type RequestConfig<T = unknown> = AxiosRequestConfig<T>;
