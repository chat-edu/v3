import openai, {model} from "@/llm/openai";
import OpenAI from "openai";
import ChatCompletionContentPart = OpenAI.ChatCompletionContentPart;

export const generate = async (prompt: string, images?: string[]) => {
    const chatCompletion = await openai.chat.completions.create({
        model,
        messages: (images && images.length > 0 ? [
            {
                role: 'user',
                content: [
                    { type: 'text', text: prompt },
                    ...images.map((url: string)  => ({
                        type: 'image_url',
                        image_url: {
                            url
                        }
                    })),
                ] as ChatCompletionContentPart[]
            }
        ] : [{role: 'user', content: prompt}])
    });
    return chatCompletion.choices[0].message.content;
}

export const generateJson = async <ResponseType>(prompt: string, images?: string[]): Promise<ResponseType> => {
    const chatCompletion = await openai.chat.completions.create({
        model,
        messages: (images && images.length > 0 ? [
            {
                role: 'user',
                content: [
                    { type: 'text', text: prompt },
                    ...images.map((url: string)  => ({
                        type: 'image_url',
                        image_url: {
                            url
                        }
                    })),
                ] as ChatCompletionContentPart[]
            }
        ] : [{role: 'user', content: prompt}]),
        response_format: {
            type: 'json_object'
        }
    });
    return JSON.parse(chatCompletion.choices[0].message.content as string) as ResponseType;
}