// features/chat/components/ChatModal.tsx
import { useState, useRef, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Send, 
  Bot, 
  Trash2,
  Minimize2,
  MessageCircle
} from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { TypingAnimation } from './TypingAnimation';
import { useChatHistory, useSendMessage, useClearChatHistory } from '../hooks/useChat';

interface ChatModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChatModal({ open, onOpenChange }: ChatModalProps) {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: historyData, isLoading: isLoadingHistory } = useChatHistory({ 
    page: 1, 
    limit: 50 
  });
  const sendMessageMutation = useSendMessage();
  const clearHistoryMutation = useClearChatHistory();

  // Inverser l'ordre des messages pour avoir les plus récents en bas
  const messages = historyData?.messages ? [...historyData.messages].reverse() : [];
  const isTyping = sendMessageMutation.isPending;

  // Scroll vers le bas quand de nouveaux messages arrivent
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Focus sur l'input quand le modal s'ouvre
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus();
        scrollToBottom();
      }, 300);
    }
  }, [open]);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        setTimeout(() => {
          scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }, 100);
      }
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || sendMessageMutation.isPending) return;

    const content = message.trim();
    setMessage('');
    
    try {
      await sendMessageMutation.mutateAsync(content);
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message :', error);
    }
  };

  const handleClearHistory = async () => {
    if (messages.length === 0) return;
    
    try {
      await clearHistoryMutation.mutateAsync();
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'historique :', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="w-full md:max-w-2xl lg:max-w-4xl h-[96vh] md:max-h-[90vh] lg:max-h-[85vh] flex flex-col p-0 rounded-2xl border-0 bg-gradient-to-br from-white to-gray-50/80 dark:from-gray-900 dark:to-gray-800/80 shadow-2xl overflow-hidden"
      >
        {/* Description cachée pour l'accessibilité */}
        <DialogDescription className="sr-only">
  Chat d’assistance financière IA — posez vos questions concernant la gestion de budget, dépenses, épargne, etc.
</DialogDescription>

        
        {/* Header - Hauteur fixe */}
        <DialogHeader className="flex-shrink-0 flex flex-row items-center justify-between p-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-gray-900 dark:text-white">
                Assistant Financier
              </DialogTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Posez-moi vos questions sur vos finances
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClearHistory}
              disabled={messages.length === 0 || clearHistoryMutation.isPending}
              className="rounded-xl w-9 h-9 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 cursor-pointer transition-all duration-300 hover:scale-105"
              aria-label="Effacer l'historique de conversation"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="rounded-xl w-9 h-9 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white cursor-pointer transition-all duration-300 hover:scale-105"
              aria-label="Fermer la fenêtre de chat"
            >
              <Minimize2 className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Messages Area - Prend tout l'espace disponible */}
        <div className="flex-1 min-h-0">
          <ScrollArea ref={scrollAreaRef} className="h-full p-4 lg:p-6">
            <div className="flex flex-col min-h-full justify-end">
              <div className="space-y-4">
                {isLoadingHistory ? (
                  <div className="flex justify-center py-8">
                    <TypingAnimation />
                  </div>
                ) : messages.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/20 flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Commencez la conversation
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                      Posez-moi vos questions sur vos finances, budgets, économies, ou investissements. Je suis là pour vous aider !
                    </p>
                  </div>
                ) : (
                  messages.map((msg) => (
                    <ChatMessage key={msg.id} message={msg} />
                  ))
                )}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex gap-3 max-w-full">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-sm">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="rounded-2xl px-4 py-3 shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 backdrop-blur-sm">
                      <TypingAnimation />
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Input Area - Hauteur fixe */}
        <div className="flex-shrink-0 p-6 border-t border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-b-2xl">
          <form onSubmit={handleSendMessage} className="flex gap-3">
            <Input
              ref={inputRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Posez votre question..."
              className="flex-1 rounded-xl border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              disabled={sendMessageMutation.isPending}
              aria-label="Message à envoyer à l'assistant financier"
            />
            <Button
              type="submit"
              disabled={!message.trim() || sendMessageMutation.isPending}
              className="rounded-xl px-4 cursor-pointer bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-sm transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
              aria-label="Envoyer le message"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
          
          {/* Suggestions rapides */}
          {messages.length === 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {[
                "Comment réduire mes dépenses ?",
                "Analyser mon budget du mois",
              ].map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="outline"
                  size="sm"
                  onClick={() => setMessage(suggestion)}
                  className="rounded-lg text-xs cursor-pointer hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-200 dark:hover:border-purple-700 transition-all duration-300"
                  aria-label={`Suggestion: ${suggestion}`}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}