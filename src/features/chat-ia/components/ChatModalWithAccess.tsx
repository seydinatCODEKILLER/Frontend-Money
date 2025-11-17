import { useAuth } from '@/hooks/useAuth';
import { ChatModal } from './ChatModal';
import { UnauthorizedChatView } from './UnauthorizedChatView';

interface ChatModalWithAccessProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChatModalWithAccess({ open, onOpenChange }: ChatModalWithAccessProps) {
  const { user } = useAuth();

  // Si l'utilisateur n'est pas autorisé à utiliser l'IA
  if (!user?.canUseAI) {
    return <UnauthorizedChatView open={open} onOpenChange={onOpenChange} />;
  }

  // Si l'utilisateur est autorisé, afficher le chat normal
  return <ChatModal open={open} onOpenChange={onOpenChange} />;
}