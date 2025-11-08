import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { chatApi } from '../api/chat.api';
import { toast } from 'sonner';
import { apiUtils } from '@/utils/apiUtils';

export const useChatHistory = (params: { page?: number; limit?: number } = {}) => {
  return useQuery({
    queryKey: ['chat', 'history', params],
    queryFn: () => chatApi.getChatHistory(params),
    staleTime: 1000 * 60 * 5,
  });
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: chatApi.sendMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat', 'history'] });
    },
    onError: (error: Error) => {
      const errorMessage = apiUtils.handleApiError(error);
      toast.error('Erreur lors de l\'envoi', {
        description: errorMessage,
      });
    },
  });
};

export const useClearChatHistory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: chatApi.clearChatHistory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat', 'history'] });
      toast.success('Historique effacé avec succès');
    },
    onError: (error: Error) => {
      const errorMessage = apiUtils.handleApiError(error);
      toast.error('Erreur lors de la suppression', {
        description: errorMessage,
      });
    },
  });
};