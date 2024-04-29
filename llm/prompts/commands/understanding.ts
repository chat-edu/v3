import {Command, CommandTypes} from "@/types/commands/Command";
import {TextBasedQuestion} from "@/types/commands/TextBasedQuestion";
import {CommandTags, ResponseTags} from "@/llm/prompts/commands/tags";
import {Stringified} from "@/types/Stringified";

export const understandingResponseDescription = 'Text-based understanding questions should ask the user to demonstrate their understanding of the topics covered in their notes. They should be able to explain the concepts and why they are relevant.';
const responseFormatting: Stringified<TextBasedQuestion> = {
    question: 'string: <question>?'
};
const promptContent = `Please ask me an understanding question`;

export const understandingQuestionCommand: Command<TextBasedQuestion> = {
    responseTag: ResponseTags.UNDERSTANDING,
    responseDescription: understandingResponseDescription,
    responseFormatting,
    promptTag: CommandTags.UNDERSTANDING,
    promptContent,
    promptType: CommandTypes.TEXT_BASED
}