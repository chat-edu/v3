import {QuestionSubmissionRow} from "@/db/types/questions/Question";

export interface MultipleChoiceSubmissionRow {
    question_id: QuestionSubmissionRow["id"];
    option_a: string;
    option_b: string;
    option_c: string;
    option_d: string;
    correct_answer: "A" | "B" | "C" | "D";
    answer: "A" | "B" | "C" | "D";
}

export interface MultipleChoiceQuestionSubmissionRow extends QuestionSubmissionRow, MultipleChoiceSubmissionRow {}