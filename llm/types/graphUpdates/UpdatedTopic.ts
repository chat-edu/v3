import {TopicRow} from "@/db/types/TopicRow";

export interface UpdatedTopic {
    name: TopicRow["name"];
    updatedText: TopicRow["text"];
}