import {CommandTags, ResponseTags} from "@/llm/prompts/commands/tags";

import {Command, CommandTypes} from "@/types/commands/Command";
import {Hint} from "@/types/commands/Hint";
import {Stringified} from "@/types/Stringified";

const hintResponseDescription = 'Hints should be helpful but should not give away the answer. Do NOT too much information as the user should still be able to solve the problem on their own.';
const hintResponseFormat: Stringified<Hint> = {
    hint: ': string <hint>'
};
const hintPromptContent = 'Please provide a hint for the user.';

export const hintCommand: Command<Hint> = {
    responseTag: ResponseTags.HINT,
    responseDescription: hintResponseDescription,
    responseFormatting: hintResponseFormat,
    promptTag: CommandTags.HINT,
    promptContent: hintPromptContent,
    promptType: CommandTypes.HINT
}