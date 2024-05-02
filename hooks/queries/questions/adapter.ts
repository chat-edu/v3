import {QuestionSubmission, FreeResponseSubmission, MultipleChoiceSubmission} from "@/types/questions";
import {FreeResponseQuestionSubmissionRow, QuestionSubmissionRow, MultipleChoiceQuestionSubmissionRow} from "@/db/types/questions";

export const adaptQuestionSubmission = (questionSubmission: QuestionSubmissionRow): QuestionSubmission => ({
    id: questionSubmission.id,
    userId: questionSubmission.user_id,
    topicId: questionSubmission.topic_id,
    question: questionSubmission.question,
    correct: questionSubmission.correct,
    explanation: questionSubmission.explanation,
    timestamp: questionSubmission.timestamp,
    taskId: questionSubmission.task_id,
    questionType: questionSubmission.question_type,
})

export const adaptFreeResponseQuestionSubmission = (freeResponseSubmission: FreeResponseQuestionSubmissionRow): FreeResponseSubmission => ({
    ...adaptQuestionSubmission(freeResponseSubmission),
    answer: freeResponseSubmission.answer,
    type: freeResponseSubmission.type,
});

export const adaptMultipleChoiceQuestionSubmission = (multipleChoiceSubmission: MultipleChoiceQuestionSubmissionRow): MultipleChoiceSubmission => ({
    ...adaptQuestionSubmission(multipleChoiceSubmission),
    answer: multipleChoiceSubmission.answer,
    optionA: multipleChoiceSubmission.option_a,
    optionB: multipleChoiceSubmission.option_b,
    optionC: multipleChoiceSubmission.option_c,
    optionD: multipleChoiceSubmission.option_d,
    correctAnswer: multipleChoiceSubmission.correct_answer,
});