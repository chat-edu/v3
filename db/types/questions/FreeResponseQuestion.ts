import {QuestionRowInput} from "@/db/types/questions/Question";

export interface FreeResponseQuestionRowInput extends QuestionRowInput {
    answer: string;
    correct: boolean;
    explanation: string;
}

export interface FreeResponseQuestionRow extends FreeResponseQuestionRowInput {
    id: number;
}