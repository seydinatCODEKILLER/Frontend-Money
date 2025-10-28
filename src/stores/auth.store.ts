import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LoginResponse } from "@/types/auth.type";
import { authApi } from "@/features/authentification/login/api/auth";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import type { AuthState } from "@/features/authentification/login/types/auth.types";

interface AuthStore extends AuthState {
  setUser: (data: LoginResponse) => void;
  logout: (reason?: string) => void;
  setLoading: (loading: boolean) => void;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: true,
      isAuthenticated: false,

      setUser: (data: LoginResponse) => {
        set({
          user: data.user,
          token: data.token,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      logout: (reason?: string) => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });

        if (!reason) {
          toast.info("Déconnexion réussie");
        } else {
          toast.error(reason);
        }
      },

      setLoading: (loading: boolean) => set({ isLoading: loading }),

      initializeAuth: async () => {
        const { token } = get();

        if (!token) {
          set({ isLoading: false });
          return;
        }

        try {
          const user = await authApi.getCurrentUser();
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (err) {
          const error = err as AxiosError<{ message?: string }>;
          console.error("Failed to initialize auth:", error);

          get().logout();
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error("Auth rehydration error", error);
          toast.error("Erreur de restauration de session");
        }
        if (state?.token) {
          state.isAuthenticated = true;
          state.isLoading = false;
        }
      },
    }
  )
);
