import {MultipleChoiceQuestionSubmissionRow} from "@/db/types/questions";
import {MultipleChoiceSubmissionInput} from "@/types/questions/MultipleChoiceQuestionSubmission";

export const addMultipleChoiceQuestion = async (
    question: MultipleChoiceSubmissionInput
): Promise<MultipleChoiceQuestionSubmissionRow> => {
    return await fetch("/api/questions/multipleChoice", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user_id: question.userId,
            topic_id: question.topicId,
            question: question.question,
            correct: question.correct,
            explanation: question.explanation,
            timestamp: question.timestamp,
            answer: question.answer,
            option_a: question.optionA,
            option_b: question.optionB,
            option_c: question.optionC,
            option_d: question.optionD,
            correct_answer: question.correctAnswer,
            question_type: question.questionType,
            task_id: question.taskId,
        }),
    })
        .then(res => res.json())
        .catch(() => null);
}