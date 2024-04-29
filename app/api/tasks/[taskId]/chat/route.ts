import {GoogleGenerativeAIStream, Message, StreamingTextResponse} from 'ai';
import gemini from "@/llm/gemini";
import {GenerateContentRequest} from "@google/generative-ai";

export const runtime = 'edge';

// convert messages from the Vercel AI SDK Format to the format
// that is expected by the Google GenAI SDK
const buildGoogleGenAIPrompt = (messages: Message[], systemInstruction: string): GenerateContentRequest => ({
    contents: messages
        .filter(message => message.role === 'user' || message.role === 'assistant')
        .map(message => ({
            role: message.role === 'user' ? 'user' : 'model',
            parts: [{ text: message.content }],
        })),
    systemInstruction: {
        role: 'model',
        parts: [{ text: systemInstruction }],
    },
});

export async function POST(req: Request) {
    // Extract the `prompt` from the body of the request
    const { messages, systemInstruction } = await req.json();

    const geminiStream = await gemini
        .generateContentStream(buildGoogleGenAIPrompt(messages, systemInstruction));

    // Convert the response into a friendly text-stream
    const stream = GoogleGenerativeAIStream(geminiStream);

    // Respond with the stream
    return new StreamingTextResponse(stream);
}