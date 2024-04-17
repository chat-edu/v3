import {TopicRow} from "@/db/types/TopicRow";

export interface TopicEdgeRow {
    source_topic_id: TopicRow['id'];
    target_topic_id: TopicRow['id'];
}