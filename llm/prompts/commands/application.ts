import {Command, CommandTypes} from "@/types/commands/Command";
import {TextBasedQuestion} from "@/types/commands/TextBasedQuestion";
import {CommandTags, ResponseTags} from "@/llm/prompts/commands/tags";
import {Stringified} from "@/types/Stringified";

export const responseDescription = 'Text-based application questions should ask the user to apply the concepts covered in their notes. They should be able to demonstrate their understanding of the concepts by applying them to a new situation. Create examples or practice problems based on the concepts covered in the notes. Do NOT include any indication of the answer.';
const responseFormatting: Stringified<TextBasedQuestion> = {
    question: 'string: <question>?'
};
const promptContent = `Please ask me an application question`;

export const applicationQuestionCommand: (topic: string) => Command<TextBasedQuestion> = (topic: string) => ({
    responseTag: ResponseTags.APPLICATION,
    responseDescription,
    responseFormatting,
    promptTag: CommandTags.APPLICATION,
    promptContent,
    promptType: CommandTypes.TEXT_BASED
})