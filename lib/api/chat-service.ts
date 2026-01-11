import { ChatRequest, ChatResponse, Message } from '@/lib/types/chat';

export class ChatService {
    private static readonly API_URL = '/api/chat';

    static async sendMessage(
        message: string,
        history: Message[]
    ): Promise<ChatResponse> {
        try {
            const requestBody: ChatRequest = {
                message,
                history,
            };

            const response = await fetch(this.API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: ChatResponse = await response.json();

            // Convert timestamp string back to Date object
            return {
                ...data,
                timestamp: new Date(data.timestamp),
            };
        } catch (error) {
            console.error('Error sending message:', error);
            throw new Error('Failed to send message. Please try again.');
        }
    }
}
