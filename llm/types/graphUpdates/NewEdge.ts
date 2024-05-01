import {TopicRow} from "@/db/types/TopicRow";

export interface NewEdge {
    sourceTopicName: TopicRow["name"];
    targetTopicName: TopicRow["name"];
}