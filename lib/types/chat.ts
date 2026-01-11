export type MessageRole = 'user' | 'assistant';

export interface Message {
    id: string;
    role: MessageRole;
    content: string;
    timestamp: Date;
}

export interface ChatRequest {
    message: string;
    history: Message[];
}

export interface ChatResponse {
    message: string;
    timestamp: Date;
}
