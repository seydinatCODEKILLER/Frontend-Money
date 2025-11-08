export type MessageRole = "USER" | "ASSISTANT";

export interface ChatMessage {
  id: string;
  content: string;
  role: MessageRole;
  createdAt: string;
}

export interface ChatHistoryResponse {
  messages: ChatMessage[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface SendMessageResponse {
  userMessage: ChatMessage;
  assistantMessage: ChatMessage;
}