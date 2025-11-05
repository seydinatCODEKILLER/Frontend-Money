import type { ApiResponse } from '@/api/types';
import type { Transaction, TransactionsResponse } from '../types/transaction.types';
import { apiClient } from '@/api/client';
import type { TransactionFormValues } from '../validations/transaction.schema';

export const transactionApi = {
  // Récupérer les transactions avec pagination et filtres
  getTransactions: async (params: {
    page?: number;
    limit?: number;
    type?: string;
    categoryId?: string;
    startDate?: string;
    endDate?: string;
    search?: string;
    status?: string;
  } = {}): Promise<TransactionsResponse> => {
    const response = await apiClient.get<ApiResponse<TransactionsResponse>>('/transactions', { params });
    if (!response.data.success) {
      throw new Error(response.data.message || 'Erreur lors du chargement des transactions');
    }
    return response.data.data;
  },

  // Créer une transaction
  createTransaction: async (data: TransactionFormValues): Promise<Transaction> => {
    const response = await apiClient.post<ApiResponse<Transaction>>('/transactions', data);
    if (!response.data.success) {
      throw new Error(response.data.message || 'Erreur lors de la création de la transaction');
    }
    return response.data.data;
  },

  // Mettre à jour une transaction
  updateTransaction: async (id: string, data: TransactionFormValues): Promise<Transaction> => {
    const response = await apiClient.put<ApiResponse<Transaction>>(`/transactions/${id}`, data);
    if (!response.data.success) {
      throw new Error(response.data.message || 'Erreur lors de la mise à jour de la transaction');
    }
    return response.data.data;
  },

  // Supprimer une transaction (soft delete)
  deleteTransaction: async (id: string): Promise<void> => {
    const response = await apiClient.delete<ApiResponse<void>>(`/transactions/${id}`);
    if (!response.data.success) {
      throw new Error(response.data.message || 'Erreur lors de la suppression de la transaction');
    }
  },

  // Restaurer une transaction
  restoreTransaction: async (id: string): Promise<Transaction> => {
    const response = await apiClient.patch<ApiResponse<Transaction>>(`/transactions/${id}/restore`);
    if (!response.data.success) {
      throw new Error(response.data.message || 'Erreur lors de la restauration de la transaction');
    }
    return response.data.data;
  },
}