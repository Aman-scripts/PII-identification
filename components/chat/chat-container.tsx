"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Message as MessageComponent } from './message';
import { MessageInput } from './message-input';
import { TypingIndicator } from './typing-indicator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Message } from '@/lib/types/chat';
import { ChatService } from '@/lib/api/chat-service';
import { MessageSquare } from 'lucide-react';

export function ChatContainer() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    // Add welcome message on mount
    useEffect(() => {
        const welcomeMessage: Message = {
            id: 'welcome',
            role: 'assistant',
            content: "Hello! 👋 I'm your AI assistant. How can I help you today?",
            timestamp: new Date(),
        };
        setMessages([welcomeMessage]);
    }, []);

    const handleSendMessage = async (content: string) => {
        // Create user message
        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content,
            timestamp: new Date(),
        };

        // Add user message to the chat
        setMessages((prev) => [...prev, userMessage]);
        setIsLoading(true);

        try {
            // Send message to API
            const response = await ChatService.sendMessage(content, messages);

            // Create assistant message
            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: response.message,
                timestamp: response.timestamp,
            };

            // Add assistant message to the chat
            setMessages((prev) => [...prev, assistantMessage]);
        } catch (error) {
            console.error('Error sending message:', error);

            // Add error message
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: "Sorry, I encountered an error. Please try again.",
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
            {/* Header */}
            <div className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
                            <MessageSquare className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                AI Chat Assistant
                            </h1>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Powered by modern AI technology
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-full">
                    <div className="max-w-4xl mx-auto px-4 py-6">
                        {messages.length === 0 ? (
                            <div className="flex items-center justify-center h-full text-gray-500">
                                <p>No messages yet. Start a conversation!</p>
                            </div>
                        ) : (
                            <>
                                {messages.map((message) => (
                                    <MessageComponent key={message.id} message={message} />
                                ))}
                                {isLoading && <TypingIndicator />}
                                <div ref={messagesEndRef} />
                            </>
                        )}
                    </div>
                </ScrollArea>
            </div>

            {/* Input Area */}
            <MessageInput onSendMessage={handleSendMessage} disabled={isLoading} />
        </div>
    );
}
