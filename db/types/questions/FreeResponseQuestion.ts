import {QuestionSubmissionRow} from "@/db/types/questions/Question";

export enum FreeResponseQuestionTypes {
    Understanding = "understanding",
    Application = "application",
}

export interface FreeResponseSubmissionRow {
    question_id: QuestionSubmissionRow["id"];
    answer: string;
    type: FreeResponseQuestionTypes;
}

export interface FreeResponseQuestionSubmissionRow extends QuestionSubmissionRow, FreeResponseSubmissionRow {}