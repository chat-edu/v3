import {TopicRow} from "@/db/types/TopicRow";
import {UserRow} from "@/db/types/UserRow";
import {TaskRow} from "@/db/types/TaskRow";

export enum QuestionTypes {
    FreeResponse = "free_response",
    MultipleChoice = "multiple_choice",
}

export interface QuestionSubmissionRowInput {
    user_id: UserRow["id"];
    topic_id: TopicRow["id"];
    task_id: TaskRow["id"];
    question_type: QuestionTypes;
    question: string;
    correct: boolean,
    explanation: string;
    timestamp: Date;
}

export interface QuestionSubmissionRow extends QuestionSubmissionRowInput {
    id: number;
}