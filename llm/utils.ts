import gemini from "@/llm/gemini";
import {GoogleGenerativeAIStream, StreamingTextResponse} from "ai";

export const generate = async (prompt: string) => {
    const generateContentResult = await gemini.generateContent(prompt);
    return generateContentResult.response.text();
}

const parseResponseJson = (response: string) => {
    const jsonStart = response.indexOf('{');
    const jsonEnd = response.lastIndexOf('}');
    return JSON.parse(response.substring(jsonStart, jsonEnd + 1));
}

export const generateJson = async <ResponseType>(prompt: string): Promise<ResponseType> => {
    try {
        return parseResponseJson(await generate(prompt));
    } catch (e) {
        return generateJson(prompt)
    }
}