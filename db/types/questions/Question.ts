import {TopicRow} from "@/db/types/TopicRow";
import {UserRow} from "@/db/types/UserRow";

export interface QuestionRowInput {
    topic_id: TopicRow["id"];
    question: string;
    user_id: UserRow["id"];
}