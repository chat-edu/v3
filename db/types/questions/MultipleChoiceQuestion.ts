import {QuestionRowInput} from "@/db/types/questions/Question";

export interface MultipleChoiceQuestionRowInput extends QuestionRowInput {
    option_a: string;
    option_b: string;
    option_c: string;
    option_d: string;
    correct_answer: "A" | "B" | "C" | "D";
    answer: "A" | "B" | "C" | "D";
    correct: boolean;
    explanation: string;
}

export interface MultipleChoiceQuestionRow extends MultipleChoiceQuestionRowInput  {
    id: number;
}
