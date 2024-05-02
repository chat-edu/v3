import {QuestionSubmission, QuestionSubmissionInput} from "@/types/questions/QuestionSubmission";
import {FreeResponseQuestionTypes} from "@/db/types/questions";

export interface FreeResponseSubmissionInput extends QuestionSubmissionInput {
    answer: string;
    type: FreeResponseQuestionTypes;
}

export interface FreeResponseSubmission extends FreeResponseSubmissionInput, QuestionSubmission {}