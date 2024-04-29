import {OpenAIStream, StreamingTextResponse} from 'ai';

import openai, {model} from "@/llm/openai";

export const runtime = 'edge';

export async function POST(req: Request) {
    const { messages } = await req.json();

    let stream = OpenAIStream(await openai.chat.completions.create({
        model,
        response_format: {
            type: 'json_object'
        },
        stream: true,
        messages: messages,
    }));

    return new StreamingTextResponse(
        stream, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            }
        }
    );
}

export async function OPTIONS() {
    return new Response(null, {
        status: 204,
    })
}
