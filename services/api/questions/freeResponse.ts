import {FreeResponseSubmissionInput} from "@/types/questions/FreeResponseQuestionSubmission";
import {FreeResponseQuestionSubmissionRow} from "@/db/types/questions";

export const addFreeResponseQuestion = async (question: FreeResponseSubmissionInput): Promise<FreeResponseQuestionSubmissionRow> => {
    return await fetch("/api/questions/freeResponse", {
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
            type: question.type,
            question_type: question.questionType,
            task_id: question.taskId,
        }),
    })
        .then(res => res.json())
        .catch(() => null);
}