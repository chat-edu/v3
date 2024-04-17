import {Topic} from "@/types/graph/Topic";

export interface TopicEdge {
    sourceTopicId: Topic["id"];
    targetTopicId: Topic["id"];
}