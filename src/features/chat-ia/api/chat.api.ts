import type { ApiResponse } from '@/api/types';
import type { ChatHistoryResponse, SendMessageResponse } from '../types/chat.types';
import { apiClient } from '@/api/client';

export const chatApi = {
  // Envoyer un message et recevoir la réponse
  sendMessage: async (content: string): Promise<SendMessageResponse> => {
    const response = await apiClient.post<ApiResponse<SendMessageResponse>>('/chat/messages', { content });
    if (!response.data.success) {
      throw new Error(response.data.message || 'Erreur lors de l\'envoi du message');
    }
    return response.data.data;
  },

  // Récupérer l'historique des conversations
  getChatHistory: async (params: {
    page?: number;
    limit?: number;
  } = {}): Promise<ChatHistoryResponse> => {
    const response = await apiClient.get<ApiResponse<ChatHistoryResponse>>('/chat/messages', { params });
    if (!response.data.success) {
      throw new Error(response.data.message || 'Erreur lors du chargement de l\'historique');
    }
    return response.data.data;
  },

  // Effacer l'historique des conversations
  clearChatHistory: async (): Promise<{ deletedCount: number }> => {
    const response = await apiClient.delete<ApiResponse<{ deletedCount: number }>>('/chat/messages');
    if (!response.data.success) {
      throw new Error(response.data.message || 'Erreur lors de la suppression de l\'historique');
    }
    return response.data.data;
  },
};