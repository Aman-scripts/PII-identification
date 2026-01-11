"use client"

import React from 'react';

export function TypingIndicator() {
    return (
        <div className="flex items-center gap-1 px-4 py-2">
            <div className="flex gap-1">
                <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.3s]"></div>
                <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.15s]"></div>
                <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"></div>
            </div>
            <span className="text-sm text-gray-500 ml-2">AI is typing...</span>
        </div>
    );
}
