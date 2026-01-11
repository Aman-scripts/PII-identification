"use client"

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Message as MessageType } from '@/lib/types/chat';
import { Bot, User } from 'lucide-react';

interface MessageProps {
    message: MessageType;
}

export function Message({ message }: MessageProps) {
    const isUser = message.role === 'user';
    const formattedTime = message.timestamp.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <div
            className={`flex gap-3 mb-4 ${isUser ? 'flex-row-reverse' : 'flex-row'
                }`}
        >
            <Avatar className="h-8 w-8 mt-1 flex-shrink-0">
                <AvatarFallback
                    className={
                        isUser
                            ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
                            : 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white'
                    }
                >
                    {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </AvatarFallback>
            </Avatar>

            <div
                className={`flex flex-col max-w-[80%] ${isUser ? 'items-end' : 'items-start'
                    }`}
            >
                <div
                    className={`rounded-2xl px-4 py-2.5 ${isUser
                            ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
                            : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700'
                        }`}
                >
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                        {isUser ? (
                            <p className="m-0 whitespace-pre-wrap">{message.content}</p>
                        ) : (
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    p: ({ children }) => <p className="m-0 mb-2 last:mb-0">{children}</p>,
                                    ul: ({ children }) => <ul className="m-0 mb-2 last:mb-0 pl-4">{children}</ul>,
                                    ol: ({ children }) => <ol className="m-0 mb-2 last:mb-0 pl-4">{children}</ol>,
                                    li: ({ children }) => <li className="mb-1">{children}</li>,
                                    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                                    code: ({ children }) => (
                                        <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm">
                                            {children}
                                        </code>
                                    ),
                                }}
                            >
                                {message.content}
                            </ReactMarkdown>
                        )}
                    </div>
                </div>
                <span className="text-xs text-gray-500 mt-1 px-2">{formattedTime}</span>
            </div>
        </div>
    );
}
