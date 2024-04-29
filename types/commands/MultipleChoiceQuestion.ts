export type MultipleChoiceOptions = {
    "A": string,
    "B": string,
    "C": string,
    "D": string
};

export type MultipleChoiceKey = keyof MultipleChoiceOptions;

export interface MultipleChoiceQuestion {
    question: string;
    options: MultipleChoiceOptions;
    answer: MultipleChoiceKey;
}