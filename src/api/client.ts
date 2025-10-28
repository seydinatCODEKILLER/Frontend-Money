import axios, { type AxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/stores/auth.store';
import { toast } from 'sonner';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status, data } = error.response || {};

    if (status === 401) {
      useAuthStore.getState().logout();
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }

    if (status === 403) {
      toast.error('Accès refusé', { description: data?.message || 'Vous n\'avez pas les permissions' });
    }

    if (status === 422 && data?.errors) {
      const errorMessages = Object.values(data.errors).flat().join(', ');
      toast.error('Erreur de validation', { description: errorMessages });
    }

    if (status >= 500) {
      toast.error('Erreur serveur', { description: data?.message || 'Une erreur est survenue côté serveur' });
    }

    return Promise.reject(error);
  }
);

export type RequestConfig<T = unknown> = AxiosRequestConfig<T>;
