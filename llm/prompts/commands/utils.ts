import {Command} from "@/types/commands/Command";
import {JsonCommand} from "@/types/commands/JsonCommand";

export const getPrePrompt = (prompt: Command<any>): string => `
    Content: ${prompt.responseDescription}
    
    Responses are to be in JSON format. the 'content' field is to be filled exactly as specified. The first part of each field is its type. The part after the colon is the description of the field.
    
    <> indicates a placeholder. Do NOT include the <> in your response, but ensure that the placeholder's description is satisfied. Items wrapped in "" must be included as is.
    
    JSON Template: {
        tag: "${prompt.responseTag}",
        content: ${JSON.stringify(prompt.responseFormatting)}
    }
`;

export const getCommandFormat = (prompt: Command<any>): string => `{
    tag: "${prompt.responseTag}",
    content: ${JSON.stringify(prompt.responseFormatting)}
}`;


export const getPrompt = (prompt: Command<any>): JsonCommand => {
    return {
        tag: prompt.promptTag,
        content: prompt.promptContent
    }
}

export const parseResponse = <ResponseType>(
    content: object,
): ResponseType => {
    return content as ResponseType;
};