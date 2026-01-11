import { NextRequest, NextResponse } from 'next/server';
import { ChatRequest, ChatResponse } from '@/lib/types/chat';

// Mock AI responses for demonstration
const mockResponses = [
    "Hello! I'm here to help you. What would you like to know?",
    "That's an interesting question! Let me think about that...",
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function POST(request: NextRequest) {
    try {
        const body: ChatRequest = await request.json();

        if (!body.message || typeof body.message !== 'string') {
            return NextResponse.json(
                { error: 'Invalid message format' },
                { status: 400 }
            );
        }

        // Simulate processing delay
        await delay(1000 + Math.random() * 1000);

        // Get a random mock response
        const responseMessage = mockResponses[Math.floor(Math.random() * mockResponses.length)];

        const response: ChatResponse = {
            message: responseMessage,
            timestamp: new Date(),
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error('Chat API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
