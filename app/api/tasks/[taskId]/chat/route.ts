import {OpenAIStream, StreamingTextResponse,} from 'ai';

import openai, {model} from "@/llm/openai";

export const runtime = 'edge';

export async function POST(req: Request) {
    const { messages, images } = await req.json();

    const initialMessages = messages.slice(0, -1);
    const currentMessage = messages[messages.length - 1];


    let stream = OpenAIStream(await openai.chat.completions.create({
        model,
        response_format: {
            type: 'json_object'
        },
        stream: true,
        messages: [
            ...initialMessages,
            {
                ...currentMessage,
                content: images.length > 0 ? [
                    { type: 'text', text: currentMessage.content },
                    ...images.map((url: string)  => ({
                        type: 'image_url',
                        image_url: {
                            url
                        }
                    })),
                ]: currentMessage.content,
            },
        ],
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
