import openai, {model} from "@/llm/openai";

export const generate = async (prompt: string) => {
    const chatCompletion = await openai.chat.completions.create({
        model,
        messages: [{role: 'user', content: prompt}]
    });
    return chatCompletion.choices[0].message.content;
}

export const generateJson = async <ResponseType>(prompt: string): Promise<ResponseType> => {
    const chatCompletion = await openai.chat.completions.create({
        model,
        messages: [{role: 'user', content: prompt}],
        response_format: {
            type: 'json_object'
        }
    });
    return JSON.parse(chatCompletion.choices[0].message.content as string) as ResponseType;
}