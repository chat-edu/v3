import {CommandTags, ResponseTags} from "@/llm/prompts/commands/tags";

import {Command, CommandTypes} from "@/types/commands/Command";
import {MultipleChoiceQuestion} from "@/types/commands/MultipleChoiceQuestion";
import {Stringified} from "@/types/Stringified";

const multipleChoiceResponseDescription = 'Multiple choice questions should be challenging and force the user to demonstrate understanding of the topic. They SHOULD NOT simply be a definition or a fact. They should be a question that requires the user to think about the topic and apply their knowledge. Feel free to use examples of scenarios or practice examples to help the user understand the topic better. Ensure there are no ambiguities in the answers, meaning there is ONLY ONE correct answer to the problem. DO NOT include any explanation of the correct answer. The question should only be the question itself and should not have the options listed. The options should be listed separately. The answer should be the letter of the correct answer. For example, if the correct answer is "A", the answer should be "A".'
const multipleChoiceResponseFormatting: Stringified<MultipleChoiceQuestion> = {
    question: 'string: <question>?',
    options: `object: {
        "A": string,
        "B": string,
        "C": string,
        "D": string
    }`,
    answer: "string: <A/B/C/D>"
}
const multipleChoicePromptContent = (topic: string) => `Ask me a multiple choice question about ${topic} according to the notes in the first system prompt.`

export const multipleChoiceCommand: (topic: string) => Command<MultipleChoiceQuestion> = (topic: string) => ({
    responseTag: ResponseTags.MULTIPLE_CHOICE,
    responseDescription: multipleChoiceResponseDescription,
    responseFormatting: multipleChoiceResponseFormatting,
    promptTag: CommandTags.MULTIPLE_CHOICE,
    promptContent: multipleChoicePromptContent(topic),
    promptType: CommandTypes.MULTIPLE_CHOICE
})