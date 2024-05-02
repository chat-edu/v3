import {QuestionSubmission, QuestionSubmissionInput} from "@/types/questions/QuestionSubmission";

export interface MultipleChoiceSubmissionInput extends QuestionSubmissionInput {
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    correctAnswer: "A" | "B" | "C" | "D";
    answer: "A" | "B" | "C" | "D";
}

export interface MultipleChoiceSubmission extends MultipleChoiceSubmissionInput, QuestionSubmission {}