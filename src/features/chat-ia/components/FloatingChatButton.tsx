import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Bot } from 'lucide-react';
import { ChatModal } from './ChatModal';
import { cn } from '@/lib/utils';

interface FloatingChatButtonProps {
  className?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

export function FloatingChatButton({ 
  className,
  position = 'bottom-right'
}: FloatingChatButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed z-50 w-14 h-14 rounded-full shadow-2xl cursor-pointer",
          "bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
          "text-white border-0 transition-all duration-500 hover:scale-110",
          "group overflow-hidden",
          positionClasses[position],
          className
        )}
      >
        {/* Icon avec animation */}
        <div className="relative">
          <Bot className="w-8 h-8 transition-all duration-300 group-hover:scale-110" />
          
          {/* Effet de pulsation */}
          <div className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-0 group-hover:opacity-100" />
        </div>

        {/* Tooltip */}
        <div className="absolute bottom-full mb-2 hidden group-hover:block">
          <div className="bg-gray-900 text-white text-xs rounded-lg py-1 px-2 whitespace-nowrap">
            Assistant IA
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
          </div>
        </div>
      </Button>

      <ChatModal open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}