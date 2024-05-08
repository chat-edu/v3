import {addFreeResponseQuestion} from "@/services/api/questions/freeResponse";
import {addMultipleChoiceQuestion} from "@/services/api/questions/multipleChoice";

import {QuestionSubmission} from "@/types/questions/QuestionSubmission";
import {Message} from "ai";
import {ResponseTags} from "@/llm/prompts/commands";
import {MultipleChoiceKey, MultipleChoiceQuestion} from "@/types/commands/MultipleChoiceQuestion";
import {User} from "@/types/User";
import {Topic} from "@/types/graph/Topic";
import {AnswerCorrectness} from "@/types/commands/AnswerCorrectness";
import {TextBasedQuestion} from "@/types/commands/TextBasedQuestion";
import {FreeResponseQuestionTypes, QuestionTypes} from "@/db/types/questions";
import {Task} from "@/types/task/Task";

export const deleteQuestion = async (questionId: QuestionSubmission["id"]) =>
    await fetch(`/api/questions/${questionId}`, {
        method: "DELETE",
    })
        .then((res) => res.json())
        .then((data) => data)
        .catch(() => false);

export const addQuestionFromMessage = async (
    userId: User["id"],
    topicId: Topic["id"],
    taskId: Task["id"],
    questionMessage: Message,
    answer: string,
    answerCorrectnessMessage: Message
) => {
    const parsedQuestionMessage = JSON.parse(questionMessage.content);
    const parsedAnswerCorrectnessMessage = JSON.parse(answerCorrectnessMessage.content).content as AnswerCorrectness;
    switch (parsedQuestionMessage.tag) {
        case ResponseTags.MULTIPLE_CHOICE:
            const mcq = parsedQuestionMessage.content as MultipleChoiceQuestion;
            const userAnswer = Object.keys(mcq.options).find((key) => {
                return mcq.options[key as MultipleChoiceKey] === answer
            });
            if (!userAnswer) return null;
            return await addMultipleChoiceQuestion({
                userId,
                topicId,
                question: mcq.question,
                correct: parsedAnswerCorrectnessMessage.correct,
                explanation: parsedAnswerCorrectnessMessage.explanation,
                timestamp: new Date(),
                correctAnswer: mcq.answer,
                optionA: mcq.options.A,
                optionB: mcq.options.B,
                optionC: mcq.options.C,
                optionD: mcq.options.D,
                answer: userAnswer as MultipleChoiceKey,
                questionType: QuestionTypes.MultipleChoice,
                taskId
            });
        case ResponseTags.APPLICATION:
        case ResponseTags.UNDERSTANDING:
            const frq = parsedQuestionMessage.content as TextBasedQuestion;
            return await addFreeResponseQuestion({
                userId,
                topicId,
                question: frq.question,
                correct: parsedAnswerCorrectnessMessage.correct,
                explanation: parsedAnswerCorrectnessMessage.explanation,
                timestamp: new Date(),
                answer,
                type: parsedQuestionMessage.type === ResponseTags.APPLICATION
                    ? FreeResponseQuestionTypes.Application
                    : FreeResponseQuestionTypes.Understanding,
                questionType: QuestionTypes.FreeResponse,
                taskId
            })
        default:
            return null;
    }
}