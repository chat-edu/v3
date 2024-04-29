import {CommandTags, ResponseTags} from "@/llm/prompts/commands/tags";

import {Command, CommandTypes} from "@/types/commands/Command";
import {AnswerCorrectness} from "@/types/commands/AnswerCorrectness";
import {Stringified} from "@/types/Stringified";

export const answerCorrectnessResponseTag = 'Answer Correctness';
const answerCorrectnessResponseDescription = `Please respond by saying whether the user has answered are correct and explain why. Speak in the second person. Provide an explanation of the correct answer if the user\'s answer is incorrect. The question asked is as follows: `;
const answerCorrectnessResponseFormatting: Stringified<AnswerCorrectness> = {
    correct: `boolean: <true/false>`,
    "explanation": "string: <explanation>"
}

export const answerCorrectnessCommand = (question: string, answer: string): Command<AnswerCorrectness> => ({
    ...answerCorrectnessDefaults,
    responseDescription: answerCorrectnessResponseDescription + question,
    promptContent: answer,
});

export const answerCorrectnessDefaults: Command<AnswerCorrectness> = {
    responseTag: ResponseTags.ANSWER_CORRECTNESS,
    responseDescription: answerCorrectnessResponseDescription,
    responseFormatting: answerCorrectnessResponseFormatting,
    promptTag: CommandTags.ANSWER_CORRECTNESS,
    promptType: CommandTypes.REGULAR,
    promptContent: ''
}