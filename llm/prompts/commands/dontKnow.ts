import {CommandTags, ResponseTags} from "@/llm/prompts/commands/tags";

import {Command, CommandTypes} from "@/types/commands/Command";
import {Stringified} from "@/types/Stringified";
import {DontKnow} from "@/types/commands/DontKnow";

const dontKnowResponseDescription = 'The user doesn\'t know the answer to the question. Explain it to them';
const dontKnowResponseFormat: Stringified<DontKnow> = {
    explanation: 'string: <explanation>'
};
const dontKnowPromptContent = 'I don\'t know.';

export const dontKnowCommand: Command<DontKnow> = {
    responseTag: ResponseTags.DONT_KNOW,
    responseDescription: dontKnowResponseDescription,
    responseFormatting: dontKnowResponseFormat,
    promptTag: CommandTags.DONT_KNOW,
    promptContent: dontKnowPromptContent,
    promptType: CommandTypes.DONT_KNOW
}