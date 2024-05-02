import {User} from "@/types/User";
import {Topic} from "@/types/graph/Topic";
import {QuestionTypes} from "@/db/types/questions";
import {Task} from "@/types/task/Task";


export interface QuestionSubmissionInput {
    userId: User["id"];
    topicId: Topic["id"];
    taskId: Task["id"];
    questionType: QuestionTypes,
    question: string;
    correct: boolean,
    explanation: string;
    timestamp: Date;
}

export interface QuestionSubmission extends QuestionSubmissionInput {
    id: number;
}