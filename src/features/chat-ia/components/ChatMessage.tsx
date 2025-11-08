import { cn } from '@/lib/utils';
import { Bot, User, Copy, CheckCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import type { ChatMessage as ChatMessageType } from '../types/chat.types';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'USER';
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const { user } = useAuth();

  const copyToClipboard = async (code: string, language: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedCode(language);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Générer les initiales de l'utilisateur
  const getUserInitials = () => {
    if (!user) return 'U';
    const { prenom, nom } = user;
    if (prenom && nom) {
      return `${prenom.charAt(0)}${nom.charAt(0)}`.toUpperCase();
    }
    return user.email?.charAt(0).toUpperCase() || 'U';
  };

  const formatMessageContent = (content: string) => {
    return (
      <ReactMarkdown
        components={{
          // Styles pour les titres
          h1: ({ children }) => <h1 className="text-xl font-bold mt-4 mb-2 text-gray-900 dark:text-white break-words">{children}</h1>,
          h2: ({ children }) => <h2 className="text-lg font-bold mt-3 mb-2 text-gray-900 dark:text-white break-words">{children}</h2>,
          h3: ({ children }) => <h3 className="text-base font-bold mt-2 mb-1 text-gray-900 dark:text-white break-words">{children}</h3>,
          
          // Styles pour les paragraphes
          p: ({ children }) => <p className="mb-2 leading-relaxed text-gray-700 dark:text-gray-300 break-words">{children}</p>,
          
          // Styles pour les listes
          ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1 text-gray-700 dark:text-gray-300 break-words">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1 text-gray-700 dark:text-gray-300 break-words">{children}</ol>,
          li: ({ children }) => <li className="ml-4 break-words">{children}</li>,
          
          // Styles pour les tableaux
          table: ({ children }) => (
            <div className="overflow-x-auto my-3 max-w-full">
              <table className="min-w-full border-collapse border border-gray-200 dark:border-gray-700 rounded-lg text-sm">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => <thead className="bg-gray-50 dark:bg-gray-800">{children}</thead>,
          tbody: ({ children }) => <tbody className="divide-y divide-gray-200 dark:divide-gray-700">{children}</tbody>,
          tr: ({ children }) => <tr className="divide-x divide-gray-200 dark:divide-gray-700">{children}</tr>,
          th: ({ children }) => (
            <th className="px-3 py-2 text-left font-semibold text-gray-900 dark:text-white text-xs break-words">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-3 py-2 text-gray-700 dark:text-gray-300 text-xs break-words">
              {children}
            </td>
          ),
          
          // Styles pour les blocs de code
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            const code = String(children).replace(/\n$/, '');

            if (language) {
              return (
                <div className="relative my-3 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 max-w-full">
                  <div className="flex items-center justify-between px-3 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-xs font-mono text-gray-600 dark:text-gray-400">
                      {language}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(code, language)}
                      className="h-6 px-2 text-xs cursor-pointer"
                    >
                      {copiedCode === language ? (
                        <CheckCheck className="w-3 h-3 text-green-600" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </Button>
                  </div>
                  <SyntaxHighlighter
                    style={oneDark}
                    language={language}
                    PreTag="div"
                    className="!m-0 !bg-gray-900 text-xs max-w-full overflow-x-auto"
                    customStyle={{
                      margin: 0,
                      borderRadius: 0,
                      background: 'rgb(17, 24, 39)',
                      fontSize: '0.75rem',
                      lineHeight: '1.2',
                    }}
                    wrapLongLines={true}
                  >
                    {code}
                  </SyntaxHighlighter>
                </div>
              );
            }

            return (
              <code
                className={cn(
                  "px-1.5 py-0.5 rounded-md text-sm font-mono break-words",
                  "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200",
                  "border border-gray-200 dark:border-gray-700"
                )}
                {...props}
              >
                {children}
              </code>
            );
          },
          
          // Styles pour les blockquotes
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-500 pl-4 my-3 italic text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 py-2 rounded-r-lg break-words">
              {children}
            </blockquote>
          ),
          
          // Styles pour les liens
          a: ({ children, href }) => (
            <a
              href={href}
              className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-2 break-words"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    );
  };

  return (
    <div
      className={cn(
        "flex gap-3 w-full",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {/* Avatar - seulement pour l'IA */}
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-sm">
          <Bot className="w-4 h-4" />
        </div>
      )}

      {/* Message */}
      <div
        className={cn(
          "rounded-2xl px-4 py-3 shadow-sm border backdrop-blur-sm max-w-[85%]",
          "transition-all duration-300 hover:shadow-md",
          isUser
            ? "bg-blue-600 text-white border-blue-500"
            : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
        )}
      >
        <div className={cn(
          "prose prose-sm max-w-none break-words",
          isUser ? "prose-invert" : "prose-gray dark:prose-invert",
          "prose-p:my-1 prose-headings:my-2 prose-ul:my-1 prose-ol:my-1 prose-blockquote:my-2",
          "prose-code:break-all prose-pre:overflow-x-auto"
        )}>
          {formatMessageContent(message.content)}
        </div>
        
        {/* Timestamp */}
        <div
          className={cn(
            "text-xs mt-2 pt-2 border-t",
            isUser
              ? "text-blue-100 border-blue-500/30"
              : "text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-600"
          )}
        >
          {new Date(message.createdAt).toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>

      {/* Avatar - seulement pour l'utilisateur */}
      {isUser && (
        <Avatar className="flex-shrink-0 w-8 h-8 border-2 border-white dark:border-gray-800 shadow-sm">
          <AvatarImage 
            src={user?.avatarUrl} 
            alt={`${user?.prenom} ${user?.nom}`}
          />
          <AvatarFallback className="bg-blue-600 text-white text-xs">
            {user?.avatarUrl ? (
              <User className="w-3 h-3" />
            ) : (
              getUserInitials()
            )}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}