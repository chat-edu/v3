import gemini from "@/llm/gemini";

const parseResponseJson = (response: string) => {
    const jsonStart = response.indexOf('{');
    const jsonEnd = response.lastIndexOf('}');
    return JSON.parse(response.substring(jsonStart, jsonEnd + 1));
}

export const generate = async (prompt: string) => {
    const generateContentResult = await gemini.generateContent(prompt);
    const responseText = generateContentResult.response.text();
    return parseResponseJson(responseText);
}