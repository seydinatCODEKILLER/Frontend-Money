// src/hooks/useApi.ts
import { useCallback } from 'react';
import { apiClient, type RequestConfig } from '@/api/client';
import type { ApiResponse, PaginatedResponse } from '@/api/types';

export const useApi = () => {
  const request = useCallback(
    async <T = unknown>(config: RequestConfig): Promise<T> => {
      const response = await apiClient.request<ApiResponse<T>>(config);
      return response.data.data;
    },
    []
  );

  const requestPaginated = useCallback(
    async <T = unknown>(config: RequestConfig): Promise<PaginatedResponse<T>> => {
      const response = await apiClient.request<PaginatedResponse<T>>(config);
      return response.data;
    },
    []
  );

  return { request, requestPaginated };
};
