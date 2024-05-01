import {TopicRow} from "@/db/types/TopicRow";

export interface NewTopic {
    name: TopicRow["name"]
    text: TopicRow["text"];
}