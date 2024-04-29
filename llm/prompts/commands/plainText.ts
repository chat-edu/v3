import {CommandTags, ResponseTags} from "@/llm/prompts/commands/tags";

import {Command, CommandTypes} from "@/types/commands/Command";

const plainTextDescription = "The user has sent you this message."
const plainTextResponseFormat = 'string: <content>'

export const plainTextCommand = (promptContent: string): Command<string> => ({
    responseTag: ResponseTags.PLAIN_TEXT,
    responseDescription: plainTextDescription,
    responseFormatting: plainTextResponseFormat,
    promptTag: CommandTags.PLAIN_TEXT,
    promptContent,
    promptType: CommandTypes.PLAIN_TEXT
})